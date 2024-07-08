"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Custom hook to get the screen width
const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenWidth;
};

// Responsive image component
const ResponsiveImage = () => {
  const screenWidth = useScreenWidth();
  const imageSrc = screenWidth < 1020 ? '/assets/bg1.jpg' : '/assets/bg.jpg';

  return (
    <Image
      src={imageSrc}
      alt=''
      width={1000}
      height={300}
      className="size-full min-h-[250px] w-full rounded-lg object-cover lg:min-h-[auto] lg:w-full"
    />
  );
};

export default ResponsiveImage;
