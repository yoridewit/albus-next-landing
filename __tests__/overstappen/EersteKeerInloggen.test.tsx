import { render, screen } from '@testing-library/react'
import EersteKeerInloggen from '@/components/overstappen/EersteKeerInloggen'

describe('EersteKeerInloggen', () => {
  it('renders the heading', () => {
    render(<EersteKeerInloggen />)
    expect(screen.getByRole('heading', { name: /Zo log je de eerste keer in/i })).toBeInTheDocument()
  })

  it('explains the wachtwoord-vergeten step', () => {
    render(<EersteKeerInloggen />)
    expect(screen.getAllByText(/Wachtwoord vergeten/i).length).toBeGreaterThan(0)
  })

  it('renders a download link to the PDF guide', () => {
    render(<EersteKeerInloggen />)
    const link = screen.getByRole('link', { name: /installatiegids/i })
    expect(link).toHaveAttribute('href', '/Albus Next — Installatiegids.pdf')
  })

  it('renders the CTA to albusnext.nl after the login steps', () => {
    render(<EersteKeerInloggen />)
    expect(screen.getByRole('link', { name: 'Start met testen' })).toHaveAttribute(
      'href',
      'https://www.albusnext.nl',
    )
  })

  it('exposes the anchor id used by the hero CTA', () => {
    const { container } = render(<EersteKeerInloggen />)
    expect(container.querySelector('#eerste-keer-inloggen')).toBeInTheDocument()
  })
})
