import React from 'react';
import { useApp } from './context/AppContext';
import TopNavbar from './components/common/TopNavbar';
import Sidebar from './components/common/Sidebar';
import NotificationToast from './components/common/NotificationToast';

// Pages
import LoginPage from './pages/LoginPage';
import GovDashboardPage from './pages/GovDashboardPage';
import GovChallengesPage from './pages/GovChallengesPage';
import GovStartupsPage from './pages/GovStartupsPage';
import GovComparePage from './pages/GovComparePage';
import GovEvidencePage from './pages/GovEvidencePage';
import GovEvaluationPage from './pages/GovEvaluationPage';
import GovContractPage from './pages/GovContractPage';
import GovPilotHubPage from './pages/GovPilotHubPage';
import GovMilestonePaymentsPage from './pages/GovMilestonePaymentsPage';
import GovPilotDataPage from './pages/GovPilotDataPage';
import GovAnomalyCenterPage from './pages/GovAnomalyCenterPage';
import GovValidationPage from './pages/GovValidationPage';
import GovScaleSimulatorPage from './pages/GovScaleSimulatorPage';
import GovDecisionPage from './pages/GovDecisionPage';
import GovProcurementPage from './pages/GovProcurementPage';
import GovKnowledgePage from './pages/GovKnowledgePage';
import GovDemandHeatmapPage from './pages/GovDemandHeatmapPage';

import StartupDashboardPage from './pages/StartupDashboardPage';
import StartupProfilePage from './pages/StartupProfilePage';
import StartupPassportPage from './pages/StartupPassportPage';
import StartupApplicationsPage from './pages/StartupApplicationsPage';
import StartupPilotViewPage from './pages/StartupPilotViewPage';
import StartupPaymentsPage from './pages/StartupPaymentsPage';

import ExpertDashboardPage from './pages/ExpertDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminVerificationPage from './pages/AdminVerificationPage';

export default function App() {
  const { persona, currentView } = useApp();

  // If user is on login page
  if (currentView === 'login') {
    return (
      <div className="min-h-screen">
        <NotificationToast />
        <LoginPage />
      </div>
    );
  }

  // Render appropriate view based on persona & currentView
  const renderCurrentView = () => {
    switch (currentView) {
      case 'challenges':
        return <GovChallengesPage />;
      case 'startups':
        return <GovStartupsPage />;
      case 'compare':
        return <GovComparePage />;
      case 'evidence':
      case 'passport':
        if (persona === 'startup') return <StartupPassportPage />;
        return <GovEvidencePage />;
      case 'evaluations':
        return <GovEvaluationPage />;
      case 'contracts':
        return <GovContractPage />;
      case 'pilots':
        return <GovPilotHubPage />;
      case 'payments':
        if (persona === 'startup') return <StartupPaymentsPage />;
        return <GovMilestonePaymentsPage />;
      case 'data':
        return <GovPilotDataPage />;
      case 'anomalies':
        return <GovAnomalyCenterPage />;
      case 'validation':
        return <GovValidationPage />;
      case 'scale':
        return <GovScaleSimulatorPage />;
      case 'decisions':
        return <GovDecisionPage />;
      case 'procurement':
        return <GovProcurementPage />;
      case 'knowledge':
        return <GovKnowledgePage />;
      case 'analytics':
        return <GovDemandHeatmapPage />;
      case 'applications':
        return <StartupApplicationsPage />;
      case 'profile':
        return <StartupProfilePage />;
      case 'workspace':
        return <StartupPilotViewPage />;
      case 'verification':
        return <AdminVerificationPage />;
      case 'dashboard':
      default:
        if (persona === 'startup') return <StartupDashboardPage />;
        if (persona === 'expert') return <ExpertDashboardPage />;
        if (persona === 'admin') return <AdminDashboardPage />;
        return <GovDashboardPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NotificationToast />
      
      {/* Global Top Navbar */}
      <TopNavbar />

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        {/* Dynamic Page Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}
