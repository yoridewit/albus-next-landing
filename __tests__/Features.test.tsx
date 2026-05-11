import { render, screen } from '@testing-library/react'
import Features from '@/components/Features'

describe('Features', () => {
  it('renders the section heading', () => {
    render(<Features />)
    expect(screen.getByText('Slimmer Werken op de OK')).toBeInTheDocument()
  })

  it('renders all four feature card titles', () => {
    render(<Features />)
    expect(screen.getByText('Digitaliseer je magazijn met gemak')).toBeInTheDocument()
    expect(screen.getByText(/aanvullijst/i)).toBeInTheDocument()
    expect(screen.getByText(/looproute/i)).toBeInTheDocument()
    expect(screen.getByText(/ingrepen/i)).toBeInTheDocument()
  })
})
