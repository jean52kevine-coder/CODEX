'use client';

import { motion } from 'framer-motion';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Méthodologie', href: '#method' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="sticky top-4 z-50 mx-auto mt-4 w-[min(1120px,94vw)] rounded-2xl border border-white/10 bg-black/30 px-5 py-3 backdrop-blur-2xl"
    >
      <nav className="flex items-center justify-between gap-4">
        <a href="#hero" className="text-lg font-semibold tracking-tight">
          Altéra
        </a>
        <ul className="hidden items-center gap-5 text-sm text-white/80 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="transition hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-2 text-sm font-medium text-black transition hover:scale-[1.02]"
        >
          Démarrer
        </a>
      </nav>
    </motion.header>
  );
}
