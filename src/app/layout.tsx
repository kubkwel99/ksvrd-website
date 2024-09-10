// src/app/layout.tsx

import { AuthProvider } from './../contexts/AuthContext';
import Navbar from './../../components/Navbar';
import './../../styles/globals.css'
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='sk'>
      <body className={Poppins.className}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
