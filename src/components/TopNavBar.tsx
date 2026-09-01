import React from 'react';
import { 
  Search, 
  Bell, 
  Globe, 
  Wifi, 
  WifiOff, 
  Sparkles,
  CheckCircle2,
  X,
  User,
  LogOut,
  LifeBuoy
} from 'lucide-react';
import { UserRole, LanguageCode, NotificationItem } from '../types';
import { translations } from '../data/initialData';

interface TopNavBarProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateToTab: (tab: any) => void;
  onOpenLogout?: () => void;
  onOpenJudgeShowcase?: () => void;
  userAvatar: string;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentLanguage,
  onLanguageChange,
  currentRole,
  onRoleChange,
  isOffline,
  onToggleOffline,
  notifications,
  onMarkNotificationRead,
  searchQuery,
  onSearchChange,
  onNavigateToTab,
  onOpenLogout,
  onOpenJudgeShowcase,
  userAvatar
}) => {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showLangMenu, setShowLangMenu] = React.useState(false);
  const [showRoleMenu, setShowRoleMenu] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  const t = translations[currentLanguage] || translations.en;
  const unreadCount = notifications.filter(n => !n.read).length;

  const roleLabels: Record<UserRole, { label: string; badgeColor: string }> = {
    student: { label: t.roleStudent || 'Student', badgeColor: 'bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6]' },
    recruiter: { label: t.roleRecruiter || 'Industry Recruiter', badgeColor: 'bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1]' },
    academician: { label: t.roleAcademician || 'Faculty / Academician', badgeColor: 'bg-[#F7F3E8] text-[#7A6A32] border border-[#E9E0C7]' },
    institution_admin: { label: t.roleAdmin || 'Institution Admin', badgeColor: 'bg-[#F4ECE4] text-[#8C5E3C] border border-[#E6D4C3]' }
  };

  // Quick suggestions for global search
  const quickSearchItems = [
    { title: 'Machine Learning & Python Assessments', category: 'Assessments', tab: 'assessments', role: 'student' },
    { title: 'Siemens Enterprise AI Internship', category: 'Opportunities', tab: 'opportunities', role: 'student' },
    { title: 'Digital Skill Passport Verification', category: 'Passport', tab: 'skill_passport', role: 'student' },
    { title: 'Faculty Development Program (FDP)', category: 'Faculty', tab: 'academician_hub', role: 'academician' },
    { title: 'Institution NAAC & ABET Governance', category: 'Accreditation', tab: 'analytics', role: 'institution_admin' },
    { title: 'Document Vault & Degree Certificates', category: 'Documents', tab: 'documents', role: 'student' },
    { title: 'Industry Collaboration MoUs', category: 'Industry', tab: 'collaboration', role: 'recruiter' }
  ];

  const matchingSuggestions = searchQuery.trim()
    ? quickSearchItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 md:left-[280px] w-full md:w-[calc(100%-280px)] z-40 flex justify-between items-center px-4 md:px-6 h-16 bg-[#F9F9F7] border-b border-[#E5E2D9] shadow-xs">
      {/* Brand / Context Indicator on Mobile and Desktop */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Mobile Brand Logo */}
        <div className="md:hidden flex items-center gap-2 cursor-pointer" onClick={() => onNavigateToTab('profile')}>
          <div className="w-8 h-8 rounded-lg bg-[#5A5A40] flex items-center justify-center text-[#F9F9F7] font-bold text-sm">
            SN
          </div>
          <span className="font-bold text-base text-[#2D2D2A] tracking-tight font-serif-display">SkillBridge</span>
        </div>

        {/* Desktop Portal Context Chip */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#EBE8E1]/70 border border-[#E5E2D9] text-[11px] font-medium text-[#5F5E59]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="truncate max-w-[140px] xl:max-w-[200px]">Live Skill Passport Ledger</span>
        </div>
      </div>

      {/* Global Search Bar - Properly centered with ample room */}
      <div ref={searchContainerRef} className="flex flex-1 justify-center max-w-lg lg:max-w-xl mx-2 md:mx-4 relative">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7C7B76] pointer-events-none" />
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setIsSearchFocused(true);
            }}
            placeholder={t.searchPlaceholder || "Search skills, assessments, jobs, credentials..."}
            className="w-full pl-9 pr-8 py-2 bg-[#EBE8E1]/80 hover:bg-[#EBE8E1] focus:bg-[#FFFFFF] border border-[#E5E2D9] focus:border-[#5A5A40] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-xs sm:text-sm text-[#2D2D2A] placeholder-[#7C7B76] transition-all shadow-2xs"
          />
          {searchQuery && (
            <button 
              onClick={() => {
                onSearchChange('');
                setIsSearchFocused(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C7B76] hover:text-[#2D2D2A] p-0.5 rounded-full hover:bg-[#E5E2D9] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Interactive Search Autocomplete / Quick Navigation Dropdown */}
        {isSearchFocused && searchQuery.trim().length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#F9F9F7] rounded-xl shadow-xl border border-[#E5E2D9] py-2 z-50 animate-in fade-in slide-in-from-top-1 overflow-hidden">
            <div className="px-3 py-1.5 text-[10px] font-bold text-[#7C7B76] uppercase tracking-wider border-b border-[#E5E2D9] flex justify-between items-center">
              <span>Quick Navigation &amp; Results</span>
              <span>{matchingSuggestions.length} found</span>
            </div>

            {matchingSuggestions.length > 0 ? (
              <div className="max-h-64 overflow-y-auto divide-y divide-[#E5E2D9]/60">
                {matchingSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onNavigateToTab(item.tab);
                      setIsSearchFocused(false);
                    }}
                    className="w-full text-left px-3.5 py-2.5 hover:bg-[#EBE8E1] transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-semibold text-[#2D2D2A] group-hover:text-[#5A5A40] transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-[#7C7B76]">{item.category}</p>
                    </div>
                    <span className="text-[10px] font-bold text-[#5A5A40] bg-[#E8E8DF] px-2 py-0.5 rounded border border-[#D5D5C6]">
                      Jump to view &rarr;
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-[#7C7B76]">
                No direct match for &quot;{searchQuery}&quot;. Searching across all portal records...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Controls & User Meta */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Judge Showcase 3D Button */}
        {onOpenJudgeShowcase && (
          <button
            id="judge-showcase-topbar-btn"
            onClick={onOpenJudgeShowcase}
            title="Open 3D Judge Showcase Deck & Holographic Passport"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-[#2D2D24] via-[#48483B] to-[#2D2D24] text-[#FFE899] border border-[#FFE899]/40 hover:border-[#FFE899] transition-all cursor-pointer shadow-sm hover:shadow-md animate-pulse"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFE899]" />
            <span className="hidden sm:inline">3D Judge Deck</span>
          </button>
        )}

        {/* Offline Simulator Switch */}
        <button
          id="toggle-offline-btn"
          onClick={onToggleOffline}
          title={isOffline ? "Offline Mode (Click to connect)" : "Online Mode (Click to simulate offline)"}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            isOffline 
              ? 'bg-[#E8E8DF] text-[#42422E] border-[#D5D5C6]' 
              : 'bg-[#EAF1EB] text-[#34583A] border-[#CFE0D1] hidden sm:flex'
          }`}
        >
          {isOffline ? <WifiOff className="w-3.5 h-3.5 text-[#5A5A40]" /> : <Wifi className="w-3.5 h-3.5 text-[#34583A]" />}
          <span className="hidden lg:inline">{isOffline ? t.offlineStatus : t.onlineStatus}</span>
        </button>

        {/* Role Switcher Pill */}
        <div className="relative">
          <button
            id="role-selector-btn"
            onClick={() => { setShowRoleMenu(!showRoleMenu); setShowLangMenu(false); setShowNotifications(false); }}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${roleLabels[currentRole].badgeColor} hover:opacity-90 transition-all cursor-pointer`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{roleLabels[currentRole].label}</span>
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-[#F9F9F7] rounded-xl shadow-xl border border-[#E5E2D9] py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 text-xs font-semibold text-[#7C7B76] uppercase tracking-wider">
                {t.switchRole}
              </div>
              {(['student', 'recruiter', 'academician', 'institution_admin'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    onRoleChange(role);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#EBE8E1] transition-colors cursor-pointer ${
                    currentRole === role ? 'font-bold text-[#2D2D2A] bg-[#EBE8E1]/80' : 'text-[#5F5E59]'
                  }`}
                >
                  <span>{roleLabels[role].label}</span>
                  {currentRole === role && <CheckCircle2 className="w-4 h-4 text-[#5A5A40]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div className="relative">
          <button
            id="language-dropdown-btn"
            onClick={() => { setShowLangMenu(!showLangMenu); setShowRoleMenu(false); setShowNotifications(false); }}
            className="p-2 text-[#5F5E59] hover:bg-[#EBE8E1] transition-colors rounded-full flex items-center justify-center cursor-pointer"
            title="Change Language"
          >
            <Globe className="w-4 h-4" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-[#F9F9F7] rounded-xl shadow-xl border border-[#E5E2D9] py-2 z-50 animate-in fade-in slide-in-from-top-2">
              {[
                { code: 'en', label: 'English (US)' },
                { code: 'es', label: 'Español' },
                { code: 'hi', label: 'हिन्दी (Hindi)' },
                { code: 'fr', label: 'Français' },
                { code: 'de', label: 'Deutsch' },
                { code: 'ja', label: '日本語 (Japanese)' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code as LanguageCode);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#EBE8E1] transition-colors cursor-pointer ${
                    currentLanguage === lang.code ? 'font-bold text-[#2D2D2A] bg-[#EBE8E1]/80' : 'text-[#5F5E59]'
                  }`}
                >
                  <span>{lang.label}</span>
                  {currentLanguage === lang.code && <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            id="notifications-btn"
            onClick={() => { setShowNotifications(!showNotifications); setShowLangMenu(false); setShowRoleMenu(false); }}
            className="relative p-2 text-[#5F5E59] hover:bg-[#EBE8E1] transition-colors rounded-full flex items-center justify-center cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#8C5E3C] text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#F9F9F7] rounded-xl shadow-xl border border-[#E5E2D9] py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#E5E2D9]">
                <span className="font-bold text-sm text-[#2D2D2A]">Notifications</span>
                <span className="text-xs bg-[#E8E8DF] text-[#42422E] px-2 py-0.5 rounded-full font-medium border border-[#D5D5C6]">
                  {unreadCount} unread
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-[#E5E2D9]">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-[#7C7B76]">No notifications</div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        onMarkNotificationRead(notif.id);
                        if (notif.linkTab) onNavigateToTab(notif.linkTab);
                        setShowNotifications(false);
                      }}
                      className={`p-3 text-left hover:bg-[#EBE8E1]/60 cursor-pointer transition-colors ${
                        !notif.read ? 'bg-[#EBE8E1]/30' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-xs text-[#2D2D2A] leading-tight">{notif.title}</p>
                        <span className="text-[10px] text-[#7C7B76] whitespace-nowrap">{notif.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#5F5E59] mt-1 line-clamp-2">{notif.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Thumbnail & Dropdown */}
        <div className="relative">
          <div 
            id="top-nav-avatar-btn"
            className="cursor-pointer flex items-center gap-2 p-1 rounded-lg hover:bg-[#EBE8E1] transition-colors"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
              setShowLangMenu(false);
              setShowRoleMenu(false);
            }}
          >
            <img
              id="top-nav-avatar"
              src={userAvatar}
              alt="User profile"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover border border-[#E5E2D9] ring-1 ring-[#D5D5C6]"
            />
          </div>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-[#F9F9F7] rounded-xl shadow-xl border border-[#E5E2D9] py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <button
                onClick={() => {
                  onNavigateToTab('profile');
                  setShowUserMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-xs text-[#2D2D2A] hover:bg-[#EBE8E1] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#5A5A40]" />
                <span>My Profile &amp; Settings</span>
              </button>
              {onOpenJudgeShowcase && (
                <button
                  onClick={() => {
                    onOpenJudgeShowcase();
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-[#2D2D2A] hover:bg-[#EBE8E1] flex items-center gap-2 transition-colors cursor-pointer font-bold bg-[#FFE899]/20"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#A07C1C]" />
                  <span>3D Judge Showcase Deck</span>
                </button>
              )}
              <button
                onClick={() => {
                  onNavigateToTab('help_center');
                  setShowUserMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-xs text-[#2D2D2A] hover:bg-[#EBE8E1] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <LifeBuoy className="w-3.5 h-3.5 text-[#5A5A40]" />
                <span>Help &amp; Documentation</span>
              </button>
              <div className="border-t border-[#E5E2D9] my-1" />
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  if (onOpenLogout) onOpenLogout();
                }}
                className="w-full text-left px-4 py-2 text-xs text-[#8C5E3C] hover:bg-[#EBE8E1] flex items-center gap-2 transition-colors cursor-pointer font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out / Switch</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
