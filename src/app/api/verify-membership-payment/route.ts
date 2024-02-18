import { verifyMembershipPayment } from '@/db/queries';
import { currentUser } from '@clerk/nextjs';

export async function GET() {
    const user = await currentUser();

    const paid = await verifyMembershipPayment(user?.id ?? '');
    return Response.json({ paid });
}
