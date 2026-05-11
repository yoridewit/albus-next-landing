import { render, screen, fireEvent } from '@testing-library/react'
import Testimonials from '@/components/Testimonials'

describe('Testimonials', () => {
  it('renders the section heading', () => {
    render(<Testimonials />)
    expect(screen.getByText('Wat Gebruikers Zeggen')).toBeInTheDocument()
  })

  it('renders the first testimonial by default', () => {
    render(<Testimonials />)
    expect(screen.getByText(/welke kast welk artikel/i)).toBeInTheDocument()
  })

  it('navigates to the next testimonial on arrow click', () => {
    render(<Testimonials />)
    fireEvent.click(screen.getByLabelText('Volgende testimonial'))
    expect(screen.getByText(/schaalbaarheid/i)).toBeInTheDocument()
  })

  it('wraps back to first testimonial from last', () => {
    render(<Testimonials />)
    fireEvent.click(screen.getByLabelText('Volgende testimonial'))
    fireEvent.click(screen.getByLabelText('Volgende testimonial'))
    fireEvent.click(screen.getByLabelText('Volgende testimonial'))
    expect(screen.getByText(/welke kast welk artikel/i)).toBeInTheDocument()
  })
})
