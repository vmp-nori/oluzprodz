# Quality score

Grades must cite current evidence or a concrete gap.

| Area | Grade | Evidence or gap |
| --- | --- | --- |
| Visual fidelity | Yellow | The confirmed layout and full-resolution hero are implemented; owner inspection is still required |
| Accessibility | Yellow | Biome accessibility rules pass and reduced motion, landmarks, focus states, and alt text are present; browser audit remains |
| Performance | Yellow | The route prerenders statically and the production build passes; Lighthouse measurement remains |
| Correctness | Green | Format, lint, typecheck, unit test, architecture, documentation, production build, and boot smoke checks pass |

## Required checks

- npm run format:check
- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npm run check:architecture
- npm run check:docs

Update grades during recurring repository maintenance and after material product changes.
