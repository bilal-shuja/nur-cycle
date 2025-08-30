
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { User } from '@supabase/supabase-js';
import TopicDiscussion from './TopicDiscussion';
import { Baby, Heart, Brain, Stethoscope, Moon, Users, BookOpen, Shield, ChevronDown, ChevronRight, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TiteaTalkTopicsProps {
  user: User;
}

const TiteaTalkTopics = ({ user }: TiteaTalkTopicsProps) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
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
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
    else {
      document.documentElement.classList.remove('dark');
    }


  }, []);

  const topicCategories = [
    {
      category: getLocalizedText("talk.menstrual"),
      icon: Heart,
      color: "bg-pink-500",
      topics: [
        getLocalizedText("topics.cycle_periods"),
        getLocalizedText("topics.irregular_cycles"),
        getLocalizedText("topics.heavy_periods"),
        getLocalizedText("topics.pms"),
        getLocalizedText("topics.menstruation_faqs"),
        getLocalizedText("topics.period_deen"),
        getLocalizedText("topics.period_products"),
        getLocalizedText("topics.vaginal_care"),
        getLocalizedText("topics.ovulation"),
        getLocalizedText("topics.vaginismus"),
        getLocalizedText("topics.yeast_infection"),
      ]
    },
    {
      category: getLocalizedText("talk.pregnancy"),
      icon: Baby,
      color: "bg-purple-500",
      topics: [
        getLocalizedText("pregnancy.symptoms"),
        getLocalizedText("pregnancy.journey"),
        getLocalizedText("pregnancy.trimester1"),
        getLocalizedText("pregnancy.trimester2"),
        getLocalizedText("pregnancy.trimester3"),
        getLocalizedText("pregnancy.labour"),
        getLocalizedText("pregnancy.deen"),
        getLocalizedText("pregnancy.conception"),
        getLocalizedText("pregnancy.test"),
        getLocalizedText("pregnancy.ectopic"),
        getLocalizedText("pregnancy.molar"),
        getLocalizedText("pregnancy.chemical"),
        getLocalizedText("pregnancy.beautifulBirths"),
        getLocalizedText("pregnancy.blackBirths"),
      ]
    },
    {
      category: getLocalizedText("talk.postpartum"),
      icon: Baby,
      color: "bg-blue-500",
      topics: [
        getLocalizedText("postpartum"),
        getLocalizedText("postpartum_mental_health"),
        getLocalizedText("breastfeeding_vs_formula"),
        getLocalizedText("babies_toddlers"),
        getLocalizedText("sleep_after_baby"),
        getLocalizedText("body_changes_after_pregnancy"),
        getLocalizedText("hair_loss"),
        getLocalizedText("parenthood"),
        getLocalizedText("working_moms"),
        getLocalizedText("premature_mamas"),
        getLocalizedText("neonatal_death"),
        getLocalizedText("blighted_ovum"),
        getLocalizedText("stillbirth"),
        getLocalizedText("bonding_and_baby"),
        getLocalizedText("body_after_baby"),
      ]
    },
    {
      category: getLocalizedText("talk.mental"),
      icon: Brain,
      color: "bg-green-500",
      topics: [
        getLocalizedText("mental.health"),
        getLocalizedText("emotional.wellbeing"),
        getLocalizedText("self.care.love"),
        getLocalizedText("grief.loss"),
        getLocalizedText("social.emotional.intelligence"),
        getLocalizedText("sleep"),
        getLocalizedText("stress.management"),
        getLocalizedText("bipolar"),
        getLocalizedText("depression"),
        getLocalizedText("anxiety"),
      ]
    },
    {
      category: getLocalizedText('talk.medical'),
      icon: Stethoscope,
      color: "bg-red-500",
      topics: [
        getLocalizedText("pcos"),
        getLocalizedText("endometriosis"),
        getLocalizedText("fertility.issues"),
        getLocalizedText("miscarriages"),
        getLocalizedText("surviving.preeclampsia"),
        getLocalizedText("cervical.health"),
        getLocalizedText("medical.care"),
        getLocalizedText("contraception"),
        getLocalizedText("acne.control"),
        getLocalizedText("sickle.cell"),
        getLocalizedText("thyroid"),
        getLocalizedText("graves.disease"),
        getLocalizedText("diabetes"),
        getLocalizedText("lupus"),
        getLocalizedText("lymes.disease"),
        getLocalizedText("cystic.fibrosis"),
        getLocalizedText("hiv.aids"),
        getLocalizedText("kidney.disease"),
        getLocalizedText("thalassemia"),
      ]
    },
    {
      category: getLocalizedText('talk.life'),
      icon: Moon,
      color: "bg-indigo-500",
      topics: [
        getLocalizedText("topics.lifeTransitions.menopause"),
        getLocalizedText("topics.lifeTransitions.perimenopause"),
        getLocalizedText("topics.lifeTransitions.hormonalChanges"),
        getLocalizedText("topics.lifeTransitions.weightInsights"),
        getLocalizedText("topics.lifeTransitions.lifestyle"),
        getLocalizedText("topics.lifeTransitions.careerStudy"),
      ]
    },
    {
      category: getLocalizedText('talk.relationships'),
      icon: BookOpen,
      color: "bg-amber-500",
      topics: [
        getLocalizedText("topics.relationships.marriageDeen"),
        getLocalizedText("topics.relationships.divorceDeen"),
        getLocalizedText("topics.relationships.relationships"),
        getLocalizedText("topics.relationships.intimacy"),
        getLocalizedText("topics.relationships.sexualHealth"),
      ]
    },
    {
      category: getLocalizedText('talk.abuse'),
      icon: Shield,
      color: "bg-orange-500",
      topics: [
        getLocalizedText("topics.survivorIssues.fgm"),
        getLocalizedText("topics.survivorIssues.domesticViolence"),
        getLocalizedText("topics.survivorIssues.racism"),
        getLocalizedText("topics.survivorIssues.islamophobia"),
        getLocalizedText("topics.survivorIssues.childMarriage"),
        getLocalizedText("topics.survivorIssues.forcedMarriage"),
        getLocalizedText("topics.survivorIssues.sexualAssault"),
        getLocalizedText("topics.survivorIssues.bullying"),
      ]
    },
    {
      category: getLocalizedText('talk.community'),
      icon: Users,
      color: "bg-teal-500",
      topics: [
        getLocalizedText("topics.general.familyFriends"),
        getLocalizedText("topics.general.supportSystem"),
        getLocalizedText("topics.general.ovulation"),
        getLocalizedText("topics.general.discussion"),
      ]
    },

     {
      category: getLocalizedText("islam.word"),
      icon: Star,
      color: "bg-emerald-500",
      topics: [
  getLocalizedText('revert_sisters_support'),
  getLocalizedText('finding_islam'),
  getLocalizedText('islam'),
  getLocalizedText('hijab_haya'),
  getLocalizedText('quran_sunnah'),
  getLocalizedText('lift_your_iman'),
  getLocalizedText('journey_to_marriage'),
  getLocalizedText('single_sisters'),
  getLocalizedText('single_moms')
      ]
    }
  ];

  const toggleCategory = (categoryIndex: number) => {
    setExpandedCategories(prev =>
      prev.includes(categoryIndex)
        ? prev.filter(i => i !== categoryIndex)
        : [...prev, categoryIndex]
    );
  };

  if (selectedTopic) {
    return (
      <TopicDiscussion
        topic={selectedTopic}
        user={user}
        onBack={() => setSelectedTopic(null)}
      />
    );
  }




  return (
    <div className="max-w-6xl mx-auto space-y-6">

      <Card className="relative overflow-hidden card-3d">
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-600 to-white'}`}></div>
        <CardContent className="relative z-10 p-6">
          <CardHeader>
            <CardTitle className={`text-2xl text-center ${settings.darkMode ? 'text-white' : 'text-lavender-900'}`}>
              🗣️ {getLocalizedText('talk.title')} 🗣️
            </CardTitle>
            <p className={`text-center opacity-90 ${settings.darkMode ? 'text-gray-300' : 'text-lavender-900'}`}>
              {getLocalizedText('talk.subtitle')}
            </p>
          </CardHeader>
        </CardContent>
      </Card>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topicCategories.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          return (


            <Card key={categoryIndex} className="relative overflow-hidden card-3d">
              <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-600 to-white'}`}></div>
              <CardContent className="relative z-10 p-6">
                <Collapsible
                  open={expandedCategories.includes(categoryIndex)}
                  onOpenChange={() => toggleCategory(categoryIndex)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="pb-3 cursor-pointer hover:bg-opacity-10 hover:bg-white rounded-lg transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${category.color} text-white`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <CardTitle className={`text-lg ${settings.darkMode ? 'text-white' : 'text-lavender-900'}`}>
                            {category.category}
                          </CardTitle>
                        </div>
                        {expandedCategories.includes(categoryIndex) ? (
                          <ChevronDown className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-lavender-900'}`} />
                        ) : (
                          <ChevronRight className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-lavender-900'}`} />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent>
                      <div className="space-y-2">
                        {category.topics.map((topic, topicIndex) => (
                          <Button
                            key={topicIndex}
                            variant="ghost"
                            onClick={() => setSelectedTopic(topic)}
                            className={`w-full justify-start text-sm hover:bg-purple-50 hover:text-purple-700 ${settings.darkMode ? 'text-gray-300' : 'text-lavender-900'}`}
                          >
                            <span className="truncate">{topic}</span>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>

          );
        })}
      </div>

      {/* Community Guidelines Reminder */}

      <Card className="relative overflow-hidden card-3d bg-purple-50 border-purple-200">
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-600 to-white'}`}></div>
        <CardContent className="relative z-10 p-4">
          <h3 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-purple-800'} mb-2`}>
            {getLocalizedText('discussion.guidelines.title')}
          </h3>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 text-sm ${settings.darkMode ? 'text-gray-300' : 'text-lavender-800'}`}>
            <div>• {getLocalizedText('discussion.guidelines.respect')}</div>
            <div>• {getLocalizedText('discussion.guidelines.responsibleSharing')}</div>
            <div>• {getLocalizedText('discussion.guidelines.noSwearing')}</div>
            <div>• {getLocalizedText('discussion.guidelines.noInappropriate')}</div>
            <div>• {getLocalizedText('discussion.guidelines.noBullying')}</div>
            <div>• {getLocalizedText('discussion.guidelines.islamicValues')}</div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default TiteaTalkTopics;
