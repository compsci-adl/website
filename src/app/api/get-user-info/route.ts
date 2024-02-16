import { db } from '@/db';
import { memberTable } from '@/db/schema';
import { currentUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';

export async function GET() {
    const user = await currentUser();
    if (!user) {
        return new Response(null, { status: 401 });
    }

    const userData = await db
        .select({
            firstName: memberTable.firstName,
            lastName: memberTable.lastName,
            ageBracket: memberTable.ageBracket,
            gender: memberTable.gender,
            studentType: memberTable.studentType,
            studentStatus: memberTable.studentStatus,
            studentId: memberTable.studentId,
        })
        .from(memberTable)
        .where(eq(memberTable.clerkId, user.id));

    if (!userData) {
        return new Response(null, { status: 404 });
    }

    return Response.json(userData);
}
