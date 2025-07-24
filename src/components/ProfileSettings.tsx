
import React, { useState } from 'react';
import SettingsPage from './SettingsPage';
import { OnboardingData } from './onboarding/OnboardingFlow';

interface ProfileSettingsProps {
  userPreferences: OnboardingData | null;
  onUpdatePreferences: (preferences: OnboardingData) => void;
}

const ProfileSettings = ({ userPreferences, onUpdatePreferences }: ProfileSettingsProps) => {
  return <SettingsPage />;
};

export default ProfileSettings;
