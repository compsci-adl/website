import Title from '@/components/Title';
import Contact from './Contact';
import Form from './Form';
import Sponsorship from './Sponsorship';

export default function ContactPage() {
    return (
        <div className="mx-auto min-h-screen w-responsive pt-32 md:pt-40">
            <div className="h-full bg-[url('/images/rectangleGrid.svg')] bg-repeat-y md:bg-[length:90%_90%] md:bg-center md:bg-no-repeat">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
                    <Title
                        colour="yellow"
                        className="grid-flow-dense justify-self-center text-5xl md:col-span-2 md:text-7xl"
                    >
                        Contact
                    </Title>
                    <div className="space-y-8 md:space-y-20">
                        <Contact />
                        <Sponsorship />
                    </div>
                    <Form className="md:row-span-2" />
                </div>
            </div>
        </div>
    );
}
