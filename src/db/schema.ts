import {
    AGE_BRACKETS,
    DEGREES,
    GENDERS,
    STUDENT_STATUSES,
    STUDENT_TYPES,
} from '@/constants/student-info';
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

export const memberTable = sqliteTable('members', {
    id: text('id')
        .$defaultFn(() => nanoid())
        .primaryKey(),

    keycloakId: text('keycloak_id').notNull().unique(),
    email: text('email').notNull(),
    phoneNumber: text('phone_number'),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),

    studentStatus: text('student_status', { enum: STUDENT_STATUSES }).notNull(),
    studentId: text('student_id'),
    gender: text('gender', { enum: GENDERS }).notNull(),
    ageBracket: text('age_bracket', { enum: AGE_BRACKETS }).notNull(),
    degree: text('degree', { enum: [...DEGREES, ''] }),
    studentType: text('student_type', { enum: [...STUDENT_TYPES, ''] }),

    welcomeEmailSent: integer('welcome_email_sent', { mode: 'boolean' }),

    membershipExpiresAt: integer('membership_expires_at', { mode: 'timestamp' }),

    createdAt: text('created_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: text('updated_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});

export const notificationsTable = sqliteTable('notifications', {
    id: text('id')
        .$defaultFn(() => nanoid())
        .primaryKey(),
    keycloakId: text('keycloak_id')
        .notNull()
        .references(() => memberTable.keycloakId),
    emailNewsletters: integer('email_newsletters', { mode: 'boolean' })
        .$default(() => false)
        .notNull(),
    emailClubEventsAndAnnouncements: integer('email_club_events_and_announcements', {
        mode: 'boolean',
    })
        .$default(() => false)
        .notNull(),
    emailSponsorNotifications: integer('email_sponsor_notifications', { mode: 'boolean' })
        .$default(() => false)
        .notNull(),

    smsNewsletters: integer('sms_newsletters', { mode: 'boolean' })
        .$default(() => false)
        .notNull(),
    smsClubEventsAndAnnouncements: integer('sms_club_events_and_announcements', {
        mode: 'boolean',
    })
        .$default(() => false)
        .notNull(),
    smsSponsorNotifications: integer('sms_sponsor_notifications', { mode: 'boolean' })
        .$default(() => false)
        .notNull(),

    pushNewsletters: integer('push_newsletters', { mode: 'boolean' })
        .$default(() => false)
        .notNull(),
    pushClubEventsAndAnnouncements: integer('push_club_events_and_announcements', {
        mode: 'boolean',
    })
        .$default(() => false)
        .notNull(),
    pushSponsorNotifications: integer('push_sponsor_notifications', { mode: 'boolean' })
        .$default(() => false)
        .notNull(),

    createdAt: text('created_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: text('updated_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});
