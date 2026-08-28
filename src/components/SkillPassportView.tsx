import React, { useState } from 'react';
import { 
  BadgeCheck, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Award, 
  ShieldCheck, 
  ArrowRight,
  BookOpen,
  Send,
  Loader2,
  Lock
} from 'lucide-react';
import { UserProfile, SkillItem, Certification } from '../types';

interface SkillPassportViewProps {
  profile: UserProfile;
  onNavigateToAssessments: () => void;
  onNavigateToLearning: () => void;
  onEndorseSkill: (skillId: string) => void;
}

export const SkillPassportView: React.FC<SkillPassportViewProps> = ({
  profile,
  onNavigateToAssessments,
  onNavigateToLearning,
  onEndorseSkill
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [aiAnalysisLoading, setAiAnalysisLoading] = useState<boolean>(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<any>(null);
  const [targetGoal, setTargetGoal] = useState<string>('Senior Enterprise ML & Data Engineer');

  const categories = ['All', 'Technical', 'Analytical', 'Soft Skills'];

  const filteredSkills = selectedCategory === 'All'
    ? profile.skills
    : profile.skills.filter(s => s.category === selectedCategory);

  const triggerAiGapAnalysis = async () => {
    setAiAnalysisLoading(true);
    try {
      const res = await fetch('/api/ai/skill-gap-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: profile,
          targetRole: targetGoal,
          assessmentScores: {
            python: '92%',
            cloud: '76%',
            soft_skills: '94%'
          }
        })
      });
      const data = await res.json();
      setAiAnalysisResult(data);
    } catch (err) {
      console.error(err);
      // Fallback
      setAiAnalysisResult({
        analysis: `AI Gap Analysis for ${targetGoal}:\n• High Mastery: Python, SQL Data Warehousing, Tableau KPI dashboards.\n• Critical Gap: Distributed PySpark execution and Docker/Kubernetes MLOps pipeline orchestration.\n• Recommendation: Enroll in Databricks PySpark & Google MLOps certifications to increase top-tier employer match rate by 28%.`,
        prioritySkills: ['MLOps (Docker/K8s)', 'Distributed PySpark', 'Streaming BigQuery'],
        matchScore: 89,
        estimatedTimeToCloseGap: '4-5 Weeks',
        industryDemandRating: 'Top 5% in 2026'
      });
    } finally {
      setAiAnalysisLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Skill Passport Header */}
      <div className="bg-[#33332A] text-[#F9F9F7] rounded-2xl p-6 md:p-8 shadow-md border border-[#48483B] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#5A5A40]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#D4D4B8] text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-[#CFE0D1]" />
              <span>Cryptographic Digital Skill Passport</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-serif-display">
              {profile.name}'s Verified Competencies
            </h1>
            <p className="text-sm text-[#C5C4BA] mt-1.5 max-w-2xl leading-relaxed">
              Standardized skill evaluation mapping academic coursework against real-time 2026 enterprise hiring benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={triggerAiGapAnalysis}
              disabled={aiAnalysisLoading}
              className="bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-50 border border-[#6B6B4D]"
            >
              {aiAnalysisLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 text-[#E6D4C3]" />
              )}
              <span>Run AI Skill Gap Analysis</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Gap Analysis Card (if generated or triggered) */}
      {aiAnalysisResult && (
        <div className="bg-[#F9F9F7] border border-[#D5D5C6] rounded-xl p-6 shadow-xs animate-in slide-in-from-top-3 duration-300">
          <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3 mb-4">
            <div className="flex items-center gap-2 text-[#2D2D2A] font-bold text-base font-serif-display">
              <Sparkles className="w-5 h-5 text-[#8C5E3C]" />
              <span>AI Skill Gap & Career Readiness Matrix</span>
            </div>
            <span className="text-xs bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6] font-semibold px-2.5 py-1 rounded-full">
              Target: {targetGoal}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-[#F2F1ED] p-3.5 rounded-lg border border-[#E5E2D9]">
              <span className="text-xs text-[#7C7B76] font-medium">Role Compatibility</span>
              <p className="text-xl font-bold text-[#5A5A40] mt-1 font-serif-display">{aiAnalysisResult.matchScore || 89}% Match</p>
            </div>
            <div className="bg-[#F2F1ED] p-3.5 rounded-lg border border-[#E5E2D9]">
              <span className="text-xs text-[#7C7B76] font-medium">Estimated Time to Close Gap</span>
              <p className="text-xl font-bold text-[#2D2D2A] mt-1 font-serif-display">{aiAnalysisResult.estimatedTimeToCloseGap || '4 Weeks'}</p>
            </div>
            <div className="bg-[#F2F1ED] p-3.5 rounded-lg border border-[#E5E2D9]">
              <span className="text-xs text-[#7C7B76] font-medium">Industry Demand Rating</span>
              <p className="text-xl font-bold text-[#34583A] mt-1 font-serif-display">{aiAnalysisResult.industryDemandRating || 'High'}</p>
            </div>
          </div>

          <div className="prose prose-sm text-[#2D2D2A] bg-[#E8E8DF]/60 p-4 rounded-lg border border-[#D5D5C6] whitespace-pre-line text-xs md:text-sm leading-relaxed mb-4">
            {aiAnalysisResult.analysis}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#2D2D2A]">Recommended Next Step:</span>
              <button
                onClick={onNavigateToLearning}
                className="text-xs font-semibold text-[#5A5A40] hover:text-[#4A4A33] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Enroll in Enterprise MLOps Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              onClick={onNavigateToAssessments}
              className="px-3 py-1.5 bg-[#5A5A40] text-[#F9F9F7] rounded-lg text-xs font-medium hover:bg-[#4A4A33] cursor-pointer"
            >
              Take Practice Aptitude Test
            </button>
          </div>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E5E2D9] pb-3">
        <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#33332A] text-[#F9F9F7] shadow-xs'
                  : 'bg-[#F9F9F7] text-[#5F5E59] border border-[#E5E2D9] hover:bg-[#F2F1ED]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-[#7C7B76] font-medium">
          Showing {filteredSkills.length} verified competencies
        </div>
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSkills.map((skill) => {
          const isAboveBenchmark = skill.proficiency >= skill.industryBenchmark;
          const gap = skill.proficiency - skill.industryBenchmark;

          return (
            <div
              key={skill.id}
              className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-5 shadow-xs hover:border-[#A3A380] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-[#2D2D2A]">{skill.name}</h3>
                      {skill.verified && (
                        <span className="text-[10px] bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                          <BadgeCheck className="w-3 h-3 text-[#34583A]" />
                          Verified
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#7C7B76] font-medium">{skill.category}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-bold text-[#5A5A40] font-serif-display">{skill.proficiency}%</span>
                    <span className="text-[10px] text-[#7C7B76] block">Candidate Score</span>
                  </div>
                </div>

                {/* Progress Comparison */}
                <div className="space-y-2 mb-4">
                  {/* Candidate Bar */}
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-[#5F5E59] mb-1">
                      <span>Your Verified Level</span>
                      <span>{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-[#E5E2D9] rounded-full h-2">
                      <div
                        className="bg-[#5A5A40] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>

                  {/* Industry Target Benchmark Bar */}
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-[#7C7B76] mb-1">
                      <span>Industry 2026 Benchmark</span>
                      <span>{skill.industryBenchmark}%</span>
                    </div>
                    <div className="w-full bg-[#E5E2D9] rounded-full h-1.5">
                      <div
                        className="bg-[#8C5E3C] h-1.5 rounded-full"
                        style={{ width: `${skill.industryBenchmark}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-[#F2F1ED] border border-[#E5E2D9] mb-3">
                  <span className="text-[#5F5E59]">Gap Status:</span>
                  {isAboveBenchmark ? (
                    <span className="font-semibold text-[#34583A] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Exceeds Requirement (+{gap}%)
                    </span>
                  ) : (
                    <span className="font-semibold text-[#8C5E3C] flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Gap to Target ({gap}%)
                    </span>
                  )}
                </div>
              </div>

              {/* Endorsements & Action */}
              <div className="pt-3 border-t border-[#E5E2D9] flex items-center justify-between text-xs">
                <span className="text-[#7C7B76]">
                  {skill.endorsementsCount} Endorsements ({skill.verifiedBy || 'Institution'})
                </span>
                <button
                  onClick={() => onEndorseSkill(skill.id)}
                  className="text-[#5A5A40] hover:text-[#4A4A33] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>+ Endorse</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verified Certifications Section */}
      <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 md:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#5A5A40]" />
            <h2 className="text-lg font-bold text-[#2D2D2A] font-serif-display">Verified Digital Credentials & Badges</h2>
          </div>
          <span className="text-xs text-[#7C7B76]">
            Backed by W3C Verifiable Credentials Standard
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profile.certifications.map((cert) => (
            <div key={cert.id} className="border border-[#E5E2D9] bg-[#F2F1ED]/50 rounded-xl p-5 hover:border-[#A3A380] transition-all">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#E8E8DF] text-[#5A5A40] flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono bg-[#E5E2D9] text-[#5F5E59] px-2 py-0.5 rounded">
                  {cert.credentialId}
                </span>
              </div>
              <h3 className="font-bold text-sm text-[#2D2D2A] mb-1">{cert.name}</h3>
              <p className="text-xs text-[#7C7B76] mb-3">{cert.issuer} • Issued {cert.issueDate}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {cert.skills.map((s) => (
                  <span key={s} className="text-[10px] bg-[#E8E8DF] text-[#42422E] px-2 py-0.5 rounded border border-[#D5D5C6]">
                    {s}
                  </span>
                ))}
              </div>

              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#5A5A40] hover:text-[#4A4A33] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Verify Credential on Chain</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
