import { checkUserExists } from '@/server/check-user-exists';
import { verifyMembershipPayment } from '@/server/verify-membership-payment';
import { currentUser } from '@clerk/nextjs';
import HeaderClient from './HeaderClient';
import HeaderMobileClient from './HeaderMobileClient';

const getHeaderData = async () => {
    const user = await currentUser();
    if (!user) {
        return { isSignedIn: false as const };
    }

    let nextStep: 'signup' | 'payment' | null = null;
    const exists = await checkUserExists(user.id);
    if (exists) {
        const membershipPayment = await verifyMembershipPayment(user.id);
        if (!membershipPayment.paid) {
            nextStep = 'payment';
        }
    } else {
        nextStep = 'signup';
    }

    return {
        isSignedIn: true as const,
        avatar: user.imageUrl,
        isAdmin: (user.publicMetadata.isAdmin as boolean | undefined) ?? false,
        nextStep,
        isMember: nextStep === null,
    };
};
export type HeaderData = Awaited<ReturnType<typeof getHeaderData>>;

export default async function Header() {
    const headerData = await getHeaderData();

    return (
        <>
            <HeaderClient data={headerData} className="hidden md:block" />
            <HeaderMobileClient data={headerData} className="md:hidden" />
        </>
    );
}
