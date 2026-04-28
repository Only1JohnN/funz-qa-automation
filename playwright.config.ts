import { defineConfig, devices } from '@playwright/test';
import { testConfig } from './tests/config/testConfig';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests/specs',
  timeout: testConfig.timeout,
  retries: testConfig.retries,
  use: {
    baseURL: testConfig.baseURL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['./tests/reporters/teamsReporter.ts']   // custom reporter
  ],
});