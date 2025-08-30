import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle, Heart, Droplet, Activity,
  Thermometer, Zap, Wind, Brain,
  Calendar, Baby,
  Flower, Star, Moon
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';


interface ComplicationData {
  [complicationName: string]: string;
}

interface LossData {
  type: string;
  date: string;
  weeks: string;
  notes: string;
}

const PregnancyComplications = () => {
  const [selectedComplications, setSelectedComplications] = useState<string[]>([]);
  const [complicationSeverity, setComplicationSeverity] = useState<ComplicationData>({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'input' | 'chart' | 'loss'>('input');
  const [lossData, setLossData] = useState<LossData>({
    type: '',
    date: '',
    weeks: '',
    notes: ''
  });
  const [savedLosses, setSavedLosses] = useState<LossData[]>([]);
  const { getLocalizedText } = useLanguage();


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
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Load saved losses
    const savedLossData = localStorage.getItem('pregnancy-losses');
    if (savedLossData) {
      setSavedLosses(JSON.parse(savedLossData));
    }
  }, []);


  const pregnancyComplications = [
    {
      name: getLocalizedText('symptom.bleeding'),
      severity: [getLocalizedText('very.light'), getLocalizedText('moderate'), getLocalizedText('very.heavy')],
      icon: Droplet
    },
    {
      name: getLocalizedText('symptom.cramping'),
      severity: [getLocalizedText('mild'), getLocalizedText('moderate'), getLocalizedText('severe')],
      icon: Zap
    },
    {
      name: getLocalizedText('symptom.bp'),
      severity: [getLocalizedText('mild'), getLocalizedText('moderate'), getLocalizedText('severe')],
      icon: Heart
    },
    {
      name: getLocalizedText('symptom.diabetes'),
      severity: [getLocalizedText('good'), getLocalizedText('poor')],
      icon: Activity
    },
    {
      name: getLocalizedText('symptom.preeclampsia'),
      severity: [getLocalizedText('mild'), getLocalizedText('moderate'), getLocalizedText('severe')],
      icon: AlertTriangle
    },
    {
      name: getLocalizedText('symptom.headache'),
      severity: [getLocalizedText('mild'), getLocalizedText('moderate'), getLocalizedText('severe')],
      icon: Brain
    },
    {
      name: getLocalizedText('symptom.vision'),
      severity: [getLocalizedText('clear'), getLocalizedText('few.spots'), getLocalizedText('loss')],
      icon: AlertTriangle
    },
    {
      name: getLocalizedText('symptom.fever'),
      severity: [getLocalizedText('low'), getLocalizedText('moderate'), getLocalizedText('high')],
      icon: Thermometer
    },
    {
      name: getLocalizedText('symptom.nausea'),
      severity: [getLocalizedText('occasional'), getLocalizedText('frequent'), getLocalizedText('very.frequent')],
      icon: Wind
    },
    {
      name: getLocalizedText('symptom.movement'),
      severity: [getLocalizedText('flutter'), getLocalizedText('gentle.kicks'), getLocalizedText('strong.kicks')],
      icon: Baby
    },
    {
      name: getLocalizedText('symptom.contractions'),
      severity: [getLocalizedText('irregular'), getLocalizedText('moderate'), getLocalizedText('very.frequent')],
      icon: Zap
    },
    {
      name: getLocalizedText('symptom.fluid'),
      severity: [getLocalizedText('very.light'), getLocalizedText('moderate'), getLocalizedText('large')],
      icon: Droplet
    },
    {
      name: getLocalizedText('symptom.swelling'),
      severity: [getLocalizedText('hands'), getLocalizedText('feet'), getLocalizedText('face.all.over')],
      icon: Wind
    },
    {
      name: getLocalizedText('symptom.chest'),
      severity: [getLocalizedText('mild'), getLocalizedText('moderate'), getLocalizedText('severe')],
      icon: Heart
    },
    {
      name: getLocalizedText('symptom.breathing'),
      severity: [getLocalizedText('mild'), getLocalizedText('moderate'), getLocalizedText('severe')],
      icon: Wind
    }
  ];


  const lossTypes = [

    {
      type: getLocalizedText('pregnancy.loss.miscarriage'),
      description: getLocalizedText('pregnancy.loss.miscarriage.desc')
    },
    {
      type: getLocalizedText('pregnancy.loss.neonatal'),
      description: getLocalizedText('pregnancy.loss.neonatal.desc')
    },
    {
      type: getLocalizedText('pregnancy.loss.ectopic'),
      description: getLocalizedText('pregnancy.loss.ectopic.desc')
    },
    {
      type: getLocalizedText('pregnancy.loss.molar'),
      description: getLocalizedText('pregnancy.loss.molar.desc')
    },
    {
      type: getLocalizedText('pregnancy.loss.chemical'),
      description: getLocalizedText('pregnancy.loss.chemical.desc')
    },
    {
      type: getLocalizedText('pregnancy.loss.blighted'),
      description: getLocalizedText('pregnancy.loss.blighted.desc')
    },
    {
      type: getLocalizedText('pregnancy.loss.stillbirth'),
      description: getLocalizedText('pregnancy.loss.stillbirth.desc')
    }
  ];

  const toggleComplication = (complication: string) => {
    setSelectedComplications(prev => {
      const updatedComplications = prev.includes(complication)
        ? prev.filter(c => c !== complication)
        : [...prev, complication];

      // Update localStorage
      const storedComplications = JSON.parse(localStorage.getItem("complicationsHistory") || "{}");
      storedComplications[selectedDate] = updatedComplications.map(name => ({
        name,
        severity: complicationSeverity[name] || 'Not specified'
      }));
      localStorage.setItem("complicationsHistory", JSON.stringify(storedComplications));

      return updatedComplications;
    });
  };

  const handleSeveritySelect = (complicationName: string, severity: string) => {
    setComplicationSeverity(prev => ({
      ...prev,
      [complicationName]: prev[complicationName] === severity ? '' : severity
    }));

    if (!selectedComplications.includes(complicationName)) {
      setSelectedComplications(prev => [...prev, complicationName]);
    }
  };

  const handleSaveComplications = () => {
    const complicationsData = {
      date: selectedDate,
      complications: selectedComplications.map(complication => ({
        name: complication,
        severity: complicationSeverity[complication] || 'Not specified'
      }))
    };

    const existingComplications = JSON.parse(localStorage.getItem("complicationsHistory") || "{}");
    existingComplications[selectedDate] = complicationsData.complications;
    localStorage.setItem("complicationsHistory", JSON.stringify(existingComplications));

    alert(`Complications saved for ${selectedDate}!`);
  };

  const handleSaveLoss = () => {
    if (!lossData.type || !lossData.date) {
      alert('Please fill in the required fields (type and date)');
      return;
    }

    const newLoss = { ...lossData };
    const updatedLosses = [...savedLosses, newLoss];
    setSavedLosses(updatedLosses);
    localStorage.setItem('pregnancy-losses', JSON.stringify(updatedLosses));

    // Reset form
    setLossData({
      type: '',
      date: '',
      weeks: '',
      notes: ''
    });

    alert('Loss information saved. Our thoughts and prayers are with you during this difficult time.');
  };

  const ComplicationGrid = ({ complications }: { complications: typeof pregnancyComplications }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        {complications.map((complication) => (
          <Card
            key={complication.name}
            className={`relative cursor-pointer transition-all hover:shadow-md ${selectedComplications.includes(complication.name)
              ? settings.darkMode
                ? 'bg-slate-800 border-slate-600'
                : 'bg-red-50 border-red-300'
              : settings.darkMode
                ? 'bg-slate-900 border-slate-700'
                : 'bg-white'
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-white dark:hidden rounded-lg" />
            <div className="absolute inset-0 hidden dark:block bg-slate-900 rounded-lg" />

            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <complication.icon
                    className={`w-4 h-4 ${settings.darkMode ? 'text-white' : 'text-red-600'}`}
                  />
                  <span
                    className={`font-medium text-sm ${settings.darkMode ? 'text-white' : ''}`}
                  >
                    {complication.name}
                  </span>
                </div>

                <button
                  onClick={() => toggleComplication(complication.name)}
                  className={`w-5 h-5 rounded-full border-2 ${selectedComplications.includes(complication.name)
                    ? 'bg-red-500 border-red-500'
                    : settings.darkMode
                      ? 'border-slate-600'
                      : 'border-gray-300'
                    }`}
                >
                  {selectedComplications.includes(complication.name) && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-1">
                {complication.severity.map((level) => (
                  <Badge
                    key={level}
                    variant={complicationSeverity[complication.name] === level ? 'default' : 'outline'}
                    className={`text-xs cursor-pointer transition-all ${complicationSeverity[complication.name] === level
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : settings.darkMode
                        ? 'hover:bg-slate-700 border-slate-600 text-white'
                        : 'hover:bg-red-100'
                      }`}
                    onClick={() => handleSeveritySelect(complication.name, level)}
                  >
                    {level}
                  </Badge>
                ))}
              </div>

              {complicationSeverity[complication.name] && (
                <div
                  className={`mt-2 text-xs font-medium ${settings.darkMode ? 'text-gray-300' : 'text-red-600'
                    }`}
                >
                  {getLocalizedText('selected')}: {complicationSeverity[complication.name]}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Load complications for selected date
  useEffect(() => {
    const storedComplications = JSON.parse(localStorage.getItem("complicationsHistory") || "{}");
    if (storedComplications[selectedDate]) {
      const savedComplications = storedComplications[selectedDate];
      setSelectedComplications(savedComplications.map(item => item.name));

      const severityObj = {};
      savedComplications.forEach(item => {
        severityObj[item.name] = item.severity;
      });
      setComplicationSeverity(severityObj);
    } else {
      setSelectedComplications([]);
      setComplicationSeverity({});
    }
  }, [selectedDate]);

  return (
    <div className="space-y-6">
      <div className={`text-center relative overflow-hidden ${settings.darkMode ? 'bg-slate-900 text-white' : ''}`}>
        <div className="absolute inset-0  from-red-50 via-white to-pink-50 dark:hidden"></div>
        <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

        <div className="relative z-10">
          <h1 className={`text-3xl font-bold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
            {getLocalizedText('pregnancy.complications.title')}
          </h1>
          <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {getLocalizedText('pregnancy.complications.subtitle')}
          </p>
        </div>
      </div>

      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="w-full">

        {/* <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="input" className='data-[state=active]:bg-lavender-600 data-[state=active]:text-white text-wrap'> {getLocalizedText('pregnancy.track')} </TabsTrigger>
          <TabsTrigger value="chart" className='data-[state=active]:bg-lavender-600 data-[state=active]:text-white'> {getLocalizedText('pregnancy.history')} </TabsTrigger>
          <TabsTrigger value="loss" className='data-[state=active]:bg-lavender-600 data-[state=active]:text-white text-wrap'> {getLocalizedText('pregnancy.loss')} </TabsTrigger>
        </TabsList> */}

        <TabsList 
  className={`grid w-full grid-cols-3 
    ${settings.darkMode 
      ? 'border border-slate-700 ' 
      : ' border border-gray-200'}`}
>
  <TabsTrigger 
    value="input" 
    className={` 
      data-[state=active]:bg-lavender-600 data-[state=active]:text-white text-wrap
      ${settings.darkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-lavender-200'}`}
  >
    {getLocalizedText('pregnancy.track')}
  </TabsTrigger>

  <TabsTrigger 
    value="chart" 
    className={`data-[state=active]:bg-lavender-600 data-[state=active]:text-white 
      ${settings.darkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-lavender-200'}`}
  >
    {getLocalizedText('pregnancy.history')}
  </TabsTrigger>

  <TabsTrigger 
    value="loss" 
    className={`text-wrap 
      data-[state=active]:bg-lavender-600 data-[state=active]:text-white 
      ${settings.darkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-lavender-200'}`}
  >
    {getLocalizedText('pregnancy.loss')}
  </TabsTrigger>
</TabsList>


        <TabsContent value="input" className="space-y-6">

          {/* <Card className={`${settings.darkMode ? 'bg-slate-900 border-slate-700' : ''}`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : ''}`}>
                <Calendar className="w-5 h-5" />
                {getLocalizedText('pregnancy.track.for')}{selectedDate}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={`${settings.darkMode ? 'bg-slate-800 border-slate-600 text-white' : ''}`}
                />
              </div>
              <ComplicationGrid complications={pregnancyComplications} />

              <div className="mt-6">
                <Button onClick={handleSaveComplications} className="w-full bg-red-500 hover:bg-red-600">
                  {getLocalizedText('pregnancy.save')} {selectedDate}
                </Button>
              </div>
            </CardContent>
          </Card> */}

          <Card className="relative overflow-hidden card-3d">
            {/* Background Layer */}
            <div className={`absolute inset-0 ${settings.darkMode
              ? 'bg-slate-900 border border-slate-700'
              : 'bg-white border border-gray-200'}`}></div>

            <CardHeader className="relative z-10">
              <CardTitle
                className={`flex items-center gap-2 
        ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}
              >
                <Calendar className="w-5 h-5" />
                {getLocalizedText('pregnancy.track.for')} {selectedDate}
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="mb-4">
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={`${settings.darkMode
                    ? 'bg-slate-800 border border-slate-600 text-white placeholder-gray-400'
                    : 'bg-white border border-gray-300 text-gray-800 placeholder-gray-500'}`}
                />
              </div>

              <ComplicationGrid complications={pregnancyComplications} />

              <div className="mt-6">
                <Button
                  onClick={handleSaveComplications}
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  {getLocalizedText('pregnancy.save')} {selectedDate}
                </Button>
              </div>
            </CardContent>
          </Card>


        </TabsContent>

        <TabsContent value="chart" className="space-y-6 mt-5">

          {/* <Card className={`${settings.darkMode ? 'bg-slate-900 border-slate-700' : ''}`}>
            <CardHeader>
              <CardTitle className={`${settings.darkMode ? 'text-white' : ''}`}>{getLocalizedText('pregnancy.history.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-center ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {getLocalizedText('pregnancy.history.chart')}
              </p>
            </CardContent>
          </Card> */}

          <Card className="relative overflow-hidden card-3d">
  {/* Background Layer */}
  <div className={`absolute inset-0 ${settings.darkMode 
      ? 'bg-slate-900 border border-slate-700' 
      : 'bg-white border border-gray-200'}`}></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
      {getLocalizedText('pregnancy.history.title')}
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10">
    <p className={`text-center ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      {getLocalizedText('pregnancy.history.chart')}
    </p>
  </CardContent>
</Card>

        </TabsContent>

        <TabsContent value="loss" className="space-y-6">
{/* 
          <Card className={`${settings.darkMode ? 'bg-slate-900 border-slate-700' : 'bg-gradient-to-br from-pink-50 to-purple-50'} border-pink-200`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                <Flower className="w-5 h-5" />
                {getLocalizedText('pregnancy.loss.support')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800' : 'bg-white'} border ${settings.darkMode ? 'border-slate-600' : 'border-purple-200'}`}>
                <h3 className={`text-lg font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  {getLocalizedText('pregnancy.loss.record')}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {getLocalizedText('pregnancy.loss.type')} *
                    </label>
                    <select
                      value={lossData.type}
                      onChange={(e) => setLossData({ ...lossData, type: e.target.value })}
                      className={`w-full p-2 border rounded-md ${settings.darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-300'}`}
                    >
                      <option value="">{getLocalizedText('pregnancy.loss.select')}</option>
                      {lossTypes.map(lossType => (
                        <option key={lossType.type} value={lossType.type}>{lossType.type}</option>
                      ))}
                    </select>
                    {lossData.type && (
                      <div className={`mt-2 p-2 text-xs rounded ${settings.darkMode ? 'bg-slate-600 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                        {lossTypes.find(lt => lt.type === lossData.type)?.description}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {getLocalizedText('pregnancy.loss.date')} *
                      </label>
                      <Input
                        type="date"
                        value={lossData.date}
                        onChange={(e) => setLossData({ ...lossData, date: e.target.value })}
                        className={`${settings.darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {getLocalizedText('pregnancy.loss.weeks')}
                      </label>
                      <Input
                        type="text"
                        placeholder={`e.g., 8 ${getLocalizedText('weeks')}, 12w3d`}
                        value={lossData.weeks}
                        onChange={(e) => setLossData({ ...lossData, weeks: e.target.value })}
                        className={`${settings.darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {getLocalizedText('pregnancy.loss.notes')}
                    </label>
                    <Textarea
                      placeholder={getLocalizedText('pregnancy.loss.notes.placeholder')}
                      value={lossData.notes}
                      onChange={(e) => setLossData({ ...lossData, notes: e.target.value })}
                      className={`${settings.darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}`}
                    />
                  </div>

                  <Button
                    onClick={handleSaveLoss}
                    className={`w-full ${settings.darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'}`}
                  >
                    {getLocalizedText('pregnancy.loss.save')}
                  </Button>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800' : 'bg-amber-50'} border ${settings.darkMode ? 'border-slate-600' : 'border-amber-200'}`}>
                <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}>
                  <Moon className="w-5 h-5" />
                  {getLocalizedText('pregnancy.loss.islamic.title')}
                </h3>
                <div className="space-y-4">
                  <div className={`p-3 rounded ${settings.darkMode ? 'bg-slate-700' : 'bg-white'} border ${settings.darkMode ? 'border-slate-600' : 'border-amber-200'}`}>
                    <p className={`text-lg font-arabic mb-2 ${settings.darkMode ? 'text-white' : 'text-amber-900'}`}>
                      إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
                    </p>
                    <p className={`text-sm italic ${settings.darkMode ? 'text-gray-300' : 'text-amber-700'}`}>
                      {getLocalizedText('pregnancy.loss.quran')}
                    </p>
                    <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-amber-600'}`}>- Quran 2:156</p>
                  </div>

                  <div className={`${settings.darkMode ? 'text-gray-300' : 'text-amber-700'} text-sm space-y-2`}>
                    <p>• {getLocalizedText('pregnancy.loss.jannah')}</p>
                    <p>• {getLocalizedText('pregnancy.loss.intercede')}</p>
                    <p>• {getLocalizedText('pregnancy.loss.test')}</p>
                    <p>• {getLocalizedText('pregnancy.loss.comfort')}</p>
                  </div>
                </div>
              </div>

              {savedLosses.length > 0 && (
                <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800' : 'bg-gray-50'} border ${settings.darkMode ? 'border-slate-600' : 'border-gray-200'}`}>
                  <h3 className={`text-lg font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {getLocalizedText('pregnancy.loss.remembered')}
                  </h3>
                  <div className="space-y-3">
                    {savedLosses.map((loss, index) => (
                      <div key={index} className={`p-3 rounded border ${settings.darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className={`w-4 h-4 ${settings.darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                          <span className={`font-medium ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {loss.type}
                          </span>
                        </div>
                        <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {loss.date} {loss.weeks && `• ${loss.weeks}`}
                        </p>
                        {loss.notes && (
                          <p className={`text-sm mt-2 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {loss.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card> */}

          <Card className="relative overflow-hidden card-3d">
  {/* Background Layer */}
  <div className={`absolute inset-0 ${settings.darkMode
      ? 'bg-slate-900 border border-slate-700'
      : ' from-pink-50 to-purple-50 border border-pink-200'}`}></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
      <Flower className="w-5 h-5" />
      {getLocalizedText('pregnancy.loss.support')}
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-6 relative z-10">
    {/* Loss Record Section */}
    <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border border-purple-200'}`}>
      <h3 className={`text-lg font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
        {getLocalizedText('pregnancy.loss.record')}
      </h3>

      <div className="space-y-4">
        {/* Loss Type */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {getLocalizedText('pregnancy.loss.type')} *
          </label>
          <select
            value={lossData.type}
            onChange={(e) => setLossData({ ...lossData, type: e.target.value })}
            className={`w-full p-2 border rounded-md ${settings.darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-300'}`}
          >
            <option value="">{getLocalizedText('pregnancy.loss.select')}</option>
            {lossTypes.map(lossType => (
              <option key={lossType.type} value={lossType.type}>{lossType.type}</option>
            ))}
          </select>
          {lossData.type && (
            <div className={`mt-2 p-2 text-xs rounded ${settings.darkMode ? 'bg-slate-600 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
              {lossTypes.find(lt => lt.type === lossData.type)?.description}
            </div>
          )}
        </div>

        {/* Date & Weeks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {getLocalizedText('pregnancy.loss.date')} *
            </label>
            <Input
              type="date"
              value={lossData.date}
              onChange={(e) => setLossData({ ...lossData, date: e.target.value })}
              className={`${settings.darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {getLocalizedText('pregnancy.loss.weeks')}
            </label>
            <Input
              type="text"
              placeholder={`e.g., 8 ${getLocalizedText('weeks')}, 12w3d`}
              value={lossData.weeks}
              onChange={(e) => setLossData({ ...lossData, weeks: e.target.value })}
              className={`${settings.darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}`}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {getLocalizedText('pregnancy.loss.notes')}
          </label>
          <Textarea
            placeholder={getLocalizedText('pregnancy.loss.notes.placeholder')}
            value={lossData.notes}
            onChange={(e) => setLossData({ ...lossData, notes: e.target.value })}
            className={`${settings.darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}`}
          />
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSaveLoss}
          className={`w-full ${settings.darkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'}`}
        >
          {getLocalizedText('pregnancy.loss.save')}
        </Button>
      </div>
    </div>

    {/* Islamic Comfort Section */}
    <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-amber-50 border border-amber-200'}`}>
      <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}>
        <Moon className="w-5 h-5" />
        {getLocalizedText('pregnancy.loss.islamic.title')}
      </h3>

      <div className="space-y-4">
        <div className={`${settings.darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border border-amber-200'} p-3 rounded`}>
          <p className={`text-lg font-arabic mb-2 ${settings.darkMode ? 'text-white' : 'text-amber-900'}`}>
            إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
          </p>
          <p className={`text-sm italic ${settings.darkMode ? 'text-gray-300' : 'text-amber-700'}`}>
            {getLocalizedText('pregnancy.loss.quran')}
          </p>
          <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-amber-600'}`}>- Quran 2:156</p>
        </div>

        <div className={`${settings.darkMode ? 'text-gray-300' : 'text-amber-700'} text-sm space-y-2`}>
          <p>• {getLocalizedText('pregnancy.loss.jannah')}</p>
          <p>• {getLocalizedText('pregnancy.loss.intercede')}</p>
          <p>• {getLocalizedText('pregnancy.loss.test')}</p>
          <p>• {getLocalizedText('pregnancy.loss.comfort')}</p>
        </div>
      </div>
    </div>

    {/* Saved Losses */}
    {savedLosses.length > 0 && (
      <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-gray-50 border border-gray-200'}`}>
        <h3 className={`text-lg font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
          {getLocalizedText('pregnancy.loss.remembered')}
        </h3>
        <div className="space-y-3">
          {savedLosses.map((loss, index) => (
            <div key={index} className={`p-3 rounded border ${settings.darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Star className={`w-4 h-4 ${settings.darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                <span className={`font-medium ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {loss.type}
                </span>
              </div>
              <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {loss.date} {loss.weeks && `• ${loss.weeks}`}
              </p>
              {loss.notes && (
                <p className={`text-sm mt-2 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {loss.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </CardContent>
</Card>

          
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PregnancyComplications;
