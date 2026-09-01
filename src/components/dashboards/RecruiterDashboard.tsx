import React, { useState } from 'react';
import { 
  Building2, 
  Briefcase, 
  Users, 
  UserCheck, 
  Search, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Sparkles, 
  PlusCircle, 
  Eye, 
  Mail, 
  FileText, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  TrendingUp,
  Award,
  Check,
  X
} from 'lucide-react';
import { UserProfile, Opportunity, ActiveTab } from '../../types';
import { STUDENT_KARTIK_AVATAR } from '../../data/userAvatars';

interface RecruiterDashboardProps {
  profile: UserProfile;
  opportunities: Opportunity[];
  onNavigate: (tab: ActiveTab) => void;
  onOpenPostOpportunity: () => void;
}

interface CandidateItem {
  id: string;
  name: string;
  avatar: string;
  title: string;
  institution: string;
  gpa: string;
  matchScore: number;
  skills: string[];
  appliedRole: string;
  appliedDate: string;
  status: 'New' | 'Shortlisted' | 'Interview' | 'Offered' | 'Rejected';
  verifiedPassport: boolean;
}

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({
  profile,
  opportunities,
  onNavigate,
  onOpenPostOpportunity
}) => {
  const [candidateFilter, setCandidateFilter] = useState<'All' | 'Shortlisted' | 'Interview'>('All');
  const [isPipelineOpen, setIsPipelineOpen] = useState<boolean>(false);
  const [isOpeningsOpen, setIsOpeningsOpen] = useState<boolean>(false);
  const [isInterviewsOpen, setIsInterviewsOpen] = useState<boolean>(false);

  const [candidates, setCandidates] = useState<CandidateItem[]>([
    {
      id: 'c1',
      name: 'Kartik',
      avatar: STUDENT_KARTIK_AVATAR,
      title: 'Senior Data Analyst | Columbia Univ',
      institution: 'Columbia University',
      gpa: '3.92 / 4.00',
      matchScore: 94,
      skills: ['Python', 'SQL', 'BigQuery', 'Machine Learning', 'Tableau'],
      appliedRole: 'Senior Data Analyst & ML Engineer',
      appliedDate: '2 hours ago',
      status: 'Interview',
      verifiedPassport: true
    },
    {
      id: 'c2',
      name: 'Elena Rostova (Student Scholar)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      title: 'Distributed Systems Graduate Researcher',
      institution: 'MIT EECS',
      gpa: '3.96 / 4.00',
      matchScore: 91,
      skills: ['Rust', 'Go', 'Kubernetes', 'Cloud Native', 'eBPF'],
      appliedRole: 'Cloud Infrastructure & Distributed Systems Fellow',
      appliedDate: 'Yesterday',
      status: 'Shortlisted',
      verifiedPassport: true
    },
    {
      id: 'c3',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      title: 'Full Stack & Enterprise Software Engineer',
      institution: 'Stanford University',
      gpa: '3.88 / 4.00',
      matchScore: 88,
      skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
      appliedRole: 'Full Stack Software Engineer Apprentice',
      appliedDate: '3 days ago',
      status: 'New',
      verifiedPassport: true
    },
    {
      id: 'c4',
      name: 'Aisha Patel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      title: 'Industrial IoT & Automation Specialist',
      institution: 'Carnegie Mellon University',
      gpa: '3.85 / 4.00',
      matchScore: 86,
      skills: ['IoT Sensors', 'Python', 'PLC Telemetry', 'AWS IoT'],
      appliedRole: 'Industrial Automation & Telemetry Engineer',
      appliedDate: '4 days ago',
      status: 'Shortlisted',
      verifiedPassport: true
    }
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleUpdateStatus = (id: string, newStatus: CandidateItem['status']) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    const target = candidates.find(c => c.id === id);
    setNotification(`Candidate ${target?.name} status updated to ${newStatus}`);
    setTimeout(() => setNotification(null), 3500);
  };

  const filteredCandidates = candidates.filter(c => {
    if (candidateFilter === 'All') return true;
    return c.status === candidateFilter;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Toast notification */}
      {notification && (
        <div className="bg-[#34583A] text-[#F9F9F7] px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between shadow-lg animate-in slide-in-from-top-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#CFE0D1]" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-white/80 hover:text-white cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Recruiter Hero Banner */}
      <div className="bg-[#2D2D24] text-[#F9F9F7] rounded-2xl p-6 md:p-8 shadow-md border border-[#3E3E32] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-[#5A5A40]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#D4D4B8] text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-4 h-4 text-[#CFE0D1]" />
              <span>{profile.institution || 'Siemens Enterprise Digital Solutions'}</span>
              <span className="bg-[#34583A] text-[#CFE0D1] px-2 py-0.5 rounded text-[10px] font-bold">Verified Enterprise</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-serif-display">
              Recruiter Talent Portal — {profile.name}
            </h1>
            <p className="text-sm text-[#C5C4BA] mt-1.5 max-w-2xl leading-relaxed">
              Managing <strong>{opportunities.length} active industry postings</strong> and <strong>48 pre-verified university applicants</strong> across top engineering consortiums.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenPostOpportunity}
              className="bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] px-5 py-2.5 rounded-lg text-xs md:text-sm font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2 border border-[#6B6B4D]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Role</span>
            </button>
            <button
              onClick={() => onNavigate('opportunities')}
              className="bg-[#F9F9F7]/10 hover:bg-[#F9F9F7]/20 text-[#F9F9F7] border border-[#F9F9F7]/20 px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-[#CFE0D1]" />
              <span>Manage Postings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recruiter Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs border-l-4 border-l-[#5A5A40]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Total Applicants</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">48</span>
            <span className="text-xs font-bold text-[#34583A]">+12 new today</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">100% Cryptographically Verified</p>
        </div>

        <div className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs border-l-4 border-l-[#34583A]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Shortlisted Pool</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">14</span>
            <span className="text-xs font-bold text-[#5A5A40]">Avg 91% Match</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Ready for Technical Interview</p>
        </div>

        <div className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs border-l-4 border-l-[#7A6A32]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Live Interviews</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">6</span>
            <span className="text-xs font-bold text-[#7A6A32]">2 Scheduled Today</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Includes Brajesh (Data ML)</p>
        </div>

        <div className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs border-l-4 border-l-[#8C5E3C]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Offers Extended</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">3</span>
            <span className="text-xs font-bold text-[#34583A]">100% Acceptance</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Consortium Spring Batch</p>
        </div>
      </div>

      {/* Candidate Pipeline Queue (Collapsible Dropdown Field) */}
      <div className="bg-[#F9F9F7] rounded-2xl border border-[#E5E2D9] p-6 shadow-xs space-y-6 transition-all">
        <div 
          onClick={() => setIsPipelineOpen(!isPipelineOpen)}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#5A5A40] text-[#F9F9F7] flex items-center justify-center flex-shrink-0 shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#2D2D2A] font-serif-display group-hover:text-[#5A5A40] transition-colors">
                  AI-Ranked Candidate Verification &amp; Pipeline Queue
                </h2>
                <span className="bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {filteredCandidates.length} Candidates
                </span>
              </div>
              <p className="text-xs text-[#5F5E59] mt-0.5">
                Ranked by verified Skill Passport benchmark scores, academic GPA, and faculty endorsements.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPipelineOpen(!isPipelineOpen);
              }}
              className="px-3.5 py-2 bg-[#E8E8DF] hover:bg-[#D5D5C6] text-[#2D2D2A] text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isPipelineOpen ? 'Hide Pipeline Queue' : 'Show Pipeline Queue'}</span>
              {isPipelineOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Candidate List (Data shows only when clicked) */}
        {isPipelineOpen && (
          <div className="mt-4 pt-5 border-t border-[#E5E2D9] space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C7B76]">
                Filter Candidate Roster:
              </span>
              <div className="flex items-center gap-2">
                {(['All', 'Shortlisted', 'Interview'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setCandidateFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      candidateFilter === tab
                        ? 'bg-[#5A5A40] text-[#F9F9F7]'
                        : 'bg-[#E8E8DF] text-[#5F5E59] hover:bg-[#D5D5C6]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredCandidates.map(candidate => (
                <div
                  key={candidate.id}
                  className="bg-[#F2F1ED]/70 rounded-xl p-4 border border-[#E5E2D9] hover:border-[#D5D5C6] transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <img
                      src={candidate.avatar}
                      alt={candidate.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-[#D5D5C6] shadow-xs flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold text-[#2D2D2A]">{candidate.name}</h3>
                        {candidate.verifiedPassport && (
                          <span className="inline-flex items-center gap-1 bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1] px-2 py-0.5 rounded text-[10px] font-bold">
                            <ShieldCheck className="w-3 h-3" />
                            Verified Passport
                          </span>
                        )}
                        <span className="bg-[#E8E8DF] text-[#42422E] px-2 py-0.5 rounded text-[10px] font-bold">
                          GPA: {candidate.gpa}
                        </span>
                      </div>

                      <p className="text-xs text-[#5F5E59] mt-0.5">{candidate.title}</p>
                      <p className="text-[11px] text-[#7C7B76] mt-0.5">Applied for: <span className="font-semibold text-[#2D2D2A]">{candidate.appliedRole}</span> • {candidate.appliedDate}</p>

                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {candidate.skills.map(skill => (
                          <span key={skill} className="px-2 py-0.5 bg-[#E8E8DF] text-[#42422E] rounded text-[10px] font-semibold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Match Score & Action Buttons */}
                  <div className="flex items-center justify-between lg:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E5E2D9]">
                    <div className="text-center px-3 py-1.5 bg-[#EAF1EB] rounded-lg border border-[#CFE0D1]">
                      <span className="text-base font-bold text-[#34583A] font-serif-display">{candidate.matchScore}%</span>
                      <span className="block text-[9px] font-bold text-[#34583A] uppercase">AI Match</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleUpdateStatus(candidate.id, 'Shortlisted')}
                        className="p-2 bg-[#E8E8DF] hover:bg-[#D5D5C6] text-[#2D2D2A] rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        title="Shortlist Candidate"
                      >
                        <Check className="w-4 h-4 text-[#34583A]" />
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(candidate.id, 'Interview')}
                        className="px-3 py-2 bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Interview</span>
                      </button>
                      <button
                        onClick={() => onNavigate('skill_passport')}
                        className="p-2 bg-[#E8E8DF] hover:bg-[#D5D5C6] text-[#2D2D2A] rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        title="Inspect Full Passport"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recruiter Active Roles & Scheduled Interviews Grid (Collapsible Fields) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Campus Openings */}
        <div className="bg-[#F9F9F7] rounded-2xl border border-[#E5E2D9] p-6 shadow-xs space-y-4 transition-all">
          <div 
            onClick={() => setIsOpeningsOpen(!isOpeningsOpen)}
            className="flex items-center justify-between cursor-pointer group select-none"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#5A5A40] text-[#F9F9F7] flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#2D2D2A] font-serif-display group-hover:text-[#5A5A40] transition-colors flex items-center gap-2">
                  <span>Active Campus Openings</span>
                </h3>
                <span className="text-[11px] text-[#7C7B76]">{opportunities.length} Open Postings</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpeningsOpen(!isOpeningsOpen);
                }}
                className="px-3 py-1.5 bg-[#E8E8DF] hover:bg-[#D5D5C6] text-[#2D2D2A] text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{isOpeningsOpen ? 'Hide' : 'Show Openings'}</span>
                {isOpeningsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {isOpeningsOpen && (
            <div className="mt-3 pt-3 border-t border-[#E5E2D9] space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex justify-end">
                <button
                  onClick={() => onNavigate('opportunities')}
                  className="text-xs font-bold text-[#5A5A40] hover:underline"
                >
                  Manage All ({opportunities.length}) &rarr;
                </button>
              </div>
              {opportunities.slice(0, 3).map(opp => (
                <div key={opp.id} className="p-3.5 rounded-xl bg-[#F2F1ED]/80 border border-[#E5E2D9] flex items-center justify-between">
                  <div className="min-w-0 pr-3">
                    <h4 className="font-bold text-xs text-[#2D2D2A] truncate">{opp.title}</h4>
                    <p className="text-[11px] text-[#7C7B76]">{opp.type} • {opp.stipendOrSalary}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-[#34583A] font-bold">{opp.applicantsCount} Applicants</span>
                      <span className="text-[10px] text-[#7C7B76]">Deadline: {opp.deadline}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-[#EAF1EB] text-[#34583A] text-[11px] font-bold rounded-lg border border-[#CFE0D1]">
                    Active
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scheduled Interview Sessions */}
        <div className="bg-[#F9F9F7] rounded-2xl border border-[#E5E2D9] p-6 shadow-xs space-y-4 transition-all">
          <div 
            onClick={() => setIsInterviewsOpen(!isInterviewsOpen)}
            className="flex items-center justify-between cursor-pointer group select-none"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#5A5A40] text-[#F9F9F7] flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#2D2D2A] font-serif-display group-hover:text-[#5A5A40] transition-colors flex items-center gap-2">
                  <span>Scheduled Live Interviews</span>
                </h3>
                <span className="text-xs font-bold text-[#34583A] bg-[#EAF1EB] px-2 py-0.5 rounded">2 Today</span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsInterviewsOpen(!isInterviewsOpen);
              }}
              className="px-3 py-1.5 bg-[#E8E8DF] hover:bg-[#D5D5C6] text-[#2D2D2A] text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{isInterviewsOpen ? 'Hide' : 'Show Interviews'}</span>
              {isInterviewsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {isInterviewsOpen && (
            <div className="mt-3 pt-3 border-t border-[#E5E2D9] space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3.5 rounded-xl bg-[#F2F1ED]/80 border border-[#E5E2D9] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#5A5A40] text-[#F9F9F7] flex flex-col items-center justify-center text-[10px] font-bold leading-tight">
                    <span>TODAY</span>
                    <span>2:00PM</span>
                  </div>
                  <div>
                    <p className="font-bold text-xs text-[#2D2D2A]">Brajesh</p>
                    <p className="text-[11px] text-[#7C7B76]">Senior Data Analyst Final Loop (Google Meet)</p>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate('collaboration')}
                  className="px-3 py-1.5 bg-[#5A5A40] text-[#F9F9F7] text-xs font-bold rounded-lg hover:bg-[#4A4A33] cursor-pointer"
                >
                  Join Room
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F2F1ED]/80 border border-[#E5E2D9] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E8E8DF] text-[#42422E] flex flex-col items-center justify-center text-[10px] font-bold leading-tight">
                    <span>TOMORROW</span>
                    <span>10:30AM</span>
                  </div>
                  <div>
                    <p className="font-bold text-xs text-[#2D2D2A]">Elena Rostova (Scholar)</p>
                    <p className="text-[11px] text-[#7C7B76]">Cloud Infrastructure System Design</p>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate('collaboration')}
                  className="px-3 py-1.5 bg-[#E8E8DF] text-[#2D2D2A] text-xs font-bold rounded-lg hover:bg-[#D5D5C6] cursor-pointer"
                >
                  View Agenda
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
