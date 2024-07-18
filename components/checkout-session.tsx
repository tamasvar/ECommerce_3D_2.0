"use client"

import { useEffect } from "react"
import { CheckCheck, XCircle } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"
import Link from "next/link";

interface Props {
  customerDetails: any;
  totalAmount: number;
  itemsCount: number;
}

export function CheckoutSession({ customerDetails, itemsCount, totalAmount }: Props) {
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
  console.log('customerDetails', customerDetails);


  return (
    <>
      <CheckCheck className="mx-auto size-10 text-lime-500 dark:text-lime-400" />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-lime-500 dark:text-lime-400 sm:text-5xl">
        Order Successful!
      </h1>
      <h3 className="mt-8 text-2xl leading-7">
        Thank you, <span className="font-extrabold">{customerDetails?.name}</span>!
      </h3>
      <div className="mt-8 p-4 shadow border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Summary</h2>
        <div className='flex flex-col gap-2'>
          <p>
            <strong className='pr-3'>Items Count:</strong>
            {itemsCount}
          </p>
          <p>
            <strong className='pr-3'>Total Amount:</strong>
            {formatCurrencyString({ value: totalAmount, currency: 'EUR' })}
          </p>
          <Link className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:decoration-solid hover:underline" href={`/user/${customerDetails?.id}`}>View Order Details</Link>
        </div>
      </div>
      <p className="mt-8">
        Check your purchase email{" "}
        <span className="mx-1 font-extrabold text-indigo-500">{customerDetails?.email}</span> for
        your invoice.
      </p>
    </>
  )
}