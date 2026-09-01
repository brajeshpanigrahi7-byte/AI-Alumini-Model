import React, { useState } from 'react';
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
  ChevronDown,
  ChevronUp,
  Clock,
  PlayCircle,
  Rotate3d,
  Layers,
  Flame,
  Zap,
  Eye,
  EyeOff
} from 'lucide-react';
import { UserProfile, Opportunity, Assessment, Application, ActiveTab } from '../../types';
import { ThreeDCard } from '../ThreeD/ThreeDCard';
import { HolographicPassport3D } from '../ThreeD/HolographicPassport3D';
import { Interactive3DSkillSphere } from '../ThreeD/Interactive3DSkillSphere';

interface StudentDashboardProps {
  profile: UserProfile;
  opportunities: Opportunity[];
  assessments: Assessment[];
  applications: Application[];
  onNavigate: (tab: ActiveTab) => void;
  onOpenJudgeShowcase?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile,
  opportunities,
  assessments,
  applications,
  onNavigate,
  onOpenJudgeShowcase
}) => {
  const [active3DTab, setActive3DTab] = useState<'overview' | 'passport' | 'constellation'>('overview');
  const [isOpportunitiesOpen, setIsOpportunitiesOpen] = useState<boolean>(false);
  const [isBenchmarksOpen, setIsBenchmarksOpen] = useState<boolean>(false);

  const topMatchOpportunities = opportunities.slice(0, 3);
  const pendingAssessments = assessments.filter(a => !a.completed);
  const userSkills = profile?.skills || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Hero with 3D Depth Specular Lighting */}
      <ThreeDCard intensity={8} glareOpacity={0.15}>
        <div className="bg-gradient-to-r from-[#2D2D24] via-[#38382D] to-[#25251E] text-[#F9F9F7] rounded-2xl p-6 md:p-8 shadow-3d-card border border-[#48483B] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#FFE899]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-[#5A5A40]/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[#FFE899] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-[#FFE899]" />
                <span>Verified Academia-Industry Collaboration Hub</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-serif-display text-white">
                Welcome back, {profile.name}!
              </h1>
              <p className="text-sm text-[#C5C4BA] mt-1.5 max-w-2xl leading-relaxed">
                Your student credential passport is verified by <strong>{profile.institution}</strong> with an 85% profile readiness rate. You have <strong>3 high-match enterprise internships</strong> active this month.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {onOpenJudgeShowcase && (
                <button
                  onClick={onOpenJudgeShowcase}
                  className="bg-gradient-to-r from-[#AA771C] via-[#D4AF37] to-[#8B6508] hover:opacity-95 text-[#1E1E18] px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center gap-2 border border-[#FFE899]/70"
                >
                  <Award className="w-4 h-4 text-[#1E1E18]" />
                  <span>3D Judge Deck</span>
                </button>
              )}
              <button
                onClick={() => onNavigate('opportunities')}
                className="bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2 border border-[#6B6B4D]"
              >
                <Briefcase className="w-4 h-4" />
                <span>Explore Internships</span>
              </button>
              <button
                onClick={() => setActive3DTab('passport')}
                className="bg-[#F9F9F7]/10 hover:bg-[#F9F9F7]/20 text-[#F9F9F7] border border-[#F9F9F7]/20 px-3.5 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <BadgeCheck className="w-4 h-4 text-[#CFE0D1]" />
                <span>3D Passport</span>
              </button>
            </div>
          </div>
        </div>
      </ThreeDCard>

      {/* 3D Interactive Perspective Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ThreeDCard intensity={12} glareOpacity={0.2}>
          <div 
            onClick={() => onNavigate('profile')} 
            className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-3d-card hover:shadow-3d-hover transition-all cursor-pointer group border-l-4 border-l-[#5A5A40] h-full flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Profile Health</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">{profile.completionPercentage}%</span>
                <span className="text-xs font-bold text-[#5A5A40] bg-[#E8E8DF] px-2 py-0.5 rounded">Excellent</span>
              </div>
            </div>
            <p className="text-xs text-[#7C7B76] mt-3">Verified Email, GPA &amp; Degree</p>
          </div>
        </ThreeDCard>

        <ThreeDCard intensity={12} glareOpacity={0.2} glowColor="rgba(52, 88, 58, 0.2)">
          <div 
            onClick={() => onNavigate('opportunities')} 
            className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-3d-card hover:shadow-3d-hover transition-all cursor-pointer group border-l-4 border-l-[#34583A] h-full flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Active Applications</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">{applications.length}</span>
                <span className="text-xs font-bold text-[#34583A] bg-[#EAF1EB] px-2 py-0.5 rounded">1 Round 2 Intv</span>
              </div>
            </div>
            <p className="text-xs text-[#7C7B76] mt-3">Apex Cloud, NeuralMatrix, Siemens</p>
          </div>
        </ThreeDCard>

        <ThreeDCard intensity={12} glareOpacity={0.2} glowColor="rgba(122, 106, 50, 0.2)">
          <div 
            onClick={() => setActive3DTab('passport')} 
            className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-3d-card hover:shadow-3d-hover transition-all cursor-pointer group border-l-4 border-l-[#7A6A32] h-full flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">3D Skill Passport</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">
                  {userSkills.filter(s => s.verified).length} Verified
                </span>
                <span className="text-xs font-bold text-[#7A6A32] bg-[#F7F3E8] px-2 py-0.5 rounded">On-Chain</span>
              </div>
            </div>
            <p className="text-xs text-[#7C7B76] mt-3">Python, BigQuery, Tableau</p>
          </div>
        </ThreeDCard>

        <ThreeDCard intensity={12} glareOpacity={0.2} glowColor="rgba(140, 94, 60, 0.2)">
          <div 
            onClick={() => onNavigate('assessments')} 
            className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-3d-card hover:shadow-3d-hover transition-all cursor-pointer group border-l-4 border-l-[#8C5E3C] h-full flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Assessment Readiness</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">92%</span>
                <span className="text-xs font-bold text-[#34583A] bg-[#EAF1EB] px-2 py-0.5 rounded">Top Tier</span>
              </div>
            </div>
            <p className="text-xs text-[#7C7B76] mt-3">Industry Benchmark Passed</p>
          </div>
        </ThreeDCard>
      </div>

      {/* 3D Interactive Feature Switcher Bar */}
      <div className="bg-[#EBE8E1] p-1.5 rounded-xl border border-[#E5E2D9] flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActive3DTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            active3DTab === 'overview'
              ? 'bg-[#2D2D24] text-[#F9F9F7] shadow-xs'
              : 'text-[#5F5E59] hover:text-[#2D2D2A] hover:bg-[#DDD9CE]'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Opportunities &amp; Benchmarks</span>
        </button>

        <button
          onClick={() => setActive3DTab('passport')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            active3DTab === 'passport'
              ? 'bg-[#2D2D24] text-[#F9F9F7] shadow-xs'
              : 'text-[#5F5E59] hover:text-[#2D2D2A] hover:bg-[#DDD9CE]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#CFE0D1]" />
          <span>🪪 3D Holographic Passport (Interactive)</span>
        </button>

        <button
          onClick={() => setActive3DTab('constellation')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            active3DTab === 'constellation'
              ? 'bg-[#2D2D24] text-[#F9F9F7] shadow-xs'
              : 'text-[#5F5E59] hover:text-[#2D2D2A] hover:bg-[#DDD9CE]'
          }`}
        >
          <Rotate3d className="w-3.5 h-3.5 text-[#FFE899]" />
          <span>🌐 3D Skill Constellation Matrix</span>
        </button>
      </div>

      {/* Conditional 3D View Render */}
      {active3DTab === 'passport' && (
        <div className="bg-[#F9F9F7] p-6 md:p-8 rounded-2xl border border-[#E5E2D9] shadow-3d-card">
          <HolographicPassport3D profile={profile} onNavigateToAssessments={() => onNavigate('assessments')} />
        </div>
      )}

      {active3DTab === 'constellation' && (
        <Interactive3DSkillSphere skills={userSkills} />
      )}

      {/* Main Grid: Opportunities & Assessments (Always accessible or on overview) */}
      {active3DTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: High Match Opportunities (Dropdown Field) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#F9F9F7] rounded-2xl border border-[#E5E2D9] p-6 shadow-3d-card transition-all">
              <div 
                onClick={() => setIsOpportunitiesOpen(!isOpportunitiesOpen)}
                className="flex items-center justify-between cursor-pointer group select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#5A5A40] text-[#F9F9F7] flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-[#2D2D2A] font-serif-display group-hover:text-[#5A5A40] transition-colors">
                        Recommended Opportunities
                      </h2>
                      <span className="bg-[#E8E8DF] text-[#42422E] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#D5D5C6]">
                        {topMatchOpportunities.length} Available
                      </span>
                    </div>
                    <p className="text-xs text-[#7C7B76] mt-0.5">Matched based on your verified skills &amp; GPA</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpportunitiesOpen(!isOpportunitiesOpen);
                    }}
                    className="px-3 py-1.5 bg-[#E8E8DF] hover:bg-[#D5D5C6] text-[#2D2D2A] text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isOpportunitiesOpen ? 'Hide Opportunities' : 'Show Opportunities'}</span>
                    {isOpportunitiesOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Data only shows when dropdown is opened */}
              {isOpportunitiesOpen && (
                <div className="mt-6 pt-5 border-t border-[#E5E2D9] space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7C7B76]">
                      Top Algorithmic Matches (Verified Credentials)
                    </span>
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
                      <ThreeDCard key={opp.id} intensity={8} glareOpacity={0.15}>
                        <div 
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
                      </ThreeDCard>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right 1 Col: Pending Assessments & Actions (Dropdown Field) */}
          <div className="space-y-6">
            <div className="bg-[#F9F9F7] rounded-2xl border border-[#E5E2D9] p-6 shadow-3d-card transition-all">
              <div 
                onClick={() => setIsBenchmarksOpen(!isBenchmarksOpen)}
                className="flex items-center justify-between cursor-pointer group select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#7A6A32] text-[#F9F9F7] flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[#2D2D2A] font-serif-display group-hover:text-[#7A6A32] transition-colors">
                        Skill Benchmarks
                      </h3>
                      <span className="bg-[#F7F3E8] text-[#7A6A32] border border-[#E9E0C7] text-[10px] font-bold px-2 py-0.5 rounded">
                        {assessments.length} Tests
                      </span>
                    </div>
                    <p className="text-xs text-[#7C7B76] mt-0.5">Verified industry rubric</p>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsBenchmarksOpen(!isBenchmarksOpen);
                  }}
                  className="p-2 bg-[#E8E8DF] hover:bg-[#D5D5C6] text-[#2D2D2A] rounded-lg transition-colors cursor-pointer"
                  title={isBenchmarksOpen ? 'Hide Benchmarks' : 'Show Benchmarks'}
                >
                  {isBenchmarksOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Data only shows when dropdown is opened */}
              {isBenchmarksOpen && (
                <div className="mt-5 pt-4 border-t border-[#E5E2D9] space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
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
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

