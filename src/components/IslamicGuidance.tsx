
import React, { useState, useEffect } from 'react';
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
import { useLanguage } from '@/contexts/LanguageContext';

const IslamicGuidance = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  // Comprehensive knowledge base with complete content from "Natural Blood of Women"
  const knowledgeBase = [
    // MENSTRUATION (HAYD) - Comprehensive Section
    {
      id: 1,
      question: getLocalizedText('faq.menstruation'),
      answer: getLocalizedText('menstruation.definition'),
      category: getLocalizedText('menstruation'),
      tags: [getLocalizedText('hayd'), getLocalizedText('menstruation'), getLocalizedText('definition'), getLocalizedText('islamic.law'), getLocalizedText('fiqh')],
      source: getLocalizedText('books.references')
    },
    {
      id: 2,
      question: getLocalizedText('menstruation.duration.question'),
      answer: getLocalizedText('menstruation.duration.answer'),
      category: getLocalizedText('menstruation'),
      tags: [getLocalizedText('duration'), getLocalizedText('minimum'), getLocalizedText('maximum'), getLocalizedText('fifteen.days')],
      source: getLocalizedText('reference.books')
    },
    {
      id: 3,
      question: getLocalizedText('menstruation.prayer.question'),
      answer: getLocalizedText('menstruation.prayer.answer'),
      category: getLocalizedText('worship'),
      tags: [getLocalizedText('prayer'), getLocalizedText('salah'), getLocalizedText('menstruation'), getLocalizedText('makeup'), getLocalizedText('forbidden')],
      source: getLocalizedText('sources.references')
    },
    {
      id: 4,
      question: getLocalizedText('menstruation.purity.question'),
      answer: getLocalizedText('menstruation.purity.answer'),
      category: getLocalizedText('menstruation'),
      tags: [getLocalizedText('purity'), getLocalizedText('signs'), getLocalizedText('qassa.bayda'), getLocalizedText('dryness'), getLocalizedText('end.of.period')],
      source: getLocalizedText('text.sources'),
    },
    {
      id: 5,
      question: getLocalizedText('istihada.question'),
      answer: getLocalizedText('istihada.answer'),
      category: getLocalizedText('istihada'),
      tags: [getLocalizedText('irregular.bleeding'), getLocalizedText('istihada'), getLocalizedText('continuous.bleeding'), getLocalizedText('worship'), getLocalizedText('difference')],
      source: getLocalizedText('istihada.sources'),
    },

    // POSTPARTUM BLEEDING (NIFAS) - Comprehensive Section
    {
      id: 6,
      question: getLocalizedText('nifas.question'),
      answer: getLocalizedText('nifas.answer'),
      category: getLocalizedText('nifas'),
      tags: [getLocalizedText('postpartum'), getLocalizedText('nifas'), getLocalizedText('childbirth'), getLocalizedText('forty.days'), getLocalizedText('bleeding')],
      source: getLocalizedText('nifas.sources')
    },

    // PURITY (TAHARAH) - Comprehensive Section
    {
      id: 7,
      question: getLocalizedText('ghusl.question'),
      answer: getLocalizedText('ghusl.answer'),
      category: getLocalizedText('purity'),
      tags: [getLocalizedText('ghusl'), getLocalizedText('ritual.bath'), getLocalizedText('purification'), getLocalizedText('method'), getLocalizedText('requirements')],
      source: getLocalizedText('ghusl.sources')
    },

    // WORSHIP AND EXEMPTIONS - Comprehensive Section
    {
      id: 8,
      question: getLocalizedText('faq.menstruation.worship'),
      answer: getLocalizedText('faq.menstruation.detail'),
      category: getLocalizedText('menstruation.worship'),
      tags: [getLocalizedText('faq.menstruation.dhikr'), getLocalizedText('faq.menstruation.remembrance'), getLocalizedText('faq.menstruation.dua'), getLocalizedText('menstruation.worship'), , getLocalizedText('faq.menstruation.permissible')],
      source: getLocalizedText('faq.menstruation.sources')
    },
    {
      id: 9,
      question: getLocalizedText('faq.quran.title'),
      answer: getLocalizedText('faq.quran.detail'),
      category: getLocalizedText('menstruation.worship'),
      tags: [getLocalizedText('faq.quran.quran'), getLocalizedText('faq.quran.reading'), getLocalizedText('faq.quran.touching'), getLocalizedText('faq.quran.mushaf'), getLocalizedText('faq.quran.digital')],
      source: getLocalizedText('faq.quran.sources')
    },

    // INTIMACY AND MARRIAGE - Comprehensive Section
    {
      id: 10,
      question: getLocalizedText('intimate.relations.question'),
      answer: getLocalizedText('intimate.relations.answer'),
      category: getLocalizedText('intimacy'),
      tags: [getLocalizedText('intimacy'), getLocalizedText('marriage'), getLocalizedText('intercourse'), getLocalizedText('relations'), getLocalizedText('prohibited')],
      source: getLocalizedText('intimate.references')
    },

    // FASTING AND RAMADAN - Comprehensive Section
    {
      id: 11,
      question: getLocalizedText('faq.menstruation.fasting_rules'),
      answer: getLocalizedText('faq.menstruation.rules'),
      category: getLocalizedText('faq.fasting'),
      tags: [getLocalizedText('faq.fasting'), getLocalizedText('faq.ramadan'), getLocalizedText('faq.prohibited'), getLocalizedText('faq.makeup'), getLocalizedText('faq.qada')],
      source: getLocalizedText('faq.sahih_bukhari')
    },

    // MOSQUE AND SPIRITUAL PLACES
    {
      id: 12,
      question: getLocalizedText('faq.menstruation.mosque.entering'),
      answwer: getLocalizedText('faq.menstruation.mosque.ruling'),
      category: getLocalizedText('faq.worship'),
      tags: [getLocalizedText('faq.menstruation.mosque'), getLocalizedText('faq.menstruation.masjid'), getLocalizedText('faq.menstruation.entering'), getLocalizedText('faq.menstruation.prohibited'), getLocalizedText('faq.menstruation.exceptions')],
      source: getLocalizedText('faq.menstruation.sunan.abu.dawud')
    }
  ];

  const categories = [
    { id: 'all', label: getLocalizedText('categories.all') },
    { id: 'menstruation', label: getLocalizedText('categories.menstruation') },
    { id: 'istihada', label: getLocalizedText('categories.irregular_bleeding') },
    { id: 'nifas', label: getLocalizedText('categories.postpartum') },
    { id: 'purity', label: getLocalizedText('categories.purity_ghusl') },
    { id: 'worship', label: getLocalizedText('categories.worship_prayer') },
    { id: 'fasting', label: getLocalizedText('categories.fasting_ramadan') },
    { id: 'intimacy', label: getLocalizedText('categories.marriage_intimacy') }
  ];

  const topics = [
    { id: 'search', label: getLocalizedText('label.search_knowledge'), icon: Search, color: 'bg-indigo-500' },
    { id: 'ai-bot', label: getLocalizedText('label.ask_ai_assistant'), icon: Bot, color: 'bg-purple-500' },
    { id: 'education', label: getLocalizedText('label.education_wellness'), icon: BookOpen, color: 'bg-blue-500' },
    { id: 'menstruation', label: getLocalizedText('label.menstruation'), icon: Moon, color: 'bg-red-500' },
    { id: 'purity', label: getLocalizedText('label.purity_ghusl'), icon: Heart, color: 'bg-teal-500' },
    { id: 'worship', label: getLocalizedText('label.worship_exemptions'), icon: Utensils, color: 'bg-green-500' },
    { id: 'nifas', label: getLocalizedText('label.postpartum'), icon: Baby, color: 'bg-pink-500' },
    { id: 'istihada', label: getLocalizedText('label.irregular_bleeding'), icon: Heart, color: 'bg-orange-500' },
    { id: 'intimacy', label: getLocalizedText('label.marital_relations'), icon: Home, color: 'bg-purple-500' },
    { id: 'divorce', label: getLocalizedText('label.divorce_iddah'), icon: Scale, color: 'bg-gray-500' },
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


      <div className="text-center">
        <h1 className={`text-3xl font-bold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
          {getLocalizedText('ask-the-deen')}
        </h1>
        <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {getLocalizedText('label.search_islamic_guidance')}
        </p>
        <p className={`text-sm mt-2 font-medium ${settings.darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
          {getLocalizedText('label.complete_content_natural_blood')}
        </p>
      </div>


      <Card className="relative overflow-hidden card-3d">
        <div
          className={`absolute inset-0 ${settings.darkMode
            ? 'bg-slate-900 border border-slate-700'
            : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
            }`}
        ></div>

        <CardContent className="p-4 relative z-10">
          <div className="flex flex-col space-y-3">
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
              />
              <Input
                placeholder={getLocalizedText('label.ask_islamic_question_womens_health')}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) setActiveTab('search');
                }}
                className={`pl-10 rounded-md ${settings.darkMode
                  ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-slate-500'
                  : 'border-purple-200 focus:border-purple-400'
                  }`}
              />
            </div>

            {activeTab === 'search' && (
              <div className="flex items-center space-x-2">
                <Filter
                  className={`w-4 h-4 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`rounded-md px-3 py-1 text-sm focus:outline-none ${settings.darkMode
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
            className={`flex flex-col items-center space-y-2 h-auto py-4 ${activeTab === topic.id
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'border-purple-200 hover:bg-purple-50 hover:border-purple-300'
              }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === topic.id ? 'bg-white/20' : topic.color
              }`}>
              <topic.icon className={`w-4 h-4 ${activeTab === topic.id ? 'text-white' : 'text-white'
                }`} />
            </div>

          </Button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {renderContent()}
      </div>

      <Card className="relative overflow-hidden card-3d">
        <div
          className={`absolute inset-0 ${settings.darkMode
            ? 'bg-slate-900 border border-slate-700'
            : ' from-teal-50 to-blue-50 border-teal-200'
            }`}
        ></div>

        <CardHeader className="relative z-10">
          <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>
            <BookOpen className="w-5 h-5" />
            {getLocalizedText('label.trusted_sources_references')}
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}> {getLocalizedText('label.primary_sources')}:</h4>
              <ul className={`space-y-1 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>
                <li>• {getLocalizedText('label.holy_quran')} </li>
                <li>• {getLocalizedText('label.sahih_bukhari_muslim')}</li>
                <li>• {getLocalizedText('label.sunan_abu_dawud_tirmidhi_nasai_ibn_majah')}</li>
                <li>• {getLocalizedText('label.musnad_ahmad')} </li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}>{getLocalizedText('label.classical_texts')}:</h4>
              <ul className={`space-y-1 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>
                <li>• {getLocalizedText('label.zad_al_mustaqni_ibn_qudamah')} </li>
                <li>• {getLocalizedText('label.al_mughni_ibn_qudamah')} </li>
                <li>• {getLocalizedText('label.natural_blood_of_women')} </li>
                <li>• {getLocalizedText('label.bidayat_al_mujtahid')} </li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-teal-800'}`}> {getLocalizedText('label.contemporary_scholars')}:</h4>
              <ul className={`space-y-1 ${settings.darkMode ? 'text-gray-300' : 'text-teal-700'}`}>
                <li>• {getLocalizedText('label.islamqa_sheikh_al_munajjid')} </li>
                <li>• {getLocalizedText('label.sheikh_ibn_uthaymeen_works')} </li>
                <li>• {getLocalizedText('label.fatwa_committee_senior_scholars')} </li>
                <li>• {getLocalizedText('label.contemporary_fiqh_council')} </li>
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
