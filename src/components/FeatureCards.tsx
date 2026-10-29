import React, { useState } from 'react';
import { 
  Sparkles, UserPlus, Bot, Kanban, BarChart3, Briefcase, 
  ArrowRight, Check, Zap, Cpu, Terminal, ArrowUpRight 
} from 'lucide-react';
import { FEATURE_CARDS } from '../data/mockData';
import { FeatureCard } from '../types';

interface FeatureCardsProps {
  onSelectFeatureDemo: (feature: FeatureCard) => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ onSelectFeatureDemo }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getFeatureIcon = (icon: string) => {
    switch (icon) {
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-cyan-400" />;
      case 'UserPlus': return <UserPlus className="w-6 h-6 text-purple-400" />;
      case 'Bot': return <Bot className="w-6 h-6 text-emerald-400" />;
      case 'Kanban': return <Kanban className="w-6 h-6 text-amber-400" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-rose-400" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-blue-400" />;
      default: return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="features" className="py-24 relative bg-[#07090E]">
      {/* Background radial highlights */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Innovation Toolkit</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            6 Core Modules Purpose-Built for <span className="text-gradient-cyan">Campus Developers</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            From zero to winning hackathons and securing top tech internships — Elevate Hive automates every step of your college engineering journey.
          </p>
        </div>

        {/* 6 Requested Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURE_CARDS.map((card) => (
            <div
              key={card.id}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="glass-card rounded-2xl p-7 relative flex flex-col justify-between group transition-all duration-300 border-slate-800/90 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-950/40"
            >
              {/* Card Top Pill Badge */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 group-hover:scale-110 transition-all duration-300">
                    {getFeatureIcon(card.icon)}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                    {card.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {card.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400/90 mb-3">
                  {card.tagline}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {card.description}
                </p>

                {/* Key Highlights checklist */}
                <div className="space-y-2 mb-6 pt-2 border-t border-slate-800/60">
                  {card.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/15 flex items-center justify-center text-cyan-400 flex-shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  {card.metrics}
                </span>

                <button
                  id={`try-${card.id}-btn`}
                  onClick={() => onSelectFeatureDemo(card)}
                  className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-cyan-500/20 text-xs font-semibold text-cyan-300 border border-slate-700 hover:border-cyan-500/40 flex items-center gap-1.5 transition-all duration-200 group/btn"
                >
                  <span>Test Playground</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
