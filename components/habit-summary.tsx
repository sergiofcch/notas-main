"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, Edit, Flame } from "lucide-react"
import { cn } from "@/lib/utils"
import { useHabits } from "@/contexts/habit-context"
import { AddHabitDialog } from "@/components/add-habit-dialog"

export function HabitSummary() {
  const { habits, toggleHabit, updateProgress } = useHabits()

  // Mostrar solo los primeros 3 hábitos para el resumen
  const summaryHabits = habits.slice(0, 3)

  return (
    <div className="space-y-4">
      {summaryHabits.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No hay hábitos configurados</p>
      ) : (
        <ul className="space-y-3">
          {summaryHabits.map((habit) => (
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
                  <span className={cn("font-medium", habit.completed && "text-muted-foreground")}>{habit.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Flame className="h-4 w-4" />
                    <span className="text-xs font-medium">{habit.streak}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
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
      <AddHabitDialog
        trigger={
          <Button variant="outline" className="w-full">
            Ver todos los hábitos
          </Button>
        }
      />
    </div>
  )
}

