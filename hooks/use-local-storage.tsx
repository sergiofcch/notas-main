"use client"

import { useState, useEffect } from "react"

type StorageItem<T> = {
  value: T
  expiry: number
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  expiryMinutes = 10,
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // Función para obtener el valor del localStorage con verificación de expiración
  const getStoredValue = (): T => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)

      if (!item) {
        return initialValue
      }

      const storedItem: StorageItem<T> = JSON.parse(item)
      const now = new Date().getTime()

      // Si el item ha expirado, eliminarlo y devolver el valor inicial
      if (now > storedItem.expiry) {
        window.localStorage.removeItem(key)
        return initialValue
      }

      return storedItem.value
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Inicializar el estado cuando el componente se monta
  useEffect(() => {
    setStoredValue(getStoredValue())
  }, [])

  // Función para actualizar el valor en localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value

      // Calcular el tiempo de expiración (ahora + minutos en milisegundos)
      const expiry = new Date().getTime() + expiryMinutes * 60 * 1000

      // Guardar en localStorage con tiempo de expiración
      const item: StorageItem<T> = {
        value: valueToStore,
        expiry,
      }

      window.localStorage.setItem(key, JSON.stringify(item))
      setStoredValue(valueToStore)
    } catch (error) {
      console.error("Error writing to localStorage:", error)
    }
  }

  // Función para limpiar el valor en localStorage
  const clearValue = () => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error("Error clearing localStorage:", error)
    }
  }

  return [storedValue, setValue, clearValue]
}
