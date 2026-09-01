import React, { useState } from 'react';
import { 
  Landmark, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  FileCheck2, 
  BookOpen, 
  Users, 
  ArrowUpRight, 
  Briefcase, 
  Sparkles, 
  ExternalLink,
  Clock,
  TrendingUp,
  Check,
  X,
  FileCode2,
  DollarSign,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { UserProfile, Opportunity, ActiveTab } from '../../types';

interface AcademicianDashboardProps {
  profile: UserProfile;
  opportunities: Opportunity[];
  onNavigate: (tab: ActiveTab) => void;
}

interface VerificationRequest {
  id: string;
  studentName: string;
  studentAvatar: string;
  department: string;
  gpa: string;
  submissionTitle: string;
  submissionType: 'Capstone Project' | 'Industry Internship' | 'Skill Endorsement' | 'Research Paper';
  proofUrl: string;
  submittedAt: string;
  status: 'Pending' | 'Verified' | 'Revision Requested';
}

export const AcademicianDashboard: React.FC<AcademicianDashboardProps> = ({
  profile,
  opportunities,
  onNavigate
}) => {
  const [isVerificationQueueOpen, setIsVerificationQueueOpen] = useState<boolean>(false);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState<boolean>(false);
  const [isGrantsOpen, setIsGrantsOpen] = useState<boolean>(false);

  const [verifications, setVerifications] = useState<VerificationRequest[]>([
    {
      id: 'vr1',
      studentName: 'Brajesh',
      studentAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvIFryGeZhW2_6QT4ZOGkLkLicIBavQaCCv83Z27nG_Mmb8s0iadNzAn8mecc3yUeARbDtlRVA4bknRtfnz-ULcXWbR5XXvfA0iSwCfHyCoC1SvMkEcVuf_hkYnwU1kP8S-OXuvXYkUtAob5Kk-rJ2dICHUKFWI5AG4EZghK-Ir54yHMtdIHqhRRZOUTnD_D2QwOX1ctOJJ9RKeD02anBiNGgbtHSV75YP8ViqE47Ljh7xxR8GZFmYyA',
      department: 'Data Science & Applied Statistics',
      gpa: '3.92',
      submissionTitle: 'Predictive Churn Intelligence Engine (XGBoost & SHAP)',
      submissionType: 'Capstone Project',
      proofUrl: 'https://github.com/brajesh/churn-engine',
      submittedAt: 'Today at 09:15 AM',
      status: 'Pending'
    },
    {
      id: 'vr2',
      studentName: 'Alex Chen',
      studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      department: 'Computer Science & Distributed Systems',
      gpa: '3.95',
      submissionTitle: 'Fault-Tolerant Distributed Consensus Raft Protocol in Rust',
      submissionType: 'Research Paper',
      proofUrl: 'https://github.com/alex-chen/raft-rust',
      submittedAt: 'Yesterday',
      status: 'Pending'
    },
    {
      id: 'vr3',
      studentName: 'Priya Sharma',
      studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      department: 'Cloud Computing & Infrastructure',
      gpa: '3.89',
      submissionTitle: 'GCP BigQuery Streaming Telemetry Pipeline with 99.99% SLA',
      submissionType: 'Industry Internship',
      proofUrl: 'https://github.com/priya/gcp-pipeline',
      submittedAt: '2 days ago',
      status: 'Pending'
    }
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleVerify = (id: string, newStatus: 'Verified' | 'Revision Requested') => {
    setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
    const target = verifications.find(v => v.id === id);
    const hash = '0x' + Math.random().toString(16).substring(2, 10);
    setNotification(
      newStatus === 'Verified'
        ? `Successfully endorsed ${target?.studentName}'s ${target?.submissionTitle}. Crypto signature: ${hash}`
        : `Revision requested for ${target?.studentName}.`
    );
    setTimeout(() => setNotification(null), 4000);
  };

  const pendingCount = verifications.filter(v => v.status === 'Pending').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {notification && (
        <div className="bg-[#34583A] text-[#F9F9F7] px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between shadow-lg animate-in slide-in-from-top-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#CFE0D1]" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-white/80 hover:text-white cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Academician Hero */}
      <div className="bg-[#2D2D24] text-[#F9F9F7] rounded-2xl p-6 md:p-8 shadow-md border border-[#3E3E32] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-[#7A6A32]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#D4D4B8] text-xs font-bold uppercase tracking-wider mb-2">
              <Landmark className="w-4 h-4 text-[#E6D4C3]" />
              <span>{profile.institution || 'Columbia University Department of Computer Science'}</span>
              <span className="bg-[#7A6A32] text-[#F7F3E8] px-2 py-0.5 rounded text-[10px] font-bold">Faculty Authority</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-serif-display">
              Faculty & Academician Hub — {profile.name}
            </h1>
            <p className="text-sm text-[#C5C4BA] mt-1.5 max-w-2xl leading-relaxed">
              Supervising <strong>120 graduate researchers</strong> across Distributed Systems and Data Science. You have <strong>{pendingCount} student milestone verification requests</strong> awaiting signature.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('academician_hub')}
              className="bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] px-5 py-2.5 rounded-lg text-xs md:text-sm font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2 border border-[#6B6B4D]"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Verification Queue ({pendingCount})</span>
            </button>
            <button
              onClick={() => onNavigate('learning_programs')}
              className="bg-[#F9F9F7]/10 hover:bg-[#F9F9F7]/20 text-[#F9F9F7] border border-[#F9F9F7]/20 px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-[#CFE0D1]" />
              <span>Explore FDP Programs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Academician Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs border-l-4 border-l-[#7A6A32]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Pending Verifications</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">{pendingCount}</span>
            <span className="text-xs font-bold text-[#7A6A32]">High Priority</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Includes Brajesh ML Capstone</p>
        </div>

        <div className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs border-l-4 border-l-[#34583A]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Active Research Grants</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">$680K</span>
            <span className="text-xs font-bold text-[#34583A]">NSF & Siemens</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">2 Industry-Funded Labs</p>
        </div>

        <div className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs border-l-4 border-l-[#5A5A40]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Cohort Benchmark GPA</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">3.88</span>
            <span className="text-xs font-bold text-[#5A5A40]">Top 5% Tier</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">120 Enrolled Scholars</p>
        </div>

        <div className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs border-l-4 border-l-[#8C5E3C]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Verified FDP Hours</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">140 hrs</span>
            <span className="text-xs font-bold text-[#34583A]">AICTE Certified</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Annual Sabbatical Met</p>
        </div>
      </div>

      {/* Student Milestone Verification Queue (Collapsible Dropdown Field) */}
      <div className="bg-[#F9F9F7] rounded-2xl border border-[#E5E2D9] p-6 shadow-xs space-y-6 transition-all">
        <div 
          onClick={() => setIsVerificationQueueOpen(!isVerificationQueueOpen)}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#7A6A32] text-[#F9F9F7] flex items-center justify-center flex-shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#2D2D2A] font-serif-display group-hover:text-[#7A6A32] transition-colors">
                  Student Skill &amp; Project Cryptographic Verification Queue
                </h2>
                <span className="text-xs font-bold bg-[#F7F3E8] text-[#7A6A32] border border-[#E9E0C7] px-2.5 py-0.5 rounded-full">
                  {pendingCount} Awaiting Signature
                </span>
              </div>
              <p className="text-xs text-[#5F5E59] mt-0.5">
                Review student proof submissions. Signing publishes tamper-proof endorsements directly onto their Skill Passport.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsVerificationQueueOpen(!isVerificationQueueOpen);
              }}
              className="px-3.5 py-2 bg-[#E8E8DF] hover:bg-[#D5D5C6] text-[#2D2D2A] text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isVerificationQueueOpen ? 'Hide Verification Queue' : 'Show Verification Queue'}</span>
              {isVerificationQueueOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Verification List (Shown only when opened) */}
        {isVerificationQueueOpen && (
          <div className="mt-4 pt-5 border-t border-[#E5E2D9] space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {verifications.map(req => (
              <div
                key={req.id}
                className="bg-[#F2F1ED]/70 rounded-xl p-4 border border-[#E5E2D9] hover:border-[#D5D5C6] transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <img
                    src={req.studentAvatar}
                    alt={req.studentName}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-[#D5D5C6] shadow-xs flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-[#2D2D2A]">{req.studentName}</h3>
                      <span className="bg-[#E8E8DF] text-[#42422E] px-2 py-0.5 rounded text-[10px] font-bold">
                        GPA: {req.gpa}
                      </span>
                      <span className="bg-[#F7F3E8] text-[#7A6A32] px-2 py-0.5 rounded text-[10px] font-bold border border-[#E9E0C7]">
                        {req.submissionType}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-[#2D2D2A] mt-1">{req.submissionTitle}</p>
                    <p className="text-[11px] text-[#7C7B76] mt-0.5">{req.department} • Submitted {req.submittedAt}</p>

                    <a
                      href={req.proofUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#5A5A40] hover:underline mt-1.5"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View Repository &amp; Execution Logs ({req.proofUrl})</span>
                    </a>
                  </div>
                </div>

                {/* Status / Verification Actions */}
                <div className="flex items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E5E2D9]">
                  {req.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => handleVerify(req.id, 'Revision Requested')}
                        className="px-3 py-2 bg-[#E8E8DF] hover:bg-[#D5D5C6] text-[#2D2D2A] rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Request Notes
                      </button>
                      <button
                        onClick={() => handleVerify(req.id, 'Verified')}
                        className="px-4 py-2 bg-[#34583A] hover:bg-[#28442D] text-[#F9F9F7] rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                      >
                        <Check className="w-4 h-4 text-[#CFE0D1]" />
                        <span>Approve &amp; Sign</span>
                      </button>
                    </>
                  ) : req.status === 'Verified' ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#EAF1EB] text-[#34583A] rounded-lg text-xs font-bold border border-[#CFE0D1]">
                      <CheckCircle2 className="w-4 h-4" />
                      Cryptographically Endorsed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#F4ECE4] text-[#8C5E3C] rounded-lg text-xs font-bold border border-[#E6D4C3]">
                      <Clock className="w-4 h-4" />
                      Revision Requested
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Curriculum Alignment & Research Collaboration (Collapsible Dropdowns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Curriculum Alignment */}
        <div className="bg-[#F9F9F7] rounded-2xl border border-[#E5E2D9] p-6 shadow-xs space-y-4 transition-all">
          <div 
            onClick={() => setIsCurriculumOpen(!isCurriculumOpen)}
            className="flex items-center justify-between cursor-pointer group select-none"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#7A6A32] text-[#F9F9F7] flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#2D2D2A] font-serif-display group-hover:text-[#7A6A32] transition-colors flex items-center gap-2">
                  <span>Curriculum Industry Benchmark Alignment</span>
                </h3>
                <span className="text-xs font-bold text-[#34583A] bg-[#EAF1EB] px-2 py-0.5 rounded">94% Aligned • 3 Courses</span>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsCurriculumOpen(!isCurriculumOpen);
              }}
              className="px-3 py-1.5 bg-[#E8E8DF] hover:bg-[#D5D5C6] text-[#2D2D2A] text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{isCurriculumOpen ? 'Hide' : 'Show Alignment'}</span>
              {isCurriculumOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {isCurriculumOpen && (
            <div className="mt-3 pt-3 border-t border-[#E5E2D9] space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
              {[
                { course: 'Distributed Consensus & Cloud Scale', rating: 96, status: 'Exceeds Benchmark', partner: 'Siemens Industrial AI' },
                { course: 'Python & BigQuery ML Pipelines', rating: 92, status: 'Optimal', partner: 'Google Cloud Education' },
                { course: 'Autonomous Edge IoT Telemetry', rating: 88, status: 'Aligned', partner: 'ABB Global Labs' }
              ].map(c => (
                <div key={c.course} className="p-3.5 rounded-xl bg-[#F2F1ED]/80 border border-[#E5E2D9]">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-[#2D2D2A]">{c.course}</h4>
                    <span className="text-xs font-bold text-[#34583A]">{c.rating}%</span>
                  </div>
                  <p className="text-[11px] text-[#7C7B76] mt-1">Aligned with {c.partner} Hiring Standards</p>
                  <div className="w-full bg-[#E5E2D9] h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-[#5A5A40] h-full rounded-full" style={{ width: `${c.rating}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Research Grants & Faculty Sabbaticals */}
        <div className="bg-[#F9F9F7] rounded-2xl border border-[#E5E2D9] p-6 shadow-xs space-y-4 transition-all">
          <div 
            onClick={() => setIsGrantsOpen(!isGrantsOpen)}
            className="flex items-center justify-between cursor-pointer group select-none"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#34583A] text-[#F9F9F7] flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#2D2D2A] font-serif-display group-hover:text-[#34583A] transition-colors flex items-center gap-2">
                  <span>Active Industry Grants &amp; Sabbaticals</span>
                </h3>
                <span className="text-[11px] text-[#34583A] font-bold bg-[#EAF1EB] px-2 py-0.5 rounded">$680K Active Grants</span>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsGrantsOpen(!isGrantsOpen);
              }}
              className="px-3 py-1.5 bg-[#E8E8DF] hover:bg-[#D5D5C6] text-[#2D2D2A] text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{isGrantsOpen ? 'Hide' : 'Show Grants'}</span>
              {isGrantsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {isGrantsOpen && (
            <div className="mt-3 pt-3 border-t border-[#E5E2D9] space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex justify-end">
                <button onClick={() => onNavigate('academician_hub')} className="text-xs font-bold text-[#5A5A40] hover:underline">
                  View Full Portfolio &rarr;
                </button>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F2F1ED]/80 border border-[#E5E2D9]">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#2D2D2A]">Next-Gen Edge Consensus Grant</h4>
                  <span className="px-2 py-0.5 bg-[#EAF1EB] text-[#34583A] text-[10px] font-bold rounded">$500,000</span>
                </div>
                <p className="text-[11px] text-[#7C7B76] mt-1">National Science Foundation (NSF) • 2024-2026</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F2F1ED]/80 border border-[#E5E2D9]">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#2D2D2A]">Industrial AI Predictive Safety Fellowship</h4>
                  <span className="px-2 py-0.5 bg-[#EAF1EB] text-[#34583A] text-[10px] font-bold rounded">$180,000</span>
                </div>
                <p className="text-[11px] text-[#7C7B76] mt-1">Siemens Corporate Research • Multi-Campus Study</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
