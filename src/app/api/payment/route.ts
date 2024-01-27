/**
 * Payment API route
 *
 * This route is protected, meaning only authenticated users can access this. Clerk is used to
 * verify that the user is signed in (see `src/middleware.ts`)
 */

import { products } from '@/data/products';
import { squareClient } from '@/lib/square';
import { currentUser } from '@clerk/nextjs';
import type { CreatePaymentLinkRequest, OrderLineItem, CreatePaymentLinkResponse } from 'square';
import { z } from 'zod';

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

    const result = schema.safeParse(req);
    if (!result.success) {
        return new Response(result.error.message, { status: 400 });
    }

    let lineItem: OrderLineItem;
    if (result.data.product === 'membership') {
        lineItem = products.membership;
    } else {
        return new Response('Product does not exist', { status: 400 });
    }

    const body: CreatePaymentLinkRequest = {
        idempotencyKey: crypto.randomUUID(),
        description: 'Payment made from CS Club website',
        order: {
            locationId: process.env.SQUARE_LOCATION_ID!,
            customerId: result.data.customerId,
            lineItems: [lineItem],
        },
        checkoutOptions: {
            allowTipping: false,
            redirectUrl: result.data.redirectUrl,
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

    const resp = await squareClient.checkoutApi.createPaymentLink(body);
    const respFields: CreatePaymentLinkResponse = resp.result;
    if (resp.statusCode != 200) {
        return new Response(JSON.stringify(respFields.errors), { status: resp.statusCode });
    }

    // The URL to direct the user is accessed from `url` and `long_url`
    return Response.json(respFields.paymentLink);
}
