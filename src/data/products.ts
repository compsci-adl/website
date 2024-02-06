import type { OrderLineItem } from 'square';

export const PRODUCTS: { [key: string]: OrderLineItem } = {
    membership: {
        name: 'CS Club Membership 2024',
        quantity: '1',
        itemType: 'ITEM',
        metadata: {
            SKU: 'club_membership',
        },
        basePriceMoney: {
            amount: BigInt(1000),
            currency: 'AUD',
        },
    },
} as const satisfies Record<string, OrderLineItem>;
