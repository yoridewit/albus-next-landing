import { render, screen } from '@testing-library/react'
import CtaButton from '@/components/overstappen/CtaButton'

describe('CtaButton', () => {
  it('renders default label linking to albusnext.nl', () => {
    render(<CtaButton />)
    const link = screen.getByRole('link', { name: 'Verken Albus Next' })
    expect(link).toHaveAttribute('href', 'https://www.albusnext.nl')
  })

  it('accepts a custom label', () => {
    render(<CtaButton label="Ga naar Albus Next" />)
    expect(screen.getByRole('link', { name: 'Ga naar Albus Next' })).toBeInTheDocument()
  })

  it('accepts a custom href (e.g. an in-page anchor)', () => {
    render(<CtaButton href="#eerste-keer-inloggen" />)
    expect(screen.getByRole('link', { name: 'Verken Albus Next' })).toHaveAttribute(
      'href',
      '#eerste-keer-inloggen',
    )
  })
})
