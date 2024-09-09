'use client';

import { motion } from 'framer-motion';
import { headerVariants, staggerContainer, textVariant } from '../../types/motion';
import Footer from './../../components/Footer';
import AboutPage from './../pages/about';
import PortfolioPage from './../pages/portfolio';
import { useState, useEffect } from 'react';

type MediaItem = {
  id: number;
  url: string;
  public_id: string;
  secure_url: string;
  resource_type: string;
  title: string;
};

export default function HomePage() {
  const [media, setMedia] = useState<MediaItem[]>([]);

  useEffect(() => {
    // Fetch media data from an API or other source
    fetch('/api/media')
      .then((response) => response.json())
      .then((data) => setMedia(data))
      .catch((error) => console.error('Error fetching media:', error));
  }, []);

  return (
      <div
        className='bg-top h-screen text-white'
        style={{
          background: 'url(/images/bg.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          zIndex: '-100',
        }}>
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
          className='container p-4 mx-auto flex fle justify-between items-center h-screen'>
          <motion.div
            className='flex flex-col'
            variants={staggerContainer(0.1, 0.9)}
            initial='hidden'
            animate='show'
            viewport={{ once: false, amount: 0.15 }}>
            <motion.h1
              variants={textVariant(0.2)}
              className='text-6xl font-extrabold py-2 font-mono'>
              Ahoj, som
            </motion.h1>
            <motion.p
              variants={textVariant(0.6)}
              className='text-2xl font-semibold pb-6 text-red-500'>
              Tvorca medialného obsahu
            </motion.p>

            <motion.p
              variants={textVariant(0.8)}
              className='w-1/2 min-w-80'>
              Som kreatívna hlava s množstvom nápadov, ktoré sa snažím pretvoriť do videí. Tvoreniu
              amatérskych videí sa venujem približne 3 roky a stále ma to neprestalo baviť!
            </motion.p>
            <motion.button
              variants={textVariant(1)}
              className='bg-black opacity-100 p-2 my-8 w-36 rounded-xl  hover:bg-neutral-950 transition-all'>
              <a
                className='hover:opacity-75'
                href='mailto:info@example.com'>
                Napíš mi.
              </a>
            </motion.button>
          </motion.div>
        </motion.div>
        <AboutPage />
        <PortfolioPage media={media} />
        <Footer />
      </div>
    
  );
}
