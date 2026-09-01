import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Circle, 
  Download, 
  Share2, 
  MapPin, 
  Pencil, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Trophy, 
  Plus, 
  ShieldCheck, 
  ExternalLink, 
  QrCode,
  Key,
  BookOpen,
  Code,
  Sparkles,
  FileCheck,
  Upload,
  Image as ImageIcon,
  Camera,
  X,
  Building2,
  Users,
  CheckCircle2,
  DollarSign,
  FileText,
  BookmarkCheck,
  TrendingUp,
  Landmark,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  Clock,
  Star,
  MessageSquare,
  Calendar,
  Globe,
  Layers,
  Check
} from 'lucide-react';
import { UserProfile, Milestone } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  onOpenPublicView: () => void;
  onOpenResumeModal: () => void;
  onOpenAddMilestone: () => void;
  onCompleteCertificationTask: () => void;
  onUpdateBio: (newBio: string) => void;
  onUpdateAvatar?: (newAvatar: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onOpenPublicView,
  onOpenResumeModal,
  onOpenAddMilestone,
  onCompleteCertificationTask,
  onUpdateBio,
  onUpdateAvatar
}) => {
  const [activeTab, setActiveTab] = useState<string>('primary');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(profile.bio);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarUrlInput, setAvatarUrlInput] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Collapsible sections for Alumni Profile View (strictly hide/collapse by default)
  const [isMentorshipOpen, setIsMentorshipOpen] = useState<boolean>(false);
  const [isGivingOpen, setIsGivingOpen] = useState<boolean>(false);
  const [isCareerSupportOpen, setIsCareerSupportOpen] = useState<boolean>(false);

  // Sync bio text when profile changes (e.g. role switch)
  useEffect(() => {
    setBioText(profile.bio);
    setActiveTab('primary');
    // Ensure alumni collapsibles remain hidden by default on role change
    setIsMentorshipOpen(false);
    setIsGivingOpen(false);
    setIsCareerSupportOpen(false);
  }, [profile]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result && onUpdateAvatar) {
          onUpdateAvatar(result);
          setShowAvatarModal(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyAvatarUrl = () => {
    if (avatarUrlInput.trim() && onUpdateAvatar) {
      onUpdateAvatar(avatarUrlInput.trim());
      setShowAvatarModal(false);
      setAvatarUrlInput('');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const getMilestoneIcon = (category: string) => {
    switch (category) {
      case 'education':
        return <GraduationCap className="w-3.5 h-3.5 text-[#F9F9F7]" />;
      case 'certification':
        return <Award className="w-3.5 h-3.5 text-[#F9F9F7]" />;
      case 'internship':
        return <Briefcase className="w-3.5 h-3.5 text-[#F9F9F7]" />;
      case 'achievement':
      default:
        return <Trophy className="w-3.5 h-3.5 text-[#42422E]" />;
    }
  };

  const getMilestoneBadgeColor = (category: string) => {
    switch (category) {
      case 'education':
        return 'bg-[#5A5A40] text-[#F9F9F7]';
      case 'certification':
        return 'bg-[#7C7C5A] text-[#F9F9F7]';
      case 'internship':
        return 'bg-[#8C5E3C] text-[#F9F9F7]';
      case 'achievement':
      default:
        return 'bg-[#E8E8DF] text-[#42422E]';
    }
  };

  // Dynamic tab definitions based on role
  const getTabsForRole = () => {
    switch (profile.role) {
      case 'recruiter':
        return [
          { id: 'primary', label: 'Company & Talent Overview' },
          { id: 'portfolio', label: 'Hiring Campaigns & Track Record' },
          { id: 'security', label: 'Enterprise Security & Audit' }
        ];
      case 'academician':
        return [
          { id: 'primary', label: 'Research Publications & Grants' },
          { id: 'portfolio', label: 'Teaching, Pedagogy & FDPs' },
          { id: 'security', label: 'Faculty Cryptographic Authority' }
        ];
      case 'institution_admin':
        return [
          { id: 'primary', label: 'Accreditation & Institutional Governance' },
          { id: 'portfolio', label: 'Corporate MoUs & Strategic Council' },
          { id: 'security', label: 'Consortium Master Signing Authority' }
        ];
      case 'alumni':
        return [
          { id: 'primary', label: 'Alumni Profile & Contributions' },
          { id: 'portfolio', label: 'Mentorship & Advisory Portfolio' },
          { id: 'security', label: 'Verified Alumna Authority & Credentials' }
        ];
      case 'student':
      default:
        return [
          { id: 'primary', label: 'Personal & Career Milestones' },
          { id: 'portfolio', label: 'Academic & Project Portfolio' },
          { id: 'security', label: 'Skill Passport Cryptography' }
        ];
    }
  };

  const tabs = getTabsForRole();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header / Avatar Profile Card */}
      <header className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#EBE8E1] rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        {/* Headshot Avatar with edit badge */}
        <div className="relative group shrink-0">
          <img
            id="profile-main-avatar"
            src={profile.avatar}
            alt="User Avatar"
            referrerPolicy="no-referrer"
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#F9F9F7] shadow-sm ring-1 ring-[#E5E2D9]"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            id="edit-avatar-btn"
            onClick={() => setShowAvatarModal(true)}
            className="absolute bottom-0 right-0 bg-[#5A5A40] text-[#F9F9F7] p-2 rounded-full shadow-md hover:scale-105 transition-transform flex items-center justify-center hover:bg-[#4A4A33] cursor-pointer"
            title="Edit profile photo"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* User Identity Info */}
        <div className="text-center md:text-left flex-1 z-10">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#2D2D2A] tracking-tight font-serif-display">
              {profile.name}
            </h1>
            <span className="capitalize px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6]">
              {profile.role.replace('_', ' ')}
            </span>
          </div>

          <p className="text-sm md:text-base text-[#5F5E59] font-medium mb-3">
            {profile.title}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#EAF1EB] px-3 py-1 rounded-full text-xs font-semibold text-[#34583A] border border-[#CFE0D1]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#34583A]" />
              Verified Profile
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#EBE8E1] px-3 py-1 rounded-full text-xs font-semibold text-[#42422E] border border-[#DED9CD]">
              <MapPin className="w-3.5 h-3.5 text-[#7C7B76]" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#E8E8DF] px-3 py-1 rounded-full text-xs font-semibold text-[#42422E] border border-[#D5D5C6]">
              {profile.role === 'recruiter' ? <Building2 className="w-3.5 h-3.5 text-[#5A5A40]" /> : <GraduationCap className="w-3.5 h-3.5 text-[#5A5A40]" />}
              {profile.institution}
            </span>
          </div>
        </div>

        {/* Header Action Button */}
        <div className="z-10 flex flex-col sm:flex-row gap-2">
          <button
            id="public-view-btn"
            onClick={onOpenPublicView}
            className="border border-[#DED9CD] bg-[#F9F9F7] px-5 py-2 rounded-lg text-sm font-semibold text-[#2D2D2A] hover:bg-[#EBE8E1] transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>Public View</span>
          </button>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="border-b border-[#E5E2D9] flex gap-8 overflow-x-auto no-scrollbar">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`pb-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
              activeTab === t.id
                ? 'text-[#5A5A40] border-[#5A5A40]'
                : 'text-[#7C7B76] border-transparent hover:text-[#2D2D2A]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Primary Overview */}
      {activeTab === 'primary' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Card */}
            <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs p-6 md:p-8">
              <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4 mb-4">
                <h2 className="text-lg md:text-xl font-bold text-[#2D2D2A] font-serif-display">
                  {profile.role === 'recruiter' 
                    ? 'Enterprise Recruiter Bio' 
                    : profile.role === 'academician' 
                    ? 'Academic & Research Profile' 
                    : profile.role === 'institution_admin' 
                    ? 'Institutional Dean Executive Summary' 
                    : profile.role === 'alumni'
                    ? 'Distinguished Alumna & Industry Mentor Bio'
                    : 'Professional Summary'}
                </h2>
                {!isEditingBio ? (
                  <button
                    onClick={() => setIsEditingBio(true)}
                    className="text-xs font-semibold text-[#5A5A40] hover:text-[#4A4A33] flex items-center gap-1 cursor-pointer"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Edit Bio</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onUpdateBio(bioText);
                      setIsEditingBio(false);
                    }}
                    className="text-xs font-bold text-[#34583A] bg-[#EAF1EB] px-2.5 py-1 rounded-lg border border-[#CFE0D1] cursor-pointer"
                  >
                    Save Changes
                  </button>
                )}
              </div>

              {isEditingBio ? (
                <textarea
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  rows={4}
                  className="w-full p-3 bg-[#EBE8E1]/80 border border-[#E5E2D9] rounded-lg text-sm text-[#2D2D2A] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                />
              ) : (
                <p className="text-sm text-[#5F5E59] leading-relaxed">
                  {profile.bio}
                </p>
              )}
            </div>

            {/* Alumni-Specific Overview & Quick Statistics */}
            {profile.role === 'alumni' && profile.alumniOverview && (
              <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs p-6 md:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E2D9] pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#2D2D2A] font-serif-display flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-[#2D5A3C]" />
                      <span>Alma Mater & Professional Trajectory</span>
                    </h3>
                    <p className="text-xs text-[#7C7B76] mt-0.5">
                      {profile.alumniOverview.almaMater} • {profile.alumniOverview.graduationClass}
                    </p>
                  </div>
                  <span className="bg-[#EAF1EB] text-[#2D5A3C] text-xs font-bold px-2.5 py-1 rounded-full border border-[#CFE0D1] self-start sm:self-auto flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Alumna
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-[#F2F1ED] rounded-lg border border-[#E5E2D9]">
                    <span className="text-[#7C7B76] block text-[11px]">Current Organization</span>
                    <span className="font-bold text-[#2D2D2A] text-xs mt-0.5 block truncate">{profile.alumniOverview.currentCompany}</span>
                    <span className="text-[10px] text-[#5A5A40] block">{profile.alumniOverview.designation}</span>
                  </div>
                  <div className="p-3 bg-[#F2F1ED] rounded-lg border border-[#E5E2D9]">
                    <span className="text-[#7C7B76] block text-[11px]">Students Mentored</span>
                    <span className="font-bold text-[#2D5A3C] text-sm mt-0.5 block">{profile.alumniOverview.totalStudentsMentored} Scholars</span>
                    <span className="text-[10px] text-[#7C7B76] block">4.96/5.0 Feedback Rating</span>
                  </div>
                  <div className="p-3 bg-[#F2F1ED] rounded-lg border border-[#E5E2D9]">
                    <span className="text-[#7C7B76] block text-[11px]">Company Referrals</span>
                    <span className="font-bold text-[#2D2D2A] text-sm mt-0.5 block">{profile.alumniOverview.activeReferralsCount} Candidates</span>
                    <span className="text-[10px] text-[#34583A] block">85.7% On-Site Rate</span>
                  </div>
                  <div className="p-3 bg-[#F2F1ED] rounded-lg border border-[#E5E2D9]">
                    <span className="text-[#7C7B76] block text-[11px]">Giving & Grants</span>
                    <span className="font-bold text-[#7A6A32] text-xs mt-0.5 block truncate">{profile.alumniOverview.scholarshipFundContributed}</span>
                    <span className="text-[10px] text-[#34583A] block">501(c)(3) Disbursed</span>
                  </div>
                </div>

                <div className="p-3.5 bg-[#E8E8DF]/60 rounded-lg border border-[#D5D5C6] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#5A5A40] shrink-0" />
                    <div>
                      <span className="font-bold text-[#2D2D2A]">Active Weekly Bandwidth: </span>
                      <span className="text-[#5F5E59]">{profile.alumniOverview.mentorshipBandwidth}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#5A5A40] bg-[#F9F9F7] px-2.5 py-1 rounded border border-[#D5D5C6] self-start sm:self-auto">
                    {profile.alumniOverview.alumniChapter}
                  </span>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* ALUMNI COLLAPSIBLE SECTION 1: Mentorship Contributions (Hide by Default) */}
            {/* ========================================================================= */}
            {profile.role === 'alumni' && (
              <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs overflow-hidden transition-all">
                {/* Collapsible Header Button */}
                <button
                  id="alumni-collapse-mentorship-btn"
                  onClick={() => setIsMentorshipOpen(!isMentorshipOpen)}
                  aria-expanded={isMentorshipOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-[#F2F1ED] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF1EB] text-[#2D5A3C] border border-[#CFE0D1] flex items-center justify-center shrink-0">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-[#2D2D2A] font-serif-display">
                          Mentorship Contributions
                        </h3>
                        <span className="bg-[#EAF1EB] text-[#2D5A3C] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#CFE0D1]">
                          48 Scholars Mentored
                        </span>
                        <span className="bg-[#F7F3E8] text-[#7A6A32] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#E9E0C7] hidden sm:inline-flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#7A6A32]" /> 4.96 Rating
                        </span>
                      </div>
                      <p className="text-xs text-[#7C7B76] mt-0.5 truncate">
                        1-on-1 Student Mentoring, Mock Interviews & Open Office Hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold text-[#5A5A40] hidden md:inline">
                      {isMentorshipOpen ? 'Collapse' : 'Expand Section'}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#E8E8DF] border border-[#D5D5C6] flex items-center justify-center text-[#5A5A40]">
                      {isMentorshipOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Collapsible Body Content (Rendered only when open) */}
                {isMentorshipOpen && (
                  <div className="p-6 pt-2 border-t border-[#E5E2D9] space-y-6 animate-in fade-in duration-200">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9]">
                        <span className="text-[11px] text-[#7C7B76] block">Total Mentored</span>
                        <span className="text-base font-bold text-[#2D2D2A] mt-0.5 block">48 Scholars</span>
                        <span className="text-[10px] text-[#2D5A3C] block">32 Alma Mater + 16 Global</span>
                      </div>
                      <div className="p-3 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9]">
                        <span className="text-[11px] text-[#7C7B76] block">Hours Contributed</span>
                        <span className="text-base font-bold text-[#2D2D2A] mt-0.5 block">142 Hours</span>
                        <span className="text-[10px] text-[#7C7B76] block">Evenings & Weekends</span>
                      </div>
                      <div className="p-3 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9]">
                        <span className="text-[11px] text-[#7C7B76] block">Student Rating</span>
                        <span className="text-base font-bold text-[#7A6A32] mt-0.5 block flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[#7A6A32]" /> 4.96 / 5.0
                        </span>
                        <span className="text-[10px] text-[#7C7B76] block">44 Verified Reviews</span>
                      </div>
                      <div className="p-3 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9]">
                        <span className="text-[11px] text-[#7C7B76] block">Active Bandwidth</span>
                        <span className="text-base font-bold text-[#34583A] mt-0.5 block">4-6 hrs / wk</span>
                        <span className="text-[10px] text-[#34583A] block">Accepting Requests</span>
                      </div>
                    </div>

                    {/* Mentorship Tracks */}
                    <div>
                      <h4 className="text-xs font-bold text-[#7C7B76] uppercase tracking-wider mb-3">
                        Active Mentorship Offerings & Program Tracks
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-4 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9] space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#2D2D2A]">Alma Mater 1-on-1 Office Hours</span>
                            <span className="text-[10px] bg-[#EAF1EB] text-[#2D5A3C] font-bold px-2 py-0.5 rounded">Bi-weekly</span>
                          </div>
                          <p className="text-[#5F5E59] text-[11px] leading-relaxed">
                            30-minute private technical strategy, distributed LLM architecture design, and career roadmap counseling for Columbia engineers.
                          </p>
                        </div>

                        <div className="p-4 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9] space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#2D2D2A]">Open Source Agent Architecture PR Reviews</span>
                            <span className="text-[10px] bg-[#E8E8DF] text-[#42422E] font-bold px-2 py-0.5 rounded">All Campuses</span>
                          </div>
                          <p className="text-[#5F5E59] text-[11px] leading-relaxed">
                            Async code-level reviews on student GitHub pull requests to help undergraduates land verified open-source framework contributions.
                          </p>
                        </div>

                        <div className="p-4 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9] space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#2D2D2A]">Quarterly Multi-Agent LLM Masterclasses</span>
                            <span className="text-[10px] bg-[#E8E8DF] text-[#42422E] font-bold px-2 py-0.5 rounded">150 Capacity</span>
                          </div>
                          <p className="text-[#5F5E59] text-[11px] leading-relaxed">
                            Quarterly 90-minute live interactive masterclass covering multi-agent orchestration, function calling, and distributed inference.
                          </p>
                        </div>

                        <div className="p-4 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9] space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#2D2D2A]">Senior Capstone Industry Co-Advising</span>
                            <span className="text-[10px] bg-[#EAF1EB] text-[#2D5A3C] font-bold px-2 py-0.5 rounded">Columbia CS</span>
                          </div>
                          <p className="text-[#5F5E59] text-[11px] leading-relaxed">
                            Industry advisory for final-year engineering capstone teams building scalable cloud infrastructure and agent evaluation pipelines.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Mentee Testimonials & Verified Logs */}
                    <div>
                      <h4 className="text-xs font-bold text-[#7C7B76] uppercase tracking-wider mb-3">
                        Recent Verified Mentee Testimonials & Logs
                      </h4>
                      <div className="space-y-3">
                        <div className="p-3.5 bg-[#F2F1ED]/80 rounded-xl border border-[#E5E2D9] text-xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#2D2D2A]">Kartik</span>
                              <span className="text-[11px] text-[#7C7B76]">Columbia University CS • Class of 2026</span>
                            </div>
                            <span className="text-[10px] bg-[#EAF1EB] text-[#2D5A3C] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Mock Interview Cleared
                            </span>
                          </div>
                          <p className="text-[#5F5E59] text-[11px] italic leading-relaxed">
                            "Priya's mock system design session on transformer caching and low-latency inference gave me the exact mental model needed for my Google DeepMind interviews."
                          </p>
                        </div>

                        <div className="p-3.5 bg-[#F2F1ED]/80 rounded-xl border border-[#E5E2D9] text-xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#2D2D2A]">Sarah Jenkins</span>
                              <span className="text-[11px] text-[#7C7B76]">MIT EECS • Class of 2026</span>
                            </div>
                            <span className="text-[10px] bg-[#E8E8DF] text-[#42422E] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> PR Merged to Open Source
                            </span>
                          </div>
                          <p className="text-[#5F5E59] text-[11px] italic leading-relaxed">
                            "Detailed code review during cross-campus open hours that helped me refactor our distributed memory manager and merge it into upstream repo."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* ALUMNI COLLAPSIBLE SECTION 2: Institutional Giving/Grants (Hide by Default)*/}
            {/* ========================================================================= */}
            {profile.role === 'alumni' && (
              <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs overflow-hidden transition-all">
                {/* Collapsible Header Button */}
                <button
                  id="alumni-collapse-giving-btn"
                  onClick={() => setIsGivingOpen(!isGivingOpen)}
                  aria-expanded={isGivingOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-[#F2F1ED] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#F7F3E8] text-[#7A6A32] border border-[#E9E0C7] flex items-center justify-center shrink-0">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-[#2D2D2A] font-serif-display">
                          Institutional Giving/Grants
                        </h3>
                        <span className="bg-[#F7F3E8] text-[#7A6A32] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#E9E0C7]">
                          $12,500 Total Giving Pledged
                        </span>
                        <span className="bg-[#EAF1EB] text-[#2D5A3C] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#CFE0D1] hidden sm:inline-flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> 100% Tax-Exempt 501(c)(3)
                        </span>
                      </div>
                      <p className="text-xs text-[#7C7B76] mt-0.5 truncate">
                        Endowments, Cloud GPU Sponsorships & Research Travel Grants
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold text-[#5A5A40] hidden md:inline">
                      {isGivingOpen ? 'Collapse' : 'Expand Section'}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#E8E8DF] border border-[#D5D5C6] flex items-center justify-center text-[#5A5A40]">
                      {isGivingOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Collapsible Body Content (Rendered only when open) */}
                {isGivingOpen && (
                  <div className="p-6 pt-2 border-t border-[#E5E2D9] space-y-6 animate-in fade-in duration-200">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9]">
                        <span className="text-[11px] text-[#7C7B76] block">Total Endowed & Pledged</span>
                        <span className="text-base font-bold text-[#7A6A32] mt-0.5 block">$12,500 USD</span>
                        <span className="text-[10px] text-[#7C7B76] block">Columbia CS Innovation Fund</span>
                      </div>
                      <div className="p-3 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9]">
                        <span className="text-[11px] text-[#7C7B76] block">Cloud GPU Hours</span>
                        <span className="text-base font-bold text-[#2D2D2A] mt-0.5 block">30,000 Hours</span>
                        <span className="text-[10px] text-[#2D5A3C] block">$6,000 GCP Credit Value</span>
                      </div>
                      <div className="p-3 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9]">
                        <span className="text-[11px] text-[#7C7B76] block">Conference Travel Grants</span>
                        <span className="text-base font-bold text-[#2D2D2A] mt-0.5 block">4 Scholars</span>
                        <span className="text-[10px] text-[#7C7B76] block">NeurIPS / ICML Funded</span>
                      </div>
                      <div className="p-3 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9]">
                        <span className="text-[11px] text-[#7C7B76] block">Audit Proof</span>
                        <span className="text-base font-bold text-[#2D5A3C] mt-0.5 block">501(c)(3) Verified</span>
                        <span className="text-[10px] text-[#2D5A3C] block">Ledger Hash Disbursed</span>
                      </div>
                    </div>

                    {/* Active Grants List */}
                    <div>
                      <h4 className="text-xs font-bold text-[#7C7B76] uppercase tracking-wider mb-3">
                        Active Endowments & Student Micro-Grant Allocations
                      </h4>
                      <div className="space-y-3 text-xs">
                        <div className="p-4 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9] space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h5 className="font-bold text-[#2D2D2A]">
                              1. Columbia CS Alumna GPU Acceleration Grant ($6,000 Pledged)
                            </h5>
                            <span className="text-[10px] bg-[#EAF1EB] text-[#2D5A3C] font-bold px-2 py-0.5 rounded self-start sm:self-auto">
                              Active • Fully Disbursed
                            </span>
                          </div>
                          <p className="text-[#5F5E59] text-[11px] leading-relaxed">
                            Sponsored cloud computation clusters (GCP A100 / H100) dedicated to undergraduate student researchers training parameter-efficient models for publication.
                          </p>
                          <div className="flex items-center gap-3 text-[10px] text-[#7C7B76] pt-1 border-t border-[#E5E2D9]">
                            <span>Beneficiary: Columbia Machine Learning Labs</span>
                            <span>•</span>
                            <span className="font-mono">Ledger ID: #GRNT-COL-2025-08</span>
                          </div>
                        </div>

                        <div className="p-4 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9] space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h5 className="font-bold text-[#2D2D2A]">
                              2. Underrepresented Student Conference Travel Fund ($2,500 Pledged)
                            </h5>
                            <span className="text-[10px] bg-[#E8E8DF] text-[#42422E] font-bold px-2 py-0.5 rounded self-start sm:self-auto">
                              2 of 4 Grants Awarded
                            </span>
                          </div>
                          <p className="text-[#5F5E59] text-[11px] leading-relaxed">
                            Travel stipends covering airfare and lodging for underrepresented student scholars presenting primary author research papers at premier international AI conferences.
                          </p>
                          <div className="flex items-center gap-3 text-[10px] text-[#7C7B76] pt-1 border-t border-[#E5E2D9]">
                            <span>Managed by: Columbia Engineering Alumni Council</span>
                            <span>•</span>
                            <span className="font-mono">Ledger ID: #TRVL-CONF-2026-02</span>
                          </div>
                        </div>

                        <div className="p-4 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9] space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h5 className="font-bold text-[#2D2D2A]">
                              3. Dean's Student Hardware & Robotics Discretionary Fund ($4,000 Pledged)
                            </h5>
                            <span className="text-[10px] bg-[#EAF1EB] text-[#2D5A3C] font-bold px-2 py-0.5 rounded self-start sm:self-auto">
                              Annual Endowment
                            </span>
                          </div>
                          <p className="text-[#5F5E59] text-[11px] leading-relaxed">
                            Direct unrestricted departmental funding to procure edge microcontrollers, sensors, and robotics testbeds for undergraduate project clubs and hackathons.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* ALUMNI COLLAPSIBLE SECTION 3: Career Placement Support (Hide by Default)  */}
            {/* ========================================================================= */}
            {profile.role === 'alumni' && (
              <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs overflow-hidden transition-all">
                {/* Collapsible Header Button */}
                <button
                  id="alumni-collapse-career-support-btn"
                  onClick={() => setIsCareerSupportOpen(!isCareerSupportOpen)}
                  aria-expanded={isCareerSupportOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-[#F2F1ED] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#F4ECE4] text-[#8C5E3C] border border-[#E6D4C3] flex items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-[#2D2D2A] font-serif-display">
                          Career Placement Support
                        </h3>
                        <span className="bg-[#F4ECE4] text-[#8C5E3C] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#E6D4C3]">
                          14 Active Referrals
                        </span>
                        <span className="bg-[#EAF1EB] text-[#2D5A3C] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#CFE0D1] hidden sm:inline-flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> 85.7% On-Site Placement Rate
                        </span>
                      </div>
                      <p className="text-xs text-[#7C7B76] mt-0.5 truncate">
                        Direct FAANG/DeepMind Referrals, Candidate Screening & Placement Pipeline
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold text-[#5A5A40] hidden md:inline">
                      {isCareerSupportOpen ? 'Collapse' : 'Expand Section'}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#E8E8DF] border border-[#D5D5C6] flex items-center justify-center text-[#5A5A40]">
                      {isCareerSupportOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Collapsible Body Content (Rendered only when open) */}
                {isCareerSupportOpen && (
                  <div className="p-6 pt-2 border-t border-[#E5E2D9] space-y-6 animate-in fade-in duration-200">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9]">
                        <span className="text-[11px] text-[#7C7B76] block">Total Candidate Referrals</span>
                        <span className="text-base font-bold text-[#2D2D2A] mt-0.5 block">14 Scholars</span>
                        <span className="text-[10px] text-[#7C7B76] block">Google, DeepMind, Waymo</span>
                      </div>
                      <div className="p-3 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9]">
                        <span className="text-[11px] text-[#7C7B76] block">Interview Conversion</span>
                        <span className="text-base font-bold text-[#2D5A3C] mt-0.5 block">85.7%</span>
                        <span className="text-[10px] text-[#2D5A3C] block">12 of 14 to Final Rounds</span>
                      </div>
                      <div className="p-3 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9]">
                        <span className="text-[11px] text-[#7C7B76] block">Offers Extended</span>
                        <span className="text-base font-bold text-[#2D2D2A] mt-0.5 block">9 Engineers</span>
                        <span className="text-[10px] text-[#5A5A40] block">$185k+ Avg Base Comp</span>
                      </div>
                      <div className="p-3 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9]">
                        <span className="text-[11px] text-[#7C7B76] block">ATS Priority Routing</span>
                        <span className="text-base font-bold text-[#34583A] mt-0.5 block">Fast-Track Vetted</span>
                        <span className="text-[10px] text-[#34583A] block">Internal Recruiting Link</span>
                      </div>
                    </div>

                    {/* Candidate Pipeline Board */}
                    <div>
                      <h4 className="text-xs font-bold text-[#7C7B76] uppercase tracking-wider mb-3">
                        Active Referral Pipeline & Candidate Status
                      </h4>
                      <div className="space-y-3 text-xs">
                        <div className="p-4 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9] space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <div>
                              <span className="font-bold text-[#2D2D2A]">Kartik</span>
                              <span className="text-[#5F5E59] ml-2 font-medium">Columbia University CS ('26)</span>
                            </div>
                            <span className="text-[10px] bg-[#EAF1EB] text-[#2D5A3C] font-bold px-2 py-0.5 rounded self-start sm:self-auto">
                              Stage: Technical On-Site Cleared
                            </span>
                          </div>
                          <p className="text-[#5F5E59] text-[11px]">
                            Requisition: <strong>Graduate AI Engineer — Google DeepMind</strong> • Priority Referral Ticket <span className="font-mono text-[#5A5A40]">#REF-2026-GOOG-8821</span>
                          </p>
                        </div>

                        <div className="p-4 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9] space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <div>
                              <span className="font-bold text-[#2D2D2A]">Rohan Gupta</span>
                              <span className="text-[#5F5E59] ml-2 font-medium">Columbia University CS ('26)</span>
                            </div>
                            <span className="text-[10px] bg-[#EAF1EB] text-[#2D5A3C] font-bold px-2 py-0.5 rounded self-start sm:self-auto">
                              Stage: Final Hiring Committee Review
                            </span>
                          </div>
                          <p className="text-[#5F5E59] text-[11px]">
                            Requisition: <strong>Software Engineer, Distributed Systems — Google Cloud</strong> • Ticket <span className="font-mono text-[#5A5A40]">#REF-2026-GOOG-7749</span>
                          </p>
                        </div>

                        <div className="p-4 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9] space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <div>
                              <span className="font-bold text-[#2D2D2A]">Elena Rostova</span>
                              <span className="text-[#5F5E59] ml-2 font-medium">Stanford University ('26)</span>
                            </div>
                            <span className="text-[10px] bg-[#E8E8DF] text-[#42422E] font-bold px-2 py-0.5 rounded self-start sm:self-auto">
                              Stage: Recruiter Screen Complete
                            </span>
                          </div>
                          <p className="text-[#5F5E59] text-[11px]">
                            Requisition: <strong>Research Engineer, Multimodal Foundation Models</strong> • Ticket <span className="font-mono text-[#5A5A40]">#REF-2026-GOOG-9102</span>
                          </p>
                        </div>

                        <div className="p-4 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9] space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <div>
                              <span className="font-bold text-[#2D2D2A]">David Kim</span>
                              <span className="text-[#5F5E59] ml-2 font-medium">Columbia University CS ('25)</span>
                            </div>
                            <span className="text-[10px] bg-[#EAF1EB] text-[#2D5A3C] font-bold px-2 py-0.5 rounded self-start sm:self-auto">
                              ✓ Offer Accepted (Joined June 2025)
                            </span>
                          </div>
                          <p className="text-[#5F5E59] text-[11px]">
                            Requisition: <strong>Machine Learning Engineer — Google Research</strong> • Placed & Onboarded
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Referral Screening Standards Policy */}
                    <div className="p-3.5 bg-[#E8E8DF]/60 rounded-xl border border-[#D5D5C6] text-xs space-y-1">
                      <span className="font-bold text-[#2D2D2A] block">Alumni Direct Referral Standards & Prerequisites:</span>
                      <p className="text-[#5F5E59] text-[11px] leading-relaxed">
                        • Verified Skill Passport score ≥ 85% with cryptographic ledger proof.<br />
                        • Completed 1-on-1 mock technical screening or verified capstone project review.<br />
                        • Official academic transcript on file in Document Vault.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Recruiter-Specific Details */}
            {profile.role === 'recruiter' && profile.companyOverview && (
              <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4">
                  <h3 className="text-lg font-bold text-[#2D2D2A] font-serif-display flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#5A5A40]" />
                    <span>Company Overview — {profile.companyOverview.companyName}</span>
                  </h3>
                  <span className="bg-[#EAF1EB] text-[#34583A] text-xs font-bold px-2.5 py-1 rounded border border-[#CFE0D1]">
                    Verified Tier-1 Employer
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-[#F2F1ED] rounded-lg border border-[#E5E2D9]">
                    <span className="text-[#7C7B76] block">Industry Domain</span>
                    <span className="font-bold text-[#2D2D2A] text-sm mt-0.5 block">{profile.companyOverview.industry}</span>
                  </div>
                  <div className="p-3 bg-[#F2F1ED] rounded-lg border border-[#E5E2D9]">
                    <span className="text-[#7C7B76] block">Global Workforce</span>
                    <span className="font-bold text-[#2D2D2A] text-sm mt-0.5 block">{profile.companyOverview.companySize}</span>
                  </div>
                  <div className="p-3 bg-[#F2F1ED] rounded-lg border border-[#E5E2D9]">
                    <span className="text-[#7C7B76] block">Headquarters</span>
                    <span className="font-bold text-[#2D2D2A] text-sm mt-0.5 block">{profile.companyOverview.hqLocation}</span>
                  </div>
                  <div className="p-3 bg-[#F2F1ED] rounded-lg border border-[#E5E2D9]">
                    <span className="text-[#7C7B76] block">Active Campus Drives</span>
                    <span className="font-bold text-[#34583A] text-sm mt-0.5 block">{profile.companyOverview.placementDrivesCount} Season Drives</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#7C7B76] uppercase tracking-wider mb-2">Key Hiring Domains</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.companyOverview.hiringDomains.map(d => (
                      <span key={d} className="px-3 py-1 bg-[#E8E8DF] text-[#42422E] rounded-lg text-xs font-bold border border-[#D5D5C6]">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Academician-Specific Publications */}
            {profile.role === 'academician' && profile.academicOverview && (
              <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4">
                  <h3 className="text-lg font-bold text-[#2D2D2A] font-serif-display flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#7A6A32]" />
                    <span>Peer-Reviewed Publications ({profile.academicOverview.publications.length})</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-[#E8E8DF] text-[#42422E] px-2.5 py-1 rounded">h-index: {profile.academicOverview.hIndex}</span>
                    <span className="text-xs font-bold bg-[#EAF1EB] text-[#34583A] px-2.5 py-1 rounded">{profile.academicOverview.citationsCount} Citations</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {profile.academicOverview.publications.map(pub => (
                    <div key={pub.id} className="p-4 bg-[#F2F1ED]/80 rounded-xl border border-[#E5E2D9] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-[#2D2D2A]">{pub.title}</h4>
                        <span className="text-[10px] font-bold bg-[#EAF1EB] text-[#34583A] px-2 py-0.5 rounded">{pub.citations} Citations</span>
                      </div>
                      <p className="text-xs text-[#5F5E59] font-medium">{pub.journal} • {pub.year}</p>
                      <p className="text-[11px] font-mono text-[#7C7B76]">DOI: {pub.doi}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admin-Specific Accreditations */}
            {profile.role === 'institution_admin' && profile.institutionOverview && (
              <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4">
                  <h3 className="text-lg font-bold text-[#2D2D2A] font-serif-display flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-[#8C5E3C]" />
                    <span>Consortium Accreditation & Metrics</span>
                  </h3>
                  <span className="bg-[#EAF1EB] text-[#34583A] text-xs font-bold px-2.5 py-1 rounded border border-[#CFE0D1]">
                    {profile.institutionOverview.accreditationScore}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-[#F2F1ED] rounded-lg border border-[#E5E2D9]">
                    <span className="text-[#7C7B76] block">NIRF Ranking</span>
                    <span className="font-bold text-[#2D2D2A] text-sm mt-0.5 block">{profile.institutionOverview.nirfRank}</span>
                  </div>
                  <div className="p-3 bg-[#F2F1ED] rounded-lg border border-[#E5E2D9]">
                    <span className="text-[#7C7B76] block">Enrolled Student Body</span>
                    <span className="font-bold text-[#2D2D2A] text-sm mt-0.5 block">{profile.institutionOverview.totalStudents} Scholars</span>
                  </div>
                  <div className="p-3 bg-[#F2F1ED] rounded-lg border border-[#E5E2D9]">
                    <span className="text-[#7C7B76] block">Consortium Placement Rate</span>
                    <span className="font-bold text-[#34583A] text-sm mt-0.5 block">{profile.institutionOverview.placementRate}</span>
                  </div>
                  <div className="p-3 bg-[#F2F1ED] rounded-lg border border-[#E5E2D9]">
                    <span className="text-[#7C7B76] block">Corporate Partner MoUs</span>
                    <span className="font-bold text-[#2D2D2A] text-sm mt-0.5 block">{profile.institutionOverview.activeMoUsCount} Active Alliances</span>
                  </div>
                </div>
              </div>
            )}

            {/* Milestones Section */}
            <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs p-6 md:p-8">
              <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4 mb-6">
                <h2 className="text-lg md:text-xl font-bold text-[#2D2D2A] font-serif-display">
                  Verified Milestones & Credentials
                </h2>
                <button
                  id="add-milestone-btn"
                  onClick={onOpenAddMilestone}
                  className="text-xs font-semibold text-[#5A5A40] hover:text-[#4A4A33] flex items-center gap-1 bg-[#E8E8DF] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer border border-[#D5D5C6]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Milestone</span>
                </button>
              </div>

              <div className="relative ml-3 border-l-2 border-[#E5E2D9] space-y-8 pb-2">
                {profile.milestones.map((milestone) => (
                  <div key={milestone.id} className="relative pl-8 md:pl-10 group">
                    <div
                      className={`absolute -left-[13px] top-0 w-6 h-6 rounded-full flex items-center justify-center shadow-xs ${getMilestoneBadgeColor(
                        milestone.category
                      )}`}
                    >
                      {getMilestoneIcon(milestone.category)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#7C7B76]">{milestone.date}</span>
                        {milestone.verified && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-[#34583A] font-bold">
                            <ShieldCheck className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-[#2D2D2A] mt-0.5">{milestone.title}</h3>
                      <p className="text-xs text-[#5F5E59] mt-1 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Metadata & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#2D2D2A] font-serif-display uppercase tracking-wider">
                Profile Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={onOpenPublicView}
                  className="w-full text-left p-3 rounded-lg bg-[#F2F1ED] hover:bg-[#E8E8DF] border border-[#E5E2D9] text-xs font-bold text-[#2D2D2A] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-[#5A5A40]" />
                    Shareable Public View
                  </span>
                  <span>&rarr;</span>
                </button>

                {profile.role === 'student' && (
                  <button
                    onClick={onOpenResumeModal}
                    className="w-full text-left p-3 rounded-lg bg-[#F2F1ED] hover:bg-[#E8E8DF] border border-[#E5E2D9] text-xs font-bold text-[#2D2D2A] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#5A5A40]" />
                      Official Resume PDF
                    </span>
                    <span>&rarr;</span>
                  </button>
                )}

                <button
                  onClick={handleShare}
                  className="w-full text-left p-3 rounded-lg bg-[#F2F1ED] hover:bg-[#E8E8DF] border border-[#E5E2D9] text-xs font-bold text-[#2D2D2A] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-[#5A5A40]" />
                    {copiedLink ? 'Link Copied to Clipboard!' : 'Copy Profile URL'}
                  </span>
                </button>
              </div>
            </div>

            {/* Verified Skills Summary Card */}
            <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#2D2D2A] font-serif-display uppercase tracking-wider">
                Top Competencies
              </h3>
              <div className="space-y-3">
                {(profile.skills || []).slice(0, 5).map(skill => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#2D2D2A]">{skill.name}</span>
                      <span className="font-bold text-[#5A5A40]">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-[#E5E2D9] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#5A5A40] h-full rounded-full" style={{ width: `${skill.proficiency}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Portfolio / Track Record */}
      {activeTab === 'portfolio' && (
        <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4">
            <h2 className="text-lg md:text-xl font-bold text-[#2D2D2A] font-serif-display">
              {profile.role === 'recruiter' 
                ? 'Active Campaigns & Programs' 
                : profile.role === 'academician' 
                ? 'Teaching, Courses & Lab Initiatives' 
                : profile.role === 'institution_admin' 
                ? 'Strategic Council & Initiatives' 
                : profile.role === 'alumni'
                ? 'Mentorship Offerings, Masterclasses & Advisory Initiatives'
                : 'Project Portfolio & Certifications'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map(proj => (
              <div key={proj.id} className="p-5 rounded-xl bg-[#F2F1ED]/80 border border-[#E5E2D9] space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm text-[#2D2D2A]">{proj.title}</h3>
                  <span className="text-[10px] font-bold bg-[#E8E8DF] text-[#42422E] px-2 py-0.5 rounded">
                    {proj.role}
                  </span>
                </div>
                <p className="text-xs text-[#5F5E59] leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.techStack.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-[#E8E8DF] text-[#42422E] text-[10px] font-semibold rounded">
                      {t}
                    </span>
                  ))}
                </div>
                {proj.verifiedByFaculty && (
                  <p className="text-[11px] text-[#34583A] font-semibold flex items-center gap-1 pt-1 border-t border-[#E5E2D9]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified by {proj.verifiedByFaculty}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Security & Cryptographic Authority */}
      {activeTab === 'security' && (
        <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4">
            <h2 className="text-lg md:text-xl font-bold text-[#2D2D2A] font-serif-display flex items-center gap-2">
              <Key className="w-5 h-5 text-[#5A5A40]" />
              <span>Identity Verification & Cryptographic Ledger Authority</span>
            </h2>
            <span className="bg-[#EAF1EB] text-[#34583A] text-xs font-bold px-2.5 py-1 rounded border border-[#CFE0D1]">
              Status: Verified & Tamper-Proof
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-[#2D2D24] text-[#F9F9F7] rounded-xl border border-[#3E3E32] space-y-2 font-mono text-xs">
              <span className="text-[#A3A380] text-[11px]">User Verification Hash</span>
              <p className="text-[#CFE0D1] break-all bg-[#1E1E18] p-2.5 rounded-lg border border-[#3E3E32]">
                0x8f2db14e99a120fc64bca883109e22aa7f8a92ec41b80211
              </p>
              <p className="text-[10px] text-[#A9A89C]">
                Signed by Consortium Authority: Elena Rostova, Dean
              </p>
            </div>

            <div className="p-4 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9] space-y-2 text-xs">
              <span className="font-bold text-[#2D2D2A] block">Digital Certificate Verification</span>
              <p className="text-[#5F5E59] leading-relaxed">
                All credentials, skill ratings, and faculty endorsements associated with this profile are hashed and verified against the SkillBridge Consortium Ledger.
              </p>
              <div className="flex items-center gap-2 text-[#34583A] font-bold text-xs pt-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero discrepancies detected in latest audit</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Photo Upload & URL Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-[#F9F9F7] w-full max-w-md rounded-2xl border border-[#E5E2D9] shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
              <h3 className="text-base font-bold text-[#2D2D2A] font-serif-display">
                Update Profile Photo
              </h3>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="text-[#7C7B76] hover:text-[#2D2D2A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#2D2D2A]">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Upload from Computer</span>
              </button>

              <div className="flex items-center gap-2 my-2">
                <div className="flex-1 h-px bg-[#E5E2D9]" />
                <span className="text-[10px] text-[#7C7B76] uppercase tracking-wider font-semibold">Or enter image URL</span>
                <div className="flex-1 h-px bg-[#E5E2D9]" />
              </div>

              <div className="space-y-1.5">
                <input
                  type="text"
                  value={avatarUrlInput}
                  onChange={(e) => setAvatarUrlInput(e.target.value)}
                  placeholder="https://images.com/my-photo.jpg"
                  className="w-full p-2.5 bg-[#EBE8E1]/80 border border-[#E5E2D9] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAvatarModal(false)}
                  className="px-3 py-2 rounded-lg text-xs font-bold text-[#5F5E59] hover:bg-[#E8E8DF] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyAvatarUrl}
                  disabled={!avatarUrlInput.trim()}
                  className="px-4 py-2 bg-[#5A5A40] text-[#F9F9F7] rounded-lg text-xs font-bold hover:bg-[#4A4A33] cursor-pointer disabled:opacity-50"
                >
                  Apply Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
