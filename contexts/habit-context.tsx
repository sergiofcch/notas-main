"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Habit {
  id: string
  title: string
  category: string
  target: number
  current: number
  unit: string
  completed: boolean
  streak: number
  reminder?: string
}

interface HabitContextType {
  habits: Habit[]
  addHabit: (habit: Omit<Habit, "id" | "current" | "completed" | "streak">) => void
  updateHabit: (id: string, habit: Partial<Habit>) => void
  deleteHabit: (id: string) => void
  toggleHabit: (id: string) => void
  updateProgress: (id: string, increment: boolean) => void
}

const HabitContext = createContext<HabitContextType | undefined>(undefined)

// Datos iniciales de ejemplo
const initialHabits: Habit[] = [
  {
    id: "1",
    title: "Beber 2L de agua",
    category: "salud",
    streak: 5,
    completed: false,
    target: 8,
    current: 4,
    unit: "vasos",
  },
  {
    id: "2",
    title: "Meditar",
    category: "bienestar",
    streak: 12,
    completed: true,
    target: 1,
    current: 1,
    unit: "veces",
  },
  {
    id: "3",
    title: "Leer",
    category: "desarrollo",
    streak: 3,
    completed: false,
    target: 30,
    current: 15,
    unit: "minutos",
  },
  {
    id: "4",
    title: "Ejercicio",
    category: "salud",
    streak: 7,
    completed: false,
    target: 1,
    current: 0,
    unit: "veces",
  },
  {
    id: "5",
    title: "Escribir diario",
    category: "bienestar",
    streak: 21,
    completed: true,
    target: 1,
    current: 1,
    unit: "veces",
  },
]

export function HabitProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>(initialHabits)

  // Cargar hábitos del localStorage al iniciar
  useEffect(() => {
    const savedHabits = localStorage.getItem("habits")
    if (savedHabits) {
      try {
        setHabits(JSON.parse(savedHabits))
      } catch (error) {
        console.error("Error parsing habits from localStorage:", error)
      }
    }
  }, [])

  // Guardar hábitos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits))
  }, [habits])

  const addHabit = (habit: Omit<Habit, "id" | "current" | "completed" | "streak">) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      ...habit,
      current: 0,
      completed: false,
      streak: 0,
    }
    setHabits((prev) => [...prev, newHabit])
  }

  const updateHabit = (id: string, habitUpdate: Partial<Habit>) => {
    setHabits((prev) => prev.map((habit) => (habit.id === id ? { ...habit, ...habitUpdate } : habit)))
  }

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id))
  }

  const toggleHabit = (id: string) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed: !habit.completed,
              current: habit.completed ? habit.current - 1 : habit.target,
            }
          : habit,
      ),
    )
  }

  const updateProgress = (id: string, increment: boolean) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const newCurrent = increment ? Math.min(habit.current + 1, habit.target) : Math.max(habit.current - 1, 0)

          return {
            ...habit,
            current: newCurrent,
            completed: newCurrent >= habit.target,
          }
        }
        return habit
      }),
    )
  }

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        updateHabit,
        deleteHabit,
        toggleHabit,
        updateProgress,
      }}
    >
      {children}
    </HabitContext.Provider>
  )
}

export function useHabits() {
  const context = useContext(HabitContext)
  if (context === undefined) {
    throw new Error("useHabits must be used within a HabitProvider")
  }
  return context
}

