import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  Copy, 
  Check, 
  Info,
  CornerDownLeft,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { UserProfile } from '../../lib/authStore';
import { EcosystemState } from '../../lib/ecosystemStore';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  currentRole: 'recruiter' | 'teacher-mentor' | 'hackathon-creator' | 'student';
  ecosystem: EcosystemState;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionTag?: string;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  user,
  currentRole,
  ecosystem
}) => {
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Role tailored sample queries
  const getRolePrompts = () => {
    switch (currentRole) {
      case 'recruiter':
        return [
          'Find candidates with Python and API development experience',
          'Summarise applications for this job',
          'Show the most common skill gaps among these applicants'
        ];
      case 'teacher-mentor':
        return [
          "Create a learning plan for Aarav's stated career goal",
          'Summarise pending project reviews',
          'Suggest practical exercises for JavaScript and accessibility fundamentals'
        ];
      case 'hackathon-creator':
        return [
          'Summarise registration and submission progress',
          'Identify projects awaiting evaluation',
          'Summarise submitted projects by technology category'
        ];
      default:
        return [
          'Recommend next learning milestone for my profile',
          'Suggest hackathon teammates with complementary skills',
          'How can I improve my ATS score for AI Engineer roles?'
        ];
    }
  };

  const getInitialMessage = (): Message => {
    switch (currentRole) {
      case 'recruiter':
        return {
          id: 'init-1',
          sender: 'assistant',
          text: `Hello ${user.name}! I am your Elevate Hive Talent Intelligence Assistant. I can help you query verified candidate skills, parse application pipelines, identify high-synergy hackathon winners, and generate interview screening rubrics.`,
          timestamp: 'Just now'
        };
      case 'teacher-mentor':
        return {
          id: 'init-1',
          sender: 'assistant',
          text: `Welcome, ${user.name}. I am your Learning & Mentorship Intelligence Copilot. I analyze student progression, identify skill gaps against target careers, and assist in drafting structured milestone feedback.`,
          timestamp: 'Just now'
        };
      case 'hackathon-creator':
        return {
          id: 'init-1',
          sender: 'assistant',
          text: `Greetings ${user.name}! I am your Innovation Hub Organizer Assistant. I track registration telemetry, generate rubric guidance, flag unassigned submissions, and provide team formation matchmaking insights.`,
          timestamp: 'Just now'
        };
      default:
        return {
          id: 'init-1',
          sender: 'assistant',
          text: `Hello ${user.name}! I am your Elevate Hive AI Career and Learning Mentor. Ask me anything regarding projects, team matchmaking, or technical interview preparations.`,
          timestamp: 'Just now'
        };
    }
  };

  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Generate contextual intelligent response based on ecosystem data
    setTimeout(() => {
      let replyText = '';
      const qLower = query.toLowerCase();

      if (currentRole === 'recruiter') {
        if (qLower.includes('python') || qLower.includes('api') || qLower.includes('find candidate')) {
          const matchingStudents = ecosystem.students.filter(s => 
            s.skills.some(k => k.name.toLowerCase().includes('python') || k.name.toLowerCase().includes('fastapi'))
          );
          replyText = `🔍 **Candidate Discovery Results** (${matchingStudents.length} verified candidates):\n\n` +
            matchingStudents.map(s => (
              `• **${s.name}** (${s.institution}) - Match Score: **${s.matchScoreForPrimaryRole || 90}%**\n` +
              `  - Documented Skills: ${s.skills.map(k => `${k.name} (${k.level}, ${k.source})`).slice(0, 4).join(', ')}\n` +
              `  - Key Project: "${s.projects[0]?.title}" (${s.projects[0]?.stars} GitHub stars)\n` +
              `  - Evaluation Note: Strong asynchronous backend & FastAPI architecture.`
            )).join('\n\n') +
            `\n\n💡 *Suggested Next Step:* Invite Aarav Sharma and Priya Sen to technical screening via the Candidates workspace.`;
        } else if (qLower.includes('summarise') || qLower.includes('application') || qLower.includes('job')) {
          replyText = `📊 **Application Pipeline Summary**:\n\n` +
            `• **Total Active Job Openings:** ${ecosystem.jobs.length}\n` +
            `• **Total In-Flight Candidates:** ${ecosystem.applications.length}\n` +
            `• **Breakdown by Stage:**\n` +
            `  - Applied: 1\n` +
            `  - Screening: 1\n` +
            `  - Shortlisted: 1\n` +
            `  - Interview: 1 (Aarav Sharma - 9.5 Technical Score)\n` +
            `• **Conversion Rate:** 25% from applied to interview stage. Highest applicant density is in Full-Stack AI roles.`;
        } else if (qLower.includes('skill gap') || qLower.includes('common')) {
          replyText = `🧠 **AI Talent Skill Gap Insight**:\n\n` +
            `Among the illustrative applicants for current open positions:\n` +
            `• **High Availability:** Python (100%), React & TypeScript (75%), PostgreSQL (75%).\n` +
            `• **Under-Represented / Emerging Gaps:** Production Kubernetes Helm deployment, Distributed Consensus (Raft), and Zero-Knowledge Proofs appear in < 25% of candidates.\n\n` +
            `💡 *Recommendation:* Consider sponsoring an intra-college workshop on Distributed Systems to broaden the candidate talent pipeline.`;
        } else {
          replyText = `Based on your Talent Intelligence database of ${ecosystem.students.length} candidates and ${ecosystem.jobs.length} open jobs:\n\n` +
            `You can view live match cards, filter by immediate availability, or schedule fast-track interviews with verified hackathon winners. How else can I assist your sourcing pipeline today?`;
        }
      } else if (currentRole === 'teacher-mentor') {
        if (qLower.includes('learning plan') || qLower.includes('aarav') || qLower.includes('career goal')) {
          replyText = `📋 **AI Draft Learning Plan: Full-Stack AI Engineer (Student: Aarav Sharma)**\n\n` +
            `• **Current Documented Strengths:** Python (Advanced/Verified), FastAPI (Intermediate/Verified), PostgreSQL (Intermediate/Verified).\n` +
            `• **Identified Skill Gaps:**\n` +
            `  1. *Kubernetes & Helm:* Currently Self-Assessed Beginner → Target: Intermediate.\n` +
            `  2. *Distributed Tracing (OpenTelemetry):* Not yet demonstrated in projects.\n` +
            `• **Recommended Practice Project:** "Zero-Downtime Microservice Deployment with Canary Rollouts on Minikube".\n` +
            `• **Suggested 14-Day Checkpoint:** Verify Docker image size < 150MB and configure automated GitHub Action CI.\n\n` +
            `*Status: Draft created in the AI Skill Gap Analysis tab. You can review, edit, and approve before sharing with Aarav.*`;
        } else if (qLower.includes('review') || qLower.includes('submission')) {
          replyText = `📝 **Pending Project Review Summary**:\n\n` +
            `• **Under Review (${ecosystem.mentorSubmissions.length} submissions):**\n` +
            ecosystem.mentorSubmissions.map(s => `  - **${s.projectTitle}** by ${s.studentName} (${s.status}) • Stack: ${s.techStack.join(', ')}`).join('\n') +
            `\n\n⚠️ **Action Required:** Rohan Mehta's "Micro-Interaction Studio" currently has revisions requested for WCAG accessibility. Aarav's Milestone 4 awaits your final rubric approval.`;
        } else if (qLower.includes('support') || qLower.includes('exercise') || qLower.includes('javascript')) {
          replyText = `💡 **Recommended Learning Exercises & Supportive Actions**:\n\n` +
            `1. **Interactive Accessible Dialog Workshop:** Build a focus-trapping modal without third-party libraries (Targeting Rohan Mehta's blocker).\n` +
            `2. **Lighthouse Performance Profiling Lab:** Identify layout shifts and optimize Web Vitals under 200ms.\n\n` +
            `🤝 *Supportive Tip:* Rohan has been inactive on his milestone for 14 days. A supportive 15-minute 1-on-1 check-in is recommended.`;
        } else {
          replyText = `Educator Intelligence active. I am monitoring ${ecosystem.students.length} students, ${ecosystem.mentorshipSessions.length} mentorship sessions, and recent milestone submissions. Let me know if you would like me to audit a student's progress or generate a curriculum plan.`;
        }
      } else if (currentRole === 'hackathon-creator') {
        if (qLower.includes('registration') || qLower.includes('progress') || qLower.includes('submission')) {
          const totalRegs = ecosystem.hackathons.reduce((acc, h) => acc + h.registrationsCount, 0);
          const totalTeams = ecosystem.hackathons.reduce((acc, h) => acc + h.teamsCount, 0);
          const totalSubs = ecosystem.hackathonSubmissions.length;
          replyText = `📈 **Hackathon Telemetry Overview**:\n\n` +
            `• **Active Events:** ${ecosystem.hackathons.length}\n` +
            `• **Total Registered Hackers:** ${totalRegs.toLocaleString()}\n` +
            `• **Total Formed Teams:** ${totalTeams}\n` +
            `• **Projects Submitted:** ${totalSubs} projects received for evaluation\n` +
            `• **Velocity:** Registrations are pacing +28% higher than the previous cohort, with the "Developer Tooling & AI" track being the most contested.`;
        } else if (qLower.includes('evaluat') || qLower.includes('judge') || qLower.includes('awaiting')) {
          const unevaluated = ecosystem.hackathonSubmissions.filter(s => s.status !== 'Evaluated');
          replyText = `⚖️ **Evaluation Queue Status**:\n\n` +
            `• **Evaluated Projects:** 1 ("Autonomous Multi-Agent AI Code Debugger" - Score: 9.42 / 10)\n` +
            `• **Awaiting Evaluation:** ${unevaluated.length} project(s)\n` +
            unevaluated.map(u => `  - **${u.projectTitle}** (Team: ${u.teamName}) • Assigned Judges: ${u.assignedJudges.join(', ')}`).join('\n') +
            `\n\n💡 *Action:* You can open the Judging & Evaluation tab to assign judges or input rubric scores directly.`;
        } else if (qLower.includes('category') || qLower.includes('technology') || qLower.includes('team')) {
          replyText = `🏷️ **Submissions by Technology Stack**:\n\n` +
            `• **Python / AI / LLMs:** 65% of submissions (FastAPI, LangChain, Qdrant)\n` +
            `• **Rust / Go Systems:** 20% of submissions (Solana, Raft, Proxy layers)\n` +
            `• **Frontend & UI Libraries:** 15% of submissions (React, TypeScript, Tailwind)\n\n` +
            `🤝 *Team Formation Note:* 18 registered participants are currently looking for complementary backend or UI partners. AI-assisted pairings are available in the Team Management tab.`;
        } else {
          replyText = `Innovation Hub Assistant active. Tracking ${ecosystem.hackathons.length} hackathons and ${ecosystem.hackathonSubmissions.length} project submissions. How can I help with event logistics or evaluation rubrics?`;
        }
      } else {
        replyText = `I can help connect your current progress with career opportunities, recommend project milestones, and match you with mentors.`;
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    }, 600);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-[#0B0F17] border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 text-slate-100">
      
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#07090E]/95">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-950/50 border border-indigo-400/20">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-white text-sm">Elevate Hive AI Assistant</h3>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-violet-950/80 text-violet-300 border border-violet-500/30">
                Demo Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 capitalize">
              Role: <strong className="text-indigo-400">{currentRole.replace('-', ' ')}</strong> • Local Context
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Close assistant"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Demo Notice Banner */}
      <div className="px-4 py-2 bg-indigo-950/40 border-b border-indigo-500/20 flex items-center gap-2 text-xs text-indigo-300">
        <Info className="w-4 h-4 flex-shrink-0 text-indigo-400" />
        <span>Demonstration mode with contextual insights from your current workspace.</span>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-3 bg-[#0D111A] border-b border-slate-800">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mb-2">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>Recommended for your active workspace:</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {getRolePrompts().map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-left px-2.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between group"
            >
              <span className="truncate pr-2">{prompt}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-br-none shadow-md shadow-indigo-950/50'
                  : 'bg-[#0D111A] border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
              
              <div className="mt-2 flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] text-slate-500 font-mono">
                <span>{msg.timestamp}</span>
                {msg.sender === 'assistant' && (
                  <button
                    onClick={() => copyToClipboard(msg.text, msg.id)}
                    className="hover:text-indigo-400 flex items-center gap-1 transition-colors"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-800 text-white border border-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-4 border-t border-slate-800 bg-[#0B0F17]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask Elevate Hive AI (${currentRole.replace('-', ' ')} context)...`}
            className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:outline-none focus:border-indigo-500 text-xs text-white placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-1.5 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-colors"
            title="Send query"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
        <p className="mt-2 text-[10px] text-center text-slate-500 font-mono">
          Elevate Hive AI uses role permissions to protect private notes & candidate data.
        </p>
      </div>

    </div>
  );
};
