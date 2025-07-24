import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertTriangle, Heart, Droplet, Activity, 
  Thermometer, Zap, Wind, Brain,
  Calendar, Clock, FileText, Baby,
  Flower, Star, Moon
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ComplicationData {
  [complicationName: string]: string;
}

interface LossData {
  type: string;
  date: string;
  weeks: string;
  notes: string;
}

const PregnancyComplications = () => {
  const [selectedComplications, setSelectedComplications] = useState<string[]>([]);
  const [complicationSeverity, setComplicationSeverity] = useState<ComplicationData>({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'input' | 'chart' | 'loss'>('input');
  const [lossData, setLossData] = useState<LossData>({
    type: '',
    date: '',
    weeks: '',
    notes: ''
  });
  const [savedLosses, setSavedLosses] = useState<LossData[]>([]);

  const [settings, setSettings] = useState({
    darkMode: false,
    // ... other settings
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('nurcycle-app-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsedSettings }));
        
        if (parsedSettings.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Load saved losses
    const savedLossData = localStorage.getItem('pregnancy-losses');
    if (savedLossData) {
      setSavedLosses(JSON.parse(savedLossData));
    }
  }, []);

  const pregnancyComplications = [
    { name: 'Bleeding/Spotting', severity: ['Light', 'Moderate', 'Heavy'], icon: Droplet },
    { name: 'Severe Cramping', severity: ['Mild', 'Moderate', 'Severe'], icon: Zap },
    { name: 'High Blood Pressure', severity: ['Mild', 'Moderate', 'Severe'], icon: Heart },
    { name: 'Gestational Diabetes', severity: ['Controlled', 'Uncontrolled'], icon: Activity },
    { name: 'Preeclampsia Signs', severity: ['Mild', 'Moderate', 'Severe'], icon: AlertTriangle },
    { name: 'Severe Headaches', severity: ['Mild', 'Moderate', 'Severe'], icon: Brain },
    { name: 'Vision Changes', severity: ['Blurry', 'Spots', 'Loss'], icon: AlertTriangle },
    { name: 'Fever', severity: ['Low', 'Moderate', 'High'], icon: Thermometer },
    { name: 'Severe Nausea/Vomiting', severity: ['Frequent', 'Continuous', 'Unable to keep fluids'], icon: Wind },
    { name: 'Decreased Baby Movement', severity: ['Less active', 'Very little', 'No movement'], icon: Baby },
    { name: 'Contractions (Early)', severity: ['Irregular', 'Regular', 'Frequent'], icon: Zap },
    { name: 'Fluid Leakage', severity: ['Small amount', 'Moderate', 'Gushing'], icon: Droplet },
    { name: 'Swelling (Sudden)', severity: ['Hands', 'Face', 'All over'], icon: Wind },
    { name: 'Chest Pain', severity: ['Mild', 'Moderate', 'Severe'], icon: Heart },
    { name: 'Difficulty Breathing', severity: ['Mild', 'Moderate', 'Severe'], icon: Wind }
  ];

  const lossTypes = [
    {
      type: 'Miscarriage (Spontaneous Abortion)',
      description: 'Loss of pregnancy before 20 weeks due to natural causes'
    },
    {
      type: 'Neonatal Death',
      description: 'Death of a baby within the first 28 days after birth'
    },
    {
      type: 'Ectopic Pregnancy',
      description: 'Pregnancy that develops outside the uterus, usually in fallopian tubes'
    },
    {
      type: 'Molar Pregnancy',
      description: 'Abnormal tissue growth instead of normal embryo development'
    },
    {
      type: 'Chemical Pregnancy',
      description: 'Very early pregnancy loss, usually before 5 weeks'
    },
    {
      type: 'Blighted Ovum (Anembryonic Pregnancy)',
      description: 'Fertilized egg implants but embryo does not develop'
    },
    {
      type: 'Stillbirth',
      description: 'Loss of baby after 20 weeks of pregnancy or during delivery'
    }
  ];

  const toggleComplication = (complication: string) => {
    setSelectedComplications(prev => {
      const updatedComplications = prev.includes(complication)
        ? prev.filter(c => c !== complication)
        : [...prev, complication];

      // Update localStorage
      const storedComplications = JSON.parse(localStorage.getItem("complicationsHistory") || "{}");
      storedComplications[selectedDate] = updatedComplications.map(name => ({
        name,
        severity: complicationSeverity[name] || 'Not specified'
      }));
      localStorage.setItem("complicationsHistory", JSON.stringify(storedComplications));

      return updatedComplications;
    });
  };

  const handleSeveritySelect = (complicationName: string, severity: string) => {
    setComplicationSeverity(prev => ({
      ...prev,
      [complicationName]: prev[complicationName] === severity ? '' : severity
    }));

    if (!selectedComplications.includes(complicationName)) {
      setSelectedComplications(prev => [...prev, complicationName]);
    }
  };

  const handleSaveComplications = () => {
    const complicationsData = {
      date: selectedDate,
      complications: selectedComplications.map(complication => ({
        name: complication,
        severity: complicationSeverity[complication] || 'Not specified'
      }))
    };
    
    const existingComplications = JSON.parse(localStorage.getItem("complicationsHistory") || "{}");
    existingComplications[selectedDate] = complicationsData.complications;
    localStorage.setItem("complicationsHistory", JSON.stringify(existingComplications));
    
    alert(`Complications saved for ${selectedDate}!`);
  };

  const handleSaveLoss = () => {
    if (!lossData.type || !lossData.date) {
      alert('Please fill in the required fields (type and date)');
      return;
    }

    const newLoss = { ...lossData };
    const updatedLosses = [...savedLosses, newLoss];
    setSavedLosses(updatedLosses);
    localStorage.setItem('pregnancy-losses', JSON.stringify(updatedLosses));

    // Reset form
    setLossData({
      type: '',
      date: '',
      weeks: '',
      notes: ''
    });

    alert('Loss information saved. Our thoughts and prayers are with you during this difficult time.');
  };

  const ComplicationGrid = ({ complications }: { complications: typeof pregnancyComplications }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        {complications.map((complication) => (
          <Card
            key={complication.name}
            className={`relative cursor-pointer transition-all hover:shadow-md ${
              selectedComplications.includes(complication.name)
                ? settings.darkMode
                  ? 'bg-slate-800 border-slate-600'
                  : 'bg-red-50 border-red-300'
                : settings.darkMode
                ? 'bg-slate-900 border-slate-700'
                : 'bg-white'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-white dark:hidden rounded-lg" />
            <div className="absolute inset-0 hidden dark:block bg-slate-900 rounded-lg" />

            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <complication.icon
                    className={`w-4 h-4 ${settings.darkMode ? 'text-white' : 'text-red-600'}`}
                  />
                  <span
                    className={`font-medium text-sm ${settings.darkMode ? 'text-white' : ''}`}
                  >
                    {complication.name}
                  </span>
                </div>

                <button
                  onClick={() => toggleComplication(complication.name)}
                  className={`w-5 h-5 rounded-full border-2 ${
                    selectedComplications.includes(complication.name)
                      ? 'bg-red-500 border-red-500'
                      : settings.darkMode
                      ? 'border-slate-600'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedComplications.includes(complication.name) && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-1">
                {complication.severity.map((level) => (
                  <Badge
                    key={level}
                    variant={complicationSeverity[complication.name] === level ? 'default' : 'outline'}
                    className={`text-xs cursor-pointer transition-all ${
                      complicationSeverity[complication.name] === level
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : settings.darkMode
                        ? 'hover:bg-slate-700 border-slate-600 text-white'
                        : 'hover:bg-red-100'
                    }`}
                    onClick={() => handleSeveritySelect(complication.name, level)}
                  >
                    {level}
                  </Badge>
                ))}
              </div>

              {complicationSeverity[complication.name] && (
                <div
                  className={`mt-2 text-xs font-medium ${
                    settings.darkMode ? 'text-gray-300' : 'text-red-600'
                  }`}
                >
                  Selected: {complicationSeverity[complication.name]}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Load complications for selected date
  useEffect(() => {
    const storedComplications = JSON.parse(localStorage.getItem("complicationsHistory") || "{}");
    if (storedComplications[selectedDate]) {
      const savedComplications = storedComplications[selectedDate];
      setSelectedComplications(savedComplications.map(item => item.name));
      
      const severityObj = {};
      savedComplications.forEach(item => {
        severityObj[item.name] = item.severity;
      });
      setComplicationSeverity(severityObj);
    } else {
      setSelectedComplications([]);
      setComplicationSeverity({});
    }
  }, [selectedDate]);

  return (
    <div className="space-y-6">
      <div className={`text-center relative overflow-hidden ${settings.darkMode ? 'bg-slate-900 text-white' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-pink-50 dark:hidden"></div>
        <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

        <div className="relative z-10">
          <h1 className={`text-3xl font-bold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
            Pregnancy Complications & Loss Support
          </h1>
          <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Track complications and find support during difficult times
          </p>
        </div>
      </div>

      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="input">Track Complications</TabsTrigger>
          <TabsTrigger value="chart">View History</TabsTrigger>
          <TabsTrigger value="loss">Loss Support</TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-6">
          <Card className={`${settings.darkMode ? 'bg-slate-900 border-slate-700' : ''}`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : ''}`}>
                <Calendar className="w-5 h-5" />
                Track Complications for {selectedDate}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={`${settings.darkMode ? 'bg-slate-800 border-slate-600 text-white' : ''}`}
                />
              </div>
              <ComplicationGrid complications={pregnancyComplications} />
              
              <div className="mt-6">
                <Button onClick={handleSaveComplications} className="w-full bg-red-500 hover:bg-red-600">
                  Save Complications for {selectedDate}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chart" className="space-y-6">
          <Card className={`${settings.darkMode ? 'bg-slate-900 border-slate-700' : ''}`}>
            <CardHeader>
              <CardTitle className={`${settings.darkMode ? 'text-white' : ''}`}>Complications History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-center ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Complications history chart will be displayed here based on your tracked data.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loss" className="space-y-6">
          <Card className={`${settings.darkMode ? 'bg-slate-900 border-slate-700' : 'bg-gradient-to-br from-pink-50 to-purple-50'} border-pink-200`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                <Flower className="w-5 h-5" />
                Pregnancy Loss Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800' : 'bg-white'} border ${settings.darkMode ? 'border-slate-600' : 'border-purple-200'}`}>
                <h3 className={`text-lg font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  Record a Loss
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Type of Loss *
                    </label>
                    <select
                      value={lossData.type}
                      onChange={(e) => setLossData({...lossData, type: e.target.value})}
                      className={`w-full p-2 border rounded-md ${settings.darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-300'}`}
                    >
                      <option value="">Select type of loss</option>
                      {lossTypes.map(lossType => (
                        <option key={lossType.type} value={lossType.type}>{lossType.type}</option>
                      ))}
                    </select>
                    {lossData.type && (
                      <div className={`mt-2 p-2 text-xs rounded ${settings.darkMode ? 'bg-slate-600 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                        {lossTypes.find(lt => lt.type === lossData.type)?.description}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Date *
                      </label>
                      <Input
                        type="date"
                        value={lossData.date}
                        onChange={(e) => setLossData({...lossData, date: e.target.value})}
                        className={`${settings.darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}`}
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Weeks of Pregnancy
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g., 8 weeks, 12w3d"
                        value={lossData.weeks}
                        onChange={(e) => setLossData({...lossData, weeks: e.target.value})}
                        className={`${settings.darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Notes (Optional)
                    </label>
                    <Textarea
                      placeholder="Any additional notes or feelings you'd like to record..."
                      value={lossData.notes}
                      onChange={(e) => setLossData({...lossData, notes: e.target.value})}
                      className={`${settings.darkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}`}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSaveLoss}
                    className={`w-full ${settings.darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'}`}
                  >
                    Save Loss Information
                  </Button>
                </div>
              </div>

              {/* Islamic Comfort Section */}
              <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800' : 'bg-amber-50'} border ${settings.darkMode ? 'border-slate-600' : 'border-amber-200'}`}>
                <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}>
                  <Moon className="w-5 h-5" />
                  Islamic Comfort & Guidance
                </h3>
                <div className="space-y-4">
                  <div className={`p-3 rounded ${settings.darkMode ? 'bg-slate-700' : 'bg-white'} border ${settings.darkMode ? 'border-slate-600' : 'border-amber-200'}`}>
                    <p className={`text-lg font-arabic mb-2 ${settings.darkMode ? 'text-white' : 'text-amber-900'}`}>
                      إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
                    </p>
                    <p className={`text-sm italic ${settings.darkMode ? 'text-gray-300' : 'text-amber-700'}`}>
                      "Indeed we belong to Allah, and indeed to Him we will return."
                    </p>
                    <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-amber-600'}`}>- Quran 2:156</p>
                  </div>
                  
                  <div className={`${settings.darkMode ? 'text-gray-300' : 'text-amber-700'} text-sm space-y-2`}>
                    <p>• Your baby is considered a blessing and will be reunited with you in Jannah</p>
                    <p>• The baby will intercede for the parents on the Day of Judgment</p>
                    <p>• This is a test from Allah, and patience brings great reward</p>
                    <p>• Seek comfort in prayer, dhikr, and support from your community</p>
                  </div>
                </div>
              </div>

              {/* Saved Losses */}
              {savedLosses.length > 0 && (
                <div className={`p-4 rounded-lg ${settings.darkMode ? 'bg-slate-800' : 'bg-gray-50'} border ${settings.darkMode ? 'border-slate-600' : 'border-gray-200'}`}>
                  <h3 className={`text-lg font-semibold mb-3 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Remembered Angels
                  </h3>
                  <div className="space-y-3">
                    {savedLosses.map((loss, index) => (
                      <div key={index} className={`p-3 rounded border ${settings.darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className={`w-4 h-4 ${settings.darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                          <span className={`font-medium ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {loss.type}
                          </span>
                        </div>
                        <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {loss.date} {loss.weeks && `• ${loss.weeks}`}
                        </p>
                        {loss.notes && (
                          <p className={`text-sm mt-2 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {loss.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PregnancyComplications;
