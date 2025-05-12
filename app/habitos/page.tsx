import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Search } from "lucide-react"
import { HabitList } from "@/components/habit-list"
// Importar el componente AddHabitDialog
import { AddHabitDialog } from "@/components/add-habit-dialog"

export default function HabitsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hábitos</h1>
          <p className="text-muted-foreground">Crea y mantén hábitos positivos para mejorar tu bienestar.</p>
        </div>
        {/* Reemplazar el botón por el componente AddHabitDialog */}
        <AddHabitDialog />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar hábitos..." className="pl-8" />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filtrar
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="active">Activos</TabsTrigger>
          <TabsTrigger value="completed">Completados</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Todos los hábitos</CardTitle>
              <CardDescription>Visualiza y gestiona todos tus hábitos</CardDescription>
            </CardHeader>
            <CardContent>
              <HabitList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Hábitos activos</CardTitle>
              <CardDescription>Hábitos que aún no has completado hoy</CardDescription>
            </CardHeader>
            <CardContent>
              <HabitList filter="active" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Hábitos completados</CardTitle>
              <CardDescription>Hábitos que ya has completado hoy</CardDescription>
            </CardHeader>
            <CardContent>
              <HabitList filter="completed" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

