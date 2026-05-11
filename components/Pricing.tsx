import { Check } from 'lucide-react'

const monthlyFeatures = ['Volledige toegang', 'Maandelijks opzegbaar', 'Geen gebruikerslimiet']
const annualFeatures = ['Volledige toegang', 'Twee maanden korting', 'Geen gebruikerslimiet']

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-surface">
      <div className="max-w-container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-semibold text-on-surface mb-4">
            Transparante Prijzen
          </h2>
          <p className="text-on-surface-variant text-lg">
            Geen verborgen kosten, altijd onbeperkt gebruikers. Eenvoudig opzegbaar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Monthly */}
          <div className="bg-surface rounded-lg p-8 border border-outline-variant shadow-card">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-4">
              Maandbijdrage
            </p>
            <div className="flex items-end gap-1 mb-2">
              <span className="font-heading text-5xl font-bold text-on-surface">€295</span>
              <span className="text-on-surface-variant mb-2">/maand (excl)</span>
            </div>
            <ul className="space-y-3 mb-8 mt-8">
              {monthlyFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary-container flex-shrink-0" />
                  <span className="text-sm text-on-surface">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="block text-center px-6 py-3 border border-primary-container text-primary-container font-semibold rounded-lg hover:bg-primary-container/5 transition-colors"
            >
              Klinkt goed!
            </a>
          </div>

          {/* Annual — highlighted */}
          <div className="bg-primary-container rounded-lg p-8 shadow-float relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary-container text-on-surface text-xs font-bold px-4 py-1 rounded-full tracking-widest">
              POPULAIR
            </span>
            <p className="text-xs font-semibold text-on-primary/70 uppercase tracking-widest mb-4">
              Jaarbijdrage
            </p>
            <div className="flex items-end gap-1 mb-2">
              <span className="font-heading text-5xl font-bold text-on-primary">€2.950</span>
              <span className="text-on-primary/70 mb-2">/jaar (excl)</span>
            </div>
            <ul className="space-y-3 mb-8 mt-8">
              {annualFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-on-primary flex-shrink-0" />
                  <span className="text-sm text-on-primary">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="block text-center px-6 py-3 bg-on-primary text-primary-container font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Klinkt goed!
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
