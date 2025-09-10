import { env } from '@/env.mjs';
import { fetcher } from '@/lib/fetcher';

type CommitteeMember = {
    name: string;
    position: string;
    exec?: boolean;
};

// List of committee members with name, role and whether they are part of the
// executive committee

const committeeMemberURL = env.NEXT_PUBLIC_PAYLOAD_URI + '/api/committee-members?limit=50';

export async function fetchCommitteeMember(): Promise<CommitteeMember[]> {
    try {
        // Fetching committee member data from payload with fetcher
        const data = await fetcher.get.query([
            committeeMemberURL,
            { cache: 'no-store', prefixUrl: '' },
        ]);

        // Process the data to match the CommitteeMember interface
        const committeeMembers: CommitteeMember[] = data.docs.map((committeeMember: any) => ({
            name: committeeMember.name,
            position: committeeMember.role,
            exec: committeeMember.exec,
        }));

        return committeeMembers;
    } catch (error) {
        console.error('Error fetching committeeMember:', error);
        return [];
    }
}
