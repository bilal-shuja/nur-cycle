
import React, { useState } from 'react';
import { Thermometer, Coffee, Pill, Activity, Droplets, Leaf, Heart, Moon, ArrowLeft, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HomeRemedies = () => {
  const [selectedRemedy, setSelectedRemedy] = useState<number | null>(null);
  const [showIslamicView, setShowIslamicView] = useState(false);

  const remedies = [
    {
      id: 1,
      title: "Warm Compress (Hot Water Bottle or Heating Pad)",
      description: "Heat relaxes muscles and improves blood flow, easing cramps in minutes.",
      icon: Thermometer,
      color: "from-red-500 to-red-600",
      illustration: "🔥",
      content: {
        main: "Heat therapy is one of the most effective natural remedies for menstrual cramps. Apply a warm compress, heating pad, or hot water bottle to your lower abdomen or back for 15-20 minutes. The warmth helps relax uterine muscles and increases blood flow, reducing pain and tension.",
        islamic: "Seeking comfort through natural means is encouraged. Use heat therapy while making dhikr or reciting Quran to combine physical and spiritual healing."
      }
    },
    {
      id: 2,
      title: "Ginger Tea",
      description: "A natural anti-inflammatory that reduces prostaglandins (pain chemicals).",
      icon: Coffee,
      color: "from-amber-500 to-amber-600",
      illustration: "🫖",
      content: {
        main: "Ginger contains compounds that reduce inflammation and block prostaglandin production - the chemicals responsible for menstrual pain. Steep fresh ginger root in hot water for 10 minutes, or use ginger tea bags. Drink 2-3 cups daily during your period.",
        islamic: "Ginger is mentioned favorably in Islamic tradition. The Prophet ﷺ appreciated beneficial herbs and spices. Drink ginger tea with gratitude for Allah's natural remedies."
      }
    },
    {
      id: 3,
      title: "Magnesium-Rich Foods (Like Bananas, Almonds, Spinach)",
      description: "Helps relax uterine muscles and reduce tension.",
      icon: Leaf,
      color: "from-green-500 to-green-600",
      illustration: "🌿",
      content: {
        main: "Magnesium is a natural muscle relaxant that can significantly reduce menstrual cramps. Include foods like dark leafy greens, nuts, seeds, bananas, and dark chocolate in your diet. You can also take magnesium supplements (consult your doctor for dosage).",
        islamic: "Allah has provided healing in wholesome foods. Eat with intention and gratitude, remembering that nourishing your body is part of taking care of Allah's amanah (trust)."
      }
    },
    {
      id: 4,
      title: "Light Movement or Gentle Stretching",
      description: "Walking, yoga, or light stretching boosts circulation and lowers pain intensity.",
      icon: Activity,
      color: "from-purple-500 to-purple-600",
      illustration: "🧘‍♀️",
      content: {
        main: "Gentle exercise increases blood flow and releases endorphins, natural pain relievers. Try light walking, gentle yoga poses like child's pose or cat-cow stretches, or simple stretches targeting your lower back and hips. Avoid intense workouts during heavy flow days.",
        islamic: "Movement is beneficial for the body Allah has given you. Even gentle stretching can be done with mindfulness and gratitude. Listen to your body and rest when needed."
      }
    },
    {
      id: 5,
      title: "Black Seed (Nigella Sativa)",
      description: "A Sunnah remedy known for its anti-inflammatory benefits — often taken with honey or warm water.",
      icon: Pill,
      color: "from-black to-gray-600",
      illustration: "🖤",
      content: {
        main: "Black seed oil or powder has anti-inflammatory and pain-relieving properties. Take 1 teaspoon of black seed oil or mix 1/2 teaspoon of black seed powder with honey twice daily during your period.",
        islamic: "The Prophet ﷺ said: 'Black seed is a cure for every disease except death' (Sahih Bukhari). Use this blessed remedy with faith in Allah's healing power and gratitude for Prophetic guidance."
      }
    },
    {
      id: 6,
      title: "Chamomile or Peppermint Tea",
      description: "Calming for both the uterus and the nervous system — great for stress-induced cramps.",
      icon: Coffee,
      color: "from-yellow-500 to-yellow-600",
      illustration: "🌼",
      content: {
        main: "Chamomile has antispasmodic properties that help relax uterine muscles, while peppermint can ease digestive discomfort often associated with periods. Drink 2-3 cups daily for best results. Both teas also help reduce stress and promote relaxation.",
        islamic: "These gentle herbs are among Allah's blessings for healing. Drink herbal teas mindfully, perhaps while making dhikr or reflecting on Allah's mercy in providing natural remedies."
      }
    },
    {
      id: 7,
      title: "Hydration with Warm Water",
      description: "Staying hydrated reduces bloating and muscle cramps — warm water soothes more than cold.",
      icon: Droplets,
      color: "from-blue-500 to-blue-600",
      illustration: "💧",
      content: {
        main: "Proper hydration helps reduce bloating and supports overall circulation. Warm water is particularly soothing during menstruation and can help prevent muscle cramps. Aim for 8-10 glasses daily, with extra warm fluids like herbal teas.",
        islamic: "Water is a blessing mentioned throughout the Quran. Drink with gratitude and remember that staying hydrated is part of caring for your body. The Prophet ﷺ recommended drinking water in three breaths."
      }
    },
    {
      id: 8,
      title: "Clove Oil or Lavender Oil Massage",
      description: "Mix with carrier oil and rub gently on the lower abdomen to reduce pain.",
      icon: Sparkles,
      color: "from-purple-500 to-pink-600",
      illustration: "✨",
      content: {
        main: "Essential oils like clove, lavender, or rosemary have analgesic properties. Mix 2-3 drops with a carrier oil (like coconut or olive oil) and gently massage your lower abdomen in circular motions. The combination of aromatherapy and massage helps reduce pain and promote relaxation.",
        islamic: "The Prophet ﷺ used oils for healing and wellness. Use natural oils with gratitude for Allah's creation and the healing properties He has placed in plants."
      }
    },
    {
      id: 9,
      title: "Dates and Honey",
      description: "Natural energy boost with muscle-relaxing minerals — also spiritually comforting for many.",
      icon: Heart,
      color: "from-brown-500 to-brown-600",
      illustration: "🍯",
      content: {
        main: "Dates provide natural sugars for energy, potassium for muscle function, and magnesium for relaxation. Honey has anti-inflammatory properties. Together, they provide comfort and nutrition during menstruation while satisfying cravings naturally.",
        islamic: "Both dates and honey are blessed foods mentioned in the Quran and Sunnah. The Prophet ﷺ regularly consumed dates and praised honey as healing. Eat these with gratitude and intention for healing."
      }
    },
    {
      id: 10,
      title: "Warm Bath with Epsom Salt",
      description: "Relaxes full-body tension and reduces pain perception.",
      icon: Droplets,
      color: "from-teal-500 to-teal-600",
      illustration: "🛁",
      content: {
        main: "Epsom salt contains magnesium, which can be absorbed through the skin to help relax muscles. Add 1-2 cups to a warm bath and soak for 15-20 minutes. The combination of heat, magnesium, and relaxation can significantly reduce cramping and tension.",
        islamic: "Cleanliness and self-care are emphasized in Islam. Use this time for reflection and gratitude while caring for your body. You may recite dhikr or make dua during this peaceful time."
      }
    }
  ];

  if (selectedRemedy !== null) {
    const remedy = remedies.find(r => r.id === selectedRemedy);
    if (!remedy) return null;

    return (
      <div>
        <Button 
          variant="outline" 
          onClick={() => setSelectedRemedy(null)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home Remedies
        </Button>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader className={`bg-gradient-to-r ${remedy.color} text-white`}>
            <div className="flex items-center space-x-3">
              <remedy.icon className="w-8 h-8" />
              <span className="text-3xl">{remedy.illustration}</span>
            </div>
            <CardTitle className="text-2xl mt-4">{remedy.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">How This Remedy Works</h3>
              <p className="text-gray-700 leading-relaxed">{remedy.content.main}</p>
            </div>
            
            {remedy.content.islamic && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Moon className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-purple-800">Islamic Guidance</h3>
                </div>
                <p className="text-purple-700 leading-relaxed">{remedy.content.islamic}</p>
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🫧 Natural & Home Remedies to Ease Period Cramps</h1>
        <p className="text-gray-600">Evidence-based and traditional remedies for menstrual comfort</p>
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
        {remedies.map((remedy) => (
          <Card 
            key={remedy.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
            onClick={() => setSelectedRemedy(remedy.id)}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${remedy.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  <remedy.icon className="w-6 h-6" />
                </div>
                <span className="text-2xl">{remedy.illustration}</span>
              </div>
              
              <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                {remedy.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {remedy.description}
              </p>
              
              {showIslamicView && remedy.content.islamic && (
                <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-1 mb-1">
                    <Moon className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-medium text-purple-800">Islamic Note</span>
                  </div>
                  <p className="text-xs text-purple-700 line-clamp-2">
                    {remedy.content.islamic}
                  </p>
                </div>
              )}
              
              <Button 
                size="sm" 
                className={`w-full mt-3 bg-gradient-to-r ${remedy.color} hover:opacity-90`}
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

export default HomeRemedies;
