import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { OnboardingData } from './OnboardingFlow';
import { useLanguage } from '@/contexts/LanguageContext';

interface HormonalExperiencesProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onPrevious?: () => void;
}

const HormonalExperiences = ({ data, onNext, onPrevious }: HormonalExperiencesProps) => {
  const [hormonalExperiences, setHormonalExperiences] = useState<string[]>(
    data.hormonalExperiences || []
  );
  const [physicalExperiences, setPhysicalExperiences] = useState<string[]>(
    data.physicalExperiences || []
  );

  const { getLocalizedText } = useLanguage();

  const hormonalOptions = [
    getLocalizedText('anxiety'),
    getLocalizedText('depression'),
    getLocalizedText('depression'),
    'PMDD',
    getLocalizedText('insomnia'),
    getLocalizedText('Stress'),
    getLocalizedText('bipolar')
  ];



  const physicalOptions = [
    getLocalizedText('Painful periods'),
    getLocalizedText('Irregular periods'),
    getLocalizedText('topics.pms'),
    getLocalizedText('Sudden weight gain/loss'),
    getLocalizedText('Excessive hair'),
    getLocalizedText('acne'),
    getLocalizedText('Migraines'),
    getLocalizedText('Thyroid issues'),
    getLocalizedText('Cystic fibrosis'),
    getLocalizedText('topics.vaginismus')
  ];



  const handleHormonalChange = (option: string, checked: boolean) => {
    if (checked) {
      setHormonalExperiences([...hormonalExperiences, option]);
    } else {
      setHormonalExperiences(hormonalExperiences.filter(item => item !== option));
    }
  };

  const handlePhysicalChange = (option: string, checked: boolean) => {
    if (checked) {
      setPhysicalExperiences([...physicalExperiences, option]);
    } else {
      setPhysicalExperiences(physicalExperiences.filter(item => item !== option));
    }
  };

  const handleNext = () => {
    onNext({
      hormonalExperiences,
      physicalExperiences
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-300">
          {getLocalizedText('select_experiences')}
        </p>
      </div>

      {/* Hormonal Experiences Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {getLocalizedText('hormonal_experiences')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {hormonalOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`hormonal-${option}`}
                checked={hormonalExperiences.includes(option)}
                onCheckedChange={(checked) => handleHormonalChange(option, checked as boolean)}
                className={`
                      border-gray-300 dark:border-slate-600
                      data-[state=checked]:bg-purple-600 
                      data-[state=checked]:border-purple-600 
                      data-[state=checked]:text-white
                    `}
              />
              <label
                htmlFor={`hormonal-${option}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-200"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Physical Experiences Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {getLocalizedText('my_experience')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {physicalOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`physical-${option}`}
                checked={physicalExperiences.includes(option)}
                onCheckedChange={(checked) => handlePhysicalChange(option, checked as boolean)}
                className={`
        border-gray-300 dark:border-slate-600
        data-[state=checked]:bg-purple-600 
        data-[state=checked]:border-purple-600 
        data-[state=checked]:text-white
      `}

              />
              <label
                htmlFor={`physical-${option}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-200"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        {onPrevious && (
          <Button
            onClick={onPrevious}
            variant="outline"
            className="px-6"
          >
            {getLocalizedText('previous')}
          </Button>
        )}
        <div className="flex-1" />
        <Button
          onClick={handleNext}
          className="px-6"
        >
          {getLocalizedText('action.next')}
        </Button>
      </div>
    </div>
  );
};

export default HormonalExperiences;