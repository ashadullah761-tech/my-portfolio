'use client';

import { motion } from 'framer-motion';
import { Experience } from '@/types';
import { Briefcase, GraduationCap, Calendar, Building2 } from 'lucide-react';

interface ExperienceSectionProps {
  experience: Experience[];
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 relative bg-midnight-950/80 border-t border-purple-500/10">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-purple-400 font-mono text-xs tracking-wider uppercase mb-3 px-3 py-1 rounded-full glass-card border border-purple-500/30"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>04. Timeline</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-heading text-white"
          >
            Experience &amp; <span className="text-gradient">Education</span>
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-purple-500/30 ml-4 sm:ml-32 space-y-12">
          {experience.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 sm:pl-10 group"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full glass-card border-2 border-purple-400 bg-midnight-950 flex items-center justify-center text-purple-300 group-hover:scale-125 transition-transform duration-300 shadow-md shadow-purple-500/30">
                {item.type === 'work' ? <Briefcase className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />}
              </div>

              {/* Date Badge Desktop Floating Left */}
              <div className="hidden sm:block absolute -left-36 top-2 text-right w-24">
                <span className="inline-flex items-center space-x-1 text-xs font-mono text-purple-300 font-semibold px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20">
                  <Calendar className="w-3 h-3 mr-1" />
                  {item.start_date} - {item.end_date}
                </span>
              </div>

              {/* Card Container */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-purple-500/15 hover:border-purple-500/40 transition-all duration-300">
                {/* Date Mobile */}
                <div className="sm:hidden mb-3">
                  <span className="inline-flex items-center space-x-1 text-xs font-mono text-purple-300 font-semibold px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20">
                    <Calendar className="w-3 h-3 mr-1" />
                    {item.start_date} - {item.end_date}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold font-heading text-white">{item.role}</h3>
                  <span className="text-xs uppercase font-mono px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {item.type}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-purple-400 font-medium mb-4">
                  <Building2 className="w-4 h-4" />
                  <span>{item.company}</span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
