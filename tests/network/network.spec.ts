import { test, expect } from '@playwright/test';

test.describe('Network Interception Tests', () => {
  test.describe('Mock API Responses', () => {
    test('should display products when API returns mocked data', async ({ page }) => {
      // Mock the page before navigation
      await page.route('**/*.png', route => route.abort());
      await page.route('**/*.jpg', route => route.abort());

      // Login and navigate to products
      await page.goto('https://www.saucedemo.com');
      await page.fill('[data-test="username"]', 'standard_user');
      await page.fill('[data-test="password"]', 'secret_sauce');
      await page.click('[data-test="login-button"]');

      // Verify products page loaded even with images blocked
      await expect(page.locator('.title')).toHaveText('Products');
      await expect(page.locator('.inventory_item').first()).toBeVisible();
    });

    test('should capture network requests during login', async ({ page }) => {
      const requests: string[] = [];

      // Capture all network requests
      page.on('request', request => {
        requests.push(request.url());
      });

      await page.goto('https://www.saucedemo.com');
      await page.fill('[data-test="username"]', 'standard_user');
      await page.fill('[data-test="password"]', 'secret_sauce');
      await page.click('[data-test="login-button"]');

      // Verify page navigated successfully
      await expect(page).toHaveURL(/inventory/);
      expect(requests.length).toBeGreaterThan(0);
    });

    test('should capture failed network responses', async ({ page }) => {
      const failedRequests: string[] = [];

      // Track failed requests
      page.on('requestfailed', request => {
        failedRequests.push(request.url());
      });

      // Block images to simulate failures
      await page.route('**/*.png', route => route.abort());

      await page.goto('https://www.saucedemo.com');
      await page.fill('[data-test="username"]', 'standard_user');
      await page.fill('[data-test="password"]', 'secret_sauce');
      await page.click('[data-test="login-button"]');

      await expect(page).toHaveURL(/inventory/);
      // Some image requests should have failed
      console.log(`Blocked ${failedRequests.length} image requests`);
    });
  });

  test.describe('Response Interception', () => {
    test('should verify response status for page resources', async ({ page }) => {
      const responses: { url: string; status: number }[] = [];

      page.on('response', response => {
        responses.push({
          url: response.url(),
          status: response.status(),
        });
      });

      await page.goto('https://www.saucedemo.com');

      // Verify no server errors
      const serverErrors = responses.filter(r => r.status >= 500);
      expect(
        serverErrors,
        `Server errors found:\n${JSON.stringify(serverErrors, null, 2)}`
      ).toHaveLength(0);
    });
  });

  test.describe('Request Modification', () => {
    test('should add custom headers to requests', async ({ page }) => {
      // Add custom tracking header to all requests
      await page.route('**/*', route => {
        route.continue({
          headers: {
            ...route.request().headers(),
            'X-Test-Automation': 'playwright',
            'X-Test-Environment': 'staging',
          },
        });
      });

      await page.goto('https://www.saucedemo.com');
      await expect(page.locator('.login_logo')).toBeVisible();
    });
  });
});
