import React from 'react';
import { Users, FolderGit2, Star, ThumbsUp, Code2, Award, MessageSquare, ArrowUpRight } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/mockData';

export const CommunitySection: React.FC = () => {
  return (
    <section id="community" className="py-24 relative bg-[#090D16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-purple-500/30 text-xs font-mono text-purple-300">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>Global Campus Innovators Hub</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            Driven by <span className="text-gradient-cyan">10,000+ Student Projects</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            See real codebases, AI models, and hackathon-winning projects submitted by students across 500+ top universities.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {FEATURED_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl p-6 relative flex flex-col justify-between border-slate-800 hover:border-purple-500/40 transition-all duration-300 group"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={project.avatarUrl}
                      alt={project.author}
                      className="w-9 h-9 rounded-full object-cover border border-purple-500/30"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{project.author}</h4>
                      <p className="text-[11px] font-mono text-purple-400">{project.college}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-mono font-bold">
                    AI Score: {project.aiScore}/100
                  </span>
                </div>

                {/* Title & Badge */}
                <h3 className="text-base font-display font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                  {project.title}
                </h3>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px] font-mono mb-4">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>{project.hackathonWinner}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Upvotes & Stars */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-slate-300 font-mono">
                    <ThumbsUp className="w-3.5 h-3.5 text-cyan-400" />
                    {project.upvotes}
                  </span>
                  <span className="flex items-center gap-1 text-slate-300 font-mono">
                    <Star className="w-3.5 h-3.5 text-amber-400" />
                    {project.stars}
                  </span>
                </div>

                <a
                  href="#community"
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
                >
                  View Codebase <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Discord / Telegram Stats Banner */}
        <div className="glass-panel p-8 rounded-2xl border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              Join the Elevate Hive Global Student Discord & Campus Clubs
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl">
              Connect with 25,000+ student coders, share open-source PRs, find hackathon teammates, and get 24/7 help from alumni at Google, Meta, and OpenAI.
            </p>
          </div>

          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-purple-500/20 transition-all flex items-center gap-2 flex-shrink-0">
            <MessageSquare className="w-4 h-4" />
            Join 25,000+ Member Discord
          </button>
        </div>

      </div>
    </section>
  );
};
