import { siteConfig } from '@/config/site';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';

const PurchaseProcess2 = () => {
  return (
    <div 
      className="relative px-4 text-center" 
      style={{ 
        backgroundImage: 'url("/logo.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50" style={{ borderRadius: '10px' }}></div>
      <div className="relative mx-auto mt-4 max-w-3xl rounded-lg bg-white bg-opacity-85 p-6 text-base dark:bg-black dark:bg-opacity-85">
        <p className="text-lg text-black dark:text-white">
          You can find the complete list of available models at the following link:
        </p>
        <p className="text-lg font-bold text-red-600">
          <a href="https://sites.google.com/view/modelscatalogue/" target="_blank" rel="noopener noreferrer">
            Click here for the Catalogue &rarr; Models Catalogue
          </a>
        </p>
        <p className="text-lg text-black dark:text-white">
          For custom requests, you can order painted models or request size modifications, which may affect the price. Contact us for custom orders:
        </p>
        <p className="text-lg font-bold text-red-600">
          <a href="mailto:info@sultry3dprints.com" style={{ fontWeight: 'bold' }}>info@sultry3dprints.com</a>
        </p>
        <p className="text-lg text-black dark:text-white">
          If you have any questions or need assistance, feel free to send us a direct message:
        </p>
        <div className="flex items-center justify-center space-x-6">
          <a href="https://www.facebook.com/Sultry3DPrints" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-2xl text-red-600" />
          </a>
          <a href="https://twitter.com/sultry3dprints" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl text-red-600" />
          </a>
          <a href="https://www.instagram.com/Sultry3DPrints" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl text-red-600" />
          </a>
          <a href="https://www.tiktok.com/@Sultry3DPrints" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="text-2xl text-red-600" />
          </a>
        </div>
        
      </div>
      </div>
  
  );
}

export default PurchaseProcess2;
