import React, { useState, useEffect } from 'react';
import { ChevronLeft, Globe, Check, Bell, Moon, Smartphone, Lock, Calendar, Heart, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface AppSettingsProps {
  onBack: () => void;
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
];

const AppSettings = ({ onBack }: AppSettingsProps) => {
  const [currentView, setCurrentView] = useState<'main' | 'languages' | 'notifications' | 'privacy' | 'display'>('main');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
    const { getLocalizedText, setLanguage } = useLanguage();
  const { toast } = useToast();

  
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
    // Load saved language preference
    const savedLanguage = localStorage.getItem('nurcycle-language') || 'en';
    setSelectedLanguage(savedLanguage);
    
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

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setLanguage(languageCode);
    localStorage.setItem('nurcycle-language', languageCode);
    
    toast({
      title: "Language Updated",
      description: `Language changed to ${languages.find(lang => lang.code === languageCode)?.name || 'English'}`,
    });
    
    console.log(`Language changed to: ${languageCode}`);
  };

  const handleSettingChange = (key: string, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    // Persist to localStorage
    localStorage.setItem('nurcycle-app-settings', JSON.stringify(newSettings));
    
    // Handle special cases that need immediate app-wide effects
    // if (key === 'darkMode') {
    //   if (value) {
    //     document.documentElement.classList.add('dark');
    //   } else {
    //     document.documentElement.classList.remove('dark');
    //   }
    // }

        let hasReloaded = false;

      if (key === 'darkMode') {
    // Force a small delay to ensure state is updated
      setTimeout(() => {
        if (value) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
           if (!hasReloaded) {
      window.location.reload();
      hasReloaded = true;
    }
      }, 0);
  }
    
    // Show toast notification for important settings
    const importantSettings = ['biometricLock', 'darkMode', 'autoBackup', 'syncEnabled'];
    if (importantSettings.includes(key)) {
      toast({
        title: "Setting Updated",
        description: `${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} ${value ? 'enabled' : 'disabled'}`,
      });
    }
    
    // console.log(`Setting ${key} changed to: ${value}`);
  };

  if (currentView === 'languages') {
    return (
      <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
        {/* Header */}
        {/* <div className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentView('main')}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">{getLocalizedText('languages')}</h1>
            <div className="w-10" />
          </div>
        </div> */}

        <div className={`relative overflow-hidden card-3d`}>
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border-b border-slate-700' : 'bg-white border-b border-gray-200'}`}></div>

  <div className="relative z-10 flex items-center justify-between p-4">
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setCurrentView('main')}
      className={`rounded-full ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}
    >
      <ChevronLeft className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`} />
    </Button>

    <h1 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
      {getLocalizedText('languages')}
    </h1>

    <div className="w-10"></div>
  </div>
</div>


        {/* Languages List */}
        <div className="px-4 py-2 space-y-1">
          {languages.map((language) => (
            // <Card 
            //   key={language.code}
            //   className="bg-white border-0 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
            //   onClick={() => handleLanguageSelect(language.code)}
            // >
            //   <CardContent className="p-4">
            //     <div className="flex items-center justify-between">
            //       <div className="flex items-center space-x-3">
            //         <span className="text-xl">{language.flag}</span>
            //         <div>
            //           <h3 className="font-medium text-gray-900 text-sm">{language.name}</h3>
            //           <p className="text-xs text-gray-500">{language.nativeName}</p>
            //         </div>
            //       </div>
            //       {selectedLanguage === language.code && (
            //         <Check className="w-4 h-4 text-purple-600" />
            //       )}
            //     </div>
            //   </CardContent>
            // </Card>

            <Card
  key={language.code}
  className={`relative overflow-hidden card-3d cursor-pointer transition-colors ${settings.darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-50'}`}
  onClick={() => handleLanguageSelect(language.code)}
>
  <div
    className={`absolute inset-0 ${
      settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'
    } `}
  ></div>

  <CardContent className="p-4 relative z-10">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
       <span className={`text-xl ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
  {language.flag}
</span>
        <div>
          <h3
            className={`font-medium text-sm ${
              settings.darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {language.name}
          </h3>
          <p
            className={`text-xs ${
              settings.darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {language.nativeName}
          </p>
        </div>
      </div>
      {selectedLanguage === language.code && (
        <Check
          className={`w-4 h-4 ${
            settings.darkMode ? 'text-purple-300' : 'text-purple-600'
          }`}
        />
      )}
    </div>
  </CardContent>
</Card>

          ))}
        </div>
      </div>
    );
  }

  if (currentView === 'notifications') {
    return (
     <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
        {/* Header */}

        {/* <div className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentView('main')}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Notification Settings</h1>
            <div className="w-10" />
          </div>
        </div> */}

        <div className={` overflow-hidden card-3d sticky top-0 z-10`}>
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border-b border-slate-700' : 'bg-white border-b border-gray-200'}`}></div>

  <div className="relative z-10 flex items-center justify-between p-4">
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setCurrentView('main')}
      className={`rounded-full ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}
    >
      <ChevronLeft className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`} />
    </Button>
    <h1 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
      Notification Settings
    </h1>
    <div className="w-10"></div>
  </div>
</div>


        <div className="px-4 py-4 space-y-4">

          {/* <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Droplets className="w-4 h-4 text-red-500" />
                Period Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Period Reminders</h4>
                  <p className="text-sm text-gray-500">Get notified when your period is expected</p>
                </div>
                <Switch
                  checked={settings.periodReminders}
                  onCheckedChange={(value) => handleSettingChange('periodReminders', value)}
                  className=" data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Late Period Alerts</h4>
                  <p className="text-sm text-gray-500">Alert when period is overdue</p>
                </div>
                <Switch
                  checked={settings.latePerodAlerts}
                  onCheckedChange={(value) => handleSettingChange('latePerodAlerts', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
            </CardContent>
          </Card> */}

          <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'} `}></div>

  <CardHeader className="relative z-10">
    <CardTitle className="text-base flex items-center gap-2">
      <Droplets className="w-4 h-4 text-red-500" />
      <span className={`${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>Period Tracking</span>
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-4 relative z-10">
    <div className="flex items-center justify-between">
      <div>
        <h4 className={`font-medium ${settings.darkMode ? 'text-white' : ''}`}>Period Reminders</h4>
        <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Get notified when your period is expected</p>
      </div>
      <Switch
        checked={settings.periodReminders}
        onCheckedChange={(value) => handleSettingChange('periodReminders', value)}
        className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
      />
    </div>

    <div className="flex items-center justify-between">
      <div>
        <h4 className={`font-medium ${settings.darkMode ? 'text-white' : ''}`}>Late Period Alerts</h4>
        <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Alert when period is overdue</p>
      </div>
      <Switch
        checked={settings.latePerodAlerts}
        onCheckedChange={(value) => handleSettingChange('latePerodAlerts', value)}
        className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
      />
    </div>
  </CardContent>
</Card>


          {/* <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
                Health & Wellness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Ovulation Alerts</h4>
                  <p className="text-sm text-gray-500">Fertility window notifications</p>
                </div>
                <Switch
                  checked={settings.ovulationAlerts}
                  onCheckedChange={(value) => handleSettingChange('ovulationAlerts', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Daily Check-ins</h4>
                  <p className="text-sm text-gray-500">Reminder to log symptoms daily</p>
                </div>
                <Switch
                  checked={settings.dailyCheckIns}
                  onCheckedChange={(value) => handleSettingChange('dailyCheckIns', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Symptoms Tracking</h4>
                  <p className="text-sm text-gray-500">Reminders for symptom logging</p>
                </div>
                <Switch
                  checked={settings.symptomsTracking}
                  onCheckedChange={(value) => handleSettingChange('symptomsTracking', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Fertility Insights</h4>
                  <p className="text-sm text-gray-500">Personalized fertility notifications</p>
                </div>
                <Switch
                  checked={settings.fertilityInsights}
                  onCheckedChange={(value) => handleSettingChange('fertilityInsights', value)}
                  className="data-[state=checked]text-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
            </CardContent>
          </Card> */}


          <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'}`}></div>

  <CardHeader className="relative z-10">
    <CardTitle className="text-base flex items-center gap-2">
      <Heart className="w-4 h-4 text-pink-500" />
      <span className={`${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>Health & Wellness</span>
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-4 relative z-10">
    {[
      { key: 'ovulationAlerts', title: 'Ovulation Alerts', desc: 'Fertility window notifications' },
      { key: 'dailyCheckIns', title: 'Daily Check-ins', desc: 'Reminder to log symptoms daily' },
      { key: 'symptomsTracking', title: 'Symptoms Tracking', desc: 'Reminders for symptom logging' },
      { key: 'fertilityInsights', title: 'Fertility Insights', desc: 'Personalized fertility notifications' },
    ].map((item) => (
      <div className="flex items-center justify-between" key={item.key}>
        <div>
          <h4 className={`font-medium ${settings.darkMode ? 'text-white' : ''}`}>{item.title}</h4>
          <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
        </div>
        <Switch
          checked={settings[item.key]}
          onCheckedChange={(value) => handleSettingChange(item.key, value)}
          className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
        />
      </div>
    ))}
  </CardContent>
</Card>


          {/* <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                Reminders & Appointments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Medication Reminders</h4>
                  <p className="text-sm text-gray-500">Birth control and supplement reminders</p>
                </div>
                <Switch
                  checked={settings.medicationReminders}
                  onCheckedChange={(value) => handleSettingChange('medicationReminders', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Appointment Reminders</h4>
                  <p className="text-sm text-gray-500">Doctor visits and health check-ups</p>
                </div>
                <Switch
                  checked={settings.appointmentReminders}
                  onCheckedChange={(value) => handleSettingChange('appointmentReminders', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
            </CardContent>
          </Card> */}

          <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'} `}></div>

  <CardHeader className="relative z-10">
    <CardTitle className="text-base flex items-center gap-2">
      <Calendar className="w-4 h-4 text-blue-500" />
      <span className={`${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>Reminders & Appointments</span>
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-4 relative z-10">
    <div className="flex items-center justify-between">
      <div>
        <h4 className={`font-medium ${settings.darkMode ? 'text-white' : ''}`}>Medication Reminders</h4>
        <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Birth control and supplement reminders</p>
      </div>
      <Switch
        checked={settings.medicationReminders}
        onCheckedChange={(value) => handleSettingChange('medicationReminders', value)}
        className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
      />
    </div>

    <div className="flex items-center justify-between">
      <div>
        <h4 className={`font-medium ${settings.darkMode ? 'text-white' : ''}`}>Appointment Reminders</h4>
        <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Doctor visits and health check-ups</p>
      </div>
      <Switch
        checked={settings.appointmentReminders}
        onCheckedChange={(value) => handleSettingChange('appointmentReminders', value)}
        className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
      />
    </div>
  </CardContent>
</Card>

        </div>
      </div>
    );
  }

  if (currentView === 'privacy') {
    return (
      <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>

        {/* Header */}

        {/* <div className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentView('main')}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Privacy & Security</h1>
            <div className="w-10" />
          </div>
        </div> */}

        <div className={`relative overflow-hidden card-3d`}>
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border-b border-slate-700' : 'bg-white border-b border-gray-200'}`}></div>

  <div className="relative z-10 flex items-center justify-between p-4">
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setCurrentView('main')}
      className={`rounded-full ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}
    >
      <ChevronLeft className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`} />
    </Button>

    <h1 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
      Privacy & Security
    </h1>

    <div className="w-10"></div>
  </div>
</div>


        <div className="px-4 py-4 space-y-4">

          {/* <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-600" />
                App Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Biometric Lock</h4>
                  <p className="text-sm text-gray-500">Use fingerprint or face ID to unlock app</p>
                </div>
                <Switch
                  checked={settings.biometricLock}
                  onCheckedChange={(value) => handleSettingChange('biometricLock', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Passcode Required</h4>
                  <p className="text-sm text-gray-500">Require passcode to open app</p>
                </div>
                <Switch
                  checked={settings.passcodeRequired}
                  onCheckedChange={(value) => handleSettingChange('passcodeRequired', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Hide from Recents</h4>
                  <p className="text-sm text-gray-500">Hide app preview in recent apps</p>
                </div>
                <Switch
                  checked={settings.hideFromRecents}
                  onCheckedChange={(value) => handleSettingChange('hideFromRecents', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Incognito Mode</h4>
                  <p className="text-sm text-gray-500">Enhanced privacy mode</p>
                </div>
                <Switch
                  checked={settings.incognitoMode}
                  onCheckedChange={(value) => handleSettingChange('incognitoMode', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Data Encryption</h4>
                  <p className="text-sm text-gray-500">Encrypt stored data locally</p>
                </div>
                <Switch
                  checked={settings.dataEncryption}
                  onCheckedChange={(value) => handleSettingChange('dataEncryption', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
            </CardContent>
          </Card> */}

          <Card className={`relative overflow-hidden card-3d`}>
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'} `}></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`text-base flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
      <Lock className={`w-4 h-4 ${settings.darkMode ? 'text-green-400' : 'text-green-600'}`} />
      App Security
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10 space-y-4">
    {[
      { key: 'biometricLock', title: 'Biometric Lock', desc: 'Use fingerprint or face ID to unlock app' },
      { key: 'passcodeRequired', title: 'Passcode Required', desc: 'Require passcode to open app' },
      { key: 'hideFromRecents', title: 'Hide from Recents', desc: 'Hide app preview in recent apps' },
      { key: 'incognitoMode', title: 'Incognito Mode', desc: 'Enhanced privacy mode' },
      { key: 'dataEncryption', title: 'Data Encryption', desc: 'Encrypt stored data locally' }
    ].map((item) => (
      <div className="flex items-center justify-between" key={item.key}>
        <div>
          <h4 className={`font-medium ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
          <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
        </div>
        <Switch
          checked={settings[item.key]}
          onCheckedChange={(value) => handleSettingChange(item.key, value)}
          className={`data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400`}
        />
      </div>
    ))}
  </CardContent>
</Card>

{/* 
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-blue-600" />
                Data & Sync
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto Backup</h4>
                  <p className="text-sm text-gray-500">Automatically backup your data</p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(value) => handleSettingChange('autoBackup', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Cloud Sync</h4>
                  <p className="text-sm text-gray-500">Sync data across devices</p>
                </div>
                <Switch
                  checked={settings.syncEnabled}
                  onCheckedChange={(value) => handleSettingChange('syncEnabled', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Offline Mode</h4>
                  <p className="text-sm text-gray-500">Work without internet connection</p>
                </div>
                <Switch
                  checked={settings.offlineMode}
                  onCheckedChange={(value) => handleSettingChange('offlineMode', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Location Tracking</h4>
                  <p className="text-sm text-gray-500">Allow location-based insights</p>
                </div>
                <Switch
                  checked={settings.locationTracking}
                  onCheckedChange={(value) => handleSettingChange('locationTracking', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
            </CardContent>
          </Card> */}

          <Card className={`relative overflow-hidden card-3d`}>
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'} `}></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`text-base flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
      <Smartphone className={`w-4 h-4 ${settings.darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
      Data & Sync
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10 space-y-4">
    {[
      { key: 'autoBackup', title: 'Auto Backup', desc: 'Automatically backup your data' },
      { key: 'syncEnabled', title: 'Cloud Sync', desc: 'Sync data across devices' },
      { key: 'offlineMode', title: 'Offline Mode', desc: 'Work without internet connection' },
      { key: 'locationTracking', title: 'Location Tracking', desc: 'Allow location-based insights' }
    ].map((item) => (
      <div className="flex items-center justify-between" key={item.key}>
        <div>
          <h4 className={`font-medium ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
          <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
        </div>
        <Switch
          checked={settings[item.key]}
          onCheckedChange={(value) => handleSettingChange(item.key, value)}
          className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
        />
      </div>
    ))}
  </CardContent>
</Card>

        </div>
      </div>
    );
  }

  if (currentView === 'display') {
    return (
      <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>

        {/* <div className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between p-4 ">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentView('main')}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900  dark:text-white">Display & Theme</h1>
            <div className="w-10" />
          </div>
        </div> */}

        <div className={`relative overflow-hidden card-3d`}>
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border-b border-slate-700' : 'bg-white border-b border-gray-200'}`}></div>

  <div className="relative z-10 flex items-center justify-between p-4">
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setCurrentView('main')}
      className={`rounded-full ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}
    >
      <ChevronLeft className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`} />
    </Button>
    <h1 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
      Display & Theme
    </h1>
    <div className="w-10" />
  </div>
</div>


        <div className="px-4 py-4 space-y-4 ">

          {/* <Card>
            <CardHeader className='dark:bg-slate-900 dark:text-white'>
              <CardTitle className="text-base flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-600" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Dark Mode</h4>
                  <p className="text-sm text-gray-500">Use dark theme for better night viewing</p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(value) => handleSettingChange('darkMode', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Compact View</h4>
                  <p className="text-sm text-gray-500">Show more information on screen</p>
                </div>
                <Switch
                  checked={settings.compactView}
                  onCheckedChange={(value) => handleSettingChange('compactView', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Show Emojis</h4>
                  <p className="text-sm text-gray-500">Display emoji icons throughout app</p>
                </div>
                <Switch
                  checked={settings.showEmojis}
                  onCheckedChange={(value) => handleSettingChange('showEmojis', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Colorful Theme</h4>
                  <p className="text-sm text-gray-500">Use vibrant colors and gradients</p>
                </div>
                <Switch
                  checked={settings.colorfulTheme}
                  onCheckedChange={(value) => handleSettingChange('colorfulTheme', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">High Contrast</h4>
                  <p className="text-sm text-gray-500">Enhanced contrast for accessibility</p>
                </div>
                <Switch
                  checked={settings.highContrast}
                  onCheckedChange={(value) => handleSettingChange('highContrast', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
            </CardContent>
          </Card> */}

          <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'} `}></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
      <Moon className="w-4 h-4 text-indigo-600" />
      Appearance
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10 space-y-4">
    {[
      { label: "Dark Mode", desc: "Use dark theme for better night viewing", key: "darkMode" },
      { label: "Compact View", desc: "Show more information on screen", key: "compactView" },
      { label: "Show Emojis", desc: "Display emoji icons throughout app", key: "showEmojis" },
      { label: "Colorful Theme", desc: "Use vibrant colors and gradients", key: "colorfulTheme" },
      { label: "High Contrast", desc: "Enhanced contrast for accessibility", key: "highContrast" },
    ].map((item) => (
      <div key={item.key} className="flex items-center justify-between">
        <div>
          <h4 className={`font-medium ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{item.label}</h4>
          <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
        </div>
        <Switch
          checked={settings[item.key]}
          onCheckedChange={(value) => handleSettingChange(item.key, value)}
          className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
        />
      </div>
    ))}
  </CardContent>
</Card>


          {/* <Card>
            <CardHeader className=' dark:bg-slate-900 dark:text-white'>
              <CardTitle className="text-base flex items-center gap-2  dark:bg-slate-900 dark:text-white">
                <Globe className="w-4 h-4 text-lavender-800" />
                Advanced Display
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4  dark:bg-slate-900 dark:text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Analytics</h4>
                  <p className="text-sm text-gray-500">Help improve app with usage data</p>
                </div>
                <Switch
                  checked={settings.analytics}
                  onCheckedChange={(value) => handleSettingChange('analytics', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Beta Features</h4>
                  <p className="text-sm text-gray-500">Access experimental features</p>
                </div>
                <Switch
                  checked={settings.betaFeatures}
                  onCheckedChange={(value) => handleSettingChange('betaFeatures', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
            </CardContent>
          </Card> */}

          <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'} `}></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
      <Globe className="w-4 h-4 text-lavender-800" />
      Advanced Display
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10 space-y-4">
    {[
      { label: "Analytics", desc: "Help improve app with usage data", key: "analytics" },
      { label: "Beta Features", desc: "Access experimental features", key: "betaFeatures" },
    ].map((item) => (
      <div key={item.key} className="flex items-center justify-between">
        <div>
          <h4 className={`font-medium ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{item.label}</h4>
          <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
        </div>
        <Switch
          checked={settings[item.key]}
          onCheckedChange={(value) => handleSettingChange(item.key, value)}
          className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
        />
      </div>
    ))}
  </CardContent>
</Card>

        </div>
      </div>
    );
  }

  return (
   <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
      {/* Header */}
      {/* <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">{getLocalizedText('app.settings')}</h1>
          <div className="w-10" />
        </div>
      </div> */}

      <div className={` overflow-hidden card-3d sticky top-0 z-10`}>
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border-b border-slate-700' : 'bg-white border-b border-gray-200'}`}></div>

  <div className="relative z-10 flex items-center justify-between p-4">
    <Button
      variant="ghost"
      size="icon"
      onClick={onBack}
      className={`rounded-full ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}
    >
      <ChevronLeft className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`} />
    </Button>
    <h1 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
      {getLocalizedText('app.settings')}
    </h1>
    <div className="w-10"></div>
  </div>
</div>


      {/* Settings Options */}

      <div className="px-4 py-4 space-y-1">


        {/* <Card 
          className="bg-white border-0 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setCurrentView('languages')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex items-center space-x-2">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{getLocalizedText('language')}</h3>
                    <p className="text-xs text-gray-500 flex items-center space-x-1">
                      <span>{languages.find(lang => lang.code === selectedLanguage)?.flag}</span>
                      <span>{languages.find(lang => lang.code === selectedLanguage)?.name || 'English'}</span>
                    </p>
                  </div>
                </div>
              </div>
              <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
            </div>
          </CardContent>
        </Card> */}

        <Card 
  className="relative overflow-hidden card-3d cursor-pointer transition-colors"
  onClick={() => setCurrentView('languages')}
>
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border-0 shadow-sm hover:bg-gray-50'}`}></div>

  <CardContent className="relative z-10 p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${settings.darkMode ? 'bg-slate-700' : 'bg-purple-100'}`}>
          <Globe className={`w-4 h-4 ${settings.darkMode ? 'text-white' : 'text-purple-600'}`} />
        </div>
        <div className="flex items-center space-x-2">
          <div>
            <h3 className={`font-medium text-sm ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{getLocalizedText('language')}</h3>
            <p className={`text-xs flex items-center space-x-1 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <span>{languages.find(lang => lang.code === selectedLanguage)?.flag}</span>
              <span>{languages.find(lang => lang.code === selectedLanguage)?.name || 'English'}</span>
            </p>
          </div>
        </div>
      </div>
      <ChevronLeft className={`w-4 h-4 rotate-180 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
    </div>
  </CardContent>
</Card>




        {/* <Card 
          className="bg-white border-0 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setCurrentView('notifications')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">Notifications</h3>
                  <p className="text-xs text-gray-500">Period reminders, alerts & check-ins</p>
                </div>
              </div>
              <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
            </div>
          </CardContent>
        </Card> */}

        <Card 
  className="relative overflow-hidden card-3d cursor-pointer transition-colors"
  onClick={() => setCurrentView('notifications')}
>
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border-0 shadow-sm hover:bg-gray-50'} `}></div>

  <CardContent className="relative z-10 p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${settings.darkMode ? 'bg-slate-700' : 'bg-blue-100'}`}>
          <Bell className={`w-4 h-4 ${settings.darkMode ? 'text-white' : 'text-blue-600'}`} />
        </div>
        <div>
          <h3 className={`font-medium text-sm ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
          <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Period reminders, alerts & check-ins</p>
        </div>
      </div>
      <ChevronLeft className={`w-4 h-4 rotate-180 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
    </div>
  </CardContent>
</Card>


        {/* <Card 
          className="bg-white border-0 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setCurrentView('privacy')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">Privacy & Security</h3>
                  <p className="text-xs text-gray-500">Biometric lock, data backup & sync</p>
                </div>
              </div>
              <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
            </div>
          </CardContent>
        </Card> */}


        <Card 
  className="relative overflow-hidden card-3d cursor-pointer transition-colors"
  onClick={() => setCurrentView('privacy')}
>
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border-0 shadow-sm hover:bg-gray-50'} `}></div>

  <CardContent className="relative z-10 p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${settings.darkMode ? 'bg-slate-700' : 'bg-green-100'}`}>
          <Lock className={`w-4 h-4 ${settings.darkMode ? 'text-white' : 'text-green-600'}`} />
        </div>
        <div>
          <h3 className={`font-medium text-sm ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>Privacy & Security</h3>
          <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Biometric lock, data backup & sync</p>
        </div>
      </div>
      <ChevronLeft className={`w-4 h-4 rotate-180 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
    </div>
  </CardContent>
</Card>


        {/* <Card 
          className="bg-white border-0 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setCurrentView('display')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Moon className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">Display & Theme</h3>
                  <p className="text-xs text-gray-500">Dark mode, colors & layout options</p>
                </div>
              </div>
              <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
            </div>
          </CardContent>
        </Card> */}

        <Card 
  className="relative overflow-hidden card-3d cursor-pointer transition-colors"
  onClick={() => setCurrentView('display')}
>
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border-0 shadow-sm hover:bg-gray-50'} `}></div>

  <CardContent className="relative z-10 p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${settings.darkMode ? 'bg-slate-700' : 'bg-indigo-100'}`}>
          <Moon className={`w-4 h-4 ${settings.darkMode ? 'text-white' : 'text-indigo-600'}`} />
        </div>
        <div>
          <h3 className={`font-medium text-sm ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>Display & Theme</h3>
          <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Dark mode, colors & layout options</p>
        </div>
      </div>
      <ChevronLeft className={`w-4 h-4 rotate-180 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
    </div>
  </CardContent>
</Card>

      </div>
    </div>
  );
};

export default AppSettings;
