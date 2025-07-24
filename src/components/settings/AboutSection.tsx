
import React,{useEffect , useState} from 'react';
import { ChevronLeft, Heart } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface AboutSectionProps {
  onBack: () => void;
}

const AboutSection = ({ onBack }: AboutSectionProps) => {
  const { getLocalizedText } = useLanguage();

  
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

  return (
   <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
      {/* Header */}
      {/* <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">{getLocalizedText('about')}</h1>
          <div className="w-10" />
        </div>
      </div> */}

      <div className={` shadow-sm border-b ${settings.darkMode ? 'bg-slate-900' : 'bg-white'}`}>
  <div className="flex items-center justify-between p-4">
    <Button
      variant="ghost"
      size="icon"
      onClick={onBack}
      className="rounded-full"
    >
      <ChevronLeft className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`} />
    </Button>
    <h1 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
      {getLocalizedText('about')}
    </h1>
    <div className="w-10" />
  </div>
</div>


      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Welcome Section */}
        {/* <Card className="bg-gradient-to-r from-purple-600 to-purple-800 text-white border-0">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
              Welcome to NurCycle — Where Faith Meets Feminine Wellness.
            </h2>
            <p className="text-purple-400 leading-relaxed">
              At NurCycle, we believe that understanding your body is a form of empowerment — and that true wellness embraces both the physical and the spiritual. Designed with Muslim women in mind (and open to all!), NurCycle is your go-to companion for navigating your menstrual cycle, fertility, pregnancy, and overall hormonal health — all in line with Islamic values and modern science.
            </p>
          </CardContent>
        </Card> */}

        <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-600 to-purple-800'}`}></div>
  <CardContent className="relative z-10 p-6">
    <h2 className={`text-2xl font-bold mb-4 text-center ${settings.darkMode ? 'text-white' : 'text-gray-700'}`}>
      Welcome to NurCycle — Where Faith Meets Feminine Wellness.
    </h2>
    <p className={`leading-relaxed ${settings.darkMode ? 'text-gray-300' : 'text-purple-400'}`}>
      At NurCycle, we believe that understanding your body is a form of empowerment — and that true wellness embraces both the physical and the spiritual. Designed with Muslim women in mind (and open to all!), NurCycle is your go-to companion for navigating your menstrual cycle, fertility, pregnancy, and overall hormonal health — all in line with Islamic values and modern science.
    </p>
  </CardContent>
</Card>

        {/* Why We Exist */}
        {/* <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              ✨ Why We Exist
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Too many Muslim women have gone without a safe, respectful, and spiritually aligned space to manage their reproductive health. NurCycle was created to change that. Whether you're tracking your period, trying to conceive, pregnant, postpartum, or simply learning more about your body — NurCycle supports your journey with clarity, compassion, and tawakkul.
            </p>
          </CardContent>
        </Card> */}

        <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-600 to-purple-800'}`}></div>
  <CardContent className="relative z-10 p-6">
    <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
      ✨ Why We Exist
    </h3>
    <p className={`leading-relaxed ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      Too many Muslim women have gone without a safe, respectful, and spiritually aligned space to manage their reproductive health. NurCycle was created to change that. Whether you're tracking your period, trying to conceive, pregnant, postpartum, or simply learning more about your body — NurCycle supports your journey with clarity, compassion, and tawakkul.
    </p>
  </CardContent>
</Card>


        {/* What Makes NurCycle Unique */}

        {/* <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              🌸 What Makes NurCycle Unique
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">🟪 Islamic Integration</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  From rulings on purity, ghusl, and prayer during menstruation to fertility tips and postpartum guidance grounded in Qur'an and Sunnah — NurCycle provides support that is medically sound and spiritually authentic.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">🟪 Holistic Tracking</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Track your symptoms, mood changes, ovulation, bleeding patterns, and sexual health — all with privacy controls that respect modesty and trust.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">🟪 Pregnancy & Fertility Mode</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Switch into TTC or pregnancy mode and receive symptom tracking, dua reminders, faith-centered advice, and Sunnah-based self-care tips.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">🟪 Community Connection</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Join a built-in, protected space for Muslim women to uplift, share, and ask questions — anonymously or openly — with no shame, just support.
                </p>
              </div>
            </div>
          </CardContent>
        </Card> */}

        <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : 'bg-white'}`}></div>
  <CardContent className="relative z-10 p-6">
    <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
      🌸 What Makes NurCycle Unique
    </h3>
    <div className="space-y-4">
      <div>
        <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-purple-700'} mb-2`}>
          🟪 Islamic Integration
        </h4>
        <p className={`text-sm leading-relaxed ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          From rulings on purity, ghusl, and prayer during menstruation to fertility tips and postpartum guidance grounded in Qur'an and Sunnah — NurCycle provides support that is medically sound and spiritually authentic.
        </p>
      </div>
      <div>
        <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-purple-700'} mb-2`}>
          🟪 Holistic Tracking
        </h4>
        <p className={`text-sm leading-relaxed ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Track your symptoms, mood changes, ovulation, bleeding patterns, and sexual health — all with privacy controls that respect modesty and trust.
        </p>
      </div>
      <div>
        <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-purple-700'} mb-2`}>
          🟪 Pregnancy & Fertility Mode
        </h4>
        <p className={`text-sm leading-relaxed ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Switch into TTC or pregnancy mode and receive symptom tracking, dua reminders, faith-centered advice, and Sunnah-based self-care tips.
        </p>
      </div>
      <div>
        <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-purple-700'} mb-2`}>
          🟪 Community Connection
        </h4>
        <p className={`text-sm leading-relaxed ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Join a built-in, protected space for Muslim women to uplift, share, and ask questions — anonymously or openly — with no shame, just support.
        </p>
      </div>
    </div>
  </CardContent>
</Card>


        {/* Who We Serve */}

        {/* <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              💜 Who We Serve
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              NurCycle is built for every woman who wants to know and honor her body, including:
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Muslim women seeking faith-friendly health solutions</li>
              <li>• Women confused about Islamic rulings on menstruation, postnatal bleeding, or purity</li>
              <li>• Reverts navigating conflicting cultural or religious teachings</li>
              <li>• Women who feel unseen, misunderstood, or exhausted by typical period apps</li>
              <li>• Teenagers, wives, mothers, students, daughters — all of us</li>
              <li>• Women who want to feel seen, supported, and safe in their feminine journey</li>
            </ul>
          </CardContent>
        </Card> */}

        <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-lavender-500 to-lavender-700'}`}></div>
  <CardContent className="relative z-10 p-6">
    <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
      💜 Who We Serve
    </h3>
    <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-3`}>
      NurCycle is built for every woman who wants to know and honor her body, including:
    </p>
    <ul className={`space-y-2 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
      <li>• Muslim women seeking faith-friendly health solutions</li>
      <li>• Women confused about Islamic rulings on menstruation, postnatal bleeding, or purity</li>
      <li>• Reverts navigating conflicting cultural or religious teachings</li>
      <li>• Women who feel unseen, misunderstood, or exhausted by typical period apps</li>
      <li>• Teenagers, wives, mothers, students, daughters — all of us</li>
      <li>• Women who want to feel seen, supported, and safe in their feminine journey</li>
    </ul>
  </CardContent>
</Card>


        {/* Our Name */}

        {/* <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              🌙 Our Name: NurCycle
            </h3>
            <p className="text-gray-700 leading-relaxed">
              "Nur" (نُور) means light in Arabic — and that's what this app is about: shining divine light on your feminine health, your questions, your cycle, your life. Because you deserve clarity, not confusion. Care, not shame. Faith, not fear.
            </p>
          </CardContent>
        </Card> */}

        <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-500 to-purple-700'}`}></div>
  <CardContent className="relative z-10 p-6">
    <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
      🌙 Our Name: NurCycle
    </h3>
    <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
      "Nur" (نُور) means light in Arabic — and that's what this app is about: shining divine light on your feminine health, your questions, your cycle, your life. Because you deserve clarity, not confusion. Care, not shame. Faith, not fear.
    </p>
  </CardContent>
</Card>


        {/* Founder's Message */}
        {/* <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              💬 Founder's Message
            </h3>
            <p className="text-sm text-purple-600 mb-4 italic">by Z</p>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                As a Muslim woman who has struggled for years to understand her own body, I created NurCycle from a place of deep personal need — and deep community love.
              </p>
              <p>
                If this app had existed when I was younger, it would have saved me countless headaches and heartaches. From the confusing hormonal shifts of being a teenager, to the fertility transitions of becoming a wife, to the overwhelming body changes of motherhood — I was constantly left wondering:
              </p>
              <ul className="space-y-1 text-sm ml-4">
                <li>• Has my period ended or not?</li>
                <li>• Do I wait 40 full days after giving birth or pray once the bleeding stops?</li>
                <li>• Is this spotting istihada or still hayd?</li>
                <li>• Why does every other period app tell me things that don't match my faith?</li>
              </ul>
              <p>
                I was tired of trying to patch together Islamic rulings from blogs, lecture clips, and outdated books — while also scrolling through Western apps that offered sexual advice but no spiritual direction.
              </p>
              <p>
                I looked everywhere for an app made by Muslim women, for Muslim women — and there was nothing.
              </p>
              <p>
                That's when I knew: we deserve more. We deserve something that reflects our values. We are no longer minorities — not in number, not in voice, not in brilliance. So why shouldn't we have our own tools, our own spaces, our own systems?
              </p>
              <p>
                NurCycle is that space. It is for you. It is for us.
              </p>
              <p>
                I am endlessly grateful to Allah for giving me the opportunity to give back to my sisters — to the ummah I love so dearly.
              </p>
              <p>
                Your experiences are real. Your struggles are valid. And your body, with all of its wisdom and complexity, deserves to be understood and honored — within the timeless guidance of Qur'an and Sunnah.
              </p>
              <p className="font-semibold text-purple-800">
                This is our light. This is NurCycle.
              </p>
            </div>
          </CardContent>
        </Card> */}

        <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-500 to-purple-700'}`}></div>
  <CardContent className="relative z-10 p-6">
    <h3 className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-purple-800'} mb-4 flex items-center gap-2`}>
      💬 Founder's Message
    </h3>
    <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-purple-600'} mb-4 italic`}>by Z</p>
    <div className={`space-y-4 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
      <p>
        As a Muslim woman who has struggled for years to understand her own body, I created NurCycle from a place of deep personal need — and deep community love.
      </p>
      <p>
        If this app had existed when I was younger, it would have saved me countless headaches and heartaches. From the confusing hormonal shifts of being a teenager, to the fertility transitions of becoming a wife, to the overwhelming body changes of motherhood — I was constantly left wondering:
      </p>
      <ul className="space-y-1 text-sm ml-4">
        <li>• Has my period ended or not?</li>
        <li>• Do I wait 40 full days after giving birth or pray once the bleeding stops?</li>
        <li>• Is this spotting istihada or still hayd?</li>
        <li>• Why does every other period app tell me things that don't match my faith?</li>
      </ul>
      <p>
        I was tired of trying to patch together Islamic rulings from blogs, lecture clips, and outdated books — while also scrolling through Western apps that offered sexual advice but no spiritual direction.
      </p>
      <p>
        I looked everywhere for an app made by Muslim women, for Muslim women — and there was nothing.
      </p>
      <p>
        That's when I knew: we deserve more. We deserve something that reflects our values. We are no longer minorities — not in number, not in voice, not in brilliance. So why shouldn't we have our own tools, our own spaces, our own systems?
      </p>
      <p>
        NurCycle is that space. It is for you. It is for us.
      </p>
      <p>
        I am endlessly grateful to Allah for giving me the opportunity to give back to my sisters — to the ummah I love so dearly.
      </p>
      <p>
        Your experiences are real. Your struggles are valid. And your body, with all of its wisdom and complexity, deserves to be understood and honored — within the timeless guidance of Qur'an and Sunnah.
      </p>
      <p className={`font-semibold ${settings.darkMode ? 'text-gray-100' : 'text-purple-800'}`}>
        This is our light. This is NurCycle.
      </p>
    </div>
  </CardContent>
</Card>


        {/* Heart Section */}
        {/* <Card className="bg-gradient-to-r from-purple-500 to-purple-700 text-white border-0">
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 mx-auto mb-4 text-purple-600" />
            <p className="text-purple-400 italic">
              "And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth." - Qur'an 6:73
            </p>
          </CardContent>
        </Card> */}

        <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-500 to-purple-700'}`}></div>
  <CardContent className="relative z-10 p-6 text-center">
    <Heart className={`w-8 h-8 mx-auto mb-4 ${settings.darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
    <p className={`text-sm ${settings.darkMode ? 'text-gray-300 italic' : 'text-purple-400 italic'}`}>
      "And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth." - Qur'an 6:73
    </p>
  </CardContent>
</Card>
      </div>

      {/* Copyright Footer */}
      <div className={`text-center py-4 px-4 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
        © 2025 NurCycle Ltd. All rights reserved
      </div>

      {/* Bottom spacing */}
      <div className="h-6" />
    </div>
  );
};

export default AboutSection;
