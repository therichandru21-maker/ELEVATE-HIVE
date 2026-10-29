import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  Plus, 
  Calendar, 
  FileText, 
  Award, 
  Github, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  Mail, 
  ChevronRight, 
  X, 
  AlertCircle, 
  Check, 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Star,
  MapPin,
  Building,
  DollarSign,
  Send,
  MessageSquare,
  ThumbsUp,
  HelpCircle
} from 'lucide-react';
import { UserProfile } from '../../lib/authStore';
import { 
  EcosystemState, 
  JobListing, 
  CandidateApplication, 
  StudentEcosystemProfile,
  saveEcosystemState 
} from '../../lib/ecosystemStore';

interface RecruiterDashboardProps {
  user: UserProfile;
  activeTab: string;
  onTabChange: (tab: string) => void;
  ecosystem: EcosystemState;
  onUpdateEcosystem: (updated: EcosystemState) => void;
}

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({
  user,
  activeTab,
  onTabChange,
  ecosystem,
  onUpdateEcosystem
}) => {
  // Discovery State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState<StudentEcosystemProfile | null>(null);
  const [inviteModalCandidate, setInviteModalCandidate] = useState<StudentEcosystemProfile | null>(null);
  const [inviteJobSelected, setInviteJobSelected] = useState(ecosystem.jobs[0]?.id || '');
  const [inviteNote, setInviteNote] = useState('Hi! We reviewed your verified projects on Elevate Hive and would love to invite you to our fast-track technical screening.');
  const [inviteSuccessMsg, setInviteSuccessMsg] = useState('');

  // Job Management State
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<JobListing | null>(null);
  const [jobFormTitle, setJobFormTitle] = useState('');
  const [jobFormCompany, setJobFormCompany] = useState(user.institution || 'Google Tech Sourcing');
  const [jobFormDepartment, setJobFormDepartment] = useState('Applied AI Systems');
  const [jobFormLocation, setJobFormLocation] = useState('Bangalore, India');
  const [jobFormRemote, setJobFormRemote] = useState<'Remote' | 'Hybrid' | 'On-site'>('Hybrid');
  const [jobFormType, setJobFormType] = useState<'Full-Time' | 'Internship' | 'Contract'>('Full-Time');
  const [jobFormSalary, setJobFormSalary] = useState('$45,000 - $60,000 USD / Year');
  const [jobFormDeadline, setJobFormDeadline] = useState('2026-05-30');
  const [jobFormSkillsReq, setJobFormSkillsReq] = useState('Python, FastAPI, PostgreSQL');
  const [jobFormSkillsPref, setJobFormSkillsPref] = useState('LangChain, Docker, Vector DBs');
  const [jobFormDesc, setJobFormDesc] = useState('');
  const [jobFormError, setJobFormError] = useState('');

  // Pipeline State
  const [feedbackModalApp, setFeedbackModalApp] = useState<CandidateApplication | null>(null);
  const [feedbackRating, setFeedbackRating] = useState('4.5');
  const [feedbackRec, setFeedbackRec] = useState<'Strong Hire' | 'Hire' | 'Hold' | 'Reject'>('Strong Hire');
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [newRecruiterNoteText, setNewRecruiterNoteText] = useState('');
  const [noteModalApp, setNoteModalApp] = useState<CandidateApplication | null>(null);

  // Toggle Save Candidate
  const handleToggleSaveCandidate = (id: string) => {
    const updatedStudents = ecosystem.students.map(s => {
      if (s.id === id) {
        return { ...s, recruiterSaved: !s.recruiterSaved };
      }
      return s;
    });
    const newState = { ...ecosystem, students: updatedStudents };
    onUpdateEcosystem(newState);
    saveEcosystemState(newState);
  };

  // Submit Job Creation
  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobFormTitle.trim() || !jobFormSkillsReq.trim()) {
      setJobFormError('Please provide a job title and at least one required skill.');
      return;
    }

    const newJob: JobListing = {
      id: `job-${Date.now()}`,
      title: jobFormTitle.trim(),
      company: jobFormCompany.trim(),
      department: jobFormDepartment.trim(),
      location: jobFormLocation.trim(),
      remoteType: jobFormRemote,
      employmentType: jobFormType,
      salaryRange: jobFormSalary.trim() || 'Competitive',
      deadline: jobFormDeadline,
      status: 'Active',
      requiredSkills: jobFormSkillsReq.split(',').map(s => s.trim()).filter(Boolean),
      preferredSkills: jobFormSkillsPref.split(',').map(s => s.trim()).filter(Boolean),
      experienceLevel: 'Entry Level',
      description: jobFormDesc.trim() || 'Exciting engineering role working on real-world systems with mentorship.',
      applicantCount: 0
    };

    const newState = {
      ...ecosystem,
      jobs: [newJob, ...ecosystem.jobs]
    };
    onUpdateEcosystem(newState);
    saveEcosystemState(newState);

    setShowCreateJobModal(false);
    setJobFormTitle('');
    setJobFormSkillsReq('');
    setJobFormSkillsPref('');
    setJobFormDesc('');
    setJobFormError('');
  };

  // Move Application Stage
  const handleMoveStage = (appId: string, newStage: CandidateApplication['stage']) => {
    const updatedApps = ecosystem.applications.map(app => {
      if (app.id === appId) {
        return { ...app, stage: newStage };
      }
      return app;
    });
    const newState = { ...ecosystem, applications: updatedApps };
    onUpdateEcosystem(newState);
    saveEcosystemState(newState);
  };

  // Record Interview Feedback
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackModalApp) return;

    const updatedApps = ecosystem.applications.map(app => {
      if (app.id === feedbackModalApp.id) {
        return {
          ...app,
          interviewFeedback: {
            rating: parseFloat(feedbackRating) || 4.5,
            recommendation: feedbackRec,
            technicalScore: Math.round(parseFloat(feedbackRating) * 20) / 10,
            notes: feedbackNotes || 'Completed technical screening. Demonstrated strong architectural fundamentals.',
            date: new Date().toISOString().split('T')[0]
          }
        };
      }
      return app;
    });

    const newState = { ...ecosystem, applications: updatedApps };
    onUpdateEcosystem(newState);
    saveEcosystemState(newState);
    setFeedbackModalApp(null);
    setFeedbackNotes('');
  };

  // Add Recruiter Note
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteModalApp || !newRecruiterNoteText.trim()) return;

    const updatedApps = ecosystem.applications.map(app => {
      if (app.id === noteModalApp.id) {
        return {
          ...app,
          recruiterNotes: [
            ...app.recruiterNotes,
            {
              id: `note-${Date.now()}`,
              author: user.name,
              date: new Date().toISOString().split('T')[0],
              text: newRecruiterNoteText.trim()
            }
          ]
        };
      }
      return app;
    });

    const newState = { ...ecosystem, applications: updatedApps };
    onUpdateEcosystem(newState);
    saveEcosystemState(newState);
    setNoteModalApp(null);
    setNewRecruiterNoteText('');
  };

  // Filtered Candidates
  const filteredCandidates = ecosystem.students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.statedCareerGoal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.skills.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSkill = selectedSkillFilter === 'All' || 
      student.skills.some(s => s.name.toLowerCase() === selectedSkillFilter.toLowerCase());

    const matchesAvailability = selectedAvailability === 'All' || 
      student.availability.toLowerCase().includes(selectedAvailability.toLowerCase());

    return matchesSearch && matchesSkill && matchesAvailability;
  });

  const stages: CandidateApplication['stage'][] = ['Applied', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Hired'];

  return (
    <div className="space-y-6">
      
      {/* Tab Header Banner */}
      <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            <span>Elevate Hive Talent Intelligence</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {activeTab === 'overview' && 'Recruiter Sourcing Overview'}
            {activeTab === 'discovery' && 'AI Candidate Discovery & Skill Match'}
            {activeTab === 'jobs' && 'Active Job Openings & Pipeline'}
            {activeTab === 'pipeline' && 'Applicant Tracking & Kanban'}
            {activeTab === 'analytics' && 'Recruitment Intelligence & Skill Analytics'}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {activeTab === 'overview' && 'Review hiring telemetry, incoming applicant volume, and algorithmic candidate recommendations based on verified GitHub code and hackathon trophies.'}
            {activeTab === 'discovery' && 'Discover high-potential students using transparent skill matching. Match scores are decision-support indicators, never definitive measures.'}
            {activeTab === 'jobs' && 'Manage campus job requisitions, configure required skill matrices, and track applicant progress.'}
            {activeTab === 'pipeline' && 'Move candidates across interview stages, record technical screening feedback, and capture collaborative recruiter notes.'}
            {activeTab === 'analytics' && 'Identify emerging campus skill gaps, pipeline conversion velocity, and applicant skill distributions.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {activeTab === 'jobs' && (
            <button
              onClick={() => setShowCreateJobModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Job Opening</span>
            </button>
          )}

          {activeTab === 'overview' && (
            <button
              onClick={() => onTabChange('discovery')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Discover Candidates</span>
            </button>
          )}
        </div>
      </div>

      {/* ======================= TAB 1: OVERVIEW ======================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block">Active Jobs</span>
                <span className="text-2xl font-bold text-white mt-1 block">{ecosystem.jobs.length}</span>
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +2 new this week
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block">Total Applicants</span>
                <span className="text-2xl font-bold text-white mt-1 block">
                  {ecosystem.jobs.reduce((a, b) => a + b.applicantCount, 0)}
                </span>
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +18% vs last cohort
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block">Shortlisted Candidates</span>
                <span className="text-2xl font-bold text-white mt-1 block">
                  {ecosystem.applications.filter(a => a.stage === 'Shortlisted' || a.stage === 'Interview').length}
                </span>
                <span className="text-[11px] text-slate-400 font-medium mt-1 block">
                  Top 15% skill alignment
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block">Upcoming Interviews</span>
                <span className="text-2xl font-bold text-white mt-1 block">
                  {ecosystem.applications.filter(a => a.stage === 'Interview').length}
                </span>
                <span className="text-[11px] text-indigo-600 font-medium mt-1 block">
                  Next: Today 04:30 PM
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Activity Chart & Pipeline Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Application Activity Chart */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">Application Velocity & Volume</h3>
                  <p className="text-xs text-slate-400">Weekly candidate submissions across active university partners</p>
                </div>
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                  Last 6 Weeks
                </span>
              </div>

              {/* SVG Activity Chart */}
              <div className="h-52 w-full pt-4">
                <svg className="w-full h-full" viewBox="0 0 500 160">
                  <defs>
                    <linearGradient id="recruiterGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="500" y2="40" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#F1F5F9" strokeWidth="1" />
                  
                  {/* Area */}
                  <path
                    d="M 20 130 Q 100 110, 180 85 T 340 45 T 480 25 L 480 150 L 20 150 Z"
                    fill="url(#recruiterGrad)"
                  />
                  {/* Line */}
                  <path
                    d="M 20 130 Q 100 110, 180 85 T 340 45 T 480 25"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Data Points */}
                  <circle cx="20" cy="130" r="4" fill="#4F46E5" />
                  <circle cx="100" cy="115" r="4" fill="#4F46E5" />
                  <circle cx="180" cy="85" r="4" fill="#4F46E5" />
                  <circle cx="260" cy="65" r="4" fill="#4F46E5" />
                  <circle cx="340" cy="45" r="4" fill="#4F46E5" />
                  <circle cx="480" cy="25" r="5" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="2" />
                </svg>

                <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span>W1 (32 Apps)</span>
                  <span>W2 (54 Apps)</span>
                  <span>W3 (78 Apps)</span>
                  <span>W4 (110 Apps)</span>
                  <span>W5 (145 Apps)</span>
                  <span className="text-indigo-600 font-bold">W6 (188 Apps)</span>
                </div>
              </div>
            </div>

            {/* AI Talent Intelligence Insights Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/60 border border-indigo-100 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">AI Talent Intelligence</h3>
                    <span className="text-[10px] text-indigo-600 font-medium">Algorithmic Sourcing Notes</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#111726] border border-indigo-500/30 shadow-2xs space-y-2 text-xs">
                  <p className="text-slate-300 leading-relaxed font-medium">
                    "Among the illustrative applicants for current open positions, <strong>Python</strong> is common (100%), while <strong>deployment & distributed consensus</strong> appears less frequently."
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Recommended next evaluation step: Focus screening on containerized microservice architectures and asynchronous worker queues.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-indigo-100/60">
                <button
                  onClick={() => onTabChange('discovery')}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore High-Match Candidates</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Recruitment Pipeline Funnel Strip */}
          <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">Active Recruitment Pipeline Stages</h3>
                <p className="text-xs text-slate-400">Distribution of active candidates in review</p>
              </div>
              <button
                onClick={() => onTabChange('pipeline')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <span>View Full Kanban Pipeline</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {stages.map((stg) => {
                const count = ecosystem.applications.filter(a => a.stage === stg).length;
                return (
                  <div key={stg} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/70 text-center">
                    <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">{stg}</span>
                    <span className="text-xl font-bold text-white block mt-1">{count}</span>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full"
                        style={{ width: `${Math.min(100, Math.max(15, count * 25))}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Applications & Top Candidate Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Recent Applications */}
            <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-white">Recent Applications</h3>
                <button
                  onClick={() => onTabChange('pipeline')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {ecosystem.applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-3.5 rounded-xl border border-slate-800/80 hover:border-indigo-200 bg-[#0D111A] hover:bg-slate-900/40 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={app.candidateAvatar}
                        alt={app.candidateName}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-800"
                      />
                      <div>
                        <h4 className="font-bold text-xs text-white">{app.candidateName}</h4>
                        <p className="text-[11px] text-slate-400">{app.candidateInstitution} • {app.jobTitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {app.matchScore}% Match
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-300">
                        {app.stage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate Recommendations with Clear Match Explanations */}
            <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">AI Candidate Recommendations</h3>
                  <p className="text-[11px] text-slate-400">Grounded in verified GitHub projects and hackathon rankings</p>
                </div>
                <button
                  onClick={() => onTabChange('discovery')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Browse Pool
                </button>
              </div>

              <div className="space-y-3">
                {ecosystem.students.slice(0, 2).map((cand) => (
                  <div
                    key={cand.id}
                    className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/60/60 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={cand.avatarUrl}
                          alt={cand.name}
                          className="w-9 h-9 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-xs text-white">{cand.name}</h4>
                          <span className="text-[10px] text-slate-400">{cand.institution} • {cand.statedCareerGoal}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {cand.matchScoreForPrimaryRole}% Synergy
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#0D111A] border border-slate-800/70 text-[11px] text-slate-400">
                      <strong className="text-indigo-700 block font-semibold mb-0.5">Why Relevant:</strong>
                      "Strong match: This candidate demonstrates Python, FastAPI, and PostgreSQL skills that align with the role requirements."
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-400">
                        Project: {cand.projects[0]?.title} ({cand.projects[0]?.stars} ★)
                      </span>
                      <button
                        onClick={() => setSelectedCandidate(cand)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                      >
                        <span>View Profile</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ======================= TAB 2: AI TALENT DISCOVERY ======================= */}
      {activeTab === 'discovery' && (
        <div className="space-y-6">
          
          {/* Search & Filter Bar */}
          <div className="p-5 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search candidates by skill (e.g. Python, Rust, FastAPI), role, project, or college..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 text-xs text-slate-200 placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedSkillFilter}
                  onChange={(e) => setSelectedSkillFilter(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border border-slate-700 text-xs text-slate-300 bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All">All Skills</option>
                  <option value="Python">Python</option>
                  <option value="React">React</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="FastAPI">FastAPI</option>
                  <option value="Rust">Rust</option>
                  <option value="PostgreSQL">PostgreSQL</option>
                </select>

                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border border-slate-700 text-xs text-slate-300 bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All">All Availability</option>
                  <option value="Immediate">Immediate</option>
                  <option value="2 Weeks">2 Weeks</option>
                  <option value="1 Month">1 Month</option>
                  <option value="Summer 2026">Summer 2026</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Showing <strong>{filteredCandidates.length}</strong> verified student candidates</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Match scores are decision-support indicators, not definitive rankings.
              </div>
            </div>
          </div>

          {/* Candidate Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCandidates.map((candidate) => {
              const primaryProject = candidate.projects[0];
              const verifiedSkills = candidate.skills.filter(s => s.source === 'Verified');
              const otherSkills = candidate.skills.filter(s => s.source !== 'Verified');

              return (
                <div
                  key={candidate.id}
                  className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-4">
                    
                    {/* Card Top: Avatar, Name, Save Bookmark */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={candidate.avatarUrl}
                          alt={candidate.name}
                          className="w-12 h-12 rounded-2xl object-cover border border-slate-800"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-sm text-white">{candidate.name}</h3>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {candidate.profileVisibility}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">{candidate.institution} • Class of {candidate.graduationYear}</p>
                          <span className="text-[11px] font-medium text-indigo-600 block mt-0.5">
                            Goal: {candidate.statedCareerGoal}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleSaveCandidate(candidate.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          candidate.recruiterSaved
                            ? 'text-indigo-600 bg-indigo-50 border border-indigo-200'
                            : 'text-slate-400 hover:text-slate-300 hover:bg-slate-100'
                        }`}
                        title={candidate.recruiterSaved ? 'Saved to Talent Pool' : 'Save Candidate'}
                      >
                        {candidate.recruiterSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Decision Support Match Indicator */}
                    <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-indigo-900 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Match Score: {candidate.matchScoreForPrimaryRole}%</span>
                        </span>
                        <span className="text-[10px] text-indigo-600 font-mono">Decision-Support Indicator</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        "Strong match: This candidate demonstrates Python, FastAPI, and PostgreSQL skills that align with the role requirements."
                      </p>
                    </div>

                    {/* Matched vs Missing/Unverified Skills */}
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                          Matched Verified Skills:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {verifiedSkills.map((sk, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1"
                              title={sk.assessmentProof || 'Verified via Code/Assessment'}
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>{sk.name} ({sk.level})</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {otherSkills.length > 0 && (
                        <div>
                          <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                            Self-Assessed / Emerging:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {otherSkills.map((sk, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-slate-100 text-slate-400 border border-slate-800"
                              >
                                {sk.name} ({sk.source})
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Project & Achievement Summary */}
                    {primaryProject && (
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/70 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-200 truncate pr-2">
                            {primaryProject.title}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {primaryProject.stars}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2">
                          {primaryProject.description}
                        </p>
                        {primaryProject.hackathonAward && (
                          <div className="pt-1 flex items-center gap-1 text-[10px] font-semibold text-amber-600">
                            <Award className="w-3 h-3" />
                            <span>{primaryProject.hackathonAward}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Suggested Next Evaluation Step */}
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 bg-slate-100/60 p-2 rounded-lg">
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                      <span>
                        Suggested next step: <strong>Invite to take 30-min asynchronous System Design challenge</strong>.
                      </span>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedCandidate(candidate)}
                      className="px-3 py-2 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setInviteModalCandidate(candidate);
                        setInviteSuccessMsg('');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Invite to Apply / Interview</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ======================= TAB 3: JOB MANAGEMENT ======================= */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecosystem.jobs.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {job.status}
                      </span>
                      <h3 className="font-bold text-base text-white mt-2">{job.title}</h3>
                      <p className="text-xs text-slate-400">{job.department} • {job.company}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-400 pt-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location} ({job.remoteType})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.salaryRange}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Deadline: {job.deadline}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1">Required Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {job.requiredSkills.map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-300">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    <span><strong>{job.applicantCount}</strong> applicants</span>
                  </div>

                  <button
                    onClick={() => setSelectedJobForDetail(job)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>View Pipeline</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================= TAB 4: APPLICANT TRACKING (KANBAN) ======================= */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Visual Recruitment Pipeline</h2>
              <p className="text-xs text-slate-400">Move candidates between stages and record structured interview feedback</p>
            </div>
            <span className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-medium">
              {ecosystem.applications.length} Total Active In-Flight Candidates
            </span>
          </div>

          {/* Kanban Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
            {stages.map((stg) => {
              const stageApps = ecosystem.applications.filter(a => a.stage === stg);

              return (
                <div
                  key={stg}
                  className="bg-slate-100/70 rounded-2xl p-3 border border-slate-800/80 flex flex-col min-w-[220px]"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">{stg}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-slate-200 shadow-2xs">
                      {stageApps.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {stageApps.map((app) => (
                      <div
                        key={app.id}
                        className="p-3 rounded-xl bg-[#0D111A] border border-slate-800/80 shadow-2xs space-y-2 hover:border-indigo-300 transition-all text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={app.candidateAvatar}
                            alt={app.candidateName}
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-xs text-white truncate">{app.candidateName}</h4>
                            <p className="text-[10px] text-slate-400 truncate">{app.candidateInstitution}</p>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-400 font-medium truncate">
                          {app.jobTitle}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {app.matchScore}% Match
                          </span>
                          <span className="text-[10px] text-slate-400">{app.appliedDate}</span>
                        </div>

                        {app.interviewFeedback && (
                          <div className="p-2 rounded bg-indigo-50/60 border border-indigo-100 text-[10px] text-indigo-900 space-y-0.5">
                            <div className="font-bold flex items-center justify-between">
                              <span>Feedback: {app.interviewFeedback.recommendation}</span>
                              <span>{app.interviewFeedback.rating} ★</span>
                            </div>
                            <p className="text-slate-400 line-clamp-1 italic">"{app.interviewFeedback.notes}"</p>
                          </div>
                        )}

                        {/* Stage Mover Controls */}
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-1 text-[10px]">
                          <select
                            value={app.stage}
                            onChange={(e) => handleMoveStage(app.id, e.target.value as CandidateApplication['stage'])}
                            className="bg-slate-900/60 border border-slate-800 rounded px-1.5 py-1 text-slate-300 focus:outline-none"
                          >
                            {stages.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>

                          <button
                            onClick={() => setFeedbackModalApp(app)}
                            className="p-1 rounded text-indigo-600 hover:bg-indigo-50"
                            title="Record Interview Feedback"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setNoteModalApp(app)}
                            className="p-1 rounded text-slate-400 hover:bg-slate-100"
                            title="Add Recruiter Note"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    ))}

                    {stageApps.length === 0 && (
                      <div className="p-4 rounded-xl border border-dashed border-slate-800 text-center text-[11px] text-slate-400">
                        No candidates in {stg}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ======================= TAB 5: RECRUITMENT ANALYTICS ======================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Pipeline Conversion Funnel */}
            <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
              <h3 className="font-bold text-sm text-white">Pipeline Conversion Funnel</h3>
              <p className="text-xs text-slate-400">Progression rates across hiring stages</p>

              <div className="space-y-3 pt-2">
                {[
                  { stage: 'Applied', count: 333, pct: 100 },
                  { stage: 'Screening', count: 185, pct: 55 },
                  { stage: 'Shortlisted', count: 94, pct: 28 },
                  { stage: 'Interview', count: 38, pct: 11 },
                  { stage: 'Offer Given', count: 14, pct: 4.2 },
                  { stage: 'Hired', count: 11, pct: 3.3 },
                ].map((step, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-300">{step.stage}</span>
                      <span className="font-mono text-slate-400">{step.count} candidates ({step.pct}%)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${step.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Availability Insights */}
            <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">Campus Skill Availability Index</h3>
                  <p className="text-xs text-slate-400">Distribution of verified skills across registered university candidates</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700">
                  Verified Data
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  { skill: 'Python / Scripting', density: 'Very High (94%)', color: 'bg-emerald-500' },
                  { skill: 'React & TypeScript', density: 'High (82%)', color: 'bg-emerald-500' },
                  { skill: 'PostgreSQL & SQL', density: 'High (76%)', color: 'bg-emerald-500' },
                  { skill: 'FastAPI & Async IO', density: 'Moderate (58%)', color: 'bg-indigo-500' },
                  { skill: 'Docker & Microservices', density: 'Moderate (44%)', color: 'bg-indigo-500' },
                  { skill: 'Distributed Raft / Paxos', density: 'Low / Emerging (18%)', color: 'bg-amber-500' },
                  { skill: 'Zero-Knowledge Proofs', density: 'Rare (8%)', color: 'bg-rose-500' },
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/70 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-200">{item.skill}</span>
                    <span className="font-mono text-[11px] text-slate-400 font-semibold">{item.density}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900">
                💡 <strong>AI Strategic Recommendation:</strong> Sourcing for distributed systems roles will yield higher conversion by partnering with student organizers of systems-focused hackathons like BITS Hack and IITD Hack.
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ======================= MODAL: CREATE JOB OPENING ======================= */}
      {showCreateJobModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D111A] rounded-3xl max-w-xl w-full p-6 border border-slate-800 shadow-2xl space-y-4 text-white max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-white">Create Campus Job Opening</h3>
              </div>
              <button
                onClick={() => setShowCreateJobModal(false)}
                className="text-slate-400 hover:text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {jobFormError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{jobFormError}</span>
              </div>
            )}

            <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={jobFormTitle}
                    onChange={(e) => setJobFormTitle(e.target.value)}
                    placeholder="e.g. Full-Stack AI Engineer"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Company / Entity</label>
                  <input
                    type="text"
                    value={jobFormCompany}
                    onChange={(e) => setJobFormCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Workplace Type</label>
                  <select
                    value={jobFormRemote}
                    onChange={(e) => setJobFormRemote(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Employment Type</label>
                  <select
                    value={jobFormType}
                    onChange={(e) => setJobFormType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Deadline</label>
                  <input
                    type="date"
                    value={jobFormDeadline}
                    onChange={(e) => setJobFormDeadline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Location</label>
                <input
                  type="text"
                  value={jobFormLocation}
                  onChange={(e) => setJobFormLocation(e.target.value)}
                  placeholder="e.g. Bangalore, India (or Worldwide for Remote)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Salary Range / Stipend</label>
                <input
                  type="text"
                  value={jobFormSalary}
                  onChange={(e) => setJobFormSalary(e.target.value)}
                  placeholder="e.g. $45,000 - $60,000 USD / Year"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Required Skills (Comma-separated) *</label>
                <input
                  type="text"
                  required
                  value={jobFormSkillsReq}
                  onChange={(e) => setJobFormSkillsReq(e.target.value)}
                  placeholder="Python, React, FastAPI, PostgreSQL"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Preferred Skills</label>
                <input
                  type="text"
                  value={jobFormSkillsPref}
                  onChange={(e) => setJobFormSkillsPref(e.target.value)}
                  placeholder="LangChain, Docker, Vector DBs"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Job Description</label>
                <textarea
                  rows={3}
                  value={jobFormDesc}
                  onChange={(e) => setJobFormDesc(e.target.value)}
                  placeholder="Describe key responsibilities and expectations..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateJobModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-800 text-slate-300 font-semibold hover:bg-slate-900/60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm"
                >
                  Publish Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: CANDIDATE PROFILE DRAWER ======================= */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex justify-end">
          <div className="bg-[#0D111A] w-full max-w-lg h-full overflow-y-auto p-6 shadow-2xl space-y-5 border-l border-slate-800 text-white animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCandidate.avatarUrl}
                  alt={selectedCandidate.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-800"
                />
                <div>
                  <h3 className="font-bold text-base text-white">{selectedCandidate.name}</h3>
                  <p className="text-xs text-slate-400">{selectedCandidate.institution} • {selectedCandidate.graduationYear}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-slate-400 hover:text-slate-400 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Overview */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/70">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Career Goal</span>
                  <span className="font-bold text-slate-200">{selectedCandidate.statedCareerGoal}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">GPA / Benchmark</span>
                  <span className="font-bold text-slate-200">{selectedCandidate.gpa}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Availability</span>
                  <span className="font-bold text-slate-200">{selectedCandidate.availability}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Location</span>
                  <span className="font-bold text-slate-200">{selectedCandidate.location}</span>
                </div>
              </div>

              {/* Skills Matrix */}
              <div>
                <h4 className="font-bold text-white mb-2">Verified Skill Intelligence</h4>
                <div className="space-y-2">
                  {selectedCandidate.skills.map((sk, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-200">{sk.name}</span>
                        {sk.assessmentProof && (
                          <span className="block text-[10px] text-slate-400">{sk.assessmentProof}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          sk.source === 'Verified' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {sk.source}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{sk.level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h4 className="font-bold text-white mb-2">GitHub Project Portfolio</h4>
                <div className="space-y-3">
                  {selectedCandidate.projects.map((prj) => (
                    <div key={prj.id} className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{prj.title}</span>
                        <span className="text-[10px] font-mono text-amber-600 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-500" /> {prj.stars}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{prj.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {prj.techStack.map((t, tidx) => (
                          <span key={tidx} className="px-1.5 py-0.5 rounded bg-[#0D111A] border border-slate-800 text-[10px] text-slate-400">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={() => {
                  setInviteModalCandidate(selectedCandidate);
                  setSelectedCandidate(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-1.5"
              >
                <Mail className="w-4 h-4" />
                <span>Invite to Interview</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================= MODAL: INVITE CANDIDATE ======================= */}
      {inviteModalCandidate && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D111A] rounded-3xl max-w-md w-full p-6 border border-slate-800 shadow-2xl space-y-4 text-white animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-white">Invite Candidate</h3>
              </div>
              <button onClick={() => setInviteModalCandidate(null)} className="text-slate-400 hover:text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {inviteSuccessMsg ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-bold text-sm">Invitation Sent Successfully!</p>
                <p className="text-xs text-emerald-700">{inviteSuccessMsg}</p>
                <button
                  onClick={() => setInviteModalCandidate(null)}
                  className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-slate-400">
                  Sending direct outreach to <strong>{inviteModalCandidate.name}</strong> ({inviteModalCandidate.email}):
                </p>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Select Job Opening</label>
                  <select
                    value={inviteJobSelected}
                    onChange={(e) => setInviteJobSelected(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {ecosystem.jobs.map(j => (
                      <option key={j.id} value={j.id}>{j.title} ({j.company})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Custom Recruiter Note</label>
                  <textarea
                    rows={4}
                    value={inviteNote}
                    onChange={(e) => setInviteNote(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setInviteModalCandidate(null)}
                    className="px-4 py-2 rounded-xl border border-slate-800 text-slate-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setInviteSuccessMsg(`Candidate invited to apply for the selected opening. Fast-track screening link delivered to their student inbox.`);
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Invitation</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================= MODAL: RECORD INTERVIEW FEEDBACK ======================= */}
      {feedbackModalApp && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D111A] rounded-3xl max-w-md w-full p-6 border border-slate-800 shadow-2xl space-y-4 text-white animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-white">Record Technical Screening Feedback</h3>
              </div>
              <button onClick={() => setFeedbackModalApp(null)} className="text-slate-400 hover:text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitFeedback} className="space-y-3">
              <p className="text-slate-400">
                Candidate: <strong>{feedbackModalApp.candidateName}</strong> • {feedbackModalApp.jobTitle}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Screening Score (1-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={feedbackRating}
                    onChange={(e) => setFeedbackRating(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Recommendation</label>
                  <select
                    value={feedbackRec}
                    onChange={(e) => setFeedbackRec(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Strong Hire">Strong Hire</option>
                    <option value="Hire">Hire</option>
                    <option value="Hold">Hold</option>
                    <option value="Reject">Reject</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Technical Evaluation Notes</label>
                <textarea
                  rows={3}
                  value={feedbackNotes}
                  onChange={(e) => setFeedbackNotes(e.target.value)}
                  placeholder="Record strengths in architecture, problem-solving speed, code cleanliness..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFeedbackModalApp(null)}
                  className="px-4 py-2 rounded-xl border border-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm"
                >
                  Save Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: ADD RECRUITER NOTE ======================= */}
      {noteModalApp && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D111A] rounded-3xl max-w-md w-full p-6 border border-slate-800 shadow-2xl space-y-4 text-white animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-white">Add Internal Recruiter Note</h3>
              </div>
              <button onClick={() => setNoteModalApp(null)} className="text-slate-400 hover:text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNote} className="space-y-3">
              <p className="text-slate-400">
                Confidential notes for <strong>{noteModalApp.candidateName}</strong> (visible only to authorized recruiters):
              </p>

              {/* Existing Notes */}
              {noteModalApp.recruiterNotes.length > 0 && (
                <div className="space-y-2 max-h-36 overflow-y-auto p-2 bg-slate-900/60 rounded-xl border border-slate-800">
                  {noteModalApp.recruiterNotes.map(n => (
                    <div key={n.id} className="text-[11px] p-2 bg-slate-900/80 rounded-lg border border-slate-800">
                      <div className="flex justify-between text-slate-400 text-[10px] mb-1">
                        <span>{n.author}</span>
                        <span>{n.date}</span>
                      </div>
                      <p className="text-slate-300">{n.text}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">New Note</label>
                <textarea
                  rows={3}
                  value={newRecruiterNoteText}
                  onChange={(e) => setNewRecruiterNoteText(e.target.value)}
                  placeholder="Record observations, compensation expectations, or next round suggestions..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNoteModalApp(null)}
                  className="px-4 py-2 rounded-xl border border-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: JOB DETAILS & APPLICANT PIPELINE ======================= */}
      {selectedJobForDetail && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D111A] rounded-3xl max-w-2xl w-full p-6 border border-slate-800 shadow-2xl space-y-4 text-white max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-white">{selectedJobForDetail.title}</h3>
                <p className="text-slate-400">{selectedJobForDetail.company} • {selectedJobForDetail.location}</p>
              </div>
              <button onClick={() => setSelectedJobForDetail(null)} className="text-slate-400 hover:text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <p className="text-slate-300 leading-relaxed">{selectedJobForDetail.description}</p>
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 pt-1">
                <span><strong>Salary:</strong> {selectedJobForDetail.salaryRange}</span>
                <span>•</span>
                <span><strong>Deadline:</strong> {selectedJobForDetail.deadline}</span>
                <span>•</span>
                <span><strong>Type:</strong> {selectedJobForDetail.employmentType} ({selectedJobForDetail.remoteType})</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-2">Applicants in Pipeline for this Role</h4>
              <div className="space-y-2">
                {ecosystem.applications.filter(a => a.jobId === selectedJobForDetail.id).map(app => (
                  <div key={app.id} className="p-3 rounded-xl border border-slate-800 flex items-center justify-between bg-[#0D111A]">
                    <div className="flex items-center gap-3">
                      <img src={app.candidateAvatar} alt={app.candidateName} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <span className="font-bold text-white block">{app.candidateName}</span>
                        <span className="text-[10px] text-slate-400">{app.candidateInstitution} • Applied: {app.appliedDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700">
                        {app.matchScore}% Match
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-300">
                        {app.stage}
                      </span>
                    </div>
                  </div>
                ))}

                {ecosystem.applications.filter(a => a.jobId === selectedJobForDetail.id).length === 0 && (
                  <div className="p-4 text-center text-slate-400 border border-dashed rounded-xl">
                    No active applications yet for this specific listing.
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedJobForDetail(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
