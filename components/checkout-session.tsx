"use client"

import { useEffect } from "react"
import { CheckCheck, XCircle } from "lucide-react"
import { useShoppingCart } from "use-shopping-cart"

interface Props {
  customerDetails: any
}

export function CheckoutSession({ customerDetails }: Props) {
  const { clearCart } = useShoppingCart()


  function handleSuccessfulTransaction() {
    clearCart();
  }

  useEffect(() => {
    if (customerDetails) {
      handleSuccessfulTransaction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerDetails]);


  if (!customerDetails) {
    return (
      <>
        <XCircle className="mx-auto size-10 text-red-400" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-red-400 sm:text-5xl">
          No checkout session found
        </h1>
      </>
    )
  }

  return (
    <>
      <CheckCheck className="mx-auto size-10 text-lime-500 dark:text-lime-400" />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-lime-500 dark:text-lime-400 sm:text-5xl">
        Order Successful!
      </h1>
      <h3 className="mt-8 text-2xl leading-7">
        Thank you, <span className="font-extrabold">{customerDetails?.name}</span>!
      </h3>
      <p className="mt-8">
        Check your purchase email{" "}
        <span className="mx-1 font-extrabold text-indigo-500">{customerDetails?.email}</span> for
        your invoice.
      </p>
    </>
  )
}