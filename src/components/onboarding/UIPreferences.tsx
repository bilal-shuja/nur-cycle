
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Palette } from 'lucide-react';
import { OnboardingData } from './OnboardingFlow';

interface UIPreferencesProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onPrevious?: () => void;
}

const UIPreferences = ({ data, onNext, onPrevious }: UIPreferencesProps) => {
  const [hijabiUI, setHijabiUI] = useState(data.hijabiUI || false);

  const handleNext = () => {
    onNext({ hijabiUI });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Palette className="w-5 h-5 text-purple-600" />
          <p className="text-gray-600">
            Customize your experience to feel comfortable and at home
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Interface Preferences</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="hijabi-ui" className="text-base font-medium">
                  Hijabi-friendly interface
                </Label>
                <p className="text-sm text-gray-600">
                  Use modest illustrations and hijabi-inclusive imagery throughout the app
                </p>
              </div>
              <Switch
                id="hijabi-ui"
                checked={hijabiUI}
                onCheckedChange={setHijabiUI}
              />
            </div>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <p className="text-teal-800 text-sm">
              These preferences help us create an interface that feels welcoming and 
              respectful of your values. You can always change these settings later.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-between">
        {onPrevious && (
          <Button variant="outline" onClick={onPrevious}>
            Previous
          </Button>
        )}
        <Button 
          onClick={handleNext}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 ml-auto"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default UIPreferences;
