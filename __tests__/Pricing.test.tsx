import { render, screen } from '@testing-library/react'
import Pricing from '@/components/Pricing'

describe('Pricing', () => {
  it('renders the section heading', () => {
    render(<Pricing />)
    expect(screen.getByText('Transparante Prijzen')).toBeInTheDocument()
  })

  it('renders the monthly price', () => {
    render(<Pricing />)
    expect(screen.getByText('€295')).toBeInTheDocument()
  })

  it('renders the annual price', () => {
    render(<Pricing />)
    expect(screen.getByText('€2.950')).toBeInTheDocument()
  })

  it('renders the POPULAIR badge on the annual plan', () => {
    render(<Pricing />)
    expect(screen.getByText('POPULAIR')).toBeInTheDocument()
  })
})
