import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Play, Cpu, Users, Trophy, Code2, Zap, Shield, CheckCircle2, Terminal } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onWatchDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onWatchDemo }) => {
  const [activeTab, setActiveTab] = useState<'hackathon' | 'teambuilder' | 'mentor'>('hackathon');
  const [liveCounter, setLiveCounter] = useState(2418);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCounter((prev) => prev + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col justify-center bg-radial-gradient">
      {/* Animated Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Cyber Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-cyan-500/30 text-xs sm:text-sm font-mono text-cyan-300 shadow-xl shadow-cyan-950/40 animate-float-slow">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-slate-300 font-sans">Tagline:</span>
            <span className="font-semibold text-white">"One Platform. Every College Innovation."</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-cyan-400">{liveCounter.toLocaleString()} live projects building right now</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.1] text-balance">
            The AI Platform for{' '}
            <span className="text-gradient-cyan">College Innovation</span> & Hackathons.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed text-balance max-w-3xl mx-auto">
            Elevate Hive brings together student developers, college clubs, AI hackathon generation, automated team matchmaking, and 24/7 technical mentors into one unified ecosystem.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-get-started-btn"
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-semibold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-watch-demo-btn"
              onClick={onWatchDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel text-slate-200 hover:text-white font-medium text-base hover:bg-slate-800/80 border-slate-700 hover:border-cyan-500/40 transition-all duration-200 flex items-center justify-center gap-2.5 group"
            >
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-cyan-400 ml-0.5" />
              </div>
              <span>Watch Interactive Demo</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Free for All Students</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Deploy in 60 Seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>500+ Partner Universities</span>
            </div>
          </div>
        </div>

        {/* Futuristic AI Interactive Illustration Showcase */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          {/* Glass Outer Container */}
          <div className="relative rounded-2xl p-2 sm:p-4 bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-slate-950/95 border border-slate-700/60 shadow-2xl shadow-cyan-950/50">
            
            {/* Top Window Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/80 mb-3 bg-slate-950/60 rounded-t-xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  elevate-hive-engine.v2.6 // live_campus_mesh
                </span>
              </div>
              
              {/* Interactive Showcase Tabs */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveTab('hackathon')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'hackathon'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  AI Hackathon Core
                </button>
                <button
                  onClick={() => setActiveTab('teambuilder')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'teambuilder'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  AI Team Matcher
                </button>
                <button
                  onClick={() => setActiveTab('mentor')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    activeTab === 'mentor'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  24/7 AI Mentor
                </button>
              </div>
            </div>

            {/* Interactive Tab Visual Contents */}
            <div className="p-4 sm:p-6 bg-[#0B0F19] rounded-xl border border-slate-800/80">
              {activeTab === 'hackathon' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      Live Generation Module
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      Instant Problem Statements & Rubrics
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      "Generate a 48-hour HealthTech AI hackathon for 1,200 college students with judging criteria and sponsor tracks."
                    </p>
                    
                    {/* Simulated Output Cards */}
                    <div className="space-y-2 pt-2">
                      <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs flex items-center justify-between">
                        <span className="font-mono text-slate-300">Track 01: Generative Clinical Diagnostics</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">Ready</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs flex items-center justify-between">
                        <span className="font-mono text-slate-300">Auto-Judging Criteria: Accuracy (40%), Pitch (30%), Code Quality (30%)</span>
                        <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-semibold">Configured</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Hologram Visual */}
                  <div className="lg:col-span-5 glass-panel p-5 rounded-xl border-cyan-500/20 flex flex-col justify-between space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">Campus Sprint Status</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Active</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs text-slate-300 font-mono">
                        <span>Participants</span>
                        <span className="text-cyan-400 font-bold">1,480 Students</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full w-[82%] rounded-full animate-pulse"></div>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                        <span>IIT Bombay Hub</span>
                        <span>142 Submissions</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'teambuilder' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300">
                      <Users className="w-3.5 h-3.5 text-purple-400" />
                      Synergy Vector Engine
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      Vector Matchmaking for Hackathon Squads
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Matches frontend developers, AI researchers, and pitch leaders based on skill gap matrices and project goals.
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="text-slate-400 font-mono">Required: AI/ML Lead</div>
                        <div className="text-cyan-400 font-semibold mt-1">Matched: Aarav (IITD) • 98%</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="text-slate-400 font-mono">Required: React Developer</div>
                        <div className="text-cyan-400 font-semibold mt-1">Matched: Priya (Stanford) • 95%</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 glass-panel p-5 rounded-xl border-purple-500/20 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-purple-300">Synergy Score</span>
                      <span className="text-emerald-400 font-bold text-base">97.4 / 100</span>
                    </div>
                    <div className="p-3 bg-slate-900/80 rounded-lg text-xs space-y-2 border border-slate-800">
                      <div className="flex justify-between text-slate-300">
                        <span>Tech Stack Alignment</span>
                        <span className="text-cyan-400">Optimal</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Timezone Overlap</span>
                        <span className="text-emerald-400">100% Match</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>GitHub Output</span>
                        <span className="text-purple-400">420 Commits</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'mentor' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                      <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                      24/7 AI Code Companion
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      Instant Debugging & Architecture Review
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      "Detect memory leaks in our vector embedding pipeline and generate a clean deployment script for Google Cloud."
                    </p>

                    <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-emerald-400 border border-emerald-500/30 space-y-1">
                      <div>✓ Optimizing memory buffer allocation...</div>
                      <div>✓ Generated clean Dockerfile & server route</div>
                      <div className="text-slate-400">Latency: 142ms | Verified code security PASS</div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 glass-panel p-5 rounded-xl border-emerald-500/20 text-xs space-y-3">
                    <div className="font-mono text-slate-300 flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-emerald-400" />
                      Live Mentor Response
                    </div>
                    <p className="text-slate-300 italic">
                      "I've updated your API key proxy handler to prevent browser exposure. Your CORS policies are now locked down."
                    </p>
                    <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-400 font-mono">
                      ● Active session with Gemini 2.5 Flash
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
