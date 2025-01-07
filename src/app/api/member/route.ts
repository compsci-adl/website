import { auth } from '@/auth';
import { db } from '@/db';
import { memberTable } from '@/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export async function POST(request: Request) {
    console.log('POST /api/member');
    const req = await request.json();
    const schema = createInsertSchema(memberTable, {
        keycloakId: z.undefined(),
        email: z.undefined(),
    });

    const session = await auth();
    if (!session?.user) {
        return new Response(null, { status: 401 });
    }

    const reqBody = schema.safeParse(req);
    if (!reqBody.success) {
        return new Response(JSON.stringify(reqBody.error.format()), { status: 400 });
    }

    await db.insert(memberTable).values({
        keycloakId: session.user.id ?? '',
        email: session.user.email ?? '',
        ...reqBody.data,
    });
    return Response.json({ success: true });
}
