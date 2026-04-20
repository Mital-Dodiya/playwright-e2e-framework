import { Page, expect } from '@playwright/test';

/**
 * VisualHelper — Utility for visual regression testing using Playwright's
 * built-in screenshot comparison. Captures and compares page snapshots
 * to detect unintended UI changes across releases.
 */
export class VisualHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Takes a full page screenshot and saves it with a given name.
   * @param name - Screenshot file name (without extension)
   */
  async takeFullPageScreenshot(name: string): Promise<Buffer> {
    return await this.page.screenshot({
      fullPage: true,
      path: `test-results/screenshots/${name}.png`,
    });
  }

  /**
   * Takes a screenshot of a specific element.
   * @param selector - CSS selector of the element
   * @param name - Screenshot file name
   */
  async takeElementScreenshot(selector: string, name: string): Promise<Buffer> {
    const element = this.page.locator(selector);
    return await element.screenshot({
      path: `test-results/screenshots/${name}.png`,
    });
  }

  /**
   * Compares current page against a stored baseline snapshot.
   * Fails if pixel difference exceeds threshold.
   * @param snapshotName - Name of the baseline snapshot
   * @param threshold - Allowed pixel difference ratio (default 0.2)
   */
  async compareWithBaseline(
    snapshotName: string,
    threshold: number = 0.2
  ): Promise<void> {
    await expect(this.page).toHaveScreenshot(`${snapshotName}.png`, {
      maxDiffPixelRatio: threshold,
    });
  }

  /**
   * Compares a specific element against its baseline snapshot.
   * @param selector - CSS selector of element to compare
   * @param snapshotName - Name of the baseline snapshot
   */
  async compareElementWithBaseline(
    selector: string,
    snapshotName: string
  ): Promise<void> {
    const element = this.page.locator(selector);
    await expect(element).toHaveScreenshot(`${snapshotName}.png`);
  }

  /**
   * Masks dynamic elements before visual comparison.
   * Useful for ignoring timestamps, avatars, or random content.
   * @param selectors - Array of CSS selectors to mask
   */
  async compareWithMaskedElements(
    snapshotName: string,
    selectors: string[]
  ): Promise<void> {
    const mask = selectors.map((s) => this.page.locator(s));
    await expect(this.page).toHaveScreenshot(`${snapshotName}.png`, {
      mask,
      maxDiffPixelRatio: 0.2,
    });
  }
}
