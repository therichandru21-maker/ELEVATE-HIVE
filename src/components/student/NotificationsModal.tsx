import React from 'react';
import { X, Bell, Trophy, Briefcase, Bot, Sparkles, CheckCircle2 } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    { title: 'National GenAI Sprint Update', body: 'Your team submitted Milestone 1. AI Review score: 98/100.', time: '10 mins ago', icon: <Trophy className="w-4 h-4 text-amber-400" /> },
    { title: 'Interview Invitation', body: 'Cursor AI shortlisted your resume for Fullstack Engineer Intern.', time: '1 hour ago', icon: <Briefcase className="w-4 h-4 text-cyan-400" /> },
    { title: 'AI Mentor Alert', body: 'New code review optimization suggested for your AI Agent repository.', time: '3 hours ago', icon: <Bot className="w-4 h-4 text-purple-400" /> },
    { title: 'New Teammate Request', body: 'Ananya Verma (BITS Pilani) requested to join your Solana Hackathon squad.', time: '5 hours ago', icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg glass-panel rounded-3xl border border-slate-800 p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-white">Live Notifications</h3>
              <p className="text-xs text-slate-400">4 Unread updates from your campus & hackathons</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((n, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex-shrink-0">
                {n.icon}
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{n.title}</h4>
                  <span className="text-[10px] font-mono text-slate-500">{n.time}</span>
                </div>
                <p className="text-xs text-slate-300">{n.body}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs">
          Mark All as Read & Close
        </button>

      </div>
    </div>
  );
};
