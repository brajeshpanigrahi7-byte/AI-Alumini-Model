import React, { useState } from 'react';
import { 
  LogOut, 
  X, 
  ShieldCheck, 
  Smartphone, 
  Laptop, 
  Globe, 
  KeyRound, 
  UserCheck, 
  AlertTriangle,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { UserRole, UserProfile } from '../../types';
import { initialSessionData, mockAvailableAccounts } from '../../data/initialData';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSwitchAccount: (account: typeof mockAvailableAccounts[0]) => void;
  onConfirmLogout: (allDevices: boolean) => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSwitchAccount,
  onConfirmLogout
}) => {
  const [selectedTab, setSelectedTab] = useState<'session' | 'switch'>('session');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!isOpen) return null;

  const handleLogout = (allDevices: boolean) => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsLoggingOut(false);
      onConfirmLogout(allDevices);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F9F9F7] rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-[#E5E2D9] animate-in zoom-in-95 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8E8DF] flex items-center justify-center border border-[#D5D5C6]">
              <LogOut className="w-4 h-4 text-[#5A5A40]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#2D2D2A] font-serif-display">Session & Account Management</h3>
              <p className="text-xs text-[#7C7B76]">Manage active authentication tokens or switch test accounts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7C7B76] hover:text-[#2D2D2A] hover:bg-[#E8E8DF] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 p-1 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9]">
          <button
            onClick={() => setSelectedTab('session')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              selectedTab === 'session'
                ? 'bg-[#F9F9F7] text-[#2D2D2A] shadow-xs'
                : 'text-[#7C7B76] hover:text-[#2D2D2A]'
            }`}
          >
            Active Session Security
          </button>
          <button
            onClick={() => setSelectedTab('switch')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              selectedTab === 'switch'
                ? 'bg-[#F9F9F7] text-[#2D2D2A] shadow-xs'
                : 'text-[#7C7B76] hover:text-[#2D2D2A]'
            }`}
          >
            Switch Test Persona ({mockAvailableAccounts.length})
          </button>
        </div>

        {/* Content: Active Session Security */}
        {selectedTab === 'session' && (
          <div className="space-y-4">
            {/* User Profile Snippet */}
            <div className="p-4 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9] flex items-center gap-3">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-12 h-12 rounded-full object-cover border border-[#E5E2D9]"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#2D2D2A] font-serif-display truncate">{userProfile.name}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EAF1EB] text-[#34583A] font-bold border border-[#CFE0D1]">
                    Active
                  </span>
                </div>
                <p className="text-xs text-[#5F5E59] truncate font-mono">{userProfile.email}</p>
                <p className="text-[11px] text-[#7C7B76] truncate">{userProfile.institution}</p>
              </div>
            </div>

            {/* Session Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#F2F1ED]/60 rounded-xl border border-[#E5E2D9] space-y-1">
                <div className="flex items-center gap-1.5 text-[#7C7B76]">
                  <Laptop className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>Device & Client</span>
                </div>
                <p className="font-bold text-[#2D2D2A]">{initialSessionData.device}</p>
                <p className="text-[11px] text-[#5F5E59]">{initialSessionData.browser}</p>
              </div>

              <div className="p-3 bg-[#F2F1ED]/60 rounded-xl border border-[#E5E2D9] space-y-1">
                <div className="flex items-center gap-1.5 text-[#7C7B76]">
                  <Globe className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>Network Location</span>
                </div>
                <p className="font-bold text-[#2D2D2A]">{initialSessionData.location}</p>
                <p className="text-[11px] text-[#5F5E59] font-mono">{initialSessionData.ipAddress}</p>
              </div>
            </div>

            {/* Cryptographic Session Token */}
            <div className="p-3 bg-[#F2F1ED] rounded-xl border border-[#E5E2D9] space-y-1">
              <div className="flex items-center justify-between text-[11px] text-[#7C7B76]">
                <span className="flex items-center gap-1">
                  <KeyRound className="w-3 h-3 text-[#5A5A40]" /> Signed Session JWT
                </span>
                <span className="text-[#34583A] font-bold">256-Bit Encrypted</span>
              </div>
              <p className="text-[10px] font-mono text-[#5F5E59] break-all bg-[#F9F9F7] p-2 rounded border border-[#E5E2D9]">
                {initialSessionData.sessionToken}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-[#E5E2D9]">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-[#7C7B76] hover:bg-[#E8E8DF] rounded-lg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleLogout(false)}
                disabled={isLoggingOut}
                className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-[#2D2D2A] bg-[#E8E8DF] hover:bg-[#D5D5C6] rounded-lg border border-[#D5D5C6] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isLoggingOut ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
                <span>Log Out This Device</span>
              </button>
              <button
                type="button"
                onClick={() => handleLogout(true)}
                disabled={isLoggingOut}
                className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-[#F9F9F7] bg-[#5A5A40] hover:bg-[#4A4A33] rounded-lg shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Log Out All Sessions</span>
              </button>
            </div>
          </div>
        )}

        {/* Content: Switch Test Account */}
        {selectedTab === 'switch' && (
          <div className="space-y-4">
            <p className="text-xs text-[#5F5E59]">
              Instantly switch into different persona roles to test role-specific access controls, skill endorsements, and opportunity postings.
            </p>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {mockAvailableAccounts.map((acc) => {
                const isCurrent = acc.email === userProfile.email;
                return (
                  <div
                    key={acc.userId}
                    onClick={() => {
                      onSwitchAccount(acc);
                      onClose();
                    }}
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      isCurrent
                        ? 'bg-[#E8E8DF] border-[#5A5A40] shadow-xs'
                        : 'bg-[#F2F1ED]/50 border-[#E5E2D9] hover:bg-[#E8E8DF]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={acc.avatar}
                        alt={acc.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#E5E2D9]"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-[#2D2D2A] font-serif-display truncate">{acc.name}</h4>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F9F9F7] border border-[#E5E2D9] text-[#5A5A40] font-bold capitalize">
                            {acc.role.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5F5E59] truncate">{acc.title}</p>
                        <p className="text-[10px] text-[#7C7B76] truncate font-mono">{acc.email}</p>
                      </div>
                    </div>

                    {isCurrent ? (
                      <span className="text-xs font-bold text-[#34583A] flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-[#34583A]" /> Active
                      </span>
                    ) : (
                      <button className="text-xs font-bold text-[#5A5A40] hover:underline shrink-0">
                        Switch &rarr;
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#E5E2D9] flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#7C7B76] hover:bg-[#E8E8DF] rounded-lg cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
