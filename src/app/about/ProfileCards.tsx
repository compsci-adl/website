import Card from '@/components/Card';

import { COMMITTEE_PROFILE_CARDS } from './profiles';

export default function ProfileCards() {
    const profiles = COMMITTEE_PROFILE_CARDS.map(({ name, role }) => {
        return (
            <Card key={name} className="min-h-[8em] px-4 py-4 xl:px-8 xl:py-5">
                <h1 className="text-left text-2xl">{name}</h1>
                <p className="pt-2">{role}</p>
            </Card>
        );
    });

    return (
        <section className="grid w-full grid-flow-row grid-cols-1 gap-8 pb-5 sm:grid-cols-2 lg:grid-cols-4">
            {profiles}
        </section>
    );
}
