
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';

const MenstruationGuidance = () => {

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
      }
    }
    else {

      document.documentElement.classList.remove('dark');
    }


  }, []);
  return (
    <div className="menstruation-guidance-section" style={{ marginTop: "-4em" }}>
      <Card className={`relative overflow-hidden card-3d`}>
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-purple-50 to-pink-50 border-purple-200'}`}></div>

        <CardHeader className="relative z-10">
          <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
            {getLocalizedText('understandingMenstruationIslam')}
          </CardTitle>
          <p className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm`}>
            {getLocalizedText('comprehensiveGuidance')}
          </p>
        </CardHeader>

        <CardContent className="relative z-10 space-y-6">
          <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-white border border-purple-100'}`}>
            <div className="flex items-start justify-between mb-3">
              <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>{getLocalizedText('definitionIslamicUnderstanding')}</h4>
              <Badge className={`${settings.darkMode ? 'bg-slate-700 text-white' : 'bg-purple-100 text-purple-800'}`}>{getLocalizedText('fundamental')}</Badge>
            </div>
            <p className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm mb-3`}>
              {getLocalizedText('menstruationDefinition')}
            </p>
            <div className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm space-y-2`}>
              <p><strong> {getLocalizedText('durationZadAlMustaqni')}:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>{getLocalizedText('minimumPeriod')}</li>
                <li>{getLocalizedText('maximumPeriod')}</li>
                <li>{getLocalizedText('averageCycle')}</li>
                <li>{getLocalizedText('individualVariation')}</li>
              </ul>
            </div>
            <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-purple-600'} mt-3 italic`}>
              {getLocalizedText('source')}
            </p>
          </div>

          <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-white border border-purple-100'}`}>
            <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>{getLocalizedText('whatIsProhibitedDuringMenstruation')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className={`font-medium ${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} mb-2`}>{getLocalizedText('worshipProhibitions')}:</h5>
                <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm space-y-1`}>
                  <li>• <strong>{getLocalizedText('salahPrayer')}:</strong> {getLocalizedText('completelyExcused')}</li>
                  <li>• <strong>{getLocalizedText('sawmFasting')}:</strong> {getLocalizedText('prohibitedFasting')}</li>
                  <li>• <strong>{getLocalizedText('tawaf')}:</strong> {getLocalizedText('aroundKaabah')}</li>
                  <li>• <strong>{getLocalizedText('itikaf')}:</strong> {getLocalizedText('spiritualRetreat')}</li>
                  <li>• <strong>{getLocalizedText('touchingMushaf')}:</strong> {getLocalizedText('directContactQuran')}</li>
                </ul>
              </div>
              <div>
                <h5 className={`font-medium ${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} mb-2`}>{getLocalizedText('physicalProhibitions')}:</h5>
                <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm space-y-1`}>
                  <li>• <strong>{getLocalizedText('sexualIntercourse')}:</strong> {getLocalizedText('completelyForbidden')}</li>
                  <li>• <strong>{getLocalizedText('enteringMosque')}:</strong> {getLocalizedText('forPrayerAreaSpecifically')}</li>
                  <li>• <strong>{getLocalizedText('handlingMushaf')}:</strong> {getLocalizedText('withoutBarrierGloves')}</li>
                </ul>
              </div>
            </div>
            <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-purple-600'} mt-3 italic`}>
              {getLocalizedText('sourceHadithAisha')}
            </p>
          </div>

          <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-white border border-purple-100'}`}>
            <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>{getLocalizedText('whatIsPermittedEncouraged')}</h4>
            <div className="space-y-3">
              <div>
                <h5 className={`font-medium ${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} mb-2`}>{getLocalizedText('spiritualActivities')}:</h5>
                <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm space-y-1 list-disc list-inside`}>
                  <li>{getLocalizedText('allFormsDhikr')}</li>
                  <li>{getLocalizedText('duaAtAllTimes')}</li>
                  <li>{getLocalizedText('istighfarRecommended')}</li>
                  <li>{getLocalizedText('readingQuranTranslations')} </li>
                  <li>{getLocalizedText('listeningQuranRecitations')} </li>
                  <li>{getLocalizedText('studyingIslamicBooks')} </li>
                  <li>{getLocalizedText('dhikrDuringPrayerTimes')}</li>
                </ul>
              </div>
              <div>
                <h5 className={`font-medium ${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} mb-2`}>{getLocalizedText('physicalSocialActivities')}:</h5>
                <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm space-y-1 list-disc list-inside`}>
                  <li>{getLocalizedText('normalDailyActivities')}</li>
                  <li>{getLocalizedText('cookingServingFood')}</li>
                  <li>{getLocalizedText('socialInteractions')}</li>
                  <li>{getLocalizedText('exercisePhysicalActivity')}</li>
                  <li>{getLocalizedText('charityHelpingOthers')}</li>
                </ul>
              </div>
            </div>
            <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-purple-600'} mt-3 italic`}>
              {getLocalizedText('sourceAuthenticHadith')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenstruationGuidance;
