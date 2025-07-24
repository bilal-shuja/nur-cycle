
import React, { useState } from 'react';
import { Heart, Users, Book, Moon, Sparkles, Stethoscope, Apple, Activity, MessageCircle, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PCOSSupport = () => {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showIslamicView, setShowIslamicView] = useState(false);

  const topics = [
    {
      id: 1,
      title: "What is PCOS, really?",
      description: "Understand what's happening inside your body — and why you're not alone.",
      icon: Book,
      color: "from-teal-500 to-teal-600",
      illustration: "🌀",
      content: {
        main: "PCOS (Polycystic Ovary Syndrome) affects 1 in 10 women. It's a hormonal condition that causes irregular periods, cysts on ovaries, and elevated androgen levels. You're not broken - your body just works differently.",
        islamic: "Allah tests those He loves. Remember that your condition doesn't define your worth. Make dua: 'Rabbana atina fi'd-dunya hasanatan wa fi'l-akhirati hasanatan wa qina 'adhab an-nar' for healing and strength."
      }
    },
    {
      id: 2,
      title: "Common symptoms of PCOS you might not notice",
      description: "From acne to anxiety, here are the hidden ways PCOS can show up.",
      icon: Stethoscope,
      color: "from-purple-500 to-purple-600",
      illustration: "🔍",
      content: {
        main: "PCOS symptoms include irregular periods, weight gain, acne, hair thinning, mood swings, fatigue, and insulin resistance. Many women don't realize anxiety and depression can also be linked to PCOS.",
        islamic: "Your struggles are seen by Allah. When feeling overwhelmed, remember 'La hawla wa la quwwata illa billah' (There is no power except with Allah). Seek both medical help and spiritual strength."
      }
    },
    {
      id: 3,
      title: "Can PCOS affect my period and fertility?",
      description: "Irregular cycles and ovulation explained — and what can help.",
      icon: Heart,
      color: "from-pink-500 to-pink-600",
      illustration: "🤰",
      content: {
        main: "PCOS can cause irregular or missed periods due to lack of ovulation. This affects fertility but doesn't mean you can't get pregnant. With proper treatment and lifestyle changes, many women with PCOS conceive successfully.",
        islamic: "Children are a blessing from Allah. If you desire pregnancy, make dua: 'Rabbi hab li min ladunka dhurriyyatan tayyibatan innaka sami'u'd-du'a' (My Lord, grant me good offspring from You; You are the Hearer of prayer)."
      }
    },
    {
      id: 4,
      title: "How PCOS affects hormones, weight & mood",
      description: "Why you're not 'lazy' or 'moody' — it's a real, hormonal struggle.",
      icon: Activity,
      color: "from-orange-500 to-orange-600",
      illustration: "⚖️",
      content: {
        main: "PCOS causes insulin resistance, making weight loss difficult. High androgen levels affect mood, causing anxiety and depression. This isn't your fault - it's biochemical, not behavioral.",
        islamic: "Allah doesn't burden a soul beyond what it can bear (Quran 2:286). Your weight and mood struggles are real. Seek treatment with both medicine and dua, trusting in Allah's plan for your healing."
      }
    },
    {
      id: 5,
      title: "Best ways to manage PCOS naturally",
      description: "Eat well, move with joy, and build healing habits that work for your body.",
      icon: Apple,
      color: "from-green-500 to-green-600",
      illustration: "🌱",
      content: {
        main: "Natural PCOS management includes eating low-glycemic foods, regular exercise, stress reduction, adequate sleep, and supplements like inositol. Small, consistent changes make a big difference.",
        islamic: "The body is an amanah (trust) from Allah. Nourish it with halal, wholesome foods mentioned in the Quran and Sunnah: dates, olive oil, honey, and green vegetables. Movement is also sunnah."
      }
    },
    {
      id: 6,
      title: "Can I still get pregnant with PCOS?",
      description: "Yes! With care, dua, and knowledge, fertility is still possible.",
      icon: Heart,
      color: "from-rose-500 to-rose-600",
      illustration: "💕",
      content: {
        main: "Many women with PCOS get pregnant with lifestyle changes, fertility treatments, or medications like metformin. Track ovulation, maintain healthy weight, and work with a reproductive endocrinologist.",
        islamic: "Allah is the giver of children. Make tawakkul (trust) in Him while taking medical steps. Recite Surah Maryam and make dua regularly. Remember, Maryam (AS) also had a unique reproductive experience blessed by Allah."
      }
    },
    {
      id: 7,
      title: "PCOS, confidence, and self-worth",
      description: "You are not your symptoms — how to stay confident and beautiful inside and out.",
      icon: Sparkles,
      color: "from-purple-500 to-pink-600",
      illustration: "✨",
      content: {
        main: "PCOS symptoms like acne, weight gain, or hair loss can affect self-esteem. Remember: you are more than your appearance. Focus on health, not perfection. Your worth isn't determined by your symptoms.",
        islamic: "Allah looks at your heart, not your appearance. You are beautiful in His sight. Recite 'Allahumma kama hassanta khalqi fa hassin khuluqi' (O Allah, as You have made my creation beautiful, make my character beautiful too)."
      }
    },
    {
      id: 8,
      title: "Sunnah foods & routines for hormone balance",
      description: "Dates, black seed, hijama, and other prophetic wellness tips.",
      icon: Moon,
      color: "from-amber-500 to-amber-600",
      illustration: "🌙",
      content: {
        main: "Traditional remedies can support PCOS management alongside modern medicine. Consider incorporating these into your routine with medical guidance.",
        islamic: "Sunnah foods for hormonal health: Black seed (habbat al-barakah), dates, honey, olive oil, and fenugreek. The Prophet ﷺ said: 'Black seed is a cure for every disease except death.' Consider hijama (cupping) as well."
      }
    },
    {
      id: 9,
      title: "Dua for healing and hormonal balance",
      description: "Spiritual steps that align with tawakkul (trust in Allah) and healing.",
      icon: Moon,
      color: "from-indigo-500 to-indigo-600",
      illustration: "🤲",
      content: {
        main: "",
        islamic: "Make this dua regularly: 'Allahumma rabban-nas, adhhibil-ba'sa, washfi anta'sh-shafi, la shifa'a illa shifa'uka shifa'an la yughadiru saqaman' (O Allah, Lord of people, remove the illness and heal, You are the Healer, there is no healing except Your healing, a healing that leaves no illness)."
      }
    },
    {
      id: 10,
      title: "What to ask your doctor (and what to ignore online)",
      description: "Questions to guide real conversations — and protect your peace.",
      icon: MessageCircle,
      color: "from-blue-500 to-blue-600",
      illustration: "👩‍⚕️",
      content: {
        main: "Ask your doctor about: hormone testing, treatment options, fertility planning, and mental health support. Avoid comparing yourself to social media stories or following unverified online advice.",
        islamic: "Seek knowledge and trust qualified medical professionals. The Prophet ﷺ said: 'Allah has not created a disease without creating a cure for it.' Balance seeking treatment with making dua and trusting Allah's wisdom."
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
          Back to PCOS Topics
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
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Understanding PCOS</h3>
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🌀 Living with PCOS: Confidence, Clarity & Control</h1>
        <p className="text-gray-600">Compassionate support and guidance for understanding PCOS</p>
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
              
              <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
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

export default PCOSSupport;
