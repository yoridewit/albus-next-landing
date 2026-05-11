export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-surface/90 border-b border-outline-variant">
      <div className="max-w-container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="font-heading font-bold text-xl text-on-surface tracking-tight">
          Albus Health
        </a>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Solutions', href: '#solutions' },
            { label: 'Warehouse', href: '#warehouse' },
            { label: 'Surgical', href: '#surgical' },
            { label: 'About', href: '#about' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="https://app.albus-hc.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 bg-primary-container text-on-primary text-sm font-semibold rounded-full hover:opacity-90 transition-opacity"
        >
          Dashboard
        </a>
      </div>
    </nav>
  )
}
