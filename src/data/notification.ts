import type { NotificationData, ImageData } from '@/components/Notification/types';
import { env } from '@/env.mjs';
import { fetcher } from '@/lib/fetcher';

const notificationURL = `${env.NEXT_PUBLIC_PAYLOAD_URI}/api/globals/notification`;

const resolveImageUrl = (img?: ImageData): ImageData | undefined =>
    img?.url ? { ...img, url: env.NEXT_PUBLIC_PAYLOAD_URI + img.url } : undefined;

export async function fetchNotification(): Promise<NotificationData | null> {
    try {
        const data = await fetcher.get.query([
            notificationURL,
            { cache: 'no-store', prefixUrl: '' },
        ]);

        return {
            ...data,
            leftImage: resolveImageUrl(data.leftImage),
            rightImage: resolveImageUrl(data.rightImage),
        };
    } catch (error) {
        console.error('Error loading notification:', error);
        return null;
    }
}
