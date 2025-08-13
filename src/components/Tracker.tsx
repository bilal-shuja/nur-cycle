
import React, { useState, useEffect } from 'react';
import { Calendar, Baby, TrendingUp, Heart, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PeriodTracker from './PeriodTracker';
import PregnancyMode from './PregnancyMode';
import SymptomsTracker from './SymptomsTracker';
import { useLanguage } from '@/contexts/LanguageContext';

const Tracker = ({ isSubscribered, checkSubDate , freeDayTrial , setActiveSection}) => {
  const [activeTracker, setActiveTracker] = useState<string | null>(null);
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

  if (activeTracker) {
    switch (activeTracker) {
      case 'period':
        return (
          <div>
            <Button
              variant="outline"
              onClick={() => setActiveTracker(null)}
              className="mb-4"
            >
              ← {getLocalizedText('back.to.tracker.menu')}
            </Button>
            <PeriodTracker />
          </div>
        );
      case 'pregnancy':
        return (
          <div>
            <Button
              variant="outline"
              onClick={() => setActiveTracker(null)}
              className="mb-4"
            >
              ← {getLocalizedText('back.to.tracker.menu')}
            </Button>
            <PregnancyMode />
          </div>
        );
      case 'symptoms':
        return (
          <div>
            <Button
              variant="outline"
              onClick={() => setActiveTracker(null)}
              className="mb-4"
            >
              ← {getLocalizedText('back.to.tracker.menu')}
            </Button>
            <SymptomsTracker />
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <>



      <div className={`space-y-6 ${settings.darkMode ? 'text-white' : ''}`}>
        <div className="text-center">
          <h1 className={`text-3xl font-bold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}> {getLocalizedText('cycle.tracker')} </h1>
          <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{getLocalizedText('cycle.tracker.desc')}</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-lavender-200 to-lavender-600 rounded-xl">
            <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-lavender-600 rounded-xl">{getLocalizedText('overview')}</TabsTrigger>
            <TabsTrigger value="period" className="text-xs data-[state=active]:bg-lavender-600 rounded-xl">{getLocalizedText('period')}</TabsTrigger>
            <TabsTrigger value="symptoms" className="text-xs data-[state=active]:bg-lavender-600 rounded-xl">{getLocalizedText('symptoms')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">

                {['period', 'pregnancy', 'symptoms'].map((type, idx) => {
                  const handleCardClick = () => {
                    if ((((isSubscribered === false || isSubscribered === null) && freeDayTrial === true) || checkSubDate === true ) && type === 'pregnancy') {
                           setActiveSection('profile')

                      return;
                    }
                    setActiveTracker(type);
                  };

                  const handleButtonClick = (e: React.MouseEvent) => {
                    e.stopPropagation();
                    if ((((isSubscribered === false || isSubscribered === null) && freeDayTrial === true) || checkSubDate === true ) && type === 'pregnancy') {
                       setActiveSection('profile')
                      return;
                    }
                    setActiveTracker(type);
                  };


                  const isLocked = (((isSubscribered === false || isSubscribered === null) && freeDayTrial === true) || checkSubDate === true) && type === 'pregnancy';

                  return (
                    <Card
                      key={idx}
                      className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group ${settings.darkMode ? 'bg-slate-800 border-slate-700' : ''
                        } ${isLocked  ? 'opacity-100' : 'opacity-100'}`}
                      onClick={handleCardClick}
                    >
                      <div className={`${settings.darkMode ? 'absolute inset-0 bg-slate-800' : ''}`}></div>

                      {isLocked && (
                        <Lock className="w-6 h-8 m-2 text-gray-500 float-end absolute top-0 right-0 z-20" />
                      )}

                      <CardContent className="p-4 text-center relative z-10">
                        <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${type === 'period' ? 'bg-gradient-to-br from-pink-500 to-pink-600' :
                            type === 'pregnancy' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                              'bg-gradient-to-br from-teal-500 to-teal-600'
                          } flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          {type === 'period' && <Calendar className="w-6 h-6 text-white" />}
                          {type === 'pregnancy' && <Baby className="w-6 h-6 text-white" />}
                          {type === 'symptoms' && <Heart className="w-6 h-6 text-white" />}
                        </div>

                        <h3 className={`text-lg font-bold mb-1 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {type === 'period' ? getLocalizedText('period.tracking') :
                            type === 'pregnancy' ? getLocalizedText('pregnancy.journey') :
                              getLocalizedText('symptoms.tracking')}
                        </h3>

                        <p className={`text-sm mb-3 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {type === 'period' ? getLocalizedText('period.tracking.desc') :
                            type === 'pregnancy' ? getLocalizedText('pregnancy.journey.desc') :
                              getLocalizedText('symptoms.tracking.desc')}
                        </p>

                        <Button
                          className={`w-full ${type === 'period' ? 'bg-gradient-to-r from-pink-500 to-pink-600' :
                              type === 'pregnancy' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                                'bg-gradient-to-r from-teal-500 to-teal-600'
                            } hover:opacity-90 ${isLocked ? 'cursor-not-allowed' : ''}`}
                          size="sm"
                          onClick={handleButtonClick}
                          // disabled={isLocked}
                        >
                          {getLocalizedText('start.tracking')}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}


              </div>


              <Card className="relative overflow-hidden">
                <div className="absolute inset-0  dark:hidden"></div>
                <div className="absolute inset-0 hidden dark:block bg-slate-800"></div>

                <CardHeader className="relative z-10">
                  <CardTitle className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>
                    <TrendingUp className="w-5 h-5" />
                    <span>{getLocalizedText('quick.overview')}</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-teal-600'}`}>{getLocalizedText('day')} 12</p>
                      <p className={`text-xs ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>{getLocalizedText('current.cycle.day')}</p>
                    </div>
                    <div>
                      <p className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-teal-600'}`}>28 days</p>
                      <p className={`text-xs ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>{getLocalizedText('average.cycle')}</p>
                    </div>
                    <div>
                      <p className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-teal-600'}`}>{getLocalizedText('follicular')}</p>
                      <p className={`text-xs ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>{getLocalizedText('current.phase')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          <TabsContent value="period" className="mt-6">
            <PeriodTracker />
          </TabsContent>

          <TabsContent value="symptoms" className="mt-6">
            <SymptomsTracker />
          </TabsContent>
        </Tabs>

        <Card className={`relative overflow-hidden ${settings.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-r from-purple-500 to-purple-700 text-white'}`}>
          <div className={`${settings.darkMode ? 'absolute inset-0 bg-slate-800' : ''}`}></div>
          <CardContent className="p-4 text-center relative z-10">
            <h3 className={`text-lg font-bold mb-2 ${settings.darkMode ? 'text-white' : 'text-lavender-900'}`}>{getLocalizedText('islamic.reminder')}</h3>
            <p className={`text-sm opacity-90 mb-1 ${settings.darkMode ? 'text-gray-300' : 'text-lavender-900'}`}>
              {getLocalizedText('islamic.reminder.verse')}
            </p>
            <p className={`text-xs opacity-75 ${settings.darkMode ? 'text-gray-400' : 'text-lavender-900'}`}>- Quran 16:78</p>
            <p className={`text-xs opacity-75 mt-2 ${settings.darkMode ? 'text-gray-400' : 'text-lavender-900'}`}>
              {getLocalizedText('islamic.reminder.desc')}
            </p>
          </CardContent>
        </Card>
      </div>

    </>

  );
};

export default Tracker;
