import { CreateReviewDto, Review } from './../models/review';
import axios from 'axios';

import { SanityProduct } from '@/config/inventory'; 

import { CreateOrderDto } from '@/models/room';
import  sanityClient  from '@/sanity/lib/client';
import * as queries from './sanityQueries';
import { Order } from '@/models/booking';
import { UpdateReviewDto } from '@/models/review';

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
}: CreateOrderDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: 'order', // Sanity típusa
          orderId:id,
          user: { _type: 'reference', _ref: user }, // Felhasználó referencia
          products: products.map(product => ({
            product: { _type: 'reference', _ref: product.product._id },
            style: product.style, // Termék stílusa
            size: product.size , // Méret neve
            _key:product.product._id,
          })), // Termékek referenciái
          orderdate, // Rendelés dátuma
          totalPrice, // Teljes ár
          status:'process',
        },
      },
    ],
  };


  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-05-12/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export const updateHotelRoom = async (ProductId: string) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: ProductId,
          set: {
            isBooked: true,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-05-12/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export async function getUserBookings(userId: string) {
  const result = await sanityClient.fetch<Order[]>(
    queries.getUserBookingsQuery,
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
  ProductId: string
): Promise<null | { _id: string }> {
  const query = `*[_type == 'review' && user._ref == $userId && product._ref == $ProductId][0] {
    _id
  }`;

  const params = {
    userId,
    ProductId,
  };

  const result = await sanityClient.fetch(query, params);

  return result ? result : null;
}

export const updateReview = async ({
  reviewId,
  reviewText,
  userRating,
 
}: UpdateReviewDto) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: reviewId,
          set: {
            text: reviewText,
            userRating,
          
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-05-12/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );
  
  return data;
};

export const createReview = async ({
  ProductId,
  reviewText,
  userId,
  userRating,
 
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
          product: {
            _type: 'reference',
            _ref: ProductId,
          },
          userRating,
          text: reviewText,
          
        },
      },
    ],
  };
console.log(mutation);
  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-05-12/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export async function getRoomReviews(roomId: string) {
  const result = await sanityClient.fetch<Review[]>(
    queries.getRoomReviewsQuery,
    {
      roomId,
    },
    { cache: 'no-cache' }
  );

  return result;
}


