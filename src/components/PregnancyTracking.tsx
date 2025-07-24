import { useState, useEffect } from 'react';
import { Baby, Calendar, Heart, BookOpen, Activity, Scale, Moon, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeightTrackingModal, HeartbeatModal, KickCounterModal } from './PregnancyTrackingModals';
import PregnancyComplications from './PregnancyComplications';
import SymptomsTracker from './SymptomsTracker';

const PregnancyTracking = () => {
  const [currentWeek, setCurrentWeek] = useState(12);
  const currentTrimester = currentWeek <= 12 ? 1 : currentWeek <= 27 ? 2 : 3;
  const progressPercentage = (currentWeek / 40) * 100;

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
          console.log('Settings loaded:', parsedSettings);
        } catch (error) {
          console.error('Error loading settings:', error);
        }
      }
      else {
      // Agar kuch save nahi hai, toh default light mode lagaye:
      document.documentElement.classList.remove('dark');
    }
  
      // Apply dark mode immediately if enabled:
  
      // const isDarkMode = savedSettings ? JSON.parse(savedSettings).darkMode : false;
      // if (isDarkMode) {
      //   document.documentElement.classList.add('dark');
      // }
  
  
    }, []);

  const weeklyDevelopment = {
    12: {
      size: "Plum",
      length: "2.1 inches",
      weight: "0.5 oz",
      development: [
        "Baby's face is becoming more human-like",
        "Fingernails and toenails are forming",
        "Baby can make a fist and suck their thumb",
        "Reflexes are developing"
      ],
      visual: "🫐",
      milestone: "End of first trimester - major organs formed!"
    },
    16: {
      size: "Avocado",
      length: "4.6 inches",
      weight: "3.5 oz",
      development: [
        "Baby can hear your voice",
        "Facial expressions are developing",
        "Baby's skeleton is hardening",
        "You might feel first movements soon"
      ],
      visual: "🥑",
      milestone: "Baby's sex can be determined via ultrasound"
    },
    20: {
      size: "Banana",
      length: "6.5 inches",
      weight: "10.2 oz",
      development: [
        "Baby's movements are stronger",
        "Hair and nails continue growing",
        "Baby can swallow and taste",
        "Vernix protects baby's skin"
      ],
      visual: "🍌",
      milestone: "Halfway point! Anatomy scan time"
    },
    24: {
      size: "Ear of Corn",
      length: "11.8 inches",
      weight: "1.3 lbs",
      development: [
        "Baby's hearing is improving",
        "Lungs are developing rapidly",
        "Baby has sleep and wake cycles",
        "Taste buds are developing"
      ],
      visual: "🌽",
      milestone: "Viability milestone reached"
    }
  };

  const currentDevelopment = weeklyDevelopment[currentWeek] || weeklyDevelopment[12];

  const trimesterInfo = {
    1: {
      title: "First Trimester (Weeks 1-12)",
      description: "Foundation building - major organs form",
      focus: ["Folic acid intake", "Morning sickness management", "Regular prenatal visits"],
      islamicGuidance: "Recite Surah Maryam for protection and blessing during this crucial time.",
      color: "bg-green-100 text-green-600",
      duas: [
        {
          arabic: "رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ",
          translation: "My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of supplication.",
          reference: "Quran 3:38"
        }
      ]
    },
    2: {
      title: "Second Trimester (Weeks 13-27)",
      description: "Golden period - energy returns, baby grows rapidly",
      focus: ["Balanced nutrition", "Light exercise", "Baby movement tracking"],
      islamicGuidance: "Continue dhikr and duas for healthy development. This is often the most comfortable period.",
      color: "bg-blue-100 text-blue-600",
      duas: [
        {
          arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
          translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes.",
          reference: "Quran 25:74"
        }
      ]
    },
    3: {
      title: "Third Trimester (Weeks 28-40)",
      description: "Final preparations - baby's organs mature",
      focus: ["Birth preparation", "Hospital bag packing", "Final check-ups"],
      islamicGuidance: "Increase istighfar and prepare spiritually for childbirth. Recite Surah Luqman.",
      color: "bg-purple-100 text-purple-600",
      duas: [
        {
          arabic: "اللَّهُمَّ أَخْرِجْنِي مُخْرَجَ صِدْقٍ وَاجْعَل لِّي مِن لَّدُنكَ سُلْطَانًا نَّصِيرًا",
          translation: "O my Lord! Let my entry be by the Gate of Truth and Honor, and likewise my exit by the Gate of Truth and Honor; and grant me from Your Presence an authority to aid me.",
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

  if(heartRateData) {
    setSavedHeartBeat(JSON.parse(heartRateData))
  }

  if(kicksData){
setSavedKicks(JSON.parse(kicksData))
  }
}, []);

  return (
    <div className="space-y-6">
      {/* Pregnancy Tracking Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Baby className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="symptoms" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Symptoms
          </TabsTrigger>
          <TabsTrigger value="complications" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Complications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Pregnancy Progress */}

      {/* <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-800">
            <Baby className="w-6 h-6" />
            <span>Pregnancy Journey - Week {currentWeek}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-purple-600">
              <span>Week 1</span>
              <span>{currentWeek} of 40 weeks</span>
              <span>Week 40</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="text-center">
              <p className="text-lg font-semibold text-purple-800">
                Trimester {currentTrimester} • {40 - currentWeek} weeks remaining
              </p>
            </div>
          </div>
        </CardContent>
      </Card> */}

      <Card className="relative overflow-hidden">
  <div className="absolute inset-0  from-pink-50 to-purple-50 border-pink-200 dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
      <Baby className="w-6 h-6" />
      <span>Pregnancy Journey - Week {currentWeek}</span>
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10">
    <div className="space-y-4">
      <div className={`flex justify-between text-sm ${settings.darkMode ? 'text-gray-300' : 'text-purple-600'}`}>
        <span>Week 1</span>
        <span>{currentWeek} of 40 weeks</span>
        <span>Week 40</span>
      </div>
      <Progress value={progressPercentage} className="h-3" />
      <div className="text-center">
        <p className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
          Trimester {currentTrimester} • {40 - currentWeek} weeks remaining
        </p>
      </div>
    </div>
  </CardContent>
</Card>


      {/* Current Week Overview */}

      {/* <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
        <CardHeader>
          <CardTitle className="text-center text-purple-800">Baby Development This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{currentDevelopment.visual}</div>
            <p className="text-2xl font-bold text-purple-900 mb-2">Size of a {currentDevelopment.size}</p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <p className="text-lg font-bold text-purple-600">{currentDevelopment.length}</p>
                <p className="text-sm text-gray-600">Length</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-purple-600">{currentDevelopment.weight}</p>
                <p className="text-sm text-gray-600">Weight</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <p className="text-purple-800 font-medium text-center">{currentDevelopment.milestone}</p>
          </div>
        </CardContent>
      </Card> */}

      <Card className="relative overflow-hidden">
  <div className="absolute inset-0  from-pink-50 to-purple-50 border-pink-200 dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`text-center ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
      Baby Development This Week
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10">
    <div className="text-center mb-6">
      <div className="text-6xl mb-4 dark:text-white">{currentDevelopment.visual}</div>
      <p className={`text-2xl font-bold ${settings.darkMode ? 'text-white' : 'text-purple-900'} mb-2`}>
        Size of a {currentDevelopment.size}
      </p>
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="text-center">
          <p className={`text-lg font-bold ${settings.darkMode ? 'text-white' : 'text-purple-600'}`}>
            {currentDevelopment.length}
          </p>
          <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Length</p>
        </div>
        <div className="text-center">
          <p className={`text-lg font-bold ${settings.darkMode ? 'text-white' : 'text-purple-600'}`}>
            {currentDevelopment.weight}
          </p>
          <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Weight</p>
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

      {/* <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-amber-800">
            <Moon className="w-6 h-6" />
            <span>Trimester {currentTrimester} Du'as & Guidance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {currentTrimesterInfo.duas.map((dua, index) => (
              <div key={index} className="text-center bg-white p-4 rounded-lg border border-amber-200">
                <p className="text-xl font-arabic text-amber-900 mb-3 leading-relaxed">
                  {dua.arabic}
                </p>
                <p className="text-amber-700 italic mb-2">
                  "{dua.translation}"
                </p>
                <p className="text-sm text-amber-600 font-medium">- {dua.reference}</p>
              </div>
            ))}
            
            <div className="bg-amber-100 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">Islamic Guidance for This Trimester:</h4>
              <p className="text-amber-700">{currentTrimesterInfo.islamicGuidance}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-amber-800 mb-3">Recommended Dhikr:</h4>
                <ul className="space-y-2 text-amber-700 text-sm">
                  <li>• SubhanAllah (100x daily)</li>
                  <li>• Alhamdulillah (100x daily)</li>
                  <li>• Allahu Akbar (100x daily)</li>
                  <li>• Astaghfirullah (frequent)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-amber-800 mb-3">Surahs to Recite:</h4>
                <ul className="space-y-2 text-amber-700 text-sm">
                  <li>• Surah Maryam (Chapter 19)</li>
                  <li>• Surah Luqman (Chapter 31)</li>
                  <li>• Surah Al-Fatiha (daily)</li>
                  <li>• Ayat al-Kursi (for protection)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}

      <Card className="relative overflow-hidden">
  <div className="absolute inset-0  from-amber-50 to-orange-50 border-amber-200 dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900 border-slate-700"></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}>
      <Moon className="w-6 h-6" />
      <span>Trimester {currentTrimester} Du'as & Guidance</span>
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
          Islamic Guidance for This Trimester:
        </h4>
        <p className={`${settings.darkMode ? 'text-gray-300' : 'text-amber-700'}`}>
          {currentTrimesterInfo.islamicGuidance}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}>
            Recommended Dhikr:
          </h4>
          <ul className={`space-y-2 text-sm ${settings.darkMode ? 'text-gray-300' : 'text-amber-700'}`}>
            <li>• SubhanAllah (100x daily)</li>
            <li>• Alhamdulillah (100x daily)</li>
            <li>• Allahu Akbar (100x daily)</li>
            <li>• Astaghfirullah (frequent)</li>
          </ul>
        </div>

        <div>
          <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}>
            Surahs to Recite:
          </h4>
          <ul className={`space-y-2 text-sm ${settings.darkMode ? 'text-gray-300' : 'text-amber-700'}`}>
            <li>• Surah Maryam (Chapter 19)</li>
            <li>• Surah Luqman (Chapter 31)</li>
            <li>• Surah Al-Fatiha (daily)</li>
            <li>• Ayat al-Kursi (for protection)</li>
          </ul>
        </div>
      </div>
    </div>
  </CardContent>
</Card>


      {/* Fetal Development */}

      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-6 h-6 text-pink-500" />
            <span>Baby's Development This Week</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentDevelopment.development.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */} 
<Card className="relative overflow-hidden">
  <div className="absolute inset-0  from-pink-50 to-purple-50 border-pink-200 dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900 border border-slate-700"></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-pink-500'}`}>
      <Activity className="w-6 h-6" />
      <span>Baby's Development This Week</span>
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

      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-blue-500" />
            <span>{currentTrimesterInfo.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{currentTrimesterInfo.description}</p>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Focus Areas:</h4>
            <ul className="space-y-2">
              {currentTrimesterInfo.focus.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card> */}

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
      <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>Focus Areas:</h4>
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

        {/* <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Scale className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Weight Tracking</h3>
            {savedWeight ? (
            <p className="text-2xl font-bold text-purple-600 mb-1">{savedWeight.weight} {savedWeight.unit}</p>
            )
            :
            <p className="mt-4 text-sm text-gray-500">- No weight found -</p>
          }
            <p className="text-sm text-gray-600 mb-3">Total gain</p>
            <WeightTrackingModal  setSavedWeight={setSavedWeight}>
              <Button variant="outline" size="sm" className="w-full">
                Update Weight
              </Button>
            </WeightTrackingModal>
          </CardContent>
        </Card> */}

        <Card className={`relative overflow-hidden hover:shadow-lg transition-shadow ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-purple-50 to-white border-purple-200'}`}>
  <div className="absolute inset-0  from-purple-50 to-white dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900 border border-slate-700"></div>

  <CardContent className="p-6 text-center relative z-10">
    <Scale className={`w-8 h-8 mx-auto mb-3 ${settings.darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
    <h3 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>Weight Tracking</h3>

    {savedWeight ? (
      <p className={`text-2xl font-bold mb-1 ${settings.darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
        {savedWeight.weight} {savedWeight.unit}
      </p>
    ) : (
      <p className={`mt-4 text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>- No weight found -</p>
    )}

    <p className={`text-sm mb-3 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total gain</p>

    <WeightTrackingModal setSavedWeight={setSavedWeight}>
      <Button variant="outline" size="sm" className="w-full">
        Update Weight
      </Button>
    </WeightTrackingModal>
  </CardContent>
</Card>



{/* 
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 text-pink-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Baby's Heartbeat</h3>
            {savedHeartBeat ? (
              <p className="text-2xl font-bold text-pink-600 mb-1">{savedHeartBeat.heartRate}</p>
            )
            :
            <p className="mt-4 text-sm text-gray-500">- No heart rate found -</p>
          }
            <p className="text-sm text-gray-600 mb-3">Last checkup</p>
            <HeartbeatModal setSavedHeartBeat={setSavedHeartBeat}>
              <Button variant="outline" size="sm" className="w-full">
                Record Rate
              </Button>
            </HeartbeatModal>
          </CardContent>
        </Card> */}

        <Card className={`relative overflow-hidden hover:shadow-lg transition-shadow ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-pink-50 to-white border-pink-200'}`}>
  <div className="absolute inset-0 from-pink-50 to-white dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900 border border-slate-700"></div>

  <CardContent className="p-6 text-center relative z-10">
    <Heart className={`w-8 h-8 mx-auto mb-3 ${settings.darkMode ? 'text-pink-400' : 'text-pink-500'}`} />
    <h3 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>Baby's Heartbeat</h3>

    {savedHeartBeat ? (
      <p className={`text-2xl font-bold mb-1 ${settings.darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
        {savedHeartBeat.heartRate}
      </p>
    ) : (
      <p className={`mt-4 text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>- No heart rate found -</p>
    )}

    <p className={`text-sm mb-3 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Last checkup</p>

    <HeartbeatModal setSavedHeartBeat={setSavedHeartBeat}>
      <Button variant="outline" size="sm" className="w-full">
        Record Rate
      </Button>
    </HeartbeatModal>
  </CardContent>
</Card>


        {/* <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Activity className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Kick Counter</h3>
              {savedKicks ? (
              <p className="text-2xl font-bold text-green-600 mb-1">{savedKicks.kicks}</p>
            )
            :
            <p className="mt-4 text-sm text-gray-500">- No kicks count found -</p>
          }
            <p className="text-sm text-gray-600 mb-3">Today's kicks</p>
            <KickCounterModal setSavedKicks = {setSavedKicks}>
              <Button variant="outline" size="sm" className="w-full">
                Count Kicks
              </Button>
            </KickCounterModal>
          </CardContent>
        </Card> */}

          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'}`}></div>

  <CardContent className="p-6 text-center relative z-10">
    <Activity className={`w-8 h-8 mx-auto mb-3 ${settings.darkMode ? 'text-green-400' : 'text-green-500'}`} />
    <h3 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>Kick Counter</h3>

    {savedKicks ? (
      <p className={`text-2xl font-bold mb-1 ${settings.darkMode ? 'text-green-400' : 'text-green-600'}`}>
        {savedKicks.kicks}
      </p>
    ) : (
      <p className={`mt-4 text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>- No kicks count found -</p>
    )}

    <p className={`text-sm mb-3 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Today's kicks</p>

    <KickCounterModal setSavedKicks={setSavedKicks}>
      <Button variant="outline" size="sm" className="w-full">
        Count Kicks
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
