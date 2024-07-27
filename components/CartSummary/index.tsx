"use client"
import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import axios from 'axios';
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { createOrder } from "@/lib/apis";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CreateOrderDto } from "@/models/order";
import { Button } from "@/components/ui/button";
import { countryShippingCosts, europeanCountriesWithStates, FormData, formDataInitialState } from "./data";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import UserAddressForm from "./UserAddressForm";
import Modal from "./Modal";
import { FaEdit } from "react-icons/fa";
import { getAddressString, handleAddShippingAddress, isFormDataEmpty } from "@/lib/utils";
import sanityClient from "@/sanity/lib/client";
import { getCouponsQuery } from "@/lib/sanityQueries";
import { v4 as uuidv4 } from 'uuid';

const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
let sessionSave: any = {};
let units: any = [];
let discountCents: number = 0;
let hasShippingAddress: boolean = false;
let shippingDataSaved: any = {};
let couponSaved: any;

export function CartSummary() {
  const { data: session } = useSession();
  sessionSave = session;
  const router = useRouter();
  const {
    cartDetails,
    cartCount = 0,
    totalPrice = 0,
    redirectToCheckout,
    formattedTotalPrice,
  } = useShoppingCart();

  const [isLoading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<any>();

  const [isValid, setValid] = useState(false);

  const validateForm = () => {
    const countryStates = formData.country && (europeanCountriesWithStates.find(country => country.value === formData.country)?.states || []);
    const requiredFields = ['name', 'phone', 'country', 'lineAddress1', 'city', 'zip'];
    if (countryStates.length > 0) requiredFields.push('state');
    const isValid = requiredFields.every(field => formData[field as keyof FormData]);
    setValid(isValid);
  };

  // shipping address
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [formattedAddress, setFormattedAddress] = useState('');
  shippingDataSaved = formData;
  const isDisabled = isLoading || cartCount === 0;
  const cartItems: any[] = Object.entries(cartDetails!).map(([_, product]) => product);

  const fetchUserData = async () => {
    const { data } = await axios.get('/api/users');
    return data;
  };

  const {
    data: userData,
  } = useSWR('/api/users', fetchUserData);

  const isEmptyFormData = isFormDataEmpty(formData);
  hasShippingAddress = !isEmptyFormData;

  const handleSaveAddress = () => {
    handleAddShippingAddress(formData);
    setFormattedAddress(getAddressString(formData));
  }

  // Calculate shipping amount based on the selected country
  const shippingAmount = formData?.country ?
    (countryShippingCosts[formData?.country as keyof typeof countryShippingCosts] || 0) : 0;

  const shippingEstimate: string = cartCount && formatCurrencyString({ value: shippingAmount + (cartCount - 1) * 400, currency: "EUR" }) || '';

  const discountAmount = formatCurrencyString({ value: discount, currency: "EUR" });

  // order amount with shipping charges
  const orderTotal = formatCurrencyString({ value: totalPrice - discount + shippingAmount + ((cartCount - 1) * 400), currency: "EUR" }) // Adding 400 EUR for each additional item

  const perItemShippingCost = Number(shippingEstimate.replace(/[^\d.-]/g, '')) / cartCount;

  units = cartItems?.map((p) => {
    const cartItemPrice = p.value / 100;

    let discountValue = 0;
    switch (appliedCoupon?.type) {
      case 'percentage':
        discountValue = cartItemPrice * (+(appliedCoupon?.discount?.slice(0, -1)) / 100 || 0);
        break;
      case 'fixed':
        discountValue = (appliedCoupon?.discount || 0) / cartItems.length;
        break;
    }

    const totalAmount = appliedCoupon?.type === 'free_shipping' ? cartItemPrice :
      (cartItemPrice - discountValue + perItemShippingCost * p?.quantity);

    return {
      reference_id: p?.id,
      amount: {
        currency_code: "EUR",
        value: totalAmount.toFixed(2), // Ensure correct formatting
      },
      shipping: {
        name: {
          full_name: shippingDataSaved?.name
        },
        type: 'SHIPPING',
        address: {
          address_line_1: shippingDataSaved?.lineAddress1,
          admin_area_1: shippingDataSaved?.state,
          admin_area_2: shippingDataSaved?.city,
          postal_code: shippingDataSaved?.zip,
          country_code: shippingDataSaved?.country
        }
      },
    };
  });

  async function onCheckout() {
    if (!formData?.country) {
      toast.error("Please Select shipping country to proceed order")
      return;
    };
    try {
      setLoading(true);
      const response = await fetch('/api/checkout', {
        method: "POST",
        body: JSON.stringify({
          cartDetails,
          shippingAmount,
          selectedCountry: formData?.country,
          discount: discount / cartCount,
          totalPrice: totalPrice - discountCents + shippingAmount + ((cartCount - 1) * 400),
          couponId: couponSaved?._id
        })
      });

      const data = await response.json();
      const result = await redirectToCheckout(data.id);

      if (result?.error) {
        console.error(result);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong!')
    }

    setLoading(false);
  }

  const createPaypalOrder = async (_: any, actions: any) => {
    try {
      if (!sessionSave?.user?.id) {
        toast.error("Session expired. please Login")
        return;
      };

      if (!hasShippingAddress) {
        toast.error("Please add shipping address");
        return;
      }

      return (actions.order
        .create({
          intent: "CAPTURE",
          payer: {
            name: {
              given_name: shippingDataSaved?.name.split(' ')?.[0]?.trim(),
              surname: shippingDataSaved?.name.split(' ')?.[1]?.trim()
            },
            address: {
              address_line_1: shippingDataSaved?.lineAddress1,
              admin_area_1: shippingDataSaved?.state,
              admin_area_2: shippingDataSaved?.city,
              postal_code: shippingDataSaved?.zip,
              country_code: shippingDataSaved?.country
            }
          },
          shipping: {
            address: {
              address_line_1: shippingDataSaved?.lineAddress1,
              admin_area_1: shippingDataSaved?.state,
              admin_area_2: shippingDataSaved?.city,
              postal_code: shippingDataSaved?.zip,
              country_code: shippingDataSaved?.country
            }
          },
          purchase_units: units,
          application_context: {
            shipping_preference: 'SET_PROVIDED_ADDRESS',
          }
        })
        .then((orderId: any) => orderId));
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong, Please try again!')
    }
  };

  const onPaypalOrderApprove = async (_: any, actions: any) => {
    return actions?.order?.capture()?.then(async function (order: any) {
      if (order?.status === "COMPLETED") {
        paypalCheckout({
          orderId: order?.id || '',
          orderDate: order?.create_time || '',
        })
      } else {
        toast.error("Something went wrong");
      }
    });
  }

  const paypalCheckout = async ({
    orderId,
    orderDate,
  }: { orderId: string; orderDate: string }) => {
    try {
      if (sessionSave?.user?.id) {

        const date = new Date(orderDate).toISOString().split('T')[0];
        const products = cartItems?.map((item) => {
          // const id = item?.id?.split('_')[0];
          return {
            product: {
              _key: uuidv4(),
              _id: item?._id,
              name: item?.name,
            },
            style: item?.product_data?.style ?? '',
            size: item?.product_data?.size ?? '',
          };
        });

        let totalPriceAmount = 0;
        if (couponSaved?.type === 'free_shipping') {
          totalPriceAmount = totalPrice;
        } else {
          totalPriceAmount = totalPrice - discountCents + shippingAmount + ((cartCount - 1) * 400)
        }

        const orderData: CreateOrderDto = {
          id: orderId,
          user: sessionSave?.user?.id ?? "",
          products,
          orderdate: date,
          totalPrice: totalPriceAmount,
          // formattedAddress: formattedAddress,
          couponId: couponSaved?._id
        };

        console.log('discountCents', discountCents);

        console.log('orderData', orderData);

        // Call createOrder function to save order in Sanity
        await createOrder(orderData);

        router.push(`/success?totalAmount=${totalPriceAmount}&itemsCount=${products?.length}`);

        handleReset();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleReset = () => {
    setAppliedCoupon(null);
    couponSaved = null;
    setDiscount(0);
    setCouponCode("");
  };

  const handleCouponCodeChange = (event: any) => {
    setCouponCode(event.target.value);
  };

  const handleDiscount = (discountPercentage: number) => {
    const discountValue = totalPrice * discountPercentage / 100;
    discountCents = discountValue;
    setDiscount(discountValue);
  }

  const applyCouponCode = async () => {
    try {
      const coupon = await fetchCouponByCode(couponCode);
      if (coupon) {
        // Check if the coupon has expired
        const currentDate = new Date();
        const expirationDate = new Date(coupon.expirationDate);

        if (expirationDate < currentDate) {
          toast.error('Coupon code has expired!');
          setCouponCode("");
          setDiscount(0);
          return;
        }
        if (coupon?.useLimit <= coupon?.usersAvailed?.length) {
          toast.error('Coupon has reached use limit');
          setCouponCode("");
          setDiscount(0);
          return;
        }

        setAppliedCoupon(coupon);
        couponSaved = coupon;

        switch (coupon.type) {
          case 'free_shipping': {
            discountCents = shippingAmount + (cartCount - 1) * 400;
            setDiscount(shippingAmount + (cartCount - 1) * 400);
          }
            break;
          case 'percentage':
            handleDiscount(+coupon?.discount?.slice(0, -1));
            break;
          case 'fixed': {
            const isEligible = Number(orderTotal.replace(/[^\d.-]/g, '')) < +coupon.discount;
            if (isEligible) {
              discountCents = +coupon.discount;
              setDiscount(+coupon.discount);
            } else {
              toast.error('Order amount is insufficient for coupon eligibility. Please add more to qualify!');
            }
            break;
          }
          default:
            toast.error('Invalid coupon type.');
        }
      } else {
        handleDiscount(0); // No discount
        setCouponCode("");
        toast.error('Invalid coupon code!');
      }
    } catch (error) {
      toast.error('An error occurred while applying the coupon.');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => { couponCode && applyCouponCode() }, [cartDetails, formData?.country])

  useEffect(() => {
    if (userData?.shippingAddress) {
      setFormData(userData?.shippingAddress);
      setFormattedAddress(getAddressString(userData?.shippingAddress));
    }
  }, [userData]);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const fetchCouponByCode = async (code: string) => {
    const params = { code };
    return await sanityClient.fetch(getCouponsQuery, params);
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
        {
          userData &&
          <div className="border-t border-gray-200 pt-4 dark:border-gray-600">
            <dt className="flex items-center text-sm">
              <Link className="text-sm font-medium text-indigo-600 hover:underline hover:decoration-solid dark:text-indigo-400" href={`/user/${userData?._id}?t=purchase-history`}>Available Coupon</Link>
            </dt>
          </div>}
      </dl>

      <div className="mt-4">
        <label htmlFor="couponCode" className="block text-sm font-medium">
          Coupon Code
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            value={couponCode}
            name="couponCode"
            className="block w-full flex-1 rounded-md border-gray-300 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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

      <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-600">
        {
          !userData ?
            <div className='w-full'>
              <label htmlFor="country" className="block text-sm font-medium">
                Country
              </label>
              <div className="relative mt-1">
                <select
                  id="country"
                  name="country"
                  value={formData?.country}
                  className={'focus:shadow-outline-blue mt-1 block h-[40px] w-full rounded-md border-gray-300 py-2 pl-3 pr-10 leading-5 transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm'}
                  onChange={(e) => {
                    setFormData?.(prev => ({ ...prev, country: e.target.value }));
                  }}
                >
                  {europeanCountriesWithStates?.map(({ value, label, disabled = false }) =>
                    <option key={value + label} disabled={disabled} value={value}>{label}</option>)}
                </select>
              </div>
            </div> : <>
              <div className="flex items-center gap-4">
                <label className="block text-base font-medium">
                  Shipping Address
                </label>
                <FaEdit className='cursor-pointer' onClick={openModal} />
              </div>
              <div className="mt-2 rounded-lg bg-white p-4 dark:bg-[#121212]">
                {
                  isEmptyFormData ? <p>Please fill out the shipping details to proceed with the order.</p> :
                    <pre>
                      {formattedAddress}
                    </pre>
                }
              </div>
            </>}
      </div>

      <div className="mt-6">
        <Button type="button" onClick={onCheckout} className="w-full" disabled={isDisabled}>
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
            disabled={!userData}
            style={{
              color: 'gold',
              shape: 'rect',
              label: 'pay',
              height: 40,
              layout: 'horizontal', // Ensure buttons are displayed in horizontal layout
              tagline: false, // Remove tagline if needed
            }}
            createOrder={createPaypalOrder}
            onApprove={onPaypalOrderApprove}
          />
        </PayPalScriptProvider>
      </div>
      {
        isModalOpen &&
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title='Shipping Address'
          onSave={handleSaveAddress}
          isValid={isValid}
        >
          <UserAddressForm
            formData={formData}
            setFormData={setFormData}
          />
        </Modal>
      }
    </section>
  );
}
