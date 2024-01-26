export const SPONSOR_TYPES = ['gold', 'silver', 'bronze'] as const;

export type SponsorType = (typeof SPONSOR_TYPES)[number];
export type Sponsor = {
    name: string;
    description: string;
    image: string;
    website: string;
    type: SponsorType;
};

export const YEAR = 2023;

// Image file should be in `/public/images/sponsors`
const SPONSORS: Sponsor[] = [
    {
        name: 'Macquarie',
        image: 'macquarie-group.svg',
        website: 'https://www.macquarie.com.au/',
        type: 'gold',
        description:
            "At Macquarie, we're connecting people and data, building platforms and applications, and designing tomorrow's technology solutions. We have market leading expertise, so where could a career in Technology at Macquarie take you? Join our leaders and graduates to gain first-hand insights into a career in Technology.",
    },
    {
        name: 'PwC',
        image: 'pricewaterhouse-coopers.svg',
        website: 'https://www.pwc.com.au/',
        type: 'silver',
        description:
            "At PwC, our purpose is to build trust in society and solve important problems. In our increasingly complex world, we work with businesses, government and the community to deliver solutions and sustained outcomes. To help Australia continue to thrive and grow. We're a network of firms in 152 countries with over 328,000 people. PwC is one of the top 50 brands worldwide and PwC Australia is among LinkedIn's top companies for where Australians want to work.",
    },
    {
        name: 'Atlassion',
        image: 'atlassian.svg',
        website:
            'https://www.atlassian.com/company/careers/resources/perk-and-benefits/global/australia',
        type: 'bronze',
        description:
            'Here at Atlassian we believe that behind every great human achievement, there is a team. From medicine and space travel, to disaster response and pizza deliveries, our products help teams all over the planet advance humanity through the power of software. Our mission is to help unleash the potential of every team.',
    },
];

export const getSponsors = (type: SponsorType) =>
    SPONSORS.filter((sponsor) => sponsor.type === type);
