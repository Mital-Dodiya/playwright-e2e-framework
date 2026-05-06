import { Page, Locator, expect } from '@playwright/test';

/**
 * TableHelper — Utility for interacting with and validating HTML table data.
 * Useful for enterprise applications with data grids, reports, and list views.
 * Provides reusable methods for reading, searching and asserting table content.
 */
export class TableHelper {
  private page: Page;
  private tableLocator: Locator;

  constructor(page: Page, tableSelector: string) {
    this.page = page;
    this.tableLocator = page.locator(tableSelector);
  }

  /**
   * Returns total number of rows in the table body.
   * Excludes header row.
   */
  async getRowCount(): Promise<number> {
    return await this.tableLocator.locator('tbody tr').count();
  }

  /**
   * Returns total number of columns in the table header.
   */
  async getColumnCount(): Promise<number> {
    return await this.tableLocator.locator('thead th').count();
  }

  /**
   * Returns all header column names as an array.
   */
  async getHeaders(): Promise<string[]> {
    const headers = await this.tableLocator.locator('thead th').all();
    return Promise.all(headers.map(h => h.innerText()));
  }

  /**
   * Returns cell value at specific row and column index.
   * @param rowIndex - Zero-based row index
   * @param colIndex - Zero-based column index
   */
  async getCellValue(rowIndex: number, colIndex: number): Promise<string> {
    return await this.tableLocator
      .locator('tbody tr')
      .nth(rowIndex)
      .locator('td')
      .nth(colIndex)
      .innerText();
  }

  /**
   * Returns all values in a specific column as an array.
   * @param colIndex - Zero-based column index
   */
  async getColumnValues(colIndex: number): Promise<string[]> {
    const rows = await this.tableLocator.locator('tbody tr').all();
    return Promise.all(
      rows.map(row => row.locator('td').nth(colIndex).innerText())
    );
  }

  /**
   * Returns all values in a specific row as an array.
   * @param rowIndex - Zero-based row index
   */
  async getRowValues(rowIndex: number): Promise<string[]> {
    const cells = await this.tableLocator
      .locator('tbody tr')
      .nth(rowIndex)
      .locator('td')
      .all();
    return Promise.all(cells.map(cell => cell.innerText()));
  }

  /**
   * Searches for a row containing specific text and returns its index.
   * Returns -1 if not found.
   * @param searchText - Text to search for in the table
   */
  async findRowByText(searchText: string): Promise<number> {
    const rows = await this.tableLocator.locator('tbody tr').all();
    for (let i = 0; i < rows.length; i++) {
      const text = await rows[i].innerText();
      if (text.includes(searchText)) return i;
    }
    return -1;
  }

  /**
   * Asserts that a specific cell contains expected text.
   * @param rowIndex - Zero-based row index
   * @param colIndex - Zero-based column index
   * @param expectedText - Expected text in the cell
   */
  async verifyCellText(
    rowIndex: number,
    colIndex: number,
    expectedText: string
  ): Promise<void> {
    const cell = this.tableLocator
      .locator('tbody tr')
      .nth(rowIndex)
      .locator('td')
      .nth(colIndex);
    await expect(cell).toContainText(expectedText);
  }

  /**
   * Asserts table has expected number of rows.
   * @param expectedCount - Expected row count
   */
  async verifyRowCount(expectedCount: number): Promise<void> {
    const count = await this.getRowCount();
    expect(count).toBe(expectedCount);
  }

  /**
   * Asserts that table contains a row with specific text.
   * @param searchText - Text that should exist somewhere in the table
   */
  async verifyTableContains(searchText: string): Promise<void> {
    await expect(this.tableLocator).toContainText(searchText);
  }

  /**
   * Clicks an action button in a specific row.
   * @param rowIndex - Zero-based row index
   * @param buttonText - Text of the button to click
   */
  async clickRowAction(rowIndex: number, buttonText: string): Promise<void> {
    await this.tableLocator
      .locator('tbody tr')
      .nth(rowIndex)
      .getByRole('button', { name: buttonText })
      .click();
  }
}
