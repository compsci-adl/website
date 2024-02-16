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
