/** @format */
import { motion } from 'framer-motion';
import { slideUp, slide } from './../assets/motion';
import React from 'react';

const HomePage = () => {
  return (
    <motion.div
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: false, amount: 0.8 }}
      className='container h-screen '>
      <section
        className='homeSection absolute'
        style={{
          top: '10%',
          left: '50%',
          transform: 'translate(-50%, 100%)',
        }}>
        <motion.h1
          variants={slideUp}
          style={{
            fontSize: '12rem',
          }}>
          Ahoj.
        </motion.h1>
        <motion.p
          variants={slide}
          className='absolute'
          style={{ letterSpacing: '1.5px', top: '84.5%', left: '1%' }}>
          Toto je moje portfólio
        </motion.p>
      </section>
    </motion.div>
  );
};

export default HomePage;
