import { render, screen } from '@testing-library/react'
import Features from '@/components/Features'

describe('Features', () => {
  it('renders the section heading', () => {
    render(<Features />)
    expect(screen.getByText('Slimmer Werken op de OK')).toBeInTheDocument()
  })

  it('renders all five feature card titles', () => {
    render(<Features />)
    expect(screen.getByText('Digitaliseer je magazijn met gemak')).toBeInTheDocument()
    expect(screen.getByText(/aanvul-lijst/i)).toBeInTheDocument()
    expect(screen.getAllByText(/looproute/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/ingrepen/i)).toBeInTheDocument()
    expect(screen.getByText(/betaalbaar/i)).toBeInTheDocument()
  })
})
