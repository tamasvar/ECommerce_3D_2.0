"use client"
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { createOrder } from "@/lib/apis";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CreateOrderDto } from "@/models/order";
import { Button } from "@/components/ui/button";
import { countries, countryShippingCosts } from "./data";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
let sessionSave: any = {};
let units: any = [];
let discountCents: number = 0;

export function CartSummary() {
  const { data: session } = useSession();
  sessionSave = session;
  const router = useRouter();
  const { formattedTotalPrice, totalPrice = 0, cartDetails, cartCount = 0, redirectToCheckout } = useShoppingCart();

  const [isLoading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("US"); // Add state for selected country
  const isDisabled = isLoading || cartCount === 0;
  const cartItems = Object.entries(cartDetails!).map(([_, product]) => product);

  // Calculate shipping amount based on the selected country
  const shippingAmount = selectedCountry ? (countryShippingCosts[selectedCountry as keyof typeof countryShippingCosts] || 0) : 0;

  const shippingEstimate = cartCount && cartCount > 1
    ? formatCurrencyString({ value: shippingAmount + (cartCount - 1) * 400, currency: "EUR" }) // Adding 400 EUR for each additional item
    : formatCurrencyString({ value: shippingAmount, currency: "EUR" });

  const discountAmount = formatCurrencyString({ value: discount, currency: "EUR" })

  const perItemShippingCost = Number(shippingEstimate.replace('€', '')) / cartCount;
  const perItemDiscount = Number(discountAmount.replace('€', '')) / cartCount;

  // order amount with shipping charges
  const orderTotal = formatCurrencyString({ value: totalPrice - discount + shippingAmount + ((cartCount - 1) * 400), currency: "EUR" }) // Adding 400 EUR for each additional item

  units = cartItems?.map((p) => {
    const itemPrice = Number(p?.formattedPrice.replace('€', ''));
    const discountedPrice = itemPrice - perItemDiscount;
    const totalAmount = discountedPrice + perItemShippingCost;

    return {
      reference_id: p?.id,
      amount: {
        currency_code: "EUR",
        value: totalAmount.toFixed(2), // Ensure correct formatting
      },
    };
  });

  async function onCheckout() {
    setLoading(true);
    const response = await fetch('/api/checkout', {
      method: "POST",
      body: JSON.stringify({ cartDetails, shippingAmount, selectedCountry, discount: discount / cartCount })
    });

    const data = await response.json();

    const result = await redirectToCheckout(data.id);
    if (result?.error) {
      console.error(result);
    }
    setLoading(false);
  }

  const paypalCheckout = async ({
    orderId,
    orderDate,
  }: { orderId: string; orderDate: string }) => {
    try {
      if (sessionSave.user.id) {
        const date = new Date(orderDate).toISOString().split('T')[0];
        const products = cartItems?.map(item => ({
          product: {
            _id: item?.id,
            name: item?.name,
          },
          style: item?.style?.[0] ?? item?.style ?? '',
          size: item?.size?.[0]?.name ?? "",
        }));

        const orderData: CreateOrderDto = {
          id: orderId,
          user: sessionSave?.user?.id ?? "",
          products,
          orderdate: date,
          totalPrice: totalPrice - discountCents + shippingAmount + ((cartCount - 1) * 400),
        };
        // Call createOrder function to save order in Sanity
        await createOrder(orderData);
        router.push('/success');
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  const handleCouponCodeChange = (event: any) => {
    setCouponCode(event.target.value);
  };

  const handleDiscount = (discountPercentage: number) => {
    const discountValue = totalPrice * discountPercentage / 100;
    discountCents = discountValue;
    setDiscount(discountValue);
  }

  const applyCouponCode = () => {
    if (couponCode === "Kb12tDuI") {
      handleDiscount(1)   // 1% discount for the specified coupon code
    } else if (couponCode === process.env.NEXT_PUBLIC_COUPON5) {
      handleDiscount(5);  // 5% discount for the specified coupon code
    } else if (couponCode === process.env.NEXT_PUBLIC_COUPON10) {
      handleDiscount(10); // 10% discount for the specified coupon code
    } else if (couponCode === process.env.NEXT_PUBLIC_COUPON15) {
      handleDiscount(15); // 15% discount for the specified coupon code
    } else if (couponCode === process.env.NEXT_PUBLIC_FREESHIP) {
      handleDiscount(perItemShippingCost); // 35% discount for the specified coupon code
    } else {
      handleDiscount(0); // No discount if the entered coupon code doesn't match
      setCouponCode("");
      toast.error('Invalid coupon code!')
    }
  };

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md dark:border-gray-900 dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm">Subtotal</dt>
          <dd className="text-sm font-medium">{formattedTotalPrice}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>Shipping estimate</span>
          </dt>
          <dd className="text-sm font-medium">
            {shippingEstimate}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>Discount</span>
          </dt>
          <dd className="text-sm font-medium">
            {discountAmount}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Order total</dt>
          <dd className="text-base font-medium">
            {cartCount && orderTotal}
          </dd>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>Coupon Codes for discount</span>
          </dt>
          <dd className="text-sm font-medium">
            <b>Kb12tDuI</b>
          </dd>
        </div>
      </dl>


      <div className="mt-4">
        <label htmlFor="couponCode" className="block text-sm font-medium">
          Coupon Code
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            value={couponCode}
            name="couponCode"
            className="block px-4 w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={handleCouponCodeChange}
          />
          <button
            type="button"
            className="ml-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow-sm hover:bg-indigo-500 focus:border-indigo-300 focus:outline-none focus:ring active:bg-indigo-800"
            onClick={applyCouponCode}
          >
            Apply
          </button>
        </div>
      </div>

      <div className="mt-6">
        {/* Country selection dropdown */}
        <label htmlFor="country" className="block text-sm font-medium">
          Shipping Country
        </label>
        <div className="relative mt-1">
          <select
            id="country"
            name="country"
            value={selectedCountry}
            className="focus:shadow-outline-blue mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 leading-5 transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm"
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countries?.map(({ value, label, disabled = false }) =>
              <option key={value} disabled={disabled} value={value}>{label}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <Button onClick={onCheckout} className="w-full" disabled={isDisabled}>
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isLoading ? "Loading..." : "Pay by Stripe"}
        </Button>
      </div>
      <div className="mt-6">
        <PayPalScriptProvider
          options={{
            clientId: paypalClientId,
            currency: 'EUR',
            intent: 'capture',
          }}
        >
          <PayPalButtons
            style={{
              color: 'gold',
              shape: 'rect',
              label: 'pay',
              height: 40,
              layout: 'horizontal', // Ensure buttons are displayed in horizontal layout
              tagline: false, // Remove tagline if needed
            }}
            createOrder={async (_, actions) => {
              if (!sessionSave?.user?.id) {
                return toast.error("Session expired.")
              } else
                return actions.order
                  .create({
                    purchase_units: units,
                    intent: "CAPTURE"
                  })
                  .then((orderId) => orderId);
            }}
            onApprove={async (_, actions) => {
              return actions?.order?.capture()?.then(async function (order) {
                if (order?.status === "COMPLETED") {
                  paypalCheckout({
                    orderId: order?.id || '',
                    orderDate: order?.create_time || '',
                  })
                } else {
                  toast.error("Something went wrong");
                }
              });
            }}
          />
        </PayPalScriptProvider>
      </div>
    </section>
  );
}
