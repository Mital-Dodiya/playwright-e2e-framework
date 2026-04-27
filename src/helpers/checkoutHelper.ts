import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { ENV } from '../config/environment';

/**
 * CheckoutHelper — End-to-end helper for completing the full purchase flow.
 * Combines multiple page objects into reusable high-level actions.
 * Reduces duplication across checkout test scenarios.
 */
export class CheckoutHelper {
  private loginPage: LoginPage;
  private productsPage: ProductsPage;
  private cartPage: CartPage;
  private checkoutPage: CheckoutPage;
  private checkoutOverviewPage: CheckoutOverviewPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.productsPage = new ProductsPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.checkoutOverviewPage = new CheckoutOverviewPage(page);
  }

  /**
   * Logs in and adds a product to cart in one step.
   * @param productIndex - Zero-based index of product to add
   */
  async loginAndAddToCart(productIndex: number = 0): Promise<void> {
    await this.loginPage.goto();
    await this.loginPage.login(
      ENV.users.standard.username,
      ENV.users.standard.password
    );
    await this.productsPage.addProductToCartByIndex(productIndex);
    await this.productsPage.goToCart();
  }

  /**
   * Completes the full checkout flow from cart to confirmation.
   * @param firstName - Customer first name
   * @param lastName - Customer last name
   * @param postalCode - Customer postal code
   */
  async completeCheckout(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.cartPage.proceedToCheckout();
    await this.checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await this.checkoutPage.clickContinue();
    await this.checkoutOverviewPage.clickFinish();
  }

  /**
   * Runs the full purchase journey — login to order confirmation.
   * @param productIndex - Product to purchase
   * @param customerInfo - Customer details for checkout
   */
  async completePurchaseJourney(
    productIndex: number = 0,
    customerInfo = { firstName: 'Mital', lastName: 'Dodiya', postalCode: '380001' }
  ): Promise<void> {
    await this.loginAndAddToCart(productIndex);
    await this.completeCheckout(
      customerInfo.firstName,
      customerInfo.lastName,
      customerInfo.postalCode
    );
  }

  /**
   * Gets the order total from checkout overview page.
   */
  async getOrderTotal(): Promise<string> {
    return await this.checkoutOverviewPage.getTotal();
  }

  /**
   * Verifies order confirmation is displayed.
   */
  async verifyOrderConfirmed(): Promise<void> {
    await this.checkoutPage.verifyOrderConfirmation();
  }
}
