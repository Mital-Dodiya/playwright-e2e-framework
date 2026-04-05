# Playwright E2E Automation Framework

![E2E Tests](https://github.com/Mital-Dodiya/playwright-e2e-framework/actions/workflows/e2e.yml/badge.svg)

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
| GitHub Actions | CI/CD pipeline |

---

## Project Structure

```
playwright-e2e-framework/
├── .github/workflows/       # CI/CD - GitHub Actions
├── features/                # BDD feature files (Gherkin)
│   ├── login.feature
│   ├── products.feature
│   ├── cart.feature
│   └── checkout.feature
├── src/
│   ├── pages/               # Page Object Model
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── ProductsPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   ├── steps/               # BDD Step Definitions
│   │   ├── loginSteps.ts
│   │   ├── productsSteps.ts
│   │   ├── cartSteps.ts
│   │   └── checkoutSteps.ts
│   └── fixtures/
│       └── customFixtures.ts
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
```

## Run Tests

```bash
# Run all tests
npm test

# Run smoke tests only
npm run test:smoke

# Run regression tests only
npm run test:regression

# Run with browser visible
npm run test:headed

# View HTML report
npm run report
```

---

## Test Coverage

| Feature | Scenarios |
|---|---|
| Login | Valid login, invalid password, locked user, empty fields |
| Products | Page load, add to cart, multiple items, logout |
| Cart | View cart, multiple items, remove item, continue shopping |
| Checkout | Complete order, missing first name, last name, postal code |

**Total: 16 scenarios**

---

## Author

**Mital Dodiya** — Module Lead, Test Engineer

[LinkedIn](https://linkedin.com/in/mitaldodiya) | [GitHub](https://github.com/Mital-Dodiya)
