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
    <div className='mx-auto min-w-xl overflow-x-auto rounded-lg shadow-md sm:rounded-lg md:max-w-full'>

      <table className='w-full text-left text-sm'>
        <thead className='bg-gray-50 dark:bg-[#3b3b3b] text-xs uppercase'>
          <tr>
            <th className='px-6 py-3 min-w-[220px]'>Product</th>
            <th className='px-6 py-3'>Style</th>
            <th className='px-6 py-3'>Size</th>
            <th className='px-6 py-3'>Status</th>
            <th className='px-6 py-3'>Amount</th>
            <th className='px-6 py-3 whitespace-nowrap'>Tracking No.</th>
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
                className='border-b bg-white dark:bg-[#3b3b3b4d] hover:bg-gray-50'
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

      <div className='flex justify-between items-center flex-wrap gap-4 mt-4 '>
        <div className='flex items-center'>
          <label htmlFor='itemsPerPage' className='mr-2'>Items per page:</label>
          <select
            id='itemsPerPage'
            className='border rounded-md px-2 py-1'
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
            className={`${currentPage === 1 ? 'bg-gray-200 dark:bg-[#3b3b3b] text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'
              } hover:bg-blue-400 hover:text-white px-3 py-1 rounded-md flex items-center`}
          >
            <IoChevronBackOutline className='h-5 w-5 mr-1' /> Prev
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
                    : 'bg-gray-200 dark:bg-[#3b3b3b] dark:text-[#e1e7ef] text-gray-800'
                    } hover:bg-blue-400 hover:text-white px-3 py-1 rounded-md`}
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
              ? 'bg-gray-200 dark:bg-[#3b3b3b] text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white'
              } hover:bg-blue-400 hover:text-white px-3 py-1 rounded-md flex items-center`}
          >
            Next <IoChevronForwardOutline className='h-5 w-5 ml-1' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;

