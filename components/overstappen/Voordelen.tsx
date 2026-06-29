import { RefreshCw, Store, Laptop, LayoutGrid } from 'lucide-react'

const voordelen = [
  {
    icon: RefreshCw,
    title: 'Altijd de nieuwste versie',
    body: 'Updates worden automatisch doorgevoerd. Je gebruikt altijd de nieuwste versie, zonder handmatig bij te werken.',
  },
  {
    icon: Store,
    title: 'Geen App Store nodig',
    body: 'Geen downloads of updates via de App Store of Google Play. Je opent Albus Next gewoon in de browser.',
  },
  {
    icon: Laptop,
    title: 'Werkt op elk apparaat',
    body: 'Telefoon, tablet of computer met een moderne browser — Albus Next werkt overal hetzelfde.',
  },
  {
    icon: LayoutGrid,
    title: 'Eén app voor alles',
    body: 'Aanvullen, klaarzetten en beheren komen samen in één webapp, in plaats van losse apps.',
  },
]

export default function Voordelen() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-semibold text-on-surface mb-4">
            Waarom Albus Next?
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            Albus is vernieuwd: van een iOS- en Android-app naar een snelle, moderne webapp.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {voordelen.map(({ icon: Icon, title, body }) => (
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
