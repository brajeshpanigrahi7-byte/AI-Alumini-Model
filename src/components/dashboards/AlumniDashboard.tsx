import React, { useState } from 'react';
import { 
  GraduationCap, 
  Building2, 
  Users, 
  Briefcase, 
  HeartHandshake, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Globe, 
  FileText, 
  Video, 
  Code, 
  Award, 
  PlusCircle, 
  ChevronDown, 
  ChevronUp, 
  Settings2, 
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Send,
  Sliders,
  DollarSign,
  TrendingUp,
  X
} from 'lucide-react';
import { UserProfile, Opportunity, ActiveTab, AlumniContributionOffering, AlumniHelpRequest } from '../../types';
import { alumniInitialOfferings, alumniInitialRequests } from '../../data/initialData';

interface AlumniDashboardProps {
  profile: UserProfile;
  opportunities: Opportunity[];
  onNavigate: (tab: ActiveTab) => void;
  onOpenPostOpportunity?: () => void;
  onOpenJudgeShowcase?: () => void;
}

export const AlumniDashboard: React.FC<AlumniDashboardProps> = ({
  profile,
  opportunities,
  onNavigate,
  onOpenPostOpportunity,
  onOpenJudgeShowcase
}) => {
  const [offerings, setOfferings] = useState<AlumniContributionOffering[]>(
    profile.alumniOverview?.offerings || alumniInitialOfferings
  );
  const [requests, setRequests] = useState<AlumniHelpRequest[]>(alumniInitialRequests);
  const [requestFilter, setRequestFilter] = useState<'all' | 'alma_mater' | 'cross_campus' | 'pending'>('all');
  const [activeOfferingTab, setActiveOfferingTab] = useState<'alma_mater' | 'cross_campus'>('alma_mater');
  const [isConfigExpanded, setIsConfigExpanded] = useState<boolean>(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global Alumni Configuration States (Dropdown Fields)
  const [weeklyBandwidth, setWeeklyBandwidth] = useState<string>('4-6 Hours / Week (Evenings & Weekends)');
  const [preferredPlatform, setPreferredPlatform] = useState<string>('Google Meet (1:1 Video Calls)');
  const [verificationRequirement, setVerificationRequirement] = useState<string>('Strict: Require Verified Skill Passport Score >= 80%');
  const [notificationCadence, setNotificationCadence] = useState<string>('Instant Calendar Invite & Email');
  const [scholarshipPledge, setScholarshipPledge] = useState<string>('$1,500 / Semester (GPU Credits + Grants)');

  // New Custom Offering Form State
  const [newOfferingCategory, setNewOfferingCategory] = useState<AlumniContributionOffering['category']>('Mentorship');
  const [newOfferingTitle, setNewOfferingTitle] = useState<string>('');
  const [newOfferingDescription, setNewOfferingDescription] = useState<string>('');
  const [newOfferingAudience, setNewOfferingAudience] = useState<'alma_mater_only' | 'cross_campus_all'>('alma_mater_only');
  const [newOfferingSlots, setNewOfferingSlots] = useState<number>(4);
  const [newOfferingFormat, setNewOfferingFormat] = useState<AlumniContributionOffering['format']>('1-on-1 Virtual');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleOffering = (id: string) => {
    setOfferings(prev => prev.map(off => 
      off.id === id ? { ...off, enabled: !off.enabled } : off
    ));
    showToast('Contribution track status updated.');
  };

  const handleUpdateSlots = (id: string, newSlots: number) => {
    setOfferings(prev => prev.map(off => 
      off.id === id ? { ...off, slotsAvailablePerMonth: newSlots } : off
    ));
  };

  const handleUpdateFormat = (id: string, newFormat: AlumniContributionOffering['format']) => {
    setOfferings(prev => prev.map(off => 
      off.id === id ? { ...off, format: newFormat } : off
    ));
  };

  const handleSaveSettings = () => {
    showToast('Alumni Help Offerings & Availability Matrix published to student registry.');
  };

  const handleAcceptRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'Accepted',
          meetingLink: `https://meet.google.com/nexus-alumni-${req.studentName.toLowerCase().replace(/\s+/g, '-')}`,
          scheduledSlot: 'Confirmed: Saturday at 03:00 PM EST'
        };
      }
      return req;
    }));
    showToast('Student request accepted! Calendar invite & Google Meet link generated.');
  };

  const handleReferRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'ReferredToHR',
          message: `${req.message}\n[Alumni Action: Fast-Track Referral Ticket REF-${Date.now().toString().slice(-4)} created with Google DeepMind Recruiting]`
        };
      }
      return req;
    }));
    showToast('Student profile forwarded directly to internal recruiting partner.');
  };

  const handleCreateOffering = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOfferingTitle.trim()) return;

    const newOff: AlumniContributionOffering = {
      id: `off_custom_${Date.now()}`,
      category: newOfferingCategory,
      title: newOfferingTitle.trim(),
      description: newOfferingDescription.trim() || 'Custom alumni support track.',
      targetAudience: newOfferingAudience,
      slotsAvailablePerMonth: newOfferingSlots,
      format: newOfferingFormat,
      enabled: true,
      tags: ['Custom Alumni Track', newOfferingCategory]
    };

    setOfferings(prev => [newOff, ...prev]);
    setIsAddModalOpen(false);
    setNewOfferingTitle('');
    setNewOfferingDescription('');
    showToast('New contribution track added to your alumni offering menu.');
  };

  const filteredRequests = requests.filter(req => {
    if (requestFilter === 'alma_mater') return req.isAlmaMater;
    if (requestFilter === 'cross_campus') return !req.isAlmaMater;
    if (requestFilter === 'pending') return req.status === 'Pending';
    return true;
  });

  const almaMaterOfferings = offerings.filter(o => o.targetAudience === 'alma_mater_only');
  const crossCampusOfferings = offerings.filter(o => o.targetAudience === 'cross_campus_all');

  const pendingRequestsCount = requests.filter(r => r.status === 'Pending').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 bg-[#2D2D24] text-[#F9F9F7] px-4 py-3 rounded-xl shadow-2xl border border-[#5A5A40] flex items-center gap-3 animate-in slide-in-from-bottom-2 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Alumni Hero Header */}
      <div className="bg-[#2D2D24] text-[#F9F9F7] rounded-2xl p-6 md:p-8 shadow-md border border-[#3E3E32] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-[#34583A]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-[#D4D4B8] text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-[#CFE0D1]" />
              <span>{profile.alumniOverview?.almaMater || 'Columbia University School of Engineering'}</span>
              <span className="bg-[#34583A] text-[#F9F9F7] px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-[#4C7C54]">
                {profile.alumniOverview?.graduationClass || 'Class of 2021 Alumna'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-serif-display">
              Alumni Mentorship &amp; Industry Giving Hub — {profile.name}
            </h1>
            <p className="text-sm text-[#C5C4BA] max-w-3xl leading-relaxed">
              {profile.title} • Championing next-generation talent by bridging industry expertise, priority corporate referrals, mock coding clinics, and cross-campus open masterclasses.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            {onOpenPostOpportunity && (
              <button
                id="alumni-post-role-btn"
                onClick={onOpenPostOpportunity}
                className="bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2 border border-[#6B6B4D]"
              >
                <Briefcase className="w-4 h-4 text-[#CFE0D1]" />
                <span>Post Referral Role</span>
              </button>
            )}
            {onOpenJudgeShowcase && (
              <button
                id="alumni-judge-deck-btn"
                onClick={onOpenJudgeShowcase}
                className="bg-gradient-to-r from-[#AA771C] via-[#D4AF37] to-[#8B6508] text-[#1E1E18] px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2 border border-[#FFE899]"
              >
                <Award className="w-4 h-4 text-[#1E1E18]" />
                <span>3D Showcase</span>
              </button>
            )}
            <button
              onClick={() => onNavigate('learning_programs')}
              className="bg-[#F9F9F7]/10 hover:bg-[#F9F9F7]/20 text-[#F9F9F7] border border-[#F9F9F7]/20 px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-[#CFE0D1]" />
              <span>Mentorship Hub</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alumni Impact KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs border-l-4 border-l-[#34583A]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Scholars Mentored</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">
              {profile.alumniOverview?.totalStudentsMentored || 48}
            </span>
            <span className="text-xs font-bold text-[#34583A]">92 Hours Logged</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">32 Alma Mater • 16 Cross-Campus</p>
        </div>

        <div className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs border-l-4 border-l-[#5A5A40]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Verified Referrals</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">
              {profile.alumniOverview?.activeReferralsCount || 14}
            </span>
            <span className="text-xs font-bold text-[#5A5A40]">6 Hired (FAANG+)</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Google, Microsoft, Meta &amp; Stripe</p>
        </div>

        <div className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs border-l-4 border-l-[#8C5E3C]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Student Giving Fund</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">
              {profile.alumniOverview?.scholarshipFundContributed || '$12,500'}
            </span>
            <span className="text-xs font-bold text-[#8C5E3C]">Pledged</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Cloud GPU Credits &amp; Hackathon Grants</p>
        </div>

        <div className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs border-l-4 border-l-[#5A5A40]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Alumni Mentorship Rating</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">4.98 / 5.0</span>
            <span className="text-xs font-bold text-[#5A5A40]">Top 1% Mentor</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">46 Verified Student Endorsements</p>
        </div>
      </div>

      {/* 
        MAIN FEATURE BLOCK: 
        Alumni Impact & Contribution Matrix with Configurable Dropdown Fields
      */}
      <div className="bg-[#F9F9F7] rounded-2xl border border-[#E5E2D9] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E5E2D9] bg-[#F2F1ED]/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#E8E8DF] text-[#42422E]">
                <HeartHandshake className="w-5 h-5" />
              </span>
              <h2 className="text-lg md:text-xl font-bold text-[#2D2D2A] font-serif-display">
                Alumni Impact &amp; Contribution Matrix
              </h2>
            </div>
            <p className="text-xs text-[#5F5E59] mt-1 max-w-2xl">
              Configure and customize the exact support, referral tracks, mock interview slots, and masterclasses you provide to students of your alma mater vs. students across all higher education institutions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Custom Help Track</span>
            </button>
            <button
              onClick={() => setIsConfigExpanded(!isConfigExpanded)}
              className="p-2 text-[#5F5E59] hover:bg-[#EBE8E1] rounded-lg transition-colors cursor-pointer"
              title={isConfigExpanded ? "Collapse Matrix" : "Expand Matrix"}
            >
              {isConfigExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isConfigExpanded && (
          <div className="p-6 space-y-8">
            {/* Global Alumni Contribution Dropdown Configuration Fields */}
            <div className="bg-[#EBE8E1]/60 rounded-xl p-5 border border-[#D5D5C6] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#5A5A40]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#42422E]">
                    Global Contribution &amp; Availability Dropdowns
                  </h3>
                </div>
                <span className="text-[11px] text-[#5F5E59] font-medium">Applied across all active offerings</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {/* 1. Weekly Bandwidth Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="alumni-bandwidth-select" className="font-semibold text-[#2D2D2A] block">
                    Weekly Mentorship Bandwidth
                  </label>
                  <select
                    id="alumni-bandwidth-select"
                    value={weeklyBandwidth}
                    onChange={(e) => setWeeklyBandwidth(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#D5D5C6] focus:border-[#5A5A40] rounded-lg px-3 py-2 text-[#2D2D2A] focus:outline-none focus:ring-1 focus:ring-[#5A5A40] cursor-pointer"
                  >
                    <option value="1-2 Hours / Week (Weekend AM)">1-2 Hours / Week (Weekend AM)</option>
                    <option value="4-6 Hours / Week (Evenings & Weekends)">4-6 Hours / Week (Evenings &amp; Weekends)</option>
                    <option value="8+ Hours / Week (Active Cohort Sprint)">8+ Hours / Week (Active Cohort Sprint)</option>
                    <option value="Asynchronous Code/Resume Reviews Only">Asynchronous Code/Resume Reviews Only</option>
                  </select>
                </div>

                {/* 2. Preferred Delivery Platform Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="alumni-platform-select" className="font-semibold text-[#2D2D2A] block">
                    Preferred Interaction Channel
                  </label>
                  <select
                    id="alumni-platform-select"
                    value={preferredPlatform}
                    onChange={(e) => setPreferredPlatform(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#D5D5C6] focus:border-[#5A5A40] rounded-lg px-3 py-2 text-[#2D2D2A] focus:outline-none focus:ring-1 focus:ring-[#5A5A40] cursor-pointer"
                  >
                    <option value="Google Meet (1:1 Video Calls)">Google Meet (1:1 Video Calls)</option>
                    <option value="GitHub Code Reviews & Async Loom">GitHub Code Reviews &amp; Async Loom</option>
                    <option value="Microsoft Teams / Consortium Room">Microsoft Teams / Consortium Room</option>
                    <option value="Discord Community Office Hours">Discord Community Office Hours</option>
                  </select>
                </div>

                {/* 3. Student Prerequisite Filter Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="alumni-verification-select" className="font-semibold text-[#2D2D2A] block">
                    Student Verification Requirement
                  </label>
                  <select
                    id="alumni-verification-select"
                    value={verificationRequirement}
                    onChange={(e) => setVerificationRequirement(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#D5D5C6] focus:border-[#5A5A40] rounded-lg px-3 py-2 text-[#2D2D2A] focus:outline-none focus:ring-1 focus:ring-[#5A5A40] cursor-pointer"
                  >
                    <option value="Strict: Require Verified Skill Passport Score >= 80%">Strict: Require Verified Skill Passport Score &ge; 80%</option>
                    <option value="Moderate: Require Verified Institutional Email & Resume">Moderate: Require Verified Institutional Email &amp; Resume</option>
                    <option value="Open Access: Open to All Registered Scholars">Open Access: Open to All Registered Scholars</option>
                  </select>
                </div>

                {/* 4. Notification Cadence Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="alumni-notification-select" className="font-semibold text-[#2D2D2A] block">
                    Request Notification Cadence
                  </label>
                  <select
                    id="alumni-notification-select"
                    value={notificationCadence}
                    onChange={(e) => setNotificationCadence(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#D5D5C6] focus:border-[#5A5A40] rounded-lg px-3 py-2 text-[#2D2D2A] focus:outline-none focus:ring-1 focus:ring-[#5A5A40] cursor-pointer"
                  >
                    <option value="Instant Calendar Invite & Email">Instant Calendar Invite &amp; Email</option>
                    <option value="Daily Summary Digest (06:00 PM)">Daily Summary Digest (06:00 PM)</option>
                    <option value="Weekly Batch Approval on Mondays">Weekly Batch Approval on Mondays</option>
                  </select>
                </div>

                {/* 5. Scholarship & Grant Pledge Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="alumni-scholarship-select" className="font-semibold text-[#2D2D2A] block">
                    Student Grant &amp; Compute Pledge
                  </label>
                  <select
                    id="alumni-scholarship-select"
                    value={scholarshipPledge}
                    onChange={(e) => setScholarshipPledge(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#D5D5C6] focus:border-[#5A5A40] rounded-lg px-3 py-2 text-[#2D2D2A] focus:outline-none focus:ring-1 focus:ring-[#5A5A40] cursor-pointer"
                  >
                    <option value="$1,500 / Semester (GPU Credits + Grants)">$1,500 / Semester (GPU Credits + Grants)</option>
                    <option value="$3,000 / Year (Undergraduate Hackathon Sponsor)">$3,000 / Year (Undergraduate Hackathon Sponsor)</option>
                    <option value="$5,000 / Year (Graduate Fellowship Endowment)">$5,000 / Year (Graduate Fellowship Endowment)</option>
                    <option value="Mentorship & Time Only (No Fund Pledge)">Mentorship &amp; Time Only (No Fund Pledge)</option>
                  </select>
                </div>

                {/* Quick Save Action Button */}
                <div className="flex items-end">
                  <button
                    id="alumni-save-dropdown-config-btn"
                    onClick={handleSaveSettings}
                    className="w-full bg-[#34583A] hover:bg-[#2B4930] text-[#F9F9F7] font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save &amp; Publish Matrix</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sub-Tabs: Alma Mater Help vs. Cross-Campus Help */}
            <div>
              <div className="flex items-center justify-between border-b border-[#E5E2D9] mb-4">
                <div className="flex items-center gap-2">
                  <button
                    id="tab-alma-mater-offerings"
                    onClick={() => setActiveOfferingTab('alma_mater')}
                    className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                      activeOfferingTab === 'alma_mater'
                        ? 'border-[#34583A] text-[#34583A]'
                        : 'border-transparent text-[#7C7B76] hover:text-[#2D2D2A]'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Help for Alma Mater Students ({almaMaterOfferings.length})</span>
                    <span className="bg-[#CFE0D1] text-[#34583A] px-1.5 py-0.2 rounded-full text-[10px]">
                      {profile.alumniOverview?.almaMater ? 'Columbia' : 'Own Campus'}
                    </span>
                  </button>

                  <button
                    id="tab-cross-campus-offerings"
                    onClick={() => setActiveOfferingTab('cross_campus')}
                    className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                      activeOfferingTab === 'cross_campus'
                        ? 'border-[#5A5A40] text-[#5A5A40]'
                        : 'border-transparent text-[#7C7B76] hover:text-[#2D2D2A]'
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    <span>Help for Students Across Other Institutions ({crossCampusOfferings.length})</span>
                    <span className="bg-[#E8E8DF] text-[#5A5A40] px-1.5 py-0.2 rounded-full text-[10px]">
                      Cross-Campus / Global
                    </span>
                  </button>
                </div>
              </div>

              {/* Offerings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(activeOfferingTab === 'alma_mater' ? almaMaterOfferings : crossCampusOfferings).map((offering) => (
                  <div
                    key={offering.id}
                    className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                      offering.enabled 
                        ? 'bg-[#FFFFFF] border-[#E5E2D9] shadow-xs' 
                        : 'bg-[#F2F1ED]/60 border-[#E5E2D9]/70 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                          offering.targetAudience === 'alma_mater_only'
                            ? 'bg-[#EBF3ED] text-[#2D5A3C] border-[#CFE0D1]'
                            : 'bg-[#F7F3E8] text-[#7A6A32] border-[#E9E0C7]'
                        }`}>
                          {offering.category}
                        </span>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={offering.enabled}
                            onChange={() => handleToggleOffering(offering.id)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-[#D5D5C6] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D5D5C6] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#34583A]"></div>
                        </label>
                      </div>

                      <h4 className="font-bold text-sm text-[#2D2D2A] leading-snug">
                        {offering.title}
                      </h4>
                      <p className="text-xs text-[#5F5E59] mt-1.5 line-clamp-3 leading-relaxed">
                        {offering.description}
                      </p>

                      {offering.prerequisiteCondition && (
                        <div className="mt-3 p-2 rounded-lg bg-[#F2F1ED] border border-[#E5E2D9] text-[11px] text-[#5F5E59] flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                          <span className="truncate">Req: {offering.prerequisiteCondition}</span>
                        </div>
                      )}
                    </div>

                    {/* Interactive Dropdown Controls Per Offering */}
                    <div className="mt-4 pt-3 border-t border-[#E5E2D9] space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-[#7C7B76] block mb-0.5">Slots / Mo:</span>
                          <select
                            value={offering.slotsAvailablePerMonth}
                            onChange={(e) => handleUpdateSlots(offering.id, Number(e.target.value))}
                            disabled={!offering.enabled}
                            className="w-full bg-[#F2F1ED] border border-[#D5D5C6] rounded px-1.5 py-1 text-[#2D2D2A] font-semibold text-[11px] focus:outline-none focus:border-[#5A5A40]"
                          >
                            <option value={2}>2 Slots</option>
                            <option value={4}>4 Slots</option>
                            <option value={6}>6 Slots</option>
                            <option value={8}>8 Slots</option>
                            <option value={12}>12 Slots</option>
                            <option value={25}>25 Slots</option>
                            <option value={100}>100+ (Open)</option>
                          </select>
                        </div>

                        <div>
                          <span className="text-[#7C7B76] block mb-0.5">Delivery:</span>
                          <select
                            value={offering.format}
                            onChange={(e) => handleUpdateFormat(offering.id, e.target.value as AlumniContributionOffering['format'])}
                            disabled={!offering.enabled}
                            className="w-full bg-[#F2F1ED] border border-[#D5D5C6] rounded px-1.5 py-1 text-[#2D2D2A] font-semibold text-[11px] focus:outline-none focus:border-[#5A5A40]"
                          >
                            <option value="1-on-1 Virtual">1-on-1 Virtual</option>
                            <option value="In-Person Campus">In-Person Campus</option>
                            <option value="Async Video/Code Review">Async Review</option>
                            <option value="Live Webinar">Live Webinar</option>
                            <option value="AMA Session">AMA Session</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {offering.tags.map((tag, i) => (
                          <span key={i} className="text-[9px] bg-[#E8E8DF] text-[#5F5E59] px-1.5 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 
        STUDENT ASSISTANCE & REFERRAL QUEUE
      */}
      <div className="bg-[#F9F9F7] rounded-2xl border border-[#E5E2D9] shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E2D9]">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#E8E8DF] text-[#42422E]">
                <MessageSquare className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold text-[#2D2D2A] font-serif-display">
                Incoming Student Assistance &amp; Referral Queue
              </h3>
              {pendingRequestsCount > 0 && (
                <span className="bg-[#8C5E3C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {pendingRequestsCount} Pending Action
                </span>
              )}
            </div>
            <p className="text-xs text-[#5F5E59] mt-1">
              Review and act on direct mentorship requests, mock interview bookings, and internal company referral applications from verified scholars.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#EBE8E1] p-1 rounded-xl text-xs">
            <button
              onClick={() => setRequestFilter('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                requestFilter === 'all' ? 'bg-white text-[#2D2D2A] shadow-xs' : 'text-[#7C7B76] hover:text-[#2D2D2A]'
              }`}
            >
              All ({requests.length})
            </button>
            <button
              onClick={() => setRequestFilter('alma_mater')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                requestFilter === 'alma_mater' ? 'bg-white text-[#34583A] shadow-xs' : 'text-[#7C7B76] hover:text-[#2D2D2A]'
              }`}
            >
              Alma Mater
            </button>
            <button
              onClick={() => setRequestFilter('cross_campus')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                requestFilter === 'cross_campus' ? 'bg-white text-[#5A5A40] shadow-xs' : 'text-[#7C7B76] hover:text-[#2D2D2A]'
              }`}
            >
              Cross-Campus
            </button>
            <button
              onClick={() => setRequestFilter('pending')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                requestFilter === 'pending' ? 'bg-white text-[#8C5E3C] shadow-xs' : 'text-[#7C7B76] hover:text-[#2D2D2A]'
              }`}
            >
              Pending ({pendingRequestsCount})
            </button>
          </div>
        </div>

        {/* Request Cards */}
        <div className="space-y-4">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white p-5 rounded-xl border border-[#E5E2D9] shadow-xs hover:border-[#D5D5C6] transition-all space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={req.studentAvatar}
                    alt={req.studentName}
                    className="w-12 h-12 rounded-full border border-[#D5D5C6] object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#2D2D2A]">{req.studentName}</h4>
                      {req.isAlmaMater ? (
                        <span className="text-[10px] font-bold bg-[#EBF3ED] text-[#2D5A3C] border border-[#CFE0D1] px-2 py-0.2 rounded-full flex items-center gap-1">
                          <Building2 className="w-2.5 h-2.5" />
                          Alma Mater Scholar
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold bg-[#F7F3E8] text-[#7A6A32] border border-[#E9E0C7] px-2 py-0.2 rounded-full flex items-center gap-1">
                          <Globe className="w-2.5 h-2.5" />
                          Cross-Campus
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#7C7B76] mt-0.5">
                      {req.studentInstitution} • {req.studentDepartment} • GPA: <strong>{req.studentGpa}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-[#7C7B76] block">Skill Passport</span>
                    <span className="text-xs font-bold text-[#34583A] bg-[#CFE0D1]/60 px-2 py-0.5 rounded border border-[#B8D5BC]">
                      {req.skillPassportScore}% Verified
                    </span>
                  </div>
                  <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                    req.status === 'Accepted'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : req.status === 'ReferredToHR'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : req.status === 'Completed'
                      ? 'bg-gray-100 text-gray-700 border-gray-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {req.status === 'ReferredToHR' ? 'Fast-Track Referred' : req.status}
                  </div>
                </div>
              </div>

              {/* Topic & Message */}
              <div className="bg-[#F9F9F7] p-3.5 rounded-lg border border-[#E5E2D9] text-xs space-y-1.5">
                <div className="flex items-center justify-between font-semibold text-[#2D2D2A]">
                  <span>Track: {req.offeringCategory} — {req.topicTitle}</span>
                  <span className="text-[#7C7B76] text-[11px]">{req.requestedDate}</span>
                </div>
                <p className="text-[#5F5E59] leading-relaxed whitespace-pre-line">{req.message}</p>
                
                {req.meetingLink && (
                  <div className="mt-2 pt-2 border-t border-[#E5E2D9] flex items-center justify-between text-xs">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5" />
                      Google Meet: {req.scheduledSlot}
                    </span>
                    <a
                      href={req.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5A5A40] hover:underline font-bold text-[11px] flex items-center gap-1"
                    >
                      <span>Open Meeting Room</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('skill_passport')}
                    className="text-xs font-semibold text-[#5A5A40] hover:text-[#2D2D2A] hover:bg-[#EBE8E1] px-2.5 py-1.5 rounded-lg transition-colors border border-transparent hover:border-[#D5D5C6] flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#5A5A40]" />
                    <span>Audit Skill Passport</span>
                  </button>
                  <button
                    onClick={() => onNavigate('documents')}
                    className="text-xs font-semibold text-[#5F5E59] hover:text-[#2D2D2A] hover:bg-[#EBE8E1] px-2.5 py-1.5 rounded-lg transition-colors border border-transparent hover:border-[#D5D5C6] flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Inspect Vault Resume</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {req.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleAcceptRequest(req.id)}
                        className="bg-[#34583A] hover:bg-[#2B4930] text-[#F9F9F7] text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accept &amp; Generate Meet Link</span>
                      </button>
                      <button
                        onClick={() => handleReferRequest(req.id)}
                        className="bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Fast-Track Refer to HR</span>
                      </button>
                    </>
                  )}
                  {req.status === 'Accepted' && (
                    <button
                      onClick={() => handleReferRequest(req.id)}
                      className="bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Internal HR Referral</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 
        UPCOMING ALUMNI MENTORSHIP CALENDAR & STUDENT GIVING ENDOWMENT
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scheduled Sessions */}
        <div className="bg-[#F9F9F7] p-6 rounded-2xl border border-[#E5E2D9] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#5A5A40]" />
              <h3 className="font-bold text-base text-[#2D2D2A] font-serif-display">
                Upcoming Mentorship &amp; AMA Sessions
              </h3>
            </div>
            <button 
              onClick={() => onNavigate('learning_programs')}
              className="text-xs font-bold text-[#5A5A40] hover:underline"
            >
              View Full Schedule &rarr;
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-white border border-[#E5E2D9] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#EBF3ED] border border-[#CFE0D1] flex flex-col items-center justify-center text-[#2D5A3C] font-bold text-xs">
                  <span>THU</span>
                  <span className="text-[10px]">05 PM</span>
                </div>
                <div>
                  <h5 className="font-bold text-xs text-[#2D2D2A]">AI Engineering Fast-Track Referral Review</h5>
                  <p className="text-[11px] text-[#7C7B76]">with Kartik (Columbia Alma Mater)</p>
                </div>
              </div>
              <button 
                onClick={() => showToast('Opening Google Meet test room...')}
                className="bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
              >
                Join Room
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#E5E2D9] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F7F3E8] border border-[#E9E0C7] flex flex-col items-center justify-center text-[#7A6A32] font-bold text-xs">
                  <span>SAT</span>
                  <span className="text-[10px]">11 AM</span>
                </div>
                <div>
                  <h5 className="font-bold text-xs text-[#2D2D2A]">Open-Source Agent PR Architecture Clinic</h5>
                  <p className="text-[11px] text-[#7C7B76]">with Sarah Jenkins (MIT Cross-Campus)</p>
                </div>
              </div>
              <button 
                onClick={() => showToast('Opening Google Meet test room...')}
                className="bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
              >
                Join Room
              </button>
            </div>
          </div>
        </div>

        {/* Student Endowment & GPU Compute Giving */}
        <div className="bg-[#F9F9F7] p-6 rounded-2xl border border-[#E5E2D9] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#8C5E3C]" />
              <h3 className="font-bold text-base text-[#2D2D2A] font-serif-display">
                Alumni Giving &amp; Student GPU Fund
              </h3>
            </div>
            <span className="text-[11px] font-bold text-[#34583A] bg-[#CFE0D1] px-2 py-0.5 rounded-full">
              92% Goal Reached
            </span>
          </div>

          <p className="text-xs text-[#5F5E59] leading-relaxed">
            Your contributions directly fund Google Cloud A100 GPU compute hours and conference travel grants for promising researchers at your alma mater and partner universities.
          </p>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#2D2D2A]">$12,500 Donated</span>
              <span className="text-[#7C7B76]">Goal: $15,000 / Academic Year</span>
            </div>
            <div className="w-full bg-[#E5E2D9] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#34583A] h-full rounded-full w-[83%] transition-all"></div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="text-[11px] text-[#7C7B76]">
              <span>Next Disbursement: <strong>Oct 15 (Hackathon Grants)</strong></span>
            </div>
            <button
              onClick={() => showToast('Opening Alumni Endowment Contribution modal...')}
              className="bg-[#8C5E3C] hover:bg-[#724C30] text-[#F9F9F7] text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Contribute to Fund</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Add Custom Help Offering */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F9F9F7] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E5E2D9] animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#5A5A40]" />
                <h4 className="font-bold text-base text-[#2D2D2A] font-serif-display">
                  Create Custom Alumni Help Offering
                </h4>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full text-[#7C7B76] hover:bg-[#EBE8E1] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOffering} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#2D2D2A] block mb-1">Target Audience</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewOfferingAudience('alma_mater_only')}
                    className={`p-2.5 rounded-lg border text-left font-semibold transition-all cursor-pointer ${
                      newOfferingAudience === 'alma_mater_only'
                        ? 'bg-[#EBF3ED] text-[#2D5A3C] border-[#34583A]'
                        : 'bg-white text-[#5F5E59] border-[#E5E2D9]'
                    }`}
                  >
                    <Building2 className="w-4 h-4 mb-1" />
                    <span>Alma Mater Students</span>
                    <p className="text-[10px] font-normal text-[#7C7B76] mt-0.5">Exclusive to your university</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewOfferingAudience('cross_campus_all')}
                    className={`p-2.5 rounded-lg border text-left font-semibold transition-all cursor-pointer ${
                      newOfferingAudience === 'cross_campus_all'
                        ? 'bg-[#F7F3E8] text-[#7A6A32] border-[#5A5A40]'
                        : 'bg-white text-[#5F5E59] border-[#E5E2D9]'
                    }`}
                  >
                    <Globe className="w-4 h-4 mb-1" />
                    <span>Cross-Campus / Global</span>
                    <p className="text-[10px] font-normal text-[#7C7B76] mt-0.5">Open to all universities</p>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#2D2D2A] block mb-1">Category</label>
                  <select
                    value={newOfferingCategory}
                    onChange={(e) => setNewOfferingCategory(e.target.value as AlumniContributionOffering['category'])}
                    className="w-full bg-white border border-[#D5D5C6] rounded-lg p-2 text-[#2D2D2A] focus:border-[#5A5A40]"
                  >
                    <option value="Mentorship">1-on-1 Mentorship</option>
                    <option value="Referral">Company Referral Track</option>
                    <option value="Resume Review">Resume &amp; Portfolio Review</option>
                    <option value="Mock Interview">Mock Coding / Interview</option>
                    <option value="Capstone Advisory">Capstone Advisory</option>
                    <option value="Masterclass">Masterclass &amp; Webinar</option>
                    <option value="Open Office Hours">Open Office Hours</option>
                    <option value="Open Source">Open-Source PR Reviews</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#2D2D2A] block mb-1">Monthly Slots Available</label>
                  <select
                    value={newOfferingSlots}
                    onChange={(e) => setNewOfferingSlots(Number(e.target.value))}
                    className="w-full bg-white border border-[#D5D5C6] rounded-lg p-2 text-[#2D2D2A] focus:border-[#5A5A40]"
                  >
                    <option value={2}>2 Slots / Month</option>
                    <option value={4}>4 Slots / Month</option>
                    <option value={8}>8 Slots / Month</option>
                    <option value={15}>15 Slots / Month</option>
                    <option value={50}>50+ (Webinar)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#2D2D2A] block mb-1">Offering Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Consensus Architecture 1:1 Clinic"
                  value={newOfferingTitle}
                  onChange={(e) => setNewOfferingTitle(e.target.value)}
                  className="w-full bg-white border border-[#D5D5C6] rounded-lg p-2 text-[#2D2D2A] focus:border-[#5A5A40]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#2D2D2A] block mb-1">Description &amp; Expectations</label>
                <textarea
                  rows={3}
                  placeholder="Explain what the student should prepare and what value they will receive..."
                  value={newOfferingDescription}
                  onChange={(e) => setNewOfferingDescription(e.target.value)}
                  className="w-full bg-white border border-[#D5D5C6] rounded-lg p-2 text-[#2D2D2A] focus:border-[#5A5A40]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5E2D9]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-[#5F5E59] hover:bg-[#EBE8E1] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#34583A] hover:bg-[#2B4930] text-white font-bold shadow-xs cursor-pointer"
                >
                  Publish Offering
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
