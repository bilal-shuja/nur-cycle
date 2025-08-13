
import { useEffect, useState } from 'react';
import { ChevronLeft, Heart } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface AboutSectionProps {
  onBack: () => void;
}

const AboutSection = ({ onBack }: AboutSectionProps) => {
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
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
    else {
      document.documentElement.classList.remove('dark');
    }

  }, []);

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
      {/* Header */}


      <div className={` shadow-sm border-b ${settings.darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ChevronLeft className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`} />
          </Button>
          <h1 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {getLocalizedText('about')}
          </h1>
          <div className="w-10" />
        </div>
      </div>


      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Welcome Section */}


        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-600 to-purple-800'}`}></div>
          <CardContent className="relative z-10 p-6">
            <h2 className={`text-2xl font-bold mb-4 text-center ${settings.darkMode ? 'text-white' : 'text-gray-700'}`}>
              {getLocalizedText('welcome.to.nurcyclee')}
            </h2>
            <p className={`leading-relaxed ${settings.darkMode ? 'text-gray-300' : 'text-purple-400'}`}>
              {getLocalizedText('nurcycle.explanation')}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-600 to-purple-800'}`}></div>
          <CardContent className="relative z-10 p-6">
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
              ✨{getLocalizedText('why.we.exist')}
            </h3>
            <p className={`leading-relaxed ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {getLocalizedText('why.we.exist.content')}
            </p>
          </CardContent>
        </Card>



        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : 'bg-white'}`}></div>
          <CardContent className="relative z-10 p-6">
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
              🌸 {getLocalizedText('what.makes.nurcycle.unique')}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-purple-700'} mb-2`}>
                  🟪 {getLocalizedText('islamic.integration')}
                </h4>
                <p className={`text-sm leading-relaxed ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {getLocalizedText('islamic.integration.content')}
                </p>
              </div>
              <div>
                <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-purple-700'} mb-2`}>
                  🟪 {getLocalizedText('holistic.tracking')}
                </h4>
                <p className={`text-sm leading-relaxed ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {getLocalizedText('holistic.tracking.content')}
                </p>
              </div>
              <div>
                <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-purple-700'} mb-2`}>
                  🟪 {getLocalizedText('pregnancy.fertility.mode')}
                </h4>
                <p className={`text-sm leading-relaxed ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {getLocalizedText('pregnancy.fertility.mode.content')}
                </p>
              </div>
              <div>
                <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-purple-700'} mb-2`}>
                  🟪 {getLocalizedText('community.connection')}
                </h4>
                <p className={`text-sm leading-relaxed ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {getLocalizedText('community.connection.content')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : 'from-lavender-500 to-lavender-700'}`}></div>
          <CardContent className="relative z-10 p-6">
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
              💜 {getLocalizedText('whoWeServe')}
            </h3>
            <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-3`}>
              {getLocalizedText('description')}
            </p>
            <ul className={`space-y-2 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
              <li>• {getLocalizedText('muslimWomenSeekingFaithFriendlyHealth')}</li>
              <li>• {getLocalizedText('womenConfusedAboutIslamicRulings')}</li>
              <li>• {getLocalizedText('revertsNavigatingConflictingTeachings')}</li>
              <li>• {getLocalizedText('womenWhoFeelUnseen')}</li>
              <li>• {getLocalizedText('teenagersWivesMothersStudentsDaughters')}</li>
              <li>• {getLocalizedText('womenWantingToFeelSeen')}</li>
            </ul>
          </CardContent>
        </Card>



        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-500 to-purple-700'}`}></div>
          <CardContent className="relative z-10 p-6">
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
              🌙 {getLocalizedText('ourName')}
            </h3>
            <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              {getLocalizedText('nurMeaning')}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : 'from-purple-500 to-purple-700'}`}></div>
          <CardContent className="relative z-10 p-6">
            <h3 className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-purple-800'} mb-4 flex items-center gap-2`}>
              💬 {getLocalizedText('foundersMessage')}
            </h3>
            <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-purple-600'} mb-4 italic`}>
              {getLocalizedText('by')} Z
            </p>
            <div className={`space-y-4 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              <p>{getLocalizedText('message')}</p>
              <p>{getLocalizedText('ifAppExistedWhenYounger')}</p>
              <ul className="space-y-1 text-sm ml-4">
                <li>• {getLocalizedText('hasPeriodEnded')}</li>
                <li>• {getLocalizedText('wait40Days')}</li>
                <li>• {getLocalizedText('istihadaOrHayd')}</li>
                <li>• {getLocalizedText('periodAppFaithMismatch')}</li>
              </ul>
              <p>{getLocalizedText('patchingTogetherRulings')}</p>
              <p>{getLocalizedText('lookedForMuslimApp')}</p>
              <p>{getLocalizedText('deserveMore')}</p>
              <p>{getLocalizedText('nurcycleIsThatSpace')}</p>
              <p>{getLocalizedText('endlessGratitudeToAllah')}</p>
              <p>{getLocalizedText('experiencesAreReal')}</p>
              <p className={`font-semibold ${settings.darkMode ? 'text-gray-100' : 'text-purple-800'}`}>
                {getLocalizedText('nurcycleIsThatSpace')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-500 to-purple-700'}`}></div>
          <CardContent className="relative z-10 p-6 text-center">
            <Heart className={`w-8 h-8 mx-auto mb-4 ${settings.darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <p className={`text-sm ${settings.darkMode ? 'text-gray-300 italic' : 'text-purple-400 italic'}`}>
              {getLocalizedText('quranVerse')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Copyright Footer */}
      <div className={`text-center py-4 px-4 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
        © 2025 {getLocalizedText('footer.copyright')}
      </div>

      {/* Bottom spacing */}
      <div className="h-6" />
    </div>
  );
};

export default AboutSection;
