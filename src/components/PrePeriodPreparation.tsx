
import  { useState , useEffect} from 'react';
import { BookOpen, Heart, Droplets, Calendar, AlertCircle, Thermometer, Users, Apple, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useLanguage } from '@/contexts/LanguageContext';


const PrePeriodPreparation = () => {
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const { getLocalizedText } = useLanguage();
  
  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
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

  const preparationTopics = [
    {
      id: 'hydration',
      title: getLocalizedText('hydration'),
      icon: Droplets,
      color: 'from-blue-400 to-blue-600',
      content: {
        title: getLocalizedText('importance.hydration'),
        article: getLocalizedText('hydration.tips') 
      }
    },
    {
      id: 'nutrition',
      title: getLocalizedText('nutrition') ,
      icon: Heart,
      color: 'from-red-400 to-red-600',
      content: {
        title: getLocalizedText('nutritional.tips'),
        article: getLocalizedText('nutrition.tips') 
      }
    },
    {
      id: 'tracking',
      title: getLocalizedText('cycle.tracking'),
      icon: Calendar,
      color: 'from-green-400 to-green-600',
      content: {
        title: getLocalizedText('effective.cycle.tracking') ,
        article: getLocalizedText('cycle.tracking.tips') 
      }
    },
    {
      id: 'symptoms',
      title: getLocalizedText('symptom.management') ,
      icon: AlertCircle,
      color: 'from-yellow-400 to-yellow-600',
      content: {
        title: getLocalizedText('managing.common.symptoms') ,
        article: getLocalizedText('symptom.management.tips') 
      }
    },
    {
      id: 'temperature',
      title: getLocalizedText('basal.body.temperature'),
      icon: Thermometer,
      color: 'from-purple-400 to-purple-600',
      content: {
        title: getLocalizedText('understanding.bbt'),
        article: getLocalizedText('bbt.tips') 
      }
    },
    {
      id: 'community',
      title: getLocalizedText('community.support') ,
      icon: Users,
      color: 'from-pink-400 to-pink-600',
      content: {
        title: getLocalizedText('finding.community.support') ,
        article: getLocalizedText('community.support.tips') 
      }
    },
    {
      id: 'appleCider',
      title: getLocalizedText('apple.cider.vinegar') ,
      icon: Apple,
      color: 'from-orange-400 to-orange-600',
      content: {
        title: getLocalizedText('benefits.acv'),
        article: getLocalizedText('acv.tips') 
      }
    },
  ];

  const popularQuestions = [
    {
      question: getLocalizedText('question.prepare.before.period'),
      answer: getLocalizedText('answer.prepare.before.period') 
    },
    {
      question: getLocalizedText('question.essential.supplies') ,
      answer: getLocalizedText('answer.essential.supplies') 
    },
    {
      question: getLocalizedText('question.track.cycle') ,
      answer: getLocalizedText('answer.track.cycle') 
    },
    {
      question: getLocalizedText('question.foods.before.period') ,
      answer: getLocalizedText('answer.foods.before.period') 
    },
    {
      question: getLocalizedText('question.feel.emotional') ,
      answer: getLocalizedText('answer.feel.emotional') 
    },
    {
      question: getLocalizedText('question.manage.pain') ,
      answer: getLocalizedText('answer.manage.pain') 
    },
    {
      question: getLocalizedText('question.irregular.period') ,
      answer: getLocalizedText('answer.irregular.period') 
    },
    {
      question: getLocalizedText('question.choose.products') ,
      answer: getLocalizedText('answer.choose.products') 
    }
  ];

  const visibleQuestions = showAllQuestions ? popularQuestions : popularQuestions.slice(0, 3);

  return (
    <>
    
  

          <Card className="relative overflow-hidden text-black dark:text-white p-4 shadow-lg">
  <div className="absolute inset-0b g-gradient-to-br from-purple-100 to-pink-100 border-purple-300 "></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

  <CardHeader className="text-center relative z-10">
    <CardTitle className="flex items-center justify-center gap-2 text-purple-900 dark:text-white">
      <BookOpen className="w-6 h-6" />
      {getLocalizedText('have.read.before.bleed')}
    </CardTitle>
    <CardDescription className="text-purple-700 dark:text-gray-300">
     {getLocalizedText('essential.knowledge')}
    </CardDescription>
  </CardHeader>

  <CardContent className="space-y-6 relative z-10">
    <>
      <h3 className="text-lg font-semibold mb-4 text-center text-purple-900 dark:text-white">{getLocalizedText('preparation.topics')}</h3>
      <div className="space-y-3">
        {preparationTopics.map((topic) => (
          <Collapsible key={topic.id}>
            <CollapsibleTrigger asChild>
              <Card className="relative overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-purple-300 dark:hidden rounded-lg"></div>
                <div className="absolute inset-0 hidden dark:block bg-slate-800 rounded-lg"></div>

                <CardContent className="p-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${topic.color} flex items-center justify-center`}>
                        <topic.icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-base font-semibold text-purple-900 dark:text-white">{topic.title}</h4>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''} text-purple-700 dark:text-white`}
                    />
                  </div>
                </CardContent>
              </Card>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="relative overflow-hidden mt-2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:hidden rounded-lg"></div>
                <div className="absolute inset-0 hidden dark:block bg-slate-800 rounded-lg"></div>

                <CardContent className="p-4 relative z-10">
                  <div className="space-y-3">
                    <h5 className="font-semibold text-lg text-purple-900 dark:text-white">{topic.content.title}</h5>
                    <p className="leading-relaxed text-sm text-purple-800 dark:text-gray-300">{topic.content.article}</p>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </>

    <div>
      <h3 className="text-lg font-semibold mb-4 text-center text-purple-900 dark:text-white">{getLocalizedText('popular.questions')}</h3>
      <div className="space-y-3">
        {visibleQuestions.map((qa, index) => (
          <Collapsible key={index}>
            <CollapsibleTrigger asChild>
              <Card className="relative overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-150 to-purple-200 dark:hidden rounded-lg"></div>
                <div className="absolute inset-0 hidden dark:block bg-slate-800 rounded-lg"></div>

                <CardContent className="p-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-left text-purple-900 dark:text-white">{qa.question}</h4>
                    <ChevronDown className="w-4 h-4 shrink-0 ml-2 text-purple-600 dark:text-white" />
                  </div>
                </CardContent>
              </Card>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="relative overflow-hidden mt-2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:hidden rounded-lg"></div>
                <div className="absolute inset-0 hidden dark:block bg-slate-800 rounded-lg"></div>

                <CardContent className="p-4 relative z-10">
                  <p className="text-sm leading-relaxed text-purple-800 dark:text-gray-300">{qa.answer}</p>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        ))}

        {popularQuestions.length > 3 && (
          <div className="text-center mt-4">
            <Button
              onClick={() => setShowAllQuestions(!showAllQuestions)}
              variant="outline"
              className={`border ${settings.darkMode
                ? 'border-slate-600 text-white hover:bg-slate-700'
                : 'border-purple-400 text-purple-700 hover:bg-purple-200 hover:border-purple-500'
              }`}
            >
              {showAllQuestions ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Show More ({popularQuestions.length - 3} more)
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  </CardContent>
</Card>

    </>
 
  );
};

export default PrePeriodPreparation;
