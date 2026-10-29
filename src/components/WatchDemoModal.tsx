import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Users, 
  Trophy, 
  RotateCcw,
  Zap,
  Maximize2
} from 'lucide-react';

interface WatchDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WatchDemoModal: React.FC<WatchDemoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Loop to next chapter
            setActiveChapter((ch) => (ch + 1) % chapters.length);
            return 0;
          }
          return prev + 1.5;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isOpen, activeChapter]);

  if (!isOpen) return null;

  const chapters = [
    {
      title: '01. AI Hackathon Setup in 60s',
      duration: '1:15',
      desc: 'How college club leaders generate problem statements, rubric criteria, and tracks automatically.',
      videoGraphic: '🚀 AI Problem Statement Engine Active'
    },
    {
      title: '02. Vector Team Matchmaking',
      duration: '2:30',
      desc: 'Matching cross-campus student coders and designers based on tech stack synergy & GitHub commits.',
      videoGraphic: '⚡ 98% Match Synergy Found'
    },
    {
      title: '03. 24/7 AI Tech Mentorship',
      duration: '1:45',
      desc: 'Live bug fixing and system architecture code reviews during late night hackathons.',
      videoGraphic: '🤖 AI Code Debugger: Memory Leak Solved'
    },
    {
      title: '04. Recruiter Talent Pipeline',
      duration: '1:10',
      desc: 'How verified project scores translate directly into fast-track tech interviews at top YC startups & tech giants.',
      videoGraphic: '💼 Fast-Track Interview Booked'
    }
  ];

  const currentCh = chapters[activeChapter];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl glass-panel-accent rounded-3xl border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-2xl shadow-cyan-950/80 overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-display font-bold text-white">Elevate Hive Interactive Platform Demo</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video rounded-2xl bg-[#060912] border border-cyan-500/30 overflow-hidden flex flex-col justify-between p-6 shadow-2xl group">
          
          {/* Animated Background Mesh & Simulation Visuals */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/30 via-slate-950 to-purple-950/30 pointer-events-none"></div>
          
          {/* Pulse Ripple Graphics for Simulated Video */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none animate-pulse"></div>

          {/* Video Top Bar Overlay */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-cyan-300 font-bold">
                ELEVATE-HIVE-SIMULATOR-STREAM-HD
              </span>
            </div>
            <span className="text-slate-400">Chapter {activeChapter + 1} of 4 • {currentCh.duration}</span>
          </div>

          {/* Animated Live Simulated Video Scene Content */}
          <div className="relative z-10 text-center space-y-4 max-w-xl mx-auto my-auto">
            <div className="inline-flex p-4 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 shadow-xl shadow-cyan-500/20">
              <Cpu className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                {currentCh.videoGraphic}
              </span>
              <h4 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                {currentCh.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {currentCh.desc}
              </p>
            </div>
          </div>

          {/* Interactive Player Controls & Timeline */}
          <div className="relative z-10 space-y-3 pt-4 border-t border-slate-800/80">
            
            {/* Timeline Progress Bar */}
            <div 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = (clickX / rect.width) * 100;
                setProgress(newProgress);
              }}
              className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden cursor-pointer group/bar relative"
            >
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Play/Pause & Sound Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 px-4 py-2 rounded-xl transition-all shadow-md"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlaying ? 'Pause Demo' : 'Play Demo'}</span>
                </button>

                <button
                  onClick={() => {
                    setProgress(0);
                    setIsPlaying(true);
                  }}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                  title="Replay Chapter"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                </button>

                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  {Math.floor((progress / 100) * 90)}s / 90s
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Chapter Switcher Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {chapters.map((ch, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveChapter(idx);
                setProgress(0);
                setIsPlaying(true);
              }}
              className={`p-3.5 rounded-2xl text-left border text-xs transition-all ${
                activeChapter === idx
                  ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 shadow-lg shadow-cyan-950/40'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-mono font-bold text-white mb-1">{ch.title}</div>
              <div className="text-[10px] text-slate-400">{ch.duration}</div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
