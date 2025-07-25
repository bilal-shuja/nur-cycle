
import React, { useState, useEffect } from 'react';
import { Book } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

const IslamicDisclaimer = () => {

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
  const { getLocalizedText } = useLanguage();


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
        console.log('Settings loaded:', parsedSettings);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
    else {
      document.documentElement.classList.remove('dark');
    }


  }, []);
  return (

    <Card className="relative overflow-hidden card-3d">
      <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-purple-100 to-pink-100 border-purple-200'}`}></div>

      <CardContent className="p-6 relative z-10">
        <div className="flex items-start space-x-3">
          <Book className={`w-6 h-6 mt-1 flex-shrink-0 ${settings.darkMode ? 'text-purple-300' : 'text-purple-600'}`} />
          <div>
            <h3 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}> {getLocalizedText('label.important_note')} </h3>
            <p className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm`}>
              {getLocalizedText('label.information_based_on_scholarship')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

  );
};

export default IslamicDisclaimer;
