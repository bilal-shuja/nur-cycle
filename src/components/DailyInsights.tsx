
import React,{useState, useEffect} from 'react';
import { Heart, Droplet, TrendingUp, Activity, Moon, AlertCircle, Smile, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DailyInsights = () => {


  
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


  const insights = [
    {
      title: "Symptoms to Expect",
      description: "Mild cramping and mood changes",
      icon: Activity,
      color: "bg-pink-100 text-pink-600",
      bgColor: "bg-gradient-to-br from-pink-50 to-pink-100",
      illustration: "🤱🏽"
    },
    {
      title: "Pregnancy Chance",
      description: "Low probability today",
      icon: Heart,
      color: "bg-purple-100 text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      illustration: "🤰🏽"
    },
    {
      title: "Marital Relations",
      description: "Within halal boundaries",
      icon: Moon,
      color: "bg-teal-100 text-teal-600",
      bgColor: "bg-gradient-to-br from-teal-50 to-teal-100",
      illustration: "👥"
    },
    {
      title: "Cycle Regularity",
      description: "On track this month",
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      illustration: "📊"
    },
    {
      title: "Hormonal Balance",
      description: "Stable progesterone levels",
      icon: Smile,
      color: "bg-yellow-100 text-yellow-600",
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      illustration: "😊"
    },
    {
      title: "Bloating Level",
      description: "Minimal discomfort expected",
      icon: Wind,
      color: "bg-blue-100 text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      illustration: "🌸"
    },
    {
      title: "Energy Levels",
      description: "Moderate energy today",
      icon: Activity,
      color: "bg-orange-100 text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      illustration: "🏃🏽‍♀️"
    },
    {
      title: "Sleep Quality",
      description: "Good rest recommended",
      icon: Moon,
      color: "bg-indigo-100 text-indigo-600",
      bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      illustration: "😴"
    }
  ];

  return (

    <>
        {/* <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6 mt-14">
        <div className="w-12 h-12 bg-gradient-to-br from-lavender-500 to-lavender-700 rounded-full flex items-center justify-center">
          <span className="text-white text-xl">✨</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Today's Insights</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className={`${insight.bgColor} border-0 cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-105 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Ccircle cx='25' cy='25' r='20' fill='none' stroke='currentColor' stroke-width='2'/%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-full ${insight.color} flex items-center justify-center`}>
                  <insight.icon className="w-5 h-5" />
                </div>
                <span className="text-2xl">{insight.illustration}</span>
              </div>
              <h3 className="font-semibold text-sm text-gray-800 mb-1">{insight.title}</h3>
              <p className="text-xs text-gray-600">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div> */}

    <div className={`space-y-4 ${settings.darkMode ? 'text-white' : 'text-black'}`}>
  <div className="flex items-center gap-3 mb-6 mt-14">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${settings.darkMode ? 'bg-slate-700' : 'bg-gradient-to-br from-lavender-500 to-lavender-700'}`}>
      <span className="text-white text-xl">✨</span>
    </div>
    <h2 className={`text-2xl font-bold ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>Today's Insights</h2>
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
