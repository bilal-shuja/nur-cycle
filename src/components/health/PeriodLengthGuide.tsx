
import React, { useState } from 'react';
import { Calendar, Clock, TrendingUp, TrendingDown, Stethoscope, Pill, Scale, Moon, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PeriodLengthGuide = () => {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showIslamicView, setShowIslamicView] = useState(false);

  const topics = [
    {
      id: 1,
      title: "What's considered a 'normal' period length?",
      description: "Most cycles last between 3–7 days — but slight changes are totally normal.",
      icon: Calendar,
      color: "from-green-500 to-green-600",
      illustration: "📅",
      content: {
        main: "A normal period typically lasts 3-7 days, with an average of 5 days. The flow is usually heaviest in the first 2-3 days, then gradually decreases. Individual patterns can vary significantly and still be completely normal.",
        islamic: "Understanding your cycle is part of knowing your body, which Allah has entrusted to you. Track your patterns to better understand what's normal for you."
      }
    },
    {
      id: 2,
      title: "Shorter periods: When it's okay, and when to pay attention",
      description: "Light bleeding for 1–2 days may be caused by stress, birth control, or a light flow month.",
      icon: TrendingDown,
      color: "from-blue-500 to-blue-600",
      illustration: "⬇️",
      content: {
        main: "Periods shorter than 3 days can be normal, especially if you typically have light flows. However, sudden changes to very short periods may indicate hormonal changes, stress, or underlying conditions that need attention.",
        islamic: "Even light bleeding for 1-2 days can be considered menstruation (hayd) if it occurs during your usual time. Trust your body's patterns and seek knowledge when things change."
      }
    },
    {
      id: 3,
      title: "Longer periods: What could be behind 8+ days of bleeding?",
      description: "Could be hormonal imbalance, fibroids, or simply part of a heavier cycle — here's when to get checked.",
      icon: TrendingUp,
      color: "from-red-500 to-red-600",
      illustration: "⬆️",
      content: {
        main: "Periods lasting longer than 7 days may indicate hormonal imbalances, fibroids, polyps, or other conditions. While some women naturally have longer periods, sudden changes warrant medical evaluation.",
        islamic: "In Islamic jurisprudence, menstruation typically doesn't exceed 10 days. If bleeding continues beyond this, it may be istihada (non-menstrual bleeding), and you should consult both medical and religious guidance."
      }
    },
    {
      id: 4,
      title: "Birth control and bleeding patterns",
      description: "Pills, IUDs, or injections can change your period — some shorten it, some delay it.",
      icon: Pill,
      color: "from-purple-500 to-purple-600",
      illustration: "💊",
      content: {
        main: "Hormonal contraceptives can significantly change period length. Birth control pills often make periods shorter and lighter, while IUDs might cause irregular bleeding initially before periods become lighter or stop entirely.",
        islamic: "Changes in bleeding due to contraception are medically induced, not natural menstruation. Follow medical guidance about what constitutes menstruation for religious purposes while using birth control."
      }
    },
    {
      id: 5,
      title: "Stress, diet, and overexertion",
      description: "These lifestyle factors can subtly affect your hormonal balance and flow duration.",
      icon: Scale,
      color: "from-orange-500 to-orange-600",
      illustration: "⚖️",
      content: {
        main: "High stress, extreme dieting, or excessive exercise can alter hormone production, leading to changes in period length. These factors can make periods shorter, longer, or cause them to stop entirely.",
        islamic: "Maintain balance in all aspects of life, as Islam teaches moderation. Take care of your physical and mental health, as they affect your overall wellbeing and menstrual health."
      }
    },
    {
      id: 6,
      title: "PCOS, endometriosis, and period length",
      description: "These conditions can lead to long, irregular, or spotty cycles.",
      icon: Stethoscope,
      color: "from-teal-500 to-teal-600",
      illustration: "🩺",
      content: {
        main: "PCOS often causes irregular, infrequent periods that may be longer when they occur. Endometriosis can cause longer, more painful periods. Both conditions affect hormone balance and reproductive health.",
        islamic: "Chronic conditions are tests from Allah. Seek medical treatment while making dua for healing. These conditions don't diminish your worth or spiritual standing."
      }
    },
    {
      id: 7,
      title: "Perimenopause or hormone shifts",
      description: "In your 30s or 40s? Changing estrogen levels can make periods longer or shorter.",
      icon: Clock,
      color: "from-indigo-500 to-indigo-600",
      illustration: "🕐",
      content: {
        main: "During perimenopause, estrogen levels fluctuate unpredictably, causing periods to become irregular in timing and length. Some months may be longer, others shorter, as your body transitions toward menopause.",
        islamic: "This natural transition is part of Allah's design for women's bodies. Embrace this phase with patience and gratitude for the years of fertility you may have experienced."
      }
    },
    {
      id: 8,
      title: "Heavy bleeding one month, light the next?",
      description: "Your body may be adjusting to stress, illness, travel, or medication — it's common.",
      icon: TrendingUp,
      color: "from-pink-500 to-pink-600",
      illustration: "🔄",
      content: {
        main: "Cycle-to-cycle variation in flow and length is completely normal. Factors like stress, illness, travel, sleep changes, or new medications can cause temporary fluctuations in your menstrual pattern.",
        islamic: "Your body responds to life's changes, which is Allah's design. Don't worry about monthly variations unless they become consistently problematic or concerning."
      }
    },
    {
      id: 9,
      title: "Islamic advice: Bleeding longer than 10 days?",
      description: "If bleeding continues past 10 days, it may be considered istihada (non-menstrual bleeding). Here's what to know about purity, prayer, and fasting.",
      icon: Moon,
      color: "from-purple-500 to-pink-600",
      illustration: "🌙",
      content: {
        main: "",
        islamic: "According to Islamic jurisprudence, menstruation (hayd) typically doesn't exceed 10 days. If bleeding continues beyond this, it's considered istihada. During istihada, you should perform wudu for each prayer and resume normal worship. Consult a knowledgeable scholar for specific guidance based on your situation."
      }
    },
    {
      id: 10,
      title: "When to talk to a doctor",
      description: "If periods are extremely short (under 2 days), long (10+), or cause exhaustion or pain — get medical guidance.",
      icon: AlertTriangle,
      color: "from-red-500 to-orange-600",
      illustration: "🚨",
      content: {
        main: "Seek medical attention if you experience: periods consistently longer than 7 days, bleeding between periods, periods that suddenly become much shorter or longer, severe pain, or bleeding so heavy it interferes with daily activities.",
        islamic: "Seeking medical help is not only permissible but encouraged in Islam. The Prophet ﷺ said: 'Allah has not created a disease without creating a cure for it.' Take care of your health as it's an amanah from Allah."
      }
    }
  ];

  if (selectedTopic !== null) {
    const topic = topics.find(t => t.id === selectedTopic);
    if (!topic) return null;

    return (
      <div>
        <Button 
          variant="outline" 
          onClick={() => setSelectedTopic(null)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Period Length Guide
        </Button>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader className={`bg-gradient-to-r ${topic.color} text-white`}>
            <div className="flex items-center space-x-3">
              <topic.icon className="w-8 h-8" />
              <span className="text-3xl">{topic.illustration}</span>
            </div>
            <CardTitle className="text-2xl mt-4">{topic.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {topic.content.main && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Understanding Period Length</h3>
                <p className="text-gray-700 leading-relaxed">{topic.content.main}</p>
              </div>
            )}
            
            {topic.content.islamic && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Moon className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-purple-800">Islamic Guidance</h3>
                </div>
                <p className="text-purple-700 leading-relaxed">{topic.content.islamic}</p>
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📅 Why Your Period Might Be Shorter or Longer Than Usual</h1>
        <p className="text-gray-600">Understanding changes in menstrual cycle length</p>
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
        {topics.map((topic) => (
          <Card 
            key={topic.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
            onClick={() => setSelectedTopic(topic.id)}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${topic.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  <topic.icon className="w-6 h-6" />
                </div>
                <span className="text-2xl">{topic.illustration}</span>
              </div>
              
              <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                {topic.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {topic.description}
              </p>
              
              {showIslamicView && topic.content.islamic && (
                <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-1 mb-1">
                    <Moon className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-medium text-purple-800">Islamic Note</span>
                  </div>
                  <p className="text-xs text-purple-700 line-clamp-2">
                    {topic.content.islamic}
                  </p>
                </div>
              )}
              
              <Button 
                size="sm" 
                className={`w-full mt-3 bg-gradient-to-r ${topic.color} hover:opacity-90`}
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

export default PeriodLengthGuide;
