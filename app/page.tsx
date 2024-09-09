import { groq } from "next-sanity"
import Carousel from "@/components/Carousel"
import sanityClient from "@/sanity/lib/client"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"
import { SanityProduct, Reviews } from "@/config/inventory"
import PurchaseProcess from "@/components/PurchaseProcess"
import { cn, selectRandomArrayElements } from "@/lib/utils"
import { ProductFilters } from "@/components/product-filters"
import ProductReviewsSlide from "@/components/ProductReviewSlide"
import { Suspense } from "react"
import LoadingSpinner from "./loading"
import ResponsiveImage from "@/components/ResponsiveImage"
import { Metadata } from "next"
import PurchaseProcess2 from "@/components/PurchaseProcess2"
import { generateMeta } from "@/lib/mainmetadata"
import { getAllReviews, getProducts, getReviewRatings } from "@/lib/apis"
export const revalidate = 3600; 

interface Props {
  searchParams: {
    date?: string
    price?: string
    arts?: string
    universes?: string
    category?:string
    style?: string
    search?: string
  }
}

export const generateMetadata = async ({ searchParams }: Props): Promise<Metadata> => {
  const { style, universes } = searchParams;
  
  const { title, description, keywords } = generateMeta(style, universes); // Use the utility function

  return {
    title,
    description,
    keywords,
    openGraph: {
      description,
      images: '/assets/bg1.webp',
    },
    twitter: {
      description,
      images: '/assets/bg1.webp',
    },
  };
}

export default async function Page({ searchParams }: Props) {
  const { date, price, arts, style, universes,category, search } = searchParams
  const priceOrder = price ? ` | order(size[0].price ${price})` : ""
  const dateOrder = date ? ` | order(_createdAt ${date})` : ""
  const order = `${priceOrder}${dateOrder}`

  const productFilter = `_type == "product" && isFeatured == true`
  const artsFilter = arts ? `&& "${arts}" in arts` : ""
  const styleFilter = style ? `&& "${style}" in style` : ""
  const universeFilter = universes ? `&& "${universes}" in universes` : ""
  const categoryFilter = category ? `&& "${category}" in category` : ""
  const searchFilter = search ? `&& name match "${search}"` : ""

  const filter = `*[${productFilter}${artsFilter}${universeFilter}${categoryFilter}${searchFilter}${styleFilter} && !(_id in path("drafts.**"))]`

  const products = await getProducts(filter, order);
  const reviews = await getAllReviews();
  const review = await getReviewRatings();

  const fiveStarReviews = reviews?.filter(({ userRating }) => userRating === 5);
  const randomThree_fiveStarReviews = selectRandomArrayElements(fiveStarReviews, 5);

  const slides = [
    <PurchaseProcess key="process-part1" />,
    <PurchaseProcess2 key="process-part2" />,
    <ResponsiveImage key="background-image"  />,
    ...randomThree_fiveStarReviews?.map((review: any) =>
      <ProductReviewsSlide review={review} />
    ),
    
  ];

  return (
    <div>
      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="pb-2 pt-6 md:pb-6 md:pt-24">
         
          <div key="gleam-iframe" className="flex items-center justify-center p-4">
              <iframe 
                src="https://gleam.io/CQfGn/50-gift-card" 
                className="h-64 w-full max-w-full rounded-lg"
                style={{ minHeight: '300px' }}
              >
              </iframe>
            </div>
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
            <p className="text-xl font-bold tracking-tight sm:text-2xl">
              {products?.length} result{products?.length === 1 ? "" : "s"}
            </p>
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
