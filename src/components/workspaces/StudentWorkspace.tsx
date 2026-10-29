import React, { useState } from 'react';
import { UserProfile } from '../../lib/authStore';
import { StudentSidebar, StudentNavTab } from '../student/StudentSidebar';
import { StudentNavbar } from '../student/StudentNavbar';
import { DashboardWidgets } from '../student/DashboardWidgets';
import { AICopilotDrawer } from '../student/AICopilotDrawer';
import { CalendarModal } from '../student/CalendarModal';
import { NotificationsModal } from '../student/NotificationsModal';
import { SearchModal } from '../student/SearchModal';
import { PracticeInterview } from '../PracticeInterview';
import { 
  Trophy, 
  FolderGit2, 
  Bot, 
  Users, 
  BookOpen, 
  Briefcase, 
  FileText, 
  Award, 
  BarChart3, 
  Globe, 
  MessageSquare, 
  Bell, 
  User, 
  Settings, 
  Sparkles, 
  Code2, 
  Zap, 
  CheckCircle2, 
  Star, 
  ExternalLink,
  Plus,
  Github,
  Flame,
  Send,
  Search,
  Check
} from 'lucide-react';

interface StudentWorkspaceProps {
  user: UserProfile;
  onLogout?: () => void;
  onRoleChange?: (role: any) => void;
  onExitToLanding?: () => void;
}

export const StudentWorkspace: React.FC<StudentWorkspaceProps> = ({ 
  user, 
  onLogout = () => {},
  onRoleChange,
  onExitToLanding
}) => {
  const [activeTab, setActiveTab] = useState<StudentNavTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Modals & Drawers state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAICopilotOpen, setIsAICopilotOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // AI Sandbox state for AI Mentor tab
  const [codeSnippet, setCodeSnippet] = useState<string>(
    "function handleData(items) {\n  let result = [];\n  for (let i = 0; i < items.length; i++) {\n    if (items[i].active) {\n      result.push(items[i]);\n    }\n  }\n  return result;\n}"
  );
  const [aiMentorResponse, setAiMentorResponse] = useState<string | null>(null);
  const [isAnalyzingCode, setIsAnalyzingCode] = useState(false);

  // Hackathons Data
  const [hackathons, setHackathons] = useState([
    {
      id: 'h1',
      title: 'National Generative AI Sprint 2026',
      organizer: 'IIT Bombay & Elevate Hive',
      prize: '$15,000 USD',
      participants: 1240,
      daysLeft: 4,
      registered: true
    },
    {
      id: 'h2',
      title: 'Global Web3 & Autonomous Agents League',
      organizer: 'Solana Foundation',
      prize: '$25,000 USD',
      participants: 890,
      daysLeft: 12,
      registered: false
    },
    {
      id: 'h3',
      title: 'YC Hacker Grand Prix 2026',
      organizer: 'Y Combinator',
      prize: '$50,000 USD + Interview',
      participants: 2310,
      daysLeft: 18,
      registered: false
    }
  ]);

  const handleAnalyzeCode = () => {
    setIsAnalyzingCode(true);
    setTimeout(() => {
      setIsAnalyzingCode(false);
      setAiMentorResponse(
        "⚡ AI Mentor Audit:\n1. Optimization: Replace loop with `items.filter(item => item.active)` for declarative ES6 execution.\n2. Security Check: Validate `Array.isArray(items)` before invocation.\n3. Complexity: O(N) Time, O(N) Space."
      );
    }, 1200);
  };

  return (
    <div className="flex h-screen w-full bg-[#030508] text-slate-100 overflow-hidden font-sans">
      
      {/* 1. LEFT SIDEBAR */}
      <StudentSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        streakDays={28}
      />

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* TOP NAVBAR */}
        <StudentNavbar
          user={user}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAICopilot={() => setIsAICopilotOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenCalendar={() => setIsCalendarOpen(true)}
          onLogout={onLogout}
          onSelectTab={setActiveTab}
          onRoleChange={onRoleChange}
          onExitToLanding={onExitToLanding}
        />

        {/* WORKSPACE BODY VIEW */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <DashboardWidgets
              user={user}
              onSelectTab={setActiveTab}
              onOpenAICopilot={() => setIsAICopilotOpen(true)}
            />
          )}

          {/* TAB 2: HACKATHONS */}
          {activeTab === 'hackathons' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-bold text-white">Hackathons & Competitions</h2>
                  <p className="text-xs text-slate-400">Discover top university & global hackathons with AI team matching</p>
                </div>
                <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs">
                  + Submit Team Project
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hackathons.map((h) => (
                  <div key={h.id} className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4 flex flex-col justify-between hover:border-cyan-500/40 transition-all">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                          Prize: {h.prize}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{h.daysLeft} Days Left</span>
                      </div>
                      <h3 className="text-lg font-display font-bold text-white">{h.title}</h3>
                      <p className="text-xs text-slate-400">Organized by {h.organizer} • {h.participants} Hackers</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> AI Skill Match: 98%
                      </span>
                      <button
                        onClick={() => {
                          setHackathons(prev => prev.map(item => item.id === h.id ? { ...item, registered: !item.registered } : item));
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          h.registered
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400'
                        }`}
                      >
                        {h.registered ? 'Registered ✓' : 'Register Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MY PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-bold text-white">My Projects & Repositories</h2>
                  <p className="text-xs text-slate-400">Synced directly with GitHub commits & Elevate Hive code audits</p>
                </div>
                <button className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2">
                  <Plus className="w-4 h-4" /> New AI Repository
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                      <Github className="w-4 h-4" /> richandru/rag-ai-copilot
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                      Build Passing ✓
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Autonomous RAG LLM Code Search</h3>
                  <p className="text-xs text-slate-400">Vector store indexer with Qdrant and Gemini 1.5 Pro Flash integration.</p>
                  <div className="flex items-center justify-between pt-2 text-xs font-mono text-slate-400">
                    <span>Stars: 142 ★</span>
                    <span>PRs: 2 Open</span>
                    <span>Updated 2h ago</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-purple-400 flex items-center gap-1.5">
                      <Github className="w-4 h-4" /> richandru/solana-dex-agent
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px]">
                      In Review
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Autonomous Trading Agent on Solana</h3>
                  <p className="text-xs text-slate-400">Smart contract automated rebalancer built with Rust & Anchor framework.</p>
                  <div className="flex items-center justify-between pt-2 text-xs font-mono text-slate-400">
                    <span>Stars: 89 ★</span>
                    <span>PRs: 1 Open</span>
                    <span>Updated 1d ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AI MENTOR */}
          {activeTab === 'ai-mentor' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-2">
                <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                  <Bot className="w-6 h-6 text-cyan-400" />
                  AI Code Auditor & Practice Interviewer
                </h2>
                <p className="text-xs text-slate-400">Practice real-time technical interviews and debug your code snippets with instant AI feedback.</p>
              </div>

              {/* Practice Interview Component */}
              <PracticeInterview />

              {/* Code Sandbox Component */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-cyan-400" />
                    Live Code Debugging Sandbox
                  </h3>
                  <textarea
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    rows={8}
                    className="w-full p-4 rounded-xl bg-slate-950 font-mono text-xs text-cyan-200 border border-slate-800 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={handleAnalyzeCode}
                    disabled={isAnalyzingCode}
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>{isAnalyzingCode ? 'Analyzing Code...' : 'Audit Code with AI Mentor'}</span>
                  </button>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                    AI Code Audit Results
                  </h3>
                  {aiMentorResponse ? (
                    <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
                      {aiMentorResponse}
                    </pre>
                  ) : (
                    <div className="p-8 text-center text-slate-500 text-xs font-mono space-y-2">
                      <Bot className="w-8 h-8 mx-auto text-slate-600" />
                      <p>Paste code above to get instant AI code quality, security, and complexity reports.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AI TEAM BUILDER */}
          {activeTab === 'team-builder' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-2">
                <h2 className="text-2xl font-display font-bold text-white">AI Team Synergy Matcher</h2>
                <p className="text-xs text-slate-400">Match with complementary teammates for hackathons based on skill overlap & timezones.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Ananya Verma', institution: 'BITS Pilani', skills: ['Rust', 'Solana', 'Cryptography'], match: 98 },
                  { name: 'Rohan Mehta', institution: 'IIT Delhi', skills: ['PyTorch', 'FastAPI', 'MLOps'], match: 94 },
                  { name: 'Siddharth Rao', institution: 'IIT Madras', skills: ['React', 'Tailwind', 'UI/UX'], match: 91 },
                ].map((mate, idx) => (
                  <div key={idx} className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-emerald-400 font-bold">{mate.match}% Synergy</span>
                      <span className="text-[10px] text-slate-400 font-mono">{mate.institution}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{mate.name}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {mate.skills.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-300">
                          {s}
                        </span>
                      ))}
                    </div>
                    <button className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs">
                      Send Hackathon Invite
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: LEARNING HUB */}
          {activeTab === 'learning-hub' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-2">
                <h2 className="text-2xl font-display font-bold text-white">Interactive Learning Hub</h2>
                <p className="text-xs text-slate-400">FAANG-curated modules in Generative AI, System Design, and Web3.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Generative AI Architecture', progress: 75, instructor: 'Google AI Lab' },
                  { title: 'Advanced Distributed Systems', progress: 40, instructor: 'MIT Open Coursework' },
                  { title: 'Smart Contract Auditing', progress: 20, instructor: 'Solana Foundation' },
                ].map((course, idx) => (
                  <div key={idx} className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
                    <span className="text-xs font-mono text-teal-400">{course.instructor}</span>
                    <h3 className="text-lg font-bold text-white">{course.title}</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div className="bg-teal-400 h-full rounded-full" style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                    <button className="w-full py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs">
                      Continue Learning
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: INTERNSHIPS */}
          {activeTab === 'internships' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-2">
                <h2 className="text-2xl font-display font-bold text-white">1-Click Match Internships</h2>
                <p className="text-xs text-slate-400">Direct placement opportunities verified with your Elevate Hive ATS score.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { role: 'Fullstack Engineer Intern', company: 'Cursor AI (YC S23)', salary: '$3,500 / month', match: '96%' },
                  { role: 'Generative AI Research Intern', company: 'OpenAI Research', salary: '$5,000 / month', match: '94%' },
                  { role: 'Backend Systems Engineer', company: 'Stripe India', salary: '$4,200 / month', match: '92%' },
                ].map((job, idx) => (
                  <div key={idx} className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-400">{job.company}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">{job.match} ATS Match</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{job.role}</h3>
                    <p className="text-xs text-slate-400 font-mono">{job.salary} • Remote / Hybrid</p>
                    <button className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs">
                      1-Click Fast Apply with Elevate Hive Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: RESUME BUILDER */}
          {activeTab === 'resume-builder' && (
            <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-bold text-white">AI ATS Resume Builder</h2>
                  <p className="text-xs text-slate-400">Auto-populated with your verified GitHub commits, hackathon trophies, and campus rank.</p>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs border border-emerald-500/30">
                  Current ATS Score: 94 / 100
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white">{user.name}</h3>
                  <p className="text-slate-400">{user.email} • {user.institution || 'IIT Bombay'} • Roll: {user.roleSpecificId || '21BCE1042'}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-cyan-400 font-bold block">VERIFIED HACKATHON ACHIEVEMENTS</span>
                  <p className="text-slate-300">• 1st Place - National Generative AI Sprint 2026 ($15,000 USD Prize)</p>
                  <p className="text-slate-300">• Top 10 Finalist - Solana Autonomous Agents League</p>
                </div>

                <div className="space-y-2">
                  <span className="text-purple-400 font-bold block">SKILLS & ARCHITECTURE</span>
                  <p className="text-slate-300">• Languages: TypeScript, Python, Rust, C++</p>
                  <p className="text-slate-300">• Frameworks: React 19, FastAPI, PyTorch, Node.js, Tailwind CSS</p>
                </div>
              </div>

              <button className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs">
                Download PDF Resume (ATS Optimized)
              </button>
            </div>
          )}

          {/* TAB 9: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-2">
                <h2 className="text-2xl font-display font-bold text-white">Verifiable Cryptographic Certificates</h2>
                <p className="text-xs text-slate-400">Cryptographically signed credentials backed by Elevate Hive and University Deans.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'AI Engineer Level 1 Master Certificate', date: 'Jan 2026', id: 'EH-2026-9921' },
                  { title: 'National GenAI Sprint 1st Place Winner', date: 'Feb 2026', id: 'EH-2026-1042' },
                ].map((cert, idx) => (
                  <div key={idx} className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px]">VERIFIED CREDENTIAL</span>
                    <h3 className="text-lg font-bold text-white">{cert.title}</h3>
                    <p className="text-xs text-slate-400 font-mono">Credential ID: {cert.id} • Issued: {cert.date}</p>
                    <button className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 hover:text-white">
                      View On-Chain Verification Link
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: LEADERBOARD */}
          {activeTab === 'leaderboard' && (
            <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-bold text-white">National Student Developer Leaderboard</h2>
                  <p className="text-xs text-slate-400">Rankings calculated via GitHub commits, hackathons won, and peer code reviews.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs">
                  Your Rank: #4 Overall
                </span>
              </div>

              <div className="space-y-2">
                {[
                  { rank: 1, name: 'Aarav Sharma', institution: 'IIT Bombay', points: 4820, avatar: 'A' },
                  { rank: 2, name: 'Priya Sundaram', institution: 'IIT Madras', points: 4610, avatar: 'P' },
                  { rank: 3, name: 'Vikramaditya K', institution: 'BITS Pilani', points: 4450, avatar: 'V' },
                  { rank: 4, name: user.name, institution: user.institution || 'IIT Bombay', points: 4290, avatar: 'S', isUser: true },
                  { rank: 5, name: 'Neha Gupta', institution: 'IIT Delhi', points: 4100, avatar: 'N' },
                ].map((row) => (
                  <div 
                    key={row.rank} 
                    className={`p-4 rounded-2xl flex items-center justify-between font-mono text-xs ${
                      row.isUser ? 'bg-cyan-500/20 border border-cyan-500/50 text-white' : 'bg-slate-950 border border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                        row.rank === 1 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {row.rank}
                      </span>
                      <div>
                        <span className="font-bold text-white block">{row.name}</span>
                        <span className="text-[10px] text-slate-400">{row.institution}</span>
                      </div>
                    </div>
                    <span className="font-bold text-cyan-400">{row.points} DevPoints</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: COMMUNITY */}
          {activeTab === 'community' && (
            <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-display font-bold text-white">Student Developer Community</h2>
              <p className="text-xs text-slate-400">Discuss open-source projects, hackathon ideas, and career tips.</p>
              
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono text-cyan-400">#hackathon-prep</span>
                  <h3 className="text-sm font-bold text-white">Best architectural stack for 24-hour LLM hackathons?</h3>
                  <p className="text-xs text-slate-400">FastAPI + Vite + Supabase/Qdrant is super fast to deploy!</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-display font-bold text-white">Student Direct Messages</h2>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Ananya Verma</h3>
                  <p className="text-xs text-slate-400">"Sounds great! Let’s jump on Google Meet to finalize our Solana project architecture."</p>
                </div>
                <span className="text-[10px] font-mono text-slate-500">12m ago</span>
              </div>
            </div>
          )}

          {/* TAB 13: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4 animate-in fade-in duration-300">
              <h2 className="text-2xl font-display font-bold text-white">All Notifications</h2>
              <p className="text-xs text-slate-400">Review all recent alerts from campus drives and hackathons.</p>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                You have 4 unread alerts. Check your top navbar bell icon or notifications drawer.
              </div>
            </div>
          )}

          {/* TAB 14: PROFILE */}
          {activeTab === 'profile' && (
            <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[2px]">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-2xl font-bold text-white">
                    {user.name ? user.name.charAt(0) : 'S'}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-white">{user.name}</h2>
                  <p className="text-xs text-slate-400">{user.email} • {user.institution || 'IIT Bombay'}</p>
                  <p className="text-xs text-cyan-400 font-mono mt-1">Roll No: {user.roleSpecificId || '21BCE1042'}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 15: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-display font-bold text-white">Student Account Settings</h2>
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span>GitHub Integration</span>
                  <span className="text-emerald-400 font-mono font-bold">Connected (richandru) ✓</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span>LeetCode Integration</span>
                  <span className="text-emerald-400 font-mono font-bold">Connected (richandru_lc) ✓</span>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* OVERLAY MODALS & DRAWERS */}
      <AICopilotDrawer isOpen={isAICopilotOpen} onClose={() => setIsAICopilotOpen(false)} />
      <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
      <NotificationsModal isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSelectTab={setActiveTab} />

    </div>
  );
};
