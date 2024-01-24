import { db } from '@/db';
import { members } from '@/db/schema';
import { currentUser } from '@clerk/nextjs';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export async function POST(request: Request) {
    const req = await request.json();
    const schema = createInsertSchema(members, {
        clerkId: z.undefined(),
        email: z.undefined(),
    });
    const member = schema.parse(req);

    const user = await currentUser();
    if (!user) {
        return new Response(null, { status: 401 });
    }

    // TODO(#17): Payment
    await db.insert(members).values({
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        ...member,
    });
    return Response.json({ success: true });
}
