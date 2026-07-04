import { memberTable, notificationsTable } from '@/db/schema';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

describe('DB Schema Default Generators', () => {
    it('memberTable id generator returns a nanoid string', () => {
        const idFn = memberTable.id.defaultFn;
        assert.ok(idFn);
        const result = idFn();
        assert.strictEqual(typeof result, 'string');
        assert.ok(result.length > 0);
    });

    it('notificationsTable id generator returns a nanoid string', () => {
        const idFn = notificationsTable.id.defaultFn;
        assert.ok(idFn);
        const result = idFn();
        assert.strictEqual(typeof result, 'string');
        assert.ok(result.length > 0);
    });

    it('notificationsTable Boolean columns default to false', () => {
        const emailNewslettersFn = notificationsTable.emailNewsletters.defaultFn;
        assert.ok(emailNewslettersFn);
        assert.strictEqual(emailNewslettersFn(), false);

        const emailClubEventsAndAnnouncementsFn =
            notificationsTable.emailClubEventsAndAnnouncements.defaultFn;
        assert.ok(emailClubEventsAndAnnouncementsFn);
        assert.strictEqual(emailClubEventsAndAnnouncementsFn(), false);

        const emailSponsorNotificationsFn = notificationsTable.emailSponsorNotifications.defaultFn;
        assert.ok(emailSponsorNotificationsFn);
        assert.strictEqual(emailSponsorNotificationsFn(), false);

        const smsNewslettersFn = notificationsTable.smsNewsletters.defaultFn;
        assert.ok(smsNewslettersFn);
        assert.strictEqual(smsNewslettersFn(), false);

        const smsClubEventsAndAnnouncementsFn =
            notificationsTable.smsClubEventsAndAnnouncements.defaultFn;
        assert.ok(smsClubEventsAndAnnouncementsFn);
        assert.strictEqual(smsClubEventsAndAnnouncementsFn(), false);

        const smsSponsorNotificationsFn = notificationsTable.smsSponsorNotifications.defaultFn;
        assert.ok(smsSponsorNotificationsFn);
        assert.strictEqual(smsSponsorNotificationsFn(), false);
    });

    it('executes foreign key reference callbacks', () => {
        const symbols = Object.getOwnPropertySymbols(notificationsTable);
        const fkSymbol = symbols.find(
            (s) => s.toString() === 'Symbol(drizzle:SQLiteInlineForeignKeys)'
        );
        assert.ok(fkSymbol);

        const fks = (notificationsTable as any)[fkSymbol];
        assert.ok(Array.isArray(fks));
        assert.strictEqual(fks.length, 1);

        const refFn = fks[0].reference;
        assert.ok(typeof refFn === 'function');
        refFn();
    });
});
