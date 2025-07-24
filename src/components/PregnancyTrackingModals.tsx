
import React, { useRef, useState, cloneElement, isValidElement, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ChevronDown } from 'lucide-react';


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

  const handleOpen = () => {
    triggerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setIsOpen(true), 300); // Delay to allow scroll
  };


  const handleSave = () => {
    if (!weight) {
      toast.error("Please enter your weight");
      return;
    }

    const weightValue = parseFloat(weight);
    if (isNaN(weightValue)) {
      toast.error("Please enter a valid weight");
      return;
    }

    const savedData = {
      weight: weightValue,
      unit,
      date: new Date().toISOString(),
    };

    localStorage.setItem('pregnancy-weight', JSON.stringify(savedData));
    setSavedWeight(savedData)
    toast.success(`Weight updated: ${weight} ${unit}`);
    setIsOpen(false);
    setWeight('');
  };

  return (
    // <Dialog open={isOpen} onOpenChange={setIsOpen}>
    //   <DialogTrigger asChild>
    //     {isValidElement(children)
    //       ? cloneElement(children as React.ReactElement, {
    //         onClick: handleOpen,
    //         ref: triggerRef, 
    //       })
    //       : children}
    //   </DialogTrigger>
    //   <DialogContent className="sm:max-w-md bg-white p-6 rounded-xl sm:rounded-xl md:rounded-xl" style={{ marginTop: "40em" }}>
    //     <DialogHeader>
    //       <DialogTitle>Update Weight</DialogTitle>
    //     </DialogHeader>
    //     <div className="space-y-4 pt-4">
    //       <div className="space-y-2">
    //         <Label htmlFor="weight">Current Weight</Label>
    //         <Input
    //           id="weight"
    //           type="number"
    //           step="0.1"
    //           placeholder="150"
    //           value={weight}
    //           onChange={(e) => setWeight(e.target.value)}
    //         />
    //       </div>

    //       <div className="space-y-2">
    //         <Label htmlFor="unit">Unit</Label>
    //         <div className="relative">
    //           <Button
    //             type="button"
    //             variant="outline"
    //             className="w-full justify-between text-left"
    //             onClick={() => setShowDropdown(!showDropdown)}
    //           >
    //             {unit === 'lbs' ? 'Pounds (lbs)' : 'Kilograms (kg)'}
    //             <ChevronDown className="w-4 h-4" />
    //           </Button>
    //           {showDropdown && (
    //             <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50">
    //               <div
    //                 className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
    //                 onClick={() => {
    //                   setUnit('lbs');
    //                   setShowDropdown(false);
    //                 }}
    //               >
    //                 Pounds (lbs)
    //               </div>
    //               <div
    //                 className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
    //                 onClick={() => {
    //                   setUnit('kg');
    //                   setShowDropdown(false);
    //                 }}
    //               >
    //                 Kilograms (kg)
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //       <div className="flex space-x-2 pt-4">
    //         <Button onClick={handleSave} className="flex-1">
    //           Update Weight
    //         </Button>
    //         <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
    //           Cancel
    //         </Button>
    //       </div>
    //     </div>
    //   </DialogContent>
    // </Dialog>

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
        Update Weight
      </DialogTitle>
    </DialogHeader>

    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label
          htmlFor="weight"
          className={settings.darkMode ? 'text-white' : 'text-gray-900'}
        >
          Current Weight
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
          Unit
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
                Pounds (lbs)
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  setUnit('kg');
                  setShowDropdown(false);
                }}
              >
                Kilograms (kg)
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
          Update Weight
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsOpen(false)}
          className="flex-1"
        >
          Cancel
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

  const handleOpen = () => {
    triggerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setIsOpen(true), 300); // Delay to allow scroll
  };


  const handleSave = () => {
    if (!heartRate) {
      toast.error("Please enter baby's heart rate");
      return;
    }

    const rate = parseInt(heartRate);
    if (isNaN(rate) || rate < 100 || rate > 200) {
      toast.error("Please enter a valid heart rate (100-200 bpm)");
      return;
    }

    const savedData = {
      heartRate: rate,
      date: new Date().toISOString(),
    };

    localStorage.setItem('pregnancy-heartbeat', JSON.stringify(savedData));
    setSavedHeartBeat(savedData)
    toast.success(`Baby's heartbeat recorded: ${heartRate} bpm`);
    setIsOpen(false);
    setHeartRate('');
  };

  return (

    // <Dialog open={isOpen} onOpenChange={setIsOpen}>
    //   <DialogTrigger asChild>
    //     {isValidElement(children)
    //       ? cloneElement(children as React.ReactElement, {
    //         onClick: handleOpen,
    //         ref: triggerRef, 
    //       })
    //       : children}
    //   </DialogTrigger>
    //   <DialogContent className="sm:max-w-md bg-white p-6 rounded-xl sm:rounded-xl md:rounded-xl" style={{ marginTop: "55em" }}>
    //     <DialogHeader>
    //       <DialogTitle>Record Baby's Heartbeat</DialogTitle>
    //     </DialogHeader>
    //     <div className="space-y-4 pt-4">
    //       <div className="space-y-2">
    //         <Label htmlFor="heartrate">Heart Rate (BPM)</Label>
    //         <Input
    //           id="heartrate"
    //           type="number"
    //           placeholder="150"
    //           value={heartRate}
    //           onChange={(e) => setHeartRate(e.target.value)}
    //         />
    //       </div>

    //       <div className="flex space-x-2 pt-4">
    //         <Button onClick={handleSave} className="flex-1">
    //           Record Rate
    //         </Button>
    //         <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
    //           Cancel
    //         </Button>
    //       </div>
    //     </div>
    //   </DialogContent>

    // </Dialog>
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
        Record Baby's Heartbeat
      </DialogTitle>
    </DialogHeader>
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label
          htmlFor="heartrate"
          className={settings.darkMode ? 'text-white' : 'text-gray-900'}
        >
          Heart Rate (BPM)
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
          Record Rate
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsOpen(false)}
          className="flex-1"
        >
          Cancel
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
    toast.success(`Kick count saved: ${kickCount} kicks today`);
    setIsOpen(false);
    setKickCount(0);
  };

  const handleReset = () => {
    setKickCount(0);
  };

  return (
    // <Dialog open={isOpen} onOpenChange={setIsOpen}>
    //   <DialogTrigger asChild>
    //     {isValidElement(children)
    //       ? cloneElement(children as React.ReactElement, {
    //         onClick: handleOpen,
    //         ref: triggerRef, // ✅ But only if children supports forwardRef!
    //       })
    //       : children}
    //   </DialogTrigger>
    //   <DialogContent className="sm:max-w-md bg-white p-6 rounded-xl sm:rounded-xl md:rounded-xl" style={{ marginTop: "55em" }}>
    //     <DialogHeader>
    //       <DialogTitle>Count Baby's Kicks</DialogTitle>
    //     </DialogHeader>
    //     <div className="space-y-6 pt-4">
    //       <div className="text-center">
    //         <div className="text-6xl font-bold text-purple-600 mb-2">
    //           {kickCount}
    //         </div>
    //         <p className="text-gray-600">Kicks counted today</p>
    //       </div>

    //       <div className="flex space-x-2">
    //         <Button onClick={handleAddKick} className="flex-1 bg-purple-500 hover:bg-purple-600">
    //           + Count Kick
    //         </Button>
    //         <Button variant="outline" onClick={handleReset} className="flex-1">
    //           Reset
    //         </Button>
    //       </div>

    //       <div className="flex space-x-2 pt-4">
    //         <Button onClick={handleSave} className="flex-1">
    //           Save Count
    //         </Button>
    //         <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
    //           Cancel
    //         </Button>
    //       </div>
    //     </div>
    //   </DialogContent>
    // </Dialog>

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
        Count Baby's Kicks
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
          Kicks counted today
        </p>
      </div>

      <div className="flex space-x-2">
        <Button
          onClick={handleAddKick}
          className={`flex-1 ${settings.darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'}`}
        >
          + Count Kick
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex-1"
        >
          Reset
        </Button>
      </div>

      <div className="flex space-x-2 pt-4">
        <Button onClick={handleSave} className="flex-1">
          Save Count
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsOpen(false)}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

  );
};
