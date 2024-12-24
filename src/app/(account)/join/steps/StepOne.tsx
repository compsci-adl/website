import Button from '@/components/Button';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useSetJoinUsHeading } from '../store';

const REDIRECT_URI = process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI;
const AUTH_KEYCLOAK_ISSUER = process.env.NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER;

export default function StepOne() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('registered')) {
            signIn('keycloak', { redirectTo: '/join' });
        }
    }, []);

    useSetJoinUsHeading({
        title: 'Join Us',
        description: 'Create your account',
    });

    const handleSignUp = () => {
        const redirectUri = `${REDIRECT_URI}?registered`;
        const authUrl = `${AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/registrations?response_type=code&client_id=website&redirect_uri=${redirectUri}&scope=openid+profile+email`;
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
