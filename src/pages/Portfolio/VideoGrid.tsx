/** @format */

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import './VideoPlayer.scss';
import { Video, videos } from './VideoArray';
import { useVideoFunctions } from './videoFunctions';
import { fadeIn, staggerChildren, zoomIn } from '../../assets/motion';

const VideoGrid: React.FC = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const { selectedVideo, playVideo, closeVideo, handlePrevVideo, handleNextVideo } =
    useVideoFunctions();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVideoPlaying(false);
        closeVideo();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [closeVideo]);

  useEffect(() => {
    const bodyElement = document.body;
    bodyElement.style.overflow = isVideoPlaying ? 'hidden' : 'auto';
    return () => {
      bodyElement.style.overflow = 'auto';
    };
  }, [isVideoPlaying]);

  const handleVideoPlay = (video: Video) => {
    setIsVideoPlaying(true);
    playVideo(video);
  };

  const handleVideoClose = () => {
    setIsVideoPlaying(false);
    closeVideo();
  };

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <>
      <a
        className='anchor absolute'
        id='portfolio'></a>
      <div className='text-center flex flex-col py-20'>
        <motion.h1
          initial='hidden'
          whileInView='show'
          variants={fadeIn('down', 'tween', 0.6, 0.5)}
          className='pb-20 text-5xl'>
          Moje Portfolio
        </motion.h1>

        <motion.div
          variants={staggerChildren}
          initial='hidden'
          whileInView='show'
          transition={{
            duration: 0.1,
            delay: 0.1,
            ease: 'easeOut',
            loop: Infinity,
          }}
          viewport={{ once: false, amount: 0.25 }}
          className='grid grid-cols-3 place-items-center gap-1 m-auto'
          style={{ maxWidth: 'auto' }}>
          {videos.map((video) => (
            <motion.div
              key={video.id}
              className='w-150 h-150'>
              <motion.video
                variants={zoomIn((video.id + 1) * 0.2, 0.5)}
                src={video.url}
                className='cursor-pointer w-72 h-auto object-cover'
                style={{ aspectRatio: '1 / 1' }}
                onClick={() => handleVideoPlay(video)}
                data-type='video/mp4'
              />
            </motion.div>
          ))}
        </motion.div>
        {selectedVideo && (
          <motion.div
            variants={variants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.1, duration: 0.2 }}
            id='videoPlayer'
            className='fixed top-0 left-0 z-10 w-screen h-screen flex flex-nowrap items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm'>
            <div
              className='containerDiv relative bg-black flex flex-row flex-nowrap z-50 mx-40 w-6/12'
              style={{ overflowX: 'visible' }}>
              <video
                style={{ maxWidth: '550px', minWidth: '350px' }}
                src={selectedVideo.url}
                autoPlay
                controls
                onPause={() => setIsVideoPlaying(false)}
                data-type='video/mp4'
              />
              <div className='textDiv flex flex-col flex-nowrap items-start p-6 pb-1 h-auto'>
                <h1 className='text-5xl mb-4 underline'>{selectedVideo.title}</h1>
                <p className='text-base text-left'>{selectedVideo.desc}</p>

                <div
                  className='flex gap-4 text-2xl items-end justify-start'
                  style={{ marginTop: 'auto' }}>
                  <motion.a
                    animate={{
                      scale: [1, 2, 2, 1, 1],
                      rotate: [0, 0, 180, 180, 0],
                      borderRadius: ['0%', '0%', '30%', '30%', '0%'],
                    }}
                    transition={{
                      duration: 2,
                      ease: 'easeInOut',
                      times: [0, 0.2, 0.5, 0.8, 1],
                      repeat: 0,
                      repeatDelay: 1,
                    }}
                    className=''
                    href='https://www.facebook.com'>
                    <i className='fa-brands fa-facebook hover:text-gray-400 duration-300'></i>
                  </motion.a>
                  <motion.a
                    animate={{
                      scale: [1, 2, 2, 1, 1],
                      rotate: [0, 0, 180, 180, 0],
                      borderRadius: ['0%', '0%', '30%', '30%', '0%'],
                    }}
                    transition={{
                      duration: 2,
                      ease: 'easeInOut',
                      times: [0, 0.2, 0.5, 0.8, 1],
                      repeat: 0,
                      repeatDelay: 1,
                    }}
                    href='https://www.instagram.com'>
                    <i className='fa-brands fa-instagram hover:text-gray-400 duration-300'></i>
                  </motion.a>
                  <motion.a
                    animate={{
                      scale: [1, 2, 2, 1, 1],
                      rotate: [0, 0, 180, 180, 0],
                      borderRadius: ['0%', '0%', '30%', '30%', '0%'],
                    }}
                    transition={{
                      duration: 2,
                      ease: 'easeInOut',
                      times: [0, 0.2, 0.5, 0.8, 1],
                      repeat: 0,
                      repeatDelay: 1,
                    }}
                    href='https://www.tiktok.com'>
                    <i className='fa-brands fa-tiktok hover:text-gray-400 duration-300'></i>
                  </motion.a>
                  <motion.a
                    animate={{
                      scale: [1, 2, 2, 1, 1],
                      rotate: [0, 0, 180, 180, 0],
                      borderRadius: ['0%', '0%', '30%', '30%', '0%'],
                    }}
                    transition={{
                      duration: 2,
                      ease: 'easeInOut',
                      times: [0, 0.2, 0.5, 0.8, 1],
                      repeat: 0,
                      repeatDelay: 1,
                    }}
                    href='mailto:info@example.com'>
                    <i className='fa-solid fa-envelope hover:text-gray-400 duration-300'></i>
                  </motion.a>
                </div>
              </div>

              <div className='preferences'>
                <button
                  className='leftBtn absolute -translate-x-2/4 -translate-y-2/4 top-1/2 -left-16 p-2 rounded-full text-white text-3xl text-opacity-5 hover:text-opacity-60 duration-500'
                  onClick={handlePrevVideo}>
                  <i className='fa-solid fa-circle-left'></i>
                </button>
                <button
                  className='rightBtn absolute -translate-x-2/4 -translate-y-2/4 top-1/2 -right-24 p-2 rounded-full text-white text-3xl text-opacity-5 hover:text-opacity-60 duration-500'
                  onClick={handleNextVideo}>
                  <i className='fa-solid fa-circle-right'></i>
                </button>
                <button
                  className='absolute translate-x-2/4 -translate-y-2/4 right-5 top-5 p-2 rounded-full text-white'
                  onClick={handleVideoClose}>
                  <i className='fa-solid fa-circle-xmark'></i>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default VideoGrid;
