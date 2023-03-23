import ClubLogo from '@/svg/ClubLogo';
import Button from './Button';
import Circle from '@/svg/Circle';
import Squiggle from '@/svg/Squiggle';
import Star from '@/svg/Star';

export default function Hero() {
    return (
        <section className="relative flex h-screen w-full items-center justify-start gap-48">
            <div className="z-10 flex flex-col gap-20">
                <h1 className="text-primary-heading font-bold">
                    LEARN,
                    <br />
                    SOCIALISE,
                    <br />
                    CODE.
                </h1>
                <div className="flex flex-row gap-16">
                    <Button
                        className="bg-accent-highlight py-5 px-9 text-4xl font-bold"
                        href="/join"
                    >
                        Join Us
                    </Button>
                    <Button className="bg-primary-bg py-5 px-9 text-4xl font-bold" href="/about">
                        About
                    </Button>
                </div>
            </div>
            <ClubLogo />
            {/* TODO make dimensions responsive */}
            <Circle
                className=" absolute left-[-58%] bottom-[-20%] -z-10 fill-accent-blue"
                width={900}
                opacity={0.3}
            />
            <Star
                className="absolute top-[18%] right-[23%] -z-10 fill-accent-red"
                width={300}
                opacity={0.3}
            />
            <Squiggle
                className="absolute right-[-36%] bottom-[-5%] -z-10 fill-accent-yellow"
                width={500}
                opacity={0.3}
            />
        </section>
    );
}
