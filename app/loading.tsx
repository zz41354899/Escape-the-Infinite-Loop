'use client';

import React from 'react';

export default function Loading() {
  // Simple, static loading screen
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-xl flex flex-col items-center shadow-xl">
        <div className="w-12 h-12 border-4 border-t-transparent border-yellow-400 rounded-full animate-spin mb-4"></div>
        <span className="text-white text-lg">Loading...</span>
      </div>
    </div>
  );
} 