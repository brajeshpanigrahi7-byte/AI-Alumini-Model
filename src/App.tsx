import React, { useState, useEffect } from 'react';
import { 
  ActiveTab, 
  UserRole, 
  LanguageCode, 
  UserProfile, 
  Milestone, 
  AssessmentResult, 
  Opportunity, 
  DocumentItem,
  NotificationItem
} from './types';
import { 
  initialUserProfile, 
  initialAssessments, 
  initialOpportunities, 
  initialLearningPrograms, 
  initialDocuments, 
  initialMentorships, 
  initialApplications,
  initialNotifications,
  translations 
} from './data/initialData';
import { TopNavBar } from './components/TopNavBar';
import { SideNavBar } from './components/SideNavBar';
import { ProfileView } from './components/ProfileView';
import { DashboardView } from './components/DashboardView';
import { SkillPassportView } from './components/SkillPassportView';
import { AssessmentsView } from './components/AssessmentsView';
import { OpportunitiesView } from './components/OpportunitiesView';
import { LearningProgramsView } from './components/LearningProgramsView';
import { AcademicianHubView } from './components/AcademicianHubView';
import { AnalyticsView } from './components/AnalyticsView';
import { DocumentVaultView } from './components/DocumentVaultView';
import { CollaborationHubView } from './components/CollaborationHubView';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PostOpportunityModal } from './components/Modals/PostOpportunityModal';
import { PublicPortfolioModal } from './components/Modals/PublicPortfolioModal';
import { ResumeModal } from './components/Modals/ResumeModal';
import { AddMilestoneModal } from './components/Modals/AddMilestoneModal';

export default function App() {
  // Local persistence states
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Domain data
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('nexus_user_profile');
    return saved ? JSON.parse(saved) : initialUserProfile;
  });

  const [assessments, setAssessments] = useState(() => {
    const saved = localStorage.getItem('nexus_assessments');
    return saved ? JSON.parse(saved) : initialAssessments;
  });

  const [opportunities, setOpportunities] = useState(() => {
    const saved = localStorage.getItem('nexus_opportunities');
    return saved ? JSON.parse(saved) : initialOpportunities;
  });

  const [learningPrograms, setLearningPrograms] = useState(() => {
    const saved = localStorage.getItem('nexus_learning');
    return saved ? JSON.parse(saved) : initialLearningPrograms;
  });

  const [mentorships, setMentorships] = useState(() => {
    const saved = localStorage.getItem('nexus_mentorships');
    return saved ? JSON.parse(saved) : initialMentorships;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('nexus_applications');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('nexus_documents');
    return saved ? JSON.parse(saved) : initialDocuments;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('nexus_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Modals state
  const [isPostOpportunityOpen, setIsPostOpportunityOpen] = useState(false);
  const [isPublicViewOpen, setIsPublicViewOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isAddMilestoneOpen, setIsAddMilestoneOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('nexus_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('nexus_assessments', JSON.stringify(assessments));
  }, [assessments]);

  useEffect(() => {
    localStorage.setItem('nexus_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem('nexus_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('nexus_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('nexus_learning', JSON.stringify(learningPrograms));
  }, [learningPrograms]);

  useEffect(() => {
    localStorage.setItem('nexus_mentorships', JSON.stringify(mentorships));
  }, [mentorships]);

  useEffect(() => {
    localStorage.setItem('nexus_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Handlers
  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleAddMilestone = (newMilestone: Milestone) => {
    setUserProfile(prev => ({
      ...prev,
      milestones: [newMilestone, ...prev.milestones]
    }));
  };

  const handleCompleteCertificationTask = () => {
    const newCert = {
      id: `c_${Date.now()}`,
      name: 'Google Cloud MLOps & Production Pipelines',
      issuer: 'Google Cloud & Nexus Enterprise',
      issueDate: 'August 2026',
      credentialId: 'GCP-MLOPS-2026-X99',
      credentialUrl: 'https://cloud.google.com/verify',
      verified: true,
      badgeIcon: 'cloud',
      skills: ['MLOps', 'Docker', 'Kubernetes', 'CI/CD']
    };

    setUserProfile(prev => ({
      ...prev,
      completionPercentage: 100,
      certifications: [newCert, ...prev.certifications]
    }));

    alert("Advanced MLOps Certification verified! Profile is now 100% complete.");
  };

  const handleUpdateBio = (newBio: string) => {
    setUserProfile(prev => ({
      ...prev,
      bio: newBio
    }));
  };

  const handleEndorseSkill = (skillId: string) => {
    setUserProfile(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === skillId ? { ...s, endorsementsCount: s.endorsementsCount + 1 } : s)
    }));
  };

  const handleCompleteAssessment = (assessmentId: string, score: number, result: AssessmentResult) => {
    setAssessments(prev => prev.map(a => a.id === assessmentId ? {
      ...a,
      completed: true,
      lastScore: score,
      lastTakenDate: new Date().toISOString().split('T')[0]
    } : a));

    // Update corresponding skill in profile
    if (assessmentId === 'as_cloud_mlops') {
      setUserProfile(prev => ({
        ...prev,
        skills: prev.skills.map(s => s.id === 's9' ? { ...s, proficiency: score, verified: true } : s)
      }));
    }

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Assessment Score Recorded!',
      message: `You earned ${score}% on ${result.assessmentTitle}. Verified on your Digital Skill Passport.`,
      timestamp: 'Just now',
      read: false,
      type: 'assessment',
      linkTab: 'skill_passport'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleApplyOpportunity = (opportunity: Opportunity, customPitch: string) => {
    const newApp = {
      id: `app_${Date.now()}`,
      opportunityId: opportunity.id,
      opportunityTitle: opportunity.title,
      company: opportunity.company,
      type: opportunity.type,
      applicantId: userProfile.id,
      applicantName: userProfile.name,
      applicantRole: currentRole,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied' as const,
      matchScore: opportunity.matchScore || 90,
      notes: customPitch
    };

    setApplications(prev => [newApp, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Application Successfully Submitted',
      message: `Your verified profile was submitted to ${opportunity.company} for ${opportunity.title}.`,
      timestamp: 'Just now',
      read: false,
      type: 'application',
      linkTab: 'opportunities'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handlePostOpportunity = (opp: Opportunity) => {
    setOpportunities(prev => [opp, ...prev]);
    alert(`Opportunity "${opp.title}" published to Nexus Network with verified skill criteria.`);
  };

  const handleEnrollProgram = (id: string) => {
    setLearningPrograms(prev => prev.map(p => p.id === id ? { ...p, status: 'Enrolled' } : p));
    alert("Successfully enrolled in program! Sandbox environment credentials dispatched.");
  };

  const handleBookMentorship = (id: string) => {
    setMentorships(prev => prev.map(m => m.id === id ? { ...m, status: 'Booked' } : m));
    alert("Mentorship session confirmed! Google Meet calendar invite sent.");
  };

  const handleUploadDocument = (doc: DocumentItem) => {
    setDocuments(prev => [doc, ...prev]);
  };

  return (
    <div className="bg-[#F2F1ED] text-[#2D2D2A] min-h-screen flex flex-col md:flex-row antialiased selection:bg-[#5A5A40] selection:text-[#F9F9F7]">
      {/* Top Navbar */}
      <TopNavBar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        isOffline={isOffline}
        onToggleOffline={() => setIsOffline(!isOffline)}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateToTab={setActiveTab}
        userAvatar={userProfile.avatar}
      />

      {/* Side Navbar */}
      <SideNavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenPostOpportunity={() => setIsPostOpportunityOpen(true)}
        currentLanguage={currentLanguage}
        currentRole={currentRole}
      />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[280px] md:mt-16 pt-6 pb-24 md:pb-12 px-4 md:px-8 max-w-[1440px] mx-auto w-full transition-all">
        {/* Offline Banner if Active */}
        {isOffline && (
          <div className="mb-6 p-3 bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6] rounded-xl text-xs flex items-center justify-between shadow-xs">
            <span>
              <strong>Offline Mode Active:</strong> All changes are safely cached in IndexedDB/LocalState. Changes will auto-sync once connectivity is restored.
            </span>
            <button
              onClick={() => setIsOffline(false)}
              className="px-2.5 py-1 bg-[#5A5A40] text-[#F9F9F7] rounded-lg font-bold hover:bg-[#4A4A33] transition-colors"
            >
              Re-connect
            </button>
          </div>
        )}

        {/* Dynamic Views */}
        {activeTab === 'profile' && (
          <ProfileView
            profile={userProfile}
            onOpenPublicView={() => setIsPublicViewOpen(true)}
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
            onOpenAddMilestone={() => setIsAddMilestoneOpen(true)}
            onCompleteCertificationTask={handleCompleteCertificationTask}
            onUpdateBio={handleUpdateBio}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            profile={userProfile}
            opportunities={opportunities}
            assessments={assessments}
            applications={applications}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'skill_passport' && (
          <SkillPassportView
            profile={userProfile}
            onNavigateToAssessments={() => setActiveTab('assessments')}
            onNavigateToLearning={() => setActiveTab('learning_programs')}
            onEndorseSkill={handleEndorseSkill}
          />
        )}

        {activeTab === 'assessments' && (
          <AssessmentsView
            assessments={assessments}
            onCompleteAssessment={handleCompleteAssessment}
          />
        )}

        {activeTab === 'opportunities' && (
          <OpportunitiesView
            opportunities={opportunities}
            applications={applications}
            userProfile={userProfile}
            currentRole={currentRole}
            onApplyOpportunity={handleApplyOpportunity}
            onOpenPostOpportunity={() => setIsPostOpportunityOpen(true)}
          />
        )}

        {activeTab === 'learning_programs' && (
          <LearningProgramsView
            programs={learningPrograms}
            mentorships={mentorships}
            onEnrollProgram={handleEnrollProgram}
            onBookMentorship={handleBookMentorship}
          />
        )}

        {activeTab === 'academician_hub' && (
          <AcademicianHubView
            opportunities={opportunities}
            onOpenPostOpportunity={() => setIsPostOpportunityOpen(true)}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView />
        )}

        {activeTab === 'documents' && (
          <DocumentVaultView
            documents={documents}
            onUploadDocument={handleUploadDocument}
          />
        )}

        {activeTab === 'collaboration' && (
          <CollaborationHubView />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Interactive Modals */}
      <PostOpportunityModal
        isOpen={isPostOpportunityOpen}
        onClose={() => setIsPostOpportunityOpen(false)}
        onPostOpportunity={handlePostOpportunity}
      />

      <PublicPortfolioModal
        isOpen={isPublicViewOpen}
        onClose={() => setIsPublicViewOpen(false)}
        profile={userProfile}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        profile={userProfile}
      />

      <AddMilestoneModal
        isOpen={isAddMilestoneOpen}
        onClose={() => setIsAddMilestoneOpen(false)}
        onAddMilestone={handleAddMilestone}
      />
    </div>
  );
}
