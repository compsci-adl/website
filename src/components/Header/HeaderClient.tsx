'use client';

import type { HeaderData } from '.';
import Button from '../Button';
import HeaderLinks from './components/HeaderLinks';
import LogoTitle from './components/LogoTitle';
import ScrollShader from './components/ScrollShader';
import { SignInJoin } from './components/SignInJoin';
import UserButton from './components/UserButton';

export default function HeaderClient({
    data,
    className,
}: {
    data: HeaderData;
    className?: string;
}) {
    const isMember = data.nextStep === null;
    const memberLinks = [
        ...(isMember
            ? [
                  {
                      title: 'CS Club Drive',
                      href: process.env.NEXT_PUBLIC_DRIVE_LINK ?? '',
                      target: '_blank',
                      rel: 'noopener noreferrer',
                  },
                  { title: 'Photo Gallery', href: '/gallery' },
              ]
            : []),
    ];
    return (
        <header className={`${className} fixed z-[9999] w-full`}>
            <ScrollShader />
            <div className="mx-auto mt-8 w-responsive">
                <div className="flex items-center justify-between gap-8 border-4 border-black bg-white px-8 py-4 text-grey">
                    <div className="flex flex-shrink items-center">
                        <LogoTitle titleColor="text-grey" className="grow" />
                    </div>
                    <div className="flex items-center md:gap-4">
                        <HeaderLinks dropdownLinks={memberLinks} />
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
