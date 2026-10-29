import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Statistics } from './components/Statistics';
import { FeatureCards } from './components/FeatureCards';
import { InteractiveGenerators } from './components/InteractiveGenerators';
import { HackathonsSection } from './components/HackathonsSection';
import { CommunitySection } from './components/CommunitySection';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { PricingSection } from './components/PricingSection';
import { Footer } from './components/Footer';
import { WatchDemoModal } from './components/WatchDemoModal';
import { AuthModal } from './components/AuthModal';

import { ApplicationShell, DashboardRole } from './components/shell/ApplicationShell';
import { RecruiterDashboard } from './components/recruiter/RecruiterDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { HackathonOrganizerDashboard } from './components/hackathon/HackathonOrganizerDashboard';
import { StudentWorkspace } from './components/workspaces/StudentWorkspace';

import { getCurrentUser, logoutUser, UserProfile } from './lib/authStore';
import { getEcosystemState, EcosystemState } from './lib/ecosystemStore';
import { FeatureCard, HackathonItem } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [viewState, setViewState] = useState<'landing' | 'workspace'>('landing');

  // Multi-role Dashboard State
  const [activeRole, setActiveRole] = useState<DashboardRole>('recruiter');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [ecosystem, setEcosystem] = useState<EcosystemState>(getEcosystemState());

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setActiveRole(user.role as DashboardRole);
    }
    setEcosystem(getEcosystemState());
  }, []);

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleSuccessLogin = (user: UserProfile) => {
    setCurrentUser(user);
    setActiveRole(user.role as DashboardRole);
    setActiveTab('overview');
    setViewState('workspace');
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setViewState('landing');
  };

  const handleRoleChange = (newRole: DashboardRole) => {
    setActiveRole(newRole);
    setActiveTab('overview');
  };

  const handleSelectFeatureDemo = (feature: FeatureCard) => {
    const el = document.getElementById('solutions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegisterHackathon = (hackathon: HackathonItem) => {
    if (!currentUser) {
      handleOpenAuth('signup');
    } else {
      setActiveRole('hackathon-creator');
      setActiveTab('overview');
      setViewState('workspace');
    }
  };

  const handleSelectPlan = (planName: string) => {
    if (!currentUser) {
      handleOpenAuth('signup');
    } else {
      setViewState('workspace');
    }
  };

  const renderActiveDashboardContent = () => {
    if (!currentUser) return null;

    switch (activeRole) {
      case 'recruiter':
        return (
          <RecruiterDashboard
            user={currentUser}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            ecosystem={ecosystem}
            onUpdateEcosystem={setEcosystem}
          />
        );
      case 'teacher-mentor':
        return (
          <TeacherDashboard
            user={currentUser}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            ecosystem={ecosystem}
            onUpdateEcosystem={setEcosystem}
          />
        );
      case 'hackathon-creator':
        return (
          <HackathonOrganizerDashboard
            user={currentUser}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            ecosystem={ecosystem}
            onUpdateEcosystem={setEcosystem}
          />
        );
      case 'student':
        return <StudentWorkspace user={currentUser} />;
      default:
        return (
          <RecruiterDashboard
            user={currentUser}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            ecosystem={ecosystem}
            onUpdateEcosystem={setEcosystem}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Top Navbar for Public Portal */}
      {viewState === 'landing' && (
        <Navbar
          currentUser={currentUser}
          onOpenAuth={handleOpenAuth}
          onOpenDemo={() => setDemoModalOpen(true)}
          onOpenWorkspace={() => setViewState('workspace')}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content View Switcher */}
      {viewState === 'workspace' && currentUser ? (
        activeRole === 'student' ? (
          <StudentWorkspace
            user={currentUser}
            onLogout={handleLogout}
            onRoleChange={handleRoleChange}
            onExitToLanding={() => setViewState('landing')}
          />
        ) : (
          <ApplicationShell
            currentUser={currentUser}
            activeRole={activeRole}
            onRoleChange={handleRoleChange}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onLogout={handleLogout}
            onExitToLanding={() => setViewState('landing')}
            ecosystem={ecosystem}
          >
            {renderActiveDashboardContent()}
          </ApplicationShell>
        )
      ) : (
        /* Public Landing Page View */
        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            onGetStarted={() => handleOpenAuth('signup')}
            onWatchDemo={() => setDemoModalOpen(true)}
          />

          {/* Statistics */}
          <Statistics />

          {/* 6 Core Feature Cards */}
          <FeatureCards
            onSelectFeatureDemo={handleSelectFeatureDemo}
          />

          {/* Live Interactive AI Hackathon Generator & Team Builder Playground */}
          <InteractiveGenerators />

          {/* Featured College Hackathons */}
          <HackathonsSection
            onRegisterHackathon={handleRegisterHackathon}
          />

          {/* Community Projects & Discord Hub */}
          <CommunitySection />

          {/* Testimonials */}
          <Testimonials />

          {/* FAQ Section */}
          <FAQSection />

          {/* Pricing Plans */}
          <PricingSection
            onSelectPlan={handleSelectPlan}
          />

          {/* Footer */}
          <Footer />
        </main>
      )}

      {/* Interactive Modals */}
      <WatchDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />

      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccessLogin={handleSuccessLogin}
      />
    </div>
  );
}
