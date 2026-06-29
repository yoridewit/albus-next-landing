import CtaButton from '@/components/overstappen/CtaButton'

export default function AfsluitendeCta() {
  return (
    <section className="py-24 bg-inverse-surface relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(30,44,216,0.18) 0%, rgba(98,86,145,0.10) 50%, rgba(42,47,72,0.97) 100%)',
        }}
      />
      <div className="relative max-w-container mx-auto px-6 text-center">
        <h2 className="font-heading text-4xl font-bold text-inverse-on-surface mb-4">
          Klaar om te beginnen?
        </h2>
        <p className="text-inverse-on-surface/70 text-lg mb-10 max-w-xl mx-auto">
          Test Albus Next nu alvast, zodat je er straks helemaal klaar voor bent.
        </p>
        <CtaButton variant="inverse" />
      </div>
    </section>
  )
}
