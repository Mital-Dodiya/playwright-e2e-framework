import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  async verifyOverviewPageLoaded(): Promise<void> {
    await this.verifyPageTitle('Swag Labs');
    await this.verifyPageHeading(this.pageTitle, 'Checkout: Overview');
    await expect(this.finishButton).toBeVisible();
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getSubtotal(): Promise<string> {
    return (await this.subtotalLabel.textContent()) ?? '';
  }

  async getTax(): Promise<string> {
    return (await this.taxLabel.textContent()) ?? '';
  }

  async getTotal(): Promise<string> {
    return (await this.totalLabel.textContent()) ?? '';
  }

  async verifyItemInSummary(itemName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: itemName });
    await expect(item).toBeVisible();
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }
}
