import { Download, Apple, Smartphone } from 'lucide-react'

const PDF_PATH = '/Albus Next — Installatiegids.pdf'

const inlogStappen = [
  { stap: '1', tekst: 'Ga naar www.albusnext.nl.' },
  { stap: '2', tekst: 'Klik op "Wachtwoord vergeten".' },
  { stap: '3', tekst: 'Voer je bestaande e-mailadres in (je account bestaat al).' },
  { stap: '4', tekst: 'Stel een nieuw wachtwoord in via de link die je per e-mail ontvangt.' },
]

const iphoneStappen = [
  'Open de pagina in Safari (Chrome werkt hiervoor niet op iPhone).',
  'Tik op het deel-icoon (vierkant met pijl omhoog).',
  'Tik op "Zet op beginscherm" en bevestig met "Voeg toe".',
]

const androidStappen = [
  'Open de pagina in Chrome of Samsung Internet.',
  'Tik op het menu (drie puntjes rechtsboven).',
  'Kies "Toevoegen aan startscherm" en bevestig met "Toevoegen".',
]

export default function EersteKeerInloggen() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-container mx-auto px-6 max-w-3xl">
        <h2 className="font-heading text-4xl font-semibold text-on-surface mb-4 text-center">
          Zo log je de eerste keer in
        </h2>
        <p className="text-on-surface-variant text-lg text-center mb-12">
          Albus Next heeft een eigen inlogsysteem. Je account is al aangemaakt op basis van je
          bestaande e-mailadres — je hoeft geen nieuw account te maken.
        </p>

        <ol className="space-y-4 mb-12">
          {inlogStappen.map(({ stap, tekst }) => (
            <li key={stap} className="flex gap-4 items-start">
              <span className="w-8 h-8 bg-primary-container text-on-primary rounded-full flex items-center justify-center shrink-0 font-semibold text-sm">
                {stap}
              </span>
              <p className="text-on-surface-variant leading-relaxed pt-1">{tekst}</p>
            </li>
          ))}
        </ol>

        <h3 className="font-heading text-2xl font-semibold text-on-surface mb-2 text-center">
          Zet Albus op je beginscherm (optioneel)
        </h3>
        <p className="text-on-surface-variant text-center mb-8 max-w-xl mx-auto">
          Zo werkt Albus Next net als een echte app. Let op: notificaties werken alleen als je
          Albus op je beginscherm zet.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-surface-container-low border border-outline-variant/50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Apple className="w-5 h-5 text-on-surface" />
              <h4 className="font-heading text-lg font-semibold text-on-surface">iPhone (Safari)</h4>
            </div>
            <ul className="space-y-2 text-on-surface-variant leading-relaxed list-disc pl-5">
              {iphoneStappen.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="bg-surface-container-low border border-outline-variant/50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-5 h-5 text-on-surface" />
              <h4 className="font-heading text-lg font-semibold text-on-surface">Android (Chrome)</h4>
            </div>
            <ul className="space-y-2 text-on-surface-variant leading-relaxed list-disc pl-5">
              {androidStappen.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <a
            href={PDF_PATH}
            download
            className="inline-flex items-center gap-2 px-6 py-3 border border-outline-variant text-on-surface font-semibold rounded-lg hover:bg-surface-container-low transition-colors"
          >
            <Download className="w-5 h-5" />
            Download de installatiegids (PDF)
          </a>
        </div>
      </div>
    </section>
  )
}
