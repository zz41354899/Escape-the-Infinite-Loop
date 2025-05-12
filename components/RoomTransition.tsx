'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function RoomTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [prevPathname, setPrevPathname] = useState('');
  const isHomePage = pathname === '/';
  
  // Add a class to the body to prevent scrolling during transitions
  useEffect(() => {
    const handleStart = () => {
      document.body.classList.add('transition-active');
      setIsReady(false);
    };
    
    const handleComplete = () => {
      document.body.classList.remove('transition-active');
      setIsReady(true);
    };
    
    // When pathname changes, we're starting a navigation
    if (prevPathname !== pathname) {
      setPrevPathname(pathname);
      handleStart();
      
      // Content is ready with a small delay to ensure everything is loaded
      setTimeout(() => {
        handleComplete();
      }, 300);
    }
    
    // Safety net: ensure loading state doesn't get stuck
    const safetyTimeout = setTimeout(() => {
      handleComplete();
    }, 3000);
    
    return () => {
      clearTimeout(safetyTimeout);
    };
  }, [pathname, prevPathname]);

  // Set ready after initial mount
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Simple immediate rendering without transitions
  return (
    <div className="w-full min-h-screen">
      {children}
    </div>
  );
} 