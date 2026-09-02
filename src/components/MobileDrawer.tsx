import React from 'react';
import { 
  Building2, 
  LayoutDashboard, 
  BadgeCheck, 
  HelpCircle, 
  Briefcase, 
  BarChart3, 
  GraduationCap, 
  Landmark, 
  FolderLock, 
  Handshake, 
  LifeBuoy, 
  LogOut, 
  PlusCircle, 
  Trophy, 
  Sparkles, 
  X, 
  Globe, 
  Wifi, 
  WifiOff, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { ActiveTab, LanguageCode, UserRole, UserProfile } from '../types';
import { translations } from '../data/initialData';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  onOpenPostOpportunity: () => void;
  onOpenJudgeShowcase?: () => void;
  onOpenLogout: () => void;
  userProfile: UserProfile;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  currentRole,
  onRoleChange,
  currentLanguage,
  onLanguageChange,
  isOffline,
  onToggleOffline,
  onOpenPostOpportunity,
  onOpenJudgeShowcase,
  onOpenLogout,
  userProfile
}) => {
  if (!isOpen) return null;

  const t = translations[currentLanguage] || translations.en;

  const navItems = [
    { id: 'profile', label: 'My Digital Profile', icon: BadgeCheck, roles: ['student', 'recruiter', 'academician', 'institution_admin', 'alumni'] },
    { id: 'dashboard', label: t.dashboard || 'Dashboard', icon: LayoutDashboard, roles: ['student', 'recruiter', 'academician', 'institution_admin', 'alumni'] },
    { id: 'skill_passport', label: t.skillPassport || 'Skill Passport', icon: BadgeCheck, roles: ['student', 'recruiter', 'academician', 'institution_admin', 'alumni'] },
    { id: 'assessments', label: t.assessments || 'Assessments', icon: HelpCircle, roles: ['student', 'recruiter', 'institution_admin', 'alumni'] },
    { id: 'opportunities', label: t.opportunities || 'Opportunities', icon: Briefcase, roles: ['student', 'recruiter', 'academician', 'institution_admin', 'alumni'] },
    { id: 'learning_programs', label: t.learningPrograms || 'Learning Programs', icon: GraduationCap, roles: ['student', 'recruiter', 'academician', 'institution_admin', 'alumni'] },
    { id: 'academician_hub', label: t.academicianHub || 'Academician Hub', icon: Landmark, roles: ['academician', 'student', 'recruiter', 'institution_admin', 'alumni'] },
    { id: 'analytics', label: t.analytics || 'Analytics', icon: BarChart3, roles: ['student', 'recruiter', 'academician', 'institution_admin', 'alumni'] },
    { id: 'documents', label: t.documents || 'Document Vault', icon: FolderLock, roles: ['student', 'recruiter', 'academician', 'institution_admin', 'alumni'] },
    { id: 'collaboration', label: t.collaboration || 'Collaboration Hub', icon: Handshake, roles: ['student', 'recruiter', 'academician', 'institution_admin', 'alumni'] },
    { id: 'help_center', label: t.helpCenter || 'Help Center', icon: LifeBuoy, roles: ['student', 'recruiter', 'academician', 'institution_admin', 'alumni'] }
  ];

  const roleConfigs: Record<UserRole, { label: string; badgeColor: string; description: string }> = {
    student: { 
      label: t.roleStudent || 'Student', 
      badgeColor: 'bg-[#E8E8DF] text-[#42422E] border-[#D5D5C6]',
      description: 'Skill Passport, Assessments, Internships' 
    },
    recruiter: { 
      label: t.roleRecruiter || 'Industry Recruiter', 
      badgeColor: 'bg-[#EAF1EB] text-[#34583A] border-[#CFE0D1]',
      description: 'Candidate Pipeline, Requisitions, Hiring' 
    },
    academician: { 
      label: t.roleAcademician || 'Faculty / Academician', 
      badgeColor: 'bg-[#F7F3E8] text-[#7A6A32] border-[#E9E0C7]',
      description: 'Endorsements, Lab Grants, Syllabi' 
    },
    institution_admin: { 
      label: t.roleAdmin || 'Institution Admin', 
      badgeColor: 'bg-[#F4ECE4] text-[#8C5E3C] border-[#E6D4C3]',
      description: 'Accreditation, NIRF, Consortium MoUs' 
    },
    alumni: { 
      label: (t as any).roleAlumni || 'Alumni Mentor / Partner', 
      badgeColor: 'bg-[#EBF3ED] text-[#2D5A3C] border-[#B8D5BC]',
      description: 'Mentorship, Endowments, Referrals' 
    }
  };

  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'en', label: 'English (US)' },
    { code: 'es', label: 'Español' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ja', label: '日本語 (Japanese)' }
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden flex animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Slide-out Sheet */}
      <div className="relative w-[85%] max-w-[340px] bg-[#2D2D24] text-[#C5C4BA] h-full shadow-2xl flex flex-col z-10 overflow-hidden border-r border-[#3E3E32] animate-in slide-in-from-left duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#3E3E32] flex items-center justify-between bg-[#24241D]">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { onTabChange('profile'); onClose(); }}>
            <div className="w-9 h-9 bg-[#E8E8DF] rounded-lg flex items-center justify-center shadow-xs">
              <Building2 className="w-5 h-5 text-[#42422E]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F9F9F7] font-serif-display leading-tight">SkillBridge Nexus</h2>
              <p className="text-[11px] text-[#A3A380]">Enterprise Portal</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close navigation drawer"
            className="p-1.5 text-[#A9A89C] hover:text-white rounded-lg hover:bg-[#3D3D30] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 bg-[#282820] border-b border-[#3E3E32] flex items-center gap-3">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover border-2 border-[#D4AF37]"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-[#F9F9F7] truncate">{userProfile.name}</h3>
            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border mt-0.5 ${roleConfigs[currentRole].badgeColor}`}>
              {roleConfigs[currentRole].label}
            </span>
          </div>
        </div>

        {/* Scrollable Navigation & Controls */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Quick Action Buttons */}
          <div className="space-y-2">
            {onOpenJudgeShowcase && (
              <button
                id="mobile-drawer-judge-btn"
                onClick={() => { onOpenJudgeShowcase(); onClose(); }}
                className="w-full bg-gradient-to-r from-[#AA771C] via-[#D4AF37] to-[#8B6508] text-[#1E1E18] font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 shadow-md cursor-pointer border border-[#FFE899]/70"
              >
                <Trophy className="w-4 h-4 text-[#1E1E18]" />
                <span>3D Judge Showcase Deck</span>
              </button>
            )}

            <button
              id="mobile-drawer-post-opportunity-btn"
              onClick={() => { onOpenPostOpportunity(); onClose(); }}
              className="w-full bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] font-semibold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 shadow-xs cursor-pointer border border-[#6B6B4D]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.postOpportunity || 'Post Opportunity'}</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8D81] px-2 block mb-1">
              Main Navigation
            </span>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { onTabChange(item.id as ActiveTab); onClose(); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                      isActive
                        ? 'text-[#F9F9F7] bg-[#404033] border-l-4 border-[#A3A380] font-bold'
                        : 'text-[#B5B4A8] hover:text-[#F9F9F7] hover:bg-[#3D3D30]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4D4B8]' : 'text-[#8E8D81]'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Role Switcher Section */}
          <div className="pt-2 border-t border-[#3E3E32]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8D81] px-2 block mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#FFE899]" />
              Switch Portal Role
            </span>
            <div className="space-y-1">
              {(['student', 'recruiter', 'academician', 'institution_admin', 'alumni'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    onRoleChange(role);
                    onClose();
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors ${
                    currentRole === role 
                      ? 'bg-[#404033] text-[#F9F9F7] font-bold border border-[#5A5A40]' 
                      : 'text-[#A9A89C] hover:bg-[#38382D] hover:text-white'
                  }`}
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-xs leading-tight truncate">{roleConfigs[role].label}</p>
                    <p className="text-[10px] text-[#8E8D81] truncate">{roleConfigs[role].description}</p>
                  </div>
                  {currentRole === role && <CheckCircle2 className="w-4 h-4 text-[#FFE899] shrink-0 ml-2" />}
                </button>
              ))}
            </div>
          </div>

          {/* Language Selector Section */}
          <div className="pt-2 border-t border-[#3E3E32]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8D81] px-2 block mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-[#CFE0D1]" />
              Language
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    onClose();
                  }}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] font-medium text-left truncate cursor-pointer transition-colors ${
                    currentLanguage === lang.code
                      ? 'bg-[#5A5A40] text-white font-bold'
                      : 'bg-[#38382D] text-[#A9A89C] hover:bg-[#404033] hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Offline Mode Toggle */}
          <div className="pt-2 border-t border-[#3E3E32]">
            <button
              onClick={onToggleOffline}
              className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors border ${
                isOffline
                  ? 'bg-[#E8E8DF] text-[#42422E] border-[#D5D5C6]'
                  : 'bg-[#38382D] text-[#C5C4BA] border-[#48483B] hover:bg-[#404033]'
              }`}
            >
              <div className="flex items-center gap-2">
                {isOffline ? <WifiOff className="w-3.5 h-3.5 text-[#5A5A40]" /> : <Wifi className="w-3.5 h-3.5 text-[#34583A]" />}
                <span>{isOffline ? 'Offline Mode Active' : 'Network Mode: Online'}</span>
              </div>
              <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded">
                {isOffline ? 'Connect' : 'Simulate'}
              </span>
            </button>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-[#3E3E32] bg-[#24241D] flex items-center justify-between gap-2">
          <button
            onClick={() => { onTabChange('help_center'); onClose(); }}
            className="flex-1 py-2 px-2 text-xs text-[#A9A89C] hover:text-[#F9F9F7] hover:bg-[#3D3D30] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LifeBuoy className="w-4 h-4" />
            <span>Help Center</span>
          </button>
          <button
            onClick={() => { onClose(); onOpenLogout(); }}
            className="flex-1 py-2 px-2 text-xs text-[#E68A8A] hover:text-[#FF9999] hover:bg-[#3D3D30] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
