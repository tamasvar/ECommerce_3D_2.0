import axios from 'axios';
import { FC } from 'react';
import useSWR from 'swr';

import { Review } from '@/models/review';
import Rating from '../Rating/Rating';

const RoomReview: FC<{ productId: string }> = ({ productId}) => {
  const fetchRoomReviews = async () => {
    const { data } = await axios.get<Review[]>(`/api/room-reviews/${productId}`);
    return data;
  };

  const {
    data: roomReviews,
    error,
    isLoading,
  } = useSWR('/api/room-reviews', fetchRoomReviews);

  if (error) throw new Error('Cannot fetch data');
  if (typeof roomReviews === 'undefined' && !isLoading)
    throw new Error('Cannot fetch data');

  console.log(roomReviews);

  return (
    <>
      {roomReviews &&
        roomReviews.map(review => (
          <div
            className='rounded-lg bg-gray-100 p-4 dark:bg-gray-900'
            key={review._id}
          >
            <div className='mb-2 flex font-semibold'>
              <p>{review.user.name}</p>
              <div className='text-tertiary-light ml-4 flex items-center text-lg'>
                <Rating rating={review.userRating} />
              </div>
            </div>

            <p>{review.text}</p>
          </div>
        ))}
    </>
  );
};

export default RoomReview;
