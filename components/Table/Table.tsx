'use client';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Order } from '@/models/order';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

type Props = {
  orderDetails: Order[] | undefined;
  setProductId: Dispatch<SetStateAction<string | null>>;
  setOrderId: Dispatch<SetStateAction<string | null>>;
  toggleRatingModal: () => void;
};

const Table: FC<Props> = ({ orderDetails = [], setProductId, setOrderId, toggleRatingModal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const sortedOrderDetails = [...orderDetails].sort((a, b) => new Date(b.orderdate).getTime() - new Date(a.orderdate).getTime());

  const totalPages = Math.ceil(sortedOrderDetails.length / itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 9) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage > 4 && currentPage < totalPages - 3) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      }
    }
    return pageNumbers;
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className='min-w-xl mx-auto overflow-x-auto rounded-lg shadow-md sm:rounded-lg md:max-w-full'>

      <table className='w-full text-left text-sm'>
        <thead className='bg-gray-50 text-xs uppercase dark:bg-[#3b3b3b]'>
          <tr>
            <th className='min-w-[220px] px-6 py-3'>Product</th>
            <th className='px-6 py-3'>Style</th>
            <th className='px-6 py-3'>Size</th>
            <th className='px-6 py-3'>Status</th>
            <th className='px-6 py-3'>Amount</th>
            <th className='whitespace-nowrap px-6 py-3'>Tracking No.</th>
            <th className='px-6 py-3'>Date</th>
            <th className='px-6 py-3'>Rating</th>
          </tr>
        </thead>

        <tbody>
          {/* Display current page items */}
          {sortedOrderDetails.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(order =>
            order.products.map((product: any) => (
              <tr
                key={`${order._id}-${product?.product?._id}`}
                className='border-b bg-white hover:bg-gray-50 dark:bg-[#3b3b3b4d]'
              >
                <td className='px-6 py-4'>{product?.product?.name || '-'}</td>
                <td className='px-6 py-4'>{product?.style || '-'}</td>
                <td className='px-6 py-4'>{product?.size?.name || product?.size || '-'}</td>
                <td className='px-6 py-4'>{order.status || '-'}</td>
                <td className='px-6 py-4'>{order.totalPrice / 100}€</td>
                <td className='px-6 py-4'>{order.trackingNumber || '-'}</td>
                <td className='px-6 py-4'>{order.orderdate || '-'}</td>
                <td className='px-6 py-4'>
                  <button
                    onClick={() => {
                      setProductId(product?.product?._id);
                      setOrderId(order._id);
                      toggleRatingModal();
                    }}
                    className='font-medium text-blue-600 hover:underline'
                  >
                    Rate
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className='mt-4 flex flex-wrap items-center justify-between gap-4 '>
        <div className='flex items-center'>
          <label htmlFor='itemsPerPage' className='mr-2'>Items per page:</label>
          <select
            id='itemsPerPage'
            className='rounded-md border px-2 py-1'
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='30'>30</option>
          </select>
        </div>
        <div className='flex gap-2'>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`${currentPage === 1 ? 'cursor-not-allowed bg-gray-200 text-gray-500 dark:bg-[#3b3b3b]' : 'bg-blue-500 text-white'
              } flex items-center rounded-md px-3 py-1 hover:bg-blue-400 hover:text-white`}
          >
            <IoChevronBackOutline className='mr-1 size-5' /> Prev
          </button>
          <ul className='flex gap-1'>
            {getPageNumbers().map((number, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    if (number !== '...') {
                      paginate(+number);
                    }
                  }}
                  className={`${currentPage === number
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 dark:bg-[#3b3b3b] dark:text-[#e1e7ef]'
                    } rounded-md px-3 py-1 hover:bg-blue-400 hover:text-white`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`${currentPage === totalPages
              ? 'cursor-not-allowed bg-gray-200 text-gray-500 dark:bg-[#3b3b3b]'
              : 'bg-blue-500 text-white'
              } flex items-center rounded-md px-3 py-1 hover:bg-blue-400 hover:text-white`}
          >
            Next <IoChevronForwardOutline className='ml-1 size-5' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;

