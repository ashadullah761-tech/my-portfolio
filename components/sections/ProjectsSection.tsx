'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/types';
import { ExternalLink, Github, Sparkles, FolderGit2 } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="projects" className="py-24 relative bg-midnight-900/60 border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-purple-400 font-mono text-xs tracking-wider uppercase mb-3 px-3 py-1 rounded-full glass-card border border-purple-500/30"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>03. Portfolio</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-heading text-white"
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 font-semibold'
                  : 'glass-card text-slate-400 hover:text-white border border-purple-500/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="glass-card rounded-2xl overflow-hidden border border-purple-500/15 hover:border-purple-500/45 hover:shadow-xl hover:shadow-purple-600/20 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-navy-950">
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent opacity-80" />

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-purple-600/40">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-purple-400 font-mono mb-2">
                      <span>{project.category}</span>
                    </div>
                    <h3 className="text-xl font-bold font-heading text-white group-hover:text-purple-300 transition-colors mb-3">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Tag Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md glass-card text-xs font-mono text-slate-300 border border-purple-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-purple-500/10 pt-4 mt-auto">
                  {project.github_url ? (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  ) : <span />}

                  {project.live_url ? (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-purple-600/15 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 text-purple-300 hover:text-white font-semibold text-xs transition-all duration-200 border border-purple-500/30 shadow-sm"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : <span />}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
