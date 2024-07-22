'use client';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getUserOrders } from '@/lib/apis';
import LoadingSpinner from '../../loading';
import Table from '@/components/Table/Table';
import { GiMoneyStack } from 'react-icons/gi';
import { BsJournalBookmarkFill } from 'react-icons/bs';
import { ImProfile } from "react-icons/im";
import BackDrop from '@/components/BackDrop/BackDrop';
import RatingModal from '@/components/RatingModal/RatingModal';
import UserProfile from '@/components/UserProfile';
import PurchaseHistory from '@/components/PurchaseHistory';
interface Tabs {
  profile: JSX.Element;
  'purchase-history': JSX.Element;
  orders: JSX.Element;
}

const UserDetails = (props: { params: { id: string }, searchParams: { t: 'purchase-history' } }) => {
  const {
    params: { id: userId },
    searchParams: { t = '' }
  } = props;

  const [currentNav, setCurrentNav] = useState<'orders' | 'purchase-history' | 'profile'>(t || 'orders');
  const [productId, setProductId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [ratingText, setRatingText] = useState('');
  const [ratingImage, setRatingImage] = useState<Blob>();

  useEffect(() => { t && setCurrentNav(t) }, [t]);

  const toggleRatingModal = () => setIsRatingVisible(prevState => !prevState);

  const reviewSubmitHandler = async () => {
    if (!ratingText.trim().length || !ratingValue) {
      toast.error('Please provide a rating text and a rating');
      return;
    }
    if (!productId) toast.error('Id not provided');

    setIsSubmittingReview(true);

    let payload: any = {
      reviewText: ratingText,
      ratingValue,
      productId,
      orderId
    }

    // adding image in payload if image exist
    ratingImage && (payload.image = ratingImage);

    try {
      await axios.post('/api/users', payload);
      toast.success('Review Submitted');
    } catch (error) {
      toast.error('Review Failed');
    } finally {
      setRatingText('');
      setRatingValue(0);
      setProductId(null);
      setOrderId(null);
      setIsSubmittingReview(false);
      setIsRatingVisible(false);
    }
  };

  const fetchUserBooking = async () => getUserOrders(userId);

  const fetchUserData = async () => {
    const { data } = await axios.get('/api/users');
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

  const tabs: Tabs = {
    profile: <UserProfile userData={userData} />,
    'purchase-history': <PurchaseHistory orderDetails={userOrders} />,
    orders: <Table
      orderDetails={userOrders}
      setProductId={setProductId}
      setOrderId={setOrderId}
      toggleRatingModal={toggleRatingModal}
    />
  }

  return (
    <div className='mx-auto max-w-6xl px-6 py-10'>
      <nav className='sticky dark:bg-[#3b3b3b] top-0 mb-8 w-full rounded-lg border border bg-gray-50 px-2 py-3 text-gray-700 md:px-5'>
        <ol
          className={`${currentNav === 'profile' ? 'text-blue-600' : 'text-gray-700 dark:text-[#e1e7ef]'
            } mr-1 inline-flex items-center space-x-1 md:mr-5 md:space-x-3`}
        >
          <li
            onClick={() => setCurrentNav('profile')}
            className='inline-flex cursor-pointer items-center'
          >
            <ImProfile />
            <a className='mx-1 inline-flex items-center text-xs font-medium md:mx-3 md:text-sm'>
              Profile
            </a>
          </li>
        </ol>
        <ol
          className={`${currentNav === 'purchase-history' ? 'text-blue-600' : 'text-gray-700 dark:text-[#e1e7ef]'
            } mr-1 inline-flex items-center space-x-1 md:mr-5 md:space-x-3`}
        >
          <li
            onClick={() => setCurrentNav('purchase-history')}
            className='inline-flex cursor-pointer items-center'
          >
            <GiMoneyStack />
            <a className='mx-1 inline-flex items-center text-xs font-medium md:mx-3 md:text-sm'>
              Purchase History
            </a>
          </li>
        </ol>
        <ol
          className={`${currentNav === 'orders' ? 'text-blue-600' : 'text-gray-700 dark:text-[#e1e7ef]'
            } mr-1 inline-flex items-center space-x-1 md:mr-5 md:space-x-3`}
        >
          <li
            onClick={() => setCurrentNav('orders')}
            className='inline-flex cursor-pointer items-center'
          >
            <BsJournalBookmarkFill />
            <a className='mx-1 inline-flex items-center text-xs font-medium md:mx-3 md:text-sm'>
              Orders
            </a>
          </li>
        </ol>
      </nav>
      {tabs[currentNav as keyof Tabs]}

      {
        isRatingVisible &&
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
