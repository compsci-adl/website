'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
}

export default function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
    const router = useRouter();

    const handleNextPage = () => {
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
            <Button onClick={handlePreviousPage} colour={'orange'}>
                Previous
            </Button>
            <span className="self-center text-lg">Page {currentPage}</span>
            <Button onClick={handleNextPage} colour={'orange'}>
                Next
            </Button>
        </div>
    );
}
