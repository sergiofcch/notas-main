"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Clock, Edit, MoreHorizontal, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCategories } from "@/contexts/category-context"
import { useTasks } from "@/contexts/task-context"

interface TaskListProps {
  filter?: "all" | "pending" | "completed" | "important"
}

export function TaskList({ filter = "all" }: TaskListProps) {
  const { tasks, toggleTask, deleteTask } = useTasks()
  const { getCategoryByName } = useCategories()

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed
    if (filter === "completed") return task.completed
    if (filter === "important") return task.priority === "alta"
    return true
  })

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
      {filteredTasks.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No hay tareas que mostrar</p>
      ) : (
        <ul className="space-y-3">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={cn("flex items-center justify-between p-3 rounded-lg border", task.completed && "bg-muted/50")}
            >
              <div className="flex items-center gap-3 flex-1">
                <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} id={`task-${task.id}`} />
                <div className="grid gap-1">
                  <label
                    htmlFor={`task-${task.id}`}
                    className={cn("font-medium", task.completed && "line-through text-muted-foreground")}
                  >
                    {task.title}
                  </label>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <Badge variant="outline" className="text-white" style={getCategoryColor(task.category)}>
                      {task.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{task.time}</span>
                    </div>
                    <span className="text-muted-foreground">{task.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", getPriorityColor(task.priority))} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Abrir menú</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-destructive focus:text-destructive"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash className="h-4 w-4" />
                      <span>Eliminar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

