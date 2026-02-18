'use client';

import { motion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export function PremiumLayout({ children }: { children: React.ReactNode }) {
  const progress = useScrollProgress();
  const scaleX = useSpring(progress, { stiffness: 120, damping: 25 });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <motion.div className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500" style={{ scaleX }} />
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(450px circle at ${cursor.x}px ${cursor.y}px, rgba(124,58,237,0.12), transparent 40%)`,
        }}
      />
      {children}
    </>
  );
}
