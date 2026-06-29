# Overstappen-pagina Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bouw een standalone `/overstappen` pagina die vanuit de oude Albus-app via een CTA wordt geopend en gebruikers informeert over Albus Next, de testomgeving en de eerste keer inloggen.

**Architecture:** Eén app-router route `app/overstappen/page.tsx` die kleine, gefocuste section-componenten in `components/overstappen/` samenstelt. Geen marketing-navbar/pricing. Een gedeelde `CtaButton` houdt alle "Start met testen"-knoppen consistent. Visueel hergebruik van bestaande design-tokens en componentpatronen.

**Tech Stack:** Next.js (app router, afwijkende versie — zie AGENTS.md), React 19, TypeScript, Tailwind CSS v4 (`@theme` tokens in `app/globals.css`), `lucide-react` iconen, Jest + @testing-library/react.

---

## Vooraf lezen (eenmalig)

- `AGENTS.md` waarschuwt dat deze Next.js-versie afwijkt. Lees vóór het maken van de route en
  metadata kort de relevante guides in `node_modules/next/dist/docs/` (app-router pages,
  `Metadata`/`robots`). Schrijf pas code nadat je deprecation-notices hebt gecheckt.
- Bestaande patronen om te volgen: `components/Hero.tsx` (dark hero), `components/Features.tsx`
  (kaart-grid met lucide-iconen), `app/globals.css` (kleur/shadow-tokens), `__tests__/Hero.test.tsx`
  (teststijl).

## File Structure

- Create: `app/overstappen/page.tsx` — route + metadata (incl. `robots: noindex`), stelt secties samen.
- Create: `components/overstappen/CtaButton.tsx` — gedeelde "Start met testen"-knop.
- Create: `components/overstappen/OverstappenHero.tsx`
- Create: `components/overstappen/Voordelen.tsx`
- Create: `components/overstappen/NieuweFeatures.tsx`
- Create: `components/overstappen/Testomgeving.tsx`
- Create: `components/overstappen/WatBlijftHetzelfde.tsx`
- Create: `components/overstappen/EersteKeerInloggen.tsx`
- Create: `components/overstappen/FeedbackContact.tsx`
- Create: `components/overstappen/AfsluitendeCta.tsx`
- Create: `public/Albus Next — Installatiegids.pdf` (kopie van de PDF uit de repo-root van de map).
- Tests: `__tests__/overstappen/*.test.tsx` (één per component + één voor de page).

Constanten die in meerdere componenten terugkomen:
- CTA-URL: `https://www.albusnext.nl`
- PDF-pad: `/Albus Next — Installatiegids.pdf`
- Contact-e-mail: `info@albus-hc.com`

---

### Task 1: PDF beschikbaar maken + gedeelde CtaButton

**Files:**
- Create: `public/Albus Next — Installatiegids.pdf`
- Create: `components/overstappen/CtaButton.tsx`
- Test: `__tests__/overstappen/CtaButton.test.tsx`

- [ ] **Step 1: Kopieer de PDF naar `public/`**

Run (vanuit `albus-next-landing/`):
```bash
cp "Albus Next — Installatiegids.pdf" "public/Albus Next — Installatiegids.pdf"
```
Expected: bestand bestaat in `public/`. Verifieer: `ls -la "public/Albus Next — Installatiegids.pdf"`

- [ ] **Step 2: Schrijf de falende test**

```tsx
// __tests__/overstappen/CtaButton.test.tsx
import { render, screen } from '@testing-library/react'
import CtaButton from '@/components/overstappen/CtaButton'

describe('CtaButton', () => {
  it('renders default label linking to albusnext.nl', () => {
    render(<CtaButton />)
    const link = screen.getByRole('link', { name: 'Start met testen' })
    expect(link).toHaveAttribute('href', 'https://www.albusnext.nl')
  })

  it('accepts a custom label', () => {
    render(<CtaButton label="Ga naar Albus Next" />)
    expect(screen.getByRole('link', { name: 'Ga naar Albus Next' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run test, verifieer dat hij faalt**

Run: `npx jest __tests__/overstappen/CtaButton.test.tsx`
Expected: FAIL — module `@/components/overstappen/CtaButton` niet gevonden.

- [ ] **Step 4: Implementeer CtaButton**

```tsx
// components/overstappen/CtaButton.tsx
type CtaButtonProps = {
  label?: string
  variant?: 'primary' | 'inverse'
}

export const ALBUS_NEXT_URL = 'https://www.albusnext.nl'

export default function CtaButton({ label = 'Start met testen', variant = 'primary' }: CtaButtonProps) {
  const styles =
    variant === 'inverse'
      ? 'bg-inverse-on-surface text-on-surface hover:opacity-90'
      : 'bg-primary-container text-on-primary hover:opacity-90'
  return (
    <a
      href={ALBUS_NEXT_URL}
      className={`inline-block px-6 py-3 font-semibold rounded-lg transition-opacity ${styles}`}
    >
      {label}
    </a>
  )
}
```

- [ ] **Step 5: Run test, verifieer dat hij slaagt**

Run: `npx jest __tests__/overstappen/CtaButton.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add "public/Albus Next — Installatiegids.pdf" components/overstappen/CtaButton.tsx __tests__/overstappen/CtaButton.test.tsx
git commit -m "feat(overstappen): add shared CtaButton and public install guide PDF"
```

---

### Task 2: OverstappenHero

**Files:**
- Create: `components/overstappen/OverstappenHero.tsx`
- Test: `__tests__/overstappen/OverstappenHero.test.tsx`

- [ ] **Step 1: Schrijf de falende test**

```tsx
// __tests__/overstappen/OverstappenHero.test.tsx
import { render, screen } from '@testing-library/react'
import OverstappenHero from '@/components/overstappen/OverstappenHero'

describe('OverstappenHero', () => {
  it('renders the heading', () => {
    render(<OverstappenHero />)
    expect(screen.getByRole('heading', { name: /Albus Next komt eraan/i })).toBeInTheDocument()
  })

  it('mentions switching after the summer', () => {
    render(<OverstappenHero />)
    expect(screen.getByText(/na de zomer/i)).toBeInTheDocument()
  })

  it('renders the primary CTA', () => {
    render(<OverstappenHero />)
    expect(screen.getByRole('link', { name: 'Start met testen' })).toHaveAttribute('href', 'https://www.albusnext.nl')
  })
})
```

- [ ] **Step 2: Run test, verifieer dat hij faalt**

Run: `npx jest __tests__/overstappen/OverstappenHero.test.tsx`
Expected: FAIL — module niet gevonden.

- [ ] **Step 3: Implementeer OverstappenHero**

```tsx
// components/overstappen/OverstappenHero.tsx
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
          Na de zomer stappen we over van de app naar Albus Next — de nieuwe webapp. De
          testomgeving staat al klaar. Test nu alvast en wen aan de nieuwe Albus.
        </p>
        <CtaButton variant="inverse" />
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test, verifieer dat hij slaagt**

Run: `npx jest __tests__/overstappen/OverstappenHero.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add components/overstappen/OverstappenHero.tsx __tests__/overstappen/OverstappenHero.test.tsx
git commit -m "feat(overstappen): add hero section"
```

---

### Task 3: Voordelen

**Files:**
- Create: `components/overstappen/Voordelen.tsx`
- Test: `__tests__/overstappen/Voordelen.test.tsx`

- [ ] **Step 1: Schrijf de falende test**

```tsx
// __tests__/overstappen/Voordelen.test.tsx
import { render, screen } from '@testing-library/react'
import Voordelen from '@/components/overstappen/Voordelen'

describe('Voordelen', () => {
  it('renders the section heading', () => {
    render(<Voordelen />)
    expect(screen.getByRole('heading', { name: /Waarom Albus Next/i })).toBeInTheDocument()
  })

  it('renders all four benefit cards', () => {
    render(<Voordelen />)
    expect(screen.getByText('Altijd de nieuwste versie')).toBeInTheDocument()
    expect(screen.getByText('Geen App Store nodig')).toBeInTheDocument()
    expect(screen.getByText('Werkt op elk apparaat')).toBeInTheDocument()
    expect(screen.getByText('Eén app voor alles')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test, verifieer dat hij faalt**

Run: `npx jest __tests__/overstappen/Voordelen.test.tsx`
Expected: FAIL — module niet gevonden.

- [ ] **Step 3: Implementeer Voordelen**

```tsx
// components/overstappen/Voordelen.tsx
import { RefreshCw, Store, Laptop, LayoutGrid } from 'lucide-react'

const voordelen = [
  {
    icon: RefreshCw,
    title: 'Altijd de nieuwste versie',
    body: 'Updates worden automatisch doorgevoerd. Je gebruikt altijd de nieuwste versie, zonder handmatig bij te werken.',
  },
  {
    icon: Store,
    title: 'Geen App Store nodig',
    body: 'Geen downloads of updates via de App Store of Google Play. Je opent Albus Next gewoon in de browser.',
  },
  {
    icon: Laptop,
    title: 'Werkt op elk apparaat',
    body: 'Telefoon, tablet of computer met een moderne browser — Albus Next werkt overal hetzelfde.',
  },
  {
    icon: LayoutGrid,
    title: 'Eén app voor alles',
    body: 'Aanvullen, klaarzetten en beheren komen samen in één webapp, in plaats van losse apps.',
  },
]

export default function Voordelen() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-semibold text-on-surface mb-4">
            Waarom Albus Next?
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            Albus is vernieuwd: van een iOS- en Android-app naar een snelle, moderne webapp.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {voordelen.map(({ icon: Icon, title, body }) => (
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

- [ ] **Step 4: Run test, verifieer dat hij slaagt**

Run: `npx jest __tests__/overstappen/Voordelen.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add components/overstappen/Voordelen.tsx __tests__/overstappen/Voordelen.test.tsx
git commit -m "feat(overstappen): add voordelen section"
```

---

### Task 4: NieuweFeatures

**Files:**
- Create: `components/overstappen/NieuweFeatures.tsx`
- Test: `__tests__/overstappen/NieuweFeatures.test.tsx`

- [ ] **Step 1: Schrijf de falende test**

```tsx
// __tests__/overstappen/NieuweFeatures.test.tsx
import { render, screen } from '@testing-library/react'
import NieuweFeatures from '@/components/overstappen/NieuweFeatures'

describe('NieuweFeatures', () => {
  it('renders the section heading', () => {
    render(<NieuweFeatures />)
    expect(screen.getByRole('heading', { name: /Nieuw in Albus Next/i })).toBeInTheDocument()
  })

  it('renders the three feature highlights', () => {
    render(<NieuweFeatures />)
    expect(screen.getByText('Eén unified webapp')).toBeInTheDocument()
    expect(screen.getByText('Modernere, snellere interface')).toBeInTheDocument()
    expect(screen.getByText('Slimme voorraadhulp')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test, verifieer dat hij faalt**

Run: `npx jest __tests__/overstappen/NieuweFeatures.test.tsx`
Expected: FAIL — module niet gevonden.

- [ ] **Step 3: Implementeer NieuweFeatures**

```tsx
// components/overstappen/NieuweFeatures.tsx
import { Boxes, Zap, Brain } from 'lucide-react'

const features = [
  {
    icon: Boxes,
    title: 'Eén unified webapp',
    body: 'Logistiek en magazijn, zorgpersoneel én beheer werken voortaan in dezelfde app — geen losse apps meer.',
  },
  {
    icon: Zap,
    title: 'Modernere, snellere interface',
    body: 'Een opnieuw opgebouwde interface die sneller en overzichtelijker werkt op elk scherm.',
  },
  {
    icon: Brain,
    title: 'Slimme voorraadhulp',
    body: 'AI-ondersteunde suggesties helpen je sneller de juiste artikelen en aanvullingen te vinden.',
  },
]

export default function NieuweFeatures() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-semibold text-on-surface mb-4">
            Nieuw in Albus Next
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            De belangrijkste vernieuwingen die je gaat merken.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-surface-container-lowest rounded-lg p-8 shadow-card border border-outline-variant/50"
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

Let op: `bg-surface-container-lowest` (#ffffff) bestaat als token in DESIGN.md maar staat
mogelijk nog niet in `app/globals.css`. Als de class niet rendert, voeg
`--color-surface-container-lowest: #ffffff;` toe in het surface-blok van `app/globals.css`.

- [ ] **Step 4: Run test, verifieer dat hij slaagt**

Run: `npx jest __tests__/overstappen/NieuweFeatures.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add components/overstappen/NieuweFeatures.tsx __tests__/overstappen/NieuweFeatures.test.tsx app/globals.css
git commit -m "feat(overstappen): add nieuwe features section"
```

---

### Task 5: Testomgeving (met disclaimer)

**Files:**
- Create: `components/overstappen/Testomgeving.tsx`
- Test: `__tests__/overstappen/Testomgeving.test.tsx`

- [ ] **Step 1: Schrijf de falende test**

```tsx
// __tests__/overstappen/Testomgeving.test.tsx
import { render, screen } from '@testing-library/react'
import Testomgeving from '@/components/overstappen/Testomgeving'

describe('Testomgeving', () => {
  it('renders the heading', () => {
    render(<Testomgeving />)
    expect(screen.getByRole('heading', { name: /testomgeving staat klaar/i })).toBeInTheDocument()
  })

  it('mentions recent (not latest) data', () => {
    render(<Testomgeving />)
    expect(screen.getByText(/recente data/i)).toBeInTheDocument()
  })

  it('renders the disclaimer about resetting data', () => {
    render(<Testomgeving />)
    expect(screen.getByText(/kan gereset worden/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test, verifieer dat hij faalt**

Run: `npx jest __tests__/overstappen/Testomgeving.test.tsx`
Expected: FAIL — module niet gevonden.

- [ ] **Step 3: Implementeer Testomgeving**

```tsx
// components/overstappen/Testomgeving.tsx
import { FlaskConical, TriangleAlert } from 'lucide-react'

export default function Testomgeving() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-container mx-auto px-6 max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary-container/10 rounded-md flex items-center justify-center">
            <FlaskConical className="w-6 h-6 text-primary-container" />
          </div>
          <h2 className="font-heading text-4xl font-semibold text-on-surface">
            De testomgeving staat klaar
          </h2>
        </div>
        <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
          Je kunt Albus Next nu al verkennen. De testomgeving is gevuld met recente data
          (mogelijk niet de allernieuwste), zodat alles vertrouwd aanvoelt terwijl je oefent.
        </p>
        <div className="bg-surface-container-low border border-outline-variant/50 rounded-lg p-6 flex gap-4">
          <TriangleAlert className="w-6 h-6 text-secondary shrink-0 mt-1" />
          <div>
            <h3 className="font-heading text-lg font-semibold text-on-surface mb-2">
              Goed om te weten
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              Dit is een testomgeving om vrij te verkennen en oefenen. De data kan gereset
              worden, dus voer hier geen echte productie-acties uit. Experimenteer gerust —
              je kunt niets stukmaken.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test, verifieer dat hij slaagt**

Run: `npx jest __tests__/overstappen/Testomgeving.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add components/overstappen/Testomgeving.tsx __tests__/overstappen/Testomgeving.test.tsx
git commit -m "feat(overstappen): add testomgeving section with disclaimer"
```

---

### Task 6: WatBlijftHetzelfde

**Files:**
- Create: `components/overstappen/WatBlijftHetzelfde.tsx`
- Test: `__tests__/overstappen/WatBlijftHetzelfde.test.tsx`

- [ ] **Step 1: Schrijf de falende test**

```tsx
// __tests__/overstappen/WatBlijftHetzelfde.test.tsx
import { render, screen } from '@testing-library/react'
import WatBlijftHetzelfde from '@/components/overstappen/WatBlijftHetzelfde'

describe('WatBlijftHetzelfde', () => {
  it('renders the heading', () => {
    render(<WatBlijftHetzelfde />)
    expect(screen.getByRole('heading', { name: /Wat blijft hetzelfde/i })).toBeInTheDocument()
  })

  it('reassures that no new account is needed', () => {
    render(<WatBlijftHetzelfde />)
    expect(screen.getByText(/geen nieuw account/i)).toBeInTheDocument()
  })

  it('mentions the old app stays available until everyone has switched', () => {
    render(<WatBlijftHetzelfde />)
    expect(screen.getByText(/oude app blijft beschikbaar/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test, verifieer dat hij faalt**

Run: `npx jest __tests__/overstappen/WatBlijftHetzelfde.test.tsx`
Expected: FAIL — module niet gevonden.

- [ ] **Step 3: Implementeer WatBlijftHetzelfde**

```tsx
// components/overstappen/WatBlijftHetzelfde.tsx
import { Check } from 'lucide-react'

const punten = [
  'Je vertrouwde workflows blijven hetzelfde — aanvullen, klaarzetten en zoeken werken zoals je gewend bent.',
  'Je hoeft geen nieuw account aan te maken: je bestaande e-mailadres werkt gewoon.',
  'De oude app blijft beschikbaar totdat iedereen is overgestapt. Daarna wordt die uitgezet — je hebt dus rustig de tijd.',
]

export default function WatBlijftHetzelfde() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-container mx-auto px-6 max-w-3xl">
        <h2 className="font-heading text-4xl font-semibold text-on-surface mb-4 text-center">
          Wat blijft hetzelfde?
        </h2>
        <p className="text-on-surface-variant text-lg text-center mb-12">
          De overstap hoeft niet spannend te zijn. Het meeste herken je meteen.
        </p>
        <ul className="space-y-4">
          {punten.map((punt) => (
            <li key={punt} className="flex gap-4 items-start">
              <span className="w-7 h-7 bg-primary-container/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-primary-container" />
              </span>
              <p className="text-on-surface-variant leading-relaxed">{punt}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test, verifieer dat hij slaagt**

Run: `npx jest __tests__/overstappen/WatBlijftHetzelfde.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add components/overstappen/WatBlijftHetzelfde.tsx __tests__/overstappen/WatBlijftHetzelfde.test.tsx
git commit -m "feat(overstappen): add wat-blijft-hetzelfde section"
```

---

### Task 7: EersteKeerInloggen (inline gids + PDF-download)

**Files:**
- Create: `components/overstappen/EersteKeerInloggen.tsx`
- Test: `__tests__/overstappen/EersteKeerInloggen.test.tsx`

- [ ] **Step 1: Schrijf de falende test**

```tsx
// __tests__/overstappen/EersteKeerInloggen.test.tsx
import { render, screen } from '@testing-library/react'
import EersteKeerInloggen from '@/components/overstappen/EersteKeerInloggen'

describe('EersteKeerInloggen', () => {
  it('renders the heading', () => {
    render(<EersteKeerInloggen />)
    expect(screen.getByRole('heading', { name: /Zo log je de eerste keer in/i })).toBeInTheDocument()
  })

  it('explains the wachtwoord-vergeten step', () => {
    render(<EersteKeerInloggen />)
    expect(screen.getByText(/Wachtwoord vergeten/i)).toBeInTheDocument()
  })

  it('renders a download link to the PDF guide', () => {
    render(<EersteKeerInloggen />)
    const link = screen.getByRole('link', { name: /installatiegids/i })
    expect(link).toHaveAttribute('href', '/Albus Next — Installatiegids.pdf')
  })
})
```

- [ ] **Step 2: Run test, verifieer dat hij faalt**

Run: `npx jest __tests__/overstappen/EersteKeerInloggen.test.tsx`
Expected: FAIL — module niet gevonden.

- [ ] **Step 3: Implementeer EersteKeerInloggen**

```tsx
// components/overstappen/EersteKeerInloggen.tsx
import { Download, Apple, Smartphone } from 'lucide-react'

const PDF_PATH = '/Albus Next — Installatiegids.pdf'

const inlogStappen = [
  { stap: '1', tekst: 'Ga naar www.albusnext.nl.' },
  { stap: '2', tekst: 'Klik op "Wachtwoord vergeten".' },
  { stap: '3', tekst: 'Voer je bestaande e-mailadres in (je account bestaat al).' },
  { stap: '4', tekst: 'Stel een nieuw wachtwoord in via de link die je per e-mail ontvangt.' },
]

const iphoneStappen = [
  'Open de pagina in Safari (Chrome werkt hiervoor niet op iPhone).',
  'Tik op het deel-icoon (vierkant met pijl omhoog).',
  'Tik op "Zet op beginscherm" en bevestig met "Voeg toe".',
]

const androidStappen = [
  'Open de pagina in Chrome of Samsung Internet.',
  'Tik op het menu (drie puntjes rechtsboven).',
  'Kies "Toevoegen aan startscherm" en bevestig met "Toevoegen".',
]

export default function EersteKeerInloggen() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-container mx-auto px-6 max-w-3xl">
        <h2 className="font-heading text-4xl font-semibold text-on-surface mb-4 text-center">
          Zo log je de eerste keer in
        </h2>
        <p className="text-on-surface-variant text-lg text-center mb-12">
          Albus Next heeft een eigen inlogsysteem. Je account is al aangemaakt op basis van je
          bestaande e-mailadres — je hoeft geen nieuw account te maken.
        </p>

        <ol className="space-y-4 mb-12">
          {inlogStappen.map(({ stap, tekst }) => (
            <li key={stap} className="flex gap-4 items-start">
              <span className="w-8 h-8 bg-primary-container text-on-primary rounded-full flex items-center justify-center shrink-0 font-semibold text-sm">
                {stap}
              </span>
              <p className="text-on-surface-variant leading-relaxed pt-1">{tekst}</p>
            </li>
          ))}
        </ol>

        <h3 className="font-heading text-2xl font-semibold text-on-surface mb-2 text-center">
          Zet Albus op je beginscherm (optioneel)
        </h3>
        <p className="text-on-surface-variant text-center mb-8 max-w-xl mx-auto">
          Zo werkt Albus Next net als een echte app. Let op: notificaties werken alleen als je
          Albus op je beginscherm zet.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-surface-container-low border border-outline-variant/50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Apple className="w-5 h-5 text-on-surface" />
              <h4 className="font-heading text-lg font-semibold text-on-surface">iPhone (Safari)</h4>
            </div>
            <ul className="space-y-2 text-on-surface-variant leading-relaxed list-disc pl-5">
              {iphoneStappen.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="bg-surface-container-low border border-outline-variant/50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-5 h-5 text-on-surface" />
              <h4 className="font-heading text-lg font-semibold text-on-surface">Android (Chrome)</h4>
            </div>
            <ul className="space-y-2 text-on-surface-variant leading-relaxed list-disc pl-5">
              {androidStappen.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <a
            href={PDF_PATH}
            download
            className="inline-flex items-center gap-2 px-6 py-3 border border-outline-variant text-on-surface font-semibold rounded-lg hover:bg-surface-container-low transition-colors"
          >
            <Download className="w-5 h-5" />
            Download de installatiegids (PDF)
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test, verifieer dat hij slaagt**

Run: `npx jest __tests__/overstappen/EersteKeerInloggen.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add components/overstappen/EersteKeerInloggen.tsx __tests__/overstappen/EersteKeerInloggen.test.tsx
git commit -m "feat(overstappen): add eerste-keer-inloggen section with inline guide and PDF download"
```

---

### Task 8: FeedbackContact

**Files:**
- Create: `components/overstappen/FeedbackContact.tsx`
- Test: `__tests__/overstappen/FeedbackContact.test.tsx`

- [ ] **Step 1: Schrijf de falende test**

```tsx
// __tests__/overstappen/FeedbackContact.test.tsx
import { render, screen } from '@testing-library/react'
import FeedbackContact from '@/components/overstappen/FeedbackContact'

describe('FeedbackContact', () => {
  it('renders the heading', () => {
    render(<FeedbackContact />)
    expect(screen.getByRole('heading', { name: /Laat ons weten wat je vindt/i })).toBeInTheDocument()
  })

  it('renders a mailto link to the contact address', () => {
    render(<FeedbackContact />)
    const link = screen.getByRole('link', { name: /info@albus-hc.com/i })
    expect(link).toHaveAttribute('href', 'mailto:info@albus-hc.com')
  })
})
```

- [ ] **Step 2: Run test, verifieer dat hij faalt**

Run: `npx jest __tests__/overstappen/FeedbackContact.test.tsx`
Expected: FAIL — module niet gevonden.

- [ ] **Step 3: Implementeer FeedbackContact**

```tsx
// components/overstappen/FeedbackContact.tsx
import { MessageSquare } from 'lucide-react'

const CONTACT_EMAIL = 'info@albus-hc.com'

export default function FeedbackContact() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-container mx-auto px-6 max-w-3xl text-center">
        <div className="w-12 h-12 bg-primary-container/10 rounded-md flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="w-6 h-6 text-primary-container" />
        </div>
        <h2 className="font-heading text-4xl font-semibold text-on-surface mb-4">
          Laat ons weten wat je vindt
        </h2>
        <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
          Loop je tegen iets aan tijdens het testen, of heb je een idee? Je feedback helpt ons
          Albus Next beter te maken vóór de overstap. Neem contact op met je Albus-beheer of mail
          ons rechtstreeks.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-primary-container font-semibold hover:underline text-lg"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test, verifieer dat hij slaagt**

Run: `npx jest __tests__/overstappen/FeedbackContact.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add components/overstappen/FeedbackContact.tsx __tests__/overstappen/FeedbackContact.test.tsx
git commit -m "feat(overstappen): add feedback/contact section"
```

---

### Task 9: AfsluitendeCta

**Files:**
- Create: `components/overstappen/AfsluitendeCta.tsx`
- Test: `__tests__/overstappen/AfsluitendeCta.test.tsx`

- [ ] **Step 1: Schrijf de falende test**

```tsx
// __tests__/overstappen/AfsluitendeCta.test.tsx
import { render, screen } from '@testing-library/react'
import AfsluitendeCta from '@/components/overstappen/AfsluitendeCta'

describe('AfsluitendeCta', () => {
  it('renders the heading', () => {
    render(<AfsluitendeCta />)
    expect(screen.getByRole('heading', { name: /Klaar om te beginnen/i })).toBeInTheDocument()
  })

  it('renders the CTA linking to albusnext.nl', () => {
    render(<AfsluitendeCta />)
    expect(screen.getByRole('link', { name: 'Start met testen' })).toHaveAttribute('href', 'https://www.albusnext.nl')
  })
})
```

- [ ] **Step 2: Run test, verifieer dat hij faalt**

Run: `npx jest __tests__/overstappen/AfsluitendeCta.test.tsx`
Expected: FAIL — module niet gevonden.

- [ ] **Step 3: Implementeer AfsluitendeCta**

```tsx
// components/overstappen/AfsluitendeCta.tsx
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
```

- [ ] **Step 4: Run test, verifieer dat hij slaagt**

Run: `npx jest __tests__/overstappen/AfsluitendeCta.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add components/overstappen/AfsluitendeCta.tsx __tests__/overstappen/AfsluitendeCta.test.tsx
git commit -m "feat(overstappen): add afsluitende CTA section"
```

---

### Task 10: Route `app/overstappen/page.tsx` + metadata + assemblage

**Files:**
- Create: `app/overstappen/page.tsx`
- Test: `__tests__/overstappen/page.test.tsx`

- [ ] **Step 1: Lees kort de Next.js docs voor metadata/robots**

Lees in `node_modules/next/dist/docs/` de pagina's over app-router `page.tsx` en de
`Metadata`-API (specifiek het `robots`-veld). Bevestig de exacte vorm voor `robots: { index: false }`.
Pas Step 3 aan als deze versie afwijkt.

- [ ] **Step 2: Schrijf de falende test**

```tsx
// __tests__/overstappen/page.test.tsx
import { render, screen } from '@testing-library/react'
import OverstappenPage, { metadata } from '@/app/overstappen/page'

describe('Overstappen page', () => {
  it('renders the hero and closing CTA', () => {
    render(<OverstappenPage />)
    expect(screen.getByRole('heading', { name: /Albus Next komt eraan/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Klaar om te beginnen/i })).toBeInTheDocument()
  })

  it('renders all main section headings', () => {
    render(<OverstappenPage />)
    expect(screen.getByRole('heading', { name: /Waarom Albus Next/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Nieuw in Albus Next/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /testomgeving staat klaar/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Wat blijft hetzelfde/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Zo log je de eerste keer in/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Laat ons weten wat je vindt/i })).toBeInTheDocument()
  })

  it('is excluded from search indexing', () => {
    expect(metadata.robots).toMatchObject({ index: false })
  })
})
```

- [ ] **Step 3: Implementeer de route**

```tsx
// app/overstappen/page.tsx
import type { Metadata } from 'next'
import OverstappenHero from '@/components/overstappen/OverstappenHero'
import Voordelen from '@/components/overstappen/Voordelen'
import NieuweFeatures from '@/components/overstappen/NieuweFeatures'
import Testomgeving from '@/components/overstappen/Testomgeving'
import WatBlijftHetzelfde from '@/components/overstappen/WatBlijftHetzelfde'
import EersteKeerInloggen from '@/components/overstappen/EersteKeerInloggen'
import FeedbackContact from '@/components/overstappen/FeedbackContact'
import AfsluitendeCta from '@/components/overstappen/AfsluitendeCta'

export const metadata: Metadata = {
  title: 'Albus Next komt eraan — test nu alvast',
  description:
    'Na de zomer stappen we over naar Albus Next. De testomgeving staat klaar. Ontdek de voordelen, nieuwe features en hoe je de eerste keer inlogt.',
  robots: { index: false, follow: false },
}

export default function OverstappenPage() {
  return (
    <main>
      <OverstappenHero />
      <Voordelen />
      <NieuweFeatures />
      <Testomgeving />
      <WatBlijftHetzelfde />
      <EersteKeerInloggen />
      <FeedbackContact />
      <AfsluitendeCta />
    </main>
  )
}
```

- [ ] **Step 4: Run test, verifieer dat hij slaagt**

Run: `npx jest __tests__/overstappen/page.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Run de volledige testsuite + build**

Run: `npx jest`
Expected: alle tests slagen (bestaande + nieuwe overstappen-tests).

Run: `npm run build`
Expected: build slaagt; route `/overstappen` verschijnt in de output.

- [ ] **Step 6: Handmatige check in de browser**

Run: `npm run dev`, open `http://localhost:3000/overstappen`.
Verifieer: alle secties renderen, CTA-knoppen wijzen naar `https://www.albusnext.nl`,
PDF-download werkt, pagina is responsive op mobiel formaat.

- [ ] **Step 7: Commit**

```bash
git add app/overstappen/page.tsx __tests__/overstappen/page.test.tsx
git commit -m "feat(overstappen): add /overstappen route with metadata and assembled sections"
```

---

## Self-Review notities

**Spec-dekking:** Hero+CTA (T2,T9), voordelen (T3), nieuwe features (T4), testomgeving+disclaimer
(T5), geruststelling incl. oude-app-uitzetten (T6), inloggids inline+PDF (T1,T7), feedback/contact
(T8), standalone route zonder navbar/pricing + noindex (T10). Alle spec-secties hebben een taak.

**Open punt voor uitvoerder:** screenshots zijn nog niet beschikbaar; de spec noemt placeholders.
Dit plan levert tekst + iconen zonder app-screenshots (YAGNI tot beeldmateriaal van
https://albus.gitbook.io/albusnext beschikbaar is). Screenshots toevoegen kan later in een losse
taak; de sectiestructuur laat ruimte (bv. in Voordelen of NieuweFeatures).

**Type-consistentie:** `CtaButton` props (`label?`, `variant?: 'primary' | 'inverse'`) consistent
gebruikt in T2 en T9. PDF-pad `/Albus Next — Installatiegids.pdf` gelijk in T1 (kopie) en T7 (link).
Contact-e-mail `info@albus-hc.com` gelijk in T8.
