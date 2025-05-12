"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, Calendar, CheckSquare, Home, Menu, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useState } from "react"

const routes = [
  {
    label: "Inicio",
    icon: Home,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Tareas",
    icon: CheckSquare,
    href: "/tareas",
    color: "text-violet-500",
  },
  {
    label: "Hábitos",
    icon: Calendar,
    href: "/habitos",
    color: "text-pink-500",
  },
  {
    label: "Estadísticas",
    icon: BarChart2,
    href: "/estadisticas",
    color: "text-orange-500",
  },
  {
    label: "Configuración",
    icon: Settings,
    href: "/configuracion",
    color: "text-gray-500",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="hidden md:flex h-full w-72 flex-col border-r bg-muted/40">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Pepito</h2>
          <p className="text-sm text-muted-foreground">Organiza tu día</p>
        </div>
        <div className="flex-1">
          <nav className="grid gap-2 px-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent",
                  pathname === route.href ? "bg-accent" : "",
                )}
              >
                <route.icon className={cn("h-5 w-5", route.color)} />
                <span>{route.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Pepito</h2>
              <p className="text-sm text-muted-foreground">Organiza tu día</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="grid gap-2 px-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent",
                  pathname === route.href ? "bg-accent" : "",
                )}
              >
                <route.icon className={cn("h-5 w-5", route.color)} />
                <span>{route.label}</span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}

