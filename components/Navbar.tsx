'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { isAuthenticated, logout } from './../utils/auth';
import LoginPopup from './LoginPopUp';
import { useRouter } from 'next/navigation';
import { FaRegUser, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { slideUp } from './../types/motion';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      className='bg-neutral-700 text-white fixed w-full top-0 left-0 shadow-black shadow-sm py-6 z-50'>
      <div className='container flex items-center justify-between m-auto px-4'>
        <h1 className='text-white font-bold cursor-pointer'>@ksvrd</h1>

        <div className='ml-auto text-lg pr-4 flex'>
          <button
            className='text-white text-2xl md:hidden'
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <ul className='hidden md:flex md:flex-row md:items-center md:gap-5 text-lg'>
            <li>
              <Link
                legacyBehavior
                href='/'>
                <a className='hover:text-neutral-400'>Domov</a>
              </Link>
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
        {/* Authentication Section */}
        <div className='flex items-center'>
          {isLoggedIn ? (
            <>
              <Link
                legacyBehavior
                href='/dashboard'>
                <a className='text-white text-lg mx-4'>
                  <FaRegUser />
                </a>
              </Link>
              <button
                onClick={handleLogout}
                className='bg-red-500 text-white px-2 rounded-md hover:bg-red-700'>
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowLoginPopup(true)}
              className='text-lg rounded-md hover:opacity-75 hover:text-red-500'>
              Login
            </button>
          )}
        </div>
      </div>

      {/* Collapsed Menu for Mobile */}
      {isMenuOpen && (
        <ul className='flex flex-col items-center mt-4 space-y-4 md:hidden'>
          <li>
            <Link
              legacyBehavior
              href='/'>
              <a className='hover:text-neutral-400'>Domov</a>
            </Link>
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
      )}

      {showLoginPopup && <LoginPopup closePopup={() => setShowLoginPopup(false)} />}
    </motion.nav>
  );
}
