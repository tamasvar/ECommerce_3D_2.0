//cart-items
"use client"
import React from 'react';
import Image from "next/image"
import Link from "next/link"
import { urlForImage } from "@/sanity/lib/image"
import { Clock, X } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"
import { shimmer, toBase64 } from "@/lib/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { CartItemsEmpty } from "@/components/cart-items-empty"
import { SanityProduct } from "@/config/inventory"

export function CartItems() {
  const { cartDetails, removeItem, setItemQuantity }: any = useShoppingCart()
  const cartItems = Object.entries(cartDetails!).map(([_, product]) => product as unknown as SanityProduct)
  // console.log(cartItems)
  const { toast } = useToast()

  function removeCartItem(product: SanityProduct) {
    // Find the item with the matching id, size, and style
    const itemKey = Object.keys(cartDetails!).find(
      key => cartDetails![key]._id === product._id &&
        cartDetails![key].product_data.size === product.product_data.size &&
        cartDetails![key].product_data.style === product.product_data.style
    );
    if (itemKey) {
      removeItem(itemKey)
      toast({
        title: `${product.name} removed`,
        description: "Product removed from cart",
        variant: "destructive",
      })
    }
  }

  if (cartItems.length === 0) return <CartItemsEmpty />

  return (
    <ul
      role="list"
      className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-500 dark:border-gray-500"
    >
      {cartItems.map((product, productIdx) => (
        <li key={`${product._id}-${product.product_data.size}-${product.product_data.style}`} className="flex py-6 sm:py-10">
          <div className="shrink-0">
            <Image
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(200, 200))}`}
              src={urlForImage(product.images[0]).url()}
              alt={product.name}
              width={200}
              height={200}
              className="size-24 rounded-md border-2 border-gray-200 object-cover object-center dark:border-gray-800 sm:size-48"
              unoptimized
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="relative justify-between pr-9 sm:flex sm:gap-x-6 sm:pr-0">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-sm">
                    <Link href={`/products/${product.slug}`} className="font-medium">
                      {product.name}
                    </Link>
                  </h3>
                </div>
                <p className="mt-1 text-sm font-medium">
                  {formatCurrencyString({
                    currency: product.currency,
                    value: product.price,
                  })}
                </p>
                <p className="mt-1 text-sm font-medium">
                  Size: <strong>{product.product_data.size}</strong>
                </p>
                <p className="mt-1 text-sm font-medium">
                  Style: <strong>{product.product_data.style}</strong>
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:pr-9">
                <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                  Quantity,  {product.name}
                </label>
                <Input
                  id={`quantity-${productIdx}`}
                  name={`quantity-${productIdx}`}
                  type="number"
                  className="w-16"
                  min={1}
                  max={99}
                  value={product.quantity}
                  /* onChange={event => {
                    setItemQuantity(product.id, Number(event.target.value))
                  } 
                  }*/
                />
                <div className="absolute right-0 top-0">
                  <Button
                    variant="ghost"
                    type="button"
                    className="-mr-2 inline-flex p-2"
                    onClick={() => removeCartItem(product)}
                  >
                    <span className="sr-only">Remove</span>
                    <X className="size-5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>

            <p className="mt-4 flex space-x-2 text-sm">
              <Clock className="size-5 shrink-0" aria-hidden="true" />
              <span>Ships in 10-15 days</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
