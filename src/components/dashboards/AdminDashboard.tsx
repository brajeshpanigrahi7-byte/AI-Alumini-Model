import React from 'react';
import { 
  Building2, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  GraduationCap, 
  Briefcase, 
  FileSpreadsheet, 
  Key, 
  Globe2, 
  ExternalLink,
  ArrowUpRight,
  Handshake,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { UserProfile, Opportunity, ActiveTab } from '../../types';

interface AdminDashboardProps {
  profile: UserProfile;
  opportunities: Opportunity[];
  onNavigate: (tab: ActiveTab) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  profile,
  opportunities,
  onNavigate
}) => {
  const departments = [
    { name: 'Computer Science & AI', placementRate: 98.4, students: 1250, avgCTC: '$118,000', alignment: 96 },
    { name: 'Data Science & Applied Statistics', placementRate: 95.2, students: 840, avgCTC: '$104,000', alignment: 94 },
    { name: 'Cloud & Distributed Systems', placementRate: 94.8, students: 920, avgCTC: '$112,000', alignment: 93 },
    { name: 'Industrial IoT & Robotics', placementRate: 91.0, students: 780, avgCTC: '$96,000', alignment: 89 }
  ];

  const corporateMoUs = [
    { company: 'Siemens Enterprise Digital Solutions', since: '2024', activeHires: 45, type: 'Tier-1 Strategic Partner', funding: '$180k Research' },
    { company: 'Google Cloud Education', since: '2023', activeHires: 62, type: 'Cloud & AI Curriculum MoU', funding: '$250k Credits' },
    { company: 'Tesla Advanced Automation', since: '2025', activeHires: 28, type: 'Autonomous Systems Co-op', funding: 'Direct Co-op' },
    { company: 'Microsoft Azure Academic', since: '2024', activeHires: 50, type: 'Enterprise Certification Sponsor', funding: '100% Sponsored' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Admin Hero Header */}
      <div className="bg-[#2D2D24] text-[#F9F9F7] rounded-2xl p-6 md:p-8 shadow-md border border-[#3E3E32] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-[#8C5E3C]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#D4D4B8] text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-4 h-4 text-[#E6D4C3]" />
              <span>{profile.institution || 'Nexus Higher Education Consortium'}</span>
              <span className="bg-[#8C5E3C] text-[#F4ECE4] px-2 py-0.5 rounded text-[10px] font-bold">Consortium Dean Authority</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-serif-display">
              Institutional Governance & Accreditation — {profile.name}
            </h1>
            <p className="text-sm text-[#C5C4BA] mt-1.5 max-w-2xl leading-relaxed">
              Consortium accreditation status: <strong>NAAC A++ (Score: 3.78/4.00)</strong> • NIRF Engineering Rank #4. Managing <strong>4,850 enrolled scholars</strong> across 8 accredited departments.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('analytics')}
              className="bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] px-5 py-2.5 rounded-lg text-xs md:text-sm font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2 border border-[#6B6B4D]"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Accreditation Analytics</span>
            </button>
            <button
              onClick={() => onNavigate('collaboration')}
              className="bg-[#F9F9F7]/10 hover:bg-[#F9F9F7]/20 text-[#F9F9F7] border border-[#F9F9F7]/20 px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer flex items-center gap-2"
            >
              <Handshake className="w-4 h-4 text-[#CFE0D1]" />
              <span>Corporate MoUs ({corporateMoUs.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Institutional Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs border-l-4 border-l-[#34583A]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Placement Rate</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">94.2%</span>
            <span className="text-xs font-bold text-[#34583A]">Tier-1 Peak</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">1,420 Verified Offers Issued</p>
        </div>

        <div className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs border-l-4 border-l-[#5A5A40]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Median Compensation</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">$92.4K</span>
            <span className="text-xs font-bold text-[#5A5A40]">+12.4% YoY</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Top Package: $165,000 / yr</p>
        </div>

        <div className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs border-l-4 border-l-[#8C5E3C]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Corporate MoUs</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">42</span>
            <span className="text-xs font-bold text-[#34583A]">Active Enterprise</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Siemens, Google, Tesla, MSFT</p>
        </div>

        <div className="bg-[#F9F9F7] p-5 rounded-xl border border-[#E5E2D9] shadow-xs border-l-4 border-l-[#7A6A32]">
          <span className="text-xs font-semibold text-[#7C7B76] uppercase tracking-wider block">Verified Skill Passports</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#2D2D2A] font-serif-display">4,850</span>
            <span className="text-xs font-bold text-[#7A6A32]">100% On-Chain</span>
          </div>
          <p className="text-xs text-[#7C7B76] mt-2">Root Signing Key: Active</p>
        </div>
      </div>

      {/* Department-wise Placement & Skill Gap Table */}
      <div className="bg-[#F9F9F7] rounded-2xl border border-[#E5E2D9] p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E2D9] pb-4">
          <div>
            <h3 className="text-base font-bold text-[#2D2D2A] font-serif-display flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#5A5A40]" />
              <span>Departmental Placement & Industry Alignment Scorecard</span>
            </h3>
            <p className="text-xs text-[#7C7B76] mt-0.5">Accreditation metric submitted for ABET & NAAC Annual Quality Audits.</p>
          </div>
          <button 
            onClick={() => onNavigate('analytics')}
            className="text-xs font-bold text-[#5A5A40] hover:underline"
          >
            Full Analytics &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#2D2D2A]">
            <thead>
              <tr className="border-b border-[#E5E2D9] text-[#7C7B76] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Enrolled Scholars</th>
                <th className="py-2.5 px-3">Placement Rate</th>
                <th className="py-2.5 px-3">Median CTC</th>
                <th className="py-2.5 px-3">Industry Alignment</th>
                <th className="py-2.5 px-3">Accreditation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2D9]">
              {departments.map((dept) => (
                <tr key={dept.name} className="hover:bg-[#F2F1ED] transition-colors">
                  <td className="py-3 px-3 font-bold text-[#2D2D2A]">{dept.name}</td>
                  <td className="py-3 px-3 text-[#5F5E59]">{dept.students} Scholars</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 font-bold text-[#34583A]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {dept.placementRate}%
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-[#2D2D2A]">{dept.avgCTC}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#5A5A40]">{dept.alignment}%</span>
                      <div className="w-20 bg-[#E5E2D9] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#5A5A40] h-full rounded-full" style={{ width: `${dept.alignment}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="bg-[#EAF1EB] text-[#34583A] text-[10px] font-bold px-2 py-0.5 rounded border border-[#CFE0D1]">
                      NAAC A++
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Corporate MoUs & Cryptographic Verification Authority */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#F9F9F7] rounded-2xl border border-[#E5E2D9] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
            <h3 className="text-base font-bold text-[#2D2D2A] font-serif-display flex items-center gap-2">
              <Handshake className="w-4 h-4 text-[#8C5E3C]" />
              <span>Active Corporate MoUs & Industry Alliances</span>
            </h3>
            <span className="text-xs font-bold text-[#34583A] bg-[#EAF1EB] px-2 py-0.5 rounded">42 Total</span>
          </div>

          <div className="space-y-3">
            {corporateMoUs.map((mou) => (
              <div key={mou.company} className="p-3.5 rounded-xl bg-[#F2F1ED]/80 border border-[#E5E2D9] flex items-center justify-between">
                <div className="min-w-0 pr-3">
                  <h4 className="font-bold text-xs text-[#2D2D2A] truncate">{mou.company}</h4>
                  <p className="text-[11px] text-[#7C7B76]">{mou.type} • Partner Since {mou.since}</p>
                  <p className="text-[10px] font-semibold text-[#34583A] mt-0.5">{mou.activeHires} Placements • {mou.funding}</p>
                </div>
                <span className="px-2 py-1 bg-[#EAF1EB] text-[#34583A] text-[10px] font-bold rounded border border-[#CFE0D1]">
                  Active MoU
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Blockchain Root Authority & Compliance Audit */}
        <div className="bg-[#F9F9F7] rounded-2xl border border-[#E5E2D9] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
            <h3 className="text-base font-bold text-[#2D2D2A] font-serif-display flex items-center gap-2">
              <Key className="w-4 h-4 text-[#5A5A40]" />
              <span>Consortium Root Cryptographic Signing Key</span>
            </h3>
            <span className="text-xs font-bold text-[#34583A] bg-[#EAF1EB] px-2 py-0.5 rounded flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Root
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#2D2D24] text-[#F9F9F7] border border-[#3E3E32] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A3A380] font-mono">Consortium Root Public Key:</span>
              <span className="text-[#CFE0D1] font-bold text-[10px]">ECDSA-Secp256k1</span>
            </div>
            <p className="font-mono text-xs text-[#D4D4B8] break-all bg-[#1E1E18] p-2.5 rounded-lg border border-[#3E3E32]">
              0x99a120fc64bca883109e22aa7f8a92ec41b80211
            </p>
            <div className="flex items-center justify-between text-[11px] text-[#A9A89C]">
              <span>Issued by: Elena Rostova, Dean & Registrar</span>
              <span>Audit: 0 Tampered Documents</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#EAF1EB] border border-[#CFE0D1] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#34583A]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Annual Accreditation Audit Report (2026 Ready)</span>
            </div>
            <button 
              onClick={() => onNavigate('documents')}
              className="text-xs font-bold text-[#34583A] underline cursor-pointer"
            >
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
