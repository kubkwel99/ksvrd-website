// 'use client';

// import { motion } from 'framer-motion';
// import { useEffect, useRef, useState } from 'react';
// import { FaFacebook, FaInstagram } from 'react-icons/fa';
// import { FaTiktok } from 'react-icons/fa6';
// import { IoIosCloseCircleOutline } from 'react-icons/io';
// import { IoCloseCircleSharp } from 'react-icons/io5';
// import { headerVariants } from './../../types/motion';
// import { GetServerSideProps } from 'next';
// import { getAllMedia } from './../../utils/cloudinary';

// type MediaItem = {
//   url: string;
//   public_id: string;
//   secure_url: string;
//   resource_type: string;
//   title: string;
//   thumbnail_url?: string;
// };

// const PortfolioPage = () => {
//   const [media, setMedia] = useState<MediaItem[]>([]);
//   const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const videoRefs = useRef<Map<string, HTMLVideoElement | null>>(new Map());

//   useEffect(() => {
//     const fetchMedia = async () => {
//       try {
//         const response = await fetch('/api/media');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setMedia(data);
//       } catch (error) {
//         if (error instanceof Error) {
//           setError(error.message);
//           console.error('Error fetching media:', error);
//         }
//       }
//     };

//     fetchMedia();
//   }, []);

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         setSelectedVideo(null);
//       }
//     };

//     if (selectedVideo) {
//       window.addEventListener('keydown', handleKeyDown);
//     } else {
//       window.removeEventListener('keydown', handleKeyDown);
//     }

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [selectedVideo]);

//   const handleVideoClick = (url: string) => {
//     setSelectedVideo(url);
//   };

//   const closeOverlay = () => {
//     setSelectedVideo(null);
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const video = entry.target as HTMLVideoElement;
//             video.src = video.dataset.src!;
//             observer.unobserve(video);
//           }
//         });
//       },
//       {
//         threshold: 0.1,
//       }
//     );

//     media.forEach((item) => {
//       const video = videoRefs.current.get(item.public_id);
//       if (video) {
//         observer.observe(video);
//       }
//     });

//     return () => {
//       media.forEach((item) => {
//         const video = videoRefs.current.get(item.public_id);
//         if (video) {
//           observer.unobserve(video);
//         }
//       });
//     };
//   }, [media]);

// ;
//   return (
//     <motion.div
//       className='bg-neutral-900 flex flex-col items-center justify-center w-full py-20'
//       id='portfolio'
//       style={{
//         boxShadow: 'inset 0 20px 9px -6px black',
//       }}>
//       <h1 className='pb-20 text-3xl'>Portfólio</h1>
//       <motion.div
//         variants={headerVariants}
//         initial='hidden'
//         whileInView='show'
//         className='container flex px-4'>
//         {error ? (
//           <div className='text-red-500'>{`Error: ${error}`}</div>
//         ) : (
//           <div className='grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center m-auto'>
//             {media.map((item) => (
//               <div
//                 className='flex flex-row'
//                 key={item.public_id}>
//                 {item.resource_type === 'video' ? (
//                   <video
//                     className='cursor-pointer w-64 h-auto aspect-square object-cover'
//                     width='300px'
//                     data-src={item.secure_url}
//                   aria-placeholder='img'
//                     onClick={() => handleVideoClick(item.secure_url)}
//                     poster={item.thumbnail_url} // Use the thumbnail URL for the video poster
//                   >
//                     Your browser does not support the video tag.
//                   </video>
//                 ) : (
//                   <img
//                     src={item.secure_url}
//                     alt={item.title}
//                     className='cursor-pointer w-52 h-auto object-cover'

//                     onClick={() => {}}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {selectedVideo && (
//           <div
//             className='fixed top-0 right-0 flex flex-col m-0 w-full h-full backdrop-blur-md'
//             onClick={closeOverlay}>
//             <div className='flex flex-col items-center justify-center max-h-screen py-40 relative'>
//               <video
//                 className='max-w-full max-h-full rounded-lg'
//                 controls
//                 autoPlay>
//                 <source
//                   src={selectedVideo}
//                   type='video/mp4'
//                 />
//                 Your browser does not support the video tag.
//               </video>
//               <div className='p-4'>
//                 <ul className='flex gap-2 text-2xl items-center'>
//                   <li className='hover:scale-110 transition ease-in-out'>
//                     <a
//                       href='https://www.facebook.com/kika.svoradova?locale=sk_SK'
//                       target='_blank'
//                       rel='noopener noreferrer'>
//                       <FaFacebook />
//                     </a>
//                   </li>
//                   <li className='hover:scale-110 transition ease-in-out'>
//                     <a
//                       href='https://www.instagram.com/svoradova.k/'
//                       target='_blank'
//                       rel='noopener noreferrer'>
//                       <FaInstagram />
//                     </a>
//                   </li>
//                   <li className='hover:scale-110 transition ease-in-out'>
//                     <a
//                       href='https://www.tiktok.com/@krsvrd'
//                       target='_blank'
//                       rel='noopener noreferrer'>
//                       <FaTiktok />
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//               <button
//                 className='absolute right-0 top-24 mx-10 py-5 text-3xl text-black rounded hover:transition ease-in-out delay-100'
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//                 onClick={closeOverlay}>
//                 {isHovered ? <IoCloseCircleSharp /> : <IoIosCloseCircleOutline />}
//               </button>
//             </div>
//           </div>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async () => {
//   const media = await getAllMedia(); // Ensure this returns the correct data
//   return {
//     props: {
//       media,
//     },
//   };
// };

// export default PortfolioPage;
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
  thumbnail_url: string;
  iframe_url: string;
};

// const PortfolioPage = () => {
//   const [media, setMedia] = useState<MediaItem[]>([]);
//   const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const overlayRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     checkIfMobile();
//     window.addEventListener('resize', checkIfMobile);
//     return () => {
//       window.removeEventListener('resize', checkIfMobile);
//     };
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent | TouchEvent) => {
//       const target = event.target as Node;
//       if (overlayRef.current && !overlayRef.current.contains(target)) {
//         closeOverlay();
//       }
//     };

//     if (selectedVideo) {
//       document.addEventListener('mousedown', handleClickOutside);
//       document.addEventListener('touchstart', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('touchstart', handleClickOutside);
//     };
//   }, [selectedVideo]);

//   const handleVideoClick = (url: string) => {
//     setSelectedVideo(url);
//   };

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         closeOverlay();
//       }
//     };

//     if (selectedVideo) {
//       document.addEventListener('keydown', handleKeyDown);
//     } else {
//       document.removeEventListener('keydown', handleKeyDown);
//     }

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [selectedVideo]);

//   useEffect(() => {
//     const handleTouchStart = (event: TouchEvent) => {
//       event.stopPropagation();
//     };

//     if (selectedVideo) {
//       document.addEventListener('touchstart', handleTouchStart);
//     } else {
//       document.removeEventListener('touchstart', handleTouchStart);
//     }

//     return () => {
//       document.removeEventListener('touchstart', handleTouchStart);
//     };
//   }, [selectedVideo]);

//   const closeOverlay = () => {
//     setSelectedVideo(null);
//   };
//   const handleVideoTap = (event: React.MouseEvent<HTMLVideoElement>) => {
//     event.stopPropagation();

//   };

// const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
//   entries.forEach((entry) => {
//     const video = entry.target as HTMLVideoElement;
//     if (entry.isIntersecting) {
//       video.play();
//     } else {
//       video.pause();
//     }
//   });
// }, []);

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

    // If time is short and movement is small, it's a tap
    if (
      timeElapsed < tapThreshold.time &&
      movementX < tapThreshold.distance &&
      movementY < tapThreshold.distance
    ) {
      handleVideoClick(url); // It's a tap, open the selected video
    }
  };

  const closeOverlay = () => {
    setSelectedVideo(null);
  };

  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      // Use querySelector to find the actual <video> element within the div
      const videoElement = node.querySelector('video') as HTMLVideoElement | null;
  
      if (videoElement && !videoRefs.current.includes(videoElement)) {
        // Add the video element to the refs array
        videoRefs.current.push(videoElement);
  
        // Perform any operations on the video element, like adding observers
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              videoElement.play(); // Example action, like auto-play
            } else {
              videoElement.pause();
            }
          });
        });
  
        // Start observing the video element
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
                key={video.public_id}
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, video.url)}>
                {video.resource_type === 'video' ? (
                  <div className='cursor-pointer w-64 h-auto aspect-square'>
                    {/* // onClick={() => handleVideoClick(video.url)}
                    // onTouchStart={() => handleVideoClick(video.url)} */}
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
            {/* // onClick={closeOverlay} */}
            <div className='flex flex-col items-center justify-center max-h-screen py-40 relative'>
              <video
                ref={videoRef}
                className='max-w-full max-h-full rounded-lg'
                controls
                autoPlay
                playsInline={isMobile}
                // onClick={handleVideoTap}
                onClick={(e) => e.stopPropagation()} // Prevent click from closing the overlay
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
