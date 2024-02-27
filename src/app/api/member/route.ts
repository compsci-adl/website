import { db } from '@/db';
import { memberTable } from '@/db/schema';
import { checkUserExists } from '@/server/check-user-exists';
import { currentUser } from '@clerk/nextjs';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export async function POST(request: Request) {
    const req = await request.json();
    const schema = createInsertSchema(memberTable, {
        clerkId: z.undefined(),
        email: z.undefined(),
    });

    const user = await currentUser();
    if (!user) {
        return new Response(null, { status: 401 });
    }

    const reqBody = schema.safeParse(req);
    if (!reqBody.success) {
        return new Response(JSON.stringify(reqBody.error.format()), { status: 400 });
    }

    // Avoid duplicate users in database
    const userExists = await checkUserExists(user.id);
    if (userExists) {
        return new Response(null, { status: 403 });
    }

    await db.insert(memberTable).values({
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        ...reqBody.data,
    });
    return Response.json({ success: true });
}
