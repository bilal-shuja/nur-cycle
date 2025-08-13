
import { useState, useEffect, useRef } from 'react';
import { ChevronRight, X, BarChart3, RefreshCw, Settings, Shield, Bell, HelpCircle, Info, FileText, Clock, Ban, ShieldX } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import CycleOvulationSettings from './settings/CycleOvulationSettings';
import AppSettings from './settings/AppSettings';
import AboutSection from './settings/AboutSection';
import PrivacySettings from './settings/PrivacySettings';
import GraphsReports from './settings/GraphsReports';
import TermsConditions from './settings/TermsConditions';
import HelpSection from './settings/HelpSection';

import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StripeCheckout from './StripeCheckout';
import { createClient } from "@supabase/supabase-js";
const supabase = createClient('https://ezlwhepcpodvegoqppro.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6bHdoZXBjcG9kdmVnb3FwcHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NDQwMDAsImV4cCI6MjA2NjEyMDAwMH0.31nqkGx5JNUaNKS9CfBnzO8-8stK94rome3oLMja8uM');
interface SettingsPageProps {
  onClose?: () => void;
  isSubscribered: boolean;
  checkSubDate: boolean;
  activeSection: string;
  showExpiryWarning: boolean
}

const SettingsPage = ({ onClose, isSubscribered, checkSubDate, activeSection, showExpiryWarning }: SettingsPageProps) => {
  const [currentView, setCurrentView] = useState<'main' | 'cycle-ovulation' | 'app-settings' | 'about' | 'privacy-settings' | 'graphs-reports' | 'terms-conditions' | 'help'>('main');
  const { getLocalizedText } = useLanguage();
  // const [showAlert, setShowAlert] = useState<boolean | null>(false);

  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(false);

  const [isCancelSub, setIsCancelSub] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerRef = useRef(null);
  const cancelRef = useRef(null);



  // console.log('isSubscribered', isSubscribered)

  // console.log("checkSubDate", checkSubDate)

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


  const settingsItems = [
    {
      id: 'graphs-reports',
      title: getLocalizedText('graphs.reports'),
      icon: BarChart3,
      description: getLocalizedText('graphs.reports.desc')
    },
    {
      id: 'cycle-ovulation',
      title: getLocalizedText('cycle.ovulation'),
      icon: RefreshCw,
      description: getLocalizedText('cycle.ovulation.desc')
    },
    {
      id: 'app-settings',
      title: getLocalizedText('app.settings'),
      icon: Settings,
      description: getLocalizedText('app.settings.desc')
    },
    {
      id: 'privacy-settings',
      title: getLocalizedText('privacy.settings'),
      icon: Shield,
      description: getLocalizedText('privacy.settings.desc')
    },
    {
      id: 'terms-conditions',
      title: getLocalizedText('terms.conditions'),
      icon: FileText,
      description: getLocalizedText('terms.conditions.desc')
    },
    {
      id: 'help',
      title: getLocalizedText('help'),
      icon: HelpCircle,
      description: getLocalizedText('help.desc')
    },
    {
      id: 'about',
      title: getLocalizedText('about'),
      icon: Info,
      description: getLocalizedText('about.desc')
    }
  ];

  const handleSettingClick = (settingId: string) => {
    if (settingId === 'graphs-reports') {
      setCurrentView('graphs-reports');
    } else if (settingId === 'cycle-ovulation') {
      setCurrentView('cycle-ovulation');
    } else if (settingId === 'app-settings') {
      setCurrentView('app-settings');
    } else if (settingId === 'about') {
      setCurrentView('about');
    } else if (settingId === 'privacy-settings') {
      setCurrentView('privacy-settings');
    } else if (settingId === 'terms-conditions') {
      setCurrentView('terms-conditions');
    } else if (settingId === 'help') {
      setCurrentView('help');
    }
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  if (currentView === 'graphs-reports') {
    return <GraphsReports onBack={handleBackToMain} />;
  }

  if (currentView === 'cycle-ovulation') {
    return <CycleOvulationSettings onBack={handleBackToMain} />;
  }

  if (currentView === 'app-settings') {
    return <AppSettings onBack={handleBackToMain} />;
  }

  if (currentView === 'about') {
    return <AboutSection onBack={handleBackToMain} />;
  }

  if (currentView === 'privacy-settings') {
    return <PrivacySettings onBack={handleBackToMain} />;
  }

  if (currentView === 'terms-conditions') {
    return <TermsConditions onBack={handleBackToMain} />;
  }

  if (currentView === 'help') {
    return <HelpSection onBack={handleBackToMain} />;
  }

  const handleOpen = () => {
    triggerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setIsPaymentMethodOpen(true), 300);
  };


  const handleOpenCancel = () => {
    cancelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setIsCancelSub(true), 300);

  }

const handleCancel = async () => {
  try {
    setLoading(true);

    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) throw new Error("Not authenticated");

    const { error } = await supabase
      .from("subscribers")
      .delete()
      .eq("user_id", user.id);

    if (error) throw error;
    toast({
      title: "Heads up!",
      description: "Your subscription has been cancelled.",
      variant: "destructive",
      className: "bg-green-600 text-white border border-green-700",
    });

    setTimeout(() => {
      window.location.reload();
    }, 3000);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error(e);
    // show error toast
    toast({
      title: "Error",
      description: e.message || "Something went wrong.",
      variant: "destructive",
      className: "bg-red-600 text-white border border-red-700",
    });
  } finally {
    setLoading(false);
  }
};

  // const UpgradeFeature = () => {
  //   toast({
  //     title: "Heads up!",
  //     description: "This feature requires premium access.",
  //   });
  // };
  return (
    <div className="min-h-screen dark:bg-slate-800">


      <div className={` overflow-hidden card-3d sticky top-0 z-10`}>
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border-b border-slate-700' : 'bg-white border-b border-gray-200'}`}></div>

        <div className="relative z-10 flex items-center justify-between p-4">
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className={`rounded-full button-3d ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}
            >
              <X className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`} />
            </Button>
          )}

          <h1 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {getLocalizedText('settings')}
          </h1>

          <div>

          </div>

          <div className="w-10"></div>
        </div>
      </div>


      {/* Premium Banner - Updated to lavender ombre */}
      <div className="p-4">

        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-lavender-400 to-purple-500 border-lavender-300'} `}></div>

          <CardContent className="relative z-10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-semibold text-sm ${settings.darkMode ? 'text-white' : 'text-black'}`}>
                  {
                    isSubscribered === true && checkSubDate === false ? getLocalizedText('cancel.subscription.anytime') : getLocalizedText('premium.title')
                  }
                </h3>
                <p className={`text-xs mt-1 ${settings.darkMode ? 'text-gray-300' : 'text-black opacity-90'}`}>
                  {
                    isSubscribered === true  && checkSubDate === false ? "" : getLocalizedText('premium.desc')
                  }

                </p>
              </div>

              {
                isSubscribered === true && checkSubDate === false ?
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleOpenCancel}
                    ref={cancelRef}
                    className={`${settings.darkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600'
                      : 'bg-white hover:bg-gray-100 text-white border border-gray-200'} text-xs px-3 py-1 rounded-full button-3d`}
                  >
                    {getLocalizedText('cancel')}
                  </Button>
                  :
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleOpen}
                    ref={triggerRef}
                    className={`${settings.darkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600'
                      : 'bg-white hover:bg-gray-100 text-white border border-gray-200'} text-xs px-3 py-1 rounded-full button-3d`}
                  >
                    {getLocalizedText('upgrade')}
                  </Button>
              }



            </div>
          </CardContent>
        </Card>
      </div>



      {/* Settings List */}
      <div className="px-4 space-y-1">
        {settingsItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card
              key={item.id}
              onClick={() => handleSettingClick(item.id)}
              className="relative overflow-hidden card-3d cursor-pointer transition-colors"
            >
              <div
                className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
              ></div>

              <CardContent className="relative z-10 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center circular-3d ${settings.darkMode ? 'bg-slate-800' : 'bg-lavender-ombre-light'}`}>
                      <IconComponent className={`w-4 h-4 ${settings.darkMode ? 'text-white' : 'text-white'}`} />
                    </div>
                    <div>
                      <h3 className={`font-medium text-sm ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={isPaymentMethodOpen} onOpenChange={setIsPaymentMethodOpen}>

        <DialogContent
          className={`sm:max-w-md p-6 rounded-xl sm:rounded-xl md:rounded-xl ${settings.darkMode ? 'bg-slate-900 text-white' : 'bg-white'
            }`}
          style={{ marginTop:'-20em' }}
        >
          <DialogHeader>
            <DialogTitle className={`flex items-center justify-center ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
              {getLocalizedText('Subscription')}
              <Bell className="ml-2 text-lavender-800" />
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            {/* Subscription details */}
            <div className="space-y-2">
              <ul className="text-center">
                <div className={`flex items-center justify-center mb-4  ${settings.darkMode ? 'text-white' : 'text-gray-900'} `}>
                  <h2 className="text-3xl font-bold me-1"> £5.99 </h2> {getLocalizedText('per.month')}
                </div>

                <div className={`flex ms-3 items-center justify-center  ${settings.darkMode ? 'text-white' : 'text-gray-900'} `}>
                  <p className="text-xs"> {getLocalizedText('cancel.subscription.anytime')} </p>
                </div>


              </ul>
            </div>



            <div className="flex space-x-2 pt-4">


              <StripeCheckout isSubscribered={isSubscribered} checkSubDate={checkSubDate} showExpiryWarning={showExpiryWarning} />

              <Button
                variant="outline"
                onClick={() => setIsPaymentMethodOpen(false)}
                className="flex-1"
              >
                {getLocalizedText('cancel')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>


      <Dialog open={isCancelSub} onOpenChange={setIsCancelSub}>

        <DialogContent
          className={`sm:max-w-md p-6 rounded-xl sm:rounded-xl md:rounded-xl ${settings.darkMode ? 'bg-slate-900 text-white' : 'bg-white'
            }`}
          style={{ marginTop: '-20em' }}
        >
          <DialogHeader>
            <DialogTitle className={`flex items-center justify-center ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            {/* Subscription details */}
            <div className="space-y-2">
              <ul className="text-center">
                <div className={`flex items-center justify-center mb-4  ${settings.darkMode ? 'text-white' : 'text-gray-900'} `}>
                  <div className='flex items-center'>
                    <span>  <strong>{getLocalizedText('are.you.sure')}</strong><br /> {getLocalizedText('you.want.to.cancel.subscription')} </span>
                  </div>
                </div>
              </ul>
            </div>
            <div className="flex space-x-2 pt-4">


              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
                disabled={loading}
              >
                {getLocalizedText('cancel')}
              </Button>

              <Button
                variant="outline"
                onClick={() => setIsCancelSub(false)}
                className="flex-1"
              >
                {getLocalizedText('close')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Copyright Footer */}
      <div className={`text-center py-4 px-4 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
        © 2025 {getLocalizedText('footer.copyright')}
      </div>

      {/* Bottom spacing */}
      <div className="h-6" />
    </div>
  );
};

export default SettingsPage;
