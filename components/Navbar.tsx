'use client';

import { motion } from 'framer-motion';

const links = ['Services', 'Méthodologie', 'Portfolio', 'Tarifs', 'FAQ', 'Contact'];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-4 z-50 mx-auto mt-4 w-[min(1120px,94vw)] rounded-2xl border border-white/10 bg-black/35 px-5 py-3 backdrop-blur-2xl"
    >
      <nav className="flex items-center justify-between">
        <a href="#hero" className="text-lg font-semibold tracking-tight">
          Altéra
        </a>
        <ul className="hidden gap-5 text-sm text-white/80 md:flex">
          {links.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className="transition hover:text-white">
                {link}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-2 text-sm font-medium text-black">
          Démarrer
        </a>
      </nav>
    </motion.header>
  );
}
