import { Page, Locator } from '@playwright/test';

/**
 * WaitHelper — Utility for smart waiting strategies in Playwright.
 * Replaces hard waits with condition-based waits for stable test execution.
 * Reduces flakiness without slowing down test execution unnecessarily.
 */
export class WaitHelper {

  /**
   * Waits for an element to be visible on the page.
   * @param locator - Element to wait for
   * @param timeout - Maximum wait time in ms (default 10000)
   */
  static async waitForVisible(
    locator: Locator,
    timeout: number = 10000
  ): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Waits for an element to be hidden or removed from DOM.
   * Useful for waiting for loaders and spinners to disappear.
   * @param locator - Element to wait to disappear
   * @param timeout - Maximum wait time in ms (default 10000)
   */
  static async waitForHidden(
    locator: Locator,
    timeout: number = 10000
  ): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Waits for page to reach network idle state.
   * Use after navigation or form submission.
   * @param page - Playwright page instance
   * @param timeout - Maximum wait time in ms (default 30000)
   */
  static async waitForNetworkIdle(
    page: Page,
    timeout: number = 30000
  ): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Waits for DOM content to be fully loaded.
   * Faster than networkidle — use when page has no async requests.
   * @param page - Playwright page instance
   */
  static async waitForDOMReady(page: Page): Promise<void> {
    await page.waitForLoadState('domcontentloaded');
  }

  /**
   * Waits for URL to match a pattern.
   * Use after clicking links or form submissions that navigate.
   * @param page - Playwright page instance
   * @param urlPattern - String or regex to match URL
   * @param timeout - Maximum wait time in ms (default 10000)
   */
  static async waitForURL(
    page: Page,
    urlPattern: string | RegExp,
    timeout: number = 10000
  ): Promise<void> {
    await page.waitForURL(urlPattern, { timeout });
  }

  /**
   * Waits for element text to match expected value.
   * Useful for dynamic content that updates asynchronously.
   * @param locator - Element to check
   * @param expectedText - Text to wait for
   * @param timeout - Maximum wait time in ms (default 10000)
   */
  static async waitForText(
    locator: Locator,
    expectedText: string,
    timeout: number = 10000
  ): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const text = await locator.textContent();
      if (text?.includes(expectedText)) return;
      await new Promise(r => setTimeout(r, 200));
    }
    throw new Error(`Text "${expectedText}" not found within ${timeout}ms`);
  }

  /**
   * Waits for element count to reach expected number.
   * Useful for lists that load items dynamically.
   * @param locator - List locator
   * @param expectedCount - Expected number of items
   * @param timeout - Maximum wait time in ms (default 10000)
   */
  static async waitForCount(
    locator: Locator,
    expectedCount: number,
    timeout: number = 10000
  ): Promise<void> {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const count = await locator.count();
      if (count === expectedCount) return;
      await new Promise(r => setTimeout(r, 200));
    }
    throw new Error(`Expected ${expectedCount} elements but count did not match within ${timeout}ms`);
  }

  /**
   * Waits for a specific API response during page interaction.
   * @param page - Playwright page instance
   * @param urlPattern - API URL pattern to wait for
   * @param action - Action that triggers the API call
   */
  static async waitForAPIResponse(
    page: Page,
    urlPattern: string,
    action: () => Promise<void>
  ): Promise<void> {
    await Promise.all([
      page.waitForResponse(response =>
        response.url().includes(urlPattern) && response.status() === 200
      ),
      action(),
    ]);
  }
}
