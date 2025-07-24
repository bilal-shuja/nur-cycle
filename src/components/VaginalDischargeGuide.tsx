
import React, { useState } from 'react';
import { Droplets, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VaginalDischargeGuide = () => {
  const [selectedDischarge, setSelectedDischarge] = useState<string | null>(null);

  const dischargeTypes = [
    {
      id: 'white',
      title: 'White Discharge',
      subtitle: 'Milky vaginal fluid',
      color: 'bg-gray-100 border-gray-300',
      textColor: 'text-gray-800',
      icon: '⚪',
      status: 'normal',
      description: 'Usually normal, especially around ovulation or before periods.',
      meaning: 'May be normal cervical mucus or sign of healthy vaginal environment.',
      action: 'Monitor for any changes in odor or texture.',
      islamicNote: 'Normal discharge does not affect wudu unless accompanied by other impurities.'
    },
    {
      id: 'yellow',
      title: 'Yellow Discharge',
      subtitle: 'When and why it happens',
      color: 'bg-yellow-100 border-yellow-300',
      textColor: 'text-yellow-800',
      icon: '🟡',
      status: 'caution',
      description: 'May indicate infection, especially if foul-smelling.',
      meaning: 'Could be bacterial infection, STI, or sometimes normal if light yellow.',
      action: 'See healthcare provider if accompanied by odor, itching, or pain.',
      islamicNote: 'If abnormal discharge affects purity, consult a scholar about prayer requirements.'
    },
    {
      id: 'white-clumpy',
      title: 'White Clumpy Discharge',
      subtitle: 'Cottage cheese texture',
      color: 'bg-gray-200 border-gray-400',
      textColor: 'text-gray-800',
      icon: '🧀',
      status: 'attention',
      description: 'Often a sign of a yeast infection (candidiasis).',
      meaning: 'Overgrowth of Candida fungus in the vagina.',
      action: 'Consult healthcare provider for antifungal treatment.',
      islamicNote: 'During treatment, maintain regular purification practices unless medically advised otherwise.'
    },
    {
      id: 'transparent',
      title: 'Clear Discharge',
      subtitle: 'Clear, transparent fluid',
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-800',
      icon: '💧',
      status: 'normal',
      description: 'Normal around ovulation and during arousal.',
      meaning: 'Healthy cervical mucus, often indicates fertile period.',
      action: 'Completely normal, no action needed.',
      islamicNote: 'Natural discharge is pure and does not invalidate wudu.'
    },
    {
      id: 'brown',
      title: 'Brown Discharge',
      subtitle: 'Timing-dependent meaning',
      color: 'bg-amber-100 border-amber-300',
      textColor: 'text-amber-800',
      icon: '🟤',
      status: 'normal',
      description: 'Could be old blood from menstruation or spotting.',
      meaning: 'Old blood that has oxidized, common at start/end of periods.',
      action: 'Normal if during menstrual cycle, monitor if persistent.',
      islamicNote: 'Brown discharge during menstrual days is considered hayd. Outside menstrual period, may be istihada.'
    },
    {
      id: 'pink',
      title: 'Pink Discharge',
      subtitle: 'Light bleeding or spotting',
      color: 'bg-pink-100 border-pink-300',
      textColor: 'text-pink-800',
      icon: '🌸',
      status: 'normal',
      description: 'May indicate spotting before periods or after intercourse.',
      meaning: 'Light bleeding mixed with cervical fluid.',
      action: 'Usually normal, track patterns.',
      islamicNote: 'If occurs during menstrual window, counts as hayd. If outside, may be istihada.'
    },
    {
      id: 'green',
      title: 'Green Discharge',
      subtitle: 'Potential infection',
      color: 'bg-green-100 border-green-400',
      textColor: 'text-green-800',
      icon: '🟢',
      status: 'urgent',
      description: 'May signal a bacterial infection requiring medical attention.',
      meaning: 'Often indicates bacterial vaginosis or STI.',
      action: 'Seek immediate medical attention.',
      islamicNote: 'During treatment, maintain purity as much as possible and consult scholar if needed.'
    },
    {
      id: 'gray',
      title: 'Gray Discharge',
      subtitle: 'Concerning symptoms',
      color: 'bg-slate-100 border-slate-400',
      textColor: 'text-slate-800',
      icon: '⚫',
      status: 'urgent',
      description: 'Often associated with bacterial vaginosis.',
      meaning: 'Bacterial imbalance in vaginal environment.',
      action: 'Consult healthcare provider promptly.',
      islamicNote: 'Abnormal discharge may affect ritual purity - seek both medical and Islamic guidance.'
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Vaginal Discharge Color Guide</h2>
        <p className="text-gray-600">Understanding what different types of discharge may indicate</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dischargeTypes.map((discharge) => (
          <Card 
            key={discharge.id}
            className={`cursor-pointer hover:shadow-lg transition-all duration-300 ${discharge.color}`}
            onClick={() => setSelectedDischarge(discharge.id)}
          >
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{discharge.icon}</span>
                {getStatusIcon(discharge.status)}
              </div>
              <h3 className={`font-semibold text-sm ${discharge.textColor} mb-1`}>
                {discharge.title}
              </h3>
              <p className={`text-xs ${discharge.textColor} opacity-75`}>
                {discharge.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedDischarge && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Droplets className="w-6 h-6 text-blue-500" />
              <span>{dischargeTypes.find(d => d.id === selectedDischarge)?.title}</span>
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
                  const discharge = dischargeTypes.find(d => d.id === selectedDischarge);
                  return discharge ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Description:</h4>
                        <p className="text-gray-700">{discharge.description}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">What it might mean:</h4>
                        <p className="text-gray-700">{discharge.meaning}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Recommended action:</h4>
                        <p className="text-gray-700">{discharge.action}</p>
                      </div>
                    </div>
                  ) : null;
                })()}
              </TabsContent>
              
              <TabsContent value="islamic" className="space-y-4">
                {(() => {
                  const discharge = dischargeTypes.find(d => d.id === selectedDischarge);
                  return discharge ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Islamic Guidance:</h4>
                        <p className="text-gray-700">{discharge.islamicNote}</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-purple-800">
                          <strong>Note:</strong> For specific Islamic rulings regarding purity and worship, 
                          always consult with a qualified Islamic scholar who can provide guidance based on 
                          your specific situation and madhab.
                        </p>
                      </div>
                    </div>
                  ) : null;
                })()}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-bold text-teal-800 mb-4">When to Seek Help</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <h4 className="font-semibold text-teal-700 mb-2">Medical Attention:</h4>
              <ul className="text-sm text-teal-600 space-y-1">
                <li>• Strong, foul odor</li>
                <li>• Itching or burning</li>
                <li>• Pelvic pain</li>
                <li>• Green or gray discharge</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-teal-700 mb-2">Islamic Guidance:</h4>
              <ul className="text-sm text-teal-600 space-y-1">
                <li>• Questions about purity</li>
                <li>• Prayer and fasting concerns</li>
                <li>• Madhab-specific rulings</li>
                <li>• Ritual purification doubts</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VaginalDischargeGuide;
