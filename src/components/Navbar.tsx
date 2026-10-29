import React, { useState, useEffect } from 'react';
import { Cpu, Sparkles, Menu, X, ArrowRight, UserCheck, LogOut, LayoutDashboard } from 'lucide-react';
import { UserProfile } from '../lib/authStore';

interface NavbarProps {
  currentUser: UserProfile | null;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenDemo: () => void;
  onOpenWorkspace: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentUser, 
  onOpenAuth, 
  onOpenDemo, 
  onOpenWorkspace,
  onLogout 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Hackathons', href: '#hackathons' },
    { name: 'Community', href: '#community' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      id="top-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090E]/90 backdrop-blur-xl border-b border-cyan-500/15 py-3 shadow-2xl shadow-cyan-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            id="brand-logo"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/90 border border-indigo-500/30 p-1 shadow-lg shadow-indigo-500/20 group-hover:border-cyan-400/50 transition-all duration-300">
              <img src="/logo.png" alt="Elevate Hive" className="w-8 h-8 object-contain group-hover:scale-105 transition-transform filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Elevate Hive
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  AI OS
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                College Innovation OS
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border-slate-800">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveTab(link.name.toLowerCase())}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeTab === link.name.toLowerCase()
                    ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="nav-demo-btn"
              onClick={onOpenDemo}
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5 rounded-xl hover:bg-slate-800/50"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Watch Demo
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenWorkspace}
                  className="px-4 py-2 text-xs font-bold font-mono text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>
                    {currentUser.role === 'recruiter'
                      ? 'Talent Intelligence'
                      : currentUser.role === 'teacher-mentor'
                      ? 'Learning Intelligence'
                      : currentUser.role === 'hackathon-creator'
                      ? 'Innovation Hub'
                      : 'Student Portal'}
                  </span>
                </button>

                <button
                  onClick={onLogout}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onOpenWorkspace}
                  className="px-4 py-2 text-xs font-bold font-mono text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/25 hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Enter SaaS Dashboards</span>
                </button>

                <button
                  id="nav-login-btn"
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white transition-all rounded-xl border border-slate-700/80 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-800"
                >
                  Sign In
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-slate-800 px-4 pt-4 pb-6 mt-3 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveTab(link.name.toLowerCase());
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 text-base font-medium text-slate-200 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full py-2.5 text-center text-sm font-medium text-cyan-300 bg-cyan-500/10 rounded-lg border border-cyan-500/20 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Watch Product Demo
            </button>

            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWorkspace();
                }}
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg"
              >
                Open {currentUser.role === 'recruiter'
                  ? 'Talent Intelligence'
                  : currentUser.role === 'teacher-mentor'
                  ? 'Learning Intelligence'
                  : currentUser.role === 'hackathon-creator'
                  ? 'Innovation Hub'
                  : 'Student Portal'}
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-2.5 text-center text-sm font-medium text-slate-200 bg-slate-800/80 rounded-lg border border-slate-700"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-md"
                >
                  Register Free
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
