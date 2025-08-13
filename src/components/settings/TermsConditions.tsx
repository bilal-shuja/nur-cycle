import  { useState, useEffect } from 'react';
import { ChevronLeft, Download, Globe, FileText, Calendar, Shield, Heart, ShieldEllipsis } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { jsPDF } from "jspdf";

interface TermsConditionsProps {
  onBack: () => void;
}

const TermsConditions = ({ onBack }: TermsConditionsProps) => {
  const [currentView, setCurrentView] = useState<'main' | 'full-terms' | 'section'>('main');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const { getLocalizedText } = useLanguage();
  const { toast } = useToast();


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

  const handleDownloadPDF = () => {
    toast({
      title: "Download Started",
      description: "Terms and Conditions PDF is being prepared for download",
    });
    toast({
      title: "Download Started",
      description: "Terms and Conditions PDF is being prepared for download",
    });

    const doc = new jsPDF();
    const margin = 10;
    let y = margin;

    doc.setFontSize(14);
    doc.text("Terms and Conditions", margin, y);
    y += 10;

    doc.setFontSize(10);
    doc.text(`Effective Date: ${termsData.effectiveDate}`, margin, y);
    y += 6;
    doc.text(`Last Updated: ${termsData.lastUpdated}`, margin, y);
    y += 6;
    doc.text(`Version: ${termsData.version}`, margin, y);
    y += 10;

    termsData.sections.forEach((section, index) => {
      // Add section title
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text(`${index + 1}. ${section.title}`, margin, y);
      y += 6;

      // Add section content (with text wrapping)
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");

      const splitText = doc.splitTextToSize(section.content, 180); // 180 width for content area
      if (y + splitText.length * 6 > 280) {
        doc.addPage();
        y = margin;
      }
      doc.text(splitText, margin, y);
      y += splitText.length * 6 + 4;
    });

    doc.save("terms-and-conditions.pdf");
  };

  const termsData = {
    effectiveDate: "January 1, 2024",
    lastUpdated: "December 27, 2024",
    version: "1.2",
    sections: [
      {
        id: 'acceptance',
        title: getLocalizedText('acceptance.of.terms'),
        icon: FileText,
        content: getLocalizedText('terms.content')
      },
      {
        id: 'services',
        title: getLocalizedText('what.nurcycle.offers'),
        icon: Heart,
        content: getLocalizedText('nurcycle.offers.content')
      },
      {
        id: 'accounts',
        title: getLocalizedText('user.accounts'),
        icon: Shield,
        content: getLocalizedText('user.accounts.content')
      },
      {
        id: 'privacy',
        title: getLocalizedText('user.data.and.privacy'),
        icon: Shield,
        content: getLocalizedText('user.data.and.privacy.content')
      },
      {
        id: 'health',
        title: getLocalizedText('health.disclaimer'),
        icon: Heart,
        content: getLocalizedText('health.disclaimer.content')
      },
      {
        id: 'conduct',
        title: getLocalizedText('community.conduct'),
        icon: Globe,
        content: getLocalizedText('community.conduct.content')
      },
      {
        id: 'Intellectual',
        title: getLocalizedText('intellectual.property'),
        icon: Globe,
        content: getLocalizedText('intellectual.property.content')
      },
      {
        id: 'Changes',
        title: getLocalizedText('changes.to.app.or.terms'),
        icon: Globe,
        content: getLocalizedText('changes.to.app.or.terms.content')
      },
      {
        id: 'Termination',
        title: getLocalizedText('termination'),
        icon: Globe,
        content: getLocalizedText('termination.content')
      },
      {
        id: 'Limitation',
        title: getLocalizedText('limitation.of.liability'),
        icon: Globe,
        content: getLocalizedText('limitation.of.liability.content')
      },
      {
        id: 'Contact',
        title: getLocalizedText('contact.us'),
        icon: Globe,
        content: getLocalizedText('contact.us.content')
      }
    ]
  };

  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(sectionId);
    setCurrentView('section');
  };

  if (currentView === 'section') {
    const section = termsData.sections.find(s => s.id === selectedSection);
    const IconComponent = section?.icon || FileText;

    return (
      <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-lavender-50 to-lavender-100'}`}>
        {/* Header */}


        <div className="bg-white shadow-sm sticky top-0 z-10 card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-lavender-500 to-lavender-700'} `}></div>
          <div className="relative z-10 flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentView('main')}
              className="rounded-full button-3d"
            >
              <ChevronLeft className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`} />
            </Button>
            <h1 className={`${settings.darkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold`}>
              {section?.title}
            </h1>
            <div className="w-10" />
          </div>
        </div>


        {/* Section Content */}
        <div className="px-4 py-6">


          <Card className="relative overflow-hidden card-3d">
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-lavender-500 to-lavender-700'} `}></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-lavender-100 flex items-center justify-center circular-3d">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <h3 className={`${settings.darkMode ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                  {section?.title}
                </h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed text-base`}>
                {section?.content}
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    );
  }

  if (currentView === 'full-terms') {
    return (
      <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : ' from-lavender-50 to-lavender-100'}`}>

        {/* Header */}


        <div className="bg-white shadow-sm sticky top-0 z-10 card-3d">
          <div className={`flex items-center justify-between p-4 ${settings.darkMode ? 'bg-slate-900' : 'bg-white'}`}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentView('main')}
              className="rounded-full button-3d"
            >
              <ChevronLeft className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`} />
            </Button>
            <h1 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
              {getLocalizedText('full.terms')}
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownloadPDF}
              className={`rounded-full button-3d ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              <Download className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`} />
            </Button>
          </div>
        </div>


        {/* Full Terms Content */}
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className=" py-6 space-y-6">


            <div className={`relative overflow-hidden ${settings.darkMode ? 'bg-slate-900 text-white' : ' from-lavender-500 to-lavender-700'}`}>
              <div className="absolute inset-0 opacity-20"></div>
              <div className="relative z-10 p-6 text-center">
                <h2 className={`text-xl font-bold mb-2 ${settings.darkMode ? 'text-white' : 'text-black'}`}>
                  📜 {getLocalizedText('terms.of.use')}
                </h2>
                <p className={`text-sm opacity-90 ${settings.darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  {getLocalizedText('effective')}: {termsData.effectiveDate}
                </p>
                <p className={`text-sm opacity-90 ${settings.darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  {getLocalizedText('version')}: {termsData.version}
                </p>
              </div>
            </div>


            <Card className="relative overflow-hidden card-3d">
              <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-lavender-500 to-lavender-700'}`}></div>
              <CardContent className="relative z-10 p-6">
                <p className={`text-gray-700 leading-relaxed mb-4 ${settings.darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                  Welcome to <strong>NurCycle</strong> — your faith-conscious companion for period, fertility, and wellness tracking.
                  By using the NurCycle app, you agree to the following Terms and Conditions. Please read them carefully.
                </p>
              </CardContent>
            </Card>


            {/* Detailed Sections */}
            {


              [
                {
                  number: '1',
                  title: getLocalizedText('acceptance.of.terms'),
                  content: getLocalizedText('terms.content')
                },
                {
                  number: '2',
                  title: getLocalizedText('what.nurcycle.offers'),
                  content: getLocalizedText('nurcycle.offers.content')
                },
                {
                  number: '3',
                  title: getLocalizedText('user.accounts'),
                  content: getLocalizedText('user.accounts.content')
                },
                {
                  number: '4',
                  title: getLocalizedText('user.data.and.privacy'),
                  content: getLocalizedText('user.data.and.privacy.content')
                },
                {
                  number: '5',
                  title: getLocalizedText('health.disclaimer'),
                  content: getLocalizedText('health.disclaimer.content')
                },
                {
                  number: '6',
                  title: getLocalizedText('community.conduct'),
                  content: getLocalizedText('community.conduct.content')
                },
                {
                  number: '7',
                  title: getLocalizedText('intellectual.property'),
                  content: getLocalizedText('intellectual.property.content')
                },
                {
                  number: '8',
                  title: getLocalizedText('changes.to.app.or.terms'),
                  content: getLocalizedText('changes.to.app.or.terms.content')
                },
                {
                  number: '9',
                  title: getLocalizedText('termination'),
                  content: getLocalizedText('termination.content')
                },
                {
                  number: '10',
                  title: getLocalizedText('limitation.of.liability'),
                  content: getLocalizedText('limitation.of.liability.content')
                },
                {
                  number: '12',
                  title: getLocalizedText('contact.us'),
                  content: getLocalizedText('contact.us.content')
                }
              ].map((section, index) => (

                <Card key={index} className="relative overflow-hidden card-3d">
                  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-lavender-500 to-lavender-700'}`}></div>
                  <CardContent className="relative z-10 p-6">
                    <CardHeader>
                      <CardTitle className={`text-base flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {section.number}
                        </span>
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-gray-700 leading-relaxed whitespace-pre-line ${settings.darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                        {section.content}
                      </p>
                    </CardContent>
                  </CardContent>
                </Card>

              ))}

            {/* Footer Message */}


            <Card className="relative overflow-hidden card-3d">
              <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-500 to-purple-700'}`}></div>
              <CardContent className="relative z-10 p-6 text-center">
                <Heart className={`w-8 h-8 ${settings.darkMode ? 'text-gray-300' : 'text-purple-600'} mx-auto mb-3`} />
                <p className={`font-medium mb-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  {getLocalizedText('nurcycle.built')}
                </p>
                <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-purple-700'}`}>
                  {getLocalizedText('nurcycle.thank.you')}
                </p>
              </CardContent>
            </Card>


            <div className="pb-8" />
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-lavender-50 to-lavender-100'}`}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10 card-3d">
        <div className={`flex items-center justify-between p-4 ${settings.darkMode ? 'bg-slate-900' : 'bg-white'}`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full button-3d"
          >
            <ChevronLeft className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`} />
          </Button>
          <h1 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {getLocalizedText('terms.conditions')}
          </h1>
          <div className="w-10" />
        </div>
      </div>




      {/* Terms Overview */}
      <div className="px-4 py-4 space-y-4">


        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-lavender-500 to-lavender-700'} `}></div>
          <CardContent className="relative z-10 p-6">
            <div className="flex items-start space-x-4">
              <FileText className="w-8 h-8 flex-shrink-0 mt-1 text-lavender-800" />
              <div>
                <h3 className={`${settings.darkMode ? 'text-white' : 'text-gray-900'} font-semibold text-lg mb-2`}>
                  {getLocalizedText('terms.and.conditions')}
                </h3>
                <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm opacity-90 mb-3`}>
                  {getLocalizedText('professional.terms')}
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className={`bg-white/20 px-2 py-1 rounded-full ${settings.darkMode ? 'text-gray-200' : 'text-gray-500'}`}>
                    {getLocalizedText('effective')}: {termsData.effectiveDate}
                  </span>
                  <span className={`bg-white/20 px-2 py-1 rounded-full ${settings.darkMode ? 'text-gray-200' : 'text-gray-500'}`}>
                    {getLocalizedText('version')}: {termsData.version}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-16 flex-col space-y-1 bg-white hover:bg-gray-50 button-3d text-white"
            onClick={() => setCurrentView('full-terms')}
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs">{getLocalizedText('read.full.terms')}</span>
          </Button>
          <Button
            variant="outline"
            className="h-16 flex-col space-y-1 bg-white hover:bg-gray-50 button-3d text-white"
            onClick={handleDownloadPDF}
          >
            <Download className="w-5 h-5" />
            <span className="text-xs ">{getLocalizedText('download.pdf')}</span>
          </Button>
        </div>

        {/* Key Sections Preview - Made functional */}
        <div className="space-y-2">

          <h3 className={`font-semibold text-sm mb-3 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {getLocalizedText('key.sections')}
          </h3>

          {termsData?.sections.map((section, index) => {
            const IconComponent = section.icon;
            return (

              <Card
                key={section.id}
                className="relative overflow-hidden card-3d cursor-pointer"
                onClick={() => handleSectionClick(section.id)}
              >
                <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-lavender-500 to-lavender-700'}`}></div>
                <CardContent className="relative z-10 p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full ${settings.darkMode ? 'bg-purple-500' : 'bg-lavender-100'} flex items-center justify-center flex-shrink-0 circular-3d`}>
                      <IconComponent className={`w-4 h-4 ${settings.darkMode ? 'text-white' : 'text-purple-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`${settings.darkMode ? 'text-white' : 'text-gray-900'} font-medium text-sm mb-1`}>
                        {section.title}
                      </h4>
                      <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs line-clamp-2`}>
                        {section.content}
                      </p>
                    </div>
                    <ChevronLeft className={`w-4 h-4 ${settings.darkMode ? 'text-white' : 'text-gray-400'} rotate-180 flex-shrink-0`} />
                  </div>
                </CardContent>
              </Card>



            );
          })}
        </div>

        {/* Multi-language Notice */}
        <Card className="relative overflow-hidden card-3d bg-blue-50 border-blue-200">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-blue-500 to-blue-700'}`}></div>
          <CardContent className="relative z-10 p-4">
            <div className="flex items-center space-x-3">
              <Globe className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-blue-600'}`} />
              <div>
                <h4 className={`font-medium text-sm ${settings.darkMode ? 'text-white' : 'text-blue-900'}`}>{getLocalizedText('multi.language.support')}</h4>
                <p className={`text-xs mt-1 ${settings.darkMode ? 'text-gray-300' : 'text-blue-700'}`}>
                  {getLocalizedText('multi.language.support.content')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Legal Notice */}
        <Card className="relative overflow-hidden card-3d bg-gray-50 border-gray-200">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-gray-500 to-gray-700'}`}></div>
          <CardContent className="relative z-10 p-4">
            <div className="flex items-start space-x-3">
              <Shield className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-600'} mt-0.5`} />
              <div>
                <h4 className={`font-medium text-sm ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {getLocalizedText('legal.protection.and.ethics')}
                </h4>
                <p className={`text-xs mt-1 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {getLocalizedText('legal.protection.and.ethics.content')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Last Updated */}
        <div className="text-center pt-4">

          <div className={`flex items-center justify-center space-x-2 text-xs ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            <Calendar className={`w-3 h-3 ${settings.darkMode ? 'text-white' : 'text-gray-500'}`} />
            <span className={settings.darkMode ? 'text-gray-300' : 'text-gray-500'}>
              {getLocalizedText('last.updated')} {termsData.lastUpdated}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
