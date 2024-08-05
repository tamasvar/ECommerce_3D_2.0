"use client"
import { FC, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic';
import StarRating from '../StarRating'

const ReviewImageModal = dynamic(() => import('@/components/ImageModal'), { ssr: false });

const UserReview: FC<{ review: any }> = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="flex items-start justify-between border-b pb-4">
      <div className="flex items-start space-x-4">
        <div className="shrink-0">
          {review?.user?.image && (
            <Image
              src={review?.user?.image}
              alt={review?.user?.name}
              unoptimized
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          )}
        </div>
        <div className='pr-4'>
          <p className="text-sm font-semibold">{review?.user?.name}</p>
          <p className="mt-2 text-sm">
            {isExpanded ? review?.text : truncateText(review?.text, 100)}
            {review?.text.length > 100 && (
              <button 
                onClick={handleReadMore} 
                className="ml-2 text-blue-500 hover:underline"
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </p>
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
        {review?.image?.asset?.url && (
          <ReviewImageModal src={review?.image?.asset?.url} />
        )}
      </div>
    </div>
  )
}

export default UserReview
