'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Het systeem toont perfect de locaties van artikelen en bespaart ons enorm veel tijd. Eindelijk weten we altijd precies waar alles ligt.',
    name: 'S. de Vries',
    role: 'Anesthesiemedewerker',
    org: 'Logistiek Medewerker',
  },
  {
    quote:
      'De schaalbaarheid, de gebruikersinterface en de geautomatiseerde functies maken dit systeem onmisbaar voor ons team. Een echte tijdsbesparing.',
    name: 'M. Janssen',
    role: 'Anesthesiemedewerker',
    org: 'Verpleegkundig Specialist',
  },
  {
    quote:
      'De geoptimaliseerde volgorde van bestellingen en de automatische notificaties hebben ons magazijnproces volledig getransformeerd.',
    name: 'R. van den Berg',
    role: 'Magazijnbeheerder',
    org: 'OK Coördinator',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  const { quote, name, role, org } = testimonials[current]

  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-heading text-4xl font-semibold text-on-surface">
            Wat Gebruikers Zeggen
          </h2>
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Vorige testimonial"
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-on-surface-variant" />
            </button>
            <button
              onClick={next}
              aria-label="Volgende testimonial"
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-on-surface-variant" />
            </button>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-10 shadow-card border border-outline-variant/50 max-w-3xl">
          <p className="text-on-surface text-xl leading-relaxed mb-8 italic">"{quote}"</p>
          <div>
            <p className="font-semibold text-on-surface">{name}</p>
            <p className="text-on-surface-variant text-sm">
              {role} — {org}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === current ? 'bg-primary-container' : 'bg-outline-variant'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
