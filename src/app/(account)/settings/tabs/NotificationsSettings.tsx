import Button from '@/components/Button';
import Field from '@/components/Field';
import { useMount } from '@/hooks/use-mount';
import { fetcher } from '@/lib/fetcher';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';

type NotificationTypes = 'email' | 'sms' | 'push';
type CategoryTypes = 'newsletters' | 'clubEventsAndAnnouncements' | 'sponsorNotifications';

export default function NotificationsSettings() {
    const { data: session } = useSession();
    const userId = session?.user?.id;

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
            console.error('Failed to update notification settings');
        },
        onSuccess: () => {
            console.log('Successfully updated notification settings');
        },
    });

    const handleSaveSettings = async () => {
        if (!userId) {
            console.error('User ID is missing');
            return;
        }

        const payload = {
            id: userId,
            notifications,
        };

        try {
            await updateNotifications.trigger(payload);
            console.log('Saved notification settings:', notifications);
        } catch (error) {
            console.error('Error saving notification settings:', error);
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

    console.log(fetchedNotifications.isMutating);

    return (
        <div className="relative flex w-full flex-col gap-4">
            <div>
                <h2 className="text-2xl font-bold">Notifications</h2>
                <div className="mb-2 border-b-2 border-black" />
            </div>
            <div className="items-left flex flex-col gap-4 md:flex-row">
                <div className="w-full">
                    {['email', 'sms'].map((type) => (
                        <div key={type} className="mb-6">
                            <h2 className="text-lg font-semibold">
                                {type === 'sms'
                                    ? type.toUpperCase()
                                    : type.charAt(0).toUpperCase() + type.slice(1)}
                            </h2>
                            {[
                                'newsletters',
                                'clubEventsAndAnnouncements',
                                'sponsorNotifications',
                            ].map((category) => (
                                <div key={category} className="flex items-center justify-between">
                                    <p className="capitalize">
                                        {category.replace(/([A-Z])/g, ' $1')}
                                    </p>
                                    <div>
                                        {notifications[type as NotificationTypes] && (
                                            <Field
                                                label=""
                                                type="toggle"
                                                value={
                                                    notifications[type as NotificationTypes][
                                                        category as CategoryTypes
                                                    ]
                                                }
                                                onChange={() =>
                                                    handleToggle(
                                                        type as NotificationTypes,
                                                        category as CategoryTypes
                                                    )
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
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
        </div>
    );
}
