const socialLinks = [{ label: 'LinkedIn', href: 'https://linkedin.com/company/albus-health' }]

export default function Footer() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface py-16">
      <div className="max-w-container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <p className="font-heading font-bold text-xl mb-3">Albus Health</p>
            <p className="text-inverse-on-surface/60 text-sm leading-relaxed max-w-xs">
              Intelligente logistiek voor de operatiekamer. Klaarzetten, aanvullen en zoeken.
            </p>
            <a
              href="mailto:info@albus-hc.com"
              className="block text-inverse-on-surface/60 text-sm mt-4 hover:text-inverse-on-surface transition-colors"
            >
              info@albus-hc.com
            </a>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-inverse-on-surface/50 mb-4">
              Socials
            </p>
            <ul className="space-y-3">
              {socialLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-inverse-on-surface/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-inverse-on-surface/40">
            © {new Date().getFullYear()} Albus Health. Alle rechten voorbehouden.
          </p>
          <p className="text-xs text-inverse-on-surface/40">Gebouwd voor de OK.</p>
        </div>
      </div>
    </footer>
  )
}
