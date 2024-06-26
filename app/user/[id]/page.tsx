'use client';
//user\[id] page.tsx
import useSWR from 'swr';
import { FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import React from 'react';
import { getUserOrders } from '@/lib/apis';
import { User } from '@/models/user';
import LoadingSpinner from '../../loading';
import { useState } from 'react';
import { BsJournalBookmarkFill } from 'react-icons/bs';
import { GiMoneyStack } from 'react-icons/gi';
import Table from '@/components/Table/Table';
import RatingModal from '@/components/RatingModal/RatingModal';
import BackDrop from '@/components/BackDrop/BackDrop';
import toast from 'react-hot-toast';

const UserDetails = (props: { params: { id: string } }) => {
  const {
    params: { id: userId },
  } = props;

  const [currentNav, setCurrentNav] = useState<
    'bookings' | 'amount' | 'ratings'
  >('bookings');
  const [productId, setProductId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [ratingText, setRatingText] = useState('');
  const [ratingImage, setRatingImage] = useState<string | Blob>('');

  const toggleRatingModal = () => setIsRatingVisible(prevState => !prevState);

  const reviewSubmitHandler = async () => {
    if (!ratingText.trim().length || !ratingValue) {
      return toast.error('Please provide a rating text and a rating');
    }

    if (!productId) toast.error('Id not provided');

    setIsSubmittingReview(true)

    try {
      const { data } = await axios.post('/api/users', {
        reviewText: ratingText,
        image:ratingImage,
        ratingValue,
        productId,
        orderId
      });
      console.log(data);
      toast.success('Review Submitted');
    } catch (error) {
      console.log(error);
      toast.error('Review Failed');
    } finally {
      setRatingText('');
      setRatingValue(null);
      setProductId(null);
      setOrderId(null);
      setIsSubmittingReview(false);
      setIsRatingVisible(false);
    }
  };

  const fetchUserBooking = async () => getUserOrders(userId);
  const fetchUserData = async () => {
    const { data } = await axios.get<User>('/api/users');
    return data;
  };

  const {
    data: userOrders,
    error,
    isLoading,
  } = useSWR('/api/userbooking', fetchUserBooking);

  const {
    data: userData,
    isLoading: loadingUserData,
    error: errorGettingUserData,
  } = useSWR('/api/users', fetchUserData); 

  if (error || errorGettingUserData) throw new Error('Cannot fetch data');
  if (typeof userOrders === 'undefined' && !isLoading)
    throw new Error('Cannot fetch data');
  if (typeof userData === 'undefined' && !loadingUserData)
    throw new Error('Cannot fetch data');

  
  if (loadingUserData) return <LoadingSpinner />;
  if (!userData) throw new Error('Cannot fetch data');
  if (!userData) throw new Error('Cannot fetch data');

  return (
    <div className='py10 container mx-auto px-2 md:px-4'>
      <div className='grid gap-10 md:grid-cols-12'>
        <div className='sticky top-10 hidden h-fit rounded-lg bg-[#eff0f2] px-6 py-4 text-black shadow-lg md:col-span-4 md:block lg:col-span-3'>
          <div className='mx-auto mb-5 size-28 overflow-hidden rounded-full md:size-[143px]'>
            <Image
              src={userData.image}
              alt={userData.name}
              width={143}
              height={143}
              className='img scale-animation rounded-full'
            />
          </div>
          <div className='py-4 text-left font-normal'>
            <h6 className='pb-3 text-xl font-bold'>About</h6>
            <p className='text-sm'>{userData.about ?? ''}</p>
          </div>
          <div className='text-left font-normal'>
            <h6 className='pb-3 text-xl font-bold'>{userData.name}</h6>
          </div>
          <div className='flex items-center'>
            <p className='mr-2'>Sign Out</p>
            <FaSignOutAlt
              className='cursor-pointer text-3xl'
              onClick={() => signOut({ callbackUrl: '/' })}
            />
          </div>
        </div>

        <div className='md:col-span-8 lg:col-span-9'>
          <div className='flex items-center'>
            <h5 className='mr-3 text-2xl font-bold'>Hello, {userData.name}</h5>
          </div>
          <div className='size-14 overflow-hidden rounded-l-full md:hidden'>
            <Image
              className='img scale-animation rounded-full'
              width={56}
              height={56}
              src={userData.image}
              alt='User  Name'
            />
          </div>
          <p className='block w-fit py-2 text-sm md:hidden'>
            {userData.about ?? ''}
          </p>

          <p className='py-2 text-xs font-medium'>
            Joined In {userData._createdAt.split('T')[0]}
          </p>
          <div className='my-2 flex items-center md:hidden'>
            <p className='mr-2'>Sign out</p>
            <FaSignOutAlt
              className='cursor-pointer text-3xl'
              onClick={() => signOut({ callbackUrl: '/' })}
            />
          </div>

          <nav className='sticky top-0 mx-auto mb-8 mt-7 w-fit rounded-lg border border-gray-200 bg-gray-50 px-2 py-3 text-gray-700 md:w-full md:px-5'>
            <ol
              className={`${
                currentNav === 'bookings' ? 'text-blue-600' : 'text-gray-700'
              } mr-1 inline-flex items-center space-x-1 md:mr-5 md:space-x-3`}
            >
              <li
                onClick={() => setCurrentNav('bookings')}
                className='inline-flex cursor-pointer items-center'
              >
                <BsJournalBookmarkFill />
                <a className='mx-1 inline-flex items-center text-xs font-medium md:mx-3 md:text-sm'>
                  Current Orders
                </a>
              </li>
            </ol>
            <ol
              className={`${
                currentNav === 'amount' ? 'text-blue-600' : 'text-gray-700'
              } mr-1 inline-flex items-center space-x-1 md:mr-5 md:space-x-3`}
            >
              <li
                onClick={() => setCurrentNav('amount')}
                className='inline-flex cursor-pointer items-center'
              >
                <GiMoneyStack />
                <a className='mx-1 inline-flex items-center text-xs font-medium md:mx-3 md:text-sm'>
                  Amount Spent
                </a>
              </li>
            </ol>
          </nav>

          {currentNav === 'bookings' ? (
            userOrders && (
              <Table
                orderDetails={userOrders}
                setProductId={setProductId}
                setOrderId={setOrderId}
                toggleRatingModal={toggleRatingModal}
              />
            )
          ) : (
            <></>
          )}

          
        </div>
      </div>
{
 isRatingVisible&& 
      <RatingModal
        isOpen={isRatingVisible}
        ratingValue={ratingValue}
        setRatingValue={setRatingValue}
        ratingText={ratingText}
        setRatingText={setRatingText}
        setRatingImage={setRatingImage}
        isSubmittingReview={isSubmittingReview}
        reviewSubmitHandler={reviewSubmitHandler}
        toggleRatingModal={toggleRatingModal}
      />
}
      <BackDrop isOpen={isRatingVisible} />
    </div>
  );
};

export default UserDetails;
