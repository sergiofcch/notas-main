"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, Edit, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCategories } from "@/contexts/category-context"
import { useTasks } from "@/contexts/task-context"
import { AddTaskDialog } from "@/components/add-task-dialog"

export function TaskSummary() {
  const { tasks, toggleTask } = useTasks()
  const { getCategoryByName } = useCategories()

  // Filtrar tareas para mostrar solo las pendientes y ordenar por prioridad
  const pendingTasks = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => {
      const priorityOrder = { alta: 0, media: 1, baja: 2 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
    .slice(0, 3) // Mostrar solo las primeras 3 tareas pendientes

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-500"
      case "media":
        return "bg-yellow-500"
      case "baja":
        return "bg-green-500"
      default:
        return "bg-blue-500"
    }
  }

  const getCategoryColor = (categoryName: string) => {
    const category = getCategoryByName(categoryName)
    return category ? { backgroundColor: category.color } : { backgroundColor: "#94a3b8" } // Default color
  }

  return (
    <div className="space-y-4">
      {pendingTasks.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No hay tareas pendientes para hoy</p>
      ) : (
        <ul className="space-y-3">
          {pendingTasks.map((task) => (
            <li
              key={task.id}
              className={cn("flex items-center justify-between p-3 rounded-lg border", task.completed && "bg-muted/50")}
            >
              <div className="flex items-center gap-3 flex-1">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  id={`summary-task-${task.id}`}
                />
                <div className="grid gap-1">
                  <label
                    htmlFor={`summary-task-${task.id}`}
                    className={cn("font-medium", task.completed && "line-through text-muted-foreground")}
                  >
                    {task.title}
                  </label>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="text-white" style={getCategoryColor(task.category)}>
                      {task.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{task.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className={cn("w-2 h-2 rounded-full", getPriorityColor(task.priority))} />
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <AddTaskDialog
        trigger={
          <Button variant="outline" className="w-full">
            Ver todas las tareas
          </Button>
        }
      />
    </div>
  )
}

