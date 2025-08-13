import  { useState, useEffect } from 'react';
import { ChevronLeft, Globe, Check, Bell, Moon, Smartphone, Lock, Calendar, Heart, Droplets, Droplet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { PredictionCalendar } from "../PredictionCalendar";

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
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪' },
  { code: 'zu', name: 'Zulu', nativeName: 'IsiZulu', flag: '🇿🇦' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'yu', name: 'Yoruba', nativeName: 'Yorùbá', flag: '🇳🇬' }


];

const AppSettings = ({ onBack }: AppSettingsProps) => {
  const [currentView, setCurrentView] = useState<'main' | 'languages' | 'notifications' | 'privacy' | 'display' | 'periods'>('main');
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
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
    else {
      document.documentElement.classList.remove('dark');
    }


  }, []);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setLanguage(languageCode);
    localStorage.setItem('nurcycle-language', languageCode);

    toast({
      title: getLocalizedText('language.updated'),
      description: `${getLocalizedText('language.changed.to')} ${languages.find(lang => lang.code === languageCode)?.name || 'English'}`,
    });

  };

  const handleSettingChange = (key: string, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);

    localStorage.setItem('nurcycle-app-settings', JSON.stringify(newSettings));

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

    const importantSettings = ['biometricLock', 'darkMode', 'autoBackup', 'syncEnabled'];
    if (importantSettings.includes(key)) {
      toast({
        title: getLocalizedText('setting.updated'),
        description: `${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} ${value ? 'enabled' : 'disabled'}`,
      });
    }
  };

  if (currentView === 'languages') {
    return (
      <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
        {/* Header */}
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


            <Card
              key={language.code}
              className={`relative overflow-hidden card-3d cursor-pointer transition-colors ${settings.darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-50'}`}
              onClick={() => handleLanguageSelect(language.code)}
            >
              <div
                className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'
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
                        className={`font-medium text-sm ${settings.darkMode ? 'text-white' : 'text-gray-900'
                          }`}
                      >
                        {language.name}
                      </h3>
                      <p
                        className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                      >
                        {language.nativeName}
                      </p>
                    </div>
                  </div>
                  {selectedLanguage === language.code && (
                    <Check
                      className={`w-4 h-4 ${settings.darkMode ? 'text-purple-300' : 'text-purple-600'
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
              {getLocalizedText('notification.settings')}
            </h1>
            <div className="w-10"></div>
          </div>
        </div>


        <div className="px-4 py-4 space-y-4">

          <Card className="relative overflow-hidden card-3d">
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'} `}></div>

            <CardHeader className="relative z-10">
              <CardTitle className="text-base flex items-center gap-2">
                <Droplets className="w-4 h-4 text-red-500" />
                <span className={`${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{getLocalizedText('period.tracking')}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${settings.darkMode ? 'text-white' : ''}`}>{getLocalizedText('period.reminders')}</h4>
                  <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{getLocalizedText('get.notified.when.period.expected')}</p>
                </div>
                <Switch
                  checked={settings.periodReminders}
                  onCheckedChange={(value) => handleSettingChange('periodReminders', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${settings.darkMode ? 'text-white' : ''}`}>{getLocalizedText('late.period.alerts')}</h4>
                  <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{getLocalizedText('alert.when.period.overdue')}</p>
                </div>
                <Switch
                  checked={settings.latePerodAlerts}
                  onCheckedChange={(value) => handleSettingChange('latePerodAlerts', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
            </CardContent>
          </Card>


          <Card className="relative overflow-hidden card-3d">
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'}`}></div>

            <CardHeader className="relative z-10">
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
                <span className={`${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{getLocalizedText('health.and.wellness')}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 relative z-10">
              {[
                {
                  key: 'ovulationAlerts',
                  title: getLocalizedText('ovulation.alerts'),
                  desc: getLocalizedText('fertility.window.notifications')
                },
                {
                  key: 'dailyCheckIns',
                  title: getLocalizedText('daily.check.ins'),
                  desc: getLocalizedText('reminder.to.log.symptoms.daily')
                },
                {
                  key: 'symptomsTracking',
                  title: getLocalizedText('symptoms.tracking'),
                  desc: getLocalizedText('reminders.for.symptom.logging')
                },
                {
                  key: 'fertilityInsights',
                  title: getLocalizedText('fertility.insights'),
                  desc: getLocalizedText('personalized.fertility.notifications')
                }
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

          <Card className="relative overflow-hidden card-3d">
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'} `}></div>

            <CardHeader className="relative z-10">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className={`${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{getLocalizedText('eminders.and.appointments')}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${settings.darkMode ? 'text-white' : ''}`}>{getLocalizedText('medication.reminders')}</h4>
                  <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{getLocalizedText('birth.control.and.supplement.reminders')}</p>
                </div>
                <Switch
                  checked={settings.medicationReminders}
                  onCheckedChange={(value) => handleSettingChange('medicationReminders', value)}
                  className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${settings.darkMode ? 'text-white' : ''}`}>{getLocalizedText('appointment.reminders')}</h4>
                  <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{getLocalizedText('doctor.visits.and.health.checkups')}</p>
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
              {getLocalizedText('privacy.and.security')}
            </h1>

            <div className="w-10"></div>
          </div>
        </div>


        <div className="px-4 py-4 space-y-4">


          <Card className={`relative overflow-hidden card-3d`}>
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'} `}></div>

            <CardHeader className="relative z-10">
              <CardTitle className={`text-base flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Lock className={`w-4 h-4 ${settings.darkMode ? 'text-green-400' : 'text-green-600'}`} />
                {getLocalizedText('app.security')}
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
              {[
                {
                  key: 'biometricLock',
                  title: getLocalizedText('biometric.lock'),
                  desc: getLocalizedText('biometric.lock.description')
                },
                {
                  key: 'passcodeRequired',
                  title: getLocalizedText('passcode.required'),
                  desc: getLocalizedText('passcode.required.description')
                },
                {
                  key: 'hideFromRecents',
                  title: getLocalizedText('hide.from.recents'),
                  desc: getLocalizedText('hide.from.recents.description')
                },
                {
                  key: 'incognitoMode',
                  title: getLocalizedText('incognito.mode'),
                  desc: getLocalizedText('incognito.mode.description')
                },
                {
                  key: 'dataEncryption',
                  title: getLocalizedText('data.encryption'),
                  desc: getLocalizedText('data.encryption.description')
                }
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

          <Card className={`relative overflow-hidden card-3d`}>
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'} `}></div>

            <CardHeader className="relative z-10">
              <CardTitle className={`text-base flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Smartphone className={`w-4 h-4 ${settings.darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                {getLocalizedText('data.and.sync')}
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
              {[
                {
                  key: 'autoBackup',
                  title: getLocalizedText('auto.backup'),
                  desc: getLocalizedText('auto.backup.description')
                },
                {
                  key: 'syncEnabled',
                  title: getLocalizedText('cloud.sync'),
                  desc: getLocalizedText('cloud.sync.description')
                },
                {
                  key: 'offlineMode',
                  title: getLocalizedText('offline.mode'),
                  desc: getLocalizedText('offline.mode.description')
                },
                {
                  key: 'locationTracking',
                  title: getLocalizedText('location.tracking'),
                  desc: getLocalizedText('location.tracking.description')
                }
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
              {getLocalizedText('display.and.theme')}
            </h1>
            <div className="w-10" />
          </div>
        </div>


        <div className="px-4 py-4 space-y-4 ">

          <Card className="relative overflow-hidden card-3d">
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'} `}></div>

            <CardHeader className="relative z-10">
              <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Moon className="w-4 h-4 text-indigo-600" />
                {getLocalizedText('appearance')}
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
              {[
                {
                  label: getLocalizedText('dark.mode'),
                  desc: getLocalizedText('dark.mode.description'),
                  key: 'darkMode'
                },
                {
                  label: getLocalizedText('compact.view'),
                  desc: getLocalizedText('compact.view.description'),
                  key: 'compactView'
                },
                {
                  label: getLocalizedText('show.emojis'),
                  desc: getLocalizedText('show.emojis.description'),
                  key: 'showEmojis'
                },
                {
                  label: getLocalizedText('colorful.theme'),
                  desc: getLocalizedText('colorful.theme.description'),
                  key: 'colorfulTheme'
                },
                {
                  label: getLocalizedText('high.contrast'),
                  desc: getLocalizedText('high.contrast.description'),
                  key: 'highContrast'
                }
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


          <Card className="relative overflow-hidden card-3d">
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'} `}></div>

            <CardHeader className="relative z-10">
              <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Globe className="w-4 h-4 text-lavender-800" />
                {getLocalizedText('advanced.display')}
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
              {[
                {
                  label: getLocalizedText('analytics'),
                  desc: getLocalizedText('analytics.description'),
                  key: 'analytics'
                },
                {
                  label: getLocalizedText('beta.features'),
                  desc: getLocalizedText('beta.features.description'),
                  key: 'betaFeatures'
                }
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


  if ( currentView === 'periods'){
    return(
      <>
           <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>


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
              {getLocalizedText('Periods Timeline')}
            </h1>
            <div className="w-10" />
          </div>
        </div>


        <div className="px-4 py-4 space-y-4 ">

          <Card className="relative overflow-hidden card-3d">
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'} `}></div>

            <CardHeader className="relative z-10">
              <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Droplet className="w-6 h-6 text-red-600" />
                {getLocalizedText('Periods')}
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4 w-100">
              {[
                {
                  label: getLocalizedText('Period Cycle '),
                  desc: getLocalizedText('Modify period calendar according to your cycle'),
                  key: 'darkMode'
                },
              ].map((item) => (
                <>
                <div key={item.key} className="flex  flex-column">
                  <div>
                    <h4 className={`font-medium ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{item.label}</h4>
                    <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                  </div>

                  
                </div>
                <div className="mr-72 z-10">
                  <PredictionCalendar/>
                  </div>
                </>
                
              ))}
            </CardContent>
          </Card>




        </div>
      </div>
      </>
    )

  }

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>

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
                  <h3 className={`font-medium text-sm ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{getLocalizedText('notifications')}</h3>
                  <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{getLocalizedText('period.reminders.alerts.checkins')}</p>
                </div>
              </div>
              <ChevronLeft className={`w-4 h-4 rotate-180 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            </div>
          </CardContent>
        </Card>


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
                  <h3 className={`font-medium text-sm ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{getLocalizedText('privacy.security')}</h3>
                  <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{getLocalizedText('biometric.lock.data.backup.sync')}</p>
                </div>
              </div>
              <ChevronLeft className={`w-4 h-4 rotate-180 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            </div>
          </CardContent>
        </Card>


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
                  <h3 className={`font-medium text-sm ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{getLocalizedText('display.theme')}</h3>
                  <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{getLocalizedText('dark.mode.colors.layout.options')}</p>
                </div>
              </div>
              <ChevronLeft className={`w-4 h-4 rotate-180 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            </div>
          </CardContent>
        </Card>

        <Card
          className="relative overflow-hidden card-3d cursor-pointer transition-colors"
          onClick={() => setCurrentView('periods')}
        >
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border-0 shadow-sm hover:bg-gray-50'} `}></div>

          <CardContent className="relative z-10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${settings.darkMode ? 'bg-slate-700' : 'bg-pink-100'}`}>
                  <Droplet className={`w-4 h-4 ${settings.darkMode ? 'text-white' : 'text-red-600'}`} />
                </div>
                <div>
                  <h3 className={`font-medium text-sm ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{getLocalizedText('Period Calendar Cycle')}</h3>
                  <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{getLocalizedText('Adjust period dates accordingly')}</p>
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
