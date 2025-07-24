
import React, {useState , useEffect} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NifasGuidance = () => {

  
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
      {/* <Card className="bg-pink-50 border-pink-200">
        <CardHeader>
          <CardTitle className="text-pink-800">Postpartum Bleeding (Nifas)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg">
            <h4 className="font-semibold text-pink-800 mb-2">Duration & Nature</h4>
            <p className="text-pink-700 text-sm">
              Blood that flows after childbirth. Maximum duration: 40 days according to most scholars. 
              If bleeding stops before 40 days, perform Ghusl and resume prayers.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <h4 className="font-semibold text-pink-800 mb-2">Same Rules as Menstruation</h4>
            <p className="text-pink-700 text-sm">
              All prohibitions and permissions that apply to menstruation also apply to Nifas. 
              The woman is excused from prayer and fasting during this period.
            </p>
          </div>
        </CardContent>
      </Card> */}

      <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-pink-50 border-pink-200 opacity-0'} `}></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-pink-800'}`}>
      Postpartum Bleeding (Nifas)
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10 space-y-4">

    <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-white border border-pink-200'}`}>
      <h4 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-pink-800'}`}>Duration & Nature</h4>
      <p className={`${settings.darkMode ? 'text-gray-300' : 'text-pink-700'} text-sm`}>
        Blood that flows after childbirth. Maximum duration: 40 days according to most scholars. 
        If bleeding stops before 40 days, perform Ghusl and resume prayers.
      </p>
    </div>

    <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-white border border-pink-200'}`}>
      <h4 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-pink-800'}`}>Same Rules as Menstruation</h4>
      <p className={`${settings.darkMode ? 'text-gray-300' : 'text-pink-700'} text-sm`}>
        All prohibitions and permissions that apply to menstruation also apply to Nifas. 
        The woman is excused from prayer and fasting during this period.
      </p>
    </div>

  </CardContent>
</Card>

    </div>
  );
};

export default NifasGuidance;
