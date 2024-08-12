import { useEffect } from 'react';
import { IoCloseCircleSharp } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, children, onSave, isValid }: any) => {

  useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleBackdropClick = (event: any) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-500"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-lg rounded-lg bg-gray-50 py-6 dark:bg-black">
        <div className="flex items-center justify-between border-b px-6 pb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-600 focus:outline-none"
            onClick={onClose}
          >
            <IoCloseCircleSharp className='size-[24px]' />
          </button>
        </div>
        <div className="max-h-96 overflow-auto px-6">
          {children}
        </div>
        <div className="mt-6 px-6 text-right">
          <button
            type='button'
            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button onClick={() => { if (isValid) { onSave(); onClose(); } }} type='button' className={`ml-4 rounded-lg px-4 py-2 text-white ${isValid ? 'bg-blue-500 hover:bg-blue-600' : 'cursor-not-allowed bg-gray-400'}`} disabled={!isValid}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
