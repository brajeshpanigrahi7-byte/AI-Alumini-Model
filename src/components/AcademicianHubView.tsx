import React, { useState } from 'react';
import { 
  Landmark, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Users, 
  FileText, 
  Sparkles, 
  CheckCircle, 
  Building2, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Opportunity, UserProfile } from '../types';

interface AcademicianHubViewProps {
  opportunities: Opportunity[];
  onOpenPostOpportunity: () => void;
}

export const AcademicianHubView: React.FC<AcademicianHubViewProps> = ({
  opportunities,
  onOpenPostOpportunity
}) => {
  const [activeTab, setActiveTab] = useState<'internships' | 'fdp' | 'grants' | 'endorse'>('internships');
  const [endorsedStudents, setEndorsedStudents] = useState<string[]>(['Brajesh', 'Alex Chen']);
  const [selectedConsultancy, setSelectedConsultancy] = useState<any | null>(null);

  const facultyOpportunities = opportunities.filter(
    o => o.roleTarget === 'academician' || o.roleTarget === 'both' || o.type === 'Faculty Internship' || o.type === 'FDP / Training'
  );

  const handleEndorseStudent = (name: string) => {
    if (!endorsedStudents.includes(name)) {
      setEndorsedStudents([...endorsedStudents, name]);
      alert(`Cryptographic Faculty Endorsement issued for ${name}. Hashed and added to their Digital Skill Passport.`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-[#33332A] text-[#F9F9F7] rounded-2xl p-6 md:p-8 shadow-md border border-[#48483B] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#D4D4B8] text-xs font-bold uppercase tracking-wider mb-2">
            <Landmark className="w-4 h-4 text-[#CFE0D1]" />
            <span>Dedicated Faculty & Researcher Portal</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-serif-display">Academician–Industry Gateway</h1>
          <p className="text-sm text-[#C5C4BA] mt-1.5 max-w-2xl leading-relaxed">
            Explore faculty industry internships, industrial sabbaticals, Faculty Development Programs (FDPs), industry consultancy grants, and student research supervision.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPostOpportunity}
            className="bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer border border-[#6B6B4D]"
          >
            <span>+ Submit Research / FDP Call</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-6 border-b border-[#E5E2D9] pb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('internships')}
          className={`pb-2 text-sm font-bold border-b-2 cursor-pointer whitespace-nowrap transition-all ${
            activeTab === 'internships'
              ? 'text-[#5A5A40] border-[#5A5A40]'
              : 'text-[#7C7B76] border-transparent hover:text-[#2D2D2A]'
          }`}
        >
          Faculty Industry Fellowships ({facultyOpportunities.length})
        </button>
        <button
          onClick={() => setActiveTab('fdp')}
          className={`pb-2 text-sm font-bold border-b-2 cursor-pointer whitespace-nowrap transition-all ${
            activeTab === 'fdp'
              ? 'text-[#5A5A40] border-[#5A5A40]'
              : 'text-[#7C7B76] border-transparent hover:text-[#2D2D2A]'
          }`}
        >
          Faculty Development Programs (FDPs)
        </button>
        <button
          onClick={() => setActiveTab('grants')}
          className={`pb-2 text-sm font-bold border-b-2 cursor-pointer whitespace-nowrap transition-all ${
            activeTab === 'grants'
              ? 'text-[#5A5A40] border-[#5A5A40]'
              : 'text-[#7C7B76] border-transparent hover:text-[#2D2D2A]'
          }`}
        >
          Industrial Consultancy & Grants ($180K+ Active)
        </button>
        <button
          onClick={() => setActiveTab('endorse')}
          className={`pb-2 text-sm font-bold border-b-2 cursor-pointer whitespace-nowrap transition-all ${
            activeTab === 'endorse'
              ? 'text-[#5A5A40] border-[#5A5A40]'
              : 'text-[#7C7B76] border-transparent hover:text-[#2D2D2A]'
          }`}
        >
          Student Supervision & Endorsement
        </button>
      </div>

      {/* Tab 1: Faculty Internships & Fellowships */}
      {activeTab === 'internships' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {facultyOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs hover:border-[#A3A380] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={opp.companyLogo}
                      alt={opp.company}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-[#E5E2D9]"
                    />
                    <div>
                      <h3 className="font-bold text-base text-[#2D2D2A] leading-snug font-serif-display">{opp.title}</h3>
                      <p className="text-xs text-[#7C7B76] font-medium">{opp.company} • {opp.location}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6] px-2.5 py-1 rounded">
                    {opp.type}
                  </span>
                </div>

                <div className="bg-[#EAF1EB] text-[#34583A] p-2.5 rounded-lg text-xs font-semibold border border-[#CFE0D1] mb-3 flex items-center justify-between">
                  <span>Honorarium & Research Grant:</span>
                  <span className="font-bold">{opp.stipendOrSalary}</span>
                </div>

                <p className="text-xs text-[#5F5E59] mb-4 leading-relaxed line-clamp-3">
                  {opp.description}
                </p>

                <div className="space-y-1 mb-4">
                  <span className="text-[11px] font-bold text-[#7C7B76] uppercase tracking-wider block">
                    Core Curriculum Alignment:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {opp.requiredSkills.map((s) => (
                      <span key={s} className="text-[11px] bg-[#F2F1ED] text-[#5F5E59] border border-[#E5E2D9] px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E2D9] flex items-center justify-between text-xs">
                <span className="text-[#7C7B76]">Duration: {opp.duration}</span>
                <button
                  onClick={() => alert(`Application for Faculty Sabbatical Fellowship at ${opp.company} initiated with university clearance packet.`)}
                  className="px-4 py-2 bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Apply as Faculty Fellow
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: FDP Programs */}
      {activeTab === 'fdp' && (
        <div className="space-y-6">
          <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs">
            <h3 className="text-lg font-bold text-[#2D2D2A] mb-4 font-serif-display">Sponsored Faculty Development Programs (FDPs)</h3>
            <p className="text-xs text-[#5F5E59] mb-6">
              Participate in industry-led technical upskilling, acquire enterprise certifications, and update university curricula with pre-built virtual laboratory modules.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-[#E5E2D9] bg-[#F2F1ED]/40 rounded-xl p-5 hover:border-[#A3A380] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#42422E] bg-[#E8E8DF] border border-[#D5D5C6] px-2.5 py-0.5 rounded">Google Cloud</span>
                  <span className="text-xs text-[#34583A] bg-[#EAF1EB] border border-[#CFE0D1] px-2 py-0.5 rounded font-semibold">Fully Sponsored</span>
                </div>
                <h4 className="font-bold text-base text-[#2D2D2A] mb-1 font-serif-display">Cloud-Native BigQuery & AI Curriculum Alignment</h4>
                <p className="text-xs text-[#5F5E59] mb-4">4-week hands-on training for university instructors with $2,500 lab credits per student seat.</p>
                <button 
                  onClick={() => alert("Enrolled in Google Cloud Academic FDP. Verification packet sent to Department Dean.")}
                  className="w-full py-2 bg-[#33332A] text-[#F9F9F7] text-xs font-bold rounded-lg hover:bg-[#48483B] cursor-pointer"
                >
                  Register Institutional Department
                </button>
              </div>

              <div className="border border-[#E5E2D9] bg-[#F2F1ED]/40 rounded-xl p-5 hover:border-[#A3A380] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#42422E] bg-[#E8E8DF] border border-[#D5D5C6] px-2.5 py-0.5 rounded">NVIDIA DLI</span>
                  <span className="text-xs text-[#34583A] bg-[#EAF1EB] border border-[#CFE0D1] px-2 py-0.5 rounded font-semibold">Grant Sponsored</span>
                </div>
                <h4 className="font-bold text-base text-[#2D2D2A] mb-1 font-serif-display">Generative AI & LLM Fine-Tuning for Academics</h4>
                <p className="text-xs text-[#5F5E59] mb-4">Hands-on GPU cluster access, transformer architecture pedagogy, and verified university instructor badge.</p>
                <button 
                  onClick={() => alert("Enrolled in NVIDIA DLI FDP. GPU Sandbox access granted.")}
                  className="w-full py-2 bg-[#33332A] text-[#F9F9F7] text-xs font-bold rounded-lg hover:bg-[#48483B] cursor-pointer"
                >
                  Register Institutional Department
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Industrial Consultancy & Grants */}
      {activeTab === 'grants' && (
        <div className="space-y-6">
          <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs">
            <h3 className="text-lg font-bold text-[#2D2D2A] mb-4 font-serif-display">Active Industrial R&D Consultancy Calls</h3>
            <div className="space-y-4">
              {[
                { title: 'Cyber-Physical Digital Twin for High-Speed Rail', sponsor: 'Siemens Mobility', grant: '$65,000 Grant', deadline: '2026-10-30', domain: 'Applied AI & Sensors' },
                { title: 'Privacy-Preserving Federated Learning in Healthcare', sponsor: 'Pfizer Bio-Analytics', grant: '$90,000 Grant', deadline: '2026-11-15', domain: 'Healthcare ML & Privacy' },
                { title: 'Grid Modernization & Microgrid Load Balancing', sponsor: 'GE Renewable Energy', grant: '$45,000 Grant', deadline: '2026-10-15', domain: 'CleanTech & Optimization' }
              ].map((grant, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-[#E5E2D9] bg-[#F2F1ED]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-sm text-[#2D2D2A] font-serif-display">{grant.title}</h4>
                      <span className="text-[10px] bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1] font-bold px-2 py-0.5 rounded">
                        {grant.grant}
                      </span>
                    </div>
                    <p className="text-xs text-[#7C7B76]">Sponsor: {grant.sponsor} • Domain: {grant.domain} • Submission Deadline: {grant.deadline}</p>
                  </div>
                  <button 
                    onClick={() => alert(`Submitting research grant abstract for "${grant.title}" to ${grant.sponsor}.`)}
                    className="px-4 py-2 bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] text-xs font-bold rounded-lg shrink-0 cursor-pointer"
                  >
                    Submit Proposal Draft
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Student Supervision & Endorsements */}
      {activeTab === 'endorse' && (
        <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-[#2D2D2A] flex items-center gap-2 font-serif-display">
            <ShieldCheck className="w-5 h-5 text-[#34583A]" />
            <span>Faculty Signature & Student Competency Verification</span>
          </h3>
          <p className="text-xs text-[#5F5E59]">
            Sign off on capstone code repositories, certify GPA honesty, and attach cryptographic faculty endorsement seals to student passports.
          </p>

          <div className="space-y-3">
            {[
              { name: 'Brajesh', role: 'Senior Data Analyst (3.92 GPA)', project: 'Predictive Churn Intelligence Engine' },
              { name: 'Alex Chen', role: 'Full Stack AI Engineer (3.88 GPA)', project: 'Distributed Microservice Mesh' },
              { name: 'Maria Rodriguez', role: 'Cloud Systems Specialist (3.95 GPA)', project: 'Kubernetes Multi-Cloud Ingress' }
            ].map((student) => {
              const isEndorsed = endorsedStudents.includes(student.name);
              return (
                <div key={student.name} className="p-4 rounded-xl border border-[#E5E2D9] bg-[#F2F1ED]/40 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#2D2D2A] font-serif-display">{student.name}</h4>
                    <p className="text-xs text-[#7C7B76]">{student.role} • Capstone: {student.project}</p>
                  </div>
                  <button
                    onClick={() => handleEndorseStudent(student.name)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isEndorsed 
                        ? 'bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1]' 
                        : 'bg-[#5A5A40] text-[#F9F9F7] hover:bg-[#4A4A33]'
                    }`}
                  >
                    {isEndorsed ? '✓ Faculty Endorsement Signed' : 'Sign & Endorse Skill Passport'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
