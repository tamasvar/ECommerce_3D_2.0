import { useEffect } from 'react';
import { IoCloseCircleSharp } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, children, onSave }: any) => {

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
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-[999]"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-50 dark:bg-black rounded-lg py-6 max-w-lg w-full">
        <div className="flex justify-between items-center px-6 border-b pb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-600 focus:outline-none"
            onClick={onClose}
          >
            <IoCloseCircleSharp className='w-[24px] h-[24px]' />
          </button>
        </div>
        <div className="overflow-auto max-h-96 px-6">
          {children}
        </div>
        <div className="mt-6 text-right px-6">
          <button
            type='button'
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button onClick={() => { onSave(); onClose(); }} type='button' className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-4 hover:bg-blue-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
