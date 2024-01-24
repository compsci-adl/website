import Title from '@/components/Title';
import FancyRectangle from '@/components/FancyRectangle';
import Image from 'next/image';

export default function ContactPage() {
    return (
        <div className="h-full bg-[url('/images/rectangleGrid.svg')] bg-repeat-y md:bg-[length:90%_90%] md:bg-center md:bg-no-repeat">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
                <div className="grid-flow-dense justify-self-center md:col-span-2">
                    <Title colour="orange">About Us</Title>
                </div>
                <div className="-y-8 md:space-y-20">
                    <FancyRectangle colour={'purple'} offset={'4'} filled={true}>
                        <Image src={''} alt={''}></Image>
                    </FancyRectangle>
                    <p className="mt-4 text-center text-lg">
                        The University of Adelaide Computer Science Club is a student-run club for
                        those with an interest in computer science or computing in general. Although
                        we're a university club, we welcome anyone interested in computer science
                        and/or socialising to join!
                    </p>
                </div>
            </div>
        </div>
    );
}
