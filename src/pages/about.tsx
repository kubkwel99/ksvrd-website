'use client';
import React from 'react';
import { SiGmail } from 'react-icons/si';
import { AiFillFacebook, AiFillInstagram, AiFillTikTok } from 'react-icons/ai';
import { motion } from 'framer-motion';
import {
  headerVariants,
  slideIn,

  textVariant,
} from './../../types/motion';

const AboutPage = () => {
  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.9,
      },
    },
  };

  const images = {
    hidden: {
      opacity: 0,
      x: 30,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      variants={headerVariants}
      initial='hidden'
      whileInView='show'
      transition={{
        duration: 0.1,
        delay: 0.1,
        ease: 'easeInOut',
        loop: Infinity,
      }}
      viewport={{ once: false, amount: 0.5 }}
      className='flex flex-col h-screen justify-center items-center text-black '
      id='about'
      style={{
        boxShadow: 'inset 0 17px 19px -7px ',
      }}>
      <div className=' container px-0 flex sm:flex-col lg:px-40'>
        <div className=' flex flex-col  '>
          <div className=' items-center sm:flex flex-row justify-between p-4'>
            <img
              className='mx-auto shadow-xl rounded-md'
              width={'320px'}
              src='/9C2BB54D-9B48-46F0-A630-720E90BE8F89.jpeg'
              alt=''
            />
            <div className='flex flex-col items-center grow gap-2 p-3'>
              <div className='max-w-xl text-center py-8 '>
                <motion.h1
                  variants={textVariant(0.4)}
                  className='font-serif text-3xl font-bold'>
                  Kristína Svoradová
                </motion.h1>
                <motion.h2
                  variants={textVariant(0.6)}
                  className='text-xl pb-6 text-red-500'>
                  Content Creator
                </motion.h2>
                <motion.p variants={textVariant(0.8)}>
                  Stačí mi dať tému, produkt alebo myšlienku a ja všetko krok za krokom pretvorím v
                  hotový výstup, ktorý vám odovzdám.
                </motion.p>
                <motion.p variants={textVariant(1.0)}>
                  Na svojej tvorbe si potrpím, aby boli moji odberatelia spokojní.
                </motion.p>
              </div>
            </div>
          </div>
          <motion.div
            variants={slideIn('down', 'tween', 0.5, 0.5)}
            className=' flex items-center justify-center gap-12 max-w-90 sm:justify-between px-16 py-2 w-3/6 mx-auto'>
            <a
              href='https://www.facebook.com/kika.svoradova?locale=sk_SK'
              className='text-4xl  hover:scale-110 transition-all'>
              <AiFillFacebook />
            </a>
            <a
              href='https://www.instagram.com/svoradova.k/'
              className='text-4xl  hover:scale-110 transition-all'>
              <AiFillInstagram />
            </a>
            <a
              href='https://www.tiktok.com/@krsvrd'
              className='text-4xl  hover:scale-110 transition-all'>
              <AiFillTikTok />
            </a>
            <a
              href='mailto:kika.svoradova26@gmail.com'
              className='text-4xl  hover:scale-110 transition-all'>
              <SiGmail />
            </a>
          </motion.div>
          <motion.div
            variants={slideIn('down', 'tween', 0.7, 0.7)}
            className='flex gap-5 flex-col items-center justify-center p-6 sm:flex-row'>
            <button className='bg-neutral-300 p-2 px-4 rounded-2xl shadow-xl  hover:bg-neutral-500 transition-all'>
              <a
                className=''
                href='mailto:kika.svoradova26@gmail.com'>
                Napíš mi...
              </a>
            </button>
            <button className='bg-neutral-300 p-2 px-4 rounded-2xl shadow-xl  hover:bg-neutral-500 transition-all'>
              <a
                className=''
                href='/kristina-svoradova-sk-cv-3.pdf'
                download>
                Moje CV
              </a>
            </button>
          </motion.div>
        </div>
      </div>
      {/* <motion.div
        variants={headerVariants}
        initial='hidden'
        whileInView='show'
        transition={{
          duration: 0.1,
          delay: 0.1,
          ease: 'easeInOut',
          loop: Infinity,
        }}
        viewport={{ once: false, amount: 0.5 }}
        className='flex items-center justify-bwe sm:container px-4 flex-col '>
        <div className='flex flex-col justify-between text-center sm:grid grid-flow-col items-center md:justify-between '>
          <motion.img
            variant={images}
            src='/9C2BB54D-9B48-46F0-A630-720E90BE8F89.jpeg'
            alt=''
            className='shadow-2xl rounded-2xl max-w-72 m-2'
          />

          <div className='flex flex-col justify-center sm:w-2/4  '>
            <motion.h1
              variants={textVariant(0.4)}
              className='text-4xl pb-4 font-bold font-serif  '>
              Kristína Svoradová
            </motion.h1>
            <motion.h2
              variants={textVariant(0.6)}
              className='text-2xl pb-2 text-red-500 '>
              Content Creator{' '}
            </motion.h2>
            <motion.p
              variants={textVariant(0.8)}
              className=''>
              Stačí mi dať tému, produkt alebo myšlienku a ja všetko krok za krokom pretvorím v
              hotový výstup, ktorý vám odovzdám.
            </motion.p>
            <motion.p variants={textVariant(1.0)}>
              Na svojej tvorbe si potrpím, aby boli moji odberatelia spokojní.
            </motion.p>
          </div>
        </div>

        <div className='flex sm:w-3/4 max-w-screen-md flex-col items-center p-4'>
          <motion.div
            variants={slideIn('down', 'tween', 0.5, 0.5)}
            className='w-full sm:flex items-center justify-between px-16 py-2 gap-6 rounded-md'>
            <a
              href='https://www.facebook.com/kika.svoradova?locale=sk_SK'
              className='text-4xl  hover:scale-110 transition-all'>
              <AiFillFacebook />
            </a>
            <a
              href='https://www.instagram.com/svoradova.k/'
              className='text-4xl  hover:scale-110 transition-all'>
              <AiFillInstagram />
            </a>
            <a
              href='https://www.tiktok.com/@krsvrd'
              className='text-4xl  hover:scale-110 transition-all'>
              <AiFillTikTok />
            </a>
            <a
              href='mailto:kika.svoradova26@gmail.com'
              className='text-4xl  hover:scale-110 transition-all'>
              <SiGmail />
            </a>
          </motion.div>

          <motion.div
            variants={slideIn('down', 'tween', 0.7, 0.7)}
            className='flex flex-row gap-20 py-20 '>
            <button className='hover:scale-110 transition-all'>
              <a
                className='p-2 px-4 bg-white rounded-xl font-semibold shadow-gray-400 shadow-md'
                href='mailto:kika.svoradova26@gmail.com'>
                Napíš mi...
              </a>
            </button>

            <button className='hover:scale-110 transition-all'>
              <a
                className='p-2 px-4 bg-white rounded-xl font-semibold shadow-gray-400 shadow-md'
                href='/kristina-svoradova-sk-cv-3.pdf'
                download>
                Moje CV
              </a>
            </button>
          </motion.div>
        </div>
      </motion.div> */}
    </motion.div>
  );
};

export default AboutPage;
