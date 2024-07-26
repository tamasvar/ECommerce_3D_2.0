import { NextResponse } from "next/server"
// @ts-ignore
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { stripe } from "@/lib/stripe"

export async function POST(request: Request) {
    const { cartDetails, shippingAmount, selectedCountry, discount, totalPrice, couponId } = await request.json();

    const line_items = [];
    let totalQuantity = 0;

    for (const key in cartDetails) {
        if (cartDetails.hasOwnProperty(key)) {
            const item = cartDetails[key];
            const lineItem = {
                price_data: {
                    currency: item.currency,
                    unit_amount: item.price - discount, // Convert price to cents
                    product_data: {
                        name: item.name,
                        description: `${item.description}\n${item.product_data?.size}\n${item.product_data?.style}`,
                        metadata: { // Add metadata here
                            id: item.id,
                            name: item.name,
                            size: item.product_data?.size,
                            style: item.product_data?.style
                        }
                    },
                },
                quantity: item.quantity,

            };

            totalQuantity += item.quantity;
            line_items.push(lineItem);

        }
    }

    const sessionuser = await getServerSession(authOptions);
    let metadataObject: Record<string, string> = {};

    if (sessionuser) {
        const userId = sessionuser.user.id;
        const metadata = line_items.map(item => item.price_data.product_data.metadata);
        metadata.forEach((item, index) => {
            metadataObject[index.toString()] = JSON.stringify(item);
        });
        metadataObject['userId'] = userId;
        metadataObject['couponId'] = couponId;
    } else {
        metadataObject['userId'] = 'guest';
    }

    // Calculate shipping cost
    const baseShippingCost = shippingAmount; // €30 in cents
    const additionalItemCost = 400; // €3 in cents
    const shippingCost = totalQuantity > 1 ? baseShippingCost + (totalQuantity - 1) * additionalItemCost : baseShippingCost;

    // Add shipping line item
    line_items.push({
        price_data: {
            currency: "eur",
            unit_amount: shippingCost,
            product_data: {
                name: "Shipping",
                description: "Shipping Cost",
            },
        },
        quantity: 1,
    });

    const origin = request.headers.get('origin');
    const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        allow_promotion_codes: true,
        line_items: line_items,
        shipping_address_collection: {
            allowed_countries: [selectedCountry],
        },
        billing_address_collection: "auto",
        phone_number_collection: {
            enabled: true,
        },
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&totalAmount=${totalPrice}&itemsCount=${totalQuantity}`,

        cancel_url: `${origin}/cart`,
        metadata: metadataObject,
    });

    return NextResponse.json(session);
}