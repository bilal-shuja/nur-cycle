
import React,{useState , useEffect} from 'react';
import { Calendar, TrendingUp, Clock, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CycleStats = () => {

  
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


  const stats = [
    {
      title: "Previous Cycle Length",
      value: "28 days",
      subtext: "Started June 15",
      icon: Calendar,
      color: "text-purple-600",
      illustration: "📅",
      bgGradient: "from-purple-100 to-purple-200"
    },
    {
      title: "Previous Period Length",
      value: "5 days",
      subtext: "Within normal range",
      icon: Clock,
      color: "text-purple-700",
      illustration: "⏱️",
      bgGradient: "from-purple-200 to-purple-300"
    },
    {
      title: "Cycle Length Variation",
      value: "±2 days",
      subtext: "Very consistent",
      icon: TrendingUp,
      color: "text-purple-600",
      illustration: "📈",
      bgGradient: "from-purple-100 to-purple-200"
    },
    {
      title: "Average Cycle",
      value: "28.5 days",
      subtext: "Last 6 months",
      icon: BarChart3,
      color: "text-purple-700",
      illustration: "📊",
      bgGradient: "from-purple-200 to-purple-300"
    }
  ];

  return (
   <>
   
     {/* <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-purple-ombre circular-3d floating-3d flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-white icon-3d" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">My Cycle Overview</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className={`card-3d bg-gradient-to-br ${stat.bgGradient} border-0 hover:shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
              <div className="w-full h-full circular-3d rotating-3d" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Cpath d='M25 5 L35 15 L25 25 L15 15 Z' fill='currentColor'/%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 circular-3d ${stat.color} flex items-center justify-center pulsing-3d`}>
                  <stat.icon className="w-5 h-5 icon-3d" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl floating-3d">{stat.illustration}</span>
                  <span className={`text-2xl font-bold text-lavender-700`}>{stat.value}</span>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-gray-800 mb-1">{stat.title}</h3>
              <p className="text-xs text-gray-600">{stat.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div> */}

    <div className={`space-y-4 ${settings.darkMode ? 'text-white' : ''}`}>
  <div className="flex items-center gap-3 mb-6">
    <div className={`w-12 h-12 ${settings.darkMode ? 'bg-slate-700' : 'bg-purple-ombre'} circular-3d floating-3d flex items-center justify-center`}>
      <BarChart3 className="w-6 h-6 text-white icon-3d" />
    </div>
    <h2 className={`text-2xl font-bold ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>My Cycle Overview</h2>
  </div>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {stats.map((stat, index) => (
      <Card key={index} className={`card-3d relative overflow-hidden border-0 hover:shadow-lg transition-all duration-300 hover:scale-105 ${settings.darkMode ? 'bg-slate-800' : `bg-gradient-to-br ${stat.bgGradient}`}`}>        
        <div className={`${settings.darkMode ? 'hidden' : 'absolute top-0 right-0 w-16 h-16 opacity-10'}`}>
          <div className="w-full h-full circular-3d rotating-3d" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Cpath d='M25 5 L35 15 L25 25 L15 15 Z' fill='currentColor'/%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className={`${settings.darkMode ? 'absolute inset-0 bg-slate-800' : ''}`}></div>
        
        <CardContent className="p-4 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-8 h-8 circular-3d ${settings.darkMode ? 'bg-slate-700' : stat.color} flex items-center justify-center pulsing-3d`}>
              <stat.icon className="w-5 h-5 icon-3d" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl floating-3d">{stat.illustration}</span>
              <span className={`text-2xl font-bold ${settings.darkMode ? 'text-white' : 'text-lavender-700'}`}>{stat.value}</span>
            </div>
          </div>
          <h3 className={`font-semibold text-sm mb-1 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>{stat.title}</h3>
          <p className={`text-xs ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.subtext}</p>
        </CardContent>
      </Card>
    ))}
  </div>
</div>
   </>
  
  );
};

export default CycleStats;
