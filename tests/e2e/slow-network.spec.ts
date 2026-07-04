import { expect, test } from '@playwright/test';

test.describe('Slow Network Worst-Case UX Tests', () => {
    test('should load the landing page successfully under high API latency', async ({ page }) => {
        // Set test timeout to 60 seconds
        test.setTimeout(60000);

        // Intercept external network requests (like CMS endpoints) and fulfill them with mocks
        await page.route('**/*', (route) => {
            const url = route.request().url();
            if (url.startsWith('http://localhost:3000/')) {
                route.continue();
            } else {
                route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ docs: [] }),
                });
            }
        });

        // Delay internal API routes by 3 seconds to simulate worst-case slow network latency
        // for data fetching, without throttling local static code assets.
        await page.route('**/api/**', async (route) => {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            await route.continue();
        });

        // Navigate to the landing page
        const response = await page.goto('/', { timeout: 30000 });

        // Ensure the landing page still loads successfully
        expect(response?.status()).toBe(200);

        // Verify branding is rendered correctly
        const branding = page
            .locator('h1', { hasText: 'CS CLUB' })
            .filter({ visible: true })
            .first();
        await expect(branding).toBeVisible();
    });
});
