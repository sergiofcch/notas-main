import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Search } from "lucide-react"
import { TaskList } from "@/components/task-list"
// Importar el componente AddTaskDialog
import { AddTaskDialog } from "@/components/add-task-dialog"

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tareas</h1>
          <p className="text-muted-foreground">Gestiona y organiza tus tareas por categorías y prioridades.</p>
        </div>
        {/* Reemplazar el botón por el componente AddTaskDialog */}
        <AddTaskDialog />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar tareas..." className="pl-8" />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filtrar
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 md:w-auto md:inline-flex">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="completed">Completadas</TabsTrigger>
          <TabsTrigger value="important">Importantes</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Todas las tareas</CardTitle>
              <CardDescription>Visualiza y gestiona todas tus tareas</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Tareas pendientes</CardTitle>
              <CardDescription>Tareas que aún no has completado</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList filter="pending" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Tareas completadas</CardTitle>
              <CardDescription>Tareas que ya has terminado</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList filter="completed" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="important" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Tareas importantes</CardTitle>
              <CardDescription>Tareas con alta prioridad</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList filter="important" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

