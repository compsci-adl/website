import { db } from '@/db';
import { memberTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const updateMemberExpiryDate = async (id: string, idType: 'keycloakId' | 'id') => {
    const now = new Date();
    const expiryDate = new Date(`${now.getFullYear() + 1}-01-01`);
    await db
        .update(memberTable)
        .set({
            membershipExpiresAt: expiryDate,
            welcomeEmailSent: false,
        })
        .where(eq(memberTable[idType], id));
    return expiryDate;
};
