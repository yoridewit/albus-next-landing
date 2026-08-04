import { render, screen } from '@testing-library/react'
import Testomgeving from '@/components/overstappen/Testomgeving'

describe('Testomgeving', () => {
  it('renders the heading', () => {
    render(<Testomgeving />)
    expect(screen.getByRole('heading', { name: /nu vast verkennen/i })).toBeInTheDocument()
  })

  it('mentions the data may be outdated', () => {
    render(<Testomgeving />)
    expect(screen.getAllByText(/verouderd/i).length).toBeGreaterThan(0)
  })

  it('renders the disclaimer against casually changing or moving data', () => {
    render(<Testomgeving />)
    expect(screen.getByText(/wijzig of verplaats niet zomaar iets/i)).toBeInTheDocument()
  })
})
