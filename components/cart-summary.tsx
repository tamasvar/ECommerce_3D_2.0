"use client"
import { SetStateAction, useState } from "react";
import { Loader2 } from "lucide-react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { Button } from "@/components/ui/button";

import React from 'react';


export function CartSummary() {
  const { formattedTotalPrice, totalPrice=0, cartDetails, cartCount, redirectToCheckout } = useShoppingCart();
  const [isLoading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("US"); // Add state for selected country
  const isDisabled = isLoading || cartCount === 0;

  // Define shipping costs for different countries
  const countryShippingCosts = {
    US: 3700,   // United States
    CY: 3700,   // Cyprus
    DK: 3000,   // Denmark
    FI: 3000,   // Finland
    IE: 3000,   // Ireland
    IT: 3000,   // Italy
    LU: 3000,   // Luxembourg
    MT: 3700,   // Malta
    SE: 3000,   // Sweden
    NL: 3000,   // The Netherlands
    GB: 3000,   // United Kingdom
    DE: 2000,   // Germany
    FR: 2000,   // France
    ES: 2000,   // Spain
    PT: 2000,   // Portugal
    BE: 2000,   // Belgium
    AT: 2000,   // Austria
    BG: 2000,   // Bulgaria
    HR: 2000,   // Croatia
    CZ: 2000,   // Czech Republic
    EE: 2000,   // Estonia
    GR: 2000,   // Greece
    HU: 2000,   // Hungary
    LV: 2000,   // Latvia
    LT: 2000,   // Lithuania
    PL: 2000,   // Poland
    RO: 2000,   // Romania
    SK: 2000,   // Slovakia
    SI: 2000,   // Slovenia
    // Add more countries with their respective shipping costs
    // For other countries, use a default value of 20
    // Example:
    // EE: 20,  // Estonia
    // LT: 20,  // Lithuania
    // ...
  };

  // Calculate shipping amount based on the selected country
  const shippingAmount = selectedCountry ? (countryShippingCosts[selectedCountry as keyof typeof countryShippingCosts] || 0) : 0;

 
  async function onCheckout() {
    setLoading(true);
   
  
    const response = await fetch('/api/checkout', {
      method: "POST",
      body: JSON.stringify({ cartDetails,shippingAmount,selectedCountry })
    });
    
    const data = await response.json();
    const result = await redirectToCheckout(data.id);
    if (result?.error) {
      console.error(result);
    }

    setLoading(false);
  }

 /*  const handleCouponCodeChange = (event: { target: { value: SetStateAction<string> } }) => {
    setCouponCode(event.target.value);
  };

  const applyCouponCode = () => {
    if (couponCode === "Kb12tDuI") {
      setDiscount(1); // 1% discount for the specified coupon code
    } else if (couponCode === process.env.NEXT_PUBLIC_COUPON5) {
      setDiscount(5);
    } else if (couponCode === process.env.NEXT_PUBLIC_COUPON10) {
      setDiscount(10); // 1% discount for the specified coupon code
    } else if (couponCode === process.env.NEXT_PUBLIC_COUPON15) {
      setDiscount(15); // 1% discount for the specified coupon code
    } else if (couponCode === process.env.NEXT_PUBLIC_SALE35) {
      setDiscount(35); // 1% discount for the specified coupon code
    } else {
      setDiscount(0); // No discount if the entered coupon code doesn't match
      setCouponCode("");
    }
  };
*/
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
            {cartCount && cartCount > 1
              ? formatCurrencyString({ value: shippingAmount + (cartCount - 1) * 400, currency: "EUR" }) // Adding 400 EUR for each additional item
              : formatCurrencyString({ value: shippingAmount, currency: "EUR" })}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Order total</dt>
          <dd className="text-base font-medium">
          {cartCount && cartCount > 1
              ? formatCurrencyString({ value: totalPrice+shippingAmount + ((cartCount - 1) * 400), currency: "EUR" }) // Adding 400 EUR for each additional item
              : formatCurrencyString({ value: totalPrice+shippingAmount, currency: "EUR" })}
          </dd>
        </div>
      </dl>

      {/* <div className="mt-4">
        <label htmlFor="couponCode" className="block text-sm font-medium">
          Coupon Code
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            id="couponCode"
            name="couponCode"
            className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
      </div> */}

<div className="mt-6">
  {/* Country selection dropdown */}
  <label htmlFor="country" className="block text-sm font-medium">
    Shipping Country
  </label>
  <div className="relative mt-1">
    <select
      id="country"
      name="country"
      className="focus:shadow-outline-blue mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 leading-5 transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm"
      onChange={(e) => setSelectedCountry(e.target.value)}
    >
      <option value="" disabled>Select country</option>
      <option value="US">United States</option>
      <option value="CY">Cyprus</option>
      <option value="DK">Denmark</option>
      <option value="FI">Finland</option>
      <option value="IE">Ireland</option>
      <option value="IT">Italy</option>
      <option value="LU">Luxembourg</option>
      <option value="MT">Malta</option>
      <option value="SE">Sweden</option>
      <option value="NL">The Netherlands</option>
      <option value="GB">United Kingdom</option>
      <option value="DE">Germany</option>
      <option value="FR">France</option>
      <option value="ES">Spain</option>
      <option value="PT">Portugal</option>
      <option value="BE">Belgium</option>
      <option value="AT">Austria</option>
      <option value="BG">Bulgaria</option>
      <option value="HR">Croatia</option>
      <option value="CZ">Czech Republic</option>
      <option value="EE">Estonia</option>
      <option value="GR">Greece</option>
      <option value="HU">Hungary</option>
      <option value="LV">Latvia</option>
      <option value="LT">Lithuania</option>
      <option value="PL">Poland</option>
      <option value="RO">Romania</option>
      <option value="SK">Slovakia</option>
      <option value="SI">Slovenia</option>
      {/* Add more countries as needed */}
    </select>
    
  </div>
</div>


      <div className="mt-6">
        <Button onClick={onCheckout} className="w-full" disabled={isDisabled}>
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isLoading ? "Loading..." : "Pay by Stripe"}
        </Button>
      </div>
      {/* <div className="mt-6">
        
        <PayPalScriptProvider options={{ "clientId": "Ab-rHK5CwmB48h9Bzr7ltzfx4pzRx1gFxJlRnklTe6OoCQ0jHhymg4vKouURj1cWyvH6x6VV-FPEBs7G" }}>
          <PayPalButtons
            style={{ layout: "horizontal",color:"blue" }}
            createOrder={async()=>{
              const res =await fetch('/api/paypalcheckout',{
                method:"POST",
                headers: {
                  'Content-Type': 'application/json',
                },
               
              })
              const order =await res.json()
              console.log(order)
              return order.id
            }}
            onApprove={async (data, actions) => {
              console.log(data);
              if (actions.order) {
                await actions.order.capture();
              }
            }}
            // onCancel={()=>{}}
            
            
          />
        </PayPalScriptProvider>
      </div> */}
    </section>
  );
}
