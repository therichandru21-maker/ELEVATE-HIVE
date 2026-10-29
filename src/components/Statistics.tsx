import React from 'react';
import { Building2, Users, Trophy, FolderGit2, TrendingUp, Sparkles } from 'lucide-react';
import { STATS_DATA, COLLEGE_LOGOS } from '../data/mockData';

export const Statistics: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-6 h-6 text-cyan-400" />;
      case 'Users': return <Users className="w-6 h-6 text-indigo-400" />;
      case 'Trophy': return <Trophy className="w-6 h-6 text-amber-400" />;
      case 'FolderGit2': return <FolderGit2 className="w-6 h-6 text-emerald-400" />;
      default: return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="statistics" className="py-20 relative bg-[#090D16] border-y border-slate-800/80">
      {/* Background glow accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* College Partners Ticker */}
        <div className="text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-center gap-2">
            <span className="w-12 h-[1px] bg-slate-800"></span>
            Trusted by top student communities & campus hubs
            <span className="w-12 h-[1px] bg-slate-800"></span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-75">
            {COLLEGE_LOGOS.map((college, idx) => (
              <div
                key={idx}
                className="px-4 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs sm:text-sm font-display font-medium text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-all duration-200"
              >
                {college}
              </div>
            ))}
          </div>
        </div>

        {/* Header Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Empowering College Innovation at Scale
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Real-time platform impact measured across campus hackathons, student projects, and career placements.
          </p>
        </div>

        {/* 4 Core Requested Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_DATA.map((stat) => (
            <div
              key={stat.id}
              className="glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden group border-slate-800/80 hover:border-cyan-500/40"
            >
              {/* Corner Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all duration-300"></div>

              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 group-hover:border-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                  {getIcon(stat.iconName)}
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <TrendingUp className="w-3 h-3" />
                  <span>{stat.growth}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {stat.value}
                </div>
                <h3 className="text-base font-semibold text-slate-200">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {stat.sublabel}
                </p>
              </div>

              {/* Bottom Subtle Accent Bar */}
              <div className="mt-6 w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full w-[85%] rounded-full group-hover:w-full transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
