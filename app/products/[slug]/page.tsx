//products/slug
import { groq } from "next-sanity";
import sanityClient from "@/sanity/lib/client";
import { SanityProduct, Reviews } from "@/config/inventory";
import UserReview from "@/components/UserReview";
import { ProductInfo } from "@/components/product-info";
import { ProductGallery } from "@/components/product-gallery";
import { Metadata } from "next";
import { urlForImage } from "@/sanity/lib/image";
import { siteConfig } from "@/config/site";
import { notFound } from "next/navigation";
export const revalidate = 1000;
interface Props {
  params: {
    slug: string;
  };
}

// Add this line to specify revalidation

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const productQuery = groq`*[_type == "product" && slug.current == "${params.slug}"][0] {
    name,
    specdescription,
    images,
    price,
    currency,
    size,
    style,
    rating,
    rating_quantity,
    sku,
  }`;

  const product = await sanityClient.fetch<SanityProduct>(productQuery);
  
  if (!product?.name) {
    return notFound(); // Next.js 404 
  }
  const metaTitle = product.name ? `${product.name} - Sultry3dPrints` : "Sultry3dPrints";
  const metaDescription = product.specdescription;
  const metaKeywords = metaTitle+","+siteConfig.keywords;
 
  return {
    title: metaTitle,
    description: metaDescription.substring(0, 200),
    keywords:metaKeywords,
    openGraph: {
      title: metaTitle,
      description: metaDescription.substring(0, 200),
      images: urlForImage(product.images[0]).url(),
      url: `https://www.sultry3dprints.com/product/${params.slug}`,
    },
    twitter: {
      title: metaTitle,
      description: metaDescription.substring(0, 200),
      images: urlForImage(product.images[0]).url(),
      
    },
  };
};
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
    specdescription,
    description,
    universes,
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
  const reviews = await sanityClient.fetch<Reviews[]>(reviewsQuery);

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
            {
              reviews?.map(review => <UserReview key={review?._id} review={review} />)
            }
          </div >
        </div >
      </div >
    </main >
  );
}