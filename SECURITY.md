# Security Policy

## Reporting a Security Issue

If you discover a security vulnerability in this framework, please report it responsibly.

**Do not** open a public GitHub issue for security vulnerabilities.

Instead, email directly at:
📧 mitaldod123@gmail.com

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix if available

You can expect a response within 48 hours.

---

## Security Best Practices in This Framework

### Credentials
- All credentials are stored in `.env` file — never hardcoded
- `.env` is listed in `.gitignore` — never committed to version control
- `.env.example` is provided as a safe template

### Test Data
- No real user PII in test data files
- All test data uses dummy/mock values only
- `test-data/` JSON files contain only public demo site credentials

### CI/CD
- Secrets managed via GitHub Actions Secrets — not in workflow files
- No sensitive tokens stored in repository
- Artifact retention limited to 14 days

### Dependencies
- Run `npm audit` regularly to check for vulnerable packages
- Keep Playwright and TypeScript updated to latest stable versions
