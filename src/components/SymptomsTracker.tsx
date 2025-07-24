import React, { useState , useEffect} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Heart, Baby, Zap, 
  Droplet, Waves, Flame, Zap as Lightning,
  Moon, Activity, HeartHandshake, Brain,
  Eye, Utensils, Bed, Target,
  Wind, Coffee, Smile, TrendingUp
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

interface SymptomData {
  [symptomName: string]: string; // stores the selected severity level
}

const SymptomsTracker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomSeverity, setSymptomSeverity] = useState<SymptomData>({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'input' | 'chart'>('input');

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

  // Sample historical data for visualization
  const symptomHistoryData = [
    {
      date: 'Jun 15',
      'Light Cramping': 2,
      'Heavy Cramping': 0,
      'Bloating': 1,
      'Mood Swings': 3,
      'Fatigue': 2,
      'Headaches': 1,
      'Energy Level': 4
    },
    {
      date: 'Jun 16',
      'Light Cramping': 3,
      'Heavy Cramping': 2,
      'Bloating': 2,
      'Mood Swings': 4,
      'Fatigue': 3,
      'Headaches': 2,
      'Energy Level': 3
    },
    {
      date: 'Jun 17',
      'Light Cramping': 2,
      'Heavy Cramping': 1,
      'Bloating': 3,
      'Mood Swings': 2,
      'Fatigue': 2,
      'Headaches': 0,
      'Energy Level': 5
    },
    {
      date: 'Jun 18',
      'Light Cramping': 1,
      'Heavy Cramping': 0,
      'Bloating': 2,
      'Mood Swings': 1,
      'Fatigue': 1,
      'Headaches': 0,
      'Energy Level': 6
    },
    {
      date: 'Jun 19',
      'Light Cramping': 0,
      'Heavy Cramping': 0,
      'Bloating': 1,
      'Mood Swings': 2,
      'Fatigue': 1,
      'Headaches': 1,
      'Energy Level': 7
    },
    {
      date: 'Jun 20',
      'Light Cramping': 0,
      'Heavy Cramping': 0,
      'Bloating': 0,
      'Mood Swings': 1,
      'Fatigue': 0,
      'Headaches': 0,
      'Energy Level': 8
    },
    {
      date: 'Jun 21',
      'Light Cramping': 1,
      'Heavy Cramping': 0,
      'Bloating': 1,
      'Mood Swings': 2,
      'Fatigue': 1,
      'Headaches': 0,
      'Energy Level': 7
    }
  ];

  const periodSymptoms = [
    { name: 'Light Cramping', severity: ['Mild', 'Moderate', 'Severe'], icon: Lightning },
    { name: 'Heavy Cramping', severity: ['Mild', 'Moderate', 'Severe'], icon: Flame },
    { name: 'Bloating', severity: ['Mild', 'Moderate', 'Severe'], icon: Wind },
    { name: 'Breakouts/Acne', severity: ['Few spots', 'Moderate', 'Severe'], icon: Eye },
    { name: 'Heavy Flow', severity: ['Light', 'Medium', 'Heavy', 'Very Heavy'], icon: Waves },
    { name: 'Medium Flow', severity: ['Light', 'Medium', 'Heavy'], icon: Droplet },
    { name: 'Light Flow', severity: ['Very Light', 'Light', 'Medium'], icon: Droplet },
    { name: 'Clotting', severity: ['Small', 'Medium', 'Large'], icon: Droplet },
    { name: 'Back Pain', severity: ['Mild', 'Moderate', 'Severe'], icon: Lightning },
    { name: 'Headaches', severity: ['Mild', 'Moderate', 'Severe'], icon: Brain },
    { name: 'Mood Swings', severity: ['Mild', 'Noticeable', 'Intense'], icon: Smile },
    { name: 'Fatigue', severity: ['Mild', 'Moderate', 'Exhausted'], icon: Bed },
    { name: 'Breast Tenderness', severity: ['Mild', 'Moderate', 'Painful'], icon: HeartHandshake },
    { name: 'Bowel Changes', severity: ['Constipation', 'Diarrhea', 'Irregular'], icon: Activity },
    { name: 'Food Cravings', severity: ['Mild', 'Strong', 'Intense'], icon: Utensils },
    { name: 'Sleep Issues', severity: ['Mild', 'Difficulty sleeping', 'Insomnia'], icon: Moon }
  ];

  const pregnancySymptoms = [
    { name: 'Spotting', severity: ['Light', 'Moderate', 'Heavy'], icon: Droplet },
    { name: 'Baby Movements', severity: ['Flutter', 'Gentle kicks', 'Strong kicks'], icon: Baby },
    { name: 'Morning Sickness', severity: ['Mild nausea', 'Moderate', 'Severe vomiting'], icon: Activity },
    { name: 'Breast Changes', severity: ['Tender', 'Swollen', 'Very painful'], icon: HeartHandshake },
    { name: 'Fatigue', severity: ['Mild', 'Moderate', 'Exhausted'], icon: Bed },
    { name: 'Food Aversions', severity: ['Mild', 'Strong', 'Severe'], icon: Utensils },
    { name: 'Frequent Urination', severity: ['Occasional', 'Frequent', 'Very frequent'], icon: Droplet },
    { name: 'Heartburn', severity: ['Mild', 'Moderate', 'Severe'], icon: Flame },
    { name: 'Back Pain', severity: ['Mild', 'Moderate', 'Severe'], icon: Lightning },
    { name: 'Swelling', severity: ['Feet', 'Hands', 'Face/all over'], icon: Wind },
    { name: 'Braxton Hicks', severity: ['Mild', 'Noticeable', 'Strong'], icon: Lightning },
    { name: 'Mood Changes', severity: ['Mild', 'Moderate', 'Intense'], icon: Smile },
    { name: 'Skin Changes', severity: ['Darkening', 'Stretch marks', 'Acne'], icon: Eye },
    { name: 'Constipation', severity: ['Mild', 'Moderate', 'Severe'], icon: Activity },
    { name: 'Dizziness', severity: ['Occasional', 'Frequent', 'Severe'], icon: Brain }
  ];

  const hormonalSymptoms = [
    { name: 'Energy Level', severity: ['Low', 'Normal', 'High'], icon: Lightning },
    { name: 'Mood', severity: ['Down', 'Neutral', 'Happy', 'Anxious', 'Irritable'], icon: Smile },
    { name: 'Skin Condition', severity: ['Clear', 'Oily', 'Dry', 'Breakouts'], icon: Eye },
    { name: 'Hair Changes', severity: ['Normal', 'Oily', 'Dry', 'Thinning'], icon: Wind },
    { name: 'Appetite', severity: ['Low', 'Normal', 'Increased', 'Cravings'], icon: Utensils },
    { name: 'Sleep Quality', severity: ['Poor', 'Fair', 'Good', 'Excellent'], icon: Moon },
    { name: 'Stress Level', severity: ['Low', 'Moderate', 'High', 'Very High'], icon: Brain },
    { name: 'Concentration', severity: ['Poor', 'Fair', 'Good', 'Excellent'], icon: Target },
    { name: 'Water Retention', severity: ['None', 'Mild', 'Moderate', 'Severe'], icon: Droplet },
    { name: 'Libido', severity: ['Low', 'Normal', 'High'], icon: Heart }
  ];

  const toggleSymptom = (symptom: string) => {
      setSelectedSymptoms(prev => {
    const updatedSymptoms = prev.includes(symptom)
      ? prev.filter(s => s !== symptom)
      : [...prev, symptom];

    // ✅ Update localStorage along with state
    const storedSymptoms = JSON.parse(localStorage.getItem("symptomsHistory") || "{}");
    storedSymptoms[selectedDate] = updatedSymptoms.map(name => ({
      name,
      severity: symptomSeverity[name] || 'Not specified'
    }));
    localStorage.setItem("symptomsHistory", JSON.stringify(storedSymptoms));

    return updatedSymptoms;
  });
  };

  const handleSeveritySelect = (symptomName: string, severity: string) => {
    setSymptomSeverity(prev => ({
      ...prev,
      [symptomName]: prev[symptomName] === severity ? '' : severity
    }));

    // Auto-select the symptom when a severity is chosen
    if (!selectedSymptoms.includes(symptomName)) {
      setSelectedSymptoms(prev => [...prev, symptomName]);
    }
  };

  const handleSaveSymptoms = () => {
    const symptomsData = {
      date: selectedDate,
      symptoms: selectedSymptoms.map(symptom => ({
        name: symptom,
        severity: symptomSeverity[symptom] || 'Not specified'
      }))
    };
    
    console.log('Saving symptoms data:', symptomsData);
    // Here you would typically save to your backend/database

    const existingSymptoms = JSON.parse(localStorage.getItem("symptomsHistory") || "{}");
  existingSymptoms[selectedDate] = symptomsData.symptoms;
  localStorage.setItem("symptomsHistory", JSON.stringify(existingSymptoms));
    
    // Show success feedback
    alert(`Symptoms saved for ${selectedDate}!`);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-purple-200 backdrop-blur-sm">
          <p className="font-semibold text-purple-800 mb-2">{`Date: ${label}`}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: item.color }}>
              {`${item.name}: ${item.value}/5`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const SymptomGrid = ({ symptoms, title }: { symptoms: typeof periodSymptoms, title: string }) => (


    <>
     {/* <div className="space-y-4">
      <h3 className="text-lg font-semibold text-purple-800">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        {symptoms.map((symptom) => (
          <Card key={symptom.name} className={`cursor-pointer transition-all hover:shadow-md ${
            selectedSymptoms.includes(symptom.name) ? 'bg-purple-50 border-purple-300' : 'bg-white'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <symptom.icon className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-sm">{symptom.name}</span>
                </div>

                <button
                  onClick={() => toggleSymptom(symptom.name)}
                  className={`w-5 h-5 rounded-full border-2 ${
                    selectedSymptoms.includes(symptom.name) 
                      ? 'bg-purple-500 border-purple-500' 
                      : 'border-gray-300'
                  }`}
                >
                  {selectedSymptoms.includes(symptom.name) && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {symptom.severity.map((level) => (
                  <Badge 
                    key={level} 
                    variant={symptomSeverity[symptom.name] === level ? "default" : "outline"}
                    className={`text-xs cursor-pointer transition-all ${
                      symptomSeverity[symptom.name] === level 
                        ? 'bg-purple-500 text-white hover:bg-purple-600' 
                        : 'hover:bg-purple-100'
                    }`}
                    onClick={() => handleSeveritySelect(symptom.name, level)}
                  >
                    {level}
                  </Badge>
                ))}
              </div>
              
              {symptomSeverity[symptom.name] && (
                <div className="mt-2 text-xs text-purple-600 font-medium">
                  Selected: {symptomSeverity[symptom.name]}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div> */}

    <div className="space-y-4">
  <h3 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>{title}</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
    {symptoms.map((symptom) => (
      <Card
        key={symptom.name}
        className={`relative cursor-pointer transition-all hover:shadow-md ${
          selectedSymptoms.includes(symptom.name)
            ? settings.darkMode
              ? 'bg-slate-800 border-slate-600'
              : 'bg-purple-50 border-purple-300'
            : settings.darkMode
            ? 'bg-slate-900 border-slate-700'
            : 'bg-white'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white dark:hidden rounded-lg" />
        <div className="absolute inset-0 hidden dark:block bg-slate-900 rounded-lg" />

        <CardContent className="p-4 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <symptom.icon
                className={`w-4 h-4 ${settings.darkMode ? 'text-white' : 'text-purple-600'}`}
              />
              <span
                className={`font-medium text-sm ${settings.darkMode ? 'text-white' : ''}`}
              >
                {symptom.name}
              </span>
            </div>

            <button
              onClick={() => toggleSymptom(symptom.name)}
              className={`w-5 h-5 rounded-full border-2 ${
                selectedSymptoms.includes(symptom.name)
                  ? 'bg-purple-500 border-purple-500'
                  : settings.darkMode
                  ? 'border-slate-600'
                  : 'border-gray-300'
              }`}
            >
              {selectedSymptoms.includes(symptom.name) && (
                <span className="text-white text-xs">✓</span>
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-1">
            {symptom.severity.map((level) => (
              <Badge
                key={level}
                variant={symptomSeverity[symptom.name] === level ? 'default' : 'outline'}
                className={`text-xs cursor-pointer transition-all ${
                  symptomSeverity[symptom.name] === level
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : settings.darkMode
                    ? 'hover:bg-slate-700 border-slate-600 text-white'
                    : 'hover:bg-purple-100'
                }`}
                onClick={() => handleSeveritySelect(symptom.name, level)}
              >
                {level}
              </Badge>
            ))}
          </div>

          {symptomSeverity[symptom.name] && (
            <div
              className={`mt-2 text-xs font-medium ${
                settings.darkMode ? 'text-gray-300' : 'text-purple-600'
              }`}
            >
              Selected: {symptomSeverity[symptom.name]}
            </div>
          )}
        </CardContent>
      </Card>
    ))}
  </div>
</div>

    
    </>
  );

  useEffect(() => {
  const storedSymptoms = JSON.parse(localStorage.getItem("symptomsHistory") || "{}");
  if (storedSymptoms[selectedDate]) {
    const savedSymptoms = storedSymptoms[selectedDate];

    setSelectedSymptoms(savedSymptoms.map(item => item.name));

    const severityObj = {};
    savedSymptoms.forEach(item => {
      severityObj[item.name] = item.severity;
    });
    setSymptomSeverity(severityObj);
  } else {
    setSelectedSymptoms([]);
    setSymptomSeverity({});
  }
}, [selectedDate]);

  return (
    <div className="space-y-6">
      {/* <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Symptoms Tracker</h1>
        <p className="text-gray-600">Track your daily symptoms to better understand your body's patterns</p>
      </div> */}

      <div className={`text-center relative overflow-hidden ${settings.darkMode ? 'bg-slate-900 text-white' : ''}`}>
  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

  <div className="relative z-10">
    <h1 className={`text-3xl font-bold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
      Symptoms Tracker
    </h1>
    <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      Track your daily symptoms to better understand your body's patterns
    </p>
  </div>
</div>

      {/* <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Today's Symptoms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-purple-200 rounded-md focus:ring-2 focus:ring-purple-500"
            />
            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === 'input' ? 'chart' : 'input')}
              className="flex items-center gap-2"
            >
              {viewMode === 'input' ? (
                <>
                  <TrendingUp className="w-4 h-4" />
                  View Chart
                </>
              ) : (
                'Input Symptoms'
              )}
            </Button>
          </div>
        </CardContent>
      </Card> */}

      <Card className="relative overflow-hidden">
  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
      <Calendar className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-purple-600'}`} />
      Today's Symptoms
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10">
    <div className="flex items-center justify-between">
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 ${settings.darkMode ? 'bg-slate-900 border-slate-600 text-white' : 'border-purple-200'}`}
      />
      <Button
        variant="outline"
        onClick={() => setViewMode(viewMode === 'input' ? 'chart' : 'input')}
        className={`flex items-center gap-2 ${settings.darkMode ? 'border-slate-600 text-white hover:bg-slate-700' : ''}`}
      >
        {viewMode === 'input' ? (
          <>
            <TrendingUp className="w-4 h-4" />
            View Chart
          </>
        ) : (
          'Input Symptoms'
        )}
      </Button>
    </div>
  </CardContent>
</Card>


      {viewMode === 'chart' ? (
        <Card className="bg-gradient-to-br from-white to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Symptom Trends Over Time
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Line Chart for Symptom Severity */}
            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-4">Symptom Severity Timeline</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={symptomHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e879f9" opacity={0.3} />
                    <XAxis dataKey="date" stroke="#9333ea" />
                    <YAxis stroke="#9333ea" label={{ value: 'Severity (0-5)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="Light Cramping" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', r: 5 }} />
                    <Line type="monotone" dataKey="Heavy Cramping" stroke="#dc2626" strokeWidth={3} dot={{ fill: '#dc2626', r: 5 }} />
                    <Line type="monotone" dataKey="Bloating" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 5 }} />
                    <Line type="monotone" dataKey="Mood Swings" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 5 }} />
                    <Line type="monotone" dataKey="Fatigue" stroke="#6b7280" strokeWidth={3} dot={{ fill: '#6b7280', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Area Chart for Energy Levels */}
            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-4">Energy Level Trends</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={symptomHistoryData}>
                    <defs>
                      <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e879f9" opacity={0.3} />
                    <XAxis dataKey="date" stroke="#9333ea" />
                    <YAxis stroke="#9333ea" label={{ value: 'Energy (0-10)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="Energy Level" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      fill="url(#energyGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart for Weekly Summary */}
            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-4">Weekly Symptom Summary</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={symptomHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e879f9" opacity={0.3} />
                    <XAxis dataKey="date" stroke="#9333ea" />
                    <YAxis stroke="#9333ea" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="Headaches" fill="#f97316" />
                    <Bar dataKey="Fatigue" fill="#6366f1" />
                    <Bar dataKey="Mood Swings" fill="#ec4899" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Legend */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-3">Chart Legend</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-pink-500"></div>
                  <span>Light Cramping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-red-600"></div>
                  <span>Heavy Cramping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-amber-500"></div>
                  <span>Bloating</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-purple-500"></div>
                  <span>Mood Swings</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-gray-500"></div>
                  <span>Fatigue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-green-500"></div>
                  <span>Energy Level</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Tabs defaultValue="period" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-lavender-200 to-lavender-600  rounded-xl">
              <TabsTrigger value="period" className="text-xs  data-[state=active]:bg-lavender-600 rounded-xl gap-2 ">
                {/* <Heart className="w-4 h-4" /> */}
                Period Symptoms
              </TabsTrigger>
              <TabsTrigger value="pregnancy" className="text-xs  data-[state=active]:bg-lavender-600 rounded-xl  gap-2">
                {/* <Baby className="w-4 h-4" /> */}
                Pregnancy Symptoms
              </TabsTrigger>
              <TabsTrigger value="hormonal" className="text-xs  data-[state=active]:bg-lavender-600 rounded-xl  gap-2">
                {/* <Zap className="w-4 h-4" /> */}
                Daily Hormonal
              </TabsTrigger>
            </TabsList>

            <TabsContent value="period" className="mt-6">
              {/* <Card className="bg-gradient-to-br from-white to-purple-50">
                <CardContent className="p-6">
                  <SymptomGrid symptoms={periodSymptoms} title="Period-Related Symptoms" />
                </CardContent>
              </Card> */}
              <Card className="relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-white to-purple-50 dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

  <CardContent className="p-6 relative z-10">
    <SymptomGrid symptoms={periodSymptoms} title="Period-Related Symptoms" />
  </CardContent>
</Card>
            </TabsContent>

            <TabsContent value="pregnancy" className="mt-6">
              {/* <Card className="bg-gradient-to-br from-white to-purple-50">
                <CardContent className="p-6">
                  <SymptomGrid symptoms={pregnancySymptoms} title="Pregnancy-Related Symptoms" />
                </CardContent>
              </Card> */}
              <Card className="relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-white to-purple-50 dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

  <CardContent className="p-6 relative z-10">
    <SymptomGrid symptoms={pregnancySymptoms} title="Pregnancy-Related Symptoms" />
  </CardContent>
</Card>
            </TabsContent>

            <TabsContent value="hormonal" className="mt-6">
              {/* <Card className="bg-gradient-to-br from-white to-purple-50">
                <CardContent className="p-6">
                  <SymptomGrid symptoms={hormonalSymptoms} title="Daily Hormonal & General Wellness" />
                </CardContent>
              </Card> */}
              <Card className="relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-white to-purple-50 dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

  <CardContent className="p-6 relative z-10">
    <SymptomGrid symptoms={hormonalSymptoms} title="Daily Hormonal & General Wellness" />
  </CardContent>
</Card>

            </TabsContent>
          </Tabs>

          <div className="flex justify-center">
            <Button 
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-3"
              onClick={handleSaveSymptoms}
            >
              Save Today's Symptoms
            </Button>
          </div>

          {selectedSymptoms.length > 0 && (
            
         

            <>
                 {/* <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">Selected Symptoms & Severity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedSymptoms.map((symptom) => (
                    <div key={symptom} className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <span className="font-medium text-purple-800">{symptom}</span>
                      <div className="flex items-center gap-2">
                        {symptomSeverity[symptom] && (
                          <Badge className="bg-purple-100 text-purple-800">
                            {symptomSeverity[symptom]}
                          </Badge>
                        )}
                        <button 
                          onClick={() => toggleSymptom(symptom)}
                          className="text-purple-600 hover:text-purple-800"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}

            <Card className="relative overflow-hidden">
  <div className="absolute inset-0 dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900 border-slate-700"></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
      Selected Symptoms & Severity
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10">
    <div className="space-y-2">
      {selectedSymptoms.map((symptom) => (
        <div key={symptom} className={`flex items-center justify-between p-2 rounded-lg ${settings.darkMode ? 'bg-slate-800' : 'bg-white'}`}>
          <span className={`${settings.darkMode ? 'text-white' : 'text-purple-800'} font-medium`}>{symptom}</span>
          <div className="flex items-center gap-2">
            {symptomSeverity[symptom] && (
              <Badge className={`${settings.darkMode ? 'bg-slate-700 text-white' : 'bg-purple-100 text-purple-800'}`}>
                {symptomSeverity[symptom]}
              </Badge>
            )}
            <button
              onClick={() => toggleSymptom(symptom)}
              className={`${settings.darkMode ? 'text-white hover:text-gray-300' : 'text-purple-600 hover:text-purple-800'}`}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>

            </>
          )}
        </>
      )}
    </div>
  );
};

export default SymptomsTracker;
