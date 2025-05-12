'use client';

import React, { useEffect, useState } from 'react';

interface LoadingIndicatorProps {
  show?: boolean;
  text?: string;
  maxDuration?: number;
}

export default function LoadingIndicator({ 
  show = false, 
  text = 'Loading...', 
  maxDuration = 3000 
}: LoadingIndicatorProps) {
  const [visible, setVisible] = useState(show);
  
  useEffect(() => {
    // When show prop becomes true, show the loader
    if (show) {
      setVisible(true);
      
      // Safety timeout to prevent endless loading
      const safetyTimeout = setTimeout(() => {
        setVisible(false);
      }, maxDuration);
      
      return () => {
        clearTimeout(safetyTimeout);
      };
    } else {
      // When show prop becomes false, hide the loader
      setVisible(false);
    }
  }, [show, maxDuration]);
  
  // If not visible, don't render anything
  if (!visible) return null;
  
  // Return a simple, static overlay without transitions or animations
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-80">
      <div className="bg-gray-900 p-6 rounded-xl flex flex-col items-center shadow-xl">
        <div className="w-12 h-12 border-4 border-t-transparent border-yellow-400 rounded-full animate-spin mb-4"></div>
        <span className="text-white text-lg">{text}</span>
      </div>
    </div>
  );
} 