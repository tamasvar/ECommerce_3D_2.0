//product-info
"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { SanityProduct, Reviews } from "@/config/inventory";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import StarRating from "@/components/StarRating"; // Import your StarRating component
import { urlForImage } from "@/sanity/lib/image";
import { filters } from "./product-filters"; // Import filters


interface Props {
  product: SanityProduct;
  reviews: Reviews[];
}

export function ProductInfo({ product, reviews }: Props) {
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
  
  useEffect(() => {
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

    const itemKey = `${product._id}_${selectedSize}_${selectedStyle}`;
    const item = {
      ...product,
      product_data: {
        size: selectedSize,
        style: selectedStyle,
      },
      id: itemKey, // This will be used as a unique identifier in the cart
    };

    const isInCart = !!cartDetails?.[itemKey];

    isInCart ? incrementItem(itemKey) : addItem(item);

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

  const totalRating = reviews?.reduce((acc, review) => acc + review.userRating, 0) || 0;
  const numberOfRatings = reviews?.length || 0;
  const averageRating = numberOfRatings > 0 ? totalRating / numberOfRatings : 0;
  
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
      "reviewCount": numberOfRatings.toString()
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

  const findLabel = (category: string, value: string) => {
    const categoryFilter = filters.find(filter => filter.id === category);
    const option = categoryFilter?.options.find(option => option.value === value);
    return option ? option.label : value;
  };

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
      <div className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-200">
        <StarRating rating={averageRating} starDimension="16px" starSpacing="2px" />{"  "}
        <span>({numberOfRatings} reviews)</span>
      </div>
      <div className="mt-3">
        <h3 className="sr-only">Spec Description</h3>
        <div className="space-y-6 text-base">
          {product.specdescription.split('|').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < product.specdescription.split('|').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
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
        <div className="mt-6">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">
          {formatCurrencyString({
            value: price !== null ? price : product.price,
            currency: product.currency,
          })}
        </p>
      </div>
      </div>
      <div className="mt-3">
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
        <div className="mt-2 flex items-center text-base">
          <p className="mr-4 text-base">Universe:</p>
          <div className={isSmallScreen ? 'flex flex-wrap' : 'flex space-x-2'}>
            {product.universes.map((universe, index) => (
              <Link key={index} href={`/?universes=${universe}`} title={`${findLabel("universes", universe)}`}>
                <h3 className={isSmallScreen ? 'mb-2 mr-2' : 'mr-4'}>{findLabel("universes", universe)}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {product.arts && product.arts[0].trim() !== "" && (
        <div className="mt-6">
          <div className="mt-2 flex items-center text-base">
            <p className="mr-4 text-base">Arts:</p>
            <div className={isSmallScreen ? 'flex flex-wrap' : 'flex space-x-2'}>
              {product.arts.map((art, index) => (
                <Link key={index} href={`/?arts=${art}`} title={`${findLabel("arts", art)}`}>
                  <h3 className={isSmallScreen ? 'mb-2 mr-2' : 'mr-4'}>{findLabel("arts", art)}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
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
