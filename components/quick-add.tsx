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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Importar el hook useCategories
import { useCategories } from "@/contexts/category-context"

// Modificar la función QuickAdd para usar las categorías personalizadas
export function QuickAdd() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const { getCategoriesByType } = useCategories()

  const taskCategories = getCategoriesByType("task")
  const habitCategories = getCategoriesByType("habit")

  const handleSubmitTask = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Tarea creada",
      description: "Tu tarea ha sido creada exitosamente.",
    })
    setOpen(false)
  }

  const handleSubmitHabit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Hábito creado",
      description: "Tu hábito ha sido creado exitosamente.",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Añadir
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir nuevo</DialogTitle>
          <DialogDescription>Crea una nueva tarea o hábito para seguir.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="task" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="task">Tarea</TabsTrigger>
            <TabsTrigger value="habit">Hábito</TabsTrigger>
          </TabsList>
          <TabsContent value="task">
            <form onSubmit={handleSubmitTask} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="task-title">Título</Label>
                <Input id="task-title" placeholder="Nombre de la tarea" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="task-category">Categoría</Label>
                  <Select>
                    <SelectTrigger id="task-category">
                      <SelectValue placeholder="Seleccionar" />
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
                        <SelectItem value="sin-categoria">Sin categoría</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-priority">Prioridad</Label>
                  <Select>
                    <SelectTrigger id="task-priority">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="baja">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-time">Tiempo estimado</Label>
                <div className="flex items-center gap-2">
                  <Input id="task-time" type="number" min="1" placeholder="30" />
                  <Select defaultValue="min">
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
              <DialogFooter>
                <Button type="submit">Crear tarea</Button>
              </DialogFooter>
            </form>
          </TabsContent>
          <TabsContent value="habit">
            <form onSubmit={handleSubmitHabit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="habit-title">Título</Label>
                <Input id="habit-title" placeholder="Nombre del hábito" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="habit-category">Categoría</Label>
                <Select>
                  <SelectTrigger id="habit-category">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {habitCategories.length > 0 ? (
                      habitCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
                            <span>{category.name}</span>
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="sin-categoria">Sin categoría</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="habit-target">Objetivo diario</Label>
                <div className="flex items-center gap-2">
                  <Input id="habit-target" type="number" min="1" placeholder="1" />
                  <Select defaultValue="veces">
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Unidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="veces">Veces</SelectItem>
                      <SelectItem value="min">Minutos</SelectItem>
                      <SelectItem value="ml">ml</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="habit-reminder">Recordatorio</Label>
                <Input id="habit-reminder" type="time" />
              </div>
              <DialogFooter>
                <Button type="submit">Crear hábito</Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

