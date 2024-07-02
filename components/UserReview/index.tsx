import Image from 'next/image'
import React, { FC } from 'react'
import StarRating from '../StarRating'
import dynamic from 'next/dynamic';

const ReviewImageModal = dynamic(() => import('@/components/ImageModal'), { ssr: false });

const UserReview: FC<{ review: any }> = ({ review }) => {
  return (
    <div key={review?._id} className="flex items-start justify-between border-b pb-4">
      <div className="flex items-center space-x-4">
        <div className="shrink-0">
          {review?.user?.image && (
            <Image
              src={review?.user?.image}
              alt={review?.user?.name}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold">{review?.user?.name}</p>
          <p className="mt-2 text-sm">{review?.text}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="mb-2 text-xs text-gray-500">
          {new Date(review?._createdAt).toLocaleDateString()}
        </p>
        <StarRating
          rating={review?.userRating}
          starDimension="20px"
          starSpacing="2px"
        />
        {review?.image && (
          <ReviewImageModal src={review?.image?.asset?.url} />
        )}
      </div>
    </div>
  )
}

export default UserReview