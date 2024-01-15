import Button from '@/components/Button';
import { useUser, useClerk } from '@clerk/clerk-react';
import React, { useState, useRef, useEffect } from 'react';
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
            <div className="flex relative w-11 border-2 border-black gap-y-2">
                <button onClick={handleButtonClick}>
                    {/* Display user's profile icon */}
                    {user && user.imageUrl && <img src={user.imageUrl} alt="Profile" />}
                </button>

                {/* Popup menu */}
                {isPopupOpen && (
                    <div
                        ref={popupRef}
                        className="flex flex-col absolute w-52 md:w-44 gap-y-4 top-10 right-0 z-10 text-xl md:text-base bg-white p-4 border-4 border-black"
                    >
                        {/* Link to CS Club Drive */}
                        <a
                            href="https://csclub.us11.list-manage.com/track/click?u=17c2b13c547b901f8405e7bec&id=246194762c&e=acbfff1500"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            CS Club Drive
                        </a>
                        {/* Link to Manage Account Page */}
                        <a href="/manage-account" className="hover:underline">
                            Manage Account
                        </a>
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
