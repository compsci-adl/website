export const SPONSOR_TYPES = ['gold', 'silver', 'bronze'] as const;

export type SponsorType = (typeof SPONSOR_TYPES)[number];
export type Sponsor = {
    name: string;
    description: string;
    image: string;
    website: string;
    type: SponsorType;
};

export const YEAR = 2024;

// NOTE:
// Companies should be ordered by their type (gold first, then silver, then bronze) and alphabetically from A to Z.
// Image file should be in `/public/images/sponsors`
const SPONSORS: Sponsor[] = [
    {
        name: 'Boeing',
        image: 'boeing.svg',
        website: 'https://www.boeing.com.au/',
        type: 'silver',
        description:
            'Boeing has the broadest portfolio in Australian aerospace, with over 4800 employees and an extensive supply chain supporting our advanced manufacturing of commercial aircraft composite components, defence systems design and development, modeling and simulation, research and development, support and training, and uncrewed systems.',
    },
    {
        name: 'Jane Street',
        image: 'jane-street.png',
        website: 'https://www.janestreet.com/',
        type: 'silver',
        description:
            "Jane Street is a proprietary trading firm that operates around the clock and around the globe. We bring a deep understanding of markets, a scientific approach, and innovative technology to bear on the problem of trading profitably in the world's highly competitive financial markets. Founded in 2000, we have offices in New York, London, Hong Kong, and Amsterdam. The environment is open, informal, intellectual and fun. You can wear a t-shirt and jeans to the office every day, the kitchen is stocked, and discussions are always lively. Teaching and learning are central activities through classes, mentoring and discussion.",
    },
    {
        name: 'Macquarie',
        image: 'macquarie.svg',
        website: 'https://www.macquarie.com/',
        type: 'silver',
        description:
            'At Macquarie, we’re connecting people and data, building platforms and applications, and designing tomorrow’s technology solutions. We have market leading expertise, so where could a career in Technology at Macquarie take you? Join our leaders and graduates to gain first-hand insights into a career in Technology.',
    },
    {
        name: 'Swordfish Computing',
        image: 'swordfish.svg',
        website: 'https://www.swordfish.com.au/',
        type: 'silver',
        description:
            'Swordfish was established in 1999 with the goal of providing specialist Computer Systems Engineering, Software Engineering, and Modelling, Simulation and Analysis (MS&A) services in support of Defence Research and Development (R&D) programs within Defence.',
    },
    {
        name: 'Citadel Securities',
        image: 'citadel-securities.png',
        website: 'https://www.citadelsecurities.com/',
        type: 'bronze',
        description:
            'Citadel Securities is the next-generation capital markets firm. We create efficient ways for buyers and sellers to come together; we innovative ways to price and absorb risk; and we develop new technologies to transform markets. Integrating deep financial, mathematical and engineering expertise, Citadel Securities delivers critical liquidity to central banks, financial institutions, government agencies, corporations, insurers and sovereign wealth funds.',
    },
    {
        name: 'PwC',
        image: 'pricewaterhouse-coopers.svg',
        website: 'https://www.pwc.com.au',
        type: 'bronze',
        description:
            'At PwC, our purpose is to build trust in society and solve important problems. In our increasingly complex world, we work with businesses, government and the community to deliver solutions and sustained outcomes. To help Australia continue to thrive and grow. We’re a network of firms in 152 countries with over 328,000 people. PwC is one of the top 50 brands worldwide and PwC Australia is among LinkedIn’s top companies for where Australians want to work.',
    },
    {
        name: 'The University of Adelaide School of Computer and Mathematical Sciences',
        image: 'adelaide.svg',
        website: 'https://set.adelaide.edu.au/computer-and-mathematical-sciences/',
        type: 'bronze',
        description:
            'The School of Computer and Mathematical Sciences is home to world-class expertise working to solve some of the most challenging societal problems in pioneering ways. We produce globally significant research and offer best-in-class teaching in our state-of-the-art facilities. We drive industry innovations through collaborations with government and private enterprise.',
    },
    {
        name: 'VivCourt',
        image: 'vivcourt.svg',
        website: 'https://www.vivcourt.com/',
        type: 'bronze',
        description:
            'At VivCourt, we’re part of an industry that’s heavily focused on making money. We’re an active part of that and we’re proud of our trading success. Additionally, through our employee social bonus system and various social impact initiatives, we connect our company and our employees to something much bigger than ourselves. We use part of the money that we make, and the skills and capabilities that we have, for a purpose that we can be proud of.',
    },
];

export const getSponsors = (type: SponsorType) =>
    SPONSORS.filter((sponsor) => sponsor.type === type);
