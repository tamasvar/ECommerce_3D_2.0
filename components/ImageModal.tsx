/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
// components/ReviewImageModal.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';

interface ReviewImageModalProps {
  src: string;
}

export default function ReviewImageModal({ src }: ReviewImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <Image
        src={src}
        alt="Review"
        width={150}
        height={90}
        unoptimized
        className="mt-4 cursor-pointer object-cover"
        onClick={openModal}
      />

      {isOpen && (
        <div
          id="image-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <span
            className="absolute right-0 top-0 mr-4 mt-4 cursor-pointer text-4xl text-white"
          >
            &times;
          </span>
          <img
            id="modal-img"
            src={src}
            className="max-h-full max-w-full"
            alt="Review"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
