// app/hooks/useBootstrap.ts
"use client";

import { useEffect, useState } from 'react';

export default function useBootstrap() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const loadBootstrap = async () => {
      try {
        await import('bootstrap/dist/js/bootstrap.bundle.min.js');
        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to load Bootstrap:', error);
      }
    };

    // Check if Bootstrap is already loaded
    if ((window as any).bootstrap) {
      setIsLoaded(true);
    } else {
      loadBootstrap();
    }
  }, []);

  return isLoaded;
}