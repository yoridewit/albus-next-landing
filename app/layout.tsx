import type { Metadata } from 'next'
import { Inter, Public_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Albus Health — Chirurgisch Magazijnbeheer',
  description:
    'Albus Health digitaliseert uw OK-magazijn en logistieke processen. Klaarzetten, aanvullen en zoeken — in de cloud, op iOS, Android en web.',
  keywords: ['chirurgisch magazijn', 'OK logistiek', 'medisch voorraadbeheer', 'Albus Health'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body
        className={`${inter.variable} ${publicSans.variable} font-sans bg-background text-on-surface antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
