
import React, {useRef,  useState, cloneElement, isValidElement , useEffect} from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';



interface TemperatureModalProps {
  children: React.ReactNode;
  setSavedTemperature: React.Dispatch<
    React.SetStateAction<{
        temperature: number;
    unit: string;
    date: string;
    } | null>
  >;
}

export const TemperatureModal = ({ children , setSavedTemperature }: TemperatureModalProps) => {
  const [temperature, setTemperature] = useState('');
  const [unit, setUnit] = useState('fahrenheit');
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

    const { getLocalizedText } = useLanguage();


  
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
        } catch (error) {
          console.error('Error loading settings:', error);
        }
      }
      else {
      document.documentElement.classList.remove('dark');
    }

  
    }, []);

 const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleOpen = () => {
    triggerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setIsOpen(true), 300); // Delay to allow scroll
  };

  const handleSave = () => {
    if (!temperature) {
      toast.error(getLocalizedText('please.enter.temperature') );
      return;
    }

    const tempValue = parseFloat(temperature);
    if (isNaN(tempValue)) {
      toast.error( getLocalizedText('please.enter.valid.temperature') );
      return;
    }

    // Save temperature to storage/database
    const savedData = {
      temperature: tempValue,
      unit,
      date: new Date().toISOString(),
    };

    localStorage.setItem('fertility-temperature', JSON.stringify(savedData));
    setSavedTemperature(savedData)
    toast.success(`${getLocalizedText('temperature.logged')} ${temperature}°${unit === 'fahrenheit' ? 'F' : 'C'}`);
    setIsOpen(false);
    setTemperature('');
  };




  return (

  <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    {isValidElement(children) 
      ? cloneElement(children as React.ReactElement, {
          onClick: handleOpen,
          ref: triggerRef,
        })
      : children}
  </DialogTrigger>

  <DialogContent className={`sm:max-w-md ${settings.darkMode ? 'bg-slate-900' : 'bg-white'} rounded-xl sm:rounded-xl md:rounded-xl`}>
    <DialogHeader>
      <DialogTitle className={settings.darkMode ? 'text-white' : 'text-gray-900'}>{getLocalizedText('log.basal.body.temperature')}</DialogTitle>
    </DialogHeader>
    <div className="space-y-4 pt-4">
      {/* Temperature Field */}
      <div className="space-y-2">
        <Label htmlFor="temperature" className={settings.darkMode ? 'text-white' : 'text-gray-900'}>{getLocalizedText('temperature')}</Label>
        <Input
          id="temperature"
          type="number"
          step="0.1"
          placeholder="98.6"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className={`w-full ${settings.darkMode ? 'bg-slate-800 text-white' : 'bg-gray-50 text-gray-900'} focus:outline-none p-2 rounded-md`}
        />
      </div>

      {/* Unit Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="unit" className={settings.darkMode ? 'text-white' : 'text-gray-900'}>Unit</Label>
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            className={`w-full justify-between text-left ${settings.darkMode ? 'bg-slate-800' : 'bg-purple-100'} hover:bg-purple-200`}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {unit === 'fahrenheit' ? getLocalizedText('fahrenheit'): getLocalizedText('celsius')}
            <ChevronDown className="w-4 h-4" />
          </Button>
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50">
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  setUnit('fahrenheit');
                  setShowDropdown(false);
                }}
              >
                {getLocalizedText('fahrenheit')} (°F)
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  setUnit('celsius');
                  setShowDropdown(false);
                }}
              >
                {getLocalizedText('celsius')} (°C)
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 pt-4">
        <Button
          onClick={handleSave}
          className={`flex-1 ${settings.darkMode ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800'}`}
        >
          {getLocalizedText('save.temperature')}
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsOpen(false)}
          className={`flex-1 ${settings.darkMode ? 'text-white' : 'text-gray-500'}`}
        >
         {getLocalizedText('cancel')}
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

  );
};


interface CervicalMucusModal {
  children: React.ReactNode;
  setSavedMucus: React.Dispatch<
    React.SetStateAction<{
    mucusType: string;
    date: string;
    } | null>
  >;
}
export const CervicalMucusModal = ({ children, setSavedMucus }:  CervicalMucusModal ) => {
  const [mucusType, setMucusType] = useState('');
  const [isOpen, setIsOpen] = useState(false);

      const { getLocalizedText } = useLanguage();


  const [showMucusDropdown, setShowMucusDropdown] = useState(false);

   const triggerRef = useRef<HTMLButtonElement | null>(null);

   
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
        } catch (error) {
          console.error('Error loading settings:', error);
        }
      }
      else {
      document.documentElement.classList.remove('dark');
    }

  
    }, []);

  const handleOpen = () => {
    triggerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setIsOpen(true), 300); // Delay to allow scroll
  };


  // Helper function to get display text for mucus type
  const getMucusTypeDisplay = (value: string) => {
    switch (value) {
      case 'Dry': return 'Dry';
      case 'Sticky': return 'Sticky';
      case 'Creamy': return 'Creamy';
      case 'Watery': return 'Watery';
      case 'Egg-white': return 'Egg White (Fertile)';
      default: return getLocalizedText('select.mucus.type');
    }
  };

  const handleSave = () => {
    if (!mucusType) {
      toast.error(getLocalizedText('please.select.mucus.type') );
      return;
    }
    const savedData = {
      mucusType,
      date: new Date().toISOString(),
    };

    localStorage.setItem('fertility-mucus', JSON.stringify(savedData));
    setSavedMucus(savedData)
    toast.success(`${getLocalizedText('cervical.mucus.updated')} Cervical mucus updated: ${mucusType}`);
    setIsOpen(false);
    setMucusType('');
  };

  return (

  <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    {isValidElement(children) 
      ? cloneElement(children as React.ReactElement, {
          onClick: handleOpen,
          ref: triggerRef, 
        })
      : children}
  </DialogTrigger>
  
  <DialogContent 
    className={`sm:max-w-md mt-60 ${settings.darkMode ? 'bg-slate-900' : 'bg-white'} rounded-xl sm:rounded-xl md:rounded-xl`}
  >
    <DialogHeader>
      <DialogTitle className={settings.darkMode ? 'text-white' : 'text-gray-900'}>
       {getLocalizedText('update.cervical.mucus')}
      </DialogTitle>
    </DialogHeader>

    <div className="space-y-4 pt-4">
      {/* Mucus Type Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="mucus" className={settings.darkMode ? 'text-white' : 'text-gray-900'}>{getLocalizedText('mucus.type')}</Label>
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            className={`w-full justify-between text-left ${settings.darkMode ? 'bg-slate-800' : 'bg-purple-100'} hover:bg-purple-200`}
            onClick={() => setShowMucusDropdown(!showMucusDropdown)}
          >
            {getMucusTypeDisplay(mucusType)}
            <ChevronDown className="w-4 h-4" />
          </Button>
          {showMucusDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50">
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => { setMucusType('Dry'); setShowMucusDropdown(false); }}
              >
                {getLocalizedText('dry')}
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => { setMucusType('Sticky'); setShowMucusDropdown(false); }}
              >
                {getLocalizedText('sticky')}
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => { setMucusType('Creamy'); setShowMucusDropdown(false); }}
              >
                {getLocalizedText('creamy')}
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => { setMucusType('Watery'); setShowMucusDropdown(false); }}
              >
               {getLocalizedText('watery')}
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => { setMucusType('Egg-white'); setShowMucusDropdown(false); }}
              >
                {getLocalizedText('egg.white.fertile')}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 pt-4">
        <Button 
          onClick={handleSave} 
          className={`flex-1 ${settings.darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800'}`}
        >
          {getLocalizedText('update.status')}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setIsOpen(false)} 
          className={`flex-1 ${settings.darkMode ? 'text-white' : 'text-gray-500'}`}
        >
           {getLocalizedText('cancel')}
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

  );
};

interface CervixPositionModal {
  children: React.ReactNode;
  setSavedCervix: React.Dispatch<
    React.SetStateAction<{
       position: string;
    firmness: string;
    date: string;
    } | null>
  >;
}

export const CervixPositionModal = ({ children , setSavedCervix }: CervixPositionModal) => {
  const [position, setPosition] = useState('');
  const [firmness, setFirmness] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [showFirmnessDropdown, setShowFirmnessDropdown] = useState(false);

      const { getLocalizedText } = useLanguage();


  const triggerRef = useRef<HTMLButtonElement | null>(null);

  
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
        } catch (error) {
          console.error('Error loading settings:', error);
        }
      }
      else {
      document.documentElement.classList.remove('dark');
    }

  
    }, []);

  const handleOpen = () => {
    triggerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setIsOpen(true), 300); 
  };


  const getPositionDisplay = (value: string) => {
    switch (value) {
      case 'Low': return 'Low';
      case 'Medium': return 'Medium';
      case 'High (Fertile)': return 'High (Fertile)';
      default: return getLocalizedText('select.position');
    }
  };

  const getFirmnessDisplay = (value: string) => {
    switch (value) {
      case 'firm': return 'Firm';
      case 'medium': return 'Medium';
      case 'soft': return 'Soft (Fertile)';
      default: return getLocalizedText('select.firmness');
    }
  };


  const handleSave = () => {
    if (!position || !firmness) {
      toast.error( getLocalizedText('please.select.both.position.and.firmness') );
      return;
    }

    const savedData = {
      position,
      firmness,
      date: new Date().toISOString(),
    };

    localStorage.setItem('fertility-cervix', JSON.stringify(savedData));
    toast.success(`${getLocalizedText('cervix.data.recorded')} ${position}, ${firmness}`);
    setSavedCervix(savedData)
    setIsOpen(false);
    setPosition('');
    setFirmness('');
  };

  return (



  <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    {isValidElement(children)
      ? cloneElement(children as React.ReactElement, {
          onClick: handleOpen,
          ref: triggerRef,
        })
      : children}
  </DialogTrigger>
  
  <DialogContent 
    className={`sm:max-w-md mt-56 xs:mt-96 ${settings.darkMode ? 'bg-slate-900' : 'bg-white'} rounded-xl sm:rounded-xl md:rounded-xl`}
  >
    <DialogHeader>
      <DialogTitle className={settings.darkMode ? 'text-white' : 'text-gray-900'}>
         {getLocalizedText('record.cervix.position')}
      </DialogTitle>
    </DialogHeader>

    <div className="space-y-4 pt-4">
      {/* Position Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="position" className={settings.darkMode ? 'text-white' : 'text-gray-900'}>
          {getLocalizedText('position')}
        </Label>
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            className={`w-full justify-between text-left ${settings.darkMode ? 'bg-slate-800' : 'bg-purple-100'} hover:bg-purple-200`}
            onClick={() => setShowPositionDropdown(!showPositionDropdown)}
          >
            {getPositionDisplay(position)}
            <ChevronDown className="w-4 h-4" />
          </Button>
          {showPositionDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50">
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  setPosition('Low');
                  setShowPositionDropdown(false);
                }}
              >
                {getLocalizedText('low')}
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  setPosition('Medium');
                  setShowPositionDropdown(false);
                }}
              >
                 {getLocalizedText('medium')}
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  setPosition('High (Fertile)');
                  setShowPositionDropdown(false);
                }}
              >
                {getLocalizedText('high.fertile')}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Firmness Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="firmness" className={settings.darkMode ? 'text-white' : 'text-gray-900'}>
           {getLocalizedText('firmness')}
        </Label>
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            className={`w-full justify-between text-left ${settings.darkMode ? 'bg-slate-800' : 'bg-pink-100'} hover:bg-pink-200`}
            onClick={() => setShowFirmnessDropdown(!showFirmnessDropdown)}
          >
            {getFirmnessDisplay(firmness)}
            <ChevronDown className="w-4 h-4" />
          </Button>
          {showFirmnessDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50">
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  setFirmness('firm');
                  setShowFirmnessDropdown(false);
                }}
              >
                {getLocalizedText('firm')}
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  setFirmness('medium');
                  setShowFirmnessDropdown(false);
                }}
              >
                 {getLocalizedText('medium')}
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  setFirmness('soft');
                  setShowFirmnessDropdown(false);
                }}
              >
                {getLocalizedText('soft.fertile')}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 pt-4">
        <Button 
          onClick={handleSave} 
          className={`flex-1 ${settings.darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800'}`}
        >
        {getLocalizedText('record.data')}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setIsOpen(false)} 
          className={`flex-1 ${settings.darkMode ? 'text-white' : 'text-gray-500'}`}
        >
           {getLocalizedText('cancel')}
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

  );
};
