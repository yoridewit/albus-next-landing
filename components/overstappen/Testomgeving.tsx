import { FlaskConical, TriangleAlert } from 'lucide-react'

export default function Testomgeving() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-container mx-auto px-6 max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary-container/10 rounded-md flex items-center justify-center">
            <FlaskConical className="w-6 h-6 text-primary-container" />
          </div>
          <h2 className="font-heading text-4xl font-semibold text-on-surface">
            De testomgeving staat klaar
          </h2>
        </div>
        <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
          Je kunt Albus Next nu al verkennen. De testomgeving is gevuld met recente data
          (mogelijk niet de allernieuwste), zodat alles vertrouwd aanvoelt terwijl je oefent.
        </p>
        <div className="bg-surface-container-low border border-outline-variant/50 rounded-lg p-6 flex gap-4">
          <TriangleAlert className="w-6 h-6 text-secondary shrink-0 mt-1" />
          <div>
            <h3 className="font-heading text-lg font-semibold text-on-surface mb-2">
              Goed om te weten
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              Dit is een testomgeving om vrij te verkennen en oefenen. De data kan gereset
              worden, dus voer hier geen echte productie-acties uit. Experimenteer gerust —
              je kunt niets stukmaken.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
