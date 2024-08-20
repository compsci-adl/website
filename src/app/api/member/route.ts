import { db } from '@/db';
import { memberTable } from '@/db/schema';
import { sendEmail } from '@/server/send-email';
import { currentUser } from '@clerk/nextjs';
import WelcomeEmail from '@packages/transactional/emails/welcome-email';
import { createInsertSchema } from 'drizzle-zod';
import { env } from 'process';
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

    await sendEmail({
        from: 'Computer Science Club <general@csclub.org.au>',
        to: user.emailAddresses[0].emailAddress,
        subject: 'Welcome to the Computer Science Club!',
        body: WelcomeEmail({
            userFirstname: user.firstName || 'there',
            onedriveLink: env.NEXT_PUBLIC_DRIVE_LINK || '',
        }),
    })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });

    return Response.json({ success: true });
}
