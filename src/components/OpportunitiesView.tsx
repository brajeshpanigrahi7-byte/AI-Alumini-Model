import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  Send, 
  FileText, 
  ChevronRight, 
  X,
  Loader2,
  Users,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { Opportunity, Application, UserProfile, UserRole } from '../types';

interface OpportunitiesViewProps {
  opportunities: Opportunity[];
  applications: Application[];
  userProfile: UserProfile;
  currentRole: UserRole;
  onApplyOpportunity: (opportunity: Opportunity, customPitch: string) => void;
  onOpenPostOpportunity: () => void;
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  opportunities,
  applications,
  userProfile,
  currentRole,
  onApplyOpportunity,
  onOpenPostOpportunity
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'browse' | 'applications'>('browse');
  const [searchFilter, setSearchFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [workplaceFilter, setWorkplaceFilter] = useState('All');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  // Application Modal state
  const [applyingOpportunity, setApplyingOpportunity] = useState<Opportunity | null>(null);
  const [customPitch, setCustomPitch] = useState('');
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const types = ['All', 'Student Internship', 'Entry-Level Job', 'Faculty Internship', 'Live Project', 'FDP / Training'];

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
      opp.requiredSkills.some(s => s.toLowerCase().includes(searchFilter.toLowerCase()));

    const matchesType = typeFilter === 'All' || opp.type === typeFilter;
    const matchesWorkplace = workplaceFilter === 'All' || opp.workplaceType === workplaceFilter;

    return matchesSearch && matchesType && matchesWorkplace;
  });

  const handleOpenApplyModal = (opp: Opportunity) => {
    setApplyingOpportunity(opp);
    setCustomPitch(`I am excited to apply for the ${opp.title} at ${opp.company}. With a verified ${userProfile.gpa} GPA in ${userProfile.department} from ${userProfile.institution} and high benchmark performance in ${opp.requiredSkills.slice(0, 2).join(' and ')}, I look forward to contributing immediately to your mission.`);
    setApplicationSubmitted(false);
  };

  const handleGenerateAiPitch = async () => {
    if (!applyingOpportunity) return;
    setIsGeneratingPitch(true);
    try {
      const res = await fetch('/api/ai/pitch-optimizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opportunityTitle: applyingOpportunity.title,
          company: applyingOpportunity.company,
          requiredSkills: applyingOpportunity.requiredSkills,
          studentProfile: userProfile
        })
      });
      const data = await res.json();
      if (data.tailoredPitch) {
        setCustomPitch(data.tailoredPitch);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingPitch(false);
    }
  };

  const handleSubmitApplication = () => {
    if (!applyingOpportunity) return;
    onApplyOpportunity(applyingOpportunity, customPitch);
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplyingOpportunity(null);
      setActiveSubTab('applications');
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-[#33332A] text-[#F9F9F7] rounded-2xl p-6 md:p-8 shadow-md border border-[#48483B] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#D4D4B8] text-xs font-bold uppercase tracking-wider mb-2">
            <Briefcase className="w-4 h-4 text-[#CFE0D1]" />
            <span>Unified Academia-Industry Opportunity Portal</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-serif-display">Internships & Placements Hub</h1>
          <p className="text-sm text-[#C5C4BA] mt-1.5 max-w-2xl leading-relaxed">
            Search, apply, and track student internships, entry-level jobs, faculty sabbaticals, and live industrial capstones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPostOpportunity}
            className="bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer border border-[#6B6B4D]"
          >
            <span>+ Post Opportunity</span>
          </button>
        </div>
      </div>

      {/* Sub-tabs: Browse vs My Applications */}
      <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveSubTab('browse')}
            className={`pb-2 text-sm font-bold border-b-2 cursor-pointer transition-all ${
              activeSubTab === 'browse'
                ? 'text-[#5A5A40] border-[#5A5A40]'
                : 'text-[#7C7B76] border-transparent hover:text-[#2D2D2A]'
            }`}
          >
            Browse Opportunities ({filteredOpportunities.length})
          </button>
          <button
            onClick={() => setActiveSubTab('applications')}
            className={`pb-2 text-sm font-bold border-b-2 cursor-pointer transition-all flex items-center gap-1.5 ${
              activeSubTab === 'applications'
                ? 'text-[#5A5A40] border-[#5A5A40]'
                : 'text-[#7C7B76] border-transparent hover:text-[#2D2D2A]'
            }`}
          >
            <span>My Applications & Pipeline</span>
            <span className="bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6] text-xs px-2 py-0.5 rounded-full font-bold">
              {applications.length}
            </span>
          </button>
        </div>
      </div>

      {activeSubTab === 'browse' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-[#F9F9F7] p-4 rounded-xl border border-[#E5E2D9] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#7C7B76] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by role, company, or skill..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-xs text-[#2D2D2A] placeholder-[#7C7B76] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
              <span className="text-xs text-[#7C7B76] font-medium shrink-0 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Type:
              </span>
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                    typeFilter === t
                      ? 'bg-[#33332A] text-[#F9F9F7] shadow-xs'
                      : 'bg-[#F2F1ED] text-[#7C7B76] hover:bg-[#E5E2D9]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOpportunities.map((opp) => {
              const hasApplied = applications.some(a => a.opportunityId === opp.id);
              return (
                <div
                  key={opp.id}
                  className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs hover:border-[#A3A380] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={opp.companyLogo}
                          alt={opp.company}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-xl object-cover border border-[#E5E2D9]"
                        />
                        <div>
                          <h3 className="font-bold text-base text-[#2D2D2A] leading-snug font-serif-display">{opp.title}</h3>
                          <p className="text-xs text-[#7C7B76] font-medium">{opp.company}</p>
                        </div>
                      </div>

                      {opp.matchScore && (
                        <span className="text-xs font-bold bg-[#EAF1EB] text-[#34583A] px-2.5 py-1 rounded-full border border-[#CFE0D1] shrink-0 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {opp.matchScore}% Match
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs text-[#5F5E59] mb-4">
                      <span className="inline-flex items-center gap-1 bg-[#F2F1ED] border border-[#E5E2D9] px-2.5 py-1 rounded">
                        <MapPin className="w-3 h-3 text-[#7C7B76]" />
                        {opp.location}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-[#EAF1EB] border border-[#CFE0D1] px-2.5 py-1 rounded font-semibold text-[#34583A]">
                        <DollarSign className="w-3 h-3 text-[#34583A]" />
                        {opp.stipendOrSalary}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-[#F2F1ED] border border-[#E5E2D9] px-2.5 py-1 rounded">
                        <Clock className="w-3 h-3 text-[#7C7B76]" />
                        {opp.duration}
                      </span>
                    </div>

                    <p className="text-xs text-[#5F5E59] line-clamp-2 mb-4 leading-relaxed">
                      {opp.description}
                    </p>

                    {/* Required Skills Chips */}
                    <div className="mb-4">
                      <span className="text-[11px] font-semibold text-[#7C7B76] block mb-1.5 uppercase tracking-wider">
                        Required Skills:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {opp.requiredSkills.map((skill) => {
                          const candidateHasSkill = userProfile.skills.some(
                            s => s.name.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(s.name.toLowerCase())
                          );
                          return (
                            <span
                              key={skill}
                              className={`text-[11px] px-2 py-0.5 rounded font-medium flex items-center gap-1 ${
                                candidateHasSkill
                                  ? 'bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6]'
                                  : 'bg-[#F2F1ED] text-[#7C7B76] border border-[#E5E2D9]'
                              }`}
                            >
                              {candidateHasSkill && <CheckCircle2 className="w-3 h-3 text-[#5A5A40]" />}
                              {skill}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5E2D9] flex items-center justify-between">
                    <span className="text-[11px] text-[#7C7B76]">
                      {opp.applicantsCount} applicants • Closes {opp.deadline}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOpportunity(opp)}
                        className="text-xs text-[#5F5E59] hover:text-[#2D2D2A] font-semibold px-3 py-1.5 rounded-lg border border-[#D5D5C6] hover:bg-[#F2F1ED] cursor-pointer"
                      >
                        Details
                      </button>
                      {hasApplied ? (
                        <span className="text-xs font-bold text-[#34583A] bg-[#EAF1EB] px-3 py-1.5 rounded-lg border border-[#CFE0D1] flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Applied
                        </span>
                      ) : (
                        <button
                          onClick={() => handleOpenApplyModal(opp)}
                          className="text-xs font-bold text-[#F9F9F7] bg-[#5A5A40] hover:bg-[#4A4A33] px-4 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>Apply with Passport</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Applications Tracking Kanban Tab */}
      {activeSubTab === 'applications' && (
        <div className="space-y-6">
          <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs">
            <h2 className="text-lg font-bold text-[#2D2D2A] mb-6 flex items-center gap-2 font-serif-display">
              <FileText className="w-5 h-5 text-[#5A5A40]" />
              <span>Active Placement & Internship Lifecycle</span>
            </h2>

            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="border border-[#E5E2D9] bg-[#F2F1ED]/40 rounded-xl p-5 hover:border-[#A3A380] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-[#2D2D2A] font-serif-display">{app.opportunityTitle}</h3>
                      <span className="text-xs bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6] font-semibold px-2.5 py-0.5 rounded">
                        {app.type}
                      </span>
                    </div>
                    <p className="text-xs text-[#7C7B76]">{app.company} • Applied on {app.appliedDate}</p>
                    {app.mentorFeedback && (
                      <p className="text-xs text-[#34583A] bg-[#EAF1EB] p-2.5 rounded-lg border border-[#CFE0D1] leading-relaxed mt-2">
                        💬 <strong>Recruiter / Mentor Feedback:</strong> {app.mentorFeedback}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-semibold text-[#7C7B76] block">Status</span>
                      <span className="text-xs font-bold text-[#42422E] bg-[#E8E8DF] px-3 py-1 rounded-full border border-[#D5D5C6]">
                        {app.status}
                      </span>
                    </div>

                    <button
                      onClick={() => alert(`Viewing complete verified application package for ${app.opportunityTitle}`)}
                      className="px-3 py-1.5 border border-[#D5D5C6] text-xs font-medium rounded-lg hover:bg-[#F2F1ED] text-[#2D2D2A] cursor-pointer"
                    >
                      View Dossier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Opportunity Detail Drawer Modal */}
      {selectedOpportunity && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F9F9F7] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-[#E5E2D9] animate-in zoom-in-95">
            <div className="flex items-start justify-between gap-4 border-b border-[#E5E2D9] pb-4 mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedOpportunity.companyLogo}
                  alt={selectedOpportunity.company}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-xl object-cover border border-[#E5E2D9]"
                />
                <div>
                  <h3 className="text-lg font-bold text-[#2D2D2A] font-serif-display">{selectedOpportunity.title}</h3>
                  <p className="text-xs text-[#7C7B76] font-medium">{selectedOpportunity.company} • {selectedOpportunity.location}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOpportunity(null)}
                className="p-1 rounded-lg text-[#7C7B76] hover:text-[#2D2D2A] hover:bg-[#E8E8DF] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-[#2D2D2A] mb-6">
              <div>
                <h4 className="font-bold text-[#2D2D2A] mb-1 font-serif-display">About the Role</h4>
                <p className="leading-relaxed text-[#5F5E59]">{selectedOpportunity.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#2D2D2A] mb-1 font-serif-display">Key Responsibilities</h4>
                <ul className="list-disc pl-5 space-y-1 text-[#5F5E59]">
                  {selectedOpportunity.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#2D2D2A] mb-1 font-serif-display">Qualifications</h4>
                <ul className="list-disc pl-5 space-y-1 text-[#5F5E59]">
                  {selectedOpportunity.qualifications.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E2D9]">
              <button
                onClick={() => setSelectedOpportunity(null)}
                className="px-4 py-2 text-xs font-semibold text-[#5F5E59] hover:bg-[#E8E8DF] rounded-lg cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const opp = selectedOpportunity;
                  setSelectedOpportunity(null);
                  handleOpenApplyModal(opp);
                }}
                className="px-5 py-2 text-xs font-bold text-[#F9F9F7] bg-[#5A5A40] hover:bg-[#4A4A33] rounded-lg shadow-xs cursor-pointer"
              >
                Apply with Verified Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1-Click Apply Modal with AI Pitch Optimizer */}
      {applyingOpportunity && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F9F9F7] rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-[#E5E2D9] animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-[#E5E2D9] pb-4 mb-4">
              <div>
                <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider">Fast-Track Application</span>
                <h3 className="text-lg font-bold text-[#2D2D2A] font-serif-display">{applyingOpportunity.title}</h3>
                <p className="text-xs text-[#7C7B76]">{applyingOpportunity.company}</p>
              </div>
              <button
                onClick={() => setApplyingOpportunity(null)}
                className="p-1 rounded-lg text-[#7C7B76] hover:text-[#2D2D2A] hover:bg-[#E8E8DF] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-[#EAF1EB] p-3 rounded-lg text-xs text-[#34583A] border border-[#CFE0D1] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#34583A]" />
                  <span>Attaching verified digital portfolio & Columbia GPA seal</span>
                </div>
                <span className="font-bold text-[#34583A]">SHA-256 Signed</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#2D2D2A]">Application Statement / Pitch</label>
                  <button
                    onClick={handleGenerateAiPitch}
                    disabled={isGeneratingPitch}
                    className="text-xs text-[#5A5A40] hover:text-[#4A4A33] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    {isGeneratingPitch ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-[#8C5E3C]" />}
                    <span>AI Polish Pitch</span>
                  </button>
                </div>
                <textarea
                  value={customPitch}
                  onChange={(e) => setCustomPitch(e.target.value)}
                  rows={4}
                  className="w-full p-3 text-xs md:text-sm bg-[#F2F1ED] border border-[#E5E2D9] text-[#2D2D2A] rounded-lg focus:ring-2 focus:ring-[#5A5A40] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E2D9]">
              <button
                onClick={() => setApplyingOpportunity(null)}
                className="px-4 py-2 text-xs font-semibold text-[#5F5E59] hover:bg-[#E8E8DF] rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitApplication}
                disabled={applicationSubmitted}
                className="px-5 py-2 text-xs font-bold text-[#F9F9F7] bg-[#5A5A40] hover:bg-[#4A4A33] rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                {applicationSubmitted ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Application Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Verified Application</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
