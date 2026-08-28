import React from 'react';
import { 
  Search, 
  Bell, 
  Globe, 
  Wifi, 
  WifiOff, 
  Sparkles,
  CheckCircle2,
  X
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
  userAvatar
}) => {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showLangMenu, setShowLangMenu] = React.useState(false);
  const [showRoleMenu, setShowRoleMenu] = React.useState(false);

  const t = translations[currentLanguage] || translations.en;
  const unreadCount = notifications.filter(n => !n.read).length;

  const roleLabels: Record<UserRole, { label: string; badgeColor: string }> = {
    student: { label: t.roleStudent || 'Student', badgeColor: 'bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6]' },
    recruiter: { label: t.roleRecruiter || 'Industry Recruiter', badgeColor: 'bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1]' },
    academician: { label: t.roleAcademician || 'Faculty / Academician', badgeColor: 'bg-[#F7F3E8] text-[#7A6A32] border border-[#E9E0C7]' },
    institution_admin: { label: t.roleAdmin || 'Institution Admin', badgeColor: 'bg-[#F4ECE4] text-[#8C5E3C] border border-[#E6D4C3]' }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-4 md:px-8 h-16 bg-[#F9F9F7] border-b border-[#E5E2D9] shadow-xs">
      {/* Brand on Desktop & Mobile */}
      <div className="flex items-center gap-3">
        <div className="md:hidden flex items-center gap-2 cursor-pointer" onClick={() => onNavigateToTab('profile')}>
          <div className="w-8 h-8 rounded-lg bg-[#5A5A40] flex items-center justify-center text-[#F9F9F7] font-bold text-sm">
            SN
          </div>
          <span className="font-bold text-lg text-[#2D2D2A] tracking-tight font-serif-display">SkillBridge</span>
        </div>
        <span className="hidden md:inline-block font-bold text-xl text-[#2D2D2A] tracking-tight font-serif-display">
          {t.portalName}
        </span>
      </div>

      {/* Global Search Bar */}
      <div className="flex flex-1 justify-center max-w-lg mx-2 md:mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7C7B76]" />
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder || "Search skills, opportunities, FDPs, learning..."}
            className="w-full pl-9 pr-4 py-2 bg-[#EBE8E1]/80 border border-[#E5E2D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A5A40] text-sm text-[#2D2D2A] placeholder-[#7C7B76] transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C7B76] hover:text-[#2D2D2A]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Action Controls & User Meta */}
      <div className="flex items-center gap-2 md:gap-3">
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

        {/* User Profile Avatar Thumbnail */}
        <div 
          className="cursor-pointer flex items-center gap-2 p-1 rounded-lg hover:bg-[#EBE8E1] transition-colors"
          onClick={() => onNavigateToTab('profile')}
        >
          <img
            id="top-nav-avatar"
            src={userAvatar}
            alt="User profile"
            className="w-8 h-8 rounded-full object-cover border border-[#E5E2D9] shadow-xs"
          />
        </div>
      </div>
    </nav>
  );
};
