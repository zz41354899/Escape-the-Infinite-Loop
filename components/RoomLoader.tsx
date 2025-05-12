'use client';

import React, { useEffect, useState } from 'react';

interface RoomLoaderProps {
  roomName: string;
  children: React.ReactNode;
}

export default function RoomLoader({ roomName, children }: RoomLoaderProps) {
  const [loading, setLoading] = useState(true);
  
  // Set loading to false after content is mounted
  useEffect(() => {
    // Wait for next frame to ensure content is mounted
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 300);
    
    // Safety timeout
    const safetyTimeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(safetyTimeout);
    };
  }, []);
  
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900">
        <div className="bg-gray-800 p-6 rounded-xl flex flex-col items-center shadow-xl">
          <div className="w-12 h-12 border-4 border-t-transparent border-yellow-400 rounded-full animate-spin mb-4"></div>
          <span className="text-white text-lg">Loading {roomName}...</span>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
} 