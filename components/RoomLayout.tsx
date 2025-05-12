"use client";

import React from 'react';
import Link from 'next/link';
import PageTransition from './PageTransition';

interface RoomLayoutProps {
  children: React.ReactNode;
  title: string;
  backgroundColor: string;
}

const RoomLayout = ({ children, title, backgroundColor }: RoomLayoutProps) => {
  return (
    <PageTransition className={`min-h-screen ${backgroundColor} p-4 md:p-8`}>
      <div className="max-w-3xl mx-auto w-full">
        <header className="mb-6 md:mb-8">
          <Link href="/" className="text-white hover:underline hover:text-yellow-200 mb-4 inline-block transition-colors duration-200 font-medium">
            &larr; Back to Home
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 mt-2">{title}</h1>
        </header>
        <main className="bg-white rounded-lg shadow-lg p-4 md:p-6 text-gray-800">
          {children}
        </main>
      </div>
    </PageTransition>
  );
};

export default RoomLayout; 