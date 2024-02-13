interface SettingsProps {
    selectedTab: string;
}

export default function Settings({ selectedTab }: SettingsProps) {
    const renderSettings = () => {
        switch (selectedTab) {
            case 'account':
                return (
                    <div>
                        {/* Account settings */}
                        <h2>Change Email</h2>
                        <h2>Change Password</h2>
                        <h2>Change Linked Google Account</h2>
                        <h2>Delete Account</h2>
                    </div>
                );
            case 'personalInfo':
                return (
                    <div>
                        {/* Personal info settings */}
                        <h2>Update Name</h2>
                        <h2>Update Age</h2>
                        <h2>Update Gender</h2>
                        <h2>Update Degree</h2>
                        <h2>Update Student Type</h2>
                        <h2>Update Student Status</h2>
                        <h2>Update Student Number</h2>
                    </div>
                );
            case 'membership':
                return (
                    <div>
                        {/* Membership settings */}
                        <h2>Membership Status</h2>
                        <h2>Pay Membership Fee</h2>
                    </div>
                );
            case 'notifications':
                return (
                    <div>
                        {/* Notifications settings */}
                        <h2>Enable Email Notifications</h2>
                        <h2>Upcoming Events</h2>
                        <h2>Newsletter</h2>
                    </div>
                );
            default:
                return null;
        }
    };

    return <div className="flex">{renderSettings()}</div>;
}
