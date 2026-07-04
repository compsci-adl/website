import { expect, test } from '@playwright/test';

test.describe('Authenticated User Flows', () => {
    // Helper to mock the next-auth session both on the browser and server-side (via HTTP header)
    const mockSession = async (page, userRole: 'admin' | 'user' | null) => {
        const context = page.context();
        if (userRole) {
            await context.setExtraHTTPHeaders({
                'x-mock-auth': userRole,
            });
        } else {
            await context.setExtraHTTPHeaders({});
        }

        // Mock the client-side API endpoint for browser calls
        await page.route('**/api/auth/session', (route) => {
            if (userRole) {
                route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        user: {
                            id: `mock-${userRole}-id`,
                            name: `Mock ${userRole}`,
                            email: `${userRole}@example.com`,
                            isCommittee: userRole === 'admin',
                            isAdmin: userRole === 'admin',
                        },
                        expires: '2026-12-31T23:59:59.999Z',
                    }),
                });
            } else {
                route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: '{}',
                });
            }
        });
    };

    // Helper to intercept ONLY external third-party calls
    test.beforeEach(async ({ page }) => {
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

    test('Anonymous user navigating to /admin gets a 404 Not Found', async ({ page }) => {
        await mockSession(page, null);
        const response = await page.goto('/admin');
        expect(response?.status()).toBe(404);
    });

    test('Anonymous user navigating to /settings gets a 404 Not Found', async ({ page }) => {
        await mockSession(page, null);
        const response = await page.goto('/settings');
        expect(response?.status()).toBe(404);
    });

    test('Standard logged-in user (non-admin) navigating to /admin gets a 404 Not Found', async ({
        page,
    }) => {
        await mockSession(page, 'user');
        const response = await page.goto('/admin');
        expect(response?.status()).toBe(404);
    });

    test('Admin user navigating to /admin successfully loads the admin dashboard title', async ({
        page,
    }) => {
        await mockSession(page, 'admin');
        const response = await page.goto('/admin');
        expect(response?.status()).toBe(200);

        const heading = page.locator('h1', { hasText: 'Admin Panel' }).first();
        await expect(heading).toBeVisible();
    });

    test('Logged in user navigating to /settings is prompted to sign up if not in DB', async ({
        page,
    }) => {
        await mockSession(page, 'user');
        const response = await page.goto('/settings');
        expect(response?.status()).toBe(200);

        // Verify the warning message appears
        const alertText = page.locator('h2', { hasText: 'Please finish signing up' }).first();
        await expect(alertText).toBeVisible();
    });

    test('Logged in user navigating to /join successfully loads the signup steps', async ({
        page,
    }) => {
        await mockSession(page, 'user');
        const response = await page.goto('/join');
        expect(response?.status()).toBe(200);

        // Verify that the Join Title or Wizard is present
        const title = page.locator('h1', { hasText: 'Join Us' }).first();
        await expect(title).toBeVisible();
    });
});
