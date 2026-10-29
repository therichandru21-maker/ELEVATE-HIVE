export interface StatItem {
  id: string;
  value: string;
  numericValue: number;
  label: string;
  sublabel: string;
  iconName: string;
  growth: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  badge: string;
  color: string;
  metrics: string;
  highlights: string[];
  demoType: 'generator' | 'teambuilder' | 'mentor' | 'tracker' | 'analyzer' | 'internship';
}

export interface HackathonItem {
  id: string;
  title: string;
  college: string;
  logoUrl: string;
  prizePool: string;
  participants: number;
  tags: string[];
  daysLeft: number;
  featured: boolean;
  mode: 'Online' | 'Hybrid' | 'In-Person';
}

export interface StudentProject {
  id: string;
  title: string;
  college: string;
  author: string;
  avatarUrl: string;
  upvotes: number;
  stars: number;
  tags: string[];
  hackathonWinner: string;
  aiScore: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  college: string;
  avatar: string;
  quote: string;
  achievement: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'hackathons' | 'ai' | 'colleges';
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  popular?: boolean;
  badge?: string;
  features: string[];
  cta: string;
}

export interface HackathonGenerationResult {
  theme: string;
  problemStatements: string[];
  tracks: string[];
  evaluationCriteria: { criteria: string; weight: string }[];
  suggestedDuration: string;
  recommendedSponsors: string[];
}

export interface TeamMemberCandidate {
  name: string;
  college: string;
  role: string;
  topSkills: string[];
  synergyScore: number;
  githubStars: number;
  avatar: string;
}
