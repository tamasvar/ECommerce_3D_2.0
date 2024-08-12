import { Metadata } from "next"
import dynamic from "next/dynamic"
import { generateMeta } from "@/lib/mainmetadata"
import { cn, selectRandomArrayElements } from "@/lib/utils"
import { getAllReviews, getProducts, getReviewRatings } from "@/lib/apis"

const ProductFilters = dynamic(() => import("@/components/product-filters"), { ssr: false });
const Carousel = dynamic(() => import("@/components/Carousel"), { ssr: false });
const ProductGrid = dynamic(() => import("@/components/product-grid"), { ssr: false });
const ResponsiveImage = dynamic(() => import('@/components/ResponsiveImage'), { ssr: false });
const ProductReviewsSlide = dynamic(() => import("@/components/ProductReviewSlide"));
const PurchaseProcess = dynamic(() => import("@/components/PurchaseProcess"));
const PurchaseProcess2 = dynamic(() => import("@/components/PurchaseProcess2"));
const ProductSort = dynamic(() => import("@/components/product-sort"), { ssr: false });

export const revalidate = 3600;

interface Props {
  searchParams: {
    date?: string
    price?: string
    arts?: string
    universes?: string
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
      url: 'https://www.sultry3dprints.com/'
    },
    twitter: {
      description,
      images: '/assets/bg1.webp',
    },
  };
}

export default async function Page({ searchParams }: Props) {
  const { date, price, arts, style, universes, search } = searchParams
  const priceOrder = price ? ` | order(size[0].price ${price})` : ""
  const dateOrder = date ? ` | order(_createdAt ${date})` : ""
  const order = `${priceOrder}${dateOrder}`

  const productFilter = `_type == "product" && isFeatured == true`
  const artsFilter = arts ? `&& "${arts}" in arts` : ""
  const styleFilter = style ? `&& "${style}" in style` : ""
  const universeFilter = universes ? `&& "${universes}" in universes` : ""
  const searchFilter = search ? `&& name match "${search}"` : ""

  const filter = `*[${productFilter}${artsFilter}${universeFilter}${searchFilter}${styleFilter} && !(_id in path("drafts.**"))]`

  const products = await getProducts(filter, order);
  const reviews = await getAllReviews();
  const review = await getReviewRatings();

  const fiveStarReviews = reviews?.filter(({ userRating }) => userRating === 5);
  const randomThree_fiveStarReviews = selectRandomArrayElements(fiveStarReviews, 5);

  const slides = [
    <PurchaseProcess key="process-part1" />,
    <PurchaseProcess2 key="process-part2" />,
    <ResponsiveImage key="background-image" />,
    ...randomThree_fiveStarReviews?.map((review: any) =>
      <ProductReviewsSlide review={review} />
    ),
  ];

  return (
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
        <p className="text-xl font-bold tracking-tight sm:text-2xl">
          {products?.length} result{products?.length === 1 ? "" : "s"}
        </p>
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
          <div className="hidden lg:block">
            <ProductFilters />
          </div>
          <ProductGrid products={products} review={review} />
        </div>
      </section>
    </main>
  )
}
