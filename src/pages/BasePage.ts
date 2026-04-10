import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async verifyPageTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async verifyPageHeading(locator: Locator, expectedHeading: string): Promise<void> {
    await expect(locator).toHaveText(expectedHeading);
  }

  async verifyCurrentURL(urlPattern: RegExp): Promise<void> {
    await expect(this.page).toHaveURL(urlPattern);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async isElementVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async getElementText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? '';
  }

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async waitForElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }
}
