'use client';

import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Providers from './providers';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-zinc-100 antialiased font-sans">

        <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#18181b',
              color: '#fff',
              border: '1px solid #27272a',
            }
          }}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;