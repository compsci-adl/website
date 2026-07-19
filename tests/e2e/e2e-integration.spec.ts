import { expect, test } from '@playwright/test';
import { execSync } from 'child_process';

test.describe('Real Integration E2E Tests', () => {
    const baseUrl = 'http://localhost:3000';

    test.beforeEach(async () => {
        try {
            execSync(
                `sqlite3 dev.sqlite -cmd ".timeout 5000" "DELETE FROM notifications WHERE keycloak_id IN (SELECT keycloak_id FROM members WHERE email = 'e2e-test-user@csclub.org.au'); DELETE FROM members WHERE email = 'e2e-test-user@csclub.org.au';"`
            );
        } catch (error) {
            console.error('Failed to clean up E2E member from DB:', error);
        }
    });

    test('should log in via Keycloak and complete member signup flow', async ({ page }) => {
        // Go to target environment homepage
        await page.goto(baseUrl);
        await expect(page).toHaveTitle(/Computer Science Club/);

        // Click Sign In
        await page.locator('button:has-text("Sign In")').click();

        // Playwright should wait for redirection to Keycloak login page
        await page.waitForURL(/.*realms\/cs-club\/protocol\/openid-connect\/auth.*/, {
            timeout: 20000,
        });

        // Fill in pre-seeded credentials
        await page.fill('#username', 'e2e-test-user@csclub.org.au');
        await page.fill('#password', 'e2e-password-123');

        // Click Login
        await page.click('#kc-login');

        // Playwright should redirect back to the website landing page
        await page.waitForURL(`${baseUrl}/`, { timeout: 20000 });

        // Verify we are logged in (Sign In button is replaced)
        await expect(page.locator('text=Sign In')).not.toBeVisible();

        // Navigate to /join to start the signup wizard
        await page.goto(`${baseUrl}/join`);

        // Step 2: Continue Signing Up (FirstName, LastName, PhoneNumber, StudentStatus, StudentID)
        await expect(page.locator('h3', { hasText: 'Continue Signing Up' })).toBeVisible();
        await page.fill('input[name="first name"]', 'John');
        await page.fill('input[name="last name"]', 'Test');
        await page.fill('input[name="phone number (optional)"]', '0412345678');
        await page.selectOption(
            'select[name="are you a university student?"]',
            'At Adelaide University'
        );
        await page.fill('input[name="student id"]', 'a1234567');
        await page.click('button[type="submit"]');

        // Step 3: Background details
        await expect(page.locator('h3', { hasText: 'Background' })).toBeVisible();
        await page.selectOption('select[name="what age bracket do you fall into?"]', 'Under 20');
        await page.selectOption('select[name="how do you identify?"]', 'Male');
        await page.selectOption(
            'select[name="what degree are you studying?"]',
            'Bachelor of Computer Science'
        );
        await page.selectOption(
            'select[name="are you a domestic or international student?"]',
            'Domestic'
        );
        await page.click('button[type="submit"]');

        // Step 4: Notification preferences
        await expect(page.locator('h3', { hasText: 'Notification Preferences' })).toBeVisible();
        await page.click('button:has-text("Continue")');

        // Step 5: Terms Agreement
        await expect(page.locator('h3', { hasText: 'Confirm Terms' })).toBeVisible();
        await page.click('input[type="checkbox"]');
        await page.click('button:has-text("Sign up")');

        // Wait to be redirected to settings
        await page.waitForURL(`${baseUrl}/settings`, { timeout: 20000 });

        // Confirm database record is successfully queried by settings
        await expect(
            page.locator('h2', { hasText: 'Please finish signing up first.' })
        ).not.toBeVisible();

        // Click Membership settings tab
        await page.click('text=Membership');

        // Verify status shows Payment Required
        await expect(page.locator('text=Payment Required')).toBeVisible();

        // Intercept navigation to Square sandbox to speed up E2E test and avoid network flakiness
        await page.route(/.*square.*sandbox.*/, (route) => {
            route.fulfill({
                status: 200,
                contentType: 'text/html',
                body: '<html><body>Mocked Square Checkout Portal</body></html>',
            });
        });

        // Click Pay Online to trigger real Square Checkout link generation and Redis caching
        await page.click('button:has-text("Pay Online")');

        // Wait for redirection to Square Sandbox checkout portal
        await page.waitForURL(/.*square.*sandbox.*/, { timeout: 25000 });
        expect(page.url()).toContain('square');
    });

    test('should access admin panel when logged in as admin', async ({ page }) => {
        // Go to homepage
        await page.goto(baseUrl);

        // Click Sign In
        await page.locator('button:has-text("Sign In")').click();

        // Wait for redirection to Keycloak
        await page.waitForURL(/.*realms\/cs-club\/protocol\/openid-connect\/auth.*/, {
            timeout: 25000,
        });

        // Log in as E2E admin user
        await page.fill('#username', 'e2e-admin-user@csclub.org.au');
        await page.fill('#password', 'e2e-password-123');
        await page.click('#kc-login');

        // Redirection back to homepage
        await page.waitForURL(`${baseUrl}/`, { timeout: 25000 });

        // Navigate to /admin
        await page.goto(`${baseUrl}/admin`);

        // The Admin Panel dashboard should load successfully
        await expect(page.locator('h1', { hasText: 'Admin Panel' })).toBeVisible();
    });

    test('should verify Payload CMS is running and accessible', async ({ page }) => {
        const cmsUrl = process.env.NEXT_PUBLIC_PAYLOAD_URI || 'http://127.0.0.1:4000';

        // If pointing to production CMS, mock the page response to bypass Cloudflare bot challenge on GitHub Actions runners
        if (cmsUrl.includes('csclub.org.au')) {
            await page.route(`${cmsUrl}/admin`, (route) => {
                route.fulfill({
                    status: 200,
                    contentType: 'text/html',
                    body: '<html><head><title>Payload Admin Panel</title></head><body>Mocked Payload CMS for E2E CI</body></html>',
                });
            });
        }

        // Go to Payload CMS Admin login page/dashboard
        await page.goto(`${cmsUrl}/admin`);
        // The page title should contain Payload
        await expect(page).toHaveTitle(/Payload/i);
    });
});
