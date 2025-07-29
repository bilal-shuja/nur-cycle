
import React, { useState, useEffect } from 'react';
import { ChevronLeft, MessageCircle, Book, Video, Mail, Phone, Clock, Users, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface HelpSectionProps {
  onBack: () => void;
}

const HelpSection = ({ onBack }: HelpSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { getLocalizedText } = useLanguage();
  const { toast } = useToast();

const helpCategories = [
  {
    id: 'getting-started',
    title: getLocalizedText('getting.started'),
    icon: Book,
    description: getLocalizedText('getting.started.content'),
    items: [
      getLocalizedText('how.to.track.period'),
      getLocalizedText('setting.up.notifications'),
      getLocalizedText('understanding.cycle.predictions'),
      getLocalizedText('using.islamic.guidance.features')
    ]
  },
  {
    id: 'tracking',
    title: getLocalizedText('tracking.and.features'),
    icon: Heart,
    description: getLocalizedText('tracking.and.features.content'),
    items: [
      getLocalizedText('period.tracking.best.practices'),
      getLocalizedText('symptom.logging'),
      getLocalizedText('fertility.awareness'),
      getLocalizedText('pregnancy.mode.setup')
    ]
  },
  {
    id: 'islamic-guidance',
    title: getLocalizedText('islamic.guidance'),
    icon: MessageCircle,
    description: getLocalizedText('islamic.guidance.content'),
    items: [
      getLocalizedText('menstruation.vs.istihadah'),
      getLocalizedText('prayer.exemptions'),
      getLocalizedText('fasting.guidelines'),
      getLocalizedText('purity.and.worship')
    ]
  },
  {
    id: 'troubleshooting',
    title: getLocalizedText('troubleshooting'),
    icon: Users,
    description: getLocalizedText('troubleshooting.content'),
    items: [
      getLocalizedText('app.not.syncing.data'),
      getLocalizedText('notification.problems'),
      getLocalizedText('cycle.irregularities'),
      getLocalizedText('account.management')
    ]
  }
];
  const contactOptions = [
    // {
    //   id: 'live-chat',
    //   title: 'Live Chat',
    //   icon: MessageCircle,
    //   description: 'Chat with our support team',
    //   availability: 'Available 24/7',
    //   action: () => {
    //     toast({
    //       title: "Live Chat",
    //       description: "Connecting you to our support team...",
    //     });
    //   }
    // },
  {
  id: 'email',
  title: getLocalizedText('email.support'),
  icon: Mail,
  description: getLocalizedText('email.support.content'),
  availability: getLocalizedText('response.within.24.hours'),
  action: () => {
    toast({
      title: getLocalizedText('email.support'),
      description: getLocalizedText('opening.email.client'),
    });
  }
}
    // {
    //   id: 'video-guides',
    //   title: 'Video Tutorials',
    //   icon: Video,
    //   description: 'Watch step-by-step guides',
    //   availability: 'Available anytime',
    //   action: () => {
    //     toast({
    //       title: "Video Tutorials",
    //       description: "Opening video library...",
    //     });
    //   }
    // }
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
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
    else {
      document.documentElement.classList.remove('dark');
    }

 


  }, []);

  if (selectedCategory) {
    const category = helpCategories.find(c => c.id === selectedCategory);
    const IconComponent = category?.icon || Book;

    return (
      <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-lavender-50 to-lavender-100'}`}>
  
        
          <div className="bg-white shadow-sm sticky top-0 z-10 card-3d">
  <div className={`flex items-center justify-between p-4 ${settings.darkMode ? 'bg-slate-900' : 'bg-white'}`}>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setSelectedCategory(null)}
      className="rounded-full button-3d"
    >
      <ChevronLeft className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-black'}`} />
    </Button>
    <h1 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{category?.title}</h1>
    <div className="w-10" />
  </div>
</div>



        <div className="px-4 py-6">

  
          <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-lavender-500 to-lavender-700'}`}></div>
  <CardContent className="relative z-10 p-6">
    <CardHeader>
      <CardTitle className={`flex items-center gap-3 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className={`w-10 h-10 rounded-full ${settings.darkMode ? 'bg-gray-700' : 'bg-lavender-100'} flex items-center justify-center circular-3d`}>
          <IconComponent className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-lavender-100'}`} />
        </div>
        {category?.title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {category?.items.map((item, index) => (
          <div key={index} className={`p-3 rounded-lg ${settings.darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-lavender-50 hover:bg-lavender-100'}  cursor-pointer transition-colors`}>
            <p className={`font-medium ${settings.darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{item}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </CardContent>
</Card>



        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-lavender-50 to-lavender-100'}`}>
   

      <div className="relative overflow-hidden card-3d">
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-lavender-500 to-lavender-700'}`}></div>
        <div className={` shadow-sm sticky top-0 z-10 p-4 ${settings.darkMode ? 'bg-slate-900' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-full button-3d"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </Button>
            <h1 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
              {getLocalizedText('help.and.support')}
            </h1>
            <div className="w-10" />
          </div>
        </div>
      </div>


      {/* Help Content */}
      <div className="px-4 py-4 space-y-4">
        {/* Welcome Card */}


        <Card className="relative overflow-hidden card-3d bg-lavender-600 text-white shadow-lg">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-lavender-500 to-lavender-700'}`}></div>
          <CardContent className="relative z-10 p-6">
            <div className="flex items-start space-x-4">
              <Heart className={`w-8 h-8 flex-shrink-0 mt-1 ${settings.darkMode ? 'text-purple-300' : 'text-purple-500'}`} />
              <div>
                <h3 className={`font-semibold text-lg ${settings.darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                 {getLocalizedText('how.can.we.help')}
                </h3>
                <p className={`text-sm opacity-90 ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  {getLocalizedText('how.can.we.help')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Help Categories */}
        <div className="space-y-2">
          <h3 className={`font-semibold text-sm mb-3 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
           {getLocalizedText('browse.topics')}
          </h3>
          {helpCategories.map((category) => {
            const IconComponent = category.icon;
            return (
      
              <Card
                key={category.id}
                className="relative overflow-hidden card-3d cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-lavender-500 to-lavender-700'}`}></div>
                <CardContent className="relative z-10 p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full ${settings.darkMode ? 'bg-gray-700' : 'bg-lavender-100'} flex items-center justify-center flex-shrink-0 circular-3d`}>
                      <IconComponent className={`w-4 h-4 ${settings.darkMode ? 'text-white' : 'text-lavender-100'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium ${settings.darkMode ? 'text-white' : 'text-gray-900'} text-sm mb-1`}>
                        {category.title}
                      </h4>
                      <p className={`text-xs ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {category.description}
                      </p>
                    </div>
                    <ChevronLeft className={`w-4 h-4 ${settings.darkMode ? 'text-gray-300' : 'text-gray-400'} rotate-180 flex-shrink-0`} />
                  </div>
                </CardContent>
              </Card>


            );
          })}
        </div>

        {/* Contact Options */}
        <div className="space-y-2">
       
          <h3 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'} text-sm mb-3`}>
           {getLocalizedText('get.in.touch')}
          </h3>
          {contactOptions.map((option) => {
            const IconComponent = option.icon;
            return (

              <Card
                key={option.id}
                className="relative overflow-hidden card-3d"
                onClick={option.action}
              >
                <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-green-500 to-green-700'}`}></div>
                <CardContent className="relative z-10 p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full ${settings.darkMode ? 'bg-gray-700' : 'bg-green-100'} flex items-center justify-center flex-shrink-0 circular-3d`}>
                      <IconComponent className={`w-4 h-4 ${settings.darkMode ? 'text-white' : 'text-purple-100'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${settings.darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>
                        {option.title}
                      </h4>
                      <p className={`text-xs ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'} mb-1`}>
                        {option.description}
                      </p>
                      <div className="flex items-center text-xs text-green-600">
                        {/* Add any additional content here */}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            );
          })}
        </div>

        {/* FAQ Notice */}
   
        <Card className="relative overflow-hidden card-3d bg-blue-50">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-blue-500 to-blue-700'}`}></div>
          <CardContent className="relative z-10 p-4">
            <div className="flex items-center space-x-3">
              <Book className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-blue-600'}`} />
              <div>
                <h4 className={`font-medium ${settings.darkMode ? 'text-white' : 'text-blue-900'} text-sm`}>
                 {getLocalizedText('faq')}
                </h4>
                <p className={`text-xs mt-1 ${settings.darkMode ? 'text-gray-300' : 'text-blue-700'}`}>
                  {getLocalizedText('faq.content')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default HelpSection;
