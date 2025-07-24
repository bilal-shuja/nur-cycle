import React, { useState } from 'react';
import { ArrowLeft, Heart, TestTube, Clock, Brain, Shield, Book, Droplets, Moon, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const EarlyPregnancySigns = () => {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [showIslamicGuidance, setShowIslamicGuidance] = useState(false);

  const articles = [
    {
      id: 1,
      title: "Hate the wait: What are the earliest signs of pregnancy?",
      description: "Fatigue, nausea, spotting — the signs you might miss.",
      icon: Clock,
      color: "from-pink-500 to-pink-600",
      tag: "Popular",
      illustration: "🤰",
      content: {
        main: "The earliest signs of pregnancy can appear as early as 6-12 days after conception. Key signs include: implantation bleeding (light spotting), breast tenderness, fatigue, mild cramping, and changes in cervical mucus.",
        islamic: "If you suspect pregnancy, make dua for Allah's guidance. Implantation bleeding may affect your prayer schedule - consult a scholar if bleeding is outside your normal cycle."
      }
    },
    {
      id: 2,
      title: "8 signs of 'pregnancy' that are actually PMS",
      description: "When your body tricks you before your period starts.",
      icon: Brain,
      color: "from-purple-500 to-purple-600",
      tag: "New",
      illustration: "🤔",
      content: {
        main: "Common PMS symptoms that mimic pregnancy: breast tenderness, mood swings, fatigue, food cravings, bloating, headaches, mild cramping, and nausea. Track your cycle to distinguish patterns.",
        islamic: "Remember that Allah knows best about your body's cycles. Make istighfar and trust in His timing while being patient with your body's natural changes."
      }
    },
    {
      id: 3,
      title: "How early can you take a test?",
      description: "When to test and how to get the most accurate result.",
      icon: TestTube,
      color: "from-blue-500 to-blue-600",
      tag: "",
      illustration: "🧪",
      content: {
        main: "Most home pregnancy tests are accurate 1-2 weeks after a missed period. For earliest detection, wait at least 12-14 days after ovulation. Test with first morning urine for best results.",
        islamic: "Before testing, make dua: 'Allahumma in kunta qadarta li haadha al-amr fa yassiruhu li' (O Allah, if You have decreed this matter for me, make it easy for me)."
      }
    },
    {
      id: 4,
      title: "How to handle pregnancy paranoia",
      description: "Tips to manage overthinking when you're waiting.",
      icon: Heart,
      color: "from-teal-500 to-teal-600",
      tag: "",
      illustration: "💭",
      content: {
        main: "Manage anxiety by: limiting symptom checking, staying busy with healthy activities, talking to trusted friends, practicing mindfulness, and remembering that stress doesn't affect pregnancy outcomes.",
        islamic: "Increase dhikr and recite 'Hasbunallahu wa ni'mal wakeel' (Allah is sufficient for us and He is the best disposer of affairs). Trust in Allah's perfect timing and plan."
      }
    },
    {
      id: 5,
      title: "Could you have your period and be pregnant?",
      description: "Bleeding during early pregnancy: what's normal and what's not.",
      icon: Droplets,
      color: "from-red-500 to-red-600",
      tag: "Popular",
      illustration: "🩸",
      content: {
        main: "You cannot have a true period while pregnant, but you may experience implantation bleeding or other light bleeding. This is usually lighter, shorter, and different in color than your normal period.",
        islamic: "If bleeding occurs during suspected pregnancy, it may affect your prayer and fasting obligations. Consult both a healthcare provider and Islamic scholar for guidance on worship during this time."
      }
    },
    {
      id: 6,
      title: "Is a negative result reliable?",
      description: "When to trust the result — and when to retest.",
      icon: TestTube,
      color: "from-orange-500 to-orange-600",
      tag: "",
      illustration: "❌",
      content: {
        main: "A negative result can be unreliable if: you test too early, use diluted urine, the test is expired, or you have irregular cycles. Wait a week and retest if your period doesn't arrive.",
        islamic: "Accept Allah's qadar (decree) with patience. If the result is negative, say 'Qadarallahu wa ma sha'a fa'al' (Allah has decreed and what He wills, He does)."
      }
    },
    {
      id: 7,
      title: "6 emergency contraception must-knows",
      description: "What to do (and not do) after unprotected sex.",
      icon: Shield,
      color: "from-yellow-500 to-yellow-600",
      tag: "",
      illustration: "⚡",
      content: {
        main: "Emergency contraception is most effective within 72 hours but can work up to 120 hours after unprotected sex. It's not an abortion pill and won't harm an existing pregnancy.",
        islamic: "Consult with a knowledgeable Islamic scholar about emergency contraception, as rulings may vary based on circumstances and madhab. Prioritize seeking both medical and religious guidance."
      }
    },
    {
      id: 8,
      title: "The pill vs. pregnancy: ALL your questions answered",
      description: "Can you get pregnant on the pill? Here's what to know.",
      icon: Book,
      color: "from-indigo-500 to-indigo-600",
      tag: "",
      illustration: "💊",
      content: {
        main: "Birth control pills are 99% effective when taken perfectly, but typical use effectiveness is about 91%. Missing pills, certain medications, and illness can reduce effectiveness.",
        islamic: "Family planning is permissible in Islam when both spouses agree. The pill doesn't affect ritual purity, but consult scholars about any irregular bleeding patterns it may cause."
      }
    },
    {
      id: 9,
      title: "How to cope with emotions from a positive test",
      description: "Emotional and spiritual tools for early pregnancy news.",
      icon: Heart,
      color: "from-pink-500 to-rose-600",
      tag: "New",
      illustration: "💕",
      content: {
        main: "A positive test can bring joy, fear, or mixed emotions - all are normal. Take time to process, reach out for support, consider your options thoughtfully, and remember that you're not alone.",
        islamic: "Say 'Alhamdulillahi rabbil alameen' (All praise to Allah, Lord of the worlds). Make dua for a healthy pregnancy: 'Rabbana hab lana min azwajina wa dhurriyatina qurrata a'yun' (Our Lord, grant us comfort in our spouses and offspring)."
      }
    },
    {
      id: 10,
      title: "Spiritual response to a pregnancy test result (Islamic edition)",
      description: "What duas to say, how to respond in gratitude or fear.",
      icon: Star,
      color: "from-purple-500 to-pink-600",
      tag: "Islamic",
      illustration: "🤲",
      content: {
        main: "",
        islamic: "For positive results: Recite Ayat al-Kursi and make dua for protection. For negative results: Say 'Inna lillahi wa inna ilayhi raji'un' if desired, and 'Alhamdulillah' in acceptance. Trust Allah's wisdom in all outcomes. Perform ghusl if needed and continue regular prayers while seeking Allah's guidance."
      }
    }
  ];

  if (selectedArticle !== null) {
    const article = articles.find(a => a.id === selectedArticle);
    if (!article) return null;

    return (
      <div>
        <Button 
          variant="outline" 
          onClick={() => setSelectedArticle(null)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Button>
        
        <Card className="max-w-4xl mx-auto card-3d">
          <CardHeader className={`bg-gradient-to-r ${article.color}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <article.icon className="w-8 h-8 text-white" />
                <span className="text-3xl">{article.illustration}</span>
              </div>
              {article.tag && (
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {article.tag}
                </Badge>
              )}
            </div>
            <CardTitle className="text-2xl mt-4 text-white">{article.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {article.content.main && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Medical Information</h3>
                <p className="text-gray-700 leading-relaxed">{article.content.main}</p>
              </div>
            )}
            
            {article.content.islamic && (
              <div className="bg-gradient-to-br from-lavender-50 to-lavender-100 p-5 rounded-lg border border-lavender-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Moon className="w-5 h-5 text-lavender-700" />
                  <h3 className="text-lg font-semibold text-lavender-900">Islamic Guidance</h3>
                </div>
                <p className="text-lavender-900 leading-relaxed">{article.content.islamic}</p>
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Early Signs of Pregnancy</h1>
        <p className="text-gray-600">Comprehensive guide to understanding early pregnancy signs and symptoms</p>
      </div>

      {/* Toggle for Islamic Guidance */}
      <div className="flex justify-center">
        <Button
          variant={showIslamicGuidance ? "default" : "outline"}
          onClick={() => setShowIslamicGuidance(!showIslamicGuidance)}
          className="flex items-center space-x-2"
        >
          <Moon className="w-4 h-4" />
          <span>{showIslamicGuidance ? "Hide" : "Show"} Islamic Guidance</span>
        </Button>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card 
            key={article.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
            onClick={() => setSelectedArticle(article.id)}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 opacity-5 bg-gradient-to-br ${article.color}`}>
              <article.icon className="w-full h-full p-4" />
            </div>
            
            <CardContent className="p-5 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${article.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  <article.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{article.illustration}</span>
                  {article.tag && (
                    <Badge 
                      variant={article.tag === "Popular" ? "default" : article.tag === "New" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {article.tag}
                    </Badge>
                  )}
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {article.description}
              </p>
              
              {showIslamicGuidance && article.content.islamic && (
                <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-1 mb-1">
                    <Moon className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-medium text-lavender-900">Islamic Note</span>
                  </div>
                  <p className="text-xs text-lavender-900 line-clamp-2">
                    {article.content.islamic}
                  </p>
                </div>
              )}
              
              <Button 
                size="sm" 
                className={`w-full mt-3 bg-gradient-to-r ${article.color} hover:opacity-90`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedArticle(article.id);
                }}
              >
                Read Full Article
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Islamic Dua Section */}
      <Card className="bg-gradient-to-br from-lavender-100 via-lavender-200 to-lavender-300 border-lavender-400 card-3d">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="w-6 h-6 text-lavender-700" />
            <h3 className="text-xl font-bold text-lavender-900">Dua for Clarity and Ease</h3>
          </div>
          <p className="text-lg font-arabic text-lavender-900 mb-2">
            اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ
          </p>
          <p className="text-lavender-900 italic mb-2">
            "O Allah, I ask You of Your favor and mercy"
          </p>
          <p className="text-sm text-lavender-900 mt-3">
            Recite this dua when seeking Allah's guidance during times of uncertainty about pregnancy or any important life matter.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarlyPregnancySigns;
