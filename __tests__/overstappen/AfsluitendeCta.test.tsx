import { render, screen } from '@testing-library/react'
import AfsluitendeCta from '@/components/overstappen/AfsluitendeCta'

describe('AfsluitendeCta', () => {
  it('renders the heading', () => {
    render(<AfsluitendeCta />)
    expect(screen.getByRole('heading', { name: /Klaar om te beginnen/i })).toBeInTheDocument()
  })

  it('renders the CTA linking to albusnext.nl', () => {
    render(<AfsluitendeCta />)
    expect(screen.getByRole('link', { name: 'Verken Albus Next' })).toHaveAttribute('href', 'https://www.albusnext.nl')
  })
})
