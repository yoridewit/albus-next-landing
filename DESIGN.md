---
name: Albus Health Modernized
colors:
  surface: '#fbf8ff'
  surface-dim: '#d4d8f9'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f2ff'
  surface-container: '#ececff'
  surface-container-high: '#e5e7ff'
  surface-container-highest: '#dde1ff'
  on-surface: '#151a32'
  on-surface-variant: '#454556'
  inverse-surface: '#2a2f48'
  inverse-on-surface: '#f0efff'
  outline: '#757687'
  outline-variant: '#c5c5d8'
  surface-tint: '#3946ea'
  primary: '#1e2cd8'
  on-primary: '#ffffff'
  primary-container: '#3e4cef'
  on-primary-container: '#dcddff'
  inverse-primary: '#bec2ff'
  secondary: '#625691'
  on-secondary: '#ffffff'
  secondary-container: '#cabafe'
  on-secondary-container: '#544883'
  tertiary: '#474c4f'
  on-tertiary: '#ffffff'
  tertiary-container: '#5f6467'
  on-tertiary-container: '#dde1e4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e0e0ff'
  primary-fixed-dim: '#bec2ff'
  on-primary-fixed: '#000569'
  on-primary-fixed-variant: '#1625d4'
  secondary-fixed: '#e7deff'
  secondary-fixed-dim: '#ccbdff'
  on-secondary-fixed: '#1e104a'
  on-secondary-fixed-variant: '#4a3e78'
  tertiary-fixed: '#dfe3e6'
  tertiary-fixed-dim: '#c3c7ca'
  on-tertiary-fixed: '#171c1f'
  on-tertiary-fixed-variant: '#43474a'
  background: '#fbf8ff'
  on-background: '#151a32'
  surface-variant: '#dde1ff'
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  h2:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  h3:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  container-max: 1440px
---

## Brand & Style

The design system establishes a visual language that balances clinical precision with modern accessibility. It is designed for high-stakes environments like surgical suites and medical supply chains, where clarity is paramount, but the cognitive load must be minimized through thoughtful aesthetics.

The style is **Corporate / Modern** with a strong lean toward **Minimalism**. It leverages high-quality typography and generous whitespace to create a "breathable" interface. The aesthetic avoids the sterility of traditional medical software by introducing soft gradients and translucent layers, evoking a "tech-forward" intelligence that reflects the brand's AI-driven core. The emotional response should be one of calm confidence, efficiency, and unwavering reliability.

## Colors

The color palette is rooted in a sophisticated deep indigo-blue (#3E4CEF) which serves as the primary action color. This is paired with a softer, tech-inspired lavender (#988ACA) drawn from the brain imagery, used for secondary accents and illustrative elements.

- **Primary (#3E4CEF):** Represents the clinical "Medical Blue" and is used for primary buttons, active states, and critical navigation.
- **Secondary (#988ACA):** A "Deep Purple" that softens the interface, used for progress indicators, health-related charts, and soft branding elements.
- **Surface (#F7FBFE):** A clean, cool-tinted off-white for backgrounds to reduce eye strain in brightly lit clinical environments.
- **Text & Contrast (#000218):** A deep "Midnight Blue" instead of pure black, providing high contrast while feeling more premium and integrated with the brand colors.

## Typography

The design system utilizes **Public Sans** for headings to provide a structured, institutional authority that feels trustworthy and stable. For body copy and interface elements, **Inter** is used for its exceptional legibility at small sizes—crucial for inventory lists and data-heavy surgical workflows.

Hierarchy is enforced through strict weight distribution. Headings use semi-bold and bold weights to anchor the page, while body text remains in regular weights to maximize readability. Labels for data points and metadata use a slightly heavier weight and increased letter spacing to ensure they are scannable at a glance.

## Layout & Spacing

The design system employs a **12-column fluid grid** for dashboard views and a **fixed-width centered layout** for administrative or settings pages. The spacing rhythm is built on a 4px baseline, ensuring all elements align to a consistent mathematical scale.

Generous margins (24px to 32px) are used around the main content containers to maintain a clean, clinical feel. For inventory management tables and workflow boards, a "dense" variant of the spacing scale (using 8px and 12px units) can be applied to maximize information density without sacrificing clarity.

## Elevation & Depth

This design system uses **Ambient Shadows** and **Tonal Layers** to create depth. Shadows are never pure black; they are tinted with the Primary Indigo (#3E4CEF) at very low opacities (e.g., 4-8%) to feel integrated with the UI.

- **Level 0 (Base):** Used for the main background (#F7FBFE).
- **Level 1 (Raised):** Used for primary cards and inventory lists. Soft, 16px blur shadows with a slight Y-offset.
- **Level 2 (Floating):** Used for modals and dropdown menus. Deeper, more diffused shadows to signify high priority and interaction.
- **Subtle Gradients:** Backgrounds of primary buttons and header highlights utilize a very subtle linear gradient (from #3E4CEF to #988ACA at 10% opacity) to add a modern, tech-forward "sheen" without being distracting.

## Shapes

The shape language is defined by **Rounded** corners, specifically a 0.5rem (8px) base radius. This softening of the UI makes the clinical software feel more approachable and modern.

- **Standard Elements:** 8px radius for buttons, input fields, and small cards.
- **Large Containers:** 16px (rounded-lg) for main dashboard panels and modals.
- **Pill Shapes:** Used exclusively for status tags (e.g., "In Stock", "Pending Surgery") and search bars to distinguish them from actionable buttons.

## Components

### Buttons
Primary buttons use the deep indigo (#3E4CEF) with white text and 8px corners. Secondary buttons use a transparent background with a subtle border and indigo text. Ghost buttons are reserved for low-priority actions in utility bars.

### Input Fields & Controls
Text inputs feature a soft gray border that transitions to the primary indigo on focus. Checkboxes and radio buttons use the primary indigo for active states. Toggle switches are preferred for "Binary System States" (e.g., Inventory Tracking On/Off).

### Cards & Data Tables
Inventory items are housed in white cards with Level 1 elevation. Tables should utilize alternating row colors (using the tertiary #F7FBFE) and sticky headers for long surgical lists.

### Workflow Indicators
Progress bars and status chips utilize the secondary purple (#988ACA) to represent "in-progress" states, creating a visual distinction from "finalized" actions represented by the primary blue.

### Innovative Additions
- **Surgical Step Indicator:** A vertical or horizontal stepper component that uses subtle gradients to show the flow of inventory through a procedure.
- **AI-Brain Insight Badge:** A small, icon-led component incorporating the brain logo imagery to highlight AI-generated inventory suggestions or optimizations.