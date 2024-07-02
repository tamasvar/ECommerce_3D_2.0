import React, { FC } from 'react'
import UserReview from '../UserReview'

const ProductReviewSlide: FC<{ review: any }> = ({ review }) => {
  return (
    <>
      <p className='ml-[52px] text-xl mb-4 font-medium'>{review?.product?.name}</p>
      <UserReview review={review} />
    </>
  )
}

export default ProductReviewSlide