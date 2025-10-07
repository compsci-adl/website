import Button from '@/components/Button';
import Field from '@/components/Field';
import { useMount } from '@/hooks/use-mount';
import { fetcher } from '@/lib/fetcher';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';

const notificationTypeNames = {
    email: 'Email',
    sms: 'SMS',
    push: 'Push',
};

const categoryNames = {
    newsletters: 'Newsletters',
    clubEventsAndAnnouncements: 'Club Events and Announcements',
    sponsorNotifications: 'Sponsor Notifications',
};

type NotificationTypes = keyof typeof notificationTypeNames;
type CategoryTypes = keyof typeof categoryNames;

export default function NotificationsSettings() {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [hasPhoneNumber, setHasPhoneNumber] = useState(false);

    const [notifications, setNotifications] = useState({
        email: {
            newsletters: false,
            clubEventsAndAnnouncements: false,
            sponsorNotifications: false,
        },
        sms: {
            newsletters: false,
            clubEventsAndAnnouncements: false,
            sponsorNotifications: false,
        },
        push: {
            newsletters: false,
            clubEventsAndAnnouncements: false,
            sponsorNotifications: false,
        },
    });

    const fetchedNotifications = useSWRMutation(`notifications?id=${userId}`, fetcher.get.mutate, {
        onSuccess: (data) => {
            // Map the response to the expected format
            const parsedNotifications = {
                email: {
                    newsletters: data.emailNewsletters,
                    clubEventsAndAnnouncements: data.emailClubEventsAndAnnouncements,
                    sponsorNotifications: data.emailSponsorNotifications,
                },
                sms: {
                    newsletters: data.smsNewsletters,
                    clubEventsAndAnnouncements: data.smsClubEventsAndAnnouncements,
                    sponsorNotifications: data.smsSponsorNotifications,
                },
                push: {
                    newsletters: data.pushNewsletters,
                    clubEventsAndAnnouncements: data.pushClubEventsAndAnnouncements,
                    sponsorNotifications: data.pushSponsorNotifications,
                },
            };

            setHasPhoneNumber(data.hasPhoneNumber);
            setNotifications(parsedNotifications);
        },
        onError: (error) => {
            console.error('Failed to fetch notifications:', error);
        },
    });

    useMount(() => {
        if (userId) {
            fetchedNotifications.trigger();
        }
    });

    const updateNotifications = useSWRMutation('notifications', fetcher.put.mutate, {
        onError: () => {
            setSaveError('Failed to update notification settings');
            setTimeout(() => setSaveError(null), 5000);
        },
        onSuccess: () => {
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 5000);
        },
    });

    const handleSaveSettings = async () => {
        if (!userId) {
            setSaveError('User ID is missing');
            setTimeout(() => setSaveError(null), 5000);
            return;
        }

        const payload = {
            id: userId,
            notifications,
        };

        try {
            await updateNotifications.trigger(payload);
        } catch {
            setSaveError('Error saving notification settings');
            setTimeout(() => setSaveError(null), 5000);
        }
    };

    const handleToggle = (type: NotificationTypes, category: CategoryTypes) => {
        setNotifications((prev) => ({
            ...prev,
            [type]: {
                ...prev[type],
                [category]: !prev[type][category],
            },
        }));
    };

    const renderNotifications = (type: NotificationTypes) => (
        <div key={type} className="mb-6">
            <h2 className="text-lg font-semibold">{notificationTypeNames[type]}</h2>
            {Object.keys(categoryNames).map((category) => (
                <div key={category} className="flex items-center justify-between">
                    <p>{categoryNames[category as CategoryTypes]}</p>
                    <Field
                        label=""
                        type="toggle"
                        value={notifications[type][category as CategoryTypes]}
                        onChange={() => handleToggle(type, category as CategoryTypes)}
                    />
                </div>
            ))}
        </div>
    );

    return (
        <div className="relative flex w-full flex-col gap-4">
            <div>
                <h2 className="text-2xl font-bold">Notifications</h2>
                <div className="mb-2 border-b-2 border-black" />
            </div>
            <div className="items-left flex flex-col gap-4 md:flex-row">
                <div className="w-full">
                    {['email', ...(hasPhoneNumber ? ['sms'] : [])].map((type) =>
                        renderNotifications(type as NotificationTypes)
                    )}
                </div>
            </div>
            <Button
                type="submit"
                onClick={handleSaveSettings}
                colour="orange"
                size="small"
                width="w-full"
            >
                Save
            </Button>
            {saveSuccess && (
                <p className="mt-2 text-green-600">Notification settings saved successfully!</p>
            )}
            {saveError && <p className="mt-2 text-red-600">{saveError}</p>}
        </div>
    );
}
