
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Calendar, TrendingUp, BarChart3, PieChart, Activity, Heart, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface GraphsReportsProps {
  onBack: () => void;
}

const GraphsReports = ({ onBack }: GraphsReportsProps) => {
  const { getLocalizedText } = useLanguage();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1M' | '3M' | '6M' | '1Y'>('3M');

  // Sample data - in real app, this would come from user's actual data
  const cycleData = [
    { month: 'Jan', cycleLength: 28, flowDays: 5, symptoms: 3 },
    { month: 'Feb', cycleLength: 30, flowDays: 4, symptoms: 2 },
    { month: 'Mar', cycleLength: 27, flowDays: 6, symptoms: 4 },
    { month: 'Apr', cycleLength: 29, flowDays: 5, symptoms: 3 },
    { month: 'May', cycleLength: 28, flowDays: 4, symptoms: 2 },
    { month: 'Jun', cycleLength: 31, flowDays: 5, symptoms: 5 },
  ];

  const symptomTrendData = [
    { date: 'Week 1', cramping: 2, mood: 3, fatigue: 1, bloating: 2 },
    { date: 'Week 2', cramping: 1, mood: 2, fatigue: 2, bloating: 1 },
    { date: 'Week 3', cramping: 4, mood: 4, fatigue: 3, bloating: 3 },
    { date: 'Week 4', cramping: 3, mood: 3, fatigue: 2, bloating: 2 },
  ];

  const flowIntensityData = [
    { name: 'Light', value: 25, color: '#fbbf24' },
    { name: 'Medium', value: 45, color: '#f59e0b' },
    { name: 'Heavy', value: 25, color: '#d97706' },
    { name: 'Very Heavy', value: 5, color: '#92400e' },
  ];

  const fertilityData = [
    { phase: 'Menstrual', days: 5, probability: 5 },
    { phase: 'Follicular', days: 7, probability: 15 },
    { phase: 'Ovulation', days: 3, probability: 85 },
    { phase: 'Luteal', days: 13, probability: 25 },
  ];

  const moodPatternData = [
    { day: 'Day 1', mood: 2, energy: 3 },
    { day: 'Day 7', mood: 4, energy: 5 },
    { day: 'Day 14', mood: 5, energy: 4 },
    { day: 'Day 21', mood: 3, energy: 3 },
    { day: 'Day 28', mood: 2, energy: 2 },
  ];


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

  const stats = useMemo(() => ({
    avgCycleLength: Math.round(cycleData.reduce((acc, curr) => acc + curr.cycleLength, 0) / cycleData.length),
    avgFlowDays: Math.round(cycleData.reduce((acc, curr) => acc + curr.flowDays, 0) / cycleData.length),
    totalSymptoms: cycleData.reduce((acc, curr) => acc + curr.symptoms, 0),
    cycleRegularity: cycleData.every(cycle => Math.abs(cycle.cycleLength - 28) <= 3) ? 'Regular' : 'Irregular'
  }), [cycleData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-purple-200">
          <p className="font-semibold text-purple-800 mb-2">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: item.color }}>
              {`${item.name}: ${item.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">📊 Graphs & Reports</h1>
          <div className="w-10" />
        </div>
      </div> */}

      <div className={`relative overflow-hidden card-3d shadow-sm border-b`}>
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border-b border-slate-700' : 'bg-white border-b border-gray-200'}`}></div>

        <div className="relative z-10 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className={`rounded-full ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}
          >
            <ArrowLeft className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`} />
          </Button>

          <h1 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
            📊 Graphs & Reports
          </h1>

          <div className="w-10"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Time Frame Selector */}
        {/* <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-purple-800">Time Period</h3>
              <div className="flex gap-2">
                {(['1M', '3M', '6M', '1Y'] as const).map((period) => (
                  <Button
                    key={period}
                    variant={selectedTimeframe === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(period)}
                    className={selectedTimeframe === period ? "text-white" : "text-white"}
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card> */}

        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-purple-200'}`}></div>

          <CardContent className="relative z-10 p-4">
            <div className="flex items-center justify-between">
              <h3 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>Time Period</h3>
              <div className="flex gap-2">
                {(['1M', '3M', '6M', '1Y'] as const).map((period) => (
                  <Button
                    key={period}
                    variant={selectedTimeframe === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(period)}
                    className={`${selectedTimeframe === period ? 'text-white' : settings.darkMode ? 'text-white' : 'text-purple-800'} ${settings.darkMode ? 'border-slate-600' : 'border-purple-200'}`}
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Key Statistics */}
        {/* <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-800">{stats.avgCycleLength}</p>
              <p className="text-sm text-purple-600">Avg Cycle Length</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-pink-50 to-pink-100">
            <CardContent className="p-4 text-center">
              <Heart className="w-6 h-6 text-pink-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-pink-800">{stats.avgFlowDays}</p>
              <p className="text-sm text-pink-600">Avg Flow Days</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
            <CardContent className="p-4 text-center">
              <Activity className="w-6 h-6 text-amber-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-amber-800">{stats.totalSymptoms}</p>
              <p className="text-sm text-amber-600">Total Symptoms</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-800">{stats.cycleRegularity}</p>
              <p className="text-sm text-green-600">Cycle Pattern</p>
            </CardContent>
          </Card>
        </div> */}

        <div className="grid grid-cols-2 gap-4">
          <Card className="relative overflow-hidden card-3d">
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-purple-50 to-purple-100'} `}></div>
            <CardContent className="relative z-10 p-4 text-center">
              <Calendar className={`w-6 h-6 mx-auto mb-2 ${settings.darkMode ? 'text-purple-300' : 'text-purple-600'}`} />
              <p className={`text-2xl font-bold ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>{stats.avgCycleLength}</p>
              <p className={`text-sm ${settings.darkMode ? 'text-purple-300' : 'text-purple-600'}`}>Avg Cycle Length</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden card-3d">
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-pink-50 to-pink-100'} `}></div>
            <CardContent className="relative z-10 p-4 text-center">
              <Heart className={`w-6 h-6 mx-auto mb-2 ${settings.darkMode ? 'text-pink-300' : 'text-pink-600'}`} />
              <p className={`text-2xl font-bold ${settings.darkMode ? 'text-white' : 'text-pink-800'}`}>{stats.avgFlowDays}</p>
              <p className={`text-sm ${settings.darkMode ? 'text-pink-300' : 'text-pink-600'}`}>Avg Flow Days</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden card-3d">
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-amber-50 to-amber-100'} `}></div>
            <CardContent className="relative z-10 p-4 text-center">
              <Activity className={`w-6 h-6 mx-auto mb-2 ${settings.darkMode ? 'text-amber-300' : 'text-amber-600'}`} />
              <p className={`text-2xl font-bold ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}>{stats.totalSymptoms}</p>
              <p className={`text-sm ${settings.darkMode ? 'text-amber-300' : 'text-amber-600'}`}>Total Symptoms</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden card-3d">
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-green-50 to-green-100'} `}></div>
            <CardContent className="relative z-10 p-4 text-center">
              <TrendingUp className={`w-6 h-6 mx-auto mb-2 ${settings.darkMode ? 'text-green-300' : 'text-green-600'}`} />
              <p className={`text-2xl font-bold ${settings.darkMode ? 'text-white' : 'text-green-800'}`}>{stats.cycleRegularity}</p>
              <p className={`text-sm ${settings.darkMode ? 'text-green-300' : 'text-green-600'}`}>Cycle Pattern</p>
            </CardContent>
          </Card>
        </div>


        {/* Main Charts */}
        <Tabs defaultValue="cycle-trends" className="w-full">
          {/* <TabsList className="grid w-full grid-cols-4 bg-purple-50">
            <TabsTrigger value="cycle-trends" className="text-xs">Cycle Trends</TabsTrigger>
            <TabsTrigger value="symptoms" className="text-xs">Symptoms</TabsTrigger>
            <TabsTrigger value="fertility" className="text-xs">Fertility</TabsTrigger>
            <TabsTrigger value="wellness" className="text-xs">Wellness</TabsTrigger>
          </TabsList> */}

          <TabsList className={`grid w-full grid-cols-4 ${settings.darkMode ? 'bg-slate-900' : 'bg-purple-50'}`}>
            <TabsTrigger
              value="cycle-trends"
              className={`text-xs ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}
            >
              Cycle Trends
            </TabsTrigger>

            <TabsTrigger
              value="symptoms"
              className={`text-xs ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}
            >
              Symptoms
            </TabsTrigger>

            <TabsTrigger
              value="fertility"
              className={`text-xs ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}
            >
              Fertility
            </TabsTrigger>

            <TabsTrigger
              value="Wellness"
              className={`text-xs ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}
            >
              Wellness
            </TabsTrigger>





          </TabsList>


          {/* <TabsContent value="cycle-trends" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  Cycle Length Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cycleData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e879f9" opacity={0.3} />
                      <XAxis dataKey="month" stroke="#9333ea" />
                      <YAxis stroke="#9333ea" />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="cycleLength" 
                        stroke="#8b5cf6" 
                        strokeWidth={3}
                        dot={{ fill: '#8b5cf6', r: 6 }}
                        name="Cycle Length"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-600" />
                  Flow Duration Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cycleData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e879f9" opacity={0.3} />
                      <XAxis dataKey="month" stroke="#9333ea" />
                      <YAxis stroke="#9333ea" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="flowDays" fill="#ec4899" name="Flow Days" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}

          <TabsContent value="cycle-trends" className="mt-6">
            <Card className="relative overflow-hidden card-3d">
              <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-purple-50 to-purple-100 border-purple-200'}`}></div>

              <CardHeader className="relative z-10">
                <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  <BarChart3 className={`w-5 h-5 ${settings.darkMode ? 'text-purple-300' : 'text-purple-600'}`} />
                  Cycle Length Trends
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cycleData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={settings.darkMode ? "#475569" : "#e879f9"} opacity={0.3} />
                      <XAxis dataKey="month" stroke={settings.darkMode ? "#cbd5e1" : "#9333ea"} />
                      <YAxis stroke={settings.darkMode ? "#cbd5e1" : "#9333ea"} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="cycleLength"
                        stroke={settings.darkMode ? "#a78bfa" : "#8b5cf6"}
                        strokeWidth={3}
                        dot={{ fill: settings.darkMode ? '#a78bfa' : '#8b5cf6', r: 6 }}
                        name="Cycle Length"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden card-3d mt-4">
              <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-pink-50 to-pink-100 border-pink-200'}`}></div>

              <CardHeader className="relative z-10">
                <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-pink-800'}`}>
                  <Heart className={`w-5 h-5 ${settings.darkMode ? 'text-pink-300' : 'text-pink-600'}`} />
                  Flow Duration Analysis
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cycleData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={settings.darkMode ? "#475569" : "#e879f9"} opacity={0.3} />
                      <XAxis dataKey="month" stroke={settings.darkMode ? "#cbd5e1" : "#9333ea"} />
                      <YAxis stroke={settings.darkMode ? "#cbd5e1" : "#9333ea"} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="flowDays" fill={settings.darkMode ? "#f472b6" : "#ec4899"} name="Flow Days" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>


          {/* <TabsContent value="symptoms" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-amber-600" />
                  Symptom Severity Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={symptomTrendData}>
                      <defs>
                        <linearGradient id="crampingGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#dc2626" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e879f9" opacity={0.3} />
                      <XAxis dataKey="date" stroke="#9333ea" />
                      <YAxis stroke="#9333ea" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="cramping" 
                        stackId="1"
                        stroke="#dc2626" 
                        fill="url(#crampingGradient)"
                        name="Cramping"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="mood" 
                        stackId="1"
                        stroke="#8b5cf6" 
                        fill="url(#moodGradient)"
                        name="Mood"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-orange-600" />
                  Flow Intensity Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={flowIntensityData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {flowIntensityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}

          <TabsContent value="symptoms" className="mt-6">
            <Card className="relative overflow-hidden card-3d">
              <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-amber-50 to-amber-100 border-amber-200'}`}></div>

              <CardHeader className="relative z-10">
                <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}>
                  <Activity className={`w-5 h-5 ${settings.darkMode ? 'text-amber-300' : 'text-amber-600'}`} />
                  Symptom Severity Trends
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={symptomTrendData}>
                      <defs>
                        <linearGradient id="crampingGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={settings.darkMode ? "#dc2626" : "#dc2626"} stopOpacity={0.8} />
                          <stop offset="95%" stopColor={settings.darkMode ? "#dc2626" : "#dc2626"} stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={settings.darkMode ? "#8b5cf6" : "#8b5cf6"} stopOpacity={0.8} />
                          <stop offset="95%" stopColor={settings.darkMode ? "#8b5cf6" : "#8b5cf6"} stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={settings.darkMode ? "#475569" : "#e879f9"} opacity={0.3} />
                      <XAxis dataKey="date" stroke={settings.darkMode ? "#cbd5e1" : "#9333ea"} />
                      <YAxis stroke={settings.darkMode ? "#cbd5e1" : "#9333ea"} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="cramping"
                        stackId="1"
                        stroke={settings.darkMode ? "#dc2626" : "#dc2626"}
                        fill="url(#crampingGradient)"
                        name="Cramping"
                      />
                      <Area
                        type="monotone"
                        dataKey="mood"
                        stackId="1"
                        stroke={settings.darkMode ? "#8b5cf6" : "#8b5cf6"}
                        fill="url(#moodGradient)"
                        name="Mood"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden card-3d mt-4">
              <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-orange-50 to-orange-100 border-orange-200'}`}></div>

              <CardHeader className="relative z-10">
                <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-orange-800'}`}>
                  <PieChart className={`w-5 h-5 ${settings.darkMode ? 'text-orange-300' : 'text-orange-600'}`} />
                  Flow Intensity Distribution
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={flowIntensityData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill={settings.darkMode ? "#6366f1" : "#8884d8"}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {flowIntensityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 
          <TabsContent value="fertility" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  Fertility Window Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fertilityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e879f9" opacity={0.3} />
                      <XAxis dataKey="phase" stroke="#9333ea" />
                      <YAxis stroke="#9333ea" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="probability" fill="#10b981" name="Fertility %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 grid grid-cols-2 gap-4">
              {fertilityData.map((phase, index) => (
                <Card key={phase.phase} className="bg-gradient-to-br from-green-50 to-green-100">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-green-800">{phase.phase}</h3>
                    <p className="text-sm text-green-600">{phase.days} days avg</p>
                    <Badge className="mt-2 bg-green-500">
                      {phase.probability}% fertility chance
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent> */}

          <TabsContent value="fertility" className="mt-6">
            <Card className="relative overflow-hidden card-3d">
              <div
                className={`absolute inset-0 ${settings.darkMode
                  ? 'bg-slate-900 border border-slate-700'
                  : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
                  }`}
              ></div>

              <CardHeader className="relative z-10">
                <CardTitle
                  className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-green-800'
                    }`}
                >
                  <Zap className={`w-5 h-5 ${settings.darkMode ? 'text-green-300' : 'text-green-600'}`} />
                  Fertility Window Analysis
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fertilityData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={settings.darkMode ? '#475569' : '#e879f9'}
                        opacity={0.3}
                      />
                      <XAxis dataKey="phase" stroke={settings.darkMode ? '#cbd5e1' : '#9333ea'} />
                      <YAxis stroke={settings.darkMode ? '#cbd5e1' : '#9333ea'} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="probability" fill={settings.darkMode ? '#10b981' : '#10b981'} name="Fertility %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 grid grid-cols-2 gap-4">
              {fertilityData.map((phase, index) => (
                <Card
                  key={phase.phase}
                  className={`relative overflow-hidden card-3d ${settings.darkMode
                    ? 'bg-slate-900 border border-slate-700'
                    : ' from-green-50 to-green-100 border-green-200'
                    }`}
                >
                  <div
                    className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-green-50 to-green-100'
                      } `}
                  ></div>

                  <CardContent className="relative z-10 p-4">
                    <h3 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-green-800'}`}>
                      {phase.phase}
                    </h3>
                    <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-green-600'}`}>
                      {phase.days} days avg
                    </p>
                    <Badge className="mt-2 bg-green-500">{phase.probability}% fertility chance</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>


          {/* <TabsContent value="Wellness" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-purple-600" />
                  Mood & Energy Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodPatternData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e879f9" opacity={0.3} />
                      <XAxis dataKey="day" stroke="#9333ea" />
                      <YAxis stroke="#9333ea" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#ec4899"
                        strokeWidth={3}
                        dot={{ fill: '#ec4899', r: 6 }}
                        name="Mood Level"
                      />
                      <Line
                        type="monotone"
                        dataKey="energy"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: '#10b981', r: 6 }}
                        name="Energy Level"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader>
                <CardTitle className="text-purple-800">Wellness Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="font-medium">Best Energy Days</span>
                    <Badge className="bg-green-500">Days 7-14</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="font-medium">Mood Stability</span>
                    <Badge className="bg-blue-500">Good</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="font-medium">Sleep Quality</span>
                    <Badge className="bg-purple-500">Tracked in 80% cycles</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
          <TabsContent value="Wellness" className="mt-6">
            <Card className="relative overflow-hidden card-3d">
              <div
                className={`absolute inset-0 ${settings.darkMode
                    ? 'bg-slate-900 border border-slate-700'
                    : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'
                  }`}
              ></div>

              <CardHeader className="relative z-10">
                <CardTitle
                  className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}
                >
                  <Heart className={`w-5 h-5 ${settings.darkMode ? 'text-purple-300' : 'text-purple-600'}`} />
                  Mood & Energy Patterns
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodPatternData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={settings.darkMode ? '#475569' : '#e879f9'}
                        opacity={0.3}
                      />
                      <XAxis dataKey="day" stroke={settings.darkMode ? '#cbd5e1' : '#9333ea'} />
                      <YAxis stroke={settings.darkMode ? '#cbd5e1' : '#9333ea'} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#ec4899"
                        strokeWidth={3}
                        dot={{ fill: '#ec4899', r: 6 }}
                        name="Mood Level"
                      />
                      <Line
                        type="monotone"
                        dataKey="energy"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: '#10b981', r: 6 }}
                        name="Energy Level"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className={`relative overflow-hidden card-3d mt-4`}>
              <div
                className={`absolute inset-0 ${settings.darkMode
                    ? 'bg-slate-900 border border-slate-700'
                    : ' from-purple-50 to-purple-100 border-purple-200'
                  }`}
              ></div>

              <CardHeader className="relative z-10">
                <CardTitle className={`${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  Wellness Insights
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="space-y-3">
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-white'
                      }`}
                  >
                    <span className={`font-medium ${settings.darkMode ? 'text-white' : ''}`}>Best Energy Days</span>
                    <Badge className="bg-green-500">Days 7-14</Badge>
                  </div>
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-white'
                      }`}
                  >
                    <span className={`font-medium ${settings.darkMode ? 'text-white' : ''}`}>Mood Stability</span>
                    <Badge className="bg-blue-500">Good</Badge>
                  </div>
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-white'
                      }`}
                  >
                    <span className={`font-medium ${settings.darkMode ? 'text-white' : ''}`}>Sleep Quality</span>
                    <Badge className="bg-purple-500">Tracked in 80% cycles</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>

        {/* Export Options */}
        {/* <Card className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <CardContent className="p-6">
            <h3 className="text-xl  mb-4 text-black">📥 Export Your Data</h3>
            <p className="text-purple-400 mb-4">
              Download your cycle data, symptoms, and insights for your records or to share with your healthcare provider.
            </p>
            <div className="flex gap-3">
              <Button className="border-white text-white hover:bg-purple-700">
                Export PDF Report
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-purple-700">
                Export CSV Data
              </Button>
            </div>
          </CardContent>
        </Card> */}
        <Card className="relative overflow-hidden card-3d">
  <div
    className={`absolute inset-0 ${
      settings.darkMode
        ? 'bg-slate-900 border border-slate-700'
        : ' from-purple-600 to-purple-800 border-purple-700'
    }`}
  ></div>

  <CardContent className="relative z-10 p-6">
    <h3 className={`text-xl mb-4 ${settings.darkMode ? 'text-white' : 'text-black'}`}>
      📥 Export Your Data
    </h3>
    <p className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-400'} mb-4`}>
      Download your cycle data, symptoms, and insights for your records or to share with your healthcare provider.
    </p>
    <div className="flex gap-3">
      <Button
        className={`border-white ${
          settings.darkMode ? 'text-white hover:bg-slate-800' : 'text-white hover:bg-purple-700'
        }`}
      >
        Export PDF Report
      </Button>
      <Button
        variant="outline"
        className={`border-white ${
          settings.darkMode ? 'text-white hover:bg-slate-800' : 'text-white hover:bg-purple-700'
        }`}
      >
        Export CSV Data
      </Button>
    </div>
  </CardContent>
</Card>

      </div>
    </div>
  );
};

export default GraphsReports;
