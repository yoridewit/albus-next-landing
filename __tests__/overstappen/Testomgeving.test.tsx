import { render, screen } from '@testing-library/react'
import Testomgeving from '@/components/overstappen/Testomgeving'

describe('Testomgeving', () => {
  it('renders the heading', () => {
    render(<Testomgeving />)
    expect(screen.getByRole('heading', { name: /testomgeving staat klaar/i })).toBeInTheDocument()
  })

  it('mentions recent (not latest) data', () => {
    render(<Testomgeving />)
    expect(screen.getByText(/recente data/i)).toBeInTheDocument()
  })

  it('renders the disclaimer about resetting data', () => {
    render(<Testomgeving />)
    expect(screen.getByText(/kan gereset worden/i)).toBeInTheDocument()
  })
})
