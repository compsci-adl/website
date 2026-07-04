import { defineConfig, devices } from '@playwright/test';

/** See https://playwright.dev/docs/test-configuration. */
export default defineConfig({
  testDir: './tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',

    viewport: { width: 1440, height: 900 },

    /* Collect trace when retrying a failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    env: {
      SKIP_ENV_VALIDATION: 'true',
      MOCK_SQUARE: 'true',
      PORT: '3000',
      AUTH_URL: 'http://localhost:3000',
      NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI: 'http://localhost:3000/join',
      DATABASE_URL: 'file:dev.sqlite',
      NEXT_PUBLIC_CONTAINER_KEYCLOAK_ENDPOINT: 'http://127.0.0.1:8080',
      NEXT_PUBLIC_LOCAL_KEYCLOAK_URL: 'http://127.0.0.1:8080',
      NEXT_PUBLIC_AUTH_REALM: 'cs-club',
      AUTH_KEYCLOAK_ID: 'website',
      AUTH_KEYCLOAK_SECRET: 'secret',
      AUTH_SECRET: 'secret-auth-key-32-chars-long-or-more',
      NEXT_PUBLIC_DRIVE_LINK: 'https://example.com/drive',
      NEXT_PUBLIC_PAYLOAD_URI: 'http://127.0.0.1:4000',
      REDIS_URI: process.env.REDIS_URI || '',
      SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN || '',
      SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID || '',
    },
  },
});
