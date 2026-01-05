import type { ListmonkCampaign } from '@/server/listmonk';

export type Campaign = ListmonkCampaign;
export interface Params {
    params: {
        id: string;
    };
}
