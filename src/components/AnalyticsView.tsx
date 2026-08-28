import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building2, 
  Award, 
  Download, 
  CheckCircle, 
  Sparkles, 
  ArrowUpRight, 
  Filter,
  DollarSign
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'2026' | 'All'>('2026');
  const [selectedDept, setSelectedDept] = useState<string>('All Departments');

  const handleExportReport = () => {
    alert("Exporting Institutional Accreditation & Industry Alignment Report (PDF/CSV) with SHA-256 validation seal.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-[#33332A] text-[#F9F9F7] rounded-2xl p-6 md:p-8 shadow-md border border-[#48483B] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#D4D4B8] text-xs font-bold uppercase tracking-wider mb-2">
            <BarChart3 className="w-4 h-4 text-[#CFE0D1]" />
            <span>Institutional & Industry Intelligence Dashboard</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-serif-display">Academia–Industry Analytics & Trends</h1>
          <p className="text-sm text-[#C5C4BA] mt-1.5 max-w-2xl leading-relaxed">
            Data-driven insights monitoring student skill progression, placement readiness index, emerging industry demand curves, and curriculum alignment metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportReport}
            className="bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer border border-[#6B6B4D]"
          >
            <Download className="w-4 h-4" />
            <span>Export Analytics Dossier</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs border-l-4 border-l-[#5A5A40]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Placement Readiness</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-bold text-[#2D2D2A] font-serif-display">91.4%</span>
            <span className="text-xs font-bold text-[#34583A] flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +4.8% YoY
            </span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">842 of 921 graduating seniors cleared industry benchmarks.</p>
        </div>

        <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs border-l-4 border-l-[#34583A]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Skill Gap Reduction</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-bold text-[#2D2D2A] font-serif-display">34.2%</span>
            <span className="text-xs font-bold text-[#34583A] flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> Optimal
            </span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Measured reduction in technical delta via sponsored labs.</p>
        </div>

        <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs border-l-4 border-l-[#8C5E3C]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Average Internship Stipend</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-bold text-[#2D2D2A] font-serif-display">$48.50/hr</span>
            <span className="text-xs font-bold text-[#34583A] flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +12.3%
            </span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Across NYC, SF Bay, Austin, and Hybrid placements.</p>
        </div>

        <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs border-l-4 border-l-[#7C7B76]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Active Enterprise Partners</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-bold text-[#2D2D2A] font-serif-display">142</span>
            <span className="text-xs font-bold text-[#34583A] bg-[#EAF1EB] px-2 py-0.5 rounded border border-[#CFE0D1]">Verified</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Tech, BioTech, CleanEnergy, FinTech hiring networks.</p>
        </div>
      </div>

      {/* Main Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: 2026 Skill Demand Curves */}
        <div className="lg:col-span-2 bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 md:p-8 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4 mb-6">
            <div>
              <h3 className="font-bold text-base md:text-lg text-[#2D2D2A] font-serif-display">2026 Industry Skill Demand & Growth Index</h3>
              <p className="text-xs text-[#7C7B76]">Fastest growing technical proficiencies demanded by recruiters</p>
            </div>
            <span className="text-xs font-bold bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6] px-2.5 py-1 rounded">Live Demand Feed</span>
          </div>

          <div className="space-y-5">
            {[
              { skill: 'Production MLOps & Containerization (Docker/K8s)', growth: '+142% Demand', index: 94, color: 'bg-[#5A5A40]' },
              { skill: 'Distributed Cloud Warehousing (BigQuery / Snowflake / Spark)', growth: '+98% Demand', index: 88, color: 'bg-[#34583A]' },
              { skill: 'Generative AI Architecture & Evaluation (RAG / Agentic)', growth: '+185% Demand', index: 96, color: 'bg-[#8C5E3C]' },
              { skill: 'Cyber-Physical Security & Digital Twins', growth: '+64% Demand', index: 78, color: 'bg-[#7C7B76]' },
              { skill: 'Cross-functional Executive Storytelling & Ethics', growth: '+52% Demand', index: 85, color: 'bg-[#6B6B4D]' }
            ].map((item) => (
              <div key={item.skill} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#2D2D2A]">{item.skill}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#34583A]">{item.growth}</span>
                    <span className="text-[#7C7B76] font-mono">Index {item.index}/100</span>
                  </div>
                </div>
                <div className="w-full bg-[#E5E2D9] rounded-full h-2.5">
                  <div
                    className={`${item.color} h-2.5 rounded-full transition-all duration-700`}
                    style={{ width: `${item.index}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Departmental Placement Readiness */}
        <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-[#2D2D2A] mb-1 font-serif-display">Departmental Benchmarks</h3>
            <p className="text-xs text-[#7C7B76] mb-6">Percentage of students exceeding industry hiring bar</p>

            <div className="space-y-4">
              {[
                { dept: 'Data Science & Analytics', rate: 94, students: 210 },
                { dept: 'Computer Science & AI', rate: 92, students: 340 },
                { dept: 'Applied Mathematics & Statistics', rate: 89, students: 165 },
                { dept: 'Electrical & Cyber Engineering', rate: 87, students: 120 },
                { dept: 'Industrial Systems Engineering', rate: 84, students: 86 }
              ].map((d) => (
                <div key={d.dept} className="p-3 bg-[#F2F1ED] rounded-lg border border-[#E5E2D9]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[#2D2D2A] font-serif-display">{d.dept}</span>
                    <span className="font-bold text-[#5A5A40]">{d.rate}%</span>
                  </div>
                  <span className="text-[10px] text-[#7C7B76]">{d.students} students enrolled in verification track</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-[#E5E2D9] text-xs text-center text-[#7C7B76]">
            Certified by University Academic Senate & ABET Accreditation
          </div>
        </div>
      </div>
    </div>
  );
};
