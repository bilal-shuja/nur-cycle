import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnboardingData } from "./OnboardingFlow";

interface WelcomeStepProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onSkip: () => void;
}

const WelcomeStep = ({ data, onNext, onSkip }: WelcomeStepProps) => {
  const [name, setName] = useState(data.name || "");

  const handleNext = () => {
    onNext({ name });
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
  }, []);

  return (
    <div
      className={`space-y-6 text-center ${
        settings.darkMode
          ? "bg-slate-900 text-white"
          : "bg-gradient-to-br from-purple-100 via-purple-50 to-white"
      }`}
    >
      <div className="space-y-4">
        <h1
          className={`text-4xl font-bold mb-2 bg-gradient-to-r ${
            settings.darkMode
              ? "from-slate-800 via-slate-600 to-slate-500"
              : "from-lavender-700 via-lavender-500 to-lavender-800"
          } bg-clip-text text-transparent flex items-center justify-center drop-shadow-lg`}
        >
          <span
            className={`${
              settings.darkMode ? "text-white" : "text-lavender-700"
            }`}
          >
            NurCycle
          </span>
          <img
            src="/lovable-uploads/9ab8e7ae-1fa2-4cf6-bad2-a54d6582474b.png"
            alt="NurCycle Logo"
            className="w-10 h-10 drop-shadow-md"
            style={{ marginLeft: "-0.3em" }}
          />
        </h1>
        <h2
          className={`text-xl font-semibold ${
            settings.darkMode ? "text-white" : "text-lavender-700"
          } mb-4`}
        >
          Assalamu Alaikum, Sister! 🌸
        </h2>
        <p
          className={` leading-relaxed ${
            settings.darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Welcome to NurCycle - your trusted companion for tracking your cycle
          with Islamic guidance. We're here to help you understand your body
          while staying connected to Allah's wisdom.
        </p>
        <div
          className={`bg-teal-50 border border-teal-200 rounded-lg p-4 ${
            settings.darkMode ? "bg-teal-800 border-teal-600" : "bg-teal-50"
          }`}
        >
          <p
            className={`text-sm ${
              settings.darkMode ? "text-teal-200" : "text-teal-800"
            }`}
          >
            "And Allah has brought you out from the wombs of your mothers while
            you know nothing. And He gave you hearing, sight, and hearts that
            you might give thanks."
          </p>
          <p
            className={`text-teal-600 text-xs mt-2 ${
              settings.darkMode ? "text-teal-400" : "text-teal-600"
            }`}
          >
            - Quran 16:78
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-left max-w-md mx-auto">
          <Label
            htmlFor="name"
            className={`${
              settings.darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            What should we call you? (Optional)
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-1 ${
              settings.darkMode ? " text-black" : "bg-white text-gray-800"
            }`}
          />
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Button variant="outline" onClick={onSkip}>
          Skip Setup
        </Button>
        <Button
          onClick={handleNext}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Let's Begin
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStep;
