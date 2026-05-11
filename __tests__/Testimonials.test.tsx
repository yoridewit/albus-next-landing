import { render, screen } from '@testing-library/react'
import Testimonials from '@/components/Testimonials'

describe('Testimonials', () => {
  it('renders the section heading', () => {
    render(<Testimonials />)
    expect(screen.getByText('Wat Gebruikers Zeggen')).toBeInTheDocument()
  })

  it('renders all three testimonials at once', () => {
    render(<Testimonials />)
    expect(screen.getByText(/welke kast welk artikel/i)).toBeInTheDocument()
    expect(screen.getByText(/schaalbaarheid/i)).toBeInTheDocument()
    expect(screen.getByText(/aanvul-lijsten/i)).toBeInTheDocument()
  })

  it('renders all reviewer names', () => {
    render(<Testimonials />)
    expect(screen.getByText('Ron')).toBeInTheDocument()
    expect(screen.getByText('Jeroen V.')).toBeInTheDocument()
    expect(screen.getByText('Nico')).toBeInTheDocument()
  })
})
