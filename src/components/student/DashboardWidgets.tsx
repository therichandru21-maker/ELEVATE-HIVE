import React, { useState } from 'react';
import { 
  Trophy, 
  FolderGit2, 
  Bot, 
  Users, 
  BookOpen, 
  Briefcase, 
  FileText, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Github, 
  Code2, 
  Zap, 
  ArrowRight, 
  Plus, 
  Send, 
  Clock, 
  ShieldAlert, 
  TrendingUp, 
  Star, 
  ExternalLink,
  MessageSquare,
  Megaphone,
  Check,
  ChevronRight,
  Target
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  AreaChart, 
  Area, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  LineChart, 
  Line, 
  CartesianGrid 
} from 'recharts';
import { UserProfile } from '../../lib/authStore';

interface DashboardWidgetsProps {
  user: UserProfile;
  onSelectTab: (tab: any) => void;
  onOpenAICopilot: () => void;
}

export const DashboardWidgets: React.FC<DashboardWidgetsProps> = ({
  user,
  onSelectTab,
  onOpenAICopilot
}) => {
  // Tasks state
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Complete System Design Module 3 (Load Balancers)', completed: true, tag: 'High Priority', time: '45m' },
    { id: 't2', title: 'Submit PR to AI Team Repo (Vector Search Feature)', completed: false, tag: 'GitHub', time: '1h 20m' },
    { id: 't3', title: 'Prepare React Performance Mock Interview', completed: false, tag: 'Interview', time: '30m' },
    { id: 't4', title: 'Update Resume with National GenAI Sprint Win', completed: false, tag: 'Career', time: '15m' },
  ]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Recharts Mock Data
  const weeklyCodingData = [
    { day: 'Mon', hours: 4.5, commits: 12 },
    { day: 'Tue', hours: 6.2, commits: 18 },
    { day: 'Wed', hours: 5.0, commits: 14 },
    { day: 'Thu', hours: 8.1, commits: 24 },
    { day: 'Fri', hours: 7.4, commits: 19 },
    { day: 'Sat', hours: 9.0, commits: 28 },
    { day: 'Sun', hours: 6.8, commits: 16 },
  ];

  const projectTimelineData = [
    { month: 'Mar', AI_Agent: 20, Web3_Wallet: 10, DevPortal: 35 },
    { month: 'Apr', AI_Agent: 45, Web3_Wallet: 30, DevPortal: 60 },
    { month: 'May', AI_Agent: 75, Web3_Wallet: 55, DevPortal: 80 },
    { month: 'Jun', AI_Agent: 95, Web3_Wallet: 85, DevPortal: 98 },
  ];

  const skillRadarData = [
    { subject: 'Frontend React', score: 92 },
    { subject: 'Node.js Backend', score: 88 },
    { subject: 'Generative AI / LLMs', score: 85 },
    { subject: 'System Design', score: 80 },
    { subject: 'Data Structures', score: 90 },
    { subject: 'DevOps & Cloud', score: 72 },
  ];

  const hackathonData = [
    { name: 'Jan Sprint', entered: 1, wins: 1, prize: 5000 },
    { name: 'Feb Web3', entered: 1, wins: 0, prize: 1000 },
    { name: 'Mar AI League', entered: 1, wins: 1, prize: 15000 },
    { name: 'Apr Global', entered: 1, wins: 1, prize: 8000 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. WELCOME HERO CARD */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-accent border-cyan-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-3 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>Elevate Hive Student Hub • {user.institution || 'IIT Bombay'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Welcome back, <span className="text-gradient-cyan">{user.name}</span>! 👋
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            You are ranked <strong className="text-emerald-400">#4 Campus Wide</strong>. Your AI Skill Index is at <strong className="text-cyan-300">98.4%</strong>. You have 3 upcoming hackathons and 2 scheduled interviews this week!
          </p>
        </div>

        {/* Quick Badges Box */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-center min-w-[100px]">
            <span className="text-[10px] font-mono text-slate-400 block">Flame Streak</span>
            <div className="flex items-center justify-center gap-1 text-base font-bold text-amber-400 font-mono">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" /> 28 Days
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-center min-w-[100px]">
            <span className="text-[10px] font-mono text-slate-400 block">Campus Rank</span>
            <span className="text-base font-bold text-emerald-400 font-mono">#4 Overall</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-center min-w-[100px]">
            <span className="text-[10px] font-mono text-slate-400 block">ATS Score</span>
            <span className="text-base font-bold text-purple-400 font-mono">94 / 100</span>
          </div>
        </div>
      </div>

      {/* 2. QUICK ACTIONS BAR */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800/80 space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
          Quick Actions Launchpad
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <button
            onClick={() => onSelectTab('hackathons')}
            className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border border-cyan-500/30 text-cyan-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 group"
          >
            <Trophy className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Join Hackathon</span>
          </button>

          <button
            onClick={() => onSelectTab('projects')}
            className="p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20 border border-purple-500/30 text-purple-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 group"
          >
            <Plus className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <span>Create Project</span>
          </button>

          <button
            onClick={onOpenAICopilot}
            className="p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-500/30 text-emerald-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 group"
          >
            <Bot className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Ask AI Copilot</span>
          </button>

          <button
            onClick={() => onSelectTab('resume-builder')}
            className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 border border-amber-500/30 text-amber-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 group"
          >
            <FileText className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Build Resume</span>
          </button>

          <button
            onClick={() => onSelectTab('internships')}
            className="p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border border-blue-500/30 text-blue-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 col-span-2 sm:col-span-1 group"
          >
            <Briefcase className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <span>Apply Internship</span>
          </button>
        </div>
      </div>

      {/* 3. MAIN WIDGETS GRID - ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Widget A: Today's Tasks */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              Today's Tasks
            </h3>
            <span className="text-xs font-mono text-cyan-400">
              {tasks.filter(t => t.completed).length} / {tasks.length} Done
            </span>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => (
              <div 
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  task.completed 
                    ? 'bg-slate-950/60 border-slate-800/80 text-slate-500 line-through'
                    : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                  task.completed ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'border-slate-600'
                }`}>
                  {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
                </div>

                <div className="flex-1 space-y-1">
                  <p className="text-xs font-medium leading-snug">{task.title}</p>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                    <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300">
                      {task.tag}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" /> {task.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget B: Upcoming Hackathons */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Upcoming Hackathons
            </h3>
            <button 
              onClick={() => onSelectTab('hackathons')}
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">National GenAI Sprint 2026</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                  4 Days Left
                </span>
              </div>
              <p className="text-[11px] text-slate-400">IIT Bombay • Prize Pool: $15,000 USD</p>
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-emerald-400 font-mono">Match Score: 98%</span>
                <span className="text-cyan-300 font-semibold">Registered ✓</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Solana Autonomous Agents</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
                  12 Days Left
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Global Web3 League • Prize Pool: $25,000 USD</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-emerald-400 font-mono text-[11px]">Match Score: 91%</span>
                <button 
                  onClick={() => onSelectTab('hackathons')}
                  className="px-2.5 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[10px]"
                >
                  Join Team
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Widget C: GitHub Activity & LeetCode */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <Github className="w-5 h-5 text-purple-400" />
              GitHub & LeetCode Activity
            </h3>
            <span className="text-xs font-mono text-purple-400">Synced Real-Time</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-400">Total Commits (2026)</span>
              <p className="text-xl font-bold text-cyan-400 font-mono">342</p>
              <span className="text-[9px] text-emerald-400 block">+18 this week</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-400">LeetCode Solved</span>
              <p className="text-xl font-bold text-purple-400 font-mono">342 / 500</p>
              <span className="text-[9px] text-amber-300 block">Rating: 1890 (Knight)</span>
            </div>
          </div>

          {/* GitHub Heatmap Grid Simulation */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-slate-400 block">Contribution Activity Graph</span>
            <div className="grid grid-cols-12 gap-1 p-2 rounded-xl bg-slate-950 border border-slate-800">
              {Array.from({ length: 36 }).map((_, i) => {
                const opacities = ['bg-slate-900', 'bg-cyan-900/60', 'bg-cyan-600', 'bg-cyan-400'];
                const cls = opacities[i % opacities.length];
                return (
                  <div key={i} className={`h-3 rounded-sm ${cls}`} title={`Day ${i+1}: ${i*2} commits`}></div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* 4. CHARTS SECTION - ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Weekly Coding Hours */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                Weekly Coding Hours & Commits
              </h3>
              <p className="text-xs text-slate-400">Monitored via IDE plugin & GitHub push events</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs border border-cyan-500/30">
              Avg: 6.7 hrs/day
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyCodingData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Skill Radar */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                AI Skill Radar Matrix
              </h3>
              <p className="text-xs text-slate-400">Automated evaluation from code reviews & test suite</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 font-mono text-xs border border-purple-500/30">
              Level: Senior Student
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillRadarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                <Radar name="Student Skill" dataKey="score" stroke="#a855f7" fill="#a855f7" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 5. MORE CHARTS & PROJECT TIMELINE - ROW 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 3: Project Milestone Timeline */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-emerald-400" />
              Project Completion Progress Timeline
            </h3>
            <span className="text-xs font-mono text-emerald-400">3 Repos Tracked</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectTimelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="AI_Agent" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Web3_Wallet" fill="#a855f7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="DevPortal" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Hackathon Participation & Prize Earnings */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Hackathon Victories & Prize Pool
            </h3>
            <span className="text-xs font-mono text-amber-400">Total Won: $29,000 USD</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hackathonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="prize" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 6. AI RECOMMENDATIONS & TEAMMATES - ROW 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* AI Recommendations */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            AI Career & Code Recommendations
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-mono font-bold block">1. ATS Optimization Tip</span>
              <p className="text-slate-300">Adding a RAG Vector search project will increase your Google interview match score by +14%.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-purple-400 font-mono font-bold block">2. Recommended Teammate</span>
              <p className="text-slate-300">Ananya Verma (BITS Pilani) has Rust & Solana skills complementary to your frontend expertise.</p>
            </div>
          </div>
        </div>

        {/* Suggested Teammates */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              Suggested AI Teammates
            </h3>
            <button onClick={() => onSelectTab('team-builder')} className="text-xs font-mono text-purple-400 hover:underline">
              Search All
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-white block">Ananya Verma</span>
                <span className="text-[10px] text-slate-400 block">BITS Pilani • Solana & Rust</span>
                <span className="text-[10px] font-mono text-emerald-400">98% Synergy Match</span>
              </div>
              <button 
                onClick={() => onSelectTab('team-builder')}
                className="px-3 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs flex-shrink-0"
              >
                Connect
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-white block">Rohan Mehta</span>
                <span className="text-[10px] text-slate-400 block">IIT Delhi • PyTorch & ML</span>
                <span className="text-[10px] font-mono text-emerald-400">94% Synergy Match</span>
              </div>
              <button 
                onClick={() => onSelectTab('team-builder')}
                className="px-3 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs flex-shrink-0"
              >
                Connect
              </button>
            </div>
          </div>
        </div>

        {/* Recommended Internships */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-400" />
              Top Internship Matches
            </h3>
            <button onClick={() => onSelectTab('internships')} className="text-xs font-mono text-blue-400 hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Fullstack AI Intern @ Cursor</span>
                <span className="text-[10px] font-mono text-emerald-400">96% Match</span>
              </div>
              <p className="text-[11px] text-slate-400">YC S23 Startup • $3,500 / month</p>
              <button 
                onClick={() => onSelectTab('internships')}
                className="w-full py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
              >
                1-Click Apply
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 7. LEARNING, CERTIFICATES & ANNOUNCEMENTS - ROW 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Learning Progress */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-400" />
            Enrolled Learning Track
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between font-bold text-white">
                <span>Generative AI Architectures</span>
                <span className="text-teal-400">75% Complete</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-400 h-full w-[75%] rounded-full"></div>
              </div>
              <button onClick={() => onSelectTab('learning-hub')} className="text-teal-300 font-mono text-[10px] hover:underline">
                Continue Lesson 8: Function Calling →
              </button>
            </div>
          </div>
        </div>

        {/* Recent Certificates */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Verified Certificates
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">AI Engineer Level 1</span>
                <span className="text-[10px] text-slate-400">Issued by Elevate Hive Council</span>
              </div>
              <button onClick={() => onSelectTab('certificates')} className="text-amber-400 font-mono text-[10px]">
                Verify
              </button>
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-indigo-400" />
            Campus Announcements
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-indigo-300 font-mono font-bold block">Dean's Innovation Notice</span>
              <p className="text-slate-300 text-[11px]">All hackathon winners qualify for academic credit release for Spring 2026.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
