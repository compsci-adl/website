import { auth } from '@/auth';
import { db } from '@/db';
import { memberTable, notificationsTable } from '@/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export async function POST(request: Request) {
    try {
        const req = await request.json();

        const schema = createInsertSchema(memberTable, {
            keycloakId: z.undefined(),
            email: z.undefined(),
        });

        const session = await auth();
        if (!session?.user) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const reqBody = schema.safeParse(req);

        if (!reqBody.success) {
            return new Response(JSON.stringify(reqBody.error.format()), { status: 400 });
        }

        const memberData = {
            keycloakId: session.user.id ?? '',
            email: session.user.email ?? '',
            ...reqBody.data,
        };

        await db.insert(memberTable).values(memberData);

        const notificationsData = req.notifications;

        if (!session.user.id || !notificationsData) {
            return new Response(
                JSON.stringify({ error: 'Member Keycloak ID missing or no notifications data' }),
                { status: 400 }
            );
        }

        await db.insert(notificationsTable).values({
            keycloakId: session.user.id,
            emailNewsletters: notificationsData.email?.newsletters ?? false,
            emailClubEventsAndAnnouncements:
                notificationsData.email?.clubEventsAndAnnouncements ?? false,
            emailSponsorNotifications: notificationsData.email?.sponsorNotifications ?? false,
            smsNewsletters: notificationsData.sms?.newsletters ?? false,
            smsClubEventsAndAnnouncements:
                notificationsData.sms?.clubEventsAndAnnouncements ?? false,
            smsSponsorNotifications: notificationsData.sms?.sponsorNotifications ?? false,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
