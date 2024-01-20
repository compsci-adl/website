import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    clerk_id: integer('clerk_id').primaryKey(),
    student_id: text('student_id').notNull(),
    first_name: text('first_name').notNull(),
    last_name: text('last_name').notNull(),
    email: text('email').notNull(),
    created_at: text('created_at').notNull(),
    updated_at: text('updated_at').notNull(),
    membership_paid_at: text('membership_paid_at').notNull(),
    membership_expiry_at: text('membership_expiry_at').notNull(),
    membership_status: text('membership_status').notNull(),
    age: integer('age').notNull(),
    gender: text('gender').notNull(),
    degree: text('degree').notNull(),
    student_type: text('student_type', { enum: ['Domestic', 'International'] }).notNull(),
});
