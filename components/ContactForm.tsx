'use client'

import { useState, FormEvent } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [naam, setNaam] = useState('')
  const [email, setEmail] = useState('')
  const [organisatie, setOrganisatie] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ naam, email, organisatie }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setNaam('')
      setEmail('')
      setOrganisatie('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-inverse-on-surface text-lg font-semibold py-8">
        Bedankt! We nemen zo snel mogelijk contact met u op.
      </p>
    )
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-inverse-on-surface/10 border border-inverse-on-surface/20 text-inverse-on-surface placeholder-inverse-on-surface/40 focus:outline-none focus:border-primary-container transition-colors'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Uw naam"
        value={naam}
        onChange={(e) => setNaam(e.target.value)}
        required
        className={inputClass}
      />
      <input
        type="email"
        placeholder="uw@email.nl"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={inputClass}
      />
      <input
        type="text"
        placeholder="Ziekenhuisnaam of organisatie"
        value={organisatie}
        onChange={(e) => setOrganisatie(e.target.value)}
        required
        className={inputClass}
      />
      {status === 'error' && (
        <p className="text-error text-sm">Er is iets misgegaan. Probeer het opnieuw.</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3 bg-primary-container text-on-primary font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === 'loading' ? 'Versturen...' : 'Verder Gaan'}
      </button>
    </form>
  )
}
