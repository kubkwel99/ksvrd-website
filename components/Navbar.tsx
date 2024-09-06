'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { isAuthenticated, logout } from './../utils/auth';
import LoginPopup from './LoginPopUp';
import { useRouter } from 'next/navigation';

import { FaRegUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {  slideUp } from './../types/motion';

export default function Navbar(this: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    router.push('/');
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.nav
      variants={slideUp}
      initial='offscreen'
      animate='onscreen'
      className='bg-neutral-700 text-white fixed w-full top-0 left-0 shadow-black shadow-sm py-6 z-50 '>
      <div className='container flex flex-row items-center justify-between m-auto px-4'>
        <div className=''>
          <h1 className='float-left text-white font-bold cursor-pointer '>@ksvrd</h1>
        </div>

        <div className='ml-auto text-lg'>
          <ul className='flex flex-row px-5 gap-5'>
            <li>
              <a
                className='hover:text-neutral-400'
                href='/'>
                Domov
              </a>
            </li>
            <li>
              <button
                className='hover:text-neutral-400'
                onClick={() => scrollToSection('about')}>
                O mne
              </button>
            </li>
            <li>
              <button
                className='hover:text-neutral-400'
                onClick={() => scrollToSection('portfolio')}>
                Portfolio
              </button>
            </li>
          </ul>
        </div>

        <div className='flex items-center justify-center '>
          {isLoggedIn ? (
            <>
              <Link
                href='/dashboard'
                legacyBehavior>
                <a className='text-white text-lg mx-4'>
                  <FaRegUser />
                </a>
              </Link>
              <button
                onClick={handleLogout}
                className='bg-red-500 text-white px-2  rounded-md hover:bg-red-700'>
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowLoginPopup(true)}
              className=' text-lg  rounded-md hover:opacity-75 hover:text-red-500'>
              Login
            </button>
          )}
        </div>
      </div>
      {showLoginPopup && <LoginPopup closePopup={() => setShowLoginPopup(false)} />}
    </motion.nav>
  );
}
