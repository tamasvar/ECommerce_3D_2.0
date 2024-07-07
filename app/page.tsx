import Image from "next/image"
import { groq } from "next-sanity"
import Carousel from "@/components/Carousel"
import sanityClient from "@/sanity/lib/client"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"
import { SanityProduct, Review } from "@/config/inventory"
import { cn, selectRandomArrayElements } from "@/lib/utils"
import { ProductFilters } from "@/components/product-filters"
import ProductReviewsSlide from "@/components/ProductReviewSlide"
import PurchaseProcess from "@/components/PurchaseProcess"

// Add this line to specify revalidation
export const revalidate = 60;

interface Props {
  searchParams: {
    date?: string
    price?: string
    arts?: string
    category?: string
    search?: string
  }
}

export default async function Page({ searchParams }: Props) {
  const { date, price, arts, category, search } = searchParams
  const priceOrder = price ? ` | order(price ${price})` : ""
  const dateOrder = date ? ` | order(_createdAt ${date})` : ""
  const order = `${priceOrder}${dateOrder}`

  const productFilter = `_type == "product"`
  const artsFilter = arts ? `&& "${arts}" in arts` : ""
  const categoryFilter = category ? `&& "${category}" in categories` : ""
  const searchFilter = search ? `&& name match "${search}"` : ""

  const filter = `*[${productFilter}${artsFilter}${categoryFilter}${searchFilter} && !(_id in path("drafts.**"))]`

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
    "slug": slug.current
  }`)
  // Fetch reviews
  const review = await sanityClient.fetch<Review[]>(groq`*[_type == "review" ] {
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

  const fiveStarReviews = review?.filter(({ userRating }) => userRating === 5);
  const randomThree_fiveStarReviews = selectRandomArrayElements(fiveStarReviews, 3);


  const slides = [
    <PurchaseProcess />,
    ...randomThree_fiveStarReviews?.map((review: any) =>
      <ProductReviewsSlide review={review} />),
    <Image src={'/assets/feedback-bg.jpg'} alt=''
      width={1000}
      height={300}
      style={{ width: '100%', height: '100%', maxHeight: 300, objectFit: 'cover' }}
    />
  ];

  return (
    <div>
      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="pb-6 pt-24">
            <Carousel
              slides={slides}
              className="flex items-center rounded-lg !px-6 !pb-8"
              slideClassName='mt-[82px] bg-background rounded-lg p-4' >
              <>
                <div className='absolute left-0 top-0 z-[-1] size-full bg-[rgba(0,0,0,0.5)]' />
                <p className='text-bold absolute top-[24px] z-[1] w-full text-center text-[24px] font-semibold text-white'>Turning smiles into testimonials – your happiness, our success!</p>
              </>
            </Carousel>
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {products.length} result{products.length === 1 ? "" : "s"}
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
              products.length > 0
                ? 'lg:grid-cols-4'
                : 'lg:grid-cols-[1fr_3fr]')}>
              <div className="hidden lg:block">{/* Product filters */}
                <ProductFilters />
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