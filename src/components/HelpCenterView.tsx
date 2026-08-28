import React, { useState } from 'react';
import { 
  LifeBuoy, 
  Search, 
  HelpCircle, 
  BadgeCheck, 
  Briefcase, 
  Landmark, 
  FolderLock, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  ExternalLink, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ThumbsUp, 
  Activity,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { 
  HelpCategory, 
  HelpArticle, 
  FAQItem, 
  SupportTicket, 
  LanguageCode 
} from '../types';
import { 
  initialHelpCategories, 
  initialHelpArticles, 
  initialFAQs, 
  initialSupportTickets,
  translations 
} from '../data/initialData';

interface HelpCenterViewProps {
  currentLanguage: LanguageCode;
  onNavigateToTab?: (tab: any) => void;
}

export const HelpCenterView: React.FC<HelpCenterViewProps> = ({
  currentLanguage,
  onNavigateToTab
}) => {
  const t = translations[currentLanguage] || translations.en;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
  const [tickets, setTickets] = useState<SupportTicket[]>(initialSupportTickets);
  
  // Ticket form state
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState('Skill Passport');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [newDescription, setNewDescription] = useState('');
  const [ticketSuccessToast, setTicketSuccessToast] = useState(false);

  // Filtered FAQs
  const filteredFaqs = initialFAQs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category.toLowerCase().includes(selectedCategory.replace('cat_', '').toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Filtered Articles
  const filteredArticles = initialHelpArticles.filter(art => {
    const matchesSearch = searchQuery === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      art.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || art.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newDescription.trim()) return;

    const newTicket: SupportTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: newSubject,
      category: newCategory,
      priority: newPriority,
      status: 'open',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      lastReply: 'Support specialist assigned. Estimated response time: < 2 hours.'
    };

    setTickets([newTicket, ...tickets]);
    setShowNewTicketModal(false);
    setNewSubject('');
    setNewDescription('');
    setTicketSuccessToast(true);
    setTimeout(() => setTicketSuccessToast(false), 5000);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BadgeCheck': return <BadgeCheck className="w-5 h-5 text-[#5A5A40]" />;
      case 'HelpCircle': return <HelpCircle className="w-5 h-5 text-[#5A5A40]" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-[#5A5A40]" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-[#5A5A40]" />;
      case 'FolderLock': return <FolderLock className="w-5 h-5 text-[#5A5A40]" />;
      default: return <ShieldCheck className="w-5 h-5 text-[#5A5A40]" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="bg-[#33332A] text-[#F9F9F7] rounded-2xl p-6 md:p-8 shadow-md border border-[#48483B] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#D4D4B8] text-xs font-bold uppercase tracking-wider mb-2">
            <LifeBuoy className="w-4 h-4 text-[#CFE0D1]" />
            <span>Enterprise Support & Knowledge Base</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-serif-display">SkillBridge Nexus Help Center</h1>
          <p className="text-sm text-[#C5C4BA] mt-1.5 max-w-2xl leading-relaxed">
            Find immediate answers on verified credentialing, assessment rubrics, industry MoUs, GitHub sync, and institutional compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNewTicketModal(true)}
            className="px-4 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] text-xs font-bold rounded-lg border border-[#6B6B4D] shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open Support Ticket</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {ticketSuccessToast && (
        <div className="bg-[#EAF1EB] border border-[#CFE0D1] text-[#34583A] p-4 rounded-xl flex items-center justify-between shadow-sm animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#34583A]" />
            <span className="text-xs font-bold">Support ticket dispatched successfully. A concierge agent has been assigned.</span>
          </div>
          <button onClick={() => setTicketSuccessToast(false)} className="text-xs font-semibold hover:underline">Dismiss</button>
        </div>
      )}

      {/* Live System Status Bar */}
      <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#5F5E59]">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#34583A]" />
          <span className="font-semibold text-[#2D2D2A]">Platform Status:</span>
          <span className="px-2 py-0.5 rounded-full bg-[#EAF1EB] text-[#34583A] font-bold border border-[#CFE0D1]">
            All Systems Operational (99.98% SLA)
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#7C7B76]">
          <span>Skill Hashing Engine: <strong className="text-[#34583A]">Active</strong></span>
          <span>•</span>
          <span>Proctoring Sandbox: <strong className="text-[#34583A]">Active</strong></span>
          <span>•</span>
          <span>Recruiter AI Matching: <strong className="text-[#34583A]">Active</strong></span>
          <span>•</span>
          <span>GitHub Sync API: <strong className="text-[#34583A]">Active</strong></span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs">
        <h2 className="text-base font-bold text-[#2D2D2A] mb-2 font-serif-display">Search Documentation & Knowledge Articles</h2>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7C7B76]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic, keyword (e.g. 'verification', 'resume', 'proctoring', 'GitHub')..."
            className="w-full pl-10 pr-4 py-3 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-sm text-[#2D2D2A] placeholder-[#7C7B76] focus:ring-2 focus:ring-[#5A5A40] focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Category Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#2D2D2A] font-serif-display">Help Categories</h2>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-semibold text-[#5A5A40] hover:underline cursor-pointer"
            >
              Clear Filter ({initialHelpCategories.find(c => c.id === selectedCategory)?.name})
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {initialHelpCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#E8E8DF] border-[#5A5A40] shadow-sm'
                    : 'bg-[#F9F9F7] border-[#E5E2D9] hover:border-[#A3A380] shadow-xs'
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#E8E8DF] border border-[#D5D5C6] flex items-center justify-center mb-3">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <h3 className="font-bold text-sm text-[#2D2D2A] mb-1 font-serif-display">{cat.name}</h3>
                  <p className="text-xs text-[#5F5E59] leading-relaxed mb-3">{cat.description}</p>
                </div>
                <div className="text-[11px] font-semibold text-[#7C7B76] flex items-center justify-between border-t border-[#E5E2D9] pt-2">
                  <span>{cat.articleCount} Articles</span>
                  <span className="text-[#5A5A40] font-bold">Explore &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Documentation Articles Preview / Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs">
            <h2 className="text-base font-bold text-[#2D2D2A] mb-4 font-serif-display flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#5A5A40]" />
              <span>Recommended Guides & Documentation</span>
            </h2>

            <div className="space-y-4">
              {filteredArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedArticle?.id === art.id
                      ? 'bg-[#E8E8DF] border-[#5A5A40]'
                      : 'bg-[#F2F1ED]/40 border-[#E5E2D9] hover:border-[#A3A380]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6]">
                        {art.readTime}
                      </span>
                      <span className="text-[11px] text-[#7C7B76]">{art.lastUpdated}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#5F5E59]">
                      <ThumbsUp className="w-3 h-3 text-[#5A5A40]" />
                      <span>{art.helpfulCount} helpful</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-[#2D2D2A] mb-1 font-serif-display">{art.title}</h3>
                  <p className="text-xs text-[#5F5E59] leading-relaxed mb-3">{art.excerpt}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {art.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] bg-[#F9F9F7] border border-[#E5E2D9] text-[#7C7B76] px-2 py-0.5 rounded-full font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Asked Questions Accordion */}
          <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs">
            <h2 className="text-base font-bold text-[#2D2D2A] mb-4 font-serif-display flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#5A5A40]" />
              <span>Frequently Asked Questions</span>
            </h2>

            <div className="divide-y divide-[#E5E2D9]">
              {filteredFaqs.map((faq) => {
                const isExpanded = expandedFaqId === faq.id;
                return (
                  <div key={faq.id} className="py-3.5">
                    <button
                      onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                      className="w-full flex items-center justify-between text-left gap-3 text-xs md:text-sm font-bold text-[#2D2D2A] cursor-pointer hover:text-[#5A5A40] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 bg-[#F2F1ED] text-[#7C7B76] rounded font-mono border border-[#E5E2D9]">
                          {faq.category}
                        </span>
                        <span>{faq.question}</span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#5A5A40] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#7C7B76] shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-2.5 pl-2 border-l-2 border-[#5A5A40] text-xs text-[#5F5E59] leading-relaxed space-y-2 animate-in fade-in">
                        <p>{faq.answer}</p>
                        <div className="flex items-center justify-between pt-2 text-[11px] text-[#7C7B76]">
                          <span>{faq.views} people found this solution</span>
                          <span className="text-[#5A5A40] font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-[#34583A]" /> Verified Official Guide
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Active Support Tickets & Selected Article Details */}
        <div className="space-y-6">
          {/* Article Full Detail (if selected) */}
          {selectedArticle ? (
            <div className="bg-[#F9F9F7] rounded-xl border border-[#5A5A40] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#5A5A40] tracking-wider">Active Article</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-xs text-[#7C7B76] hover:text-[#2D2D2A]"
                >
                  Close
                </button>
              </div>
              <h3 className="font-bold text-base text-[#2D2D2A] font-serif-display leading-tight">{selectedArticle.title}</h3>
              <p className="text-xs text-[#5F5E59] leading-relaxed bg-[#F2F1ED] p-3 rounded-lg border border-[#E5E2D9]">
                {selectedArticle.content}
              </p>
              <div className="text-[11px] text-[#7C7B76] flex items-center justify-between pt-2 border-t border-[#E5E2D9]">
                <span>Updated: {selectedArticle.lastUpdated}</span>
                <button 
                  onClick={() => alert("Marked as helpful! Thank you for your feedback.")}
                  className="text-xs text-[#34583A] font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <ThumbsUp className="w-3 h-3" /> Helpful
                </button>
              </div>
            </div>
          ) : null}

          {/* Active Support Tickets */}
          <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
              <h3 className="font-bold text-sm text-[#2D2D2A] font-serif-display">Your Active Support Tickets</h3>
              <span className="text-xs px-2 py-0.5 bg-[#E8E8DF] text-[#42422E] rounded-full font-bold border border-[#D5D5C6]">
                {tickets.length} Registered
              </span>
            </div>

            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="p-3.5 bg-[#F2F1ED]/60 rounded-xl border border-[#E5E2D9] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#5A5A40]">{ticket.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      ticket.status === 'resolved' 
                        ? 'bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1]' 
                        : 'bg-[#F7F3E8] text-[#7A6A32] border border-[#E9E0C7]'
                    }`}>
                      {ticket.status === 'resolved' ? '✓ Resolved' : 'In Progress'}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#2D2D2A] leading-tight">{ticket.subject}</h4>
                  <p className="text-[11px] text-[#5F5E59] leading-tight">{ticket.lastReply}</p>
                  <div className="text-[10px] text-[#7C7B76] pt-1 flex justify-between">
                    <span>Category: {ticket.category}</span>
                    <span>{ticket.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowNewTicketModal(true)}
              className="w-full py-2.5 bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit New Ticket</span>
            </button>
          </div>

          {/* Institutional Contact Card */}
          <div className="bg-[#E8E8DF] p-5 rounded-xl border border-[#D5D5C6] space-y-2 text-xs text-[#2D2D2A]">
            <h4 className="font-bold font-serif-display text-sm">Need Direct Registrar or Dean Verification?</h4>
            <p className="text-[#5F5E59] leading-relaxed">
              If your academic credentials require physical paper attestation or consular seals, contact the Columbia Academic Registrar at <span className="font-mono text-[#5A5A40]">registrar@columbia.edu</span>.
            </p>
          </div>
        </div>
      </div>

      {/* New Support Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F9F9F7] rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#E5E2D9] animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4 mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#5A5A40]" />
                <h3 className="text-lg font-bold text-[#2D2D2A] font-serif-display">Open Support Ticket</h3>
              </div>
              <button
                onClick={() => setShowNewTicketModal(false)}
                className="p-1 rounded-lg text-[#7C7B76] hover:text-[#2D2D2A] hover:bg-[#E8E8DF] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs md:text-sm">
              <div>
                <label className="block font-bold text-[#2D2D2A] mb-1">Subject / Issue Summary *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Discrepancy in BigQuery exam score verification"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full p-2.5 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-[#2D2D2A] focus:ring-2 focus:ring-[#5A5A40] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#2D2D2A] mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-[#2D2D2A] focus:ring-2 focus:ring-[#5A5A40] focus:outline-none font-semibold"
                  >
                    <option value="Skill Passport">Skill Passport & Verifications</option>
                    <option value="Assessments">Assessments & Proctoring</option>
                    <option value="Opportunities">Opportunities & Applications</option>
                    <option value="Document Vault">Document Vault & Hashing</option>
                    <option value="GitHub Sync">GitHub Integration & Repositories</option>
                    <option value="Account & Security">Account & Multi-Role</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#2D2D2A] mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full p-2.5 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-[#2D2D2A] focus:ring-2 focus:ring-[#5A5A40] focus:outline-none font-semibold"
                  >
                    <option value="low">Low (General Inquiry)</option>
                    <option value="medium">Medium (Standard Request)</option>
                    <option value="high">High (Assessment / Job Deadline)</option>
                    <option value="urgent">Urgent (Security / Access)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2D2D2A] mb-1">Detailed Description *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Please describe steps to reproduce, relevant transaction or credential IDs..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg text-[#2D2D2A] focus:ring-2 focus:ring-[#5A5A40] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E2D9]">
                <button
                  type="button"
                  onClick={() => setShowNewTicketModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#7C7B76] hover:bg-[#E8E8DF] rounded-lg cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-[#F9F9F7] bg-[#5A5A40] hover:bg-[#4A4A33] rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Ticket</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
