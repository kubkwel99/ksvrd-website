import React from 'react';
import './../styles/globals.css';
const Preloader: React.FC = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-neutral-800 z-50 transition-all'>
      <div className='flex items-center justify-center '>
        <div className='animate-spin rounded-full h-32 w-32 border-t-4 border-red-500 border-solid transition-all'></div>
      </div>
    </div>
  );
};

export default Preloader;


