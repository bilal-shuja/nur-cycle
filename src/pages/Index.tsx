
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Tracker from '@/components/Tracker';
import HealthInsights from '@/components/HealthInsights';
import IslamicGuidance from '@/components/IslamicGuidance';
import AuthModal from '@/components/AuthModal';
import CalendarWidget from '@/components/CalendarWidget';
import DailyInsights from '@/components/DailyInsights';
import CycleStats from '@/components/CycleStats';
import CycleChart from '@/components/CycleChart';
import OnboardingFlow, { OnboardingData } from '@/components/onboarding/OnboardingFlow';
import ProfileSettings from '@/components/ProfileSettings';
import PrePeriodPreparation from '@/components/PrePeriodPreparation';
import PeriodTracker from '@/components/PeriodTracker';
// import { Button } from "@/components/ui/button";

import { TriangleAlert, Lock, CalendarDays } from 'lucide-react';
import StripeCheckout from '@/components/StripeCheckout';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://ezlwhepcpodvegoqppro.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6bHdoZXBjcG9kdmVnb3FwcHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NDQwMDAsImV4cCI6MjA2NjEyMDAwMH0.31nqkGx5JNUaNKS9CfBnzO8-8stK94rome3oLMja8uM');

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const [userPreferences, setUserPreferences] = useState<OnboardingData | null>(null);
  const [userMetadata, setUserMetadata] = useState<null>(null);

  const [serverTime, setServerTime] = useState(null);
  const [showExpiryWarning, setShowExpiryWarning] = useState(false);

  const [checkSubDate, setCheckSubDate] = useState(null);

  const [subscribers, setSubscribers] = useState([]);

  const [userProfile, setUserProfile] = useState<any>(null);

  const [freeDayTrial, setFreeDayTrial] = useState(null);

  useEffect(() => {
    async function fetchServerTime() {
      const { data, error } = await supabase.rpc('get_server_time');
      if (!error) setServerTime(data);
    }
    fetchServerTime();
  }, []);



  useEffect(() => {
    const fetchSubscribers = async () => {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*');

      if (error) {
        console.error('Error fetching subscribers:', error.message);
      } else {
        setSubscribers(data);
      }

    };

    fetchSubscribers();
  }, []);


  useEffect(() => {
    const fetchMyProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) console.error(error.message);
      else setUserProfile(data);
    };

    fetchMyProfile();
  }, []);



  const userRegisterDateTime = userProfile && userProfile?.created_at;

  const isSubscribered: boolean | null = Array.isArray(subscribers)
    ? (subscribers.length === 0
      ? null
      : subscribers.some(sub => sub.subscribed))
    : null;


  const getSubscriptionDate = subscribers && subscribers?.map((sub) => sub.subscription_end)

  const getSubDateOnly = getSubscriptionDate && getSubscriptionDate[0]?.split('T')[0];


  const getServerDateOnly = serverTime ? serverTime.split('T')[0] : "";


  const getSubscriptionDateAndTime = getSubscriptionDate[0];
  const getServerDateAndTime = serverTime;



  useEffect(() => {
    if (!userRegisterDateTime || !getServerDateAndTime) return;

    const toJsDate = (s: string) => new Date(s.replace(/(\.\d{3})\d+/, '$1'));

    const userDate = toJsDate(userRegisterDateTime);
    const serverDate = toJsDate(getServerDateAndTime);
    const diffMs = serverDate.getTime() - userDate.getTime();

    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays >= 3) {
      setFreeDayTrial(true);
    } else {
      setFreeDayTrial(false);
    }
  }, [userRegisterDateTime, getServerDateAndTime]);



  function parseISO(iso?: string | null): Date | null {
    if (!iso) return null;
    const d = new Date(iso);
    return isNaN(d.getTime()) ? null : d;
  }

  function addMonthsUTC(date: Date, months: number): Date {
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth();
    const day = date.getUTCDate();
    const h = date.getUTCHours(), mi = date.getUTCMinutes(), s = date.getUTCSeconds(), ms = date.getUTCMilliseconds();

    // first of target month
    const tmp = new Date(Date.UTC(y, m + months, 1, h, mi, s, ms));
    // clamp day
    const daysInTarget = new Date(Date.UTC(tmp.getUTCFullYear(), tmp.getUTCMonth() + 1, 0)).getUTCDate();
    tmp.setUTCDate(Math.min(day, daysInTarget));
    return tmp;
  }

  function shouldDisable(subscriptionISO?: string | null, serverISO?: string | null): boolean {
    const sub = parseISO(subscriptionISO);
    const now = parseISO(serverISO);
    if (!sub || !now) {
      console.warn('Invalid/empty dates', { subscriptionISO, serverISO });
      return false; // ya jo tumhara default ho
    }
    const renewal = addMonthsUTC(sub, 1);
    // Compare in UTC (milliseconds)
    return now.getTime() >= renewal.getTime();
  }

  // --- React usage ---
  useEffect(() => {
    if (!getSubscriptionDateAndTime || !getServerDateAndTime) return;

    const disable = shouldDisable(getSubscriptionDateAndTime, getServerDateAndTime);
    setCheckSubDate(disable);

    // Debug in UTC to avoid "local display" confusion

  }, [getSubscriptionDateAndTime, getServerDateAndTime]);




  useEffect(() => {
    // Ensure both dates exist
    if (!getSubDateOnly || !getServerDateOnly) return;

    // Convert subscription start date to renewal date (add 30 days)
    const subscriptionStartDate = new Date(getSubDateOnly);

    // Calculate renewal date (assuming 30-day subscription cycle)
    const renewalDate = new Date(subscriptionStartDate);
    renewalDate.setDate(subscriptionStartDate.getDate() + 30);

    const serverDate = new Date(getServerDateOnly);



    // Calculate difference between renewal date and current date
    const timeDifference = renewalDate.getTime() - serverDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    // console.log("Days until renewal:", daysDifference);


    if (daysDifference < 0) {
      // Subscription has already expired
      const expiredDays = Math.abs(daysDifference);
      // console.log(`Subscription expired ${expiredDays} day(s) ago`);
      setShowExpiryWarning(true);
      // Optional: You might want to redirect to payment page or show different message
    } else if (daysDifference === 0) {
      // Subscription expires today
      // console.log('Subscription expires today!');
      setShowExpiryWarning(true);
    } else if (daysDifference <= 3) {
      // Subscription expires within 3 days
      // console.log(`Subscription expires in ${daysDifference} day(s)`);
      setShowExpiryWarning(true);
    } else {
      // Subscription is active and safe (more than 3 days remaining)
      // console.log(`Subscription is active - ${daysDifference} days remaining`);
      setShowExpiryWarning(false);
    }

  }, [getSubDateOnly, getServerDateOnly]);




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

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('nurcycle-onboarding-completed');
    const storedPreferences = localStorage.getItem('nurcycle-user-preferences');

    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    } else if (storedPreferences) {
      setUserPreferences(JSON.parse(storedPreferences));
    }
  }, []);




  useEffect(() => {

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sb-ezlwhepcpodvegoqppro-auth-token');
      if (stored) {
        try {
          const userMetadataParsed = JSON.parse(stored);
          setUserMetadata(userMetadataParsed?.user?.user_metadata?.full_name);
        } catch (err) {
          return err;
        }
      }
    }
  }, []);



  const handleOnboardingComplete = (data: OnboardingData) => {
    setUserPreferences(data);
    setShowOnboarding(false);
    localStorage.setItem('nurcycle-onboarding-completed', 'true');
    localStorage.setItem('nurcycle-user-preferences', JSON.stringify(data));
  };

  const handleSkipOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('nurcycle-onboarding-completed', 'true');
  };

  const [splashEnded, setSplashEnded] = useState(false);

 if (!userMetadata && showOnboarding && !splashEnded) {
  return (

  <video
    src="/lovable-uploads/splash.mp4"
    autoPlay
    muted
    playsInline
    className="w-screen h-screen object-contain bg-[#ddcce7]"
    onEnded={() => setSplashEnded(true)}
  />
  );
}

  if (!userMetadata && showOnboarding) {
    return (
      <OnboardingFlow
        onComplete={handleOnboardingComplete}
        onSkip={handleSkipOnboarding}
      />
    
    );
  }




  const renderActiveSection = () => {


    switch (activeSection) {
      case 'tracker':
        return <Tracker setActiveSection={setActiveSection} isSubscribered={isSubscribered} checkSubDate={checkSubDate} freeDayTrial={freeDayTrial} />;
      case 'insights':
        return <HealthInsights setActiveSection={setActiveSection} isSubscribered={isSubscribered} checkSubDate={checkSubDate} freeDayTrial={freeDayTrial} />;
      case 'ask-the-deen':
        return <IslamicGuidance setActiveSection={setActiveSection} isSubscribered={isSubscribered} checkSubDate={checkSubDate} freeDayTrial={freeDayTrial} />;
      case 'profile':
        return <ProfileSettings userPreferences={userPreferences} onUpdatePreferences={setUserPreferences} isSubscribered={isSubscribered} checkSubDate={checkSubDate} activeSection={activeSection} showExpiryWarning={showExpiryWarning} />;
      case 'calendar':
        return <PeriodTracker />;
      default:
        return <Dashboard setActiveSection={setActiveSection} userPreferences={userPreferences} userMetadata={userMetadata} isSubscribered={isSubscribered} showExpiryWarning={showExpiryWarning} checkSubDate={checkSubDate} freeDayTrial={freeDayTrial} />;
    }
  };

  return (

    <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-lavender-50 to-lavender-200'}`}>
      <main className="container mx-auto px-4 py-6 max-w-md pb-10">
        {renderActiveSection()}
      </main>

      {/* Fixed Navigation - Always visible */}
      <div className={`sticky bottom-0 left-0 right-0 z-50 ${settings.darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-t border-lavender-200'} shadow-md`}>
        <Navigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          user={user}
          onAuthClick={() => setIsAuthModalOpen(true)}
          checkSubDate={checkSubDate}
          isSubscribered={isSubscribered}

          freeDayTrial={freeDayTrial}

        />
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuth={setUser}
      />
    </div>
  );
};

const Dashboard = ({ setActiveSection, userPreferences, userMetadata, isSubscribered, showExpiryWarning, checkSubDate, freeDayTrial }: {
  setActiveSection: (section: string) => void;
  userPreferences: OnboardingData | null;
  userMetadata: any;
  isSubscribered: boolean;
  showExpiryWarning: boolean;
  checkSubDate: boolean;
  freeDayTrial: boolean;
}) => {
  const { getLocalizedText } = useLanguage();

  const userName = userMetadata || 'Sister';


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
    <div className="space-y-6">

      <div className={`text-center relative overflow-hidden ${settings.darkMode ? 'bg-slate-900 text-white' : ''}`}>
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className={`animate-pulse absolute top-0 left-0 w-20 h-20 rounded-full ${settings.darkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-lavender-300 to-lavender-500'}`}></div>
          <div className={`animate-pulse absolute top-10 right-0 w-16 h-16 rounded-full animation-delay-500 ${settings.darkMode ? 'bg-slate-700' : 'bg-gradient-to-br from-lavender-400 to-lavender-600'}`}></div>
          <div className={`animate-pulse absolute bottom-0 left-1/2 w-12 h-12 rounded-full animation-delay-1000 ${settings.darkMode ? 'bg-slate-600' : 'bg-gradient-to-br from-lavender-500 to-lavender-700'}`}></div>
        </div>

        <div className="relative z-10">
          {/* Main title with logo at the end - Made more vibrant */}
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-lavender-700 via-lavender-500 to-lavender-800 bg-clip-text text-transparent flex items-center justify-center drop-shadow-lg">
            <span>{getLocalizedText('app.title')}</span>
            <img
              src="/lovable-uploads/9ab8e7ae-1fa2-4cf6-bad2-a54d6582474b.png"
              alt="NurCycle Logo"
              className="w-10 h-10 drop-shadow-md"
              style={{ marginLeft: '-0.3em' }}
            />
          </h1>
          <h2 className={`text-xl font-semibold mb-4 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
            {getLocalizedText('greeting')}, {userName}! 🌸
          </h2>
          <p className={`text-base px-4 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {getLocalizedText('welcome.subtitle')}
          </p>
          {userPreferences?.madhhab && userPreferences.madhhab !== 'unknown' && (
            <p className={`${settings.darkMode ? 'text-purple-400' : 'text-lavender-600'} text-sm mt-2`}>
              {getLocalizedText('welcome.madhhab.following', { madhhab: userPreferences.madhhab })}
            </p>
          )}
        </div>
      </div>



      {/* Calendar Widget */}
      <CalendarWidget onNavigateToTracker={() => setActiveSection('tracker')} onNavigateToCalendar={() => setActiveSection('calendar')} />

      {
        freeDayTrial === true && (isSubscribered === false || isSubscribered === null) ?
          <Card className="relative overflow-hidden card-3d">
            {/* Light mode bg */}
            <div className="absolute inset-0 bg-lavender-100 dark:hidden"></div>
            {/* Dark mode bg */}
            <div className="absolute inset-0 hidden dark:block bg-slate-800"></div>

            {/* Yellow animated circles for light mode */}
            <div className="absolute inset-0 opacity-20 ">
              <div className="animate-pulse absolute top-0 right-0 w-16 h-16 bg-lavender-300 rounded-full"></div>
              <div className="animate-pulse absolute bottom-0 left-0 w-12 h-12 bg-lavender-400 rounded-full animation-delay-700"></div>
            </div>



            <CardContent className="p-6 flex  items-center justify-center gap-2 relative z-10">
              <TriangleAlert className='h-10 w-20 text-red-500' />
              <h2 className={`text-xs font-bold text-deep-lavender ${settings.darkMode ? 'text-white' : 'text-slate-700'}`}>
                {getLocalizedText('your.3.days.trial.ended.subscribe.now')}
              </h2>
{/* 
              <Button
                onClick={() => {
                  setActiveSection('profile')
                }}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white"
              >
                {getLocalizedText('subscribe.now')}
              </Button> */}

              <StripeCheckout isSubscribered={isSubscribered} checkSubDate={checkSubDate} showExpiryWarning={showExpiryWarning} />
              
              
            </CardContent>

          </Card>
          :
          ""
      }


      {
        freeDayTrial === false && (isSubscribered === false || isSubscribered === null) ?

          <Card className="relative overflow-hidden card-3d">
            {/* Light mode bg */}
            <div className="absolute inset-0 bg-lavender-100 dark:hidden"></div>
            {/* Dark mode bg */}
            <div className="absolute inset-0 hidden dark:block bg-slate-800"></div>

            {/* Yellow animated circles for light mode */}
            <div className="absolute inset-0 opacity-20 dark:hidden">
              <div className="animate-pulse absolute top-0 right-0 w-16 h-16 bg-lavender-300 rounded-full"></div>
              <div className="animate-pulse absolute bottom-0 left-0 w-12 h-12 bg-lavender-400 rounded-full animation-delay-700"></div>
            </div>



            <CardContent className="p-6 flex  items-center justify-center gap-2 relative z-10">
              <CalendarDays className='h-10 w-11 text-yellow-500' />
              <h2 className={`text-xs font-bold text-deep-lavender ${settings.darkMode ? 'text-white' : 'text-slate-700'}`}>
                {getLocalizedText(`youre.on.3.days.free.trial.subscribe.before.end`)}
              </h2>
              {/* <Button
                onClick={() => {
                  setActiveSection('profile')
                }}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white"
              >
                {getLocalizedText('subscribe.now')}
              </Button> */}
              <StripeCheckout isSubscribered={isSubscribered} checkSubDate={checkSubDate} showExpiryWarning={showExpiryWarning} />

            </CardContent>

          </Card>

          :
          ""
      }


      {showExpiryWarning === true && checkSubDate === false ?

        (
          <Card className="relative overflow-hidden card-3d">
            {/* Light mode bg */}
            <div className="absolute inset-0 bg-lavender-100 dark:hidden"></div>
            {/* Dark mode bg */}
            <div className="absolute inset-0 hidden dark:block bg-slate-800"></div>

            {/* Yellow animated circles for light mode */}
            <div className="absolute inset-0 opacity-20 dark:hidden">
              <div className="animate-pulse absolute top-0 right-0 w-16 h-16 bg-lavender-300 rounded-full"></div>
              <div className="animate-pulse absolute bottom-0 left-0 w-12 h-12 bg-lavender-400 rounded-full animation-delay-700"></div>
            </div>



            <CardContent className="p-6 flex  items-center justify-center gap-2 relative z-10">
              <TriangleAlert className='h-10 w-11 text-yellow-500' />
              <h2 className={`text-xs font-bold text-deep-lavender ${settings.darkMode ? 'text-white' : 'text-slate-700'}`}>
                {getLocalizedText('your.subscription.will.expire.soon.renew.now')}
              </h2>
              {/* <Button
                onClick={() => {
                  setActiveSection('profile')
                }}
                className="bg-gradient-to-r from-purple-500 to-purple-600 "
              >
                {getLocalizedText('renew')}
              </Button> */}

              <StripeCheckout isSubscribered={isSubscribered} checkSubDate={checkSubDate} showExpiryWarning={showExpiryWarning} />

            </CardContent>

          </Card>

        )
        :
        ""
      }

      {
        checkSubDate === true ?
          (
            <Card className="relative overflow-hidden card-3d">
              {/* Light mode bg */}
              <div className="absolute inset-0 bg-lavender-100 dark:hidden"></div>
              {/* Dark mode bg */}
              <div className="absolute inset-0 hidden dark:block bg-slate-800"></div>

              {/* Yellow animated circles for light mode */}
              <div className="absolute inset-0 opacity-20 dark:hidden">
                <div className="animate-pulse absolute top-0 right-0 w-16 h-16 bg-lavender-300 rounded-full"></div>
                <div className="animate-pulse absolute bottom-0 left-0 w-12 h-12 bg-lavender-400 rounded-full animation-delay-700"></div>
              </div>



              <CardContent className="p-6 flex  items-center justify-center gap-2 relative z-10">
                <Lock className='h-10 w-11 text-red-500' />
                <h2 className={`text-xs font-bold text-deep-lavender ${settings.darkMode ? 'text-white' : 'text-slate-700'}`}>
                  {getLocalizedText('your.subscription.expired.please.renew')}
                </h2>
                {/* <Button
                  onClick={() => {
                    setActiveSection('profile')
                  }}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 "
                >
                  {getLocalizedText('renew')}
                </Button> */}
              <StripeCheckout isSubscribered={isSubscribered} checkSubDate={checkSubDate} showExpiryWarning={showExpiryWarning} />

              </CardContent>

            </Card>
          )

          :
          ""

      }


      {/* Have a Read Before You Bleed - Using PrePeriodPreparation */}
      <PrePeriodPreparation />

      {/* Daily Insights */}
      <DailyInsights />

      {/* Cycle Chart */}
      <CycleChart />

      {/* Cycle Statistics */}
      <CycleStats />

      {/* Islamic Reminder Card */}

      <Card className="relative overflow-hidden card-3d">
        <div className="absolute inset-0  dark:hidden"></div>
        <div className="absolute inset-0 hidden dark:block bg-slate-800"></div>
        <div className="absolute inset-0 opacity-20 dark:hidden">
          <div className="animate-pulse absolute top-0 right-0 w-16 h-16 bg-lavender-300 rounded-full"></div>
          <div className="animate-pulse absolute bottom-0 left-0 w-12 h-12 bg-lavender-400 rounded-full animation-delay-700"></div>
        </div>

        <CardContent className="p-6 text-center relative z-10">
          <h2 className={`text-xl font-bold mb-4 text-deep-lavender ${settings.darkMode ? 'text-white' : 'text-lavender-800'}`}>
            {getLocalizedText('islamic.reminder.title')}
          </h2>
          <p className={`text-base text-deep-lavender font-bold bg-gradient-to-r from-lavender-700 via-lavender-800 to-lavender-900 bg-clip-text text-transparent opacity-800 ${settings.darkMode ? 'text-white' : ''}`}>
            {getLocalizedText('islamic.reminder.quote')}
          </p>
          <p className={`text-sm text-deep-lavender font-bold bg-gradient-to-r from-lavender-700 via-lavender-800 to-lavender-900 bg-clip-text text-transparent opacity-800 mt-4 ${settings.darkMode ? 'text-gray-300' : ''}`}>
            {getLocalizedText('islamic.reminder.body')}
          </p>
        </CardContent>
      </Card>

      {/* Copyright Footer */}
      <div className={`text-center py-4 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
        © 2025 {getLocalizedText('footer.copyright')}
      </div>

    </div>
  );
};

export default Index;
