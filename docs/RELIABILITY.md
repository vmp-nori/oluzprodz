# Reliability

## Promises

- The static portfolio remains useful when optional enhancement code fails
- Contact links never depend on client-side JavaScript
- The unsupported-width state is deterministic

## Known failure modes

- Hero asset unavailable
- Future WebGL enhancement unavailable
- External social destination unavailable
- JavaScript disabled

## Recovery expectations

- Render useful static HTML and optimized imagery
- Replace failed optional enhancements with static presentation
- Keep verified destinations centralized in configuration

## Agent-legible runtime

- Worktree boot: npm run dev:worktree
- Isolation: Each checkout derives a stable local port and uses local build artifacts; the first release has no mutable application data.
- Logs: Development server and browser console output queried from the local run; no persistent log service.
- Metrics: Deferred: no production traffic; trigger: production launch or a measurable performance regression.
- Traces: Deferred: no distributed backend; trigger: addition of multiple server-side providers or recurring production failures.

Performance targets:

- Largest Contentful Paint below 2.5 seconds on typical broadband
- Interaction to Next Paint below 200 milliseconds
- Cumulative Layout Shift below 0.1
- No horizontal overflow at widths of 1024 CSS pixels or greater
- Target 60 frames per second for enhanced motion with graceful fallback

External-system fixtures:

- No external provider is required for the initial release
- Instagram navigation is represented by its verified URL in automated checks
