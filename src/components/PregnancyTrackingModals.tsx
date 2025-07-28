
import React, { useRef, useState, cloneElement, isValidElement, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';


interface WeightTrackingModalProps {
  children: React.ReactNode;
  setSavedWeight: React.Dispatch<
    React.SetStateAction<{
      weight: number;
      unit: string;
      date: string;
    } | null>
  >;
}

export const WeightTrackingModal =({
  children,
  setSavedWeight,
}:  WeightTrackingModalProps) => {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('lbs');
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
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

  const handleOpen = () => {
    triggerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setIsOpen(true), 300); // Delay to allow scroll
  };


  const handleSave = () => {
    if (!weight) {
      toast.error(getLocalizedText('please.enter.your.weight') );
      return;
    }

    const weightValue = parseFloat(weight);
    if (isNaN(weightValue)) {
      toast.error( getLocalizedText('please.enter.valid.weight'));
      return;
    }

    const savedData = {
      weight: weightValue,
      unit,
      date: new Date().toISOString(),
    };

    localStorage.setItem('pregnancy-weight', JSON.stringify(savedData));
    setSavedWeight(savedData)
    toast.success(getLocalizedText('weight.updated')+` ${weight} ${unit}`);
    setIsOpen(false);
    setWeight('');
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
    className={`sm:max-w-md p-6 rounded-xl sm:rounded-xl md:rounded-xl ${
      settings.darkMode ? 'bg-slate-900' : 'bg-white'
    }`}
    style={{ marginTop: "40em" }}
  >
    <DialogHeader>
      <DialogTitle
        className={settings.darkMode ? 'text-white' : 'text-gray-900'}
      >
      {getLocalizedText('update.weight')}
      </DialogTitle>
    </DialogHeader>

    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label
          htmlFor="weight"
          className={settings.darkMode ? 'text-white' : 'text-gray-900'}
        >
        {getLocalizedText('current.weight')}
        </Label>
        <Input
          id="weight"
          type="number"
          step="0.1"
          placeholder="150"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className={`${
            settings.darkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'
          }`}
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="unit"
          className={settings.darkMode ? 'text-white' : 'text-gray-900'}
        >
         {getLocalizedText('unit')}
        </Label>
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            className={`w-full justify-between text-left ${
              settings.darkMode ? 'bg-slate-800' : 'bg-purple-100'
            } hover:bg-purple-200`}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {unit === 'lbs' ? 'Pounds (lbs)' : 'Kilograms (kg)'}
            <ChevronDown className="w-4 h-4" />
          </Button>
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50">
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  setUnit('lbs');
                  setShowDropdown(false);
                }}
              >
                {getLocalizedText('pounds')}
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  setUnit('kg');
                  setShowDropdown(false);
                }}
              >
              {getLocalizedText('kilograms')}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex space-x-2 pt-4">
        <Button
          onClick={handleSave}
          className={`flex-1 ${settings.darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800'}`}
        >
         {getLocalizedText('update.weight')}
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsOpen(false)}
          className="flex-1"
        >
          {getLocalizedText('cancel')}
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

  );
};


interface HeartbeatModalProps {
  children: React.ReactNode;
  setSavedHeartBeat: React.Dispatch<
    React.SetStateAction<{
      heartRate: number;
      date: string;
    } | null>
  >;
}
export const HeartbeatModal = ({
  children,
  setSavedHeartBeat,
}: HeartbeatModalProps) => {
  const [heartRate, setHeartRate] = useState('');
  const [isOpen, setIsOpen] = useState(false);
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
    setTimeout(() => setIsOpen(true), 300); // Delay to allow scroll
  };


  const handleSave = () => {
    if (!heartRate) {
      toast.error( getLocalizedText('please.enter.babys.heart.rate'));
      return;
    }

    const rate = parseInt(heartRate);
    if (isNaN(rate) || rate < 100 || rate > 200) {
      toast.error(getLocalizedText('please.enter.valid.heart.rate'));
      return;
    }

    const savedData = {
      heartRate: rate,
      date: new Date().toISOString(),
    };

    localStorage.setItem('pregnancy-heartbeat', JSON.stringify(savedData));
    setSavedHeartBeat(savedData)
    toast.success(  `${ getLocalizedText('babys.heartbeat.recorded')} ${heartRate} bpm`);
    setIsOpen(false);
    setHeartRate('');
  };

  return (


    <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    {isValidElement(children)
      ? cloneElement(children as React.ReactElement, {
          onClick: handleOpen,
          ref: triggerRef, // ✅ But only if children supports forwardRef!
        })
      : children}
  </DialogTrigger>

  <DialogContent
    className={`sm:max-w-md p-6 rounded-xl sm:rounded-xl md:rounded-xl ${
      settings.darkMode ? 'bg-slate-900' : 'bg-white'
    }`}
    style={{ marginTop: '55em' }}
  >
    <DialogHeader>
      <DialogTitle className={settings.darkMode ? 'text-white' : 'text-gray-900'}>
         {getLocalizedText('record.babys.heartbeat')}
      </DialogTitle>
    </DialogHeader>
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label
          htmlFor="heartrate"
          className={settings.darkMode ? 'text-white' : 'text-gray-900'}
        >
          {getLocalizedText('heart.rate.bpm')}
        </Label>
        <Input
          id="heartrate"
          type="number"
          placeholder="150"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          className={`${
            settings.darkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'
          }`}
        />
      </div>

      <div className="flex space-x-2 pt-4">
        <Button
          onClick={handleSave}
          className={`flex-1 ${
            settings.darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800'
          }`}
        >
           {getLocalizedText('record.rate')}
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsOpen(false)}
          className="flex-1"
        >
          {getLocalizedText('cancel')}
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

  );
};


interface KickCounterModal {
  children: React.ReactNode;
  setSavedKicks: React.Dispatch<
    React.SetStateAction<{
      kicks: number;
      date: string;
    } | null>
  >;
}
export const KickCounterModal = ({ children, setSavedKicks }: KickCounterModal) => {
  const [kickCount, setKickCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
    const { getLocalizedText } = useLanguage();

  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleOpen = () => {
    triggerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setIsOpen(true), 300); // Delay to allow scroll
  };

  
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


  const handleAddKick = () => {
    setKickCount(prev => prev + 1);
  };

  const handleSave = () => {
    const savedData = {
      kicks: kickCount,
      date: new Date().toISOString(),
    };

    localStorage.setItem('pregnancy-kicks', JSON.stringify(savedData));
    setSavedKicks(savedData)
    toast.success(` ${getLocalizedText('kick.count.saved')}${kickCount} ${getLocalizedText('kicks.today')}`);
    setIsOpen(false);
    setKickCount(0);
  };

  const handleReset = () => {
    setKickCount(0);
  };

  return (

    <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    {isValidElement(children)
      ? cloneElement(children as React.ReactElement, {
          onClick: handleOpen,
          ref: triggerRef, // ✅ But only if children supports forwardRef!
        })
      : children}
  </DialogTrigger>

  <DialogContent
    className={`sm:max-w-md p-6 rounded-xl sm:rounded-xl md:rounded-xl ${
      settings.darkMode ? 'bg-slate-900' : 'bg-white'
    }`}
    style={{ marginTop: '55em' }}
  >
    <DialogHeader>
      <DialogTitle
        className={settings.darkMode ? 'text-white' : 'text-gray-900'}
      >
       {getLocalizedText('count.babys.kicks')}
      </DialogTitle>
    </DialogHeader>
    <div className="space-y-6 pt-4">
      <div className="text-center">
        <div
          className={`text-6xl font-bold ${
            settings.darkMode ? 'text-purple-400' : 'text-purple-600'
          } mb-2`}
        >
          {kickCount}
        </div>
        <p className={`text-gray-600 ${settings.darkMode ? 'text-gray-300' : ''}`}>
          {getLocalizedText('kicks.counted.today')}
        </p>
      </div>

      <div className="flex space-x-2">
        <Button
          onClick={handleAddKick}
          className={`flex-1 ${settings.darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'}`}
        >
          + {getLocalizedText('count.kick')}
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex-1"
        >{getLocalizedText('reset')}
        </Button>
      </div>

      <div className="flex space-x-2 pt-4">
        <Button onClick={handleSave} className="flex-1">
        {getLocalizedText('save.count')}
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsOpen(false)}
          className="flex-1"
        >
        {getLocalizedText('cancel')}
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

  );
};
