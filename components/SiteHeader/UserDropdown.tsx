
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import { ImProfile } from 'react-icons/im';
import { BsJournalBookmarkFill } from 'react-icons/bs';
import { GiMoneyStack } from 'react-icons/gi';

const UserDropdown = ({ session }: any) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <div onClick={toggleDropdown} className='relative cursor-pointer'>
      {session?.user?.image ? (
        <div className='size-9 overflow-hidden rounded-full'>
          <Image
            src={session?.user?.image}
            alt={session?.user?.name}
            width={40}
            height={40}
            className='scale-animation img'
          />
        </div>
      ) : (
        <FaUserCircle className='size-4 cursor-pointer' />
      )}
      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg dark:bg-[#3b3b3b]'>
          <div className='py-1'>
            <button
              className='flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-600'
              onClick={() => handleNavigate(`/user/${session?.user?.id}?t=profile`)}
            >
              <ImProfile className='text-xl' />
              Profile
            </button>
            <button
              className='flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-600'
              onClick={() => handleNavigate(`/user/${session?.user?.id}?t=orders`)}
            >
              <BsJournalBookmarkFill className='text-xl' />
              Orders
            </button>
            <button
              className='flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-600'
              onClick={() => handleNavigate(`/user/${session?.user?.id}?t=purchase-history`)}
            >
              <GiMoneyStack className='text-xl' />
              Purchase History
            </button>
            <button
              className='flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-600'
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <FaSignOutAlt className='text-xl' />
              <span>
                Sign Out
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
