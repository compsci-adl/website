import { auth } from '@/auth';
import { db } from '@/db';
import { notificationsTable, memberTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { z } from 'zod';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    const schema = z.object({
        id: z.string().min(1),
    });

    const validation = schema.safeParse({ id });

    if (!validation.success) {
        return new Response(JSON.stringify(validation.error.format()), { status: 400 });
    }

    const session = await auth();
    if (!session?.user) {
        return new Response(null, { status: 401 });
    }

    try {
        // Fetch member notifications and phone number
        const [memberNotifications, member] = await Promise.all([
            db
                .select()
                .from(notificationsTable)
                .where(eq(notificationsTable.keycloakId, validation.data.id))
                .limit(1)
                .get(),
            db
                .select({ phoneNumber: memberTable.phoneNumber })
                .from(memberTable)
                .where(eq(memberTable.keycloakId, validation.data.id))
                .limit(1)
                .get(),
        ]);

        if (!memberNotifications) {
            return new Response(JSON.stringify({ error: 'Member notifications not found' }), {
                status: 404,
            });
        }

        // Combine notifications and phone number in the response
        const response = {
            ...memberNotifications,
            hasPhoneNumber: !!member?.phoneNumber,
        };

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}

export async function PUT(request: Request) {
    const req = await request.json();

    const schema = z.object({
        id: z.string().min(1),
        notifications: z.object({
            email: z.object({
                newsletters: z.boolean(),
                clubEventsAndAnnouncements: z.boolean(),
                sponsorNotifications: z.boolean(),
            }),
            sms: z.object({
                newsletters: z.boolean(),
                clubEventsAndAnnouncements: z.boolean(),
                sponsorNotifications: z.boolean(),
            }),
            push: z.object({
                newsletters: z.boolean(),
                clubEventsAndAnnouncements: z.boolean(),
                sponsorNotifications: z.boolean(),
            }),
        }),
    });

    const session = await auth();
    if (!session?.user) {
        return new Response(null, { status: 401 });
    }
    const reqBody = schema.safeParse(req);
    if (!reqBody.success) {
        return new Response(JSON.stringify(reqBody.error.format()), { status: 400 });
    }

    try {
        await db
            .update(notificationsTable)
            .set({
                emailNewsletters: reqBody.data.notifications.email.newsletters,
                emailClubEventsAndAnnouncements:
                    reqBody.data.notifications.email.clubEventsAndAnnouncements,
                emailSponsorNotifications: reqBody.data.notifications.email.sponsorNotifications,
                smsNewsletters: reqBody.data.notifications.sms.newsletters,
                smsClubEventsAndAnnouncements:
                    reqBody.data.notifications.sms.clubEventsAndAnnouncements,
                smsSponsorNotifications: reqBody.data.notifications.sms.sponsorNotifications,
                pushNewsletters: reqBody.data.notifications.push.newsletters,
                pushClubEventsAndAnnouncements:
                    reqBody.data.notifications.push.clubEventsAndAnnouncements,
                pushSponsorNotifications: reqBody.data.notifications.push.sponsorNotifications,
                updatedAt: sql`CURRENT_TIMESTAMP`,
            })
            .where(eq(notificationsTable.keycloakId, reqBody.data.id));

        return Response.json({ success: true });
    } catch (error) {
        console.error('Error updating notifications:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
