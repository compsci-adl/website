import FancyRectangle from '@/components/FancyRectangle';
import ImageCarousel from '@/components/ImageCarousel';
import Title from '@/components/Title';
import { CAROUSEL_IMAGES } from '@/data/images';

export default function Info({ className }: { className?: string }) {
    return (
        <section className={`${className} flex flex-col items-center gap-8`}>
            <Title colour="purple">Events</Title>
            <div className="space-y-4">
                <p>
                    The Computer Science Club is excited to be hosting a number of events throughout
                    the year.
                </p>
                <p>For further information, take a look at some of the events below!</p>
            </div>
            <div className="mb-4 mr-4">
                <FancyRectangle colour="white" offset="16" filled rounded>
                    <div className="relative h-full w-full rounded bg-white p-1">
                        <ImageCarousel images={CAROUSEL_IMAGES} width={400} height={300} />
                    </div>
                </FancyRectangle>
            </div>
        </section>
    );
}
