// import bgImage from '@/public/logo.webp';

const PurchaseProcess = () => {
  return (
    <div
      className="relative px-4 text-center"
      style={{
        // backgroundImage: `url(${bgImage.src})`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50" style={{ borderRadius: '10px' }}></div>
      <div className="relative mx-auto mt-4 max-w-3xl rounded-lg bg-white bg-opacity-85 p-6 text-base dark:bg-black dark:bg-opacity-85">
        <p className="text-lg text-black dark:text-white">
          Explore Sultry3DPrints for a wide selection of high-quality 3D printed figurines and statues. Our collection includes NSFW 3D printed figurines, adult-themed miniatures, and anime-inspired designs.
        </p>
        <p className="text-lg font-bold text-black dark:text-white">
          Choose the model you want and proceed to checkout. You can pay securely with Stripe. Please note, only registered users can pay with PayPal.
        </p>
        <p className="text-lg text-black dark:text-white">
          After your purchase, you will receive an email confirming your order. Our typical processing time is 1-2 weeks.
        </p>
      </div>
    </div>
  );
}

export default PurchaseProcess;
