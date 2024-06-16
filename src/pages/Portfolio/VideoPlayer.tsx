import { motion } from 'framer-motion';
import React from 'react';
import SocialLinks from './SocialLinks';
import { Video } from './VideoArray';

const VideoPlayer: React.FC<{
  selectedVideo: Video;
  handlePrevVideo: () => void;
  handleNextVideo: () => void;
  handleVideoClose: () => void;
  setIsVideoPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ selectedVideo, handlePrevVideo, handleNextVideo, handleVideoClose, setIsVideoPlaying }) => {


  return (
    <motion.div
      variants={variants}
      initial='hidden'
      animate='visible'
      transition={{ delay: 0.1, duration: 0.2 }}
      id='videoPlayer'
      className='fixed top-0 left-0 z-10 w-screen h-screen flex flex-nowrap items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm'>
      <div className='containerDiv relative bg-black flex flex-row flex-nowrap z-50 mx-40 w-6/12' style={{ overflowX: 'visible' }}>
        <video
          style={{ maxWidth: '550px', minWidth: '350px' }}
          autoPlay
          controls
          onPause={() => setIsVideoPlaying(false)}
        >
          <source src={selectedVideo.url} type='video/mp4' />
        </video>
        <div className='textDiv flex flex-col flex-nowrap items-start p-6 pb-1 h-auto'>
          <h1 className='text-5xl mb-4 underline'>{selectedVideo.title}</h1>
          <p className='text-base text-left'>{selectedVideo.desc}</p>

          <div className='flex gap-4 text-2xl items-end justify-start' style={{ marginTop: 'auto' }}>
            <SocialLinks />
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
  );
};

export default VideoPlayer;
