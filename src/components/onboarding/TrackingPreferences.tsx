import  { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, Baby, Activity } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";
import { PredictionCalendar } from "../PredictionCalendar";
import { useLanguage } from '@/contexts/LanguageContext';


interface TrackingPreferencesProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onPrevious?: () => void;
}

const TrackingPreferences = ({
  data,
  onNext,
  onPrevious,
}: TrackingPreferencesProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    data.trackingType || []
  );

  const { getLocalizedText } = useLanguage();

  const trackingOptions = [
    {
      id: "period",
      title: getLocalizedText('period.tracking'),
      description: getLocalizedText('track.menstruation.purity.periods.and.ghus'),
      icon: Calendar,
      color: "bg-red-100 text-red-600",
      benefits: [
        getLocalizedText('worship.exemptions'),
        getLocalizedText('ghusl.reminders'),
        getLocalizedText('cycle.predictions'),
      ],
    },
    {
      id: "fertility",
      title: getLocalizedText('fertility.tracking'),
      description: getLocalizedText('monitor.fertile.windows.and.ovulation'),
      icon: Heart,
      color: "bg-green-100 text-green-600",
      benefits: [
        getLocalizedText('conception.planning'),
        getLocalizedText('natural.family.planning'),
        getLocalizedText('cycle.awareness'),
      ],
    },
    {
      id: "pregnancy",
      title: getLocalizedText('pregnancy.journey'),
      description: getLocalizedText('track.pregnancy.and.postpartum'),
      icon: Baby,
      color: "bg-blue-100 text-blue-600",
      benefits: [
        getLocalizedText('trimester.tracking'),
        getLocalizedText('nifas.calculations'),
        getLocalizedText('daily.duas'),
      ],
    },
    {
      id: "all",
      title: getLocalizedText('complete.wellness'),
      description: getLocalizedText('all.features.for.comprehensive.tracking'),
      icon: Activity,
      color: "bg-purple-100 text-purple-600",
      benefits: [
        getLocalizedText('full.cycle.management'),
        getLocalizedText('islamic.guidance'),
        getLocalizedText('holistic.health'),
      ],
    },
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
    fontSize: "medium",
    // Data
    autoBackup: true,
    syncEnabled: true,
    offlineMode: false,
    dataExport: true,
    // Advanced
    developerMode: false,
    betaFeatures: false,
    analytics: true,
  });

  useEffect(() => {
    // Load saved settings with comprehensive state management
    const savedSettings = localStorage.getItem("nurcycle-app-settings");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings((prev) => ({ ...prev, ...parsedSettings }));

        if (parsedSettings.darkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Apply dark mode immediately if enabled:
  }, []);

  const toggleSelection = (optionId: string) => {
    if (optionId === "all") {
      if (selectedTypes.includes("all")) {
        setSelectedTypes([]);
      } else {
        setSelectedTypes(["all"]);
      }
    } else {
      setSelectedTypes((prev) => {
        const newSelection = prev.filter((item) => item !== "all");
        if (newSelection.includes(optionId)) {
          return newSelection.filter((item) => item !== optionId);
        } else {
          return [...newSelection, optionId];
        }
      });
    }
  };

  const handleNext = () => {
    onNext({ trackingType: selectedTypes });
  };

  const isSelected = (optionId: string) => {
    return (
      selectedTypes.includes(optionId) ||
      (selectedTypes.includes("all") && optionId !== "all")
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p
          className={` ${settings.darkMode ? "text-gray-300" : "text-gray-600"
            }`}
        >
          {getLocalizedText('choose.what.youd.like.to.track')}
        </p>
      </div>

      <div className="grid gap-4">
        {trackingOptions.map((option) => {
          const Icon = option.icon;
          const selected = isSelected(option.id);

          return (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all duration-200 ${selected
                  ? "ring-2 ring-purple-500 border-purple-200"
                  : "hover:border-purple-200"
                } `}
              onClick={() => toggleSelection(option.id)}
            >
              <div
                className={`absolute inset-0 rounded-2xl  ${settings.darkMode ? "bg-slate-900 " : ""
                  }`}
              />

              <CardContent className="p-4 relative z-10">
                <div className="flex items-start space-x-4">

                  <div
                    className={`w-12 h-12 rounded-full ${settings.darkMode ? "bg-gray-800" : option.color
                      } flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon
                      className={`w-6 h-6 ${settings.darkMode ? "text-white" : "text-gray-900"
                        }`}
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      {/* Title */}
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {option.title}
                      </h3>

                      {/* Badge for selected state */}
                      {selected && (
                        <Badge className="bg-purple-100 text-purple-700">
                          {getLocalizedText('selected')}
                        </Badge>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {option.description}
                    </p>

                    {/* Benefits */}

                    <div className="flex flex-wrap gap-1">
                      {option.benefits.map((benefit, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className={`text-xs ${settings.darkMode
                              ? "border-white text-white"
                              : "border-gray-500 text-gray-800"
                            }`}
                        >
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {option.id === "period" ? (
                  <div className="text-center pb-3 pt-3 md:float-end md:mx-0">
                    <PredictionCalendar />
                  </div>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-3 justify-between">
        {onPrevious && (
          <Button variant="outline" onClick={onPrevious}>
            {getLocalizedText('previous')}
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={selectedTypes.length === 0}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 ml-auto"
        >
          {getLocalizedText('continue')}
        </Button>
      </div>
    </div>
  );
};

export default TrackingPreferences;
