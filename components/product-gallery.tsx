"use client"

import { useState } from "react"
import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"
import React from 'react';
import { SanityProduct } from "@/config/inventory"
import { shimmer, toBase64 } from "@/lib/image"
import { useSwipeable } from "react-swipeable";
import { FaCircle } from "react-icons/fa";
interface Props {
  product: SanityProduct
}

export function ProductGallery({product}: Props) {
  const [selectedImage, setSelectedImage] = useState(0)
  const handlers = useSwipeable({
    onSwipedLeft: () => navigateImages(1),  // Balra húzás: Következő kép
    onSwipedRight: () => navigateImages(-1), // Jobbra húzás: Előző kép
  });

  const navigateImages = (step: number) => {
    const newIndex = selectedImage + step;

    if (newIndex >= 0 && newIndex < product.images.length) {
      setSelectedImage(newIndex);
    }
  };
  return (
    <div className="flex flex-col-reverse">
      {/* Image Grid */}
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <ul className="grid grid-cols-4 gap-6">
          {product.images.map((image, index) => (
            <div
              key={image._key as string}
              onClick={() => setSelectedImage(index)}
              className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase hover:bg-gray-50"
            >
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <Image
                  src={urlForImage(image).url()}
                  width={200}
                  height={200}
                  alt=""
                  className="size-full object-cover object-center"
                  placeholder="blur"
                   blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(200,200))}`}
                   unoptimized
                  
                />
              </span>
               {index === selectedImage && ( 
               <span
                  className="pointer-events-none absolute inset-0 rounded-md ring-4 ring-indigo-500 ring-offset-2"
                  aria-hidden="true"
                /> )}
                <div className="absolute right-0 top-0 mr-2 mt-2">
                <FaCircle
                  className={`text-xl ${
                    index === selectedImage ? "text-indigo-500" : "text-gray-400"
                  }`}
                />
              </div>
            </div>
          ))}
        </ul>
      </div>

      {/* Main Image */}
      <div className="aspect-h-1 aspect-w-1 w-full" {...handlers}>
       <div className="relative flex h-8 items-center justify-center rounded-md">
        {product.images.map((_, index) => (
            <FaCircle
              key={index}
              className={`mx-1 text-xl ${
                index === selectedImage ? "text-indigo-500" : "text-gray-400"
              }`}
            />
          ))}
        </div>
        <Image
          priority
          src={urlForImage(product.images[selectedImage]).url()}
          alt={`Main ${product.name} image`}
          width={600}
          height={750}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(600,750)
            )}`}
          unoptimized
          className="size-full border-2 border-gray-200 object-cover object-center shadow-sm dark:border-gray-800 sm:rounded-lg"
        />
        
        
        
      </div>
     
    </div>
  )
}