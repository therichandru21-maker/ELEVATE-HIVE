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
import { SaaSAuthScreen } from './components/SaaSAuthScreen';

import { ApplicationShell, DashboardRole } from './components/shell/ApplicationShell';
import { RecruiterDashboard } from './components/recruiter/RecruiterDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { HackathonOrganizerDashboard } from './components/hackathon/HackathonOrganizerDashboard';
import { StudentWorkspace } from './components/workspaces/StudentWorkspace';

import { getCurrentUser, logoutUser, UserProfile, INITIAL_DEMO_USERS } from './lib/authStore';
import { getEcosystemState, EcosystemState } from './lib/ecosystemStore';
import { FeatureCard, HackathonItem } from './types';
import { ArrowLeft, LayoutDashboard, Cpu, Sparkles } from 'lucide-react';

export default function App() {
  // Initial state: starts on the requested first interface (SaaSAuthScreen) unless already logged in
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    return getCurrentUser();
  });

  const [viewState, setViewState] = useState<'workspace' | 'landing'>('workspace');

  // Multi-role Dashboard State
  const [activeRole, setActiveRole] = useState<DashboardRole>(() => {
    const user = getCurrentUser();
    return (user?.role as DashboardRole) || 'recruiter';
  });

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
    setAuthModalOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setViewState('workspace'); // Renders SaaSAuthScreen cleanly
  };

  const handleRoleChange = (newRole: DashboardRole) => {
    setActiveRole(newRole);
    setActiveTab('overview');
    
    // Switch to corresponding demo user profile so names, organizations, and IDs match
    const demoUser = INITIAL_DEMO_USERS.find(u => u.role === newRole);
    if (demoUser) {
      const { password: _, ...safeUser } = demoUser;
      setCurrentUser(safeUser);
      localStorage.setItem('elevate_hive_current_user_v2', JSON.stringify(safeUser));
    } else if (currentUser) {
      const updated: UserProfile = { ...currentUser, role: newRole as any };
      setCurrentUser(updated);
      localStorage.setItem('elevate_hive_current_user_v2', JSON.stringify(updated));
    }
  };

  const handleSelectFeatureDemo = (feature: FeatureCard) => {
    const el = document.getElementById('solutions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegisterHackathon = (hackathon: HackathonItem) => {
    setActiveRole('hackathon-creator');
    setActiveTab('overview');
    setViewState('workspace');
  };

  const handleSelectPlan = (planName: string) => {
    setViewState('workspace');
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
        return <StudentWorkspace user={currentUser} onLogout={handleLogout} onRoleChange={handleRoleChange} />;
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
      
      {/* 1. SaaS Workspaces (Default & Primary Experience) */}
      {viewState === 'workspace' ? (
        currentUser ? (
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
          <SaaSAuthScreen
            onSuccessLogin={handleSuccessLogin}
            onViewLandingPage={() => setViewState('landing')}
          />
        )
      ) : (
        /* 2. Optional Public Landing Page View */
        <div className="min-h-screen flex flex-col">
          {/* Top Return Banner */}
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-500/30 px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs sticky top-0 z-50 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold border border-indigo-500/30">
                Showcase Mode
              </span>
              <span className="text-slate-300 hidden sm:inline">
                Elevate Hive Public Innovation Portal
              </span>
            </div>
            <button
              onClick={() => setViewState('workspace')}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-950"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Launch SaaS Dashboards</span>
            </button>
          </div>

          <Navbar
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
            onOpenDemo={() => setDemoModalOpen(true)}
            onOpenWorkspace={() => setViewState('workspace')}
            onLogout={handleLogout}
          />

          <main className="flex-1">
            <Hero
              onGetStarted={() => {
                setViewState('workspace');
              }}
              onWatchDemo={() => setDemoModalOpen(true)}
            />
            <Statistics />
            <FeatureCards onSelectFeatureDemo={handleSelectFeatureDemo} />
            <InteractiveGenerators />
            <HackathonsSection onRegisterHackathon={handleRegisterHackathon} />
            <CommunitySection />
            <Testimonials />
            <FAQSection />
            <PricingSection onSelectPlan={handleSelectPlan} />
            <Footer />
          </main>
        </div>
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
