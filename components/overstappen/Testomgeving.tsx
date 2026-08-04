import { Compass, TriangleAlert } from 'lucide-react'

export default function Testomgeving() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-container mx-auto px-6 max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary-container/10 rounded-md flex items-center justify-center">
            <Compass className="w-6 h-6 text-primary-container" />
          </div>
          <h2 className="font-heading text-4xl font-semibold text-on-surface">
            Je kunt nu vast verkennen
          </h2>
        </div>
        <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
          Je kunt Albus Next nu al bekijken. De data die je ziet kan verouderd zijn (mogelijk
          niet de allernieuwste), maar zo krijg je alvast een goed beeld van hoe alles werkt.
        </p>
        <div className="bg-surface-container-low border border-outline-variant/50 rounded-lg p-6 flex gap-4">
          <TriangleAlert className="w-6 h-6 text-secondary shrink-0 mt-1" />
          <div>
            <h3 className="font-heading text-lg font-semibold text-on-surface mb-2">
              Goed om te weten
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              De data kan verouderd zijn, dus wijzig of verplaats niet zomaar iets. Voer alleen
              acties uit die je ook echt bedoelt.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
