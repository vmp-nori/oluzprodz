# Harness Engineering reference

Source: [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/), OpenAI, February 11, 2026.

Selected practices:

- Repository knowledge is the versioned system of record; `AGENTS.md` is a map.
- Architecture and taste invariants are mechanically enforced.
- Application UI and operational signals are made legible to agents as selected below.
- Plans, review/repair loops, and recurring garbage collection are first-class.

Selected application-legibility capabilities:

- On-demand Playwright navigation and DOM inspection
- Screenshots only when explicitly requested

Observability decisions:

- Logs: Development server and browser console output queried from the local run; no persistent log service.
- Metrics: Deferred: no production traffic; trigger: production launch or a measurable performance regression.
- Traces: Deferred: no distributed backend; trigger: addition of multiple server-side providers or recurring production failures.

This repository adapts the article's ideas to its confirmed product decisions. The article reports one experiment, not a universal performance guarantee or automatic grant of production authority.
