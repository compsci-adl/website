import { auth } from '@/auth';
import { db } from '@/db';
import { memberTable, notificationsTable } from '@/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export async function POST(request: Request) {
    console.log('POST /api/member');

    try {
        const req = await request.json();

        const schema = createInsertSchema(memberTable, {
            keycloakId: z.undefined(),
            email: z.undefined(),
        });

        const session = await auth();
        if (!session?.user) {
            console.warn('Unauthenticated request');
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const reqBody = schema.safeParse(req);

        if (!reqBody.success) {
            console.error('Invalid request body:', reqBody.error.format());
            return new Response(JSON.stringify(reqBody.error.format()), { status: 400 });
        }

        console.log('Valid request body:', reqBody.data);

        const memberData = {
            keycloakId: session.user.id ?? '',
            email: session.user.email ?? '',
            ...reqBody.data,
        };

        await db.insert(memberTable).values(memberData);

        const notificationsData = req.notifications;

        console.log('Notifications data:', notificationsData);

        if (session.user.id && notificationsData) {
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

            console.log('Inserted notifications for the new member into the database');
        } else {
            return new Response(
                JSON.stringify({ error: 'Member Keycloak ID missing or no notifications data' }),
                { status: 400 }
            );
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error in POST /api/member:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
