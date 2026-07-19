import { expect, test } from '@playwright/test';

test.describe('Public Pages Routing and Layout Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Intercept external network requests (like CMS endpoints) and fulfill them with mocks
        await page.route(
            (url) => !url.toString().startsWith('http://localhost:3000'),
            (route) => {
                route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ docs: [] }),
                });
            }
        );
    });

    test('should load the About page and display content', async ({ page }) => {
        const response = await page.goto('/about');
        expect(response?.status()).toBe(200);

        // Verify that the title element is present
        const title = page.locator('h1, h2, h3', { hasText: 'About Us' });
        await expect(title.first()).toBeVisible();
    });

    test('should load the Events page and display content', async ({ page }) => {
        const response = await page.goto('/events');
        expect(response?.status()).toBe(200);

        const heading = page.locator('h1, h2, h3', { hasText: 'Events' });
        await expect(heading.first()).toBeVisible();
    });

    test('should load the Sponsors page and display content', async ({ page }) => {
        const response = await page.goto('/sponsors');
        expect(response?.status()).toBe(200);

        const heading = page.locator('h1, h2, h3', { hasText: 'Sponsors' });
        await expect(heading.first()).toBeVisible();
    });

    test('should load the Contact page and display content', async ({ page }) => {
        const response = await page.goto('/contact');
        expect(response?.status()).toBe(200);

        const heading = page.locator('h1, h2, h3', { hasText: 'Contact' });
        await expect(heading.first()).toBeVisible();
    });

    test('should load the Open Source page and display content', async ({ page }) => {
        const response = await page.goto('/open-source');
        expect(response?.status()).toBe(200);

        const heading = page.locator('h1, h2, h3', { hasText: 'Open Source' });
        await expect(heading.first()).toBeVisible();
    });

    test('should load the Photo Gallery page and display content', async ({ page }) => {
        const response = await page.goto('/gallery');
        expect(response?.status()).toBe(200);

        const heading = page.locator('h1, h2, h3', { hasText: 'Gallery' });
        await expect(heading.first()).toBeVisible();
    });
});
