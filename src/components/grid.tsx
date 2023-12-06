import React from 'react';

export default function Grid() {
    return (
        <div className="absolute z-0 ml-12 mt-12 grid grid-cols-8">
            {Array.from({ length: 48 }).map((_, index) => (
                <div
                    key={index}
                    className=" w-12 h-12 md:w-20 md:h-20 lg:w-28 lg:h-28 flex items-center justify-center border-[0.5px] border-white"
                ></div>
            ))}
        </div>
    );
}
