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
  Landmark
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

  // Sync bio text when profile changes (e.g. role switch)
  useEffect(() => {
    setBioText(profile.bio);
    setActiveTab('primary');
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
                  {profile.role === 'recruiter' ? 'Enterprise Recruiter Bio' : profile.role === 'academician' ? 'Academic & Research Profile' : profile.role === 'institution_admin' ? 'Institutional Dean Executive Summary' : 'Professional Summary'}
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
              {profile.role === 'recruiter' ? 'Active Campaigns & Programs' : profile.role === 'academician' ? 'Teaching, Courses & Lab Initiatives' : profile.role === 'institution_admin' ? 'Strategic Council & Initiatives' : 'Project Portfolio & Certifications'}
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
