import { BrowserContext, Cookie } from '@playwright/test';

/**
 * CookieHelper — Utility for managing browser cookies in Playwright tests.
 * Useful for setting session cookies, auth cookies, and feature flag cookies.
 * Helps bypass repetitive login flows by injecting cookies directly.
 */
export class CookieHelper {
  private context: BrowserContext;

  constructor(context: BrowserContext) {
    this.context = context;
  }

  /**
   * Sets a single cookie in the browser context.
   * @param name - Cookie name
   * @param value - Cookie value
   * @param domain - Domain the cookie applies to
   * @param path - Cookie path (default: '/')
   */
  async setCookie(
    name: string,
    value: string,
    domain: string,
    path: string = '/'
  ): Promise<void> {
    await this.context.addCookies([{ name, value, domain, path }]);
  }

  /**
   * Sets multiple cookies at once from an array.
   * @param cookies - Array of cookie objects
   */
  async setCookies(cookies: Cookie[]): Promise<void> {
    await this.context.addCookies(cookies);
  }

  /**
   * Gets all cookies for the current context.
   */
  async getAllCookies(): Promise<Cookie[]> {
    return await this.context.cookies();
  }

  /**
   * Gets a specific cookie by name.
   * Returns undefined if cookie not found.
   * @param name - Cookie name to retrieve
   */
  async getCookieByName(name: string): Promise<Cookie | undefined> {
    const cookies = await this.context.cookies();
    return cookies.find(cookie => cookie.name === name);
  }

  /**
   * Gets cookies for a specific URL.
   * @param url - URL to get cookies for
   */
  async getCookiesForURL(url: string): Promise<Cookie[]> {
    return await this.context.cookies([url]);
  }

  /**
   * Clears all cookies from the browser context.
   * Use in afterEach for clean test isolation.
   */
  async clearAllCookies(): Promise<void> {
    await this.context.clearCookies();
  }

  /**
   * Checks if a specific cookie exists.
   * @param name - Cookie name to check
   */
  async cookieExists(name: string): Promise<boolean> {
    const cookie = await this.getCookieByName(name);
    return cookie !== undefined;
  }

  /**
   * Gets the value of a specific cookie.
   * Returns null if cookie not found.
   * @param name - Cookie name
   */
  async getCookieValue(name: string): Promise<string | null> {
    const cookie = await this.getCookieByName(name);
    return cookie?.value ?? null;
  }

  /**
   * Sets a session auth cookie directly.
   * Bypasses login UI for authenticated test scenarios.
   * @param sessionToken - Session token value
   * @param domain - Application domain
   * @param cookieName - Cookie name (default: 'session')
   */
  async setAuthCookie(
    sessionToken: string,
    domain: string,
    cookieName: string = 'session'
  ): Promise<void> {
    await this.setCookie(cookieName, sessionToken, domain);
  }

  /**
   * Saves current cookies to a JSON-serializable object.
   * Useful for reusing auth state across tests.
   */
  async exportCookies(): Promise<Cookie[]> {
    return await this.context.cookies();
  }

  /**
   * Imports previously saved cookies into the context.
   * @param cookies - Array of cookies to import
   */
  async importCookies(cookies: Cookie[]): Promise<void> {
    await this.context.addCookies(cookies);
  }
}
