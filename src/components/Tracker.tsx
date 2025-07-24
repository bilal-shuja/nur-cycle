
import React, { useState , useEffect } from 'react';
import { Calendar, Baby, TrendingUp, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PeriodTracker from './PeriodTracker';
import PregnancyMode from './PregnancyMode';
import SymptomsTracker from './SymptomsTracker';

const Tracker = () => {
  const [activeTracker, setActiveTracker] = useState<string | null>(null);

  
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

  if (activeTracker) {
    switch (activeTracker) {
      case 'period':
        return (
          <div>
            <Button 
              variant="outline" 
              onClick={() => setActiveTracker(null)}
              className="mb-4"
            >
              ← Back to Tracker Menu
            </Button>
            <PeriodTracker />
          </div>
        );
      case 'pregnancy':
        return (
          <div>
            <Button 
              variant="outline" 
              onClick={() => setActiveTracker(null)}
              className="mb-4"
            >
              ← Back to Tracker Menu
            </Button>
            <PregnancyMode />
          </div>
        );
      case 'symptoms':
        return (
          <div>
            <Button 
              variant="outline" 
              onClick={() => setActiveTracker(null)}
              className="mb-4"
            >
              ← Back to Tracker Menu
            </Button>
            <SymptomsTracker />
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <>
    
      {/* <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Cycle Tracker</h1>
        <p className="text-gray-600">Track your health journey with Islamic guidance</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-lavender-200 to-lavender-600 rounded-xl">
          <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-lavender-600 rounded-xl">Overview</TabsTrigger>
          <TabsTrigger value="period" className="text-xs data-[state=active]:bg-lavender-600 rounded-xl">Period</TabsTrigger>
          <TabsTrigger value="symptoms" className="text-xs data-[state=active]:bg-lavender-600 rounded-xl">Symptoms</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <Card 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => setActiveTracker('period')}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Period Tracking</h3>
                  <p className="text-gray-600 text-sm mb-3">Track your menstrual cycle with Islamic guidance</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTracker('period');
                    }}
                  >
                    Start Tracking
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => setActiveTracker('pregnancy')}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Baby className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Pregnancy Journey</h3>
                  <p className="text-gray-600 text-sm mb-3">Track pregnancy and prepare for motherhood</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTracker('pregnancy');
                    }}
                  >
                    Start Tracking
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => setActiveTracker('symptoms')}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Symptoms Tracking</h3>
                  <p className="text-gray-600 text-sm mb-3">Monitor daily symptoms and patterns</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:opacity-90"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTracker('symptoms');
                    }}
                  >
                    Start Tracking
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-teal-50 to-purple-50 border-teal-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-teal-800">
                  <TrendingUp className="w-5 h-5" />
                  <span>Quick Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xl font-bold text-teal-600">Day 12</p>
                    <p className="text-xs text-teal-700">Current cycle day</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-teal-600">28 days</p>
                    <p className="text-xs text-teal-700">Average cycle</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-teal-600">Follicular</p>
                    <p className="text-xs text-teal-700">Current phase</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="period" className="mt-6">
          <PeriodTracker />
        </TabsContent>

        <TabsContent value="symptoms" className="mt-6">
          <SymptomsTracker />
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-r from-purple-500 to-purple-700 text-white">
        <CardContent className="p-4 text-center">
          <h3 className="text-lg font-bold mb-2 text-lavender-900">Islamic Reminder</h3>
          <p className="text-sm opacity-90 mb-1 text-lavender-900">
            "And Allah has brought you out from the wombs of your mothers while you know nothing."
          </p>
          <p className="text-xs opacity-75 text-lavender-900">- Quran 16:78</p>
          <p className="text-xs opacity-75 mt-2 text-lavender-900">
            Understanding your body is part of the knowledge Allah has blessed you with.
          </p>
        </CardContent>
      </Card>
    </div> */}

    <div className={`space-y-6 ${settings.darkMode ? 'text-white' : ''}`}>
  <div className="text-center">
    <h1 className={`text-3xl font-bold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>Cycle Tracker</h1>
    <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Track your health journey with Islamic guidance</p>
  </div>

  <Tabs defaultValue="overview" className="w-full">
    <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-lavender-200 to-lavender-600 rounded-xl">
      <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-lavender-600 rounded-xl">Overview</TabsTrigger>
      <TabsTrigger value="period" className="text-xs data-[state=active]:bg-lavender-600 rounded-xl">Period</TabsTrigger>
      <TabsTrigger value="symptoms" className="text-xs data-[state=active]:bg-lavender-600 rounded-xl">Symptoms</TabsTrigger>
    </TabsList>

    <TabsContent value="overview" className="mt-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {['period', 'pregnancy', 'symptoms'].map((type, idx) => (
            <Card key={idx} className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group ${settings.darkMode ? 'bg-slate-800 border-slate-700' : ''}`} onClick={() => setActiveTracker(type)}>
              <div className={`${settings.darkMode ? 'absolute inset-0 bg-slate-800' : ''}`}></div>
              <CardContent className="p-4 text-center relative z-10">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${type === 'period' ? 'bg-gradient-to-br from-pink-500 to-pink-600' : type === 'pregnancy' ? 'bg-gradient-to-br from-purple-500 to-purple-600' : 'bg-gradient-to-br from-teal-500 to-teal-600'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {type === 'period' && <Calendar className="w-6 h-6 text-white" />}
                  {type === 'pregnancy' && <Baby className="w-6 h-6 text-white" />}
                  {type === 'symptoms' && <Heart className="w-6 h-6 text-white" />}
                </div>
                <h3 className={`text-lg font-bold mb-1 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>{type === 'period' ? 'Period Tracking' : type === 'pregnancy' ? 'Pregnancy Journey' : 'Symptoms Tracking'}</h3>
                <p className={`text-sm mb-3 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{type === 'period' ? 'Track your menstrual cycle with Islamic guidance' : type === 'pregnancy' ? 'Track pregnancy and prepare for motherhood' : 'Monitor daily symptoms and patterns'}</p>
                <Button className={`w-full ${type === 'period' ? 'bg-gradient-to-r from-pink-500 to-pink-600' : type === 'pregnancy' ? 'bg-gradient-to-r from-purple-500 to-purple-600' : 'bg-gradient-to-r from-teal-500 to-teal-600'} hover:opacity-90`} size="sm" onClick={(e) => { e.stopPropagation(); setActiveTracker(type); }}>
                  Start Tracking
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* <Card className={`relative overflow-hidden ${settings.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-teal-50 to-purple-50 border-teal-200'}`}>
          <div className={`${settings.darkMode ? 'absolute inset-0 bg-slate-800' : ''}`}></div>
          <CardHeader>
            <CardTitle className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>
              <TrendingUp className="w-5 h-5" />
              <span>Quick Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-teal-600'}`}>Day 12</p>
                <p className={`text-xs ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>Current cycle day</p>
              </div>
              <div>
                <p className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-teal-600'}`}>28 days</p>
                <p className={`text-xs ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>Average cycle</p>
              </div>
              <div>
                <p className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-teal-600'}`}>Follicular</p>
                <p className={`text-xs ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>Current phase</p>
              </div>
            </div>
          </CardContent>
        </Card> */}

        <Card className="relative overflow-hidden">
  <div className="absolute inset-0  dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-800"></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>
      <TrendingUp className="w-5 h-5" />
      <span>Quick Overview</span>
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
      <div>
        <p className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-teal-600'}`}>Day 12</p>
        <p className={`text-xs ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>Current cycle day</p>
      </div>
      <div>
        <p className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-teal-600'}`}>28 days</p>
        <p className={`text-xs ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>Average cycle</p>
      </div>
      <div>
        <p className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-teal-600'}`}>Follicular</p>
        <p className={`text-xs ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>Current phase</p>
      </div>
    </div>
  </CardContent>
</Card>

      </div>
    </TabsContent>

    <TabsContent value="period" className="mt-6">
      <PeriodTracker />
    </TabsContent>

    <TabsContent value="symptoms" className="mt-6">
      <SymptomsTracker />
    </TabsContent>
  </Tabs>

  <Card className={`relative overflow-hidden ${settings.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-r from-purple-500 to-purple-700 text-white'}`}>
    <div className={`${settings.darkMode ? 'absolute inset-0 bg-slate-800' : ''}`}></div>
    <CardContent className="p-4 text-center relative z-10">
      <h3 className={`text-lg font-bold mb-2 ${settings.darkMode ? 'text-white' : 'text-lavender-900'}`}>Islamic Reminder</h3>
      <p className={`text-sm opacity-90 mb-1 ${settings.darkMode ? 'text-gray-300' : 'text-lavender-900'}`}>
        "And Allah has brought you out from the wombs of your mothers while you know nothing."
      </p>
      <p className={`text-xs opacity-75 ${settings.darkMode ? 'text-gray-400' : 'text-lavender-900'}`}>- Quran 16:78</p>
      <p className={`text-xs opacity-75 mt-2 ${settings.darkMode ? 'text-gray-400' : 'text-lavender-900'}`}>
        Understanding your body is part of the knowledge Allah has blessed you with.
      </p>
    </CardContent>
  </Card>
</div>

    </>
    
  );
};

export default Tracker;
