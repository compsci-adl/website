export type Campaign = {
    id: number;
    name?: string;
    subject?: string;
    started_at?: string | null;
    summary?: string;
    status?: string;
    html?: string;
    plain_text?: string;
    content?: string;
};
export type ListmonkCampaignDetail = {
    html?: string;
    content?: string;
    plain_text?: string;
    body?: string;
    message?: string;
    [key: string]: unknown;
};
