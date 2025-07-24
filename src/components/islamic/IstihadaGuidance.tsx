
import React, {useState , useEffect} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IstihadaGuidance = () => {
  
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
  return (
    <div className="space-y-6">

<Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700 ' : 'bg-red-50 border-red-200 opacity-0'} `}></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-red-800'}`}>
      Irregular Bleeding (Istihada)
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10 space-y-4">
    <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-white border border-red-200'}`}>
      <h4 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-red-800'}`}>
        What is Istihada?
      </h4>
      <p className={`${settings.darkMode ? 'text-gray-300' : 'text-red-700'} text-sm`}>
        Irregular bleeding outside the normal menstrual period. This could be due to illness,
        medication, or other medical conditions. Does not have the same rulings as menstruation.
      </p>
    </div>

    <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-white border border-red-200'}`}>
      <h4 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-red-800'}`}>
        Rulings
      </h4>
      <p className={`${settings.darkMode ? 'text-gray-300' : 'text-red-700'} text-sm`}>
        Woman must continue prayers and fasting. Perform Wudu before each prayer.
        Consult scholars for specific situations and medical treatment is recommended.
      </p>
    </div>
  </CardContent>
</Card>
</div>
  );
};

export default IstihadaGuidance;
