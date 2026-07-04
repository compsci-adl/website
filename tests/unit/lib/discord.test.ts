import {
    getOAuthUrl,
    getOAuthTokens,
    getAccessToken,
    getUserData,
    pushMetadata,
} from '@/lib/discord';
import { getDiscordTokens, storeDiscordTokens } from '@/lib/storage';
import assert from 'node:assert/strict';
import { describe, it, beforeEach, afterEach } from 'node:test';

describe('Discord API integration library', () => {
    const originalFetch = globalThis.fetch;
    let lastFetchUrl: string | null = null;
    let lastFetchOptions: any = null;
    let mockResponseData: any = {};
    let mockResponseOk = true;
    let mockResponseStatusText = 'OK';

    beforeEach(() => {
        lastFetchUrl = null;
        lastFetchOptions = null;
        mockResponseData = {};
        mockResponseOk = true;
        mockResponseStatusText = 'OK';

        globalThis.fetch = async (url: any, options: any) => {
            lastFetchUrl = url.toString();
            lastFetchOptions = options;
            return {
                ok: mockResponseOk,
                statusText: mockResponseStatusText,
                json: async () => mockResponseData,
            } as any;
        };
    });

    afterEach(() => {
        globalThis.fetch = originalFetch;
    });

    it('generates a valid OAuth URL and state', () => {
        const { state, url } = getOAuthUrl();
        assert.ok(state);
        assert.ok(url.includes('discord.com/api/oauth2/authorize'));
        assert.ok(url.includes(`state=${state}`));
        assert.ok(url.includes('scope=role_connections.write+identify'));
    });

    it('requests OAuth tokens using code successfully', async () => {
        mockResponseData = { access_token: 'foo', refresh_token: 'bar' };

        const tokens = await getOAuthTokens('test-code');

        assert.deepEqual(tokens, { access_token: 'foo', refresh_token: 'bar' });
        assert.strictEqual(lastFetchUrl, 'https://discord.com/api/v10/oauth2/token');
        assert.ok(lastFetchOptions.body.toString().includes('code=test-code'));
        assert.ok(lastFetchOptions.body.toString().includes('grant_type=authorization_code'));
    });

    it('throws error when requesting OAuth tokens fails', async () => {
        mockResponseOk = false;
        mockResponseStatusText = 'Bad Request';

        await assert.rejects(
            async () => await getOAuthTokens('invalid-code'),
            /OAuth token error: Bad Request/
        );
    });

    it('returns access token directly if not expired', async () => {
        const tokens = {
            access_token: 'live-access-token',
            refresh_token: 'some-refresh-token',
            expires_at: Date.now() + 100000,
        };

        const token = await getAccessToken('user-1', tokens);

        assert.strictEqual(token, 'live-access-token');
        assert.strictEqual(lastFetchUrl, null); // No fetch request should be made
    });

    it('refreshes token and stores it if expired', async () => {
        const tokens = {
            access_token: 'expired-access-token',
            refresh_token: 'refresh-token-abc',
            expires_at: Date.now() - 1000,
        };

        mockResponseData = {
            access_token: 'new-access-token',
            refresh_token: 'new-refresh-token',
            expires_in: 3600,
        };

        const token = await getAccessToken('user-1', tokens);

        assert.strictEqual(token, 'new-access-token');
        assert.strictEqual(lastFetchUrl, 'https://discord.com/api/v10/oauth2/token');
        assert.ok(lastFetchOptions.body.toString().includes('grant_type=refresh_token'));
        assert.ok(lastFetchOptions.body.toString().includes('refresh_token=refresh-token-abc'));

        // Check that storage was updated
        const stored = await getDiscordTokens('user-1');
        assert.ok(stored);
        assert.strictEqual((stored as any).access_token, 'new-access-token');
        assert.strictEqual((stored as any).refresh_token, 'new-refresh-token');
        assert.ok((stored as any).expires_at > Date.now());
    });

    it('throws error when refreshing expired token fails', async () => {
        const tokens = {
            access_token: 'expired-access-token',
            refresh_token: 'refresh-token-abc',
            expires_at: Date.now() - 1000,
        };

        mockResponseOk = false;
        mockResponseStatusText = 'Unauthorized';

        await assert.rejects(
            async () => await getAccessToken('user-1', tokens),
            /Refresh token error: Unauthorized/
        );
    });

    it('gets user data successfully', async () => {
        mockResponseData = { id: 'discord-id-123', username: 'alice' };

        const data = await getUserData({ access_token: 'token-123' });

        assert.deepEqual(data, { id: 'discord-id-123', username: 'alice' });
        assert.strictEqual(lastFetchUrl, 'https://discord.com/api/v10/oauth2/@me');
        assert.strictEqual(lastFetchOptions.headers.Authorization, 'Bearer token-123');
    });

    it('throws error when getting user data fails', async () => {
        mockResponseOk = false;

        await assert.rejects(
            async () => await getUserData({ access_token: 'token-123' }),
            /Failed to fetch user data/
        );
    });

    it('pushes metadata successfully', async () => {
        const tokens = {
            access_token: 'token-123',
            expires_at: Date.now() + 100000,
        };

        mockResponseOk = true;

        await pushMetadata('user-1', tokens, { is_member: 1 });

        assert.ok(lastFetchUrl?.includes('/role-connection'));
        assert.strictEqual(lastFetchOptions.method, 'PUT');
        assert.strictEqual(lastFetchOptions.headers.Authorization, 'Bearer token-123');
        assert.deepEqual(JSON.parse(lastFetchOptions.body), {
            platform_name: 'CS Club Linked Roles',
            metadata: { is_member: 1 },
        });
    });

    it('throws error when pushing metadata fails', async () => {
        const tokens = {
            access_token: 'token-123',
            expires_at: Date.now() + 100000,
        };

        mockResponseOk = false;
        mockResponseStatusText = 'Forbidden';

        await assert.rejects(
            async () => await pushMetadata('user-1', tokens, { is_member: 1 }),
            /Failed to push metadata: Forbidden/
        );
    });

    it('handles missing env vars and inputs gracefully (nullish coalescing)', async () => {
        // getOAuthUrl with missing env vars
        const originalClientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
        const originalRedirect = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI;
        const originalSecret = process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET;
        delete process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
        delete process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI;
        delete process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET;

        const { url } = getOAuthUrl();
        assert.ok(url.includes('client_id='));

        // getOAuthTokens with null code
        mockResponseData = { access_token: 'foo' };
        await getOAuthTokens(null as any);
        assert.ok(lastFetchOptions.body.toString().includes('code='));

        // getAccessToken with missing refresh token and env vars
        const tokens = {
            access_token: 'expired',
            expires_at: Date.now() - 1000,
        };
        mockResponseData = { access_token: 'new', expires_in: 60 };
        const token = await getAccessToken('user-2', tokens);
        assert.strictEqual(token, 'new');

        // Restore env vars
        process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID = originalClientId;
        process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI = originalRedirect;
        process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET = originalSecret;
    });
});
