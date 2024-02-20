									import Button from '@/components/Button';
									import { useState } from 'react';
									
									export default function NotificationsSettings() {
                                const [emailNotifications, setEmailNotifications] = useState(false);
                                const [upcomingEvents, setUpcomingEvents] = useState(true);
                                const [newsletter, setNewsletter] = useState(true);
									
                                const toggleEmailNotifications = () => {
                            setEmailNotifications((prev) => !prev);
                                };
									
                                return (
                            <div className="relative flex w-full flex-col gap-10">
                        <div>
                    <h2 className="text-2xl font-bold">Change Email Notification Settings</h2>
                    <div className="mb-2 border-b-2 border-black"></div>
                        </div>
                        <div className="items-left flex flex-col gap-4 md:flex-row">
                    <h2 className="text-lg font-semibold">Enable Email Notifications</h2>
                    <div className="right-0 md:absolute">
                <Button
            onClick={toggleEmailNotifications}
            colour={emailNotifications ? 'orange' : 'purple'}
                >
            {emailNotifications ? 'Enabled' : 'Disabled'}
                </Button>
                    </div>
                        </div>
                        <div className="items-left relative flex flex-col gap-4 md:flex-row">
                    <h2 className={`text-lg font-semibold ${!emailNotifications && 'text-gray-500'}`}>
                Upcoming Events
                    </h2>
                    <div className="right-0 md:absolute">
                <Button
            onClick={() => setUpcomingEvents((prev) => !prev)}
            colour={
        emailNotifications
    ? upcomingEvents
? 'orange'
: 'purple'
    : 'lightGrey'
            }
                >
            {upcomingEvents ? 'Enabled' : 'Disabled'}
                </Button>
                    </div>
                        </div>
                        <div className="items-left relative flex flex-col gap-4 md:flex-row">
                    <h2 className={`text-lg font-semibold ${!emailNotifications && 'text-gray-500'}`}>
                Newsletter
                    </h2>
                    <div className="right-0 md:absolute">
                <Button
            onClick={() => setNewsletter((prev) => !prev)}
            colour={
        emailNotifications ? (newsletter ? 'orange' : 'purple') : 'lightGrey'
            }
                >
            {newsletter ? 'Enabled' : 'Disabled'}
                </Button>
                    </div>
                        </div>
                            </div>
                                );
									}
									