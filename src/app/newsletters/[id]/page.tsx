import { auth } from '@/auth';
import FancyRectangle from '@/components/FancyRectangle';
import Title from '@/components/Title';
import { sanitizeAndParse, stripTemplatePlaceholders } from '@/lib/newsletterParser';
import { listmonkClient } from '@/server/listmonk';
import type { ListmonkCampaign } from '@/server/listmonk';
import { verifyMembershipPayment } from '@/server/verify-membership-payment';
import { formatDate } from '@/utils/format-date';
import { notFound } from 'next/navigation';
import React from 'react';
import { Params, Campaign } from './params';

export default async function NewsletterDetailsPage({ params }: Params) {
    const session = await auth();
    if (!session?.user) {
        notFound();
    }

    const membership = await verifyMembershipPayment(session.user.id ?? '');
    if (!membership.paid) {
        notFound();
    }

    const campaignId = parseInt(params.id || '', 10);
    if (!campaignId) {
        notFound();
    }

    let campaign: Campaign | null = null;
    try {
        const resp = (await listmonkClient.getCampaignById(campaignId)) as
            | {
                  data?: ListmonkCampaign;
              }
            | ListmonkCampaign;
        if (resp && typeof resp === 'object') {
            const maybeWithData = resp as {
                data?: ListmonkCampaign;
            };
            const data = maybeWithData.data ?? (resp as ListmonkCampaign);
            campaign = {
                id: campaignId,
                subject: (data as ListmonkCampaign).subject,
                html:
                    (data as ListmonkCampaign).html ||
                    (data as ListmonkCampaign).content ||
                    (data as ListmonkCampaign).body ||
                    '',
                body: (data as ListmonkCampaign).body,
                summary: (data as ListmonkCampaign).summary,
                started_at: (data as ListmonkCampaign).started_at,
                status: (data as ListmonkCampaign).status,
            };
        }
    } catch (err) {
        console.warn('Failed to fetch campaign details for id', campaignId, err);
        notFound();
    }

    if (!campaign) {
        notFound();
    }

    const raw =
        campaign.plain_text ||
        campaign.html ||
        campaign.content ||
        campaign.body ||
        campaign.summary ||
        '';
    const cleaned = stripTemplatePlaceholders(raw);
    const parsed = sanitizeAndParse(cleaned);

    return (
        <div className="mx-auto w-responsive pt-16">
            <div className="mb-8 flex justify-center">
                <Title colour="orange">Newsletters</Title>
            </div>
            <FancyRectangle colour="purple" offset="8" filled fullWidth>
                <div className="z-0 w-full border-4 border-black bg-white p-8 text-black md:p-12">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h2 className="mb-2 text-lg font-bold md:text-2xl">
                                {campaign.subject}
                            </h2>
                            {campaign.summary && (
                                <p className="text-muted mt-1 text-sm">{campaign.summary}</p>
                            )}
                        </div>
                        <div className="text-muted shrink-0 text-sm font-bold">
                            {formatDate(campaign.started_at)}
                        </div>
                    </div>
                    {parsed && (
                        <div className="prose not-prose mt-6 max-w-none text-black">
                            <div className="prose-img:mx-auto prose-img:max-w-full">{parsed}</div>
                        </div>
                    )}
                </div>
            </FancyRectangle>
        </div>
    );
}
