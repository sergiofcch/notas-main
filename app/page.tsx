import { DailyOverview } from "@/components/daily-overview"
import { TaskSummary } from "@/components/task-summary"
import { HabitSummary } from "@/components/habit-summary"
import { QuickAdd } from "@/components/quick-add"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Habit Pepito</h1>
          <p className="text-muted-foreground">
            Organiza tus tareas y hábitos para mejorar tu productividad y bienestar.
          </p>
        </div>
        <QuickAdd />
      </div>

      <DailyOverview />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Tareas pendientes</CardTitle>
            <CardDescription>Tareas para completar hoy</CardDescription>
          </CardHeader>
          <CardContent>
            <TaskSummary />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Hábitos diarios</CardTitle>
            <CardDescription>Seguimiento de tus hábitos</CardDescription>
          </CardHeader>
          <CardContent>
            <HabitSummary />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Hoy</TabsTrigger>
          <TabsTrigger value="week">Esta semana</TabsTrigger>
          <TabsTrigger value="month">Este mes</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del día</CardTitle>
              <CardDescription>Tu progreso de hoy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tareas completadas</span>
                  <span className="font-medium">3/7</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary w-[43%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Hábitos completados</span>
                  <span className="font-medium">2/4</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-pink-500 w-[50%]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="week" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumen semanal</CardTitle>
              <CardDescription>Tu progreso de esta semana</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center text-muted-foreground">
              Gráfico de progreso semanal
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="month" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumen mensual</CardTitle>
              <CardDescription>Tu progreso de este mes</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center text-muted-foreground">
              Gráfico de progreso mensual
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

