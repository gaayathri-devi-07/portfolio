"use client";

import { motion } from 'framer-motion';
import Magnetic from '@/components/ui/Magnetic';

export default function FloatingNav() {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Internships', href: '#internships' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      className="fixed top-6 left-1/2 z-[100] px-6 md:px-8 py-3 md:py-4 rounded-full bg-white/60 dark:bg-[#000000]/60 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.02)]"
    >
      <ul className="flex items-center gap-6 md:gap-10">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Magnetic>
              <a 
                href={link.href}
                className="text-xs md:text-sm font-mono tracking-widest uppercase text-gray-800 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-300 transition-colors duration-300"
              >
                {link.name}
              </a>
            </Magnetic>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
