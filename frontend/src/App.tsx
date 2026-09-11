import React from 'react';
import { CityProvider, useCity } from './context/CityContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { ScenarioBuilderPage } from './pages/ScenarioBuilderPage';
import { TrafficAnalysisPage } from './pages/TrafficAnalysisPage';
import { FloodRiskPage } from './pages/FloodRiskPage';
import { AirPollutionPage } from './pages/AirPollutionPage';
import { EmergencyResponsePage } from './pages/EmergencyResponsePage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { ScenarioComparisonPage } from './pages/ScenarioComparisonPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { ReportsPage } from './pages/ReportsPage';
import { LoginPage } from './pages/LoginPage';
import { LoginModal } from './components/Auth/LoginModal';
import { CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, toastMessage } = useCity();

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardPage />;
      case 'digital-twin':
        return <DigitalTwinPage />;
      case 'scenario-builder':
        return <ScenarioBuilderPage />;
      case 'traffic':
        return <TrafficAnalysisPage />;
      case 'flood':
        return <FloodRiskPage />;
      case 'pollution':
        return <AirPollutionPage />;
      case 'emergency':
        return <EmergencyResponsePage />;
      case 'infrastructure':
        return <InfrastructurePage />;
      case 'compare':
        return <ScenarioComparisonPage />;
      case 'recommendations':
        return <RecommendationsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'login':
        return <LoginPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex-1 px-4 lg:px-5 pb-5 overflow-y-auto">
      {renderView()}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[3000] bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center space-x-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

const AppShell: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    currentUser, 
    setCurrentUser, 
    showToast 
  } = useCity();

  // If on login view, render the dedicated full-screen two-column LoginPage
  if (activeView === 'login') {
    return (
      <LoginPage 
        onLoginSuccess={() => setActiveView('dashboard')} 
      />
    );
  }

  return (
    <div className="h-screen w-full bg-[#F0F2F9] flex overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header />
        <MainContent />
      </div>

      {/* Global Login & Profile Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        onLogin={(user) => {
          setCurrentUser(user);
          showToast(`Logged in as ${user.name}`);
        }}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Signed out of session');
        }}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CityProvider>
      <AppShell />
    </CityProvider>
  );
};

export default App;
