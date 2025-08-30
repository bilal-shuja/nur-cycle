import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { OnboardingData } from './OnboardingFlow';
import { useLanguage } from '@/contexts/LanguageContext';

interface SpiritualGuidanceProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onPrevious?: () => void;
  onSkip: () => void;
}

const SpiritualGuidance = ({ data, onNext, onPrevious, onSkip }: SpiritualGuidanceProps) => {
  const [selectedGuidance, setSelectedGuidance] = React.useState<string[]>(
    data.spiritualGuidance || []
  );

    const { getLocalizedText } = useLanguage();

  const guidanceOptions = [
 getLocalizedText('know_praying_fasting'),
  getLocalizedText('how_ghusl'),
  getLocalizedText('when_period_ends'),
  getLocalizedText('irregular_bleeding'),
  getLocalizedText('worship_bleeding'),
  getLocalizedText('understanding_deen'),
  getLocalizedText('after_birth'),
  getLocalizedText('connecting_body'),
  getLocalizedText('connecting_spouse')
  ];

  const handleGuidanceChange = (option: string, checked: boolean) => {
    if (checked) {
      setSelectedGuidance([...selectedGuidance, option]);
    } else {
      setSelectedGuidance(selectedGuidance.filter(item => item !== option));
    }
  };

  const handleNext = () => {
    onNext({ spiritualGuidance: selectedGuidance });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2 dark:text-white">{getLocalizedText('spiritual_guidance')}</h2>
        <p className="text-muted-foreground dark:text-white">
         {getLocalizedText('select_guidance')}
        </p>
      </div>

      <div className="space-y-4">
        {guidanceOptions.map((option) => (
          <div key={option} className="flex items-center space-x-3">
            <Checkbox
              id={option}
              checked={selectedGuidance.includes(option)}
              onCheckedChange={(checked) => handleGuidanceChange(option, checked as boolean)}
                              className={`
        border-gray-300 dark:border-slate-600
        data-[state=checked]:bg-purple-600 
        data-[state=checked]:border-purple-600 
        data-[state=checked]:text-white
      `}
            
            />
            <Label
              htmlFor={option}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer dark:text-white"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <div>
          {onPrevious && (
            <Button variant="outline" onClick={onPrevious}>
              {getLocalizedText('previous')}
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onSkip}>
           {getLocalizedText('skip')}
          </Button>
          <Button onClick={handleNext}>
             {getLocalizedText('continue' )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpiritualGuidance;