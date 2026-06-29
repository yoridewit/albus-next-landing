import { render, screen } from '@testing-library/react'
import Voordelen from '@/components/overstappen/Voordelen'

describe('Voordelen', () => {
  it('renders the section heading', () => {
    render(<Voordelen />)
    expect(screen.getByRole('heading', { name: /Waarom Albus Next/i })).toBeInTheDocument()
  })

  it('renders all four benefit cards', () => {
    render(<Voordelen />)
    expect(screen.getByText('Altijd de nieuwste versie')).toBeInTheDocument()
    expect(screen.getByText('Geen App Store nodig')).toBeInTheDocument()
    expect(screen.getByText('Werkt op elk apparaat')).toBeInTheDocument()
    expect(screen.getByText('Eén app voor alles')).toBeInTheDocument()
  })
})
