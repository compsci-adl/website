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
    const messageKey = 'notification-message';

    useEffect(() => {
        const isDismissed = localStorage.getItem(storageKey) === 'true';
        const cachedMessage = localStorage.getItem(messageKey);

        fetchNotification().then((data) => {
            if (data) {
                setNotification(data);

                // If the message is different, reset dismissed state
                if (data.text !== cachedMessage) {
                    setDismissed(false);
                    localStorage.setItem(storageKey, 'false');
                    localStorage.setItem(messageKey, data.text);
                } else {
                    setDismissed(isDismissed);
                }
            }
        });
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
