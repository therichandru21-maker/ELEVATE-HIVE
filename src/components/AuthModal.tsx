import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  Trophy, 
  Landmark, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Github, 
  Sparkles, 
  Zap, 
  UserPlus,
  LogIn,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Building,
  Hash,
  Mail,
  User,
  Lock,
  KeyRound
} from 'lucide-react';
import { ROLES_DATA, RoleOption } from '../data/rolesData';
import { registerUser, loginUser, UserProfile, INITIAL_DEMO_USERS } from '../lib/authStore';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onSuccessLogin: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signup',
  onClose,
  onSuccessLogin
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<RoleOption>(ROLES_DATA[0]);

  // Form fields (Consistent across both Register and Sign In)
  const [fullName, setFullName] = useState('Aarav Sharma');
  const [email, setEmail] = useState('student@elevatehive.ai');
  const [password, setPassword] = useState('student123');
  const [institution, setInstitution] = useState('IIT Bombay');
  const [roleSpecificId, setRoleSpecificId] = useState('21BCE1042');
  const [showPassword, setShowPassword] = useState(false);

  // Error/Success feedback
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Sync mode whenever modal opens or initialMode changes
  useEffect(() => {
    if (isOpen) {
      setAuthMode(initialMode);
      setErrorMessage('');
      setSuccessMessage('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const getRoleIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-cyan-400" />;
      case 'Teacher':
        return <BookOpen className="w-5 h-5 text-emerald-400" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-blue-400" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-amber-400" />;
      case 'University':
        return <Landmark className="w-5 h-5 text-purple-400" />;
      default:
        return <GraduationCap className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getFieldLabels = () => {
    switch (selectedRole.id) {
      case 'student':
        return {
          institutionLabel: 'College / University',
          institutionPlaceholder: 'e.g. IIT Bombay',
          idLabel: 'Student Roll No / PRN',
          idPlaceholder: 'e.g. 21BCE1042'
        };
      case 'teacher-mentor':
        return {
          institutionLabel: 'University / Department',
          institutionPlaceholder: 'e.g. IIT Bombay Dept of CSE',
          idLabel: 'Faculty Employee Code',
          idPlaceholder: 'e.g. FAC-CS-8812'
        };
      case 'recruiter':
        return {
          institutionLabel: 'Company / Organization',
          institutionPlaceholder: 'e.g. Google Tech Sourcing',
          idLabel: 'Recruiter Work ID / Badge',
          idPlaceholder: 'e.g. REC-GOOG-2026'
        };
      case 'hackathon-creator':
        return {
          institutionLabel: 'Club / E-Cell / Community',
          institutionPlaceholder: 'e.g. E-Cell BITS Pilani',
          idLabel: 'Organizer Chapter ID',
          idPlaceholder: 'e.g. BITS-HACK-09'
        };
      default:
        return {
          institutionLabel: 'Institution / Organization',
          institutionPlaceholder: 'e.g. IIT Bombay',
          idLabel: 'Roll No / ID Code',
          idPlaceholder: 'e.g. 21BCE1042'
        };
    }
  };

  const handleApplyPreset = (demoUser: typeof INITIAL_DEMO_USERS[0]) => {
    const roleObj = ROLES_DATA.find(r => r.id === demoUser.role) || ROLES_DATA[0];
    setSelectedRole(roleObj);
    setFullName(demoUser.name);
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    setInstitution(demoUser.institution || 'IIT Bombay');
    setRoleSpecificId(demoUser.roleSpecificId || '21BCE1042');
    setErrorMessage('');
  };

  const handleRoleSelect = (role: RoleOption) => {
    setSelectedRole(role);
    // Find if a preset exists for this role to auto-assist user
    const preset = INITIAL_DEMO_USERS.find(u => u.role === role.id);
    if (preset && (email.includes('@elevatehive.ai') || email.includes('@devverse.ai') || !email)) {
      setFullName(preset.name);
      setEmail(preset.email);
      setPassword(preset.password);
      setInstitution(preset.institution || '');
      setRoleSpecificId(preset.roleSpecificId || '');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const res = registerUser({
      name: fullName.trim() || 'Elevate Hive User',
      email: email.trim(),
      password: password,
      role: selectedRole.id as any,
      institution: institution.trim() || 'IIT Bombay',
      roleSpecificId: roleSpecificId.trim() || '21BCE1042'
    });

    if (res.success && res.user) {
      setSuccessMessage(res.message);
      setTimeout(() => {
        onSuccessLogin(res.user!);
        onClose();
      }, 400);
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Sign in now also passes all user details (Role, Full Name, Institution, Roll/ID)
    const res = loginUser(email.trim(), password, {
      name: fullName.trim() || undefined,
      role: selectedRole.id as any,
      institution: institution.trim() || undefined,
      roleSpecificId: roleSpecificId.trim() || undefined
    });

    if (res.success && res.user) {
      setSuccessMessage(res.message);
      setTimeout(() => {
        onSuccessLogin(res.user!);
        onClose();
      }, 400);
    } else {
      setErrorMessage(res.message);
    }
  };

  const labels = getFieldLabels();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto py-6">
      <div className="relative w-full max-w-2xl bg-[#0B0F19]/95 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-5 shadow-2xl shadow-cyan-950/80 my-auto text-slate-100">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-inner">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  Elevate Hive Cloud Authentication
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Cloud Synced</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                {authMode === 'signup' ? 'Create New Elevate Hive Account' : 'Sign In to Elevate Hive Workspace'}
              </h2>
            </div>
          </div>

          <button
            id="btn-close-auth-modal"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Mode Switcher (Register vs Sign In) */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-950/90 border border-slate-800/80 text-xs font-mono font-bold">
          <button
            id="tab-auth-register"
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
              authMode === 'signup'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Register (New User)</span>
          </button>

          <button
            id="tab-auth-signin"
            type="button"
            onClick={() => {
              setAuthMode('login');
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
              authMode === 'login'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In (Old User)</span>
          </button>
        </div>

        {/* Feedback alerts */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* 1-Click Quick Preset Account Buttons */}
        <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Quick 1-Click Role Profiles (Autofills All Details)</span>
            </span>
            <span className="text-[10px] text-cyan-400 font-mono">5 Roles Available</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {INITIAL_DEMO_USERS.map((demo) => {
              const isActive = selectedRole.id === demo.role && email === demo.email;
              return (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => handleApplyPreset(demo)}
                  className={`p-2 rounded-xl text-left border transition-all text-[11px] font-mono flex flex-col justify-between ${
                    isActive
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200 shadow-sm'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-semibold truncate text-white capitalize">
                    {demo.role.replace('-', ' ')}
                  </div>
                  <div className="text-[10px] opacity-75 truncate">{demo.name.split(' ')[0]}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SHARED COMPREHENSIVE FORM (Includes identical fields for both Register & Sign In) */}
        <form onSubmit={authMode === 'signup' ? handleRegister : handleLogin} className="space-y-4">
          
          {/* 1. Choose Your Role */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-semibold text-cyan-300 flex items-center gap-1.5">
                <span>Selected Workspace Role</span>
                <span className="text-rose-400">*</span>
              </label>
              <span className="text-[11px] font-mono text-slate-400">
                {selectedRole.title} ({selectedRole.subtitle})
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {ROLES_DATA.map((role) => {
                const isSel = selectedRole.id === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleRoleSelect(role)}
                    className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      isSel
                        ? 'bg-cyan-500/20 border-cyan-400/80 text-cyan-200 shadow-md shadow-cyan-950'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    {getRoleIcon(role.iconName)}
                    <span className="text-[11px] font-semibold leading-tight line-clamp-1">
                      {role.title.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. All Detail Input Fields (Full Name, Email, Institution, Roll/ID, Password) */}
          <div className="space-y-3 pt-1">
            
            {/* Full Name & Registered Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Full Name / Profile Name</span>
                  <span className="text-rose-400">*</span>
                </label>
                <input
                  id="auth-input-fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Email Address</span>
                  <span className="text-rose-400">*</span>
                </label>
                <input
                  id="auth-input-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@university.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                  required
                />
              </div>
            </div>

            {/* Institution & Role-specific ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{labels.institutionLabel}</span>
                  <span className="text-rose-400">*</span>
                </label>
                <input
                  id="auth-input-institution"
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder={labels.institutionPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{labels.idLabel}</span>
                  <span className="text-rose-400">*</span>
                </label>
                <input
                  id="auth-input-role-id"
                  type="text"
                  value={roleSpecificId}
                  onChange={(e) => setRoleSpecificId(e.target.value)}
                  placeholder={labels.idPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                  required
                />
              </div>
            </div>

            {/* Password with Eye Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Password / Passcode</span>
                  <span className="text-rose-400">*</span>
                </label>
                <span className="text-[10px] font-mono text-slate-400">
                  {authMode === 'login' ? 'Demo password: student123 or password123' : 'Min 6 characters'}
                </span>
              </div>
              <div className="relative">
                <input
                  id="auth-input-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
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

          </div>

          {/* Action Button */}
          <button
            id="btn-auth-submit"
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>
              {authMode === 'signup' 
                ? `Register as ${selectedRole.title} & Sync Cloud` 
                : `Sign In as ${selectedRole.title} (${email})`}
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Footer Subtext */}
          <div className="text-center pt-1">
            <p className="text-[11px] text-slate-400 font-mono">
              {authMode === 'signup' ? (
                <>
                  Already registered with these details?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMessage('');
                    }}
                    className="text-cyan-400 hover:underline font-semibold"
                  >
                    Switch to Sign In
                  </button>
                </>
              ) : (
                <>
                  New to Elevate Hive?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signup');
                      setErrorMessage('');
                    }}
                    className="text-cyan-400 hover:underline font-semibold"
                  >
                    Create a New Registration
                  </button>
                </>
              )}
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
