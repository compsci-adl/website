import Card from '@/components/Card';

import { COMMITTEE_PROFILE_CARDS } from "./profiles";

export default function ProfileCards() {
    const profiles = COMMITTEE_PROFILE_CARDS.map(({ name, role }) => {
        return (
            <Card key={name} className="py-4 px-4 xl:py-5 xl:px-8 min-h-[8em]">
                <h1 className="text-left text-2xl">{name}</h1>
                <p className="pt-2">{role}</p>
            </Card>
        );
    });

    return (
        <section className="w-full grid grid-flow-row grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-4 pb-5">
            {profiles}
        </section>
    );
}
