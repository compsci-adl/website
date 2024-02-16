import { db } from '@/db';
import { memberTable } from '@/db/schema';
import { currentUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';

export async function GET() {
    const user = await currentUser();
    if (!user) {
        return new Response(null, { status: 401 });
    }

    const existingUser = await db
        .select({ id: memberTable.id })
        .from(memberTable)
        .where(eq(memberTable.clerkId, user.id));
    return Response.json({ exists: existingUser.length > 0 });
}
