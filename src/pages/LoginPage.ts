import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage — Page Object for the Sauce Demo login screen.
 * Handles all login-related element interactions and validations.
 * URL: https://www.saucedemo.com
 */
export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly loginLogo: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.loginLogo = page.locator('.login_logo');
  }

  /** Navigates to the login page (root URL). */
  async goto(): Promise<void> {
    await this.navigateTo('/');
  }

  /**
   * Fills in credentials and submits the login form.
   * @param username - The username to enter
   * @param password - The password to enter
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Verifies the login page has loaded correctly.
   * Checks: page title, logo, username and password fields.
   */
  async verifyLoginPageLoaded(): Promise<void> {
    await this.verifyPageTitle('Swag Labs');
    await expect(this.loginLogo).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  /**
   * Verifies an error message is shown on failed login.
   * @param expectedMessage - The expected error message text
   */
  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}
