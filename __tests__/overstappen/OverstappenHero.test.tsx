import { render, screen } from '@testing-library/react'
import OverstappenHero from '@/components/overstappen/OverstappenHero'

describe('OverstappenHero', () => {
  it('renders the heading', () => {
    render(<OverstappenHero />)
    expect(screen.getByRole('heading', { name: /Albus Next komt eraan/i })).toBeInTheDocument()
  })

  it('mentions switching after the summer', () => {
    render(<OverstappenHero />)
    expect(screen.getByText(/na de zomer/i)).toBeInTheDocument()
  })

  it('renders the primary CTA', () => {
    render(<OverstappenHero />)
    expect(screen.getByRole('link', { name: 'Start met testen' })).toHaveAttribute('href', 'https://www.albusnext.nl')
  })
})
