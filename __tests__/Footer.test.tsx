import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('renders the brand name', () => {
    render(<Footer />)
    expect(screen.getAllByText('Albus Health').length).toBeGreaterThan(0)
  })

  it('renders the contact email', () => {
    render(<Footer />)
    expect(screen.getByText('info@albus-hc.com')).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<Footer />)
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
  })
})
