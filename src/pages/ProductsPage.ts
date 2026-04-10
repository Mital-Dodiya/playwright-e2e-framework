import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly pageTitle: Locator;
  readonly productItems: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly burgerMenu: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.productItems = page.locator('.inventory_item');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.burgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async verifyProductsPageLoaded(): Promise<void> {
    await this.verifyPageTitle('Swag Labs');
    await this.verifyPageHeading(this.pageTitle, 'Products');
    await expect(this.productItems.first()).toBeVisible();
  }

  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }

  async addProductToCartByIndex(index: number): Promise<void> {
    const addButton = this.productItems.nth(index).locator('[data-test^="add-to-cart"]');
    await addButton.click();
  }

  async getCartItemCount(): Promise<string> {
    return (await this.cartBadge.textContent()) ?? '0';
  }

  async sortProductsBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getFirstProductName(): Promise<string> {
    return (await this.productItems.first().locator('.inventory_item_name').textContent()) ?? '';
  }

  async getProductNameByIndex(index: number): Promise<string> {
    return (await this.productItems.nth(index).locator('.inventory_item_name').textContent()) ?? '';
  }

  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  async getProductPriceByIndex(index: number): Promise<string> {
    return (
      (await this.productItems
        .nth(index)
        .locator('.inventory_item_price')
        .textContent()) ?? ''
    );
  }

  async logout(): Promise<void> {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }
}
