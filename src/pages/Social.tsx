import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';
import CreatePost from '@/components/social/CreatePost';
import PostsFeed from '@/components/social/PostsFeed';
import UserProfile from '@/components/social/UserProfile';
import MyPostsSection from '@/components/social/MyPostsSection';
import TiteaTalkTopics from '@/components/social/TiteaTalkTopics';
import PrivateMessages from '@/components/social/PrivateMessages';
import UserProfiles from '@/components/social/UserProfiles';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Home, User as UserIcon, LogOut, MessageSquare, BookOpen, UserSearch, Mail } from 'lucide-react';
import CommunityChat from '@/components/social/CommunityChat';
import Header from './Header';
import { useLanguage } from '@/contexts/LanguageContext';

const Social = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'community' | 'my-posts' | 'titea-talk' | 'private-messages' | 'user-profiles' | 'view-profile'>('community');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const navigate = useNavigate();
      const { getLocalizedText } = useLanguage();
const dailyReminders = [
  { key: "verse.creation.truth", suffix: " - Quran 6:73" },
  { key: "verse.reliance", suffix: " - Quran 65:3" },
  { key: "verse.rememberance", suffix: " - Quran 2:152" },
  { key: "verse.patience", suffix: " - Quran 2:153" },
  { key: "verse.amanah", suffix: "" },
  { key: "verse.ease", suffix: " - Quran 94:6" },
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
    const savedSettings = localStorage.getItem('nurcycle-app-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prev => ({
          ...prev,
          ...parsedSettings
        }));
        if (parsedSettings.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    } else {
      document.documentElement.classList.remove('dark');
    }

  }, []);

  const getTodaysReminder = () => {
    const today = new Date().getDate();
     return dailyReminders[today % dailyReminders.length];
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
    };
    getUser();
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };
  if (!user) {
    return <div>Loading...</div>;
  }

  const todaysReminder = getTodaysReminder();
  
  return <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-purple-50 via-white to-purple-100'}`}>
      {/* Header */}
      <Header />

      {/* Daily Islamic Reminder */}


  <div className="max-w-7xl mx-auto px-4 py-4">
  <Card className={`bg-purple-ombre text-white shadow-lg `}>
    <div className={`absolute inset-0 rounded-2xl ${settings.darkMode ? 'bg-slate-900' : 'from-purple-600 to-purple-800'}`}></div>
    <CardContent className="relative z-10 p-6 text-center">
      <h2 className={`text-lg font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-lavender-900'}`}>🌸 {getLocalizedText('footer.reminder')} 🌸</h2>
      <p className={`text-sm opacity-90 italic ${settings.darkMode ? 'text-gray-300' : 'text-lavender-900'}`}>
         {getLocalizedText(todaysReminder.key) + todaysReminder.suffix}
      </p>
    </CardContent>
  </Card>
    </div>


      {/* Main Content with bottom padding for navigation */}
      <main className="max-w-7xl mx-auto px-4 pb-24">
        {activeTab === 'community' && <div className="space-y-6">
            {/* Tabs for Community Section */}
            <Tabs defaultValue="feed" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="feed">{getLocalizedText('feed.title')}</TabsTrigger>
                <TabsTrigger value="chat">{getLocalizedText('feed.live.chat')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="feed" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Create Post & Feed */}
                  <div className="lg:col-span-2 space-y-6">
                    <CreatePost user={user} />
                    <PostsFeed user={user} onViewProfile={userId => {
                  setSelectedUserId(userId);
                  setActiveTab('view-profile');
                }} />
                  </div>
                  
                  {/* Sidebar */}
                  <div className="space-y-6">
                    <Card className="relative overflow-hidden card-3d">
                      <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-lavender-500 to-lavender-700'} `}></div>
                     <CardContent className="relative z-10 p-6">
    <h3 className={`font-semibold text-lg mb-4 ${settings.darkMode ? 'text-white' : 'text-lavender-900'}`}>{getLocalizedText('community.guidelines.title')}</h3>
    <ul className={`text-sm space-y-2 ${settings.darkMode ? 'text-gray-300' : 'text-lavender-800'}`}>
      <li>• {getLocalizedText('community.guidelines.respect')}</li>
      <li>• {getLocalizedText('community.guidelines.share.responsibly')}</li>
      <li>• {getLocalizedText('community.guidelines.medical.advice')}</li>
      <li>• {getLocalizedText('community.guidelines.privacy')}</li>
      <li>• {getLocalizedText('community.guidelines.no.swearing')}</li>
      <li>• {getLocalizedText('community.guidelines.no.inappropriate.images')}</li>
      <li>• {getLocalizedText('community.guidelines.no.bullying')}</li>
      <li>• {getLocalizedText('community.guidelines.muslim.values')}</li>
    </ul>
  </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="chat" className="mt-6">
                <CommunityChat user={user} />
              </TabsContent>
            </Tabs>
          </div>}

        {activeTab === 'my-posts' && <MyPostsSection user={user} />}

        {activeTab === 'titea-talk' && <TiteaTalkTopics user={user} />}

        {activeTab === 'view-profile' && selectedUserId && <UserProfile user={user} viewingUserId={selectedUserId} />}

        {activeTab === 'private-messages' && <PrivateMessages user={user} />}

        {activeTab === 'user-profiles' && <UserProfiles user={user} onStartChat={userId => {
        setActiveTab('private-messages');
      }} onViewProfile={userId => {
        setSelectedUserId(userId);
        setActiveTab('view-profile');
      }} />}
      </main>


      <div className={`sticky bottom-0 left-0 right-0 z-50 backdrop-blur-lg border-t border-purple-200 shadow-lg ${settings.darkMode ? 'bg-slate-900 text-white' : ' bg-white/95'}`}>
  <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center space-x-6">
          <Button variant={activeTab === 'community' ? 'default' : 'ghost'} onClick={() => setActiveTab('community')} size="icon" className="h-12 w-12">
            <Users className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`} />
          </Button>
          
          <Button variant={activeTab === 'private-messages' ? 'default' : 'ghost'} onClick={() => setActiveTab('private-messages')} size="icon" className="h-12 w-12">
            <Mail className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`} />
          </Button>
          <Button variant={activeTab === 'my-posts' ? 'default' : 'ghost'} onClick={() => setActiveTab('my-posts')} size="icon" className="h-12 w-12">
            <MessageSquare className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`} />
          </Button>
          <Button variant={activeTab === 'titea-talk' ? 'default' : 'ghost'} onClick={() => setActiveTab('titea-talk')} size="icon" className="h-12 w-12">
            <BookOpen className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`} />
          </Button>
          <Button variant={activeTab === 'view-profile' && selectedUserId === user.id ? 'default' : 'ghost'} onClick={() => {
            setSelectedUserId(user.id);
            setActiveTab('view-profile');
          }} size="icon" className="h-12 w-12">
            <UserIcon className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`} />
          </Button>
        </div>
  </div>
    </div>

    {/* Copyright Footer */}
    <div className={`text-center py-4 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
     © 2025 {getLocalizedText('footer.copyright')}
    </div>

    </div>;
};
export default Social;