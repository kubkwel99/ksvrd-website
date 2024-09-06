'use client'; 

import React, { useState, useContext } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { AuthContext } from './../src/contexts/AuthContext';

const UploadComponent: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { isAuthenticated } = authContext;
  const [uploadMessage, setUploadMessage] = useState<string>('');

  if (!isAuthenticated) {
    return <p>Prihlás sa ak chceš nahrať súbor.</p>;
  }

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      onSuccess={(result) => {
        console.log('Upload successful:', result);
        setUploadMessage('Nahratie úspešné!');
      }}
      onError={(error) => {
        console.error('Upload error:', error);
        setUploadMessage('Problém. Skús znova.');
      }}>
      {({ open }) => (
        <div className='flex flex-col items-center '>
          <button
            className='text-xl bg-yellow-500 px-2 rounded-lg hover:bg-yellow-600 transition-300'
            onClick={() => open()}>
            Nahrať súbor. <br />
          </button>
          {uploadMessage && (
            <p>
              <br /> {uploadMessage}
            </p>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default UploadComponent;
