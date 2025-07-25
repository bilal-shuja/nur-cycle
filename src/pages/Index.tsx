
import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Baby, BookOpen, Lightbulb, Moon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Tracker from '@/components/Tracker';
import HealthInsights from '@/components/HealthInsights';
import IslamicGuidance from '@/components/IslamicGuidance';
import AuthModal from '@/components/AuthModal';
import CalendarWidget from '@/components/CalendarWidget';
import DailyInsights from '@/components/DailyInsights';
import CycleStats from '@/components/CycleStats';
import CycleChart from '@/components/CycleChart';
import OnboardingFlow, { OnboardingData } from '@/components/onboarding/OnboardingFlow';
import ProfileSettings from '@/components/ProfileSettings';
import PrePeriodPreparation from '@/components/PrePeriodPreparation';
import PeriodTracker from '@/components/PeriodTracker';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const [userPreferences, setUserPreferences] = useState<OnboardingData | null>(null);
  const [userMetadata, setUserMetadata] = useState<null>(null);
  const { getLocalizedText } = useLanguage();


  const [settings, setSettings] = useState({
    // Notifications
    periodReminders: true,
    ovulationAlerts: true,
    symptomsTracking: false,
    dailyCheckIns: true,
    latePerodAlerts: true,
    fertilityInsights: true,
    medicationReminders: false,
    appointmentReminders: true,
    cycleAnalysis: true,
    // Privacy
    biometricLock: false,
    passcodeRequired: false,
    hideFromRecents: false,
    incognitoMode: false,
    dataEncryption: true,
    locationTracking: false,
    crashReporting: true,
    // Display
    darkMode: false,
    compactView: false,
    showEmojis: true,
    colorfulTheme: true,
    highContrast: false,
    fontSize: 'medium',
    // Data
    autoBackup: true,
    syncEnabled: true,
    offlineMode: false,
    dataExport: true,
    // Advanced
    developerMode: false,
    betaFeatures: false,
    analytics: true
  });


  useEffect(() => {

    const savedSettings = localStorage.getItem('nurcycle-app-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsedSettings }));

        if (parsedSettings.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
    else {
      document.documentElement.classList.remove('dark');
    }


  }, []);

  // Check if user has completed onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('nurcycle-onboarding-completed');
    const storedPreferences = localStorage.getItem('nurcycle-user-preferences');

    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    } else if (storedPreferences) {
      setUserPreferences(JSON.parse(storedPreferences));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('userMetadata');
      if (stored) {
        try {
          const userMetadataParsed = JSON.parse(stored);
          setUserMetadata(userMetadataParsed);
        } catch (err) {
          return err;
        }
      }
    }
  }, []);



  const handleOnboardingComplete = (data: OnboardingData) => {
    setUserPreferences(data);
    setShowOnboarding(false);
    localStorage.setItem('nurcycle-onboarding-completed', 'true');
    localStorage.setItem('nurcycle-user-preferences', JSON.stringify(data));
  };

  const handleSkipOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('nurcycle-onboarding-completed', 'true');
  };

  if (!userMetadata && showOnboarding) {
    return (
      <OnboardingFlow
        onComplete={handleOnboardingComplete}
        onSkip={handleSkipOnboarding}
      />
    );
  }




  const renderActiveSection = () => {
    switch (activeSection) {
      case 'tracker':
        return <Tracker />;
      case 'insights':
        return <HealthInsights />;
      case 'ask-the-deen':
        return <IslamicGuidance />;
      case 'profile':
        return <ProfileSettings userPreferences={userPreferences} onUpdatePreferences={setUserPreferences} />;
      case 'calendar':
        return <PeriodTracker />;
      default:
        return <Dashboard setActiveSection={setActiveSection} userPreferences={userPreferences} userMetadata={userMetadata} />;
    }
  };

  return (

    <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-lavender-50 to-lavender-200'}`}>
      <main className="container mx-auto px-4 py-6 max-w-md pb-10">
        {renderActiveSection()}
      </main>

      {/* Fixed Navigation - Always visible */}
      <div className={`sticky bottom-0 left-0 right-0 z-50 ${settings.darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-t border-lavender-200'} shadow-md`}>
        <Navigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          user={user}
          onAuthClick={() => setIsAuthModalOpen(true)}
        />
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuth={setUser}
      />
    </div>
  );
};

const Dashboard = ({ setActiveSection, userPreferences, userMetadata }: {
  setActiveSection: (section: string) => void;
  userPreferences: OnboardingData | null;
  userMetadata: any;
}) => {
  const { getLocalizedText } = useLanguage();

  const userName = userMetadata?.full_name || 'Sister'


  const [settings, setSettings] = useState({
    // Notifications
    periodReminders: true,
    ovulationAlerts: true,
    symptomsTracking: false,
    dailyCheckIns: true,
    latePerodAlerts: true,
    fertilityInsights: true,
    medicationReminders: false,
    appointmentReminders: true,
    cycleAnalysis: true,
    // Privacy
    biometricLock: false,
    passcodeRequired: false,
    hideFromRecents: false,
    incognitoMode: false,
    dataEncryption: true,
    locationTracking: false,
    crashReporting: true,
    // Display
    darkMode: false,
    compactView: false,
    showEmojis: true,
    colorfulTheme: true,
    highContrast: false,
    fontSize: 'medium',
    // Data
    autoBackup: true,
    syncEnabled: true,
    offlineMode: false,
    dataExport: true,
    // Advanced
    developerMode: false,
    betaFeatures: false,
    analytics: true
  });


  useEffect(() => {

    const savedSettings = localStorage.getItem('nurcycle-app-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsedSettings }));

        if (parsedSettings.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
    else {
      document.documentElement.classList.remove('dark');
    }

  }, []);



  return (
    <div className="space-y-6">



      <div className={`text-center relative overflow-hidden ${settings.darkMode ? 'bg-slate-900 text-white' : ''}`}>
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className={`animate-pulse absolute top-0 left-0 w-20 h-20 rounded-full ${settings.darkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-lavender-300 to-lavender-500'}`}></div>
          <div className={`animate-pulse absolute top-10 right-0 w-16 h-16 rounded-full animation-delay-500 ${settings.darkMode ? 'bg-slate-700' : 'bg-gradient-to-br from-lavender-400 to-lavender-600'}`}></div>
          <div className={`animate-pulse absolute bottom-0 left-1/2 w-12 h-12 rounded-full animation-delay-1000 ${settings.darkMode ? 'bg-slate-600' : 'bg-gradient-to-br from-lavender-500 to-lavender-700'}`}></div>
        </div>

        <div className="relative z-10">
          {/* Main title with logo at the end - Made more vibrant */}
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-lavender-700 via-lavender-500 to-lavender-800 bg-clip-text text-transparent flex items-center justify-center drop-shadow-lg">
            <span>{getLocalizedText('app.title')}</span>
            <img
              src="/lovable-uploads/9ab8e7ae-1fa2-4cf6-bad2-a54d6582474b.png"
              alt="NurCycle Logo"
              className="w-10 h-10 drop-shadow-md"
              style={{ marginLeft: '-0.3em' }}
            />
          </h1>
          <h2 className={`text-xl font-semibold mb-4 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
            {getLocalizedText('greeting')}, {userName}! 🌸
          </h2>
          <p className={`text-base px-4 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {getLocalizedText('welcome.subtitle')}
          </p>
          {userPreferences?.madhhab && userPreferences.madhhab !== 'unknown' && (
            <p className={`${settings.darkMode ? 'text-purple-400' : 'text-lavender-600'} text-sm mt-2`}>
              {getLocalizedText('welcome.madhhab.following', { madhhab: userPreferences.madhhab })}
            </p>
          )}
        </div>
      </div>

      {/* Calendar Widget */}
      <CalendarWidget onNavigateToTracker={() => setActiveSection('tracker')} onNavigateToCalendar={() => setActiveSection('calendar')} />

      {/* Have a Read Before You Bleed - Using PrePeriodPreparation */}
      <PrePeriodPreparation />

      {/* Daily Insights */}
      <DailyInsights />

      {/* Cycle Chart */}
      <CycleChart />

      {/* Cycle Statistics */}
      <CycleStats />

      {/* Islamic Reminder Card */}
    
      <Card className="relative overflow-hidden card-3d">
        <div className="absolute inset-0  dark:hidden"></div>
        <div className="absolute inset-0 hidden dark:block bg-slate-800"></div>
        <div className="absolute inset-0 opacity-20 dark:hidden">
          <div className="animate-pulse absolute top-0 right-0 w-16 h-16 bg-lavender-300 rounded-full"></div>
          <div className="animate-pulse absolute bottom-0 left-0 w-12 h-12 bg-lavender-400 rounded-full animation-delay-700"></div>
        </div>

        <CardContent className="p-6 text-center relative z-10">
          <h2 className={`text-xl font-bold mb-4 text-deep-lavender ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>
            {getLocalizedText('islamic.reminder.title')}
          </h2>
          <p className={`text-base text-deep-lavender font-bold bg-gradient-to-r from-lavender-700 via-lavender-800 to-lavender-900 bg-clip-text text-transparent opacity-800 ${settings.darkMode ? 'text-white' : ''}`}>
            {getLocalizedText('islamic.reminder.quote')}
          </p>
          <p className={`text-sm text-deep-lavender font-bold bg-gradient-to-r from-lavender-700 via-lavender-800 to-lavender-900 bg-clip-text text-transparent opacity-800 mt-4 ${settings.darkMode ? 'text-gray-300' : ''}`}>
            {getLocalizedText('islamic.reminder.body')}
          </p>
        </CardContent>
      </Card>

      {/* Copyright Footer */}
      <div className={`text-center py-4 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
        © 2025 {getLocalizedText('footer.copyright')}
      </div>

    </div>
  );
};

export default Index;
