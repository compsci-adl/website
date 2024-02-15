import { db } from '@/db';
import { members } from '@/db/schema';
import { currentUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
    const user = await currentUser();
    if (!user) {
        return new Response(null, { status: 401 });
    }

    try {
        const userData = await db
            .select({
                firstName: members.firstName,
                lastName: members.lastName,
                ageBracket: members.ageBracket,
                gender: members.gender,
                studentType: members.studentType,
                studentStatus: members.studentStatus,
                studentId: members.studentId,
            })
            .from(members)
            .where(eq(members.clerkId, user.id));

        if (!userData) {
            return new Response(JSON.stringify({}), { status: 404 });
        }

        return new Response(JSON.stringify(userData), { status: 200 });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(null, { status: 500 });
    }
}
