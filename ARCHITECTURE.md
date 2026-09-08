# OluProdz architecture

## Repository shape

Single Next.js application with domain-oriented source folders; Next.js App Router with React Server Components; TypeScript; Node.js 22 recommended (20.9 or newer supported); npm.

## Domains

| Domain | Responsibility |
| --- | --- |
| portfolio | Photography, reels, and future gallery presentation |
| profile | Biography, resume-derived experience, and skills |
| contact | Verified social contact destinations |
| experience | Hero presentation and future 3D camera enhancement |

## Layer direction

```text
types → data/config → services → components → routes
```

Dependencies may move only forward through this sequence unless an explicit design document changes the rule.

## Providers

Cross-cutting concerns enter through the provider boundary:

- Social links
- Future content management
- Future email delivery
- Future telemetry

## Boundary parsing

Parse and validate external content, environment values, and provider responses at the module that first receives them; internal code consumes typed values only.

## Forbidden edges

- Domain modules must not import route modules
- Shared modules must not import business domains
- Provider SDKs must not be imported directly by UI components

## Mechanical invariants

- Dependencies move forward through the documented layer sequence
- External URLs and data are validated before use
- Interactive client code remains isolated from static server-rendered layout

## Mechanical taste rules

- Use one charcoal monochrome theme and one muted lavender accent
- Keep media optimized and reserve its layout dimensions
- Every check failure identifies the file, rule, and concrete remediation

Custom checks must explain how an agent should remediate each violation.
