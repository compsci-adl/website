'use client';

import { useRouter } from 'next/navigation';

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
}

export default function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
    const router = useRouter();

    const handleNextPage = () => {
        console.log(totalPages);
        if (currentPage < totalPages) {
            router.push(`/admin?page=${currentPage + 1}`);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            router.push(`/admin?page=${currentPage - 1}`);
        }
    };

    return (
        <div className="mt-4 flex justify-between">
            <button
                onClick={handlePreviousPage}
                disabled={currentPage <= 1}
                className="rounded bg-gray-300 px-4 py-2 text-black"
            >
                Previous
            </button>
            <span className="self-center text-lg">Page {currentPage}</span>
            <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                className="rounded bg-gray-300 px-4 py-2 text-black"
            >
                Next
            </button>
        </div>
    );
}
