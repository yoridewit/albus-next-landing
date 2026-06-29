import { render, screen } from '@testing-library/react'
import FeedbackContact from '@/components/overstappen/FeedbackContact'

describe('FeedbackContact', () => {
  it('renders the heading', () => {
    render(<FeedbackContact />)
    expect(screen.getByRole('heading', { name: /Laat ons weten wat je vindt/i })).toBeInTheDocument()
  })

  it('renders a mailto link to the contact address', () => {
    render(<FeedbackContact />)
    const link = screen.getByRole('link', { name: /info@albus-hc.com/i })
    expect(link).toHaveAttribute('href', 'mailto:info@albus-hc.com')
  })
})
