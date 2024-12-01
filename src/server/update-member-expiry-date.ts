import { db } from '@/db';
import { memberTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const updateMemberExpiryDate = async (id: string, idType: 'keycloakId' | 'id') => {
    const expiryDate = new Date(`2026-01-01`);
    await db
        .update(memberTable)
        .set({ membershipExpiresAt: expiryDate })
        .where(eq(memberTable[idType], id));
    return expiryDate;
};
