
import { useRef, useState, useEffect } from 'react';
import { Calendar, Plus, ChevronLeft, ChevronRight, Droplets, Heart, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Input } from './ui/input';
import { ChevronDown } from "lucide-react";

type PeriodMap = Record<string, string[]>;

function parsePeriodData(data: PeriodMap): { startDates: Date[], avgCycle: number, avgDuration: number } {
  const allDates = Object.values(data)
    .flat()
    .map(dateStr => new Date(dateStr))
    .sort((a, b) => a.getTime() - b.getTime());

  const startDates: Date[] = [];
  for (let i = 0; i < allDates.length; i += 6) {
    startDates.push(allDates[i]);
  }

  const cycles: number[] = [];
  for (let i = 1; i < startDates.length; i++) {
    const diff = (startDates[i].getTime() - startDates[i - 1].getTime()) / (1000 * 60 * 60 * 24);
    cycles.push(diff);
  }

  const avgCycle = Math.round(cycles.reduce((a, b) => a + b, 0) / cycles.length);
  const avgDuration = 6;

  return { startDates, avgCycle, avgDuration };
}

function predictFuturePeriods(lastPeriod: Date, avgCycle: number, avgDuration: number, monthsAhead: number = 6): Date[][] {
  const predictions: Date[][] = [];

  let nextStart = new Date(lastPeriod);

  for (let i = 0; i < monthsAhead; i++) {
    nextStart = new Date(nextStart.getTime() + avgCycle * 86400000);
    const periodWeek = Array.from({ length: avgDuration }, (_, d) => new Date(nextStart.getTime() + d * 86400000));
    predictions.push(periodWeek);
  }

  return predictions;
}

function groupByMonth(predictedWeeks: Date[][]): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  for (const week of predictedWeeks) {
    for (const date of week) {
      const key = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      const iso = date.toISOString().split('T')[0];

      if (!result[key]) result[key] = [];
      if (!result[key].includes(iso)) result[key].push(iso);
    }
  }

  return result;
}


const PeriodTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<'day' | 'week' | 'month'>('month');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logDate, setLogDate] = useState<Date>();

  const [logType, setLogType] = useState<string>('');
  const [logIntensity, setLogIntensity] = useState<string>('');
  const [showDateInput, setShowDateInput] = useState(false);

  // const [logEntries, setLogEntries] = useState<{ date: Date; type: string }[]>([]);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showIntensityDropdown, setShowIntensityDropdown] = useState(false);

  const [endDate, setEndDate] = useState<Date>();
  const [showEndDateInput, setShowEndDateInput] = useState(false);

  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const [highlightDates, setHighlightDates] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem('savedDatesByMonth');
    if (!stored) return;

    const periodMap: PeriodMap = JSON.parse(stored);
    const { startDates, avgCycle, avgDuration } = parsePeriodData(periodMap);
    const lastPeriod = startDates[startDates.length - 1];
    const predictions = predictFuturePeriods(lastPeriod, avgCycle, avgDuration, 6);
    const predictedMap = groupByMonth(predictions);

    const allPredictedDates = Object.values(predictedMap).flat();
    setHighlightDates(new Set(allPredictedDates));
  }, []);




  const handleOpenLogModal = () => {
    triggerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setIsLogModalOpen(true), 300); // Delay to allow scroll
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


  // Helper function to get display text for log type
  const getLogTypeDisplay = (value: string) => {
    switch (value) {
      case 'period': return 'Menstruation (Hayd)';
      case 'ghusl-completed': return 'Ghusl Completed';
      case 'purity': return 'Purity (Tuhr)';
      case 'istihada-light': return 'Irregular Bleeding (istihada-light)';
      case 'istihada-medium': return 'Irregular Bleeding (istihada-medium)';
      case 'ovulation': return 'Ovulation';
      case 'fertile-start': return 'Fertile Window - Start';
      case 'fertile-peak': return 'Fertile Window - Peak';
      case 'fertile-end': return 'Fertile Window - End';
      default: return 'Select entry type';
    }
  };

  const getLogIntensityDisplay = (value: string) => {
    switch (value) {
      case 'period-light': return 'Light';
      case 'period-medium': return 'Medium';
      case 'period-heavy': return 'Heavy';
      default: return 'Select intensity';
    }
  };



  const [cycleData] = useState({
    lastPeriod: new Date(2024, 5, 15),
    averageCycleLength: 28,
    averagePeriodLength: 5,
    madhhab: 'hanafi' // User's selected madhhab for rulings
  });

  const dayTypes = {
    // Menstruation (Hayd)
    'period-light': { color: 'bg-red-200', label: 'Light Period', icon: '🩸', worship: 'exempt' },
    'period-medium': { color: 'bg-red-400', label: 'Medium Period', icon: '🩸', worship: 'exempt' },
    'period-heavy': { color: 'bg-red-600', label: 'Heavy Period', icon: '🩸', worship: 'exempt' },

    // Purity (Tuhr)
    'purity': { color: 'bg-green-200', label: 'Purity (Tuhr)', icon: '✨', worship: 'required' },
    'ghusl-required': { color: 'bg-teal-300', label: 'Ghusl Required', icon: '🚿', worship: 'pending' },
    'ghusl-completed': { color: 'bg-teal-500', label: 'Ghusl Completed', icon: '✅', worship: 'required' },

    // Fertility & Ovulation
    'fertile-start': { color: 'bg-green-300', label: 'Fertile Window Start', icon: '🌱', worship: 'required' },
    'fertile-peak': { color: 'bg-green-500', label: 'Peak Fertility', icon: '🌸', worship: 'required' },
    'ovulation': { color: 'bg-yellow-400', label: 'Ovulation Day', icon: '🥚', worship: 'required' },
    'fertile-end': { color: 'bg-green-300', label: 'Fertile Window End', icon: '🌿', worship: 'required' },

    // Irregular bleeding (Istihada)
    'istihada-light': { color: 'bg-orange-200', label: 'Light Spotting (Istihada)', icon: '💧', worship: 'required' },
    'istihada-medium': { color: 'bg-orange-400', label: 'Irregular Bleeding', icon: '🔶', worship: 'required' },

    // Postpartum (Nifas)
    'nifas': { color: 'bg-purple-400', label: 'Postpartum (Nifas)', icon: '👶', worship: 'exempt' },

    // Pregnancy
    'pregnancy': { color: 'bg-pink-300', label: 'Pregnancy', icon: '🤱', worship: 'required' },

    // Normal days
    'normal': { color: 'bg-gray-100', label: 'Normal Day', icon: '📅', worship: 'required' }
  };


  const [cycleLog, setCycleLog] = useState<Map<string, string>>(
    new Map([
      ['2024-06-15', 'period-heavy'],
      ['2024-06-16', 'period-medium'],
      ['2024-06-17', 'period-light'],
      ['2024-06-18', 'period-light'],
      ['2024-06-19', 'ghusl-required'],
      ['2024-06-20', 'ghusl-completed'],
      ['2024-06-21', 'purity'],
      ['2024-06-26', 'fertile-start'],
      ['2024-06-28', 'fertile-peak'],
      ['2024-06-29', 'ovulation'],
      ['2024-06-30', 'fertile-end'],
    ])
  );

  const getDayTypeForDate = (date: Date): string => {
    const dateStr = date.toISOString().split('T')[0];
    return cycleLog.get(dateStr) || 'normal';
  };

  const getDayClassName = (date: Date, isCurrentMonth = true) => {
    const dayType = getDayTypeForDate(date);
    const dayConfig = dayTypes[dayType];
    const isToday = date.toDateString() === new Date().toDateString();

    let baseClass = "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium cursor-pointer transition-all duration-200 hover:scale-110 ";

    if (!isCurrentMonth) {
      baseClass += "opacity-30 ";
    }
    if (isToday) {
      baseClass += "ring-2 ring-purple-500 ";
    }
    // baseClass += dayConfig.color + " ";

    // ✅ Defensive check to avoid crashing
    baseClass += (dayConfig?.color || "bg-gray-100") + " ";

    const darkTextTypes = ['period-heavy', 'ghusl-completed', 'fertile-peak', 'ovulation'];
    baseClass += darkTextTypes.includes(dayType) ? "text-white " : "text-gray-800 ";

    return baseClass;
  };

  const getWeekDays = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const navigateCalendar = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (calendarView === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (calendarView === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };


  const handleLogEntry = () => {
    if (logDate && logType) {
      const finalType = logType === "period" && logIntensity ? logIntensity : logType;

      if (!dayTypes[finalType]) {
        alert("Invalid or missing intensity selected.");
        return;
      }

      const newLog = new Map(cycleLog);

      // ✅ 1. Add start date
      const startDateStr = logDate.toISOString().split('T')[0];
      newLog.set(startDateStr, finalType);

      // ✅ 2. Add end date ONLY if it exists and is different from start
      if (endDate && endDate.toDateString() !== logDate.toDateString()) {
        const endDateStr = endDate.toISOString().split('T')[0];
        newLog.set(endDateStr, finalType);
      }

      setCycleLog(newLog);

      const logEntry = {
        start: startDateStr,
        end: endDate,
        type: finalType,
      };


      localStorage.setItem("log entry", JSON.stringify(logEntry));


      const logObject = {};
      newLog.forEach((value, key) => {
        logObject[key] = value;
      });
      localStorage.setItem("cycleLogFull", JSON.stringify(logObject));


      console.log("Logged:", {
        start: startDateStr,
        end: endDate?.toISOString().split('T')[0],
        type: finalType,
      });

      // ✅ Reset form
      setIsLogModalOpen(false);
      setLogDate(undefined);
      setEndDate(undefined);
      setLogType('');
      setLogIntensity('');
    }
  };

  useEffect(() => {
    const storedLog = localStorage.getItem("cycleLogFull");
    if (storedLog) {
      const parsedLog = JSON.parse(storedLog) as Record<string, string>;
      const mapLog = new Map<string, string>(Object.entries(parsedLog));
      setCycleLog(mapLog);
    }
  }, []);

  const getIslamicGuidanceForDay = (dayType: string) => {
    const config = dayTypes[dayType];
    switch (config.worship) {
      case 'exempt':
        return 'Prayer and fasting are not required. This is Allah\'s mercy upon women.';
      case 'required':
        return 'All acts of worship are required as normal.';
      case 'pending':
        return 'Perform Ghusl before resuming prayer and worship.';
      default:
        return '';
    }
  };



  return (
    <div className="space-y-6">
   

      <div className={`text-center ${settings.darkMode ? 'text-white' : ''}`}>
        <h1 className={`text-3xl font-bold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
          Islamic Period & Fertility Tracking
        </h1>
        <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Track your cycle with comprehensive Islamic guidance
        </p>
      </div>


 

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            gradient: "from-red-500 to-red-600",
            title: "Period Status",
            value: "Day 6 - Ended",
            note: "Ghusl required",
            icon: <Droplets className="w-6 h-6 text-red-400" />,
            color: "text-red-500",
          },
          {
            gradient: "from-teal-500 to-teal-600",
            title: "Worship Status",
            value: "Pending Ghusl",
            note: "Required for prayer",
            icon: <Heart className="w-6 h-6 text-teal-400" />,
            color: "text-teal-500",
          },
          {
            gradient: "from-green-500 to-green-600",
            title: "Fertility",
            value: "Low",
            note: "Post-menstrual",
            icon: (
              <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center">
                <span className="text-green-800 text-xs">🌱</span>
              </div>
            ),
            color: "text-green-500",
          },
          {
            gradient: "from-purple-500 to-purple-600",
            title: "Cycle Day",
            value: "Day 6",
            note: "of 28 days",
            icon: <Calendar className="w-6 h-6 text-purple-400" />,
            color: "text-purple-500",
          },
        ].map((item, idx) => (
          <Card key={idx} className="relative overflow-hidden">
            <div className={`absolute inset-0 ${item.gradient} dark:hidden`}></div>
            <div className="absolute inset-0 hidden dark:block bg-slate-800"></div>

            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${item.color} text-opacity-100 text-sm font-medium ${settings.darkMode ? 'text-white' : ''}`}>{item.title}</p>
                  <p className={`text-lg font-bold ${settings.darkMode ? 'text-white' : 'text-black'}`}>{item.value}</p>
                  <p className={`text-xs font-medium ${settings.darkMode ? 'text-gray-300' : 'text-black'}`}>{item.note}</p>
                </div>
                {item.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    

      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-white dark:hidden"></div>
        <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

        <CardHeader className="relative z-10">
          <div className="flex flex-col items-center justify-between">
            <CardTitle className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : ''}`}>
              <Calendar className="w-5 h-5" />
              <span>Color-Coded Cycle Calendar</span>
            </CardTitle>
            <div className="flex items-center gap-2 mt-4">
              <Button
                variant={calendarView === 'day' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCalendarView('day')}
                className='dark:text-white'
              >
                Day
              </Button>
              <Button
                variant={calendarView === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCalendarView('week')}
                   className='dark:text-white'
              >
                Week
              </Button>
              <Button
                variant={calendarView === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCalendarView('month')}
                   className='dark:text-white'
              >
                Month
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => navigateCalendar('prev')}>
                <ChevronLeft className="w-4 h-4 dark:text-white" />
              </Button>
              <h3 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : ''}`}>
                {format(currentDate, 'MMMM yyyy')}
              </h3>
              <Button variant="outline" size="sm" onClick={() => navigateCalendar('next')}>
                <ChevronRight className="w-4 h-4  dark:text-white " />
              </Button>
            </div>

            {calendarView === 'month' && (
              <div className="space-y-2">
                <div className="grid grid-cols-7 gap-1 text-center">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className={`text-sm font-medium py-2 ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      {day}
                    </div>
                  ))}
                  {getMonthDays().map((date, index) => {
                    const dayType = getDayTypeForDate(date);
                    const config = dayTypes[dayType] || dayTypes["normal"];

                    // ✅ Add this line
                    const isPredicted = highlightDates.has(date.toISOString().split('T')[0]);
                    return (
                      <div key={index} className="flex justify-center">
                        {/* <div
                          className={getDayClassName(date, date.getMonth() === currentDate.getMonth())}
                          title={`${date.getDate()} - ${config.label || 'Normal Day'}`}
                        >
                          {date.getDate()}
                        </div> */}
                        <div
                          className={`
                            ${getDayClassName(date, date.getMonth() === currentDate.getMonth())}
                            ${isPredicted ? 'border-2 border-red-600 border-dashed rounded-full' : ''}
                          `}
                          title={`${date.getDate()} - ${config.label || 'Normal Day'}${isPredicted ? ' (Predicted Period)' : ''}`}
                        >
                          {date.getDate()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tracking Legend */}

            <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-gray-50'}`}>
              <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>Tracking Legend</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                {[
                  {
                    title: "Menstruation (Hayd)",
                    colorClasses: [
                      { color: "bg-red-200", label: "Light" },
                      { color: "bg-red-400", label: "Medium" },
                      { color: "bg-red-600", label: "Heavy" },
                    ],
                  },
                  {
                    title: "Purity (Tuhr)",
                    colorClasses: [
                      { color: "bg-green-200", label: "Pure" },
                      { color: "bg-teal-300", label: "Ghusl Due" },
                      { color: "bg-teal-500", label: "Ghusl Done" },
                    ],
                  },
                  {
                    title: "Fertility",
                    colorClasses: [
                      { color: "bg-green-300", label: "Fertile Start" },
                      { color: "bg-yellow-400", label: "Ovulation" },
                      { color: "bg-green-500", label: "Peak Fertile" },
                    ],
                  },
                  {
                    title: "Other",
                    colorClasses: [
                      { color: "bg-orange-300", label: "Istihada" },
                      { color: "bg-purple-400", label: "Nifas" },
                      { color: "bg-gray-100", label: "Normal" },
                    ],
                  },
                ].map((section, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className={`font-medium ${settings.darkMode ? 'text-white' : 'text-gray-700'}`}>{section.title}</p>
                    {section.colorClasses.map((c, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className={`w-4 h-4 ${c.color} rounded-full`}></div>
                        <span className={`${settings.darkMode ? 'text-gray-300' : ''}`}>{c.label}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* <div className='flex justify-between'> */}

        <Button className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500"
          ref={triggerRef}
          onClick={handleOpenLogModal}
        >
          <Plus className="w-4 h-4 dark:text-white" />
          <span className='dark:text-white'>Log Entry</span>
        </Button>

        {/* <PredictionCalendar /> */}
      {/* </div> */}



      <Dialog open={isLogModalOpen} onOpenChange={setIsLogModalOpen}>
        <DialogTrigger asChild></DialogTrigger>

        <DialogContent className={`sm:max-w-md ${settings.darkMode ? 'bg-slate-900 text-white' : 'bg-white'} rounded-xl sm:rounded-xl md:rounded-xl xs:mt-52`}>
          <DialogHeader>
            <DialogTitle className={settings.darkMode ? 'text-white' : 'text-gray-900'}>Log Cycle Entry</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className={settings.darkMode ? 'text-white' : 'text-gray-900'}>Start Date</Label>
              <div className="relative">
                {!showDateInput ? (
                  <Button
                    type="button"
                    variant="outline"
                    className={`w-full justify-start text-left ${settings.darkMode ? 'bg-slate-800' : 'bg-purple-100'} hover:bg-purple-200`}
                    onClick={() => setShowDateInput(true)}
                  >
                    <Calendar className={`mr-2 h-4 w-4 ${settings.darkMode ? 'text-white' : 'text-gray-500'}`} />
                    {logDate ? format(logDate, "PPP") : <span>Pick start date</span>}
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      value={logDate ? format(logDate, "yyyy-MM-dd") : ""}
                      onChange={(e) => {
                        const [year, month, day] = e.target.value.split('-').map(Number);
                        setLogDate(new Date(year, month - 1, day));
                      }}
                      className={`w-full bg-transparent focus:outline-none ${settings.darkMode ? 'text-white' : 'text-gray-700'}`}
                      autoFocus
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDateInput(false)}
                    >
                      ✓
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className={settings.darkMode ? 'text-white' : 'text-gray-900'}>End Date</Label>
              <div className="relative">
                {!showEndDateInput ? (
                  <Button
                    type="button"
                    variant="outline"
                    className={`w-full justify-start text-left ${settings.darkMode ? 'bg-slate-800' : 'bg-purple-100'} hover:bg-purple-200`}
                    onClick={() => setShowEndDateInput(true)}
                  >
                    <Calendar className={`mr-2 h-4 w-4 ${settings.darkMode ? 'text-white' : 'text-gray-500'}`} />
                    {endDate ? format(endDate, "PPP") : <span>Pick end date</span>}
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
                      onChange={(e) => {
                        const [year, month, day] = e.target.value.split("-").map(Number);
                        setEndDate(new Date(year, month - 1, day));
                      }}
                      className={`w-full bg-transparent focus:outline-none ${settings.darkMode ? 'text-white' : 'text-gray-700'}`}
                      autoFocus
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowEndDateInput(false)}
                    >
                      ✓
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className={settings.darkMode ? 'text-white' : 'text-gray-900'}>Type</Label>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  className={`w-full justify-between text-left ${settings.darkMode ? 'bg-slate-800' : 'bg-purple-100'} hover:bg-purple-200`}
                  onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                >
                  {getLogTypeDisplay(logType)}
                  <ChevronDown className="w-4 h-4" />
                </Button>
                {showTypeDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setLogType('period');
                        setShowTypeDropdown(false);
                      }}
                    >
                      Menstruation (Hayd)
                    </div>
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setLogType('ghusl-completed');
                        setShowTypeDropdown(false);
                      }}
                    >
                      Ghusl Completed
                    </div>
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setLogType('purity');
                        setLogType('purity');

                        setShowTypeDropdown(false);
                      }}
                    >
                      Purity (Tuhr)
                    </div>
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setLogType('istihada-light');
                        setShowTypeDropdown(false);
                      }}
                    >
                      Irregular Bleeding (istihada-light)
                    </div>
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setLogType('istihada-medium');
                        setShowTypeDropdown(false);
                      }}
                    >
                      Irregular Bleeding (istihada-medium)
                    </div>
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setLogType('ovulation');
                        setShowTypeDropdown(false);
                      }}
                    >
                      Ovulation
                    </div>
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setLogType('fertile-start');
                        setShowTypeDropdown(false);
                      }}
                    >
                      Fertile Window - Start
                    </div>
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setLogType('fertile-peak');
                        setShowTypeDropdown(false);
                      }}
                    >
                      Fertile Window - Peak
                    </div>
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setLogType('fertile-end');
                        setShowTypeDropdown(false);
                      }}
                    >
                      Fertile Window - End
                    </div>
                  </div>
                )}
              </div>
            </div>

            {logType === 'period' && (
              <div className="space-y-2">
                <Label className={settings.darkMode ? 'text-white' : 'text-gray-900'}>Flow Intensity</Label>
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    className={`w-full justify-between text-left ${settings.darkMode ? 'bg-slate-800' : 'bg-purple-100'} hover:bg-purple-200`}
                    onClick={() => setShowIntensityDropdown(!showIntensityDropdown)}
                  >
                    {getLogIntensityDisplay(logIntensity)}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  {showIntensityDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50">
                      <div
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => {
                          setLogIntensity('period-light');
                          setShowIntensityDropdown(false);
                        }}
                      >
                        Light
                      </div>
                      <div
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => {
                          setLogIntensity('period-medium');
                          setShowIntensityDropdown(false);
                        }}
                      >
                        Medium
                      </div>
                      <div
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => {
                          setLogIntensity('period-heavy');
                          setShowIntensityDropdown(false);
                        }}
                      >
                        Heavy
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <Button onClick={handleLogEntry} disabled={!logDate || !logType} className={`flex-1 ${settings.darkMode ? 'bg-slate-800' : 'bg-purple-500'}`}>
                Save Entry
              </Button>
              <Button variant="outline" onClick={() => setIsLogModalOpen(false)} className={`flex-1 ${settings.darkMode ? 'text-white' : 'text-gray-500'}`}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>




      <Card className="relative overflow-hidden">
        <div className="absolute inset-0  from-purple-50 to-pink-50 dark:hidden"></div>
        <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

        <CardHeader className="relative z-10">
          <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
            <AlertCircle className="w-5 h-5" />
            Today's Islamic Guidance
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="space-y-3">
            <div className={`p-3 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-purple-100'}`}>
              <p className={`${settings.darkMode ? 'text-white' : 'text-purple-700'} font-medium mb-1`}>
                Current Status: Post-Menstrual
              </p>
              <p className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-600'} text-sm`}>
                {getIslamicGuidanceForDay('ghusl-required')}
              </p>
            </div>

            <div className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-purple-600'}`}>
              <p className="italic">
                "When one of you is menstruating, she should not pray until she becomes pure." - Sahih Bukhari
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default PeriodTracker;
