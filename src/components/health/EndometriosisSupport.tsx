
import React, { useState } from 'react';
import { Heart, Stethoscope, Moon, Shield, Sparkles, MessageCircle, ArrowLeft, Activity, Brain, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EndometriosisSupport = () => {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showIslamicView, setShowIslamicView] = useState(false);

  const topics = [
    {
      id: 1,
      title: "What is Endometriosis?",
      description: "Learn how tissue growing outside the uterus causes pain and inflammation — and how to spot the signs early.",
      icon: Stethoscope,
      color: "from-purple-500 to-purple-600",
      illustration: "🌙",
      content: {
        main: "Endometriosis occurs when tissue similar to the lining of the uterus grows outside of it, causing inflammation, pain, and sometimes fertility issues. It affects about 10% of reproductive-aged women.",
        islamic: "Allah tests those He loves most. Your pain has meaning and reward. Make dua: 'Hasbunallahu wa ni'mal wakeel' (Allah is sufficient for us and He is the best disposer of affairs)."
      }
    },
    {
      id: 2,
      title: "Signs and symptoms of endo you shouldn't ignore",
      description: "Intense cramps, fatigue, pain during intimacy — don't gaslight your body.",
      icon: AlertTriangle,
      color: "from-red-500 to-red-600",
      illustration: "⚠️",
      content: {
        main: "Key symptoms include severe menstrual cramps, chronic pelvic pain, pain during intercourse, heavy bleeding, fatigue, and digestive issues. Trust your body - severe pain isn't normal.",
        islamic: "Don't dismiss your pain as 'just being a woman.' Allah gave you this body as an amanah (trust). Seeking help for pain is not weakness - it's taking care of what Allah entrusted to you."
      }
    },
    {
      id: 3,
      title: "How endometriosis affects periods and fertility",
      description: "Your cycle, ovulation, and pregnancy journey may be impacted — but there is still hope.",
      icon: Heart,
      color: "from-pink-500 to-pink-600",
      illustration: "💕",
      content: {
        main: "Endometriosis can cause heavy, irregular periods and may affect fertility by blocking fallopian tubes or affecting egg quality. However, many women with endometriosis do conceive naturally or with treatment.",
        islamic: "If pregnancy is your desire, remember that Allah is the giver of children. Make dua: 'Rabbi la tadhirni fardan wa anta khayrul-warithin' (My Lord, do not leave me alone, and You are the best of inheritors)."
      }
    },
    {
      id: 4,
      title: "Managing endo pain naturally and medically",
      description: "From heat therapy to hormonal treatment, here's what can help.",
      icon: Shield,
      color: "from-teal-500 to-teal-600",
      illustration: "🛡️",
      content: {
        main: "Treatment options include pain relievers, hormonal therapy, heat therapy, gentle exercise, anti-inflammatory diet, and sometimes surgery. A multimodal approach often works best.",
        islamic: "Use both medical treatment and spiritual healing. The Prophet ﷺ said: 'Make use of medical treatment, for Allah has not made a disease without appointing a remedy for it.' Combine medicine with dua and Ruqyah."
      }
    },
    {
      id: 5,
      title: "Endometriosis & emotional exhaustion: You're not making it up",
      description: "Chronic pain and fatigue can impact your mood, confidence, and relationships — and it's valid.",
      icon: Brain,
      color: "from-indigo-500 to-indigo-600",
      illustration: "🧠",
      content: {
        main: "Chronic pain affects mental health. Depression, anxiety, and emotional exhaustion are common with endometriosis. Your feelings are valid and seeking mental health support is important.",
        islamic: "Mental health is part of overall health in Islam. When feeling overwhelmed, remember 'La hawla wa la quwwata illa billah' and seek both professional help and spiritual comfort through Quran and dhikr."
      }
    },
    {
      id: 6,
      title: "Living with endo: Tips for daily strength",
      description: "Gentle exercise, anti-inflammatory foods, and saying no when you need to.",
      icon: Activity,
      color: "from-green-500 to-green-600",
      illustration: "💪",
      content: {
        main: "Daily management includes gentle yoga, walking, anti-inflammatory foods (omega-3s, leafy greens), stress management, adequate sleep, and setting boundaries. Listen to your body.",
        islamic: "Taking care of your body is an act of worship. Rest when you need to - even Aisha (RA) took breaks during her menstruation. Balance activity with rest, and don't feel guilty for having limitations."
      }
    },
    {
      id: 7,
      title: "Islamic perspective on suffering and healing",
      description: "What the Qur'an and Hadith teach us about pain, patience, and reward.",
      icon: Moon,
      color: "from-purple-500 to-pink-600",
      illustration: "🌙",
      content: {
        main: "",
        islamic: "Allah says: 'And give good tidings to the patient, Who, when disaster strikes them, say, Indeed we belong to Allah, and indeed to Him we will return' (Quran 2:155-156). Your pain brings you closer to Allah and expiates sins. Trust in His wisdom and timing."
      }
    },
    {
      id: 8,
      title: "Dua and dhikr for chronic pain",
      description: "Spiritual tools for when the cramps or exhaustion feel overwhelming.",
      icon: Moon,
      color: "from-amber-500 to-amber-600",
      illustration: "🤲",
      content: {
        main: "",
        islamic: "Recite during pain: 'Allahumma rabban-nas, adhhibil-ba'sa, washfi anta'sh-shafi, la shifa'a illa shifa'uka, shifa'an la yughadiru saqaman' (O Allah, Lord of people, remove the harm and heal, for You are the Healer). Also recite Ayat al-Kursi and the last two surahs."
      }
    },
    {
      id: 9,
      title: "Your body is not broken: Confidence and beauty through the pain",
      description: "How to reclaim joy, femininity, and purpose despite endometriosis.",
      icon: Sparkles,
      color: "from-rose-500 to-rose-600",
      illustration: "✨",
      content: {
        main: "Endometriosis doesn't define you. You can still live a fulfilling life, have relationships, pursue dreams, and find joy. Your worth isn't determined by your pain levels or fertility.",
        islamic: "You are created by Allah with purpose beyond your condition. Remember: 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose' (Quran 65:3). Your value comes from being Allah's creation, not your health status."
      }
    },
    {
      id: 10,
      title: "When to see a doctor (and how to advocate for yourself)",
      description: "How to push for answers and not be dismissed by healthcare providers.",
      icon: MessageCircle,
      color: "from-blue-500 to-blue-600",
      illustration: "👩‍⚕️",
      content: {
        main: "See a doctor if you have severe period pain, pain during sex, or heavy bleeding. Keep a pain diary, ask for referrals to specialists, and don't accept 'it's normal' for severe pain. Advocate for yourself.",
        islamic: "Seeking medical help is not only permitted but encouraged in Islam. The Prophet ﷺ sought treatment when ill. Don't let anyone dismiss your pain - Allah gave you this body to care for, and severe pain deserves attention."
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
          Back to Endometriosis Topics
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🌙 Understanding Endometriosis: Pain, Power & Peace</h1>
        <p className="text-gray-600">Education, support, and healing for endometriosis</p>
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
              
              <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
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

export default EndometriosisSupport;
