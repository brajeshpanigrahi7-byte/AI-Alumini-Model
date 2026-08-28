import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Star, 
  Clock, 
  CheckCircle, 
  Calendar, 
  Video, 
  Award, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import { LearningProgram, MentorshipSession } from '../types';

interface LearningProgramsViewProps {
  programs: LearningProgram[];
  mentorships: MentorshipSession[];
  onEnrollProgram: (id: string) => void;
  onBookMentorship: (id: string) => void;
}

export const LearningProgramsView: React.FC<LearningProgramsViewProps> = ({
  programs,
  mentorships,
  onEnrollProgram,
  onBookMentorship
}) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'mentorship'>('courses');
  const [selectedProgram, setSelectedProgram] = useState<LearningProgram | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-[#33332A] text-[#F9F9F7] rounded-2xl p-6 md:p-8 shadow-md border border-[#48483B] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#D4D4B8] text-xs font-bold uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4 text-[#CFE0D1]" />
            <span>Company-Sponsored Training & Certifications</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-serif-display">Industry Learning Programs & Mentorship</h1>
          <p className="text-sm text-[#C5C4BA] mt-1.5 max-w-2xl leading-relaxed">
            Acquire in-demand industry skills before applying. Learn from principal engineers, complete live sandbox projects, and get 1-on-1 career coaching.
          </p>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-6 border-b border-[#E5E2D9] pb-3">
        <button
          onClick={() => setActiveTab('courses')}
          className={`pb-2 text-sm font-bold border-b-2 cursor-pointer transition-all ${
            activeTab === 'courses'
              ? 'text-[#5A5A40] border-[#5A5A40]'
              : 'text-[#7C7B76] border-transparent hover:text-[#2D2D2A]'
          }`}
        >
          Certification Courses & Bootcamps ({programs.length})
        </button>
        <button
          onClick={() => setActiveTab('mentorship')}
          className={`pb-2 text-sm font-bold border-b-2 cursor-pointer transition-all flex items-center gap-1.5 ${
            activeTab === 'mentorship'
              ? 'text-[#5A5A40] border-[#5A5A40]'
              : 'text-[#7C7B76] border-transparent hover:text-[#2D2D2A]'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>1-on-1 Industry Mentorship ({mentorships.length})</span>
        </button>
      </div>

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((prog) => (
            <div
              key={prog.id}
              className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs hover:border-[#A3A380] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6] font-semibold px-2.5 py-0.5 rounded">
                    {prog.category}
                  </span>
                  <span className="text-xs font-semibold bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1] px-2 py-0.5 rounded">
                    {prog.freeOrPaid}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#2D2D2A] mb-2 leading-snug font-serif-display">
                  {prog.title}
                </h3>
                <p className="text-xs text-[#7C7B76] mb-3">{prog.provider}</p>
                <p className="text-xs text-[#5F5E59] mb-4 line-clamp-3 leading-relaxed">
                  {prog.description}
                </p>

                <div className="space-y-1.5 text-xs text-[#5F5E59] mb-4 bg-[#F2F1ED] p-3 rounded-lg border border-[#E5E2D9]">
                  <div className="flex items-center justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold text-[#2D2D2A]">{prog.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Level:</span>
                    <span className="font-semibold text-[#2D2D2A]">{prog.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Rating:</span>
                    <span className="font-semibold text-[#8C5E3C] flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#8C5E3C] text-[#8C5E3C]" />
                      {prog.rating} ({prog.enrolledCount} enrolled)
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {prog.skillsTaught.slice(0, 3).map((s) => (
                    <span key={s} className="text-[10px] bg-[#F2F1ED] text-[#5F5E59] border border-[#E5E2D9] px-2 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                  {prog.skillsTaught.length > 3 && (
                    <span className="text-[10px] text-[#7C7B76]">+{prog.skillsTaught.length - 3} more</span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E2D9] flex items-center justify-between">
                <button
                  onClick={() => setSelectedProgram(prog)}
                  className="text-xs font-semibold text-[#5F5E59] hover:text-[#2D2D2A] cursor-pointer"
                >
                  View Curriculum
                </button>
                <button
                  onClick={() => onEnrollProgram(prog.id)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    prog.status === 'Enrolled'
                      ? 'bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1]'
                      : 'bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7]'
                  }`}
                >
                  {prog.status === 'Enrolled' ? 'Enrolled' : 'Enroll Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mentorship Tab */}
      {activeTab === 'mentorship' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mentorships.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs hover:border-[#A3A380] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={mentor.avatar}
                    alt={mentor.mentorName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#E5E2D9] shadow-xs"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-[#2D2D2A] font-serif-display">{mentor.mentorName}</h3>
                    <p className="text-xs text-[#7C7B76]">{mentor.mentorTitle}</p>
                    <span className="text-[11px] font-semibold text-[#5A5A40]">{mentor.company}</span>
                  </div>
                </div>

                <div className="bg-[#F2F1ED] p-3 rounded-lg border border-[#E5E2D9] mb-4">
                  <span className="text-[10px] font-bold uppercase text-[#5A5A40] tracking-wider block mb-1">
                    Discussion Topic:
                  </span>
                  <p className="text-xs font-semibold text-[#2D2D2A] leading-relaxed">
                    "{mentor.topic}"
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-[#7C7B76] mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#7C7B76]" />
                    <span>Slot: {mentor.date}, {mentor.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 text-[#8C5E3C] fill-[#8C5E3C]" />
                    <span>Mentor Rating: {mentor.rating} / 5.0</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onBookMentorship(mentor.id)}
                disabled={mentor.status === 'Booked'}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mentor.status === 'Booked'
                    ? 'bg-[#E8E8DF] text-[#7C7B76] border border-[#D5D5C6] cursor-not-allowed'
                    : 'bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] shadow-xs'
                }`}
              >
                {mentor.status === 'Booked' ? 'Session Confirmed' : 'Book 1-on-1 Video Session'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Program Curriculum Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F9F9F7] rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-[#E5E2D9] animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-[#2D2D2A] mb-1 font-serif-display">{selectedProgram.title}</h3>
            <p className="text-xs text-[#7C7B76] mb-4">Instructor: {selectedProgram.instructor}</p>

            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A5A40]">Course Syllabus & Live Labs</h4>
              {selectedProgram.modules.map((mod, i) => (
                <div key={i} className="p-3 bg-[#F2F1ED] rounded-lg text-xs font-medium text-[#2D2D2A] border border-[#E5E2D9] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#34583A] shrink-0" />
                  <span>{mod}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E2D9]">
              <button
                onClick={() => setSelectedProgram(null)}
                className="px-4 py-2 text-xs font-semibold text-[#5F5E59] hover:bg-[#E8E8DF] rounded-lg cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onEnrollProgram(selectedProgram.id);
                  setSelectedProgram(null);
                }}
                className="px-5 py-2 text-xs font-bold text-[#F9F9F7] bg-[#5A5A40] hover:bg-[#4A4A33] rounded-lg cursor-pointer"
              >
                Enroll with Free Cloud Sandbox
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
