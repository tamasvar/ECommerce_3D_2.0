import { NextResponse } from "next/server"
// @ts-ignore
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { stripe } from "@/lib/stripe"

export async function POST(request: Request) {
    const { cartDetails, shippingAmount, selectedCountry, discount, totalPrice, coupon,formattedAddress } = await request.json();

    const line_items = [];
    let totalQuantity = 0;

    for (const key in cartDetails) {
        if (cartDetails.hasOwnProperty(key)) {
            const item = cartDetails[key];
            const lineItem = {
                price_data: {
                    currency: item.currency,
                    unit_amount: (coupon?.type === 'free_shipping') ? (item.price) : ((item.price+shippingAmount) - discount), // Convert price to cents
                    product_data: {
                        name: item.name,
                        description: `${item.description}\n${item.product_data?.size}\n${item.product_data?.style}`,
                        metadata: { // Add metadata here
                            id: item.id,
                            name: item.name,
                            size: item.product_data?.size,
                            style: item.product_data?.style,
                            
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
        metadataObject['couponId'] = coupon?.id;
        metadataObject['formattedAddress'] = formattedAddress;
    } else {
        const metadata = line_items.map(item => item.price_data.product_data.metadata);
        metadata.forEach((item, index) => {
            metadataObject[index.toString()] = JSON.stringify(item);
        });
        metadataObject['userId'] = 'user.48fca19f-146a-4a88-80a0-315667f2c6d3';
        metadataObject['couponId'] = coupon?.id;
    }

    // Calculate shipping cost
    const baseShippingCost = shippingAmount; // €30 in cents
    const additionalItemCost = 0; // €3 in cents
    const shippingCost = baseShippingCost + (totalQuantity - 1) * additionalItemCost;

    // Add shipping line item
    line_items.push({
        price_data: {
            currency: "eur",
            unit_amount: 0 ,
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