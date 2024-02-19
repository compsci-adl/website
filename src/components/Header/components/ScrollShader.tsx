'use client';

import { useState } from 'react';
import { useEventListener } from 'usehooks-ts';

export default function ScrollShader({ className }: { className?: string }) {
    const [isScrolled, setIsScrolled] = useState(false);
    useEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > 0);
    });

    return (
        <div
            className={`absolute -z-20 h-40 w-full transition-all duration-500 ${
                isScrolled ? 'bg-gradient-to-b from-black from-10% to-transparent to-100%' : ''
            } ${className}`}
        />
    );
}
