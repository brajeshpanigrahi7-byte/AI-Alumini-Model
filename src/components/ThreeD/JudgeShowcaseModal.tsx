import React, { useState } from 'react';
import { 
  Trophy, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Rotate3d, 
  Award, 
  CheckCircle2, 
  Cpu, 
  TrendingUp, 
  Users, 
  Building2, 
  GraduationCap,
  Layers,
  ArrowRight,
  Flame
} from 'lucide-react';
import { UserProfile, SkillItem } from '../../types';
import { initialUserProfile } from '../../data/initialData';
import { HolographicPassport3D } from './HolographicPassport3D';
import { Interactive3DSkillSphere } from './Interactive3DSkillSphere';
import { ThreeDCard } from './ThreeDCard';

interface JudgeShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: UserProfile;
}

export const JudgeShowcaseModal: React.FC<JudgeShowcaseModalProps> = ({
  isOpen,
  onClose,
  profile = initialUserProfile
}) => {
  const [activeView, setActiveView] = useState<'passport' | 'constellation' | 'architecture' | 'impact'>('passport');

  if (!isOpen) return null;

  const currentProfile = profile || initialUserProfile;
  const currentSkills = currentProfile.skills || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#F9F9F7] rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl border border-[#E5E2D9] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#2D2D24] via-[#3D3D30] to-[#2D2D24] text-[#F9F9F7] px-6 py-4 flex items-center justify-between border-b border-[#48483B] relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#FFE899]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8B6508] flex items-center justify-center shadow-lg border border-[#FFE899]/60">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FFE899]/20 text-[#FFE899] border border-[#FFE899]/40 tracking-wider uppercase flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[#FFE899]" />
                  Hackathon Finalist Showcase
                </span>
                <span className="text-xs text-[#CFE0D1] font-mono">v4.2 PRO</span>
              </div>
              <h2 className="text-lg md:text-xl font-bold text-[#F9F9F7] font-serif-display leading-tight">
                SkillBridge Nexus: 3D Next-Gen Innovation Deck
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#C5C4BA] hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Innovation Navigation Tabs */}
        <div className="bg-[#EBE8E1] px-6 py-2.5 flex items-center gap-2 border-b border-[#E5E2D9] overflow-x-auto">
          {[
            { id: 'passport', label: '3D Holographic Passport', icon: ShieldCheck },
            { id: 'constellation', label: '3D Skill Constellation', icon: Rotate3d },
            { id: 'architecture', label: 'Consortium Architecture', icon: Layers },
            { id: 'impact', label: 'Hackathon Impact & Metrics', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? 'bg-[#2D2D24] text-[#F9F9F7] shadow-sm' 
                    : 'text-[#5F5E59] hover:text-[#2D2D2A] hover:bg-[#DDD9CE]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#FFE899]' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeView === 'passport' && (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto mb-2">
                <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider block">
                  Feature 01 • Anti-Fraud Credential Verification
                </span>
                <h3 className="text-xl font-bold text-[#2D2D2A] font-serif-display">
                  Cryptographic 3D Skill Passport
                </h3>
                <p className="text-xs text-[#7C7B76] mt-1">
                  Eliminates resume fraud with university-signed SHA-256 tamper-proof credential tokens.
                </p>
              </div>

              <HolographicPassport3D profile={currentProfile} />
            </div>
          )}

          {activeView === 'constellation' && (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto mb-2">
                <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider block">
                  Feature 02 • Real-Time Competency Modeling
                </span>
                <h3 className="text-xl font-bold text-[#2D2D2A] font-serif-display">
                  3D Orbital Skill Constellation
                </h3>
                <p className="text-xs text-[#7C7B76] mt-1">
                  Dynamic multi-dimensional spatial mapping of verified candidate capabilities versus industry benchmarks.
                </p>
              </div>

              <Interactive3DSkillSphere skills={currentSkills} />
            </div>
          )}

          {activeView === 'architecture' && (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto mb-4">
                <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider block">
                  Consortium Architecture
                </span>
                <h3 className="text-xl font-bold text-[#2D2D2A] font-serif-display">
                  Bridging Students, Recruiters, Faculty &amp; Admins
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ThreeDCard className="h-full">
                  <div className="bg-white p-5 rounded-xl border border-[#E5E2D9] h-full flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-[#E8E8DF] flex items-center justify-center mb-3">
                        <GraduationCap className="w-5 h-5 text-[#42422E]" />
                      </div>
                      <h4 className="font-bold text-sm text-[#2D2D2A]">1. Students</h4>
                      <p className="text-xs text-[#5F5E59] mt-1.5 leading-relaxed">
                        Automated AI gap analysis, proctored benchmarks, and direct 1-click internship matching.
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#E5E2D9] text-[11px] font-bold text-[#5A5A40]">
                      85% Readiness Score
                    </div>
                  </div>
                </ThreeDCard>

                <ThreeDCard className="h-full">
                  <div className="bg-white p-5 rounded-xl border border-[#E5E2D9] h-full flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-[#EAF1EB] flex items-center justify-center mb-3">
                        <Building2 className="w-5 h-5 text-[#34583A]" />
                      </div>
                      <h4 className="font-bold text-sm text-[#2D2D2A]">2. Industry Recruiters</h4>
                      <p className="text-xs text-[#5F5E59] mt-1.5 leading-relaxed">
                        Pre-screened talent pools with verified skill passports, hiring pipeline kanban, and drive metrics.
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#E5E2D9] text-[11px] font-bold text-[#34583A]">
                      45 Campus Offers Issued
                    </div>
                  </div>
                </ThreeDCard>

                <ThreeDCard className="h-full">
                  <div className="bg-white p-5 rounded-xl border border-[#E5E2D9] h-full flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-[#F7F3E8] flex items-center justify-center mb-3">
                        <Users className="w-5 h-5 text-[#7A6A32]" />
                      </div>
                      <h4 className="font-bold text-sm text-[#2D2D2A]">3. Faculty &amp; Mentors</h4>
                      <p className="text-xs text-[#5F5E59] mt-1.5 leading-relaxed">
                        1-click cryptographic milestone verification and curriculum-industry alignment scorecards.
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#E5E2D9] text-[11px] font-bold text-[#7A6A32]">
                      94% Course Alignment
                    </div>
                  </div>
                </ThreeDCard>

                <ThreeDCard className="h-full">
                  <div className="bg-white p-5 rounded-xl border border-[#E5E2D9] h-full flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-[#F4ECE4] flex items-center justify-center mb-3">
                        <ShieldCheck className="w-5 h-5 text-[#8C5E3C]" />
                      </div>
                      <h4 className="font-bold text-sm text-[#2D2D2A]">4. Institution Admins</h4>
                      <p className="text-xs text-[#5F5E59] mt-1.5 leading-relaxed">
                        NAAC A++ accreditation governance, corporate MoU contracts, and NIRF rank metrics.
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#E5E2D9] text-[11px] font-bold text-[#8C5E3C]">
                      NAAC 3.78/4.0 Grade
                    </div>
                  </div>
                </ThreeDCard>
              </div>
            </div>
          )}

          {activeView === 'impact' && (
            <div className="space-y-6">
              <div className="bg-[#2D2D24] text-[#F9F9F7] p-6 rounded-2xl border border-[#48483B]">
                <div className="flex items-center gap-2 text-[#FFE899] text-xs font-bold uppercase mb-2">
                  <Trophy className="w-4 h-4" />
                  <span>Why SkillBridge Nexus Wins the Hackathon</span>
                </div>
                <h3 className="text-2xl font-bold font-serif-display mb-3">
                  Measurable Real-World Impact
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="text-3xl font-bold text-[#FFE899] font-serif-display block">100%</span>
                    <span className="text-xs text-[#C5C4BA] mt-1 block font-semibold">Zero Fake Credentials</span>
                    <p className="text-[11px] text-[#A9A89C] mt-1">Cryptographically signed by authorized faculty.</p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="text-3xl font-bold text-[#CFE0D1] font-serif-display block">3.4x</span>
                    <span className="text-xs text-[#C5C4BA] mt-1 block font-semibold">Faster Recruiter Placement</span>
                    <p className="text-[11px] text-[#A9A89C] mt-1">Pre-screened test scores match enterprise requirements.</p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="text-3xl font-bold text-[#E6D4C3] font-serif-display block">42 MoUs</span>
                    <span className="text-xs text-[#C5C4BA] mt-1 block font-semibold">Active Enterprise Alliances</span>
                    <p className="text-[11px] text-[#A9A89C] mt-1">Direct corporate pipeline with Siemens, Google, Tesla.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#EBE8E1] px-6 py-3 border-t border-[#E5E2D9] flex items-center justify-between">
          <span className="text-xs text-[#7C7B76]">
            Built with React 19, TypeScript, Tailwind CSS &amp; 3D Perspective Physics.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#2D2D24] text-[#F9F9F7] rounded-lg text-xs font-bold hover:bg-[#1E1E18] transition-colors cursor-pointer"
          >
            Close Presentation Deck
          </button>
        </div>
      </div>
    </div>
  );
};
