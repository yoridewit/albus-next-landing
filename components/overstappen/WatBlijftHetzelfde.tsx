import { Check } from 'lucide-react'

const punten = [
  'Je vertrouwde workflows blijven hetzelfde — aanvullen, klaarzetten en zoeken werken zoals je gewend bent.',
  'Je hoeft geen nieuw account aan te maken: je bestaande e-mailadres werkt gewoon.',
  'De oude app blijft beschikbaar totdat iedereen is overgestapt. Daarna wordt die uitgezet — je hebt dus rustig de tijd.',
]

export default function WatBlijftHetzelfde() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-container mx-auto px-6 max-w-3xl">
        <h2 className="font-heading text-4xl font-semibold text-on-surface mb-4 text-center">
          Wat blijft hetzelfde?
        </h2>
        <p className="text-on-surface-variant text-lg text-center mb-12">
          De overstap hoeft niet spannend te zijn. Het meeste herken je meteen.
        </p>
        <ul className="space-y-4">
          {punten.map((punt) => (
            <li key={punt} className="flex gap-4 items-start">
              <span className="w-7 h-7 bg-primary-container/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-primary-container" />
              </span>
              <p className="text-on-surface-variant leading-relaxed">{punt}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
