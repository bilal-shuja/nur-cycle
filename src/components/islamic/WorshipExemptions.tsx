
import React, {useState , useEffect} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const WorshipExemptions = () => {
  
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
      {/* <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Worship & Exemptions During Menstruation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-green-800">Prayer (Salah)</h4>
              <Badge className="bg-red-100 text-red-800">Prohibited</Badge>
            </div>
            <p className="text-green-700 text-sm mb-2">
              Completely forbidden during menstruation. No need to make up missed prayers.
            </p>
            <p className="text-xs text-green-600 italic">
              Source: Hadith of Aisha (RA): "When one of you is menstruating, she should not pray." - Sahih Bukhari
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg border border-green-100">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-green-800">Fasting (Sawm)</h4>
              <Badge className="bg-red-100 text-red-800">Prohibited</Badge>
            </div>
            <p className="text-green-700 text-sm mb-2">
              Must break fast during menstruation. Make up missed days after Ramadan.
            </p>
            <p className="text-xs text-green-600 italic">
              Source: Hadith of Aisha (RA): "We were ordered to make up fasting but not prayer." - Sahih Bukhari
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg border border-green-100">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-green-800">Touching the Quran</h4>
              <Badge className="bg-yellow-100 text-yellow-800">Scholarly Difference</Badge>
            </div>
            <div className="text-green-700 text-sm space-y-2">
              <p><strong>Majority view:</strong> Cannot touch the Arabic text directly</p>
              <p><strong>Permissible:</strong> Reading from memory, listening to recitation, reading translations</p>
              <p><strong>With barrier:</strong> Touching with gloves or cloth is allowed by some scholars</p>
            </div>
            <p className="text-xs text-green-600 italic">
              Source: "None can touch it except the purified ones." - Quran 56:79
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg border border-green-100">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-green-800">What IS Permitted</h4>
              <Badge className="bg-green-100 text-green-800">Allowed</Badge>
            </div>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• Dhikr (remembrance of Allah)</li>
              <li>• Du'a (supplication)</li>
              <li>• Listening to Quran recitation</li>
              <li>• Reading Islamic books and translations</li>
              <li>• Attending Islamic lectures</li>
              <li>• Learning and teaching Islam</li>
            </ul>
          </div>
        </CardContent>
      </Card> */}
      <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700 ' : 'bg-green-50 border-green-200 opacity-0'} `}></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-green-800'}`}>
      Worship & Exemptions During Menstruation
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10 space-y-4">

    <div className={`p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-green-100'}`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-green-800'}`}>Prayer (Salah)</h4>
        <Badge className="bg-red-100 text-red-800">Prohibited</Badge>
      </div>
      <p className={`${settings.darkMode ? 'text-gray-300' : 'text-green-700'} text-sm mb-2`}>
        Completely forbidden during menstruation. No need to make up missed prayers.
      </p>
      <p className={`${settings.darkMode ? 'text-gray-400' : 'text-green-600'} text-xs italic`}>
        Source: Hadith of Aisha (RA): "When one of you is menstruating, she should not pray." - Sahih Bukhari
      </p>
    </div>

    <div className={`p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-green-100'}`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-green-800'}`}>Fasting (Sawm)</h4>
        <Badge className="bg-red-100 text-red-800">Prohibited</Badge>
      </div>
      <p className={`${settings.darkMode ? 'text-gray-300' : 'text-green-700'} text-sm mb-2`}>
        Must break fast during menstruation. Make up missed days after Ramadan.
      </p>
      <p className={`${settings.darkMode ? 'text-gray-400' : 'text-green-600'} text-xs italic`}>
        Source: Hadith of Aisha (RA): "We were ordered to make up fasting but not prayer." - Sahih Bukhari
      </p>
    </div>

    <div className={`p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-green-100'}`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-green-800'}`}>Touching the Quran</h4>
        <Badge className="bg-yellow-100 text-yellow-800">Scholarly Difference</Badge>
      </div>
      <div className={`${settings.darkMode ? 'text-gray-300' : 'text-green-700'} text-sm space-y-2`}>
        <p><strong>Majority view:</strong> Cannot touch the Arabic text directly</p>
        <p><strong>Permissible:</strong> Reading from memory, listening to recitation, reading translations</p>
        <p><strong>With barrier:</strong> Touching with gloves or cloth is allowed by some scholars</p>
      </div>
      <p className={`${settings.darkMode ? 'text-gray-400' : 'text-green-600'} text-xs italic`}>
        Source: "None can touch it except the purified ones." - Quran 56:79
      </p>
    </div>

    <div className={`p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-green-100'}`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-green-800'}`}>What IS Permitted</h4>
        <Badge className="bg-green-100 text-green-800">Allowed</Badge>
      </div>
      <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-green-700'} text-sm space-y-1`}>
        <li>• Dhikr (remembrance of Allah)</li>
        <li>• Du'a (supplication)</li>
        <li>• Listening to Quran recitation</li>
        <li>• Reading Islamic books and translations</li>
        <li>• Attending Islamic lectures</li>
        <li>• Learning and teaching Islam</li>
      </ul>
    </div>

  </CardContent>
</Card>

    </div>
  );
};

export default WorshipExemptions;
