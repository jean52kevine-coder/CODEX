'use client';

import { motion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export function PremiumLayout({ children }: { children: React.ReactNode }) {
  const progress = useScrollProgress();
  const scaleX = useSpring(progress, { stiffness: 140, damping: 26, mass: 0.2 });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Lightweight spotlight tracking for premium depth without blocking interactions.
    const onMove = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500"
        style={{ scaleX }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 hidden opacity-90 transition-opacity duration-300 md:block"
        style={{
          background: `radial-gradient(420px circle at ${cursor.x}px ${cursor.y}px, rgba(124,58,237,0.11), transparent 42%)`,
        }}
      />
      {children}
    </>
  );
}
