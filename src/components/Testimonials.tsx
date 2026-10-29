import React from 'react';
import { Star, Quote, Building2, Award } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 relative bg-[#07090E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Real Student & Faculty Stories</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            Loved by Student Coders & <span className="text-gradient-cyan">Campus Deans</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Discover how Elevate Hive is accelerating campus innovation and launching student co-founders worldwide.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="glass-card rounded-2xl p-7 relative flex flex-col justify-between border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-700 group-hover:text-cyan-500/40 transition-colors" />
                </div>

                {/* Quote Text */}
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/30"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-base font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">{testimonial.role}</p>
                  <span className="text-[11px] text-cyan-400 font-semibold">{testimonial.college}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
