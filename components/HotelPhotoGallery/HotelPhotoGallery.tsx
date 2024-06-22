'use client';

import { FC, useState } from 'react';
import Image from 'next/image';

import { Image as ImageType } from '@/models/room';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

const HotelPhotoGallery: FC<{ photos: ImageType[] }> = ({ photos }) => {
  const [currenPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const openModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handlePrevious = () => {
    setCurrentPhotoIndex(prevIndex =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentPhotoIndex(prevIndex =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const maximumVisiblePhotos = 4;
  const totalPhotos = photos.length;
  const displayPhotos = photos.slice(1, maximumVisiblePhotos - 1);
  const remainingPhotosCount = totalPhotos - maximumVisiblePhotos;

  return (
    <div className='container mx-auto'>
      <div className='relative grid gap-5 px-3 md:grid-cols-2'>
        <div className='relative h-[540px] overflow-hidden rounded-2xl'>
          <div className='hidden size-full items-center justify-center md:flex'>
            <Image
              src={photos[0].url}
              alt={`Room Photo ${currenPhotoIndex + 1}`}
              className='img scale-animation cursor-pointer'
              width={150}
              height={150}
              onClick={openModal.bind(this, 0)}
            />
          </div>
          <div className='flex size-full items-center justify-center md:hidden'>
            <Image
              src={photos[currenPhotoIndex].url}
              alt={`Room Photo ${currenPhotoIndex + 1}`}
              className='img'
              width={150}
              height={150}
              onClick={openModal.bind(this, 0)}
            />
          </div>
        </div>
        <div className='flex items-center justify-between md:hidden'>
          <div className='flex space-x-2'>
            <FaArrowLeft className='cursor-pointer' onClick={handlePrevious} />
            <FaArrowRight className='cursor-pointer' onClick={handleNext} />
          </div>
          <span>
            {currenPhotoIndex + 1} / {photos.length}
          </span>
        </div>

        <div className='hidden h-full grid-cols-2 gap-5 md:grid'>
          {displayPhotos.map((photo, index) => (
            <div
              key={index}
              className='h-64 cursor-pointer overflow-hidden rounded-2xl'
            >
              <Image
                width={150}
                height={150}
                src={photo.url}
                alt={`Room Photo ${index + 2}`}
                className='img scale-animation'
              />
            </div>
          ))}
          {remainingPhotosCount > 0 && (
            <div
              className='relative h-64 cursor-pointer overflow-hidden rounded-2xl'
              onClick={openModal.bind(this, maximumVisiblePhotos)}
            >
              <Image
                width={150}
                height={150}
                src={photos[maximumVisiblePhotos - 1].url}
                alt={`Room Photo ${maximumVisiblePhotos}`}
                className='img'
              />
              <div className='absolute inset-0 flex cursor-pointer items-center justify-center bg-[rgba(0,0,0,0.5)] text-2xl text-white'>
                + {remainingPhotosCount}
              </div>
            </div>
          )}
        </div>

        {showModal && (
          // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
          <div className='fixed left-0 top-0 z-[55] flex size-full items-center justify-center bg-black bg-opacity-90'>
            <div className='relative h-[75vh] w-[320px] md:w-[700px]'>
              <Image
                src={photos[currenPhotoIndex].url}
                alt={`Room Photo ${currenPhotoIndex + 1}`}
                width={150}
                height={150}
                className='img'
              />
              <div className='flex items-center justify-between py-3'>
                <div className='flex items-center space-x-2 text-white'>
                  <FaArrowLeft
                    className='cursor-pointer'
                    onClick={handlePrevious}
                  />
                  <FaArrowRight
                    className='cursor-pointer'
                    onClick={handleNext}
                  />
                </div>
                <span className='text-sm text-white'>
                  {currenPhotoIndex + 1} / {photos.length}
                </span>
              </div>
              <button
                className='absolute right-2 top-2 text-lg text-white'
                onClick={closeModal}
              >
                <MdCancel className='text-tertiary-dark text-2xl font-medium' />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelPhotoGallery;
