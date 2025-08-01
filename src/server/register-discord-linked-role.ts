import { env } from '@/env.mjs';

export const registerDiscordLinkedRole = async () => {
    const url = `https://discord.com/api/v10/applications/${env.NEXT_PUBLIC_DISCORD_CLIENT_ID}/role-connections/metadata`;

    const body = [
        {
            key: 'member',
            name: 'CS Club Member',
            description: 'Is a verified member of the CS Club',
            type: 7, // boolean_eq
        },
    ];

    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${env.DISCORD_TOKEN}`,
        },
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Discord API error: ${text}`);
    }

    const data = await response.json();
    return data;
};
