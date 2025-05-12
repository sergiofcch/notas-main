"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type CategoryType = "task" | "habit"

export interface Category {
  id: string
  name: string
  color: string
  type: CategoryType
}

interface CategoryContextType {
  categories: Category[]
  addCategory: (name: string, color: string, type: CategoryType) => void
  updateCategory: (id: string, name: string, color: string) => void
  deleteCategory: (id: string) => void
  getCategoryByName: (name: string) => Category | undefined
  getCategoriesByType: (type: CategoryType) => Category[]
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

// Datos iniciales de ejemplo
const initialCategories: Category[] = [
  { id: "1", name: "trabajo", color: "#3b82f6", type: "task" },
  { id: "2", name: "salud", color: "#22c55e", type: "task" },
  { id: "3", name: "personal", color: "#a855f7", type: "task" },
  { id: "4", name: "salud", color: "#22c55e", type: "habit" },
  { id: "5", name: "bienestar", color: "#3b82f6", type: "habit" },
  { id: "6", name: "desarrollo", color: "#a855f7", type: "habit" },
]

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories)

  // Cargar categorías del localStorage al iniciar
  useEffect(() => {
    const savedCategories = localStorage.getItem("categories")
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories))
      } catch (error) {
        console.error("Error parsing categories from localStorage:", error)
      }
    }
  }, [])

  // Guardar categorías en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

  const addCategory = (name: string, color: string, type: CategoryType) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name: name.toLowerCase(),
      color,
      type,
    }
    setCategories((prev) => [...prev, newCategory])
  }

  const updateCategory = (id: string, name: string, color: string) => {
    setCategories((prev) =>
      prev.map((category) => (category.id === id ? { ...category, name: name.toLowerCase(), color } : category)),
    )
  }

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id))
  }

  const getCategoryByName = (name: string) => {
    return categories.find((category) => category.name.toLowerCase() === name.toLowerCase())
  }

  const getCategoriesByType = (type: CategoryType) => {
    return categories.filter((category) => category.type === type)
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategoryByName,
        getCategoriesByType,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategories() {
  const context = useContext(CategoryContext)
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoryProvider")
  }
  return context
}

