import { render, screen } from '@testing-library/react'
import TasksPage from '../app/tareas/page'

jest.mock('@/components/task-list', () => ({
  TaskList: () => <div data-testid="task-list">Lista de tareas</div>,
}))

jest.mock('@/components/add-task-dialog', () => ({
  AddTaskDialog: () => <button>Agregar tarea</button>,
}))

describe('TasksPage', () => {
  test('renderiza título y tabs principales', () => {
    render(<TasksPage />)

    // Título principal
    expect(screen.getByRole('heading', { name: /Tareas/i })).toBeInTheDocument()

    // Tabs
    expect(screen.getByRole('tab', { name: /Todas/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Pendientes/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Completadas/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Importantes/i })).toBeInTheDocument()
  })

  test('muestra el componente TaskList', () => {
    render(<TasksPage />)
    expect(screen.getAllByTestId('task-list').length).toBeGreaterThan(0)
  })

  test('muestra el botón Agregar tarea', () => {
    render(<TasksPage />)
    expect(screen.getByText(/Agregar tarea/i)).toBeInTheDocument()
  })
})
