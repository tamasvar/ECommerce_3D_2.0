"use client"
import { useState, useEffect } from "react";
import Image from "next/image"
import Link from "next/link"
import { urlForImage } from "@/sanity/lib/image"
import { XCircle } from "lucide-react"
import { formatCurrencyString } from "use-shopping-cart"
import StarRatings from 'react-star-ratings';
import { SanityProduct, Reviews } from "@/config/inventory"
import { shimmer, toBase64 } from "@/lib/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


interface Props {
  products: SanityProduct[];
  review: Reviews[];
}

export function ProductGrid({ products, review }: Props) {
  const [loadedProducts, setLoadedProducts] = useState(9);
  const [loading, setLoading] = useState(false);
  const loadMore = () => {
    if (!loading) {
      setLoading(true);
      setTimeout(() => {
        setLoadedProducts(prevCount => {
          const newCount = prevCount + 3;
          return newCount >= products.length ? products.length : newCount; // Ensure you don't exceed the total number
        });
        setLoading(false);
      }, 1000); // Szimulált betöltési idő
    }
  };
  const allProducts = products?.slice(0, loadedProducts);

  const handleScroll = () => {
    if (
      !loading &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      loadedProducts < products?.length
    ) {
      loadMore();
    }
  };
  const LoadingSpinner = () => {
    return (
      <div className="py-4 text-center">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedProducts, loading]);

  // Create a map of product IDs to their reviews
  const productReviewsMap: { [key: string]: Reviews[] } = {};
  review.forEach(review => {
    const productId = review.product._ref;
    if (!productReviewsMap[productId]) {
      productReviewsMap[productId] = [];
    }
    productReviewsMap[productId].push(review);
  });

  const calculateRatingAndReviews = (productId: string) => {
    const productReviews = productReviewsMap[productId] || [];
    const totalReviews = productReviews.length;
    const totalRating = productReviews.reduce((sum, review) => sum + review.userRating, 0);
    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

    return { averageRating, totalReviews };
  };

  if (products?.length === 0) {
    return (
      <div className="mx-auto grid h-40 w-full place-items-center rounded-md border-2 border-dashed bg-gray-50 py-10 text-center dark:bg-gray-900">
        <div>
          <XCircle className="mx-auto size-10 text-gray-500 dark:text-gray-200" />
          <h1 className="mt-2 text-xl font-bold tracking-tight text-gray-500 dark:text-gray-200 sm:text-2xl">
            No products found
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-3 lg:gap-x-8">
      
      {allProducts?.map((product, index) => {
        const { averageRating, totalReviews } = calculateRatingAndReviews(product._id);
        const structuredData = {
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.name,
          "image": urlForImage(product.images[0]).url(),
          "description": product.specdescription.substring(0, 200),
          "sku": product.sku.substring(0, 50),
          "brand": {
            "@type": "Brand",
            "name": "Sultry3dPrints"
          },
          "positiveNotes": {
                  "@type": "ItemList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "3D Printed Figurines"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Unpainted 3d Models"
                    }
                  ]
                },
                "negativeNotes": {
                  "@type": "ItemList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "No child protection"
                    },
                  ]
                },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": averageRating.toString(),
            "reviewCount": totalReviews.toString()
          },
          "offers": {
            "@type": "Offer",
            "url": `https://www.sultry3dprints.com/product/${product.slug}`,
            "priceCurrency": product.currency,
            "price": (product.size[0].price)/100,
            "priceValidUntil": "2030-11-20",
            "availability": "https://schema.org/PreOrder"
          },
          "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "HU",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 15,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/FreeReturn"
        }
        };
      
        return (
          <Link key={product._id + index} href={`/products/${product.slug}`} title={`View details for ${product.name}`} className="group text-sm">
            <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
               />
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75 dark:border-gray-800">
              <Image
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(225, 280))}`}
                src={urlForImage(product.images[0]).url()}
                alt={product.name}
                width={225}
                height={280}
                className="size-full object-cover object-center"
                loading="lazy"
                unoptimized
                style={{ aspectRatio: '1 / 1' }}
                
              />
            </div>
            <h3 className="mt-4 font-medium">{product.name}</h3>
            {/* Display average rating and total reviews */}
            <div className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-200">
              <StarRatings
                rating={averageRating}
                starRatedColor="gold"
                starEmptyColor="gray"
                numberOfStars={5}
                name="rating"
                starDimension="16px"
                starSpacing="2px"
              />
              {"  "}
              <span>({totalReviews} reviews)</span>
            </div>
            <div className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-200">
              <span className="mr-1">Size:</span>
              <span className="text-indigo-600 dark:text-indigo-400">{product.size[0].name}</span>
              <span className="mx-1">-</span>
              <span className="text-indigo-600 dark:text-indigo-400">{product.size[product.size.length - 1].name}</span>
            </div>
            <div className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-200">
              <span className="mr-1">Price:</span>
              <span className="text-green-600 dark:text-green-400">{formatCurrencyString({ value: product.size[0].price, currency: product.currency })}</span>
              <span className="mx-1">-</span>
              <span className="text-green-600 dark:text-green-400">{formatCurrencyString({ value: product.size[product.size.length - 1].price, currency: product.currency })}</span>
            </div>
          </Link>
        );
      })}
      {loading && <LoadingSpinner />}
    </div>
  );
}