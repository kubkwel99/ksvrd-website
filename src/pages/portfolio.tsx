import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { fadeIn, headerVariants } from './../../types/motion';

type MediaItem = {
  url: string;
  public_id: string;
  secure_url: string;
  resource_type: string;
  title: string;
};

const PortfolioPage = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedVideo(null);
      }
    };

    if (selectedVideo) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedVideo]);

  const handleVideoClick = (url: string) => {
    setSelectedVideo(url);
  };

  const closeOverlay = () => {
    setSelectedVideo(null);
  };

  useEffect(() => {
    if (!isMobile) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const video = entry.target as HTMLVideoElement;
              video.src = video.dataset.src!;
              observer.unobserve(video);
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

      videoRefs.current.forEach((video) => {
        if (video) {
          observer.observe(video);
        }
      });

      return () => {
        videoRefs.current.forEach((video) => {
          if (video) {
            observer.unobserve(video);
          }
        });
      };
    }
  }, [media, isMobile]);

  return (
    <motion.div
      className='bg-neutral-900 flex flex-col items-center justify-center w-full py-20 '
      id='portfolio'
      style={{
        boxShadow: 'inset 0 20px 9px -6px black',
      }}>
      <h1 className='pb-20 text-3xl'>Portfólio</h1>
      <motion.div
        variants={isMobile ? {} : headerVariants}
        initial='hidden'
        whileInView='show'
        className='container flex px-4'>
        {error ? (
          <div className='text-red-500'>{`Error: ${error}`}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center m-auto">
            {media.map((item, index) => (
              <div className='flex flex-row ' key={item.public_id}>
                {item.resource_type === 'video' ? (
                  <motion.video
                    variants={isMobile ? {} : fadeIn('down', 'tween', (index + 1) * 0.1, 0.4)}
                    className='cursor-pointer w-64 h-auto aspect-square object-cover'
                    width='300px'
                    data-src={item.secure_url}
                    ref={(el) => (videoRefs.current[index] = el!)}
                    onClick={() => handleVideoClick(item.secure_url)}>
                    <source type='video/mp4' />
                    Your browser does not support the video tag.
                  </motion.video>
                ) : (
                  <img
                    src={item.secure_url}
                    alt={item.public_id}
                    className='cursor-pointer w-52 h-auto object-cover'
                    onClick={() => handleVideoClick(item.secure_url)}
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
              <video className='max-w-full max-h-full rounded-lg' controls autoPlay>
                <source src={selectedVideo} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
              <div className='p-4'>
                <ul className='flex gap-2 text-2xl items-center'>
                  <li className='hover:scale-110 transition ease-in-out'>
                    <a href='https://www.facebook.com/kika.svoradova?locale=sk_SK' target='_blank'>
                      <FaFacebook />
                    </a>
                  </li>
                  <li className='hover:scale-110 transition ease-in-out'>
                    <a href='https://www.instagram.com/svoradova.k/' target='_blank'>
                      <FaInstagram />
                    </a>
                  </li>
                  <li className='hover:scale-110  transition ease-in-out'>
                    <a href='https://www.tiktok.com/@krsvrd' target='_blank'>
                      <FaTiktok />
                    </a>
                  </li>
                </ul>
              </div>
              <button
                className='absolute right-0 top-24 mx-10 py-5 text-3xl text-black  rounded hover:transition ease-in-out delay-100'
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

export default PortfolioPage;
