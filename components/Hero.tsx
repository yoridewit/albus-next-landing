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
          <p className="text-inverse-on-surface/70 text-lg leading-relaxed mb-10 max-w-md">
            Albus Health digitaliseert uw OK-magazijn en logistieke processen, verhoogt de
            efficiëntie, versnelt de hulpverlening en geeft uw medisch personeel de tijd voor wat
            ze echt willen zijn: bij de patiënt.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="px-6 py-3 bg-primary-container text-on-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Vraag een demo aan
            </a>
            <a
              href="https://albus-hc.gitbook.io"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-inverse-on-surface/30 text-inverse-on-surface font-semibold rounded-lg hover:bg-inverse-on-surface/10 transition-colors"
            >
              Bekijk documentatie
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-lg bg-surface/10 border border-inverse-on-surface/20 p-6 shadow-float aspect-video flex items-center justify-center">
            <span className="text-inverse-on-surface/30 text-sm">Dashboard preview</span>
          </div>
          <div className="absolute -top-4 -right-4 bg-primary-container text-on-primary px-4 py-2 rounded-full text-sm font-semibold shadow-float">
            +145 Afdelingen
          </div>
        </div>
      </div>
    </section>
  )
}
