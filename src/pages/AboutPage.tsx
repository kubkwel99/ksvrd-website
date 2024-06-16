/** @format */

import React from 'react';
import './AboutPage.scss';

const About = () => {
  return (
    <div
      className='bg-white flex m-auto'
      style={{
        height: '100vh',
      }}>
      <section className='section flex flex-row gap-8 items-center justify-center m-auto'>
        <div className='leftSide flex flex-col text-left w-2/3'>
          <h2 className=''>Som</h2>
          <h1>Kristína Svoradová</h1>
          <p className='w-1/2 '>
            Som kreatívna hlava s množstvom nápadov, ktoré sa snažím pretvoriť do videí. Tvoreniu
            amatérskych videí sa venujem približne 3 roky a stále ma to neprestalo baviť!{' '}
          </p>
        </div>
        <div className='centerSide absolute '>
          <p className='text-white text-9xl flex mt-80 justify-center'>kikulik</p>
        </div>
        <div className='rightSide flex flex-col text-left w-1/3'>
          <p>
            Pozrite si moje{' '}
            <a
              className='text-black font-bold'
              href='#Portfolio'>
              portfolio
            </a>{' '}
            a ak Vás moja tvorba zaujme neváhajte ma kontaktovať
          </p>
          <div className='flex gap-3'>
            <a href=''>
              <i className='fa-brands fa-facebook'></i>
            </a>
            <a href=''>
              <i className='fa-brands fa-instagram'></i>
            </a>
            <a href=''>
              <i className='fa-brands fa-tiktok'></i>
            </a>
            <a href=''>
              <i className='fa-solid fa-envelope'></i>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
