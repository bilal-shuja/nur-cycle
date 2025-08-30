import { useState, useEffect } from 'react'
import { Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getLocalizedText } = useLanguage();

  // Check if we're on the community/social page
  const isCommunityPage = location.pathname === '/social';

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

  return (
    <>


      <header className={`shadow-sm border-b ${isCommunityPage ? 'sticky top-0 z-50' : ''} ${settings.darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                size="icon"
              >
                <Home className={`w-5 h-5 ${settings.darkMode ? 'text-white' : ''}`} />
              </Button>
              <h1 className={`text-2xl font-bold bg-gradient-to-r from-lavender-700 via-lavender-500 to-lavender-800 bg-clip-text text-transparent drop-shadow-lg flex items-center ${settings.darkMode ? 'text-white' : ''}`}>
                <span>{getLocalizedText('footer.community')}</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

    </>
  )
}

export default Header