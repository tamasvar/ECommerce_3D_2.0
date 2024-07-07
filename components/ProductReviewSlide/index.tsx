import { FC } from 'react'
import UserReview from '../UserReview'

const ProductReviewSlide: FC<{ review: any }> = ({ review }) => {
  return (
    <>
      <p className='mb-4 ml-[52px] text-xl font-medium'>{review?.product?.name}</p>
      <UserReview review={review} />
    </>
  )
}

export default ProductReviewSlide