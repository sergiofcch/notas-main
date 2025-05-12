"use client"

interface CategoryDistributionProps {
  type: "tasks" | "habits"
}

export function CategoryDistribution({ type }: CategoryDistributionProps) {
  return (
    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
      Gráfico de distribución por categoría para {type === "tasks" ? "tareas" : "hábitos"}
      <br />
      (Implementación de gráficos con Chart.js o similar)
    </div>
  )
}

