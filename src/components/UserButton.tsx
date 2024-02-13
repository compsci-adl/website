import Button from '@/components/Button';
import { useClerk, useUser } from '@clerk/clerk-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import FancyRectangle from './FancyRectangle';

export default function UserButton() {
    const { user } = useUser();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const popupRef = useRef(null);
    const { signOut } = useClerk();

    const handleButtonClick = () => {
        setPopupOpen(!isPopupOpen);
    };

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <FancyRectangle colour="black" offset="4" filled={true}>
            <div className="relative flex w-11 gap-y-2 border-2 border-black">
                <button onClick={handleButtonClick}>
                    {/* Display user's profile icon */}
                    {user && user.imageUrl && (
                        <Image src={user.imageUrl} alt="Profile" width={100} height={100} />
                    )}
                </button>

                {/* Popup menu */}
                {isPopupOpen && (
                    <div
                        ref={popupRef}
                        className="absolute right-0 top-10 z-10 flex w-52 flex-col gap-y-4 border-4 border-black bg-white p-4 text-xl md:w-44 md:text-base"
                    >
                        {/* TODO(#16): Link to CS Club Drive */}
                        <a
                            href=""
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            CS Club Drive
                        </a>
                        {/* Link to Settings Page */}
                        <Link href="/settings" className="hover:underline">
                            Settings
                        </Link>
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
