import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage — Parent class for all Page Objects.
 * Contains reusable methods shared across all pages.
 * Every page class extends this base to inherit common functionality.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a given path relative to the baseURL.
   * @param path - URL path to navigate to (default: root)
   */
  async navigateTo(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Returns the current browser tab title.
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Asserts the browser tab title matches the expected value.
   * @param expectedTitle - The expected page title
   */
  async verifyPageTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Asserts a heading element contains the expected text.
   * @param locator - The heading locator
   * @param expectedHeading - The expected heading text
   */
  async verifyPageHeading(locator: Locator, expectedHeading: string): Promise<void> {
    await expect(locator).toHaveText(expectedHeading);
  }

  /**
   * Asserts the current page URL matches a regex pattern.
   * @param urlPattern - Regular expression to match against the URL
   */
  async verifyCurrentURL(urlPattern: RegExp): Promise<void> {
    await expect(this.page).toHaveURL(urlPattern);
  }

  /**
   * Waits for the page to reach networkidle state.
   * Use when page loads async content after initial render.
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Returns true if the element is visible on the page.
   * @param locator - Element to check
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Returns the text content of an element.
   * @param locator - Element to read text from
   */
  async getElementText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? '';
  }

  /**
   * Scrolls the element into the visible viewport.
   * @param locator - Element to scroll to
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Waits for an element to become visible before proceeding.
   * @param locator - Element to wait for
   */
  async waitForElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }
}
