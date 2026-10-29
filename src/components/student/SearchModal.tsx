import React, { useState } from 'react';
import { X, Search, Trophy, Briefcase, Users, FolderGit2, BookOpen, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: any) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectTab }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const mockSearchData = [
    { type: 'Hackathon', title: 'National GenAI Sprint 2026', category: 'hackathons', badge: '$15k Prize' },
    { type: 'Hackathon', title: 'Solana Autonomous Agents League', category: 'hackathons', badge: '$25k Prize' },
    { type: 'Project', title: 'RAG LLM Engine for Codebases', category: 'projects', badge: 'Active' },
    { type: 'Teammate', title: 'Ananya Verma (Solana & Rust Specialist)', category: 'team-builder', badge: '98% Match' },
    { type: 'Internship', title: 'Fullstack AI Engineering Intern @ Cursor AI', category: 'internships', badge: '$3.5k/mo' },
    { type: 'Course', title: 'Advanced System Design & Distributed Systems', category: 'learning-hub', badge: '75% Done' },
  ];

  const filtered = query.trim() 
    ? mockSearchData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.type.toLowerCase().includes(query.toLowerCase()))
    : mockSearchData;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl glass-panel rounded-3xl border border-slate-800 p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Search Bar Input */}
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-cyan-400 absolute left-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hackathons, teammates, projects, internships, courses..."
            autoFocus
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-sans"
          />
          <button onClick={onClose} className="absolute right-4 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                onSelectTab(item.category);
                onClose();
              }}
              className="p-3.5 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
                  {item.type}
                </span>
                <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {item.badge}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">
              No results found for "{query}". Try searching "GenAI", "Cursor", "Solana", or "System Design".
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
