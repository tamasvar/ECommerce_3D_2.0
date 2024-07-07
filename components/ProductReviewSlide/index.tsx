import { FC, ReactNode } from 'react'
import UserReview from '../UserReview'

const ProductReviewSlide: FC<{ review: any, children: ReactNode }> = ({ review, children }) => {
  return (
    <>
      <div className='mb-24'>
        {children}
      </div>
      <p className='mb-4 ml-[52px] text-xl font-medium'>{review?.product?.name}</p>
      <UserReview review={review} />
    </>
  )
}

export default ProductReviewSlide