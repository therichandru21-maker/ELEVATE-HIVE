import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  FileCode, 
  Users, 
  Sparkles, 
  AlertTriangle, 
  Award,
  ChevronRight,
  Zap
} from 'lucide-react';
import { UserProfile } from '../../lib/authStore';

interface TeacherWorkspaceProps {
  user: UserProfile;
}

export const TeacherWorkspace: React.FC<TeacherWorkspaceProps> = ({ user }) => {
  const [submissions, setSubmissions] = useState([
    {
      id: 'sub-1',
      studentName: 'Aarav Sharma',
      projectTitle: 'Autonomous Multi-Agent AI Code Debugger',
      repoUrl: 'github.com/aarav/agent-debugger',
      plagiarismScore: '0.2% (Pass)',
      aiGrade: 'A+',
      status: 'Pending Mentor Approval'
    },
    {
      id: 'sub-2',
      studentName: 'Ananya Verma',
      projectTitle: 'Decentralized Campus Identity Protocol',
      repoUrl: 'github.com/ananya/solana-id',
      plagiarismScore: '1.1% (Pass)',
      aiGrade: 'A',
      status: 'Approved'
    }
  ]);

  const handleApprove = (id: string) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'Approved' } : s));
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-accent border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-emerald-400">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Faculty & Mentor Portal • {user.institution || 'IIT Bombay'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Welcome, <span className="text-emerald-400">{user.name}</span>
          </h1>
          <p className="text-xs text-slate-300">
            Faculty ID: <span className="text-emerald-300 font-mono">{user.roleSpecificId || 'FAC-CS-8812'}</span> • Active Students Mentored: 42
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
          <div className="text-right text-xs">
            <span className="text-slate-400 block font-mono">Pending Submissions</span>
            <span className="text-amber-400 font-bold">1 Code Review Queue</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center border border-amber-500/30">
            1
          </div>
        </div>
      </div>

      {/* Code Reviews Queue */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <FileCode className="w-5 h-5 text-emerald-400" />
          Student Submissions & AI Plagiarism Audits
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {submissions.map((sub) => (
            <div key={sub.id} className="p-6 rounded-2xl glass-card border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{sub.projectTitle}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {sub.aiGrade}
                  </span>
                </div>
                <p className="text-xs text-slate-400">By {sub.studentName} • Repo: <span className="font-mono text-cyan-400">{sub.repoUrl}</span></p>
                <div className="flex items-center gap-3 text-xs pt-1">
                  <span className="text-slate-300 font-mono">Plagiarism: <strong className="text-emerald-400">{sub.plagiarismScore}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold ${
                  sub.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {sub.status}
                </span>

                {sub.status !== 'Approved' && (
                  <button
                    onClick={() => handleApprove(sub.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all"
                  >
                    Approve Submission
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
