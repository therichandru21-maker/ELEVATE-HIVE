import { StatItem, FeatureCard, HackathonItem, StudentProject, TestimonialItem, FAQItem, PricingPlan } from '../types';

export const STATS_DATA: StatItem[] = [
  {
    id: 'colleges',
    value: '500+',
    numericValue: 500,
    label: 'Partner Colleges',
    sublabel: 'IITs, NITs, BITS, Ivy League & global universities',
    iconName: 'Building2',
    growth: '+42% YoY'
  },
  {
    id: 'students',
    value: '25,000+',
    numericValue: 25000,
    label: 'Student Innovators',
    sublabel: 'Active developers, designers, and AI researchers',
    iconName: 'Users',
    growth: '+12,000 this semester'
  },
  {
    id: 'hackathons',
    value: '1,500+',
    numericValue: 1500,
    label: 'Hackathons Powered',
    sublabel: 'National, intra-college & global AI hackathons',
    iconName: 'Trophy',
    growth: '$1.8M in prizes awarded'
  },
  {
    id: 'projects',
    value: '10,000+',
    numericValue: 10000,
    label: 'College Projects',
    sublabel: 'Verified codebases, AI models & startup MVPs',
    iconName: 'FolderGit2',
    growth: '85% active github repos'
  }
];

export const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'hackathon-gen',
    title: 'AI Hackathon Generator',
    tagline: 'Launch enterprise-grade college hackathons in 60 seconds.',
    description: 'Auto-generate customized problem statements, rubrics, tracks, schedule timelines, and AI-judging frameworks calibrated for student skill levels.',
    icon: 'Sparkles',
    badge: 'Popular for E-Cells',
    color: 'from-cyan-500 to-blue-600',
    metrics: '90% faster setup',
    highlights: ['Instant problem statement matrix', 'Automated submission rubrics', 'Sponsor track AI matchmaking'],
    demoType: 'generator'
  },
  {
    id: 'team-builder',
    title: 'AI Team Builder',
    tagline: 'Form dream hackathon squads with algorithmic skill synergy.',
    description: 'Our vector-matching AI pairs developers, UI/UX designers, and domain hackers based on complementary tech stacks, timezone availability, and historical hackathon performance.',
    icon: 'UserPlus',
    badge: 'Cross-Campus',
    color: 'from-purple-500 to-indigo-600',
    metrics: '94% team success rate',
    highlights: ['Synergy score calculation', 'Role balance optimization', 'Automated invite pinging'],
    demoType: 'teambuilder'
  },
  {
    id: 'ai-mentor',
    title: '24/7 AI Tech Mentor',
    tagline: 'Real-time code reviews & architectural guidance at 3 AM.',
    description: 'Trained on top open-source repositories and hackathon winner codebases, our AI mentor spots bugs, suggests API integrations, and refactors code live in your IDE.',
    icon: 'Bot',
    badge: '24/7 Live',
    color: 'from-emerald-500 to-teal-600',
    metrics: '<2 sec answer latency',
    highlights: ['Live bug detection', 'System architecture diagramming', 'Pitch deck narrative improver'],
    demoType: 'mentor'
  },
  {
    id: 'project-tracker',
    title: 'Real-Time Project Tracker',
    tagline: 'Track hackathon commits, milestones, and sprint velocity.',
    description: 'Seamless GitHub integration auto-tracks commit activity, milestone completions, demo video generation, and prevents last-minute submission panics.',
    icon: 'Kanban',
    badge: 'GitHub Sync',
    color: 'from-amber-500 to-orange-600',
    metrics: '100% submission compliance',
    highlights: ['Automatic commit graph', 'Demo reel auto-compiler', 'Milestone alert notifications'],
    demoType: 'tracker'
  },
  {
    id: 'skill-analyzer',
    title: 'AI Skill Analyzer',
    tagline: 'Turn college coursework and hackathons into verified skill proof.',
    description: 'Scans your GitHub repos, pull requests, and project architectures to generate an industry-backed developer proof card and personalized learning path.',
    icon: 'BarChart3',
    badge: 'Verified Portfolio',
    color: 'from-rose-500 to-pink-600',
    metrics: '3x recruiter callbacks',
    highlights: ['Deep code quality breakdown', 'Tech stack percentile scoring', 'Missing gap recommendations'],
    demoType: 'analyzer'
  },
  {
    id: 'internship-hub',
    title: 'AI Internship Match Hub',
    tagline: 'Direct pipeline from hackathon winners to YC & Fortune 500 teams.',
    description: 'Skip standard resume ATS blackholes. Recruiters hire directly based on your verified Elevate Hive project builds, peer code reviews, and leaderboard standings.',
    icon: 'Briefcase',
    badge: 'Direct Hiring',
    color: 'from-blue-500 to-cyan-500',
    metrics: '$85k avg starting offer',
    highlights: ['Direct recruiter inbox', 'Fast-track interview badges', 'Hackathon winner verified proof'],
    demoType: 'internship'
  }
];

export const HACKATHONS_LIST: HackathonItem[] = [
  {
    id: 'hack-1',
    title: 'National AI Campus Championship 2026',
    college: 'IIT Bombay & Elevate Hive',
    logoUrl: 'https://picsum.photos/seed/iitb/100/100',
    prizePool: '$50,000',
    participants: 4800,
    tags: ['Generative AI', 'Agents', 'Cloud'],
    daysLeft: 4,
    featured: true,
    mode: 'Hybrid'
  },
  {
    id: 'hack-2',
    title: 'Global College HealthTech Hack',
    college: 'Stanford Student Tech',
    logoUrl: 'https://picsum.photos/seed/stanford/100/100',
    prizePool: '$35,000',
    participants: 3200,
    tags: ['MedTech', 'Vision AI', 'IoT'],
    daysLeft: 9,
    featured: true,
    mode: 'Online'
  },
  {
    id: 'hack-3',
    title: 'Inter-College Climate AI Challenge',
    college: 'BITS Pilani E-Cell',
    logoUrl: 'https://picsum.photos/seed/bits/100/100',
    prizePool: '₹15,000,000',
    participants: 2100,
    tags: ['Sustainability', 'Satellite AI', 'Green Code'],
    daysLeft: 12,
    featured: false,
    mode: 'In-Person'
  },
  {
    id: 'hack-4',
    title: 'Web3 & Autonomous Agents Sprint',
    college: 'MIT Web3 Collective',
    logoUrl: 'https://picsum.photos/seed/mit/100/100',
    prizePool: '$40,000',
    participants: 1950,
    tags: ['Web3', 'AI Agents', 'DeFi'],
    daysLeft: 18,
    featured: false,
    mode: 'Online'
  }
];

export const FEATURED_PROJECTS: StudentProject[] = [
  {
    id: 'proj-1',
    title: 'AuraScript — AI Realtime Code Visualizer for STEM Labs',
    college: 'IIT Madras',
    author: 'Aarav Sharma & Team',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    upvotes: 842,
    stars: 310,
    tags: ['React 19', 'Gemini API', 'WebAssembly'],
    hackathonWinner: '1st Place — National AI Sprint',
    aiScore: 98
  },
  {
    id: 'proj-2',
    title: 'PulseSat — Low-Cost Wildfire Detection via Satellite Models',
    college: 'UC Berkeley',
    author: 'Elena Rostova',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    upvotes: 720,
    stars: 245,
    tags: ['PyTorch', 'GIS Data', 'Edge AI'],
    hackathonWinner: 'Best Environmental Impact 2026',
    aiScore: 96
  },
  {
    id: 'proj-3',
    title: 'MedAssist Voice — Multi-Lingual Rural Diagnostic Assistant',
    college: 'BITS Pilani',
    author: 'Karthik Raja & Squad',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    upvotes: 690,
    stars: 189,
    tags: ['Whisper AI', 'Node.js', 'React Native'],
    hackathonWinner: 'Grand Winner — Stanford Global Hack',
    aiScore: 95
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Ananya Verma',
    role: 'Lead Organizer & CS Senior',
    college: 'IIT Delhi',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    quote: 'Elevate Hive transformed how our college hosts hackathons. We ran a 2,500-student hackathon with automated AI grading and team matching in literally 2 days. The energy was incredible!',
    achievement: 'Organized HackDelhi 2026',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Marcus Chen',
    role: 'Full-Stack Developer Student',
    college: 'UC Berkeley',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    quote: 'I found my co-founder on Elevate Hive Team Builder! The AI matched our skill gaps perfectly. We went on to win $25,000 at the Global AI Championship and got into YC W26.',
    achievement: 'Co-founder at NeuralMesh',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Prof. Rajesh K. Kulkarni',
    role: 'Dean of Innovation & E-Cell Director',
    college: 'BITS Pilani',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    quote: 'For universities, Elevate Hive gives unprecedented visibility into student engineering talent. It tracks real commit output and bridges academia directly with global tech companies.',
    achievement: 'Managed 18 Campus Labs',
    rating: 5
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is Elevate Hive and how does it help college students?',
    answer: 'Elevate Hive is an all-in-one innovation operating system designed for college developers, campus clubs, and university innovation centers. It unifies AI-driven hackathon generation, automated team matchmaking, 24/7 technical AI mentorship, project commitment tracking, and direct recruiter matching into a single futuristic platform.',
    category: 'general'
  },
  {
    id: 'faq-2',
    question: 'How does the AI Hackathon Generator work?',
    answer: 'You input your event theme or target focus (e.g. HealthTech, Web3, Sustainable Smart Cities), and Elevate Hive instantly creates tailored problem statements, rubric rubrics, judging criteria, track structures, and schedule blueprints ready for launch.',
    category: 'hackathons'
  },
  {
    id: 'faq-3',
    question: 'Is Elevate Hive free for individual students and college clubs?',
    answer: 'Yes! Individual students can access team matching, project portfolios, and basic AI mentorship 100% free forever. College clubs and E-Cells also get free community tier access to host intra-college sprints.',
    category: 'general'
  },
  {
    id: 'faq-4',
    question: 'How does the AI Team Builder find compatible teammates?',
    answer: 'Our AI analyzes tech stack profiles, GitHub repositories, preferred roles (Frontend, ML, Hardware, Pitching), time commitment, and past hackathon accomplishments to calculate a Synergy Match Score and connect you with ideal squad members.',
    category: 'ai'
  },
  {
    id: 'faq-5',
    question: 'Can universities and corporate sponsors host national hackathons?',
    answer: 'Absolutely. We offer dedicated University & Sponsor tiers that support custom branding, NDA submission vaults, automated plagiarism & AI code checkers, and direct talent sourcing pipelines.',
    category: 'colleges'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'student-tier',
    name: 'Student Innovator',
    price: '$0',
    period: 'forever free',
    description: 'Perfect for student coders, designers, and hackathon enthusiasts building their campus reputation.',
    badge: 'Free Tier',
    features: [
      'Unlimited Hackathon Participation',
      'AI Team Builder Matching',
      '24/7 AI Code Mentor (100 queries/mo)',
      'Verified Developer Proof Card',
      'Community Project Showcase',
      'GitHub Progress Sync'
    ],
    cta: 'Get Started Free'
  },
  {
    id: 'club-tier',
    name: 'College Club / E-Cell',
    price: '$29',
    period: 'per month',
    description: 'Built for campus tech clubs, GDSCs, ACM chapters, and E-Cells hosting college hackathons.',
    popular: true,
    badge: 'Most Popular',
    features: [
      'Everything in Student Tier',
      'Unlimited AI Hackathon Generations',
      'Up to 1,000 Participant Registrations',
      'Automated Judging Rubrics & Leaderboards',
      'Custom Campus Portal Branding',
      'Sponsor Tracking & Export Analytics',
      'Priority Support & Discord Community'
    ],
    cta: 'Start Club Trial'
  },
  {
    id: 'university-tier',
    name: 'University & Enterprise',
    price: 'Custom',
    period: 'annual agreement',
    description: 'For university innovation centers, state incubators, and enterprise tech sponsors.',
    badge: 'Enterprise',
    features: [
      'Multi-College Ecosystem Hub',
      'Unlimited Participants & Hackathons',
      'AI Plagiarism & Integrity Checker',
      'Direct Recruiter & Startup Placement Engine',
      'Dedicated Account Manager & SLA',
      'Custom SSO & LTI Integration',
      'Private Data Vaults & On-Prem Options'
    ],
    cta: 'Schedule University Demo'
  }
];

export const COLLEGE_LOGOS = [
  'IIT Bombay', 'IIT Delhi', 'Stanford', 'UC Berkeley', 'BITS Pilani',
  'MIT', 'IIT Madras', 'Harvard Tech', 'NIT Trichy', 'Cambridge AI'
];
