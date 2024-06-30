
//products/slug
import Image from "next/image";
import dynamic from 'next/dynamic';
import { groq } from "next-sanity";
import sanityClient from "@/sanity/lib/client";
import { SanityProduct, Review } from "@/config/inventory";
import StarRating from "@/components/StarRating";
import { ProductInfo } from "@/components/product-info";
import { ProductGallery } from "@/components/product-gallery";

const ReviewImageModal = dynamic(() => import('@/components/ImageModal'), { ssr: false });

interface Props {
  params: {
    slug: string;
  };
}

// Add this line to specify revalidation
export const revalidate = 60;

export default async function Page({ params }: Props) {
  const productQuery = groq`*[_type == "product" && slug.current == "${params.slug}"][0] {
    _id,
    _createdAt,
    "id": _id,
    name,
    sku,
    images,
    price,
    currency,
    sizes,
    size,
    style,
    description,
    categories,
    arts,
    rating,
    rating_quantity,
    "slug": slug.current 
  }`;

  const reviewsQuery = groq`*[_type == "review" && product._ref == *[_type=="product" && slug.current == "${params.slug}"][0]._id] {
    _id,
    _createdAt,
    text,
    userRating,
    image {
      asset->{
        url
      }
    },
    user->{
      _id,
      name,
      image
    }
  }`;

  const product = await sanityClient.fetch<SanityProduct>(productQuery);
  const reviews = await sanityClient.fetch<Review[]>(reviewsQuery);
  console.log(reviews);

  return (
    <main className="mx-auto max-w-5xl sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        {/* Product */}
        <div className="pb-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
          {/* Product gallery */}
          <ProductGallery product={product} />
          {/* Product info */}
          <ProductInfo product={product} reviews={reviews} />
        </div>
        {/* Reviews */}
        <div className="mx-auto max-w-5xl sm:px-6 sm:pt-16 lg:px-8">
          <h2 className="text-2xl font-bold">Reviews</h2>
          <div className="mt-4 space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="flex items-start justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <div className="shrink-0">
                    {review.user.image && (
                      <Image
                        src={review.user.image}
                        alt={review.user.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{review.user.name}</p>
                    <p className="mt-2 text-sm">{review.text}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="mb-2 text-xs text-gray-500">
                    {new Date(review._createdAt).toLocaleDateString()}
                  </p>
                  <StarRating
                    rating={review.userRating}
                    starDimension="20px"
                    starSpacing="2px"
                  />
                  {review.image && (
                    <ReviewImageModal src={review.image.asset.url} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}