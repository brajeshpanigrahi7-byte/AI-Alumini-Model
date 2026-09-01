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
  Sparkles
} from 'lucide-react';
import { ActiveTab, LanguageCode, UserRole } from '../types';
import { translations } from '../data/initialData';

interface SideNavBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenPostOpportunity: () => void;
  onOpenLogout: () => void;
  onOpenJudgeShowcase?: () => void;
  currentLanguage: LanguageCode;
  currentRole: UserRole;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({
  activeTab,
  onTabChange,
  onOpenPostOpportunity,
  onOpenLogout,
  onOpenJudgeShowcase,
  currentLanguage,
  currentRole
}) => {
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

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen py-6 px-3 bg-[#2D2D24] text-[#C5C4BA] shadow-xl w-[280px] z-50 overflow-y-auto border-r border-[#3E3E32]">
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-5 px-3 mt-1 cursor-pointer" onClick={() => onTabChange('profile')}>
        <div className="w-10 h-10 bg-[#E8E8DF] rounded-lg flex items-center justify-center shadow-xs">
          <Building2 className="w-6 h-6 text-[#42422E]" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[#F9F9F7] tracking-tight leading-tight font-serif-display">SkillBridge Nexus</h2>
          <p className="text-xs text-[#A3A380]">{t.enterprisePortal || 'Enterprise Portal'}</p>
        </div>
      </div>

      {/* 3D Judge Showcase Button in Sidebar */}
      {onOpenJudgeShowcase && (
        <button
          id="sidebar-judge-showcase-btn"
          onClick={onOpenJudgeShowcase}
          className="mx-3 mb-3 bg-gradient-to-r from-[#AA771C] via-[#D4AF37] to-[#8B6508] hover:opacity-95 text-[#1E1E18] font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all duration-150 cursor-pointer border border-[#FFE899]/70 animate-pulse"
        >
          <Trophy className="w-4 h-4 text-[#1E1E18]" />
          <span>3D Judge Showcase Deck</span>
        </button>
      )}

      {/* Post Opportunity Action Button */}
      <button
        id="sidebar-post-opportunity-btn"
        onClick={onOpenPostOpportunity}
        className="mx-3 mb-5 bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] font-semibold text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-all duration-150 hover:shadow-md cursor-pointer border border-[#6B6B4D]"
      >
        <PlusCircle className="w-4 h-4" />
        <span>{t.postOpportunity || 'Post Opportunity'}</span>
      </button>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => onTabChange(item.id as ActiveTab)}
              className={`flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left cursor-pointer ${
                isActive
                  ? 'text-[#F9F9F7] bg-[#404033] border-l-4 border-[#A3A380] shadow-xs font-semibold'
                  : 'text-[#B5B4A8] hover:text-[#F9F9F7] hover:bg-[#3D3D30]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#D4D4B8]' : 'text-[#8E8D81]'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer Items */}
      <div className="mt-auto flex flex-col gap-1 border-t border-[#3E3E32] pt-4 px-1">
        <button 
          id="sidebar-help-center-btn"
          onClick={() => onTabChange('help_center')}
          className={`flex items-center gap-3 px-3 py-2 text-xs rounded-lg transition-colors text-left cursor-pointer ${
            activeTab === 'help_center'
              ? 'text-[#F9F9F7] bg-[#404033] font-semibold'
              : 'text-[#A9A89C] hover:text-[#F9F9F7] hover:bg-[#3D3D30]'
          }`}
        >
          <LifeBuoy className="w-4 h-4 text-[#D4D4B8]" />
          <span>{t.helpCenter || 'Help Center'}</span>
        </button>
        <button 
          id="sidebar-logout-btn"
          onClick={onOpenLogout}
          className="flex items-center gap-3 text-[#A9A89C] hover:text-[#F9F9F7] px-3 py-2 text-xs rounded-lg hover:bg-[#3D3D30] transition-colors text-left cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>{t.logout || 'Logout'}</span>
        </button>
      </div>
    </aside>
  );
};
