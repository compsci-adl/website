							import Button from '@/components/Button';
							import { useMount } from '@/hooks/use-mount';
							import { formatDate } from '@/utils/format-date';
							
							interface AccountSettingsProps {
                        user: any;
                        register: any;
                        handleSubmit: any;
                        errors: any;
                        onSubmit: (data: any) => void;
                        handleGoToMembership: () => void;
                        membershipStatus: string;
                        setMembershipStatus: (status: string) => void;
                        setMembershipExpirationDate: (date: string) => void;
							}
							
							export default function AccountSettings({
                        user,
                        register,
                        handleSubmit,
                        errors,
                        onSubmit,
                        handleGoToMembership,
                        membershipStatus,
                        setMembershipStatus,
                        setMembershipExpirationDate,
							}: AccountSettingsProps) {
                        useMount(() => {
                    const verifyMembershipPayment = async () => {
                console.log('Verifying membership payment');
                try {
            const response = await fetch('/api/verify-membership-payment', {
        method: 'PUT',
        headers: {
    'Content-Type': 'application/json',
        },
        body: JSON.stringify({
    redirectUrl: window.location.href,
        }),
            });
							
            if (response.ok) {
        const data = await response.json();
        setMembershipStatus('Paid');
        const expirationDate = formatDate(data.membershipExpiresAt);
        setMembershipExpirationDate(expirationDate);
            } else {
        setMembershipStatus('Payment Required');
            }
                } catch (error) {
            console.error('Error verifying membership payment:', error);
                }
                    };
							
                    verifyMembershipPayment();
                        });
							
                        return (
                    <div className="flex flex-col gap-8">
                {membershipStatus === 'Payment Required' && (
            <div>
        <h2 className="text-2xl font-bold">
    Membership Status: <span className="text-orange">Payment Required</span>
        </h2>
							
        <div className="mb-6 border-b-2 border-black"></div>
        <p>
    Finalise your membership by{' '}
    <span
className="cursor-pointer font-bold text-purple"
onClick={handleGoToMembership}
    >
clicking here
    </span>{' '}
    and completing the required payment.
        </p>
            </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Change Email</h2>
            <div className="mb-2 border-b-2 border-black"></div>
            <p className="font-bold">Email address</p>
            <input
        type="email"
        defaultValue={user?.primaryEmailAddress?.toString()}
        {...register('email')}
        className="border border-gray-300 p-2"
            />
            {errors.email && <span>Email is required</span>}
            <Button type="submit" colour="orange">
        Update email
            </Button>
                </form>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Change Password</h2>
            <div className="mb-2 border-b-2 border-black"></div>
            <div className="flex flex-col gap-2">
        <label htmlFor="oldPassword" className="font-bold">
    Old Password
        </label>
        <input
    id="oldPassword"
    type="password"
    placeholder={'Old Password'}
    {...register('oldPassword')}
    className="border border-gray-300 p-2"
        />
        {errors.oldPassword && <span>Old Password is required</span>}
            </div>
            <div className="flex flex-col gap-2">
        <label htmlFor="newPassword" className="font-bold">
    New Password
        </label>
        <input
    id="newPassword"
    type="password"
    placeholder={'New Password'}
    {...register('newPassword')}
    className="border border-gray-300 p-2"
        />
        {errors.newPassword && <span>New Password is required</span>}
            </div>
            <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="font-bold">
    Confirm Password
        </label>
        <input
    id="confirmPassword"
    type="password"
    placeholder={'Confirm Password'}
    {...register('confirmPassword')}
    className="border border-gray-300 p-2"
        />
        {errors.confirmPassword && <span>Confirm Password is required</span>}
            </div>
            <Button type="submit" colour="orange">
        Update password
            </Button>
                </form>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Change Linked Google Account</h2>
            <div className="mb-2 border-b-2 border-black"></div>
            <p className="font-bold">Link Status: </p>
                </form>
                    </div>
                        );
							}
							