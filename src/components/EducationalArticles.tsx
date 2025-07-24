import React, { useState } from 'react';
import { BookOpen, Heart, Droplet, Brain, Activity, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EducationalArticles = () => {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const cycleBasedArticles = [
    {
      id: 1,
      title: "Understanding Discharge",
      subtitle: "Normal vs concerning signs",
      icon: Droplet,
      color: "bg-purple-100 text-purple-600",
      illustration: "💧",
      content: {
        overview: "Vaginal discharge is a normal part of your menstrual cycle and reproductive health. Understanding what's normal versus what might need attention can help you track your cycle and identify any potential concerns.",
        normalSigns: [
          "Clear or white discharge that's odorless or has a mild scent",
          "Consistency changes throughout your cycle (thicker before period, thinner after)",
          "Slight increase in amount around ovulation",
          "No itching, burning, or unusual discomfort"
        ],
        concerningSigns: [
          "Strong, fishy, or foul odor",
          "Green, gray, or bright yellow color",
          "Cottage cheese-like texture with itching",
          "Accompanied by pelvic pain or fever",
          "Bleeding between periods"
        ],
        islamicNote: "Discharge affects your state of purity (tahara). Clear, white discharge doesn't break wudu, but if you're unsure about the ruling in your madhab, consult a knowledgeable scholar."
      }
    },
    {
      id: 2,
      title: "Hormonal Bloating",
      subtitle: "Causes and relief methods",
      icon: Activity,
      color: "bg-purple-200 text-purple-700",
      illustration: "🌸",
      content: {
        overview: "Hormonal bloating is caused by fluctuations in estrogen and progesterone throughout your menstrual cycle. It's most common in the luteal phase (after ovulation) and can be managed with lifestyle changes.",
        causes: [
          "Progesterone slowing digestion and causing water retention",
          "Estrogen fluctuations affecting sodium levels",
          "Increased appetite and cravings leading to dietary changes",
          "Stress hormones affecting gut health"
        ],
        reliefMethods: [
          "Stay hydrated with plenty of water",
          "Reduce sodium intake, especially before your period",
          "Eat smaller, more frequent meals",
          "Include potassium-rich foods (bananas, spinach)",
          "Gentle exercise like walking or yoga",
          "Herbal teas like peppermint or ginger"
        ],
        islamicNote: "Remember that your body is an Amanah (trust) from Allah. Taking care of it through halal means and seeking relief through natural remedies is encouraged in Islam."
      }
    },
    {
      id: 3,
      title: "Stress and Your Period",
      subtitle: "Managing anxiety islamically",
      icon: Brain,
      color: "bg-purple-100 text-purple-600",
      illustration: "🧘🏽‍♀️",
      content: {
        overview: "Stress can significantly impact your menstrual cycle, causing irregular periods, heavier or lighter bleeding, and increased PMS symptoms. Islam provides beautiful guidance for managing stress and anxiety.",
        stressEffects: [
          "Delayed or missed periods",
          "Irregular cycle lengths",
          "Increased PMS symptoms",
          "Heavier or lighter bleeding",
          "More painful cramps"
        ],
        islamicCoping: [
          "Regular dhikr and remembrance of Allah",
          "Performing salah for peace and mindfulness",
          "Reading Quran for comfort and guidance",
          "Making du'a and trusting in Allah's plan",
          "Seeking support from your Muslim community"
        ],
        practicalTips: [
          "Maintain a consistent sleep schedule",
          "Practice deep breathing exercises",
          "Limit caffeine and sugar",
          "Regular moderate exercise",
          "Talk to trusted family or friends"
        ],
        islamicNote: "Allah says in Quran 13:28: 'Verily, in the remembrance of Allah do hearts find rest.' Use this time to strengthen your connection with Allah."
      }
    },
    {
      id: 4,
      title: "Early Pregnancy Signs",
      subtitle: "What to look for",
      icon: Heart,
      color: "bg-purple-200 text-purple-700",
      illustration: "👶🏽",
      content: {
        overview: "Early pregnancy signs can appear as early as 6-12 days after conception. However, these symptoms can also be similar to PMS, so it's important to understand the differences and when to take a test.",
        earlySymptoms: [
          "Implantation bleeding (light spotting)",
          "Breast tenderness and swelling",
          "Fatigue and tiredness",
          "Mild cramping",
          "Changes in cervical mucus",
          "Heightened sense of smell",
          "Food aversions or cravings"
        ],
        whenToTest: [
          "Wait at least 12-14 days after ovulation",
          "Test with first morning urine for accuracy",
          "If negative but period is late, test again in a week",
          "See a healthcare provider for blood test confirmation"
        ],
        islamicNote: "If you suspect pregnancy, make du'a: 'Rabbana hab lana min azwajina wa dhurriyatina qurrata a'yun' (Our Lord, grant us comfort in our spouses and offspring). Trust in Allah's timing and wisdom."
      }
    },
    {
      id: 5,
      title: "Cycle Irregularities",
      subtitle: "When to seek help",
      icon: Activity,
      color: "bg-purple-300 text-purple-800",
      illustration: "📊",
      content: {
        overview: "While some variation in cycle length is normal, certain irregularities may indicate underlying health issues that need medical attention. Understanding what's normal for you is key.",
        normalVariation: [
          "Cycles between 21-35 days long",
          "Variation of up to 7 days from month to month",
          "Period lasting 3-7 days",
          "Flow changes throughout your period"
        ],
        seekHelpFor: [
          "Periods longer than 7 days or shorter than 2 days",
          "Cycles shorter than 21 days or longer than 35 days",
          "Bleeding between periods",
          "Severe pain that interferes with daily life",
          "No period for 3+ months (if not pregnant)",
          "Sudden significant changes in your usual pattern"
        ],
        islamicNote: "Seeking medical help is not only permissible but encouraged in Islam. The Prophet (PBUH) said: 'Allah has not created a disease without creating a cure for it.' Take care of your health as it's an Amanah."
      }
    },
    {
      id: 6,
      title: "Healthy Habits",
      subtitle: "Islamic wellness practices",
      icon: BookOpen,
      color: "bg-purple-100 text-purple-600",
      illustration: "🌿",
      content: {
        overview: "Islam provides comprehensive guidance for maintaining physical, mental, and spiritual health. These practices can significantly improve your menstrual health and overall well-being.",
        islamicPractices: [
          "Eating in moderation as taught by Prophet (PBUH)",
          "Regular prayer as a form of physical and spiritual exercise",
          "Fasting to cleanse the body and soul",
          "Using natural remedies mentioned in Islamic tradition",
          "Maintaining cleanliness and personal hygiene",
          "Seeking knowledge about your health"
        ],
        nutritionTips: [
          "Eat dates for iron and natural energy",
          "Drink plenty of water throughout the day",
          "Include honey for its healing properties",
          "Consume olive oil as recommended in hadith",
          "Eat balanced meals with protein, fruits, and vegetables"
        ],
        islamicNote: "The Prophet (PBUH) said: 'Your body has a right over you.' Taking care of your health through halal means is both a religious obligation and a way to worship Allah."
      }
    }
  ];

  if (selectedArticle !== null) {
    const article = cycleBasedArticles.find(a => a.id === selectedArticle);
    if (!article) return null;

    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          onClick={() => setSelectedArticle(null)}
          className="mb-4 button-3d"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Button>
        
        <div className="bg-gradient-to-br from-lavender-100 via-lavender-200 to-lavender-300 p-6 rounded-2xl card-3d">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-16 h-16 circular-3d ${article.color} flex items-center justify-center floating-3d`}>
              <article.icon className="w-8 h-8 icon-3d" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-lavender-900">{article.title}</h2>
              <p className="text-lavender-800">{article.subtitle}</p>
            </div>
            <span className="text-4xl ml-auto floating-3d">{article.illustration}</span>
          </div>

          <div className="space-y-6 text-lavender-900">
            <div className="bg-white/50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Overview</h3>
              <p className="leading-relaxed">{article.content.overview}</p>
            </div>

            {article.content.normalSigns && (
              <div className="bg-white/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Normal Signs</h3>
                <ul className="space-y-2">
                  {article.content.normalSigns.map((sign, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {article.content.concerningSigns && (
              <div className="bg-white/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Concerning Signs</h3>
                <ul className="space-y-2">
                  {article.content.concerningSigns.map((sign, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">⚠</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {article.content.causes && (
              <div className="bg-white/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Common Causes</h3>
                <ul className="space-y-2">
                  {article.content.causes.map((cause, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {article.content.reliefMethods && (
              <div className="bg-white/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Relief Methods</h3>
                <ul className="space-y-2">
                  {article.content.reliefMethods.map((method, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">💡</span>
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {article.content.stressEffects && (
              <div className="bg-white/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Effects of Stress</h3>
                <ul className="space-y-2">
                  {article.content.stressEffects.map((effect, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">⚠</span>
                      <span>{effect}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {article.content.islamicCoping && (
              <div className="bg-white/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Islamic Coping Methods</h3>
                <ul className="space-y-2">
                  {article.content.islamicCoping.map((method, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">🤲</span>
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {article.content.practicalTips && (
              <div className="bg-white/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Practical Tips</h3>
                <ul className="space-y-2">
                  {article.content.practicalTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {article.content.earlySymptoms && (
              <div className="bg-white/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Early Symptoms</h3>
                <ul className="space-y-2">
                  {article.content.earlySymptoms.map((symptom, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">👶</span>
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {article.content.whenToTest && (
              <div className="bg-white/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">When to Test</h3>
                <ul className="space-y-2">
                  {article.content.whenToTest.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">🧪</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {article.content.normalVariation && (
              <div className="bg-white/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Normal Variation</h3>
                <ul className="space-y-2">
                  {article.content.normalVariation.map((variation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>{variation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {article.content.seekHelpFor && (
              <div className="bg-white/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">When to Seek Help</h3>
                <ul className="space-y-2">
                  {article.content.seekHelpFor.map((reason, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">🏥</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {article.content.islamicPractices && (
              <div className="bg-white/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Islamic Practices</h3>
                <ul className="space-y-2">
                  {article.content.islamicPractices.map((practice, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">🕌</span>
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {article.content.nutritionTips && (
              <div className="bg-white/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Nutrition Tips</h3>
                <ul className="space-y-2">
                  {article.content.nutritionTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">🍯</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-gradient-to-r from-lavender-200 to-lavender-300 p-4 rounded-lg border-l-4 border-lavender-600">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <span>🌙</span>
                Islamic Note
              </h3>
              <p className="italic text-lavender-900">{article.content.islamicNote}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-ombre circular-3d floating-3d flex items-center justify-center">
            <Activity className="w-5 h-5 text-white icon-3d" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Based on Your Current Cycle</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cycleBasedArticles.map((article, index) => (
            <Card key={index} className="card-3d cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border border-purple-200 relative overflow-hidden"
                  onClick={() => setSelectedArticle(article.id)}>
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <div className="w-full h-full bg-purple-ombre circular-3d rotating-3d transform translate-x-6 -translate-y-6"></div>
              </div>
              
              <CardContent className="p-4 relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 circular-3d pulsing-3d ${article.color} flex items-center justify-center`}>
                    <article.icon className="w-6 h-6 icon-3d" />
                  </div>
                  <span className="text-2xl floating-3d">{article.illustration}</span>
                </div>
                <h3 className="font-semibold text-sm text-gray-800 mb-1">{article.title}</h3>
                <p className="text-xs text-gray-600">{article.subtitle}</p>
                <div className="mt-2 text-xs text-purple-600 hover:text-purple-800">
                  Click to read more →
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationalArticles;
