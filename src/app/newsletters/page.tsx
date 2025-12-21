import { auth } from '@/auth';
import NewsletterCard from '@/components/NewsletterCard';
import Title from '@/components/Title';
import { sanitizeAndParse, stripTemplatePlaceholders } from '@/lib/newsletterParser';
import { listmonkClient } from '@/server/listmonk';
import { verifyMembershipPayment } from '@/server/verify-membership-payment';
import { notFound } from 'next/navigation';
import React from 'react';
import { Campaign, ListmonkCampaignDetail } from './campaign';
import { extractFirstImage } from './extract-first-image';

export default async function NewslettersPage() {
    const session = await auth();
    if (!session?.user) {
        notFound();
    }

    const membership = await verifyMembershipPayment(session.user.id ?? '');
    if (!membership.paid) {
        notFound();
    }

    const campaigns = (await listmonkClient.getCampaigns()) as Campaign[];
    // Only show finished campaigns for list ID 1 (newsletter)
    const finishedCampaigns = campaigns
        .filter((c) => (c.status || '').toLowerCase() === 'finished')
        .filter((c) => {
            const campaignData = c as unknown as Record<string, unknown>;
            const listField =
                campaignData['list_id'] ?? campaignData['lists'] ?? campaignData['recipients'];
            if (!listField) return true;
            if (Array.isArray(listField)) {
                if (typeof (listField as unknown[])[0] === 'number')
                    return (listField as number[]).includes(1);
                if (typeof (listField as unknown[])[0] === 'object')
                    return (listField as { id?: number }[]).some((x) => x?.id === 1);
                return false;
            }
            if (typeof listField === 'number') return listField === 1;
            return String(listField) === '1';
        });

    // Fetch details for campaigns missing HTML and parse/sanitise for frontend
    const campaignsWithContent = await Promise.all(
        finishedCampaigns.map(async (campaign) => {
            if (campaign.html || campaign.content || campaign.plain_text) {
                return campaign;
            }
            try {
                const resp = await listmonkClient.getCampaignById(campaign.id);
                let data: ListmonkCampaignDetail = {} as ListmonkCampaignDetail;
                const respObj = resp as { data?: unknown };
                if (respObj && respObj.data !== undefined && typeof respObj.data === 'object') {
                    data = respObj.data as ListmonkCampaignDetail;
                } else if (resp && typeof resp === 'object' && !Array.isArray(resp)) {
                    data = resp as ListmonkCampaignDetail;
                } else {
                    data = {};
                }
                const html =
                    data?.html ||
                    data?.content ||
                    data?.plain_text ||
                    data?.body ||
                    data?.message ||
                    '';
                return {
                    ...campaign,
                    html,
                    _listmonk_raw: data,
                } as Campaign & { html?: string; _listmonk_raw?: unknown };
            } catch (err) {
                console.warn('Failed to fetch campaign details for id', campaign.id, err);
                return campaign;
            }
        })
    );

    const sanitizedAndParsed = campaignsWithContent.map((c) => {
        const campaignAny = c as unknown as Record<string, unknown>;
        const raw =
            (campaignAny['html'] as string | undefined) ||
            (campaignAny['content'] as string | undefined) ||
            (campaignAny['plain_text'] as string | undefined) ||
            (campaignAny['body'] as string | undefined) ||
            (campaignAny['message'] as string | undefined) ||
            c.summary ||
            '';
        const cleaned = stripTemplatePlaceholders(raw);
        const parsed = sanitizeAndParse(cleaned);
        const firstImage = extractFirstImage(raw);
        return { ...c, parsedContent: parsed, firstImage } as Campaign & {
            parsedContent?: React.ReactNode;
            firstImage?: string | null;
        };
    });

    return (
        <div className="mx-auto w-responsive pt-16">
            <div className="mb-8 flex justify-center">
                <Title colour="orange">Newsletters</Title>
            </div>
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {sanitizedAndParsed.length === 0 && <li>No campaigns found.</li>}
                {sanitizedAndParsed.map(
                    (
                        campaign: Campaign & {
                            parsedContent?: React.ReactNode;
                            firstImage?: string | null;
                        }
                    ) => (
                        <NewsletterCard
                            key={campaign.id}
                            id={campaign.id}
                            subject={campaign.subject}
                            name={campaign.name}
                            summary={campaign.summary}
                            started_at={campaign.started_at}
                            firstImage={campaign.firstImage ?? null}
                        />
                    )
                )}
            </ul>
        </div>
    );
}
