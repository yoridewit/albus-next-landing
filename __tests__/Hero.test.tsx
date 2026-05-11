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

  it('renders platform badges', () => {
    render(<Hero />)
    expect(screen.getByText('Web')).toBeInTheDocument()
    expect(screen.getByText('PWA')).toBeInTheDocument()
  })

  it('renders the YouTube embed', () => {
    render(<Hero />)
    const iframe = document.querySelector('iframe')
    expect(iframe).toBeInTheDocument()
    expect(iframe?.src).toContain('youtube.com/embed')
  })
})
