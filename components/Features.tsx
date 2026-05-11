import { Archive, Smartphone, Route, Scissors } from 'lucide-react'

const features = [
  {
    icon: Archive,
    title: 'Digitaliseer je magazijn met gemak',
    body: 'Breng de volledige structuur van uw magazijn in kaart. Elimineer Excel-versies en geef iedereen via de cloud real-time toegang tot de juiste locaties en voorraden.',
  },
  {
    icon: Smartphone,
    title: 'Vul je aanvullijst in. Digitaal met de App.',
    body: 'Beschikbaar op iOS, Android en als PWA. Medewerkers scannen en vullen aan via de app — altijd gesynchroniseerd met het web dashboard.',
  },
  {
    icon: Route,
    title: 'Vul sneller aan door de optimale looproute',
    body: 'Het systeem berekent automatisch de meest efficiënte route door het magazijn. Minder stappen, minder tijd, meer gedaan.',
  },
  {
    icon: Scissors,
    title: 'Maak ingrepen aan. Zet klaar voor de app.',
    body: 'Definieer chirurgische procedures met alle benodigde materialen. Personeel ziet exact wat ze nodig hebben, nog voor de ingreep begint.',
  },
]

export default function Features() {
  return (
    <section id="solutions" className="py-24 bg-surface">
      <div className="max-w-container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-semibold text-on-surface mb-4">
            Slimmer Werken op de OK
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            Een volledige suite van tools om elk aspect van de chirurgische logistiek te
            digitaliseren en optimaliseren.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-surface-container-low rounded-lg p-8 shadow-card border border-outline-variant/50 hover:shadow-float transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-container/10 rounded-md flex items-center justify-center mb-6">
                <Icon className="w-6 h-6 text-primary-container" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-on-surface mb-3">{title}</h3>
              <p className="text-on-surface-variant leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
