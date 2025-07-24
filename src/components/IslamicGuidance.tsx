
import React, { useState , useEffect } from 'react';
import { Moon, Baby, Heart, Utensils, Home, Scale, BookOpen, Search, Filter, Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EducationTopics from './islamic/EducationTopics';
import MenstruationGuidance from './islamic/MenstruationGuidance';
import NifasGuidance from './islamic/NifasGuidance';
import IstihadaGuidance from './islamic/IstihadaGuidance';
import FastingGuidance from './islamic/FastingGuidance';
import IntimacyGuidance from './islamic/IntimacyGuidance';
import DivorceGuidance from './islamic/DivorceGuidance';
import IslamicDisclaimer from './islamic/IslamicDisclaimer';
import PurityGuidance from './islamic/PurityGuidance';
import WorshipExemptions from './islamic/WorshipExemptions';
import IslamicAIBot from './islamic/IslamicAIBot';
import EnhancedSearchInterface from './islamic/EnhancedSearchInterface';
import YouTubeResourcesSection from './islamic/YouTubeResourcesSection';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const IslamicGuidance = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  
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

  // Comprehensive knowledge base with complete content from "Natural Blood of Women"
  const knowledgeBase = [
    // MENSTRUATION (HAYD) - Comprehensive Section
    {
      id: 1,
      question: "What is menstruation (hayd) in Islamic law?",
      answer: "Menstruation (hayd) in Islamic terminology refers to the natural blood that flows from the uterus of a woman who has reached puberty, occurring in a cyclical pattern. According to Ibn Qudamah in Zad Al-Mustaqni, it is 'blood that flows from the bottom of the uterus in health, not due to childbirth.' This blood has specific rulings in Islamic law that distinguish it from other types of bleeding. The minimum age for menstruation is generally considered to be 9 lunar years, and the maximum age is around 50-60 years according to most scholars. The key characteristics that distinguish menstrual blood include: 1) It flows naturally without external cause, 2) It follows a somewhat regular pattern, 3) It occurs after puberty and before menopause, 4) It has specific color and consistency characteristics described by the scholars.",
      category: "menstruation",
      tags: ["hayd", "menstruation", "definition", "islamic law", "fiqh"],
      source: "Zad Al-Mustaqni, Al-Mughni by Ibn Qudamah, Natural Blood of Women"
    },
    {
      id: 2,
      question: "What are the minimum and maximum durations of menstruation?",
      answer: "According to the Hanbali school as detailed in Zad Al-Mustaqni, the minimum period of menstruation is 24 hours (one day and night). The maximum duration is 15 days. If bleeding continues beyond 15 days, everything beyond the 15th day is considered istihada (irregular bleeding). However, there are scholarly differences on these limits. The Hanafi school sets the minimum at 3 days and maximum at 10 days. The Maliki school considers the minimum as the shortest amount that can be called 'hayd' in Arabic language, typically interpreted as a few hours, with a maximum of 15 days. The Shafi'i school agrees with the Hanbali view on minimum (24 hours) but sets the maximum at 15 days. If a woman's usual pattern exceeds these limits, scholars recommend she follows her established habit and consults knowledgeable authorities. The practical implication is that if bleeding stops before the minimum (in Hanbali view, before 24 hours), it's not considered menstruation and she should perform ghusl and resume prayers.",
      category: "menstruation",
      tags: ["duration", "minimum", "maximum", "fifteen days", "istihada"],
      source: "Zad Al-Mustaqni, Comparative Fiqh, Natural Blood of Women"
    },
    {
      id: 3,
      question: "Can I pray during menstruation and what about making up missed prayers?",
      answer: "Prayer (salah) is completely forbidden during menstruation according to unanimous scholarly consensus (ijma'). The Prophet ﷺ said to Fatimah bint Abi Hubaysh: 'When your menses begin, stop praying, and when they end, perform ghusl and pray.' (Sahih Bukhari 331). This prohibition includes all forms of prayer - obligatory (fard), recommended (sunnah), voluntary (nafl), and even funeral prayers. IMPORTANT: You do NOT need to make up missed prayers after purification. Aisha (رضي الله عنها) said: 'We were ordered to make up the missed fasts but not the missed prayers' (Sahih Bukhari 321). This is a mercy from Allah, as requiring makeup prayers would create undue hardship. Ibn Qudamah states in Al-Mughni that the menstruating woman is completely excused from prayer, and this is different from other excuses like illness or travel where makeup is required. The wisdom behind this ruling includes: 1) The physical and emotional state during menstruation, 2) The cyclical nature making it a significant burden if makeup was required, 3) Allah's mercy in not overburdening His servants.",
      category: "worship",
      tags: ["prayer", "salah", "menstruation", "makeup", "forbidden"],
      source: "Sahih Bukhari (331, 321), Zad Al-Mustaqni, Al-Mughni"
    },
    {
      id: 4,
      question: "What are the signs that menstruation has ended and I am pure?",
      answer: "The end of menstruation is determined by one of two definitive signs, according to classical fiqh texts: 1) AL-QASSA AL-BAYDA (The White Discharge): This is a clear, white, cotton-like discharge that appears at the end of the menstrual cycle. Many women naturally experience this as a sign of purity. When you see this white discharge, you are considered pure and should perform ghusl immediately. 2) COMPLETE DRYNESS (Al-Jufuf): When there is absolutely no blood, brown discharge, or any colored discharge for a complete 24-hour period. This means total cessation of any menstrual flow. Both signs are equally valid according to Ibn Qudamah in Zad Al-Mustaqni. Some women naturally experience the white discharge, while others have complete dryness as their sign of purity. If you see either sign, perform ghusl immediately and resume all religious obligations (prayer, fasting, etc.). IMPORTANT: If bleeding returns after seeing these signs of purity, and the return occurs within the maximum menstrual period (15 days total), it's still considered part of the same menstrual cycle. However, if bleeding returns after the maximum period, it would be classified as istihada (irregular bleeding).",
      category: "menstruation",
      tags: ["purity", "signs", "qassa bayda", "dryness", "end of period"],
      source: "Zad Al-Mustaqni, Al-Mughni, Classical Fiqh texts, Natural Blood of Women"
    },
    {
      id: 5,
      question: "What is irregular bleeding (istihada) and how is it different from menstruation?",
      answer: "Istihada (irregular bleeding) is any vaginal bleeding that doesn't meet the criteria for menstruation (hayd) or postpartum bleeding (nifas). The Prophet ﷺ dealt with several women experiencing istihada, including Fatimah bint Abi Hubaysh, Um Habiba, and others. DEFINITION: Istihada is bleeding that: 1) Exceeds the maximum menstrual period (15 days in Hanbali school), 2) Occurs outside the normal menstrual timeframe, 3) Has different characteristics than normal menstrual blood, 4) Continues irregularly without the normal cyclical pattern. HOW IT HAPPENS: Istihada can be caused by: hormonal imbalances, uterine problems, medication side effects, stress, illness, or physical exertion. Modern medicine might classify this as breakthrough bleeding, anovulatory bleeding, or dysfunctional uterine bleeding. EXAMPLES: A woman whose period usually lasts 7 days but bleeding continues for 20 days - everything after day 15 is istihada. A woman who bleeds continuously for months. Spotting between normal menstrual cycles. WORSHIP DURING ISTIHADA: Unlike menstruation, a woman with istihada: MUST pray and fast, performs wudu before each prayer time, can touch the Quran, can have marital relations after istibra (checking for flow cessation), follows her regular menstrual pattern if she has one established. The Prophet ﷺ told women with istihada to 'perform wudu for every prayer' and to 'pray and fast' during the irregular bleeding.",
      category: "istihada",
      tags: ["irregular bleeding", "istihada", "continuous bleeding", "worship", "difference"],
      source: "Sahih Bukhari, Sunan Abu Dawud, Zad Al-Mustaqni, Natural Blood of Women"
    },

    // POSTPARTUM BLEEDING (NIFAS) - Comprehensive Section
    {
      id: 6,
      question: "What is postpartum bleeding (nifas) and what are its complete rulings?",
      answer: "Nifas (postpartum bleeding) is the bleeding that occurs after childbirth, whether the birth was normal delivery or cesarean section. According to Islamic law, nifas has the same rulings as menstruation regarding religious obligations. DURATION: The maximum duration is 40 days according to the majority of scholars, based on the hadith of Um Salamah who said the women during the Prophet's time used to remain in postnatal confinement for 40 days. There is NO minimum duration - if bleeding stops after 1 day, perform ghusl and resume prayers. If bleeding continues beyond 40 days, everything after day 40 is considered istihada. RULINGS DURING NIFAS: All prohibitions of menstruation apply: No prayer (salah) - and no makeup required, No fasting - but makeup IS required after purity, No touching the Quran directly, No sexual intercourse, No entering the mosque, No tawaf around the Ka'bah. SPECIAL CONSIDERATIONS: If a woman gives birth but has no bleeding (dry birth), she should resume prayers immediately after she's physically able. Miscarriage bleeding: If the fetus was developed enough to be recognizable as human (typically after 4 months), the bleeding is nifas. Before that, it's treated as irregular bleeding (istihada). C-section: The same rules apply regardless of delivery method. RETURNING TO WORSHIP: When bleeding stops (even before 40 days), perform ghusl immediately and resume all obligations. If bleeding resumes within the 40-day period, it's still nifas. After 40 days, any bleeding is istihada and worship continues normally with wudu before each prayer.",
      category: "nifas",
      tags: ["postpartum", "nifas", "childbirth", "forty days", "bleeding"],
      source: "Hadith collections, Zad Al-Mustaqni, Natural Blood of Women, Classical Fiqh"
    },

    // PURITY (TAHARAH) - Comprehensive Section
    {
      id: 7,
      question: "How do I perform ghusl (ritual bath) correctly after menstruation or nifas?",
      answer: "Ghusl is obligatory after the end of menstruation, nifas, sexual intercourse, and wet dreams with emission. The method according to Zad Al-Mustaqni: OBLIGATORY ELEMENTS (Fara'id): 1) INTENTION (Niyyah): Intend in your heart to purify yourself from major ritual impurity. 2) Washing the entire body including hair roots with water. RECOMMENDED METHOD (Sunnah): 1) Begin with 'Bismillah', 2) Wash hands three times, 3) Clean private parts thoroughly, removing any impurities, 4) Perform complete wudu as for prayer, 5) Pour water over the head three times, ensuring it reaches the hair roots, 6) Wash the right side of the body, then the left side, 7) Ensure water reaches every part of the body including between fingers, toes, and all body creases. ESSENTIAL REQUIREMENTS: Water must touch every part of the external body, Nothing should prevent water from reaching the skin (remove nail polish, thick makeup), Hair must be thoroughly wetted to the roots, but don't need to undo braids if water reaches the scalp. AFTER GHUSL: You are immediately pure and can resume all worship activities, No need for separate wudu after ghusl for the first prayer, However, any nullifier of wudu after ghusl will require fresh wudu. COMMON MISTAKES TO AVOID: Not ensuring water reaches hair roots, Missing areas like behind ears, between toes, Rushing through the process without thoroughness, Performing ghusl while still bleeding (wait for complete cessation).",
      category: "purity",
      tags: ["ghusl", "ritual bath", "purification", "method", "requirements"],
      source: "Quran 5:6, Sahih Bukhari (248), Zad Al-Mustaqni, Natural Blood of Women"
    },

    // WORSHIP AND EXEMPTIONS - Comprehensive Section
    {
      id: 8,
      question: "What worship and dhikr can I do during menstruation?",
      answer: "Many forms of worship remain not only permissible but highly recommended during menstruation: HIGHLY ENCOURAGED ACTS: All forms of dhikr (remembrance of Allah): Tasbih (Subhan Allah), Tahmid (Alhamdulillahi), Takbir (Allahu Akbar), Tahlil (La ilaha illa Allah), Istighfar (seeking forgiveness), All types of du'a (supplication), Reading Islamic books and listening to Quran recitations, Attending Islamic lectures (except in mosque prayer areas), Learning and teaching Islam, Giving charity and helping others. SPECIFIC DHIKR RECOMMENDATIONS: Morning and evening adhkar, Dhikr after prayer times (even though you don't pray), Du'a during blessed times (before Maghrib, between Maghrib and Isha, last third of night), Salawat upon the Prophet ﷺ, Reciting 'A'udhu billahi min ash-shaytani'r-rajim' and 'Bismillahi'r-rahmani'r-rahim'. QURAN INTERACTION: You may recite Quranic verses from memory for dhikr purposes, Listen to Quran recitations and contemplate meanings, Read translations and tafsir, Say 'A'udhu billah' and 'Bismillah' when reading translations. EMOTIONAL AND SPIRITUAL SUPPORT: This is an excellent time for self-reflection and spiritual growth, Many women report feeling more emotionally receptive to dhikr during this time, Use this period for increased du'a and seeking closeness to Allah, Remember that this is a natural state created by Allah and not a punishment. The key principle is that while physical worship (prayer, fasting) is suspended, spiritual connection with Allah through dhikr, du'a, and remembrance is strongly encouraged.",
      category: "worship",
      tags: ["dhikr", "remembrance", "dua", "worship", "permissible"],
      source: "Scholarly consensus, Zad Al-Mustaqni, Natural Blood of Women"
    },
    {
      id: 9,
      question: "Can I touch or read the Quran during menstruation?",
      answer: "This is a detailed area of scholarly discussion with nuanced rulings: TOUCHING THE MUSHAF (Physical Quran): The majority opinion, including the Hanbali school per Zad Al-Mustaqni, prohibits direct contact with the Arabic text based on Quran 56:79 'None touch it except the purified' and the hadith 'The believer is never impure.' However, you CAN: Touch it with a barrier (gloves, cloth, sleeve), Read from digital devices (phone, tablet, computer), Use Quran apps and websites, Touch translations that are not purely Quranic text. MEMORIZED QURAN: You may recite from memory for: Dhikr and du'a purposes, Teaching others (especially children), Contemplation and reflection, Seeking comfort in familiar verses. LEARNING AND STUDYING: You may: Study tafsir (Quranic commentary), Read about Quranic sciences, Listen to recitations and follow along in your mind, Attend Quran classes (though not in mosque prayer areas). DIGITAL QURAN: Modern scholars generally agree that digital versions don't carry the same ruling as physical mushaf, Apps and websites are permissible to use, E-books and PDFs are generally considered acceptable. PRACTICAL GUIDANCE: If you regularly read Quran, don't let menstruation disconnect you from its guidance, Focus on listening, memorization review, and understanding, Use this time for deeper contemplation of meanings, Remember that the spiritual connection remains strong even without physical touching. The key is maintaining your relationship with Allah's word while respecting traditional boundaries.",
      category: "worship",
      tags: ["quran", "reading", "touching", "mushaf", "digital"],
      source: "Quran 56:79, Zad Al-Mustaqni, Contemporary scholarly opinions, Natural Blood of Women"
    },

    // INTIMACY AND MARRIAGE - Comprehensive Section
    {
      id: 10,
      question: "What are the detailed rulings about intimate relations during menstruation?",
      answer: "Sexual intimacy during menstruation has specific rulings based on Quran 2:222: 'So keep away from women during menstruation and do not approach them until they are pure.' STRICTLY PROHIBITED: Vaginal intercourse is completely forbidden during menstruation, This prohibition is absolute and applies to the entire menstrual period, The prohibition continues until the woman sees signs of purity (qassa bayda or complete dryness) AND performs ghusl. WHAT IS PERMITTED: All other forms of physical intimacy are allowed: Kissing, embracing, caressing, Touching above the waist, Sleeping in the same bed, General marital affection and companionship. AREA OF SCHOLARLY DIFFERENCE - Between Navel and Knees: Conservative opinion: Avoid direct skin contact between navel and knees, Moderate opinion: Contact is permitted with clothing or barrier, The safest approach is to maintain some barrier in this area. HUSBAND'S RESPONSIBILITIES: The husband should be understanding and patient, He should not pressure his wife or make her feel uncomfortable, This is a time for non-physical expressions of love and care, The Prophet ﷺ was reported to be loving and considerate during Aisha's periods. RESUMPTION AFTER PURITY: Relations may resume immediately after: The woman sees signs of purity (white discharge or complete dryness), AND she performs ghusl, There is no waiting period after ghusl. EXPIATION FOR VIOLATION: If vaginal intercourse occurs during menstruation, some scholars require giving charity (one dinar or half dinar) as expiation, The couple should seek forgiveness and not repeat the act. EMOTIONAL CONSIDERATIONS: This period can strengthen emotional intimacy, Focus on communication, affection, and spiritual connection, Remember this is a temporary state and part of Allah's wisdom in marriage.",
      category: "intimacy",
      tags: ["intimacy", "marriage", "intercourse", "relations", "prohibited"],
      source: "Quran 2:222, Zad Al-Mustaqni, Abu Dawud (264), Natural Blood of Women"
    },

    // FASTING AND RAMADAN - Comprehensive Section
    {
      id: 11,
      question: "What are the complete rules for fasting during menstruation?",
      answer: "Fasting is strictly prohibited during menstruation, and this is one of the clearest rulings in Islamic law. PROHIBITION: You MUST break your fast immediately when menstruation begins, even if it's moments before Maghrib, Continuing to fast during menstruation is sinful and doesn't count as valid fasting, This applies to all types of fasts: Ramadan, voluntary, makeup, and votive fasts. EVIDENCE: Aisha (رضي الله عنها) said: 'We were ordered to make up the missed fasts but not the missed prayers' (Sahih Bukhari 321), The Prophet ﷺ said: 'Is it not the case that when she gets her period, she neither prays nor fasts?' (Sahih Bukhari 304). MAKING UP RAMADAN FASTS: You MUST make up all missed Ramadan fasting days, The makeup days can be done individually throughout the year before the next Ramadan, They don't need to be consecutive unless you're making up for consecutive days missed, You have until the next Ramadan begins to complete makeup fasts, If you delay beyond the next Ramadan without valid excuse, you owe makeup plus fidya (feeding a poor person for each delayed day). VOLUNTARY FASTS: Missed voluntary fasts (like Mondays/Thursdays, Arafah, Ashura) do not need to be made up, However, if you had made a vow (nadhr) to fast specific days, those must be made up. PRACTICAL GUIDANCE: Keep track of missed days during Ramadan, Begin makeup fasts as soon as possible after Ramadan, Space them out according to your ability and schedule, If you get your period while making up a fast, that day doesn't count and must be repeated, Pregnant and breastfeeding women follow similar rules if they can't fast. WISDOM BEHIND THE RULING: Recognizes the physical and emotional challenges during menstruation, Prevents potential health complications, Shows Allah's mercy in not overburdening His servants, Maintains the spiritual purity and focus required for fasting.",
      category: "fasting",
      tags: ["fasting", "ramadan", "prohibited", "makeup", "qada"],
      source: "Sahih Bukhari (321, 304), Zad Al-Mustaqni, Natural Blood of Women"
    },

    // MOSQUE AND SPIRITUAL PLACES
    {
      id: 12,
      question: "Can I enter the mosque during menstruation?",
      answer: "The ruling on entering mosques during menstruation has scholarly differences: MAJORITY OPINION (More Restrictive): Based on the hadith 'I do not permit the mosque to anyone who is in a state of major ritual impurity' (Sunan Abu Dawud), women in menstruation should not enter the mosque for non-essential purposes. EXCEPTIONS ALLOWED BY MOST SCHOLARS: Passing through the mosque if it's the only route, Emergency situations (safety, seeking help), Brief entry to retrieve personal belongings, Attending crucial Islamic education if no alternative exists. ALTERNATIVE OPINION (Some Contemporary Scholars): Some scholars argue that the prohibition applies primarily to staying in the mosque for worship, Brief visits for educational purposes or community needs may be permitted, The focus should be on the intention and necessity. PRACTICAL ALTERNATIVES: Attend online Islamic lectures and classes, Listen to mosque lectures from outside or through audio systems, Engage in Islamic learning at home or other venues, Use mosque facilities (like libraries) when not in menstruation. MASJID AL-HARAM (Mecca): The majority opinion prohibits entering Masjid al-Haram during menstruation, This includes Tawaf, which is explicitly forbidden during menstruation, Women on Hajj or Umrah must wait for purity before entering. WISDOM AND CONSIDERATIONS: The mosque is primarily a place for prayer, which is forbidden during menstruation, This ruling encourages alternative forms of spiritual engagement, It prevents potential discomfort or self-consciousness during worship times, Remember that spiritual connection with Allah doesn't require mosque attendance. RESPECTFUL APPROACH: Follow the conservative opinion to avoid scholarly disputes, Focus on home-based worship and learning during this time, Plan mosque activities around your cycle when possible, Maintain spiritual engagement through permitted means.",
      category: "worship",
      tags: ["mosque", "masjid", "entering", "prohibited", "exceptions"],
      source: "Sunan Abu Dawud, Scholarly consensus, Natural Blood of Women, Contemporary Fatwas"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'menstruation', label: 'Menstruation (Hayd)' },
    { id: 'istihada', label: 'Irregular Bleeding' },
    { id: 'nifas', label: 'Postpartum (Nifas)' },
    { id: 'purity', label: 'Purity & Ghusl' },
    { id: 'worship', label: 'Worship & Prayer' },
    { id: 'fasting', label: 'Fasting & Ramadan' },
    { id: 'intimacy', label: 'Marriage & Intimacy' }
  ];

  const topics = [
    { id: 'search', label: 'Search Knowledge', icon: Search, color: 'bg-indigo-500' },
    { id: 'ai-bot', label: 'Ask AI Assistant', icon: Bot, color: 'bg-purple-500' },
    { id: 'education', label: 'Education & Wellness', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'menstruation', label: 'Menstruation (Hayd)', icon: Moon, color: 'bg-red-500' },
    { id: 'purity', label: 'Purity & Ghusl', icon: Heart, color: 'bg-teal-500' },
    { id: 'worship', label: 'Worship & Exemptions', icon: Utensils, color: 'bg-green-500' },
    { id: 'nifas', label: 'Postpartum (Nifas)', icon: Baby, color: 'bg-pink-500' },
    { id: 'istihada', label: 'Irregular Bleeding (Istihada)', icon: Heart, color: 'bg-orange-500' },
    { id: 'intimacy', label: 'Marital Relations', icon: Home, color: 'bg-purple-500' },
    { id: 'divorce', label: 'Divorce & Iddah', icon: Scale, color: 'bg-gray-500' },
  ];

  const renderContent = () => {
    if (activeTab === 'search') {
      return (
        <EnhancedSearchInterface 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          knowledgeBase={knowledgeBase}
        />
      );
    }
    
    switch (activeTab) {
      case 'ai-bot':
        return <IslamicAIBot />;
      case 'education':
        return <EducationTopics />;
      case 'menstruation':
        return <MenstruationGuidance />;
      case 'purity':
        return <PurityGuidance />;
      case 'worship':
        return <WorshipExemptions />;
      case 'nifas':
        return <NifasGuidance />;
      case 'istihada':
        return <IstihadaGuidance />;
      case 'fasting':
        return <FastingGuidance />;
      case 'intimacy':
        return <IntimacyGuidance />;
      case 'divorce':
        return <DivorceGuidance />;
      default:
        return (
          <EnhancedSearchInterface 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            knowledgeBase={knowledgeBase}
          />
        );
    }
  };

  const filteredTopics = topics.filter(topic =>
    topic.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Ask the Deen</h1>
        <p className="text-gray-600">Search Islamic guidance, ask our AI assistant, or browse by topic</p>
        <p className="text-sm text-purple-600 mt-2 font-medium">
          Complete content from "Natural Blood of Women" with authentic references
        </p>
      </div> */}

      <div className="text-center">
  <h1 className={`text-3xl font-bold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
    Ask the Deen
  </h1>
  <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
    Search Islamic guidance, ask our AI assistant, or browse by topic
  </p>
  <p className={`text-sm mt-2 font-medium ${settings.darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
    Complete content from "Natural Blood of Women" with authentic references
  </p>
</div>


      {/* Search Bar - always visible */}
{/*       
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-4">
          <div className="flex flex-col space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Ask any Islamic question about women's health..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) setActiveTab('search');
                }}
                className="pl-10 border-purple-200 focus:border-purple-400"
              />
            </div>
            
            {activeTab === 'search' && (
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-purple-200 rounded-md px-3 py-1 text-sm focus:outline-none focus:border-purple-400"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </CardContent>
      </Card> */}

<Card className="relative overflow-hidden card-3d">
  <div
    className={`absolute inset-0 ${
      settings.darkMode
        ? 'bg-slate-900 border border-slate-700'
        : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
    }`}
  ></div>

  <CardContent className="p-4 relative z-10">
    <div className="flex flex-col space-y-3">
      <div className="relative">
        <Search
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            settings.darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        />
        <Input
          placeholder="Ask any Islamic question about women's health..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value) setActiveTab('search');
          }}
          className={`pl-10 rounded-md ${
            settings.darkMode
              ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-slate-500'
              : 'border-purple-200 focus:border-purple-400'
          }`}
        />
      </div>

      {activeTab === 'search' && (
        <div className="flex items-center space-x-2">
          <Filter
            className={`w-4 h-4 ${
              settings.darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`rounded-md px-3 py-1 text-sm focus:outline-none ${
              settings.darkMode
                ? 'bg-slate-800 border-slate-600 text-white focus:border-slate-500'
                : 'border border-purple-200 focus:border-purple-400'
            }`}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  </CardContent>
</Card>




      {/* Topic Navigation */}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">

        {filteredTopics.map((topic) => (
          <Button
            key={topic.id}
            onClick={() => setActiveTab(topic.id)}
            variant={activeTab === topic.id ? "default" : "outline"}
            className={`flex flex-col items-center space-y-2 h-auto py-4 ${
              activeTab === topic.id 
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'border-purple-200 hover:bg-purple-50 hover:border-purple-300'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              activeTab === topic.id ? 'bg-white/20' : topic.color
            }`}>
              <topic.icon className={`w-4 h-4 ${
                activeTab === topic.id ? 'text-white' : 'text-white'
              }`} />
            </div>
            {/* <span className="text-xs text-center font-medium leading-tight text-wrap">{topic.label}</span> */}
          </Button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {renderContent()}
      </div>

      {/* Enhanced Source Attribution */}

      {/* <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <CardHeader>
          <CardTitle className="text-teal-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Trusted Sources & References
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Primary Sources:</h4>
              <ul className="space-y-1 text-teal-700">
                <li>• Holy Qur'an</li>
                <li>• Sahih Bukhari & Muslim</li>
                <li>• Sunan Abu Dawud, Tirmidhi, Nasai, Ibn Majah</li>
                <li>• Musnad Ahmad</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Classical Texts:</h4>
              <ul className="space-y-1 text-teal-700">
                <li>• Zad Al-Mustaqni (Ibn Qudamah)</li>
                <li>• Al-Mughni (Ibn Qudamah)</li>
                <li>• Natural Blood of Women</li>
                <li>• Bidayat Al-Mujtahid</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-2">Contemporary Scholars:</h4>
              <ul className="space-y-1 text-teal-700">
                <li>• IslamQA (Sheikh al-Munajjid)</li>
                <li>• Sheikh Ibn Uthaymeen's works</li>
                <li>• Fatwa Committee of Senior Scholars</li>
                <li>• Contemporary Fiqh Council</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card> */}

      <Card className="relative overflow-hidden card-3d">
  <div
    className={`absolute inset-0 ${
      settings.darkMode
        ? 'bg-slate-900 border border-slate-700'
        : ' from-teal-50 to-blue-50 border-teal-200'
    }`}
  ></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>
      <BookOpen className="w-5 h-5" />
      Trusted Sources & References
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
      <div>
        <h4 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>Primary Sources:</h4>
        <ul className={`space-y-1 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>
          <li>• Holy Qur'an</li>
          <li>• Sahih Bukhari & Muslim</li>
          <li>• Sunan Abu Dawud, Tirmidhi, Nasai, Ibn Majah</li>
          <li>• Musnad Ahmad</li>
        </ul>
      </div>
      <div>
        <h4 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>Classical Texts:</h4>
        <ul className={`space-y-1 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>
          <li>• Zad Al-Mustaqni (Ibn Qudamah)</li>
          <li>• Al-Mughni (Ibn Qudamah)</li>
          <li>• Natural Blood of Women</li>
          <li>• Bidayat Al-Mujtahid</li>
        </ul>
      </div>
      <div>
        <h4 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>Contemporary Scholars:</h4>
        <ul className={`space-y-1 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>
          <li>• IslamQA (Sheikh al-Munajjid)</li>
          <li>• Sheikh Ibn Uthaymeen's works</li>
          <li>• Fatwa Committee of Senior Scholars</li>
          <li>• Contemporary Fiqh Council</li>
        </ul>
      </div>
    </div>
  </CardContent>
</Card>


      {/* YouTube Resources Section */}
      <YouTubeResourcesSection />

      <IslamicDisclaimer />
    </div>
  );
};

export default IslamicGuidance;
