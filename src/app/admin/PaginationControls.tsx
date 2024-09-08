'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
}

export default function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
    const router = useRouter();
    const [windowWidth, setWindowWidth] = useState<number>(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            router.push(`/admin?page=${page}`);
        }
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
            <a
                onClick={() => handlePageChange(currentPage - 1)}
                className={`flex items-center justify-center text-black hover:bg-yellow hover:text-white ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                aria-disabled={currentPage === 1 ? 'true' : 'false'}
                title="Previous Page"
            >
                <span className="flex items-center justify-center space-x-2 p-2">
                    <FaChevronLeft />
                    <span>Back</span>
                </span>
            </a>

            {startPage > 1 && (
                <>
                    <a
                        onClick={() => handlePageChange(1)}
                        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-transparent text-black hover:bg-yellow`}
                        title="Page 1"
                    >
                        1
                    </a>
                    {startPage > 2 && <span className="text-black">...</span>}
                </>
            )}

            {displayPages.map((page) => (
                <a
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${page === currentPage ? 'bg-orange font-bold text-white' : 'cursor-pointer border-transparent text-black hover:bg-yellow'}`}
                    aria-current={page === currentPage ? 'page' : undefined}
                    title={`Page ${page}`}
                >
                    {page}
                </a>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="text-black">...</span>}
                    <a
                        onClick={() => handlePageChange(totalPages)}
                        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-transparent text-black hover:bg-yellow`}
                        title={`Page ${totalPages}`}
                    >
                        {totalPages}
                    </a>
                </>
            )}

            <a
                onClick={() => handlePageChange(currentPage + 1)}
                className={`flex items-center justify-center text-black hover:bg-yellow hover:text-white ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                aria-disabled={currentPage === totalPages ? 'true' : 'false'}
                title="Next Page"
            >
                <span className="flex items-center justify-center space-x-2 p-2">
                    <span>Next</span>
                    <FaChevronRight />
                </span>
            </a>
        </div>
    );
}
