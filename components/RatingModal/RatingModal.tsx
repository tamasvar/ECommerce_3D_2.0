import {
  FC,
  Dispatch,
  ChangeEvent,
  SetStateAction,
} from 'react';
import toast from 'react-hot-toast';
import { BsStarFill } from 'react-icons/bs';
import sanityClient from '@/sanity/lib/client';

const imageTypes = ['image/webp', 'image/png', 'image/svg', 'image/jpeg', 'image/gif', 'image/jpg'];
const maxImageSize = 10000000;
const starValues = [1, 2, 3, 4, 5];

type Props = {
  isOpen: boolean;
  ratingValue: number;
  setRatingValue: Dispatch<SetStateAction<number>>;
  ratingText: string;
  setRatingText: Dispatch<SetStateAction<string>>;
  setRatingImage: Dispatch<SetStateAction<Blob | undefined>>;
  reviewSubmitHandler: () => Promise<void>;
  isSubmittingReview: boolean;
  toggleRatingModal: () => void;
};

const RatingModal: FC<Props> = props => {
  const {
    isOpen,
    ratingValue,
    setRatingValue,
    ratingText,
    setRatingText,
    reviewSubmitHandler,
    isSubmittingReview,
    toggleRatingModal,
    setRatingImage,
  } = props;

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      // check for image size must be under 10mb
      if (selectedFile?.size > maxImageSize) {
        toast.error('Image size must be under 10mb');
        event.target.value = '';
        return;
      }

      if (imageTypes.includes(selectedFile.type)) {
        sanityClient.assets
          .upload('image', selectedFile,
            { contentType: selectedFile.type, filename: selectedFile.name }
          )
          .then((document: any) => {
            setRatingImage(document);
          })
          .catch(() => {
            toast.error('Review Failed');
          });
      } else {
        toast.error('Image format not supported');
      }
    }
  }

  return (
    <div
      className={`fixed inset-0 z-[61] flex items-center justify-center ${isOpen
        ? 'pointer-events-auto opacity-100'
        : 'pointer-events-none opacity-0'
        }`}
    >
      <div className='w-96 rounded-lg bg-white p-4 shadow-lg'>
        <h2 className='mb-2 text-xl font-semibold dark:text-gray-800'>
          Rate Your Experience
        </h2>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Rating
          </label>
          <div className='flex items-center'>
            {starValues.map(value => (
              <button
                className={`size-6 ${ratingValue >= value ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                onClick={() => setRatingValue(value)}
                key={value}
              >
                <BsStarFill />
              </button>
            ))}
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Review Text
          </label>

          <textarea
            value={ratingText}
            onChange={e => setRatingText(e.target.value)}
            rows={4}
            className='w-full rounded-md border px-2 py-3'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Attachment (Optional)
          </label>

          <input
            type='file'
            onChange={onImageChange}
            accept="image/png, image/gif, image/jpeg"
            className='w-full rounded-md border px-2 py-3'
          />
        </div>

        <div className='flex justify-end'>
          <button
            onClick={reviewSubmitHandler}
            className='ml-2 rounded-md bg-green-300 px-4 py-2 text-gray-700 hover:bg-green-400'
            disabled={isSubmittingReview}
          >
            {isSubmittingReview ? 'Submitting' : 'Submit'}
          </button>
          <button
            onClick={toggleRatingModal}
            className='ml-2 rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
