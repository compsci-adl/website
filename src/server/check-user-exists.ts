import { db } from "@/db";
import { memberTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const checkUserExists = cache(async (clerkUserId: string) => {
    const existingUser = await db
        .select({ count: memberTable.id })
        .from(memberTable)
        .where(eq(memberTable.clerkId, clerkUserId));
    return existingUser.length > 0;
});
