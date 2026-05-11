import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-surface/90 border-b border-outline-variant">
      <div className="max-w-container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-heading font-bold text-xl text-on-surface tracking-tight">
          <Image src="/logo.png" alt="Albus logo" width={28} height={28} className="object-contain" />
          Albus<span className="text-primary-container">Next</span>
        </a>

        <a
          href="#contact"
          className="px-5 py-2 bg-primary-container text-on-primary text-sm font-semibold rounded-full hover:opacity-90 transition-opacity"
        >
          Contact
        </a>
      </div>
    </nav>
  )
}
