import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsOverview } from "@/components/stats-overview"
import { TaskCompletionChart } from "@/components/task-completion-chart"
import { HabitStreakChart } from "@/components/habit-streak-chart"
import { CategoryDistribution } from "@/components/category-distribution"

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Estadísticas</h1>
        <p className="text-muted-foreground">Visualiza tu progreso y rendimiento a lo largo del tiempo.</p>
      </div>

      <StatsOverview />

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tasks">Tareas</TabsTrigger>
          <TabsTrigger value="habits">Hábitos</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Completadas vs Pendientes</CardTitle>
                <CardDescription>Distribución de tareas completadas y pendientes</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <TaskCompletionChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Distribución por categoría</CardTitle>
                <CardDescription>Distribución de tareas por categoría</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <CategoryDistribution type="tasks" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="habits" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rachas de hábitos</CardTitle>
                <CardDescription>Rachas actuales de tus hábitos</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <HabitStreakChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Distribución por categoría</CardTitle>
                <CardDescription>Distribución de hábitos por categoría</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <CategoryDistribution type="habits" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

