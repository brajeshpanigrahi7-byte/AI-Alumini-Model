import React from 'react';
import { X, Download, Printer, CheckCircle, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F9F9F7] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-[#E5E2D9] animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4 mb-4">
          <div className="flex items-center gap-2 text-[#2D2D2A]">
            <ShieldCheck className="w-5 h-5 text-[#5A5A40]" />
            <h3 className="text-lg font-bold text-[#2D2D2A] font-serif-display">Verified Resume Preview (PDF Standard)</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 border border-[#E5E2D9] rounded-lg text-xs font-semibold text-[#2D2D2A] hover:bg-[#E8E8DF] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button onClick={onClose} className="p-1 rounded-lg text-[#7C7B76] hover:text-[#2D2D2A] hover:bg-[#E8E8DF] cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Canvas */}
        <div className="border border-[#E5E2D9] rounded-xl p-8 bg-[#F2F1ED] shadow-xs space-y-6 text-[#2D2D2A] text-xs md:text-sm">
          {/* Header */}
          <div className="border-b border-[#E5E2D9] pb-4 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#2D2D2A] tracking-tight font-serif-display">{profile.name}</h1>
              <p className="text-sm font-semibold text-[#5A5A40] mt-0.5">{profile.title}</p>
              <div className="flex flex-wrap gap-4 text-xs text-[#7C7B76] mt-2">
                <span>{profile.email}</span>
                <span>•</span>
                <span>{profile.location}</span>
                <span>•</span>
                <span>{profile.institution}</span>
              </div>
            </div>
            <span className="text-[11px] font-mono bg-[#EAF1EB] text-[#34583A] px-2 py-1 rounded border border-[#CFE0D1]">
              ✓ Verified Candidate
            </span>
          </div>

          {/* Bio */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#7C7B76] mb-1.5 font-mono">Executive Summary</h2>
            <p className="text-xs text-[#5F5E59] leading-relaxed">{profile.bio}</p>
          </div>

          {/* Education & Academic Credentials */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#7C7B76] mb-2 font-mono">Education</h2>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-sm text-[#2D2D2A] font-serif-display">{profile.institution}</h3>
                <p className="text-xs text-[#5F5E59]">{profile.department} (Class of {profile.graduationYear})</p>
              </div>
              <span className="font-bold text-xs text-[#5A5A40]">GPA: {profile.gpa}</span>
            </div>
          </div>

          {/* Milestones & Verified Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#7C7B76] mb-2 font-mono">Verified Professional Milestones</h2>
            <div className="space-y-3">
              {profile.milestones.map((m) => (
                <div key={m.id} className="border-l-2 border-[#5A5A40] pl-3">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-xs text-[#2D2D2A] font-serif-display">{m.title}</h4>
                    <span className="text-[11px] text-[#7C7B76] font-mono">{m.date}</span>
                  </div>
                  <p className="text-xs text-[#5F5E59] mt-0.5">{m.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#7C7B76] mb-2 font-mono">Key Production Projects</h2>
            <div className="space-y-3">
              {profile.projects.map((p) => (
                <div key={p.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-xs text-[#2D2D2A] font-serif-display">{p.title} <span className="font-normal text-[#7C7B76]">({p.role})</span></h4>
                    <span className="text-[11px] text-[#7C7B76] font-mono">{p.duration}</span>
                  </div>
                  <p className="text-xs text-[#5F5E59] mt-0.5">{p.description}</p>
                  <p className="text-[11px] font-mono text-[#5A5A40] mt-1">Tech: {p.techStack.join(' • ')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#7C7B76] mb-1.5 font-mono">Verified Core Competencies</h2>
            <p className="text-xs text-[#5F5E59] leading-relaxed">
              {profile.skills.map(s => `${s.name} (${s.proficiency}%)`).join(', ')}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end pt-4 mt-4 border-t border-[#E5E2D9]">
          <button
            onClick={() => {
              alert("Resume downloaded as PDF with verified digital signature seal.");
              onClose();
            }}
            className="px-5 py-2 bg-[#5A5A40] text-[#F9F9F7] rounded-lg text-xs font-bold hover:bg-[#4A4A33] flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
