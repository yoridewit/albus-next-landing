# Albus Next — "Overstappen" pagina (design)

**Datum:** 2026-06-29
**Project:** albus-next-landing
**Route:** `/overstappen`

## Doel

Een standalone informatiepagina waar gebruikers van de **oude Albus-app** naartoe gaan
via een CTA-knop op het hoofdscherm van die app. De pagina is een reminder dat ze
**na de zomer** overstappen naar Albus Next, en moet hen:

1. enthousiast maken over Albus Next (voordelen + nieuwe features);
2. uitleggen dat de **testomgeving klaar staat** met recente data (mogelijk niet de allernieuwste);
3. helpen de **eerste keer in te loggen** (installatiegids, inline + PDF-download);
4. geruststellen (vertrouwde workflows, geen nieuw account, oude app blijft tot iedereen over is).

De pagina wordt **niet** gelinkt vanuit de marketing-navbar — alleen bereikbaar via de
directe link vanuit de oude app. Daarom: standalone, gefocust, één heldere flow, geen
verkoop-navbar of pricing.

## Constraints / context

- **Next.js (afwijkende versie):** `AGENTS.md` waarschuwt dat deze Next.js breaking changes
  heeft t.o.v. bekende versies. Vóór implementatie de relevante guides in
  `node_modules/next/dist/docs/` lezen (routing/app-router, metadata, images).
- **Design system:** hergebruik bestaande stijl uit `DESIGN.md` — primair indigo `#3E4CEF`,
  fonts Public Sans (headings) + Inter (body), 8px radius, zachte tinted shadows.
- **Hergebruik** bestaande componenten/patronen uit `components/` waar logisch (knoppen,
  kaart-stijl, footer-stijl), maar geen marketing-navbar/pricing op deze pagina.
- **Taal:** volledig Nederlands.

## Pagina-opbouw

1. **Hero**
   - Kop: "Albus Next komt eraan" (of vergelijkbaar).
   - Subkop: "Na de zomer stappen we over van de app naar Albus Next. Test nu alvast."
   - Primaire CTA: **Start met testen** → `https://www.albusnext.nl`.
   - Albus Next-logo/merk.

2. **Waarom Albus Next — voordelen** (3–4 kaartjes)
   - Altijd de nieuwste versie (automatische updates).
   - Geen App Store of Google Play nodig.
   - Werkt op elk apparaat (telefoon, tablet, computer).
   - Eén app voor alle workflows i.p.v. losse apps.

3. **Nieuwe features** (highlights)
   - Eén unified webapp voor logistiek/magazijn, zorgpersoneel én beheer.
   - Modernere, snellere interface.
   - AI-suggesties / slimme voorraadhulp (zoals in design system genoemd).
   - (Definitieve featurelijst afstemmen op GitBook: https://albus.gitbook.io/albusnext)

4. **Testomgeving staat klaar**
   - "De testomgeving staat klaar met recente data (mogelijk niet de allernieuwste)."
   - **Disclaimer:** het is een testomgeving — data kan gereset worden, doe er geen echte
     productie-acties mee, verken en oefen vrij.

5. **Wat blijft hetzelfde (geruststelling)**
   - Vertrouwde workflows.
   - Geen nieuw account nodig — je bestaande e-mailadres werkt.
   - De oude app blijft beschikbaar tot iedereen over is; daarna wordt die uitgezet.

6. **Zo log je de eerste keer in** (uit installatiegids, inline)
   - Stappen: ga naar www.albusnext.nl → "Wachtwoord vergeten" → bestaande e-mail invoeren →
     nieuw wachtwoord instellen via e-maillink.
   - "Op beginscherm zetten" (webapp): iPhone via Safari, Android via Chrome/Samsung Internet.
   - Opmerking: notificaties werken alleen als je Albus Next op je beginscherm zet.
   - **PDF-download** van de bestaande gids: `Albus Next — Installatiegids.pdf`
     (verplaatsen naar `public/` zodat hij downloadbaar is).

7. **Feedback & contact**
   - Nodig uit om bugs/opmerkingen te melden tijdens de testfase.
   - Contact: `info@albus-hc.com` / je Albus-beheer.

8. **Afsluitende CTA**
   - Nogmaals **Start met testen** → `https://www.albusnext.nl`.

## Beeldmateriaal

- Screenshots van Albus Next komen (later) van https://albus.gitbook.io/albusnext.
- Voor nu: nette placeholder-vlakken in app-stijl, makkelijk te vervangen.

## Componenten (nieuw)

Eén route-pagina `app/overstappen/page.tsx`, opgebouwd uit kleine, gefocuste section-componenten
in bijv. `components/overstappen/`:

- `OverstappenHero`
- `Voordelen`
- `NieuweFeatures`
- `Testomgeving` (incl. disclaimer)
- `WatBlijftHetzelfde`
- `EersteKeerInloggen` (inline gids + PDF-download)
- `FeedbackContact`
- `AfsluitendeCta`

Gedeelde CTA-knop hergebruiken/uitlichten zodat alle "Start met testen"-knoppen consistent zijn.

## Out of scope (YAGNI)

- Geen contactformulier (alleen e-mailadres/mailto).
- Geen authenticatie of integratie met de Supabase-backend.
- Geen koppeling vanuit de marketing-navbar.
- Geen meertaligheid.

## Testen

- Bestaand patroon volgen: component-tests in `__tests__/` (zoals voor Hero/Features/Footer).
- Minimaal: pagina rendert kernsecties, CTA-knoppen wijzen naar `https://www.albusnext.nl`,
  PDF-downloadlink is aanwezig, inloggids-stappen staan op de pagina.
