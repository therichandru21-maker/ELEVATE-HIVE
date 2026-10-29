import React, { useState } from 'react';
import { Trophy, Calendar, Users, MapPin, ArrowRight, ExternalLink, Sparkles, Filter } from 'lucide-react';
import { HACKATHONS_LIST } from '../data/mockData';
import { HackathonItem } from '../types';

interface HackathonsSectionProps {
  onRegisterHackathon: (hackathon: HackathonItem) => void;
}

export const HackathonsSection: React.FC<HackathonsSectionProps> = ({ onRegisterHackathon }) => {
  const [filterMode, setFilterMode] = useState<'All' | 'Online' | 'Hybrid' | 'In-Person'>('All');

  const filteredHackathons = HACKATHONS_LIST.filter(
    (h) => filterMode === 'All' || h.mode === filterMode
  );

  return (
    <section id="hackathons" className="py-24 relative bg-[#07090E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-amber-500/30 text-xs font-mono text-amber-300">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Live Campus Sprints</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Explore Featured <span className="text-gradient-cyan">College Hackathons</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Compete with top engineering students, win grants, get peer code reviews, and earn recruiter referral badges.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center gap-2 p-1 rounded-xl glass-panel border-slate-800 self-start">
            {(['All', 'Online', 'Hybrid', 'In-Person'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filterMode === mode
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Hackathons Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              className="glass-card rounded-2xl p-6 relative flex flex-col justify-between border-slate-800/90 hover:border-amber-500/40 transition-all duration-300 group"
            >
              <div>
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={hackathon.logoUrl}
                      alt={hackathon.college}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-xs font-mono text-cyan-400">{hackathon.college}</span>
                      <h3 className="text-lg font-display font-bold text-white group-hover:text-amber-300 transition-colors">
                        {hackathon.title}
                      </h3>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold ${
                    hackathon.mode === 'Online' 
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                      : hackathon.mode === 'Hybrid'
                      ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                      : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {hackathon.mode}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {hackathon.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Meta Bar */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-slate-300">
                  <div className="flex items-center gap-1 font-mono">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-bold text-white">{hackathon.prizePool}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{hackathon.participants.toLocaleString()} hackers</span>
                  </div>
                </div>

                <button
                  id={`register-${hackathon.id}-btn`}
                  onClick={() => onRegisterHackathon(hackathon)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-xs font-semibold text-white shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5"
                >
                  <span>Register Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
