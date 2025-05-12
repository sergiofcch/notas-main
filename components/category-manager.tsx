"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash, Plus, Check } from "lucide-react"
import { useCategories, type CategoryType } from "@/contexts/category-context"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface CategoryManagerProps {
  type: CategoryType
}

export function CategoryManager({ type }: CategoryManagerProps) {
  const { categories, addCategory, updateCategory, deleteCategory, getCategoriesByType } = useCategories()
  const { toast } = useToast()
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryColor, setNewCategoryColor] = useState("#3b82f6")
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string; color: string } | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const typeCategories = getCategoriesByType(type)

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Error",
        description: "El nombre de la categoría no puede estar vacío",
        variant: "destructive",
      })
      return
    }

    addCategory(newCategoryName, newCategoryColor, type)
    toast({
      title: "Categoría añadida",
      description: `La categoría "${newCategoryName}" ha sido añadida correctamente.`,
    })
    setNewCategoryName("")
    setNewCategoryColor("#3b82f6")
    setDialogOpen(false)
  }

  const handleUpdateCategory = () => {
    if (!editingCategory) return
    if (!editingCategory.name.trim()) {
      toast({
        title: "Error",
        description: "El nombre de la categoría no puede estar vacío",
        variant: "destructive",
      })
      return
    }

    updateCategory(editingCategory.id, editingCategory.name, editingCategory.color)
    toast({
      title: "Categoría actualizada",
      description: `La categoría ha sido actualizada correctamente.`,
    })
    setEditingCategory(null)
  }

  const handleDeleteCategory = (id: string, name: string) => {
    if (confirm(`¿Estás seguro de que deseas eliminar la categoría "${name}"?`)) {
      deleteCategory(id)
      toast({
        title: "Categoría eliminada",
        description: `La categoría "${name}" ha sido eliminada correctamente.`,
      })
    }
  }

  const predefinedColors = [
    "#ef4444", // red
    "#f97316", // orange
    "#f59e0b", // amber
    "#84cc16", // lime
    "#22c55e", // green
    "#06b6d4", // cyan
    "#3b82f6", // blue
    "#6366f1", // indigo
    "#a855f7", // purple
    "#ec4899", // pink
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Categorías de {type === "task" ? "tareas" : "hábitos"}</Label>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Añadir categoría
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Añadir nueva categoría</DialogTitle>
              <DialogDescription>
                Crea una nueva categoría para tus {type === "task" ? "tareas" : "hábitos"}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Nombre</Label>
                <Input
                  id="category-name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Nombre de la categoría"
                />
              </div>
              <div className="space-y-2">
                <Label>Color</Label>
                <div className="flex flex-wrap gap-2">
                  {predefinedColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                      style={{ backgroundColor: color }}
                      onClick={() => setNewCategoryColor(color)}
                    >
                      {newCategoryColor === color && <Check className="h-4 w-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddCategory}>Añadir categoría</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-2">
        {typeCategories.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hay categorías definidas</p>
        ) : (
          typeCategories.map((category) => (
            <div key={category.id} className="flex items-center justify-between border p-2 rounded-md">
              {editingCategory?.id === category.id ? (
                <div className="flex items-center gap-2 flex-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: editingCategory.color }}
                      />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2">
                      <div className="flex flex-wrap gap-2 max-w-[220px]">
                        {predefinedColors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                            style={{ backgroundColor: color }}
                            onClick={() => setEditingCategory({ ...editingCategory, color })}
                          >
                            {editingCategory.color === color && <Check className="h-4 w-4 text-white" />}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Input
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    className="h-8"
                  />
                  <Button size="sm" variant="ghost" onClick={handleUpdateCategory}>
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <span>{category.name}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                {editingCategory?.id !== category.id && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingCategory({ id: category.id, name: category.name, color: category.color })}
                  >
                    Editar
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteCategory(category.id, category.name)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

