//apis
import axios from 'axios';
import { CreateReviewDto, Review } from './../models/review';

import { SanityProduct,Reviews } from '@/config/inventory';

import sanityClient from '@/sanity/lib/client';
import * as queries from './sanityQueries';
import { Order, CreateOrderDto, couponUpdateData } from '@/models/order';
import { UpdateReviewDto } from '@/models/review';
import { handleAddCouponsAvailedUser } from './utils';
import { randomUUID } from 'crypto';

export async function getProducts(filter: string, order: string): Promise<SanityProduct[]> {
  const query = queries.getProductsQuery(filter, order);
  const result = await sanityClient.fetch<SanityProduct[]>(query, {} );
  return result;
}

export async function getAllReviews(): Promise<Reviews[]> {
  const query = queries.getAllReviewsQuery;
  const result = await sanityClient.fetch<Reviews[]>(query, {}, { cache: 'no-cache' });
  return result;
}

export async function getReviewRatings(): Promise<Reviews[]> {
  const query = queries.getReviewRatingsQuery;
  const result = await sanityClient.fetch<Reviews[]>(query, {}, { cache: 'no-cache' });
  return result;
}


export async function getFeaturedRoom() {
  const result = await sanityClient.fetch<SanityProduct>(
    queries.getFeaturedRoomQuery,
    {},
    { cache: 'no-cache' }
  );

  return result;
}

export async function getRooms() {
  const result = await sanityClient.fetch<SanityProduct[]>(
    queries.getRoomsQuery,
    {},
    { cache: 'no-cache' }
  );
  return result;
}

export async function getRoom(slug: string) {
  const result = await sanityClient.fetch<SanityProduct>(
    queries.getRoom,
    { slug },
    { cache: 'no-cache' }
  );

  return result;
}

export const createOrder = async ({
  id,
  user,
  products,
  orderdate,
  totalPrice,
  couponId,
  formattedAddress,
}: CreateOrderDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: 'order', // Sanity típusa
          orderId: id,
          user: { _type: 'reference', _ref: user }, // Felhasználó referencia
          products: products.map(product => ({
            product: { _type: 'reference', _ref: product.product._id },
            style: product.style, // Termék stílusa
            size: product.size, // Méret neve
            _key: product.product._key,
          })), // Termékek referenciái
          orderdate, // Rendelés dátuma
          totalPrice, // Teljes ár
          status: 'process',
          formattedaddress: formattedAddress,
        },
      },
    ],
  };
  if (couponId) {
    await handleAddCouponsAvailedUser({
      orderId: id,
      userId: user,
      orderDate: orderdate,
      couponId
    });
  }
  const res = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-08-16/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_STUDIO_TOKEN}` } }
  );

  
  return res.data;
};

export const updateCouponStripe = async ({
  userId,
  orderId,
  orderDate,
  couponId,
  
}: couponUpdateData) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: couponId,
            set: {
                _key: orderId,
                orderId: orderId,
                user: { _type: 'reference', _ref: userId }, 
                orderDate, 
            }
        },
      },
    ],
  };
 

  const {data} = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-08-16/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_STUDIO_TOKEN}` } }
  );

  
  return data;
};

export async function getUserOrders(userId: string) {
  const result = await sanityClient.fetch<Order[]>(
    queries.getUserOrdersQuery,
    {
      userId,
    },
    { cache: 'no-cache' }
  );

  return result;
}

export async function getUserData(userId: string) {
  const result = await sanityClient.fetch(
    queries.getUserDataQuery,
    { userId },
    { cache: 'no-cache' }
  );

  return result;
}

export async function checkReviewExists(
  userId: string,
  ProductId: string,
  OrderId: string,
): Promise<null | { _id: string }> {
  const query = `*[_type == 'review' && user._ref == $userId && product._ref == $ProductId && order._ref == $OrderId][0] {
    _id
  }`;

  const params = {
    userId,
    ProductId,
    OrderId,
  };

  const result = await sanityClient.fetch(query, params);

  return result ? result : null;
}

export const updateReview = async ({
  reviewId,
  reviewText,
  userRating,
  image
}: UpdateReviewDto) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: reviewId,
          set: {
            text: reviewText,
            userRating,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: image?._id,
              },
            },
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-08-16/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export const createReview = async ({
  OrderId,
  ProductId,
  reviewText,
  userId,
  userRating,
  image
}: CreateReviewDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: 'review',
          user: {
            _type: 'reference',
            _ref: userId,
          },
          order: {
            _type: 'reference',
            _ref: OrderId,
          },
          product: {
            _type: 'reference',
            _ref: ProductId,
          },
          userRating,
          text: reviewText,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: image?._id,
            },
          },
        },
      },
    ],
  };
  console.log(mutation);
  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-08-16/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export async function getRoomReviews(productId: string) {
  const result = await sanityClient.fetch<Review[]>(
    queries.getRoomReviewsQuery,
    {
      productId,
    },
    { cache: 'no-cache' }
  );

  return result;
}

export async function updateUser(userId: string, userDataToUpdate: any) {
  const transaction = sanityClient.transaction();

  try {
    const updatedUser = await transaction.patch(userId, patch =>
      patch.set({ shippingAddress: userDataToUpdate })
    ).commit();

    return updatedUser;
  } catch (error) {
    console.error('Sanity update error:', error);
    throw new Error('Failed to update user data in Sanity');
  }
}

export async function updateCoupon(body: any) {
  try {
    const { userId, orderId, orderDate, couponId } = body;
    const currentCoupon = await sanityClient.getDocument(couponId);

    if (!currentCoupon) {
      throw new Error('Coupon not found');
    }

    const updatedCoupon = await sanityClient
      .patch(couponId)
      .setIfMissing({ usersAvailed: [] })
      .append('usersAvailed', [
        {
          _key: orderId,
          userId: { _type: 'reference', _ref: userId },
          orderId,
          orderDate,
        },
      ])
      .commit();
    return updatedCoupon;
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to update coupon data in Sanity');
  }
}