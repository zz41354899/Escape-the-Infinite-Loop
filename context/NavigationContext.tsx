'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface NavigationContextType {
  isNavigating: boolean;
  startNavigation: (path: string) => void;
  endNavigation: () => void;
  currentPath: string;
  destinationPath: string;
}

const NavigationContext = createContext<NavigationContextType>({
  isNavigating: false,
  startNavigation: () => {},
  endNavigation: () => {},
  currentPath: '',
  destinationPath: '',
});

export const useNavigation = () => useContext(NavigationContext);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [destinationPath, setDestinationPath] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  // Auto-cancel navigation after timeout (safety net)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isNavigating) {
      timeoutId = setTimeout(() => {
        setIsNavigating(false);
      }, 3000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isNavigating]);

  // When path changes, end navigation immediately
  useEffect(() => {
    if (isNavigating && pathname === destinationPath) {
      // Small delay to ensure content is mounted
      setTimeout(() => {
        setIsNavigating(false);
      }, 100);
    }
  }, [pathname, isNavigating, destinationPath]);

  const startNavigation = (path: string) => {
    setIsNavigating(true);
    setDestinationPath(path);
    // Immediate navigation without delay
    router.push(path);
  };

  const endNavigation = () => {
    setIsNavigating(false);
  };

  return (
    <NavigationContext.Provider 
      value={{ 
        isNavigating, 
        startNavigation, 
        endNavigation, 
        currentPath: pathname || '', 
        destinationPath 
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
} 