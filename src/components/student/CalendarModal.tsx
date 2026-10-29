import React from 'react';
import { X, Calendar as CalendarIcon, Clock, MapPin, Sparkles } from 'lucide-react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const events = [
    { time: '10:00 AM Today', title: 'System Design Mock Interview with AI Mentor', location: 'Elevate Hive Room 101', type: 'Interview' },
    { time: '02:30 PM Today', title: 'National GenAI Sprint Team Checkpoint', location: 'Discord / Google Meet', type: 'Hackathon' },
    { time: 'Tomorrow 11:00 AM', title: 'Cursor AI Internship Technical Screening', location: 'Zoom Link', type: 'Career' },
    { time: 'Friday 05:00 PM', title: 'Dean’s Campus Code-Off Submissions Close', location: 'Elevate Hive Platform', type: 'Deadline' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg glass-panel rounded-3xl border border-slate-800 p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-white">Student Schedule & Deadlines</h3>
              <p className="text-xs text-slate-400">Synced with Google Calendar & Hackathon League</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {events.map((e, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {e.type}
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" /> {e.time}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{e.title}</h4>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-purple-400" /> {e.location}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2 text-center">
          <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs">
            Close Calendar
          </button>
        </div>

      </div>
    </div>
  );
};
