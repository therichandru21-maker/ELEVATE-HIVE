import React from 'react';
import { Cpu, Send, Heart, ShieldCheck, Github, Twitter, Linkedin, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05070B] border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px]">
                <div className="w-full h-full bg-[#07090E] rounded-[7px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-display font-bold text-lg text-white">Elevate Hive</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Tagline: <span className="text-slate-200">"One Platform. Every College Innovation."</span> The unified AI operating system powering student developers, campus hackathons, and university innovation hubs worldwide.
            </p>

            <div className="pt-2">
              <p className="text-xs font-mono text-slate-300 mb-2">Subscribe to College Innovation Digest</p>
              <div className="flex items-center gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="you@college.edu"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <button className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1 transition-all">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links Columns */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">AI Hackathon Generator</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">AI Team Matcher</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">24/7 AI Code Mentor</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Project Tracker</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Skill Analyzer</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Internship Hub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">For Campuses</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#solutions" className="hover:text-cyan-400 transition-colors">Student Developers</a></li>
              <li><a href="#solutions" className="hover:text-cyan-400 transition-colors">College Clubs & E-Cells</a></li>
              <li><a href="#solutions" className="hover:text-cyan-400 transition-colors">University Deans</a></li>
              <li><a href="#pricing" className="hover:text-cyan-400 transition-colors">Sponsor Hackathons</a></li>
              <li><a href="#community" className="hover:text-cyan-400 transition-colors">Verified Developer Proof</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#faq" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
              <li><a href="#faq" className="hover:text-cyan-400 transition-colors">Hackathon Playbook</a></li>
              <li><a href="#community" className="hover:text-cyan-400 transition-colors">Discord Community</a></li>
              <li><a href="#privacy" className="hover:text-cyan-400 transition-colors">Privacy & Security</a></li>
              <li><a href="#terms" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-emerald-400 font-medium">Systems Operational • 99.9% Uptime</span>
          </div>

          <p className="flex items-center gap-1 text-slate-400">
            © {new Date().getFullYear()} Elevate Hive Inc. Built for student developers worldwide.
          </p>

          <div className="flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-cyan-300 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-cyan-300 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-cyan-300 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-cyan-300 transition-colors">
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
