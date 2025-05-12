// __tests__/HabitsPage.test.tsx
import { render, screen } from '@testing-library/react'
import HabitsPage from '@/app/habitos/page'
import { CategoryProvider } from '@/contexts/category-context'
import { HabitProvider } from '@/contexts/habit-context'

describe('HabitsPage', () => {
  it('renderiza título y tabs principales', () => {
    render(
      <CategoryProvider>
        <HabitProvider>
          <HabitsPage />
        </HabitProvider>
      </CategoryProvider>
    )

    expect(screen.getByRole('heading', { name: /hábitos/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /todos/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /activos/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /completados/i })).toBeInTheDocument()
  })
})
