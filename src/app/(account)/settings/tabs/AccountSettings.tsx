import Button from '@/components/Button';
import ControlledField from '@/components/ControlledField';
import { fetcher } from '@/lib/fetcher';
import { useUser } from '@clerk/clerk-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { z } from 'zod';
import { handleClerkErrors } from '../../helpers';
import { codeSchema as code, passwordSchema as passwdSchema } from '../../schemas';
import type { SettingTabProps } from '../Settings';

const emailSchema = z.object({
    email: z.string().email(),
});
const codeSchema = z.object({ code });
function ChangeEmail({ email: currentEmail }: { email: string }) {
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);

    const emailForm = useForm<z.infer<typeof emailSchema>>({
        defaultValues: { email: '' },
        resolver: zodResolver(emailSchema),
    });
    const newEmail = emailForm.getValues('email');
    const handleSendCode = emailForm.handleSubmit(async (data) => {
        if (data.email === currentEmail) {
            emailForm.setError('email', {
                message: 'New email cannot be the same as current email',
            });
            return;
        }

        setIsLoading(true);

        // Avoid creating duplicate email addresses. Find email address (unverified) first.
        let newEmailInst = user?.emailAddresses.find(
            ({ emailAddress }) => emailAddress === data.email
        );
        if (!newEmailInst) {
            newEmailInst = await user?.createEmailAddress({ email: data.email });
        }
        await newEmailInst?.prepareVerification({ strategy: 'email_code' });

        setIsLoading(false);
        setIsCodeSent(true);
    });

    const codeForm = useForm<z.infer<typeof codeSchema>>({
        defaultValues: { code: '' },
        resolver: zodResolver(codeSchema),
    });
    const updateEmail = useSWRMutation('member/email', fetcher.patch.mutate, {});
    const handleUpdateEmail = codeForm.handleSubmit(async ({ code }) => {
        setIsLoading(true);

        const newEmailInst = user?.emailAddresses.find(
            ({ emailAddress }) => emailAddress === newEmail
        );
        try {
            await newEmailInst?.attemptVerification({ code });
        } catch {
            codeForm.setError('code', {
                message: 'Incorrect Code. Please enter the code from your new email.',
            });
            setIsLoading(false);
            return;
        }
        await updateEmail.trigger({ code, email: newEmail });

        setIsLoading(false);
        window.location.reload();
    });

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Change Email</h2>
            <div className="mb-2 border-b-2 border-black" />
            <div>
                Current Email: <b>{currentEmail}</b>
            </div>
            {!isCodeSent && (
                <form onSubmit={handleSendCode}>
                    <ControlledField control={emailForm.control} name="email" label="New Email" />
                    <Button colour="orange" loading={isLoading}>
                        Send Code
                    </Button>
                    <div className="mt-4">
                        A verification email containing a code will be sent for you to confirm your
                        new email address
                    </div>
                </form>
            )}
            {isCodeSent && (
                <>
                    <div>
                        New Email: <b>{newEmail}</b>
                    </div>
                    <form onSubmit={handleUpdateEmail}>
                        <ControlledField control={codeForm.control} name="code" label="Code" />
                        <Button
                            type="submit"
                            colour="orange"
                            loading={updateEmail.isMutating || isLoading}
                        >
                            Update email
                        </Button>
                    </form>
                </>
            )}
        </div>
    );
}

const passwordSchema = z
    .object({
        oldPassword: z.string().min(1, { message: 'Please enter your password' }),
        newPassword: passwdSchema,
        confirmPassword: passwdSchema,
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });
function ChangePassword() {
    const { user } = useUser();

    const form = useForm<z.infer<typeof passwordSchema>>({
        defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
        resolver: zodResolver(passwordSchema),
    });

    const [success, setSuccess] = useState(false);
    useEffect(() => {
        if (form.formState.isDirty) {
            setSuccess(false);
        }
    }, [form.formState.isDirty]);

    const handleSubmit = form.handleSubmit(async (data) => {
        try {
            await user?.updatePassword({
                newPassword: data.newPassword,
                // FIXME: Clerk 422 error "current_password is not a valid parameter for this request"
                currentPassword: data.oldPassword,
            });
            form.reset();
            setSuccess(true);
        } catch (error) {
            // TODO: More error messages for changing password
            handleClerkErrors(error, form, [
                {
                    code: 'form_password_not_strong_enough',
                    field: 'newPassword',
                    message:
                        'Given password is not strong enough. For account safety, please use a different password.',
                },
                {
                    code: 'form_password_pwned',
                    field: 'newPassword',
                    message:
                        'Password has been found in an online data breach. For account safety, please use a different password.',
                },
            ]);
        }
    });

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold">Change Password</h2>
            <div className="mb-2 border-b-2 border-black" />
            <ControlledField
                control={form.control}
                name="oldPassword"
                label="Old Password"
                type="password"
            />
            <ControlledField
                control={form.control}
                name="newPassword"
                label="New Password"
                type="password"
            />
            <ControlledField
                control={form.control}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
            />
            <Button type="submit" colour="orange">
                Update password
            </Button>
            {success && (
                <div className="font-bold text-green-700">Successfully updated your password</div>
            )}
        </form>
    );
}

function ChangeGoogle() {
    const { user } = useUser();
    const google = user?.verifiedExternalAccounts.find(({ provider }) => provider === 'google');

    const handleLink = async () => {
        const unverifiedGoogle = await user?.createExternalAccount({
            strategy: 'oauth_google',
            redirectUrl: '/settings',
        });
        window.location.replace(unverifiedGoogle!.verification!.externalVerificationRedirectURL!);
    };
    const handleRemove = async () => {
        await google?.destroy();
        window.location.reload();
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Linked Google Account</h2>
            <div className="mb-2 border-b-2 border-black" />
            {!google && (
                <Button colour="orange" onClick={handleLink}>
                    Link
                </Button>
            )}
            {google && (
                <>
                    <div>
                        Linked Account: <b>{google.emailAddress}</b>
                    </div>
                    <Button colour="lightGrey" onClick={handleRemove}>
                        Remove
                    </Button>
                </>
            )}
        </div>
    );
}

export default function AccountSettings({ settingData: { email } }: SettingTabProps) {
    return (
        <div className="space-y-8">
            <ChangeEmail email={email} />
            <ChangePassword />
            <ChangeGoogle />
        </div>
    );
}
