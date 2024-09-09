"use client";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import notFoundImage from '@/public/assets/404.png';
const NotFound = () => {
  const router = useRouter();
  const navigateToHomePage = () => {
    router.push('/');
  };
  const navigateToBack = () => {
    router.back();
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-3 mt-5">
        <Image
          width={256}
          height={156}
          alt="not-found"
          src={notFoundImage}
          className="h-auto w-64"
        />
      </div>
      <p className="text-primary-text mb-1 text-center text-xl font-bold">
        Oops, this page is not found
      </p>
      <div className='mt-4 flex flex-wrap items-center justify-center gap-3'>
        <Button
          type="button"
          onClick={navigateToHomePage}
          className="min-w-[180px] flex-1 whitespace-nowrap py-6 text-base font-medium" >
          Go to Homepage
        </Button>
        <Button
          type="button"
          onClick={navigateToBack}
          className="min-w-[180px] flex-1 whitespace-nowrap bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          Go Back
        </Button>
      </div>
    </div>
  )
}

export default NotFound