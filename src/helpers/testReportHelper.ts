import * as fs from 'fs';
import * as path from 'path';

/**
 * TestReportHelper — Utility for generating custom test execution summaries.
 * Creates readable reports of test results for stakeholder communication.
 */
export interface TestSummary {
  suiteName: string;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  timestamp: string;
}

export class TestReportHelper {

  /**
   * Calculates pass rate percentage from test summary.
   * @param summary - Test execution summary object
   */
  static getPassRate(summary: TestSummary): number {
    if (summary.totalTests === 0) return 0;
    return Math.round((summary.passed / summary.totalTests) * 100);
  }

  /**
   * Returns a human readable test result status.
   * @param summary - Test execution summary object
   */
  static getStatus(summary: TestSummary): string {
    if (summary.failed === 0) return 'PASSED';
    if (summary.failed <= summary.totalTests * 0.1) return 'PASSED WITH WARNINGS';
    return 'FAILED';
  }

  /**
   * Formats duration from milliseconds to readable string.
   * @param ms - Duration in milliseconds
   */
  static formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }

  /**
   * Generates a plain text summary for Jira or Slack sharing.
   * @param summary - Test execution summary object
   */
  static generateTextSummary(summary: TestSummary): string {
    const passRate = this.getPassRate(summary);
    const status = this.getStatus(summary);
    const duration = this.formatDuration(summary.duration);

    return `
=== TEST EXECUTION SUMMARY ===
Suite:      ${summary.suiteName}
Status:     ${status}
Timestamp:  ${summary.timestamp}

Results:
  Total:    ${summary.totalTests}
  Passed:   ${summary.passed}
  Failed:   ${summary.failed}
  Skipped:  ${summary.skipped}
  Pass Rate: ${passRate}%

Duration: ${duration}
==============================
    `.trim();
  }

  /**
   * Saves test summary report to a file.
   * @param summary - Test execution summary
   * @param outputDir - Directory to save the report
   */
  static saveReport(summary: TestSummary, outputDir: string = 'test-results'): string {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const fileName = `summary-${Date.now()}.txt`;
    const filePath = path.join(outputDir, fileName);
    const content = this.generateTextSummary(summary);

    fs.writeFileSync(filePath, content, 'utf-8');
    return filePath;
  }

  /**
   * Creates a sample summary for testing purposes.
   */
  static createSampleSummary(): TestSummary {
    return {
      suiteName: 'Smoke Test Suite',
      totalTests: 16,
      passed: 15,
      failed: 1,
      skipped: 0,
      duration: 180000,
      timestamp: new Date().toISOString(),
    };
  }
}
