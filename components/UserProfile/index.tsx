import { FC, useState } from 'react'
import Image from 'next/image';
import { User } from '@/models/user'
import UserAddressForm from '../CartSummary/UserAddressForm';
import { FormData, formDataInitialState } from '../CartSummary/data';
import { FaEdit } from "react-icons/fa";
import Modal from '../CartSummary/Modal';
import { handleAddShippingAddress } from '@/lib/utils';

const UserProfile: FC<{ userData: User }> = ({ userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(userData?.shippingAddress || formDataInitialState);

  const handleSaveAddress = () => {
    handleAddShippingAddress(formData);
  }
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
      <div className="flex flex-wrap gap-4 rounded-lg border p-4 shadow">
        <div className="my-2 flex w-full justify-center">
          <div className='size-32 rounded-lg bg-[#eff0f2] p-4 shadow dark:bg-[#3b3b3b4d] md:size-[160px] md:p-6'>
            <div className='mb-5 overflow-hidden rounded-full'>
              <Image
                src={userData?.image}
                alt={userData?.name}
                width={160}
                height={160}
                className='img scale-animation rounded-full'
              />
            </div>
          </div>
        </div>

        <h2 className="mb-4 basis-full text-xl font-bold">Profile</h2>
        <div className='flex-1 basis-full md:basis-5/12'>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              disabled
              name="name"
              value={userData?.name}
              className="block h-[40px] w-full flex-1 rounded-md border-gray-300 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className='flex-1 basis-full md:basis-5/12'>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              disabled
              name="email"
              value={userData?.email}
              className="block h-[40px] w-full flex-1 rounded-md border-gray-300 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className='flex-1 basis-full'>
          <label htmlFor="about" className="block text-sm font-medium">
            About
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <textarea
              disabled
              rows={2}
              name="about"
              value={userData?.about ?? 'N/A'}
              className=" block w-full flex-1 rounded-md border-gray-300 p-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className='flex-1 basis-full md:basis-5/12'>
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              disabled
              name="phone"
              value={userData?.shippingAddress?.phone ?? 'N/A'}
              className="block h-[40px] w-full flex-1 rounded-md border-gray-300 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className='flex-1 basis-full md:basis-5/12'>
          <label htmlFor="joining_date" className="block text-sm font-medium">
            Joining Date
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              disabled
              name="joining_date"
              value={userData?._createdAt.split('T')[0]}
              className="block h-[40px] w-full flex-1 rounded-md border-gray-300 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div >
      <div className='mt-8 rounded-lg border p-4 shadow'>
        <div className='flex items-center gap-4'>
          <h2 className="mb-4 text-xl font-bold">Shipping Address</h2>
          <FaEdit className='cursor-pointer' onClick={openModal} />
        </div>
        {userData?.shippingAddress && <UserAddressForm formData={userData?.shippingAddress} readOnly />}
        
      </div>
      
      {
        isModalOpen &&
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveAddress}
          title='Shipping Address'
        >
          <UserAddressForm
            formData={formData}
            setFormData={setFormData}
          />
        </Modal>
      }
    </>
  )
}

export default UserProfile