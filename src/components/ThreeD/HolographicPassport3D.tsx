import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  QrCode, 
  BadgeCheck, 
  RotateCw, 
  Lock, 
  Cpu, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  Award
} from 'lucide-react';
import { UserProfile } from '../../types';
import { initialUserProfile } from '../../data/initialData';

interface HolographicPassport3DProps {
  profile?: UserProfile;
  onNavigateToAssessments?: () => void;
}

export const HolographicPassport3D: React.FC<HolographicPassport3DProps> = ({
  profile = initialUserProfile,
  onNavigateToAssessments
}) => {
  const currentProfile = profile || initialUserProfile;
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAutoRotate || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -16;
    const rotY = ((x - centerX) / centerX) * 16;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.4
    });
  };

  const handleMouseLeave = () => {
    if (!isAutoRotate) {
      setRotateX(0);
      setRotateY(0);
      setGlare(prev => ({ ...prev, opacity: 0 }));
    }
  };

  const currentSkills = currentProfile?.skills || [];
  const verifiedSkills = currentSkills.filter(s => s.verified);

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Controls Bar */}
      <div className="w-full flex items-center justify-between gap-2 mb-4 px-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#34583A] animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A5A40]">
            3D Holographic Identity Engine
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              isAutoRotate 
                ? 'bg-[#5A5A40] text-white border-[#484833] shadow-xs' 
                : 'bg-[#F9F9F7] text-[#5A5A40] border-[#E5E2D9] hover:bg-[#EBE8E1]'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} />
            <span>{isAutoRotate ? 'Stop 3D Spin' : '3D Orbit'}</span>
          </button>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-3 py-1 rounded-lg text-xs font-bold bg-[#33332A] text-[#F9F9F7] hover:bg-[#24241D] transition-all cursor-pointer flex items-center gap-1.5 shadow-xs border border-[#48483B]"
          >
            <Layers className="w-3.5 h-3.5 text-[#CFE0D1]" />
            <span>{isFlipped ? 'Show Front ID' : 'Flip to Ledger'}</span>
          </button>
        </div>
      </div>

      {/* 3D Perspective Card Container */}
      <div 
        className="w-full max-w-xl h-[330px] md:h-[350px] perspective-1500 cursor-grab active:cursor-grabbing select-none"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className={`w-full h-full relative preserve-3d transition-transform duration-500 ease-out rounded-2xl ${
            isAutoRotate ? 'animate-[spin_12s_linear_infinite]' : ''
          }`}
          style={{
            transform: isAutoRotate 
              ? undefined 
              : `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`,
            boxShadow: '0 25px 60px -15px rgba(45, 45, 36, 0.35), 0 0 30px 2px rgba(90, 90, 64, 0.15)'
          }}
        >
          {/* ================= FRONT SIDE ================= */}
          <div 
            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden backface-hidden border border-[#5A5A40]/40 preserve-3d"
            style={{
              background: 'linear-gradient(145deg, #2D2D24 0%, #3D3D30 50%, #20201A 100%)'
            }}
          >
            {/* Holographic Shimmer Layer */}
            <div 
              className="absolute inset-0 hologram-shimmer pointer-events-none opacity-40 mix-blend-color-dodge z-10" 
            />

            {/* Dynamic Specular Light Glare */}
            <div 
              className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-200"
              style={{
                opacity: glare.opacity,
                background: `radial-gradient(circle 350px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.5), transparent 70%)`
              }}
            />

            {/* Front Card Header */}
            <div className="relative z-30 p-5 md:p-6 flex flex-col justify-between h-full text-[#F9F9F7]">
              <div className="flex items-center justify-between border-b border-[#5A5A40]/40 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#5A5A40] flex items-center justify-center text-[#F9F9F7] font-bold text-sm shadow-md border border-[#7A7A56]">
                    <ShieldCheck className="w-5 h-5 text-[#CFE0D1]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-base tracking-tight font-serif-display text-[#F9F9F7]">
                        SKILLBRIDGE CONSORTIUM
                      </h3>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EAF1EB] text-[#34583A] font-bold">
                        VERIFIED
                      </span>
                    </div>
                    <p className="text-[11px] text-[#C5C4BA] tracking-wider uppercase">
                      Official Cryptographic Digital Passport
                    </p>
                  </div>
                </div>

                {/* Golden Microchip */}
                <div className="w-10 h-8 rounded-md gold-foil-shimmer shadow-md border border-[#FFE899]/60 flex items-center justify-center relative overflow-hidden">
                  <div className="w-6 h-5 border border-[#604200]/40 rounded-xs flex flex-col justify-around py-0.5 px-1">
                    <div className="w-full h-px bg-[#604200]/60" />
                    <div className="w-full h-px bg-[#604200]/60" />
                    <div className="w-full h-px bg-[#604200]/60" />
                  </div>
                </div>
              </div>

              {/* Front Card Body */}
              <div className="grid grid-cols-12 gap-4 items-center my-auto">
                {/* 3D Elevated Avatar */}
                <div className="col-span-4 flex flex-col items-center">
                  <div 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 border-[#D4AF37] shadow-xl relative preserve-3d"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    <img 
                      src={profile.avatar} 
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-[#2D2D24]/80 backdrop-blur-xs py-0.5 text-center">
                      <span className="text-[9px] font-bold text-[#FFE899]">GEN-IV ID</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#A9A89C] mt-1 font-mono">
                    ID: NEX-2026-8902
                  </span>
                </div>

                {/* Profile Details */}
                <div className="col-span-8 space-y-1.5" style={{ transform: 'translateZ(20px)' }}>
                  <div>
                    <span className="text-[10px] text-[#A9A89C] uppercase font-semibold tracking-wider block">Candidate Name</span>
                    <h4 className="text-lg md:text-xl font-bold text-[#F9F9F7] font-serif-display leading-tight">
                      {profile.name}
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-[#A9A89C] block">Institution</span>
                      <span className="font-semibold text-[#E6E5DB] text-[11px] truncate block">
                        {profile.institution}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#A9A89C] block">Academic GPA</span>
                      <span className="font-bold text-[#FFE899] text-xs">
                        {profile.gpa} / 4.0 (Cum Laude)
                      </span>
                    </div>
                  </div>

                  {/* Verified Badges Pill Row */}
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {verifiedSkills.slice(0, 3).map((s) => (
                      <span 
                        key={s.id}
                        className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-[#5A5A40]/80 text-[#F9F9F7] border border-[#7A7A56]"
                      >
                        <BadgeCheck className="w-3 h-3 text-[#CFE0D1]" />
                        <span>{s.name}</span>
                      </span>
                    ))}
                    {verifiedSkills.length > 3 && (
                      <span className="text-[10px] text-[#C5C4BA] self-center">
                        +{verifiedSkills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Front Card Footer */}
              <div className="border-t border-[#5A5A40]/40 pt-2.5 flex items-center justify-between text-[10px] text-[#A9A89C]">
                <div className="flex items-center gap-2">
                  <Lock className="w-3 h-3 text-[#34583A]" />
                  <span className="font-mono">SHA256: e8f9...39b2-verified</span>
                </div>
                <div className="flex items-center gap-1 text-[#FFE899] font-semibold cursor-pointer">
                  <span>Click card to inspect ledger</span>
                  <RotateCw className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

          {/* ================= BACK SIDE (REVERSE LEDGER) ================= */}
          <div 
            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden backface-hidden border border-[#5A5A40]/50 preserve-3d"
            style={{
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(145deg, #1E1E18 0%, #2A2A22 50%, #171712 100%)'
            }}
          >
            {/* Holographic Watermark */}
            <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none">
              <ShieldCheck className="w-48 h-48 text-white" />
            </div>

            <div className="relative z-30 p-5 md:p-6 flex flex-col justify-between h-full text-[#F9F9F7]">
              {/* Back Card Header */}
              <div className="flex items-center justify-between border-b border-[#48483B] pb-2.5">
                <div>
                  <span className="text-[10px] text-[#CFE0D1] uppercase font-bold tracking-widest block">
                    CONSORTIUM VERIFICATION LEDGER
                  </span>
                  <h4 className="text-sm font-bold text-[#F9F9F7]">
                    Cryptographic Endorsement Block #891,402
                  </h4>
                </div>
                <div className="p-1 bg-white rounded-md">
                  <QrCode className="w-8 h-8 text-black" />
                </div>
              </div>

              {/* Verified Competency Breakdown */}
              <div className="space-y-2 my-auto" style={{ transform: 'translateZ(15px)' }}>
                <span className="text-[10px] text-[#A9A89C] uppercase font-semibold">
                  Assessed Competency Matrix
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {currentSkills.slice(0, 4).map((skill) => (
                    <div key={skill.id} className="bg-[#33332A]/80 p-2 rounded-lg border border-[#48483B]">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-[#F9F9F7] text-[11px]">{skill.name}</span>
                        <span className="text-[10px] font-mono text-[#CFE0D1]">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#20201A] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#5A5A40] to-[#CFE0D1] rounded-full"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Authority Signature */}
              <div className="border-t border-[#48483B] pt-2 flex items-center justify-between text-[10px] text-[#A9A89C]">
                <div>
                  <span className="block text-[9px] text-[#7C7B76]">SIGNING AUTHORITY</span>
                  <span className="font-serif-display italic text-[#E6E5DB] text-xs">
                    Dr. Marcus Vance, Dean of Graduate Studies
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-[9px] text-[#7C7B76]">BLOCKCHAIN STATUS</span>
                  <span className="text-[#34583A] bg-[#EAF1EB] px-2 py-0.5 rounded font-bold">
                    IMMUTABLE ON-CHAIN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-[#7C7B76] mt-3 text-center">
        💡 Move your cursor over the passport for dynamic 3D perspective &amp; reflection. Click anywhere on the card to flip between ID &amp; Blockchain Ledger.
      </p>
    </div>
  );
};
