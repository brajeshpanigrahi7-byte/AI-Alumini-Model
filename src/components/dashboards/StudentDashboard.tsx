import React from 'react';
import { 
  Sparkles, 
  Briefcase, 
  BadgeCheck, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Calendar, 
  Users, 
  GraduationCap, 
  ShieldCheck,
  ChevronRight,
  Clock,
  PlayCircle
} from 'lucide-react';
import { UserProfile, Opportunity, Assessment, Application, ActiveTab } from '../../types';

interface StudentDashboardProps {
  profile: UserProfile;
  opportunities: Opportunity[];
  assessments: Assessment[];
  applications: Application[];
  onNavigate: (tab: ActiveTab) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile,
  opportunities,
  assessments,
  applications,
  onNavigate
}) => {
  const topMatchOpportunities = opportunities.slice(0, 3);
  const pendingAssessments = assessments.filter(a => !a.completed);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Hero */}
      <div className="bg-[#33332A] text-[#F9F9F7] rounded-2xl p-6 md:p-8 shadow-md border border-[#48483B] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#5A5A40]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#D4D4B8] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-[#E6D4C3]" />
              <span>Academia-Industry Collaboration Hub</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-serif-display">
              Welcome back, {profile.name}!
            </h1>
            <p className="text-sm text-[#C5C4BA] mt-1.5 max-w-2xl leading-relaxed">
              Your student profile is verified by <strong>{profile.institution}</strong> with an 85% completion rate. You have <strong>3 high-match internship opportunities</strong> closing this month.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('opportunities')}
              className="bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] px-5 py-2.5 rounded-lg text-xs md:text-sm font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2 border border-[#6B6B4D]"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Internships</span>
            </button>
            <button
              onClick={() => onNavigate('skill_passport')}
              className="bg-[#F9F9F7]/10 hover:bg-[#F9F9F7]/20 text-[#F9F9F7] border border-[#F9F9F7]/20 px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer flex items-center gap-2"
            >
              <BadgeCheck className="w-4 h-4 text-[#CFE0D1]" />
              <span>View Passport</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          onClick={() => onNavigate('profile')} 
          className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-[#5A5A40]"
        >
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Profile Health</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">{profile.completionPercentage}%</span>
            <span className="text-xs font-bold text-[#5A5A40]">Excellent</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Verified Email, GPA & Degree</p>
        </div>

        <div 
          onClick={() => onNavigate('opportunities')} 
          className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-[#34583A]"
        >
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Active Applications</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">{applications.length}</span>
            <span className="text-xs font-bold text-[#34583A]">1 Round 2 Intv</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Apex Cloud, NeuralMatrix, Siemens</p>
        </div>

        <div 
          onClick={() => onNavigate('skill_passport')} 
          className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-[#7A6A32]"
        >
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Skill Passport</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">
              {profile.skills.filter(s => s.verified).length}
            </span>
            <span className="text-xs font-bold text-[#7A6A32]">Verified</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Python, BigQuery, Tableau</p>
        </div>

        <div 
          onClick={() => onNavigate('assessments')} 
          className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-[#8C5E3C]"
        >
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Assessment Readiness</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">92%</span>
            <span className="text-xs font-bold text-[#34583A]">Top Tier</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Industry Benchmark Passed</p>
        </div>
      </div>

      {/* Main Grid: Opportunities & Assessments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: High Match Opportunities */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#F9F9F7] rounded-2xl border border-[#E5E2D9] p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#2D2D2A] font-serif-display">
                  Recommended Opportunities
                </h2>
                <p className="text-xs text-[#7C7B76] mt-0.5">Matched based on your verified skills & GPA</p>
              </div>
              <button 
                onClick={() => onNavigate('opportunities')} 
                className="text-xs font-bold text-[#5A5A40] hover:text-[#2D2D2A] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View All ({opportunities.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {topMatchOpportunities.map((opp) => (
                <div 
                  key={opp.id} 
                  className="bg-[#F2F1ED]/70 rounded-xl p-4 border border-[#E5E2D9] hover:border-[#D5D5C6] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <img 
                      src={opp.companyLogo} 
                      alt={opp.company} 
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-lg object-cover border border-[#E5E2D9]" 
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[#2D2D2A]">{opp.title}</h3>
                        {opp.featured && (
                          <span className="bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1] text-[10px] font-bold px-2 py-0.5 rounded">
                            Fast Track
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#5F5E59] mt-0.5">{opp.company} • {opp.location} ({opp.workplaceType})</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {opp.requiredSkills.slice(0, 3).map((skill) => (
                          <span key={skill} className="px-2 py-0.5 bg-[#E8E8DF] text-[#42422E] rounded text-[10px] font-semibold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5E2D9]">
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#34583A]">{opp.matchScore || 92}% Match</span>
                      <span className="block text-[11px] text-[#7C7B76]">{opp.stipendOrSalary}</span>
                    </div>
                    <button 
                      onClick={() => onNavigate('opportunities')}
                      className="px-3 py-1.5 bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Pending Assessments & Actions */}
        <div className="space-y-6">
          <div className="bg-[#F9F9F7] rounded-2xl border border-[#E5E2D9] p-6 shadow-xs">
            <h3 className="text-base font-bold text-[#2D2D2A] font-serif-display border-b border-[#E5E2D9] pb-3 mb-4">
              Skill Benchmarks
            </h3>
            
            <div className="space-y-3">
              {assessments.slice(0, 3).map((test) => (
                <div key={test.id} className="p-3 rounded-xl bg-[#F2F1ED]/70 border border-[#E5E2D9] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2D2D2A]">{test.title}</span>
                    {test.completed ? (
                      <span className="text-[10px] font-bold text-[#34583A] bg-[#EAF1EB] px-2 py-0.5 rounded">
                        Score: {test.lastScore}%
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-[#7A6A32] bg-[#F7F3E8] px-2 py-0.5 rounded">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#7C7B76] line-clamp-1">{test.description}</p>
                  <button 
                    onClick={() => onNavigate('assessments')}
                    className="w-full text-center py-1.5 text-xs font-bold bg-[#E8E8DF] hover:bg-[#D5D5C6] text-[#42422E] rounded-lg transition-colors cursor-pointer"
                  >
                    {test.completed ? 'Review Feedback' : 'Start Assessment'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
