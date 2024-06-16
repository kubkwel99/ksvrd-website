/** @format */

import { motion } from 'framer-motion';
import React from 'react';
import {
  fadeIn,
  slideIn,
  staggerChildren,
  textVariant2,
  zoomIn
} from '../assets/motion';
import imgSrc from '../assets/img/ksvrd.png';

const AboutPage: React.FC = () => {
  return (
    <>
      <a className='anchor absolute' id='about'></a>
      <motion.div className='bg-gray-100 text-center text-black py-40'>
        <motion.div
          variants={staggerChildren}
          initial='hidden'
          whileInView='show'
          transition={{
            duration: 0.5,
            delay: 0.9,
            ease: 'easeOut',
            loop: Infinity,
          }}
          viewport={{ once: false, amount: 0.25 }}
          className='flex flex-row justify-between items-center mx-auto w-full max-w-screen-xl m-auto'>
          <div className='gap-4 flex flex-col items-start'>
            <a
              href='https://www.facebook.com'
              className='mr-4'>
              <i className='fab fa-facebook text-black text-lg hover:text-blue-500'></i>
            </a>
            <a
              href='https://www.tiktok.com'
              className='mr-4'>
              <i className='fab fa-tiktok text-black text-lg hover:text-pink-500'></i>
            </a>
            <a
              href='https://www.instagram.com'
              className='mr-4'>
              <i className='fab fa-instagram text-black text-lg hover:text-purple-500'></i>
            </a>
            <a href='mailto:info@example.com'>
              <i className='fas fa-envelope text-black text-lg hover:text-red-500'></i>
            </a>
          </div>

          <div className='z-50'>
            <h3 className='text-2xl'>Ahoj som</h3>
            <h1 className='text-5xl font-medium '>Kristína Svoradová</h1>
            <h3 className='text-2xl text-yellow-600'>Tvorca medialného obsahu</h3>
            <div className='flex flex-row pt-9 justify-center gap-6 z-10'>
              <motion.button
                variants={slideIn('up', 'tween', 0.3, 0)}
                className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center duration-300 '>
                <svg
                  className='fill-current w-4 h-4 mr-2'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'>
                  <path d='M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z' />
                </svg>
                <a
                  href='https://www.autobazar.sk/dokumenty/kupno-predajna-zmluva.pdf'
                  target='_blank'
                  download>
                  Stiahni si moje CV.
                </a>{' '}
              </motion.button>
              <motion.button
                variants={slideIn('up', 'tween', 0.5, 0)}
                className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow duration-300'>
                <a href='mailto:info@example.com'>Nápíš mi.</a>
              </motion.button>
            </div>
          </div>

          <div className='flex flex-col items-end'>
            <p>
              S<br />C <br />
              R<br />
              O<br />
              L<br />
              L<br />
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={staggerChildren}
          initial='hidden'
          whileInView='show'
          transition={{
            duration: 0.5,
            delay: 0.5,
            ease: 'easeOut',
            loop: Infinity,
          }}
          viewport={{ once: false, amount: 0.5 }}
          className='py-8 flex flex-col items-center '>
          <motion.div
            variants={fadeIn('down', 'tween', 0.67, 0.5)}
            className='pb-20'>
            <p>Bližie informácie</p>
            <p className='text-2xl text-yellow-600'>Čo by si chcel o mne vedieť?</p>
          </motion.div>

          <div className='flex flex-col  md:flex-row'>
            <motion.img
              variants={textVariant2}
              className='max-w-xs rounded-lg mx-auto shrink-0 sm:max-w-sm'
              src={imgSrc}
              alt='Kristína Svoradová'
            />
            <div className='items-center justify-center flex flex-col p-8 gap-8 md:items-start'>
              <div className='flex flex-row gap-4'>
                <motion.div
                  variants={zoomIn(0.6, 0.3)}
                  className='max-w-sm rounded-lg overflow-hidden shadow-xl w-60 py-6 bg-yellow-500 cursor-pointer'>
                  <i className='fa-solid fa-medal '></i>
                  <h2 className='pt-4 font-medium'>Skúsenosti</h2>
                  <p>1 rok</p>
                </motion.div>

                <motion.div
                  variants={zoomIn(0.7, 0.1)}
                  className=' max-w-sm rounded-lg  overflow-hidden shadow-xl w-60 py-6 bg-yellow-400 cursor-pointer'>
                  <i className='fa-solid fa-diagram-project'> </i>
                  <h2 className='pt-4 font-medium'>Projekty</h2>
                  <a href='#portfolio'>???</a>
                </motion.div>
              </div>

              <motion.p
                variants={slideIn('right', 'tween', 0.75, 0.5)}
                className='w-96 text-left'>
                Som kreatívna hlava s množstvom nápadov, ktoré sa snažím pretvoriť do videí.
                Tvoreniu amatérskych videí sa venujem približne 3 roky a stále ma to neprestalo
                baviť!
              </motion.p>
              <motion.button
                variants={slideIn('right', 'tween', 1, 0)}
                className=' bg-white w-60 hover:bg-gray-100 text-gray-800 font-semibold py-2 border border-gray-400 rounded-lg shadow duration-300'>
                <a href='mailto:info@example.com'>Nápíš mi.</a>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AboutPage;
