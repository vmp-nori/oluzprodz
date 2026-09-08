# Frontend

Framework: Next.js App Router with React Server Components

## Rules

- Full-bleed 3840 by 2160 supplied hero artwork with responsive cover behavior
- Oversized condensed sans typography, sparse navigation, sharp corners, and muted lavender accent
- One charcoal theme across the page
- No automatic screenshot capture
- Below 1024 CSS pixels use the touch-first mobile composition with safe-area spacing, horizontal scroll snapping, and a persistent bottom section dock
- Future 3D enhancement must fall back to static media for reduced motion, weak performance, or WebGL failure

## Agent-visible UI

Tools:

- On-demand Playwright navigation and DOM inspection
- Screenshots only when explicitly requested

Critical journeys:

- Load the landing page at a supported desktop width
- Navigate among landing-page sections
- Open the verified Instagram destination
- Browse the complete portfolio and navigate between sections below 1024 CSS pixels

Required evidence:

- Passing format, lint, typecheck, test, and build commands
- Running result available for owner inspection for visual work
- Reproduction and regression evidence for bug fixes
