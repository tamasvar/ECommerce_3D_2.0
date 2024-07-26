import { groq } from "next-sanity"
import Carousel from "@/components/Carousel"
import sanityClient from "@/sanity/lib/client"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"
import { SanityProduct, Review } from "@/config/inventory"
import PurchaseProcess from "@/components/PurchaseProcess"
import { cn, selectRandomArrayElements } from "@/lib/utils"
import { ProductFilters } from "@/components/product-filters"
import ProductReviewsSlide from "@/components/ProductReviewSlide"
import { Suspense } from "react"
import LoadingSpinner from "./loading"
import ResponsiveImage from "@/components/ResponsiveImage"
// Add this line to specify revalidation
export const revalidate = 10;

interface Props {
  searchParams: {
    date?: string
    price?: string
    arts?: string
    universes?: string
    style?:string
    search?: string
  }
}

export default async function Page({ searchParams }: Props) {
  const { date, price, arts,style, universes, search } = searchParams
  const priceOrder = price ? ` | order(price ${price})` : ""
  const dateOrder = date ? ` | order(_createdAt ${date})` : ""
  const order = `${priceOrder}${dateOrder}`

  const productFilter = `_type == "product" && isFeatured == true`
  const artsFilter = arts ? `&& "${arts}" in arts` : ""
  const styleFilter = style ? `&& "${style}" in style` : ""
  const universeFilter = universes ? `&& "${universes}" in universes` : ""
  const searchFilter = search ? `&& name match "${search}"` : ""

  const filter = `*[${productFilter}${artsFilter}${universeFilter}${searchFilter}${styleFilter} && !(_id in path("drafts.**"))]`

  const products = await sanityClient.fetch<SanityProduct[]>(groq` ${filter} ${order} {
    _id,
    _createdAt,
    name,
    sku,
    images,
    currency,
    sizes,
    size,
    style,
    rating,
    rating_quantity,
    description,
    specdescription,
    isFeatured,
    "slug": slug.current
  }`)
  // Fetch reviews
  const reviews = await sanityClient.fetch<Review[]>(groq`*[_type == "review" ] {
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
    },
    product->
  }`);
  // Fetch reviews
  const review = await sanityClient.fetch<Review[]>(groq`*[_type == "review" ] {
    _id,
    userRating,
    product
  }`);

  const fiveStarReviews = reviews?.filter(({ userRating }) => userRating === 5);
  const randomThree_fiveStarReviews = selectRandomArrayElements(fiveStarReviews, 3);

  const slides = [
    <PurchaseProcess />,
    <ResponsiveImage key="background-image" />,
    ...randomThree_fiveStarReviews?.map((review: any) =>
      <ProductReviewsSlide review={review} />
    ),
    
  ];

  return (
    <div>
      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="pb-2 pt-6 md:pb-6 md:pt-24">
            <Carousel
              slides={slides}
              className="!md:px-6 flex items-center rounded-lg !px-0 !pb-8"
              slideClassName=' bg-background p-4 rounded-lg' >
              <>
                <div className='absolute left-0 top-0 z-[-1] size-full' />
              </>
            </Carousel>
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-6 dark:border-gray-800 md:pt-24">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {products?.length} result{products?.length === 1 ? "" : "s"}
            </h1>
            {/* Product Sort */}
            <ProductSort />
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div className={cn(
              "grid grid-cols-1 gap-x-8 gap-y-10",
              products?.length > 0
                ? 'lg:grid-cols-4'
                : 'lg:grid-cols-[1fr_3fr]')}>
              <div className="hidden lg:block">{/* Product filters */}
                <Suspense fallback={<LoadingSpinner />}>
                  <ProductFilters />
                </Suspense>
              </div>
              {/* Product grid */}
              <ProductGrid products={products} review={review} />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}