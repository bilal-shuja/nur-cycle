
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown, ChevronRight, Download, Trash2, Mail } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface PrivacySettingsProps {
  onBack: () => void;
}

const PrivacySettings = ({ onBack }: PrivacySettingsProps) => {
  const { getLocalizedText } = useLanguage();
  const { toast } = useToast();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
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

  const handleDataExport = () => {
    toast({
      title: getLocalizedText('data.export.requested'),
      description: getLocalizedText('data.export.details'),
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: getLocalizedText('account.deletion'),
      description: getLocalizedText('account.deletion.details'),
      variant: "destructive",
    });
  };

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>

      <div className={`shadow-sm border-b ${settings.darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className={`rounded-full ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}
          >
            <ChevronLeft className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`} />
          </Button>
          <h1 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{getLocalizedText('privacy.settings')}</h1>
          <div className="w-10" />
        </div>
      </div>


      {/* Content */}

      <div className="px-4 py-6 space-y-6">


        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-purple-600 to-purple-800 border-0'} `}></div>


          <CardContent className="relative z-10 p-6">
            <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-gray-700'}`}>
              🔒 {getLocalizedText('privacy.settings.details')}
            </h2>
            <p className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-800'} leading-relaxed mb-4`}>
              {getLocalizedText('nurcycle.commitment')}
            </p>
            <p className={`${settings.darkMode ? 'text-gray-400' : 'text-purple-800'} text-sm`}>
              {getLocalizedText('privacy.controls')}
            </p>
          </CardContent>
        </Card>


        {/* Request Information Section */}

        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border-0'}`}></div>
          <CardContent className="relative z-10 p-0">
            <div
              className={`p-4 cursor-pointer ${settings.darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-50'} transition-colors`}
              onClick={() => toggleSection('request-info')}
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  📤 {getLocalizedText('request.information')}
                </h3>
                {expandedSection === 'request-info' ? (
                  <ChevronDown className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                ) : (
                  <ChevronRight className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                )}
              </div>
            </div>

            {expandedSection === 'request-info' && (
              <div className={`px-4 pb-4 border-t ${settings.darkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-50'}`}>
                <div className="pt-4 space-y-4">
          
                  <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {getLocalizedText('how.export.data')}
                  </h4>
                  <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                    {getLocalizedText('data.control')}
                  </p>
                  <ul className={`list-decimal list-inside space-y-2 ml-4 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>{getLocalizedText('settings.tab')}</li>
                    <li>{getLocalizedText('tap.privacy.settings')}</li>
                    <li>{getLocalizedText('select.export')}</li>
                  </ul>
                  <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                    {getLocalizedText('secure.download.link')}
                  </p>
                  <p className={`font-semibold ${settings.darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    {getLocalizedText('data.sharing')}
                  </p>

                  <Button
                    onClick={handleDataExport}
                    className={`${settings.darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-purple-600 hover:bg-purple-700'} text-white flex items-center gap-2`}
                  >
                    <Download className="w-4 h-4" />
                    {getLocalizedText('request.data.export')}
                  </Button>
                </div>

              </div>
            )}
          </CardContent>
        </Card>


        {/* Privacy Explained Section */}


        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border-0'} `}></div>
          <CardContent className="relative z-10 p-0">
            <div
              className={`p-4 cursor-pointer ${settings.darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-50'} transition-colors`}
              onClick={() => toggleSection('privacy-explained')}
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  🔐 {getLocalizedText('privacy.explained')}
                </h3>
                {expandedSection === 'privacy-explained' ? (
                  <ChevronDown className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                ) : (
                  <ChevronRight className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                )}
              </div>
            </div>

            {expandedSection === 'privacy-explained' && (


              <div className={`px-4 pb-4 border-t ${settings.darkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-50'}`}>
                <div className="pt-4 space-y-6">
                  <h4 className={`font-semibold text-lg ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {getLocalizedText('faq.title')}
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <h5 className={`font-semibold mb-2 ${settings.darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                        {getLocalizedText('faq.how.keep.data.safe')}
                      </h5>
                      <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                        {getLocalizedText('faq.how.keep.data.safe.answer')}
                      </p>
                    </div>

                    <div>
                      <h5 className={`font-semibold mb-2 ${settings.darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                        {getLocalizedText('faq.see.data.answer')}
                      </h5>
                      <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                        {getLocalizedText('faq.see.data.answer.details')}
                      </p>
                    </div>

                    <div>
                      <h5 className={`font-semibold mb-2 ${settings.darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                        {getLocalizedText('faq.ads.selling.data')}
                      </h5>
                      <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                        {getLocalizedText('faq.ads.selling.data.answer')}
                      </p>
                    </div>

                    <div>
                      <h5 className={`font-semibold mb-2 ${settings.darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                        {getLocalizedText('faq.safe.for.young.users')}
                      </h5>
                      <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                        {getLocalizedText('faq.safe.for.young.users.answer')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            )}
          </CardContent>
        </Card>


        {/* Delete Account Section */}


        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border-0'} `}></div>
          <CardContent className="relative z-10 p-0">
            <div
              className={`p-4 cursor-pointer ${settings.darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-50'} transition-colors`}
              onClick={() => toggleSection('delete-account')}
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  🗑️ {getLocalizedText('delete.my.account')}
                </h3>
                {expandedSection === 'delete-account' ? (
                  <ChevronDown className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-400'} w-5 h-5`} />
                ) : (
                  <ChevronRight className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-400'} w-5 h-5`} />
                )}
              </div>
            </div>

            {expandedSection === 'delete-account' && (
              <div className={`px-4 pb-4 border-t ${settings.darkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-50'}`}>
                <div className="pt-4 space-y-4">
                  <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                    {getLocalizedText('need.to.leave')}
                  </p>
                  <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                    {getLocalizedText('permanent.deletion')}
                  </p>
                  <ul className={`list-decimal list-inside space-y-2 ml-4 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>{getLocalizedText('steps.to.delete.account')}</li>

                  </ul>
                  <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                    {getLocalizedText('account.deleted')}
                  </p>
                  <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                    {getLocalizedText('leaving.message')}{' '}
                    <a href="mailto:support@nurcycle.app" className="underline" style={{ color: settings.darkMode ? '#c4b5fd' : '#7c3aed' }}>
                      support@nurcycle.app
                    </a>
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleDeleteAccount}
                      variant="destructive"
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      {getLocalizedText('delete.account')}
                    </Button>
                    <Button
                      variant="outline"
                      className={`${settings.darkMode ? 'border-slate-600 text-white hover:bg-slate-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} flex items-center gap-2`}
                      onClick={() => window.open('mailto:support@nurcycle.app', '_blank')}
                    >
                      <Mail className="w-4 h-4" />
                      {getLocalizedText('contact.support')}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>


        {/* Closing Message */}

        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-500 to-purple-700'} `}></div>
          <CardContent className="relative z-10 p-6 text-center">
            <div className="space-y-3">
              <p className={`${settings.darkMode ? 'text-white' : 'text-purple-800'} font-semibold`}>
                💜 {getLocalizedText('privacy.policy.title')}
              </p>
              <p className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-800'}`}>
                {getLocalizedText('privacy.policy.content')}
              </p>
   
            </div>
          </CardContent>
        </Card>



      </div>

      {/* Bottom spacing */}
      <div className="h-20" />
    </div>
  );
};

export default PrivacySettings;
