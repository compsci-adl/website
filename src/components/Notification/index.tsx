'use client';

import { fetchNotification } from '@/data/notification';
import { useEffect, useState } from 'react';
import BannerNotification from './BannerNotification';
import PopupNotification from './PopupNotification';
import type { NotificationData } from './types';

export default function Notification() {
    const [notification, setNotification] = useState<NotificationData | null>(null);
    const [dismissed, setDismissed] = useState(false);

    const storageKey = 'notification-dismissed';

    useEffect(() => {
        const isDismissed = localStorage.getItem(storageKey) === 'true';
        setDismissed(isDismissed);

        if (!isDismissed) {
            fetchNotification().then((data) => {
                if (data) setNotification(data);
            });
        }
    }, []);

    const handleClose = () => {
        setDismissed(true);
        localStorage.setItem(storageKey, 'true');
    };

    if (!notification || !notification.enabled || dismissed) return null;

    return notification.type === 'popup' ? (
        <PopupNotification data={notification} onClose={handleClose} />
    ) : (
        <BannerNotification data={notification} onClose={handleClose} />
    );
}
