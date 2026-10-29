import React, { useState } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Award, 
  Users, 
  Bot, 
  Calendar 
} from 'lucide-react';
import { UserProfile } from '../../lib/authStore';

interface HackathonCreatorWorkspaceProps {
  user: UserProfile;
}

export const HackathonCreatorWorkspace: React.FC<HackathonCreatorWorkspaceProps> = ({ user }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [hackathonName, setHackathonName] = useState('');
  const [prizePool, setPrizePool] = useState('$10,000 USD');
  const [activeHackathons, setActiveHackathons] = useState([
    {
      id: 'hk-1',
      title: 'Campus AI Agent Challenge 2026',
      organizer: user.institution || 'E-Cell Chapter',
      registrations: 1480,
      status: 'Live & Active',
      prizes: '$10,000 USD'
    }
  ]);

  const handleCreateHackathon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hackathonName) return;

    setActiveHackathons(prev => [
      ...prev,
      {
        id: `hk-${Date.now()}`,
        title: hackathonName,
        organizer: user.institution || 'E-Cell Chapter',
        registrations: 1,
        status: 'Live & Active',
        prizes: prizePool
      }
    ]);

    setHackathonName('');
    setShowCreateModal(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-accent border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-amber-400">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Hackathon Organizer Hub • {user.institution || 'BITS Pilani E-Cell'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Organizer Portal: <span className="text-amber-400">{user.name}</span>
          </h1>
          <p className="text-xs text-slate-300">
            Organizing ID: <span className="text-amber-300 font-mono">{user.roleSpecificId || 'BITS-HACK-09'}</span> • Automated AI Certificate Engine Active
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs shadow-xl shadow-amber-500/25 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Launch Hackathon in 60s</span>
        </button>
      </div>

      {/* Active Hackathons */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-bold text-white">My Managed Hackathons</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeHackathons.map((h) => (
            <div key={h.id} className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                  {h.status}
                </span>
                <span className="text-xs font-mono text-amber-400">Prizes: {h.prizes}</span>
              </div>

              <h3 className="text-lg font-bold text-white">{h.title}</h3>
              <p className="text-xs text-slate-400">{h.registrations} Registered Hackers Across 42 Campuses</p>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-cyan-400 font-mono flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5" /> AI Auto-Grading Enabled
                </span>
                <button className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-200 hover:text-white">
                  Manage Submissions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Hackathon Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md glass-panel p-6 rounded-2xl border border-amber-500/40 space-y-4">
            <h3 className="text-lg font-bold text-white">Launch New AI Hackathon</h3>
            <form onSubmit={handleCreateHackathon} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Hackathon Title</label>
                <input
                  type="text"
                  value={hackathonName}
                  onChange={(e) => setHackathonName(e.target.value)}
                  placeholder="e.g. National LLM & Vision Hack 2026"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Prize Pool</label>
                <input
                  type="text"
                  value={prizePool}
                  onChange={(e) => setPrizePool(e.target.value)}
                  placeholder="$10,000 USD"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold"
                >
                  Publish Hackathon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
