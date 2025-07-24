
import React, { useState , useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, HelpCircle } from 'lucide-react';
import { OnboardingData } from './OnboardingFlow';

interface MadhabSelectionProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onPrevious?: () => void;
}

const MadhabSelection = ({ data, onNext, onPrevious }: MadhabSelectionProps) => {
  const [selectedMadhhab, setSelectedMadhhab] = useState(data.madhhab || '');

  const madhabOptions = [
    {
      id: 'hanafi',
      name: 'Hanafi',
      description: 'Most widely followed madhhab globally',
      regions: 'Turkey, Central Asia, Indian Subcontinent',
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      id: 'shafii',
      name: "Shafi'i",
      description: 'Prominent in Southeast Asia and East Africa',
      regions: 'Indonesia, Malaysia, East Africa',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'maliki',
      name: 'Maliki',
      description: 'Predominant in North and West Africa',
      regions: 'Morocco, Algeria, West Africa',
      color: 'bg-amber-100 text-amber-700'
    },
    {
      id: 'hanbali',
      name: 'Hanbali',
      description: 'Followed primarily in the Arabian Peninsula',
      regions: 'Saudi Arabia, Qatar, parts of Syria',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      id: 'unknown',
      name: "I don't know",
      description: 'We\'ll show rulings from all major madhhabs',
      regions: 'Comparative Islamic jurisprudence',
      color: 'bg-gray-100 text-gray-700'
    }
  ];

  
    const [settings, setSettings] = useState({
      // Notifications
      periodReminders: true,
      ovulationAlerts: true,
      symptomsTracking: false,
      dailyCheckIns: true,
      latePerodAlerts: true,
      fertilityInsights: true,
      medicationReminders: false,
      appointmentReminders: true,
      cycleAnalysis: true,
      // Privacy
      biometricLock: false,
      passcodeRequired: false,
      hideFromRecents: false,
      incognitoMode: false,
      dataEncryption: true,
      locationTracking: false,
      crashReporting: true,
      // Display
      darkMode: false,
      compactView: false,
      showEmojis: true,
      colorfulTheme: true,
      highContrast: false,
      fontSize: 'medium',
      // Data
      autoBackup: true,
      syncEnabled: true,
      offlineMode: false,
      dataExport: true,
      // Advanced
      developerMode: false,
      betaFeatures: false,
      analytics: true
    });
    
  
    useEffect(() => {
      
      // Load saved settings with comprehensive state management
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
          console.log('Settings loaded:', parsedSettings);
        } catch (error) {
          console.error('Error loading settings:', error);
        }
      }
      else {
      // Agar kuch save nahi hai, toh default light mode lagaye:
      document.documentElement.classList.remove('dark');
    }
  
      // Apply dark mode immediately if enabled:
  
      // const isDarkMode = savedSettings ? JSON.parse(savedSettings).darkMode : false;
      // if (isDarkMode) {
      //   document.documentElement.classList.add('dark');
      // }
  
  
    }, []);

  const handleNext = () => {
    onNext({ madhhab: selectedMadhhab });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center space-x-2">
          <BookOpen className="w-5 h-5 text-purple-600" />
          {/* <p className="text-gray-600">
            This helps us provide accurate Islamic guidance for your situation
          </p> */}
          <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
  This helps us provide accurate Islamic guidance for your situation
</p>
          
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <HelpCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-blue-800 text-sm">
              A madhhab is a school of Islamic jurisprudence. Each has slightly different rulings 
              on issues like minimum menstruation days or nifas duration.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {madhabOptions.map((option) => (
          // <Card 
          //   key={option.id}
          //   className={`cursor-pointer transition-all duration-200 ${
          //     selectedMadhhab === option.id 
          //       ? 'ring-2 ring-purple-500 border-purple-200' 
          //       : 'hover:border-purple-200'
          //   }`}
          //   onClick={() => setSelectedMadhhab(option.id)}
          // >
          //   <CardContent className="p-4">
          //     <div className="flex items-center justify-between">
          //       <div className="space-y-1">
          //         <div className="flex items-center space-x-3">
          //           <Badge className={option.color}>
          //             {option.name}
          //           </Badge>
          //           {selectedMadhhab === option.id && (
          //             <Badge className="bg-purple-100 text-purple-700">Selected</Badge>
          //           )}
          //         </div>
          //         <p className="text-sm text-gray-600">{option.description}</p>
          //         <p className="text-xs text-gray-500">{option.regions}</p>
          //       </div>
          //     </div>
          //   </CardContent>
          // </Card>

          <Card
  key={option.id}
  // className="relative overflow-hidden card-3d"

    className={`relative overflow-hidden card-3d cursor-pointer ${
              selectedMadhhab === option.id 
                ? 'ring-2 ring-purple-500 border-purple-200' 
                : 'hover:border-purple-200'
            }`}
            onClick={() => setSelectedMadhhab(option.id)}
>
  {/* Overlay layer for dark mode */}
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : '   from-purple-500 to-purple-700'}`}></div>

  <CardContent className="relative z-10 p-4">
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <div className="flex items-center space-x-3">
          {/* Badge with conditional color */}
          <Badge className={`text-xs ${settings.darkMode ? 'bg-gray-600 text-white' : option.color}`}>
            {option.name}
          </Badge>
          
          {selectedMadhhab === option.id && (
            <Badge className="bg-purple-100 text-purple-700">Selected</Badge>
          )}
        </div>
        
        {/* Description and regions with conditional text color */}
        <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{option.description}</p>
        <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-400'}`}>{option.regions}</p>
      </div>
    </div>
  </CardContent>
</Card>

        ))}
      </div>

      <div className="flex gap-3 justify-between">
        {onPrevious && (
          <Button variant="outline" onClick={onPrevious}>
            Previous
          </Button>
        )}
        <Button 
          onClick={handleNext}
          disabled={!selectedMadhhab}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 ml-auto"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default MadhabSelection;
