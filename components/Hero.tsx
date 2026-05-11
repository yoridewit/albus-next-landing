export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16 bg-inverse-surface relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(30,44,216,0.18) 0%, rgba(98,86,145,0.10) 50%, rgba(42,47,72,0.97) 100%)',
        }}
      />

      <div className="relative max-w-container mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center w-full">
        <div>
          <h1 className="font-heading text-5xl font-bold text-inverse-on-surface leading-tight mb-6">
            Klaarzetten.<br />
            Aanvullen.<br />
            Zoeken.
          </h1>
          <p className="text-inverse-on-surface/70 text-lg leading-relaxed mb-6 max-w-md">
            Albus is een systeem waarbij je het aanvullen van de grijpvoorraad, én het klaarzetten
            van chirurgische ingrepen gemakkelijk digitaal kunt regelen.
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            {['Web', 'PWA'].map((p) => (
              <span
                key={p}
                className="text-xs font-semibold px-3 py-1 rounded-full border border-inverse-on-surface/20 text-inverse-on-surface/60"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="px-6 py-3 bg-primary-container text-on-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Vraag een demo aan
            </a>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-float aspect-video">
          <iframe
            src="https://www.youtube.com/embed/XzFLXxX0__s?autoplay=1&mute=1&loop=1&playlist=XzFLXxX0__s"
            title="Albus in actie"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  )
}
