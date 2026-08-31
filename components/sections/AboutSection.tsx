'use client';

import { motion } from 'framer-motion';
import { Stat } from '@/types';
import { Terminal, CheckCircle2, Award, Code2 } from 'lucide-react';

interface AboutSectionProps {
  stats: Stat[];
}

export default function AboutSection({ stats }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 relative bg-midnight-900/60 border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-purple-400 font-mono text-xs tracking-wider uppercase mb-3 px-3 py-1 rounded-full glass-card border border-purple-500/30"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>01. About Me</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-heading text-white"
          >
            Engineered for <span className="text-gradient">Impact &amp; Scale</span>
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Developer Code Terminal Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group max-w-md w-full">
              {/* Decorative Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition duration-500" />
              
              {/* Terminal / Code Window Frame */}
              <div className="relative rounded-3xl overflow-hidden glass-card border border-purple-500/20 bg-navy-950/90 shadow-2xl p-6">
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-purple-500/15 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-purple-300 font-mono">
                    <Code2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>developer.ts</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    Active
                  </span>
                </div>

                {/* Code Body */}
                <div className="font-mono text-xs sm:text-sm space-y-2.5 text-slate-300 leading-relaxed py-2">
                  <p className="text-purple-400">
                    <span className="text-pink-400">const</span> developer = &#123;
                  </p>
                  <p className="pl-4">
                    <span className="text-indigo-300">name</span>: <span className="text-emerald-400">&apos;Ashadullah&apos;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-indigo-300">role</span>: <span className="text-emerald-400">&apos;Full Stack Architect&apos;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-indigo-300">experience</span>: <span className="text-amber-300">&apos;5+ Years&apos;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-indigo-300">stack</span>: [
                  </p>
                  <p className="pl-8 text-purple-300">
                    &apos;Next.js 14&apos;, &apos;TypeScript&apos;, &apos;Supabase&apos;, &apos;Tailwind&apos;
                  </p>
                  <p className="pl-4">],</p>
                  <p className="pl-4">
                    <span className="text-indigo-300">status</span>: <span className="text-emerald-400">&apos;Available for hire&apos;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-indigo-300">focus</span>: <span className="text-emerald-400">&apos;High performance &amp; clean UI&apos;</span>
                  </p>
                  <p className="text-purple-400">&#125;;</p>
                </div>

                {/* Bottom Badge */}
                <div className="mt-4 pt-3 border-t border-purple-500/15 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-emerald-400 font-medium">Available for work</span>
                  </div>
                  <span className="text-purple-300/80 font-mono text-[11px]">TypeScript</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Narrative & Stats Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="text-2xl font-bold font-heading text-white">
              Passionate about turning complex systems into elegant, high-converting digital products.
            </h3>
            <p className="text-slate-300 leading-relaxed text-base">
              With over 5 years of experience building high-scale SaaS platforms and creative interactive web applications, I combine high-throughput server architecture with pixel-perfect visual fidelity.
            </p>
            <p className="text-slate-400 leading-relaxed text-base">
              My core stack leverages Next.js 14 App Router, PostgreSQL with Supabase, Type-safe TypeScript architectures, and fluid animations powered by Framer Motion.
            </p>

            {/* Strengths List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Next.js 14 App Router & SSR',
                'Supabase & PostgreSQL Architect',
                'TypeScript & Clean Code Standards',
                'Tailwind CSS & Framer Motion',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-purple-500/15">
              {stats.map((stat, idx) => (
                <div key={stat.id || idx} className="glass-card p-4 rounded-xl border border-purple-500/20 text-center hover:border-purple-500/40 transition-all">
                  <p className="text-2xl sm:text-3xl font-extrabold font-heading text-purple-400">{stat.value}</p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
