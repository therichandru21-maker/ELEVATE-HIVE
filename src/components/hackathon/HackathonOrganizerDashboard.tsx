import React, { useState } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Users, 
  FileText, 
  ShieldCheck, 
  Compass, 
  Calendar, 
  TrendingUp, 
  Award, 
  Clock, 
  ExternalLink, 
  Github, 
  ChevronRight, 
  X, 
  AlertCircle, 
  Search, 
  Filter, 
  Sliders, 
  Star, 
  Send, 
  MessageSquare,
  UserPlus,
  Layers,
  HelpCircle
} from 'lucide-react';
import { UserProfile } from '../../lib/authStore';
import { 
  EcosystemState, 
  HackathonEvent, 
  HackathonProjectSubmission, 
  saveEcosystemState 
} from '../../lib/ecosystemStore';

interface HackathonOrganizerDashboardProps {
  user: UserProfile;
  activeTab: string;
  onTabChange: (tab: string) => void;
  ecosystem: EcosystemState;
  onUpdateEcosystem: (updated: EcosystemState) => void;
}

export const HackathonOrganizerDashboard: React.FC<HackathonOrganizerDashboardProps> = ({
  user,
  activeTab,
  onTabChange,
  ecosystem,
  onUpdateEcosystem
}) => {
  // Create Hackathon Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formName, setFormName] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formTrack1, setFormTrack1] = useState('Autonomous AI Agents & Copilots');
  const [formTrack2, setFormTrack2] = useState('High-Throughput Vector Retrieval');
  const [formRegStart, setFormRegStart] = useState('2026-04-15');
  const [formRegEnd, setFormRegEnd] = useState('2026-05-15');
  const [formEventStart, setFormEventStart] = useState('2026-05-20');
  const [formEventEnd, setFormEventEnd] = useState('2026-05-22');
  const [formTeamMin, setFormTeamMin] = useState(2);
  const [formTeamMax, setFormTeamMax] = useState(4);
  const [formPrize, setFormPrize] = useState('$12,500 USD');
  const [formStatus, setFormStatus] = useState<'Draft' | 'Published' | 'Active'>('Active');
  const [formError, setFormError] = useState('');

  // Judging State
  const [selectedSubForJudge, setSelectedSubForJudge] = useState<HackathonProjectSubmission | null>(null);
  const [scoreInnov, setScoreInnov] = useState(9);
  const [scoreTech, setScoreTech] = useState(9);
  const [scoreFit, setScoreFit] = useState(9);
  const [scoreFeas, setScoreFeas] = useState(8);
  const [scoreImpact, setScoreImpact] = useState(9);
  const [scorePres, setScorePres] = useState(9);
  const [judgeFeedback, setJudgeFeedback] = useState('');
  const [judgeSubmitToast, setJudgeSubmitToast] = useState(false);

  // Submission Detail Modal
  const [viewSubDetail, setViewSubDetail] = useState<HackathonProjectSubmission | null>(null);

  // Participant Directory Filters
  const [participantSearch, setParticipantSearch] = useState('');
  const [participantFilter, setParticipantFilter] = useState<'All' | 'Solo' | 'Seeking Team' | 'In Team'>('All');

  // AI Team Formation Matchmaker State
  const [showTeamFormationModal, setShowTeamFormationModal] = useState(false);

  // Total KPIs
  const totalRegistrations = ecosystem.hackathons.reduce((acc, h) => acc + h.registrationsCount, 0);
  const totalTeams = ecosystem.hackathons.reduce((acc, h) => acc + h.teamsCount, 0);
  const totalSubmissions = ecosystem.hackathonSubmissions.length;
  const pendingEvals = ecosystem.hackathonSubmissions.filter(s => s.status !== 'Evaluated').length;

  // Handle Create Hackathon Submit
  const handleCreateHackathon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formDesc.trim()) {
      setFormError('Please enter a hackathon title and event description.');
      return;
    }

    if (new Date(formEventEnd) <= new Date(formEventStart)) {
      setFormError('Event end date must be after event start date.');
      return;
    }

    const newHackathon: HackathonEvent = {
      id: `hack-${Date.now()}`,
      title: formName.trim(),
      tagline: formTagline.trim() || 'Accelerate campus innovation with AI.',
      description: formDesc.trim(),
      organizer: user.institution || 'Elevate Hive Innovation Hub',
      problemStatements: [
        {
          id: `ps-new-1`,
          title: formTrack1,
          track: 'AI & Data Systems',
          difficulty: 'Medium',
          description: 'Build production-ready solutions addressing track requirements.'
        },
        {
          id: `ps-new-2`,
          title: formTrack2,
          track: 'Enterprise Infrastructure',
          difficulty: 'Hard',
          description: 'Scale distributed architectures with verifiable benchmarks.'
        }
      ],
      themes: ['Generative AI', 'Cloud Infrastructure', 'Web3', 'Open Source'],
      eligibility: 'All undergraduate & graduate engineering students.',
      registrationStart: formRegStart,
      registrationEnd: formRegEnd,
      eventStart: formEventStart,
      eventEnd: formEventEnd,
      teamSizeMin: formTeamMin,
      teamSizeMax: formTeamMax,
      submissionDeadline: `${formEventEnd} 18:00 IST`,
      prizes: [
        { rank: '1st Place Champion', reward: formPrize, sponsor: 'Elevate Innovation Fund' },
        { rank: 'Best Technical Architecture', reward: '$2,500 USD Compute Credits', sponsor: 'Google Cloud' }
      ],
      status: formStatus,
      registrationsCount: 1,
      teamsCount: 1,
      submissionsCount: 0,
      contactEmail: 'organizers@elevatehive.ai',
      rubrics: [
        { id: 'r-1', criteria: 'Innovation & Novelty', weightPercent: 20, description: 'Freshness of the concept' },
        { id: 'r-2', criteria: 'Technical Implementation', weightPercent: 25, description: 'Code cleanliness and resilience' },
        { id: 'r-3', criteria: 'Problem-Solution Fit', weightPercent: 20, description: 'Direct resolution of statement' },
        { id: 'r-4', criteria: 'Feasibility', weightPercent: 15, description: 'Production deployment realism' },
        { id: 'r-5', criteria: 'Potential Impact', weightPercent: 10, description: 'Value to end users or developers' },
        { id: 'r-6', criteria: 'Presentation Quality', weightPercent: 10, description: 'Clarity of the demo' }
      ]
    };

    const newState = {
      ...ecosystem,
      hackathons: [newHackathon, ...ecosystem.hackathons]
    };
    onUpdateEcosystem(newState);
    saveEcosystemState(newState);

    setShowCreateModal(false);
    setFormName('');
    setFormDesc('');
    setFormTagline('');
    setFormError('');
  };

  // Submit Judge Evaluation
  const handleSubmitEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubForJudge) return;

    const total = (scoreInnov * 0.2) + (scoreTech * 0.25) + (scoreFit * 0.2) + (scoreFeas * 0.15) + (scoreImpact * 0.1) + (scorePres * 0.1);
    const rounded = Math.round(total * 100) / 100;

    const updatedSubmissions = ecosystem.hackathonSubmissions.map(sub => {
      if (sub.id === selectedSubForJudge.id) {
        return {
          ...sub,
          status: 'Evaluated' as const,
          evaluations: [
            ...sub.evaluations,
            {
              judgeName: user.name,
              scores: {
                innovation: scoreInnov,
                technicalImplementation: scoreTech,
                problemSolutionFit: scoreFit,
                feasibility: scoreFeas,
                potentialImpact: scoreImpact,
                presentationQuality: scorePres
              },
              totalScore: rounded,
              feedbackComments: judgeFeedback || 'Exemplary architectural design with verified working demo.',
              evaluatedAt: new Date().toISOString().split('T')[0]
            }
          ]
        };
      }
      return sub;
    });

    const newState = { ...ecosystem, hackathonSubmissions: updatedSubmissions };
    onUpdateEcosystem(newState);
    saveEcosystemState(newState);

    setSelectedSubForJudge(null);
    setJudgeFeedback('');
    setJudgeSubmitToast(true);
    setTimeout(() => setJudgeSubmitToast(false), 3000);
  };

  // Participant list from ecosystem students
  const participants = ecosystem.students.map((s, idx) => ({
    id: s.id,
    name: s.name,
    email: s.email,
    college: s.institution,
    declaredSkills: s.skills.map(k => k.name).slice(0, 4),
    interests: [s.statedCareerGoal, 'Hackathon Sprints'],
    registrationStatus: 'Confirmed',
    teamStatus: idx === 0 ? 'In Team' : (idx === 1 ? 'In Team' : 'Seeking Team'),
    teamName: idx === 0 ? 'Team Nexus AI' : (idx === 1 ? 'Team HyperVector' : undefined),
    avatar: s.avatarUrl
  }));

  const filteredParticipants = participants.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(participantSearch.toLowerCase()) ||
      p.college.toLowerCase().includes(participantSearch.toLowerCase()) ||
      p.declaredSkills.some(k => k.toLowerCase().includes(participantSearch.toLowerCase()));

    const matchFilter = participantFilter === 'All' || p.teamStatus === participantFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span>Elevate Hive Innovation Hub</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {activeTab === 'overview' && 'Hackathon Telemetry & Event Command'}
            {activeTab === 'events' && 'Hackathon Management & Tracks'}
            {activeTab === 'participants' && 'Participant & Team Synergy Management'}
            {activeTab === 'submissions' && 'Project Submissions & Code Repositories'}
            {activeTab === 'judging' && 'Multi-Criteria Rubric Judging & Evaluation'}
            {activeTab === 'showcase' && 'Post-Event Innovation Showcase & Incubation'}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {activeTab === 'overview' && 'Real-time telemetry on registrations, formed squads, submission pipelines, and multi-criteria evaluations.'}
            {activeTab === 'events' && 'Create hackathons, calibrate multi-track problem statements, and configure publication workflows.'}
            {activeTab === 'participants' && 'Manage participant rosters, monitor squad formation, and explore AI team formation recommendations.'}
            {activeTab === 'submissions' && 'Audit code submissions, check repository links, and assign projects to jury members.'}
            {activeTab === 'judging' && 'Standardized rubrics evaluating innovation, code quality, and feasibility with human-approved final scores.'}
            {activeTab === 'showcase' && 'Connect winning projects with startup incubators, mentor interest, and corporate venture grants.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'events' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Hackathon</span>
            </button>
          )}

          {activeTab === 'overview' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Launch Event</span>
            </button>
          )}
        </div>
      </div>

      {/* ======================= TAB 1: OVERVIEW ======================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block">Active Hackathons</span>
                <span className="text-2xl font-bold text-white mt-1 block">{ecosystem.hackathons.length}</span>
                <span className="text-[11px] text-emerald-600 font-medium mt-1 block">Live & Published</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block">Registrations</span>
                <span className="text-2xl font-bold text-white mt-1 block">{totalRegistrations.toLocaleString()}</span>
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +28% vs last sprint
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block">Registered Teams</span>
                <span className="text-2xl font-bold text-white mt-1 block">{totalTeams}</span>
                <span className="text-[11px] text-slate-400 font-medium mt-1 block">Avg 3.8 hackers / squad</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block">Submissions</span>
                <span className="text-2xl font-bold text-white mt-1 block">{totalSubmissions}</span>
                <span className="text-[11px] text-slate-400 font-medium mt-1 block">Verified code repositories</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block">Pending Reviews</span>
                <span className="text-2xl font-bold text-white mt-1 block">{pendingEvals}</span>
                <span className="text-[11px] text-amber-600 font-medium mt-1 block">Awaiting jury scoring</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Event Timeline & Submissions Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Active Hackathon Timeline */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">Upcoming Event Milestones</h3>
                  <p className="text-xs text-slate-400">Live operational countdown for National GenAI Sprint 2026</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-semibold text-xs border border-amber-200">
                  Sprint Countdown: 4 Days Left
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  { title: 'Registration Phase Closes', date: 'April 12 • 23:59 IST', status: 'Completed', color: 'text-emerald-600' },
                  { title: 'AI Team Formation Matchmaking Checkpoint', date: 'April 14 • 18:00 IST', status: 'In Progress', color: 'text-amber-600' },
                  { title: 'Opening Keynote & Track Problem Statement Release', date: 'April 18 • 09:00 IST', status: 'Scheduled', color: 'text-indigo-600' },
                  { title: 'Midway Code Checkpoint & GitHub PR Commit Audit', date: 'April 19 • 15:00 IST', status: 'Scheduled', color: 'text-slate-400' },
                  { title: 'Final Code Submission & Video Demo Cutoff', date: 'April 20 • 18:00 IST', status: 'Scheduled', color: 'text-slate-400' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-800/80 bg-slate-900/60/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-200 block">{item.title}</span>
                      <span className="text-[11px] text-slate-400">{item.date}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold bg-[#0D111A] border border-slate-800 ${item.color}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Event Management Shortcuts */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/70 via-white to-orange-50/60 border border-amber-100 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Organizer Shortcuts</h3>
                    <span className="text-[10px] text-amber-700 font-medium">Quick Workflows</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => onTabChange('participants')}
                    className="w-full p-2.5 rounded-xl bg-[#0D111A] border border-amber-200/80 text-left text-xs font-semibold text-slate-300 hover:text-amber-700 hover:border-amber-300 transition-all flex items-center justify-between"
                  >
                    <span>Participant Directory ({totalRegistrations})</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    onClick={() => onTabChange('submissions')}
                    className="w-full p-2.5 rounded-xl bg-[#0D111A] border border-amber-200/80 text-left text-xs font-semibold text-slate-300 hover:text-amber-700 hover:border-amber-300 transition-all flex items-center justify-between"
                  >
                    <span>Project Submissions ({totalSubmissions})</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    onClick={() => onTabChange('judging')}
                    className="w-full p-2.5 rounded-xl bg-[#0D111A] border border-amber-200/80 text-left text-xs font-semibold text-slate-300 hover:text-amber-700 hover:border-amber-300 transition-all flex items-center justify-between"
                  >
                    <span>Evaluation Queue ({pendingEvals} pending)</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-amber-100/60">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Hackathon</span>
                </button>
              </div>
            </div>

          </div>

          {/* Submissions & Showcase Highlights */}
          <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">Current Submissions under Evaluation</h3>
                <p className="text-xs text-slate-400">Live repo links, assigned juries, and evaluation progress</p>
              </div>
              <button
                onClick={() => onTabChange('submissions')}
                className="text-xs font-semibold text-amber-600 hover:text-amber-700"
              >
                View Workspace
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ecosystem.hackathonSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{sub.projectTitle}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      sub.status === 'Evaluated' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {sub.status}
                    </span>
                  </div>

                  <p className="text-slate-400 text-[11px] line-clamp-2">{sub.solutionDescription}</p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-400">Team: <strong>{sub.teamName}</strong></span>
                    <button
                      onClick={() => setSelectedSubForJudge(sub)}
                      className="px-3 py-1 rounded-lg bg-amber-600 text-white font-semibold text-xs flex items-center gap-1"
                    >
                      <span>Input Evaluation</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ======================= TAB 2: HACKATHON MANAGEMENT ======================= */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ecosystem.hackathons.map((hackathon) => (
              <div
                key={hackathon.id}
                className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white hover:border-amber-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        {hackathon.status}
                      </span>
                      <h3 className="font-bold text-base text-white mt-2">{hackathon.title}</h3>
                      <p className="text-xs text-slate-400">{hackathon.organizer}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{hackathon.description}</p>

                  {/* Themes */}
                  <div className="flex flex-wrap gap-1">
                    {hackathon.themes.map((th, tidx) => (
                      <span key={tidx} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-400">
                        {th}
                      </span>
                    ))}
                  </div>

                  {/* Dates & Prizes */}
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Event Dates:</span>
                      <span className="font-medium text-slate-200">{hackathon.eventStart} to {hackathon.eventEnd}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Team Size:</span>
                      <span className="font-medium text-slate-200">{hackathon.teamSizeMin} - {hackathon.teamSizeMax} Members</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Top Prize:</span>
                      <span className="font-bold text-amber-700">{hackathon.prizes[0]?.reward}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    <strong>{hackathon.registrationsCount}</strong> Registered ({hackathon.teamsCount} squads)
                  </span>

                  <button
                    onClick={() => onTabChange('submissions')}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Submissions</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================= TAB 3: PARTICIPANTS & TEAMS ======================= */}
      {activeTab === 'participants' && (
        <div className="space-y-6">
          
          {/* Search, Filter & AI Team Matchmaker Trigger */}
          <div className="p-5 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full flex items-center gap-3">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={participantSearch}
                onChange={(e) => setParticipantSearch(e.target.value)}
                placeholder="Search participant by name, college, or declared skill..."
                className="w-full text-xs text-slate-200 placeholder:text-slate-500 text-white focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={participantFilter}
                onChange={(e) => setParticipantFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 bg-[#0D111A]"
              >
                <option value="All">All Formations</option>
                <option value="In Team">Formed Squads</option>
                <option value="Seeking Team">Seeking Members</option>
                <option value="Solo">Solo</option>
              </select>

              <button
                onClick={() => setShowTeamFormationModal(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 flex-shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Team Synergy Suggester</span>
              </button>
            </div>
          </div>

          {/* Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredParticipants.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-3 text-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-white">{p.name}</h4>
                        <span className="text-[10px] text-slate-400">{p.college}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      p.teamStatus === 'In Team' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {p.teamStatus}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block mb-1">Declared Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {p.declaredSkills.map((sk, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 text-[10px]">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {p.teamName && (
                    <div className="text-[11px] text-slate-400">
                      Squad: <strong className="text-slate-200">{p.teamName}</strong>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                  Registration Confirmed • Ready for Sprint
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================= TAB 4: PROJECT SUBMISSIONS ======================= */}
      {activeTab === 'submissions' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 gap-4">
            {ecosystem.hackathonSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4 text-xs"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        sub.status === 'Evaluated' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {sub.status}
                      </span>
                      <span className="text-slate-400 text-[11px]">Submitted: {sub.submittedAt}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{sub.projectTitle}</h3>
                    <p className="text-slate-400">Squad: <strong>{sub.teamName}</strong> • {sub.hackathonTitle}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewSubDetail(sub)}
                      className="px-3.5 py-2 rounded-xl border border-slate-800 hover:border-slate-700 font-semibold text-slate-300"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => setSelectedSubForJudge(sub)}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-sm flex items-center gap-1"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Input Evaluation</span>
                    </button>
                  </div>
                </div>

                <p className="text-slate-400 leading-relaxed">{sub.solutionDescription}</p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
                  <div className="flex flex-wrap gap-1">
                    {sub.techStack.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-300 font-mono text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-[11px]">
                    <a href={sub.repoUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center gap-1">
                      <Github className="w-3 h-3" />
                      <span>Repository</span>
                    </a>
                    <a href={sub.demoUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================= TAB 5: JUDGING & EVALUATION ======================= */}
      {activeTab === 'judging' && (
        <div className="space-y-6">
          
          {judgeSubmitToast && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Official evaluation score recorded into hackathon consensus ledger!</span>
            </div>
          )}

          <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
            <h3 className="font-bold text-sm text-white">Standardized Evaluation Rubric (6 Dimensions)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { name: 'Innovation & Novelty', weight: '20%' },
                { name: 'Technical Code Quality', weight: '25%' },
                { name: 'Problem-Solution Fit', weight: '20%' },
                { name: 'Feasibility & Deployment', weight: '15%' },
                { name: 'Real-World Impact', weight: '10%' },
                { name: 'Presentation & Demo', weight: '10%' }
              ].map((r, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center text-xs">
                  <span className="font-bold text-slate-200 block truncate">{r.name}</span>
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-1">
                    Weight: {r.weight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {ecosystem.hackathonSubmissions.map((sub) => {
              const hasEvaluation = sub.evaluations.length > 0;
              const primaryEval = sub.evaluations[0];

              return (
                <div
                  key={sub.id}
                  className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-white">{sub.projectTitle}</h4>
                      <p className="text-slate-400">Squad: {sub.teamName} • Problem: {sub.problemStatement}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {hasEvaluation ? (
                        <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                          Score: {primaryEval.totalScore} / 10
                        </span>
                      ) : (
                        <button
                          onClick={() => setSelectedSubForJudge(sub)}
                          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Input Scores</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {hasEvaluation && (
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-[11px]">
                        <div className="p-1.5 rounded bg-[#0D111A] border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Innovation</span>
                          <span className="font-bold text-slate-200">{primaryEval.scores.innovation}/10</span>
                        </div>
                        <div className="p-1.5 rounded bg-[#0D111A] border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Technical</span>
                          <span className="font-bold text-slate-200">{primaryEval.scores.technicalImplementation}/10</span>
                        </div>
                        <div className="p-1.5 rounded bg-[#0D111A] border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Fit</span>
                          <span className="font-bold text-slate-200">{primaryEval.scores.problemSolutionFit}/10</span>
                        </div>
                        <div className="p-1.5 rounded bg-[#0D111A] border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Feasibility</span>
                          <span className="font-bold text-slate-200">{primaryEval.scores.feasibility}/10</span>
                        </div>
                        <div className="p-1.5 rounded bg-[#0D111A] border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Impact</span>
                          <span className="font-bold text-slate-200">{primaryEval.scores.potentialImpact}/10</span>
                        </div>
                        <div className="p-1.5 rounded bg-[#0D111A] border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Presentation</span>
                          <span className="font-bold text-slate-200">{primaryEval.scores.presentationQuality}/10</span>
                        </div>
                      </div>
                      <p className="text-slate-400 italic pt-1">Jury Notes: "{primaryEval.feedbackComments}"</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ======================= TAB 6: INNOVATION DISCOVERY SHOWCASE ======================= */}
      {activeTab === 'showcase' && (
        <div className="space-y-6">
          
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 shadow-xs space-y-2">
            <h3 className="font-bold text-base text-amber-950">Post-Hackathon Innovation & Incubation Showcase</h3>
            <p className="text-xs text-amber-800 leading-relaxed max-w-2xl">
              Highlighting top hackathon MVPs to accelerate founder incubation, campus IP protection, mentor sponsorship, and corporate venture grants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  1st Place Champion
                </span>
                <span className="font-bold text-amber-700 font-mono">$10,000 USD Grant</span>
              </div>

              <div>
                <h4 className="font-bold text-base text-white">Autonomous Multi-Agent AI Code Debugger</h4>
                <p className="text-slate-400">Built by Team Nexus AI (Aarav Sharma & Cohort)</p>
              </div>

              <p className="text-slate-400 leading-relaxed">
                Distributed LangGraph agent cluster that analyzes GitHub pull requests, generates AST diffs, and predicts regression bugs under 800ms.
              </p>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="font-semibold text-slate-200 block">Incubator & Mentor Opportunities:</span>
                <p className="text-slate-400 text-[11px]">
                  Fast-tracked into Google Tech Sourcing technical round + $25k Cloud Credits sponsored.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-300">
                  2nd Place Runner-Up
                </span>
                <span className="font-bold text-slate-300 font-mono">$3,500 USD Grant</span>
              </div>

              <div>
                <h4 className="font-bold text-base text-white">Zero-Latency HNSW Semantic Cache Proxy</h4>
                <p className="text-slate-400">Built by Team HyperVector</p>
              </div>

              <p className="text-slate-400 leading-relaxed">
                High performance proxy built in Go with localized memory mapped vector indexes for sub-10ms semantic cache hits.
              </p>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="font-semibold text-slate-200 block">Incubator & Mentor Opportunities:</span>
                <p className="text-slate-400 text-[11px]">
                  Partnered with BITS Pilani E-Cell accelerator for enterprise pilot.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ======================= MODAL: CREATE HACKATHON ======================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D111A] rounded-3xl max-w-xl w-full p-6 border border-slate-800 shadow-2xl space-y-4 text-white max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-base text-white">Create & Launch Hackathon</h3>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateHackathon} className="space-y-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Hackathon Event Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. National Agentic AI Sprint 2026"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Tagline</label>
                <input
                  type="text"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  placeholder="e.g. 48 Hours to Pioneer Multi-Agent Ecosystems"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Describe the challenge goals and target student innovators..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Track 1 Problem Statement</label>
                  <input
                    type="text"
                    value={formTrack1}
                    onChange={(e) => setFormTrack1(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Track 2 Problem Statement</label>
                  <input
                    type="text"
                    value={formTrack2}
                    onChange={(e) => setFormTrack2(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Event Start Date</label>
                  <input
                    type="date"
                    value={formEventStart}
                    onChange={(e) => setFormEventStart(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Event End Date</label>
                  <input
                    type="date"
                    value={formEventEnd}
                    onChange={(e) => setFormEventEnd(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Min Team Size</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={formTeamMin}
                    onChange={(e) => setFormTeamMin(parseInt(e.target.value) || 2)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Max Team Size</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={formTeamMax}
                    onChange={(e) => setFormTeamMax(parseInt(e.target.value) || 4)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Prize Pool</label>
                  <input
                    type="text"
                    value={formPrize}
                    onChange={(e) => setFormPrize(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-sm"
                >
                  Publish Hackathon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: JUDGE SCORING INTERFACE ======================= */}
      {selectedSubForJudge && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D111A] rounded-3xl max-w-xl w-full p-6 border border-slate-800 shadow-2xl space-y-4 text-white max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-white">Judge Evaluation Interface</h3>
                <p className="text-slate-400">{selectedSubForJudge.projectTitle} (Squad: {selectedSubForJudge.teamName})</p>
              </div>
              <button onClick={() => setSelectedSubForJudge(null)} className="text-slate-400 hover:text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEvaluation} className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Innovation (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={scoreInnov}
                    onChange={(e) => setScoreInnov(parseInt(e.target.value) || 8)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Technical Code (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={scoreTech}
                    onChange={(e) => setScoreTech(parseInt(e.target.value) || 8)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Problem Fit (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={scoreFit}
                    onChange={(e) => setScoreFit(parseInt(e.target.value) || 8)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Feasibility (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={scoreFeas}
                    onChange={(e) => setScoreFeas(parseInt(e.target.value) || 8)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Impact (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={scoreImpact}
                    onChange={(e) => setScoreImpact(parseInt(e.target.value) || 8)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Demo Quality (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={scorePres}
                    onChange={(e) => setScorePres(parseInt(e.target.value) || 8)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Qualitative Jury Review Notes</label>
                <textarea
                  rows={3}
                  value={judgeFeedback}
                  onChange={(e) => setJudgeFeedback(e.target.value)}
                  placeholder="Record strengths in architecture, demo polish, and unique engineering patterns..."
                  className="w-full p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
                🛡️ <strong>Integrity Note:</strong> AI does not fabricate project achievements or secretly alter jury scores. Final rankings remain subject to authorized human confirmation.
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSubForJudge(null)}
                  className="px-4 py-2 rounded-xl border border-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-sm"
                >
                  Submit Official Score
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: AI TEAM SYNERGY SUGGESTER ======================= */}
      {showTeamFormationModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D111A] rounded-3xl max-w-lg w-full p-6 border border-slate-800 shadow-2xl space-y-4 text-white animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-base text-white">AI Team Formation Synergy Engine</h3>
              </div>
              <button onClick={() => setShowTeamFormationModal(false)} className="text-slate-400 hover:text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-400 leading-relaxed">
              Based on declared skills and complementary role matrices, our algorithmic engine recommends mutual matches for unassigned solo hackers.
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Suggested Squad Pair #1</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                    94% Complementary Synergy
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-[#0D111A] border border-slate-800">
                    <strong>Rohan Mehta (IITD)</strong>
                    <span className="block text-slate-400">Frontend, Design, UI</span>
                  </div>
                  <div className="p-2 rounded bg-[#0D111A] border border-slate-800">
                    <strong>Priya Sen (NITT)</strong>
                    <span className="block text-slate-400">Kafka, Python, Data Streaming</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">
                  Synergy Rationale: Balances responsive web presentation with scalable asynchronous backend architecture.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-[11px] text-indigo-900">
              ℹ️ <strong>Consent Requirement:</strong> Team pairings are recommendations. Candidates receive a mutual invitation and must explicitly confirm before team finalization.
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowTeamFormationModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold"
              >
                Close Engine
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================= MODAL: SUBMISSION DETAILS ======================= */}
      {viewSubDetail && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D111A] rounded-3xl max-w-lg w-full p-6 border border-slate-800 shadow-2xl space-y-4 text-white animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-white">{viewSubDetail.projectTitle}</h3>
                <p className="text-slate-400">Squad: {viewSubDetail.teamName}</p>
              </div>
              <button onClick={() => setViewSubDetail(null)} className="text-slate-400 hover:text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="font-semibold text-slate-300 block">Problem Statement Addressed:</span>
                <p className="text-slate-400">{viewSubDetail.problemStatement}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="font-semibold text-slate-300 block">Technical Solution:</span>
                <p className="text-slate-400 leading-relaxed">{viewSubDetail.solutionDescription}</p>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={viewSubDetail.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-slate-900 text-white font-semibold text-center flex items-center justify-center gap-1.5"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href={viewSubDetail.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-center flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Video / Demo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
