'use client';

import Button from '@/components/Button';
import { createSubmit } from 'just-submit';
import Image from 'next/image';

export default function Form({ className }: { className?: string }) {
    const submit = createSubmit({ fullName: 'string', email: 'string', message: 'string' });
    const handleSubmit = submit((data) => {
        // TODO(#18): Backend
        console.log(data);
    });

    return (
        <div className={`${className} relative`}>
            <Image
                src="/images/whiteDuck.svg"
                alt="Duck"
                width={60}
                height={60}
                className="md:block hidden absolute right-[25px] top-[-48px]"
            />
            <Image
                src="/images/whiteDuck.svg"
                alt="Duck"
                width={60}
                height={60}
                className="md:block hidden absolute right-[100px] top-[-48px]"
            />
            <form
                className="bg-[#FFF] h-full rounded-xl md:p-6 p-3 grid grid-cols-2 md:gap-8 gap-4 grid-rows-[auto_auto_minmax(12rem,_1fr)_auto]"
                onSubmit={handleSubmit}
            >
                <h2 className="col-span-2 md:text-4xl text-2xl font-bold md:pb-2 pb-1 md:border-b-4 border-b-2 border-black">
                    Contact Us
                </h2>
                <input
                    name="fullName"
                    type="text"
                    placeholder="Full name"
                    className="border-b border-black placeholder:text-neutral-500 md:text-xl text-lg focus:outline-none"
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="border-b border-black placeholder:text-neutral-500 md:text-xl text-lg focus:outline-none"
                    required
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    className="col-span-2 md:p-6 p-2 border-2 rounded-xl border-black placeholder:text-neutral-500 md:text-xl text-lg focus:outline-none resize-none"
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
