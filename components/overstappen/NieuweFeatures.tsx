import { Boxes, Zap, Search } from 'lucide-react'

const features = [
  {
    icon: Boxes,
    title: 'Eén unified webapp',
    body: 'Logistiek en magazijn, zorgpersoneel én beheer werken voortaan in dezelfde app — geen losse apps meer.',
  },
  {
    icon: Zap,
    title: 'Modernere, snellere interface',
    body: 'Een opnieuw opgebouwde interface die sneller en overzichtelijker werkt op elk scherm.',
  },
  {
    icon: Search,
    title: 'Slim zoeken',
    body: 'Je vindt artikelen ook als je de naam niet helemaal goed typt of je niet meer precies herinnert hoe iets heet.',
  },
]

export default function NieuweFeatures() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-semibold text-on-surface mb-4">
            Nieuw in Albus Next
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            De belangrijkste vernieuwingen die je gaat merken.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-surface-container-lowest rounded-lg p-8 shadow-card border border-outline-variant/50"
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
