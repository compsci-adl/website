'use client';

import Link from 'next/link';
import Button from '@/components/Button';
import NavLinks from '@/components/navigation/NavLinks';
import Duck from '@/svg/Duck';
import { RiCloseLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

export default function Navigation() {
    const router = useRouter();

    return (
        <section className="flex h-screen w-full flex-row items-center justify-center">
            <nav
                className="relative flex h-[90vh] w-responsive flex-col items-center justify-center
                gap-12 overflow-hidden border-primary border-black bg-primary-fg text-4xl shadow-solid
                md:gap-16 md:text-5xl"
            >
                <div className="absolute top-0 left-0 flex w-full flex-row items-center justify-between p-10">
                    <Link className="text-3xl font-bold md:text-4xl" href="/">
                        CS Club
                    </Link>
                    <Button
                        className="bg-accent-highlight px-1 py-1 md:px-2 md:py-2"
                        onClick={() => router.back()}
                        smallShadow
                    >
                        <RiCloseLine className="h-8 w-8 text-black" />
                    </Button>
                </div>
                <NavLinks className="flex flex-col gap-7 md:gap-9" />
                <Button
                    className="bg-accent-highlight py-4 px-12 text-2xl font-bold md:text-3xl"
                    href="/join"
                >
                    Join Us
                </Button>
                <Duck
                    className="absolute bottom-[-4%] right-[-10%] z-0 w-40 -scale-x-100 md:w-60 lg:right-[-5%]"
                    opacity={0.5}
                    mono
                />
            </nav>
        </section>
    );
}
