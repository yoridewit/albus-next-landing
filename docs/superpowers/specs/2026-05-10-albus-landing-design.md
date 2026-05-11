# Albus Health — Landing Page Design Spec
**Date:** 2026-05-10  
**Status:** Approved  

---

## Goal

Rebuild the Albus Health landing page (currently at www.albus-hc.com) as a modern Next.js application. The new site must match the Google Stitch design exactly, use the design system from `DESIGN.md`, and be deployable to Vercel.

---

## Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | Folder name implies it; excellent Vercel integration, SSR for SEO |
| Styling | Tailwind CSS with custom tokens | Design tokens in DESIGN.md map directly to Tailwind config |
| Email | Resend | Contact form sends to info@albus-hc.com via API route |
| Fonts | Google Fonts (Public Sans + Inter) | Specified in DESIGN.md |
| Deployment | Vercel | Zero-config for Next.js |

---

## Project Structure

```
albus-next-landing/
├── app/
│   ├── layout.tsx               # HTML shell, fonts, metadata
│   ├── page.tsx                 # Composes all sections in order
│   └── api/
│       └── contact/
│           └── route.ts         # POST handler → Resend email
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Testimonials.tsx
│   ├── Pricing.tsx
│   ├── ContactForm.tsx
│   └── Footer.tsx
├── public/
│   └── (images, logo, etc.)
├── tailwind.config.ts           # Custom design tokens from DESIGN.md
├── .env.local                   # RESEND_API_KEY (not committed)
└── package.json
```

---

## Design Tokens (Tailwind config)

Sourced directly from `DESIGN.md` frontmatter:

### Colors
```js
colors: {
  primary:    '#1e2cd8',           // primary buttons, active states, links
  'primary-container': '#3e4cef', // button fills, gradients
  secondary:  '#625691',
  'secondary-container': '#cabafe',
  surface:    '#fbf8ff',           // page background
  'surface-container': '#ececff',
  'on-surface': '#151a32',         // main text
  'on-surface-variant': '#454556',
  outline:    '#757687',
  error:      '#ba1a1a',
}
```

### Typography
- **Headings:** Public Sans — h1 40px/700, h2 32px/600, h3 24px/600
- **Body:** Inter — lg 18px, md 16px, sm 14px
- **Labels:** Inter — 12px/600 with 0.05em letter-spacing

### Spacing
4px base unit. xs=4, sm=8, md=16, lg=24, xl=32, gutter=24, container-max=1440px.

### Shadows
Tinted with primary indigo at 4–8% opacity — never pure black.
- Level 1 (cards): `0 4px 16px rgba(62,76,239,0.08)`
- Level 2 (modals): `0 8px 32px rgba(62,76,239,0.12)`

### Rounding
- sm: 4px, default: 8px, md: 12px, lg: 16px, full: 9999px

---

## Page Sections

### Navbar
- Left: Albus Health logo + wordmark
- Center: navigation links — Solutions, Warehouse, Surgical, About
- Right: "Dashboard" button (primary indigo, pill shape)
- Sticky, transparent with blur backdrop on scroll

### Hero
- Full-width, dark overlay on a medical/OR background image
- **Heading (h1):** "Klaarzetten. Aanvullen. Zoeken."
- **Subtitle:** "Albus Health digitaliseert uw OK-magazijn en logistieke processen, waardiger de efficiëntie, versnelt de hulpverlening en geeft uw medisch personeel zo lang voor, wat ze echt wil zijn: bij de patiënt."
- **CTA primary:** "Vraag een demo aan" → links to contact section
- **CTA secondary:** "Bekijk documentatie" → external GitBook link
- **Floating badge:** "+145 Afdelingen" (top-right of hero card)

### Features — "Slimmer Werken op de OK"
2×2 grid of cards:
1. **Digitaliseer je magazijn met gemak** — digitize supply room, eliminate Excel, cloud sync
2. **Vul je aanvullijst in. Digitaal met de App** — mobile app (iOS/Android/PWA)
3. **Vul sneller aan door de optimale looproute** — AI-optimized walking route
4. **Maak ingrepen aan. Zet klaar voor de app** — create procedures, prep for surgery

Each card: icon, heading, 2–3 lines of body text, indigo accent color.

### Testimonials — "Wat Gebruikers Zeggen"
Horizontal slider with left/right arrow navigation.
3 testimonials (from existing site):
1. Anesthesiemedewerker — shows article locations, saves significant time
2. Anesthesiemedewerker — scalability, UI, automated features
3. Magazijnbeheerder — optimized order sequencing, automatic notifications

Each: quote text, name/role, institution.

### Pricing — "Transparante Prijzen"
Two cards side by side:
- **Maandbijdrage:** €295/maand — cancelable, unlimited users, cloud access, realtime sync, no EPD dependency
- **Jaarbijdrage:** €2.950/jaar — "POPULAIR" badge (highlighted card), same features + 2 months savings

Features list uses checkmarks in primary indigo. Annual card has primary-container background.

### Contact — "Is je interesse gewekt?"
- Dark section (inverse-surface background)
- Left: heading + description + email link (info@albus-hc.com)
- Right: form with fields — Naam, E-mail, Organisatie + "Verder Gaan" button
- On submit: POST to `/api/contact` → Resend → email to info@albus-hc.com
- Success/error state shown inline (no page reload)

### Footer
- Top: Logo + tagline
- Link columns:
  - **Product:** Solutions, Dashboard, Warehouse, Documentatie
  - **Company:** About, Contact Us, Blog, Terms of Service
- Social: LinkedIn
- Bottom: © 2024 Albus Health — info@albus-hc.com

---

## API Route: /api/contact

```
POST /api/contact
Body: { naam: string, email: string, organisatie: string }
→ Resend.emails.send({ from, to: 'info@albus-hc.com', subject, html })
→ 200 OK or 500 error
```

Environment variable: `RESEND_API_KEY`

---

## Deployment

1. Push to GitHub repo
2. Connect repo to Vercel
3. Add `RESEND_API_KEY` as environment variable in Vercel dashboard
4. Set custom domain `albus-hc.com` (or subdomain) in Vercel

---

## Out of Scope

- Authentication / dashboard pages
- Multi-language support
- Blog / CMS
- Any pages beyond the single landing page
