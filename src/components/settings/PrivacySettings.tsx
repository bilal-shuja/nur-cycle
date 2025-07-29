
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
      title: getLocalizedText('data.export.requested') ,
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
          {/* <CardContent className="relative z-10 p-6">
            <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-gray-700'}`}>
              🔒 Privacy Settings – Your Data, Your Rules
            </h2>
            <p className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-800'} leading-relaxed mb-4`}>
              At NurCycle, we are committed to protecting your privacy. As a women-centered, faith-based app, we take extra care in ensuring your personal health data is handled with transparency, security, and respect — in line with Islamic ethics and modern privacy standards.
            </p>
            <p className={`${settings.darkMode ? 'text-gray-400' : 'text-purple-800'} text-sm`}>
              Below, you can learn more about your privacy controls and how to manage your information within the app.
            </p>
          </CardContent> */}

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
                  {/* <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    How do I export my data from NurCycle?
                  </h4>
                  <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                    You have full control over your personal data. To request and export your information:
                  </p>
                  <ul className={`list-decimal list-inside space-y-2 ml-4 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>Go to your Settings tab in the NurCycle app</li>
                    <li>Tap on Privacy Settings</li>
                    <li>Select "Request Data Export"</li>
                  </ul>
                  <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                    Once your request is received, you'll get a secure download link sent to your registered email within 24–48 hours. The file will contain your tracked symptoms, notes, cycle history, and any other personal logs.
                  </p>
                  <p className={`font-semibold ${settings.darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    We only share this information with you. We do not sell, rent, or expose your data to third parties — ever.
                  </p> */}

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
              // <div className={`px-4 pb-4 border-t ${settings.darkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-50'}`}>
              //   <div className="pt-4 space-y-6">
              //     <h4 className={`font-semibold text-lg ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>Your Frequently Asked Questions (FAQs)</h4>

              //     <div className="space-y-4">
              //       <div>
              //         <h5 className={`font-semibold mb-2 ${settings.darkMode ? 'text-purple-400' : 'text-purple-700'}`}>Q: How does NurCycle keep my data safe?</h5>
              //         <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              //           A: All of your data is encrypted using industry-standard methods. We store your cycle logs, health notes, and personal entries on secure, privacy-first servers. No sensitive content is ever shared or used for marketing or profiling.
              //         </p>
              //       </div>

              //       <div>
              //         <h5 className={`font-semibold mb-2 ${settings.darkMode ? 'text-purple-400' : 'text-purple-700'}`}>Q: Will my period or fertility data be seen by anyone else?</h5>
              //         <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              //           A: No. Your information stays between you and NurCycle. Only you have access to your full cycle history. We may use anonymized data (completely disconnected from your identity) to improve the app experience — but never in a way that reveals who you are.
              //         </p>
              //       </div>

              //       <div>
              //         <h5 className={`font-semibold mb-2 ${settings.darkMode ? 'text-purple-400' : 'text-purple-700'}`}>Q: Does NurCycle show ads or sell my data?</h5>
              //         <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              //           A: Absolutely not. We are an ad-free, Muslim-built platform. Your privacy is part of our trust and responsibility.
              //         </p>
              //       </div>

              //       <div>
              //         <h5 className={`font-semibold mb-2 ${settings.darkMode ? 'text-purple-400' : 'text-purple-700'}`}>Q: Is NurCycle safe for young users or reverts?</h5>
              //         <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              //           A: Yes. We provide faith-conscious education and tools that avoid the overexposure and inappropriate content seen in other apps. Users can set content sensitivity preferences and access Islamic rulings through trusted sources.
              //         </p>
              //       </div>
              //     </div>
              //   </div>
              // </div>

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
                    {/* <li>Go to Settings</li>
                    <li>Tap on Privacy Settings</li>
                    <li>Select "Delete My Account"</li>
                    <li>Confirm your email and final decision</li> */}
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
      {/* <p className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-800'}`}>
        And your body, your health, and your deen deserve digital protection rooted in ihsan.
      </p> */}
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
