import { env } from '@/env.mjs';

export interface ListmonkSubscriber {
    email: string;
    name?: string;
    attributes?: Record<string, unknown>;
    lists?: number[];
}

export class ListmonkClient {
    private baseUrl: string;
    private apiKey: string;

    constructor() {
        this.baseUrl = env.LISTMONK_URL!;
        this.apiKey = env.LISTMONK_API_KEY!;
    }

    private async request(endpoint: string, options: RequestInit = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            Authorization: `Basic ${Buffer.from(`Website:${this.apiKey}`).toString('base64')}`,
            ...((options.headers as Record<string, string>) || {}),
        };

        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Listmonk API error: ${response.status} ${response.statusText} - ${errorText}`
            );
        }

        return response.json();
    }

    async createSubscriber(subscriber: ListmonkSubscriber) {
        return this.request('/api/subscribers', {
            method: 'POST',
            body: JSON.stringify(subscriber),
        });
    }

    async getSubscriberById(id: number) {
        return this.request(`/api/subscribers/${id}`);
    }

    async updateSubscriber(id: number, updates: Partial<ListmonkSubscriber>) {
        const currentResponse = await this.getSubscriberById(id);
        const current = currentResponse.data;
        const full = { ...current, ...updates };
        return this.request(`/api/subscribers/${id}`, {
            method: 'PUT',
            body: JSON.stringify(full),
        });
    }

    async getSubscriber(email: string) {
        console.log(`[Listmonk] Getting subscriber for email: ${email}`);
        const query = `subscribers.email = '${email.replace(/'/g, "''")}'`;
        console.log(`[Listmonk] Constructed query: ${query}`);
        const response = await this.request(`/api/subscribers?query=${encodeURIComponent(query)}`);
        console.log(`[Listmonk] Response data:`, response.data);
        return response.data?.results?.[0] || null;
    }

    async deleteSubscriber(id: number) {
        return this.request(`/api/subscribers/${id}`, {
            method: 'DELETE',
        });
    }

    async deleteSubscriberByEmail(email: string) {
        const existing = await this.getSubscriber(email);
        if (existing && existing.id) {
            return this.deleteSubscriber(existing.id);
        }
        return null;
    }

    async getLists() {
        return this.request('/api/lists');
    }
}

export const listmonkClient = new ListmonkClient();
