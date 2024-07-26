import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth';

import {
  updateCoupon,
} from '@/lib/apis';


//update coupon data
export async function PATCH(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Authentication Required', { status: 500 });
  }

  const body = await req.json();

  try {
    const updatedCouponData = await updateCoupon(body);

    return NextResponse.json(updatedCouponData, { status: 200, statusText: 'Update Successful' });
  } catch (error: any) {
    return new NextResponse('Unable to update coupon data', { status: 400 });
  }
}
