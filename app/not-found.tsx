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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="mt-5 mb-3">
        <Image
          width={256}
          height={156}
          alt="not-found"
          src={notFoundImage}
          className="w-64 h-auto"
        />
      </div>
      <p className="text-center text-xl font-bold text-primary-text mb-1">
        Oops, this page is not found
      </p>
      <p className="text-center text-secondary-text mb-2 mx-auto px-4 md:px-10 max-w-[700px]">
        Explore Sultry3DPrints for a wide selection of high-quality 3D printed figurines and statues. Our collection includes NSFW 3D printed figurines, adult-themed miniatures, and anime-inspired designs.
      </p>
      <div className='flex gap-3 justify-center items-center flex-wrap mt-4'>
        <Button
          type="button"
          onClick={navigateToHomePage}
          className="flex-1 min-w-[180px] whitespace-nowrap py-6 text-base font-medium" >
          Go to Homepage
        </Button>
        <Button
          type="button"
          onClick={navigateToBack}
          className="flex-1 min-w-[180px] whitespace-nowrap bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          Go Back
        </Button>
      </div>
    </div>
  )
}

export default NotFound