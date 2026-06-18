// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  timeout: 180000, // 3 minutes - needed for iframe tests with video/trace

  expect: {
    timeout: 8000, // assertions with video overhead
  },

  //testDir: './tests',
  // testDir: './TestOnline',
  //testDir: './KPI',
  testDir: './Testcontact',

  /* Run tests in files in parallel */
  fullyParallel: true,

  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  retries :1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  reporter: [ ['html'], ['allure-playwright', { outputFolder: 'allure-results' }] ],
   
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 15000,          // increased for iframe operations
    navigationTimeout: 20000,      // page loads with video overhead
    viewport: { width: 1366, height: 768 },
    screenshot: 'on',              // record ALL screenshots
    video: 'retain-on-failure',                   // record ALL videos - this was the issue!
    videosDir: './test-results/videos',
    trace: 'on',                   // record ALL traces

    launchOptions: {
      slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0,
    },
     
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
  },

  /* Configure projects for major browsers */
  projects: [
    {name: 'chromium',use: { ...devices['Desktop Chrome'] }, },

    //{name: 'firefox', use: { ...devices['Desktop Firefox'] }, },

    //{name: 'webkit', use: { ...devices['Desktop Safari'] },},

    /* Test against mobile viewports. */
    // {name: 'Mobile Chrome',use: { ...devices['Pixel 5'] },},
    // { name: 'Mobile Safari', use: { ...devices['iPhone 12'] },},

    /* Test against branded browsers. */
    // { name: 'Microsoft Edge',use: { ...devices['Desktop Edge'], channel: 'msedge' },},
    // { name: 'Google Chrome',use: { ...devices['Desktop Chrome'], channel: 'chrome' },},
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

