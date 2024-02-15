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
        const existingUser = await db
            .select({
                id: members.id,
            })
            .from(members)
            .where(eq(members.clerkId, user.id));

        if (existingUser.length > 0) {
            return new Response(JSON.stringify({ exists: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ exists: false }), { status: 404 });
        }
    } catch (error) {
        console.error('Error checking user existence:', error);
        return new Response(null, { status: 500 });
    }
}
