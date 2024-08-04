import {
    AGE_BRACKETS,
    DEGREES,
    GENDERS,
    STUDENT_STATUSES,
    STUDENT_TYPES,
} from "@/constants/student-info";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const memberTable = sqliteTable("members", {
    id: text("id")
        .$defaultFn(() => nanoid())
        .primaryKey(),

    clerkId: text("clerk_id").notNull().unique(),
    email: text("email").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),

    studentStatus: text("student_status", { enum: STUDENT_STATUSES }).notNull(),
    studentId: text("student_id"),
    gender: text("gender", { enum: GENDERS }).notNull(),
    ageBracket: text("age_bracket", { enum: AGE_BRACKETS }).notNull(),
    degree: text("degree", { enum: [...DEGREES, ""] }),
    studentType: text("student_type", { enum: [...STUDENT_TYPES, ""] }),

    emailPreferences: text("email_preferences", { mode: "json" }),

    membershipExpiresAt: integer("membership_expires_at", {
        mode: "timestamp",
    }),

    createdAt: text("created_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    // TODO: `updated_at` in sqlite
    // updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});
