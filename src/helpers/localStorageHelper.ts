import { Page } from '@playwright/test';

/**
 * LocalStorageHelper — Utility for managing browser localStorage and sessionStorage.
 * Useful for setting auth tokens, user preferences, feature flags, and test state.
 * Avoids repetitive UI flows by injecting data directly into browser storage.
 */
export class LocalStorageHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Sets a value in localStorage.
   * @param key - Storage key
   * @param value - Value to store (objects are auto-serialized)
   */
  async setItem(key: string, value: string | object): Promise<void> {
    const serialized = typeof value === 'object'
      ? JSON.stringify(value)
      : value;
    await this.page.evaluate(
      ([k, v]) => localStorage.setItem(k, v),
      [key, serialized]
    );
  }

  /**
   * Gets a value from localStorage.
   * @param key - Storage key to retrieve
   */
  async getItem(key: string): Promise<string | null> {
    return await this.page.evaluate(
      (k) => localStorage.getItem(k),
      key
    );
  }

  /**
   * Removes a specific key from localStorage.
   * @param key - Storage key to remove
   */
  async removeItem(key: string): Promise<void> {
    await this.page.evaluate(
      (k) => localStorage.removeItem(k),
      key
    );
  }

  /**
   * Clears all localStorage data.
   * Use in afterEach to ensure clean state between tests.
   */
  async clear(): Promise<void> {
    await this.page.evaluate(() => localStorage.clear());
  }

  /**
   * Returns total number of keys in localStorage.
   */
  async getLength(): Promise<number> {
    return await this.page.evaluate(() => localStorage.length);
  }

  /**
   * Returns all localStorage keys and values as an object.
   */
  async getAll(): Promise<Record<string, string>> {
    return await this.page.evaluate(() => {
      const result: Record<string, string> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) result[key] = localStorage.getItem(key) ?? '';
      }
      return result;
    });
  }

  /**
   * Sets a value in sessionStorage.
   * @param key - Storage key
   * @param value - Value to store
   */
  async setSessionItem(key: string, value: string | object): Promise<void> {
    const serialized = typeof value === 'object'
      ? JSON.stringify(value)
      : value;
    await this.page.evaluate(
      ([k, v]) => sessionStorage.setItem(k, v),
      [key, serialized]
    );
  }

  /**
   * Gets a value from sessionStorage.
   * @param key - Storage key to retrieve
   */
  async getSessionItem(key: string): Promise<string | null> {
    return await this.page.evaluate(
      (k) => sessionStorage.getItem(k),
      key
    );
  }

  /**
   * Clears all sessionStorage data.
   */
  async clearSession(): Promise<void> {
    await this.page.evaluate(() => sessionStorage.clear());
  }

  /**
   * Sets an auth token directly in localStorage.
   * Bypasses login UI for tests that need authenticated state.
   * @param token - Auth token value
   * @param key - Storage key (default: 'authToken')
   */
  async setAuthToken(
    token: string,
    key: string = 'authToken'
  ): Promise<void> {
    await this.setItem(key, token);
  }

  /**
   * Sets user preferences object in localStorage.
   * @param preferences - User preference object
   */
  async setUserPreferences(
    preferences: Record<string, unknown>
  ): Promise<void> {
    await this.setItem('userPreferences', preferences);
  }
}
