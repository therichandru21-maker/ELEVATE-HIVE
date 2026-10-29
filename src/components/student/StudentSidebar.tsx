import React from 'react';
import { 
  LayoutDashboard, 
  Trophy, 
  FolderGit2, 
  Bot, 
  Users, 
  BookOpen, 
  Briefcase, 
  FileText, 
  Award, 
  BarChart3, 
  MessageSquare, 
  Bell, 
  User, 
  Settings,
  Sparkles,
  ChevronRight,
  Flame,
  Globe
} from 'lucide-react';

export type StudentNavTab = 
  | 'dashboard'
  | 'hackathons'
  | 'projects'
  | 'ai-mentor'
  | 'team-builder'
  | 'learning-hub'
  | 'internships'
  | 'resume-builder'
  | 'certificates'
  | 'leaderboard'
  | 'community'
  | 'messages'
  | 'notifications'
  | 'profile'
  | 'settings';

interface StudentSidebarProps {
  activeTab: StudentNavTab;
  onSelectTab: (tab: StudentNavTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  streakDays: number;
}

export const StudentSidebar: React.FC<StudentSidebarProps> = ({
  activeTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  streakDays
}) => {
  const navItems: { id: StudentNavTab; label: string; icon: React.ReactNode; badge?: string; category?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'hackathons', label: 'Hackathons', icon: <Trophy className="w-4 h-4" />, badge: '3 Live' },
    { id: 'projects', label: 'My Projects', icon: <FolderGit2 className="w-4 h-4" />, badge: '5 Active' },
    { id: 'ai-mentor', label: 'AI Mentor', icon: <Bot className="w-4 h-4" />, badge: 'AI Live' },
    { id: 'team-builder', label: 'AI Team Builder', icon: <Users className="w-4 h-4" /> },
    { id: 'learning-hub', label: 'Learning Hub', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'internships', label: 'Internships', icon: <Briefcase className="w-4 h-4" />, badge: '12 Match' },
    { id: 'resume-builder', label: 'Resume Builder', icon: <FileText className="w-4 h-4" /> },
    { id: 'certificates', label: 'Certificates', icon: <Award className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'community', label: 'Community', icon: <Globe className="w-4 h-4" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-4 h-4" />, badge: '2' },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, badge: '4' },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside 
      className={`relative h-full bg-[#07090E]/95 backdrop-blur-2xl border-r border-slate-800/80 transition-all duration-300 flex flex-col justify-between select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header / Brand */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-display font-extrabold text-sm text-white tracking-tight">Student Portal</span>
              <span className="block text-[10px] font-mono text-cyan-400">Elevate Hive v2.4</span>
            </div>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all mx-auto"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${collapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {/* Main Navigation Items */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-purple-500/10 border border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`p-1.5 rounded-lg transition-colors ${
                  isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900/80 text-slate-400 group-hover:text-cyan-400'
                }`}>
                  {item.icon}
                </div>
                {!collapsed && (
                  <span className="truncate tracking-wide font-medium">{item.label}</span>
                )}
              </div>

              {!collapsed && item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                  isActive 
                    ? 'bg-cyan-400 text-slate-950'
                    : 'bg-slate-800 text-slate-300 border border-slate-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Streak Widget */}
      {!collapsed ? (
        <div className="p-3 m-3 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-950 border border-amber-500/30 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span>{streakDays} Days Coding Streak</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">🔥 Shield Active</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full w-[85%] rounded-full"></div>
          </div>
          <p className="text-[10px] text-slate-400">Keep coding daily to maintain your FAANG campus ranking boost!</p>
        </div>
      ) : (
        <div className="p-3 text-center" title={`${streakDays} Days Streak`}>
          <Flame className="w-5 h-5 text-amber-400 mx-auto fill-amber-400 animate-pulse" />
        </div>
      )}
    </aside>
  );
};
