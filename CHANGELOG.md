# Changelog

All notable changes to this framework are documented here.

---

## [1.0.0] - 2026-04-01

### Added
- Initial Playwright TypeScript framework setup
- Page Object Model with BasePage, LoginPage, ProductsPage, CartPage, CheckoutPage, CheckoutOverviewPage
- BDD feature files for Login, Products, Cart, Checkout using Cucumber and Gherkin
- Custom Playwright fixtures for page object injection
- GitHub Actions CI/CD pipeline for automated test execution

---

## [1.1.0] - 2026-04-08

### Added
- Visual regression testing with VisualHelper and baseline snapshots
- Network interception tests — request capture, response validation, header modification
- Environment configuration manager (environment.ts) with .env.example
- Accessibility testing with Axe-core (WCAG 2.2 compliance)

---

## [1.2.0] - 2026-04-15

### Added
- Helper utilities library:
  - DateHelper — dynamic date generation
  - CheckoutHelper — reusable end-to-end purchase flow
  - RetryHelper — flaky action handling with exponential backoff
  - WaitHelper — smart condition-based waiting strategies
  - FormHelper — form fill, clear, select, validate
  - TableHelper — table data reading and validation
  - LocalStorageHelper — browser storage management
  - CookieHelper — cookie management and auth injection
  - URLHelper — URL validation and query param extraction
  - TestReportHelper — custom test summary generation

### Changed
- BasePage enhanced with verifyPageTitle, verifyPageHeading, verifyCurrentURL
- ProductsPage extended with getProductPriceByIndex method
- tsconfig updated to include DOM library for browser API support

---

## [1.3.0] - 2026-04-22

### Added
- Scenario Outline for login with multiple invalid credential combinations
- Scenario Outline for product sort options (az, za, lohi, hilo)
- Scenario Outline for invalid postal code formats in checkout
- Data-driven price verification for all 6 products
- test-data/products.json and test-data/checkout.json centralised test data
- CheckoutOverviewPage — new page object for order summary validation
- GitHub issue templates (bug report, test coverage request)
- Pull request template with quality checklist
- CONTRIBUTING.md with setup guide and coding standards

### Changed
- README updated with full project structure and test coverage table
- All page objects now verify page title using BasePage.verifyPageTitle()
- Steps use ENV config instead of hardcoded credentials

### Fixed
- Resolved regex conflict with item(s) step definition
- Fixed npx playwright command in CI workflow
- Generated and committed visual baseline snapshots
- Fixed visual tests excluded from CI pipeline
