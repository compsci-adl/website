type Companies = {
    name: string;
    displayName: string;
    logoPath: string;
    desc: string;
    link: string;
};

export const COMPANIES: Companies[] = [
    {
        name: 'atlassian',
        displayName: 'Atlassian',
        logoPath: '/sponsor-logos/atlassian.svg',
        desc: 'Here at Atlassian we believe that behind every great human achievement, there is a team. From medicine and space travel, to disaster response and pizza deliveries, our products help teams all over the planet advance humanity through the power of software. Our mission is to help unleash the potential of every team.',
        link: 'https://www.atlassian.com/company/careers/resources/perk-and-benefits/global/australia',
    },
    {
        name: 'macquarie',
        displayName: 'Macquarie',
        logoPath: '/sponsor-logos/macquarie.svg',
        desc: 'At Macquarie, we’re connecting people and data, building platforms and applications, and designing tomorrow’s technology solutions. We have market leading expertise, so where could a career in Technology at Macquarie take you? Join our leaders and graduates to gain first-hand insights into a career in Technology.',
        link: 'https://www.macquarie.com.au/',
    },
    {
        name: 'pwc',
        displayName: 'PwC',
        logoPath: '/sponsor-logos/pwc.svg',
        desc: 'At PwC, our purpose is to build trust in society and solve important problems. In our increasingly complex world, we work with businesses, government and the community to deliver solutions and sustained outcomes. To help Australia continue to thrive and grow. We’re a network of firms in 152 countries with over 328,000 people. PwC is one of the top 50 brands worldwide and PwC Australia is among LinkedIn’s top companies for where Australians want to work.',
        link: 'https://www.pwc.com.au/',
    },
];
