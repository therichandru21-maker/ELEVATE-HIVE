import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  Clock, 
  ChevronRight, 
  X, 
  AlertCircle, 
  Plus, 
  ExternalLink, 
  Star, 
  Award, 
  HeartHandshake, 
  ShieldCheck, 
  Send, 
  Check, 
  Edit3, 
  Layers, 
  TrendingUp, 
  Eye, 
  Lock, 
  Unlock,
  AlertTriangle,
  Lightbulb,
  Search,
  Sliders,
  Compass
} from 'lucide-react';
import { UserProfile } from '../../lib/authStore';
import { 
  EcosystemState, 
  StudentEcosystemProfile, 
  ProjectSubmissionReview, 
  MentorshipSession, 
  LearningPlan,
  saveEcosystemState 
} from '../../lib/ecosystemStore';

interface TeacherDashboardProps {
  user: UserProfile;
  activeTab: string;
  onTabChange: (tab: string) => void;
  ecosystem: EcosystemState;
  onUpdateEcosystem: (updated: EcosystemState) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  user,
  activeTab,
  onTabChange,
  ecosystem,
  onUpdateEcosystem
}) => {
  // Search & Filters
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [selectedStudentForDrawer, setSelectedStudentForDrawer] = useState<StudentEcosystemProfile | null>(null);

  // AI Skill Gap Analysis State
  const [gapStudentId, setGapStudentId] = useState<string>(ecosystem.students[0]?.id || 'stud-1');
  const [gapTargetRole, setGapTargetRole] = useState('Full-Stack AI Software Engineer');
  const [analyzingGap, setAnalyzingGap] = useState(false);
  const [activePlan, setActivePlan] = useState<LearningPlan | null>(null);
  const [planApprovedToast, setPlanApprovedToast] = useState(false);
  const [mentorCustomNote, setMentorCustomNote] = useState('');

  // Project Review Modal State
  const [reviewModalSub, setReviewModalSub] = useState<ProjectSubmissionReview | null>(null);
  const [rubricArch, setRubricArch] = useState(9);
  const [rubricCode, setRubricCode] = useState(9);
  const [rubricDocs, setRubricDocs] = useState(8);
  const [rubricInnov, setRubricInnov] = useState(10);
  const [feedbackText, setFeedbackText] = useState('');
  const [newImprovementText, setNewImprovementText] = useState('');

  // Mentorship Session State
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleStudentId, setScheduleStudentId] = useState(ecosystem.students[0]?.id || 'stud-1');
  const [scheduleTopic, setScheduleTopic] = useState('System Architecture & Distributed Consensus Review');
  const [scheduleDateTime, setScheduleDateTime] = useState('Tomorrow • 03:00 PM');
  const [scheduleGoal, setScheduleGoal] = useState('Review Raft leader election edge cases');
  const [selectedSessionNotes, setSelectedSessionNotes] = useState<MentorshipSession | null>(null);
  const [mentorPrivateNotesEdit, setMentorPrivateNotesEdit] = useState('');
  const [mentorAvailability, setMentorAvailability] = useState(true);

  // Supportive Nudge State
  const [nudgeModalStudent, setNudgeModalStudent] = useState<StudentEcosystemProfile | null>(null);
  const [nudgeMessage, setNudgeMessage] = useState('Hey Rohan! Noticed you hit a pause on the Web Vitals milestone. Let’s do a quick 15-min sync to untangle any profiling roadblocks together!');
  const [nudgeSentToast, setNudgeSentToast] = useState(false);

  // Filtered Students
  const filteredStudents = ecosystem.students.filter(s => 
    s.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
    s.institution.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
    s.statedCareerGoal.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
    s.skills.some(sk => sk.name.toLowerCase().includes(studentSearchQuery.toLowerCase()))
  );

  // Run AI Skill Gap Analysis
  const handleGenerateSkillGapAnalysis = () => {
    setAnalyzingGap(true);
    const targetStudent = ecosystem.students.find(s => s.id === gapStudentId) || ecosystem.students[0];

    setTimeout(() => {
      let gaps = [];
      let practiceProjects = [];
      let resources = [];
      let milestones = [];

      if (gapTargetRole.includes('AI') || gapTargetRole.includes('Full-Stack')) {
        gaps = [
          {
            skill: 'Kubernetes & Helm Charts',
            targetLevel: 'Intermediate',
            currentLevel: 'Beginner (Self-Assessed)',
            priority: 'High' as const,
            reason: 'Production microservices require isolated pod deployment and automated autoscaling.'
          },
          {
            skill: 'Distributed Tracing (OpenTelemetry)',
            targetLevel: 'Intermediate',
            currentLevel: 'Not Documented',
            priority: 'Medium' as const,
            reason: 'Essential for profiling latency bottlenecks in multi-agent asynchronous pipelines.'
          },
          {
            skill: 'PyTorch Model Quantization (GGUF/AWQ)',
            targetLevel: 'Intermediate',
            currentLevel: 'Intermediate (AI-Estimated)',
            priority: 'Medium' as const,
            reason: 'Reduces inference VRAM usage when deploying local models alongside FastAPI.'
          }
        ];

        practiceProjects = [
          {
            title: 'Containerized Multi-Agent Microservice with Helm Canary Rollout',
            description: 'Deploy a cluster of 3 LangGraph agents on local Minikube with automated health checks, Prometheus telemetry, and zero-downtime rolling upgrades.',
            techStack: ['Docker', 'Kubernetes', 'Helm', 'FastAPI'],
            difficulty: 'Intermediate' as const
          },
          {
            title: 'Semantic Cache Layer Benchmarking with Distributed Tracing',
            description: 'Instrument an existing cache proxy with OpenTelemetry Jaeger spans to measure p99 request latency under 5,000 req/sec load testing.',
            techStack: ['Python', 'OpenTelemetry', 'Jaeger', 'Locust'],
            difficulty: 'Challenging' as const
          }
        ];

        resources = [
          {
            title: 'Kubernetes in Action (2nd Ed) - Chapter 6 Pod Scheduling',
            type: 'Documentation' as const,
            url: 'https://kubernetes.io/docs/concepts/workloads/pods/',
            estimatedHours: 4
          },
          {
            title: 'OpenTelemetry Distributed Tracing Hands-On Lab',
            type: 'Interactive Lab' as const,
            url: 'https://opentelemetry.io/docs/languages/python/',
            estimatedHours: 3
          }
        ];

        milestones = [
          {
            id: 'm-1',
            title: 'Containerize LangGraph service with Docker multi-stage builds',
            targetDays: 5,
            checkpoint: 'Docker image size verified under 180MB with non-root security context.',
            status: 'Completed' as const
          },
          {
            id: 'm-2',
            title: 'Deploy local Helm release and write Canary ingress rules',
            targetDays: 10,
            checkpoint: 'Verify 10% traffic split and automated rollback on 5xx error simulation.',
            status: 'In Progress' as const
          },
          {
            id: 'm-3',
            title: 'Complete OpenTelemetry span verification',
            targetDays: 14,
            checkpoint: 'Export trace waterfall showing LLM prompt generation vs Vector retrieval latency.',
            status: 'Pending' as const
          }
        ];
      } else {
        gaps = [
          {
            skill: 'Distributed Consensus (Raft/Paxos)',
            targetLevel: 'Advanced',
            currentLevel: 'Intermediate (Verified)',
            priority: 'High' as const,
            reason: 'Systems roles evaluate deep understanding of partition recovery and split-brain handling.'
          },
          {
            skill: 'Lock-Free Data Structures',
            targetLevel: 'Intermediate',
            currentLevel: 'Beginner (Self-Assessed)',
            priority: 'Medium' as const,
            reason: 'Critical for high-throughput memory buffers with zero OS lock contention.'
          }
        ];

        practiceProjects = [
          {
            title: 'Raft Cluster with Dynamic Node Membership Changes',
            description: 'Extend existing Raft consensus codebase to support joint consensus configuration changes while actively committing log entries.',
            techStack: ['Go', 'Rust', 'Distributed Systems'],
            difficulty: 'Challenging' as const
          }
        ];

        resources = [
          {
            title: 'In Search of an Understandable Consensus Algorithm (Ongaro & Ousterhout)',
            type: 'Documentation' as const,
            url: 'https://raft.github.io/raft.pdf',
            estimatedHours: 6
          }
        ];

        milestones = [
          {
            id: 'm-sys-1',
            title: 'Simulate network partition test suite with chaos injected drops',
            targetDays: 7,
            checkpoint: 'All nodes consistently elect single leader and reject stale term requests.',
            status: 'In Progress' as const
          }
        ];
      }

      const generatedPlan: LearningPlan = {
        id: `plan-${Date.now()}`,
        studentId: targetStudent.id,
        studentName: targetStudent.name,
        targetRole: gapTargetRole,
        createdDate: new Date().toISOString().split('T')[0],
        status: 'Draft',
        skillGaps: gaps,
        recommendedPriorities: [
          'Prioritize Kubernetes pod isolation and Helm manifests over new ML model experimentation.',
          'Add distributed tracing instrumentation to make backend metrics auditable for senior recruiters.',
          'Complete 14-day checkpoint before next career placement cycle.'
        ],
        practiceProjects,
        learningResources: resources,
        suggestedMilestones: milestones,
        mentorNotes: mentorCustomNote || 'Student has demonstrated exceptional backend algorithm fundamentals. This plan bridges the gap between prototype and enterprise-ready cloud deployment.'
      };

      setActivePlan(generatedPlan);
      setAnalyzingGap(false);
    }, 700);
  };

  // Approve & Share Learning Plan
  const handleApproveLearningPlan = () => {
    if (!activePlan) return;
    const approved = { ...activePlan, status: 'Mentor Approved' as const, mentorNotes: mentorCustomNote || activePlan.mentorNotes };
    
    const newState = {
      ...ecosystem,
      learningPlans: [approved, ...ecosystem.learningPlans.filter(p => p.id !== approved.id)]
    };
    onUpdateEcosystem(newState);
    saveEcosystemState(newState);

    setPlanApprovedToast(true);
    setTimeout(() => setPlanApprovedToast(false), 3000);
  };

  // Submit Submission Review
  const handleSubmitProjectReview = (newStatus: 'Approved' | 'Revision Requested') => {
    if (!reviewModalSub) return;

    const updatedSubmissions = ecosystem.mentorSubmissions.map(sub => {
      if (sub.id === reviewModalSub.id) {
        return {
          ...sub,
          status: newStatus,
          rubricScores: {
            architecture: rubricArch,
            codeQuality: rubricCode,
            documentation: rubricDocs,
            innovation: rubricInnov,
            feedbackNotes: feedbackText || reviewModalSub.rubricScores?.feedbackNotes || 'Structured faculty review completed.',
            suggestedImprovements: reviewModalSub.rubricScores?.suggestedImprovements || []
          }
        };
      }
      return sub;
    });

    const newState = { ...ecosystem, mentorSubmissions: updatedSubmissions };
    onUpdateEcosystem(newState);
    saveEcosystemState(newState);
    setReviewModalSub(null);
  };

  // Schedule New Mentorship Session
  const handleScheduleSession = (e: React.FormEvent) => {
    e.preventDefault();
    const student = ecosystem.students.find(s => s.id === scheduleStudentId);
    if (!student) return;

    const newSession: MentorshipSession = {
      id: `ses-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      topic: scheduleTopic,
      dateTime: scheduleDateTime,
      duration: '45 mins',
      status: 'Confirmed',
      learningGoal: scheduleGoal,
      privateMentorNotes: '',
      actionItems: ['Prepare questions on milestone blocker', 'Review architectural diagrams']
    };

    const newState = {
      ...ecosystem,
      mentorshipSessions: [newSession, ...ecosystem.mentorshipSessions]
    };
    onUpdateEcosystem(newState);
    saveEcosystemState(newState);
    setShowScheduleModal(false);
  };

  // Save Session Notes
  const handleSaveSessionNotes = () => {
    if (!selectedSessionNotes) return;
    const updatedSessions = ecosystem.mentorshipSessions.map(s => {
      if (s.id === selectedSessionNotes.id) {
        return { ...s, privateMentorNotes: mentorPrivateNotesEdit };
      }
      return s;
    });

    const newState = { ...ecosystem, mentorshipSessions: updatedSessions };
    onUpdateEcosystem(newState);
    saveEcosystemState(newState);
    setSelectedSessionNotes(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Elevate Hive Learning Intelligence</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {activeTab === 'overview' && 'Faculty & Mentorship Intelligence Overview'}
            {activeTab === 'students' && 'Student Learning Directory & Verified Profiles'}
            {activeTab === 'skill-gap' && 'AI Skill Gap Analysis & Custom Learning Plans'}
            {activeTab === 'reviews' && 'Capstone & Project Submission Rubric Reviews'}
            {activeTab === 'mentorship' && 'Mentorship Sessions & 1-on-1 Guidance'}
            {activeTab === 'supportive' && 'Supportive Student Check-in Center'}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {activeTab === 'overview' && 'Monitor student milestones, guide career readiness, and review project submissions with verified evidence.'}
            {activeTab === 'students' && 'Transparent student directories distinguishing verified achievements from self-assessed and AI-estimated skills.'}
            {activeTab === 'skill-gap' && 'Compare student skills against industry roles, identify concrete gaps, and curate mentor-approved learning plans.'}
            {activeTab === 'reviews' && 'Evaluate codebase architecture, modularity, and documentation with structured rubrics and actionable feedback.'}
            {activeTab === 'mentorship' && 'Manage student appointments, keep private mentor notes, and assign transparent action items.'}
            {activeTab === 'supportive' && 'Identify students who hit roadblocks without punitive labeling, and extend empathetic, timely guidance.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'mentorship' && (
            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Session</span>
            </button>
          )}

          {activeTab === 'overview' && (
            <button
              onClick={() => onTabChange('skill-gap')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>New Skill Gap Analysis</span>
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
                <span className="text-xs font-medium text-slate-400 block">Students Mentored</span>
                <span className="text-2xl font-bold text-white mt-1 block">{ecosystem.students.length * 10 + 2}</span>
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> Active across 3 cohorts
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block">Active Learning Plans</span>
                <span className="text-2xl font-bold text-white mt-1 block">14</span>
                <span className="text-[11px] text-slate-400 font-medium mt-1 block">
                  Aligned with career goals
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block">Projects Under Review</span>
                <span className="text-2xl font-bold text-white mt-1 block">
                  {ecosystem.mentorSubmissions.filter(s => s.status === 'Pending Review').length}
                </span>
                <span className="text-[11px] text-amber-600 font-medium mt-1 block">
                  Awaiting faculty rubric scoring
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-400 block">Supportive Check-ins</span>
                <span className="text-2xl font-bold text-white mt-1 block">
                  {ecosystem.students.filter(s => s.learningMilestones.needsSupport).length}
                </span>
                <span className="text-[11px] text-rose-600 font-medium mt-1 block">
                  Inactivity / blocker flagged
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Student Progress Overview & AI Learning Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Student Progression Summary */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">Student Milestone Progression</h3>
                  <p className="text-xs text-slate-400">Live progress towards semester capstones and career goals</p>
                </div>
                <button
                  onClick={() => onTabChange('students')}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  View Directory
                </button>
              </div>

              <div className="space-y-3">
                {ecosystem.students.map((stud) => {
                  const progressPct = Math.round((stud.learningMilestones.completed / stud.learningMilestones.total) * 100);
                  return (
                    <div
                      key={stud.id}
                      className="p-3.5 rounded-xl border border-slate-800/80 hover:border-emerald-200 bg-[#0D111A] hover:bg-slate-900/40 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={stud.avatarUrl}
                            alt={stud.name}
                            className="w-9 h-9 rounded-xl object-cover"
                          />
                          <div>
                            <h4 className="font-bold text-xs text-white">{stud.name}</h4>
                            <span className="text-[11px] text-slate-400">{stud.institution} • Goal: {stud.statedCareerGoal}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-white">{progressPct}% Complete</span>
                          <span className="block text-[10px] text-slate-400">
                            {stud.learningMilestones.completed} of {stud.learningMilestones.total} Milestones
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            stud.learningMilestones.needsSupport ? 'bg-amber-500' : 'bg-emerald-600'
                          }`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span>Current: <strong className="text-slate-300">{stud.learningMilestones.currentMilestone}</strong></span>
                        {stud.learningMilestones.needsSupport && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            Needs Supportive Check-in
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Learning Intelligence Insight Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/60 border border-emerald-100 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">AI Learning Insights</h3>
                    <span className="text-[10px] text-emerald-700 font-medium">Curriculum Diagnostics</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0D111A] border border-emerald-100 shadow-2xs space-y-2 text-xs">
                  <p className="text-slate-300 leading-relaxed font-medium">
                    "Students targeting <strong>Full-Stack & Cloud roles</strong> are excelling in Python and API schemas, but show a <strong>14-day bottleneck on Container Orchestration and Accessibility Testing</strong>."
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Recommended Action: Introduce a 1-hour lab walkthrough on local Minikube deployment and Axe accessibility audits.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-100/60">
                <button
                  onClick={() => onTabChange('skill-gap')}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Run Skill Gap Analysis</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Upcoming Mentorship Sessions & Pending Project Reviews */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Upcoming Sessions */}
            <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">Upcoming Mentorship Sessions</h3>
                  <p className="text-xs text-slate-400">Confirmed 1-on-1 consultations</p>
                </div>
                <button
                  onClick={() => onTabChange('mentorship')}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Manage Sessions
                </button>
              </div>

              <div className="space-y-3">
                {ecosystem.mentorshipSessions.slice(0, 3).map((ses) => (
                  <div
                    key={ses.id}
                    className="p-3.5 rounded-xl border border-slate-800/80 bg-[#0D111A] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-white">{ses.studentName}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                        {ses.dateTime}
                      </span>
                    </div>
                    <p className="text-slate-400 font-medium text-[11px]">{ses.topic}</p>
                    <p className="text-slate-400 text-[10px]">Goal: {ses.learningGoal}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Project Reviews */}
            <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">Pending Milestone Submissions</h3>
                  <p className="text-xs text-slate-400">Awaiting mentor feedback and rubric verification</p>
                </div>
                <button
                  onClick={() => onTabChange('reviews')}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Review All ({ecosystem.mentorSubmissions.length})
                </button>
              </div>

              <div className="space-y-3">
                {ecosystem.mentorSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3.5 rounded-xl border border-slate-800/80 bg-[#0D111A] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white truncate pr-2">{sub.projectTitle}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        sub.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {sub.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{sub.studentName} • {sub.milestoneName}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-400">Submitted: {sub.submittedDate}</span>
                      <button
                        onClick={() => setReviewModalSub(sub)}
                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                      >
                        <span>Evaluate Rubric</span>
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

      {/* ======================= TAB 2: STUDENT PROGRESS WORKSPACE ======================= */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          
          {/* Search Bar */}
          <div className="p-4 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={studentSearchQuery}
              onChange={(e) => setStudentSearchQuery(e.target.value)}
              placeholder="Search student by name, skill, university, or stated career goal..."
              className="flex-1 text-xs text-slate-200 placeholder:text-slate-500 text-white focus:outline-none"
            />
            <span className="text-xs text-slate-400 font-medium">
              {filteredStudents.length} Students Documented
            </span>
          </div>

          {/* Student Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStudents.map((student) => {
              const verifiedCount = student.skills.filter(s => s.source === 'Verified').length;
              const selfCount = student.skills.filter(s => s.source === 'Self-Assessed').length;

              return (
                <div
                  key={student.id}
                  className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatarUrl}
                          alt={student.name}
                          className="w-12 h-12 rounded-2xl object-cover border border-slate-800"
                        />
                        <div>
                          <h3 className="font-bold text-sm text-white">{student.name}</h3>
                          <p className="text-xs text-slate-400">{student.institution} • GPA: {student.gpa}</p>
                          <span className="text-[11px] font-semibold text-emerald-700 block mt-0.5">
                            Goal: {student.statedCareerGoal}
                          </span>
                        </div>
                      </div>

                      {student.learningMilestones.needsSupport && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Check-in Needed
                        </span>
                      )}
                    </div>

                    {/* Skill Breakdown */}
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Skills Overview</span>
                        <span>{verifiedCount} Verified • {selfCount} Self-Assessed</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {student.skills.slice(0, 5).map((sk, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                              sk.source === 'Verified'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-slate-900/60 text-slate-400 border-slate-800'
                            }`}
                          >
                            {sk.name} ({sk.level})
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Current Milestone */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/70 text-xs space-y-1">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Active Milestone
                      </span>
                      <p className="font-semibold text-slate-200">{student.learningMilestones.currentMilestone}</p>
                      <span className="text-[11px] text-slate-400 block">
                        Last Active: {student.learningMilestones.lastActivityDaysAgo} day(s) ago
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedStudentForDrawer(student)}
                      className="px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Full Portfolio</span>
                    </button>

                    <button
                      onClick={() => {
                        setGapStudentId(student.id);
                        onTabChange('skill-gap');
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Analyze Skill Gap</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ======================= TAB 3: AI SKILL GAP ANALYSIS ======================= */}
      {activeTab === 'skill-gap' && (
        <div className="space-y-6">
          
          {/* Analysis Config Bar */}
          <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
            <h3 className="font-bold text-base text-white">Configure AI Skill Gap Evaluation</h3>
            <p className="text-xs text-slate-400 max-w-2xl">
              Select a student to compare their documented skills against an industry target role. Every recommendation is grounded in real curriculum benchmarks without fabricating unverified skills.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-300">Select Student</label>
                <select
                  value={gapStudentId}
                  onChange={(e) => setGapStudentId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-700 text-xs text-slate-200 bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {ecosystem.students.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.institution})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-300">Target Career Role</label>
                <select
                  value={gapTargetRole}
                  onChange={(e) => setGapTargetRole(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-700 text-xs text-slate-200 bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Full-Stack AI Software Engineer">Full-Stack AI Software Engineer</option>
                  <option value="Distributed Systems & Cloud Engineer">Distributed Systems & Cloud Engineer</option>
                  <option value="Frontend Product Engineer (Design Systems)">Frontend Product Engineer (Design Systems)</option>
                  <option value="Data Platform & Cloud Architect">Data Platform & Cloud Architect</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleGenerateSkillGapAnalysis}
                  disabled={analyzingGap}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>{analyzingGap ? 'Analyzing Matrix...' : 'Generate Gap Analysis'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Toast Notification */}
          {planApprovedToast && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Learning Plan approved by Faculty Mentor and synchronized with student's active roadmap!</span>
            </div>
          )}

          {/* Generated Plan View */}
          {activePlan && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Header */}
              <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {activePlan.status}
                    </span>
                    <span className="text-xs text-slate-400">Generated: {activePlan.createdDate}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1">
                    Roadmap: {activePlan.targetRole}
                  </h2>
                  <p className="text-xs text-slate-400">Student: <strong>{activePlan.studentName}</strong></p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleApproveLearningPlan}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve & Share with Student</span>
                  </button>
                </div>
              </div>

              {/* Identified Skill Gaps */}
              <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
                <h3 className="font-bold text-sm text-white">1. Identified Skill Gaps</h3>
                <p className="text-xs text-slate-400">Discrepancies between current documented skills and target role requirements</p>

                <div className="space-y-3">
                  {activePlan.skillGaps.map((gap, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-900/60/60 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{gap.skill}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            {gap.priority} Priority
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">
                          Current: {gap.currentLevel} → Target: {gap.targetLevel}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">{gap.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Practice Projects & Learning Resources */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Practice Projects */}
                <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
                  <h3 className="font-bold text-sm text-white">2. Suggested Practice Projects</h3>
                  <div className="space-y-3">
                    {activePlan.practiceProjects.map((prj, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{prj.title}</span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700">
                            {prj.difficulty}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px]">{prj.description}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {prj.techStack.map((t, tidx) => (
                            <span key={tidx} className="px-1.5 py-0.5 rounded bg-[#0D111A] border border-slate-800 text-[10px] text-slate-400 font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
                  <h3 className="font-bold text-sm text-white">3. Curated Learning Resources</h3>
                  <div className="space-y-3">
                    {activePlan.learningResources.map((res, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{res.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{res.estimatedHours} hrs</span>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-200/60 text-slate-300">
                            {res.type}
                          </span>
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 text-[11px]"
                          >
                            <span>Open Guide</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Suggested Milestones & Mentor Notes */}
              <div className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4">
                <h3 className="font-bold text-sm text-white">4. Suggested Milestones & Progress Checkpoints</h3>
                <div className="space-y-2">
                  {activePlan.suggestedMilestones.map((m) => (
                    <div key={m.id} className="p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white block">{m.title}</span>
                        <span className="text-[11px] text-slate-400">{m.checkpoint} (Target: Day {m.targetDays})</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        m.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-300'
                      }`}>
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                  <label className="font-semibold text-slate-300 block">Faculty Mentor Custom Notes & Guidance</label>
                  <textarea
                    rows={3}
                    value={mentorCustomNote}
                    onChange={(e) => setMentorCustomNote(e.target.value)}
                    placeholder="Add personalized encouraging notes or specific lab instructions for this student..."
                    className="w-full p-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                  />
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ======================= TAB 4: PROJECT REVIEW WORKSPACE ======================= */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 gap-4">
            {ecosystem.mentorSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="p-6 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        sub.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {sub.status}
                      </span>
                      <span className="text-xs text-slate-400">Submitted: {sub.submittedDate}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{sub.projectTitle}</h3>
                    <p className="text-xs text-slate-400">Student: <strong>{sub.studentName}</strong> • {sub.milestoneName}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setReviewModalSub(sub)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Review & Grade</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{sub.description}</p>

                {sub.rubricScores && (
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-[#0D111A] border border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase">Architecture</span>
                        <span className="font-bold text-white">{sub.rubricScores.architecture} / 10</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#0D111A] border border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase">Code Quality</span>
                        <span className="font-bold text-white">{sub.rubricScores.codeQuality} / 10</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#0D111A] border border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase">Documentation</span>
                        <span className="font-bold text-white">{sub.rubricScores.documentation} / 10</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#0D111A] border border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase">Innovation</span>
                        <span className="font-bold text-white">{sub.rubricScores.innovation} / 10</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="font-semibold text-slate-300 block">Faculty Review Feedback:</span>
                      <p className="text-slate-400 italic">"{sub.rubricScores.feedbackNotes}"</p>
                    </div>

                    {sub.rubricScores.suggestedImprovements.length > 0 && (
                      <div className="space-y-1">
                        <span className="font-semibold text-slate-300 block">Suggested Actionable Improvements:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                          {sub.rubricScores.suggestedImprovements.map((imp, idx) => (
                            <li key={idx}>{imp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================= TAB 5: MENTORSHIP MANAGEMENT ======================= */}
      {activeTab === 'mentorship' && (
        <div className="space-y-6">
          
          {/* Availability Switch */}
          <div className="p-4 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="font-bold text-white block">Faculty Office Hours & 1-on-1 Slots</span>
                <span className="text-slate-400">Configured: 6 Hours / Week available for students</span>
              </div>
            </div>

            <button
              onClick={() => setMentorAvailability(!mentorAvailability)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                mentorAvailability
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-400 border border-slate-800'
              }`}
            >
              {mentorAvailability ? '● Accepting Student Bookings' : '○ Booking Paused'}
            </button>
          </div>

          {/* Sessions List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ecosystem.mentorshipSessions.map((ses) => (
              <div
                key={ses.id}
                className="p-5 rounded-2xl bg-[#0D111A] border border-slate-800/80 shadow-xs text-white space-y-3 text-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{ses.studentName}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                      {ses.status}
                    </span>
                  </div>

                  <p className="text-slate-300 font-medium">{ses.topic}</p>
                  <p className="text-slate-400 text-[11px] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ses.dateTime} ({ses.duration})</span>
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">Learning Goal</span>
                    <p className="text-slate-400">{ses.learningGoal}</p>
                  </div>

                  {ses.privateMentorNotes && (
                    <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-1">
                      <span className="text-[10px] font-semibold text-amber-800 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Confidential Mentor Notes
                      </span>
                      <p className="text-amber-900 text-[11px]">{ses.privateMentorNotes}</p>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedSessionNotes(ses);
                      setMentorPrivateNotesEdit(ses.privateMentorNotes || '');
                    }}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Private Notes</span>
                  </button>

                  <span className="text-[10px] text-slate-400">Restricted Access</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================= TAB 6: SUPPORTIVE INSIGHTS ======================= */}
      {activeTab === 'supportive' && (
        <div className="space-y-6">
          
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>
              Supportive check-ins help students overcome developmental roadblocks with positive, non-punitive mentorship.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ecosystem.students.filter(s => s.learningMilestones.needsSupport).map((student) => (
              <div
                key={student.id}
                className="p-6 rounded-2xl bg-[#0D111A] border border-amber-200 shadow-xs space-y-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className="w-12 h-12 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-white">{student.name}</h3>
                    <p className="text-xs text-slate-400">{student.institution} • {student.statedCareerGoal}</p>
                    <span className="text-[11px] text-rose-600 font-semibold block mt-0.5">
                      Inactive for {student.learningMilestones.lastActivityDaysAgo} days
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                  <span className="font-semibold text-slate-300 block">Reported Milestone Block:</span>
                  <p className="text-slate-400 leading-relaxed">{student.learningMilestones.supportReason}</p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-900">
                  💡 <strong>Mentor Action:</strong> Send a quick encouragement prompt or pair-program on the tricky performance profile together.
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setNudgeModalStudent(student);
                      setNudgeSentToast(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Supportive Nudge</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================= MODAL: REVIEW SUBMISSION RUBRIC ======================= */}
      {reviewModalSub && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D111A] rounded-3xl max-w-xl w-full p-6 border border-slate-800 shadow-2xl space-y-4 text-white max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-white">Evaluate Project Rubric</h3>
                <p className="text-slate-400">{reviewModalSub.projectTitle} • {reviewModalSub.studentName}</p>
              </div>
              <button onClick={() => setReviewModalSub(null)} className="text-slate-400 hover:text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Architecture & Modularity (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={rubricArch}
                    onChange={(e) => setRubricArch(parseInt(e.target.value) || 8)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Code Quality & Tests (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={rubricCode}
                    onChange={(e) => setRubricCode(parseInt(e.target.value) || 8)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Documentation & Schemas (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={rubricDocs}
                    onChange={(e) => setRubricDocs(parseInt(e.target.value) || 8)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Innovation & Impact (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={rubricInnov}
                    onChange={(e) => setRubricInnov(parseInt(e.target.value) || 8)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Detailed Faculty Feedback</label>
                <textarea
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Record constructive feedback on code structure, edge cases, and design choices..."
                  className="w-full p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleSubmitProjectReview('Revision Requested')}
                  className="px-4 py-2 rounded-xl border border-amber-300 text-amber-700 hover:bg-amber-50 font-semibold"
                >
                  Request Revisions
                </button>

                <button
                  type="button"
                  onClick={() => handleSubmitProjectReview('Approved')}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm"
                >
                  Approve Milestone
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= MODAL: SCHEDULE SESSION ======================= */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D111A] rounded-3xl max-w-md w-full p-6 border border-slate-800 shadow-2xl space-y-4 text-white animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-white">Schedule Mentorship Session</h3>
              </div>
              <button onClick={() => setShowScheduleModal(false)} className="text-slate-400 hover:text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleSession} className="space-y-3">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Select Student</label>
                <select
                  value={scheduleStudentId}
                  onChange={(e) => setScheduleStudentId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700"
                >
                  {ecosystem.students.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.institution})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Topic / Agenda</label>
                <input
                  type="text"
                  value={scheduleTopic}
                  onChange={(e) => setScheduleTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Date & Time</label>
                <input
                  type="text"
                  value={scheduleDateTime}
                  onChange={(e) => setScheduleDateTime(e.target.value)}
                  placeholder="e.g. Tomorrow • 03:00 PM - 03:45 PM"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Learning Goal</label>
                <textarea
                  rows={2}
                  value={scheduleGoal}
                  onChange={(e) => setScheduleGoal(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: EDIT MENTOR PRIVATE NOTES ======================= */}
      {selectedSessionNotes && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D111A] rounded-3xl max-w-md w-full p-6 border border-slate-800 shadow-2xl space-y-4 text-white animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-base text-white">Confidential Faculty Session Notes</h3>
              </div>
              <button onClick={() => setSelectedSessionNotes(null)} className="text-slate-400 hover:text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-slate-400">
                Student: <strong>{selectedSessionNotes.studentName}</strong> • Notes are private to faculty mentors only.
              </p>

              <textarea
                rows={4}
                value={mentorPrivateNotesEdit}
                onChange={(e) => setMentorPrivateNotesEdit(e.target.value)}
                placeholder="Record private observations, confidence level, recommended focus areas..."
                className="w-full p-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedSessionNotes(null)}
                  className="px-4 py-2 rounded-xl border border-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSessionNotes}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= MODAL: SEND SUPPORTIVE NUDGE ======================= */}
      {nudgeModalStudent && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0D111A] rounded-3xl max-w-md w-full p-6 border border-slate-800 shadow-2xl space-y-4 text-white animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-white">Send Supportive Check-in</h3>
              </div>
              <button onClick={() => setNudgeModalStudent(null)} className="text-slate-400 hover:text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {nudgeSentToast ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="font-bold">Message Delivered to {nudgeModalStudent.name}</p>
                <button
                  onClick={() => setNudgeModalStudent(null)}
                  className="mt-2 px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-slate-400">
                  Deliver an encouraging check-in to <strong>{nudgeModalStudent.name}</strong> ({nudgeModalStudent.email}):
                </p>

                <textarea
                  rows={4}
                  value={nudgeMessage}
                  onChange={(e) => setNudgeMessage(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                  <button
                    onClick={() => setNudgeModalStudent(null)}
                    className="px-4 py-2 rounded-xl border border-slate-800 text-slate-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setNudgeSentToast(true)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
