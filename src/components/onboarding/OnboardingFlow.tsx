
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import TrackingPreferences from './TrackingPreferences';
import MadhabSelection from './MadhabSelection';
import UIPreferences from './UIPreferences';
import NotificationSettings from './NotificationSettings';
import WelcomeStep from './WelcomeStep';
import { useLanguage } from '@/contexts/LanguageContext';

export interface OnboardingData {
  trackingType: string[];
  madhhab: string;
  hijabiUI: boolean;
  notifications: {
    worshipAlerts: boolean;
    ghusalReminders: boolean;
    fertilityWindow: boolean;
    duaPrompts: boolean;
  };
  name: string;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

const OnboardingFlow = ({ onComplete, onSkip }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { getLocalizedText } = useLanguage();

  const [data, setData] = useState<OnboardingData>({
    trackingType: [],
    madhhab: '',
    hijabiUI: false,
    notifications: {
      worshipAlerts: true,
      ghusalReminders: true,
      fertilityWindow: true,
      duaPrompts: true,
    },
    name: ''
  });


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

    // Load saved settings with comprehensive state management
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

  const steps = [
    { component: WelcomeStep, title: getLocalizedText('welcome.to.nurcycle') },
    { component: TrackingPreferences, title: getLocalizedText('what.would.you.like.to.track') },
    { component: MadhabSelection, title: getLocalizedText('select.your.madhhab') },
    // { component: UIPreferences, title: 'Personalize your experience' },
    { component: NotificationSettings, title: getLocalizedText('notification.preferences') },
  ];

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = (stepData: Partial<OnboardingData>) => {
    const updatedData = { ...data, ...stepData };
    setData(updatedData);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(updatedData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900' : 'bg-gradient-to-br from-purple-100 via-purple-50 to-white'} flex items-center justify-center p-4`}>


      <Card className={`w-full max-w-2xl rounded-2xl ${settings.darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <CardHeader className={`text-center rounded-t-2xl ${settings.darkMode ? 'bg-slate-900' : 'bg-white'}`}>
          {currentStep > 0 && (
            <>
              <div className="mb-4">
                <h1 className={`text-4xl font-bold mb-2 bg-gradient-to-r ${settings.darkMode ? 'from-gray-800 via-gray-600 to-gray-500' : 'from-lavender-700 via-lavender-500 to-lavender-800'} bg-clip-text text-transparent flex items-center justify-center drop-shadow-lg`}>
                  {/* <span>NurCycle</span> */}
                  <span className={settings.darkMode ? 'text-white' : 'text-lavender-700'}>
                    NurCycle
                  </span>

                  <img
                    src="/lovable-uploads/9ab8e7ae-1fa2-4cf6-bad2-a54d6582474b.png"
                    alt="NurCycle Logo"
                    className="w-10 h-10 drop-shadow-md"
                    style={{ marginLeft: '-0.3em' }}
                  />
                </h1>
              </div>
              <CardTitle className={`text-xl ${settings.darkMode ? 'text-white' : 'text-lavender-700'}`}>
                {steps[currentStep].title}
              </CardTitle>
            </>
          )}
          <div className="mt-4">
            <Progress value={progress} className="w-full" />
            <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'} mt-2`}>
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </CardHeader>
        <CardContent className={`${settings.darkMode ? 'bg-slate-900' : 'bg-white'} rounded-b-2xl`}>
          <CurrentStepComponent
            data={data}
            onNext={handleNext}
            onPrevious={currentStep > 0 ? handlePrevious : undefined}
            onSkip={onSkip}
          />
        </CardContent>
      </Card>


    </div>
  );
};

export default OnboardingFlow;
