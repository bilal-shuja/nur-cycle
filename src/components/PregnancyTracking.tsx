import { useState, useEffect } from 'react';
import { Baby, Calendar, Heart, BookOpen, Activity, Scale, Moon, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeightTrackingModal, HeartbeatModal, KickCounterModal } from './PregnancyTrackingModals';
import PregnancyComplications from './PregnancyComplications';
import SymptomsTracker from './SymptomsTracker';
import { useLanguage } from '@/contexts/LanguageContext';


const PregnancyTracking = () => {
  const [currentWeek, setCurrentWeek] = useState(12);
  const currentTrimester = currentWeek <= 12 ? 1 : currentWeek <= 27 ? 2 : 3;
  const progressPercentage = (currentWeek / 40) * 100;

  const { getLocalizedText } = useLanguage();


  const [savedWeight, setSavedWeight] = useState<{
    weight: number;
    unit: string;
    date: string;
  } | null>(null);

  const [savedHeartBeat, setSavedHeartBeat] = useState<{
    heartRate: number;
    date: string;
  } | null>(null);


  const [savedKicks, setSavedKicks] = useState<{
    kicks: number;
    date: string;
  } | null>(null);



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

  const weeklyDevelopment = {
    12: {
      size: getLocalizedText('plum'),
      length: `2.1 ${getLocalizedText('inches')}`,
      weight: "0.5 oz",
      development: [
        getLocalizedText('babys.face.is.becoming.more.human.like'),
        getLocalizedText('fingernails.toenails.are.forming'),
        getLocalizedText('baby.can.make.a.fist.and.suck.thumb'),
        getLocalizedText('reflexes.developing')
      ],
      visual: "🫐",
      milestone: getLocalizedText('end.of.first.trimester.major.organs.formed')
    },
    16: {
      size: getLocalizedText('avocado'),
      length: `4.6 ${getLocalizedText('inches')}`,
      weight: "3.5 oz",
      development: [
        getLocalizedText('baby.can.hear.voice'),
        getLocalizedText('facial.expressions.developing'),
        getLocalizedText('babys.skeleton.is.hardening'),
        getLocalizedText('first.movements.soon')
      ],
      visual: "🥑",
      milestone: getLocalizedText('babys.sex.via.ultrasound')
    },
    20: {
      size: getLocalizedText('banana'),
      length: `6.5 ${getLocalizedText('inches')}`,
      weight: "10.2 oz",
      development: [
        getLocalizedText('babys.movements.stronger'),
        getLocalizedText('hair.and.nails.continue.growing'),
        getLocalizedText('baby.can.swallow.and.taste'),
        getLocalizedText('vernix.protects.skin')
      ],
      visual: "🍌",
      milestone: getLocalizedText('halfway.point.anatomy.scan')
    },
    24: {
      size: getLocalizedText('ear.of.corn'),
      length: `11.8 ${getLocalizedText('inches')}`,
      weight: "1.3 lbs",
      development: [
        getLocalizedText('babys.hearing.improving'),
        getLocalizedText('lungs.developing.rapidly'),
        getLocalizedText('baby.has.sleep.wake.cycles'),
        getLocalizedText('taste.buds.developing')
      ],
      visual: "🌽",
      milestone: getLocalizedText('viability.milestone.reached')
    }
  };

  const currentDevelopment = weeklyDevelopment[currentWeek] || weeklyDevelopment[12];

  const trimesterInfo = {
    1: {
      title: `${getLocalizedText('first.trimester')} (${getLocalizedText('weeks')} 1-12)`,
      description: getLocalizedText('foundation.building.major.organs.form'),
      focus: [
        getLocalizedText('folic.acid.intake'),
        getLocalizedText('morning.sickness.management'),
        getLocalizedText('regular.prenatal.visits')
      ],
      islamicGuidance: getLocalizedText('recite.surah.maryam'),
      color: "bg-green-100 text-green-600",
      duas: [
        {
          arabic: "رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ",
          translation: getLocalizedText('dua.first.trimester'),
          reference: "Quran 3:38"
        }
      ]
    },
    2: {
      title: `${getLocalizedText('second.trimester')} (${getLocalizedText('weeks')} 13-27)`,
      description: getLocalizedText('golden.period.energy.returns'),
      focus: [
        getLocalizedText('balanced.nutrition'),
        getLocalizedText('light.exercise'),
        getLocalizedText('baby.movement.tracking')
      ],
      islamicGuidance: getLocalizedText('continue.dhikr.duas'),
      color: "bg-blue-100 text-blue-600",
      duas: [
        {
          arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
          translation: getLocalizedText('dua.second.trimester'),
          reference: "Quran 25:74"
        }
      ]
    },
    3: {
      title: `${getLocalizedText('third.trimester')} (${getLocalizedText('weeks')} 28-40)`,
      description: getLocalizedText('final.preparations.babys.organs.mature'),
      focus: [
        getLocalizedText('birth.preparation'),
        getLocalizedText('hospital.bag.packing'),
        getLocalizedText('final.checkups')
      ],
      islamicGuidance: getLocalizedText('increase.istighfar.prepare.spiritually'),
      color: "bg-purple-100 text-purple-600",
      duas: [
        {
          arabic: "اللَّهُمَّ أَخْرِجْنِي مُخْرَجَ صِدْقٍ وَاجْعَل لِّي مِن لَّدُنكَ سُلْطَانًا نَّصِيرًا",
          translation: getLocalizedText('dua.third.trimester'),
          reference: "Quran 17:80"
        }
      ]
    }
  };
  const currentTrimesterInfo = trimesterInfo[currentTrimester];

  useEffect(() => {
    const pregnancyData = localStorage.getItem('pregnancy-weight');
    const heartRateData = localStorage.getItem('pregnancy-heartbeat');
    const kicksData = localStorage.getItem('pregnancy-kicks');
    if (pregnancyData) {
      setSavedWeight(JSON.parse(pregnancyData));
    }

    if (heartRateData) {
      setSavedHeartBeat(JSON.parse(heartRateData))
    }

    if (kicksData) {
      setSavedKicks(JSON.parse(kicksData))
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Pregnancy Tracking Tabs */}
      <Tabs defaultValue="overview" className="w-full">

        <TabsList 
  className={`grid w-full grid-cols-3 
    ${settings.darkMode 
      ? 'bg-slate-800 border border-slate-700' 
      : 'bg-lavender-100 border border-gray-200'}`}
>
  <TabsTrigger 
    value="overview" 
    className={`flex items-center gap-2 
      data-[state=active]:bg-lavender-600 
      data-[state=active]:text-white 
      ${settings.darkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-lavender-300'}`}
  >
    <Baby className="w-4 h-4" />
    {getLocalizedText('overview')}
  </TabsTrigger>

  <TabsTrigger 
    value="symptoms" 
    className={`flex items-center gap-2 
      data-[state=active]:bg-lavender-600 
      data-[state=active]:text-white 
      ${settings.darkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-lavender-300'}`}
  >
    <Activity className="w-4 h-4" />
    {getLocalizedText('symptoms')}
  </TabsTrigger>

  <TabsTrigger 
    value="complications" 
    className={`flex items-center gap-2 
      data-[state=active]:bg-lavender-600 
      data-[state=active]:text-white 
      ${settings.darkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-lavender-300'}`}
  >
    <AlertTriangle className="w-4 h-4" />
    {getLocalizedText('complications')}
  </TabsTrigger>
</TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Pregnancy Progress */}


          <Card className="relative overflow-hidden">
            <div className="absolute inset-0  from-pink-50 to-purple-50 border-pink-200 dark:hidden"></div>
            <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

            <CardHeader className="relative z-10">
              <CardTitle className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                <Baby className="w-6 h-6" />
                <span>{getLocalizedText('pregnancy.journey')} - {getLocalizedText('week')} {currentWeek}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="space-y-4">
                <div className={`flex justify-between text-sm ${settings.darkMode ? 'text-gray-300' : 'text-purple-600'}`}>
                  <span>{getLocalizedText('week')} 1</span>
                  <span>{currentWeek} of 40 {getLocalizedText('weeks')}</span>
                  <span>{getLocalizedText('week')} 40</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <div className="text-center">
                  <p className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                    {getLocalizedText('trimester')} {currentTrimester} • {40 - currentWeek} {getLocalizedText('weeks')} remaining
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Current Week Overview */}


          <Card className="relative overflow-hidden">
            <div className="absolute inset-0  from-pink-50 to-purple-50 border-pink-200 dark:hidden"></div>
            <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

            <CardHeader className="relative z-10">
              <CardTitle className={`text-center ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                {getLocalizedText('baby.development.this.week')}
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 dark:text-white">{currentDevelopment.visual}</div>
                <p className={`text-2xl font-bold ${settings.darkMode ? 'text-white' : 'text-purple-900'} mb-2`}>
                  {getLocalizedText('size.of.a')}{currentDevelopment.size}
                </p>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="text-center">
                    <p className={`text-lg font-bold ${settings.darkMode ? 'text-white' : 'text-purple-600'}`}>
                      {currentDevelopment.length}
                    </p>
                    <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{getLocalizedText('length')}</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-lg font-bold ${settings.darkMode ? 'text-white' : 'text-purple-600'}`}>
                      {currentDevelopment.weight}
                    </p>
                    <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{getLocalizedText('weight')}</p>
                  </div>
                </div>
              </div>
              <div className={`${settings.darkMode ? 'bg-slate-800' : 'bg-purple-100'} p-4 rounded-lg`}>
                <p className={`${settings.darkMode ? 'text-white' : 'text-purple-800'} font-medium text-center`}>
                  {currentDevelopment.milestone}
                </p>
              </div>
            </CardContent>
          </Card>


          {/* Islamic Pregnancy Duas */}

          <Card className="relative overflow-hidden">
            <div className="absolute inset-0  from-amber-50 to-orange-50 border-amber-200 dark:hidden"></div>
            <div className="absolute inset-0 hidden dark:block bg-slate-900 border-slate-700"></div>

            <CardHeader className="relative z-10">
              <CardTitle className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}>
                <Moon className="w-6 h-6" />
                <span> {getLocalizedText('trimester')} {currentTrimester} {getLocalizedText('duas.guidance')}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="space-y-6">
                {currentTrimesterInfo.duas.map((dua, index) => (
                  <div
                    key={index}
                    className={`text-center p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-amber-200'}`}
                  >
                    <p className={`text-xl font-arabic mb-3 leading-relaxed ${settings.darkMode ? 'text-white' : 'text-amber-900'}`}>
                      {dua.arabic}
                    </p>
                    <p className={`italic mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-amber-700'}`}>
                      "{dua.translation}"
                    </p>
                    <p className={`text-sm font-medium ${settings.darkMode ? 'text-gray-400' : 'text-amber-600'}`}>
                      - {dua.reference}
                    </p>
                  </div>
                ))}

                <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-amber-100'}`}>
                  <h4 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}>
                    {getLocalizedText('islamic.guidance.for.this.trimester')}
                  </h4>
                  <p className={`${settings.darkMode ? 'text-gray-300' : 'text-amber-700'}`}>
                    {currentTrimesterInfo.islamicGuidance}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}>
                      {getLocalizedText('recommended.dhikr')}
                    </h4>
                    <ul className={`space-y-2 text-sm ${settings.darkMode ? 'text-gray-300' : 'text-amber-700'}`}>
                      <li>• {getLocalizedText('subhanallah')} (100x {getLocalizedText('daily')})</li>
                      <li>• {getLocalizedText('alhamdulillah')} (100x {getLocalizedText('daily')})</li>
                      <li>• {getLocalizedText('allahu.akbar')} (100x {getLocalizedText('daily')})</li>
                      <li>• {getLocalizedText('astaghfirullah')} ({getLocalizedText('frequent')})</li>
                    </ul>
                  </div>


                  <div>
                    <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}>
                      {getLocalizedText('surahs.to.recite')}
                    </h4>
                    <ul className={`space-y-2 text-sm ${settings.darkMode ? 'text-gray-300' : 'text-amber-700'}`}>
                      <li>• {getLocalizedText('surah.maryam')} ({getLocalizedText('chapter')} 19)</li>
                      <li>• {getLocalizedText('surah.luqman')} ({getLocalizedText('chapter')} 31)</li>
                      <li>• {getLocalizedText('surah.al.fatiha')} (daily)</li>
                      <li>• {getLocalizedText('ayat.al.kursi')} ({getLocalizedText('for.protection')})</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Fetal Development */}


          <Card className="relative overflow-hidden">
            <div className="absolute inset-0  from-pink-50 to-purple-50 border-pink-200 dark:hidden"></div>
            <div className="absolute inset-0 hidden dark:block bg-slate-900 border border-slate-700"></div>

            <CardHeader className="relative z-10">
              <CardTitle className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-pink-500'}`}>
                <Activity className="w-6 h-6" />
                <span>{getLocalizedText('babys.development.this.week')}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentDevelopment.development.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${settings.darkMode ? 'bg-slate-800' : 'bg-pink-50'}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${settings.darkMode ? 'bg-pink-400' : 'bg-pink-500'}`}></div>
                    <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>


          {/* Trimester Information */}


          <Card className={`relative overflow-hidden ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-blue-50 to-white border-blue-200'}`}>
            <div className="absolute inset-0  from-blue-50 to-white dark:hidden"></div>
            <div className="absolute inset-0 hidden dark:block bg-slate-900 border border-slate-700"></div>

            <CardHeader className="relative z-10">
              <CardTitle className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-blue-500'}`}>
                <Calendar className="w-6 h-6" />
                <span>{currentTrimesterInfo.title}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                {currentTrimesterInfo.description}
              </p>

              <div>
                <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>{getLocalizedText('focus.areas')}</h4>
                <ul className="space-y-2">
                  {currentTrimesterInfo.focus.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${settings.darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
                      <span className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>


          {/* Pregnancy Tracker */}

          <div className="grid grid-cols-1 gap-4 space-y-2">


            <Card className={`relative overflow-hidden hover:shadow-lg transition-shadow ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-purple-50 to-white border-purple-200'}`}>
              <div className="absolute inset-0  from-purple-50 to-white dark:hidden"></div>
              <div className="absolute inset-0 hidden dark:block bg-slate-900 border border-slate-700"></div>

              <CardContent className="p-6 text-center relative z-10">
                <Scale className={`w-8 h-8 mx-auto mb-3 ${settings.darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
                <h3 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>{getLocalizedText('weight.tracking')}</h3>

                {savedWeight ? (
                  <p className={`text-2xl font-bold mb-1 ${settings.darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                    {savedWeight.weight} {savedWeight.unit}
                  </p>
                ) : (
                  <p className={`mt-4 text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>- {getLocalizedText('no.weight.found')} -</p>
                )}

                <p className={`text-sm mb-3 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{getLocalizedText('total.gain')}</p>

                <WeightTrackingModal setSavedWeight={setSavedWeight}>
                  <Button variant="outline" size="sm" className="w-full">
                    {getLocalizedText('update.weight')}
                  </Button>
                </WeightTrackingModal>
              </CardContent>
            </Card>



            <Card className={`relative overflow-hidden hover:shadow-lg transition-shadow ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-pink-50 to-white border-pink-200'}`}>
              <div className="absolute inset-0 from-pink-50 to-white dark:hidden"></div>
              <div className="absolute inset-0 hidden dark:block bg-slate-900 border border-slate-700"></div>

              <CardContent className="p-6 text-center relative z-10">
                <Heart className={`w-8 h-8 mx-auto mb-3 ${settings.darkMode ? 'text-pink-400' : 'text-pink-500'}`} />
                <h3 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>{getLocalizedText('babys.heartbeat')}</h3>

                {savedHeartBeat ? (
                  <p className={`text-2xl font-bold mb-1 ${settings.darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                    {savedHeartBeat.heartRate}
                  </p>
                ) : (
                  <p className={`mt-4 text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>- {getLocalizedText('no.heart.rate.found')} -</p>
                )}

                <p className={`text-sm mb-3 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{getLocalizedText('last.checkup')}</p>

                <HeartbeatModal setSavedHeartBeat={setSavedHeartBeat}>
                  <Button variant="outline" size="sm" className="w-full">
                    {getLocalizedText('record.rate')}
                  </Button>
                </HeartbeatModal>
              </CardContent>
            </Card>



            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'}`}></div>

              <CardContent className="p-6 text-center relative z-10">
                <Activity className={`w-8 h-8 mx-auto mb-3 ${settings.darkMode ? 'text-green-400' : 'text-green-500'}`} />
                <h3 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>{getLocalizedText('kick.counter')}</h3>

                {savedKicks ? (
                  <p className={`text-2xl font-bold mb-1 ${settings.darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    {savedKicks.kicks}
                  </p>
                ) : (
                  <p className={`mt-4 text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>- {getLocalizedText('no.kicks.count.found')} -</p>
                )}

                <p className={`text-sm mb-3 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{getLocalizedText('todays.kicks')}</p>

                <KickCounterModal setSavedKicks={setSavedKicks}>
                  <Button variant="outline" size="sm" className="w-full">
                    {getLocalizedText('count.kicks')}
                  </Button>
                </KickCounterModal>
              </CardContent>
            </Card>


          </div>
        </TabsContent>

        <TabsContent value="symptoms" className="space-y-6">
          <SymptomsTracker />
        </TabsContent>

        <TabsContent value="complications" className="space-y-6">
          <PregnancyComplications />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PregnancyTracking;
