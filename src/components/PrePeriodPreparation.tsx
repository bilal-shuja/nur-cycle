
import React, { useState , useEffect} from 'react';
import { BookOpen, Heart, Droplets, Calendar, AlertCircle, Thermometer, Users, Apple, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const PrePeriodPreparation = () => {
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

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

  const preparationTopics = [
    {
      id: 'hydration',
      title: 'Hydration',
      icon: Droplets,
      color: 'from-blue-400 to-blue-600',
      content: {
        title: 'Importance of Hydration',
        article: `Staying well-hydrated is crucial during your pre-period phase. Water helps in reducing bloating, easing muscle cramps, and maintaining overall energy levels. Aim to drink at least 8 glasses of water daily, and include hydrating foods like cucumbers and watermelons in your diet. Herbal teas can also contribute to your fluid intake while providing soothing effects.`
      }
    },
    {
      id: 'nutrition',
      title: 'Nutrition',
      icon: Heart,
      color: 'from-red-400 to-red-600',
      content: {
        title: 'Nutritional Tips',
        article: `Focus on consuming a balanced diet rich in iron, calcium, and fiber. Iron-rich foods like spinach and lentils can help combat fatigue. Calcium from dairy or plant-based sources aids in reducing muscle cramps. Fiber-rich foods such as whole grains and vegetables promote digestive health and prevent constipation. Limit processed foods, caffeine, and alcohol to minimize mood swings and bloating.`
      }
    },
    {
      id: 'tracking',
      title: 'Cycle Tracking',
      icon: Calendar,
      color: 'from-green-400 to-green-600',
      content: {
        title: 'Effective Cycle Tracking',
        article: `Tracking your menstrual cycle helps you anticipate your period and understand your body's patterns. Use a period tracking app or a physical calendar to note the start and end dates of your period, flow intensity, and any symptoms you experience. Consistent tracking over several months can reveal irregularities and provide insights into your hormonal health.`
      }
    },
    {
      id: 'symptoms',
      title: 'Symptom Management',
      icon: AlertCircle,
      color: 'from-yellow-400 to-yellow-600',
      content: {
        title: 'Managing Common Symptoms',
        article: `Common pre-period symptoms include mood swings, bloating, headaches, and fatigue. Manage these symptoms by engaging in regular exercise, practicing relaxation techniques such as yoga or meditation, and ensuring you get enough sleep. Over-the-counter pain relievers can help with headaches and cramps. If symptoms are severe, consult a healthcare provider.`
      }
    },
    {
      id: 'temperature',
      title: 'Basal Body Temperature',
      icon: Thermometer,
      color: 'from-purple-400 to-purple-600',
      content: {
        title: 'Understanding Basal Body Temperature',
        article: `Tracking your basal body temperature (BBT) can provide valuable information about your ovulation cycle. Measure your temperature every morning before getting out of bed and record it. A slight increase in temperature usually indicates ovulation. This method can help you predict your period and identify potential fertility issues.`
      }
    },
    {
      id: 'community',
      title: 'Community Support',
      icon: Users,
      color: 'from-pink-400 to-pink-600',
      content: {
        title: 'Finding Community Support',
        article: `Connecting with others who experience similar pre-period symptoms can provide emotional support and practical advice. Join online forums, support groups, or talk to friends and family members about your experiences. Sharing and learning from others can help you feel less alone and more empowered to manage your symptoms.`
      }
    },
    {
      id: 'appleCider',
      title: 'Apple Cider Vinegar',
      icon: Apple,
      color: 'from-orange-400 to-orange-600',
      content: {
        title: 'Benefits of Apple Cider Vinegar',
        article: `Apple cider vinegar (ACV) is believed to help balance the body's pH levels and reduce bloating. Mix one to two tablespoons of ACV in a glass of water and drink it before meals. ACV may also help in controlling blood sugar levels and reducing cravings. However, it should be consumed in moderation and diluted to prevent irritation of the esophagus.`
      }
    },
  ];

  const popularQuestions = [
    {
      question: "How many days before my period should I start preparing?",
      answer: "It's recommended to start preparing 3-5 days before your expected period. This includes stocking up on supplies, preparing comfort items, and mentally preparing for any symptoms you typically experience."
    },
    {
      question: "What essential supplies should I always have ready?",
      answer: "Keep a period kit with pads/tampons, pain relievers, heating pad, comfortable clothes, favorite snacks, and any medications you typically need. Having these ready reduces stress when your period starts."
    },
    {
      question: "How can I track my cycle to better predict my period?",
      answer: "Use a period tracking app or calendar to log your cycle length, symptoms, and flow intensity. After 3-6 months, you'll start to see patterns that help you predict when your period will arrive."
    },
    {
      question: "What foods should I eat before my period to reduce symptoms?",
      answer: "Focus on iron-rich foods (leafy greens, lean meats), calcium sources (dairy, fortified foods), and complex carbohydrates. Reduce caffeine, salt, and sugar to minimize bloating and mood swings."
    },
    {
      question: "Is it normal to feel emotional before my period?",
      answer: "Yes, PMS (premenstrual syndrome) commonly includes mood changes due to hormonal fluctuations. Practice self-care, get enough sleep, exercise lightly, and don't hesitate to reach out for support if emotions feel overwhelming."
    },
    {
      question: "How can I manage period pain naturally?",
      answer: "Try heat therapy (heating pads, warm baths), gentle exercise, staying hydrated, and eating anti-inflammatory foods. Herbal teas like chamomile or ginger can also provide relief."
    },
    {
      question: "What should I do if my period is irregular?",
      answer: "Track your cycles for several months to identify patterns. If your periods are consistently irregular, very painful, or you miss periods frequently, consult with a healthcare provider to rule out underlying conditions."
    },
    {
      question: "How do I choose the right menstrual products?",
      answer: "Consider your lifestyle, flow intensity, and comfort preferences. Pads are good for beginners, tampons offer more freedom for activities, and menstrual cups are eco-friendly long-term options. You might need different products for different days of your cycle."
    }
  ];

  const visibleQuestions = showAllQuestions ? popularQuestions : popularQuestions.slice(0, 3);

  return (
    <>
    
         {/* <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300">
      <CardHeader className="text-center">
        <CardTitle className="text-purple-900 flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6" />
          Have a Read Before You Bleed
        </CardTitle>
        <CardDescription className="text-purple-700">
          Essential knowledge and preparation tips for a more comfortable period experience
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <>
          <h3 className="text-lg font-semibold text-purple-900 mb-4 text-center">Preparation Topics</h3>
          <div className="space-y-3">
            {preparationTopics.map((topic) => (
              <Collapsible key={topic.id}>
                <CollapsibleTrigger asChild>
                  <Card 
                    className="cursor-pointer hover:shadow-md transition-all duration-300 bg-gradient-to-br from-purple-200 to-purple-300 border-purple-400 hover:from-purple-250 hover:to-purple-350"
                    onClick={() => toggleTopic(topic.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${topic.color} flex items-center justify-center`}>
                            <topic.icon className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="text-base font-semibold text-purple-900">{topic.title}</h4>
                        </div>
                        <ChevronDown 
                          className={`w-5 h-5 text-purple-700 transition-transform duration-200 ${
                            expandedTopics.includes(topic.id) ? 'rotate-180' : ''
                          }`} 
                        />
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <h5 className="font-semibold text-purple-900 text-lg">{topic.content.title}</h5>
                        <p className="text-purple-800 leading-relaxed text-sm">{topic.content.article}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </>

        <div>
          <h3 className="text-lg font-semibold text-purple-900 mb-4 text-center">Popular Questions</h3>
          <div className="space-y-3">
            {visibleQuestions.map((qa, index) => (
              <Collapsible key={index}>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-all duration-300 bg-gradient-to-br from-purple-150 to-purple-200 border-purple-300 hover:from-purple-200 hover:to-purple-250">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-purple-900 text-left">{qa.question}</h4>
                        <ChevronDown className="w-4 h-4 text-purple-600 shrink-0 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardContent className="p-4">
                      <p className="text-sm text-purple-800 leading-relaxed">{qa.answer}</p>
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
                  className="border-purple-400 text-purple-700 hover:bg-purple-200 hover:border-purple-500"
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
    </Card> */}

          <Card className="relative overflow-hidden text-black dark:text-white p-4 shadow-lg">
  <div className="absolute inset-0b g-gradient-to-br from-purple-100 to-pink-100 border-purple-300 "></div>
  <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

  <CardHeader className="text-center relative z-10">
    <CardTitle className="flex items-center justify-center gap-2 text-purple-900 dark:text-white">
      <BookOpen className="w-6 h-6" />
      Have a Read Before You Bleed
    </CardTitle>
    <CardDescription className="text-purple-700 dark:text-gray-300">
      Essential knowledge and preparation tips for a more comfortable period experience
    </CardDescription>
  </CardHeader>

  <CardContent className="space-y-6 relative z-10">
    <>
      <h3 className="text-lg font-semibold mb-4 text-center text-purple-900 dark:text-white">Preparation Topics</h3>
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
      <h3 className="text-lg font-semibold mb-4 text-center text-purple-900 dark:text-white">Popular Questions</h3>
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
