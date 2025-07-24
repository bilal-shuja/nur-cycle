
import React, { useState } from 'react';
import { Droplet, Info, AlertTriangle, CheckCircle, Book } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PeriodBloodGuide = () => {
  const [selectedBlood, setSelectedBlood] = useState<string | null>(null);

  const bloodTypes = [
    {
      id: 'bright-red',
      title: 'Bright Red Blood',
      subtitle: 'Fresh, active flow',
      color: 'bg-red-100 border-red-300',
      textColor: 'text-red-800',
      icon: '🔴',
      status: 'normal',
      description: 'Bright red blood is fresh and typically appears at the beginning of your period. It flows steadily and signals active shedding of the uterine lining.',
      meaning: 'Healthy menstrual flow, usually normal in early to mid-period.',
      action: 'Completely normal, continue regular period care.',
      islamicNote: 'This is considered valid menstruation (hayd) and requires ghusl at the end of your cycle. You should not pray or fast during this time.',
      islamicDetails: 'According to authentic hadith, menstrual blood is easily recognizable and this bright red flow clearly indicates the state of hayd.'
    },
    {
      id: 'dark-red',
      title: 'Dark Red / Maroon Blood',
      subtitle: 'Thicker, deeper color',
      color: 'bg-red-200 border-red-400',
      textColor: 'text-red-900',
      icon: '🟤',
      status: 'normal',
      description: 'Thicker, darker red blood is common in the middle or end of your period. It may contain small clots and have a heavier feel.',
      meaning: 'Normal menstrual blood, possibly due to slower flow or uterine lining being shed more slowly.',
      action: 'Normal variation, no action needed.',
      islamicNote: 'Also considered hayd if it follows your usual cycle pattern. Continue to refrain from acts of worship that require purity.',
      islamicDetails: 'The color variation does not change the Islamic ruling - it remains menstrual blood requiring the same obligations.'
    },
    {
      id: 'brown',
      title: 'Brown Blood',
      subtitle: 'Old, oxidized blood',
      color: 'bg-amber-100 border-amber-400',
      textColor: 'text-amber-800',
      icon: '🟫',
      status: 'normal',
      description: 'Brown or rust-colored blood is old blood that has been in the uterus longer before exiting the body. It often appears at the beginning or end of your period.',
      meaning: 'Old oxidized blood, normal if within your menstrual window.',
      action: 'Normal if during expected period time.',
      islamicNote: 'If within your usual period duration, it is hayd. If seen before or after your period timeframe, it may be istihādah (non-menstrual bleeding).',
      islamicDetails: 'Scholars differ on brown discharge outside normal period days. Consult your madhab\'s guidance for specific rulings.'
    },
    {
      id: 'pink',
      title: 'Pink Blood',
      subtitle: 'Light flow or spotting',
      color: 'bg-pink-100 border-pink-300',
      textColor: 'text-pink-800',
      icon: '🌸',
      status: 'normal',
      description: 'Light red or pink blood often appears when menstrual blood mixes with cervical fluid. It may occur with spotting or light bleeding.',
      meaning: 'Light flow or spotting, possible hormonal changes or ovulation spotting.',
      action: 'Monitor patterns, usually normal.',
      islamicNote: 'If this occurs during your period time, it is counted as menstruation. If seen outside your normal period window, consult a scholar.',
      islamicDetails: 'Light bleeding during menstrual days is still considered hayd regardless of the lighter color.'
    },
    {
      id: 'black',
      title: 'Black Blood',
      subtitle: 'Very old blood',
      color: 'bg-gray-200 border-gray-500',
      textColor: 'text-gray-800',
      icon: '⚫',
      status: 'attention',
      description: 'Black blood usually means blood has taken longer to exit the body and is old. It can sometimes appear in heavy or delayed periods.',
      meaning: 'Old blood, rarely linked to blockage or irregular cycles.',
      action: 'Usually normal, but monitor if persistent or concerning.',
      islamicNote: 'Considered hayd if it aligns with your regular cycle days. If persistent or outside usual days, it may not be menstrual.',
      islamicDetails: 'Black blood during normal menstrual period is hayd. Outside this timeframe, scholarly consultation is recommended.'
    },
    {
      id: 'orange',
      title: 'Orange Blood',
      subtitle: 'Mixed with discharge',
      color: 'bg-orange-100 border-orange-300',
      textColor: 'text-orange-800',
      icon: '🟠',
      status: 'caution',
      description: 'Orange-tinged blood may be mixed with cervical mucus or signal infection if accompanied by odor or discomfort.',
      meaning: 'Possibly early period blood or could indicate bacterial infection or STI.',
      action: 'Monitor for other symptoms, seek medical care if accompanied by odor or pain.',
      islamicNote: 'If this occurs during menstruation, it is considered hayd. If outside normal period with concerning symptoms, treat as istihādah.',
      islamicDetails: 'Orange coloring during menstrual period doesn\'t change the ruling, but medical evaluation may be needed.'
    },
    {
      id: 'gray',
      title: 'Grayish Blood',
      subtitle: 'Requires attention',
      color: 'bg-slate-200 border-slate-400',
      textColor: 'text-slate-800',
      icon: '🔘',
      status: 'urgent',
      description: 'Gray blood may indicate a bacterial infection or, in some cases, a miscarriage (if pregnant). Medical evaluation is important.',
      meaning: 'Bacterial Vaginosis or possible miscarriage symptoms.',
      action: 'Seek immediate medical evaluation.',
      islamicNote: 'If miscarriage occurred and the fetus was formed (≥ 81 days), this bleeding is nifās (postnatal bleeding). Otherwise, it may be istihādah.',
      islamicDetails: 'Gray discharge requires both medical attention and Islamic guidance due to potential complications.'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'caution':
        return <Info className="w-4 h-4 text-yellow-500" />;
      case 'attention':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'urgent':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Period Blood Color Guide</h2>
        <p className="text-gray-600">Understanding what different period blood colors mean for your health</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {bloodTypes.map((blood) => (
          <Card 
            key={blood.id}
            className={`cursor-pointer hover:shadow-lg transition-all duration-300 ${blood.color}`}
            onClick={() => setSelectedBlood(blood.id)}
          >
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{blood.icon}</span>
                {getStatusIcon(blood.status)}
              </div>
              <h3 className={`font-semibold text-sm ${blood.textColor} mb-1`}>
                {blood.title}
              </h3>
              <p className={`text-xs ${blood.textColor} opacity-75`}>
                {blood.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedBlood && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Droplet className="w-6 h-6 text-red-500" />
              <span>{bloodTypes.find(b => b.id === selectedBlood)?.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="medical" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="medical">Medical View</TabsTrigger>
                <TabsTrigger value="islamic">Islamic View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="medical" className="space-y-4">
                {(() => {
                  const blood = bloodTypes.find(b => b.id === selectedBlood);
                  return blood ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Description:</h4>
                        <p className="text-gray-700">{blood.description}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">What it might mean:</h4>
                        <p className="text-gray-700">{blood.meaning}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Recommended action:</h4>
                        <p className="text-gray-700">{blood.action}</p>
                      </div>
                    </div>
                  ) : null;
                })()}
              </TabsContent>
              
              <TabsContent value="islamic" className="space-y-4">
                {(() => {
                  const blood = bloodTypes.find(b => b.id === selectedBlood);
                  return blood ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Book className="w-4 h-4 text-purple-600" />
                          Islamic Ruling:
                        </h4>
                        <p className="text-gray-700">{blood.islamicNote}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Additional Details:</h4>
                        <p className="text-gray-700">{blood.islamicDetails}</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-purple-800 mb-2">Important Terms:</h5>
                        <ul className="text-sm text-purple-700 space-y-1">
                          <li><strong>Hayd:</strong> Menstrual bleeding - invalidates prayer and fasting</li>
                          <li><strong>Istihādah:</strong> Non-menstrual bleeding - does not invalidate worship</li>
                          <li><strong>Nifās:</strong> Postnatal bleeding after childbirth</li>
                          <li><strong>Ghusl:</strong> Full ritual purification required after hayd ends</li>
                        </ul>
                      </div>
                    </div>
                  ) : null;
                })()}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-purple-800 mb-4 text-center">When to Seek Help</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold text-purple-700 mb-2">Medical Attention:</h4>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>• Gray or unusual colored blood</li>
                <li>• Severe pain or cramping</li>
                <li>• Heavy bleeding with large clots</li>
                <li>• Foul odor</li>
                <li>• Bleeding outside normal cycle</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-700 mb-2">Islamic Guidance:</h4>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>• Uncertain about hayd vs istihādah</li>
                <li>• Questions about prayer validity</li>
                <li>• Madhab-specific rulings needed</li>
                <li>• Purity concerns during irregular bleeding</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-700 mb-2">Emergency Signs:</h4>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>• Extremely heavy bleeding</li>
                <li>• Severe abdominal pain</li>
                <li>• Signs of infection</li>
                <li>• Pregnancy concerns</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PeriodBloodGuide;
