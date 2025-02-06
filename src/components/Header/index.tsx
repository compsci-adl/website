import { auth } from '@/auth';
import { checkUserExists } from '@/server/check-user-exists';
import { verifyMembershipPayment } from '@/server/verify-membership-payment';
import md5 from 'md5';
import HeaderClient from './HeaderClient';
import HeaderMobileClient from './HeaderMobileClient';

const getHeaderData = async () => {
    // Function to get the Gravatar URL based on user's email
    const getGravatarUrl = (email: string) => {
        const gravatarHash = md5(email.trim().toLowerCase());
        return `https://www.gravatar.com/avatar/${gravatarHash}?d=identicon`;
    };

    const session = await auth();
    if (!session?.user) {
        return { isSignedIn: false as const };
    }

    let nextStep: 'signup' | 'payment' | null = null;

    const userId = session.user.id ?? '';
    if (userId) {
        const exists = await checkUserExists(userId);
        if (exists) {
            const membershipPayment = await verifyMembershipPayment(userId);
            if (!membershipPayment.paid) {
                nextStep = 'payment';
            }
        } else {
            nextStep = 'signup';
        }
    }

    // Generate avatar URL using the email from the token
    const avatar = session.user?.email ? getGravatarUrl(session.user?.email) : '';

    return {
        isSignedIn: true as const,
        avatar: avatar,
        isCommittee: session?.user
            ? ((session.user.isCommittee as boolean | undefined) ?? false)
            : false,
        isAdmin: session?.user ? ((session.user.isAdmin as boolean | undefined) ?? false) : false,
        nextStep,
        isMember: nextStep === null,
    };
};
export type HeaderData = Awaited<ReturnType<typeof getHeaderData>>;

export default async function Header() {
    const headerData = await getHeaderData();

    return (
        <>
            <HeaderClient data={headerData} className="hidden lg-xl:block" />
            <HeaderMobileClient data={headerData} className="lg-xl:hidden" />
        </>
    );
}
