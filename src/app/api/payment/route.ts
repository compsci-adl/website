/**
 * Payment API route
 *
 * This route is protected, meaning only authenticated users can access this. Clerk is used to
 * verify that the user is signed in (see `src/middleware.ts`)
 */
import { PRODUCTS } from '@/data/products';
import { db } from '@/db';
import { updateMemberExpiryDate } from '@/db/queries';
import { memberTable } from '@/db/schema';
import { env } from '@/env.mjs';
import { redisClient } from '@/lib/redis';
import { squareClient } from '@/lib/square';
import { currentUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import type { CreatePaymentLinkRequest } from 'square';
import { ApiError } from 'square';
import { z } from 'zod';

// Create a Square payment link
// See: https://developer.squareup.com/reference/square/checkout-api/create-payment-link
export async function POST(request: Request) {
    const req = await request.json();
    const schema = z.object({
        product: z.string().min(1),
        customerId: z.string().min(1),
        redirectUrl: z.string().url().min(1),
    });

    // Ensure user is logged in
    const user = await currentUser();
    if (!user) {
        return new Response(null, { status: 401 });
    }

    const reqBody = schema.safeParse(req);
    if (!reqBody.success) {
        return new Response(JSON.stringify(reqBody.error.format()), { status: 400 });
    }

    if (reqBody.data.product !== 'membership') {
        return new Response('Product does not exist', { status: 400 });
    }
    const lineItem = PRODUCTS.membership;

    const body: CreatePaymentLinkRequest = {
        idempotencyKey: crypto.randomUUID(),
        description: 'Payment made from CS Club website',
        order: {
            locationId: env.SQUARE_LOCATION_ID!,
            customerId: reqBody.data.customerId,
            lineItems: [lineItem],
        },
        checkoutOptions: {
            allowTipping: false,
            redirectUrl: reqBody.data.redirectUrl,
            askForShippingAddress: false,
            acceptedPaymentMethods: {
                applePay: true,
                googlePay: true,
                cashAppPay: false,
                afterpayClearpay: false,
            },
            enableCoupon: false,
            enableLoyalty: false,
        },
    };

    try {
        const resp = await squareClient.checkoutApi.createPaymentLink(body);

        if (reqBody.data.product === 'membership') {
            // Add Clerk ID and payment ID to Redis cache
            const paymentId = resp.result.paymentLink?.id ?? '';
            const createdAt = resp.result.paymentLink?.createdAt ?? '';
            await redisClient.hSet(`payment:membership:${user.id}`, {
                paymentId: paymentId,
                createdAt: createdAt,
            });
        }

        // The URL to direct the user is accessed from `url` and `long_url`
        return Response.json(resp.result.paymentLink);
    } catch (e) {
        if (e instanceof ApiError) {
            return new Response(JSON.stringify(e.errors), { status: e.statusCode });
        }
        return new Response(null, { status: 500 });
    }
}

// Update member's payment status for admin
export async function PUT(request: Request) {
    const req = await request.json();
    const schema = z.object({
        id: z.string().min(1),
        paid: z.boolean(),
    });

    const user = await currentUser();
    if (!user?.publicMetadata.isAdmin) {
        return new Response(null, { status: 401 });
    }

    const reqBody = schema.safeParse(req);
    if (!reqBody.success) {
        return new Response(JSON.stringify(reqBody.error.format()), { status: 400 });
    }

    if (reqBody.data.paid) {
        await updateMemberExpiryDate(reqBody.data.id, 'id');
    } else {
        await db
            .update(memberTable)
            .set({ membershipExpiresAt: null })
            .where(eq(memberTable.id, reqBody.data.id));
    }
    return Response.json({ success: true });
}
