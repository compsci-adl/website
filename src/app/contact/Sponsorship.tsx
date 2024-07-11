import FancyRectangle from '@/components/FancyRectangle';
import Paragraph from '@/components/Paragraph';
import Image from 'next/image';

export default function Sponsorship({ className }: { className?: string }) {
    return (
        <div className={`${className} space-y-6`}>
            <div className="flex items-center justify-center md:justify-between">
                <FancyRectangle colour="orange" offset="8" filled={false}>
                    <div className="w-fit bg-orange p-2">
                        <h2 className="text-2xl font-bold text-grey md:text-4xl">
                            For sponsorships
                        </h2>
                    </div>
                </FancyRectangle>
                <Image
                    src="/images/crosses.svg"
                    alt="Crosses"
                    height={80}
                    width={237}
                    className="hidden w-1/3 md:block md:w-fit"
                />
            </div>
            <Paragraph>
                If you&apos;d like to partner with us, please enquire at:{' '}
                <a href="mailto:sponsorships@csclub.org.au" className="break-words underline">
                    sponsorships@csclub.org.au
                </a>
            </Paragraph>
        </div>
    );
}
