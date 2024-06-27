// components/ReviewImage.tsx
"use client";

import React from "react";
import Image from "next/image";
import "@/styles/globals.css"; 

interface ReviewImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const ReviewImage: React.FC<ReviewImageProps> = ({ src, alt, width, height }) => {
  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    image.classList.toggle("enlarged");
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="mt-2 cursor-pointer object-cover"
      onClick={handleImageClick}
    />
  );
};

export default ReviewImage;