import { MessageSquare } from 'lucide-react'

const CONTACT_EMAIL = 'info@albus-hc.com'

export default function FeedbackContact() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-container mx-auto px-6 max-w-3xl text-center">
        <div className="w-12 h-12 bg-primary-container/10 rounded-md flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="w-6 h-6 text-primary-container" />
        </div>
        <h2 className="font-heading text-4xl font-semibold text-on-surface mb-4">
          Laat ons weten wat je vindt
        </h2>
        <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
          Loop je tegen iets aan tijdens het testen, of heb je een idee? Je feedback helpt ons
          Albus Next beter te maken vóór de overstap. Neem contact op met je Albus-beheer of mail
          ons rechtstreeks.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-primary-container font-semibold hover:underline text-lg"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </section>
  )
}
