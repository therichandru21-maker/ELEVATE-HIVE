export interface RoleOption {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  benefits: string[];
}

export const ROLES_DATA: RoleOption[] = [
  {
    id: 'student',
    title: 'Student Developer',
    subtitle: 'Undergraduate / Postgraduate',
    iconName: 'GraduationCap',
    description: 'Find cross-campus hackathon teammates, access 24/7 AI code mentorship, practice mock technical interviews, and get hired by top YC startups.',
    benefits: [
      'Practice AI Mock Technical & HR Interviews',
      'AI Team Finder with Vector Skill Match',
      'Verified GitHub Commit Portfolio'
    ]
  },
  {
    id: 'teacher-mentor',
    title: 'Teacher / Faculty Mentor',
    subtitle: 'Professors & Hackathon Mentors',
    iconName: 'Teacher',
    description: 'Review student code submissions with AI plagiarism detection, track project milestones, and assign automated grades.',
    benefits: [
      'Automated Code Rubric Evaluator',
      'AI Plagiarism & Originality Auditor',
      'Class Innovation Progress Dashboard'
    ]
  },
  {
    id: 'recruiter',
    title: 'Tech Recruiter',
    subtitle: 'Talent Acquisition & Sourcing',
    iconName: 'Briefcase',
    description: 'Filter student talent by verified GitHub commits and hackathon standings. Book fast-track technical interviews in 1 click.',
    benefits: [
      'Direct Hackathon Winner Sourcing',
      'Fast-track 1-click Interview Scheduler',
      'Verified Skill Matrix Analytics'
    ]
  },
  {
    id: 'hackathon-creator',
    title: 'Hackathon Organizer',
    subtitle: 'Club Leads & Event Directors',
    iconName: 'Trophy',
    description: 'Generate hackathon problem statements, tracks, and rubrics in 60 seconds with AI. Automate judging and digital certificates.',
    benefits: [
      '60-Second AI Track & Problem Builder',
      'Automated Submissions & Rubrics',
      'Verifiable Digital Certificate Engine'
    ]
  }
];
