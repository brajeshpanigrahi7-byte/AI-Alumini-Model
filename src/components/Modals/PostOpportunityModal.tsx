import React, { useState } from 'react';
import { X, Briefcase, PlusCircle, CheckCircle, Sparkles } from 'lucide-react';
import { Opportunity } from '../../types';

interface PostOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostOpportunity: (opp: Opportunity) => void;
}

export const PostOpportunityModal: React.FC<PostOpportunityModalProps> = ({
  isOpen,
  onClose,
  onPostOpportunity
}) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [type, setType] = useState<Opportunity['type']>('Student Internship');
  const [workplaceType, setWorkplaceType] = useState<'Remote' | 'Hybrid' | 'On-site'>('Hybrid');
  const [location, setLocation] = useState('New York, NY');
  const [stipendOrSalary, setStipendOrSalary] = useState('$45 - $55 / hr');
  const [duration, setDuration] = useState('12 Weeks');
  const [skillsInput, setSkillsInput] = useState('Python & Pandas, SQL & Data Warehousing, Machine Learning');
  const [description, setDescription] = useState('');
  const [openingsCount, setOpeningsCount] = useState(2);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company) return;

    const skills = skillsInput.split(',').map(s => s.trim()).filter(Boolean);

    const newOpp: Opportunity = {
      id: `opp_${Date.now()}`,
      title,
      company,
      companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=100&auto=format&fit=crop&q=60',
      location,
      type,
      workplaceType,
      stipendOrSalary,
      duration,
      postedDate: 'Just now',
      deadline: '2026-11-30',
      requiredSkills: skills.length > 0 ? skills : ['Python', 'Data Analysis'],
      minGpa: 3.2,
      description: description || 'Exciting opportunity to work on industry grade real-time data systems with senior mentors.',
      responsibilities: [
        'Design and maintain production data pipelines.',
        'Collaborate with cross-functional product & engineering leads.',
        'Participate in agile sprint delivery.'
      ],
      qualifications: [
        'Pursuing Bachelor / Master in STEM field.',
        'Strong fundamentals in required skill stack.'
      ],
      openingsCount,
      applicantsCount: 0,
      roleTarget: type === 'Faculty Internship' || type === 'FDP / Training' ? 'academician' : 'student',
      matchScore: 94
    };

    onPostOpportunity(newOpp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F9F9F7] rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-[#E5E2D9] animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4 mb-4">
          <div className="flex items-center gap-2 text-[#2D2D2A]">
            <Briefcase className="w-5 h-5 text-[#5A5A40]" />
            <h3 className="text-lg font-bold text-[#2D2D2A] font-serif-display">Post New Industry Opportunity</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7C7B76] hover:text-[#2D2D2A] hover:bg-[#E8E8DF] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs md:text-sm">
          <div>
            <label className="block font-bold text-[#2D2D2A] mb-1">Opportunity Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. AI Systems & Analytics Engineering Intern"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-[#2D2D2A] focus:ring-2 focus:ring-[#5A5A40] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#2D2D2A] mb-1">Hiring Organization / Company *</label>
              <input
                type="text"
                required
                placeholder="e.g. Nexus Technology Labs"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-2.5 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-[#2D2D2A] focus:ring-2 focus:ring-[#5A5A40] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-[#2D2D2A] mb-1">Opportunity Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-2.5 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-[#2D2D2A] focus:ring-2 focus:ring-[#5A5A40] focus:outline-none font-semibold"
              >
                <option value="Student Internship">Student Internship</option>
                <option value="Entry-Level Job">Entry-Level Job</option>
                <option value="Faculty Internship">Faculty Internship / Sabbatical</option>
                <option value="Apprenticeship">Apprenticeship</option>
                <option value="Live Project">Live Project</option>
                <option value="FDP / Training">FDP / Training</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-[#2D2D2A] mb-1">Workplace</label>
              <select
                value={workplaceType}
                onChange={(e) => setWorkplaceType(e.target.value as any)}
                className="w-full p-2.5 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-[#2D2D2A] focus:ring-2 focus:ring-[#5A5A40] focus:outline-none font-semibold"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-[#2D2D2A] mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-[#2D2D2A] focus:ring-2 focus:ring-[#5A5A40] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-[#2D2D2A] mb-1">Stipend / Honorarium</label>
              <input
                type="text"
                value={stipendOrSalary}
                onChange={(e) => setStipendOrSalary(e.target.value)}
                className="w-full p-2.5 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-[#2D2D2A] focus:ring-2 focus:ring-[#5A5A40] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#2D2D2A] mb-1">Required Skills (Comma separated) *</label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="e.g. Python, SQL, Docker, Machine Learning"
              className="w-full p-2.5 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-[#2D2D2A] focus:ring-2 focus:ring-[#5A5A40] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-[#2D2D2A] mb-1">Role Description & Goals</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe project responsibilities, team scope, and mentorship opportunities..."
              className="w-full p-2.5 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-[#2D2D2A] focus:ring-2 focus:ring-[#5A5A40] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E2D9]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#7C7B76] hover:bg-[#E8E8DF] rounded-lg cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-[#F9F9F7] bg-[#5A5A40] hover:bg-[#4A4A33] rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish to Nexus Network</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
