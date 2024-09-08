'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { headerVariants } from './../../types/motion';
import { GetServerSideProps } from 'next';
import { getAllMedia } from './../../utils/cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import { CldVideoPlayer } from 'next-cloudinary';

type MediaItem = {
  url: string;
  public_id: string;
  secure_url: string;
  resource_type: string;
  title: string;
  thumbnail_url: string;
  iframe_url: string; // Add this field for iframe URL
};


const PortfolioPage = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement | null>>(new Map());

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch('/api/media');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMedia(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          console.error('Error fetching media:', error);
        }
      }
    };
    fetchMedia();
  }, []);

    useEffect(() => {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      checkIfMobile(); // Check on initial load
      window.addEventListener('resize', checkIfMobile); // Re-check on resize
  
      return () => {
        window.removeEventListener('resize', checkIfMobile);
      };
    }, []);
  
    const handleVideoClick = (url: string) => {
      setSelectedVideo(url);
    };
  
    const closeOverlay = () => {
      setSelectedVideo(null);
    };
  

  return (
    <motion.div
      className='bg-neutral-900 flex flex-col items-center justify-center w-full py-20'
      id='portfolio'
      style={{
        boxShadow: 'inset 0 20px 9px -6px black',
      }}>
      {' '}
      <h1 className='pb-20 text-3xl'>Portfólio</h1>
      <motion.div
        variants={headerVariants}
        initial='hidden'
        whileInView='show'
        className='container flex px-4'>
        {error ? (
          <div className='text-red-500'>{`Error: ${error}`}</div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center m-auto'>
            {media.map((video) => (
              <div
                className='flex flex-row'
                key={video.public_id}>
                {video.resource_type === 'video' ? (
                  <div
                    className='cursor-pointer w-64 h-auto aspect-square'
                    onClick={() => handleVideoClick(video.url)}>
                    
                    {media && (
                      <CldVideoPlayer
                        className=' rounded-xl aspect-square bg-cover'
                        height={300}
                        width={300}
                        src={video.url}
                        controls={false}
                      />
                    )}

                    {/* <iframe
                      src={video.url}
                      loading='lazy'
                      width='300'
                      height='200'
                      allow=' fullscreen; encrypted-media'
                      allowFullScreen
                      className='w-full h-auto object-cover'
                      title={video.title}></iframe> */}
                  </div>
                ) : (
                  <img
                    src={video.secure_url}
                    alt={video.title}
                    className='cursor-pointer w-52 h-auto object-cover'
                    onClick={() => handleVideoClick(video.secure_url)}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {selectedVideo && (
          <div
            className='fixed top-0 right-0 flex flex-col m-0 w-full h-full backdrop-blur-md'
            onClick={closeOverlay}>
            <div className='flex flex-col items-center justify-center max-h-screen py-40 relative'>
              <video
                className='max-w-full max-h-full rounded-lg'
                controls
                autoPlay
                playsInline={isMobile}>
                <source
                  src={selectedVideo}
                  type='video/mp4'
                />
                Your browser does not support the video tag.
              </video>
              <div className='p-4'>
                <ul className='flex gap-2 text-2xl items-center'>
                  <li className='hover:scale-110 transition ease-in-out'>
                    <a
                      href='https://www.facebook.com/kika.svoradova?locale=sk_SK'
                      target='_blank'
                      rel='noopener noreferrer'>
                      <FaFacebook />
                    </a>
                  </li>
                  <li className='hover:scale-110 transition ease-in-out'>
                    <a
                      href='https://www.instagram.com/svoradova.k/'
                      target='_blank'
                      rel='noopener noreferrer'>
                      <FaInstagram />
                    </a>
                  </li>
                  <li className='hover:scale-110 transition ease-in-out'>
                    <a
                      href='https://www.tiktok.com/@krsvrd'
                      target='_blank'
                      rel='noopener noreferrer'>
                      <FaTiktok />
                    </a>
                  </li>
                </ul>
              </div>
              <button
                className='absolute -right-10 top-36 text-3xl text-black rounded hover:transition ease-in-out delay-100 sm:absolute sm:right-0 sm:top-24 mx-10 py-5'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={closeOverlay}>
                {isHovered ? <IoCloseCircleSharp /> : <IoIosCloseCircleOutline />}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const media = await getAllMedia(); // Ensure this returns the correct data
  return {
    props: {
      media,
    },
  };
};

export default PortfolioPage;
