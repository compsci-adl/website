import { db } from '@/db';
import { memberTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

export const checkUserExists = cache(async (keycloakUserId: string) => {
    const existingUser = await db
        .select({ count: memberTable.id })
        .from(memberTable)
        .where(eq(memberTable.keycloakId, keycloakUserId));
    return existingUser.length > 0;
});
