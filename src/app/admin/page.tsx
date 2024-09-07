import FancyRectangle from '@/components/FancyRectangle';
import Title from '@/components/Title';
import { db } from '@/db';
import { memberTable } from '@/db/schema';
import { currentUser } from '@clerk/nextjs';
import { desc, count } from 'drizzle-orm';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MemberForm from './MemberForm';
import PaginationControls from './PaginationControls';

export const metadata: Metadata = {
    title: 'Admin Panel',
    robots: { index: false, follow: false },
};

const limit = 50;

async function fetchMembers(page: number) {
    const skip = (page - 1) * limit;

    // Fetch members with pagination
    const dbMembers = await db.query.memberTable.findMany({
        columns: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            membershipExpiresAt: true,
            createdAt: true,
        },
        limit: limit,
        offset: skip,
        orderBy: desc(memberTable.createdAt),
    });

    // Fetch total number of members to calculate total pages
    const totalMembersResult = await db.select({ count: count() }).from(memberTable);
    const totalMembers = totalMembersResult[0]?.count || 0;
    const totalPages = Math.ceil(totalMembers / limit);
    return {
        members: dbMembers.map(({ membershipExpiresAt, ...member }) => ({
            ...member,
            paid: membershipExpiresAt !== null && membershipExpiresAt > new Date(),
        })),
        page,
        totalPages,
    };
}

export default async function AdminPage({ searchParams }: { searchParams?: { page?: string } }) {
    const user = await currentUser();
    if (!user?.publicMetadata.isAdmin) {
        return notFound();
    }

    const page = parseInt(searchParams?.page || '1', 10);
    const { members, totalPages } = await fetchMembers(page);

    return (
        <div className="space-y-8">
            <div className="flex justify-center">
                <Title colour="purple">Admin Panel</Title>
            </div>
            <FancyRectangle colour="purple" offset="8" filled fullWidth>
                <div className="w-full border-4 border-black bg-white px-8 py-8 text-black md:px-12 md:py-12">
                    <MemberForm members={members} />
                    <PaginationControls currentPage={page} totalPages={totalPages} />
                </div>
            </FancyRectangle>
        </div>
    );
}
