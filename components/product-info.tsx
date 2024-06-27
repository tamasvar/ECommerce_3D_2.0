"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import StarRatings from 'react-star-ratings';
import { SanityProduct,Review } from "@/config/inventory";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import StarRating from "@/components/StarRating"; // Import your StarRating component



interface Props {
  product: SanityProduct;
  reviews: Review[];
}

export function ProductInfo({ product,reviews  }: Props) {
  const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 640;
  const { addItem, incrementItem, cartDetails } = useShoppingCart();
  const { toast } = useToast();
  const sizes = product.size;
  const styles = product.style;
  
  const initialSize = sizes.length > 0 ? sizes[0].name : null;
  const initialStyle = styles.length > 0 ? styles[0] : null;

  const [selectedStyle, setSelectedStyle] = useState<string | null>(initialStyle);
  const [selectedSize, setSelectedSize] = useState<string | null>(initialSize);
  const [price, setPrice] = useState<number | null>(null);

  const isInCart = !!cartDetails?.[product._id];

  useEffect(() => {
    // When the selected size changes, find the price in the sizes array
    if (selectedSize && selectedStyle) {
      const selectedSizeData = sizes.find((size) => size.name === selectedSize);
      if (selectedSizeData) {
        setPrice(selectedSizeData.price);
        product.price = selectedSizeData.price; // Update the product price
      }
    }
  }, [selectedSize, selectedStyle, sizes, product]);

  function addToCart() {
    if (!price || !selectedSize || !selectedStyle) {
      // Handle error if the price or size could not be set
      return;
    }

    const item = {
      ...product,
      product_data: {
        size: selectedSize,
        style: selectedStyle,
      },
    };

    isInCart ? incrementItem(item._id) : addItem(item);

    toast({
      title: `${item.name} (${selectedSize}) - ${selectedStyle}`,
      description: `Price: ${formatCurrencyString({
        value: price,
        currency: product.currency,
      })}`,
      action: (
        <Link href="/cart">
          <Button variant="link" className="gap-x-2 whitespace-nowrap">
            <span>Open cart</span>
            <ArrowRight className="size-5" />
          </Button>
        </Link>
      ),
    });
  }

   // Calculate the average rating and number of ratings
   const totalRating = reviews?.reduce((acc, review) => acc + review.userRating, 0) || 0;
   const numberOfRatings = reviews?.length || 0;
   const averageRating = numberOfRatings > 0 ? totalRating / numberOfRatings : 0;

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
      {/* Average user rating */}
      <div className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-200">
        <StarRating rating={averageRating} starDimension="16px" starSpacing="2px" />{"  "}
        <span>({numberOfRatings} reviews)</span>
      </div>
      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">
          {formatCurrencyString({
            value: price !== null ? price : product.price,
            currency: product.currency,
          })}
        </p>
      </div>
      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base">
          {product.description.split('|').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < product.description.split('|').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <p>
          Size: <strong>{selectedSize || "Select a size"}</strong>
        </p>
        {sizes.map((sizeData) => (
          <Button
            key={sizeData.name}
            className={`mr-2 mt-4 ${selectedSize === sizeData.name ? "bg-blue-500" : "bg-gray-300"}`}
            onClick={() => setSelectedSize(sizeData.name)}
          >
            {sizeData.name}
          </Button>
        ))}
      </div>
      <div className="mt-4">
        <p>
          Style: <strong>{selectedStyle || "Select a style"}</strong>
        </p>
        {styles.map((styleData) => (
          <Button
            key={styleData}
            className={`mr-2 mt-4 ${selectedStyle === styleData ? "bg-green-500" : "bg-gray-300"}`}
            onClick={() => setSelectedStyle(styleData)}
          >
            {styleData}
          </Button>
        ))}
      </div>
      <div className="mt-6">
        <div className="mt-2 text-base">
          <h3 className="space-y-6 text-base">Tags:</h3>
          <div className={isSmallScreen ? 'flex flex-wrap' : 'space-x-2'}>
            {product.categories.map((category, index) => (
              <Link key={index} href={`/?category=${category}`}>
                <span className={isSmallScreen ? 'mb-2 mr-2' : 'mr-4'}>{category},</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="mt-2 text-base">
          <h3 className="space-y-6 text-base">Arts:</h3>
          <div className={isSmallScreen ? 'flex flex-wrap' : 'space-x-2'}>
            {product.arts.map((art, index) => (
              <Link key={index} href={`/?arts=${art}`}>
                <span className={isSmallScreen ? 'mb-2 mr-2' : 'mr-5'}>{art}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <form className="mt-6">
        <div className="mt-4 flex">
          <Button
            type="button"
            onClick={addToCart}
            className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Add to cart
          </Button>
        </div>
      </form>
    </div>
  );
}