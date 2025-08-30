
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown, ChevronRight, Download, Trash2, Mail } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { jsPDF } from "jspdf";

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
    const doc = new jsPDF();
    const margin = 15;
    let y = margin;

    // helper for adding wrapped text
    const addText = (text, font = "normal", size = 11, gap = 6) => {
      doc.setFontSize(size);
      doc.setFont(undefined, font);
      const split = doc.splitTextToSize(text, 180);
      if (y + split.length * gap > 280) {
        doc.addPage();
        y = margin;
      }
      doc.text(split, margin, y);
      y += split.length * gap;
    };

    // === Section 1 ===
    addText("Purpose of this Privacy Policy", "bold", 13, 7);

    addText(
      "The purpose of this Privacy Policy is to explain clearly:",
      "normal",
      11
    );

    // Bullet list
    const list1 = [
      "What information we collect about you when you use NurCycle.",
      "How we use, process, and protect that information.",
      "Your rights and choices regarding your personal data.",
      "How you can contact us if you have any questions, concerns, or requests.",
    ];
    list1.forEach((item) => addText("• " + item, "normal", 11));

    addText(
      "This document is designed not only to meet our legal obligations under data protection laws (including the UK General Data Protection Regulation and other applicable international standards) but also to reflect our ethical commitment to user privacy, respect, and dignity.",
      "normal",
      11
    );

    addText(
      "By using NurCycle, you acknowledge that you have read and understood this Privacy Policy and consent to the practices it describes.",
      "bold",
      11
    );

    // === Section 2 ===
    y += 8;
    addText("How do I export my data from NurCycle?", "bold", 13, 7);

    addText(
      "You have full control over your personal data. To request and export your information:",
      "normal",
      11
    );

    // Numbered list
    const list2 = [
      "Go to your Settings tab in the NurCycle app",
      "Tap on Privacy Settings",
      'Select "Request Data Export"',
    ];
    list2.forEach((item, i) => addText(`${i + 1}. ${item}`, "normal", 11));

    addText(
      "Once your request is received, you'll get a secure download link sent to your registered email within 24–48 hours. The file will contain your tracked symptoms, notes, cycle history, and any other personal logs.",
      "normal",
      11
    );

    addText(
      "We only share this information with you. We do not sell, rent, or expose your data to third parties — ever.",
      "bold",
      11
    );

    // Save PDF
    doc.save("privacy-policy.pdf");
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
              📝 Introduction & Identity

            </h2>
            <p className={`${settings.darkMode ? 'text-gray-300' : 'text-slate-600'} leading-relaxed mb-4`}>
              Welcome to NurCycle. We are NurCycle Ltd, a company incorporated and operating in the United Kingdom. Our mission is to provide women—particularly Muslim women—with a secure, supportive, and faith-conscious digital space for tracking health, wellbeing, and personal development.

            </p>

            <p className={`${settings.darkMode ? 'text-gray-300' : 'text-slate-600'} leading-relaxed mb-4`}>
              This Privacy Policy outlines how we handle your personal information when you use the NurCycle mobile application (“App”) and our related services. We value your trust and are committed to ensuring your privacy and safeguarding your data in a responsible and transparent manner.
            </p>

            <p className={` ${settings.darkMode ? 'text-gray-400' : 'text-slate-600'} text-sm`}>
              You may contact us at any time regarding this Privacy Policy or your data by emailing:<br />
              <div className='mt-5'>📧 support@nurcycle.com</div>
            </p>

          </CardContent>
        </Card>


        {/* Request Information Section */}

        <Card className="relative overflow-hidden card-3d">
          <div
            className={`absolute inset-0 ${settings.darkMode ? "bg-slate-900 border border-slate-700" : "bg-white border-0"
              }`}
          ></div>
          <CardContent className="relative z-10 p-0">
            <div
              className={`p-4 cursor-pointer ${settings.darkMode ? "hover:bg-slate-800" : "hover:bg-gray-50"
                } transition-colors`}
              onClick={() => toggleSection("request-info")}
            >
              <div className="flex items-center justify-between">
                <h3
                  className={`text-lg font-bold flex items-center gap-2 ${settings.darkMode ? "text-white" : "text-purple-800"
                    }`}
                >
                  📤 {getLocalizedText("request.information")}
                </h3>
                {expandedSection === "request-info" ? (
                  <ChevronDown className={`w-5 h-5 text-gray-400`} />
                ) : (
                  <ChevronRight className={`w-5 h-5 text-gray-400`} />
                )}
              </div>
            </div>

            {expandedSection === "request-info" && (
              <div
                className={`px-4 pb-4 border-t ${settings.darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-50"
                  }`}
              >
                {/* New Section */}
                <div className="space-y-4">
                  <h4
                    className={`font-semibold flex items-center gap-2 ${settings.darkMode ? "text-white" : "text-gray-900"
                      }`}
                  >
                    📜 Purpose of this Privacy Policy
                  </h4>
                  <p
                    className={`leading-relaxed ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                  >
                    The purpose of this Privacy Policy is to explain clearly:
                  </p>
                  <ul
                    className={`list-disc list-inside space-y-2 ml-4 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                  >
                    <li>What information we collect about you when you use NurCycle.</li>
                    <li>How we use, process, and protect that information.</li>
                    <li>Your rights and choices regarding your personal data.</li>
                    <li>How you can contact us if you have any questions, concerns, or requests.</li>
                  </ul>
                  <p
                    className={`leading-relaxed ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                  >
                    This document is designed not only to meet our legal obligations under data
                    protection laws (including the UK General Data Protection Regulation and
                    other applicable international standards) but also to reflect our ethical
                    commitment to user privacy, respect, and dignity.
                  </p>
                  <p
                    className={`leading-relaxed font-medium ${settings.darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                  >
                    By using NurCycle, you acknowledge that you have read and understood this
                    Privacy Policy and consent to the practices it describes.
                  </p>
                </div>

                {/* Existing Section */}
                <div className="space-y-4">
                  <h4
                    className={`font-semibold ${settings.darkMode ? "text-white" : "text-gray-900"
                      }`}
                  >
                    {getLocalizedText("how.export.data")}
                  </h4>
                  <p
                    className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                      } leading-relaxed`}
                  >
                    {getLocalizedText("data.control")}
                  </p>
                  <ul
                    className={`list-decimal list-inside space-y-2 ml-4 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                  >
                    <li>{getLocalizedText("settings.tab")}</li>
                    <li>{getLocalizedText("tap.privacy.settings")}</li>
                    <li>{getLocalizedText("select.export")}</li>
                  </ul>
                  <p
                    className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                      } leading-relaxed`}
                  >
                    {getLocalizedText("secure.download.link")}
                  </p>
                  <p
                    className={`font-semibold ${settings.darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                  >
                    {getLocalizedText("data.sharing")}
                  </p>

                  <Button
                    onClick={handleDataExport}
                    className={`${settings.darkMode
                      ? "bg-slate-800 hover:bg-slate-700"
                      : "bg-purple-600 hover:bg-purple-700"
                      } text-white flex items-center gap-2`}
                  >
                    <Download className="w-4 h-4" />
                    {getLocalizedText("request.data.export")}
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


        {/*Types of data collection Section */}
        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border-0'} `}></div>
          <CardContent className="relative z-10 p-0">
            <div
              className={`p-4 cursor-pointer ${settings.darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-50'} transition-colors`}
              onClick={() => toggleSection('types-of-data-collected')}
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  📦 {getLocalizedText('Types of data collection')}
                </h3>
                {expandedSection === 'types-of-data-collected' ? (
                  <ChevronDown className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                ) : (
                  <ChevronRight className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                )}
              </div>
            </div>

            {expandedSection === 'types-of-data-collected' && (


              <div
                className={`px-4 pb-4 border-t ${settings.darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-50"
                  }`}
              >
                <div className="pt-4 space-y-6">
                  <h4
                    className={`font-semibold text-lg ${settings.darkMode ? "text-white" : "text-gray-900"
                      }`}
                  >
                    📊 Categories of Personal Data Collected
                  </h4>

                  <div className="space-y-6">
                    {/* 1. Account Information */}
                    <div>
                      <h5
                        className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                          }`}
                      >
                        1. Account Information
                      </h5>
                      <p
                        className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          } leading-relaxed`}
                      >
                        When you create an account with NurCycle, we collect and store:
                      </p>
                      <ul
                        className={`list-disc list-inside ml-4 mt-2 space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                      >
                        <li>Name (optional or as provided by you)</li>
                        <li>Email address (required for account creation, login, and communication)</li>
                        <li>Password (stored securely in encrypted form)</li>
                        <li>Profile details, including your avatar/profile picture (if uploaded)</li>
                        <li>Sensitive details (year/month of birth, country of residence/origin)</li>
                        <li>Health concerns (e.g., thyroids, continuous bleeding, miscarriages, etc.)</li>
                        <li>
                          Religious concerns (understanding Islamic rulings on fasting, praying during
                          irregular bleeding, etc.)
                        </li>
                      </ul>
                      <p
                        className={`mt-2 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          } leading-relaxed`}
                      >
                        This information allows you to create and manage your personal profile within
                        the App.
                      </p>
                    </div>

                    {/* 2. Health and Wellness Data */}
                    <div>
                      <h5
                        className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                          }`}
                      >
                        2. Health and Wellness Data
                      </h5>
                      <p
                        className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          } leading-relaxed`}
                      >
                        As a women’s health tracking application, NurCycle allows you to input
                        sensitive personal data, including but not limited to:
                      </p>
                      <ul
                        className={`list-disc list-inside ml-4 mt-2 space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                      >
                        <li>Menstrual cycle information (start/end dates, flow levels)</li>
                        <li>Fertility-related data (ovulation, basal body temperature, mucus)</li>
                        <li>Pregnancy information (status, trimester, symptoms, loss)</li>
                        <li>Symptom tracking (mood, energy, physical symptoms, sexual health)</li>
                      </ul>
                      <p
                        className={`mt-2 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          } leading-relaxed`}
                      >
                        This information is stored securely and used to generate personalized insights,
                        predictions, and educational content within the App.
                      </p>
                    </div>

                    {/* 3. Community Interaction Data */}
                    <div>
                      <h5
                        className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                          }`}
                      >
                        3. Community Interaction Data
                      </h5>
                      <p
                        className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          } leading-relaxed`}
                      >
                        NurCycle includes community features that allow you to connect with others.
                        When you participate, we may collect:
                      </p>
                      <ul
                        className={`list-disc list-inside ml-4 mt-2 space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                      >
                        <li>Posts, comments, and discussions you share</li>
                        <li>Messages you send or receive</li>
                        <li>Likes, reactions, or other interactions</li>
                      </ul>
                      <p
                        className={`mt-2 italic ${settings.darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                      >
                        Please note: any information you voluntarily share may be visible to other
                        users, depending on the privacy settings of the platform.
                      </p>
                    </div>

                    {/* 4. Device and App Usage Data */}
                    <div>
                      <h5
                        className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                          }`}
                      >
                        4. Device and App Usage Data
                      </h5>
                      <p
                        className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          } leading-relaxed`}
                      >
                        To improve performance and user experience, we may collect limited technical
                        and usage data, such as:
                      </p>
                      <ul
                        className={`list-disc list-inside ml-4 mt-2 space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                      >
                        <li>Device type and operating system (e.g., iOS, Android)</li>
                        <li>App version and diagnostic info (e.g., crash reports, error logs)</li>
                      </ul>
                      <p
                        className={`mt-2 font-medium ${settings.darkMode ? "text-red-300" : "text-red-700"
                          }`}
                      >
                        ⚠️ We do not use cookies, IP tracking, or online behavioral tracking tools.
                        Our aim is to provide a private, secure experience, free from intrusive
                        advertising technologies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>


            )}
          </CardContent>
        </Card>


        {/*legal-basis-processing Section */}
        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border-0'} `}></div>
          <CardContent className="relative z-10 p-0">
            <div
              className={`p-4 cursor-pointer ${settings.darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-50'} transition-colors`}
              onClick={() => toggleSection('legal-basis-processing')}
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  ⚖️ {getLocalizedText('Legal Basis for Processing')}
                </h3>
                {expandedSection === 'legal-basis-processing' ? (
                  <ChevronDown className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                ) : (
                  <ChevronRight className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                )}
              </div>
            </div>

            {expandedSection === 'legal-basis-processing' && (
              <div
                className={`px-4 pb-4 border-t ${settings.darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-50"
                  }`}
              >
                <div className="space-y-6">
                  {/* Legal Bases */}
                  <div>
                    <p
                      className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      As a company established in the United Kingdom, NurCycle Ltd processes personal
                      data in accordance with the UK General Data Protection Regulation (UK GDPR) and
                      other applicable data protection laws. The legal bases we rely on for collecting
                      and using your personal information include:
                    </p>

                    <h5
                      className={`font-semibold mt-4 mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                    >
                      1. Consent
                    </h5>
                    <p
                      className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      We process certain types of data only when you have given us your clear consent.
                      This applies to:
                    </p>
                    <ul
                      className={`list-disc list-inside ml-4 mt-2 space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                      <li>
                        Health and wellness data you choose to record in the App (e.g., menstrual
                        cycle, fertility, pregnancy, symptom tracking).
                      </li>
                      <li>
                        Community interaction data (e.g., posts, comments, messages, likes) that you
                        voluntarily share with others.
                      </li>
                    </ul>
                    <p
                      className={`mt-2 italic ${settings.darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                      You may withdraw your consent at any time by deleting your data or contacting us
                      at <span className="underline">support@nurcycle.com</span>.
                    </p>
                  </div>

                  {/* How Data is Used */}
                  <div>
                    <h5
                      className={`font-semibold mt-6 mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                    >
                      📌 How Data is Used
                    </h5>

                    {/* 1. Tracking Features */}
                    <div className="mt-4">
                      <h6
                        className={`font-semibold ${settings.darkMode ? "text-white" : "text-gray-900"
                          }`}
                      >
                        1. To Provide Tracking Features
                      </h6>
                      <ul
                        className={`list-disc list-inside ml-4 mt-2 space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                      >
                        <li>
                          Using your health and wellness data to generate personalized insights,
                          predictions, and reminders.
                        </li>
                        <li>Helping you track patterns in your cycle, mood, and wellbeing.</li>
                        <li>
                          Offering tailored health information to support your personal goals.
                        </li>
                      </ul>
                    </div>

                    {/* 2. Community & Social */}
                    <div className="mt-4">
                      <h6
                        className={`font-semibold ${settings.darkMode ? "text-white" : "text-gray-900"
                          }`}
                      >
                        2. To Deliver Community & Social Features
                      </h6>
                      <ul
                        className={`list-disc list-inside ml-4 mt-2 space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                      >
                        <li>Create and manage your profile, share posts, comment, send messages.</li>
                        <li>
                          Support a safe, women-only space where community interaction fosters
                          learning and support.
                        </li>
                        <li>Allow you to control what information you share with other members.</li>
                      </ul>
                    </div>

                    {/* 3. Faith-Based Guidance */}
                    <div className="mt-4">
                      <h6
                        className={`font-semibold ${settings.darkMode ? "text-white" : "text-gray-900"
                          }`}
                      >
                        3. To Provide Faith-Based Guidance
                      </h6>
                      <ul
                        className={`list-disc list-inside ml-4 mt-2 space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                      >
                        <li>
                          Offering Islamic rulings, reminders, and guidance related to menstruation,
                          purity, and women’s health.
                        </li>
                        <li>
                          Sending notifications/reminders (where enabled) that include faith-conscious
                          tips and spiritual encouragement.
                        </li>
                      </ul>
                    </div>

                    {/* 4. Payments */}
                    <div className="mt-4">
                      <h6
                        className={`font-semibold ${settings.darkMode ? "text-white" : "text-gray-900"
                          }`}
                      >
                        4. To Process Payments
                      </h6>
                      <ul
                        className={`list-disc list-inside ml-4 mt-2 space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                      >
                        <li>
                          Premium payments are securely processed by Stripe, our trusted third-party
                          provider.
                        </li>
                        <li>
                          We do not store your credit or debit card details on our servers.
                        </li>
                        <li>
                          Stripe may collect and process financial info per its own privacy practices.
                        </li>
                      </ul>
                    </div>

                    {/* 5. App Maintenance */}
                    <div className="mt-4">
                      <h6
                        className={`font-semibold ${settings.darkMode ? "text-white" : "text-gray-900"
                          }`}
                      >
                        5. To Maintain and Improve the App
                      </h6>
                      <ul
                        className={`list-disc list-inside ml-4 mt-2 space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                      >
                        <li>Using device and app usage data (e.g., crash reports, diagnostics).</li>
                        <li>
                          Improving performance, reliability, and security for a smooth experience.
                        </li>
                        <li>Supporting ongoing feature development.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>



        {/*Data Sharing Section */}
        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border-0'} `}></div>
          <CardContent className="relative z-10 p-0">
            <div
              className={`p-4 cursor-pointer ${settings.darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-50'} transition-colors`}
              onClick={() => toggleSection('data-sharing')}
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  🌐 {getLocalizedText('Data Sharing')}
                </h3>
                {expandedSection === 'data-sharing' ? (
                  <ChevronDown className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                ) : (
                  <ChevronRight className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                )}
              </div>
            </div>

            {expandedSection === 'data-sharing' && (
              <div
                className={`px-4 pb-4 border-t ${settings.darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-50"
                  }`}
              >
                <div className="pt-4 space-y-6">
                  <h4
                    className={`font-semibold text-lg ${settings.darkMode ? "text-white" : "text-gray-900"
                      }`}
                  >
                    🔐 Data Sharing & Privacy Commitment
                  </h4>

                  <p
                    className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                      } leading-relaxed`}
                  >
                    We respect your privacy and are committed to ensuring that your personal data is
                    never sold or misused. NurCycle does not sell, trade, or rent your personal
                    information to third parties.
                  </p>

                  <p
                    className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                      } leading-relaxed`}
                  >
                    However, in order to provide our services effectively, we may share limited data
                    with trusted third-party service providers who support the operation of the App.
                    These providers are contractually bound to handle your data securely and only for
                    the purposes we specify.
                  </p>

                  {/* 1. Third-Party Service Providers */}
                  <div>
                    <h5
                      className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                    >
                      1. Third-Party Service Providers
                    </h5>
                    <ul
                      className={`list-disc list-inside ml-4 space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                      <li>
                        <strong>Supabase:</strong> Used for secure cloud storage and hosting of your
                        data.
                      </li>
                      <li>
                        <strong>Stripe:</strong> Used to process subscription and payment transactions.
                        We do not store your financial details; Stripe handles all sensitive payment
                        information under strict security standards.
                      </li>
                      <li>
                        <strong>Email Services:</strong> Used to send important account updates,
                        support responses, and (where opted in) newsletters or reminders.
                      </li>
                    </ul>
                  </div>

                  {/* 2. Legal Requirements */}
                  <div>
                    <h5
                      className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                    >
                      2. Legal Requirements
                    </h5>
                    <p
                      className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      We may disclose your personal data if required to do so by law, regulation, legal
                      process, or governmental request, but only to the extent necessary and in
                      compliance with applicable laws.
                    </p>
                  </div>

                  {/* 3. Protection of Rights and Safety */}
                  <div>
                    <h5
                      className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                    >
                      3. Protection of Rights and Safety
                    </h5>
                    <p
                      className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      We may share information if necessary to:
                    </p>
                    <ul
                      className={`list-disc list-inside ml-4 mt-2 space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                      <li>Protect the rights, property, or safety of NurCycle, our users, or others.</li>
                      <li>Prevent fraud, security issues, or technical problems.</li>
                    </ul>
                  </div>

                  {/* Final Note */}
                  <p
                    className={`mt-4 font-medium ${settings.darkMode ? "text-green-300" : "text-green-700"
                      }`}
                  >
                    ✅ Important: Aside from the limited cases above, your personal data is never shared
                    with advertisers, marketers, or data brokers.
                  </p>
                </div>
              </div>

            )}
          </CardContent>
        </Card>


        {/*Data Storage & Security */}
        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border-0'} `}></div>
          <CardContent className="relative z-10 p-0">
            <div
              className={`p-4 cursor-pointer ${settings.darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-50'} transition-colors`}
              onClick={() => toggleSection('data-storage-security')}
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  🛡️  {getLocalizedText('Data Storage & Security')}
                </h3>
                {expandedSection === 'data-storage-security' ? (
                  <ChevronDown className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                ) : (
                  <ChevronRight className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                )}
              </div>
            </div>

            {expandedSection === 'data-storage-security' && (
              <div
                className={`px-4 pb-4 border-t ${settings.darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-50"
                  }`}
              >
                <div className="pt-4 space-y-6">
                  <h4
                    className={`font-semibold text-lg ${settings.darkMode ? "text-white" : "text-gray-900"
                      }`}
                  >
                    🛡️ Security & Data Protection
                  </h4>

                  <p
                    className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                      } leading-relaxed`}
                  >
                    We take the protection of your personal information seriously and apply strict
                    technical and organizational measures to safeguard it.
                  </p>

                  {/* 1. Storage Location */}
                  <div>
                    <h5
                      className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                    >
                      1. Storage Location
                    </h5>
                    <p
                      className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      All personal data collected through the NurCycle App is stored securely using
                      Supabase.
                    </p>
                    <p
                      className={`mt-2 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      Data may be stored on servers located in the United Kingdom and/or other regions
                      where Supabase operates, but always in compliance with applicable data protection
                      laws.
                    </p>
                  </div>

                  {/* 2. Encryption & Security Measures */}
                  <div>
                    <h5
                      className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                    >
                      2. Encryption & Security Measures
                    </h5>
                    <ul
                      className={`list-disc list-inside ml-4 mt-2 space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                      <li>
                        <strong>Encryption in transit:</strong> All data exchanged between your device
                        and our servers is encrypted using industry-standard protocols (SSL/TLS).
                      </li>
                      <li>
                        <strong>Encryption at rest:</strong> Sensitive data, including health
                        information and account credentials, is encrypted when stored on our servers.
                      </li>
                      <li>
                        <strong>Password protection:</strong> Account passwords are hashed and stored
                        securely; we cannot view your actual password.
                      </li>
                      <li>
                        <strong>Access controls:</strong> Only authorized personnel with a legitimate
                        business need have limited access to your data, and they are bound by
                        confidentiality obligations.
                      </li>
                      <li>
                        <strong>Regular monitoring:</strong> Our systems are monitored for
                        vulnerabilities and undergo regular security reviews to ensure ongoing
                        protection.
                      </li>
                    </ul>
                  </div>

                  {/* 3. User Responsibility */}
                  <div>
                    <h5
                      className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                    >
                      3. User Responsibility
                    </h5>
                    <p
                      className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      While we take all reasonable steps to secure your data, you are also responsible
                      for:
                    </p>
                    <ul
                      className={`list-disc list-inside ml-4 mt-2 space-y-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                      <li>Keeping your account credentials confidential.</li>
                      <li>Using a strong password and updating it regularly.</li>
                      <li>Not sharing your login details with others.</li>
                    </ul>
                  </div>

                  {/* Commitment Note */}
                  <p
                    className={`mt-4 font-medium ${settings.darkMode ? "text-green-300" : "text-green-700"
                      }`}
                  >
                    🔒 Commitment: We continuously review and enhance our security practices to protect
                    your sensitive health and personal information, recognizing the trust you place in
                    us.
                  </p>
                </div>
              </div>


            )}
          </CardContent>
        </Card>


        {/*Your rights*/}
        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border-0'} `}></div>
          <CardContent className="relative z-10 p-0">
            <div
              className={`p-4 cursor-pointer ${settings.darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-50'} transition-colors`}
              onClick={() => toggleSection('your-rights')}
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  ✋  {getLocalizedText('Your Rights')}
                </h3>
                {expandedSection === 'your-rights' ? (
                  <ChevronDown className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                ) : (
                  <ChevronRight className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                )}
              </div>
            </div>

            {expandedSection === 'your-rights' && (
              <div
                className={`px-4 pb-4 border-t ${settings.darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-50"
                  }`}
              >
                <div className="pt-4 space-y-6">
                  <h4
                    className={`font-semibold text-lg ${settings.darkMode ? "text-white" : "text-gray-900"
                      }`}
                  >
                    📜 Your Rights Under Data Protection Laws
                  </h4>

                  <p
                    className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                      } leading-relaxed`}
                  >
                    As a user of NurCycle, you have certain rights under the UK General Data Protection
                    Regulation (UK GDPR) and other applicable data protection laws. We respect these
                    rights and are committed to making it easy for you to exercise them.
                  </p>

                  {/* Rights List */}
                  <div className="space-y-6">
                    <div>
                      <h5
                        className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                          }`}
                      >
                        1. Access
                      </h5>
                      <p
                        className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          } leading-relaxed`}
                      >
                        Request a copy of the personal data we hold about you, including information you
                        have provided to us.
                      </p>
                    </div>

                    <div>
                      <h5
                        className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                          }`}
                      >
                        2. Correction (Rectification)
                      </h5>
                      <p
                        className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          } leading-relaxed`}
                      >
                        Request that we correct any inaccurate or incomplete personal data.
                      </p>
                    </div>

                    <div>
                      <h5
                        className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                          }`}
                      >
                        3. Deletion (Right to be Forgotten)
                      </h5>
                      <p
                        className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          } leading-relaxed`}
                      >
                        Request that we delete your personal data, subject to certain legal or
                        contractual obligations that may require us to retain some information.
                      </p>
                    </div>

                    <div>
                      <h5
                        className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                          }`}
                      >
                        4. Restriction of Processing
                      </h5>
                      <p
                        className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          } leading-relaxed`}
                      >
                        Request that we limit how your data is processed in specific circumstances
                        (e.g., if you contest the accuracy of the data or object to its processing).
                      </p>
                    </div>

                    <div>
                      <h5
                        className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                          }`}
                      >
                        5. Data Portability
                      </h5>
                      <p
                        className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          } leading-relaxed`}
                      >
                        Receive a copy of the personal data you have provided to us in a structured,
                        commonly used, and machine-readable format, and request that we transfer this
                        data to another service provider where technically feasible.
                      </p>
                    </div>

                    <div>
                      <h5
                        className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                          }`}
                      >
                        6. Withdrawal of Consent
                      </h5>
                      <p
                        className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                          } leading-relaxed`}
                      >
                        Where processing is based on your consent (e.g., health tracking or community
                        interaction), you may withdraw your consent at any time. Withdrawing consent
                        does not affect the lawfulness of processing before the withdrawal.
                      </p>
                    </div>
                  </div>

                  {/* How to Exercise Rights */}
                  <div className="mt-6">
                    <h5
                      className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                    >
                      📌 How to Exercise Your Rights
                    </h5>
                    <p
                      className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      You can exercise any of these rights by contacting us at:{" "}
                      <span className="underline">📧 support@nurcycle.com</span>
                    </p>
                  </div>
                </div>
              </div>

            )}
          </CardContent>
        </Card>


        {/*Special Considerations*/}
        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border-0'} `}></div>
          <CardContent className="relative z-10 p-0">
            <div
              className={`p-4 cursor-pointer ${settings.darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-50'} transition-colors`}
              onClick={() => toggleSection('special-considerations')}
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  🌟 {getLocalizedText('Special Considerations')}
                </h3>
                {expandedSection === 'special-considerations' ? (
                  <ChevronDown className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                ) : (
                  <ChevronRight className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                )}
              </div>
            </div>

            {expandedSection === 'special-considerations' && (
              <div
                className={`px-4 pb-4 border-t ${settings.darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-50"
                  }`}
              >
                <div className="pt-4 space-y-6">
                  <h4
                    className={`font-semibold text-lg ${settings.darkMode ? "text-white" : "text-gray-900"
                      }`}
                  >
                    🌸 Women’s Health Sensitivity & Faith-Conscious Environment
                  </h4>

                  <p
                    className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                      } leading-relaxed`}
                  >
                    At NurCycle, we recognize the unique sensitivities surrounding women’s health data
                    and the importance of providing a respectful and faith-conscious environment for
                    our users.
                  </p>

                  {/* 1. Female-Only Space */}
                  <div>
                    <h5
                      className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                    >
                      1. Female-Only Space
                    </h5>
                    <p
                      className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      NurCycle is designed to be a female-only digital space. Our community features
                      are intended exclusively for women, fostering a safe, supportive, and respectful
                      environment. We actively monitor the platform to protect against misuse and
                      maintain the integrity of this women-only commitment.
                    </p>
                  </div>

                  {/* 2. Islamic Sensitivity & Privacy */}
                  <div>
                    <h5
                      className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                    >
                      2. Islamic Sensitivity & Privacy
                    </h5>
                    <p
                      className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      We understand the sensitivity of personal and health-related information,
                      especially in relation to menstruation, fertility, and other private matters.
                    </p>
                    <p
                      className={`mt-2 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      All data is treated with strict confidentiality and is never visible to other
                      users unless you choose to share it (e.g., through community posts or profile
                      interactions).
                    </p>
                    <p
                      className={`mt-2 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      Faith-based reminders, rulings, and guidance provided through the App are
                      delivered privately and securely, ensuring your personal health details remain
                      confidential.
                    </p>
                  </div>

                  {/* Final Commitment */}
                  <p
                    className={`mt-4 font-medium ${settings.darkMode ? "text-green-300" : "text-green-700"
                      }`}
                  >
                    ✅ Commitment: Your dignity, privacy, and trust are at the heart of NurCycle. We
                    will never expose or misuse your personal data in ways that compromise your faith,
                    modesty, or safety.
                  </p>
                </div>
              </div>

            )}
          </CardContent>
        </Card>



        {/*Data Retention*/}
        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border-0'} `}></div>
          <CardContent className="relative z-10 p-0">
            <div
              className={`p-4 cursor-pointer ${settings.darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-50'} transition-colors`}
              onClick={() => toggleSection('data-retention')}
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  📂 {getLocalizedText('Data Retention')}
                </h3>
                {expandedSection === 'data-retention' ? (
                  <ChevronDown className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                ) : (
                  <ChevronRight className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                )}
              </div>
            </div>

            {expandedSection === 'data-retention' && (
              <div
                className={`px-4 pb-4 border-t ${settings.darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-50"
                  }`}
              >
                <div className="pt-4 space-y-6">
                  <h4
                    className={`font-semibold text-lg ${settings.darkMode ? "text-white" : "text-gray-900"
                      }`}
                  >
                    ⏳ Data Retention & Complaints
                  </h4>

                  <p
                    className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                      } leading-relaxed`}
                  >
                    NurCycle is committed to retaining your personal information only for as long as
                    necessary to provide our services, comply with legal obligations, and protect our
                    users.
                  </p>

                  {/* 1. Health & Wellness Data */}
                  <div>
                    <h5
                      className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                    >
                      1. Health & Wellness Data
                    </h5>
                    <p
                      className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      Information such as menstrual cycle, fertility, pregnancy, and symptom tracking
                      is retained for the duration of your active account.
                    </p>
                    <p
                      className={`mt-2 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      If you delete your account or request deletion, this data is permanently removed
                      from our servers, except where retention is required for legal or security
                      reasons.
                    </p>
                  </div>

                  {/* 2. Account Information */}
                  <div>
                    <h5
                      className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                    >
                      2. Account Information
                    </h5>
                    <p
                      className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      Your name, email, password, and profile/avatar are stored as long as your
                      account is active.
                    </p>
                    <p
                      className={`mt-2 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      Upon account deletion, your account credentials and profile information are
                      securely erased.
                    </p>
                  </div>

                  {/* 3. Community Interaction Data */}
                  <div>
                    <h5
                      className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                    >
                      3. Community Interaction Data
                    </h5>
                    <p
                      className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      Posts, comments, messages, and likes remain stored for as long as your account
                      exists.
                    </p>
                    <p
                      className={`mt-2 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      Content you choose to share publicly or within the community will remain visible
                      to other users unless you delete it or your account is removed.
                    </p>
                  </div>

                  {/* 4. Technical and Usage Data */}
                  <div>
                    <h5
                      className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                    >
                      4. Technical and Usage Data
                    </h5>
                    <p
                      className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      Device and app usage data (e.g., crash reports, diagnostics) are retained
                      temporarily to support app performance, security, and troubleshooting, and are
                      regularly purged once no longer needed.
                    </p>
                  </div>

                  {/* Permanent Deletion */}
                  <div>
                    <h5
                      className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                    >
                      Permanent Deletion
                    </h5>
                    <p
                      className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      When data is deleted, it is removed from active systems and backups are
                      anonymized or securely destroyed over time, in line with standard Supabase
                      retention and security practices.
                    </p>
                    <p
                      className={`mt-2 font-medium ${settings.darkMode ? "text-green-300" : "text-green-700"
                        }`}
                    >
                      ✅ Commitment: We retain your information only for legitimate purposes and
                      securely remove it when it is no longer needed, ensuring your privacy is
                      respected at all times.
                    </p>
                  </div>

                  {/* How to Make a Complaint */}
                  <div className="mt-6">
                    <h5
                      className={`font-semibold mb-2 ${settings.darkMode ? "text-purple-400" : "text-purple-700"
                        }`}
                    >
                      📝 How to Make a Complaint
                    </h5>
                    <p
                      className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      You may raise any concerns about how your data is processed by contacting us at
                      the email above.
                    </p>
                    <p
                      className={`mt-2 ${settings.darkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                    >
                      If you are not satisfied with our response, you also have the right to lodge a
                      complaint with a relevant data protection authority, such as the UK Information
                      Commissioner’s Office (ICO).
                    </p>
                    <p
                      className={`mt-2 font-medium ${settings.darkMode ? "text-green-300" : "text-green-700"
                        }`}
                    >
                      ✅ Commitment: We aim to resolve all issues fairly, transparently, and in a
                      timely manner, ensuring your privacy rights are fully respected.
                    </p>
                  </div>
                </div>
              </div>

            )}
          </CardContent>
        </Card>


        {/* Privacy Policy Conclusion*/}

        <Card className="relative overflow-hidden card-3d">
          <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white border-0'} `}></div>
          <CardContent className="relative z-10 p-0">
            <div
              className={`p-4 cursor-pointer ${settings.darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-50'} transition-colors`}
              onClick={() => toggleSection('privacy-policy-conclusion')}
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  🏁 {getLocalizedText('Privacy Policy Conclusion')}
                </h3>
                {expandedSection === 'privacy-policy-conclusion' ? (
                  <ChevronDown className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                ) : (
                  <ChevronRight className={`w-5 h-5 ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                )}
              </div>
            </div>

            {expandedSection === 'privacy-policy-conclusion' && (
              <div
                className={`px-4 pb-4 border-t ${settings.darkMode ? "bg-slate-900 border-slate-700" : "bg-gray-50"
                  }`}
              >
                <div className="pt-4 space-y-6">

                  <p
                    className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                      } leading-relaxed`}
                  >
                    At NurCycle Ltd, we are deeply committed to protecting your privacy, your data, and
                    your trust. We understand the sensitivity of the information you choose to share
                    with us, and we handle it with the highest care, responsibility, and respect for
                    your rights and faith values.
                  </p>

                  <p
                    className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                      } leading-relaxed`}
                  >
                    By using the NurCycle App, you can feel confident that your personal and health
                    information is safeguarded, used only for the purposes you consent to, and never
                    sold to third parties. Our aim is to empower you with tools for health tracking,
                    Islamic guidance, and community support, while keeping your safety and dignity at
                    the center of everything we do.
                  </p>

                  <p
                    className={`${settings.darkMode ? "text-gray-300" : "text-gray-700"
                      } leading-relaxed`}
                  >
                    We encourage you to read this Privacy Policy carefully and reach out to us with any
                    questions at{" "}
                    <span className="underline font-medium">📧 support@nurcycle.com</span>.
                  </p>
                </div>
              </div>


            )}
          </CardContent>
        </Card>


        {/* Delete Account Section */}
        <Card className="relative overflow-hidden">
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
