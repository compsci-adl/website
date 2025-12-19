import { env } from '@/env.mjs';

export interface ListmonkSubscriber {
    email: string;
    name?: string;
    attributes?: Record<string, unknown>;
    lists?: number[];
}

export interface ListmonkCampaign {
    id: number;
    name?: string;
    subject?: string;
    started_at?: string | null;
    summary?: string;
    status?: string;
    html?: string;
    plain_text?: string;
    body?: string;
    content?: string;
    list_id?: number;
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
        const query = `subscribers.email = '${email.replace(/'/g, "''")}'`;
        const response = await this.request(`/api/subscribers?query=${encodeURIComponent(query)}`);
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

    async getCampaignById(id: number) {
        return this.request(`/api/campaigns/${id}`);
    }

    async updateCampaign(id: number, updates: Record<string, unknown>) {
        return this.request(`/api/campaigns/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    }

    async archiveCampaign(
        id: number,
        options: {
            archive: boolean;
            archive_template_id?: number;
            archive_meta?: Record<string, unknown>;
            archive_slug?: string;
        }
    ) {
        return this.request(`/api/campaigns/${id}/archive`, {
            method: 'PUT',
            body: JSON.stringify(options),
        });
    }

    async getCampaigns(listId?: number) {
        let endpoint = '/api/campaigns';
        if (typeof listId === 'number') {
            endpoint += `?list_id=${listId}`;
        }
        const response = await this.request(endpoint);
        return response.data?.results || response.data || [];
    }
}

export const listmonkClient = new ListmonkClient();
