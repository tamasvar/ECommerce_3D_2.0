import { NextResponse } from 'next/server';
import { updateCoupon } from '@/lib/apis';

// Update coupon data
export async function PATCH(req: Request) {

  try {
    const body = await req.json();
    const updatedCouponData = await updateCoupon(body);
    return NextResponse.json(updatedCouponData, { status: 200, statusText: 'Update Successful' });
  } catch (error: any) {
    console.error('Error updating coupon:', error?.message);
    return new NextResponse('Unable to update coupon data', { status: 400 });
  }
}
