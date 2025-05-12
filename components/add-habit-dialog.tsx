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
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCategories } from "@/contexts/category-context"
import { useHabits } from "@/contexts/habit-context"

interface AddHabitDialogProps {
  trigger?: React.ReactNode
}

export function AddHabitDialog({ trigger }: AddHabitDialogProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const { getCategoriesByType } = useCategories()
  const { addHabit } = useHabits()

  const habitCategories = getCategoriesByType("habit")

  const [habitData, setHabitData] = useState({
    title: "",
    category: "",
    target: 1,
    unit: "veces",
    reminder: "",
  })

  const handleChange = (field: string, value: string | number) => {
    setHabitData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!habitData.title.trim()) {
      toast({
        title: "Error",
        description: "El título del hábito no puede estar vacío",
        variant: "destructive",
      })
      return
    }

    if (!habitData.category) {
      toast({
        title: "Error",
        description: "Debes seleccionar una categoría",
        variant: "destructive",
      })
      return
    }

    addHabit({
      title: habitData.title,
      category: habitData.category,
      target: habitData.target,
      unit: habitData.unit,
      reminder: habitData.reminder || undefined,
    })

    toast({
      title: "Hábito creado",
      description: `El hábito "${habitData.title}" ha sido creado exitosamente.`,
    })

    // Resetear el formulario
    setHabitData({
      title: "",
      category: "",
      target: 1,
      unit: "veces",
      reminder: "",
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo hábito
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir nuevo hábito</DialogTitle>
          <DialogDescription>Crea un nuevo hábito para seguir y mejorar tu bienestar.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="habit-title">Título</Label>
            <Input
              id="habit-title"
              placeholder="Nombre del hábito"
              value={habitData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="habit-category">Categoría</Label>
            <Select value={habitData.category} onValueChange={(value) => handleChange("category", value)}>
              <SelectTrigger id="habit-category">
                <SelectValue placeholder="Seleccionar categoría" />
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
                  <SelectItem value="sin-categoria" disabled>
                    No hay categorías disponibles
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {habitCategories.length === 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                Debes crear categorías en la sección de configuración primero.
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="habit-target">Objetivo diario</Label>
            <div className="flex items-center gap-2">
              <Input
                id="habit-target"
                type="number"
                min="1"
                value={habitData.target}
                onChange={(e) => handleChange("target", Number.parseInt(e.target.value) || 1)}
              />
              <Select value={habitData.unit} onValueChange={(value) => handleChange("unit", value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Unidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="veces">Veces</SelectItem>
                  <SelectItem value="minutos">Minutos</SelectItem>
                  <SelectItem value="horas">Horas</SelectItem>
                  <SelectItem value="ml">ml</SelectItem>
                  <SelectItem value="vasos">Vasos</SelectItem>
                  <SelectItem value="páginas">Páginas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="habit-reminder">Recordatorio (opcional)</Label>
            <Input
              id="habit-reminder"
              type="time"
              value={habitData.reminder}
              onChange={(e) => handleChange("reminder", e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear hábito</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

