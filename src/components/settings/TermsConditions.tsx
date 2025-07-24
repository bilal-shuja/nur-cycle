import React, { useState, useEffect } from 'react';
import { ChevronLeft, Download, Globe, FileText, Calendar, Shield, Heart, ShieldEllipsis } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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

  const handleDownloadPDF = () => {
    toast({
      title: "Download Started",
      description: "Terms and Conditions PDF is being prepared for download",
    });
    // console.log('Downloading Terms and Conditions PDF...');
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
        title: 'Acceptance of Terms',
        icon: FileText,
        content: 'By accessing or using NurCycle, you confirm that you are at least 13 years of age and that you agree to be bound by these Terms and our Privacy Policy. If you do not agree with any part, please do not use the app.'
      },
      {
        id: 'services',
        title: 'What NurCycle Offers',
        icon: Heart,
        content: 'NurCycle provides health and wellness tools including: Period, ovulation, and fertility tracking; Pregnancy support and body changes logging; Personalized reminders and Islamic guidance; Community interaction and content sharing. This app is built with Muslim women in mind but is open to all women who want to track their health with dignity and privacy.'
      },
      {
        id: 'accounts',
        title: 'User Accounts',
        icon: Shield,
        content: 'You may create a personal account to store your data securely. You are responsible for keeping your login information confidential and for all activity that occurs under your account. Please do not impersonate others or use false information.'
      },
      {
        id: 'privacy',
        title: 'User Data and Privacy',
        icon: Shield,
        content: 'Your personal data is stored securely and never sold or shared with third parties. See our full Privacy Policy for how we protect your information. You can export or delete your data at any time from the app settings.'
      },
      {
        id: 'health',
        title: 'Health Disclaimer',
        icon: Heart,
        content: 'NurCycle does not offer medical advice. All content and tools are for informational purposes only. Please consult a qualified healthcare provider for any medical concerns. Islamic rulings presented in the app are based on verified scholarly sources, but you are encouraged to consult your local scholars for personal rulings.'
      },
      {
        id: 'conduct',
        title: 'Community Conduct',
        icon: Globe,
        content: 'Users may engage with one another respectfully through community features. By participating, you agree not to: Post inappropriate, offensive, or harmful content; Share false health information; Harass or bully other users. We reserve the right to remove accounts that violate these standards.'
      }
      ,
      {
        id: 'Intellectual',
        title: 'Intellectual Property',
        icon: Globe,

        content: 'All content, branding, and designs within NurCycle are the property of the company and protected by applicable intellectual property laws. You may not copy, reuse, or modify any part of the app without written permission.'
      },
      {
        id: 'Changes',
        title: 'Changes to the App or Terms',
        icon: Globe,

        content: 'We may occasionally update these Terms or make changes to the app. By continuing to use NurCycle, you accept the updated terms. You will be notified of any major changes within the app.'
      },
      {
        id: 'Termination',
        title: 'Termination',
        icon: Globe,

        content: 'You may delete your account at any time. We also reserve the right to terminate accounts that violate our terms, pose security risks, or disrupt other users\' experiences.'
      },
      {
        id: 'Limitation',
        title: 'Limitation of Liability',
        icon: Globe,

        content: 'NurCycle is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the app.'
      },
      // {
      //   id: 'Governing',
      //   title: 'Governing Law',
      //   icon: Globe,

      //   content: 'These Terms are governed by and interpreted in accordance with the laws of [Insert Country or Region], without regard to conflict of law principles.'
      // },
      {
        id: 'Contact',
        title: 'Contact Us',
        icon: Globe,

        content: 'If you have questions or concerns about these Terms, you can reach us at support@nurcycle.app'
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
        {/* <div className="bg-white shadow-sm sticky top-0 z-10 card-3d">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentView('main')}
              className="rounded-full button-3d"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">{section?.title}</h1>
            <div className="w-10" />
          </div>
        </div> */}

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
          {/* <Card className="bg-white shadow-lg card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-lavender-100 flex items-center justify-center circular-3d">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                {section?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-base">
                {section?.content}
              </p>
            </CardContent>
          </Card> */}

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
        {/* <div className="bg-white shadow-sm sticky top-0 z-10 card-3d">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentView('main')}
              className="rounded-full button-3d"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Full Terms & Conditions</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownloadPDF}
              className="rounded-full button-3d text-white"
            >
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div> */}

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
              Full Terms & Conditions
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

            {/* <div className="bg-lavender-600 text-black rounded-lg p-6 text-center shadow-lg card-3d">
              <h2 className="text-xl font-bold mb-2">📜 Terms and Conditions of Use</h2>
              <p className="text-sm opacity-90">Effective Date: {termsData.effectiveDate}</p>
              <p className="text-sm opacity-90">Version: {termsData.version}</p>
            </div> */}

            <div className={`relative overflow-hidden ${settings.darkMode ? 'bg-slate-900 text-white' : ' from-lavender-500 to-lavender-700'}`}>
              <div className="absolute inset-0 opacity-20"></div>
              <div className="relative z-10 p-6 text-center">
                <h2 className={`text-xl font-bold mb-2 ${settings.darkMode ? 'text-white' : 'text-black'}`}>
                  📜 Terms and Conditions of Use
                </h2>
                <p className={`text-sm opacity-90 ${settings.darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  Effective Date: {termsData.effectiveDate}
                </p>
                <p className={`text-sm opacity-90 ${settings.darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  Version: {termsData.version}
                </p>
              </div>
            </div>




            {/* <Card>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Welcome to <strong>NurCycle</strong> — your faith-conscious companion for period, fertility, and wellness tracking.
                  By using the NurCycle app, you agree to the following Terms and Conditions. Please read them carefully.
                </p>
              </CardContent>
            </Card> */}

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
            {[
              {
                number: '1',
                title: 'Acceptance of Terms',
                content: 'By accessing or using NurCycle, you confirm that you are at least 13 years of age and that you agree to be bound by these Terms and our Privacy Policy. If you do not agree with any part, please do not use the app.'
              },
              {
                number: '2',
                title: 'What NurCycle Offers',
                content: 'NurCycle provides health and wellness tools including:\n• Period, ovulation, and fertility tracking\n• Pregnancy support and body changes logging\n• Personalized reminders and Islamic guidance\n• Community interaction and content sharing\n\nThis app is built with Muslim women in mind but is open to all women who want to track their health with dignity and privacy.'
              },
              {
                number: '3',
                title: 'User Accounts',
                content: 'You may create a personal account to store your data securely. You are responsible for keeping your login information confidential and for all activity that occurs under your account.\n\nPlease do not impersonate others or use false information.'
              },
              {
                number: '4',
                title: 'User Data and Privacy',
                content: 'Your personal data is stored securely and never sold or shared with third parties. See our full Privacy Policy for how we protect your information.\n\nYou can export or delete your data at any time from the app settings.'
              },
              {
                number: '5',
                title: 'Health Disclaimer',
                content: 'NurCycle does not offer medical advice. All content and tools are for informational purposes only. Please consult a qualified healthcare provider for any medical concerns.\n\nIslamic rulings presented in the app are based on verified scholarly sources, but you are encouraged to consult your local scholars for personal rulings.'
              },
              {
                number: '6',
                title: 'Community Conduct',
                content: 'Users may engage with one another respectfully through community features (if enabled). By participating, you agree not to:\n• Post inappropriate, offensive, or harmful content\n• Share false health information\n• Harass or bully other users\n\nWe reserve the right to remove accounts that violate these standards.'
              },
              {
                number: '7',
                title: 'Intellectual Property',
                content: 'All content, branding, and designs within NurCycle are the property of the company and protected by applicable intellectual property laws. You may not copy, reuse, or modify any part of the app without written permission.'
              },
              {
                number: '8',
                title: 'Changes to the App or Terms',
                content: 'We may occasionally update these Terms or make changes to the app. By continuing to use NurCycle, you accept the updated terms. You will be notified of any major changes within the app.'
              },
              {
                number: '9',
                title: 'Termination',
                content: 'You may delete your account at any time. We also reserve the right to terminate accounts that violate our terms, pose security risks, or disrupt other users\' experiences.'
              },
              {
                number: '10',
                title: 'Limitation of Liability',
                content: 'NurCycle is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the app.'
              },
              // {
              //   number: '11',
              //   title: 'Governing Law',
              //   content: 'These Terms are governed by and interpreted in accordance with the laws of [Insert Country or Region], without regard to conflict of law principles.'
              // },
              {
                number: '12',
                title: 'Contact Us',
                content: 'If you have questions or concerns about these Terms, you can reach us at:\n📧 support@nurcycle.app'
              }
            ].map((section, index) => (
              // <Card key={index}>
              //   <CardHeader>
              //     <CardTitle className="text-base flex items-center gap-2">
              //       <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              //         {section.number}
              //       </span>
              //       {section.title}
              //     </CardTitle>
              //   </CardHeader>
              //   <CardContent>
              //     <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              //       {section.content}
              //     </p>
              //   </CardContent>
              // </Card>

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
            {/* <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <Heart className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <p className="text-purple-800 font-medium mb-2">
                  NurCycle was built with love, trust, and Islamic values.
                </p>
                <p className="text-purple-700 text-sm">
                  We thank you for being part of this journey and trusting us with your wellness and worship.
                </p>
              </CardContent>
            </Card> */}

            <Card className="relative overflow-hidden card-3d">
              <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : 'bg-gradient-to-r from-purple-500 to-purple-700'}`}></div>
              <CardContent className="relative z-10 p-6 text-center">
                <Heart className={`w-8 h-8 ${settings.darkMode ? 'text-gray-300' : 'text-purple-600'} mx-auto mb-3`} />
                <p className={`font-medium mb-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  NurCycle was built with love, trust, and Islamic values.
                </p>
                <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-purple-700'}`}>
                  We thank you for being part of this journey and trusting us with your wellness and worship.
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
      {/*       
      <div className="bg-white shadow-sm sticky top-0 z-10 card-3d">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full button-3d"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">{getLocalizedText('terms.conditions')}</h1>
          <div className="w-10" />
        </div>



      </div> */}

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

        {/* <Card className="bg-lavender-600 text-white shadow-lg card-3d">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4 ">
              <FileText className="w-8 h-8 flex-shrink-0 mt-1 text-lavender-800" />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Terms & Conditions</h3>

                <p className="text-sm opacity-90 text-gray-600 mb-3">
                  Professional terms designed for Muslim women's wellness tracking with Islamic values and privacy protection.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-white/20 px-2 py-1 rounded-full text-gray-500">Effective: {termsData.effectiveDate}</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-gray-500">Version: {termsData.version}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}

        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-lavender-500 to-lavender-700'} `}></div>
          <CardContent className="relative z-10 p-6">
            <div className="flex items-start space-x-4">
              <FileText className="w-8 h-8 flex-shrink-0 mt-1 text-lavender-800" />
              <div>
                <h3 className={`${settings.darkMode ? 'text-white' : 'text-gray-900'} font-semibold text-lg mb-2`}>
                  Terms & Conditions
                </h3>
                <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm opacity-90 mb-3`}>
                  Professional terms designed for Muslim women's wellness tracking with Islamic values and privacy protection.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className={`bg-white/20 px-2 py-1 rounded-full ${settings.darkMode ? 'text-gray-200' : 'text-gray-500'}`}>
                    Effective: {termsData.effectiveDate}
                  </span>
                  <span className={`bg-white/20 px-2 py-1 rounded-full ${settings.darkMode ? 'text-gray-200' : 'text-gray-500'}`}>
                    Version: {termsData.version}
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
            <span className="text-xs">Read Full Terms</span>
          </Button>
          <Button
            variant="outline"
            className="h-16 flex-col space-y-1 bg-white hover:bg-gray-50 button-3d text-white"
            onClick={handleDownloadPDF}
          >
            <Download className="w-5 h-5" />
            <span className="text-xs ">Download PDF</span>
          </Button>
        </div>

        {/* Key Sections Preview - Made functional */}
        <div className="space-y-2">
          {/* <h3 className="font-semibold text-gray-900 text-sm mb-3">Key Sections</h3>
           */}
          <h3 className={`font-semibold text-sm mb-3 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Key Sections
          </h3>

          {termsData?.sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              // <Card
              //   key={section.id}
              //   className="bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition-colors card-3d"
              //   onClick={() => handleSectionClick(section.id)}
              // >
              //   <CardContent className="p-4">
              //     <div className="flex items-start space-x-3">
              //       <div className="w-8 h-8 rounded-full bg-lavender-100 flex items-center justify-center flex-shrink-0 circular-3d">
              //         <IconComponent className="w-4 h-4 text-white" />
              //       </div>
              //       <div className="flex-1 min-w-0">
              //         <h4 className="font-medium text-gray-900 text-sm mb-1">{section.title}</h4>
              //         <p className="text-xs text-gray-500 line-clamp-2">{section.content}</p>
              //       </div>
              //       <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180 flex-shrink-0" />
              //     </div>
              //   </CardContent>
              // </Card>

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
        {/* <Card className="bg-blue-50 border-blue-200 card-3d">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="font-medium text-blue-900 text-sm">Multi-Language Support</h4>
                <p className="text-xs text-blue-700 mt-1">
                  Available in Arabic, French, and all supported app languages. Change your language in App Settings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card> */}

        <Card className="relative overflow-hidden card-3d bg-blue-50 border-blue-200">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-blue-500 to-blue-700'}`}></div>
  <CardContent className="relative z-10 p-4">
    <div className="flex items-center space-x-3">
      <Globe className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-blue-600'}`} />
      <div>
        <h4 className={`font-medium text-sm ${settings.darkMode ? 'text-white' : 'text-blue-900'}`}>Multi-Language Support</h4>
        <p className={`text-xs mt-1 ${settings.darkMode ? 'text-gray-300' : 'text-blue-700'}`}>
          Available in Arabic, French, and all supported app languages. Change your language in App Settings.
        </p>
      </div>
    </div>
  </CardContent>
</Card>


        {/* Legal Notice */}

        {/* <Card className="bg-gray-50 border-gray-200 card-3d">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Legal Protection & Ethics</h4>
                <p className="text-xs text-gray-600 mt-1">
                  These terms are designed to protect both users and the platform while maintaining Islamic values of trust, privacy, and female empowerment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card> */}

        <Card className="relative overflow-hidden card-3d bg-gray-50 border-gray-200">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-gray-500 to-gray-700'}`}></div>
  <CardContent className="relative z-10 p-4">
    <div className="flex items-start space-x-3">
      <Shield className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-600'} mt-0.5`} />
      <div>
        <h4 className={`font-medium text-sm ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
          Legal Protection & Ethics
        </h4>
        <p className={`text-xs mt-1 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          These terms are designed to protect both users and the platform while maintaining Islamic values of trust, privacy, and female empowerment.
        </p>
      </div>
    </div>
  </CardContent>
</Card>


        {/* Last Updated */}
        <div className="text-center pt-4">
          {/* <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Last updated: {termsData.lastUpdated}</span>
          </div> */}

          <div className={`flex items-center justify-center space-x-2 text-xs ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
  <Calendar className={`w-3 h-3 ${settings.darkMode ? 'text-white' : 'text-gray-500'}`} />
  <span className={settings.darkMode ? 'text-gray-300' : 'text-gray-500'}>
    Last updated: {termsData.lastUpdated}
  </span>
</div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
