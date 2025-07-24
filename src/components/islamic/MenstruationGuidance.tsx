
import React,{useState , useEffect} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MenstruationGuidance = () => {
  
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
    <div className="menstruation-guidance-section" style={{marginTop:"-4em"}}>
<Card className={`relative overflow-hidden card-3d`}>
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-purple-50 to-pink-50 border-purple-200'}`}></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
      Understanding Menstruation in Islam
    </CardTitle>
    <p className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm`}>
      Comprehensive guidance from Qur'an, Hadith, and Zad Al-Mustaqni by Imam Ibn Qudamah
    </p>
  </CardHeader>

        {/* <CardContent className="space-y-6">
          <div className="p-4 bg-white rounded-lg border border-purple-100">
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-purple-800">Definition & Islamic Understanding</h4>
              <Badge className="bg-purple-100 text-purple-800">Fundamental</Badge>
            </div>
            <p className="text-purple-700 text-sm mb-3">
              Menstruation (Hayd) is natural blood that flows from the uterus of a woman who has reached puberty. 
              Allah ﷻ says: "They ask you about menstruation. Say: It is an impurity, so keep away from women during menstruation and do not approach them until they are pure." (Quran 2:222)
            </p>
            <div className="text-purple-700 text-sm space-y-2">
              <p><strong>Duration according to Zad Al-Mustaqni:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Minimum period: 1 day and night (24 hours)</li>
                <li>Maximum period: 15 days according to Hanbali school</li>
                <li>Average cycle: 28 days, but can range from 21-35 days</li>
                <li>Individual variation is normal and acceptable</li>
              </ul>
            </div>
            <p className="text-xs text-purple-600 mt-3 italic">
              Source: Quran 2:222, Zad Al-Mustaqni - Chapter on Purity
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg border border-purple-100">
            <h4 className="font-semibold text-purple-800 mb-3">What is Prohibited During Menstruation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-purple-700 mb-2">Worship Prohibitions:</h5>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>• <strong>Salah (Prayer):</strong> Completely excused - no makeup required</li>
                  <li>• <strong>Sawm (Fasting):</strong> Prohibited - makeup required after Ramadan</li>
                  <li>• <strong>Tawaf:</strong> Around Ka'bah is forbidden</li>
                  <li>• <strong>I'tikaf:</strong> Spiritual retreat in mosque</li>
                  <li>• <strong>Touching Mushaf:</strong> Direct contact with Quranic text</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-purple-700 mb-2">Physical Prohibitions:</h5>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>• <strong>Sexual intercourse:</strong> Completely forbidden</li>
                  <li>• <strong>Entering mosque:</strong> For prayer area specifically</li>
                  <li>• <strong>Handling Mushaf:</strong> Without barrier/gloves</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-purple-600 mt-3 italic">
              Source: Hadith of Aisha (RA) in Sahih Bukhari, Zad Al-Mustaqni
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg border border-purple-100">
            <h4 className="font-semibold text-purple-800 mb-3">What is Permitted & Encouraged</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-purple-700 mb-2">Spiritual Activities:</h5>
                <ul className="text-purple-700 text-sm space-y-1 list-disc list-inside">
                  <li>All forms of dhikr (remembrance of Allah): SubhanAllah, Alhamdulillah, Allahu Akbar</li>
                  <li>Du'a (supplication) at all times, especially during blessed hours</li>
                  <li>Istighfar (seeking forgiveness) - highly recommended</li>
                  <li>Reading Quranic translations and tafsir</li>
                  <li>Listening to Quran recitations</li>
                  <li>Studying Islamic books and attending lectures</li>
                  <li>Making dhikr during usual prayer times</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-purple-700 mb-2">Physical & Social Activities:</h5>
                <ul className="text-purple-700 text-sm space-y-1 list-disc list-inside">
                  <li>All normal daily activities and work</li>
                  <li>Cooking and serving food (no ritual impurity affects food)</li>
                  <li>Social interactions and family duties</li>
                  <li>Exercise and physical activity (if comfortable)</li>
                  <li>Charity and helping others</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-purple-600 mt-3 italic">
              Source: Various authentic hadith, scholarly consensus
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg border border-purple-100">
            <h4 className="font-semibold text-purple-800 mb-3">Signs of Menstrual End & Purification</h4>
            <div className="space-y-3">
              <div className="bg-purple-50 p-3 rounded">
                <h5 className="font-medium text-purple-700 mb-2">Two Valid Signs (Either is Sufficient):</h5>
                <div className="space-y-2">
                  <div>
                    <p className="text-purple-700 text-sm"><strong>1. Al-Qassa Al-Bayda (White Discharge):</strong></p>
                    <p className="text-purple-600 text-xs ml-4">Clear, white discharge indicating natural cleansing. This is the body's way of signaling purity has returned.</p>
                  </div>
                  <div>
                    <p className="text-purple-700 text-sm"><strong>2. Complete Dryness:</strong></p>
                    <p className="text-purple-600 text-xs ml-4">No blood, brown discharge, or any colored discharge for a complete day-night cycle (24 hours).</p>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-purple-700 mb-2">After Seeing Signs of Purity:</h5>
                <ol className="text-purple-700 text-sm space-y-1 list-decimal list-inside">
                  <li>Perform ghusl (ritual bath) immediately</li>
                  <li>Resume all prayers starting from the next prayer time</li>
                  <li>Can resume fasting, Quran reading, and intimate relations</li>
                  <li>If bleeding returns after purification, treat as new cycle</li>
                </ol>
              </div>
            </div>
            <p className="text-xs text-purple-600 mt-3 italic">
              Source: Zad Al-Mustaqni - Chapter on Menstruation, Classical fiqh texts
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg border border-purple-100">
            <h4 className="font-semibold text-purple-800 mb-3">Special Situations & Rulings</h4>
            <div className="space-y-2">
              <div>
                <p className="text-purple-700 text-sm"><strong>Irregular Cycles:</strong> Natural variation is normal. Cycles between 21-35 days are typically considered normal.</p>
              </div>
              <div>
                <p className="text-purple-700 text-sm"><strong>Pregnancy & Menstruation:</strong> True menstruation doesn't occur during pregnancy. Any bleeding requires medical consultation.</p>
              </div>
              <div>
                <p className="text-purple-700 text-sm"><strong>Medication Effects:</strong> Birth control and other medications may affect cycles. Islamic rulings adapt to medical realities.</p>
              </div>
              <div>
                <p className="text-purple-700 text-sm"><strong>Elderly Women:</strong> When menstruation permanently stops (menopause), all worship obligations return fully.</p>
              </div>
            </div>
            <p className="text-xs text-purple-600 mt-3 italic">
              Source: Contemporary Islamic medical ethics, scholarly fatawa
            </p>
          </div>
        </CardContent> */}

  <CardContent className="relative z-10 space-y-6">
  <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-white border border-purple-100'}`}>
    <div className="flex items-start justify-between mb-3">
      <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>Definition & Islamic Understanding</h4>
      <Badge className={`${settings.darkMode ? 'bg-slate-700 text-white' : 'bg-purple-100 text-purple-800'}`}>Fundamental</Badge>
    </div>
    <p className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm mb-3`}>
      Menstruation (Hayd) is natural blood that flows from the uterus of a woman who has reached puberty.
      Allah ﷻ says: "They ask you about menstruation. Say: It is an impurity, so keep away from women during menstruation and do not approach them until they are pure." (Quran 2:222)
    </p>
    <div className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm space-y-2`}>
      <p><strong>Duration according to Zad Al-Mustaqni:</strong></p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>Minimum period: 1 day and night (24 hours)</li>
        <li>Maximum period: 15 days according to Hanbali school</li>
        <li>Average cycle: 28 days, but can range from 21-35 days</li>
        <li>Individual variation is normal and acceptable</li>
      </ul>
    </div>
    <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-purple-600'} mt-3 italic`}>
      Source: Quran 2:222, Zad Al-Mustaqni - Chapter on Purity
    </p>
  </div>

  <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-white border border-purple-100'}`}>
    <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>What is Prohibited During Menstruation</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h5 className={`font-medium ${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} mb-2`}>Worship Prohibitions:</h5>
        <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm space-y-1`}>
          <li>• <strong>Salah (Prayer):</strong> Completely excused - no makeup required</li>
          <li>• <strong>Sawm (Fasting):</strong> Prohibited - makeup required after Ramadan</li>
          <li>• <strong>Tawaf:</strong> Around Ka'bah is forbidden</li>
          <li>• <strong>I'tikaf:</strong> Spiritual retreat in mosque</li>
          <li>• <strong>Touching Mushaf:</strong> Direct contact with Quranic text</li>
        </ul>
      </div>
      <div>
        <h5 className={`font-medium ${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} mb-2`}>Physical Prohibitions:</h5>
        <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm space-y-1`}>
          <li>• <strong>Sexual intercourse:</strong> Completely forbidden</li>
          <li>• <strong>Entering mosque:</strong> For prayer area specifically</li>
          <li>• <strong>Handling Mushaf:</strong> Without barrier/gloves</li>
        </ul>
      </div>
    </div>
    <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-purple-600'} mt-3 italic`}>
      Source: Hadith of Aisha (RA) in Sahih Bukhari, Zad Al-Mustaqni
    </p>
  </div>

  <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800 border border-slate-600' : 'bg-white border border-purple-100'}`}>
    <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>What is Permitted & Encouraged</h4>
    <div className="space-y-3">
      <div>
        <h5 className={`font-medium ${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} mb-2`}>Spiritual Activities:</h5>
        <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm space-y-1 list-disc list-inside`}>
          <li>All forms of dhikr (remembrance of Allah): SubhanAllah, Alhamdulillah, Allahu Akbar</li>
          <li>Du'a (supplication) at all times, especially during blessed hours</li>
          <li>Istighfar (seeking forgiveness) - highly recommended</li>
          <li>Reading Quranic translations and tafsir</li>
          <li>Listening to Quran recitations</li>
          <li>Studying Islamic books and attending lectures</li>
          <li>Making dhikr during usual prayer times</li>
        </ul>
      </div>
      <div>
        <h5 className={`font-medium ${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} mb-2`}>Physical & Social Activities:</h5>
        <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm space-y-1 list-disc list-inside`}>
          <li>All normal daily activities and work</li>
          <li>Cooking and serving food (no ritual impurity affects food)</li>
          <li>Social interactions and family duties</li>
          <li>Exercise and physical activity (if comfortable)</li>
          <li>Charity and helping others</li>
        </ul>
      </div>
    </div>
    <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-purple-600'} mt-3 italic`}>
      Source: Various authentic hadith, scholarly consensus
    </p>
  </div>
</CardContent>


      </Card>
    </div>



  );
};

export default MenstruationGuidance;
