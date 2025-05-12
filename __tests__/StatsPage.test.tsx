// __tests__/StatsPage.test.tsx
import { render, screen } from "@testing-library/react"
import StatsPage from "@/app/estadisticas/page"

describe("StatsPage", () => {
  it("renderiza el título y las pestañas principales", () => {
    render(<StatsPage />)

    // Verifica el título principal
    expect(screen.getByRole("heading", { name: /Estadísticas/i })).toBeInTheDocument()

    // Verifica subtítulo
    expect(screen.getByText(/Visualiza tu progreso/i)).toBeInTheDocument()

    // Tabs
    expect(screen.getByRole("tab", { name: /Tareas/i })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /Hábitos/i })).toBeInTheDocument()

    // Evitar error por múltiples coincidencias
    const titles = screen.getAllByText(/Completadas vs Pendientes/i)
    expect(titles.length).toBeGreaterThan(0)

    const distribTitles = screen.getAllByText(/Distribución por categoría/i)
    expect(distribTitles.length).toBeGreaterThan(0)
  })
})
