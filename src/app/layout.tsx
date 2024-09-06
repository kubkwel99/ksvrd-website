// src/app/layout.tsx

import { AuthProvider } from './../contexts/AuthContext';
import Navbar from './../../components/Navbar';
import './../../styles/globals.css'
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] });

const myFont = localFont({ src: './../../public/FiraSansCondensed-Regular.ttf' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='sk'>
      <body className={myFont.className}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
