import { Archive, Smartphone, Route, Scissors, Wallet } from 'lucide-react'

const features = [
  {
    icon: Archive,
    title: 'Digitaliseer je magazijn met gemak',
    body: 'Intuïtief design. Ontworpen voor alledaags gebruik. Synchroniseert alle veranderingen direct met alle gebruikers.',
  },
  {
    icon: Smartphone,
    title: 'Vul je aanvul-lijst in, Digitaal met de App',
    body: 'En laat je collega\'s gelijk weten dat je klaar bent.',
  },
  {
    icon: Route,
    title: 'Vul sneller aan door een optimale looproute',
    body: 'Albus zet de volgorde van de aanvrager digitaal om in een optimale looproute voor de aanvullende collega. Zo hoef je nooit meer onnodig heen en weer te lopen.',
  },
  {
    icon: Scissors,
    title: 'Maak ingrepen aan, Zet klaar via de app',
    body: 'Maak gebruik van de handige looproute systematiek en het handige dashboard waar je het gehele programma kan voorbereiden en overzien.',
  },
  {
    icon: Wallet,
    title: 'Betaalbaar door slank te blijven',
    body: "Albus staat los van EPD's, lokale ICT systemen en landelijke registratiebronnen. Hierdoor blijft de overhead laag - en de prijs dus ook.",
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
