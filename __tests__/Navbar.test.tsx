import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'

describe('Navbar', () => {
  it('renders the brand name', () => {
    render(<Navbar />)
    expect(screen.getByText('Albus')).toBeInTheDocument()
  })

  it('renders the contact link', () => {
    render(<Navbar />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})
