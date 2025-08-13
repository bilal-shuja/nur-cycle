
import React, { useState } from 'react';
import SettingsPage from './SettingsPage';
import { OnboardingData } from './onboarding/OnboardingFlow';

interface ProfileSettingsProps {
  userPreferences: OnboardingData | null;
  onUpdatePreferences: (preferences: OnboardingData) => void;
  isSubscribered:boolean,
  checkSubDate : boolean,
  activeSection : string,
  showExpiryWarning : boolean
}

const ProfileSettings = ({ userPreferences, onUpdatePreferences , isSubscribered, checkSubDate , activeSection , showExpiryWarning }: ProfileSettingsProps) => {
  return <SettingsPage isSubscribered = {isSubscribered}  checkSubDate = {checkSubDate} activeSection = {activeSection}  showExpiryWarning = {showExpiryWarning}/>;
};

export default ProfileSettings;
