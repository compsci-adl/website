import type { Metadata } from 'next';
import Image from 'next/image';
import Events from './Events';
import FridayNight from './FridayNight';
import Info from './Info';

export const metadata: Metadata = {
    title: 'Events',
};

export default function EventsPage() {
    return (
        <main className="relative grid grid-cols-5 gap-y-12 text-lg md:text-xl">
            <Info className="col-span-5 border-white md:col-span-2 md:border-r-4 md:pr-4" />
            <FridayNight className="order-3 col-span-5 md:order-2 md:col-span-3 md:pl-8" />
            <Events className="order-2 col-span-5 md:order-3" />
            <div className="absolute -z-10 mt-8 hidden space-y-44 md:block">
                <Image
                    src="/images/rectangle-grid.svg"
                    alt="Rectangle Grid"
                    width={750}
                    height={750}
                    className="ml-40 max-w-full opacity-40 md:w-[50vw]"
                />
                <Image
                    src="/images/rectangle-grid.svg"
                    alt="Rectangle Grid"
                    width={750}
                    height={750}
                    className="ml-16 max-w-full md:w-[80vw]"
                />
            </div>
        </main>
    );
}
