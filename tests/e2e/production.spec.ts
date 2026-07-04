import { test, expect } from '@playwright/test';

test.describe('Production Services Check', () => {
    test('website is up and fetches CMS data successfully', async ({ page }) => {
        // Go to live website
        const response = await page.goto('https://csclub.org.au');
        expect(response?.status()).toBe(200);

        // Check website main elements are loaded (website is up)
        await expect(
            page.locator('h1, h2, h3, span', { hasText: 'Computer Science Club' }).first()
        ).toBeVisible();

        // Check that sponsors / about / events sections load (CMS data)
        await expect(page.locator('h3', { hasText: 'Supported By' }).first()).toBeVisible();
    });

    test('keycloak login redirect gives expected results', async ({ page }) => {
        // Go to signin page to trigger Keycloak login redirect
        await page.goto('https://csclub.org.au/api/auth/signin?callbackUrl=%2Fjoin');

        // Look for the signin button in the NextAuth page
        const signInBtn = page.locator(
            'button:has-text("Keycloak"), button:has-text("Sign in with"), input[type="submit"]'
        );

        // If NextAuth signin selection page is shown, click Keycloak signin button
        if (await signInBtn.isVisible()) {
            await signInBtn.first().click();
        }

        // Wait for page to navigate to the Keycloak authentication realm
        await page.waitForLoadState('networkidle');

        // Verify it redirected to Keycloak domain containing the cs-club realm
        const currentUrl = page.url();
        console.log('Production Keycloak Redirect URL:', currentUrl);

        // Assert that the redirected URL is the Keycloak login flow
        expect(currentUrl).toContain('cs-club');
        expect(currentUrl).toMatch(/openid-connect|protocol|auth|login/);
    });

    test('cms endpoints respond correctly', async ({ request }) => {
        // Directly check live CMS endpoint
        const res = await request.get('https://cms.csclub.org.au/api/sponsors?limit=1');
        expect(res.status()).toBe(200);
        const data = await res.json();
        expect(data).toHaveProperty('docs');
    });
});
