import { eq } from 'drizzle-orm';
import { db } from '.';
import { memberTable } from './schema';

export const checkUserExists = async (clerkUserId: string) => {
    const existingUser = await db
        .select({ count: memberTable.id })
        .from(memberTable)
        .where(eq(memberTable.clerkId, clerkUserId));
    return existingUser.length > 0;
};

export const updateMemberExpiryDate = async (id: string, idType: 'clerkId' | 'id') => {
    const now = new Date();
    const expiryDate = new Date(`${now.getFullYear() + 1}-01-01`);
    await db
        .update(memberTable)
        .set({ membershipExpiresAt: expiryDate })
        .where(eq(memberTable[idType], id));
    return expiryDate;
};
