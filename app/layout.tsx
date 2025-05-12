import './globals.css';
import React from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import RoomTransition from '@/components/RoomTransition';
import { NavigationProvider } from '@/context/NavigationContext';
import NavigationLoader from '@/components/NavigationLoader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Escape the Infinite Loop',
  description: 'An interactive debug puzzle game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-white text-black font-sans ${inter.className}`}>
        <NavigationProvider>
          <RoomTransition>
            {children}
          </RoomTransition>
          <NavigationLoader />
        </NavigationProvider>
      </body>
    </html>
  );
} 