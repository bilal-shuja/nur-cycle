import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { OnboardingData } from './OnboardingFlow';
import { useLanguage } from '@/contexts/LanguageContext';

interface EthnicitySelectionProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onPrevious?: () => void;
}

const EthnicitySelection = ({ data, onNext, onPrevious }: EthnicitySelectionProps) => {
  const [selectedEthnicity, setSelectedEthnicity] = useState(data.ethnicity || '');
  const [otherEthnicity, setOtherEthnicity] = useState(data.otherEthnicity || '');
      const { getLocalizedText } = useLanguage();
  
  const [settings, setSettings] = useState({
    darkMode: false,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('nurcycle-app-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsedSettings }));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const ethnicityOptions = [
  getLocalizedText('arab'),
  getLocalizedText('asian'),
  getLocalizedText('black_african'),
  getLocalizedText('caribbean_black'),
  getLocalizedText('south_asian'),
  getLocalizedText('east_asian'),
  getLocalizedText('oriental'),
  getLocalizedText('pacific_islander'),
  getLocalizedText('hispanic_latino'),
  getLocalizedText('middle_eastern'),
  getLocalizedText('native'),
  getLocalizedText('white_caucasian'),
  getLocalizedText('mixed_multiracial'),
  getLocalizedText('prefer_not_say'),
  getLocalizedText('Other')
  ];

  const handleNext = () => {
    const ethnicityData = {
      ethnicity: selectedEthnicity,
      ...(selectedEthnicity === 'Other' && { otherEthnicity })
    };
    onNext(ethnicityData);
  };

  const isValid = selectedEthnicity && (selectedEthnicity !== 'Other' || (selectedEthnicity === 'Other' && otherEthnicity.trim()));

  return (
    <div className={`space-y-6 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className="text-center mb-6">
        <h3 className={`text-lg font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
        {getLocalizedText('ethnicity')}
        </h3>
        <p className={`text-sm ${settings.darkMode ? 'text-gray-100' : 'text-gray-600'}`}>
          {getLocalizedText('ethnicity_help')}
        </p>
      </div>

      <div className="space-y-4">
        <RadioGroup value={selectedEthnicity} onValueChange={setSelectedEthnicity}>
          <div className="space-y-3">
            {ethnicityOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option} 
                  id={option}
                  className={settings.darkMode ? 'border-slate-600' : ''}
                />
                <Label 
                  htmlFor={option}
                  className={`text-sm cursor-pointer ${settings.darkMode ? 'text-gray-100' : 'text-gray-700'}`}
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        {selectedEthnicity === 'Other' && (
          <div className="mt-4 space-y-2">
            <Label className={settings.darkMode ? 'text-gray-300' : 'text-gray-700'}>
              {getLocalizedText('please_specify')}
            </Label>
            <Input
              type="text"
              value={otherEthnicity}
              onChange={(e) => setOtherEthnicity(e.target.value)}
              placeholder={getLocalizedText('enter_ethnicity')}
              className={`w-full ${settings.darkMode ? 'bg-slate-800 border-slate-600 text-white placeholder:text-gray-400' : 'bg-white'}`}
            />
          </div>
        )}
      </div>

      <div className="flex gap-3 justify-between pt-4">
        {onPrevious && (
          <Button 
            variant="outline" 
            onClick={onPrevious}
            className={settings.darkMode ? 'border-slate-600 text-white hover:bg-slate-700' : ''}
          >
            {getLocalizedText('previous')}
          </Button>
        )}
        <Button 
          onClick={handleNext}
          disabled={!isValid}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 ml-auto"
        >
          {getLocalizedText('continue')}
        </Button>
      </div>
    </div>
  );
};

export default EthnicitySelection;