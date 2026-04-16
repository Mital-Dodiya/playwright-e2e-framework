# Contributing Guide

Thank you for your interest in contributing to this framework.

---

## Project Setup

```bash
git clone https://github.com/Mital-Dodiya/playwright-e2e-framework.git
cd playwright-e2e-framework
npm install
npx playwright install
```

---

## Folder Structure

```
features/         — Gherkin feature files (what to test)
src/pages/        — Page Object Model classes (where to act)
src/steps/        — BDD step definitions (how to test)
src/fixtures/     — Custom Playwright fixtures
src/helpers/      — Utility helper classes
test-data/        — JSON test data files
.github/          — CI/CD GitHub Actions workflow
```

---

## Adding a New Page Object

1. Create a new file in `src/pages/` — e.g. `NewPage.ts`
2. Extend `BasePage`:

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class NewPage extends BasePage {
  readonly someElement: Locator;

  constructor(page: Page) {
    super(page);
    this.someElement = page.locator('[data-test="element"]');
  }

  async someAction(): Promise<void> {
    await this.someElement.click();
  }
}
```

3. Register it in `src/fixtures/customFixtures.ts`

---

## Adding a New Feature File

1. Create a `.feature` file in `features/`
2. Use Given / When / Then / And / But syntax
3. Add `@smoke` or `@regression` tags

```gherkin
@regression @newfeature
Scenario: Example scenario
  Given the user is logged in as "standard_user"
  When the user performs some action
  Then the expected result should be visible
```

---

## Adding Step Definitions

1. Create or update a file in `src/steps/`
2. Import from custom fixtures — not directly from playwright-bdd

```typescript
import { Given, When, Then } from '../fixtures/customFixtures';

When('the user performs some action', async ({ page }) => {
  // implementation
});
```

---

## Running Tests

```bash
npm test                  # All tests
npm run test:smoke        # Smoke tests only
npm run test:regression   # Regression tests only
npm run test:headed       # With browser visible
npm run report            # View HTML report
```

---

## Coding Standards

- Use TypeScript — no plain JavaScript
- All page methods must be async
- Use data-test attributes for locators where possible
- Add JSDoc comments to all public methods
- Never use hard waits — use Playwright built-in waits
- Keep step definitions thin — logic goes in page objects

---

## Commit Message Format

```
feat: add new page object for checkout summary
fix: resolve flaky test in cart flow
test: add boundary scenarios for postal code
docs: update README with new test coverage
refactor: extract common methods to BasePage
```
