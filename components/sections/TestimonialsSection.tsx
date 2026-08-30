'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Testimonial } from '@/types';
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 relative bg-midnight-900/60 border-t border-purple-500/10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-purple-400 font-mono text-xs tracking-wider uppercase mb-3 px-3 py-1 rounded-full glass-card border border-purple-500/30"
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>05. Testimonials</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-heading text-white"
          >
            Client <span className="text-gradient">Endorsements</span>
          </motion.h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id || currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 sm:p-12 rounded-3xl border border-purple-500/20 relative shadow-2xl"
            >
              <Quote className="w-12 h-12 text-purple-500/20 absolute top-8 right-8" />

              {/* Rating Stars */}
              <div className="flex items-center space-x-1 text-purple-400 mb-6">
                {Array.from({ length: current.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-purple-400" />
                ))}
              </div>

              {/* Quote Message */}
              <p className="text-lg sm:text-2xl text-slate-200 font-medium leading-relaxed mb-8 italic">
                &ldquo;{current.message}&rdquo;
              </p>

              {/* Author Metadata */}
              <div className="flex items-center space-x-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-purple-400 bg-navy-900 flex-shrink-0">
                  <Image
                    src={current.avatar_url}
                    alt={current.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-heading text-white">{current.name}</h4>
                  <p className="text-sm text-purple-300">{current.role} &bull; {current.company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'bg-purple-400 w-8' : 'bg-navy-800 hover:bg-purple-900/50'
                  }`}
                  aria-label={`Go to testimonial slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full glass-card text-slate-300 hover:text-purple-300 border border-purple-500/20 hover:border-purple-400/50 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full glass-card text-slate-300 hover:text-purple-300 border border-purple-500/20 hover:border-purple-400/50 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
