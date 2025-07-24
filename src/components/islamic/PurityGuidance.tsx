
import React , {useState , useEffect} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PurityGuidance = () => {
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
    <div className="purity-guidance" style={{marginTop:"-8em"}}>
<Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode? 'bg-slate-900 border border-slate-700': ' from-teal-50 to-blue-50 border-teal-200 opacity-20' }`}></div>
     <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>
      Trusted Sources & References
    </CardTitle>
  </CardHeader>
   

  <CardContent className="relative z-10 space-y-6">

    <div className={`p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-teal-100'}`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>When is Ghusl Required?</h4>
        <Badge className={`${settings.darkMode ? 'bg-slate-700 text-white' : 'bg-teal-100 text-teal-800'}`}>Obligatory</Badge>
      </div>
      <div className="space-y-3">
        <div>
          <h5 className={`font-medium mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>Major Ritual Impurity (Janaba) occurs after:</h5>
          <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm space-y-1 list-disc list-inside ml-4`}>
            <li>Sexual intercourse (even without emission)</li>
            <li>Emission of sexual fluids (wet dreams, arousal)</li>
            <li>End of menstrual period (hayd)</li>
            <li>End of postpartum bleeding (nifas)</li>
            <li>Conversion to Islam (for new Muslims)</li>
            <li>Death (ghusl for the deceased)</li>
          </ul>
        </div>
        <div className={`${settings.darkMode ? 'bg-slate-700' : 'bg-teal-50'} p-3 rounded`}>
          <p className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm`}>
            <strong>Key Point from Zad Al-Mustaqni:</strong> Ghusl becomes obligatory immediately when the cause occurs, and prayer is invalid without it.
          </p>
        </div>
      </div>
      <p className={`text-xs mt-2 italic ${settings.darkMode ? 'text-gray-400' : 'text-teal-600'}`}>
        Source: "O you who believe! If you are in a state of janaba, then purify yourselves." - Quran 5:6
      </p>
    </div>

    <div className={`p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-teal-100'}`}>
      <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>Complete Method of Ghusl</h4>
      <div className="space-y-4">
        <div>
          <h5 className={`font-medium mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>Obligatory Elements (Fard):</h5>
          <ol className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm space-y-1 list-decimal list-inside ml-4`}>
            <li><strong>Intention (Niyyah):</strong> Make sincere intention for purification from major impurity</li>
            <li><strong>Rinse mouth and nose:</strong> Ensure water reaches all areas</li>
            <li><strong>Wash entire body:</strong> Every part must be touched by water, including hair roots</li>
          </ol>
        </div>
        <div>
          <h5 className={`font-medium mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>Recommended Method (Sunnah):</h5>
          <ol className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm space-y-2 list-decimal list-inside ml-4`}>
            <li>Begin with Bismillah and make intention for ghusl</li>
            <li>Wash hands three times thoroughly</li>
            <li>Clean private parts and remove any impurities</li>
            <li>Perform complete wudu as for prayer (may delay washing feet until end)</li>
            <li>Pour water over head three times</li>
            <li>Pour water over right side of body</li>
            <li>Pour water over left side of body</li>
            <li>Wash feet (if not done during wudu)</li>
            <li>Final check: Ensure no part of body remains dry</li>
          </ol>
        </div>
      </div>
      <p className={`text-xs mt-3 italic ${settings.darkMode ? 'text-gray-400' : 'text-teal-600'}`}>
        Source: Hadith of Aisha (RA) in Sahih Bukhari, Zad Al-Mustaqni - Chapter on Ghusl
      </p>
    </div>

    <div className={`p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-teal-100'}`}>
      <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>Signs Menstruation Has Ended</h4>
      <div className="space-y-3">
        <div className={`${settings.darkMode ? 'bg-slate-700' : 'bg-teal-50'} p-3 rounded`}>
          <h5 className={`font-medium mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>Two Valid Signs (Either Suffices):</h5>
          <div className="space-y-3">
            <div>
              <p className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm`}>
                <strong>1. Al-Qassa Al-Bayda (White Discharge):</strong>
              </p>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-teal-600'} text-xs ml-4`}>
                A clear, white discharge that appears at the end of menstruation.
              </p>
            </div>
            <div>
              <p className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm`}>
                <strong>2. Complete Dryness (Al-Jafaf):</strong>
              </p>
              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-teal-600'} text-xs ml-4`}>
                Complete absence of blood or any colored discharge for a full day-night cycle.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h5 className={`font-medium mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>Important Rulings from Zad Al-Mustaqni:</h5>
          <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm space-y-1 list-disc list-inside ml-4`}>
            <li>Either sign is sufficient - you don't need both</li>
            <li>Some women naturally have one sign, others have the other</li>
            <li>Once you see either sign, perform ghusl immediately</li>
            <li>If bleeding returns after these signs, it's considered a new menstrual period</li>
            <li>Brown or yellow discharge before these signs is still considered menstruation</li>
          </ul>
        </div>
      </div>
      <p className={`text-xs mt-3 italic ${settings.darkMode ? 'text-gray-400' : 'text-teal-600'}`}>
        Source: Zad Al-Mustaqni - Chapter on Menstruation
      </p>
    </div>


 <div className={`p-4 rounded-lg border mb-5 ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-teal-100'}`}>
  <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>Special Considerations for Ghusl</h4>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <h5 className={`font-medium mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>For Hair:</h5>
      <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm space-y-1 list-disc list-inside`}>
        <li>Water must reach hair roots and scalp</li>
        <li>Braided hair: Loosen if water can't reach roots</li>
        <li>Hair extensions: Remove if preventing water access</li>
        <li>Covered hair: Ensure complete wetting underneath</li>
      </ul>
    </div>
    <div>
      <h5 className={`font-medium mb-2 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>For Body:</h5>
      <ul className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm space-y-1 list-disc list-inside`}>
        <li>Remove nail polish if preventing water contact</li>
        <li>Clean earrings/jewelry areas thoroughly</li>
        <li>Ensure water reaches between fingers and toes</li>
        <li>Pay attention to body folds and creases</li>
      </ul>
    </div>
  </div>
  <p className={`text-xs mt-3 italic ${settings.darkMode ? 'text-gray-400' : 'text-teal-600'}`}>
    Source: Zad Al-Mustaqni detailed rulings, Contemporary fiqh applications
  </p>
</div>

<div className={`p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-teal-100'}`}>
  <h4 className={`font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>Common Questions & Clarifications</h4>
  <div className="space-y-3">
    <div>
      <p className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm`}>
        <strong>Q: Can I pray immediately after ghusl?</strong>
      </p>
      <p className={`${settings.darkMode ? 'text-gray-400' : 'text-teal-600'} text-xs ml-4`}>
        A: Yes, ghusl includes wudu when done properly. If you break wudu after ghusl, you only need to repeat wudu, not ghusl.
      </p>
    </div>
    <div>
      <p className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm`}>
        <strong>Q: What if I'm unsure whether menstruation has ended?</strong>
      </p>
      <p className={`${settings.darkMode ? 'text-gray-400' : 'text-teal-600'} text-xs ml-4`}>
        A: Wait until you're certain of either sign of purity. When in doubt, don't rush to perform ghusl.
      </p>
    </div>
    <div>
      <p className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm`}>
        <strong>Q: Can I combine ghusl with regular shower?</strong>
      </p>
      <p className={`${settings.darkMode ? 'text-gray-400' : 'text-teal-600'} text-xs ml-4`}>
        A: Yes, if you follow the proper method and have the correct intention, your shower can fulfill the ghusl requirement.
      </p>
    </div>
    <div>
      <p className={`${settings.darkMode ? 'text-gray-300' : 'text-teal-700'} text-sm`}>
        <strong>Q: What about swimming or bathing in natural water?</strong>
      </p>
      <p className={`${settings.darkMode ? 'text-gray-400' : 'text-teal-600'} text-xs ml-4`}>
        A: Valid for ghusl if the water is pure and you ensure complete body immersion with proper intention.
      </p>
    </div>
  </div>
  <p className={`text-xs mt-3 italic ${settings.darkMode ? 'text-gray-400' : 'text-teal-600'}`}>
    Source: Contemporary fatawa and practical applications of classical rulings
  </p>
</div>

  </CardContent> 

</Card>


    </div>
  );
};

export default PurityGuidance;
