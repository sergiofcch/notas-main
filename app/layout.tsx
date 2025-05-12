import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Sidebar } from "@/components/sidebar"
import { CategoryProvider } from "@/contexts/category-context"
import { HabitProvider } from "@/contexts/habit-context"
import { TaskProvider } from "@/contexts/task-context"
// Importar el AppearanceProvider
import { AppearanceProvider } from "@/contexts/theme-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Habit Pepito - Organiza tus tareas y hábitos",
  description: "Aplicación para organizar tareas y hábitos diarios",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AppearanceProvider>
            <CategoryProvider>
              <TaskProvider>
                <HabitProvider>
                  <div className="flex min-h-screen flex-col md:flex-row">
                    <Sidebar />
                    <main className="flex-1 p-4 md:p-6">{children}</main>
                  </div>
                  <Toaster />
                </HabitProvider>
              </TaskProvider>
            </CategoryProvider>
          </AppearanceProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'