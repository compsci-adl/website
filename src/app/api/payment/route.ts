/**
 * Payment API route
 *
 * This route is protected, meaning only authenticated users can access this. Auth.js is used to
 * verify that the user is signed in (see `src/middleware.ts`)
 */
import { auth } from '@/auth';
import { PRODUCTS } from '@/data/products';
import { db } from '@/db';
import { memberTable } from '@/db/schema';
import { env } from '@/env.mjs';
import { redisClient } from '@/lib/redis';
import { squareClient } from '@/lib/square';
import { sendWelcomeEmail } from '@/server/send-welcome-email';
import { updateMemberExpiryDate } from '@/server/update-member-expiry-date';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

type RouteSession = {
    user?: {
        id?: string;
        isAdmin?: boolean;
    };
} | null;

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
    const mockAuth =
        process.env.NODE_ENV !== 'production' ? request.headers.get('x-mock-auth') : null;
    const session = (
        mockAuth
            ? {
                  user: {
                      id: mockAuth === 'admin' ? 'mock-admin-id' : 'mock-user-id',
                      name: mockAuth === 'admin' ? 'Mock Admin' : 'Mock User',
                      email: `${mockAuth}@example.com`,
                      isCommittee: mockAuth === 'admin',
                      isAdmin: mockAuth === 'admin',
                  },
                  expires: '2026-12-31T23:59:59.999Z',
              }
            : await auth()
    ) as RouteSession;
    if (!session?.user) {
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

    const body = {
        idempotencyKey: crypto.randomUUID(),
        description: 'Payment made from CS Club website',
        order: {
            locationId: env.SQUARE_LOCATION_ID,
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
        let paymentLink;
        const shouldMockSquare =
            process.env.NODE_ENV !== 'production' || process.env.MOCK_SQUARE === 'true';

        if (shouldMockSquare) {
            paymentLink = {
                id: 'mock-link-id',
                url: 'http://localhost:3000/square-sandbox/payment-links/mock-link-id',
                orderId: 'mock-order-id',
                createdAt: new Date().toISOString(),
            };
        } else {
            const resp = await squareClient.checkout.paymentLinks.create(body);
            paymentLink = resp.paymentLink;
        }

        if (reqBody.data.product === 'membership') {
            // Add Keycloak ID and payment ID to Redis cache
            const orderId = paymentLink?.orderId ?? '';
            const createdAt = paymentLink?.createdAt ?? '';
            await redisClient.hSet(`payment:membership:${session?.user?.id}`, {
                orderId,
                createdAt,
            });
        }

        // The URL to direct the user is accessed from `url` and `long_url`
        return Response.json(paymentLink);
    } catch (e) {
        if (e && typeof e === 'object' && 'statusCode' in e) {
            return new Response(JSON.stringify((e as any).errors), {
                status: (e as any).statusCode,
            });
        }
        return new Response(null, { status: 500 });
    }
}

// Update member's payment status via admin console
export async function PUT(request: Request) {
    const req = await request.json();
    const schema = z.object({
        id: z.string().min(1),
        paid: z.boolean(),
    });

    const session = (await auth()) as RouteSession;
    if (!session?.user?.isAdmin) {
        return new Response(null, { status: 401 });
    }

    const reqBody = schema.safeParse(req);
    if (!reqBody.success) {
        return new Response(JSON.stringify(reqBody.error.format()), { status: 400 });
    }

    if (reqBody.data.paid) {
        await updateMemberExpiryDate(reqBody.data.id, 'id');

        const user = await db
            .select()
            .from(memberTable)
            .where(eq(memberTable.id, reqBody.data.id))
            .then((rows) => rows[0]);
        if (user && !user.welcomeEmailSent) {
            await sendWelcomeEmail(
                user.keycloakId as string,
                user.email as string,
                user.firstName as string
            );
        }
    } else {
        await db
            .update(memberTable)
            .set({ membershipExpiresAt: null })
            .where(eq(memberTable.id, reqBody.data.id));
    }
    return Response.json({ success: true });
}
