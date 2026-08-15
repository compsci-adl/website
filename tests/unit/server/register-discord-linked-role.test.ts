import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

// Set up mock environment variables
process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID = 'mock-client-id';
process.env.DISCORD_TOKEN = 'mock-token';

let fetchUrl: string | null = null;
let fetchOptions: RequestInit | null = null;
let fetchResponseOk = true;
let fetchResponseText = '';
let fetchResponseJson: unknown = null;

// Save original fetch
const originalFetch = globalThis.fetch;

// Mock global fetch
globalThis.fetch = async (url: string | URL | Request, options?: RequestInit) => {
    fetchUrl = String(url);
    fetchOptions = options ?? null;
    return new Response(fetchResponseJson ? JSON.stringify(fetchResponseJson) : fetchResponseText, {
        status: fetchResponseOk ? 200 : 400,
    });
};

const { registerDiscordLinkedRole } = await import('@/server/register-discord-linked-role');

describe('registerDiscordLinkedRole server function', () => {
    it('sends correct metadata connection request to Discord API', async () => {
        fetchUrl = null;
        fetchOptions = null;
        fetchResponseOk = true;
        fetchResponseJson = { success: true };

        const result = await registerDiscordLinkedRole();

        assert.strictEqual(
            fetchUrl,
            'https://discord.com/api/v10/applications/mock-client-id/role-connections/metadata'
        );
        const opts = fetchOptions as RequestInit | null;
        assert.ok(opts);
        const headers = opts.headers as Record<string, string>;
        assert.strictEqual(opts.method, 'PUT');
        assert.strictEqual(headers?.Authorization, 'Bot mock-token');
        assert.deepEqual(JSON.parse(opts.body as string), [
            {
                key: 'member',
                name: 'CS Club Member',
                description: 'Is a verified member of the CS Club',
                type: 7,
            },
        ]);
        assert.deepEqual(result, { success: true });
    });

    it('throws Error when Discord API request fails', async () => {
        fetchResponseOk = false;
        fetchResponseJson = null;
        fetchResponseText = 'Rate limited or unauthorized';

        await assert.rejects(async () => {
            await registerDiscordLinkedRole();
        }, /Discord API error: Rate limited or unauthorized/);
    });
});
