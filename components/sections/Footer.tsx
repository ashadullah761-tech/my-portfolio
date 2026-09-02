'use client';

import Link from 'next/link';
import { ArrowUp, Github, Linkedin, Twitter, Mail, Shield } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-purple-500/15 bg-midnight-950 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-700 flex items-center justify-center font-bold text-white text-base shadow-md shadow-purple-600/30">
            A
          </div>
          <span className="text-lg font-bold font-heading text-white">
            Ashadullah
          </span>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
          <a href="#skills" className="hover:text-purple-400 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
          <a href="#experience" className="hover:text-purple-400 transition-colors">Experience</a>
          <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
          <Link href="/admin" className="hover:text-purple-400 transition-colors flex items-center space-x-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </Link>
        </div>

        {/* Social & Back To Top */}
        <div className="flex items-center space-x-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors" aria-label="Twitter">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="mailto:ashadullah761@gmail.com" className="hover:text-purple-400 transition-colors" aria-label="Email">
            <Mail className="w-5 h-5" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-purple-300 border border-purple-500/20 hover:border-purple-400/50 transition-all ml-2"
            aria-label="Back to Top"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-8 pt-8 border-t border-purple-500/10 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Ashadullah. All rights reserved. Designed &amp; Built with Next.js 14 &amp; Supabase.
      </div>
    </footer>
  );
}
