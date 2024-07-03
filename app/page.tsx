import { cn, selectRandomArrayElements } from "@/lib/utils"
import { groq } from "next-sanity"
import { siteConfig } from "@/config/site"
import Carousel from "@/components/Carousel"
import sanityClient from "@/sanity/lib/client"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"
import { SanityProduct, Review } from "@/config/inventory"
import { ProductFilters } from "@/components/product-filters"
import ProductReviewsSlide from "@/components/ProductReviewSlide"

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
    product->{
    name,
    }
  }`);
  const fiveStarReviews = reviews?.filter(({ userRating }) => userRating === 5);
  const randomThree_fiveStarReviews = selectRandomArrayElements(fiveStarReviews, 3);

  const slides = randomThree_fiveStarReviews?.map((review: any) =>
    <ProductReviewsSlide review={review} />);

  return (
    <div>
      <div className="px-4 pt-20 text-center">
        <h1 className="text-4xl font-extrabold tracking-normal">{siteConfig.name}</h1>
        <div className="mx-auto mt-4 max-w-3xl text-base">
          <h2 style={{ textDecoration: 'underline' }}> Purchase Process:</h2>
          <ol>
            <li>Select the model you want to purchase and pay for it using Stripe.</li>
            <li>I will send you an email or a message to your phone as soon as your selected model is ready.</li>
            <li style={{ fontWeight: 'bold' }}>If you can only pay by paypal, write me an e-mail and I will prepare the paypal invoice for you</li>
            <span style={{ display: 'inline-block', marginLeft: '4px', animation: 'bounce 2s infinite' }}>&darr;</span>
            <span style={{ display: 'inline-block', marginRight: '4px', animation: 'bounce 2s infinite' }}>&darr;</span>
            <li style={{ fontWeight: 'bold' }}>You can find the complete list of the models I have and what I can create at the following link:</li>
            <span style={{ display: 'inline-block', marginLeft: '4px', animation: 'bounce 2s infinite' }}>&darr;</span>
            <span style={{ display: 'inline-block', marginRight: '4px', animation: 'bounce 2s infinite' }}>&darr;</span>

            <li style={{ fontWeight: 'bold' }}>Click here for a Catalogue -{'>'} <a href="https://sites.google.com/view/modelscatalogue/" style={{ color: 'red', fontWeight: 'bold' }}>Models Catalogue</a></li>
            <li style={{ fontWeight: 'bold' }}>Click here for a DM -{'>'} <a href="https://www.facebook.com/Sultry3DPrints" style={{ color: 'red', fontWeight: 'bold' }}>Sultry3DPrints</a></li>
            <li style={{ color: 'red', fontWeight: 'bold' }}><a href="mailto:info@sultry3dprints.com" style={{ color: 'red', fontWeight: 'bold' }}>info@sultry3dprints.com</a></li>
          </ol>
        </div>
      </div>
      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="pt-24 pb-6">
            <Carousel
              slides={slides}
              className="flex items-center rounded-lg !px-6 !pb-8"
              slideClassName='mt-[82px] bg-background rounded-lg p-4' >
              <>
                <div className='absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.5)] z-[-1]' />
                <p className='absolute w-full top-[24px] font-semibold text-center text-white text-[24px] text-bold z-[1]'>Turning smiles into testimonials – your happiness, our success!</p>
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
              <ProductGrid products={products} reviews={reviews} />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}