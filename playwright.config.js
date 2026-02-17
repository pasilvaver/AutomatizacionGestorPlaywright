import { defineConfig, devices } from '@playwright/test';
//import dotenv from 'dotenv';
import * as dotenv from 'dotenv';
//dotenv.config();
dotenv.config({ path: 'dotenv.env' });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // globalSetup: './config/global-setup.ts',
  testDir: './tests',
  timeout: 120000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    // [
    //   'json',
    //   {
    //     outputFile: 'results.json',
    //   },
    // ],
    [
      'html',
      {
        open: 'never',
        outputFolder: 'results',
      },
    ],
    [
      'junit',
      {
        outputFile: 'results/junit.xml',
      },
    ],
   // ['./reporters/email.reporter.ts'],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://gestordescuentos-qa.abastible.cl/login',
    timezoneId: 'America/Santiago',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    //headless: process.env.CI ? true : false, // Run tests in headless mode by default.
    headless: false,
    video: {
      mode: 'on',
      size: { width: 1280, height: 720 },
    },
    launchOptions: {
      args: [
        '--disable-features=StoragePartitioning',
        '--disable-site-isolation-trials'
      ]
    },
     actionTimeout: 120000, // Tiempo máximo para cada clic/fill (15s)    
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome',
        viewport:null,
        launchOptions: {
          args: ["--start-maximized"],
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
         },
       // Credentials for HTTP authentication.
          httpCredentials: {
            username: process.env.BASIC_USER,
            password: process.env.BASIC_PASS,
          },
        },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  
});