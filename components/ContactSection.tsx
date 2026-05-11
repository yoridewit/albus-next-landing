import ContactForm from './ContactForm'

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-inverse-surface">
      <div className="max-w-container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-heading text-4xl font-semibold text-inverse-on-surface mb-6">
              Is je interesse gewekt?
            </h2>
            <p className="text-inverse-on-surface/70 text-lg leading-relaxed mb-6">
              Neem contact met ons op voor een vrijblijvende demonstratie of stel uw vragen. We
              denken graag mee over hoe Albus uw processen kan verbeteren.
            </p>
            <a
              href="mailto:info@albus-hc.com"
              className="text-inverse-on-surface/60 hover:text-inverse-on-surface transition-colors text-sm"
            >
              info@albus-hc.com
            </a>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
