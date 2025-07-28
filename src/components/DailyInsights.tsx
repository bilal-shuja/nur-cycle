
import {useState, useEffect} from 'react';
import { Heart, Droplet, TrendingUp, Activity, Moon, AlertCircle, Smile, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';


const DailyInsights = () => {

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


  const insights = [
    {
      title: getLocalizedText('symptoms.to.expect') ,
      description: getLocalizedText('symptoms.to.expect.desc') ,
      icon: Activity,
      color: "bg-pink-100 text-pink-600",
      bgColor: "bg-gradient-to-br from-pink-50 to-pink-100",
      illustration: "🤱🏽"
    },
    {
      title: getLocalizedText('pregnancy.chance'),
      description: getLocalizedText('pregnancy.chance.desc'),
      icon: Heart,
      color: "bg-purple-100 text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      illustration: "🤰🏽"
    },
    {
      title: getLocalizedText('marital.relations') ,
      description: getLocalizedText('marital.relations.desc') ,
      icon: Moon,
      color: "bg-teal-100 text-teal-600",
      bgColor: "bg-gradient-to-br from-teal-50 to-teal-100",
      illustration: "👥"
    },
    {
      title: getLocalizedText('cycle.regularity') ,
      description: getLocalizedText('cycle.regularity.desc') ,
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      illustration: "📊"
    },
    {
      title: getLocalizedText('hormonal.balance') ,
      description: getLocalizedText('hormonal.balance.desc') ,
      icon: Smile,
      color: "bg-yellow-100 text-yellow-600",
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      illustration: "😊"
    },
    {
      title: getLocalizedText('bloating.level') ,
      description: getLocalizedText('bloating.level.desc') ,
      icon: Wind,
      color: "bg-blue-100 text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      illustration: "🌸"
    },
    {
      title: getLocalizedText('energy.levels') ,
      description: getLocalizedText('energy.levels.desc'),
      icon: Activity,
      color: "bg-orange-100 text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      illustration: "🏃🏽‍♀️"
    },
    {
      title: getLocalizedText('sleep.quality'),
      description: getLocalizedText('sleep.quality.desc') ,
      icon: Moon,
      color: "bg-indigo-100 text-indigo-600",
      bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      illustration: "😴"
    }
  ];

  return (

    <>

    <div className={`space-y-4 ${settings.darkMode ? 'text-white' : 'text-black'}`}>
  <div className="flex items-center gap-3 mb-6 mt-14">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${settings.darkMode ? 'bg-slate-700' : 'bg-gradient-to-br from-lavender-500 to-lavender-700'}`}>
      <span className="text-white text-xl">✨</span>
    </div>
    <h2 className={`text-2xl font-bold ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}> {getLocalizedText('todays.insights')} </h2>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {insights.map((insight, index) => (
      <Card key={index} className="relative overflow-hidden border-0 cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-105">
        <div className={`${settings.darkMode ? 'hidden' : 'absolute top-0 right-0 w-16 h-16 opacity-10'}`}>
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Ccircle cx='25' cy='25' r='20' fill='none' stroke='currentColor' stroke-width='2'/%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className={`${settings.darkMode ? 'absolute inset-0 bg-slate-800' : ''}`}></div>

        <CardContent className="p-4 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${settings.darkMode ? 'bg-slate-700' : insight.color}`}>
              <insight.icon className="w-5 h-5" />
            </div>
            <span className="text-2xl">{insight.illustration}</span>
          </div>
          <h3 className={`font-semibold text-sm ${settings.darkMode ? 'text-white' : 'text-gray-800'} mb-1`}>{insight.title}</h3>
          <p className={`text-xs ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{insight.description}</p>
        </CardContent>
      </Card>
    ))}
  </div>
</div>

    </>

  );
};

export default DailyInsights;
