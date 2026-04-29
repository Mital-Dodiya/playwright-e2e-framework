import { Page } from '@playwright/test';

/**
 * RetryHelper — Utility for retrying flaky actions and assertions.
 * Handles scenarios where elements load slowly or actions need multiple attempts.
 * Reduces test flakiness without relying on hard waits.
 */
export class RetryHelper {

  /**
   * Retries an async action until it succeeds or max attempts reached.
   * @param action - The async function to retry
   * @param maxAttempts - Maximum number of retry attempts (default 3)
   * @param delayMs - Delay between retries in milliseconds (default 1000)
   */
  static async retry<T>(
    action: () => Promise<T>,
    maxAttempts: number = 3,
    delayMs: number = 1000
  ): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await action();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.log(`Attempt ${attempt}/${maxAttempts} failed: ${lastError.message}`);

        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
        }
      }
    }

    throw new Error(`Action failed after ${maxAttempts} attempts: ${lastError?.message}`);
  }

  /**
   * Retries clicking an element until it succeeds.
   * Useful for elements that appear after animations or delays.
   * @param page - Playwright page instance
   * @param selector - Element selector to click
   * @param maxAttempts - Maximum retry attempts
   */
  static async retryClick(
    page: Page,
    selector: string,
    maxAttempts: number = 3
  ): Promise<void> {
    await this.retry(async () => {
      await page.locator(selector).waitFor({ state: 'visible', timeout: 5000 });
      await page.locator(selector).click();
    }, maxAttempts);
  }

  /**
   * Retries filling an input field until successful.
   * @param page - Playwright page instance
   * @param selector - Input selector
   * @param value - Value to fill
   * @param maxAttempts - Maximum retry attempts
   */
  static async retryFill(
    page: Page,
    selector: string,
    value: string,
    maxAttempts: number = 3
  ): Promise<void> {
    await this.retry(async () => {
      await page.locator(selector).waitFor({ state: 'visible', timeout: 5000 });
      await page.locator(selector).clear();
      await page.locator(selector).fill(value);
    }, maxAttempts);
  }

  /**
   * Waits for a condition to be true with retries.
   * @param condition - Function returning boolean
   * @param maxAttempts - Maximum retry attempts
   * @param delayMs - Delay between checks
   */
  static async waitForCondition(
    condition: () => Promise<boolean>,
    maxAttempts: number = 10,
    delayMs: number = 500
  ): Promise<void> {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const result = await condition();
      if (result) return;

      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
    throw new Error(`Condition not met after ${maxAttempts} attempts`);
  }
}
