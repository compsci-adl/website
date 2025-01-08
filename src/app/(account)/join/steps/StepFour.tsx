import Button from '@/components/Button';
import Field from '@/components/Field';
import {
    useJoinUsStep,
    useJoinUsStudentInfo,
    useJoinUsNotifications,
    useSetJoinUsHeading,
} from '../store';

type NotificationTypes = 'email' | 'sms';
type CategoryTypes = 'newsletters' | 'clubEventsAndAnnouncements' | 'sponsorNotifications';

export default function StepFour() {
    useSetJoinUsHeading({
        title: 'Notification Preferences',
        description:
            'Let us know how you would like to be notified about upcoming events and opportunities.',
    });

    const { prevStep, nextStep } = useJoinUsStep();

    const { studentInfo } = useJoinUsStudentInfo();
    const { notifications, setNotificationsData } = useJoinUsNotifications();
    const phoneNumber = studentInfo.phoneNumber;

    const toggleNotification = (type: NotificationTypes, category: CategoryTypes) => {
        setNotificationsData({
            ...notifications,
            [type]: {
                ...notifications[type],
                [category]: !notifications[type][category],
            },
        });
    };

    const handleContinue = () => {
        setNotificationsData(notifications);
        nextStep();
    };

    return (
        <div>
            <div className="mb-4 mt-8">
                {['email'].map((type) => (
                    <div key={type} className="mb-6">
                        <h2 className="text-lg font-semibold capitalize">{type}</h2>
                        {['newsletters', 'clubEventsAndAnnouncements', 'sponsorNotifications'].map(
                            (category) => (
                                <div key={category} className="flex items-center justify-between">
                                    <p className="capitalize">
                                        {category.replace(/([A-Z])/g, ' $1')}
                                    </p>

                                    <div>
                                        <Field
                                            label=""
                                            type="toggle"
                                            value={
                                                notifications[type as NotificationTypes][
                                                    category as CategoryTypes
                                                ]
                                            }
                                            onChange={() =>
                                                toggleNotification(
                                                    type as NotificationTypes,
                                                    category as CategoryTypes
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ))}
            </div>

            {phoneNumber && (
                <div className="mb-4 mt-8">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold">SMS</h2>
                        {['newsletters', 'clubEventsAndAnnouncements', 'sponsorNotifications'].map(
                            (category) => (
                                <div key={category} className="flex items-center justify-between">
                                    <p className="capitalize">
                                        {category.replace(/([A-Z])/g, ' $1')}
                                    </p>

                                    <div>
                                        <Field
                                            label=""
                                            type="toggle"
                                            value={notifications['sms'][category as CategoryTypes]}
                                            onChange={() =>
                                                toggleNotification('sms', category as CategoryTypes)
                                            }
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <Button onClick={prevStep} colour="orange" width="w-full" size="small">
                    Back
                </Button>
                <Button
                    type="button"
                    colour="orange"
                    width="w-full"
                    size="small"
                    onClick={handleContinue}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}
