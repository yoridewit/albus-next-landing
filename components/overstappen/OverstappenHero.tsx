import CtaButton from '@/components/overstappen/CtaButton'

export default function OverstappenHero() {
  return (
    <section className="flex items-center bg-inverse-surface relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(30,44,216,0.18) 0%, rgba(98,86,145,0.10) 50%, rgba(42,47,72,0.97) 100%)',
        }}
      />
      <div className="relative max-w-container mx-auto px-6 py-24 w-full text-center">
        <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full border border-inverse-on-surface/20 text-inverse-on-surface/60 mb-6">
          Binnenkort de nieuwe Albus
        </span>
        <h1 className="font-heading text-5xl font-bold text-inverse-on-surface leading-tight mb-6">
          Albus Next komt eraan
        </h1>
        <p className="text-inverse-on-surface/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Na de zomer stappen we over van de app naar Albus Next — de nieuwe webapp. Je kunt
          er nu vast in kijken en wennen aan de nieuwe Albus.
        </p>
        <CtaButton variant="inverse" href="#eerste-keer-inloggen" />
      </div>
    </section>
  )
}
