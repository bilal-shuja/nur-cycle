
import React, { useState } from 'react';
import { Clock, Brain, Scale, Stethoscope, Dumbbell, Utensils, Pill, Moon, Baby, Plane, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LatePeriodsGuide = () => {
  const [selectedReason, setSelectedReason] = useState<number | null>(null);
  const [showIslamicView, setShowIslamicView] = useState(false);

  const reasons = [
    {
      id: 1,
      title: "Stress: Emotional chaos = Hormonal chaos",
      description: "Your brain controls your hormones — and stress can delay ovulation.",
      icon: Brain,
      color: "from-purple-500 to-purple-600",
      illustration: "😰",
      content: {
        main: "Chronic stress affects the hypothalamus, which controls hormone production. High cortisol levels can disrupt the normal cycle of hormones needed for ovulation, causing delayed or missed periods.",
        islamic: "Stress is a test from Allah. When overwhelmed, remember: 'And whoever relies upon Allah - then He is sufficient for him' (Quran 65:3). Practice dhikr and seek Allah's peace during difficult times."
      }
    },
    {
      id: 2,
      title: "Sudden weight loss or gain",
      description: "Big body changes (especially fast ones) can throw off your cycle.",
      icon: Scale,
      color: "from-green-500 to-green-600",
      illustration: "⚖️",
      content: {
        main: "Rapid weight changes affect estrogen production. Very low body fat can stop ovulation completely, while sudden weight gain can disrupt insulin and hormone balance, both affecting menstrual regularity.",
        islamic: "Your body is an amanah (trust) from Allah. Maintain it with wisdom and moderation. The Prophet ﷺ said: 'No human fills a container worse than his stomach.'"
      }
    },
    {
      id: 3,
      title: "Polycystic Ovary Syndrome (PCOS)",
      description: "If your periods are often irregular or missing, PCOS could be a hidden cause.",
      icon: Stethoscope,
      color: "from-teal-500 to-teal-600",
      illustration: "🔍",
      content: {
        main: "PCOS affects hormone levels, particularly insulin and androgens, making ovulation irregular or absent. This leads to missed periods, which can last for months in some cases.",
        islamic: "PCOS is a condition, not a punishment. Allah tests those He loves. Seek medical treatment while making dua: 'Rabbi ishfini fa anta ash-shafi' (My Lord, heal me, for You are the Healer)."
      }
    },
    {
      id: 4,
      title: "Thyroid issues",
      description: "Overactive or underactive thyroid hormones can pause menstruation.",
      icon: Stethoscope,
      color: "from-blue-500 to-blue-600",
      illustration: "🦋",
      content: {
        main: "Thyroid hormones directly affect reproductive hormones. Both hyperthyroidism and hypothyroidism can cause irregular periods, heavy bleeding, or complete absence of menstruation.",
        islamic: "Seek knowledge and treatment for thyroid conditions. The Prophet ﷺ said: 'Allah has not created a disease without creating a cure for it.' Trust in both Allah and medical care."
      }
    },
    {
      id: 5,
      title: "Excessive exercise",
      description: "Heavy workouts or training can suppress hormones like estrogen.",
      icon: Dumbbell,
      color: "from-orange-500 to-orange-600",
      illustration: "🏃‍♀️",
      content: {
        main: "Intense exercise can lower body fat percentage and increase stress hormones, both of which can suppress the reproductive system. This is common in athletes and can cause amenorrhea.",
        islamic: "Balance is key in Islam. While exercise is beneficial, moderation is encouraged. Listen to your body and adjust your routine if it affects your menstrual health."
      }
    },
    {
      id: 6,
      title: "Diet changes or under-eating",
      description: "If your body thinks you're in famine mode, it might pause your period.",
      icon: Utensils,
      color: "from-red-500 to-red-600",
      illustration: "🍽️",
      content: {
        main: "Severe calorie restriction signals to your body that it's not a safe time to reproduce. The body conserves energy by shutting down non-essential functions, including menstruation.",
        islamic: "Allah has provided sustenance for His creation. Don't deprive your body of necessary nutrition. Eat wholesome foods mentioned in the Quran and Sunnah for optimal health."
      }
    },
    {
      id: 7,
      title: "New medications",
      description: "Some drugs — including antidepressants, antipsychotics, and birth control — can impact your cycle.",
      icon: Pill,
      color: "from-pink-500 to-pink-600",
      illustration: "💊",
      content: {
        main: "Many medications can affect hormone levels or the hypothalamic-pituitary-ovarian axis. Birth control, antidepressants, blood thinners, and steroids are common culprits for menstrual changes.",
        islamic: "When taking medication, make dua for healing and trust Allah's wisdom. Consult your doctor about any concerns regarding your menstrual cycle and medications."
      }
    },
    {
      id: 8,
      title: "Perimenopause (yes, even in your 30s!)",
      description: "Cycle irregularity is a natural part of hormonal transitions.",
      icon: Clock,
      color: "from-purple-500 to-pink-600",
      illustration: "🌸",
      content: {
        main: "Perimenopause can begin in the late 30s or early 40s. Estrogen levels fluctuate, causing irregular cycles, missed periods, or changes in flow before menopause begins.",
        islamic: "This is a natural transition Allah has designed for women. Embrace this phase with patience and gratitude for the years of fertility you may have experienced."
      }
    },
    {
      id: 9,
      title: "Breastfeeding or postpartum healing",
      description: "Nursing and recovery often delay the return of regular periods.",
      icon: Baby,
      color: "from-green-500 to-teal-600",
      illustration: "🤱",
      content: {
        main: "Prolactin, the hormone responsible for milk production, suppresses ovulation. This is nature's way of spacing pregnancies and allowing your body to recover from childbirth.",
        islamic: "Breastfeeding is encouraged in Islam for up to two years. This natural delay in menstruation is Allah's wisdom for mother and child's wellbeing."
      }
    },
    {
      id: 10,
      title: "Travel and jet lag",
      description: "Time zone shifts and sleep disruption can confuse your body's natural rhythm.",
      icon: Plane,
      color: "from-indigo-500 to-blue-600",
      illustration: "✈️",
      content: {
        main: "Disruption to your circadian rhythm affects the hypothalamus, which controls reproductive hormones. Travel stress and schedule changes can temporarily delay ovulation and menstruation.",
        islamic: "When traveling, make dua for safe journey and good health. Trust that temporary disruptions to your cycle are normal and usually resolve when you return to routine."
      }
    }
  ];

  if (selectedReason !== null) {
    const reason = reasons.find(r => r.id === selectedReason);
    if (!reason) return null;

    return (
      <div>
        <Button 
          variant="outline" 
          onClick={() => setSelectedReason(null)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Late Period Causes
        </Button>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader className={`bg-gradient-to-r ${reason.color} text-white`}>
            <div className="flex items-center space-x-3">
              <reason.icon className="w-8 h-8" />
              <span className="text-3xl">{reason.illustration}</span>
            </div>
            <CardTitle className="text-2xl mt-4">{reason.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Understanding This Cause</h3>
              <p className="text-gray-700 leading-relaxed">{reason.content.main}</p>
            </div>
            
            {reason.content.islamic && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Moon className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-purple-800">Islamic Guidance</h3>
                </div>
                <p className="text-purple-700 leading-relaxed">{reason.content.islamic}</p>
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">⏳ Why Is My Period Late (If I'm Not Pregnant)?</h1>
        <p className="text-gray-600">Understanding common causes of delayed menstruation</p>
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
        {reasons.map((reason) => (
          <Card 
            key={reason.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
            onClick={() => setSelectedReason(reason.id)}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${reason.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  <reason.icon className="w-6 h-6" />
                </div>
                <span className="text-2xl">{reason.illustration}</span>
              </div>
              
              <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {reason.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {reason.description}
              </p>
              
              {showIslamicView && reason.content.islamic && (
                <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-1 mb-1">
                    <Moon className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-medium text-purple-800">Islamic Note</span>
                  </div>
                  <p className="text-xs text-purple-700 line-clamp-2">
                    {reason.content.islamic}
                  </p>
                </div>
              )}
              
              <Button 
                size="sm" 
                className={`w-full mt-3 bg-gradient-to-r ${reason.color} hover:opacity-90`}
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

export default LatePeriodsGuide;
