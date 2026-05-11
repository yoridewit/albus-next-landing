import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'

describe('Hero', () => {
  it('renders the main heading words', () => {
    render(<Hero />)
    expect(screen.getByText(/Klaarzetten/)).toBeInTheDocument()
    expect(screen.getByText(/Aanvullen/)).toBeInTheDocument()
    expect(screen.getByText(/Zoeken/)).toBeInTheDocument()
  })

  it('renders the primary CTA', () => {
    render(<Hero />)
    expect(screen.getByText('Vraag een demo aan')).toBeInTheDocument()
  })

  it('renders the secondary CTA', () => {
    render(<Hero />)
    expect(screen.getByText('Bekijk documentatie')).toBeInTheDocument()
  })

  it('renders the social proof badge', () => {
    render(<Hero />)
    expect(screen.getByText(/145/)).toBeInTheDocument()
  })
})
