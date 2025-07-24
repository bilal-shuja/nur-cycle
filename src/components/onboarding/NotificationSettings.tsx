
import React, { useState , useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Moon, Droplets, Heart, Book } from 'lucide-react';
import { OnboardingData } from './OnboardingFlow';
import { useNavigate } from 'react-router-dom';

interface NotificationSettingsProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onPrevious?: () => void;
}


const NotificationSettings = ({ data, onNext, onPrevious }: NotificationSettingsProps) => {
  const [notifications, setNotifications] = useState(data.notifications);
    const navigate = useNavigate();


  const notificationOptions = [
    {
      id: 'worshipAlerts',
      title: 'Worship Alerts',
      description: 'Reminders about salah and fasting exemptions during menstruation',
      icon: Moon,
      color: 'text-purple-600'
    },
    {
      id: 'ghusalReminders',
      title: 'Ghusl Reminders',
      description: 'Gentle reminders when you need to perform ghusl',
      icon: Droplets,
      color: 'text-blue-600'
    },
    {
      id: 'fertilityWindow',
      title: 'Fertility Window',
      description: 'Notifications about your fertile days and ovulation',
      icon: Heart,
      color: 'text-red-600'
    },
    {
      id: 'duaPrompts',
      title: 'Daily Duas',
      description: 'Beautiful duas and Islamic reminders throughout your cycle',
      icon: Book,
      color: 'text-teal-600'
    }
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

  const updateNotification = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNext = () => {
    onNext({ notifications });
     navigate('/auth')
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          {/* <Bell className="w-5 h-5 text-purple-600" />
          <p className="text-gray-600">
            Choose which notifications you'd like to receive
          </p> */}
           <Bell className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-purple-600'}`} />

    {/* Text with conditional color */}
    <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      Choose which notifications you'd like to receive
    </p>
        </div>
      </div>

      {/* <Card>
        <CardContent className="p-6 space-y-4">
          {notificationOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div key={option.id} className="flex items-center justify-between py-2">
                <div className="flex items-start space-x-3 flex-1">
                  <Icon className={`w-5 h-5 mt-0.5 ${option.color}`} />
                  <div className="space-y-1">
                    <Label htmlFor={option.id} className="text-base font-medium cursor-pointer">
                      {option.title}
                    </Label>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                </div>
                <Switch
                  id={option.id}
                  checked={notifications[option.id as keyof typeof notifications]}
                  onCheckedChange={(checked) => updateNotification(option.id, checked)}
                   className="text-purple-600"
                />
              </div>
            );
          })}
        </CardContent>
      </Card> */}

      <Card className="relative overflow-hidden card-3d">
  {/* Overlay layer for dark mode */}
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-500 to-purple-700'}`}></div>

  <CardContent className="relative z-10 p-6 space-y-4">
    {notificationOptions.map((option) => {
      const Icon = option.icon;
      return (
        <div key={option.id} className={`flex items-center justify-between py-2 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <div className="flex items-start space-x-3 flex-1">
            {/* Icon with conditional color */}
            <Icon className={`w-5 h-5 mt-0.5 ${settings.darkMode ? 'text-white' : option.color}`} />
            <div className="space-y-1">
              {/* Label with conditional text color */}
              <Label 
                htmlFor={option.id} 
                className={`text-base font-medium cursor-pointer ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}
              >
                {option.title}
              </Label>
              <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {option.description}
              </p>
            </div>
          </div>
          {/* Switch with conditional color */}
          <Switch
            id={option.id}
            checked={notifications[option.id as keyof typeof notifications]}
            onCheckedChange={(checked) => updateNotification(option.id, checked)}
            className={`${settings.darkMode ? 'bg-slate-600' : 'bg-purple-600 data-[state=unchecked]:bg-slate-400'}`}
          />
        </div>
      );
    })}
  </CardContent>
</Card>


      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-amber-800 text-sm">
          💡 You can adjust these notification preferences anytime in your profile settings.
        </p>
      </div>

      <div className="flex gap-3 justify-between">
        {onPrevious && (
          <Button variant="outline" onClick={onPrevious}>
            Previous
          </Button>
        )}
        <Button 
          onClick={handleNext}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 ml-auto"
        >
          Complete Setup
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
