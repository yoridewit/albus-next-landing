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

  it('renders product links', () => {
    render(<Footer />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Documentatie')).toBeInTheDocument()
  })

  it('renders company links', () => {
    render(<Footer />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})
