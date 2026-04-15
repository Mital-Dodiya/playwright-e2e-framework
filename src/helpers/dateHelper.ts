/**
 * DateHelper — Utility functions for date operations in test automation.
 * Useful for validating date fields, generating dynamic test data,
 * and handling date-based assertions across test scenarios.
 */
export class DateHelper {

  /**
   * Returns today's date in DD/MM/YYYY format.
   */
  static getTodayFormatted(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  /**
   * Returns today's date in YYYY-MM-DD format.
   */
  static getTodayISO(): string {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Returns a future date by adding given number of days.
   * @param days - Number of days to add from today
   */
  static getFutureDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  /**
   * Returns a past date by subtracting given number of days.
   * @param days - Number of days to subtract from today
   */
  static getPastDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  /**
   * Returns current timestamp in readable format.
   * Useful for generating unique test data like usernames or emails.
   */
  static getTimestamp(): string {
    return new Date().getTime().toString();
  }

  /**
   * Generates a unique email using current timestamp.
   * Useful for registration tests that need unique emails.
   * @param prefix - Email prefix (default: testuser)
   */
  static generateUniqueEmail(prefix: string = 'testuser'): string {
    return `${prefix}_${this.getTimestamp()}@test.com`;
  }

  /**
   * Checks if a given date string is in DD/MM/YYYY format.
   * @param dateString - The date string to validate
   */
  static isValidDateFormat(dateString: string): boolean {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(dateString);
  }

  /**
   * Returns current year as a number.
   */
  static getCurrentYear(): number {
    return new Date().getFullYear();
  }

  /**
   * Returns current month name.
   */
  static getCurrentMonthName(): string {
    return new Date().toLocaleString('default', { month: 'long' });
  }
}
