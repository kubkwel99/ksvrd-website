'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
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
};

const PortfolioPage: React.FC<{ media: MediaItem[] }> = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile =
    typeof window !== 'undefined' && /Mobi|Android/i.test(window.navigator.userAgent);

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

  // Variables to track touch events
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);

  // Define a threshold for detecting a tap
  const tapThreshold = {
    time: 200, // Max tap duration (milliseconds)
    distance: 10, // Max movement distance (pixels)
  };

  // Handle video click
  const handleVideoClick = (url: string) => {
    setSelectedVideo(url);
  };

  // Handle touch start event
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    touchStartTime.current = Date.now();
  };

  // Handle touch end event
  const handleTouchEnd = (e: React.TouchEvent, url: string) => {
    const touch = e.changedTouches[0];
    const touchEndX = touch.clientX;
    const touchEndY = touch.clientY;
    const touchEndTime = Date.now();

    // Calculate time and movement
    const timeElapsed = touchEndTime - touchStartTime.current;
    const movementX = Math.abs(touchEndX - touchStartX.current);
    const movementY = Math.abs(touchEndY - touchStartY.current);

    if (
      timeElapsed < tapThreshold.time &&
      movementX < tapThreshold.distance &&
      movementY < tapThreshold.distance
    ) {
      handleVideoClick(url);
    }
  };

  const closeOverlay = () => {
    setSelectedVideo(null);
  };

  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const videoElement = node.querySelector('video') as HTMLVideoElement | null;

      if (videoElement && !videoRefs.current.includes(videoElement)) {
        videoRefs.current.push(videoElement);

        // Mute the video to avoid NotAllowedError for autoplay
        videoElement.muted = true; // Ensure the video is muted

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              videoElement.play().catch((error) => {
                console.error('Video play failed:', error);
              });
            } else {
              videoElement.pause();
            }
          });
        });

        observer.observe(videoElement);
      }
    }
  }, []);

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
        className='container flex px-4 items-center justify-center'>
        {error ? (
          <div className='text-red-500'>{`Error: ${error}`}</div>
        ) : (
          <div className='grid gap-5 grid-cols-2 md:grid-cols-3 p-0 m-0 place-items-center justify-items-center'>
            {media.map((video) => (
              <div
                ref={setRef}
                key={video.public_id}>
                {video.resource_type === 'video' ? (
                  <div
                    className='cursor-pointer w-64 h-auto aspect-square'
                    onTouchStart={() => handleVideoClick(video.url)}
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
                  </div>
                ) : (
                  <img
                    src={video.secure_url}
                    alt={video.title}
                    className='cursor-pointer w-52 h-auto object-cover'
                    onClick={() => handleVideoClick(video.secure_url)}
                    onTouchStart={() => handleVideoClick(video.secure_url)}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {selectedVideo && (
          <div
            ref={overlayRef}
            className='fixed top-0 right-0 flex flex-col m-0 w-full h-full backdrop-blur-md'>
            <div className='flex flex-col items-center justify-center max-h-screen py-40 relative'>
              <video
                ref={videoRef}
                className='max-w-full max-h-full rounded-lg'
                controls
                autoPlay
                playsInline={isMobile}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}>
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
  const media = await getAllMedia();
  return {
    props: {
      media,
    },
  };
};

export default PortfolioPage;
