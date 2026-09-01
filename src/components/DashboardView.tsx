import React from 'react';
import { UserProfile, Opportunity, Assessment, Application, ActiveTab } from '../types';
import { StudentDashboard } from './dashboards/StudentDashboard';
import { RecruiterDashboard } from './dashboards/RecruiterDashboard';
import { AcademicianDashboard } from './dashboards/AcademicianDashboard';
import { AdminDashboard } from './dashboards/AdminDashboard';

interface DashboardViewProps {
  profile: UserProfile;
  opportunities: Opportunity[];
  assessments: Assessment[];
  applications: Application[];
  onNavigate: (tab: ActiveTab) => void;
  onOpenPostOpportunity?: () => void;
  onOpenJudgeShowcase?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  opportunities,
  assessments,
  applications,
  onNavigate,
  onOpenPostOpportunity,
  onOpenJudgeShowcase
}) => {
  switch (profile.role) {
    case 'recruiter':
      return (
        <RecruiterDashboard
          profile={profile}
          opportunities={opportunities}
          onNavigate={onNavigate}
          onOpenPostOpportunity={onOpenPostOpportunity}
          onOpenJudgeShowcase={onOpenJudgeShowcase}
        />
      );

    case 'academician':
      return (
        <AcademicianDashboard
          profile={profile}
          opportunities={opportunities}
          onNavigate={onNavigate}
          onOpenJudgeShowcase={onOpenJudgeShowcase}
        />
      );

    case 'institution_admin':
      return (
        <AdminDashboard
          profile={profile}
          opportunities={opportunities}
          onNavigate={onNavigate}
          onOpenJudgeShowcase={onOpenJudgeShowcase}
        />
      );

    case 'student':
    default:
      return (
        <StudentDashboard
          profile={profile}
          opportunities={opportunities}
          assessments={assessments}
          applications={applications}
          onNavigate={onNavigate}
          onOpenJudgeShowcase={onOpenJudgeShowcase}
        />
      );
  }
};
