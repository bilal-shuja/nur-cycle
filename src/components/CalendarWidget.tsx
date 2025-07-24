
import { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useLanguage } from '@/contexts/LanguageContext';

interface CalendarWidgetProps {
  onNavigateToTracker?: () => void;
  onNavigateToCalendar?: () => void;
}

const CalendarWidget = ({ onNavigateToTracker, onNavigateToCalendar }: CalendarWidgetProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logDate, setLogDate] = useState<Date>(new Date());
  const [logType, setLogType] = useState<string>('');
  const [logIntensity, setLogIntensity] = useState<string>('');
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


  const [view, setView] = useState<'day' | 'week'>('day');

  const { getLocalizedText } = useLanguage();


  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
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

  const isPeriodDay = (date: Date) => {
    // Mock period days - replace with actual logic
    const day = date.getDate();
    return day >= 15 && day <= 19;
  };

  const isFertileDay = (date: Date) => {
    // Mock fertile days - replace with actual logic
    const day = date.getDate();
    return day >= 10 && day <= 16;
  };


  useEffect(() => {
    // Load saved language preference

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



  }, []);

  return (
    <>


      {/* <Card className="bg-gradient-to-br from-purple-50 to-purple-100 relative overflow-hidden dark:bg-black dark:text-white"> */}

      <Card className="relative overflow-hidden text-black dark:text-white p-4 shadow-lg">
  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:hidden"></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900 dark:text-white"></div>
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="animate-pulse absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full"></div>
          <div className="animate-pulse absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full animation-delay-500"></div>
          <div className="animate-pulse absolute top-1/2 left-1/2 w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full animation-delay-1000"></div>
        </div>

        <CardHeader>
          <div className="flex items-center justify-between relative z-10">
            <CardTitle className="flex items-center text-lg gap-2 ">
              <Calendar className="w-5 h-7  text-purple-600  " />
              {getLocalizedText("overview.today")}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={view === 'day' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('day')}
                className="text-xs bg-gradient-to-r from-purple-500 to-purple-600"
              >
                {getLocalizedText("label.day")}
              </Button>
              <Button
                variant={view === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('week')}
                className="text-xs"
              >
                {getLocalizedText("label.week")}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10 ">
          {view === 'day' ? (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{formatDate(currentDate)}</h3>
                <p className="text-sm text-gray-600 mt-1 dark:text-white">{getLocalizedText("label.cycleDay")} 21</p>
              </div>

              <div className="flex justify-center space-x-2">
                {isPeriodDay(currentDate) && (
                  <Badge className="bg-red-100 text-red-800">{getLocalizedText("label.periodDay")} </Badge>
                )}
                {isFertileDay(currentDate) && (
                  <Badge className="bg-green-100 text-green-800">{getLocalizedText("label.fertileWindow")}</Badge>
                )}
              </div>

              <div className={`rounded-lg p-4 text-center border ${settings.darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gradient-to-r from-purple-50 via-white to-purple-50 border-purple-100 text-purple-800'}`}>
                <div className="flex items-center justify-center mb-2" >
                  <div className="w-12 h-12 bg-gradient-to-br from-lavender-300 via-lavender-500 to-lavender-700 rounded-full flex items-center justify-center" style={{ marginTop: "-1em" }}>
                    <span className="text-white text-xl" >🌙</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2 dark:text-white">{getLocalizedText("label.lastPeriodStarted")}</p>
                <p className="font-semibold text-purple-800 dark:text-white">June 15, 2024 (6 days ago)</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-1 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                {getWeekDays().map((date, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg text-sm ${date.toDateString() === currentDate.toDateString()
                        ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white'
                        : isPeriodDay(date)
                          ? 'bg-red-100 text-red-800'
                          : isFertileDay(date)
                            ? 'bg-green-100 text-green-800'
                            : 'hover:bg-purple-50'
                      }`}
                  >
                    {date.getDate()}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <Button
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              onClick={onNavigateToCalendar}
            >
              <Plus className="w-4 h-4 mr-2" />
              {getLocalizedText("action.logPeriod")}
            </Button>
            <Button
              variant="outline"
              className="flex-1 hover:bg-purple-50 border-purple-200"
              onClick={onNavigateToCalendar}
            >
              {getLocalizedText("action.viewFullCalendar")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Period Log Modal */}
      <Dialog open={isLogModalOpen} onOpenChange={setIsLogModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{getLocalizedText("action.logPeriod")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={logDate.toISOString().split('T')[0]}
                onChange={(e) => setLogDate(new Date(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select value={logType} onValueChange={setLogType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="period">Period</SelectItem>
                  <SelectItem value="spotting">Spotting</SelectItem>
                  <SelectItem value="ovulation">Ovulation</SelectItem>
                  <SelectItem value="fertile">Fertile</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="intensity" className="text-right">
                Intensity
              </Label>
              <Select value={logIntensity} onValueChange={setLogIntensity}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select intensity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="heavy">Heavy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsLogModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                // Here you would typically save the log entry
                console.log('Logging period entry:', { logDate, logType, logIntensity });
                setIsLogModalOpen(false);
                setLogType('');
                setLogIntensity('');
              }}
              className="bg-gradient-to-r from-purple-500 to-purple-600"
            >
              Save Entry
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>

  );
};

export default CalendarWidget;
