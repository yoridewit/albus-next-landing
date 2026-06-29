import { render, screen } from '@testing-library/react'
import EersteKeerInloggen from '@/components/overstappen/EersteKeerInloggen'

describe('EersteKeerInloggen', () => {
  it('renders the heading', () => {
    render(<EersteKeerInloggen />)
    expect(screen.getByRole('heading', { name: /Zo log je de eerste keer in/i })).toBeInTheDocument()
  })

  it('explains the wachtwoord-vergeten step', () => {
    render(<EersteKeerInloggen />)
    expect(screen.getByText(/Wachtwoord vergeten/i)).toBeInTheDocument()
  })

  it('renders a download link to the PDF guide', () => {
    render(<EersteKeerInloggen />)
    const link = screen.getByRole('link', { name: /installatiegids/i })
    expect(link).toHaveAttribute('href', '/Albus Next — Installatiegids.pdf')
  })
})
