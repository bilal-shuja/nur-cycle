import { useState, useEffect } from 'react';
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


  const htmlToText = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };


  // const handleDownloadPDF = () => {
  //   toast({
  //     title: "Download Started",
  //     description: "Terms and Conditions PDF is being prepared for download",
  //   });
  //   toast({
  //     title: "Download Started",
  //     description: "Terms and Conditions PDF is being prepared for download",
  //   });

  //   const doc = new jsPDF();
  //   const margin = 10;
  //   let y = margin;

  //   doc.setFontSize(14);
  //   doc.text("Terms and Conditions", margin, y);
  //   y += 10;

  //   doc.setFontSize(10);
  //   doc.text(`Effective Date: ${termsData.effectiveDate}`, margin, y);
  //   y += 6;
  //   doc.text(`Last Updated: ${termsData.lastUpdated}`, margin, y);
  //   y += 6;
  //   doc.text(`Version: ${termsData.version}`, margin, y);
  //   y += 10;

  //   termsData.sections.forEach((section, index) => {
  //     doc.setFontSize(12);
  //     doc.setFont(undefined, "bold");
  //     doc.text(`${index + 1}. ${section.title}`, margin, y);
  //     y += 6;

  //     doc.setFontSize(10);
  //     doc.setFont(undefined, "normal");

  //     const splitText = doc.splitTextToSize(section.content, 180); 
  //     if (y + splitText.length * 6 > 280) {
  //       doc.addPage();
  //       y = margin;
  //     }
  //     doc.text(splitText, margin, y);
  //     y += splitText.length * 6 + 4;
  //   });

  //   doc.save("terms-and-conditions.pdf");
  // };
  const handleDownloadPDF = () => {
    toast({
      title: "Download Started",
      description: "Terms and Conditions PDF is being prepared for download",
    });

    const doc = new jsPDF();
    const margin = 10;
    let y = margin;

    // Header
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

    // Sections
    termsData.sections.forEach((section, index) => {
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text(`${index + 1}. ${section.title}`, margin, y);
      y += 6;

      doc.setFontSize(10);
      doc.setFont(undefined, "normal");

      // Extract raw text safely
      let rawContent = "";
      if (typeof section.content === "string") {
        rawContent = section.content;
      } else if (section.content?.props?.dangerouslySetInnerHTML?.__html) {
        rawContent = htmlToText(section.content.props.dangerouslySetInnerHTML.__html);
      }

      const splitText = doc.splitTextToSize(rawContent, 180);
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
    effectiveDate: "August 30, 2025",
    lastUpdated: "December 27, 2024",
    version: "1.2",
    sections: [
      {
        id: 'eligibility',
        title: getLocalizedText('Eligibility & Access'),
        icon: FileText,
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: `
          <ul>
            <li>
              <strong>Minimum Age Requirement:</strong>
              To use the NurCycle App, you must be at least 16 years of age. By creating
              an account or using the App, you confirm that you meet this age requirement.
            </li>
            <li>
              <strong>Female-Only Space:</strong>
              NurCycle is designed as a female-only digital space, in line with our
              commitment to creating a safe and supportive environment based on Islamic
              principles. Users must identify as female to access and participate in
              community features. Any attempt to bypass this requirement may result in
              suspension or termination of your account.
            </li>
            <li>
              <strong>Account Responsibility:</strong>
              <ul>
                <li>Users are responsible for providing accurate and complete information during account registration.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
              </ul>
            </li>
          </ul>
        `
            }}
          />
        )
      },
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
        // content: getLocalizedText('user.accounts.content')
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: `
          <ul class="list-none  space-y-3">
            <li>
              <strong>Account Security:</strong><br/>
              You are responsible for keeping your login details (such as your email and
              password) safe and confidential.<br/>
              NurCycle Ltd cannot be held liable for any loss or damage resulting from
              unauthorized access caused by your failure to protect your account
              credentials.
            </li>

            <li>
              <strong>Accuracy of Information:</strong><br/>
              You agree to provide accurate, complete, and up-to-date information when
              creating and maintaining your account.<br/>
              Providing false, misleading, or incomplete information may lead to account
              suspension or termination.
            </li>

            <li>
              <strong>Account Misuse:</strong><br/>
              You agree not to share your account with others or allow unauthorized
              access.<br/>
              NurCycle Ltd reserves the right to suspend or terminate any account where
              misuse, breach of these Terms, or suspicious activity is detected.
            </li>

            <li>
              <strong>Termination by User:</strong><br/>
              You may delete your account at any time through the App settings. Upon deletion, your data will be handled according to our Privacy Policy.
            </li>
          </ul>
        `
            }}
          />
        )
      },
      {
        id: 'permittedUses',
        title: getLocalizedText('Permitted & Prohibited Uses'),
        icon: Shield,
        // content: getLocalizedText('user.accounts.content')
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: `
        <ul class="list-none  space-y-3">
          <li>
            <strong >Permitted Uses:</strong><br/>
            When using NurCycle, you agree to:
            <ul class="list-disc ml-6 mt-2 space-y-2">
              <li>Engage in respectful and modest communication within the community features.</li>
              <li>Share experiences, advice, and support in a manner consistent with Islamic values and community respect.</li>
              <li>Use the health-tracking and community features responsibly and only for their intended purpose.</li>
            </ul>
          </li>

          <li>
            <strong>Prohibited Uses:</strong><br/>
            You must not, under any circumstances:
            <ul class="list-disc ml-6 mt-2 space-y-2">
              <li>Harass, bully, threaten, or abuse other users.</li>
              <li>
                Post content that is offensive, inappropriate, or contrary to Islamic principles, including but not limited to:
                <ul class="list-disc ml-6 mt-2 space-y-1">
                  <li>Obscene, vulgar, or sexually explicit material.</li>
                  <li>Hate speech, discriminatory remarks, or inflammatory comments.</li>
                  <li>Content promoting alcohol, drugs, or other un-Islamic practices.</li>
                </ul>
              </li>
              <li>Misuse health features (e.g., inputting false or misleading health data).</li>
              <li>Impersonate another person, misrepresent your identity, or create multiple accounts to deceive others.</li>
              <li>Attempt to hack, disrupt, or interfere with the operation of the App.</li>
            </ul>
          </li>

          <li>
            <strong>Enforcement:</strong><br/>
            NurCycle Ltd reserves the right to remove any content that violates these rules.<br/>
            Accounts that repeatedly or severely breach these standards may be suspended or permanently terminated without notice.
          </li>
        </ul>
      `
            }}
          />
        )

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
        // content: getLocalizedText('intellectual.property.content')
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: `
        <ul class="list-none  space-y-3">

          <li>
            <strong>Ownership of the App:</strong><br/>
            The NurCycle App, including its design, features, software, branding, logos, and all related intellectual property, is owned and operated by NurCycle Ltd.<br/>
            You may not copy, reproduce, distribute, or create derivative works from any part of the App without prior written consent from NurCycle Ltd.
          </li>

          <li>
            <strong>User-Generated Content:</strong><br/>
            Users retain ownership of the content they create and share on NurCycle (such as posts, comments, and messages).<br/>
            By posting or submitting content within the App, you grant NurCycle Ltd a non-exclusive, royalty-free, worldwide license to display, reproduce, and distribute your content within the App for the purposes of operating the community.<br/>
            This license ends when you delete your content or account, except where your content has already been shared, quoted, or interacted with by other users.
          </li>

          <li>
            <strong>Respecting Others’ Content:</strong><br/>
            You may not copy, download, or redistribute other users’ posts, comments, or shared content without their explicit consent.
          </li>

          <li>
            <strong>Trademarks:</strong><br/>
            All trademarks, service marks, and trade names associated with NurCycle are the property of NurCycle Ltd and may not be used without authorization.
          </li>
        </ul>
      `
            }}
          />
        )
      },
      {
        id: 'Payments',
        title: getLocalizedText('Payments & Subscriptions'),
        icon: Globe,
        // content: getLocalizedText('intellectual.property.content')
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: `
        <ul class="list-none space-y-3">

          <li>
            <strong>Payment Processing:</strong><br/>
            Certain features of the NurCycle App may be offered on a paid basis, such as premium pregnancy tools, AI content, and community features.<br/>
            All payments are securely processed through Stripe, a third-party payment provider. By making a payment, you also agree to Stripe’s own terms and privacy policy.<br/>
            NurCycle Ltd does not store or have access to your full payment details.
          </li>

          <li>
            <strong>Subscription Plans:</strong><br/>
            If the App offers subscription-based services, you will be informed of the applicable fees, billing cycles, and renewal terms before purchase.<br/>
            Subscriptions will automatically renew unless you cancel before the next billing cycle.
          </li>

          <li>
            <strong>Refund Policy:</strong><br/>
            Except where required by law, payments are non-refundable once a subscription period has begun.<br/>
            If you experience technical issues or believe you have been wrongly charged, you may contact us at <span class="underline">support@nurcycle.com</span>.
          </li>

        </ul>
      `
            }}
          />
        )

      },
      {
        id: 'Medical',
        title: getLocalizedText('Medical Disclaimer'),
        icon: Globe,
        // content: getLocalizedText('intellectual.property.content')
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: `
        <ul class="list-none space-y-3">

          <li>
            <strong>Informational Purposes Only:</strong><br/>
            The NurCycle App provides tools, resources, and educational content to help users track their menstrual cycles, fertility, pregnancy, and related health information.<br/>
            All information provided through the App is for informational and educational purposes only.
          </li>

          <li>
            <strong>No Substitute for Professional Advice:</strong><br/>
            The App is not a substitute for professional medical advice, diagnosis, or treatment.<br/>
            You should always seek the advice of a qualified healthcare provider regarding any questions or concerns about your health, medical conditions, or treatments.
          </li>

          <li>
            <strong>No Medical Liability:</strong><br/>
            NurCycle Ltd does not guarantee the accuracy, completeness, or usefulness of health information provided through the App.<br/>
            Reliance on any information within the App is at your own risk.<br/>
            If you experience any medical emergency, you should immediately contact your doctor or emergency services.
          </li>

        </ul>
      `
            }}
          />
        )


      },
      {
        id: 'Islamic Disclaimer',
        title: getLocalizedText('Islamic Disclaimer'),
        icon: Globe,
        // content: getLocalizedText('intellectual.property.content')
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: `
        <ul class="list-none space-y-3">

          <li>
            <strong>Source of Guidance:</strong><br/>
            The Islamic reminders, rulings, and educational content provided within the NurCycle App are based on references from the Qur’an and Sunnah, as understood from reliable scholarly sources. The book <em>Natural Blood of Women</em> by Shayekh Muhammad bin Salih Al-Utheimeen is a core reference used in this app.<br/>
            The purpose of this content is to offer general guidance and reminders to support Muslim women in matters related to menstruation, purity, and women’s health.
          </li>

          <li>
            <strong>No Replacement for a Fatwa:</strong><br/>
            The guidance offered in the App does not replace the role of a qualified scholar (alim/alimah) or an official fatwa.<br/>
            For personal or complex religious matters, you are strongly encouraged to consult a qualified Islamic scholar or your local religious authority.
          </li>

          <li>
            <strong>Limitation of Responsibility:</strong><br/>
            While NurCycle strives to ensure accuracy in presenting Islamic content, NurCycle Ltd is not responsible for individual outcomes or decisions made solely on the basis of the information provided in the App.
          </li>

        </ul>
      `
            }}
          />
        )


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
        // content: getLocalizedText('termination.content')
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: `
        <ul class="list-none space-y-3">

          <li>
            <strong>Right to Suspend or Terminate:</strong><br/>
            NurCycle Ltd reserves the right to suspend, restrict, or permanently terminate a user’s account at any time if:
            <ul class="list-disc ml-6 mt-2 space-y-1">
              <li>There is a breach of these Terms & Conditions.</li>
              <li>The account is used in a way that violates the female-only space requirement or Islamic principles of modesty and respect.</li>
              <li>Misuse, fraud, harassment, or harmful behavior is detected.</li>
              <li>The account is used in a manner that could harm the App, its community, or other users.</li>
            </ul>
          </li>

          <li>
            <strong>Notice of Termination:</strong><br/>
            Where possible, we will provide notice and an explanation before suspending or terminating an account. However, in cases of severe or repeated violations, termination may be immediate and without prior notice.
          </li>

          <li>
            <strong>Effect of Termination:</strong><br/>
            Upon termination, your right to access and use the App will cease immediately.<br/>
            Any remaining data associated with your account will be handled in accordance with our Privacy Policy.
          </li>

          <li>
            <strong>Voluntary Account Deletion:</strong><br/>
            You may choose to delete your account at any time via the App settings. Once deleted, your data will be removed or anonymized as outlined in our Privacy Policy.
          </li>

        </ul>
      `
            }}
          />
        )

      },
      {
        id: 'Limitation',
        title: getLocalizedText('limitation.of.liability'),
        icon: Globe,
        // content: getLocalizedText('limitation.of.liability.content')
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: `
        <ul class="list-none space-y-3">

          <li>
            <strong>No Medical Liability:</strong><br/>
            NurCycle Ltd is not responsible for any medical outcomes, decisions, or health conditions that may arise from the use of the App.<br/>
            The App is for informational and educational purposes only and must not be relied upon as a substitute for professional medical advice or treatment.
          </li>

          <li>
            <strong>Third-Party Services:</strong><br/>
            NurCycle Ltd is not liable for issues caused by third-party providers such as Stripe (payments), Supabase (data storage), or any external links or integrations used in the App.<br/>
            Any disputes, errors, or misuse arising from third-party services should be addressed directly with the respective provider.
          </li>

          <li>
            <strong>Community Content:</strong><br/>
            NurCycle Ltd is not responsible for the accuracy, safety, or reliability of content shared by users within the community features.<br/>
            You are solely responsible for the interactions you choose to engage in.
          </li>

          <li>
            <strong>General Limitation:</strong><br/>
            To the fullest extent permitted by law, NurCycle Ltd shall not be liable for:
            <ul class="list-disc ml-6 mt-2 space-y-1">
              <li>Any indirect, incidental, or consequential damages (including loss of data, profits, or goodwill).</li>
              <li>Any harm caused by unauthorized access, misuse, or disclosure of user data beyond NurCycle’s reasonable control.</li>
            </ul>
          </li>

        </ul>
      `
            }}
          />
        )


      },
      {
        id: 'Governing',
        title: getLocalizedText('Governing Law'),
        icon: Globe,
        // content: getLocalizedText('limitation.of.liability.content')
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: `
        <p>
          These Terms & Conditions and your use of the NurCycle App shall be governed by and
          interpreted in accordance with the laws of:
        </p>
        <ul class="list-disc ml-6 space-y-2">
          <li><strong>England and Wales</strong> (for users in the United Kingdom),</li>
          <li><strong>European Union law</strong> (for users within the EU), and</li>
          <li><strong>The laws of the United States</strong> (for users in the U.S., excluding the State of California).</li>
        </ul>
        <p class="mt-3 leading-relaxed">
          By using the App, you agree to submit to the exclusive jurisdiction of the courts
          relevant to your place of residence as outlined above.
        </p>
      `
            }}
          />
        )
      },
      {
        id: 'FinalProvisions',
        title: getLocalizedText('Final Provisions & Acceptance'),
        icon: Globe,
        // content: getLocalizedText('limitation.of.liability.content')
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: `
        <p class="leading-relaxed mb-3">
          At NurCycle Ltd, our mission is to provide a safe, supportive, and faith-conscious
          space where women can track their health with confidence and benefit from both
          scientific insights and Islamic guidance. By using the NurCycle App, you are joining
          a community built on respect, modesty, and sisterhood.
        </p>

        <p class="leading-relaxed mb-3">
          We regularly update our app to help you improve your data protection compliance.
          Setting regular reminders to check our news and guidance pages will help keep you
          on track.
        </p>

        <p class="leading-relaxed mb-3">
          By continuing to use the App, you confirm that you have read, understood, and agreed
          to these Terms & Conditions. We encourage you to use NurCycle with trust and peace of
          mind, knowing that your wellbeing, privacy, and faith values are at the heart of what
          we do.
        </p>

        <p class="leading-relaxed">
          If you have any questions, concerns, or suggestions, we are always here to listen.
          Please contact us anytime at
          <span class="underline font-medium"> 📧 support@nurcycle.com</span>.
        </p>
      `
            }}
          />
        )

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
          <div className="px-3 py-6 space-y-6">


            <div className={`relative overflow-hidden ${settings.darkMode ? 'bg-slate-900 text-white' : ' from-lavender-500 to-lavender-700'}`}>
              <div className="absolute inset-0 opacity-20"></div>
              <div className="relative z-10 p-6 text-center">
                <h2 className={`text-xl font-bold mb-2 ${settings.darkMode ? 'text-white' : 'text-black'}`}>
                  📜 {getLocalizedText('terms.of.use')}
                </h2>
                <p className={`text-sm opacity-90 ${settings.darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  {getLocalizedText('effective')}: August 30, 2025
                  {/* {termsData.effectiveDate} */}
                </p>
                <p className={`text-sm opacity-90 ${settings.darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  {getLocalizedText('version')}: {termsData.version}
                </p>
              </div>
            </div>


            <Card className="relative overflow-hidden card-3d">
              <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-lavender-500 to-lavender-700'}`}></div>
              <CardContent className="relative z-10 p-6">
                <p className={`leading-relaxed mb-4 ${settings.darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                  Welcome to <strong>NurCycle</strong> — your faith-conscious companion for period, fertility, and wellness tracking.
                  By using the NurCycle app, you agree to the following Terms and Conditions. Please read them carefully.
                </p>
              </CardContent>
            </Card>

            {
              [
                {
                  number: '1',
                  title: getLocalizedText('Eligibility & Access'),
                  content: (
                    <div>

                      <ul>
                        <li>
                          <strong>Minimum Age Requirement:</strong>
                          To use the NurCycle App, you must be at least 16 years of age. By creating
                          an account or using the App, you confirm that you meet this age requirement.
                        </li>
                        <li>
                          <strong>Female-Only Space:</strong>
                          NurCycle is designed as a female-only digital space, in line with our
                          commitment to creating a safe and supportive environment based on Islamic
                          principles. Users must identify as female to access and participate in
                          community features. Any attempt to bypass this requirement may result in
                          suspension or termination of your account.
                        </li>
                        <li>
                          <strong>Account Responsibility:</strong>
                          <ul>
                            <li>Users are responsible for providing accurate and complete information during account registration.</li>
                            <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  )
                },
                {
                  number: '2',
                  title: getLocalizedText('acceptance.of.terms'),
                  content: getLocalizedText('terms.content')
                },
                {
                  number: '3',
                  title: getLocalizedText('what.nurcycle.offers'),
                  content: getLocalizedText('nurcycle.offers.content')
                },
                {
                  number: '4',
                  title: getLocalizedText('user.accounts'),
                  // content: getLocalizedText('user.accounts.content')
                  content: (
                    <ul>
                      <li>
                        <strong>Account Security:</strong><br />
                        You are responsible for keeping your login details (such as your email and
                        password) safe and confidential.<br />
                        NurCycle Ltd cannot be held liable for any loss or damage resulting from
                        unauthorized access caused by your failure to protect your account
                        credentials.
                      </li>

                      <li>
                        <strong>Accuracy of Information:</strong><br />
                        You agree to provide accurate, complete, and up-to-date information when
                        creating and maintaining your account.<br />
                        Providing false, misleading, or incomplete information may lead to account
                        suspension or termination.
                      </li>

                      <li>
                        <strong>Account Misuse:</strong><br />
                        You agree not to share your account with others or allow unauthorized
                        access.<br />
                        NurCycle Ltd reserves the right to suspend or terminate any account where
                        misuse, breach of these Terms, or suspicious activity is detected.
                      </li>

                      <li>
                        <strong>Termination by User:</strong><br />
                        You may delete your account at any time through the App settings. Upon deletion, your data will be handled according to our Privacy Policy.
                      </li>
                    </ul>)
                },
                {
                  number: '5',
                  title: getLocalizedText('Permitted & Prohibited Uses'),
                  content: (
                    <ul>
                      <li>
                        <strong >Permitted Uses:</strong><br />
                        When using NurCycle, you agree to:
                        <ul >
                          <li>Engage in respectful and modest communication within the community features.</li>
                          <li>Share experiences, advice, and support in a manner consistent with Islamic values and community respect.</li>
                          <li>Use the health-tracking and community features responsibly and only for their intended purpose.</li>
                        </ul>
                      </li>

                      <li>
                        <strong>Prohibited Uses:</strong><br />
                        You must not, under any circumstances:
                        <ul >
                          <li>Harass, bully, threaten, or abuse other users.</li>
                          <li>
                            Post content that is offensive, inappropriate, or contrary to Islamic principles, including but not limited to:
                            <ul>
                              <li>Obscene, vulgar, or sexually explicit material.</li>
                              <li>Hate speech, discriminatory remarks, or inflammatory comments.</li>
                              <li>Content promoting alcohol, drugs, or other un-Islamic practices.</li>
                            </ul>
                          </li>
                          <li>Misuse health features (e.g., inputting false or misleading health data).</li>
                          <li>Impersonate another person, misrepresent your identity, or create multiple accounts to deceive others.</li>
                          <li>Attempt to hack, disrupt, or interfere with the operation of the App.</li>
                        </ul>
                      </li>

                      <li>
                        <strong>Enforcement:</strong><br />
                        NurCycle Ltd reserves the right to remove any content that violates these rules.<br />
                        Accounts that repeatedly or severely breach these standards may be suspended or permanently terminated without notice.
                      </li>
                    </ul>
                  )
                },
                {
                  number: '6',
                  title: getLocalizedText('user.data.and.privacy'),
                  content: getLocalizedText('user.data.and.privacy.content')
                },
                {
                  number: '7',
                  title: getLocalizedText('health.disclaimer'),
                  content: getLocalizedText('health.disclaimer.content')
                },
                {
                  number: '8',
                  title: getLocalizedText('community.conduct'),
                  content: getLocalizedText('community.conduct.content')
                },
                {
                  number: '9',
                  title: getLocalizedText('intellectual.property'),
                  // content: getLocalizedText('intellectual.property.content')
                  content: (
                    <ul>

                      <li>
                        <strong>Ownership of the App:</strong><br />
                        The NurCycle App, including its design, features, software, branding, logos, and all related intellectual property, is owned and operated by NurCycle Ltd.<br />
                        You may not copy, reproduce, distribute, or create derivative works from any part of the App without prior written consent from NurCycle Ltd.
                      </li>

                      <li>
                        <strong>User-Generated Content:</strong><br />
                        Users retain ownership of the content they create and share on NurCycle (such as posts, comments, and messages).<br />
                        By posting or submitting content within the App, you grant NurCycle Ltd a non-exclusive, royalty-free, worldwide license to display, reproduce, and distribute your content within the App for the purposes of operating the community.<br />
                        This license ends when you delete your content or account, except where your content has already been shared, quoted, or interacted with by other users.
                      </li>

                      <li>
                        <strong>Respecting Others’ Content:</strong><br />
                        You may not copy, download, or redistribute other users’ posts, comments, or shared content without their explicit consent.
                      </li>

                      <li>
                        <strong>Trademarks:</strong><br />
                        All trademarks, service marks, and trade names associated with NurCycle are the property of NurCycle Ltd and may not be used without authorization.
                      </li>
                    </ul>
                  )
                },
                {
                  number: '10',
                  title: getLocalizedText('Payments & Subscriptions'),
                  content: (
                    <ul>

                      <li>
                        <strong>Payment Processing:</strong><br />
                        Certain features of the NurCycle App may be offered on a paid basis, such as premium pregnancy tools, AI content, and community features.<br />
                        All payments are securely processed through Stripe, a third-party payment provider. By making a payment, you also agree to Stripe’s own terms and privacy policy.<br />
                        NurCycle Ltd does not store or have access to your full payment details.
                      </li>

                      <li>
                        <strong>Subscription Plans:</strong><br />
                        If the App offers subscription-based services, you will be informed of the applicable fees, billing cycles, and renewal terms before purchase.<br />
                        Subscriptions will automatically renew unless you cancel before the next billing cycle.
                      </li>

                      <li>
                        <strong>Refund Policy:</strong><br />
                        Except where required by law, payments are non-refundable once a subscription period has begun.<br />
                        If you experience technical issues or believe you have been wrongly charged, you may contact us at <span>support@nurcycle.com</span>.
                      </li>

                    </ul>
                  )
                },
                {
                  number: '11',
                  title: getLocalizedText('Medical Disclaimer'),
                  content: (
                    <ul>

                      <li>
                        <strong>Informational Purposes Only:</strong><br />
                        The NurCycle App provides tools, resources, and educational content to help users track their menstrual cycles, fertility, pregnancy, and related health information.<br />
                        All information provided through the App is for informational and educational purposes only.
                      </li>

                      <li>
                        <strong>No Substitute for Professional Advice:</strong><br />
                        The App is not a substitute for professional medical advice, diagnosis, or treatment.<br />
                        You should always seek the advice of a qualified healthcare provider regarding any questions or concerns about your health, medical conditions, or treatments.
                      </li>

                      <li>
                        <strong>No Medical Liability:</strong><br />
                        NurCycle Ltd does not guarantee the accuracy, completeness, or usefulness of health information provided through the App.<br />
                        Reliance on any information within the App is at your own risk.<br />
                        If you experience any medical emergency, you should immediately contact your doctor or emergency services.
                      </li>

                    </ul>
                  )
                },
                {
                  number: '12',
                  title: getLocalizedText('Islamic Disclaimer'),
                  content: (
                    <ul>

                      <li>
                        <strong>Source of Guidance:</strong><br />
                        The Islamic reminders, rulings, and educational content provided within the NurCycle App are based on references from the Qur’an and Sunnah, as understood from reliable scholarly sources. The book <em>Natural Blood of Women</em> by Shayekh Muhammad bin Salih Al-Utheimeen is a core reference used in this app.<br />
                        The purpose of this content is to offer general guidance and reminders to support Muslim women in matters related to menstruation, purity, and women’s health.
                      </li>

                      <li>
                        <strong>No Replacement for a Fatwa:</strong><br />
                        The guidance offered in the App does not replace the role of a qualified scholar (alim/alimah) or an official fatwa.<br />
                        For personal or complex religious matters, you are strongly encouraged to consult a qualified Islamic scholar or your local religious authority.
                      </li>

                      <li>
                        <strong>Limitation of Responsibility:</strong><br />
                        While NurCycle strives to ensure accuracy in presenting Islamic content, NurCycle Ltd is not responsible for individual outcomes or decisions made solely on the basis of the information provided in the App.
                      </li>

                    </ul>
                  )
                },
                {
                  number: '13',
                  title: getLocalizedText('changes.to.app.or.terms'),
                  content: getLocalizedText('changes.to.app.or.terms.content')
                },
                {
                  number: '14',
                  title: getLocalizedText('termination'),
                  // content: getLocalizedText('termination.content')
                  content: (
                    <ul>

                      <li>
                        <strong>Right to Suspend or Terminate:</strong><br />
                        NurCycle Ltd reserves the right to suspend, restrict, or permanently terminate a user’s account at any time if:
                        <ul>
                          <li>There is a breach of these Terms & Conditions.</li>
                          <li>The account is used in a way that violates the female-only space requirement or Islamic principles of modesty and respect.</li>
                          <li>Misuse, fraud, harassment, or harmful behavior is detected.</li>
                          <li>The account is used in a manner that could harm the App, its community, or other users.</li>
                        </ul>
                      </li>

                      <li>
                        <strong>Notice of Termination:</strong><br />
                        Where possible, we will provide notice and an explanation before suspending or terminating an account. However, in cases of severe or repeated violations, termination may be immediate and without prior notice.
                      </li>

                      <li>
                        <strong>Effect of Termination:</strong><br />
                        Upon termination, your right to access and use the App will cease immediately.<br />
                        Any remaining data associated with your account will be handled in accordance with our Privacy Policy.
                      </li>

                      <li>
                        <strong>Voluntary Account Deletion:</strong><br />
                        You may choose to delete your account at any time via the App settings. Once deleted, your data will be removed or anonymized as outlined in our Privacy Policy.
                      </li>

                    </ul>
                  )
                },
                {
                  number: '15',
                  title: getLocalizedText('limitation.of.liability'),
                  // content: getLocalizedText('limitation.of.liability.content')
                  content: (
                    <ul>

                      <li>
                        <strong>No Medical Liability:</strong><br />
                        NurCycle Ltd is not responsible for any medical outcomes, decisions, or health conditions that may arise from the use of the App.<br />
                        The App is for informational and educational purposes only and must not be relied upon as a substitute for professional medical advice or treatment.
                      </li>

                      <li>
                        <strong>Third-Party Services:</strong><br />
                        NurCycle Ltd is not liable for issues caused by third-party providers such as Stripe (payments), Supabase (data storage), or any external links or integrations used in the App.<br />
                        Any disputes, errors, or misuse arising from third-party services should be addressed directly with the respective provider.
                      </li>

                      <li>
                        <strong>Community Content:</strong><br />
                        NurCycle Ltd is not responsible for the accuracy, safety, or reliability of content shared by users within the community features.<br />
                        You are solely responsible for the interactions you choose to engage in.
                      </li>

                      <li>
                        <strong>General Limitation:</strong><br />
                        To the fullest extent permitted by law, NurCycle Ltd shall not be liable for:
                        <ul >
                          <li>Any indirect, incidental, or consequential damages (including loss of data, profits, or goodwill).</li>
                          <li>Any harm caused by unauthorized access, misuse, or disclosure of user data beyond NurCycle’s reasonable control.</li>
                        </ul>
                      </li>

                    </ul>
                  )
                },
                {
                  number: '16',
                  title: getLocalizedText('Governing Law'),
                  content: (
                    <>
                      <p>
                        These Terms & Conditions and your use of the NurCycle App shall be governed by and
                        interpreted in accordance with the laws of:
                      </p>
                      <ul>
                        <li><strong>England and Wales</strong> (for users in the United Kingdom),</li>
                        <li><strong>European Union law</strong> (for users within the EU), and</li>
                        <li><strong>The laws of the United States</strong> (for users in the U.S., excluding the State of California).</li>
                      </ul>
                      <p>
                        By using the App, you agree to submit to the exclusive jurisdiction of the courts
                        relevant to your place of residence as outlined above.
                      </p>
                    </>

                  )
                },
                {
                  number: '17',
                  title: getLocalizedText('Final Provisions & Acceptance'),
                  content: (
                    <>
                      <p>
                        At NurCycle Ltd, our mission is to provide a safe, supportive, and faith-conscious
                        space where women can track their health with confidence and benefit from both
                        scientific insights and Islamic guidance. By using the NurCycle App, you are joining
                        a community built on respect, modesty, and sisterhood.
                      </p>

                      <p>
                        We regularly update our app to help you improve your data protection compliance.
                        Setting regular reminders to check our news and guidance pages will help keep you
                        on track.
                      </p>

                      <p>
                        By continuing to use the App, you confirm that you have read, understood, and agreed
                        to these Terms & Conditions. We encourage you to use NurCycle with trust and peace of
                        mind, knowing that your wellbeing, privacy, and faith values are at the heart of what
                        we do.
                      </p>

                      <p>
                        If you have any questions, concerns, or suggestions, we are always here to listen.
                        Please contact us anytime at
                        <span> 📧 support@nurcycle.com</span>.
                      </p>
                    </>

                  )
                },
                {
                  number: '18',
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
                      <p className={` leading-relaxed whitespace-pre-line ${settings.darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
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
              {/* <FileText className="w-8 h-8 flex-shrink-0 mt-1 text-lavender-800" /> */}
              <div>
                <h3 className={`${settings.darkMode ? 'text-white' : 'text-gray-900'} font-semibold text-lg mb-2`}>
                  {/* {getLocalizedText('terms.and.conditions')} */}
                  ✨ Introduction
                </h3>
                <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm opacity-90 mb-3`}>
                  {/* {getLocalizedText('professional.terms')} */}
                  Welcome to NurCycle, operated by NurCycle Ltd, a company registered in the United Kingdom.
                  <br />
                  <br />
                  By accessing or using the NurCycle mobile application and its services (collectively, the <b>“App”</b>), you agree to be bound by these Terms & Conditions. This agreement forms a legally binding contract between you (the <b>“User”</b>) and NurCycle Ltd (the “Company”).

                  <br />
                  <br />
                  If you do not agree with any part of these Terms & Conditions, you must not use the App. By continuing to use the App, you confirm that you have read, understood, and accepted these Terms.

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
