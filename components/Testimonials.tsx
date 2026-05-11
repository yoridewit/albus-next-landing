const testimonials = [
  {
    quote:
      'Handige app in gebruik. Overzichtelijk en ideaal om te zien in welke kast welk artikel ligt. Scheelt een hoop tijd en energie.',
    name: 'Ron',
    role: 'Anesthesiemedewerker',
  },
  {
    quote:
      'Ideale schaalbaarheid en gebruikersvriendelijke UI combineren technische meerwaarden zoals push meldingen en bijv. de automatisch op volgorde plaatsen van aangevraagde items. Prima produkt!',
    name: 'Jeroen V.',
    role: 'Anesthesiemedewerker',
  },
  {
    quote:
      'Super dat alle aanvul-lijsten nu op de goede volgorde binnenkomen. Ook krijg ik vanzelf een notificatie bij nieuwe orders - top!',
    name: 'Nico',
    role: 'Magazijnbeheerder',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-container mx-auto px-6">
        <h2 className="font-heading text-4xl font-semibold text-on-surface mb-12">
          Wat Gebruikers Zeggen
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role }) => (
            <div
              key={name}
              className="bg-surface rounded-lg p-8 shadow-card border border-outline-variant/50 flex flex-col"
            >
              <p className="text-on-surface text-lg leading-relaxed italic flex-1">"{quote}"</p>
              <div className="mt-6 pt-6 border-t border-outline-variant/30">
                <p className="font-semibold text-on-surface">{name}</p>
                <p className="text-on-surface-variant text-sm">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
