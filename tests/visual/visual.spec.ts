import { test } from '@playwright/test';
import { VisualHelper } from '../../src/utils/VisualHelper';

test.describe('Visual Regression Tests', () => {
  test.describe('Login Page Visual Tests', () => {
    test('login page should match baseline snapshot', async ({ page }) => {
      await page.goto('https://www.saucedemo.com');
      const visual = new VisualHelper(page);
      await visual.compareWithBaseline('login-page');
    });

    test('login form should match baseline snapshot', async ({ page }) => {
      await page.goto('https://www.saucedemo.com');
      const visual = new VisualHelper(page);
      await visual.compareElementWithBaseline(
        '.login-box',
        'login-form'
      );
    });

    test('login error message should match baseline', async ({ page }) => {
      await page.goto('https://www.saucedemo.com');
      await page.locator('[data-test="username"]').fill('invalid_user');
      await page.locator('[data-test="password"]').fill('wrong_pass');
      await page.locator('[data-test="login-button"]').click();
      const visual = new VisualHelper(page);
      await visual.compareElementWithBaseline(
        '[data-test="error"]',
        'login-error-message'
      );
    });
  });

  test.describe('Products Page Visual Tests', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('https://www.saucedemo.com');
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
    });

    test('products page header should match baseline', async ({ page }) => {
      const visual = new VisualHelper(page);
      await visual.compareElementWithBaseline(
        '.primary_header',
        'products-header'
      );
    });

    test('first product card should match baseline', async ({ page }) => {
      const visual = new VisualHelper(page);
      await visual.compareElementWithBaseline(
        '.inventory_item:first-child',
        'first-product-card'
      );
    });
  });
});
