
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

const NifasGuidance = () => {

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

  return (
    <div className="space-y-6">

      <Card className="relative overflow-hidden card-3d">
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-pink-50 border-pink-200 opacity-0'} `}></div>

        <CardHeader className="relative z-10">
          <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-pink-800'}`}>
            {getLocalizedText('postpartumBleeding')}
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10 space-y-4">

          <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-white border border-pink-200'}`}>
            <h4 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-pink-800'}`}>{getLocalizedText('durationAndNature')}</h4>
            <p className={`${settings.darkMode ? 'text-gray-300' : 'text-pink-700'} text-sm`}>
              {getLocalizedText('postpartumDefinition')}
            </p>
          </div>

          <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-white border border-pink-200'}`}>
            <h4 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-pink-800'}`}>{getLocalizedText('sameRulesAsMenstruation')}</h4>
            <p className={`${settings.darkMode ? 'text-gray-300' : 'text-pink-700'} text-sm`}>
              {getLocalizedText('rulesForNifas')}
            </p>
          </div>

        </CardContent>
      </Card>

    </div>
  );
};

export default NifasGuidance;
