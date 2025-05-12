"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCategories } from "@/contexts/category-context"
import { useTasks } from "@/contexts/task-context"
import { format } from "date-fns"

interface AddTaskDialogProps {
  trigger?: React.ReactNode
}

export function AddTaskDialog({ trigger }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const { getCategoriesByType } = useCategories()
  const { addTask } = useTasks()

  const taskCategories = getCategoriesByType("task")

  const [taskData, setTaskData] = useState({
    title: "",
    category: "",
    priority: "media" as "alta" | "media" | "baja",
    time: "30",
    timeUnit: "min",
    date: format(new Date(), "yyyy-MM-dd"),
    description: "",
  })

  const handleChange = (field: string, value: string) => {
    setTaskData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!taskData.title.trim()) {
      toast({
        title: "Error",
        description: "El título de la tarea no puede estar vacío",
        variant: "destructive",
      })
      return
    }

    if (!taskData.category) {
      toast({
        title: "Error",
        description: "Debes seleccionar una categoría",
        variant: "destructive",
      })
      return
    }

    // Formatear el tiempo según la unidad seleccionada
    const formattedTime = taskData.timeUnit === "min" ? `${taskData.time}min` : `${taskData.time}h`

    addTask({
      title: taskData.title,
      category: taskData.category,
      priority: taskData.priority,
      time: formattedTime,
      date: taskData.date,
      description: taskData.description || undefined,
    })

    toast({
      title: "Tarea creada",
      description: `La tarea "${taskData.title}" ha sido creada exitosamente.`,
    })

    // Resetear el formulario
    setTaskData({
      title: "",
      category: "",
      priority: "media",
      time: "30",
      timeUnit: "min",
      date: format(new Date(), "yyyy-MM-dd"),
      description: "",
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva tarea
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Añadir nueva tarea</DialogTitle>
          <DialogDescription>Crea una nueva tarea para organizar tus actividades.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="task-title">Título</Label>
            <Input
              id="task-title"
              placeholder="Nombre de la tarea"
              value={taskData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="task-category">Categoría</Label>
              <Select value={taskData.category} onValueChange={(value) => handleChange("category", value)}>
                <SelectTrigger id="task-category">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {taskCategories.length > 0 ? (
                    taskCategories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="sin-categoria" disabled>
                      No hay categorías disponibles
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {taskCategories.length === 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Debes crear categorías en la sección de configuración primero.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-priority">Prioridad</Label>
              <Select
                value={taskData.priority}
                onValueChange={(value: "alta" | "media" | "baja") => handleChange("priority", value)}
              >
                <SelectTrigger id="task-priority">
                  <SelectValue placeholder="Seleccionar prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alta">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span>Alta</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="media">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span>Media</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="baja">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span>Baja</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="task-time">Tiempo estimado</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="task-time"
                  type="number"
                  min="1"
                  value={taskData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                />
                <Select value={taskData.timeUnit} onValueChange={(value) => handleChange("timeUnit", value)}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="min">Minutos</SelectItem>
                    <SelectItem value="h">Horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-date">Fecha</Label>
              <Input
                id="task-date"
                type="date"
                value={taskData.date}
                onChange={(e) => handleChange("date", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-description">Descripción (opcional)</Label>
            <Textarea
              id="task-description"
              placeholder="Detalles adicionales de la tarea"
              value={taskData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear tarea</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

