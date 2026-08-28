export type UserRole = 'student' | 'recruiter' | 'academician' | 'institution_admin';

export type ActiveTab = 
  | 'profile'
  | 'dashboard'
  | 'skill_passport'
  | 'assessments'
  | 'opportunities'
  | 'learning_programs'
  | 'academician_hub'
  | 'analytics'
  | 'documents'
  | 'collaboration';

export type LanguageCode = 'en' | 'es' | 'hi' | 'fr' | 'de' | 'ja';

export interface Milestone {
  id: string;
  title: string;
  date: string;
  category: 'education' | 'certification' | 'internship' | 'achievement';
  description: string;
  issuer?: string;
  verified: boolean;
  verificationHash?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Technical' | 'Analytical' | 'Soft Skills' | 'Domain';
  proficiency: number; // 0 - 100
  verified: boolean;
  verifiedBy?: string;
  endorsementsCount: number;
  industryBenchmark: number; // expected industry level 0 - 100
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  credentialUrl: string;
  verified: boolean;
  badgeIcon: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  duration: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  verifiedByFaculty?: string;
  industryPartner?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  title: string;
  avatar: string;
  role: UserRole;
  location: string;
  verified: boolean;
  completionPercentage: number;
  institution: string;
  department: string;
  gpa: string;
  graduationYear: string;
  bio: string;
  resumeUrl?: string;
  linkedin?: string;
  github?: string;
  milestones: Milestone[];
  skills: SkillItem[];
  certifications: Certification[];
  projects: ProjectItem[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  skillTag: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Assessment {
  id: string;
  title: string;
  domain: string;
  description: string;
  durationMinutes: number;
  questionCount: number;
  targetRole: string;
  industryPartner: string;
  questions: AssessmentQuestion[];
  completed?: boolean;
  lastScore?: number;
  lastTakenDate?: string;
  badgeName?: string;
}

export interface AssessmentResult {
  assessmentId: string;
  assessmentTitle: string;
  scorePercentage: number;
  totalQuestions: number;
  correctCount: number;
  domainScores: Record<string, number>;
  identifiedStrengths: string[];
  skillGaps: {
    skill: string;
    currentLevel: number;
    requiredLevel: number;
    recommendedResource: string;
  }[];
  careerRecommendations: string[];
  takenAt: string;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'Student Internship' | 'Faculty Internship' | 'Entry-Level Job' | 'Apprenticeship' | 'Live Project' | 'FDP / Training' | 'Research Collaboration';
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  stipendOrSalary: string;
  duration: string;
  postedDate: string;
  deadline: string;
  requiredSkills: string[];
  minGpa?: number;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  openingsCount: number;
  applicantsCount: number;
  roleTarget: 'student' | 'academician' | 'both';
  matchScore?: number; // Calculated dynamically based on profile
  featured?: boolean;
}

export interface Application {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  company: string;
  type: string;
  applicantId: string;
  applicantName: string;
  applicantRole: UserRole;
  appliedDate: string;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Assessment' | 'Interview Scheduled' | 'Offer Extended' | 'Accepted' | 'Completed';
  mentorFeedback?: string;
  completionRating?: number;
  notes?: string;
  matchScore: number;
}

export interface LearningProgram {
  id: string;
  title: string;
  provider: string;
  providerLogo: string;
  category: 'Certification Course' | 'Training Program' | 'Industry Workshop' | 'Mentorship Cohort' | 'Hackathon / Challenge';
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  enrolledCount: number;
  rating: number;
  skillsTaught: string[];
  description: string;
  modules: string[];
  certificateProvided: boolean;
  freeOrPaid: 'Free' | 'Sponsored' | 'Certified';
  status: 'Available' | 'Enrolled' | 'Completed';
  instructor: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  type: 'Resume' | 'Degree Certificate' | 'Internship Report' | 'Academic Transcript' | 'Research Paper' | 'FDP Certificate';
  uploadDate: string;
  fileSize: string;
  status: 'Verified by Institution' | 'Pending Verification' | 'Industry Endorsed';
  hash: string;
  url: string;
}

export interface MentorshipSession {
  id: string;
  mentorName: string;
  mentorTitle: string;
  company: string;
  avatar: string;
  topic: string;
  date: string;
  time: string;
  status: 'Available' | 'Booked' | 'Completed';
  targetAudience: 'Student' | 'Faculty' | 'All';
  rating: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'opportunity' | 'assessment' | 'application' | 'mentor' | 'system';
  linkTab?: ActiveTab;
}
