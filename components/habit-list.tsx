"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CheckCircle2, Circle, Edit, Flame, MoreHorizontal, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCategories } from "@/contexts/category-context"
import { useHabits } from "@/contexts/habit-context"

interface HabitListProps {
  filter?: "all" | "active" | "completed"
}

export function HabitList({ filter = "all" }: HabitListProps) {
  const { habits, toggleHabit, updateProgress, deleteHabit } = useHabits()
  const { getCategoryByName } = useCategories()

  const filteredHabits = habits.filter((habit) => {
    if (filter === "active") return !habit.completed
    if (filter === "completed") return habit.completed
    return true
  })

  const getCategoryColor = (categoryName: string) => {
    const category = getCategoryByName(categoryName)
    return category ? category.color : "#94a3b8" // Default color
  }

  return (
    <div className="space-y-4">
      {filteredHabits.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No hay hábitos que mostrar</p>
      ) : (
        <ul className="space-y-3">
          {filteredHabits.map((habit) => (
            <li key={habit.id} className={cn("p-3 rounded-lg border", habit.completed && "bg-muted/50")}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleHabit(habit.id)}>
                    {habit.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </Button>
                  <div>
                    <span className={cn("font-medium", habit.completed && "text-muted-foreground")}>{habit.title}</span>
                    <div className="text-xs text-muted-foreground">
                      <span style={{ color: getCategoryColor(habit.category) }}>{habit.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Flame className="h-4 w-4" />
                    <span className="text-xs font-medium">{habit.streak}</span>
                  </div>
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
                        onClick={() => deleteHabit(habit.id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span>Eliminar</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {habit.target > 1 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateProgress(habit.id, false)}
                        disabled={habit.current <= 0}
                      >
                        -
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateProgress(habit.id, true)}
                        disabled={habit.current >= habit.target}
                      >
                        +
                      </Button>
                    </div>
                    <span>
                      {habit.current}/{habit.target} {habit.unit}
                    </span>
                  </div>
                  <Progress value={(habit.current / habit.target) * 100} className="h-2" />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

