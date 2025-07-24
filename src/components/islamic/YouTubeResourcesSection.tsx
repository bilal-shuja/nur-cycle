
import React, { useState , useEffect} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const YouTubeResourcesSection = () => {
  const [showAllVideos, setShowAllVideos] = useState(false);

  
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

  const youtubeVideos = [
    {
      id: 1,
      title: "Zaad Al-Mustaq'ni #17 (2021) [The Menstrual Cycle #1]- by Ali Davis",
      url: "https://www.youtube.com/live/sPIpvXLiU1g?si=1W6UKt8i7-2gMVS3"
    },
    {
      id: 2,
      title: "Rulings Related to Menstruation || Ustadh Abdulrahman Hassan || AMAU",
      url: "https://youtu.be/j6LXodc0e78?si=jlAls9K7VNcDAWEK"
    },
    {
      id: 3,
      title: "Menstruation in Islam | How is it different from Jews and Christians? | Ustadh Muhammed Tim Humble",
      url: "https://youtu.be/G3MGEX0FbNU?si=QESIi5wt8-0lvqNO"
    },
    {
      id: 4,
      title: "Irregular Periods, Menses exceeding 15 days & determining purity - Sheikh Assimalhakeem",
      url: "https://youtu.be/ttthgQYp20E?si=z4l5x3cuyOdOI8vZ"
    },
    {
      id: 5,
      title: "Menstruation in Islam – Assim Al Hakeem",
      url: "https://youtu.be/NWyJGXUILbo?si=XwxQL6sRawCtxt1a"
    },
    {
      id: 6,
      title: "Introduction | Book of Purification | Zaad al Mustaqni' | | Ust Abu Abdillah Sa'eed Hassan",
      url: "https://youtu.be/9YGQkUaxZ2o?si=DdK1aX1g98FcOs7L"
    }
  ];

  const visibleVideos = showAllVideos ? youtubeVideos : youtubeVideos.slice(0, 3);

  const handleVideoClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (

    // <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
    //   <CardHeader>
    //     <CardTitle className="text-red-800 flex items-center gap-2">
    //       <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    //         <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    //       </svg>
    //       <span className="text-red-800">Educational Video Resources</span>
    //     </CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <p className="text-red-700 text-sm mb-4">
    //       Watch comprehensive video explanations of the classical Islamic texts and scholarly works referenced in our knowledge base.
    //     </p>
        
    //     <div className="space-y-3">
    //       {visibleVideos.map((video) => (
    //         <div
    //           key={video.id}
    //           className="bg-white rounded-lg p-4 border border-red-200 hover:shadow-md transition-shadow cursor-pointer"
    //           onClick={() => handleVideoClick(video.url)}
    //         >
    //           <div className="flex items-start justify-between">
    //             <div className="flex-1">
    //               <div className="flex items-center gap-2">
    //                 <h4 className="font-semibold text-red-800 text-sm">
    //                   {video.title}
    //                 </h4>
    //                 <ExternalLink className="w-3 h-3 text-red-600 flex-shrink-0" />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>

    //     {youtubeVideos.length > 3 && (
    //       <div className="text-center mt-4">
    //         <Button
    //           onClick={() => setShowAllVideos(!showAllVideos)}
    //           variant="outline"
    //           className="border-red-300 text-red-700 hover:bg-red-100 hover:border-red-400"
    //         >
    //           {showAllVideos ? (
    //             <>
    //               <ChevronUp className="w-4 h-4 mr-2" />
    //               Show Less
    //             </>
    //           ) : (
    //             <>
    //               <ChevronDown className="w-4 h-4 mr-2" />
    //               Show More ({youtubeVideos.length - 3} more videos)
    //             </>
    //           )}
    //         </Button>
    //       </div>
    //     )}
    //   </CardContent>
    // </Card>

    <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-red-50 to-orange-50 border-red-200'}`}></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-red-800'}`}>
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
      <span>Educational Video Resources</span>
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10">
    <p className={`text-sm mb-4 ${settings.darkMode ? 'text-gray-300' : 'text-red-700'}`}>
      Watch comprehensive video explanations of the classical Islamic texts and scholarly works referenced in our knowledge base.
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
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" />
              Show More ({youtubeVideos.length - 3} more videos)
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
