
import React, { useState , useEffect} from 'react';
import { Baby, Calendar, Heart, Moon, Star, Flower } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FertilityTracking from './FertilityTracking';
import PregnancyTracking from './PregnancyTracking';

import { useLanguage } from '@/contexts/LanguageContext';


const PregnancyMode = () => {
  const [activeTab, setActiveTab] = useState('fertility');
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

  const dailyVerse = {
    verse: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
    translation: getLocalizedText('dua') ,
    reference: "Quran 25:74"
  };

  const motivationalQuote = getLocalizedText('allahs.timing');

  return (
    <div className="space-y-6">

      <div className={`text-center ${settings.darkMode ? 'text-white' : ''}`}>
  <h1 className={`text-3xl font-bold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
    {getLocalizedText('pregnancy.fertility.journey')}
  </h1>
  <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
   {getLocalizedText('blessed.journey')}
  </p>
</div>


      {/* Daily Islamic Inspiration */}

      <Card className="relative overflow-hidden">
  <div className="absolute inset-0  from-purple-100 via-pink-50 to-purple-100 dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
    <Star className="w-full h-full text-purple-600" />
  </div>

<CardHeader className="relative z-10">
  <CardTitle
    className={`flex items-center space-x-2 transition-colors duration-300 ${
      settings.darkMode ? 'text-white' : 'text-purple-800'
    }`}
  >
    <Moon className={`w-6 h-6 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`} />
    <span> {getLocalizedText('todays.islamic.inspiration')} </span>
  </CardTitle>
</CardHeader>

  <CardContent className="relative z-10">
    <div className="text-center mb-4">
      <p className={`text-xl font-arabic mb-2 ${settings.darkMode ? 'text-white' : 'text-purple-900'}`}>{dailyVerse.verse}</p>
      <p className={`italic mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-purple-700'}`}>"{dailyVerse.translation}"</p>
      <p className={`text-sm font-medium ${settings.darkMode ? 'text-gray-400' : 'text-purple-600'}`}>- {dailyVerse.reference}</p>
    </div>
    <div className={`border-t pt-4 ${settings.darkMode ? 'border-slate-700' : 'border-purple-200'}`}>
      <div className="flex items-center gap-2 mb-2">
        <Heart className={`w-4 h-4 ${settings.darkMode ? 'text-pink-400' : 'text-pink-500'}`} />
        <span className={`text-sm font-medium ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>{getLocalizedText('daily.motivation')}</span>
      </div>
      <p className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm`}>{motivationalQuote}</p>
    </div>
  </CardContent>
</Card>


      {/* Tabs for Fertility and Pregnancy Tracking */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-purple-100">
          <TabsTrigger value="fertility" className="data-[state=active]:bg-lavender-600 data-[state=active]:text-white">
            <Heart className="w-4 h-4 mr-2" />
            {getLocalizedText('fertility.tracking')}
          </TabsTrigger>
          <TabsTrigger value="pregnancy" className="data-[state=active]:bg-lavender-600 data-[state=active]:text-white">
            <Baby className="w-4 h-4 mr-2" />
            {getLocalizedText('pregnancy.journey')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="fertility" className="mt-6">
          <FertilityTracking />
        </TabsContent>
        
        <TabsContent value="pregnancy" className="mt-6">
          <PregnancyTracking />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PregnancyMode;
