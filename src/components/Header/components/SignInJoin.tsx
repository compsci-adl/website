import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Button from '../../Button';

export function SignInJoin() {
    return (
        <>
            <Button colour="orange" onClick={() => signIn('keycloak')}>
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
