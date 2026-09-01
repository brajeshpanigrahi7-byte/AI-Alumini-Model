import React, { useState } from 'react';
import { X, ShieldCheck, Share2, Copy, CheckCircle, ExternalLink, QrCode, Award, GraduationCap, MapPin } from 'lucide-react';
import { UserProfile } from '../../types';

interface PublicPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export const PublicPortfolioModal: React.FC<PublicPortfolioModalProps> = ({
  isOpen,
  onClose,
  profile
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const publicUrl = `https://skillbridge.nexus.edu/portfolio/${profile.name.toLowerCase()}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F9F9F7] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-[#E5E2D9] animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#34583A]" />
            <h3 className="text-lg font-bold text-[#2D2D2A] font-serif-display">Verified Public Portfolio View</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#7C7B76] hover:text-[#2D2D2A] hover:bg-[#E8E8DF] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sharable link bar */}
        <div className="bg-[#E8E8DF] p-3 rounded-xl flex items-center justify-between gap-2 mb-6 border border-[#D5D5C6]">
          <div className="flex items-center gap-2 truncate text-xs text-[#2D2D2A] font-mono">
            <ExternalLink className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
            <span className="truncate">{publicUrl}</span>
          </div>
          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-[#F9F9F7] text-[#5A5A40] border border-[#D5D5C6] rounded-lg text-xs font-bold hover:bg-[#E8E8DF] shrink-0 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {copied ? <CheckCircle className="w-3.5 h-3.5 text-[#34583A]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Link'}</span>
          </button>
        </div>

        {/* Live Public Portfolio Card */}
        <div className="border border-[#E5E2D9] rounded-xl p-6 bg-[#F2F1ED] space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <img
              src={profile.avatar}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full object-cover border-2 border-[#F9F9F7] shadow-md"
            />
            <div className="flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h4 className="text-xl font-bold text-[#2D2D2A] font-serif-display">{profile.name}</h4>
                <span className="text-[10px] bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1] font-bold px-2 py-0.5 rounded-full">
                  ✓ Verified by Columbia Univ
                </span>
              </div>
              <p className="text-xs font-semibold text-[#5F5E59] mt-0.5">{profile.title}</p>
              <p className="text-xs text-[#7C7B76] mt-0.5 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3 h-3" /> {profile.location} • GPA {profile.gpa}
              </p>
            </div>
          </div>

          <div className="border-t border-[#E5E2D9] pt-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#7C7B76] mb-2">Verified Top Competencies</h5>
            <div className="flex flex-wrap gap-1.5">
              {(profile?.skills || []).slice(0, 6).map((s) => (
                <span key={s.id} className="text-xs bg-[#F9F9F7] text-[#2D2D2A] border border-[#E5E2D9] px-2.5 py-1 rounded-full font-semibold">
                  {s.name} ({s.proficiency}%)
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-[#E5E2D9] pt-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#7C7B76] mb-2">Cryptographic Seal</h5>
            <p className="text-[11px] font-mono text-[#5F5E59] bg-[#F9F9F7] p-2.5 rounded border border-[#E5E2D9]">
              ROOT_SIGNATURE_PROOF: 0x8f2db14e99a120fc64bca883109e22aa
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end pt-4 mt-4 border-t border-[#E5E2D9]">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#5A5A40] text-[#F9F9F7] rounded-lg text-xs font-bold hover:bg-[#4A4A33] cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
