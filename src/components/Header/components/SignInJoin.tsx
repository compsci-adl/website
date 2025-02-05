import { env } from '@/env.mjs';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Button from '../../Button';

export function SignInJoin() {
    const redirectUri = `${env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI}?registered`;
    const authUrl = `${env.NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/auth?response_type=code&client_id=website&redirect_uri=${redirectUri}&scope=openid+profile+email`;
    return (
        <>
            <Button colour="orange" href={authUrl}>
                Sign In
            </Button>
            <Button colour="purple" href="/join">
                Join Us
            </Button>
        </>
    );
}

export function SignInJoinMobile({
    className,
    onClick,
}: {
    className: string;
    onClick?: () => void;
}) {
    return (
        <>
            <button onClick={() => signIn('keycloak')} className={className}>
                Sign In
            </button>
            <Link onClick={onClick} className={className} href="/join">
                Join Us
            </Link>
        </>
    );
}
