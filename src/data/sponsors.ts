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
    const res = await fetch(sponsorURL, { cache: 'no-store' });
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