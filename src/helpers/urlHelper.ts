import { Page, expect } from '@playwright/test';

/**
 * URLHelper — Utility for URL validation, parsing and navigation assertions.
 * Provides reusable methods for verifying page URLs during test execution.
 * Useful for multi-step flows where URL changes confirm successful navigation.
 */
export class URLHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Returns the current full page URL.
   */
  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  /**
   * Returns just the pathname from the current URL.
   * e.g. https://example.com/products?id=1 → /products
   */
  async getPathname(): Promise<string> {
    const url = new URL(this.page.url());
    return url.pathname;
  }

  /**
   * Returns a specific query parameter value from the current URL.
   * @param paramName - Query parameter name to retrieve
   */
  async getQueryParam(paramName: string): Promise<string | null> {
    const url = new URL(this.page.url());
    return url.searchParams.get(paramName);
  }

  /**
   * Returns the base URL (protocol + hostname) from the current URL.
   */
  async getBaseURL(): Promise<string> {
    const url = new URL(this.page.url());
    return `${url.protocol}//${url.hostname}`;
  }

  /**
   * Asserts current URL exactly matches expected URL.
   * @param expectedURL - Full URL to match
   */
  async verifyExactURL(expectedURL: string): Promise<void> {
    await expect(this.page).toHaveURL(expectedURL);
  }

  /**
   * Asserts current URL contains a specific string.
   * @param partialURL - String that URL should contain
   */
  async verifyURLContains(partialURL: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(partialURL));
  }

  /**
   * Asserts current URL matches a regex pattern.
   * @param pattern - Regex pattern to match against URL
   */
  async verifyURLPattern(pattern: RegExp): Promise<void> {
    await expect(this.page).toHaveURL(pattern);
  }

  /**
   * Asserts the current pathname matches expected path.
   * @param expectedPath - Expected pathname e.g. '/products'
   */
  async verifyPathname(expectedPath: string): Promise<void> {
    const pathname = await this.getPathname();
    expect(pathname).toBe(expectedPath);
  }

  /**
   * Asserts a query parameter has the expected value.
   * @param paramName - Query parameter name
   * @param expectedValue - Expected value of the parameter
   */
  async verifyQueryParam(
    paramName: string,
    expectedValue: string
  ): Promise<void> {
    const value = await this.getQueryParam(paramName);
    expect(value).toBe(expectedValue);
  }

  /**
   * Waits for URL to change from the current URL.
   * @param timeout - Maximum wait time in ms (default 10000)
   */
  async waitForURLChange(timeout: number = 10000): Promise<void> {
    const currentURL = await this.getCurrentURL();
    await this.page.waitForURL(
      url => url.href !== currentURL,
      { timeout }
    );
  }

  /**
   * Navigates back and verifies the previous URL.
   * @param expectedURL - URL expected after going back
   */
  async goBackAndVerify(expectedURL: string | RegExp): Promise<void> {
    await this.page.goBack();
    await expect(this.page).toHaveURL(expectedURL);
  }

  /**
   * Checks if the current URL is HTTPS (secure).
   */
  async isSecureURL(): Promise<boolean> {
    const url = new URL(this.page.url());
    return url.protocol === 'https:';
  }
}
