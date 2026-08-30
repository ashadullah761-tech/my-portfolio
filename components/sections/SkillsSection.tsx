'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skill } from '@/types';
import { Code, FileCode, Palette, Server, Database, Sparkles, Globe, Box, Cpu, Layers } from 'lucide-react';

interface SkillsSectionProps {
  skills: Skill[];
}

const ICON_MAP: Record<string, any> = {
  Code,
  FileCode,
  Palette,
  Server,
  Database,
  Sparkles,
  Globe,
  Box,
  Cpu,
  Layers,
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="skills" className="py-24 relative bg-midnight-950/80 border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-purple-400 font-mono text-xs tracking-wider uppercase mb-3 px-3 py-1 rounded-full glass-card border border-purple-500/30"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>02. Tech Stack</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-heading text-white"
          >
            Skills &amp; <span className="text-gradient">Technologies</span>
          </motion.h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 font-semibold'
                  : 'glass-card text-slate-400 hover:text-white border border-purple-500/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skill Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const IconComponent = ICON_MAP[skill.icon] || Code;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={skill.id}
                  className="glass-card p-6 rounded-2xl border border-purple-500/15 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-600/15 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-gradient-to-tr group-hover:from-purple-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-purple-300 font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                      {skill.proficiency}%
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-white mb-1">{skill.name}</h3>
                  <p className="text-xs text-slate-400 mb-4">{skill.category}</p>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-navy-900 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-400 rounded-full"
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
