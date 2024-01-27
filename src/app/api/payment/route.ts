import { type NextRequest } from 'next/server';
import type { CreatePaymentLinkRequest, OrderLineItem, CreatePaymentLinkResponse } from 'square';
import { Client, Environment } from 'square';
import { products } from '@/data/products';

const client = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment:
        process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox,
});

const { checkoutApi } = client;

export async function POST(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const product = params.get('product');
    const customerId = params.get('customerId');
    const redirectUrl = params.get('redirect');

    // TODO: Validate that the user is signed in

    if (!product || !customerId || !redirectUrl) {
        return new Response('Missing URL parameters', { status: 400 });
    }

    let lineItem: OrderLineItem;
    if (product === 'membership') {
        lineItem = products.membership;
    } else {
        return new Response('Product does not exist', { status: 400 });
    }

    const body: CreatePaymentLinkRequest = {
        idempotencyKey: crypto.randomUUID(),
        description: 'Payment made from CS Club website',
        order: {
            locationId: process.env.SQUARE_LOCATION_ID!,
            customerId: customerId,
            lineItems: [lineItem],
        },
        checkoutOptions: {
            allowTipping: false,
            redirectUrl: redirectUrl,
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

    const resp = await checkoutApi.createPaymentLink(body);
    const respFields: CreatePaymentLinkResponse = resp.result;
    if (resp.statusCode != 200) {
        return new Response(JSON.stringify(respFields.errors), { status: resp.statusCode });
    }

    // The URL to direct the user is accessed from `url` and `long_url`
    return Response.json(respFields.paymentLink);
}
