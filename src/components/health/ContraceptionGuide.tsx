
import React, { useState } from 'react';
import { Shield, Pill, Heart, Users, Calendar, Stethoscope, Moon, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ContraceptionGuide = () => {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showIslamicView, setShowIslamicView] = useState(false);

  const topics = [
    {
      id: 1,
      title: "What is birth control and how does it work?",
      description: "Hormones, barriers, or timing — a breakdown of how each type prevents pregnancy.",
      icon: Shield,
      color: "from-blue-500 to-blue-600",
      illustration: "🛡️",
      content: {
        main: "Birth control works by preventing sperm from reaching the egg (barrier methods), stopping ovulation (hormonal methods), or preventing implantation. Different methods have varying effectiveness rates and side effects.",
        islamic: "Family planning within marriage is permitted in Islam. The Prophet ﷺ and his companions practiced 'azl (withdrawal). Use contraception with intention and consultation between spouses."
      }
    },
    {
      id: 2,
      title: "Pills, IUDs, shots, or condoms? Know your options",
      description: "Compare the most popular methods with their effectiveness and side effects.",
      icon: Pill,
      color: "from-purple-500 to-purple-600",
      illustration: "💊",
      content: {
        main: "Birth control pills (91-99% effective), IUDs (99%), condoms (85-98%), shots (94%), implants (99%), and diaphragms (88%) all have different benefits, side effects, and duration of use.",
        islamic: "Choose methods that align with your health needs and family planning goals. Scholars generally permit reversible contraception within marriage for spacing children or health reasons."
      }
    },
    {
      id: 3,
      title: "Can birth control affect your period?",
      description: "Yes — here's how some methods lighten, delay, or even stop your flow.",
      icon: Calendar,
      color: "from-pink-500 to-pink-600",
      illustration: "📅",
      content: {
        main: "Hormonal contraceptives can make periods lighter, irregular, or stop completely. This is medically safe for most women and doesn't affect future fertility once discontinued.",
        islamic: "Changes in menstrual flow due to contraception don't affect your Islamic obligations. If periods stop completely, you're not considered in a state of menstruation for prayer and fasting purposes."
      }
    },
    {
      id: 4,
      title: "Is contraception allowed in Islam?",
      description: "Yes — but with intention and within marriage. Here's the scholarly view.",
      icon: Moon,
      color: "from-indigo-500 to-indigo-600",
      illustration: "🌙",
      content: {
        main: "",
        islamic: "Most Islamic scholars permit contraception within marriage for: spacing children, protecting mother's health, economic considerations, or family planning. Permanent sterilization is generally discouraged unless medically necessary. The intention should be for family welfare, not rejection of Allah's blessings."
      }
    },
    {
      id: 5,
      title: "Can you still get pregnant on birth control?",
      description: "No method is 100% — here's how to reduce the risk of 'surprise.'",
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
      illustration: "⚠️",
      content: {
        main: "Even the most effective methods can fail. Perfect use vs. typical use rates differ significantly. Consistency, timing, and proper use are crucial for maximum effectiveness.",
        islamic: "Remember that ultimately, children come by Allah's will. Use contraception responsibly but trust in Allah's decree. If pregnancy occurs despite precautions, welcome it as Allah's blessing."
      }
    },
    {
      id: 6,
      title: "Side effects of hormonal contraception",
      description: "Mood changes, spotting, weight shifts — what's normal and when to see a doctor.",
      icon: Stethoscope,
      color: "from-orange-500 to-orange-600",
      illustration: "🩺",
      content: {
        main: "Common side effects include irregular bleeding, mood changes, weight fluctuation, headaches, and breast tenderness. Most side effects improve within 3-6 months of starting a method.",
        islamic: "Monitor your health while using contraception. If side effects significantly impact your wellbeing or ability to worship, consult your doctor about alternatives. Your health is an amanah from Allah."
      }
    },
    {
      id: 7,
      title: "Fertility after birth control",
      description: "How quickly (or slowly) your cycle can return once you stop.",
      icon: Heart,
      color: "from-green-500 to-green-600",
      illustration: "💕",
      content: {
        main: "Most women's fertility returns quickly after stopping contraception. Condoms and diaphragms don't affect fertility at all. Hormonal methods may take 1-3 months for cycles to normalize.",
        islamic: "Trust Allah's timing for conception. When you're ready to have children, stop contraception and make dua: 'Rabbi hab li min ladunka dhurriyyatan tayyibatan' (My Lord, grant me good offspring from You)."
      }
    },
    {
      id: 8,
      title: "Natural family planning (faith-friendly methods)",
      description: "Learn how to track ovulation and avoid pregnancy without hormones.",
      icon: Calendar,
      color: "from-teal-500 to-teal-600",
      illustration: "🌱",
      content: {
        main: "Natural methods include tracking basal body temperature, cervical mucus changes, and calendar methods. These require dedication and learning but have no side effects when used correctly.",
        islamic: "Natural family planning aligns with Islamic values of understanding your body as Allah created it. This method requires both spouses' commitment and understanding of fertility signs."
      }
    },
    {
      id: 9,
      title: "Birth control and your mental health",
      description: "Some women feel great — others feel moody. Here's why.",
      icon: Heart,
      color: "from-purple-500 to-pink-600",
      illustration: "🧠",
      content: {
        main: "Hormonal contraceptives can affect mood, anxiety, and depression. Some women experience improved mental health, while others may feel worse. Individual responses vary significantly.",
        islamic: "Mental health is part of overall health in Islam. If contraception negatively affects your emotional wellbeing, seek alternatives. Your mental state affects your relationship with Allah and others."
      }
    },
    {
      id: 10,
      title: "Which method is best for YOU?",
      description: "Lifestyle, health, goals, and faith all matter in this decision.",
      icon: Users,
      color: "from-amber-500 to-amber-600",
      illustration: "🤔",
      content: {
        main: "Consider your lifestyle, health conditions, relationship status, future pregnancy plans, and personal preferences. Discuss options with your healthcare provider and partner.",
        islamic: "Make this decision through consultation (shura) with your spouse, healthcare provider, and trusted Islamic scholars if needed. Choose what brings ease and aligns with your values and circumstances."
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
          Back to Contraception Guide
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
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Medical Information</h3>
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🔒 Contraception: What You Need to Know About Birth Control</h1>
        <p className="text-gray-600">Comprehensive guidance on family planning options</p>
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
              
              <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
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

export default ContraceptionGuide;
