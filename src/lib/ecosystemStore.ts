// Elevate Hive Connected Ecosystem Store
// Shared intelligence between Recruiters, Mentors/Teachers, and Hackathon Organizers

export interface SkillItem {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  source: 'Verified' | 'Self-Assessed' | 'AI-Estimated';
  assessmentProof?: string;
}

export interface StudentEcosystemProfile {
  id: string;
  name: string;
  email: string;
  institution: string;
  avatarUrl: string;
  graduationYear: string;
  gpa: string;
  statedCareerGoal: string;
  matchScoreForPrimaryRole?: number;
  skills: SkillItem[];
  projects: {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    repoUrl: string;
    demoUrl: string;
    stars: number;
    aiScore: number;
    hackathonAward?: string;
  }[];
  learningMilestones: {
    completed: number;
    total: number;
    lastActivityDaysAgo: number;
    needsSupport: boolean;
    supportReason?: string;
    currentMilestone: string;
  };
  hackathonWins: string[];
  recruiterSaved?: boolean;
  interviewStatus?: string;
  availability: 'Immediate' | '2 Weeks' | '1 Month' | 'Summer 2026';
  location: string;
  profileVisibility: 'Public' | 'Verified Recruiters Only';
}

export interface JobListing {
  id: string;
  title: string;
  department: string;
  company: string;
  location: string;
  remoteType: 'Remote' | 'Hybrid' | 'On-site';
  employmentType: 'Full-Time' | 'Internship' | 'Contract';
  salaryRange: string;
  deadline: string;
  status: 'Active' | 'Draft' | 'In Review' | 'Closed';
  requiredSkills: string[];
  preferredSkills: string[];
  experienceLevel: 'Entry Level' | 'Mid Level' | 'Senior';
  description: string;
  applicantCount: number;
}

export interface CandidateApplication {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateInstitution: string;
  candidateAvatar: string;
  jobId: string;
  jobTitle: string;
  stage: 'Applied' | 'Screening' | 'Shortlisted' | 'Interview' | 'Offer' | 'Hired';
  appliedDate: string;
  matchScore: number;
  matchReason: string;
  skills: string[];
  recruiterNotes: {
    id: string;
    author: string;
    date: string;
    text: string;
  }[];
  interviewFeedback?: {
    rating: number;
    recommendation: 'Strong Hire' | 'Hire' | 'Hold' | 'Reject';
    technicalScore: number;
    notes: string;
    date: string;
  };
}

export interface LearningPlan {
  id: string;
  studentId: string;
  studentName: string;
  targetRole: string;
  createdDate: string;
  status: 'Draft' | 'Mentor Approved' | 'Shared with Student';
  skillGaps: {
    skill: string;
    targetLevel: string;
    currentLevel: string;
    priority: 'High' | 'Medium' | 'Low';
    reason: string;
  }[];
  recommendedPriorities: string[];
  practiceProjects: {
    title: string;
    description: string;
    techStack: string[];
    difficulty: 'Intermediate' | 'Challenging';
  }[];
  learningResources: {
    title: string;
    type: 'Documentation' | 'Interactive Lab' | 'Tutorial';
    url: string;
    estimatedHours: number;
  }[];
  suggestedMilestones: {
    id: string;
    title: string;
    targetDays: number;
    checkpoint: string;
    status: 'Pending' | 'In Progress' | 'Completed';
  }[];
  mentorNotes: string;
}

export interface ProjectSubmissionReview {
  id: string;
  studentId: string;
  studentName: string;
  projectTitle: string;
  description: string;
  repoUrl: string;
  demoUrl: string;
  techStack: string[];
  submittedDate: string;
  milestoneName: string;
  status: 'Pending Review' | 'Approved' | 'Revision Requested';
  rubricScores?: {
    architecture: number; // out of 10
    codeQuality: number;
    documentation: number;
    innovation: number;
    feedbackNotes: string;
    suggestedImprovements: string[];
  };
}

export interface MentorshipSession {
  id: string;
  studentId: string;
  studentName: string;
  topic: string;
  dateTime: string;
  duration: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  learningGoal: string;
  privateMentorNotes?: string;
  actionItems?: string[];
}

export interface HackathonRubric {
  id: string;
  criteria: string;
  weightPercent: number;
  description: string;
}

export interface HackathonEvent {
  id: string;
  title: string;
  tagline: string;
  description: string;
  organizer: string;
  problemStatements: {
    id: string;
    title: string;
    track: string;
    difficulty: string;
    description: string;
  }[];
  themes: string[];
  eligibility: string;
  registrationStart: string;
  registrationEnd: string;
  eventStart: string;
  eventEnd: string;
  teamSizeMin: number;
  teamSizeMax: number;
  submissionDeadline: string;
  prizes: { rank: string; reward: string; sponsor?: string }[];
  status: 'Draft' | 'Published' | 'Active' | 'Completed';
  registrationsCount: number;
  teamsCount: number;
  submissionsCount: number;
  contactEmail: string;
  rubrics: HackathonRubric[];
}

export interface HackathonParticipant {
  id: string;
  name: string;
  email: string;
  college: string;
  declaredSkills: string[];
  statedInterests: string[];
  registrationStatus: 'Confirmed' | 'Pending';
  teamStatus: 'In Team' | 'Seeking Team' | 'Solo';
  teamId?: string;
  registeredDate: string;
}

export interface HackathonTeam {
  id: string;
  name: string;
  hackathonId: string;
  track: string;
  members: { id: string; name: string; role: string; college: string }[];
  projectTitle?: string;
  status: 'Registered' | 'Submitted' | 'Under Evaluation' | 'Finalist';
}

export interface HackathonProjectSubmission {
  id: string;
  hackathonId: string;
  hackathonTitle: string;
  teamId: string;
  teamName: string;
  projectTitle: string;
  problemStatement: string;
  solutionDescription: string;
  techStack: string[];
  repoUrl: string;
  demoUrl: string;
  submittedAt: string;
  status: 'Submitted' | 'Under Review' | 'Evaluated';
  assignedJudges: string[];
  evaluations: {
    judgeName: string;
    scores: {
      innovation: number;
      technicalImplementation: number;
      problemSolutionFit: number;
      feasibility: number;
      potentialImpact: number;
      presentationQuality: number;
    };
    totalScore: number;
    feedbackComments: string;
    evaluatedAt: string;
  }[];
}

// Initial Realistic Ecosystem Data
export const INITIAL_STUDENTS: StudentEcosystemProfile[] = [
  {
    id: 'stud-1',
    name: 'Aarav Sharma',
    email: 'student@elevatehive.ai',
    institution: 'IIT Bombay',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    graduationYear: '2026',
    gpa: '9.4 / 10',
    statedCareerGoal: 'Full-Stack AI Engineer',
    matchScoreForPrimaryRole: 94,
    skills: [
      { name: 'Python', level: 'Advanced', source: 'Verified', assessmentProof: 'Scored 98% in Advanced Algo Benchmark' },
      { name: 'FastAPI', level: 'Intermediate', source: 'Verified', assessmentProof: 'Built Production Multi-Agent Microservice' },
      { name: 'TypeScript', level: 'Advanced', source: 'Verified', assessmentProof: '65,000+ lines in Hackathon Win' },
      { name: 'React', level: 'Advanced', source: 'Verified', assessmentProof: 'Component design system contributor' },
      { name: 'PostgreSQL', level: 'Intermediate', source: 'Verified', assessmentProof: 'Database Schema Optimization' },
      { name: 'PyTorch', level: 'Intermediate', source: 'AI-Estimated', assessmentProof: 'Fine-tuned LoRA weights in repo' },
      { name: 'Docker', level: 'Intermediate', source: 'Verified', assessmentProof: 'Containerized deployment certified' },
      { name: 'Kubernetes', level: 'Beginner', source: 'Self-Assessed' }
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Autonomous Multi-Agent AI Code Debugger',
        description: 'Distributed LangGraph agent cluster that analyzes GitHub PRs, generates AST diffs, and predicts regression bugs under 800ms.',
        techStack: ['Python', 'FastAPI', 'LangChain', 'React', 'Qdrant'],
        repoUrl: 'https://github.com/aarav/agent-debugger',
        demoUrl: 'https://agent-debugger.demo.run',
        stars: 342,
        aiScore: 96,
        hackathonAward: '1st Place • National GenAI Sprint 2026'
      },
      {
        id: 'proj-2',
        title: 'VectorDB Cache Layer for High QPS LLM APIs',
        description: 'Semantic caching proxy reducing OpenAI / Anthropic inference costs by 68% using HNSW vector indexing.',
        techStack: ['Go', 'Redis', 'Python', 'Docker'],
        repoUrl: 'https://github.com/aarav/vector-cache-proxy',
        demoUrl: 'https://vector-cache.dev',
        stars: 184,
        aiScore: 91
      }
    ],
    learningMilestones: {
      completed: 8,
      total: 10,
      lastActivityDaysAgo: 1,
      needsSupport: false,
      currentMilestone: 'Production CI/CD Pipelines & Kubernetes Helm Charts'
    },
    hackathonWins: ['1st Place National GenAI Sprint', 'Finalist Smart India Hackathon'],
    recruiterSaved: true,
    interviewStatus: 'Technical Interview Scheduled',
    availability: 'Immediate',
    location: 'Mumbai, India (Open to Remote / Relocation)',
    profileVisibility: 'Public'
  },
  {
    id: 'stud-2',
    name: 'Ananya Verma',
    email: 'ananya.verma@bits-pilani.ac.in',
    institution: 'BITS Pilani',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    graduationYear: '2026',
    gpa: '9.6 / 10',
    statedCareerGoal: 'Distributed Systems & Cloud Engineer',
    matchScoreForPrimaryRole: 91,
    skills: [
      { name: 'Rust', level: 'Intermediate', source: 'Verified', assessmentProof: 'Wrote zero-copy memory ring buffer' },
      { name: 'Go', level: 'Advanced', source: 'Verified', assessmentProof: 'Raft consensus implementation' },
      { name: 'Distributed Systems', level: 'Intermediate', source: 'Verified', assessmentProof: 'Coursework + Open Source' },
      { name: 'PostgreSQL', level: 'Advanced', source: 'Verified', assessmentProof: 'Query plan tuning & sharding' },
      { name: 'Solana / Web3', level: 'Intermediate', source: 'Self-Assessed' },
      { name: 'AWS / Cloud', level: 'Intermediate', source: 'AI-Estimated' }
    ],
    projects: [
      {
        id: 'proj-3',
        title: 'Decentralized Campus Identity Protocol',
        description: 'Zero-knowledge verifiable credentials protocol for student transcripts, degree attestations, and hackathon awards.',
        techStack: ['Rust', 'Solana', 'TypeScript', 'Next.js'],
        repoUrl: 'https://github.com/ananya/solana-id',
        demoUrl: 'https://solana-id.campus.org',
        stars: 289,
        aiScore: 94,
        hackathonAward: '2nd Place • Web3 Innovation League'
      }
    ],
    learningMilestones: {
      completed: 7,
      total: 10,
      lastActivityDaysAgo: 2,
      needsSupport: false,
      currentMilestone: 'Distributed Consensus & Paxos/Raft Benchmarking'
    },
    hackathonWins: ['2nd Place Web3 Innovation League', 'Best Technical Architecture BITS Hack'],
    recruiterSaved: true,
    interviewStatus: 'Screening Passed',
    availability: '2 Weeks',
    location: 'Goa, India (Remote Preferred)',
    profileVisibility: 'Public'
  },
  {
    id: 'stud-3',
    name: 'Rohan Mehta',
    email: 'rohan.mehta@iitd.ac.in',
    institution: 'IIT Delhi',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    graduationYear: '2027',
    gpa: '8.7 / 10',
    statedCareerGoal: 'Frontend Product Engineer & Design Systems',
    matchScoreForPrimaryRole: 88,
    skills: [
      { name: 'React', level: 'Advanced', source: 'Verified', assessmentProof: 'Design system lead for campus portal' },
      { name: 'TypeScript', level: 'Advanced', source: 'Verified' },
      { name: 'Tailwind CSS', level: 'Advanced', source: 'Verified' },
      { name: 'Next.js', level: 'Intermediate', source: 'Verified' },
      { name: 'Figma to Code', level: 'Advanced', source: 'Self-Assessed' },
      { name: 'Web Performance', level: 'Intermediate', source: 'AI-Estimated' }
    ],
    projects: [
      {
        id: 'proj-4',
        title: 'Micro-Interaction Studio UI Library',
        description: 'Accessible, 60fps accessible UI primitives built with Framer Motion and Radix primitives.',
        techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
        repoUrl: 'https://github.com/rohan/micro-studio-ui',
        demoUrl: 'https://micro-studio.dev',
        stars: 215,
        aiScore: 90
      }
    ],
    learningMilestones: {
      completed: 4,
      total: 9,
      lastActivityDaysAgo: 14,
      needsSupport: true,
      supportReason: 'Inactive for 14 days on Web Vitals milestone. Reported blocker with Lighthouse profiling.',
      currentMilestone: 'Core Web Vitals Optimization & Bundle Splitting'
    },
    hackathonWins: ['Best UI/UX • HackIITD 2025'],
    recruiterSaved: false,
    interviewStatus: 'Applied',
    availability: 'Summer 2026',
    location: 'New Delhi, India',
    profileVisibility: 'Public'
  },
  {
    id: 'stud-4',
    name: 'Priya Sen',
    email: 'priya.sen@nitt.edu',
    institution: 'NIT Trichy',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    graduationYear: '2026',
    gpa: '9.1 / 10',
    statedCareerGoal: 'Data Platform & Cloud Architect',
    matchScoreForPrimaryRole: 86,
    skills: [
      { name: 'Python', level: 'Advanced', source: 'Verified' },
      { name: 'Apache Spark', level: 'Intermediate', source: 'Verified' },
      { name: 'Kafka', level: 'Intermediate', source: 'AI-Estimated' },
      { name: 'PostgreSQL', level: 'Intermediate', source: 'Verified' },
      { name: 'Snowflake', level: 'Beginner', source: 'Self-Assessed' },
      { name: 'Terraform', level: 'Beginner', source: 'Self-Assessed' }
    ],
    projects: [
      {
        id: 'proj-5',
        title: 'Real-Time Financial Streaming Anomaly Detector',
        description: 'High-throughput real-time stream consumer processing 25,000 events/sec with sliding-window anomaly score.',
        techStack: ['Python', 'Kafka', 'Apache Spark', 'FastAPI'],
        repoUrl: 'https://github.com/priya/stream-anomaly',
        demoUrl: 'https://stream-anomaly.nitt.edu',
        stars: 128,
        aiScore: 89
      }
    ],
    learningMilestones: {
      completed: 6,
      total: 10,
      lastActivityDaysAgo: 3,
      needsSupport: false,
      currentMilestone: 'Kafka Partition Rebalancing & Distributed Observability'
    },
    hackathonWins: ['3rd Place FinTech Hackathon 2025'],
    recruiterSaved: false,
    interviewStatus: 'Screening',
    availability: '1 Month',
    location: 'Bangalore, India (Hybrid)',
    profileVisibility: 'Public'
  }
];

export const INITIAL_JOBS: JobListing[] = [
  {
    id: 'job-1',
    title: 'Full-Stack AI Software Engineer',
    department: 'Applied AI & Products',
    company: 'Elevate Partner Labs / Google Sourcing',
    location: 'Bangalore, India (Hybrid)',
    remoteType: 'Hybrid',
    employmentType: 'Full-Time',
    salaryRange: '$45,000 - $65,000 USD / Year (₹38L - ₹55L)',
    deadline: '2026-04-30',
    status: 'Active',
    requiredSkills: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL'],
    preferredSkills: ['LangChain', 'Vector DBs', 'Docker', 'PyTorch'],
    experienceLevel: 'Entry Level',
    description: 'Build enterprise-grade AI copilots and high-speed data pipelines for developers. You will design asynchronous microservices and beautiful, responsive web applications.',
    applicantCount: 142
  },
  {
    id: 'job-2',
    title: 'Distributed Systems & Cloud Intern',
    department: 'Cloud Infrastructure',
    company: 'Stripe Ecosystem Partner',
    location: 'Remote (Worldwide)',
    remoteType: 'Remote',
    employmentType: 'Internship',
    salaryRange: '$3,500 - $4,500 USD / Month',
    deadline: '2026-05-15',
    status: 'Active',
    requiredSkills: ['Rust', 'Go', 'Distributed Systems', 'PostgreSQL'],
    preferredSkills: ['Raft / Paxos', 'Docker', 'Kubernetes'],
    experienceLevel: 'Entry Level',
    description: 'Work alongside world-class systems architects on transaction settlement pipelines, write lock-free memory buffers, and benchmark high-throughput microservices.',
    applicantCount: 89
  },
  {
    id: 'job-3',
    title: 'Frontend Product Engineer (Design Systems)',
    department: 'Product Engineering',
    company: 'Linear Ecosystem Partner',
    location: 'Remote (APAC/Europe)',
    remoteType: 'Remote',
    employmentType: 'Full-Time',
    salaryRange: '$40,000 - $55,000 USD / Year',
    deadline: '2026-05-01',
    status: 'Active',
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    preferredSkills: ['Framer Motion', 'Accessibility (WCAG)', 'State Machines'],
    experienceLevel: 'Entry Level',
    description: 'Craft responsive, intuitive interfaces with micro-interactions, dark mode, keyboard navigation, and pixel-perfect ergonomics.',
    applicantCount: 68
  },
  {
    id: 'job-4',
    title: 'Data & Stream Platform Engineer',
    department: 'Data Infrastructure',
    company: 'Datadog Tech Alliance',
    location: 'Hyderabad, India (Hybrid)',
    remoteType: 'Hybrid',
    employmentType: 'Full-Time',
    salaryRange: '$38,000 - $50,000 USD / Year',
    deadline: '2026-06-01',
    status: 'In Review',
    requiredSkills: ['Python', 'Kafka', 'Apache Spark', 'PostgreSQL'],
    preferredSkills: ['Terraform', 'Snowflake', 'AWS Lambda'],
    experienceLevel: 'Entry Level',
    description: 'Design real-time ingestion pipelines processing millions of daily events with zero data loss.',
    applicantCount: 34
  }
];

export const INITIAL_APPLICATIONS: CandidateApplication[] = [
  {
    id: 'app-1',
    candidateId: 'stud-1',
    candidateName: 'Aarav Sharma',
    candidateInstitution: 'IIT Bombay',
    candidateAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    jobId: 'job-1',
    jobTitle: 'Full-Stack AI Software Engineer',
    stage: 'Interview',
    appliedDate: '2026-03-28',
    matchScore: 96,
    matchReason: 'Strong match: Demonstrates production Python, FastAPI, and PostgreSQL skills matching job requirements with verified 1st Place National GenAI Hackathon project.',
    skills: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'LangChain'],
    recruiterNotes: [
      {
        id: 'note-1',
        author: 'Priya Mehta (Lead Recruiter)',
        date: '2026-03-30',
        text: 'Phenomenal GitHub code quality in agent-debugger repo. Asynchronous queues and unit test coverage are exceptional for an undergraduate.'
      }
    ],
    interviewFeedback: {
      rating: 4.8,
      recommendation: 'Strong Hire',
      technicalScore: 9.5,
      notes: 'Cracked the distributed cache problem in 22 minutes with optimal concurrency locking. Exceptional communication and curiosity.',
      date: '2026-04-02'
    }
  },
  {
    id: 'app-2',
    candidateId: 'stud-2',
    candidateName: 'Ananya Verma',
    candidateInstitution: 'BITS Pilani',
    candidateAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    jobId: 'job-2',
    jobTitle: 'Distributed Systems & Cloud Intern',
    stage: 'Shortlisted',
    appliedDate: '2026-04-01',
    matchScore: 92,
    matchReason: 'Strong match: Proven low-level Rust and Go implementations with deep understanding of Raft consensus protocol and distributed state machines.',
    skills: ['Rust', 'Go', 'Distributed Systems', 'PostgreSQL'],
    recruiterNotes: [
      {
        id: 'note-2',
        author: 'Priya Mehta (Lead Recruiter)',
        date: '2026-04-03',
        text: 'Resume cleared ATS with 98% score. Recommended scheduling 45-min technical screening with Staff Systems Architect.'
      }
    ]
  },
  {
    id: 'app-3',
    candidateId: 'stud-3',
    candidateName: 'Rohan Mehta',
    candidateInstitution: 'IIT Delhi',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    jobId: 'job-3',
    jobTitle: 'Frontend Product Engineer (Design Systems)',
    stage: 'Screening',
    appliedDate: '2026-04-04',
    matchScore: 89,
    matchReason: 'Good match: Highly polished design system showcase, strong TypeScript/React skills. Needs assessment on state-machine complex workflows.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    recruiterNotes: [
      {
        id: 'note-3',
        author: 'Priya Mehta (Lead Recruiter)',
        date: '2026-04-05',
        text: 'Portfolio looks crisp. Sent asynchronous component refactoring assessment.'
      }
    ]
  },
  {
    id: 'app-4',
    candidateId: 'stud-4',
    candidateName: 'Priya Sen',
    candidateInstitution: 'NIT Trichy',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    jobId: 'job-4',
    jobTitle: 'Data & Stream Platform Engineer',
    stage: 'Applied',
    appliedDate: '2026-04-06',
    matchScore: 87,
    matchReason: 'Good match: Practical Kafka and Apache Spark streaming experience with high volume benchmarking.',
    skills: ['Python', 'Kafka', 'Apache Spark', 'PostgreSQL'],
    recruiterNotes: []
  }
];

export const INITIAL_HACKATHONS: HackathonEvent[] = [
  {
    id: 'hack-1',
    title: 'National Generative AI Sprint 2026',
    tagline: 'Build autonomous agents, multi-modal systems, and enterprise copilots.',
    description: 'A 48-hour national hackathon bringing together the top student innovators across 100+ universities to pioneer production-ready generative AI architectures.',
    organizer: 'E-Cell BITS Pilani & Elevate Hive Council',
    problemStatements: [
      {
        id: 'ps-1',
        title: 'Autonomous Multi-Agent Systems for Code Refactoring',
        track: 'Developer Tooling & AI',
        difficulty: 'Hard',
        description: 'Design a self-correcting agent loop capable of parsing Git commits, identifying architectural smells, and generating verified pull requests.'
      },
      {
        id: 'ps-2',
        title: 'High-Throughput Vector Retrieval under 15ms Latency',
        track: 'Infrastructure & Data',
        difficulty: 'Medium',
        description: 'Implement an approximate nearest neighbors caching engine designed for sparse embeddings in multi-tenant environments.'
      },
      {
        id: 'ps-3',
        title: 'Accessible AI Interfaces for Healthcare Diagnostics',
        track: 'Healthcare & Public Impact',
        difficulty: 'Medium',
        description: 'Create multi-lingual, voice-first assistive triage workflows for rural health clinics with offline local inference.'
      }
    ],
    themes: ['Autonomous Agents', 'Vector Search', 'Healthcare AI', 'Open Source Tooling'],
    eligibility: 'All undergraduate and postgraduate engineering students enrolled in recognized universities.',
    registrationStart: '2026-02-01',
    registrationEnd: '2026-04-12',
    eventStart: '2026-04-18',
    eventEnd: '2026-04-20',
    teamSizeMin: 2,
    teamSizeMax: 4,
    submissionDeadline: '2026-04-20 18:00 IST',
    prizes: [
      { rank: '1st Place Winner', reward: '$10,000 USD + Direct Fast-Track YC / Google Interviews', sponsor: 'Elevate Innovation Fund' },
      { rank: '2nd Place Runner-Up', reward: '$3,500 USD + Cloud Compute Credits', sponsor: 'Google Cloud' },
      { rank: 'Best Technical Architecture', reward: '$1,500 USD + Open Source Grants', sponsor: 'Qdrant & LangChain' }
    ],
    status: 'Active',
    registrationsCount: 1240,
    teamsCount: 310,
    submissionsCount: 78,
    contactEmail: 'organizers@elevatehive.ai',
    rubrics: [
      { id: 'r-1', criteria: 'Innovation & Novelty', weightPercent: 20, description: 'Freshness of the concept and uniqueness of the solution approach.' },
      { id: 'r-2', criteria: 'Technical Implementation & Code Architecture', weightPercent: 25, description: 'Code cleanliness, asynchronous patterns, modularity, and error resilience.' },
      { id: 'r-3', criteria: 'Problem-Solution Fit', weightPercent: 20, description: 'How well the MVP directly tackles the core problem statement.' },
      { id: 'r-4', criteria: 'Feasibility & Production Readiness', weightPercent: 15, description: 'Realistic cloud deployment, cost-effectiveness, and latency performance.' },
      { id: 'r-5', criteria: 'Potential Real-World Impact', weightPercent: 10, description: 'Quantifiable benefit to users, developers, or society.' },
      { id: 'r-6', criteria: 'Presentation & Live Demo Quality', weightPercent: 10, description: 'Clarity of the pitch deck, UI ergonomics, and live demo reliability.' }
    ]
  },
  {
    id: 'hack-2',
    title: 'Campus GreenTech & Sustainable Cities Challenge',
    tagline: 'IoT, renewable energy grids, and predictive climate modeling.',
    description: 'Empowering engineering students to address carbon footprint tracking, micro-grid energy distribution, and urban waste lifecycle monitoring.',
    organizer: 'IIT Bombay Innovation Council',
    problemStatements: [
      {
        id: 'ps-4',
        title: 'Micro-Grid Solar Energy Optimization Algorithm',
        track: 'Clean Energy',
        difficulty: 'Medium',
        description: 'Predict hourly battery storage demand and dynamic pricing arbitrage for campus solar arrays.'
      }
    ],
    themes: ['IoT Sensors', 'CleanTech', 'Smart Campus', 'Energy Grid'],
    eligibility: 'Open to all STEM students with interest in clean technology.',
    registrationStart: '2026-03-01',
    registrationEnd: '2026-05-10',
    eventStart: '2026-05-22',
    eventEnd: '2026-05-24',
    teamSizeMin: 2,
    teamSizeMax: 4,
    submissionDeadline: '2026-05-24 16:00 IST',
    prizes: [
      { rank: 'Grand Champion', reward: '$7,500 USD + Campus Deployment Grant' },
      { rank: 'Best Hardware/IoT Hack', reward: '$2,500 USD' }
    ],
    status: 'Published',
    registrationsCount: 460,
    teamsCount: 115,
    submissionsCount: 0,
    contactEmail: 'greentech@elevatehive.ai',
    rubrics: [
      { id: 'r-g1', criteria: 'Environmental Impact', weightPercent: 30, description: 'Measurable CO2 or kWh reduction potential.' },
      { id: 'r-g2', criteria: 'Technical Feasibility', weightPercent: 30, description: 'Hardware and software integration quality.' },
      { id: 'r-g3', criteria: 'Scalability', weightPercent: 20, description: 'Adaptability to cities beyond campus.' },
      { id: 'r-g4', criteria: 'UI & User Adoption', weightPercent: 20, description: 'Usability for non-technical facility managers.' }
    ]
  }
];

export const INITIAL_HACKATHON_SUBMISSIONS: HackathonProjectSubmission[] = [
  {
    id: 'sub-hack-1',
    hackathonId: 'hack-1',
    hackathonTitle: 'National Generative AI Sprint 2026',
    teamId: 'team-alpha',
    teamName: 'Team Nexus AI',
    projectTitle: 'Autonomous Multi-Agent AI Code Debugger',
    problemStatement: 'Autonomous Multi-Agent Systems for Code Refactoring',
    solutionDescription: 'A multi-agent supervisor pattern using LangGraph that checks pull requests, generates regression tests in isolated sandboxes, and verifies execution before recommending fixes.',
    techStack: ['Python', 'FastAPI', 'LangGraph', 'React', 'Qdrant', 'Docker'],
    repoUrl: 'https://github.com/aarav/agent-debugger',
    demoUrl: 'https://agent-debugger.demo.run',
    submittedAt: '2026-04-20 17:15 IST',
    status: 'Evaluated',
    assignedJudges: ['Dr. Vikram Singhal (AI Lead)', 'Dr. Rajesh Kulkarni (Mentor)'],
    evaluations: [
      {
        judgeName: 'Dr. Vikram Singhal',
        scores: {
          innovation: 9.5,
          technicalImplementation: 9.6,
          problemSolutionFit: 9.4,
          feasibility: 9.2,
          potentialImpact: 9.5,
          presentationQuality: 9.2
        },
        totalScore: 9.42,
        feedbackComments: 'Extraordinary sandbox execution architecture. Test generation feedback loop shows production maturity.',
        evaluatedAt: '2026-04-21'
      }
    ]
  },
  {
    id: 'sub-hack-2',
    hackathonId: 'hack-1',
    hackathonTitle: 'National Generative AI Sprint 2026',
    teamId: 'team-beta',
    teamName: 'Team HyperVector',
    projectTitle: 'Zero-Latency HNSW Semantic Cache Proxy',
    problemStatement: 'High-Throughput Vector Retrieval under 15ms Latency',
    solutionDescription: 'High performance proxy built in Go with localized memory mapped vector indexes for sub-10ms semantic cache hits.',
    techStack: ['Go', 'Redis', 'Python', 'Docker'],
    repoUrl: 'https://github.com/aarav/vector-cache-proxy',
    demoUrl: 'https://vector-cache.dev',
    submittedAt: '2026-04-20 17:42 IST',
    status: 'Under Review',
    assignedJudges: ['Dr. Vikram Singhal (AI Lead)'],
    evaluations: []
  }
];

export const INITIAL_MENTOR_SUBMISSIONS: ProjectSubmissionReview[] = [
  {
    id: 'rev-1',
    studentId: 'stud-1',
    studentName: 'Aarav Sharma',
    projectTitle: 'Autonomous Multi-Agent AI Code Debugger',
    description: 'Semester Capstone Project: Distributed LangGraph agent cluster that analyzes GitHub PRs, generates AST diffs, and predicts regression bugs under 800ms.',
    repoUrl: 'https://github.com/aarav/agent-debugger',
    demoUrl: 'https://agent-debugger.demo.run',
    techStack: ['Python', 'FastAPI', 'LangGraph', 'React', 'Qdrant'],
    submittedDate: '2026-04-03',
    milestoneName: 'Milestone 4: Multi-Agent Concurrency & Sandbox Isolation',
    status: 'Pending Review',
    rubricScores: {
      architecture: 9,
      codeQuality: 9,
      documentation: 8,
      innovation: 10,
      feedbackNotes: 'Outstanding separation of concerns between planner agent and executor sandbox. Recommend adding distributed tracing with OpenTelemetry.',
      suggestedImprovements: [
        'Add OpenTelemetry traces for agent step latency profiling.',
        'Document fallback paths when local LLM context window overflows.',
        'Include stress tests for 50 concurrent PR reviews.'
      ]
    }
  },
  {
    id: 'rev-2',
    studentId: 'stud-2',
    studentName: 'Ananya Verma',
    projectTitle: 'Decentralized Campus Identity Protocol',
    description: 'Semester Capstone Project: Zero-knowledge verifiable credentials protocol for student transcripts and hackathon awards.',
    repoUrl: 'https://github.com/ananya/solana-id',
    demoUrl: 'https://solana-id.campus.org',
    techStack: ['Rust', 'Solana', 'TypeScript', 'Next.js'],
    submittedDate: '2026-04-01',
    milestoneName: 'Milestone 3: Smart Contract Verification & ZK Proofs',
    status: 'Approved',
    rubricScores: {
      architecture: 10,
      codeQuality: 9,
      documentation: 9,
      innovation: 9,
      feedbackNotes: 'Exemplary security review. No reentrancy issues discovered in Rust smart contract audit.',
      suggestedImprovements: [
        'Write migration guide for university registrar backend integration.'
      ]
    }
  },
  {
    id: 'rev-3',
    studentId: 'stud-3',
    studentName: 'Rohan Mehta',
    projectTitle: 'Micro-Interaction Studio UI Library',
    description: 'Accessible 60fps design system with Radix primitives.',
    repoUrl: 'https://github.com/rohan/micro-studio-ui',
    demoUrl: 'https://micro-studio.dev',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    submittedDate: '2026-03-24',
    milestoneName: 'Milestone 2: Component Accessibility (WCAG 2.1 AA)',
    status: 'Revision Requested',
    rubricScores: {
      architecture: 7,
      codeQuality: 8,
      documentation: 6,
      innovation: 8,
      feedbackNotes: 'Screen reader support is incomplete on the modal dialog component. ARIA-labelledby is missing.',
      suggestedImprovements: [
        'Ensure focus trap works when Tab key is pressed repeatedly inside modals.',
        'Add keyboard shortcuts legend to Storybook docs.'
      ]
    }
  }
];

export const INITIAL_MENTORSHIP_SESSIONS: MentorshipSession[] = [
  {
    id: 'ses-1',
    studentId: 'stud-1',
    studentName: 'Aarav Sharma',
    topic: 'Production Deployment & Google / Stripe Technical Interview Preparation',
    dateTime: 'Today • 04:30 PM - 05:15 PM',
    duration: '45 mins',
    status: 'Confirmed',
    learningGoal: 'Refine system architecture pitch for distributed vector database caching and review concurrency edge cases.',
    privateMentorNotes: 'Candidate is extremely sharp in Python. Advise focusing on trade-offs between eventual consistency and strong consistency in PostgreSQL replication.',
    actionItems: [
      'Read Martin Kleppmann Chapter 7 (Transactions) & Chapter 8 (Distributed Troubles).',
      'Benchmark Redis Cluster vs HNSW Qdrant memory footprint.'
    ]
  },
  {
    id: 'ses-2',
    studentId: 'stud-3',
    studentName: 'Rohan Mehta',
    topic: 'Supportive Check-in: Overcoming Bundle Splitting & Web Vitals Blockers',
    dateTime: 'Tomorrow • 11:00 AM - 11:30 AM',
    duration: '30 mins',
    status: 'Confirmed',
    learningGoal: 'Troubleshoot Webpack/Vite code splitting configuration and provide encouraging guidance on performance profiling.',
    privateMentorNotes: 'Student showed hesitation after feedback on Milestone 2. Provide empathetic reassurance and pair-program on Lighthouse profiling.',
    actionItems: [
      'Demonstrate Chrome DevTools Performance Profiler recording.',
      'Refactor dynamic import() chunks together.'
    ]
  },
  {
    id: 'ses-3',
    studentId: 'stud-4',
    studentName: 'Priya Sen',
    topic: 'Kafka Consumer Group Rebalancing Deep Dive',
    dateTime: 'Friday • 03:00 PM - 03:45 PM',
    duration: '45 mins',
    status: 'Pending',
    learningGoal: 'Understand static membership and cooperative sticky partition assignment strategies.',
    privateMentorNotes: 'Prepare diagram of Kafka heartbeat thread vs processing thread.'
  }
];

// Helper Store Functions to Get / Update Ecosystem State
const ECOSYSTEM_STORAGE_KEY = 'elevate_hive_ecosystem_data_v2';

export interface EcosystemState {
  students: StudentEcosystemProfile[];
  jobs: JobListing[];
  applications: CandidateApplication[];
  hackathons: HackathonEvent[];
  hackathonSubmissions: HackathonProjectSubmission[];
  mentorSubmissions: ProjectSubmissionReview[];
  mentorshipSessions: MentorshipSession[];
  learningPlans: LearningPlan[];
}

export function getEcosystemState(): EcosystemState {
  try {
    const raw = localStorage.getItem(ECOSYSTEM_STORAGE_KEY);
    if (!raw) {
      const initial: EcosystemState = {
        students: INITIAL_STUDENTS,
        jobs: INITIAL_JOBS,
        applications: INITIAL_APPLICATIONS,
        hackathons: INITIAL_HACKATHONS,
        hackathonSubmissions: INITIAL_HACKATHON_SUBMISSIONS,
        mentorSubmissions: INITIAL_MENTOR_SUBMISSIONS,
        mentorshipSessions: INITIAL_MENTORSHIP_SESSIONS,
        learningPlans: []
      };
      localStorage.setItem(ECOSYSTEM_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    return {
      students: INITIAL_STUDENTS,
      jobs: INITIAL_JOBS,
      applications: INITIAL_APPLICATIONS,
      hackathons: INITIAL_HACKATHONS,
      hackathonSubmissions: INITIAL_HACKATHON_SUBMISSIONS,
      mentorSubmissions: INITIAL_MENTOR_SUBMISSIONS,
      mentorshipSessions: INITIAL_MENTORSHIP_SESSIONS,
      learningPlans: []
    };
  }
}

export function saveEcosystemState(state: EcosystemState): void {
  try {
    localStorage.setItem(ECOSYSTEM_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save ecosystem state', e);
  }
}
