<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# OluProdz repository map

A desktop-first personal portfolio showcasing Olu's sports photography, short-form videography, and media experience.

## Start here

- `ARCHITECTURE.md` - domains, layers, providers, boundaries, and enforced invariants
- `docs/PRODUCT_SENSE.md` - users, problem, workflows, outcomes, and non-goals
- `docs/DESIGN.md` and `docs/FRONTEND.md` - product and interface rules
- `docs/PLANS.md` and `docs/exec-plans/` - planning, decisions, progress, and debt
- `docs/QUALITY_SCORE.md` - evidence-backed quality grades
- `docs/RELIABILITY.md` and `docs/SECURITY.md` - runtime and trust expectations
- `docs/product-specs/` - initial workflow specifications
- `docs/design-docs/` - durable decisions and golden principles
- `docs/generated/` and `docs/references/` - generated facts and external context

## Authoritative commands

| Purpose | Command |
| --- | --- |
| Development | `npm run dev` |
| Worktree development | `npm run dev:worktree` |
| Format | `npm run format` |
| Lint | `npm run lint` |
| Type check | `npm run typecheck` |
| Test | `npm run test` |
| Build | `npm run build` |
| Full validation | `npm run check` |

CI runs on pull requests and pushes to `main`.

## Agent loop

Validate current state → reproduce → implement → inspect and test → self-review → request targeted reviews → repair → repeat.

## Proportional validation

For small, reversible UI edits—copy changes, spacing, colors, borders, or a single CSS selector:

- Do not use subagents or separate reviewer/documenter passes.
- Do not run the full build or full validation suite.
- Run only formatting, linting, and type checking as relevant.
- Do not update design documentation unless the change creates a reusable system rule.
- Finish within one implementation and verification pass.

Use the full agent loop only for new features, structural redesigns, risky changes, or when explicitly requested. Treat "quick edit" as an explicit request for this lightweight workflow.

Escalate when:

- Any action incurs cost.
- Credentials must be created or rotated.
- Production deployment or a destructive production action is needed.
- Domain registration or configuration is needed.
- A subjective product or visual decision is not covered by the confirmed brief.

Agents may edit and use local Git. Pushing, opening or merging pull requests, deploying, changing domains, handling credentials, or incurring cost requires explicit owner instruction.
