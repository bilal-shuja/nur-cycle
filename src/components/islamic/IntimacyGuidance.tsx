
import React , {useState , useEffect} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IntimacyGuidance = () => {

  
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
      {/* <Card className="bg-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">Marital Relations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">During Menstruation</h4>
            <p className="text-purple-700 text-sm">
              Sexual intercourse is prohibited during menstruation. However, other forms of 
              affection and intimacy (except intercourse) are permitted according to most scholars.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">After Purification</h4>
            <p className="text-purple-700 text-sm">
              After menstruation ends and Ghusl is performed, normal marital relations can resume. 
              Islam encourages healthy intimacy between spouses as a blessing and protection.
            </p>
          </div>
        </CardContent>
      </Card> */}
       <Card className="relative overflow-hidden card-3d">
    <div
      className={`absolute inset-0 ${
        settings.darkMode
          ? 'bg-slate-900 border border-slate-700'
          : ' from-purple-50 to-pink-50 border-purple-200'
      } `}
    ></div>

    <CardHeader className="relative z-10">
      <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>
        Marital Relations
      </CardTitle>
    </CardHeader>

    <CardContent className="relative z-10 space-y-4">
      <div
        className={`p-4 rounded-lg ${
          settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-white border border-purple-200'
        }`}
      >
        <h4 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
          During Menstruation
        </h4>
        <p className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm`}>
          Sexual intercourse is prohibited during menstruation. However, other forms of
          affection and intimacy (except intercourse) are permitted according to most scholars.
        </p>
      </div>

      <div
        className={`p-4 rounded-lg ${
          settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-white border border-purple-200'
        }`}
      >
        <h4 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
          After Purification
        </h4>
        <p className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm`}>
          After menstruation ends and Ghusl is performed, normal marital relations can resume.
          Islam encourages healthy intimacy between spouses as a blessing and protection.
        </p>
      </div>
    </CardContent>
  </Card>
    </div>
  );
};

export default IntimacyGuidance;
