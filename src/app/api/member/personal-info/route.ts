import { auth } from '@/auth';
import { AGE_BRACKETS, GENDERS, STUDENT_STATUSES, STUDENT_TYPES } from '@/constants/student-info';
import { db } from '@/db';
import { memberTable } from '@/db/schema';
import { updateKeycloakUserName } from '@/lib/keycloak-admin';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const personalInfoSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    ageBracket: z.enum(AGE_BRACKETS),
    gender: z.enum(GENDERS),
    studentType: z.enum([...STUDENT_TYPES, ''] as [string, ...string[]]),
    studentStatus: z.enum(STUDENT_STATUSES),
    studentId: z.string().or(z.literal('')),
});

export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    const body = await request.json();
    const parsed = personalInfoSchema.safeParse(body);
    if (!parsed.success) {
        return new Response(JSON.stringify(parsed.error.format()), { status: 400 });
    }
    const data = parsed.data;
    try {
        // Update name in Keycloak
        try {
            await updateKeycloakUserName({
                keycloakId: session.user.id!,
                firstName: data.firstName,
                lastName: data.lastName,
            });
        } catch {
            return new Response(JSON.stringify({ error: 'Failed to update name in Keycloak' }), {
                status: 500,
            });
        }
        // Update fields in DB
        await db
            .update(memberTable)
            .set({
                firstName: data.firstName,
                lastName: data.lastName,
                ageBracket: data.ageBracket,
                gender: data.gender,
                studentType:
                    data.studentStatus === 'At Adelaide University'
                        ? (data.studentType as '' | 'Domestic' | 'International')
                        : '',
                studentStatus: data.studentStatus,
                studentId: data.studentStatus === 'At Adelaide University' ? data.studentId : '',
            })
            .where(eq(memberTable.keycloakId, session.user.id ?? ''));
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to update personal info' }), {
            status: 500,
        });
    }
}

export async function GET() {
    const session = await auth();
    if (!session?.user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    try {
        if (!session.user.id) {
            return new Response(JSON.stringify({ error: 'User ID not found' }), { status: 400 });
        }
        const user = await db
            .select()
            .from(memberTable)
            .where(eq(memberTable.keycloakId, session.user.id ?? ''));
        return new Response(JSON.stringify(user), { status: 200 });
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to fetch user info' }), {
            status: 500,
        });
    }
}
