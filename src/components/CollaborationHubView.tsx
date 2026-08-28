import React, { useState } from 'react';
import { 
  Handshake, 
  Sparkles, 
  Calendar, 
  Users, 
  Trophy, 
  Video, 
  ArrowRight, 
  Building2, 
  CheckCircle,
  Lightbulb
} from 'lucide-react';

export const CollaborationHubView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hackathons' | 'lectures' | 'labs'>('hackathons');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-[#33332A] text-[#F9F9F7] rounded-2xl p-6 md:p-8 shadow-md border border-[#48483B] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#D4D4B8] text-xs font-bold uppercase tracking-wider mb-2">
            <Handshake className="w-4 h-4 text-[#CFE0D1]" />
            <span>Multi-Institutional Partnership Exchange</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-serif-display">Industry–Academia Collaboration Hub</h1>
          <p className="text-sm text-[#C5C4BA] mt-1.5 max-w-2xl leading-relaxed">
            Co-innovate on live industrial projects, participate in enterprise hackathons, attend executive guest lectures, and establish sponsored R&D laboratories.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-[#E5E2D9] pb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('hackathons')}
          className={`pb-2 text-sm font-bold border-b-2 cursor-pointer transition-all whitespace-nowrap ${
            activeTab === 'hackathons'
              ? 'text-[#5A5A40] border-[#5A5A40]'
              : 'text-[#7C7B76] border-transparent hover:text-[#2D2D2A]'
          }`}
        >
          Innovation Challenges & Hackathons (3 Active)
        </button>
        <button
          onClick={() => setActiveTab('lectures')}
          className={`pb-2 text-sm font-bold border-b-2 cursor-pointer transition-all whitespace-nowrap ${
            activeTab === 'lectures'
              ? 'text-[#5A5A40] border-[#5A5A40]'
              : 'text-[#7C7B76] border-transparent hover:text-[#2D2D2A]'
          }`}
        >
          Executive Guest Lectures & Masterclasses
        </button>
        <button
          onClick={() => setActiveTab('labs')}
          className={`pb-2 text-sm font-bold border-b-2 cursor-pointer transition-all whitespace-nowrap ${
            activeTab === 'labs'
              ? 'text-[#5A5A40] border-[#5A5A40]'
              : 'text-[#7C7B76] border-transparent hover:text-[#2D2D2A]'
          }`}
        >
          Sponsored R&D Center Initiatives
        </button>
      </div>

      {/* Tab 1: Hackathons */}
      {activeTab === 'hackathons' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: '2026 Enterprise Generative AI Grand Challenge',
              host: 'Google Cloud & MIT Alliance',
              prize: '$50,000 Total Prizes + Interview Fast-Track',
              deadline: 'Sept 15, 2026',
              participants: 480,
              desc: 'Build multi-modal agentic systems solving industrial supply-chain and healthcare bottlenecks with real enterprise datasets.'
            },
            {
              title: 'Autonomous Robotics & Vision Hackathon',
              host: 'Tesla & Stanford Robotics Lab',
              prize: '$35,000 + Hardware Kits Provided',
              deadline: 'Oct 01, 2026',
              participants: 310,
              desc: 'Develop real-time edge computer vision models detecting high-speed manufacturing anomalies with sub-10ms latency.'
            },
            {
              title: 'Clean Energy Grid Optimization Sprint',
              host: 'Siemens Energy & Columbia Univ',
              prize: '$25,000 + Sabbatical Grant',
              deadline: 'Oct 20, 2026',
              participants: 195,
              desc: 'Simulate microgrid renewable energy forecasting algorithms to balance peak municipal power consumption.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs flex flex-col justify-between hover:border-[#A3A380] transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6] font-bold px-2.5 py-1 rounded">Hackathon</span>
                  <span className="text-xs text-[#34583A] font-bold bg-[#EAF1EB] px-2 py-0.5 rounded border border-[#CFE0D1]">{item.prize.split('+')[0]}</span>
                </div>
                <h3 className="font-bold text-base text-[#2D2D2A] mb-2 font-serif-display">{item.title}</h3>
                <p className="text-xs text-[#7C7B76] mb-3">Co-hosted by {item.host}</p>
                <p className="text-xs text-[#5F5E59] mb-4 leading-relaxed">{item.desc}</p>
                <div className="text-xs text-[#7C7B76] space-y-1 mb-4 bg-[#F2F1ED] p-3 rounded-lg border border-[#E5E2D9]">
                  <div><strong className="text-[#2D2D2A]">Deadline:</strong> {item.deadline}</div>
                  <div><strong className="text-[#2D2D2A]">Participants:</strong> {item.participants} registered student/faculty teams</div>
                </div>
              </div>

              <button
                onClick={() => alert(`Registered your team for "${item.title}". GitHub repository and cloud sandbox credentials dispatched!`)}
                className="w-full py-2 bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Register University Team
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Executive Guest Lectures */}
      {activeTab === 'lectures' && (
        <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs space-y-4">
          {[
            { speaker: 'Dr. Yann LeCun (Chief AI Scientist)', topic: 'The Future of World Models and Hierarchical Planning', date: 'Sept 5, 2026 • 2:00 PM EST', registered: '1,420 Attendees' },
            { speaker: 'Satya Nadella & Academic Deans', topic: 'Modernizing Higher Ed Syllabi for the Agentic AI Era', date: 'Sept 18, 2026 • 11:00 AM EST', registered: '2,800 Attendees' }
          ].map((lec, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[#E5E2D9] bg-[#F2F1ED]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#5A5A40] font-bold">{lec.date}</span>
                <h4 className="font-bold text-base text-[#2D2D2A] mt-0.5 font-serif-display">{lec.topic}</h4>
                <p className="text-xs text-[#7C7B76] mt-1">Keynote by <strong className="text-[#2D2D2A]">{lec.speaker}</strong> • {lec.registered}</p>
              </div>
              <button 
                onClick={() => alert(`Seat confirmed for "${lec.topic}". Calendar invite added.`)}
                className="px-4 py-2 bg-[#33332A] text-[#F9F9F7] text-xs font-bold rounded-lg hover:bg-[#48483B] shrink-0 cursor-pointer"
              >
                Reserve Seat (Live Stream)
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Sponsored Labs */}
      {activeTab === 'labs' && (
        <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-[#2D2D2A] font-serif-display">Industry Sponsored Research Centers & Incubators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 border border-[#E5E2D9] bg-[#F2F1ED]/40 rounded-xl">
              <span className="text-xs font-bold text-[#34583A] bg-[#EAF1EB] border border-[#CFE0D1] px-2 py-0.5 rounded">Active MoU</span>
              <h4 className="font-bold text-base text-[#2D2D2A] mt-2 font-serif-display">Nexus-Columbia High Performance Computing Lab</h4>
              <p className="text-xs text-[#5F5E59] mt-1 mb-4">Furnished with 64 H100 GPU nodes for graduate thesis modeling and student capstones.</p>
              <span className="text-xs text-[#7C7B76]">Director: Prof. Marcus Vance</span>
            </div>
            <div className="p-5 border border-[#E5E2D9] bg-[#F2F1ED]/40 rounded-xl">
              <span className="text-xs font-bold text-[#42422E] bg-[#E8E8DF] border border-[#D5D5C6] px-2 py-0.5 rounded">Active MoU</span>
              <h4 className="font-bold text-base text-[#2D2D2A] mt-2 font-serif-display">Siemens Digital Manufacturing & IoT Sandbox</h4>
              <p className="text-xs text-[#5F5E59] mt-1 mb-4">Dedicated physical PLCs and simulation environments for faculty and industrial training.</p>
              <span className="text-xs text-[#7C7B76]">Director: Dr. Elena Rostova</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
