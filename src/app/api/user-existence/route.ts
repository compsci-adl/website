import { checkUserExists } from '@/server/check-user-exists';
import { currentUser } from '@clerk/nextjs';

export async function GET() {
    const user = await currentUser();
    if (!user) {
        return new Response(null, { status: 401 });
    }

    const exists = await checkUserExists(user.id);
    return Response.json({ exists });
}
