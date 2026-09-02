'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, ArrowUpRight, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass-nav py-3.5 shadow-xl shadow-purple-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="#hero" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-700 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform">
            A
          </div>
          <span className="text-xl font-bold font-heading tracking-tight text-white">
            Ashadullah
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 glass-card px-5 py-2 rounded-full border border-purple-500/20">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-purple-300 hover:bg-purple-500/10 rounded-full transition-all"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          <Link
            href="/admin"
            aria-label="Admin Dashboard"
            className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-purple-400 hover:border-purple-500/40 border border-purple-500/20 transition-all"
            title="Admin Dashboard"
          >
            <Shield className="w-5 h-5" />
          </Link>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-[1.02] flex items-center space-x-1.5"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center space-x-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl glass-card text-slate-200 border border-purple-500/20"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-card border-b border-purple-500/20 px-6 py-6 space-y-4 shadow-2xl bg-midnight-950/95"
          >
            <div className="flex flex-col space-y-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-base font-medium text-slate-200 hover:text-purple-300 hover:bg-purple-500/10 rounded-xl transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-3 border-t border-purple-500/20 flex items-center justify-between">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-sm text-slate-400 hover:text-purple-400"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Panel</span>
                </Link>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-md"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
