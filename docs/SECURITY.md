# Security

## Sensitive data

- No sensitive application data in the initial release
- Future deployment credentials and email-provider credentials

## Trust boundaries

- Browser to Next.js server
- Application to future third-party providers
- Repository configuration to deployment environment

## Rules

- Never commit credentials or production personal data
- Do not expose provider credentials to browser code
- Validate external URLs and configuration
- Any action involving money requires owner approval

Security, legal, and other judgment-heavy decisions follow the human escalation rules in `AGENTS.md`.
