import type { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import { sendTeamsReport } from '../utils/teamsNotifier';

class TeamsReporter implements Reporter {
  private passed = 0;
  private failed = 0;
  private skipped = 0;
  private firstFailure: { title: string; error: string } | undefined;
  private startTime = 0;

  onBegin(config: FullConfig, suite: Suite) {
    this.startTime = Date.now();
  }

  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'passed') this.passed++;
    else if (result.status === 'failed') {
      this.failed++;
      if (!this.firstFailure) {
        this.firstFailure = {
          title: test.title,
          error: result.error?.message?.split('\n')[0] || 'Unknown error'
        };
      }
    } else if (result.status === 'skipped') this.skipped++;
  }

  async onEnd(result: FullResult) {
    const durationMs = Date.now() - this.startTime;
    const duration = `${Math.floor(durationMs / 60000)}m ${Math.floor((durationMs % 60000) / 1000)}s`;

    await sendTeamsReport({
      passed: this.passed,
      failed: this.failed,
      skipped: this.skipped,
      firstFailure: this.firstFailure,
      duration,
      runUrl: process.env.GITHUB_SERVER_URL 
        ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
        : 'https://github.com'
    });
  }
}

export default TeamsReporter;