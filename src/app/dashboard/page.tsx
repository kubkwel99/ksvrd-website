'use client';
import { useState, useEffect } from 'react';
import { isAuthenticated, updatePassword } from './../../../utils/auth';
import { getUser } from './../../../utils/userData';
import { useRouter } from 'next/navigation';
import UploadComponent from './../../../components/UploadComponents';
import ErrorDisplay from './../error';

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    } else {
      const user = getUser();
      setUsername(user.username);
    }
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword) {
        try {
          updatePassword(username, newPassword);
          alert('Heslo bolo úspešne zmenené!');
          setNewPassword('');
        } catch (error) {
          setError('Nastala chyba pri zmene hesla. Skúste to prosím znova.');
        }
      } else {
        setError('Zadajte nové heslo.');
      }
    };
    const handleResetError = () => {
        setError(null); 
    }
  return (
    <div className='container pt-40 mx-auto p-4 flex flex-col items-center'>
      <h1 className='text-3xl mb-4'>Dashboard</h1>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-2xl mb-4'>Zmeniť heslo</h2>
        {error && <ErrorDisplay error={new Error(error)} reset={handleResetError} />}

        <form onSubmit={handleUpdate}>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='username'>
              Prihlasovacie meno
            </label>
            <input
              type='text'
              id='username'
              value={username}
              readOnly
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200'
            />
          </div>

          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='newPassword'>
              Nové heslo
            </label>
            <input
              type='password'
              id='newPassword'
              placeholder='********'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 transition-all text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Zmeň heslo
            </button>
          </div>
        </form>
      </div>
      <UploadComponent />
    </div>
  );
}
