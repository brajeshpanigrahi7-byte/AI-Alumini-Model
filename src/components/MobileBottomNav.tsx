import React from 'react';
import { LayoutDashboard, BadgeCheck, HelpCircle, User } from 'lucide-react';
import { ActiveTab } from '../types';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange
}) => {
  const items = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'skill_passport', label: 'Skills', icon: BadgeCheck },
    { id: 'assessments', label: 'Tests', icon: HelpCircle },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-16 bg-[#F9F9F7] shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t border-[#E5E2D9] rounded-t-xl">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id as ActiveTab)}
            className={`flex flex-col items-center justify-center transition-all w-16 h-12 rounded-xl cursor-pointer ${
              isActive
                ? 'bg-[#5A5A40] text-[#F9F9F7] font-bold shadow-xs scale-95'
                : 'text-[#5F5E59] hover:bg-[#EBE8E1]'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-semibold mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
