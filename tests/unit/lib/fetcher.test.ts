import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

// Register the module mock BEFORE importing anything that uses it
mock.module('ky', {
    exports: {
        default: {
            create: () => {
                return {
                    get: (url: string) => {
                        return {
                            json: async () => ({ success: true, method: 'GET', url }),
                        };
                    },
                    post: (url: string, options: { json: unknown }) => {
                        return {
                            json: async () => ({
                                success: true,
                                method: 'POST',
                                url,
                                body: options.json,
                            }),
                        };
                    },
                    put: () => ({ json: async () => ({ success: true, method: 'PUT' }) }),
                    delete: () => ({ json: async () => ({ success: true, method: 'DELETE' }) }),
                    patch: () => ({ json: async () => ({ success: true, method: 'PATCH' }) }),
                };
            },
        },
    },
});

// Dynamically import the fetcher so that the mock above is successfully intercepted
const { fetcher } = await import('@/lib/fetcher');

describe('fetcher utility wrapper', () => {
    it('should query successfully via GET method using ky', async () => {
        const result = await fetcher.get.query(['users']);
        assert.deepEqual(result, { success: true, method: 'GET', url: 'users' });
    });

    it('should mutate successfully via POST method transmitting JSON payload', async () => {
        const payload = { name: 'Alice' };
        const result = await fetcher.post.mutate('users/create', { arg: payload });
        assert.deepEqual(result, {
            success: true,
            method: 'POST',
            url: 'users/create',
            body: payload,
        });
    });
});
