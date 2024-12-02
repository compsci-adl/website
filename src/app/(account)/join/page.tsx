import { auth } from '@/auth';
import { checkUserExists } from '@/server/check-user-exists';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Join from './Join';

export const metadata: Metadata = {
    title: 'Join',
};

export default async function JoinPage() {
    const session = await auth();
    console.log(session);

    if (session?.user) {
        if (session?.user.id) {
            const userExists = await checkUserExists(session.user.id);
            if (userExists) {
                redirect('/settings');
            }
        }
    }
    return <Join />;
}
