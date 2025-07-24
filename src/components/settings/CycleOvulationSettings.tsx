
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CycleOvulationSettingsProps {
  onBack: () => void;
}

const CycleOvulationSettings = ({ onBack }: CycleOvulationSettingsProps) => {
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
          <h1 className="text-lg font-semibold text-gray-900">Cycle and ovulation</h1>
          <div className="w-10" /> 
        </div>
      </div> */}

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
            Cycle and ovulation
          </h1>

          <div className="w-10"></div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="p-4 space-y-4">
        {/* Cycle Length */}

        {/* <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 text-base">Cycle length</h3>
              </div>
              <Select value={cycleLength} onValueChange={handleCycleLengthChange}>
                <SelectTrigger className="w-20 border-0 bg-transparent text-lavender-800 font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cycleLengthOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card> */}

        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'}`}></div>

          <CardContent className="relative z-10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-medium text-base ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>Cycle length</h3>
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
        {/* <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 text-base">Period length</h3>
              </div>
              <Select value={periodLength} onValueChange={handlePeriodLengthChange}>
                <SelectTrigger className="w-20 border-0 bg-transparent text-lavender-800 font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {periodLengthOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card> */}

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
                  Period length
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
        {/* <div className="px-4 py-2">
          <p className="text-sm text-gray-600 leading-relaxed">
            The app makes predictions based on the cycle and period length settings. However, if you regularly log your period in the app, predictions will be based on the logged data.
          </p>
        </div> */}

        <div className="relative overflow-hidden card-3d px-4 py-2">
          <div
            className={`absolute inset-0 ${settings.darkMode
                ? 'bg-slate-900 border border-slate-700'
                : 'bg-white border border-gray-200'
              } `}
          ></div>

          <div className="relative z-10">
            <p
              className={`text-sm leading-relaxed ${settings.darkMode ? 'text-gray-300' : 'text-gray-600' }`}
            >
              The app makes predictions based on the cycle and period length settings. However, if you
              regularly log your period in the app, predictions will be based on the logged data.
            </p>
          </div>
        </div>


        {/* Chances of Getting Pregnant */}
        {/* <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 text-base mb-1">Chances of getting pregnant</h3>
                <p className="text-sm text-gray-600">
                  If you turn off this parameter, only the ovulation day will be displayed.
                </p>
              </div>
              <Switch
                checked={pregnancyChances}
                onCheckedChange={setPregnancyChances}
                className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
              />
            </div>
          </CardContent>
        </Card> */}

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
                  Chances of getting pregnant
                </h3>
                <p
                  className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                >
                  If you turn off this parameter, only the ovulation day will be displayed.
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

        {/* <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900 text-base">Luteal phase</h3>
              </div>
              <Select value={lutealPhase} onValueChange={handleLutealChange}>
                <SelectTrigger className="w-20 border-0 bg-transparent text-lavender-800 font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lutealPhaseOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              The luteal phase is the time between ovulation and the beginning of your period. If you know the length of your luteal phase, log it for more accurate ovulation predictions.
            </p>
          </CardContent>
        </Card> */}

                <Card className="relative overflow-hidden card-3d border-0 shadow-sm">
  <div
    className={`absolute inset-0 ${
      settings.darkMode
        ? 'bg-slate-900 border border-slate-700'
        : 'bg-white border border-gray-200'
    } `}
  ></div>

  <CardContent className="p-4 relative z-10">
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3
          className={`font-medium text-base ${
            settings.darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Luteal phase
        </h3>
      </div>
      <Select value={lutealPhase} onValueChange={handleLutealChange}>
        <SelectTrigger
          className={`w-20 border-0 bg-transparent font-medium ${
            settings.darkMode ? 'text-white' : 'text-lavender-800'
          }`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent  className={settings.darkMode ? 'bg-slate-900 text-white' : ''}>
          {lutealPhaseOptions.map((option) => (
            <SelectItem key={option} value={option} className={settings.darkMode ? 'bg-slate-900 text-white' : ''} >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <p
      className={`text-sm leading-relaxed ${
        settings.darkMode ? 'text-gray-300' : 'text-gray-600'
      }`}
    >
      The luteal phase is the time between ovulation and the beginning of your period. If you know the length of your luteal phase, log it for more accurate ovulation predictions.
    </p>
  </CardContent>
</Card>

        {/* Display Cycle Sequence */}
{/* 
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900 text-base">Display cycle sequence</h3>
              </div>
              <Switch
                checked={displayCycleSequence}
                onCheckedChange={setDisplayCycleSequence}
                className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
              />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              The cycle sequence (day 1, 2, 3, etc.) will be displayed right above the calendar dates.
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
                <div className="w-10 h-10 border-2 border-red-300 border-dashed rounded-full flex items-center justify-center text-red-400 font-semibold text-sm">
                  6
                </div>
              </div>
              <div className="text-gray-400 font-bold text-lg">7</div>
              <div className="flex items-center space-x-1">
                <div className="w-10 h-10 border-2 border-teal-400 border-dashed rounded-full flex items-center justify-center text-teal-500 font-semibold text-sm">
                  8
                </div>
                <div className="text-teal-500 font-bold text-lg">9</div>
              </div>
            </div>
          </CardContent>
        </Card> */}

        <Card className="relative overflow-hidden card-3d border-0 shadow-sm">
  <div
    className={`absolute inset-0 ${
      settings.darkMode
        ? 'bg-slate-900 border border-slate-700'
        : 'bg-white border border-gray-200'
    } `}
  ></div>

  <CardContent className="p-4 relative z-10">
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3
          className={`font-medium text-base ${
            settings.darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Display cycle sequence
        </h3>
      </div>
      <Switch
        checked={displayCycleSequence}
        onCheckedChange={setDisplayCycleSequence}
        className="data-[state=checked]:bg-lavender-600 data-[state=unchecked]:bg-slate-400"
      />
    </div>
    <p
      className={`text-sm leading-relaxed mb-4 ${
        settings.darkMode ? 'text-gray-300' : 'text-gray-600'
      }`}
    >
      The cycle sequence (day 1, 2, 3, etc.) will be displayed right above the calendar dates.
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
          className={`w-10 h-10 border-2 border-dashed rounded-full flex items-center justify-center font-semibold text-sm ${
            settings.darkMode
              ? 'border-red-400 text-red-400'
              : 'border-red-300 text-red-400'
          }`}
        >
          6
        </div>
      </div>
      <div
        className={`font-bold text-lg ${
          settings.darkMode ? 'text-gray-300' : 'text-gray-400'
        }`}
      >
        7
      </div>
      <div className="flex items-center space-x-1">
        <div
          className={`w-10 h-10 border-2 border-dashed rounded-full flex items-center justify-center font-semibold text-sm ${
            settings.darkMode
              ? 'border-teal-400 text-teal-400'
              : 'border-teal-400 text-teal-500'
          }`}
        >
          8
        </div>
        <div
          className={`font-bold text-lg ${
            settings.darkMode ? 'text-teal-400' : 'text-teal-500'
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
