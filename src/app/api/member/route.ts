import { infoSchema } from '@/app/(account)/schemas';
import { db } from '@/db';
import { memberTable } from '@/db/schema';
import { currentUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
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

    await db.insert(memberTable).values({
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        ...reqBody.data,
    });
    return Response.json({ success: true });
}

export async function PUT(request: Request) {
    const req = await request.json();

    const user = await currentUser();
    if (!user) {
        return new Response(null, { status: 401 });
    }

    const reqBody = infoSchema.safeParse(req);
    if (!reqBody.success) {
        return new Response(JSON.stringify(reqBody.error.format()), { status: 400 });
    }

    await db.update(memberTable).set(reqBody.data).where(eq(memberTable.clerkId, user.id));
    return Response.json({ success: true });
}
