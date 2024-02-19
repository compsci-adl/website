import Link from 'next/link';
import Button from '../../Button';

export function SignInJoin() {
    return (
        <>
            <Button colour="orange" href="/signin">
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
            <Link onClick={onClick} className={className} href="/signin">
                Sign In
            </Link>
            <Link onClick={onClick} className={className} href="/join">
                Join Us
            </Link>
        </>
    );
}
