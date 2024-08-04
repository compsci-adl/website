import Title from "@/components/Title";
import type { Metadata } from "next";
import Contact from "./Contact";
import Form from "./Form";
import Sponsorship from "./Sponsorship";

export const metadata: Metadata = {
    title: "Contact",
};

export default function ContactPage() {
    return (
        <div className="h-full bg-[url('/images/rectangle-grid.svg')] bg-repeat-y md:bg-[length:90%_90%] md:bg-center md:bg-no-repeat">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
                <div className="grid-flow-dense justify-self-center md:col-span-2">
                    <Title colour="yellow">Contact</Title>
                </div>
                <div className="space-y-8 md:space-y-20">
                    <Contact />
                    <Sponsorship />
                </div>
                <Form className="md:row-span-2" />
            </div>
        </div>
    );
}
