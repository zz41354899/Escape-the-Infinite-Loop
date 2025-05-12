"use client";

import React, { useState, useEffect } from 'react';
import HomeParticles from '@/components/HomeParticles';
import { useNavigation } from '@/context/NavigationContext';
import RoomLoader from '@/components/RoomLoader';

export default function Home() {
  const { isNavigating, startNavigation } = useNavigation();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Set loaded to true after mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const rooms = [
    { 
      name: '🌀 Infinite Loop Prison', 
      path: '/room/loop-prison',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    { 
      name: '🕳️ Null Cave', 
      path: '/room/null-cave',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    { 
      name: '🧠 Closure Maze', 
      path: '/room/closure-maze',
      color: 'bg-green-600 hover:bg-green-700'
    },
    { 
      name: '💀 NaN graveyard', 
      path: '/room/nan-graveyard',
      color: 'bg-yellow-600 hover:bg-yellow-700'
    },
    { 
      name: '🔗 Callback dungeon', 
      path: '/room/callback-dungeon',
      color: 'bg-indigo-600 hover:bg-indigo-700'
    },
    { 
      name: '🧿 Regex curse room', 
      path: '/room/regex-curse',
      color: 'bg-purple-800 hover:bg-purple-900'
    },
    { 
      name: '🪞 Console mirror', 
      path: '/room/console-mirror',
      color: 'bg-red-600 hover:bg-red-700'
    },
    { 
      name: '🧪 Shadow Variable Lab', 
      path: '/room/shadow-lab',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    { 
      name: '🚇 Type Coercion Tunnel', 
      path: '/room/type-tunnel',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
  ];

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900">
        <div className="bg-gray-800 p-6 rounded-xl flex flex-col items-center shadow-xl">
          <div className="w-12 h-12 border-4 border-t-transparent border-yellow-400 rounded-full animate-spin mb-4"></div>
          <span className="text-white text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* HomeParticles is only loaded on the homepage */}
      <HomeParticles />
      
      <div className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10">
        {!isNavigating && (
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">
              <span className="bg-gradient-to-r from-purple-400 via-yellow-300 to-blue-400 text-transparent bg-clip-text">
                Mystery Debug Room
              </span>
              <br /><br />
              <span className="text-yellow-400">Escape the Infinite Loop</span>
            </h1>
            
            <p className="text-gray-300 mb-12 text-lg">
              Can you solve the programming puzzles to escape? Choose a room to begin.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rooms.map((room, index) => (
                <div key={room.path} className="shadow-xl">
                  <button 
                    onClick={() => startNavigation(room.path)}
                    className={`w-full p-5 ${room.color} text-white rounded-lg shadow-lg border border-opacity-30 border-white backdrop-blur-sm font-medium hover:scale-105 transform`}
                  >
                    {room.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
} 