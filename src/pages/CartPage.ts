import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly removeButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.removeButtons = page.locator('[data-test^="remove"]');
  }

  async verifyCartPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async removeItemByIndex(index: number): Promise<void> {
    await this.removeButtons.nth(index).click();
  }

  async verifyCartIsEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async getItemNameByIndex(index: number): Promise<string> {
    return (await this.cartItems.nth(index).locator('.inventory_item_name').textContent()) ?? '';
  }
}
