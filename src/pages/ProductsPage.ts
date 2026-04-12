import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ProductsPage — Page Object for the Sauce Demo inventory/products screen.
 * Handles product listing, cart actions, sorting, and navigation.
 * URL: https://www.saucedemo.com/inventory.html
 */
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

  /**
   * Verifies the products page has loaded correctly.
   * Checks: page title, heading, and at least one product visible.
   */
  async verifyProductsPageLoaded(): Promise<void> {
    await this.verifyPageTitle('Swag Labs');
    await this.verifyPageHeading(this.pageTitle, 'Products');
    await expect(this.productItems.first()).toBeVisible();
  }

  /** Returns the total number of products displayed on the page. */
  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }

  /**
   * Clicks the Add to Cart button for a product at a given index.
   * @param index - Zero-based index of the product
   */
  async addProductToCartByIndex(index: number): Promise<void> {
    const addButton = this.productItems.nth(index).locator('[data-test^="add-to-cart"]');
    await addButton.click();
  }

  /** Returns the number shown on the cart badge icon. */
  async getCartItemCount(): Promise<string> {
    return (await this.cartBadge.textContent()) ?? '0';
  }

  /**
   * Selects a sort option from the sort dropdown.
   * @param option - Sort option value: 'az', 'za', 'lohi', 'hilo'
   */
  async sortProductsBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  /** Returns the name of the first product in the list. */
  async getFirstProductName(): Promise<string> {
    return (await this.productItems.first().locator('.inventory_item_name').textContent()) ?? '';
  }

  /**
   * Returns the name of a product at a given index.
   * @param index - Zero-based index of the product
   */
  async getProductNameByIndex(index: number): Promise<string> {
    return (await this.productItems.nth(index).locator('.inventory_item_name').textContent()) ?? '';
  }

  /**
   * Returns the price of a product at a given index.
   * @param index - Zero-based index of the product
   */
  async getProductPriceByIndex(index: number): Promise<string> {
    return (
      (await this.productItems.nth(index).locator('.inventory_item_price').textContent()) ?? ''
    );
  }

  /** Clicks the cart icon to navigate to the cart page. */
  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  /** Opens the burger menu and clicks logout. */
  async logout(): Promise<void> {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }
}
