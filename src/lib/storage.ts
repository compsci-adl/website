type DiscordTokens = {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
};

const store = new Map<string, DiscordTokens>();

export async function storeDiscordTokens(userId: string, tokens: DiscordTokens): Promise<void> {
    store.set(`discord-${userId}`, tokens);
}

export async function getDiscordTokens(userId: string): Promise<DiscordTokens | undefined> {
    return store.get(`discord-${userId}`);
}
