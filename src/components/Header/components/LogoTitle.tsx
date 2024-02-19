import Image from 'next/image';
import Link from 'next/link';

export default function LogoTitle({
    titleColor,
    className,
    onClick,
}: {
    titleColor: 'text-grey' | 'text-white';
    className?: string;
    onClick?: () => void;
}) {
    return (
        <Link href="/" className={`${className} flex flex-row items-center`} onClick={onClick}>
            <Image
                src="/images/logos/logo.svg"
                alt="Computer Science Club Logo"
                className="h-full w-[3rem] md:w-[2rem] lg:w-[2.5rem]"
                width={100}
                height={100}
            />
            <h1 className={`${titleColor} ml-2 text-3xl font-bold md:text-xl lg:text-2xl`}>
                CS CLUB
            </h1>
        </Link>
    );
}
