import Image from 'next/image';
import Events from './Events';
import FridayNight from './FridayNight';
import Info from './Info';

export default function EventsPage() {
    return (
        <main className="relative grid grid-cols-5 gap-y-12 text-lg md:text-xl">
            <Info className="order-last col-span-5 mb-6 border-white md:order-first md:col-span-2 md:mb-0 md:border-r-4 md:pr-4" />
            <FridayNight className="col-span-5 md:col-span-3 md:pl-8" />
            <Events className="order-first col-span-5 md:order-last" />
            <div className="absolute -z-10 mt-8 hidden space-y-44 md:block">
                <Image
                    src="/images/rectangle-grid.svg"
                    alt="Rectangle Grid"
                    width={750}
                    height={750}
                    className="ml-40 max-w-full md:w-[50vw]"
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
