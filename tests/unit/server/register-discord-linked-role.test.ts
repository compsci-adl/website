import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

// Set up mock environment variables
process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID = 'mock-client-id';
process.env.DISCORD_TOKEN = 'mock-token';

let fetchUrl: string | null = null;
let fetchOptions: any = null;
let fetchResponseOk = true;
let fetchResponseText = '';
let fetchResponseJson: any = null;

// Save original fetch
const originalFetch = globalThis.fetch;

// Mock global fetch
globalThis.fetch = async (url: any, options: any) => {
    fetchUrl = String(url);
    fetchOptions = options;
    return {
        ok: fetchResponseOk,
        text: async () => fetchResponseText,
        json: async () => fetchResponseJson,
    } as any;
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
        assert.ok(fetchOptions);
        assert.strictEqual(fetchOptions.method, 'PUT');
        assert.strictEqual(fetchOptions.headers.Authorization, 'Bot mock-token');
        assert.deepEqual(JSON.parse(fetchOptions.body), [
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
        fetchResponseText = 'Rate limited or unauthorized';

        await assert.rejects(async () => {
            await registerDiscordLinkedRole();
        }, /Discord API error: Rate limited or unauthorized/);
    });
});
