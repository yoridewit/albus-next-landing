import { render, screen } from '@testing-library/react'
import OverstappenPage, { metadata } from '@/app/overstappen/page'

describe('Overstappen page', () => {
  it('renders the hero and closing CTA', () => {
    render(<OverstappenPage />)
    expect(screen.getByRole('heading', { name: /Albus Next komt eraan/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Klaar om te beginnen/i })).toBeInTheDocument()
  })

  it('renders all main section headings', () => {
    render(<OverstappenPage />)
    expect(screen.getByRole('heading', { name: /Waarom Albus Next/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Nieuw in Albus Next/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /testomgeving staat klaar/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Wat blijft hetzelfde/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Zo log je de eerste keer in/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Laat ons weten wat je vindt/i })).toBeInTheDocument()
  })

  it('is excluded from search indexing', () => {
    expect(metadata.robots).toMatchObject({ index: false })
  })
})
