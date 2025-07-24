
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User } from '@supabase/supabase-js';
import { ArrowLeft, Send, Heart, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

interface TopicDiscussionProps {
  topic: string;
  user: User;
  onBack: () => void;
}

interface Discussion {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  topic: string;
  profiles: {
    full_name: string;
    username: string;
    avatar_url: string | null;
  };
  likes: { id: string; user_id: string }[];
  replies: {
    id: string;
    content: string;
    created_at: string;
    profiles: {
      full_name: string;
      username: string;
    };
  }[];
}

const TopicDiscussion = ({ topic, user, onBack }: TopicDiscussionProps) => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newDiscussion, setNewDiscussion] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { toast } = useToast();

     const { getLocalizedText } = useLanguage();

  const topicImages = {
    [getLocalizedText('topics.cycle_periods')]: "🩸",
    [getLocalizedText('talk.pregnancy')]: "🤱",

    [getLocalizedText('mental.health')]: "🧠",
    [getLocalizedText('pcos')]: "💜",
    [getLocalizedText('fertility.issues')]: "🌸",

    [getLocalizedText('self.care.love')]: "💆‍♀️",

    [getLocalizedText('topics.relationships.marriageDeen')]: "💑",

    [getLocalizedText('postpartum')]: "👶",
    [getLocalizedText('topics.lifeTransitions.menopause')]: "🌙",

    [getLocalizedText('topics.lifeTransitions.hormonalChanges')]: "⚖️🩸"

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

  const getTopicEmoji = (topicName: string): string => {
    return topicImages[topicName as keyof typeof topicImages] || "💬";
  };



  const fetchDiscussions = async () => {
    try {
      const { data: discussionsData, error: discussionsError } = await supabase
        .from('topic_discussions')
        .select(`
          *,
          topic_likes (id, user_id),
          topic_replies (
            id,
            content,
            created_at,
            user_id
          )
        `)
        .eq('topic', topic)
        .order('created_at', { ascending: false });

      if (discussionsError) throw discussionsError;

      // Get all unique user IDs
      const userIds = new Set<string>();
      discussionsData?.forEach(discussion => {
        userIds.add(discussion.user_id);
        discussion.topic_replies?.forEach((reply: any) => {
          userIds.add(reply.user_id);
        });
      });

      // Fetch profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, username, avatar_url')
        .in('id', Array.from(userIds));

      if (profilesError) throw profilesError;

      const profilesMap = new Map();
      profilesData?.forEach(profile => {
        profilesMap.set(profile.id, profile);
      });

      // Combine data
      const discussionsWithProfiles = discussionsData?.map(discussion => ({
        ...discussion,
        profiles: profilesMap.get(discussion.user_id) || {
          full_name: 'Unknown User',
          username: 'unknown',
          avatar_url: null
        },
        likes: discussion.topic_likes || [],
        replies: discussion.topic_replies?.map((reply: any) => ({
          ...reply,
          profiles: profilesMap.get(reply.user_id) || {
            full_name: 'Unknown User',
            username: 'unknown'
          }
        })) || []
      })) || [];

      setDiscussions(discussionsWithProfiles);
    } catch (error) {
      console.error('Error fetching discussions:', error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscussion.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('topic_discussions')
        .insert({
          user_id: user.id,
          topic: topic,
          content: newDiscussion.trim(),
        });

      if (error) throw error;

      setNewDiscussion('');
      fetchDiscussions();
      
      toast({
        title: "Success!",
        description: "Your discussion has been posted.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, [topic]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
  

      <Card className="relative overflow-hidden card-3d  from-purple-600 to-white text-white">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-600 to-white'}`}></div>
  <CardHeader className="relative z-10">
    <div className="flex items-center space-x-4">
      <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/20">
        <ArrowLeft className="w-4 h-4" />
      </Button>
      <div className="flex items-center space-x-3">
        <span className="text-3xl">{getTopicEmoji(topic)}</span>
        <div>
          <CardTitle className={`text-xl ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{topic}</CardTitle>
          <p className={`text-sm opacity-90 ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{getLocalizedText('discussion.shareExperience')}</p>
        </div>
      </div>
    </div>
  </CardHeader>
</Card>


      {/* Create Discussion */}
   

      <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-600 to-white'}`}></div>
  <CardHeader className="relative z-10">
    <CardTitle className={`${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{getLocalizedText('discussion.startNew')}</CardTitle>
  </CardHeader>
  <CardContent className="relative z-10">
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder={`${getLocalizedText('discussion.shareThoughts')} ${topic}...`}
        value={newDiscussion}
        onChange={(e) => setNewDiscussion(e.target.value)}
        rows={4}
        className={`resize-none ${settings.darkMode ? 'bg-slate-800 text-white placeholder-gray-500' : 'bg-white text-gray-800 placeholder-gray-400'} shadow-md`}
      />
      <Button
        type="submit"
        disabled={loading || !newDiscussion.trim()}
        className={`bg-gradient-to-r ${settings.darkMode ? 'from-slate-800 to-slate-600' : 'from-purple-600 to-white'} hover:from-purple-700 hover:to-purple-50 text-white`}
      >
        <Send className="w-4 h-4 mr-2" />
        {loading ? getLocalizedText('discussion.posting') : getLocalizedText('discussion.postButton')}
      </Button>
    </form>
  </CardContent>
</Card>


      {/* Discussions */}
      {fetchLoading ? (
        <div className="text-center py-8"> {getLocalizedText('discussion.loading')} </div>
      ) : discussions.length === 0 ? (

        <Card>
  <CardContent className={`text-center py-8 ${settings.darkMode ? 'bg-slate-900 text-white rounded-2xl' : 'bg-white text-gray-800 rounded-2xl'}`}>
    <p className={`${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{getLocalizedText('discussion.emptyState')}</p>
  </CardContent>
</Card>

      ) : (
        <div className="space-y-6">
          {discussions.map((discussion) => (
            <Card key={discussion.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={discussion.profiles.avatar_url || undefined} />
                    <AvatarFallback>
                      {discussion.profiles.full_name?.charAt(0) || discussion.profiles.username?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <p className="font-semibold">{discussion.profiles.full_name || discussion.profiles.username}</p>
                      <p className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}
                      </p>
                    </div>
                    <p className="text-gray-800 leading-relaxed mb-4">{discussion.content}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{discussion.likes.length}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{discussion.replies.length}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicDiscussion;
