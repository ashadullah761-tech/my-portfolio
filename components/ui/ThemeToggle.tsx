'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('portfolio-theme');
    if (stored === 'light') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);

    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('portfolio-theme', 'dark');
    }
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl glass-card border border-purple-500/20" />
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      aria-label="Toggle Dark and Light Mode"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-purple-400 hover:border-purple-400/40 border border-purple-500/20 transition-all flex items-center justify-center"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
      ) : (
        <Moon className="w-5 h-5 text-purple-600 hover:-rotate-12 transition-transform" />
      )}
    </motion.button>
  );
}
