export type LinkType = {
    title: string;
    href?: string;
    dropdown?: LinkType[];
};

const LINKS: LinkType[] = [
    { title: 'About', href: '/about' },
    { title: 'Events', href: '/events' },
    { title: 'Sponsors', href: '/sponsors' },
    { title: 'Open Source', href: '/open-source' },
    // {
    //     title: 'More',
    //     dropdown: [
    //         { title: 'FAQs', href: '/faqs' },
    //         { title: 'Photo Gallery', href: '/gallery' },
    //         { title: 'Resources', href: '/resources' },
    //     ],
    // },
    { title: 'Contact', href: '/contact' },
];

export default LINKS;
