import { expect, test } from '@playwright/test';

test.describe('UI/UX Landing Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the landing page before each test
        await page.goto('/');
    });

    test('should display main branding and logo', async ({ page }) => {
        // Verify that the CS CLUB branding text is visible (in whichever header matches the viewport)
        const brandingText = page.locator('h1', { hasText: 'CS CLUB' }).filter({ visible: true });
        await expect(brandingText.first()).toBeVisible();

        // Verify the club logo is visible
        const logo = page
            .locator('img[alt="Computer Science Club Logo"]')
            .filter({ visible: true });
        await expect(logo.first()).toBeVisible();
    });

    test('should render the footer with correct copyright and info', async ({ page }) => {
        const footer = page.locator('footer');
        await expect(footer).toBeVisible();

        // Footer contains copyright text referring to Adelaide University Computer Science Club
        const footerText = page.locator('footer p', {
            hasText: 'Adelaide University Computer Science Club',
        });
        await expect(footerText).toBeVisible();
    });

    test('should navigate to home when clicking on visible header branding', async ({ page }) => {
        const brandingLink = page
            .locator('a', { hasText: 'CS CLUB' })
            .filter({ visible: true })
            .first();
        await brandingLink.click();
        await expect(page).toHaveURL('/');
    });

    test('should adapt layout to mobile responsive states and show hamburger menu', async ({
        page,
    }) => {
        // Resize viewport to mobile dimensions
        await page.setViewportSize({ width: 375, height: 667 });

        // Confirm mobile menu trigger (hamburger menu icon) is visible
        const menuButton = page.locator('[aria-label="Menu"]').first();
        await expect(menuButton).toBeVisible();
    });
});
