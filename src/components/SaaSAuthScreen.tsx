import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  Building, 
  Hash, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Zap,
  Globe,
  Briefcase,
  BookOpen,
  Trophy,
  GraduationCap
} from 'lucide-react';
import { UserProfile, INITIAL_DEMO_USERS, loginUser, registerUser } from '../lib/authStore';
import { DashboardRole } from './shell/ApplicationShell';

interface SaaSAuthScreenProps {
  onSuccessLogin: (user: UserProfile) => void;
  onViewLandingPage?: () => void;
}

export const SaaSAuthScreen: React.FC<SaaSAuthScreenProps> = ({
  onSuccessLogin,
  onViewLandingPage
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [selectedRole, setSelectedRole] = useState<DashboardRole>('recruiter');

  // Form fields
  const [email, setEmail] = useState('recruiter@elevatehive.ai');
  const [password, setPassword] = useState('recruiter123');
  const [name, setName] = useState('Priya Mehta');
  const [institution, setInstitution] = useState('Google Tech Sourcing');
  const [roleSpecificId, setRoleSpecificId] = useState('REC-GOOG-2026');
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rolesConfig: { id: DashboardRole; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'recruiter', label: 'Recruiter', icon: Briefcase },
    { id: 'teacher-mentor', label: 'Teacher / Mentor', icon: BookOpen },
    { id: 'hackathon-creator', label: 'Hackathon Org', icon: Trophy },
    { id: 'student', label: 'Student Dev', icon: GraduationCap }
  ];

  // Helper when user selects a role
  const handleSelectRole = (role: DashboardRole) => {
    setSelectedRole(role);
    setErrorMessage('');
    const demo = INITIAL_DEMO_USERS.find(u => u.role === role);
    if (demo) {
      setEmail(demo.email);
      setPassword(demo.password);
      setName(demo.name);
      setInstitution(demo.institution || '');
      setRoleSpecificId(demo.roleSpecificId || '');
    }
  };

  // 1-Click Instant Launch for the currently selected role
  const handleInstantLaunch = (roleToLaunch?: DashboardRole) => {
    const role = roleToLaunch || selectedRole;
    const demo = INITIAL_DEMO_USERS.find(u => u.role === role) || INITIAL_DEMO_USERS[0];
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage(`Entering ${demo.name}'s ${getRoleLabel(role)} Workspace...`);

    const res = loginUser(demo.email, demo.password, {
      name: demo.name,
      role: demo.role,
      institution: demo.institution,
      roleSpecificId: demo.roleSpecificId
    });

    setTimeout(() => {
      setIsSubmitting(false);
      if (res.success && res.user) {
        onSuccessLogin(res.user);
      } else {
        setErrorMessage(res.message);
      }
    }, 350);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    if (authMode === 'signin') {
      const res = loginUser(email.trim(), password, {
        name: name.trim() || undefined,
        role: selectedRole as any,
        institution: institution.trim() || undefined,
        roleSpecificId: roleSpecificId.trim() || undefined
      });

      setTimeout(() => {
        setIsSubmitting(false);
        if (res.success && res.user) {
          setSuccessMessage(`Welcome back! Loading ${getRoleLabel(selectedRole)} Dashboard...`);
          setTimeout(() => {
            onSuccessLogin(res.user!);
          }, 300);
        } else {
          setErrorMessage(res.message);
        }
      }, 350);
    } else {
      const res = registerUser({
        name: name.trim() || 'Elevate Hive Innovator',
        email: email.trim(),
        password: password || 'password123',
        role: selectedRole as any,
        institution: institution.trim() || 'Tech Innovation Campus',
        roleSpecificId: roleSpecificId.trim() || 'ID-2026'
      });

      setTimeout(() => {
        setIsSubmitting(false);
        if (res.success && res.user) {
          setSuccessMessage(`Account registered! Entering ${getRoleLabel(selectedRole)} Dashboard...`);
          setTimeout(() => {
            onSuccessLogin(res.user!);
          }, 300);
        } else {
          setErrorMessage(res.message);
        }
      }, 350);
    }
  };

  const getRoleLabel = (r: DashboardRole) => {
    switch (r) {
      case 'recruiter': return 'Recruiter';
      case 'teacher-mentor': return 'Teacher / Mentor';
      case 'hackathon-creator': return 'Hackathon Organizer';
      case 'student': return 'Student Developer';
      default: return 'Stakeholder';
    }
  };

  const getDemoHint = () => {
    switch (selectedRole) {
      case 'recruiter': return 'Demo: recruiter123 / password123';
      case 'teacher-mentor': return 'Demo: teacher123 / password123';
      case 'hackathon-creator': return 'Demo: hackathon123 / password123';
      case 'student': return 'Demo: student123 / password123';
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#030508] text-slate-100 flex flex-col justify-between font-sans selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-indigo-600/15 via-violet-600/10 to-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full border-b border-slate-800/80 bg-[#07090E]/90 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 border border-indigo-500/30 flex items-center justify-center p-1 shadow-lg shadow-indigo-900/30">
            <img 
              src="/logo.png" 
              alt="Elevate Hive Logo" 
              className="w-7 h-7 object-contain filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" 
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">Elevate Hive</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">
                SaaS Portal
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium tracking-wide">
              Learn | Connect | Grow
            </span>
          </div>
        </div>

        {onViewLandingPage && (
          <button
            onClick={onViewLandingPage}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Public Showcase</span>
          </button>
        )}
      </header>

      {/* Main Center Interface */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[480px] space-y-5">
          
          {/* Brand Emblem & Welcome Subtext */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900/90 border border-indigo-500/40 p-2 shadow-2xl shadow-indigo-900/30 mb-1">
              <img 
                src="/logo.png" 
                alt="Elevate Hive Badge" 
                className="w-12 h-12 object-contain filter drop-shadow-[0_0_12px_rgba(99,102,241,0.6)]" 
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Elevate Hive Portal
            </h1>
            <p className="text-xs text-slate-400">
              Sign in to your role-specific dashboard or register an account
            </p>
          </div>

          {/* Alert Messages */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* CUSTOM ACCOUNT CREDENTIALS CARD */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#090D14]/95 border border-slate-800 shadow-2xl shadow-black/80 space-y-5 backdrop-blur-xl">
            
            {/* Card Header with Sign In / Register toggle */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-sm text-white tracking-wide">
                  Custom Account Credentials
                </span>
              </div>

              {/* Mode Toggle Pills */}
              <div className="flex items-center bg-[#05080E] p-1 rounded-xl border border-slate-800 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setErrorMessage('');
                  }}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    authMode === 'signin' 
                      ? 'bg-indigo-600 text-white font-semibold shadow-xs' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setErrorMessage('');
                  }}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    authMode === 'register' 
                      ? 'bg-indigo-600 text-white font-semibold shadow-xs' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Target Stakeholder Role Buttons (4 Roles) */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">
                  Target Stakeholder Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {rolesConfig.map((r) => {
                    const isSelected = selectedRole === r.id;
                    const Icon = r.icon;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => handleSelectRole(r.id)}
                        className={`py-2.5 px-3 rounded-xl text-left text-xs font-semibold border transition-all flex items-center gap-2.5 cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-950/50 ring-1 ring-indigo-500/50'
                            : 'bg-[#0E131E]/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                        <span className="truncate">{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Register Mode Extra Fields */}
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Rajesh Kumar"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E131E] border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                    required
                  />
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Work / Academic Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@elevatehive.ai"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E131E] border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Password</span>
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">
                    {getDemoHint()}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#0E131E] border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Register Mode Extra Organization Fields */}
              {authMode === 'register' && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1 flex items-center gap-1">
                      <Building className="w-3 h-3 text-indigo-400" />
                      <span>Organization</span>
                    </label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. Google / IIT"
                      className="w-full px-3 py-2 rounded-xl bg-[#0E131E] border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1 flex items-center gap-1">
                      <Hash className="w-3 h-3 text-indigo-400" />
                      <span>Roll / Emp ID</span>
                    </label>
                    <input
                      type="text"
                      value={roleSpecificId}
                      onChange={(e) => setRoleSpecificId(e.target.value)}
                      placeholder="e.g. EMP-2026"
                      className="w-full px-3 py-2 rounded-xl bg-[#0E131E] border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs shadow-lg shadow-indigo-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <span>
                  {authMode === 'signin' 
                    ? `Sign In & Open Dashboard` 
                    : `Create Account & Open Dashboard`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick 1-Click Direct Launch */}
            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                Instant demo mode:
              </span>
              <button
                type="button"
                onClick={() => handleInstantLaunch()}
                className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 hover:underline transition-all cursor-pointer"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>1-Click Launch {getRoleLabel(selectedRole)}</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-slate-500 border-t border-slate-800/60">
        <p>Elevate Hive — AI-Powered Career & Innovation Ecosystem • Learn | Connect | Grow</p>
      </footer>
    </div>
  );
};
