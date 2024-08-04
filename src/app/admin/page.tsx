import FancyRectangle from "@/components/FancyRectangle";
import Title from "@/components/Title";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MemberForm from "./MemberForm";

export const metadata: Metadata = {
    title: "Admin Panel",
    robots: { index: false, follow: false },
};

const queryMembers = async () => {
    const dbMembers = await db.query.memberTable.findMany({
        columns: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            membershipExpiresAt: true,
            createdAt: true,
        },
    });
    const members = dbMembers.map(({ membershipExpiresAt, ...member }) => ({
        ...member,
        paid: membershipExpiresAt !== null && membershipExpiresAt > new Date(),
    }));
    return members;
};
export type Member = Awaited<ReturnType<typeof queryMembers>>[number];

export default async function AdminPage() {
    const user = await currentUser();
    if (!user?.publicMetadata.isAdmin) {
        return notFound();
    }
    const members = await queryMembers();

    return (
        <div className="space-y-8">
            <div className="flex justify-center">
                <Title colour="purple">Admin Panel</Title>
            </div>
            <FancyRectangle colour="purple" offset="8" filled fullWidth>
                <div className="w-full border-4 border-black bg-white px-8 py-8 text-black md:px-12 md:py-12">
                    <MemberForm members={members} />
                </div>
            </FancyRectangle>
        </div>
    );
}
