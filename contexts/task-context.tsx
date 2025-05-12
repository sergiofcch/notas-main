"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Task {
  id: string
  title: string
  category: string
  priority: "alta" | "media" | "baja"
  completed: boolean
  time: string
  date: string
  description?: string
}

interface TaskContextType {
  tasks: Task[]
  addTask: (task: Omit<Task, "id" | "completed">) => void
  updateTask: (id: string, task: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTask: (id: string) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

// Datos iniciales de ejemplo
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Preparar presentación para reunión",
    category: "trabajo",
    priority: "alta",
    completed: false,
    time: "2h",
    date: "2025-04-04",
  },
  {
    id: "2",
    title: "Hacer ejercicio",
    category: "salud",
    priority: "media",
    completed: true,
    time: "45min",
    date: "2025-04-04",
  },
  {
    id: "3",
    title: "Comprar víveres",
    category: "personal",
    priority: "baja",
    completed: false,
    time: "30min",
    date: "2025-04-04",
  },
  {
    id: "4",
    title: "Llamar al médico",
    category: "salud",
    priority: "alta",
    completed: false,
    time: "15min",
    date: "2025-04-05",
  },
  {
    id: "5",
    title: "Revisar correos pendientes",
    category: "trabajo",
    priority: "media",
    completed: false,
    time: "1h",
    date: "2025-04-04",
  },
]

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  // Cargar tareas del localStorage al iniciar
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks))
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error)
      }
    }
  }, [])

  // Guardar tareas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task: Omit<Task, "id" | "completed">) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...task,
      completed: false,
    }
    setTasks((prev) => [...prev, newTask])
  }

  const updateTask = (id: string, taskUpdate: Partial<Task>) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...taskUpdate } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider")
  }
  return context
}

