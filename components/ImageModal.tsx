/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ImageModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-white p-4">
        <button onClick={onClose} className="absolute right-2 top-2 text-black">
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default ImageModal;