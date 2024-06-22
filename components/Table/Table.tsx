'use client';
import React from 'react';
import { Dispatch, FC, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

import { Order } from '@/models/order';

type Props = {
  orderDetails: Order[];
  setProductId: Dispatch<SetStateAction<string | null>>;
  setOrderId: Dispatch<SetStateAction<string | null>>;
  toggleRatingModal: () => void;
};

const Table: FC<Props> = ({ orderDetails, setProductId,setOrderId,toggleRatingModal }) => {
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
        {orderDetails.map(order => (
            order.products.map(product => (
    <tr
    
      key={`${order._id}-${product.product._id}`}
      className='border-b bg-white hover:bg-gray-50'
    >
      <td className='px-6 py-4'>{order._id}</td>
      <td className='px-6 py-4'>{order.orderdate}</td>
      <td className='px-6 py-4'>{order.status}</td>
      <td className='px-6 py-4'>{order.trackingNumber || '-'}</td>
      <td className='px-6 py-4'>{product.product.name}</td>
      <td className='px-6 py-4'>{product.style}</td>
      <td className='px-6 py-4'>{product.size}</td>
      <td className='px-6 py-4'>{order.totalPrice/100}€</td>
      <td className='px-6 py-4'>
        <button
          onClick={() => {
            setProductId(product.product._id);
            setOrderId(order._id)
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
