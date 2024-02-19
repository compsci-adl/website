'use client';

import Button from '@/components/Button';
import Duck from '@/components/Duck';
import { createSubmit } from 'just-submit';

export default function Form({ className }: { className?: string }) {
    const submit = createSubmit({ fullName: 'string', email: 'string', message: 'string' });
    const handleSubmit = submit((data) => {
        // TODO(#31): Email integration
        console.log(data);
    });

    return (
        <div className={`${className} relative`}>
            <div className="absolute right-[25px] top-[-48px] hidden gap-6 md:flex">
                <Duck colour="white" />
                <Duck colour="white" />
            </div>
            <form
                className="grid h-full grid-cols-2 grid-rows-[auto_auto_minmax(12rem,_1fr)_auto] gap-4 rounded-xl bg-[#FFF] p-3 text-black md:gap-8 md:p-6"
                onSubmit={handleSubmit}
            >
                <h2 className="col-span-2 border-b-2 border-black pb-1 text-2xl font-bold md:border-b-4 md:pb-2 md:text-4xl">
                    Contact Us
                </h2>
                <input
                    name="fullName"
                    type="text"
                    placeholder="Full name"
                    className="border-b border-black text-lg placeholder:text-neutral-500 focus:outline-none md:text-xl"
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="border-b border-black text-lg placeholder:text-neutral-500 focus:outline-none md:text-xl"
                    required
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    className="col-span-2 resize-none rounded-xl border-2 border-black p-2 text-lg placeholder:text-neutral-500 focus:outline-none md:p-6 md:text-xl"
                    required
                />
                <div className="col-span-2 flex justify-center">
                    <Button colour="white" type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
