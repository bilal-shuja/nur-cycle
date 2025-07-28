
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';

const WorshipExemptions = () => {
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
    <div className="space-y-6">

      <Card className="relative overflow-hidden card-3d">
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700 ' : 'bg-green-50 border-green-200 opacity-0'} `}></div>

        <CardHeader className="relative z-10">
          <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-green-800'}`}>
            {getLocalizedText('worshipExemptionsMenstruation')}
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10 space-y-4">

          <div className={`p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-green-100'}`}>
            <div className="flex items-start justify-between mb-2">
              <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-green-800'}`}> {getLocalizedText('prayerSalah')} </h4>
              <Badge className="bg-red-100 text-red-800">{getLocalizedText('prayerProhibited')}</Badge>
            </div>
            <p className={`${settings.darkMode ? 'text-gray-300' : 'text-green-700'} text-sm mb-2`}>
              {getLocalizedText('prayerCompletelyForbidden')}
            </p>
            <p className={`${settings.darkMode ? 'text-gray-400' : 'text-green-600'} text-xs italic`}>
              {getLocalizedText('sourceHadithAishaPrayer')}
            </p>
          </div>

          <div className={`p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-green-100'}`}>
            <div className="flex items-start justify-between mb-2">
              <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-green-800'}`}> {getLocalizedText('fastingSawm')} </h4>
              <Badge className="bg-red-100 text-red-800"> {getLocalizedText('prayerProhibited')} </Badge>
            </div>
            <p className={`${settings.darkMode ? 'text-gray-300' : 'text-green-700'} text-sm mb-2`}>
              {getLocalizedText('fastingMustBreak')}
            </p>
            <p className={`${settings.darkMode ? 'text-gray-400' : 'text-green-600'} text-xs italic`}>
              {getLocalizedText('sourceHadithAishaFasting')}
            </p>
          </div>

          <div className={`p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-green-100'}`}>
            <div className="flex items-start justify-between mb-2">
              <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-green-800'}`}>{getLocalizedText('touchingTheQuran')}</h4>
              <Badge className="bg-yellow-100 text-yellow-800">{getLocalizedText('scholarlyDifference')}</Badge>
            </div>
            <div className={`${settings.darkMode ? 'text-gray-300' : 'text-green-700'} text-sm space-y-2`}>
              <p><strong>{getLocalizedText('majorityView')}:</strong>{getLocalizedText('cannotTouchArabicText')}</p>
              <p><strong>{getLocalizedText('permissible')}:</strong> {getLocalizedText('readingFromMemory')}</p>
              <p><strong>{getLocalizedText('withBarrier')}:</strong> {getLocalizedText('touchingWithGloves')}</p>
            </div>
            <p className={`${settings.darkMode ? 'text-gray-400' : 'text-green-600'} text-xs italic`}>
              {getLocalizedText('sourceQuran56_79')}
            </p>
          </div>

          <div className={`p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-green-100'}`}>
            <div className="flex items-start justify-between mb-2">
              <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-green-800'}`}>{getLocalizedText('whatIsPermitted')}</h4>
              <Badge className="bg-green-100 text-green-800">Allowed</Badge>
            </div>
            <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-green-700'} text-sm space-y-1`}>
              <li>• {getLocalizedText('dhikr')}</li>
              <li>• {getLocalizedText('supplication')}</li>
              <li>• {getLocalizedText('listeningToQuran')}</li>
              <li>• {getLocalizedText('readingIslamicBooks')}</li>
              <li>• {getLocalizedText('attendingIslamicLectures')}</li>
              <li>• {getLocalizedText('learningTeachingIslam')}</li>
            </ul>
          </div>

        </CardContent>
      </Card>

    </div>
  );
};

export default WorshipExemptions;
