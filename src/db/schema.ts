import { mysqlTable, varchar, uniqueIndex, boolean, mysqlEnum } from 'drizzle-orm/mysql-core';

const members = mysqlTable(
    'members',
    {
        id: varchar('id', { length: 36 }).notNull().primaryKey(), // TODO: Revise ID length
        uniId: varchar('uniId', { length: 20 }),
        clerkId: varchar('clerkId', { length: 50 }),
        name: varchar('name', { length: 255 }).notNull(),
        email: varchar('email', { length: 450 }).notNull(),
        paid: boolean('paid').default(false),
        receiptCode: varchar('receiptCode', { length: 4 }),
        role: mysqlEnum('role', ['member', 'committee', 'executive']).notNull().default('member'),
        isUniMember: boolean('isUniMember'),
    },
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (members) => ({
        emailIndex: uniqueIndex('email_idx').on(members.email),
    })
);

export { members };
