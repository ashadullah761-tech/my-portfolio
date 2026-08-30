'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Stat } from '@/types';
import { Terminal, CheckCircle2, Award } from 'lucide-react';

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
          {/* Avatar Column */}
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
              
              {/* Image Frame */}
              <div className="relative rounded-3xl overflow-hidden glass-card p-3 border border-purple-500/20">
                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-navy-950">
                  <Image
                    src="/ashadullah.jpg"
                    alt="Ashadullah - Profile Photo"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 glass-card rounded-xl border border-purple-500/20 text-white">
                    <p className="font-bold font-heading text-sm text-white">Ashadullah</p>
                    <p className="text-xs text-purple-300">Full Stack Architect &amp; UI Specialist</p>
                  </div>
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
