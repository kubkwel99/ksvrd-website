import { useState } from 'react';
import { login } from './../utils/auth';
import ErrorDisplay from './../src/app/error';

interface LoginPopupProps {
  closePopup: () => void;
}

const LoginPopup = ({ closePopup }: LoginPopupProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (login(email, password)) {
      closePopup();
      window.location.reload();
    } else {
      setError('Zlé údaje zadané.');
    }
  };

  const handleResetError = () => {
    setError(null);
  };

  return (
    <div className='fixed inset-0 text-black bg-gray-600 bg-opacity-75 flex justify-center items-center'>
      <div className='bg-white p-8 rounded shadow-lg'>
        {error && (
          <ErrorDisplay
            error={new Error(error)}
            reset={handleResetError}
          />
        )}
        {!error && (
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-sm font-bold mb-2'>
                Prihlasovacie meno
              </label>
              <input
                type='text'
                id='email'
                className='border p-2 w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block text-sm font-bold mb-2'>
                Heslo
              </label>
              <input
                type='password'
                id='password'
                className='border p-2 w-full'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='flex justify-end'>
              <button
                type='submit'
                className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
                Prihlásiť
              </button>
              <button
                type='button'
                onClick={closePopup}
                className='bg-red-500 text-white p-2 rounded ml-2 hover:bg-red-600'>
                Zrušiť
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
