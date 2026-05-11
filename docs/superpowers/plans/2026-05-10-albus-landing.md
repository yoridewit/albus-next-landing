# Albus Health Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Albus Health marketing landing page as a production-ready Next.js 14 application matching the Google Stitch design, deployable to Vercel.

**Architecture:** Single-page application using Next.js 14 App Router. Static sections use Server Components. Interactive elements (Testimonials slider, ContactForm) use Client Components (`'use client'`). Tailwind CSS is configured with the full design token set from `DESIGN.md`. The contact form POSTs to `/api/contact` which sends email via Resend SDK.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS v3, Resend, lucide-react, Jest + @testing-library/react

---

## File Map

| File | Role |
|---|---|
| `tailwind.config.ts` | All design tokens from DESIGN.md |
| `app/globals.css` | Tailwind directives + base body styles |
| `app/layout.tsx` | HTML shell, Public Sans + Inter via next/font, SEO metadata |
| `app/page.tsx` | Composes all sections: Navbar → Hero → Features → Testimonials → Pricing → Contact → Footer |
| `components/Navbar.tsx` | Sticky nav: logo, links, Dashboard button |
| `components/Hero.tsx` | Dark full-height hero: heading, CTAs, floating badge |
| `components/Features.tsx` | Section heading + 2×2 feature card grid |
| `components/Testimonials.tsx` | Client: arrow-navigated testimonial slider (3 quotes) |
| `components/Pricing.tsx` | Two pricing cards (monthly €295 / annual €2950) |
| `components/ContactSection.tsx` | Dark section wrapper: heading + ContactForm side by side |
| `components/ContactForm.tsx` | Client: form (naam, email, organisatie) → POST /api/contact |
| `components/Footer.tsx` | Logo, Product/Company link columns, email, copyright |
| `app/api/contact/route.ts` | POST handler: validates fields, sends via Resend to info@albus-hc.com |
| `jest.config.ts` | Jest with next/jest adapter |
| `jest.setup.ts` | Imports @testing-library/jest-dom |
| `__tests__/Navbar.test.tsx` | Renders logo, nav links, Dashboard button |
| `__tests__/Hero.test.tsx` | Renders heading and CTAs |
| `__tests__/Features.test.tsx` | Renders section heading and all 4 feature titles |
| `__tests__/Testimonials.test.tsx` | Renders first quote, next arrow navigates to second |
| `__tests__/Pricing.test.tsx` | Renders both pricing amounts and POPULAIR badge |
| `__tests__/ContactForm.test.tsx` | Renders all form fields and submit button |
| `__tests__/Footer.test.tsx` | Renders brand, email, product and company links |
| `__tests__/api/contact.test.ts` | Returns 400 on missing fields, 200 on valid input (Resend mocked) |
| `.env.local` | `RESEND_API_KEY` — never committed |

---

### Task 1: Initialize Next.js project + testing infrastructure

**Files:**
- Create: all project files via create-next-app
- Create: `jest.config.ts`
- Create: `jest.setup.ts`

- [ ] **Step 1: Initialize Next.js project in the current directory**

Run in `C:\AlbusWarp\albus-next-landing`:

```powershell
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

If prompted "The directory contains files that could conflict — continue?" → answer **y**.
Accept all other defaults (TypeScript, ESLint, Tailwind, App Router: all Yes).

Expected: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `app/layout.tsx`, `app/page.tsx` created.

- [ ] **Step 2: Install runtime dependencies**

```powershell
npm install resend lucide-react
```

- [ ] **Step 3: Install testing dependencies**

```powershell
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @types/jest
```

- [ ] **Step 4: Create `jest.config.ts`**

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

- [ ] **Step 5: Create `jest.setup.ts`**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Add test scripts to `package.json`**

In `package.json`, inside `"scripts"`, add:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 7: Initialize git and commit**

```powershell
git init
git add .
git commit -m "init: create Next.js 14 project with Tailwind and Jest testing setup"
```

---

### Task 2: Configure Tailwind design tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e2cd8',
        'primary-container': '#3e4cef',
        'on-primary': '#ffffff',
        secondary: '#625691',
        'secondary-container': '#cabafe',
        'on-secondary': '#ffffff',
        surface: '#fbf8ff',
        'surface-dim': '#d4d8f9',
        'surface-container': '#ececff',
        'surface-container-low': '#f3f2ff',
        'surface-container-high': '#e5e7ff',
        'surface-container-highest': '#dde1ff',
        'on-surface': '#151a32',
        'on-surface-variant': '#454556',
        'inverse-surface': '#2a2f48',
        'inverse-on-surface': '#f0efff',
        outline: '#757687',
        'outline-variant': '#c5c5d8',
        error: '#ba1a1a',
        background: '#fbf8ff',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        heading: ['var(--font-public-sans)', 'Public Sans', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      maxWidth: {
        container: '1440px',
      },
      boxShadow: {
        card: '0 4px 16px rgba(62, 76, 239, 0.08)',
        float: '0 8px 32px rgba(62, 76, 239, 0.12)',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Replace `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    background-color: #fbf8ff;
    color: #151a32;
  }
}
```

- [ ] **Step 3: Verify build compiles cleanly**

```powershell
npm run build
```

Expected: Build succeeds with no CSS or TypeScript errors.

- [ ] **Step 4: Commit**

```powershell
git add tailwind.config.ts app/globals.css
git commit -m "style: configure Tailwind with full Albus design token system"
```

---

### Task 3: Layout, fonts, and metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

```typescript
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
```

- [ ] **Step 2: Verify build**

```powershell
npm run build
```

Expected: No errors.

- [ ] **Step 3: Commit**

```powershell
git add app/layout.tsx
git commit -m "feat: configure layout with Public Sans + Inter fonts and SEO metadata"
```

---

### Task 4: Navbar component

**Files:**
- Create: `components/Navbar.tsx`
- Create: `__tests__/Navbar.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/Navbar.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'

describe('Navbar', () => {
  it('renders the brand name', () => {
    render(<Navbar />)
    expect(screen.getByText('Albus Health')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('Solutions')).toBeInTheDocument()
    expect(screen.getByText('Warehouse')).toBeInTheDocument()
    expect(screen.getByText('Surgical')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders the Dashboard button', () => {
    render(<Navbar />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```powershell
npx jest __tests__/Navbar.test.tsx
```

Expected: FAIL — "Cannot find module '@/components/Navbar'"

- [ ] **Step 3: Create `components/Navbar.tsx`**

```tsx
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
```

- [ ] **Step 4: Run test to verify it passes**

```powershell
npx jest __tests__/Navbar.test.tsx
```

Expected: PASS — 3 tests pass.

- [ ] **Step 5: Commit**

```powershell
git add components/Navbar.tsx __tests__/Navbar.test.tsx
git commit -m "feat: add Navbar with logo, navigation links, and Dashboard button"
```

---

### Task 5: Hero section

**Files:**
- Create: `components/Hero.tsx`
- Create: `__tests__/Hero.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/Hero.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'

describe('Hero', () => {
  it('renders the main heading words', () => {
    render(<Hero />)
    expect(screen.getByText(/Klaarzetten/)).toBeInTheDocument()
    expect(screen.getByText(/Aanvullen/)).toBeInTheDocument()
    expect(screen.getByText(/Zoeken/)).toBeInTheDocument()
  })

  it('renders the primary CTA', () => {
    render(<Hero />)
    expect(screen.getByText('Vraag een demo aan')).toBeInTheDocument()
  })

  it('renders the secondary CTA', () => {
    render(<Hero />)
    expect(screen.getByText('Bekijk documentatie')).toBeInTheDocument()
  })

  it('renders the social proof badge', () => {
    render(<Hero />)
    expect(screen.getByText(/145/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```powershell
npx jest __tests__/Hero.test.tsx
```

Expected: FAIL — "Cannot find module '@/components/Hero'"

- [ ] **Step 3: Create `components/Hero.tsx`**

```tsx
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
          {/* Dashboard mockup placeholder — replace with a real screenshot in public/ */}
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
```

- [ ] **Step 4: Run test to verify it passes**

```powershell
npx jest __tests__/Hero.test.tsx
```

Expected: PASS — 4 tests pass.

- [ ] **Step 5: Commit**

```powershell
git add components/Hero.tsx __tests__/Hero.test.tsx
git commit -m "feat: add Hero section with heading, CTAs, and +145 badge"
```

---

### Task 6: Features section

**Files:**
- Create: `components/Features.tsx`
- Create: `__tests__/Features.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/Features.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Features from '@/components/Features'

describe('Features', () => {
  it('renders the section heading', () => {
    render(<Features />)
    expect(screen.getByText('Slimmer Werken op de OK')).toBeInTheDocument()
  })

  it('renders all four feature card titles', () => {
    render(<Features />)
    expect(screen.getByText('Digitaliseer je magazijn met gemak')).toBeInTheDocument()
    expect(screen.getByText(/aanvullijst/i)).toBeInTheDocument()
    expect(screen.getByText(/looproute/i)).toBeInTheDocument()
    expect(screen.getByText(/ingrepen/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```powershell
npx jest __tests__/Features.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Create `components/Features.tsx`**

```tsx
import { Archive, Smartphone, Route, Scissors } from 'lucide-react'

const features = [
  {
    icon: Archive,
    title: 'Digitaliseer je magazijn met gemak',
    body: 'Breng de volledige structuur van uw magazijn in kaart. Elimineer Excel-versies en geef iedereen via de cloud real-time toegang tot de juiste locaties en voorraden.',
  },
  {
    icon: Smartphone,
    title: 'Vul je aanvullijst in. Digitaal met de App.',
    body: 'Beschikbaar op iOS, Android en als PWA. Medewerkers scannen en vullen aan via de app — altijd gesynchroniseerd met het web dashboard.',
  },
  {
    icon: Route,
    title: 'Vul sneller aan door de optimale looproute',
    body: 'Het systeem berekent automatisch de meest efficiënte looproute door het magazijn. Minder stappen, minder tijd, meer gedaan.',
  },
  {
    icon: Scissors,
    title: 'Maak ingrepen aan. Zet klaar voor de app.',
    body: 'Definieer chirurgische procedures met alle benodigde materialen. Personeel ziet exact wat ze nodig hebben, nog voor de ingreep begint.',
  },
]

export default function Features() {
  return (
    <section id="solutions" className="py-24 bg-surface">
      <div className="max-w-container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-semibold text-on-surface mb-4">
            Slimmer Werken op de OK
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            Een volledige suite van tools om elk aspect van de chirurgische logistiek te
            digitaliseren en optimaliseren.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-surface-container-low rounded-lg p-8 shadow-card border border-outline-variant/50 hover:shadow-float transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-container/10 rounded-md flex items-center justify-center mb-6">
                <Icon className="w-6 h-6 text-primary-container" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-on-surface mb-3">{title}</h3>
              <p className="text-on-surface-variant leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```powershell
npx jest __tests__/Features.test.tsx
```

Expected: PASS

- [ ] **Step 5: Commit**

```powershell
git add components/Features.tsx __tests__/Features.test.tsx
git commit -m "feat: add Features section with four product capability cards"
```

---

### Task 7: Testimonials section

**Files:**
- Create: `components/Testimonials.tsx`
- Create: `__tests__/Testimonials.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/Testimonials.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Testimonials from '@/components/Testimonials'

describe('Testimonials', () => {
  it('renders the section heading', () => {
    render(<Testimonials />)
    expect(screen.getByText('Wat Gebruikers Zeggen')).toBeInTheDocument()
  })

  it('renders the first testimonial by default', () => {
    render(<Testimonials />)
    expect(screen.getByText(/locaties van artikelen/i)).toBeInTheDocument()
  })

  it('navigates to the next testimonial on arrow click', () => {
    render(<Testimonials />)
    fireEvent.click(screen.getByLabelText('Volgende testimonial'))
    expect(screen.getByText(/schaalbaarheid/i)).toBeInTheDocument()
  })

  it('wraps back to first testimonial from last', () => {
    render(<Testimonials />)
    fireEvent.click(screen.getByLabelText('Volgende testimonial'))
    fireEvent.click(screen.getByLabelText('Volgende testimonial'))
    fireEvent.click(screen.getByLabelText('Volgende testimonial'))
    expect(screen.getByText(/locaties van artikelen/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```powershell
npx jest __tests__/Testimonials.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Create `components/Testimonials.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Het systeem toont perfect de locaties van artikelen en bespaart ons enorm veel tijd. Eindelijk weten we altijd precies waar alles ligt.',
    name: 'S. de Vries',
    role: 'Anesthesiemedewerker',
    org: 'Logistiek Medewerker',
  },
  {
    quote:
      'De schaalbaarheid, de gebruikersinterface en de geautomatiseerde functies maken dit systeem onmisbaar voor ons team. Een echte tijdsbesparing.',
    name: 'M. Janssen',
    role: 'Anesthesiemedewerker',
    org: 'Verpleegkundig Specialist',
  },
  {
    quote:
      'De geoptimaliseerde volgorde van bestellingen en de automatische notificaties hebben ons magazijnproces volledig getransformeerd.',
    name: 'R. van den Berg',
    role: 'Magazijnbeheerder',
    org: 'OK Coördinator',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  const { quote, name, role, org } = testimonials[current]

  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-heading text-4xl font-semibold text-on-surface">
            Wat Gebruikers Zeggen
          </h2>
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Vorige testimonial"
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-on-surface-variant" />
            </button>
            <button
              onClick={next}
              aria-label="Volgende testimonial"
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-on-surface-variant" />
            </button>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-10 shadow-card border border-outline-variant/50 max-w-3xl">
          <p className="text-on-surface text-xl leading-relaxed mb-8 italic">"{quote}"</p>
          <div>
            <p className="font-semibold text-on-surface">{name}</p>
            <p className="text-on-surface-variant text-sm">
              {role} — {org}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === current ? 'bg-primary-container' : 'bg-outline-variant'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```powershell
npx jest __tests__/Testimonials.test.tsx
```

Expected: PASS — 4 tests pass.

- [ ] **Step 5: Commit**

```powershell
git add components/Testimonials.tsx __tests__/Testimonials.test.tsx
git commit -m "feat: add Testimonials slider with arrow navigation and dot indicators"
```

---

### Task 8: Pricing section

**Files:**
- Create: `components/Pricing.tsx`
- Create: `__tests__/Pricing.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/Pricing.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Pricing from '@/components/Pricing'

describe('Pricing', () => {
  it('renders the section heading', () => {
    render(<Pricing />)
    expect(screen.getByText('Transparante Prijzen')).toBeInTheDocument()
  })

  it('renders the monthly price', () => {
    render(<Pricing />)
    expect(screen.getByText('€295')).toBeInTheDocument()
  })

  it('renders the annual price', () => {
    render(<Pricing />)
    expect(screen.getByText('€2.950')).toBeInTheDocument()
  })

  it('renders the POPULAIR badge on the annual plan', () => {
    render(<Pricing />)
    expect(screen.getByText('POPULAIR')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```powershell
npx jest __tests__/Pricing.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Create `components/Pricing.tsx`**

```tsx
import { Check } from 'lucide-react'

const features = [
  'Onbeperkte toegang',
  'Onbeperkte gebruikers',
  'Real-time koppeling',
  'Geen EPD-afhankelijkheid',
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-surface">
      <div className="max-w-container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-semibold text-on-surface mb-4">
            Transparante Prijzen
          </h2>
          <p className="text-on-surface-variant text-lg">
            Geen verborgen kosten, altijd onbeperkt gebruikers. Eenvoudig opzegbaar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Monthly */}
          <div className="bg-surface rounded-lg p-8 border border-outline-variant shadow-card">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-4">
              Maandbijdrage
            </p>
            <div className="flex items-end gap-1 mb-2">
              <span className="font-heading text-5xl font-bold text-on-surface">€295</span>
              <span className="text-on-surface-variant mb-2">/maand</span>
            </div>
            <p className="text-sm text-on-surface-variant mb-8">Maandelijks opzegbaar</p>
            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary-container flex-shrink-0" />
                  <span className="text-sm text-on-surface">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="block text-center px-6 py-3 border border-primary-container text-primary-container font-semibold rounded-lg hover:bg-primary-container/5 transition-colors"
            >
              Start nu
            </a>
          </div>

          {/* Annual — highlighted */}
          <div className="bg-primary-container rounded-lg p-8 shadow-float relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary-container text-on-surface text-xs font-bold px-4 py-1 rounded-full tracking-widest">
              POPULAIR
            </span>
            <p className="text-xs font-semibold text-on-primary/70 uppercase tracking-widest mb-4">
              Jaarbijdrage
            </p>
            <div className="flex items-end gap-1 mb-2">
              <span className="font-heading text-5xl font-bold text-on-primary">€2.950</span>
              <span className="text-on-primary/70 mb-2">/jaar</span>
            </div>
            <p className="text-sm text-on-primary/70 mb-8">
              Twee maanden gratis t.o.v. maandelijks
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-on-primary flex-shrink-0" />
                  <span className="text-sm text-on-primary">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="block text-center px-6 py-3 bg-on-primary text-primary-container font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Start nu
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```powershell
npx jest __tests__/Pricing.test.tsx
```

Expected: PASS — 4 tests pass.

- [ ] **Step 5: Commit**

```powershell
git add components/Pricing.tsx __tests__/Pricing.test.tsx
git commit -m "feat: add Pricing section with monthly and annual plans"
```

---

### Task 9: ContactForm component

**Files:**
- Create: `components/ContactForm.tsx`
- Create: `__tests__/ContactForm.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/ContactForm.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import ContactForm from '@/components/ContactForm'

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />)
    expect(screen.getByPlaceholderText('Uw naam')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('uw@email.nl')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Ziekenhuisnaam of organisatie')).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<ContactForm />)
    expect(screen.getByRole('button', { name: /verder gaan/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```powershell
npx jest __tests__/ContactForm.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Create `components/ContactForm.tsx`**

```tsx
'use client'

import { useState, FormEvent } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [naam, setNaam] = useState('')
  const [email, setEmail] = useState('')
  const [organisatie, setOrganisatie] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ naam, email, organisatie }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setNaam('')
      setEmail('')
      setOrganisatie('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-inverse-on-surface text-lg font-semibold py-8">
        Bedankt! We nemen zo snel mogelijk contact met u op.
      </p>
    )
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-inverse-on-surface/10 border border-inverse-on-surface/20 text-inverse-on-surface placeholder-inverse-on-surface/40 focus:outline-none focus:border-primary-container transition-colors'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Uw naam"
        value={naam}
        onChange={(e) => setNaam(e.target.value)}
        required
        className={inputClass}
      />
      <input
        type="email"
        placeholder="uw@email.nl"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={inputClass}
      />
      <input
        type="text"
        placeholder="Ziekenhuisnaam of organisatie"
        value={organisatie}
        onChange={(e) => setOrganisatie(e.target.value)}
        required
        className={inputClass}
      />
      {status === 'error' && (
        <p className="text-error text-sm">Er is iets misgegaan. Probeer het opnieuw.</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3 bg-primary-container text-on-primary font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === 'loading' ? 'Versturen...' : 'Verder Gaan'}
      </button>
    </form>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```powershell
npx jest __tests__/ContactForm.test.tsx
```

Expected: PASS

- [ ] **Step 5: Commit**

```powershell
git add components/ContactForm.tsx __tests__/ContactForm.test.tsx
git commit -m "feat: add ContactForm with loading/success/error states"
```

---

### Task 10: Contact API route with Resend

**Files:**
- Create: `app/api/contact/route.ts`
- Create: `__tests__/api/contact.test.ts`
- Create: `.env.local`

- [ ] **Step 1: Write the failing test**

Create `__tests__/api/contact.test.ts`:

```typescript
import { POST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: 'mock-id' }, error: null }),
    },
  })),
}))

function makeRequest(body: object): NextRequest {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/contact', () => {
  it('returns 400 when naam is missing', async () => {
    const res = await POST(makeRequest({ email: 'test@test.com', organisatie: 'Test' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when email is missing', async () => {
    const res = await POST(makeRequest({ naam: 'Test', organisatie: 'Test' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when organisatie is missing', async () => {
    const res = await POST(makeRequest({ naam: 'Test', email: 'test@test.com' }))
    expect(res.status).toBe(400)
  })

  it('returns 200 with all valid fields', async () => {
    const res = await POST(
      makeRequest({ naam: 'Test', email: 'test@test.com', organisatie: 'Ziekenhuis' })
    )
    expect(res.status).toBe(200)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```powershell
npx jest __tests__/api/contact.test.ts
```

Expected: FAIL — "Cannot find module '@/app/api/contact/route'"

- [ ] **Step 3: Create `app/api/contact/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { naam, email, organisatie } = body

  if (!naam || !email || !organisatie) {
    return NextResponse.json({ error: 'Alle velden zijn verplicht' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Albus Health Website <noreply@albus-hc.com>',
    to: 'info@albus-hc.com',
    subject: `Nieuwe demo aanvraag van ${naam}`,
    html: `
      <h2>Nieuwe demo aanvraag</h2>
      <p><strong>Naam:</strong> ${naam}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Organisatie:</strong> ${organisatie}</p>
    `,
  })

  if (error) {
    return NextResponse.json({ error: 'E-mail versturen mislukt' }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
```

> **Note on Resend:** The `from` address must use a domain you have verified in your Resend dashboard. Log in at resend.com, add and verify `albus-hc.com` as a sending domain, then copy your API key.

- [ ] **Step 4: Run test to verify it passes**

```powershell
npx jest __tests__/api/contact.test.ts
```

Expected: PASS — 4 tests pass.

- [ ] **Step 5: Create `.env.local`**

Create `.env.local` in the project root (this file must NOT be committed):

```
RESEND_API_KEY=re_your_api_key_here
```

Verify `.gitignore` already contains `.env.local` (create-next-app adds it by default).

- [ ] **Step 6: Commit route only**

```powershell
git add app/api/contact/route.ts __tests__/api/contact.test.ts
git commit -m "feat: add /api/contact route with Resend email and input validation"
```

---

### Task 11: Footer component

**Files:**
- Create: `components/Footer.tsx`
- Create: `__tests__/Footer.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/Footer.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('renders the brand name', () => {
    render(<Footer />)
    expect(screen.getAllByText('Albus Health').length).toBeGreaterThan(0)
  })

  it('renders the contact email', () => {
    render(<Footer />)
    expect(screen.getByText('info@albus-hc.com')).toBeInTheDocument()
  })

  it('renders product links', () => {
    render(<Footer />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Documentatie')).toBeInTheDocument()
  })

  it('renders company links', () => {
    render(<Footer />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```powershell
npx jest __tests__/Footer.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Create `components/Footer.tsx`**

```tsx
const productLinks = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Dashboard', href: 'https://app.albus-hc.com' },
  { label: 'Warehouse', href: '#warehouse' },
  { label: 'Documentatie', href: 'https://albus-hc.gitbook.io' },
]

const companyLinks = [
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/albus-health' },
]

export default function Footer() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface py-16">
      <div className="max-w-container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
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
              Product
            </p>
            <ul className="space-y-3">
              {productLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-inverse-on-surface/50 mb-4">
              Company
            </p>
            <ul className="space-y-3">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
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
```

- [ ] **Step 4: Run test to verify it passes**

```powershell
npx jest __tests__/Footer.test.tsx
```

Expected: PASS

- [ ] **Step 5: Commit**

```powershell
git add components/Footer.tsx __tests__/Footer.test.tsx
git commit -m "feat: add Footer with brand info, link columns, email, and copyright"
```

---

### Task 12: ContactSection wrapper + assemble page.tsx

**Files:**
- Create: `components/ContactSection.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/ContactSection.tsx`**

```tsx
import ContactForm from './ContactForm'

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-inverse-surface">
      <div className="max-w-container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-heading text-4xl font-semibold text-inverse-on-surface mb-6">
              Is je interesse gewekt?
            </h2>
            <p className="text-inverse-on-surface/70 text-lg leading-relaxed mb-6">
              Neem contact met ons op voor een vrijblijvende demonstratie of stel uw vragen. We
              denken graag mee over hoe Albus uw processen kan verbeteren.
            </p>
            <a
              href="mailto:info@albus-hc.com"
              className="text-inverse-on-surface/60 hover:text-inverse-on-surface transition-colors text-sm"
            >
              info@albus-hc.com
            </a>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Replace `app/page.tsx`**

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Run all tests**

```powershell
npx jest
```

Expected: All tests pass (green).

- [ ] **Step 4: Start dev server and visually verify each section**

```powershell
npm run dev
```

Open http://localhost:3000 and verify:
- [ ] Navbar is sticky, visible, backdrop-blur active on scroll
- [ ] Hero: dark background, heading, two CTA buttons, "+145 Afdelingen" badge
- [ ] Features: four cards in 2×2 grid with icons
- [ ] Testimonials: quote visible, left/right arrows functional, dot indicators update
- [ ] Pricing: two cards side by side, annual card has indigo background + POPULAIR badge
- [ ] Contact: dark section, form inputs render and accept input
- [ ] Footer: all link columns visible, email clickable

- [ ] **Step 5: Commit**

```powershell
git add app/page.tsx components/ContactSection.tsx
git commit -m "feat: assemble complete Albus Health landing page with all sections"
```

---

### Task 13: Vercel deployment + custom domain

- [ ] **Step 1: Create GitHub repository and push**

```powershell
git remote add origin https://github.com/<your-username>/albus-next-landing.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Import to Vercel**

1. Go to https://vercel.com/new
2. Import the `albus-next-landing` repository
3. Vercel auto-detects Next.js — click **Deploy**
4. After deploy succeeds, go to **Settings → Environment Variables**
5. Add: Name = `RESEND_API_KEY`, Value = your API key from resend.com
6. Click **Redeploy** so the production build picks up the env var

- [ ] **Step 3: Get your Resend API key**

1. Go to https://resend.com → sign up or log in
2. Go to **Domains** → Add `albus-hc.com` → follow DNS verification steps
3. Go to **API Keys** → Create API Key → copy it
4. Paste into Vercel environment variable (Step 2)

- [ ] **Step 4: Connect custom domain in Vercel**

In Vercel → your project → **Settings → Domains**:
1. Add `albus-hc.com`
2. Follow the DNS instructions shown (typically: add an A record pointing to Vercel's IP, or change nameservers)
3. DNS propagation takes up to 48 hours

- [ ] **Step 5: Verify production**

Visit `https://albus-hc.com` and:
- [ ] Page loads correctly
- [ ] Submit the contact form with real data and verify email arrives at info@albus-hc.com
- [ ] Check on mobile (Chrome DevTools or real device) — layout should be responsive

---

## Self-Review

**Spec coverage:**
- Navbar with logo + links + Dashboard → Task 4 ✓
- Hero "Klaarzetten. Aanvullen. Zoeken." + CTAs + badge → Task 5 ✓
- Features 2×2 grid "Slimmer Werken op de OK" → Task 6 ✓
- Testimonials slider 3 quotes + arrows → Task 7 ✓
- Pricing €295/€2950 + POPULAIR badge → Task 8 ✓
- ContactForm client component → Task 9 ✓
- /api/contact with Resend → Task 10 ✓
- Footer with links + email + copyright → Task 11 ✓
- Tailwind design tokens from DESIGN.md → Task 2 ✓
- Public Sans + Inter fonts → Task 3 ✓
- Vercel + custom domain → Task 13 ✓

**Placeholder scan:** No TBD, no TODO, no "similar to above" — all steps include complete code. ✓

**Type consistency:**
- `ContactForm` default export → imported in `ContactSection` → imported in `page.tsx` ✓
- `POST` named export in `route.ts` → imported as `{ POST }` in test ✓
- All component names in `page.tsx` match their file names ✓
- `Status` type used only in `ContactForm.tsx` ✓
