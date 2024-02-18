import Button from '@/components/Button';
import { env } from '@/env.mjs';
import { useClerk, useUser } from '@clerk/clerk-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import FancyRectangle from './FancyRectangle';

export default function UserButton({
    userExists,
    userPaid,
}: {
    userExists: boolean;
    userPaid: boolean;
}) {
    const { user } = useUser();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const { signOut } = useClerk();

    const handleButtonClick = () => {
        setPopupOpen(!isPopupOpen);
    };

    const handleSignOut = async () => {
        await signOut();
    };

    if (!user) return <></>;

    return (
        <FancyRectangle colour="black" offset="4" filled={true}>
            <div className="relative flex w-11 gap-y-2 border-2 border-black">
                <button onClick={handleButtonClick}>
                    <Image src={user.imageUrl} alt="Profile" width={100} height={100} />
                </button>

                {/* Popup menu */}
                {isPopupOpen && (
                    <div className="absolute right-0 top-10 z-10 flex w-52 flex-col gap-y-4 border-4 border-black bg-white p-4 text-xl md:w-44 md:text-base">
                        {/* Only show settings if finished sign up and show drive link if membership paid */}
                        {userExists && (
                            <>
                                {userPaid && (
                                    <Link
                                        href={env.NEXT_PUBLIC_DRIVE_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        CS Club Drive
                                    </Link>
                                )}
                                <Link href="/settings" className="hover:underline">
                                    Settings
                                </Link>
                                {user.publicMetadata.isAdmin && (
                                    <Link href="/admin" className="hover:underline">
                                        Admin Panel
                                    </Link>
                                )}
                            </>
                        )}
                        {/* Sign Out */}
                        <Button onClick={handleSignOut} colour="orange" width="w-40 md:w-32">
                            Sign Out
                        </Button>
                    </div>
                )}
            </div>
        </FancyRectangle>
    );
}
