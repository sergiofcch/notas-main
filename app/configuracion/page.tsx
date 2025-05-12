"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CategoryManager } from "@/components/category-manager"
import { useAppearance } from "@/contexts/theme-context"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export default function SettingsPage() {
  const { theme, setTheme, compactMode, setCompactMode, saveAppearanceSettings, appearanceChanged } = useAppearance()
  const { toast } = useToast()

  // Estado para el formulario de perfil
  const [profile, setProfile] = useState({
    name: "Usuario",
    email: "usuario@ejemplo.com",
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = () => {
    // Aquí se guardaría el perfil en una base de datos o localStorage
    localStorage.setItem("user-profile", JSON.stringify(profile))

    toast({
      title: "Perfil guardado",
      description: "Tu información de perfil ha sido actualizada correctamente.",
    })
  }

  const handleSaveAppearance = () => {
    saveAppearanceSettings()

    toast({
      title: "Apariencia guardada",
      description: "La configuración de apariencia ha sido actualizada correctamente.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Personaliza la aplicación según tus preferencias.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
              <CardDescription>Actualiza tu información personal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  placeholder="Tu nombre"
                  value={profile.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={profile.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile}>Guardar cambios</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Apariencia</CardTitle>
              <CardDescription>Personaliza la apariencia de la aplicación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Tema</Label>
                <Select value={theme} onValueChange={(value: "light" | "dark" | "system") => setTheme(value)}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Seleccionar tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Oscuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="compact-mode">Modo compacto</Label>
                <Switch id="compact-mode" checked={compactMode} onCheckedChange={setCompactMode} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAppearance} disabled={!appearanceChanged}>
                Guardar cambios
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>Configura cómo y cuándo recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Notificaciones por correo</Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Notificaciones push</Label>
                <Switch id="push-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="reminder-notifications">Recordatorios de tareas</Label>
                <Switch id="reminder-notifications" defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="notification-time">Hora de recordatorios diarios</Label>
                <Input id="notification-time" type="time" defaultValue="08:00" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="categories" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Categorías</CardTitle>
              <CardDescription>Gestiona las categorías para tareas y hábitos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <CategoryManager type="task" />
              <Separator />
              <CategoryManager type="habit" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

