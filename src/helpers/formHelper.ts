import { Page, Locator } from '@playwright/test';

/**
 * FormHelper — Utility for handling complex form interactions in Playwright.
 * Provides reusable methods for filling, clearing, validating, and submitting forms.
 * Reduces repetitive form interaction code across test scenarios.
 */
export class FormHelper {

  /**
   * Fills multiple form fields from a data object in one call.
   * @param page - Playwright page instance
   * @param formData - Object mapping selector to value
   */
  static async fillForm(
    page: Page,
    formData: Record<string, string>
  ): Promise<void> {
    for (const [selector, value] of Object.entries(formData)) {
      await page.locator(selector).waitFor({ state: 'visible' });
      await page.locator(selector).clear();
      await page.locator(selector).fill(value);
    }
  }

  /**
   * Clears all fields in a form.
   * @param page - Playwright page instance
   * @param selectors - Array of field selectors to clear
   */
  static async clearForm(
    page: Page,
    selectors: string[]
  ): Promise<void> {
    for (const selector of selectors) {
      await page.locator(selector).clear();
    }
  }

  /**
   * Selects an option from a dropdown by visible text.
   * @param locator - Select element locator
   * @param optionText - Visible text of the option to select
   */
  static async selectByText(
    locator: Locator,
    optionText: string
  ): Promise<void> {
    await locator.selectOption({ label: optionText });
  }

  /**
   * Selects an option from a dropdown by value attribute.
   * @param locator - Select element locator
   * @param value - Value attribute of the option
   */
  static async selectByValue(
    locator: Locator,
    value: string
  ): Promise<void> {
    await locator.selectOption({ value });
  }

  /**
   * Checks a checkbox if not already checked.
   * @param locator - Checkbox locator
   */
  static async checkCheckbox(locator: Locator): Promise<void> {
    const isChecked = await locator.isChecked();
    if (!isChecked) await locator.check();
  }

  /**
   * Unchecks a checkbox if currently checked.
   * @param locator - Checkbox locator
   */
  static async uncheckCheckbox(locator: Locator): Promise<void> {
    const isChecked = await locator.isChecked();
    if (isChecked) await locator.uncheck();
  }

  /**
   * Gets the current value of an input field.
   * @param locator - Input field locator
   */
  static async getInputValue(locator: Locator): Promise<string> {
    return await locator.inputValue();
  }

  /**
   * Verifies a field has the expected value.
   * @param locator - Input field locator
   * @param expectedValue - Expected value to verify
   */
  static async verifyFieldValue(
    locator: Locator,
    expectedValue: string
  ): Promise<boolean> {
    const actual = await locator.inputValue();
    return actual === expectedValue;
  }

  /**
   * Submits a form by pressing Enter on the last field.
   * @param locator - Last field or submit trigger locator
   */
  static async submitByEnter(locator: Locator): Promise<void> {
    await locator.press('Enter');
  }

  /**
   * Types text character by character — useful for autocomplete fields.
   * @param locator - Input field locator
   * @param text - Text to type slowly
   * @param delayMs - Delay between keystrokes in ms (default 50)
   */
  static async typeSlowly(
    locator: Locator,
    text: string,
    delayMs: number = 50
  ): Promise<void> {
    await locator.click();
    await locator.type(text, { delay: delayMs });
  }
}
