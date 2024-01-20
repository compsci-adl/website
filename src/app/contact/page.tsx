import Title from '@/components/Title';
import Contact from './Contact';
import Form from './Form';
import Sponsorship from './Sponsorship';

export default function ContactPage() {
    return (
        <div className="md:pt-40 pt-32 min-h-screen w-responsive mx-auto">
            <div className="bg-[url('/images/rectangleGrid.svg')] md:bg-no-repeat bg-repeat-y md:bg-center md:bg-[length:90%_90%] h-full">
                <div className="grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-8">
                    <Title
                        colour="yellow"
                        className="md:col-span-2 grid-flow-dense justify-self-center text-5xl md:text-7xl"
                    >
                        Contact
                    </Title>
                    <div className="md:space-y-20 space-y-8">
                        <Contact />
                        <Sponsorship />
                    </div>
                    <Form className="md:row-span-2" />
                </div>
            </div>
        </div>
    );
}
