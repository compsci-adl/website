import type { Metadata } from 'next';
import Join from './Join';

export const metadata: Metadata = {
    title: 'Join',
};

export default function JoinPage() {
    return <Join />;
}
