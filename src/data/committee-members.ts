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
const EXEC_ROLE_PRIORITY = ['President', 'Vice President', 'Treasurer', 'Secretary'];

function sortCommitteeMembers(members: CommitteeMember[]) {
    return members.sort((a, b) => {
        // Exec vs Non-exec
        if (a.exec && !b.exec) return -1;
        if (!a.exec && b.exec) return 1;

        // Both are execs
        if (a.exec && b.exec) {
            const aIndex = EXEC_ROLE_PRIORITY.indexOf(a.position);
            const bIndex = EXEC_ROLE_PRIORITY.indexOf(b.position);

            if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;

            // Remaining exec roles alphabetically
            return a.position.localeCompare(b.position);
        }

        // Both are non-execs
        const aIsManager = a.position.includes('Manager');
        const bIsManager = b.position.includes('Manager');

        if (aIsManager && !bIsManager) return -1;
        if (!aIsManager && bIsManager) return 1;

        // Non-manager non-execs → sort by role, then name
        const roleCompare = a.position.localeCompare(b.position);
        if (roleCompare !== 0) return roleCompare;

        return a.name.localeCompare(b.name);
    });
}

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

        return sortCommitteeMembers(committeeMembers);
    } catch (error) {
        console.error('Error fetching committeeMember:', error);
        return [];
    }
}
