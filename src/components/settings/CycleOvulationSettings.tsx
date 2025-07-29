
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext';


interface CycleOvulationSettingsProps {
  onBack: () => void;
}

const CycleOvulationSettings = ({ onBack }: CycleOvulationSettingsProps) => {

  const { getLocalizedText } = useLanguage();

  // const [cycleLength, setCycleLength] = useState<string>('28');
  const [cycleLength, setCycleLength] = useState<string>(() => {
    return localStorage.getItem('cycleLength') || '28';
  });
  const [periodLength, setPeriodLength] = useState<string>(() => {
    return localStorage.getItem('periodLength') || '5';
  });
  const [lutealPhase, setLutealPhase] = useState<string>(() => {
    return localStorage.getItem('lutealPhase') || '14';
  });
  const [pregnancyChances, setPregnancyChances] = useState(true);
  const [displayCycleSequence, setDisplayCycleSequence] = useState(true);

  const cycleLengthOptions = Array.from({ length: 20 }, (_, i) => (i + 21).toString());
  const periodLengthOptions = Array.from({ length: 8 }, (_, i) => (i + 3).toString());
  const lutealPhaseOptions = Array.from({ length: 10 }, (_, i) => (i + 10).toString());

  const handleCycleLengthChange = (value: string) => {
    setCycleLength(value);
    localStorage.setItem('cycleLength', value);
  };

  const handlePeriodLengthChange = (value: string) => {
    setPeriodLength(value);
    localStorage.setItem('periodLength', value);
  };

  const handleLutealChange = (value: string) => {
    setLutealPhase(value);
    localStorage.setItem('lutealPhase', value);
  };


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

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="overflow-hidden card-3d sticky top-0 z-10">
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border-b border-slate-700' : 'bg-white border-b border-gray-200'}`}></div>

        <div className="relative z-10 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className={`rounded-full button-3d ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}
          >
            <ChevronLeft className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`} />
          </Button>

          <h1 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {getLocalizedText('cycle.and.ovulation')}
          </h1>

          <div className="w-10"></div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="p-4 space-y-4">
        {/* Cycle Length */}
        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'}`}></div>

          <CardContent className="relative z-10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-medium text-base ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{getLocalizedText('cycle.length')}</h3>
              </div>
              <Select value={cycleLength} onValueChange={handleCycleLengthChange}>
                <SelectTrigger className={`w-20 border-0 bg-transparent font-medium ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={settings.darkMode ? 'bg-slate-900 text-white' : ''}>
                  {cycleLengthOptions.map((option) => (
                    <SelectItem key={option} value={option} className={settings.darkMode ? 'bg-slate-900 text-white' : ''}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>


        {/* Period Length */}
        <Card className="relative overflow-hidden card-3d">
          <div
            className={`absolute inset-0 ${settings.darkMode
              ? 'bg-slate-900 border border-slate-700'
              : 'bg-white border border-gray-200'
              } `}
          ></div>

          <CardContent className="relative z-10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className={`font-medium text-base ${settings.darkMode ? 'text-white' : 'text-gray-900'
                    }`}
                >
                  {getLocalizedText('period.length')}
                </h3>
              </div>
              <Select value={periodLength} onValueChange={handlePeriodLengthChange}>
                <SelectTrigger
                  className={`w-20 border-0 bg-transparent font-medium ${settings.darkMode ? 'text-white' : 'text-lavender-800'
                    }`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={settings.darkMode ? 'bg-slate-900 text-white' : ''}>
                  {periodLengthOptions.map((option) => (
                    <SelectItem key={option} value={option} className={settings.darkMode ? 'bg-slate-900 text-white' : ''}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>


        {/* Explanation Text */}

        <div className="relative overflow-hidden card-3d px-4 py-2">
          <div
            className={`absolute inset-0 ${settings.darkMode
              ? 'bg-slate-900 border border-slate-700'
              : 'bg-white border border-gray-200'
              } `}
          ></div>

          <div className="relative z-10">
            <p
              className={`text-sm leading-relaxed ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {getLocalizedText('app.predictions')}
            </p>
          </div>
        </div>


        {/* Chances of Getting Pregnant */}
        <Card className="relative overflow-hidden card-3d border-0 shadow-sm">
          <div
            className={`absolute inset-0 ${settings.darkMode
              ? 'bg-slate-900 border border-slate-700'
              : 'bg-white border border-gray-200'
              } `}
          ></div>

          <CardContent className="p-4 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className={`font-medium text-base mb-1 ${settings.darkMode ? 'text-white' : 'text-gray-900'
                    }`}
                >
                  {getLocalizedText('chances.of.pregnancy')}
                </h3>
                <p
                  className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                >
                  {getLocalizedText('turn.off.parameter')}
                </p>
              </div>
              <Switch
                checked={pregnancyChances}
                onCheckedChange={setPregnancyChances}
                className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
              />
            </div>
          </CardContent>
        </Card>


        {/* Luteal Phase */}


        <Card className="relative overflow-hidden card-3d border-0 shadow-sm">
          <div
            className={`absolute inset-0 ${settings.darkMode
                ? 'bg-slate-900 border border-slate-700'
                : 'bg-white border border-gray-200'
              } `}
          ></div>

          <CardContent className="p-4 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3
                  className={`font-medium text-base ${settings.darkMode ? 'text-white' : 'text-gray-900'
                    }`}
                >
                 {getLocalizedText('luteal.phase')}
                </h3>
              </div>
              <Select value={lutealPhase} onValueChange={handleLutealChange}>
                <SelectTrigger
                  className={`w-20 border-0 bg-transparent font-medium ${settings.darkMode ? 'text-white' : 'text-lavender-800'
                    }`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={settings.darkMode ? 'bg-slate-900 text-white' : ''}>
                  {lutealPhaseOptions.map((option) => (
                    <SelectItem key={option} value={option} className={settings.darkMode ? 'bg-slate-900 text-white' : ''} >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p
              className={`text-sm leading-relaxed ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
            >
             {getLocalizedText('luteal.phase.description')}
            </p>
          </CardContent>
        </Card>

        {/* Display Cycle Sequence */}

        <Card className="relative overflow-hidden card-3d border-0 shadow-sm">
          <div
            className={`absolute inset-0 ${settings.darkMode
                ? 'bg-slate-900 border border-slate-700'
                : 'bg-white border border-gray-200'
              } `}
          ></div>

          <CardContent className="p-4 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3
                  className={`font-medium text-base ${settings.darkMode ? 'text-white' : 'text-gray-900'
                    }`}
                >
                  {getLocalizedText('display.cycle.sequence')}
                </h3>
              </div>
              <Switch
                checked={displayCycleSequence}
                onCheckedChange={setDisplayCycleSequence}
                className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
              />
            </div>
            <p
              className={`text-sm leading-relaxed mb-4 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
            >
              {getLocalizedText('cycle.sequence.description')}
            </p>

            <div className="flex items-center justify-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-10 h-10 bg-red-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  3
                </div>
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  4
                </div>
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  5
                </div>
                <div
                  className={`w-10 h-10 border-2 border-dashed rounded-full flex items-center justify-center font-semibold text-sm ${settings.darkMode
                      ? 'border-red-400 text-red-400'
                      : 'border-red-300 text-red-400'
                    }`}
                >
                  6
                </div>
              </div>
              <div
                className={`font-bold text-lg ${settings.darkMode ? 'text-gray-300' : 'text-gray-400'
                  }`}
              >
                7
              </div>
              <div className="flex items-center space-x-1">
                <div
                  className={`w-10 h-10 border-2 border-dashed rounded-full flex items-center justify-center font-semibold text-sm ${settings.darkMode
                      ? 'border-teal-400 text-teal-400'
                      : 'border-teal-400 text-teal-500'
                    }`}
                >
                  8
                </div>
                <div
                  className={`font-bold text-lg ${settings.darkMode ? 'text-teal-400' : 'text-teal-500'
                    }`}
                >
                  9
                </div>
              </div>
            </div>
          </CardContent>
        </Card>



      </div>

      {/* Bottom spacing */}
      <div className="h-20" />
    </div>
  );
};

export default CycleOvulationSettings;
