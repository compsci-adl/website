'use client';

import { logout } from '@/lib/actions';
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import type { HeaderData } from '.';
import Button from '../Button';
import FancyRectangle from '../FancyRectangle';
import HeaderLinks from './components/HeaderLinks';
import LogoTitle from './components/LogoTitle';
import MenuLinks from './components/MenuLinks';
import ScrollShader from './components/ScrollShader';
import { SignInJoin } from './components/SignInJoin';

function UserButton({ data }: { data: HeaderData }) {
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
                        {userExists && <MenuLinks data={data} onClick={closeMenu} />}
                        <Button onClick={handleSignOut} colour="orange" width="w-40 md:w-32">
                            Sign Out
                        </Button>
                    </div>
                </Transition>
            </div>
        </FancyRectangle>
    );
}

export default function HeaderClient({
    data,
    className,
}: {
    data: HeaderData;
    className?: string;
}) {
    return (
        <header className={`${className} fixed z-[9999] w-full`}>
            <ScrollShader />
            <div className="mx-auto mt-8 w-responsive">
                <div className="flex items-center justify-between gap-8 border-4 border-black bg-white px-8 py-4 text-grey">
                    <div className="flex flex-shrink items-center">
                        <LogoTitle titleColor="text-grey" className="grow" />
                    </div>
                    <div className="flex items-center md:gap-4">
                        <HeaderLinks />
                        <div className="flex gap-4 md:flex-col md:justify-center lg:flex-row lg:items-center">
                            {data.nextStep === 'signup' && (
                                <Button colour="purple" href="/join">
                                    Continue Signing Up
                                </Button>
                            )}
                            {data.nextStep === 'payment' && (
                                <Button colour="orange" href="/settings">
                                    Continue to payment
                                </Button>
                            )}
                            {data.isSignedIn ? <UserButton data={data} /> : <SignInJoin />}
                        </div>
                    </div>
                </div>
                <div className="relative -right-[0.5rem] -top-[7.5rem] -z-10 h-[8rem] w-responsive border-4 border-black bg-white lg:-top-[6rem] lg:h-[6.5rem] md-lg:-top-[4.75rem] md-lg:h-[5.25rem]" />
            </div>
        </header>
    );
}
