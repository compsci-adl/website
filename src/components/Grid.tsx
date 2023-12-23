import React from 'react';

export default function Grid() {
    return (
        <div className="absolute -z-10 ml-12 mt-12 grid grid-cols-8">
            {Array.from({ length: 48 }).map((_, index) => (
                <div
                    key={index}
                    className="w-[8.5vw] h-[8.5vw] max-w-[120px] max-h-[120px] flex items-center justify-center border-[0.5px] border-slate-500"
                ></div>
            ))}
        </div>
    );
}
