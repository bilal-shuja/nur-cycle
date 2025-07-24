
import React, { useState } from 'react';
import { Coffee, Brain, Droplets, Activity, Thermometer, Utensils, Moon, Zap, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CrampTriggers = () => {
  const [selectedTrigger, setSelectedTrigger] = useState<number | null>(null);
  const [showIslamicView, setShowIslamicView] = useState(false);

  const triggers = [
    {
      id: 1,
      title: "Caffeine: Your favorite drink might make cramps worse",
      description: "Coffee and black tea can tighten blood vessels — leading to more pain.",
      icon: Coffee,
      color: "from-amber-500 to-amber-600",
      illustration: "☕",
      content: {
        main: "Caffeine can constrict blood vessels and increase muscle tension, potentially making cramps more intense. It can also increase stress hormones like cortisol, which may worsen period pain.",
        islamic: "The Prophet ﷺ encouraged moderation in all things. If caffeine worsens your pain, consider herbal teas like chamomile or peppermint, which can actually help soothe cramps."
      }
    },
    {
      id: 2,
      title: "Stress and anxiety: Your uterus feels it too",
      description: "High cortisol can increase inflammation and pain perception during your period.",
      icon: Brain,
      color: "from-purple-500 to-purple-600",
      illustration: "😰",
      content: {
        main: "Chronic stress elevates cortisol levels, which can increase inflammation and make you more sensitive to pain. Stress also affects hormone balance, potentially making periods more painful.",
        islamic: "When feeling stressed, remember Allah's promise: 'And whoever relies upon Allah - then He is sufficient for him' (Quran 65:3). Practice dhikr, make dua, and trust that this pain is temporary."
      }
    },
    {
      id: 3,
      title: "Too much sugar or dairy",
      description: "Spikes in insulin can lead to more prostaglandin (pain-causing chemical) release.",
      icon: Utensils,
      color: "from-pink-500 to-pink-600",
      illustration: "🍰",
      content: {
        main: "High sugar and dairy intake can trigger inflammation and increase prostaglandin production - the chemicals responsible for cramps. They can also cause bloating and digestive discomfort.",
        islamic: "The Prophet ﷺ said: 'The son of Adam fills no worse vessel than his stomach.' Eat mindfully and choose foods that nourish rather than inflame your body during menstruation."
      }
    },
    {
      id: 4,
      title: "Lack of movement",
      description: "Staying curled in bed might seem like the answer — but gentle walking or stretching actually helps.",
      icon: Activity,
      color: "from-green-500 to-green-600",
      illustration: "🛌",
      content: {
        main: "While rest is important, complete inactivity can make cramps worse by reducing blood flow and increasing muscle tension. Gentle movement helps release endorphins and improves circulation.",
        islamic: "Balance is key in Islam. While you need rest during menstruation, gentle movement is beneficial. Light walking or stretching can be a form of caring for the body Allah has entrusted to you."
      }
    },
    {
      id: 5,
      title: "Dehydration",
      description: "Not drinking enough water can lead to bloating and more intense cramps.",
      icon: Droplets,
      color: "from-blue-500 to-blue-600",
      illustration: "💧",
      content: {
        main: "Dehydration can worsen bloating, reduce blood flow, and make muscles more likely to cramp. Proper hydration helps your body function optimally during menstruation.",
        islamic: "Water is a blessing from Allah. The Prophet ﷺ recommended drinking water in three breaths. Stay hydrated to help your body cope with menstrual changes."
      }
    },
    {
      id: 6,
      title: "Skipping meals",
      description: "Blood sugar drops make the body tense up, worsening cramp sensitivity.",
      icon: AlertTriangle,
      color: "from-red-500 to-red-600",
      illustration: "🍽️",
      content: {
        main: "Low blood sugar from skipping meals can increase stress hormones and make you more sensitive to pain. Regular, balanced meals help maintain stable energy and hormone levels.",
        islamic: "Nourish your body with halal, wholesome foods. The Prophet ﷺ emphasized eating regular meals. Don't neglect your body's needs, especially during menstruation."
      }
    },
    {
      id: 7,
      title: "Not getting enough sleep",
      description: "Fatigue can throw hormones off balance, making cramps and PMS worse.",
      icon: Moon,
      color: "from-indigo-500 to-indigo-600",
      illustration: "😴",
      content: {
        main: "Poor sleep disrupts hormone production and increases stress, making you more sensitive to pain. Quality sleep is crucial for managing menstrual symptoms effectively.",
        islamic: "Allah has made the night for rest. Prioritize good sleep habits as caring for your body is an act of worship. Rest when your body needs it during menstruation."
      }
    },
    {
      id: 8,
      title: "Cold environments",
      description: "For some, cold can tighten muscles and increase discomfort — heat therapy may help.",
      icon: Thermometer,
      color: "from-teal-500 to-teal-600",
      illustration: "🥶",
      content: {
        main: "Cold temperatures can cause muscles to contract and blood vessels to constrict, potentially worsening cramps. Warmth helps relax muscles and improve blood flow.",
        islamic: "Seek comfort in what Allah has provided. Use heat therapy, warm baths, or warm compresses to ease your pain. There's no shame in seeking relief from discomfort."
      }
    },
    {
      id: 9,
      title: "Underlying conditions like PCOS or Endometriosis",
      description: "These conditions are linked to more severe or persistent cramping.",
      icon: Zap,
      color: "from-orange-500 to-orange-600",
      illustration: "⚡",
      content: {
        main: "Conditions like PCOS, endometriosis, or fibroids can cause more severe cramping due to hormonal imbalances, inflammation, or structural changes in reproductive organs.",
        islamic: "If you have a chronic condition, remember that Allah tests those He loves. Seek medical treatment while making dua for healing. Your condition doesn't define your worth."
      }
    },
    {
      id: 10,
      title: "Not tracking your cycle",
      description: "If you don't know when to expect your period, the pain often feels more intense and stressful.",
      icon: AlertTriangle,
      color: "from-gray-500 to-gray-600",
      illustration: "📅",
      content: {
        main: "Being unprepared for your period can increase stress and make symptoms feel worse. Tracking helps you anticipate and prepare for menstrual changes.",
        islamic: "Knowledge is encouraged in Islam. Understanding your body's patterns helps you care for yourself better and reduces anxiety about unexpected changes."
      }
    }
  ];

  if (selectedTrigger !== null) {
    const trigger = triggers.find(t => t.id === selectedTrigger);
    if (!trigger) return null;

    return (
      <div>
        <Button 
          variant="outline" 
          onClick={() => setSelectedTrigger(null)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cramp Triggers
        </Button>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader className={`bg-gradient-to-r ${trigger.color} text-white`}>
            <div className="flex items-center space-x-3">
              <trigger.icon className="w-8 h-8" />
              <span className="text-3xl">{trigger.illustration}</span>
            </div>
            <CardTitle className="text-2xl mt-4">{trigger.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Understanding This Trigger</h3>
              <p className="text-gray-700 leading-relaxed">{trigger.content.main}</p>
            </div>
            
            {trigger.content.islamic && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Moon className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-purple-800">Islamic Guidance</h3>
                </div>
                <p className="text-purple-700 leading-relaxed">{trigger.content.islamic}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">💥 What Makes Period Cramps Worse</h1>
        <p className="text-gray-600">Understanding triggers to help you manage pain better</p>
      </div>

      <div className="flex justify-center">
        <Button
          variant={showIslamicView ? "default" : "outline"}
          onClick={() => setShowIslamicView(!showIslamicView)}
          className="flex items-center space-x-2"
        >
          <Moon className="w-4 h-4" />
          <span>{showIslamicView ? "Hide" : "Show"} Islamic Guidance</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {triggers.map((trigger) => (
          <Card 
            key={trigger.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
            onClick={() => setSelectedTrigger(trigger.id)}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${trigger.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  <trigger.icon className="w-6 h-6" />
                </div>
                <span className="text-2xl">{trigger.illustration}</span>
              </div>
              
              <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                {trigger.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {trigger.description}
              </p>
              
              {showIslamicView && trigger.content.islamic && (
                <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-1 mb-1">
                    <Moon className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-medium text-purple-800">Islamic Note</span>
                  </div>
                  <p className="text-xs text-purple-700 line-clamp-2">
                    {trigger.content.islamic}
                  </p>
                </div>
              )}
              
              <Button 
                size="sm" 
                className={`w-full mt-3 bg-gradient-to-r ${trigger.color} hover:opacity-90`}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CrampTriggers;
