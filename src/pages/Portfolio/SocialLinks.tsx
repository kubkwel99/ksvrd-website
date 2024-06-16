import { motion } from 'framer-motion';
import React from 'react';

const SocialLinks: React.FC = () => (
  <>
    {[
      { href: 'https://www.facebook.com', icon: 'fa-facebook' },
      { href: 'https://www.instagram.com', icon: 'fa-instagram' },
      { href: 'https://www.tiktok.com', icon: 'fa-tiktok' },
      { href: 'mailto:info@example.com', icon: 'fa-envelope' },
    ].map(({ href, icon }) => (
      <motion.a
        key={href}
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
        href={href}>
        <i className={`fa-brands ${icon} hover:text-gray-400 duration-300`}></i>
      </motion.a>
    ))}
  </>
);

export default SocialLinks;
