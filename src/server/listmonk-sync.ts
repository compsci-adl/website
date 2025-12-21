import { db } from '@/db';
import { memberTable, notificationsTable } from '@/db/schema';
import { eq, gt, lte, or, isNull } from 'drizzle-orm';
import { listmonkClient } from './listmonk';

const LIST_IDS = {
    newsletters: 1,
    clubEventsAndAnnouncements: 2,
    sponsorNotifications: 3,
};

export async function syncMemberToListmonk(memberId: string) {
    try {
        const member = await db.query.memberTable.findFirst({
            where: eq(memberTable.keycloakId, memberId),
        });

        if (!member || !member.email) {
            return;
        }

        // Only sync if paid member
        if (!member.membershipExpiresAt || new Date(member.membershipExpiresAt) <= new Date()) {
            return;
        }

        const notifications = await db.query.notificationsTable.findFirst({
            where: eq(notificationsTable.keycloakId, memberId),
        });

        if (!notifications) {
            return;
        }

        const lists: number[] = [];
        if (notifications.emailNewsletters) lists.push(LIST_IDS.newsletters);
        if (notifications.emailClubEventsAndAnnouncements)
            lists.push(LIST_IDS.clubEventsAndAnnouncements);
        if (notifications.emailSponsorNotifications) lists.push(LIST_IDS.sponsorNotifications);

        try {
            await listmonkClient.createSubscriber({
                email: member.email,
                name: `${member.firstName} ${member.lastName}`,
                lists,
            });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            if (
                errorMessage.includes('already exists') ||
                errorMessage.includes('E-mail already exists')
            ) {
                const existingSubscriber = await listmonkClient.getSubscriber(member.email);
                if (existingSubscriber) {
                    await listmonkClient.updateSubscriber(existingSubscriber.id, {
                        lists,
                    });
                } else {
                    console.error(
                        `[Listmonk] Failed to get existing subscriber ${member.email} after create failed`
                    );
                    throw error;
                }
            } else {
                throw error;
            }
        }
    } catch (error) {
        console.error(`[Listmonk] Error syncing member ${memberId}:`, error);
        throw error;
    }
}

export async function syncAllMembersToListmonk() {
    // Only sync paid members
    const now = new Date();
    const members = await db.query.memberTable.findMany({
        where: gt(memberTable.membershipExpiresAt, now),
    });

    for (const member of members) {
        if (member.email) {
            try {
                await syncMemberToListmonk(member.keycloakId);
            } catch (error) {
                console.error(`[Listmonk] Failed to sync member ${member.keycloakId}:`, error);
            }
        }
    }
}

export async function removeExpiredMembersFromListmonk() {
    const now = new Date();
    const members = await db.query.memberTable.findMany({
        where: or(
            isNull(memberTable.membershipExpiresAt),
            lte(memberTable.membershipExpiresAt, now)
        ),
    });

    for (const member of members) {
        if (member.email) {
            try {
                const existing = await listmonkClient.getSubscriber(member.email);
                if (existing && existing.id) {
                    await listmonkClient.deleteSubscriber(existing.id);
                }
            } catch (error) {
                console.error(`[Listmonk] Failed to remove subscriber for ${member.email}:`, error);
            }
        }
    }
}
