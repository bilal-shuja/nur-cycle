
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const YouTubeResourcesSection = () => {
  const [showAllVideos, setShowAllVideos] = useState(false);
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

  const youtubeVideos = [
    {
      id: 1,
      title: getLocalizedText('youtube.zaad_al_mustaqni'),
      url: "https://www.youtube.com/live/sPIpvXLiU1g?si=1W6UKt8i7-2gMVS3"
    },
    {
      id: 2,
      title: getLocalizedText('youtube.rulings_related_to_menstruation'),
      url: "https://youtu.be/j6LXodc0e78?si=jlAls9K7VNcDAWEK"
    },
    {
      id: 3,
      title: getLocalizedText('youtube.menstruation_in_islam'),
      url: "https://youtu.be/G3MGEX0FbNU?si=QESIi5wt8-0lvqNO"
    },
    {
      id: 4,
      title: getLocalizedText('youtube.irregular_periods'),
      url: "https://youtu.be/ttthgQYp20E?si=z4l5x3cuyOdOI8vZ"
    },
    {
      id: 5,
      title: getLocalizedText('youtube.menstruation_in_islam_assim'),
      url: "https://youtu.be/NWyJGXUILbo?si=XwxQL6sRawCtxt1a"
    },
    {
      id: 6,
      title: getLocalizedText('youtube.introduction_book_of_purification'),
      url: "https://youtu.be/9YGQkUaxZ2o?si=DdK1aX1g98FcOs7L"
    }
  ];

  const visibleVideos = showAllVideos ? youtubeVideos : youtubeVideos.slice(0, 3);

  const handleVideoClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (

    <Card className="relative overflow-hidden card-3d">
      <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-red-50 to-orange-50 border-red-200'}`}></div>

      <CardHeader className="relative z-10">
        <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-red-800'}`}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          <span> {getLocalizedText('youtube.educational_video_resources')} </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10">
        <p className={`text-sm mb-4 ${settings.darkMode ? 'text-gray-300' : 'text-red-700'}`}>
          {getLocalizedText('youtube.watch_comprehensive_videos')}
        </p>

        <div className="space-y-3">
          {visibleVideos.map((video) => (
            <div
              key={video.id}
              className={`rounded-lg p-4 border transition-shadow cursor-pointer ${settings.darkMode ? 'bg-slate-800 border-slate-700 hover:shadow-lg' : 'bg-white border-red-200 hover:shadow-md'}`}
              onClick={() => handleVideoClick(video.url)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-semibold text-sm ${settings.darkMode ? 'text-white' : 'text-red-800'}`}>
                      {video.title}
                    </h4>
                    <ExternalLink className={`w-3 h-3 flex-shrink-0 ${settings.darkMode ? 'text-red-400' : 'text-red-600'}`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {youtubeVideos.length > 3 && (
          <div className="text-center mt-4">
            <Button
              onClick={() => setShowAllVideos(!showAllVideos)}
              variant="outline"
              className={`${settings.darkMode ? 'border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500' : 'border-red-300 text-red-700 hover:bg-red-100 hover:border-red-400'}`}
            >
              {showAllVideos ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  {getLocalizedText('youtube.show_less')}
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  {getLocalizedText('youtube.show_more')} ({youtubeVideos.length - 3} {getLocalizedText('youtube.more_videos')} )
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>

  );
};

export default YouTubeResourcesSection;
