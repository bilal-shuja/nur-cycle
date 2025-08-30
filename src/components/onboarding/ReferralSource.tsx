import React from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { OnboardingData } from './OnboardingFlow';
import { getLegendProps } from 'recharts/types/util/ChartUtils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ReferralSourceProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onPrevious?: () => void;
  onSkip: () => void;
}

const ReferralSource = ({ data, onNext, onPrevious, onSkip }: ReferralSourceProps) => {
  const [selectedSource, setSelectedSource] = React.useState<string>(
    data.referralSource || ''
  );

   const { getLocalizedText } = useLanguage();
  

  const sourceOptions = [
    getLocalizedText('tiktok'),
  getLocalizedText('instagram'),
  getLocalizedText('friends_family'),
  getLocalizedText('app_store'),
  getLocalizedText('google'),
   getLocalizedText('Other') 
  ];

  const handleNext = () => {
    onNext({ referralSource: selectedSource });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">{getLocalizedText('where_hear')}</h2>
        <p className="text-muted-foreground">
          {getLocalizedText('help_us')}
        </p>
      </div>

      <RadioGroup value={selectedSource} onValueChange={setSelectedSource}>
        <div className="space-y-4">
          {sourceOptions.map((option) => (
            <div key={option} className="flex items-center space-x-3">
              <RadioGroupItem value={option} id={option} />
              <Label
                htmlFor={option}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

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
           {getLocalizedText('complete_setup')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReferralSource;