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
  ShieldCheck 
} from 'lucide-react';
import { UserProfile, Opportunity, Assessment, Application, ActiveTab } from '../types';

interface DashboardViewProps {
  profile: UserProfile;
  opportunities: Opportunity[];
  assessments: Assessment[];
  applications: Application[];
  onNavigate: (tab: ActiveTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
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
              Your profile is verified by <strong>{profile.institution}</strong> with an 85% completion rate. You have <strong>3 high-match internship opportunities</strong> closing this month.
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
          <p className="text-xs text-[#7C7B76] mt-2">Apex Cloud, NeuralMatrix, Tesla</p>
        </div>

        <div 
          onClick={() => onNavigate('skill_passport')} 
          className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-[#7C7C5A]"
        >
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Verified Skills</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">{profile.skills.filter(s => s.verified).length}</span>
            <span className="text-xs font-bold text-[#5A5A40]">Top 5% Cohort</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Python, SQL, Tableau, Stats</p>
        </div>

        <div 
          onClick={() => onNavigate('assessments')} 
          className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-[#8C5E3C]"
        >
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Pending Assessments</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">{pendingAssessments.length}</span>
            <span className="text-xs font-bold text-[#8C5E3C]">Boost Match</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Cloud & MLOps Benchmark</p>
        </div>
      </div>

      {/* Main Grid: Top Opportunities + Suggested Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Opportunities */}
        <div className="lg:col-span-2 bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4 mb-6">
            <div>
              <h2 className="font-bold text-lg text-[#2D2D2A] font-serif-display">Top-Matched Industry Opportunities</h2>
              <p className="text-xs text-[#7C7B76]">Based on your verified skills and academic track</p>
            </div>
            <button
              onClick={() => onNavigate('opportunities')}
              className="text-xs font-bold text-[#5A5A40] hover:text-[#4A4A33] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({opportunities.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {topMatchOpportunities.map((opp) => (
              <div
                key={opp.id}
                onClick={() => onNavigate('opportunities')}
                className="p-4 border border-[#E5E2D9] bg-[#F2F1ED]/40 rounded-xl hover:border-[#A3A380] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={opp.companyLogo}
                    alt={opp.company}
                    className="w-10 h-10 rounded-lg object-cover border border-[#E5E2D9]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-[#2D2D2A]">{opp.title}</h3>
                      {opp.matchScore && (
                        <span className="text-[10px] bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1] font-bold px-2 py-0.5 rounded-full">
                          {opp.matchScore}% Match
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#5F5E59]">{opp.company} • {opp.stipendOrSalary} • {opp.location}</p>
                  </div>
                </div>

                <button className="text-xs font-bold text-[#42422E] bg-[#E8E8DF] border border-[#D5D5C6] px-3 py-1.5 rounded-lg hover:bg-[#DEDECF] self-start sm:self-auto cursor-pointer">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Career Advisor & Next Steps Widget */}
        <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#8C5E3C]" />
              <h2 className="font-bold text-base text-[#2D2D2A] font-serif-display">Personalized Action Items</h2>
            </div>

            <div className="space-y-3">
              <div 
                onClick={() => onNavigate('assessments')}
                className="p-3 bg-[#F7F3E8] rounded-xl border border-[#E9E0C7] cursor-pointer hover:bg-[#F2ECE0] transition-colors"
              >
                <span className="text-[10px] font-bold text-[#7A6A32] uppercase tracking-wider block mb-1">
                  1. High Impact Action
                </span>
                <p className="text-xs font-bold text-[#2D2D2A]">Take Cloud & MLOps Aptitude Test</p>
                <p className="text-[11px] text-[#5F5E59] mt-0.5">Will increase NeuralMatrix placement compatibility to 95%.</p>
              </div>

              <div 
                onClick={() => onNavigate('learning_programs')}
                className="p-3 bg-[#E8E8DF] rounded-xl border border-[#D5D5C6] cursor-pointer hover:bg-[#DFDFD4] transition-colors"
              >
                <span className="text-[10px] font-bold text-[#42422E] uppercase tracking-wider block mb-1">
                  2. Learning Lab
                </span>
                <p className="text-xs font-bold text-[#2D2D2A]">Enroll in PySpark & BigQuery Workshop</p>
                <p className="text-[11px] text-[#5F5E59] mt-0.5">Sponsored free by Databricks Academic Alliance.</p>
              </div>

              <div 
                onClick={() => onNavigate('academician_hub')}
                className="p-3 bg-[#F4ECE4] rounded-xl border border-[#E6D4C3] cursor-pointer hover:bg-[#ECE0D6] transition-colors"
              >
                <span className="text-[10px] font-bold text-[#8C5E3C] uppercase tracking-wider block mb-1">
                  3. Faculty Endorsement
                </span>
                <p className="text-xs font-bold text-[#2D2D2A]">Request Capstone Verification</p>
                <p className="text-[11px] text-[#5F5E59] mt-0.5">Signed by Prof. Marcus Vance.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-[#E5E2D9] text-xs text-[#7C7B76]">
            Backed by SkillBridge Neural Recommendation Engine
          </div>
        </div>
      </div>
    </div>
  );
};
