import Button from '@/components/Button';
import FancyRectangle from '@/components/FancyRectangle';
import { logout } from '@/lib/actions';
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import type { HeaderData } from '..';
import MenuLinks from './MenuLinks';
import type { MenuLinkType } from './MenuLinks';

export default function UserButton({ data }: { data: HeaderData }) {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const ref = useRef(null);
    const closeMenu = () => {
        setMenuOpen(false);
    };
    useOnClickOutside(ref, closeMenu);
    const handleButtonClick = () => {
        setMenuOpen(!isMenuOpen);
    };

    const router = useRouter();
    const handleSignOut = async () => {
        await logout();
        router.push('/');
        router.refresh();
    };

    const isSignedIn = data.isSignedIn;
    const isAdmin = data.isAdmin;
    const memberLinks: MenuLinkType[] = [
        ...(isSignedIn ? [{ title: 'Settings', href: '/settings' }] : []),
        ...(isAdmin ? [{ title: 'Admin Panel', href: '/admin' }] : []),
    ];
    const userExists = data.nextStep !== 'signup';
    return (
        <FancyRectangle colour="black" offset="4" filled>
            <div className="relative flex w-11 gap-y-2 border-2 border-black" ref={ref}>
                <button onClick={handleButtonClick}>
                    <Image src={data.avatar!} alt="Profile" width={100} height={100} />
                </button>
                <Transition
                    show={isMenuOpen}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0 scale-90"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-90"
                >
                    <div className="absolute right-0 top-10 z-50 w-44 space-y-4 border-4 border-black bg-white p-4">
                        {userExists && (
                            <MenuLinks data={data} onClick={closeMenu} links={memberLinks} />
                        )}
                        <Button onClick={handleSignOut} colour="orange" width="w-40 md:w-32">
                            Sign Out
                        </Button>
                    </div>
                </Transition>
            </div>
        </FancyRectangle>
    );
}
