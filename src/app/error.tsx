'use client';

import React from 'react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Ooou. Niečo sa pokazilo.</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={reset
        }>
        Skús to znova!
      </button>
    </div>
  );
}
