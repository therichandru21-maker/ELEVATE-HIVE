import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFaqs = FAQ_ITEMS.filter(
    (faq) => activeCategory === 'all' || faq.category === activeCategory
  );

  return (
    <section id="faq" className="py-24 relative bg-[#090D16] border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-cyan-500/30 text-xs font-mono text-cyan-300">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Frequently Asked <span className="text-gradient-cyan">Questions</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Everything you need to know about Elevate Hive, college hackathons, and AI team building.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'general', label: 'General' },
            { id: 'hackathons', label: 'Hackathons' },
            { id: 'ai', label: 'AI Features' },
            { id: 'colleges', label: 'Colleges & Sponsors' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'glass-panel text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-cyan-500/40 bg-slate-900/80' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? '' : faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-white">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-800 text-slate-400 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-cyan-400 bg-cyan-500/20' : ''
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
