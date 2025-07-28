
import React, { useState, useEffect } from 'react';
import { BookOpen, Heart, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

const EducationTopics = () => {
  const { getLocalizedText } = useLanguage();

  const educationTopics = [
    {
      title: getLocalizedText('understandingYourCycle'),
      description: getLocalizedText('learnPhasesMenstruation'),
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: getLocalizedText('intimacyInIslam'),
      description: getLocalizedText('guidelinesForRelationships'),
      icon: Heart,
      color: "bg-pink-100 text-pink-600"
    },
    {
      title: getLocalizedText('preparingForMotherhood'),
      description: getLocalizedText('islamicGuidancePregnancy'),
      icon: Users,
      color: "bg-purple-100 text-purple-600"
    }
  ];



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

      }
    }
    else {

      document.documentElement.classList.remove('dark');
    }


  }, []);

  return (
    <div className="space-y-6">

      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold ${settings.darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
          {getLocalizedText('educationWellness')}
        </h2>
        <p className={`${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
          {getLocalizedText('learnWomensHealth')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {educationTopics.map((topic, index) => (
          <Card key={index} className="relative overflow-hidden card-3d hover:shadow-lg transition-shadow cursor-pointer">
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-purple-50 to-pink-50 border-purple-200'}`}></div>

            <CardHeader className="relative z-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${settings.darkMode ? 'bg-slate-800' : topic.color}`}>
                <topic.icon className={`w-6 h-6 ${settings.darkMode ? 'text-white' : ''}`} />
              </div>
              <CardTitle className={`text-lg ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
                {topic.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {topic.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default EducationTopics;
