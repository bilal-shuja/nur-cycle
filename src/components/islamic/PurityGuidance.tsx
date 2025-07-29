
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';

const PurityGuidance = () => {

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
    <div className="purity-guidance" style={{ marginTop: "-8em" }}>
      <Card className="relative overflow-hidden card-3d">
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-teal-50 to-blue-50 border-teal-200 opacity-20'}`}></div>
        <CardHeader className="relative z-10">
          <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>
            {getLocalizedText('trustedSourcesAndReferences')}
          </CardTitle>
        </CardHeader>


        <CardContent className="relative z-10 space-y-6">

          <div className={`p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-teal-100'}`}>
            <div className="flex items-start justify-between mb-2">
              <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>{getLocalizedText('whenIsGhuslRequired')}</h4>
              <Badge className={`${settings.darkMode ? 'bg-slate-700 text-white' : 'bg-teal-100 text-teal-800'}`}>{getLocalizedText('obligatory')}</Badge>
            </div>
            <div className="space-y-3">
              <div>
                <h5 className={`font-medium mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>{getLocalizedText('majorRitualImpurity')}:</h5>
                <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm space-y-1 list-disc list-inside ml-4`}>
                  <li>{getLocalizedText('intercourseSexual')}</li>
                  <li>{getLocalizedText('sexualFluidsEmission')}</li>
                  <li>{getLocalizedText('endOfMenstrualPeriod')}</li>
                  <li>{getLocalizedText('endOfPostpartumBleeding')}</li>
                  <li>{getLocalizedText('conversionToIslam')}</li>
                  <li>{getLocalizedText('death')}</li>
                </ul>
              </div>
              <div className={`${settings.darkMode ? 'bg-slate-700' : 'bg-teal-50'} p-3 rounded`}>
                <p className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm`}>
                  {getLocalizedText('keyPointZadAlMustaqni')}
                </p>
              </div>
            </div>
            <p className={`text-xs mt-2 italic ${settings.darkMode ? 'text-gray-400' : 'text-teal-600'}`}>
              {getLocalizedText('sourceQuran')}
            </p>
          </div>

          <div className={`p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-teal-100'}`}>
            <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>{getLocalizedText('completeMethodOfGhusl')}</h4>
            <div className="space-y-4">
              <div>
                <h5 className={`font-medium mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>{getLocalizedText('obligatoryElements')}:</h5>
                <ol className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm space-y-1 list-decimal list-inside ml-4`}>
                  <li>{getLocalizedText('intentionNiyyah')}</li>
                  <li>{getLocalizedText('rinseMouthAndNose')}</li>
                  <li>{getLocalizedText('washEntireBody')}</li>
                </ol>
              </div>
              <div>
                <h5 className={`font-medium mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>{getLocalizedText('recommendedMethod')}:</h5>
                <ol className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm space-y-2 list-decimal list-inside ml-4`}>
                  <li>{getLocalizedText('startWithBismillah')}</li>
                  <li>{getLocalizedText('washHandsThreeTimes')}</li>
                  <li>{getLocalizedText('cleanPrivateParts')}</li>
                  <li>{getLocalizedText('performCompleteWudu')}</li>
                  <li>{getLocalizedText('pourWaterOverHead')}</li>
                  <li>{getLocalizedText('pourWaterOverRightSide')}</li>
                  <li>{getLocalizedText('pourWaterOverLeftSide')}</li>
                  <li>{getLocalizedText('washFeet')}</li>
                  <li>{getLocalizedText('finalCheck')}</li>
                </ol>
              </div>
            </div>
            <p className={`text-xs mt-3 italic ${settings.darkMode ? 'text-gray-400' : 'text-teal-600'}`}>
              {getLocalizedText('sourceHadith')}
            </p>
          </div>



          <div className={`p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-teal-100'}`}>
            <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>{getLocalizedText('signsMenstruationHasEnded')}</h4>
            <div className="space-y-3">
              <div className={`${settings.darkMode ? 'bg-slate-700' : 'bg-teal-50'} p-3 rounded`}>
                <h5 className={`font-medium mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>{getLocalizedText('twoValidSigns')}:</h5>
                <div className="space-y-3">
                  <div>
                    <p className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm`}>
                      <strong>{getLocalizedText('firstSign')}:</strong>
                    </p>
                    <p className={`${settings.darkMode ? 'text-gray-400' : 'text-teal-600'} text-xs ml-4`}>
                      {getLocalizedText('firstSignDescription')}
                    </p>
                  </div>
                  <div>
                    <p className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm`}>
                      <strong>{getLocalizedText('secondSign')}:</strong>
                    </p>
                    <p className={`${settings.darkMode ? 'text-gray-400' : 'text-teal-600'} text-xs ml-4`}>
                      {getLocalizedText('secondSignDescription')}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h5 className={`font-medium mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>{getLocalizedText('importantRulingsFromZadAlMustaqni')}:</h5>
                <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm space-y-1 list-disc list-inside ml-4`}>
                  <li>{getLocalizedText('eitherSignIsSufficient')}</li>
                  <li>{getLocalizedText('naturalSignVariation')}</li>
                  <li>{getLocalizedText('performGhuslImmediately')}</li>
                  <li>{getLocalizedText('newMenstrualPeriod')}</li>
                  <li>{getLocalizedText('brownYellowDischarge')}</li>
                </ul>
              </div>
            </div>
            <p className={`text-xs mt-3 italic ${settings.darkMode ? 'text-gray-400' : 'text-teal-600'}`}>
              {getLocalizedText('sourceZadAlMustaqni')}
            </p>
          </div>


          <div className={`p-4 rounded-lg border mb-5 ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-teal-100'}`}>
            <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>{getLocalizedText('specialConsiderationsForGhusl')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className={`font-medium mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>{getLocalizedText('forHair')}:</h5>
                <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm space-y-1 list-disc list-inside`}>
                  <li>{getLocalizedText('hairConsiderations')}</li>
                  <li>{getLocalizedText('braidedHair')}</li>
                  <li>{getLocalizedText('hairExtensions')}</li>
                  <li>{getLocalizedText('coveredHair')}</li>
                </ul>
              </div>
              <div>
                <h5 className={`font-medium mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>{getLocalizedText('bodyConsiderations')}:</h5>
                <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm space-y-1 list-disc list-inside`}>
                  <li>{getLocalizedText('nailPolish')}</li>
                  <li>{getLocalizedText('cleanEarrings')}</li>
                  <li>{getLocalizedText('waterBetweenFingers')}</li>
                  <li>{getLocalizedText('bodyFolds')}</li>
                </ul>
              </div>
            </div>
            <p className={`text-xs mt-3 italic ${settings.darkMode ? 'text-gray-400' : 'text-teal-600'}`}>
              {getLocalizedText('sourceFatawa')}
            </p>
          </div>

          <div className={`p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-teal-100'}`}>
            <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>{getLocalizedText('commonQuestionsClarifications')}</h4>
            <div className="space-y-3">
              <div>
                <p className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm`}>
                  <strong>{getLocalizedText('question1')}</strong>
                </p>
                <p className={`${settings.darkMode ? 'text-gray-400' : 'text-teal-600'} text-xs ml-4`}>
                  {getLocalizedText('answer1')}
                </p>
              </div>
              <div>
                <p className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm`}>
                  <strong>{getLocalizedText('question2')}</strong>
                </p>
                <p className={`${settings.darkMode ? 'text-gray-400' : 'text-teal-600'} text-xs ml-4`}>
                  {getLocalizedText('answer2')}
                </p>
              </div>
              <div>
                <p className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm`}>
                  <strong>{getLocalizedText('question3')}</strong>
                </p>
                <p className={`${settings.darkMode ? 'text-gray-400' : 'text-teal-600'} text-xs ml-4`}>
                  {getLocalizedText('answer3')}
                </p>
              </div>
              <div>
                <p className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm`}>
                  <strong>{getLocalizedText('question4')}</strong>
                </p>
                <p className={`${settings.darkMode ? 'text-gray-400' : 'text-teal-600'} text-xs ml-4`}>
                  {getLocalizedText('answer4')}
                </p>
              </div>
            </div>
            <p className={`text-xs mt-3 italic ${settings.darkMode ? 'text-gray-400' : 'text-teal-600'}`}>
              {getLocalizedText('sourceFatawaContemporary')}
            </p>
          </div>

        </CardContent>

      </Card>


    </div>
  );
};

export default PurityGuidance;
