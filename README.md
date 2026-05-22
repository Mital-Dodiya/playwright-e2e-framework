# Playwright E2E Automation Framework

![E2E Tests](https://github.com/Mital-Dodiya/playwright-e2e-framework/actions/workflows/e2e.yml/badge.svg)
![Playwright](https://img.shields.io/badge/Playwright-v1.44-green)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.4-blue)
![BDD](https://img.shields.io/badge/BDD-Cucumber-brightgreen)
![Tests](https://img.shields.io/badge/Tests-40%2B%20Scenarios-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

End-to-end test automation framework built with **Playwright + TypeScript + BDD (Cucumber)** using Page Object Model on [saucedemo.com](https://www.saucedemo.com).

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Playwright | Browser automation |
| TypeScript | Type-safe scripting |
| playwright-bdd | BDD / Cucumber integration |
| Gherkin | Plain English test scenarios |
| Page Object Model | Maintainable test architecture |
| Axe-Core | Accessibility (WCAG 2.2) testing |
| GitHub Actions | CI/CD pipeline |

---

## Project Structure

```
playwright-e2e-framework/
├── .github/
│   ├── workflows/           # CI/CD - GitHub Actions
│   ├── ISSUE_TEMPLATE/      # Bug and test request templates
│   └── PULL_REQUEST_TEMPLATE.md
├── features/                # BDD feature files (Gherkin)
│   ├── login.feature
│   ├── products.feature
│   ├── cart.feature
│   └── checkout.feature
├── src/
│   ├── config/              # Environment configuration
│   │   └── environment.ts
│   ├── pages/               # Page Object Model
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── ProductsPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   └── CheckoutOverviewPage.ts
│   ├── steps/               # BDD Step Definitions
│   │   ├── loginSteps.ts
│   │   ├── productsSteps.ts
│   │   ├── cartSteps.ts
│   │   ├── checkoutSteps.ts
│   │   └── checkoutOverviewSteps.ts
│   ├── fixtures/            # Custom Playwright fixtures
│   │   └── customFixtures.ts
│   ├── utils/               # Utility classes
│   │   ├── AccessibilityHelper.ts
│   │   └── VisualHelper.ts
│   └── helpers/             # Reusable helper utilities
│       ├── dateHelper.ts
│       ├── checkoutHelper.ts
│       ├── retryHelper.ts
│       ├── waitHelper.ts
│       ├── formHelper.ts
│       ├── tableHelper.ts
│       ├── localStorageHelper.ts
│       ├── cookieHelper.ts
│       ├── urlHelper.ts
│       └── testReportHelper.ts
├── tests/
│   ├── visual/              # Visual regression tests
│   │   └── visual.spec.ts
│   └── network/             # Network interception tests
│       └── network.spec.ts
├── test-data/               # JSON test data files
│   ├── users.json
│   ├── products.json
│   └── checkout.json
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

```bash
git clone https://github.com/Mital-Dodiya/playwright-e2e-framework.git
cd playwright-e2e-framework
npm install
npx playwright install
cp .env.example .env
```

## Run Tests

```bash
# Run all BDD E2E tests
npm test

# Run smoke tests only
npm run test:smoke

# Run regression tests only
npm run test:regression

# Run with browser visible
npm run test:headed

# Run visual tests
npm run test:visual

# Update visual baselines
npm run test:visual:update

# Run network interception tests
npm run test:network

# View HTML report
npm run report
```

---

## Test Coverage

### BDD E2E Tests — saucedemo.com

| Feature | Tag | Scenarios | Coverage |
|---|---|---|---|
| Login — valid | @smoke | 1 | Successful login |
| Login — invalid | @regression | 5 | Wrong password, locked user, empty fields, Scenario Outline with 5 data rows |
| Products | @smoke @regression | 6 | Page load, sort options (4 variants), add to cart, multiple items, price validation (6 products), logout |
| Cart | @smoke @regression | 4 | View cart, multiple items, remove item, continue shopping |
| Checkout | @smoke @regression | 8 | Complete flow with overview validation, missing first name, last name, postal code, invalid postal codes (4 variants) |

**Total BDD Scenarios: 40+**

---

### Visual Regression Tests

| Page | Tests |
|---|---|
| Login page | Baseline snapshot, form snapshot, error message snapshot |
| Products page | Header snapshot, first product card snapshot |

---

### Network Interception Tests

| Test | Coverage |
|---|---|
| Block image requests | Page loads without images |
| Capture all requests | Request tracking during login |
| Track failed requests | Aborted request monitoring |
| Response validation | No 500 server errors |
| Custom headers | Automation tracking headers |

---

## Helper Utilities

| Helper | Purpose |
|---|---|
| `DateHelper` | Dynamic date generation for test data |
| `CheckoutHelper` | End-to-end purchase flow in one call |
| `RetryHelper` | Flaky action handling with backoff |
| `WaitHelper` | Smart condition-based waiting |
| `FormHelper` | Form fill, clear, select, validate |
| `TableHelper` | Table data reading and validation |
| `LocalStorageHelper` | Browser storage management |
| `CookieHelper` | Cookie management and auth injection |
| `URLHelper` | URL validation and query param checks |
| `TestReportHelper` | Custom test summary generation |

---

## Environment Configuration

```bash
# Copy example env file
cp .env.example .env

# Run against different environment
BASE_URL=https://staging.myapp.com npm test
```

---

## Author

**Mital Dodiya** — Senior QA Engineer | Playwright TypeScript | BDD | API Testing

[LinkedIn](https://linkedin.com/in/mitaldodiya) | [GitHub](https://github.com/Mital-Dodiya)
