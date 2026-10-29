import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Github, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Filter, 
  User, 
  Send
} from 'lucide-react';
import { UserProfile } from '../../lib/authStore';

interface RecruiterWorkspaceProps {
  user: UserProfile;
}

export const RecruiterWorkspace: React.FC<RecruiterWorkspaceProps> = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [candidates, setCandidates] = useState([
    {
      id: 'c1',
      name: 'Aarav Sharma',
      college: 'IIT Bombay',
      commitsCount: 342,
      topSkills: ['React', 'TypeScript', 'Node.js', 'PyTorch'],
      hackathonRank: '#1 National AI Sprint',
      interviewScheduled: false
    },
    {
      id: 'c2',
      name: 'Ananya Verma',
      college: 'BITS Pilani',
      commitsCount: 289,
      topSkills: ['Solana', 'Rust', 'Next.js', 'System Design'],
      hackathonRank: '#2 Web3 League',
      interviewScheduled: true
    }
  ]);

  const handleScheduleInterview = (id: string) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, interviewScheduled: true } : c));
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-accent border-blue-500/40 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-blue-400">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span>Enterprise Recruiter Talent Sourcing • {user.institution || 'Google Tech Sourcing'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Welcome, <span className="text-blue-400">{user.name}</span>
          </h1>
          <p className="text-xs text-slate-300">
            Shortlisted Campus Talent: <span className="text-blue-300 font-mono">1,240 Engineers</span> • Direct Hackathon Pipeline Active
          </p>
        </div>

        <button className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all">
          + Post New Internship / Job
        </button>
      </div>

      {/* Candidate Search */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800">
          <Search className="w-5 h-5 text-slate-400 ml-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates by verified GitHub commits, hackathon wins, tech stack..."
            className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-slate-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidates.map((c) => (
            <div key={c.id} className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{c.name}</h3>
                    <p className="text-xs text-slate-400">{c.college} • <span className="text-cyan-400 font-mono">{c.commitsCount} GitHub Commits</span></p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                    {c.hackathonRank}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {c.topSkills.map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-300">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Elevate Hive Score: 98%
                </span>

                <button
                  onClick={() => handleScheduleInterview(c.id)}
                  disabled={c.interviewScheduled}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    c.interviewScheduled
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-blue-600 hover:bg-blue-500 text-white font-bold'
                  }`}
                >
                  {c.interviewScheduled ? 'Interview Booked ✓' : 'Schedule Fast-Track Interview'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
