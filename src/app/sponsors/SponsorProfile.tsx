import Image from 'next/image';
import Link from 'next/link';
import Card from '@/components/Card';

type SponsorProfileProps = {
    logo: string;
    name: string;
    link: string;
};

type SponsorCardProps = {
    name: string;
    logo: string;
};

export function SponsorCard({ name, logo }: SponsorCardProps) {
    return (
        <Card className="relative flex flex-col">
            <div className=" absolute left-0 top-0 z-20 flex h-full w-full flex-col bg-[#000000b3] p-8 opacity-0 hover:opacity-100">
                <div className="m-auto">
                    <p className="text-center align-middle text-xl text-white">
                        View company profile
                    </p>
                </div>
            </div>
            <div className="p-4">
                <div className="relative mx-auto my-4 h-60 w-full">
                    <Image className="mx-auto" src={logo} alt={`${name} logo`} fill />
                </div>
                <h2 className="text-2xl font-bold">{name}</h2>
            </div>
        </Card>
    );
}

export default function SponsorProfile({ logo, name, link }: SponsorProfileProps) {
    return (
        <Link href={{ pathname: link }} aria-label={`View company profile for ${name}`}>
            <SponsorCard name={name} logo={logo} />
        </Link>
    );
}
