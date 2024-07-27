import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createOrder, updateCoupon } from '../../../lib/apis';
import { CreateOrderDto } from '../../../models/order'
import { v4 as uuidv4 } from 'uuid';
const checkout_session_completed = 'checkout.session.completed';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16',
});

export async function POST(req: Request) {
  const reqBody = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      console.error('Missing Stripe signature or webhook secret');
      return new NextResponse('Webhook signature or secret missing', { status: 400 });
    }

    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    console.error('Error constructing event:', error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Process the event
  switch (event.type) {
    case checkout_session_completed:
      const session: Stripe.Checkout.Session = event.data.object as Stripe.Checkout.Session;
      console.log('webhook session', session);

      if (session.metadata) {
        const userId = session.metadata['userId'];
        const couponId = session.metadata['couponId'];
        const orderId = session.id;
        const products = [];
        const orderDate = new Date(session.created * 1000).toISOString().split('T')[0]; // Convert UNIX timestamp to "YYYY-MM-DD" format
        const totalPrice = session.amount_total; // Stripe amount is in cents

        for (const key in session.metadata) {
          if (key !== 'userId' && key !== 'couponId') {
            const productMetadata = session.metadata[key];
            console.log(`Raw product metadata for key ${key}:`, productMetadata);

            try {
              const parsedProductMetadata = JSON.parse(productMetadata || '{}');
              console.log(`Parsed product metadata for key ${key}:`, parsedProductMetadata);
              const id = parsedProductMetadata.id?.split('_')[0];
              const product = {
                product: {
                  _key: uuidv4(),
                  _id: id,
                  name: parsedProductMetadata.name,
                },
                style: parsedProductMetadata.style,
                size: parsedProductMetadata.size,
              };
              console.log(product)
              products.push(product);
            } catch (error: unknown) {
              console.error('Error parsing product metadata:', (error as Error).message);
            }
          }
        }

        console.log('User ID:', userId);
        console.log('Order Date:', orderDate);
        console.log('Total Price:', totalPrice);
        console.log('All Products:', products);
        console.log('couponId:', couponId);

        // Create order data object
        const orderData: CreateOrderDto = {
          id: orderId,
          user: userId,
          products: products,
          orderdate: orderDate,
          totalPrice: totalPrice!,
          formattedAddress: ''
        };

        console.log('orderData in webhook', orderData);

        // Call createOrder function to save order in Sanity
        try {
          await createOrder(orderData);
          console.log('Order successfully created in Sanity.');
        } catch (error: any) {
          console.error('Error creating order:', error?.message);
          return new NextResponse('Error creating order', { status: 500 });
        }
          // Update coupon data
          if (couponId) {
            try {
              const couponUpdateData = {
                userId: userId,
                orderId: orderId,
                orderDate: orderDate,
                couponId: couponId,
              };
              await updateCoupon(couponUpdateData);
              console.log('Coupon successfully updated.');
            } catch (error: any) {
              console.error('Error updating coupon:', error?.message);
              return new NextResponse('Error updating coupon', { status: 500 });
            }
          }
        return new NextResponse('Order successful', {
          status: 200,
          statusText: 'Order Successful',
        });
      }

      return new NextResponse('No metadata found', {
        status: 400,
        statusText: 'No metadata found',
      });

    default:
      console.log(`Unhandled event type ${event.type}`);
      return new NextResponse('Event type not handled', {
        status: 400,
        statusText: 'Event type not handled',
      });
  }
}