import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OnboardingData } from './OnboardingFlow';
import { useLanguage } from '@/contexts/LanguageContext';

interface PersonalInfoProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onPrevious?: () => void;
}

const PersonalInfo = ({ data, onNext, onPrevious }: PersonalInfoProps) => {
  const [birthMonth, setBirthMonth] = useState(data.birthMonth || '');
  const [birthYear, setBirthYear] = useState(data.birthYear || '');
  const [country, setCountry] = useState(data.country || '');
    const { getLocalizedText } = useLanguage();
  
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
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

const months = [
  { value: '01', label: getLocalizedText('January') },
  { value: '02', label: getLocalizedText('February') },
  { value: '03', label: getLocalizedText('March') },
  { value: '04', label: getLocalizedText('April') },
  { value: '05', label: getLocalizedText('May') },
  { value: '06', label: getLocalizedText('June') },
  { value: '07', label: getLocalizedText('July') },
  { value: '08', label: getLocalizedText('August') },
  { value: '09', label: getLocalizedText('September') },
  { value: '10', label: getLocalizedText('October') },
  { value: '11', label: getLocalizedText('November') },
  { value: '12', label: getLocalizedText('December') }
];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => currentYear - 13 - i);

  const countries = [
  getLocalizedText('Afghanistan'),
  getLocalizedText('Albania'),
  getLocalizedText('Algeria'),
  getLocalizedText('Argentina'),
  getLocalizedText('Australia'),
  getLocalizedText('Austria'),
  getLocalizedText('Bangladesh'),
  getLocalizedText('Belgium'),
  getLocalizedText('Brazil'),
  getLocalizedText('Canada'),
  getLocalizedText('China'),
  getLocalizedText('Colombia'),
  getLocalizedText('Denmark'),
  getLocalizedText('Egypt'),
  getLocalizedText('Ethiopia'),
  getLocalizedText('Finland'),
  getLocalizedText('France'),
  getLocalizedText('Germany'),
  getLocalizedText('Ghana'),
  getLocalizedText('Greece'),
  getLocalizedText('Hungary'),
  getLocalizedText('Iceland'),
  getLocalizedText('India'),
  getLocalizedText('Indonesia'),
  getLocalizedText('Iran'),
  getLocalizedText('Iraq'),
  getLocalizedText('Ireland'),
  getLocalizedText('Israel'),
  getLocalizedText('Italy'),
  getLocalizedText('Japan'),
  getLocalizedText('Jordan'),
  getLocalizedText('Kazakhstan'),
  getLocalizedText('Kenya'),
  getLocalizedText('Kuwait'),
  getLocalizedText('Lebanon'),
  getLocalizedText('Libya'),
  getLocalizedText('Malaysia'),
  getLocalizedText('Mexico'),
  getLocalizedText('Morocco'),
  getLocalizedText('Netherlands'),
  getLocalizedText('New Zealand'),
  getLocalizedText('Nigeria'),
  getLocalizedText('Norway'),
  getLocalizedText('Oman'),
  getLocalizedText('Pakistan'),
  getLocalizedText('Palestine'),
  getLocalizedText('Philippines'),
  getLocalizedText('Poland'),
  getLocalizedText('Portugal'),
  getLocalizedText('Qatar'),
  getLocalizedText('Romania'),
  getLocalizedText('Russia'),
  getLocalizedText('Saudi Arabia'),
  getLocalizedText('Singapore'),
  getLocalizedText('South Africa'),
  getLocalizedText('South Korea'),
  getLocalizedText('Spain'),
  getLocalizedText('Sri Lanka'),
  getLocalizedText('Sweden'),
  getLocalizedText('Switzerland'),
  getLocalizedText('Syria'),
  getLocalizedText('Thailand'),
  getLocalizedText('Tunisia'),
  getLocalizedText('Turkey'),
  getLocalizedText('UAE'),
  getLocalizedText('Uganda'),
  getLocalizedText('Ukraine'),
  getLocalizedText('United Kingdom'),
  getLocalizedText('United States'),
  getLocalizedText('Venezuela'),
  getLocalizedText('Vietnam'),
  getLocalizedText('Yemen'),
  getLocalizedText('Zimbabwe')
  ];

  const handleNext = () => {
    onNext({ birthMonth, birthYear, country });
  };

  const isValid = birthMonth && birthYear && country;

  return (
    <div className={`space-y-6 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className="text-center mb-6">
        <h3 className={`text-lg font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
          {getLocalizedText('intro')}
        </h3>
        <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {getLocalizedText('intro_help')}
        </p>
      </div>

      <div className="space-y-4">
        {/* Birth Month */}
        <div className="space-y-2">
          <Label className={settings.darkMode ? 'text-gray-300' : 'text-gray-700'}>
            {getLocalizedText('birth_month')}
          </Label>
          <Select value={birthMonth} onValueChange={setBirthMonth}>
            <SelectTrigger className={`w-full ${settings.darkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white'}`}>
              <SelectValue placeholder= {getLocalizedText('select_birth_month')}/>
            </SelectTrigger>
            <SelectContent className={settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white'}>
              <ScrollArea className="h-48">
                {months.map((month) => (
                  <SelectItem 
                    key={month.value} 
                    value={month.value}
                    className={settings.darkMode ? 'text-white hover:bg-slate-700' : 'hover:bg-gray-100'}
                  >
                    {month.label}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>

        {/* Birth Year */}
        <div className="space-y-2">
          <Label className={settings.darkMode ? 'text-gray-300' : 'text-gray-700'}>
            {getLocalizedText('birth_year')}
          </Label>
          <Select value={birthYear} onValueChange={setBirthYear}>
            <SelectTrigger className={`w-full ${settings.darkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white'}`}>
              <SelectValue placeholder= {getLocalizedText('select_birth_year')}  />
            </SelectTrigger>
            <SelectContent className={settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white'}>
              <ScrollArea className="h-48">
                {years.map((year) => (
                  <SelectItem 
                    key={year} 
                    value={year.toString()}
                    className={settings.darkMode ? 'text-white hover:bg-slate-700' : 'hover:bg-gray-100'}
                  >
                    {year}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label className={settings.darkMode ? 'text-gray-300' : 'text-gray-700'}>
            {getLocalizedText('country')}
          </Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className={`w-full ${settings.darkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white'}`}>
              <SelectValue placeholder= {getLocalizedText('select_country')} />
            </SelectTrigger>
            <SelectContent className={settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white'}>
              <ScrollArea className="h-48">
                {countries.map((countryName) => (
                  <SelectItem 
                    key={countryName} 
                    value={countryName}
                    className={settings.darkMode ? 'text-white hover:bg-slate-700' : 'hover:bg-gray-100'}
                  >
                    {countryName}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
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
         {getLocalizedText('continue' )}
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfo;
