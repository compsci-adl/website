import { env } from "@/env.mjs";

export const SPONSOR_TYPES = ['gold', 'silver', 'bronze'] as const;

export type SponsorType = (typeof SPONSOR_TYPES)[number];
export type Sponsor = {
    name: string;
    description: string;
    image: string;
    website: string;
    type: SponsorType;
};

interface ApiSponsor {
    id: string;
    "Company name": string;
    "Company description": string;
    "sponsor tier": SponsorType;
    logo: {
        url: string;
        alt: string;
    };
    website?: string;
};

export const sponsorURL = env.NEXT_PUBLIC_PAYLOAD_URI+ '/api/sponsors?limit=100';

/*
    Fetches sponsors from Payload CMS and transforms them into the required format.
*/
export async function fetchSponsors(): Promise<Sponsor[]> {
  try {
    const res = await fetch(sponsorURL);
    if (!res.ok) throw new Error(`Failed to fetch sponsors: ${res.statusText}`);
    const data = await res.json();

    // Parse each API sponsor into our Sponsor type
    return (data.docs || []).map((sponsor: ApiSponsor) => ({
      name: sponsor["Company name"],
      description: sponsor["Company description"],
      image: sponsor.logo.url, // Logo URL on payload
      website: sponsor.website || "#",
      type: sponsor["sponsor tier"],
    }));

  } catch (error) {
    console.error("Error fetching sponsors:", error);
    return [];
  }
}

// Changed to get year every load, !!! Must keep companies up to date !!!
const d = new Date();
export const YEAR = d.getFullYear();

// NOTE:
// Companies should be ordered by their type (gold first, then silver, then bronze) and alphabetically from A to Z.
// Image file should be in `/public/images/sponsors`
const SPONSORS: Sponsor[] = [
    {
        name: 'insightfactory.ai',
        image: 'insightfactoryai.svg',
        website: 'https://insightfactory.ai/',
        type: 'gold',
        description:
            'At insightfactory.ai, we’re on a mission to deliver the world’s leading managed data and AI platform. Our flagship solution, The Insight Factory, empowers data professionals of any skill level to rapidly build, deploy, and operate AI, BI, and Automation solutions—all in one place. In addition to the Insight Factory, we offer expert data and AI services to help you implement and scale your AI, BI, and Automation solutions with confidence. Our flexible production support models ensure optimal performance, stability, and success across every deployment. Whether you’re starting from scratch, reinvigorating an existing program, or looking to scale, we provide the product, people, and support you need to drive real business impact with AI, BI, and Automation.',
    },
    {
        name: 'Jane Street',
        image: 'jane-street.png',
        website: 'https://www.janestreet.com/',
        type: 'silver',
        description:
            'Jane Street is a quantitative trading firm with offices worldwide. We hire smart, humble people who love to solve problems, build systems, and test theories. You’ll learn something new every day in our office—whether it’s connecting with a colleague to share perspectives, or participating in a talk, class, or game night. Our success is driven by our people and we never stop improving.',
    },
    {
        name: 'Atlassian',
        image: 'atlassian.svg',
        website: 'https://www.atlassian.com/',
        type: 'bronze',
        description:
            "Atlassian is a global software company known for developing collaboration and productivity tools that help teams organise, discuss, and complete their work. Founded in 2002 in Sydney, Australia, Atlassian has grown to become a leader in the software industry, offering popular products such as Jira for project management, Confluence for team collaboration, and Trello for task organisation. Atlassian is renowned for its innovative and agile approach, fostering a culture of openness and teamwork. Atlassian's solutions are widely used by software development teams but also serve a variety of industries to enhance efficiency and collaboration across organisations.",
    },
    {
        name: 'Australian Institute for Machine Learning (AIML)',
        image: 'aiml.png',
        website: 'https://www.adelaide.edu.au/aiml/',
        type: 'bronze',
        description:
            'The Australian Institute for Machine Learning (AIML) conducts globally competitive research and development in artificial intelligence (AI), machine learning, computer vision and deep learning.Based at Lot Fourteen—South Australia’s innovation district—we collaborate with industry, government and business to develop high-tech products and solutions to everyday problems.',
    },
    {
        name: 'Commonwealth Bank',
        image: 'commbank.png',
        website: 'https://www.commbank.com.au/',
        type: 'bronze',
        description:
            "We are guided by our purpose – building a brighter future for all. Our strategy, to build tomorrow's bank today for our customers, reflects our commitment to use the strength of CBA to support our customers, invest in our communities and provide strength and stability for the broader economy. We are one of the leading banks in Australia, serving more than 17 million customers. We focus on providing retail and commercial banking services predominantly in Australia, and in New Zealand through our subsidiary, ASB. Our products and services are provided through our divisions, Retail Banking Services, Business Banking, Institutional Banking and Markets, and ASB New Zealand.",
    },
    {
        name: 'Swordfish Computing',
        image: 'swordfish.svg',
        website: 'https://www.swordfish.com.au/',
        type: 'bronze',
        description:
            "At Swordfish, we're not just developing innovative software and computer systems, we're leading the charge in transforming the future of Australian defence. With expertise in Agile Software Engineering, as well as a wide range of allied engineering and science disciplines, we're pushing the limits of what's possible with the latest tools and technologies. Our 25-year track record has earned us the reputation as trailblazers at the forefront of Australian defence and space research.",
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
