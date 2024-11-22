type CommitteeMember = {
    name: string;
    position: string;
    exec?: boolean;
};

// List of committee members with name, role and whether they are part of the
// executive committee
export const COMMITTEE_MEMBERS: CommitteeMember[] = [
    {
        name: 'Yaman Ashqar',
        position: 'President',
        exec: true,
    },
    {
        name: 'Leo Li',
        position: 'Vice-President',
        exec: true,
    },
    {
        name: 'Christian Dianos',
        position: 'Treasurer',
        exec: true,
    },
    {
        name: 'Ray Okamoto',
        position: 'Secretary',
        exec: true,
    },
    {
        name: 'Zac Anderson',
        position: 'Partnerships & Sponsorships Manager',
        exec: true,
    },
    {
        name: 'Patrick Thompson',
        position: 'Partnerships & Sponsorships Officer',
    },
    {
        name: 'Olivia Aston',
        position: 'Partnerships & Sponsorships Officer',
    },
    {
        name: 'Yuhan Wang',
        position: 'Design Manager',
    },
    {
        name: 'Prefei',
        position: 'Graphic Officer',
    },
    {
        name: 'Lucy Fidock',
        position: 'Graphic Officer',
    },
    {
        name: 'Omar Badr',
        position: 'Social Media & Marketing Manager',
    },
    {
        name: 'Lalisa Thaiprasert',
        position: 'Social Media & Marketing Officer',
    },
    {
        name: 'Jessica Hu',
        position: 'Social Media & Marketing Officer',
    },
    {
        name: 'Phoenix Pereira',
        position: 'Open Source & Infrastructure Manager',
    },
    {
        name: 'Justin Sun',
        position: 'Open Source Officer',
    },
    {
        name: 'Austin Huppatz',
        position: 'Open Source Officer',
    },
    {
        name: 'Willard Gorman',
        position: 'Events Manager',
    },
    {
        name: 'Shahid Hussain',
        position: 'Events Officer',
    },
    {
        name: 'Jennifer Bao Tien Tran',
        position: 'Events Officer',
    },
    {
        name: 'LLoyd Draysey',
        position: 'Events Officer',
    },
    {
        name: 'Shreeshail',
        position: 'Events Officer',
    },
    {
        name: 'Syeda Ramisa',
        position: 'Postgraduate Representative',
    },
    {
        name: 'Matilda Cotton',
        position: 'Human Resources Officer',
    },
    {
        name: 'Ben Signorelli',
        position: 'Duck Lounge Liaison',
    },
];
