
import { useState, useEffect } from 'react';
import { Calendar, Heart, Baby, BookOpen, Users, User, Settings, Menu, X, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from "@/components/ui/use-toast";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  user: any;
  onAuthClick: () => void;
  isSubscribered: boolean | null;
  checkSubDate: boolean;
  freeDayTrial: boolean;
}

const Navigation = ({ activeSection, setActiveSection, user, onAuthClick, isSubscribered, checkSubDate, freeDayTrial }: NavigationProps) => {
  const navigate = useNavigate();
  const { getLocalizedText } = useLanguage();

  const navItems = [
    { id: 'home', label: getLocalizedText('home'), icon: Calendar },
    { id: 'tracker', label: getLocalizedText('tracker'), icon: Heart },
    { id: 'insights', label: getLocalizedText('insights'), icon: Baby },
    { id: 'ask-the-deen', label: getLocalizedText('ask-deen'), icon: BookOpen },
    { id: 'profile', label: getLocalizedText('settings'), icon: Settings },

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

  const handleButtonClick = () => {
    if (((isSubscribered === false || isSubscribered === null) && freeDayTrial === true) || checkSubDate === true) {
      setActiveSection('profile')

    } else {
      navigate('/social');
    }
  };

  // console.log('freeDayTrial', freeDayTrial);
  // console.log('checkSubDate', typeof checkSubDate)



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

  return (
    <>

      <nav className="shadow-lg bg-gradient-to-r from-lavender-600 to-lavender-800 dark:bg-slate-900 dark:from-none dark:to-none dark:bg-none dark:text-white">
        <div className="flex items-center justify-between py-3 px-4">

          <div className="flex  items-center justify-center space-x-3 w-full ">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex  flex-col items-center justify-center p-2 min-h-[50px] flex-1 max-w-[70px] ${isActive
                    ? "bg-lavender-100 text-lavender-800"
                    : "text-white hover:bg-lavender-700"
                    }`}
                  size="sm"
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="text-[9px] leading-none">{item.label}</span>
                </Button>
              );
            })}
          </div>
          {
            freeDayTrial === false ?
              <Button
                variant="ghost"
                onClick={handleButtonClick}
                className="flex flex-col items-center justify-center p-2 min-h-[50px] w-[60px] text-white hover:bg-lavender-700 ml-2"
                size="sm"
              >
                <Users className={`w-4 h-4 mb-1 ${!isSubscribered ? 'opacity-100' : 'opacity-100'}`} />

                <span className="text-[9px] leading-none">{getLocalizedText('community')}</span>
              </Button>
              :

              <Button
                variant="ghost"
                onClick={handleButtonClick}
                className="flex flex-col items-center justify-center p-2 min-h-[50px] w-[60px] text-white hover:bg-lavender-700 ml-2"
                size="sm"
              >
                {/* {  (( (isSubscribered === false || isSubscribered === null) && freeDayTrial === true) ||  checkSubDate === true ) ? <Lock className="w-4 h-4 mb-1 text-gray-500" /> : <Users className={`w-4 h-4 mb-1 ${!isSubscribered ? 'opacity-20' : 'opacity-100'}`} />} */}

                {
                  (
                    (
                      (isSubscribered === false || isSubscribered === null) && freeDayTrial === true
                    )
                    || checkSubDate
                  )
                    ? <Lock className="w-4 h-4 mb-1 text-gray-500" />
                    : <Users className={`w-4 h-4 mb-1 ${!isSubscribered ? 'opacity-20' : 'opacity-100'}`} />
                }
                <span className="text-[9px] leading-none">{getLocalizedText('community')}</span>
              </Button>

          }




        </div>
      </nav>
    </>

  );
};

export default Navigation;
