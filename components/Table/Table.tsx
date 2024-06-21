'use client';
import React from 'react';
import { Dispatch, FC, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

import { Order } from '@/models/booking';

type Props = {
  bookingDetails: Order[];
  setRoomId: Dispatch<SetStateAction<string | null>>;
  toggleRatingModal: () => void;
};

const Table: FC<Props> = ({ bookingDetails, setRoomId, toggleRatingModal }) => {
  const router = useRouter();

  return (
    <div className='mx-auto max-w-[340px] overflow-x-auto rounded-lg shadow-md sm:rounded-lg md:max-w-full'>
      <table className='w-full text-left text-sm text-gray-500'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
        <tr>
            <th className='px-6 py-3'>Order ID</th>
            <th className='px-6 py-3'>Order Date</th>
            <th className='px-6 py-3'>Status</th>
            <th className='px-6 py-3'>Tracking Number</th>
            <th className='px-6 py-3'>Product</th>
            <th className='px-6 py-3'>Style</th>
            <th className='px-6 py-3'>Size </th>
            <th className='px-6 py-3'>Order total price</th>
            <th className='px-6 py-3'>Rating</th>
          </tr>
         </thead>
         
         <tbody> 
        {bookingDetails.map(booking => (
            booking.products.map(product => (
    <tr
    
      key={`${booking._id}-${product.product._id}`}
      className='border-b bg-white hover:bg-gray-50'
    >
      <td className='px-6 py-4'>{booking._id}</td>
      <td className='px-6 py-4'>{booking.orderdate}</td>
      <td className='px-6 py-4'>{booking.status}</td>
      <td className='px-6 py-4'>{booking.trackingNumber || '-'}</td>
      <td className='px-6 py-4'>{product.product.name}</td>
      <td className='px-6 py-4'>{product.style}</td>
      <td className='px-6 py-4'>{product.size}</td>
      <td className='px-6 py-4'>{booking.totalPrice/100}€</td>
      <td className='px-6 py-4'>
        <button
          onClick={() => {
            setRoomId(product.product._id);
            toggleRatingModal();
          }}
          className='font-medium text-blue-600 hover:underline'
        >
          Rate
        </button>
      </td>
    </tr>
  ))
))}
</tbody> 
      </table>
    </div>
  );
};

export default Table;
