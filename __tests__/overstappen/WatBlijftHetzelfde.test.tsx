import { render, screen } from '@testing-library/react'
import WatBlijftHetzelfde from '@/components/overstappen/WatBlijftHetzelfde'

describe('WatBlijftHetzelfde', () => {
  it('renders the heading', () => {
    render(<WatBlijftHetzelfde />)
    expect(screen.getByRole('heading', { name: /Wat blijft hetzelfde/i })).toBeInTheDocument()
  })

  it('reassures that no new account is needed', () => {
    render(<WatBlijftHetzelfde />)
    expect(screen.getByText(/geen nieuw account/i)).toBeInTheDocument()
  })

  it('mentions the old app stays available until everyone has switched', () => {
    render(<WatBlijftHetzelfde />)
    expect(screen.getByText(/oude app blijft beschikbaar/i)).toBeInTheDocument()
  })
})
