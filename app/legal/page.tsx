// pages/legal.tsx

import React from 'react';

const LegalPage: React.FC = () => {
  return (
    <div className="px-4 pt-20 text-center">
      <h1 className="text-4xl font-extrabold tracking-normal">Welcome to Our Website</h1>
      <div className="mx-auto mt-4 max-w-3xl text-base">
        <h2 className="underline">About Us:</h2>
        <p>
          Welcome to our website! We are dedicated to providing high-quality products and excellent customer service.
        </p>

        <h2 className="mt-4 underline">Terms & Conditions:</h2>
        <p>
          Read our terms and conditions carefully before using our services. By using our services, you agree to abide by these terms.
        </p>

        <h2 className="mt-4 underline">Shipping & Return Policy:</h2>
        <p>
          Learn about our shipping process and return policy. We strive to make your shopping experience smooth and hassle-free.
        </p>

        <h2 className="mt-4 underline">Privacy Policy:</h2>
        <p>
          Your privacy is important to us. Read our privacy policy to understand how we collect, use, and protect your personal information.
        </p>

        <h2 className="mt-4 underline">Frequently Asked Questions (FAQ):</h2>
        <p>
          Find answers to common questions about our products, services, and ordering process. If you have more questions, feel free to contact us.
        </p>
      </div>
    </div>
  
  );
};

export default LegalPage;
