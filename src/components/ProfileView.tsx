import React, { useState } from 'react';
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
  FileCheck
} from 'lucide-react';
import { UserProfile, Milestone } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  onOpenPublicView: () => void;
  onOpenResumeModal: () => void;
  onOpenAddMilestone: () => void;
  onCompleteCertificationTask: () => void;
  onUpdateBio: (newBio: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onOpenPublicView,
  onOpenResumeModal,
  onOpenAddMilestone,
  onCompleteCertificationTask,
  onUpdateBio
}) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'academic' | 'security'>('personal');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(profile.bio);
  const [copiedLink, setCopiedLink] = useState(false);

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

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header / Avatar Profile Card */}
      <header className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        {/* Decorative ambient gradient backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#EBE8E1] rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        {/* Headshot Avatar with edit badge */}
        <div className="relative group shrink-0">
          <img
            id="profile-main-avatar"
            src={profile.avatar}
            alt="User Avatar"
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#F9F9F7] shadow-sm ring-1 ring-[#E5E2D9]"
          />
          <button
            id="edit-avatar-btn"
            onClick={() => alert("Avatar upload dialog: Select a new verified institutional headshot.")}
            className="absolute bottom-0 right-0 bg-[#5A5A40] text-[#F9F9F7] p-2 rounded-full shadow-md hover:scale-105 transition-transform flex items-center justify-center hover:bg-[#4A4A33] cursor-pointer"
            title="Edit photo"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* User Identity Info */}
        <div className="text-center md:text-left flex-1 z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D2D2A] mb-1.5 tracking-tight font-serif-display">
            {profile.name}
          </h1>
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
              <GraduationCap className="w-3.5 h-3.5 text-[#5A5A40]" />
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
        <button
          id="tab-personal-info"
          onClick={() => setActiveTab('personal')}
          className={`pb-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            activeTab === 'personal'
              ? 'text-[#5A5A40] border-[#5A5A40]'
              : 'text-[#7C7B76] border-transparent hover:text-[#2D2D2A]'
          }`}
        >
          Personal Info
        </button>
        <button
          id="tab-academic-portfolio"
          onClick={() => setActiveTab('academic')}
          className={`pb-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            activeTab === 'academic'
              ? 'text-[#5A5A40] border-[#5A5A40]'
              : 'text-[#7C7B76] border-transparent hover:text-[#2D2D2A]'
          }`}
        >
          Academic Portfolio
        </button>
        <button
          id="tab-account-security"
          onClick={() => setActiveTab('security')}
          className={`pb-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            activeTab === 'security'
              ? 'text-[#5A5A40] border-[#5A5A40]'
              : 'text-[#7C7B76] border-transparent hover:text-[#2D2D2A]'
          }`}
        >
          Account Security
        </button>
      </div>

      {/* Tab 1: Personal Info */}
      {activeTab === 'personal' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 Cols): Professional Milestones */}
          <div className="lg:col-span-2 bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4 mb-8">
              <h2 className="text-lg md:text-xl font-bold text-[#2D2D2A] font-serif-display">
                Professional Milestones
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

            {/* Vertical Milestones Timeline */}
            <div className="relative ml-3 border-l-2 border-[#E5E2D9] space-y-10 pb-4">
              {profile.milestones.map((milestone) => (
                <div key={milestone.id} className="relative pl-8 md:pl-10 group">
                  {/* Timeline Dot Icon */}
                  <div
                    className={`absolute -left-[13px] top-0 w-6 h-6 rounded-full flex items-center justify-center shadow-xs ${getMilestoneBadgeColor(
                      milestone.category
                    )}`}
                  >
                    {getMilestoneIcon(milestone.category)}
                  </div>

                  <div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="text-base font-bold text-[#2D2D2A]">
                        {milestone.title}
                      </h4>
                      {milestone.verificationHash && (
                        <span className="text-[10px] bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1] px-2 py-0.5 rounded-full font-mono font-medium flex items-center gap-1">
                          <CheckCircle className="w-2.5 h-2.5" />
                          Verified ({milestone.verificationHash})
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-[#5A5A40] mb-2">
                      {milestone.date}
                    </p>
                    <p className="text-sm text-[#5F5E59] leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Executive Bio Box */}
            <div className="mt-8 pt-6 border-t border-[#E5E2D9]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-[#2D2D2A]">Executive Summary</h3>
                <button
                  onClick={() => setIsEditingBio(!isEditingBio)}
                  className="text-xs text-[#5A5A40] hover:text-[#4A4A33] font-semibold cursor-pointer"
                >
                  {isEditingBio ? 'Cancel' : 'Edit Summary'}
                </button>
              </div>
              {isEditingBio ? (
                <div className="space-y-2">
                  <textarea
                    value={bioText}
                    onChange={(e) => setBioText(e.target.value)}
                    rows={3}
                    className="w-full p-3 text-sm border border-[#E5E2D9] rounded-lg focus:ring-2 focus:ring-[#5A5A40] focus:outline-none bg-[#F2F1ED] text-[#2D2D2A]"
                  />
                  <button
                    onClick={() => {
                      onUpdateBio(bioText);
                      setIsEditingBio(false);
                    }}
                    className="px-3 py-1.5 bg-[#5A5A40] text-[#F9F9F7] rounded-lg text-xs font-medium hover:bg-[#4A4A33] cursor-pointer"
                  >
                    Save Summary
                  </button>
                </div>
              ) : (
                <p className="text-xs text-[#5F5E59] leading-relaxed bg-[#F2F1ED] p-3.5 rounded-lg border border-[#E5E2D9]">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Contextual Widgets */}
          <div className="flex flex-col gap-6">
            {/* Completion Widget */}
            <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs p-6">
              <h3 className="text-base font-bold text-[#2D2D2A] mb-4 font-serif-display">
                Profile Completion
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#5F5E59]">
                  {profile.completionPercentage}% Complete
                </span>
                <span className="text-xs font-bold text-[#5A5A40]">
                  {profile.completionPercentage >= 80 ? 'Excellent' : 'Good'}
                </span>
              </div>
              <div className="w-full bg-[#EBE8E1] rounded-full h-2.5 mb-4">
                <div
                  className="bg-[#5A5A40] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${profile.completionPercentage}%` }}
                />
              </div>

              <ul className="space-y-3 mt-4">
                <li className="flex items-center gap-3 text-xs text-[#2D2D2A]">
                  <CheckCircle className="w-4 h-4 text-[#34583A] shrink-0" />
                  <span>Basic Information</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-[#2D2D2A]">
                  <CheckCircle className="w-4 h-4 text-[#34583A] shrink-0" />
                  <span>Verified Email ({profile.email})</span>
                </li>
                <li className="flex items-center justify-between gap-3 text-xs text-[#7C7B76]">
                  <div className="flex items-center gap-3">
                    {profile.completionPercentage >= 100 ? (
                      <CheckCircle className="w-4 h-4 text-[#34583A] shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#7C7B76] shrink-0" />
                    )}
                    <span>Add Advanced MLOps Certification</span>
                  </div>
                  {profile.completionPercentage < 100 && (
                    <button
                      onClick={onCompleteCertificationTask}
                      className="text-[11px] font-bold text-[#5A5A40] hover:underline cursor-pointer"
                    >
                      + Add
                    </button>
                  )}
                </li>
              </ul>
            </div>

            {/* Quick Actions Widget */}
            <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs p-6">
              <h3 className="text-base font-bold text-[#2D2D2A] mb-4 font-serif-display">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  id="quick-download-resume-btn"
                  onClick={onOpenResumeModal}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#EBE8E1] transition-colors text-left border border-[#E5E2D9] cursor-pointer group"
                >
                  <span className="text-xs font-semibold text-[#2D2D2A]">
                    Download Resume
                  </span>
                  <Download className="w-4 h-4 text-[#5F5E59] group-hover:text-[#5A5A40] transition-colors" />
                </button>
                <button
                  id="quick-share-profile-btn"
                  onClick={handleShare}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#EBE8E1] transition-colors text-left border border-[#E5E2D9] cursor-pointer group"
                >
                  <span className="text-xs font-semibold text-[#2D2D2A]">
                    {copiedLink ? 'Link Copied to Clipboard!' : 'Share Profile'}
                  </span>
                  <Share2 className="w-4 h-4 text-[#5F5E59] group-hover:text-[#5A5A40] transition-colors" />
                </button>
              </div>
            </div>

            {/* Verified Digital Seal Info */}
            <div className="bg-[#F4F3EF] rounded-xl border border-[#E5E2D9] p-5">
              <div className="flex items-center gap-2 mb-2 text-[#5A5A40]">
                <ShieldCheck className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Institution Endorsed</h4>
              </div>
              <p className="text-xs text-[#5F5E59] leading-relaxed mb-3">
                All degree credits, GPA, and industry internship transcripts are cryptographically hashed and verified by Columbia University.
              </p>
              <div className="flex items-center gap-2 font-mono text-[10px] text-[#5F5E59] bg-[#F9F9F7] p-2 rounded border border-[#E5E2D9]">
                <Key className="w-3 h-3 text-[#34583A]" />
                <span>NEXUS-VERIFIED-HASH-2026-9F8A</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Academic Portfolio */}
      {activeTab === 'academic' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F9F9F7] p-6 rounded-xl border border-[#E5E2D9] shadow-xs">
              <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider">Cumulative GPA</span>
              <p className="text-2xl font-bold text-[#2D2D2A] mt-1 font-serif-display">{profile.gpa}</p>
              <p className="text-xs text-[#34583A] font-medium mt-1">Top 5% of Graduating Class</p>
            </div>
            <div className="bg-[#F9F9F7] p-6 rounded-xl border border-[#E5E2D9] shadow-xs">
              <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider">Institution & Major</span>
              <p className="text-base font-bold text-[#2D2D2A] mt-1">{profile.department}</p>
              <p className="text-xs text-[#5F5E59] mt-1">{profile.institution} (Class of {profile.graduationYear})</p>
            </div>
            <div className="bg-[#F9F9F7] p-6 rounded-xl border border-[#E5E2D9] shadow-xs">
              <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider">Verified Projects</span>
              <p className="text-2xl font-bold text-[#5A5A40] mt-1 font-serif-display">{profile.projects.length} Published</p>
              <p className="text-xs text-[#5F5E59] mt-1">Both with live deployments & code repositories</p>
            </div>
          </div>

          {/* Academic & Industry Projects */}
          <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs p-6 md:p-8">
            <h3 className="text-lg font-bold text-[#2D2D2A] mb-6 flex items-center gap-2 font-serif-display">
              <Code className="w-5 h-5 text-[#5A5A40]" />
              <span>Verified Capstone & Industry Research Projects</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.projects.map((proj) => (
                <div key={proj.id} className="border border-[#E5E2D9] bg-[#F2F1ED]/50 rounded-xl p-5 hover:border-[#A3A380] transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-base text-[#2D2D2A]">{proj.title}</h4>
                      <span className="text-[11px] bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6] px-2 py-0.5 rounded font-semibold whitespace-nowrap">
                        {proj.role}
                      </span>
                    </div>
                    <p className="text-xs text-[#5F5E59] mb-4 leading-relaxed">{proj.description}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] bg-[#EBE8E1] text-[#42422E] border border-[#DED9CD] px-2 py-0.5 rounded font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5E2D9] text-xs space-y-1.5">
                    {proj.verifiedByFaculty && (
                      <div className="flex items-center gap-1.5 text-[#34583A] font-medium">
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>Verified by: {proj.verifiedByFaculty}</span>
                      </div>
                    )}
                    {proj.industryPartner && (
                      <div className="flex items-center gap-1.5 text-[#5F5E59]">
                        <Briefcase className="w-3.5 h-3.5 text-[#7C7B76]" />
                        <span>Industry Sponsor: {proj.industryPartner}</span>
                      </div>
                    )}
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#5A5A40] hover:underline pt-1 font-medium">
                        <span>View Repository & Data Specs</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Account Security & Multi-Role SSO */}
      {activeTab === 'security' && (
        <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] shadow-xs p-6 md:p-8 space-y-6">
          <h3 className="text-lg font-bold text-[#2D2D2A] flex items-center gap-2 font-serif-display">
            <Key className="w-5 h-5 text-[#5A5A40]" />
            <span>Cryptographic Identity & Security Protocols</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[#E5E2D9] bg-[#F2F1ED]/50 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#2D2D2A]">Institutional SSO</span>
                <span className="text-xs bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1] px-2 py-0.5 rounded-full font-semibold">Active & Connected</span>
              </div>
              <p className="text-xs text-[#5F5E59]">
                Connected with Columbia University Active Directory (Kerberos / SAML 2.0). All credentials sync in real-time.
              </p>
              <div className="text-[11px] font-mono bg-[#F9F9F7] p-2.5 rounded border border-[#E5E2D9] text-[#5F5E59]">
                Entity ID: urn:mace:incommon:columbia.edu:nexus
              </div>
            </div>

            <div className="border border-[#E5E2D9] bg-[#F2F1ED]/50 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#2D2D2A]">Digital Signature Key</span>
                <span className="text-xs bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6] px-2 py-0.5 rounded-full font-semibold">Verified Ed25519</span>
              </div>
              <p className="text-xs text-[#5F5E59]">
                Used to sign digital portfolio exports and verify authentic academic submissions to recruiters.
              </p>
              <div className="text-[11px] font-mono bg-[#F9F9F7] p-2.5 rounded border border-[#E5E2D9] text-[#5F5E59] truncate">
                Public Fingerprint: 4F:2E:88:91:AA:B0:12:99:6D:FE:33:10
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
