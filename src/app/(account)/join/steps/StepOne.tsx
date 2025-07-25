import Button from '@/components/Button';
import { env } from '@/env.mjs';
import { useMount } from '@/hooks/use-mount';
import { signIn } from 'next-auth/react';
import { useSetJoinUsHeading } from '../store';

export default function StepOne() {
    useMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('registered')) {
            signIn('keycloak', { redirectTo: '/join' });
        }
    });

    useSetJoinUsHeading({
        title: 'Join Us',
        description: 'Create your account',
    });

    const handleSignUp = () => {
        const redirectUri = `${env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI}?registered`;
        const authUrl = `${env.NEXT_PUBLIC_LOCAL_KEYCLOAK_URL}/realms/cs-club/protocol/openid-connect/registrations?response_type=code&client_id=website&redirect_uri=${redirectUri}&scope=openid+profile+email`;
        window.location.href = authUrl;
    };

    return (
        <div>
            <div className="mt-8">
                <Button colour="orange" width="w-full" onClick={handleSignUp} size="small">
                    Sign Up
                </Button>
            </div>
        </div>
    );
}
