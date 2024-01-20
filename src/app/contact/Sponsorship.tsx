import FancyRectangle from '@/components/FancyRectangle';
import Image from 'next/image';
import Paragraph from '../../components/Paragraph';

export default function Sponsorship({ className }: { className?: string }) {
    return (
        <div className={`${className} space-y-6`}>
            <div className="flex justify-between items-center">
                <FancyRectangle colour="orange" offset="8" filled={false}>
                    <div className="bg-orange w-fit p-2">
                        <h2 className="text-2xl md:text-4xl text-grey font-bold">
                            For sponsorships
                        </h2>
                    </div>
                </FancyRectangle>
                <Image
                    src="/images/crosses.svg"
                    alt="Crosses"
                    height={80}
                    width={237}
                    className="md:w-fit w-1/3"
                />
            </div>
            <Paragraph>
                If you’d like to partner with us, please enquire at:{' '}
                <a href="mailto:sponsorships@csclub.org.au" className="underline">
                    sponsorships@csclub.org.au
                </a>
            </Paragraph>
        </div>
    );
}
