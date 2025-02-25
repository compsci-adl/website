import { sendContactEmail } from '@/server/send-contact-email';
import { z } from 'zod';

export async function POST(request: Request) {
    try {
        const req = await request.json();

        const schema = z.object({
            fullName: z.string().min(1),
            email: z.string().email().min(1),
            message: z.string().min(1),
        });

        const reqBody = schema.safeParse(req);

        if (!reqBody.success) {
            return new Response(JSON.stringify(reqBody.error.format()), { status: 400 });
        }

        await sendContactEmail(reqBody.data.fullName, reqBody.data.email, reqBody.data.message);

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
