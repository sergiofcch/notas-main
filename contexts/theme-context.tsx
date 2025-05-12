"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useTheme } from "next-themes"

type ThemeType = "light" | "dark" | "system"

interface AppearanceContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  compactMode: boolean
  setCompactMode: (compact: boolean) => void
  saveAppearanceSettings: () => void
  appearanceChanged: boolean
}

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined)

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const { theme: currentTheme, setTheme: setSystemTheme } = useTheme()

  const [theme, setThemeState] = useState<ThemeType>("system")
  const [compactMode, setCompactMode] = useState(false)
  const [appearanceChanged, setAppearanceChanged] = useState(false)

  // Cargar configuración del localStorage al iniciar
  useEffect(() => {
    const savedTheme = localStorage.getItem("appearance-theme") as ThemeType | null
    const savedCompactMode = localStorage.getItem("appearance-compact-mode")

    if (savedTheme) {
      setThemeState(savedTheme)
      setSystemTheme(savedTheme)
    } else if (currentTheme) {
      setThemeState(currentTheme as ThemeType)
    }

    if (savedCompactMode) {
      const isCompact = savedCompactMode === "true"
      setCompactMode(isCompact)

      // Aplicar modo compacto al cargar
      if (isCompact) {
        document.documentElement.classList.add("compact-mode")
      } else {
        document.documentElement.classList.remove("compact-mode")
      }
    }
  }, [currentTheme, setSystemTheme])

  // Función para establecer el tema
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme)
    setAppearanceChanged(true)
  }

  // Función para establecer el modo compacto
  const setCompactModeState = (compact: boolean) => {
    setCompactMode(compact)
    setAppearanceChanged(true)

    // Aplicar cambio inmediatamente para vista previa
    if (compact) {
      document.documentElement.classList.add("compact-mode")
    } else {
      document.documentElement.classList.remove("compact-mode")
    }
  }

  // Función para guardar la configuración
  const saveAppearanceSettings = () => {
    // Guardar tema
    localStorage.setItem("appearance-theme", theme)
    setSystemTheme(theme)

    // Guardar modo compacto
    localStorage.setItem("appearance-compact-mode", compactMode.toString())

    setAppearanceChanged(false)
  }

  return (
    <AppearanceContext.Provider
      value={{
        theme,
        setTheme,
        compactMode,
        setCompactMode: setCompactModeState,
        saveAppearanceSettings,
        appearanceChanged,
      }}
    >
      {children}
    </AppearanceContext.Provider>
  )
}

export function useAppearance() {
  const context = useContext(AppearanceContext)
  if (context === undefined) {
    throw new Error("useAppearance must be used within an AppearanceProvider")
  }
  return context
}

