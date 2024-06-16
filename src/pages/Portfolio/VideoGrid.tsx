/** @format */

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import './VideoPlayer.scss';
import { Video, videos } from './VideoArray';
import { useVideoFunctions } from './videoFunctions';
import { fadeIn, staggerChildren, zoomIn } from '../../assets/motion';
import VideoPlayer from './VideoPlayer';

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
      <a className='anchor absolute' id='portfolio'></a>
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
            <motion.div key={video.id} className='w-150 h-150'>
              <motion.video
                variants={zoomIn((video.id + 1) * 0.2, 0.5)}
                className='cursor-pointer w-72 h-auto object-cover'
                style={{ aspectRatio: '1 / 1' }}
                onClick={() => handleVideoPlay(video)}
              >
                <source src={video.url} type='video/mp4' />
              </motion.video>
            </motion.div>
          ))}
        </motion.div>
        {selectedVideo && (
          <VideoPlayer
            selectedVideo={selectedVideo}
            handlePrevVideo={handlePrevVideo}
            handleNextVideo={handleNextVideo}
            handleVideoClose={handleVideoClose}
            setIsVideoPlaying={setIsVideoPlaying}
          />
        )}
      </div>
    </>
  );
};

export default VideoGrid;
