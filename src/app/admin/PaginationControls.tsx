'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
}

export default function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
    const [windowWidth, setWindowWidth] = useState<number>(1024);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getPageHref = (page: number) => {
        if (page < 1 || page > totalPages) return `/admin?page=${currentPage}`;
        return `/admin?page=${page}`;
    };

    // Determine the number of pages to show around the current page
    const pageWindowSize = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3;

    // Calculate start and end pages
    const startPage = Math.max(1, currentPage - pageWindowSize);
    const endPage = Math.min(totalPages, currentPage + pageWindowSize);

    // Ensure we have enough pages on both sides of the current page
    const displayPages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className="mt-4 flex items-center justify-center space-x-2">
            {currentPage === 1 ? (
                <span
                    className="flex cursor-not-allowed items-center justify-center text-black opacity-50"
                    aria-disabled="true"
                    title="Previous Page"
                >
                    <span className="flex items-center justify-center space-x-2 p-2">
                        <FaChevronLeft />
                        <span>Back</span>
                    </span>
                </span>
            ) : (
                <Link
                    href={getPageHref(currentPage - 1)}
                    className="hover:bg-yellow flex cursor-pointer items-center justify-center text-black hover:text-white"
                    title="Previous Page"
                >
                    <span className="flex items-center justify-center space-x-2 p-2">
                        <FaChevronLeft />
                        <span>Back</span>
                    </span>
                </Link>
            )}

            {startPage > 1 && (
                <>
                    <Link
                        href={getPageHref(1)}
                        className={`hover:bg-yellow flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-transparent text-black`}
                        title="Page 1"
                    >
                        1
                    </Link>
                    {startPage > 2 && <span className="text-black">...</span>}
                </>
            )}

            {displayPages.map((page) => (
                <Link
                    key={page}
                    href={getPageHref(page)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${page === currentPage ? 'bg-orange pointer-events-none font-bold text-white' : 'hover:bg-yellow cursor-pointer border-transparent text-black'}`}
                    aria-current={page === currentPage ? 'page' : undefined}
                    title={`Page ${page}`}
                >
                    {page}
                </Link>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="text-black">...</span>}
                    <Link
                        href={getPageHref(totalPages)}
                        className={`hover:bg-yellow flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-transparent text-black`}
                        title={`Page ${totalPages}`}
                    >
                        {totalPages}
                    </Link>
                </>
            )}

            {currentPage === totalPages ? (
                <span
                    className="flex cursor-not-allowed items-center justify-center text-black opacity-50"
                    aria-disabled="true"
                    title="Next Page"
                >
                    <span className="flex items-center justify-center space-x-2 p-2">
                        <span>Next</span>
                        <FaChevronRight />
                    </span>
                </span>
            ) : (
                <Link
                    href={getPageHref(currentPage + 1)}
                    className="hover:bg-yellow flex cursor-pointer items-center justify-center text-black hover:text-white"
                    title="Next Page"
                >
                    <span className="flex items-center justify-center space-x-2 p-2">
                        <span>Next</span>
                        <FaChevronRight />
                    </span>
                </Link>
            )}
        </div>
    );
}
