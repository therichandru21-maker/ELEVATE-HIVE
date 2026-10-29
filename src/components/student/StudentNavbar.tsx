import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Bell, 
  Calendar as CalendarIcon, 
  ChevronDown, 
  User, 
  LogOut, 
  Settings, 
  ShieldCheck, 
  Zap, 
  Command,
  CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../../lib/authStore';

interface StudentNavbarProps {
  user: UserProfile;
  onOpenSearch: () => void;
  onOpenAICopilot: () => void;
  onOpenNotifications: () => void;
  onOpenCalendar: () => void;
  onLogout: () => void;
  onSelectTab: (tab: any) => void;
  onRoleChange?: (role: any) => void;
  onExitToLanding?: () => void;
}

export const StudentNavbar: React.FC<StudentNavbarProps> = ({
  user,
  onOpenSearch,
  onOpenAICopilot,
  onOpenNotifications,
  onOpenCalendar,
  onLogout,
  onSelectTab,
  onRoleChange,
  onExitToLanding
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="w-full bg-[#07090E]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-30 select-none">
      
      {/* Search Input Box */}
      <div className="flex-1 max-w-md">
        <button
          onClick={onOpenSearch}
          className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-slate-200 text-xs transition-all flex items-center justify-between group shadow-inner"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            <span className="font-sans">Search hackathons, teammates, projects, lessons...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400">
            <Command className="w-3 h-3" /> K
          </kbd>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* AI Assistant Button */}
        <button
          onClick={onOpenAICopilot}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-950/40 hover:scale-[1.02] transition-all"
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="hidden sm:inline">AI Copilot</span>
        </button>

        {/* Calendar Button */}
        <button
          onClick={onOpenCalendar}
          className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all relative"
          title="Upcoming Calendar Events"
        >
          <CalendarIcon className="w-4.5 h-4.5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400"></span>
        </button>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all relative"
          title="Notifications"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold">
            4
          </span>
        </button>

        {/* Vertical Divider */}
        <div className="h-6 w-[1px] bg-slate-800 mx-1 hidden sm:block"></div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
          >
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-bold text-xs text-white">
                {user.name ? user.name.charAt(0) : 'S'}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#07090E]"></span>
            </div>

            <div className="text-left hidden lg:block">
              <span className="block text-xs font-bold text-white leading-tight truncate max-w-[120px]">
                {user.name}
              </span>
              <span className="block text-[10px] font-mono text-cyan-400 leading-tight">
                Student • {user.roleSpecificId || '21BCE1042'}
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Dropdown Menu */}
          {profileDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl border border-slate-800 p-2 space-y-1 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <div className="p-3 border-b border-slate-800 text-xs">
                <p className="font-bold text-white">{user.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                <div className="mt-2 flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 font-mono text-[10px] border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Verified GitHub & NIRF Campus</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  onSelectTab('profile');
                }}
                className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-cyan-400" />
                <span>My Student Profile</span>
              </button>

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  onSelectTab('settings');
                }}
                className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 flex items-center gap-2"
              >
                <Settings className="w-4 h-4 text-purple-400" />
                <span>Account & Preferences</span>
              </button>

              {onRoleChange && (
                <div className="pt-1.5 pb-1 border-t border-slate-800 space-y-1">
                  <span className="px-3 text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Switch Stakeholder Dashboard
                  </span>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onRoleChange('recruiter');
                    }}
                    className="w-full px-3 py-1.5 rounded-lg text-left text-xs text-indigo-300 hover:bg-indigo-950/40 hover:text-indigo-200 flex items-center justify-between"
                  >
                    <span>Recruiter Dashboard</span>
                    <span className="text-[10px] font-mono text-indigo-400">Talent AI</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onRoleChange('teacher-mentor');
                    }}
                    className="w-full px-3 py-1.5 rounded-lg text-left text-xs text-emerald-300 hover:bg-emerald-950/40 hover:text-emerald-200 flex items-center justify-between"
                  >
                    <span>Teacher / Mentor</span>
                    <span className="text-[10px] font-mono text-emerald-400">Learning</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onRoleChange('hackathon-creator');
                    }}
                    className="w-full px-3 py-1.5 rounded-lg text-left text-xs text-amber-300 hover:bg-amber-950/40 hover:text-amber-200 flex items-center justify-between"
                  >
                    <span>Hackathon Organizer</span>
                    <span className="text-[10px] font-mono text-amber-400">Events</span>
                  </button>
                </div>
              )}

              <div className="pt-1.5 border-t border-slate-800">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-rose-300 hover:bg-rose-500/15 flex items-center gap-2 group transition-colors"
                >
                  <LogOut className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                  <span>Log Out of Elevate Hive</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
