import { env } from '@/env.mjs';
import { v4 as uuidv4 } from 'uuid';
import { storeDiscordTokens } from './storage';

export function getOAuthUrl() {
    const state = uuidv4();
    const url = new URL('https://discord.com/api/oauth2/authorize');
    url.searchParams.set('client_id', env.NEXT_PUBLIC_DISCORD_CLIENT_ID ?? '');
    url.searchParams.set('redirect_uri', env.NEXT_PUBLIC_DISCORD_REDIRECT_URI ?? '');
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('state', state);
    url.searchParams.set('scope', 'role_connections.write identify');
    url.searchParams.set('prompt', 'consent');
    return { state, url: url.toString() };
}

export async function getOAuthTokens(code: string) {
    const url = 'https://discord.com/api/v10/oauth2/token';
    const body = new URLSearchParams({
        client_id: env.NEXT_PUBLIC_DISCORD_CLIENT_ID ?? '',
        client_secret: env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET ?? '',
        grant_type: 'authorization_code',
        code: code ?? '',
        redirect_uri: env.NEXT_PUBLIC_DISCORD_REDIRECT_URI ?? '',
    });

    const response = await fetch(url, {
        body,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (!response.ok) throw new Error(`OAuth token error: ${response.statusText}`);
    return await response.json();
}

export async function getAccessToken(userId: string, tokens: any) {
    if (Date.now() > tokens.expires_at) {
        const url = 'https://discord.com/api/v10/oauth2/token';
        const body = new URLSearchParams({
            client_id: env.NEXT_PUBLIC_DISCORD_CLIENT_ID ?? '',
            client_secret: env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET ?? '',
            grant_type: 'refresh_token',
            refresh_token: tokens.refresh_token ?? '',
        });

        const response = await fetch(url, {
            body,
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        if (!response.ok) throw new Error(`Refresh token error: ${response.statusText}`);
        const newTokens = await response.json();
        newTokens.expires_at = Date.now() + newTokens.expires_in * 1000;
        await storeDiscordTokens(userId, newTokens);
        return newTokens.access_token;
    }
    return tokens.access_token;
}

export async function getUserData(tokens: any) {
    const url = 'https://discord.com/api/v10/oauth2/@me';
    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch user data');
    return await response.json();
}

export async function pushMetadata(userId: string, tokens: any, metadata: any) {
    const accessToken = await getAccessToken(userId, tokens);
    const url = `https://discord.com/api/v10/users/@me/applications/${env.NEXT_PUBLIC_DISCORD_CLIENT_ID}/role-connection`;

    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            platform_name: 'CS Club Linked Roles',
            metadata,
        }),
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) throw new Error(`Failed to push metadata: ${response.statusText}`);
}
