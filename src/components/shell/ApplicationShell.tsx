import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Search, 
  Bell, 
  HelpCircle, 
  ChevronDown, 
  LogOut, 
  ArrowLeft, 
  Menu, 
  X, 
  Briefcase, 
  BookOpen, 
  Trophy, 
  GraduationCap, 
  Users, 
  FileText, 
  Compass, 
  BarChart3, 
  Calendar, 
  ShieldCheck, 
  Layers, 
  ChevronRight
} from 'lucide-react';
import { UserProfile } from '../../lib/authStore';
import { EcosystemState } from '../../lib/ecosystemStore';
import { AIAssistantDrawer } from './AIAssistantDrawer';

export type DashboardRole = 'recruiter' | 'teacher-mentor' | 'hackathon-creator' | 'student';

interface ApplicationShellProps {
  currentUser: UserProfile;
  activeRole: DashboardRole;
  onRoleChange: (role: DashboardRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  onExitToLanding: () => void;
  ecosystem: EcosystemState;
  children: React.ReactNode;
}

export const ApplicationShell: React.FC<ApplicationShellProps> = ({
  currentUser,
  activeRole,
  onRoleChange,
  activeTab,
  onTabChange,
  onLogout,
  onExitToLanding,
  ecosystem,
  children
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Role metadata with dark theme styling
  const roleConfig = {
    recruiter: {
      title: 'Talent Intelligence',
      tagline: 'AI Candidate Sourcing & Pipeline',
      badge: 'Recruiter Hub',
      badgeColor: 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30',
      icon: Briefcase,
      tabs: [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'discovery', label: 'AI Talent Discovery', icon: Compass },
        { id: 'jobs', label: 'Job Management', icon: Briefcase },
        { id: 'pipeline', label: 'Applicant Tracking', icon: Users },
        { id: 'analytics', label: 'Recruitment Analytics', icon: BarChart3 }
      ]
    },
    'teacher-mentor': {
      title: 'Learning Intelligence',
      tagline: 'Mentorship & Skill Progress',
      badge: 'Mentor Hub',
      badgeColor: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
      icon: BookOpen,
      tabs: [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'students', label: 'Student Progress', icon: Users },
        { id: 'skill-gap', label: 'AI Skill Gap Analysis', icon: Sparkles },
        { id: 'reviews', label: 'Project Reviews', icon: FileText },
        { id: 'mentorship', label: 'Mentorship Management', icon: Calendar },
        { id: 'supportive', label: 'Supportive Insights', icon: ShieldCheck }
      ]
    },
    'hackathon-creator': {
      title: 'Innovation Hub',
      tagline: 'Events, Judging & Hackathons',
      badge: 'Organizer Hub',
      badgeColor: 'bg-amber-950/60 text-amber-300 border-amber-500/30',
      icon: Trophy,
      tabs: [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'events', label: 'Hackathon Management', icon: Trophy },
        { id: 'participants', label: 'Participants & Teams', icon: Users },
        { id: 'submissions', label: 'Project Submissions', icon: FileText },
        { id: 'judging', label: 'Judging & Evaluation', icon: ShieldCheck },
        { id: 'showcase', label: 'Innovation Discovery', icon: Compass }
      ]
    },
    student: {
      title: 'Student Portal',
      tagline: 'Learn | Connect | Grow',
      badge: 'Student Dev',
      badgeColor: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30',
      icon: GraduationCap,
      tabs: [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'discovery', label: 'Hackathons & Teams', icon: Trophy },
        { id: 'projects', label: 'My Projects', icon: Layers },
        { id: 'interview', label: 'AI Mock Interviews', icon: Sparkles },
        { id: 'jobs', label: 'Fast-Track Internships', icon: Briefcase }
      ]
    }
  };

  const currentConfig = roleConfig[activeRole] || roleConfig.recruiter;

  const notifications = [
    {
      id: 'n-1',
      title: 'New Applicant Match (96%)',
      desc: 'Aarav Sharma matched the Full-Stack AI Software Engineer job profile.',
      time: '10m ago',
      role: 'recruiter',
      unread: true
    },
    {
      id: 'n-2',
      title: 'Milestone Submission Ready',
      desc: 'Aarav Sharma submitted Milestone 4 for Multi-Agent Debugger review.',
      time: '1h ago',
      role: 'teacher-mentor',
      unread: true
    },
    {
      id: 'n-3',
      title: 'Hackathon Registration Milestone',
      desc: 'National Generative AI Sprint 2026 reached 1,240 registered hackers.',
      time: '2h ago',
      role: 'hackathon-creator',
      unread: false
    },
    {
      id: 'n-4',
      title: 'Supportive Check-in Suggested',
      desc: 'Rohan Mehta has been inactive for 14 days on Web Vitals milestone.',
      time: '1d ago',
      role: 'teacher-mentor',
      unread: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* LEFT SIDEBAR (Desktop) */}
      <aside
        className={`hidden md:flex flex-col bg-[#0B0F17]/95 backdrop-blur-2xl border-r border-slate-800/80 transition-all duration-300 z-30 sticky top-0 h-screen ${
          sidebarCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-indigo-900/30 border border-indigo-400/20">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base tracking-tight text-white">Elevate Hive</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">
                    SaaS
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                  Learn | Connect | Grow
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Current Active Workspace Indicator */}
        {!sidebarCollapsed && (
          <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-xs font-semibold text-white block leading-tight">
                  {currentConfig.title}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {currentConfig.tagline}
                </span>
              </div>
            </div>
            <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${currentConfig.badgeColor}`}>
              {currentConfig.badge}
            </span>
          </div>
        )}

        {/* Nav Tabs */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
          <div className="px-3 pb-2 text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
            {!sidebarCollapsed ? 'Workspaces' : '•'}
          </div>

          {currentConfig.tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500/20 via-violet-500/15 to-purple-500/10 border border-indigo-500/50 text-indigo-300 shadow-md shadow-indigo-950/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
                title={tab.label}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${
                  isActive ? 'bg-indigo-600 text-white' : 'bg-slate-900/80 text-slate-400 group-hover:text-indigo-400'
                }`}>
                  <IconComponent className="w-4 h-4 flex-shrink-0" />
                </div>
                {!sidebarCollapsed && <span className="truncate tracking-wide">{tab.label}</span>}
              </button>
            );
          })}

          <div className="pt-4 px-3 pb-2 text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
            {!sidebarCollapsed ? 'Intelligence' : '•'}
          </div>

          {/* AI Assistant Button */}
          <button
            onClick={() => setAiDrawerOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/30 text-indigo-200 hover:border-indigo-400/60 transition-all shadow-md group"
          >
            <div className="p-1.5 rounded-lg bg-indigo-600/30 text-indigo-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse group-hover:text-white" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 text-left">
                <span className="font-semibold block text-indigo-200 leading-tight">Elevate Hive AI</span>
                <span className="text-[10px] text-indigo-400 block">Context Assistant</span>
              </div>
            )}
          </button>
        </div>

        {/* User Account & Bottom Actions */}
        <div className="p-3 border-t border-slate-800/80 bg-[#0B0F17]">
          <div className={`p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <img
              src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt={currentUser.name}
              className="w-8 h-8 rounded-lg object-cover border border-slate-700"
            />
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{currentUser.institution || 'Elevate Hive'}</p>
              </div>
            )}
          </div>

          {!sidebarCollapsed && (
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <button
                onClick={onExitToLanding}
                className="hover:text-indigo-400 flex items-center gap-1 transition-colors text-[11px]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Public Site</span>
              </button>
              <button
                onClick={onLogout}
                className="hover:text-rose-400 flex items-center gap-1 transition-colors text-[11px]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#07090E]">
        
        {/* TOP NAVIGATION BAR */}
        <header className="sticky top-0 z-20 bg-[#07090E]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
          
          {/* Left: Mobile hamburger & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Navigation */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
              <span className="font-medium text-slate-300">Elevate Hive</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="font-medium text-slate-300">{currentConfig.title}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-indigo-400 font-semibold capitalize">
                {currentConfig.tabs.find(t => t.id === activeTab)?.label || activeTab}
              </span>
            </div>
          </div>

          {/* Center: Global Search */}
          <div className="flex-1 max-w-md mx-4 hidden lg:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidates, skills, projects, rubrics... (⌘K)"
                className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/80 transition-all"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                ⌘K
              </span>
            </div>
          </div>

          {/* Right: Actions, Role Switcher & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Switch Role Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 hover:border-indigo-500/50 bg-slate-900/90 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-inner"
              >
                <currentConfig.icon className="w-4 h-4 text-indigo-400" />
                <span className="hidden sm:inline">Role: {currentConfig.title}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-[#0D111A] rounded-2xl border border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setRoleMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Authorized Role
                  </div>

                  <button
                    onClick={() => {
                      onRoleChange('recruiter');
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left text-xs transition-colors ${
                      activeRole === 'recruiter' ? 'bg-indigo-950/60 text-indigo-300 font-semibold' : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <Briefcase className="w-4 h-4 text-indigo-400" />
                    <div>
                      <span className="block font-medium">Recruiter Dashboard</span>
                      <span className="block text-[10px] text-slate-400">AI Talent Intelligence</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onRoleChange('teacher-mentor');
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left text-xs transition-colors ${
                      activeRole === 'teacher-mentor' ? 'bg-emerald-950/60 text-emerald-300 font-semibold' : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="block font-medium">Teacher / Mentor Dashboard</span>
                      <span className="block text-[10px] text-slate-400">Learning & Mentorship Intelligence</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onRoleChange('hackathon-creator');
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left text-xs transition-colors ${
                      activeRole === 'hackathon-creator' ? 'bg-amber-950/60 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <div>
                      <span className="block font-medium">Hackathon Organizer Dashboard</span>
                      <span className="block text-[10px] text-slate-400">Innovation & Event Hub</span>
                    </div>
                  </button>

                  <div className="my-1 border-t border-slate-800" />

                  <button
                    onClick={() => {
                      onRoleChange('student');
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left text-xs transition-colors ${
                      activeRole === 'student' ? 'bg-cyan-950/60 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    <div>
                      <span className="block font-medium">Student Portal</span>
                      <span className="block text-[10px] text-slate-400">Developer Portfolio & Hackathons</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* AI Assistant Quick Toggle */}
            <button
              onClick={() => setAiDrawerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white text-xs font-semibold shadow-lg shadow-indigo-900/30 transition-all"
              title="Open AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-spin" />
              <span className="hidden sm:inline">AI Copilot</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
              </button>

              {notificationsOpen && (
                <div 
                  className="absolute right-0 mt-2 w-80 bg-[#0D111A] rounded-2xl border border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setNotificationsOpen(false)}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                    <span className="font-bold text-xs text-white">Ecosystem Notifications</span>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/20">3 new</span>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl border text-xs transition-colors ${
                          n.unread ? 'bg-indigo-950/30 border-indigo-500/30' : 'bg-slate-900/60 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-white">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Help / Support Modal Entry */}
            <button
              onClick={() => setHelpModalOpen(true)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Help and Support"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Return to Public Site */}
            <button
              onClick={onExitToLanding}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Portal</span>
            </button>

          </div>
        </header>

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0B0F17] border-b border-slate-800 p-4 space-y-3 z-20">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-xs text-white">{currentConfig.title} Navigation</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {currentConfig.tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium text-left ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-900 border border-slate-800 text-slate-300'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MAIN WORKSPACE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6 bg-[#07090E]">
          {children}
        </main>
      </div>

      {/* AI ASSISTANT DRAWER */}
      <AIAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        user={currentUser}
        currentRole={activeRole}
        ecosystem={ecosystem}
      />

      {/* HELP & SUPPORT MODAL */}
      {helpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D111A] rounded-3xl max-w-lg w-full p-6 border border-slate-800 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base text-white">Elevate Hive Product Support</h3>
              </div>
              <button
                onClick={() => setHelpModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 space-y-1">
                <strong className="text-indigo-300 block font-semibold">Elevate Hive Connected Ecosystem</strong>
                <p className="text-slate-300">
                  Elevate Hive bridges talent, learning, mentorship, and hackathons. Changes in any workspace immediately update the shared talent graph.
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60">
                  <strong className="text-white block font-medium">Recruiter Talent Intelligence</strong>
                  <span className="text-slate-400">Discover candidates by verified GitHub commits and hackathon standings. Sourcing decisions are supported with transparent match indicators.</span>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60">
                  <strong className="text-white block font-medium">Teacher & Mentor Intelligence</strong>
                  <span className="text-slate-400">Review student project milestones, run AI skill gap analysis against target jobs, and approve structured learning roadmaps.</span>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60">
                  <strong className="text-white block font-medium">Hackathon Innovation Hub</strong>
                  <span className="text-slate-400">Design events with calibrated problem statements, utilize AI team formation matchmaking, and evaluate submissions with multi-criteria rubrics.</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">Documentation v2.6 • SaaS Production Ready</span>
              <button
                onClick={() => setHelpModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-900/40"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
