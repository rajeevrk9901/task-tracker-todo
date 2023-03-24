import React, { useState, useEffect } from 'react';

function Toast({ message, onClose }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
      onClose();
    }, 6000);

    return () => {
      clearTimeout(timeout);
    };
  }, [onClose]);

  return (
    <div className={`z-40 fixed top-4 translate-x-1/2 right-1/2 bg-green-700 rounded-md shadow-md py-2 px-4 transition-opacity ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-white">{message}</p>
        <button onClick={() => setShow(false)} className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Toast;