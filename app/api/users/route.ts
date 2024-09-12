import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/app/auth/auth';

import {
  checkReviewExists,
  createReview,
  getUserData,
  updateUser,
  updateReview,
} from '@/lib/apis';

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Authentication Required', { status: 500 });
  }

  const userId = session.user.id;

  try {
    const data = await getUserData(userId);
    return NextResponse.json(data, { status: 200, statusText: 'Successful' });
  } catch (error) {
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}

// POST REQUEST
export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Authentication Required', { status: 500 });
  }

  const { productId, orderId, reviewText, ratingValue, image } = await req.json();

  if (!productId || !reviewText || !ratingValue) {
    return new NextResponse('All fields are required', { status: 400 });
  }

  const userId = session.user.id;

  try {
    const alreadyExists = await checkReviewExists(userId, productId, orderId);

    let data;

    if (alreadyExists) {
      data = await updateReview({
        reviewId: alreadyExists._id,
        reviewText,
        userRating: ratingValue,
        image
      });
    } else {
      data = await createReview({
        OrderId: orderId,
        ProductId: productId,
        reviewText,
        userId,
        userRating: ratingValue,
        image
      });
    }

    return NextResponse.json(data, { status: 200, statusText: 'Successful' });
  } catch (error: any) {
    console.log('Error Updating', error);
    return new NextResponse('Unable to create review', { status: 400 });
  }
}

//update user data
export async function PATCH(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Authentication Required', { status: 500 });
  }

  const userId = session.user.id;

  const userDataToUpdate = await req.json();

  try {
    const updatedUserData = await updateUser(userId, userDataToUpdate);

    return NextResponse.json(updatedUserData, { status: 200, statusText: 'Update Successful' });
  } catch (error: any) {
    console.error('Error Updating User Data:', error);
    return new NextResponse('Unable to update user data', { status: 400 });
  }
}
