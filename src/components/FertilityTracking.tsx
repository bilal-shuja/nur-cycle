import { useState, useEffect } from 'react';
import { Heart, Thermometer, Droplets, Calendar, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TemperatureModal, CervicalMucusModal, CervixPositionModal } from './FertilityTrackingModals';
import { getLegendProps } from 'recharts/types/util/getLegendProps';
import { useLanguage } from '@/contexts/LanguageContext';

const FertilityTracking = () => {
  const [currentCycleDay, setCurrentCycleDay] = useState(14);
  const [avgCycleLength, setAvgCycleLength] = useState(28);

  const { getLocalizedText } = useLanguage();
  

  const [savedTemperature, setSavedTemperature] = useState<{
    temperature: number;
    unit: string;
    date: string;
  } | null>(null);

  const [savedMucus, setSavedMucus] = useState<{
    mucusType: string;
    date: string;
  } | null>(null);


  const [savedCervix, setSavedCervix] = useState<{
    position: string;
    firmness: string;
    date: string;
  } | null>(null);

  
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


  // Calculate fertile window (typically 5 days before ovulation + ovulation day)
  const ovulationDay = Math.floor(avgCycleLength / 2);
  const fertileWindowStart = ovulationDay - 5;
  const fertileWindowEnd = ovulationDay + 1;

  const isInFertileWindow = currentCycleDay >= fertileWindowStart && currentCycleDay <= fertileWindowEnd;
  const isOvulationDay = currentCycleDay === ovulationDay;

  const fertilityData = [
    {
      title: getLocalizedText('ovulation.prediction') ,
      value: ` ${getLocalizedText('day')}  ${ovulationDay}`,
      description: isOvulationDay ? getLocalizedText('today.ovulation.day')  : `${Math.abs(currentCycleDay - ovulationDay)} ${getLocalizedText('days')}  ${currentCycleDay < ovulationDay ? getLocalizedText('until'): getLocalizedText('since')} ${getLocalizedText('ovulation')}`,
      icon: Target,
      color: isOvulationDay ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-600",
      illustration: "🥚"
    },
    {
      title: getLocalizedText('fertile.window') ,
      value: `${getLocalizedText('days')} ${fertileWindowStart}-${fertileWindowEnd}`,
      description: isInFertileWindow ? getLocalizedText('fertile.window.message')  : getLocalizedText('peak.conception.days') ,
      icon: Heart,
      color: isInFertileWindow ? "bg-green-500 text-white" : "bg-green-100 text-green-600",
      illustration: "💕"
    },
    {
      title: getLocalizedText('conception.chance') ,
      value: isInFertileWindow ? getLocalizedText('high')  : currentCycleDay < fertileWindowStart ? getLocalizedText('increasing') : getLocalizedText('low'),
      description: isInFertileWindow ? getLocalizedText('best.time.for.intimacy') : getLocalizedText('track.your.cycle'),
      icon: TrendingUp,
      color: isInFertileWindow ? "bg-purple-500 text-white" : "bg-purple-100 text-purple-600",
      illustration: "📈"
    }
  ];

  const nextPeriodDate = new Date();
  nextPeriodDate.setDate(nextPeriodDate.getDate() + (avgCycleLength - currentCycleDay));

  const nextOvulationDate = new Date();
  nextOvulationDate.setDate(nextOvulationDate.getDate() + (ovulationDay - currentCycleDay));


  useEffect(() => {
    const temperatureData = localStorage.getItem('fertility-temperature');
    const mucusData = localStorage.getItem('fertility-mucus');
    const cervixsData = localStorage.getItem('fertility-cervix');
    if (temperatureData) {
      setSavedTemperature(JSON.parse(temperatureData));
    }

    if (mucusData) {
      setSavedMucus(JSON.parse(mucusData))
    }

    if (cervixsData) {
      setSavedCervix(JSON.parse(cervixsData))
    }
  }, []);


  return (
    <div className="space-y-6">

      <Card className="relative overflow-hidden">
  <div className="absolute inset-0  from-purple-50 to-pink-50 border-purple-200 dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900 border border-slate-700"></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>
      <Calendar className={`w-6 h-6 ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`} />
      <span> {getLocalizedText('current.cycle.overview')}  </span>
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="text-center">
        <p className={`text-2xl font-bold ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>
          {getLocalizedText('day')} {currentCycleDay}
        </p>
        <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}> {getLocalizedText('current.cycle.day')} </p>
      </div>
      <div className="text-center">
        <p className={`text-2xl font-bold ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>
          {avgCycleLength}
        </p>
        <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}> {getLocalizedText('average.cycle.length')}</p>
      </div>
      <div className="text-center">
        <p className={`text-lg font-bold ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>
          {nextOvulationDate.toLocaleDateString()}
        </p>
        <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}> {getLocalizedText('next.ovulation')} </p>
      </div>
      <div className="text-center">
        <p className={`text-lg font-bold ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>
          {nextPeriodDate.toLocaleDateString()}
        </p>
        <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}> {getLocalizedText('next.period')} </p>
      </div>
    </div>
  </CardContent>
</Card>


      {/* Fertility Predictions */}
    

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {fertilityData.map((item, index) => (
    <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-purple-50 dark:hidden"></div>
      <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

      <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
        <item.icon className={`w-full h-full ${settings.darkMode ? 'text-white/10' : 'text-gray-400'}`} />
      </div>

      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center`}>
            <item.icon className={`w-6 h-6 ${settings.darkMode ? 'text-white' : ''}`} />
          </div>
          <span className={`text-2xl ${settings.darkMode ? 'text-white' : ''}`}>{item.illustration}</span>
        </div>
        <h3 className={`font-semibold text-lg mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>{item.title}</h3>
        <p className={`text-xl font-bold mb-1 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{item.value}</p>
        <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
      </CardContent>
    </Card>
  ))}
</div>



      <Card className="relative overflow-hidden">
  <div className="absolute inset-0  from-white to-purple-50 dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

  <CardHeader >
    <CardTitle className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : ''}`}>
      <Thermometer className="w-6 h-6 text-red-500" />
      <span className='text-center'> {getLocalizedText('todays.fertility.signs')} </span>  
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10">
    <div className="grid grid-cols-1 gap-4 space-y-2">
      <div className={`text-center p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800' : 'bg-red-50'}`}>
        <Thermometer className="w-8 h-8 text-red-500 mx-auto mb-2" />
        {savedTemperature ? (
          <p className={`text-lg font-bold mb-1 ${settings.darkMode ? 'text-white' : ''}`}>
            {savedTemperature.temperature} {savedTemperature.unit === 'fahrenheit' ? '°F' : '°C'}
          </p>
        ) : (
          <p className={`mt-4 text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            - {getLocalizedText('no.temperature.found')} -
          </p>
        )}
        <p className={`text-sm mb-3 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}> {getLocalizedText('basal.body.temperature')} </p>
        <TemperatureModal setSavedTemperature={setSavedTemperature}>
          <Button variant="outline" size="sm" className="w-full">
            {getLocalizedText('log.temperature')}
          </Button>
        </TemperatureModal>
      </div>

      <div className={`text-center p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800' : 'bg-blue-50'}`}>
        <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
        {savedMucus ? (
          <p className={`text-lg font-bold mb-1 ${settings.darkMode ? 'text-white' : ''}`}>{savedMucus.mucusType}</p>
        ) : (
          <p className={`mt-4 text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>- {getLocalizedText('no.mucus.found')} -</p>
        )}
        <p className={`text-sm mb-3 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{getLocalizedText('cervical.mucus')}</p>
        <CervicalMucusModal setSavedMucus={setSavedMucus}>
          <Button variant="outline" size="sm" className="w-full">
          {getLocalizedText('update.status')}
          </Button>
        </CervicalMucusModal>
      </div>

      <div className={`text-center p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800' : 'bg-purple-50'}`} style={{ cursor: "pointer" }}>
        <Heart className="w-8 h-8 text-purple-500 mx-auto mb-2" />
        {savedCervix ? (
          <p className={`text-lg font-bold mb-1 ${settings.darkMode ? 'text-white' : ''}`}>{savedCervix.position}</p>
        ) : (
          <p className={`mt-4 text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>- {getLocalizedText('no.cervix.found')} -</p>
        )}
        <p className={`text-sm mb-3 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}> {getLocalizedText('cervix.position')} </p>
        <CervixPositionModal setSavedCervix={setSavedCervix}>
          <Button variant="outline" size="sm" className="w-full">
           {getLocalizedText('record.data')}
          </Button>
        </CervixPositionModal>
      </div>

      <div className="text-center p-4 bg-transparent rounded-lg"></div>
    </div>
  </CardContent>
</Card>



      <Card className="relative overflow-hidden">
  <div className="absolute inset-0  from-teal-50 to-blue-50 dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

  <CardContent className="p-6 text-center relative z-10">
    <h3 className={`text-lg font-bold mb-4 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>
     {getLocalizedText('dua.for.righteous.offspring')}
    </h3>
    <p className={`text-xl font-arabic mb-2 ${settings.darkMode ? 'text-white' : 'text-teal-900'}`}>
      رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ
    </p>
    <p className={`italic mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>
    {getLocalizedText('dua.text')}  
    </p>
    <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-teal-600'}`}>
      - Quran 37:100 ({getLocalizedText('prophet.ibrahims.dua')})
    </p>
  </CardContent>
</Card>

    </div>
  );
};

export default FertilityTracking;
