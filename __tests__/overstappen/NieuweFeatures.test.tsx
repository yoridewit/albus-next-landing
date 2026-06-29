import { render, screen } from '@testing-library/react'
import NieuweFeatures from '@/components/overstappen/NieuweFeatures'

describe('NieuweFeatures', () => {
  it('renders the section heading', () => {
    render(<NieuweFeatures />)
    expect(screen.getByRole('heading', { name: /Nieuw in Albus Next/i })).toBeInTheDocument()
  })

  it('renders the three feature highlights', () => {
    render(<NieuweFeatures />)
    expect(screen.getByText('Eén unified webapp')).toBeInTheDocument()
    expect(screen.getByText('Modernere, snellere interface')).toBeInTheDocument()
    expect(screen.getByText('Slimme voorraadhulp')).toBeInTheDocument()
  })
})
