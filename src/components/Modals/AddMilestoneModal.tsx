import React, { useState } from 'react';
import { X, Award, GraduationCap, Briefcase, Trophy, PlusCircle } from 'lucide-react';
import { Milestone } from '../../types';

interface AddMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMilestone: (milestone: Milestone) => void;
}

export const AddMilestoneModal: React.FC<AddMilestoneModalProps> = ({
  isOpen,
  onClose,
  onAddMilestone
}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState<Milestone['category']>('certification');
  const [issuer, setIssuer] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    const newMilestone: Milestone = {
      id: `m_${Date.now()}`,
      title,
      date,
      category,
      issuer: issuer || 'Verified Entity',
      description: description || 'Achieved key career competency validated by institution standards.',
      verified: true,
      verificationHash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`
    };

    onAddMilestone(newMilestone);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F9F9F7] rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#E5E2D9] animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4 mb-4">
          <h3 className="text-lg font-bold text-[#2D2D2A] font-serif-display">Add Professional Milestone</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-[#7C7B76] hover:text-[#2D2D2A] hover:bg-[#E8E8DF] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs md:text-sm">
          <div>
            <label className="block font-bold text-[#2D2D2A] mb-1">Milestone Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. AWS Certified Solutions Architect Associate"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-[#2D2D2A] focus:ring-2 focus:ring-[#5A5A40] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#2D2D2A] mb-1">Date / Period *</label>
              <input
                type="text"
                required
                placeholder="e.g. May 2024"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-[#2D2D2A] focus:ring-2 focus:ring-[#5A5A40] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-[#2D2D2A] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-[#2D2D2A] focus:ring-2 focus:ring-[#5A5A40] focus:outline-none font-semibold"
              >
                <option value="certification">Certification</option>
                <option value="education">Degree / Education</option>
                <option value="internship">Industry Internship</option>
                <option value="achievement">Award / Achievement</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#2D2D2A] mb-1">Issuing Body / Institution</label>
            <input
              type="text"
              placeholder="e.g. Amazon Web Services / University Lab"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              className="w-full p-2.5 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-[#2D2D2A] focus:ring-2 focus:ring-[#5A5A40] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-[#2D2D2A] mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Summarize key skills demonstrated and impact..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              <span>Save & Verify Milestone</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
