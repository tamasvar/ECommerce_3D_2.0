import { FC, useEffect, useState } from 'react'
import { monthNames } from '@/lib/utils';
import { formatCurrencyString } from 'use-shopping-cart';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FaRegCopy } from "react-icons/fa6";
import { LuCopyCheck } from "react-icons/lu";
import toast from 'react-hot-toast';
import sanityClient from '@/sanity/lib/client';
import { groq } from 'next-sanity';

const handleFormatPurchaseData: any = (orderDetails: any[]) => {
  let monthlyData: any[] = [];
  let overallTotalAmount = 0;
  let overallTotalProducts = 0;

  orderDetails.forEach((order: any) => {
    const { orderdate, totalPrice, products } = order;
    const yearMonth = orderdate.substring(0, 7);
    const year = orderdate.substring(0, 4);
    const monthNumber = parseInt(orderdate.substring(5, 7), 10) - 1;
    const price = parseFloat(totalPrice);

    // Check if the month already exists in monthlyData
    let monthData = monthlyData.find(item => item.yearMonth === yearMonth);
    if (!monthData) {
      monthData = {
        yearMonth: yearMonth,
        monthName: `${year},${monthNames[monthNumber]}`,
        numOrders: 0,
        totalAmount: 0,
        totalProducts: 0
      };
      monthlyData.push(monthData);
    }

    // Increment the number of orders and add to total amount and total products for the month
    monthData.numOrders++;
    monthData.totalAmount += price;
    monthData.totalProducts += products.length;

    // Update overall totals
    overallTotalAmount += price;
    overallTotalProducts += products.length;
  });

  // Create the final structured object
  return ({
    overallTotalAmount: overallTotalAmount,
    overallTotalProducts: overallTotalProducts,
    months: monthlyData
  })
}

const PurchaseHistory: FC<{ orderDetails: any }> = ({ orderDetails = [] }) => {
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [coupons, setCoupons] = useState<any[]>([]);
  const structuredData = handleFormatPurchaseData(orderDetails);

  const handleCopyClick = (text: string) => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    setCopySuccess(true);
    toast.success("Copied to clipboard!")
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  useEffect(() => {
    const getCoupons = async () => {
      const couponsList = await sanityClient.fetch<any[]>(groq`*[_type == "coupon" ]`);
      setCoupons(couponsList);
    };
    getCoupons();
  }, []);

  return (
    <div className='flex flex-col lg:flex-row gap-4 items-start'>
      <div className="w-full flex-1 flex flex-col space-y-4">
        {/* Summary Section */}
        <div className="p-4 shadow border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className='flex flex-col gap-2'>
            <p>
              <strong className='pr-3'>Overall Total Amount:</strong>
              {formatCurrencyString({ value: structuredData.overallTotalAmount, currency: 'EUR' })}
            </p>
            <p>
              <strong className='pr-3'>Overall Total Products:</strong>
              {structuredData.overallTotalProducts.toLocaleString()}
            </p>
            <p>
              <strong className='pr-3'>Total Orders Count:</strong>
              {orderDetails.length}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-4 shadow border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Details</h2>
          {structuredData.months.map((month: any) => (
            <div key={month.yearMonth} className="border-b border-gray-200 py-2">
              <button
                className="flex items-center justify-between w-full focus:outline-none"
                onClick={() => setShowDetails(showDetails === month.yearMonth ? null : month.yearMonth)}
              >
                <h3 className="text-lg font-medium">{month.monthName}</h3>
                {showDetails === month.yearMonth ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </button>
              {showDetails === month.yearMonth && (
                <div className="mt-2 flex flex-col gap-2 border p-4 rounded-lg">
                  <p><strong className='pr-3'>Number of Orders:</strong> {month.numOrders}</p>
                  <p><strong className='pr-3'>Total Amount:</strong> {formatCurrencyString({ value: month.totalAmount, currency: 'EUR' })}</p>
                  <p><strong className='pr-3'>Total Products:</strong> {month.totalProducts}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Coupon Section */}
      <div className="w-full p-4 shadow border rounded-lg lg:basis-2/5">
        <h2 className="text-xl font-bold mb-4">Coupon</h2>
        {coupons?.map(coupon => (
          <div key={coupon?.name} className="border-b border-gray-200 py-2">
            <button
              className="flex items-center justify-between w-full focus:outline-none"
              onClick={() => setShowDetails(showDetails === coupon?.name ? null : coupon?.name)}
            >
              <h3 className="text-lg font-medium">{coupon?.name}</h3>
              {showDetails === coupon?.name ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </button>
            {showDetails === coupon?.name && (
              <div className="mt-2 flex flex-col gap-2 border p-4 rounded-lg">
                <div className='flex items-center gap-2'>
                  <p><strong className='pr-3'>Coupon Code:</strong></p>
                  <div className='flex-1 flex justify-between items-center rounded border px-2 py-1'>
                    <strong>{coupon?.code}</strong>
                    {
                      copySuccess ?
                        <LuCopyCheck /> :
                        <FaRegCopy
                          className='cursor-pointer'
                          onClick={() => handleCopyClick(coupon?.code)}
                        />
                    }
                  </div>
                </div>
                <p>
                  <strong className='pr-3'>Discount Amount:</strong>
                  {coupon?.type === 'fixed' ?
                    formatCurrencyString({ value: +coupon?.discount, currency: 'EUR' }) :
                    coupon?.type === 'percentage' ? `${coupon?.discount} of total Bill` : coupon?.discount
                  }
                </p>
                <p><strong className='pr-3'>Expiration Date:</strong> {coupon?.expirationDate}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PurchaseHistory