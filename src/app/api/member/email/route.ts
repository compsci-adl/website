import { codeSchema } from '@/app/(account)/schemas';
import { db } from '@/db';
import { memberTable } from '@/db/schema';
import { clerkClient, currentUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export async function PATCH(request: Request) {
    const req = await request.json();

    const user = await currentUser();
    if (!user) {
        return new Response(null, { status: 401 });
    }

    const schema = z.object({ email: z.string().email(), code: codeSchema });
    const reqBody = schema.safeParse(req);
    if (!reqBody.success) {
        return new Response(JSON.stringify(reqBody.error.format()), { status: 400 });
    }

    // Get old email
    const oldEmailId = user.primaryEmailAddressId!;

    // Get new email
    const newEmail = user.emailAddresses.find(
        ({ emailAddress }) => emailAddress === reqBody.data.email
    );
    if (!newEmail || newEmail.verification?.status !== 'verified') {
        return new Response('Invalid email', { status: 403 });
    }

    // Update new email to primary
    await clerkClient.emailAddresses.updateEmailAddress(newEmail.id, { primary: true });
    await db
        .update(memberTable)
        .set({ email: newEmail.emailAddress })
        .where(eq(memberTable.clerkId, user.id));

    // Remove old email
    await clerkClient.emailAddresses.deleteEmailAddress(oldEmailId);

    return Response.json({ success: true });
}
