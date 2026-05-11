import { render, screen } from '@testing-library/react'
import ContactForm from '@/components/ContactForm'

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />)
    expect(screen.getByPlaceholderText('Uw naam')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('uw@email.nl')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Ziekenhuisnaam of organisatie')).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<ContactForm />)
    expect(screen.getByRole('button', { name: /verder gaan/i })).toBeInTheDocument()
  })
})
