
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';
import PostCard from './PostCard';
import { Heart, MessageSquare, Share, Bookmark } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MyPostsSectionProps {
  user: User;
}

const MyPostsSection = ({ user }: MyPostsSectionProps) => {
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [likedPosts, setLikedPosts] = useState<any[]>([]);
  const [myComments, setMyComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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

  const fetchMyPosts = async () => {
    try {
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(`
          *,
          likes (id, user_id),
          comments (
            id,
            content,
            created_at,
            user_id
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // Get profiles for all users in comments
      const userIds = new Set<string>();
      postsData?.forEach(post => {
        userIds.add(post.user_id);
        post.comments?.forEach((comment: any) => {
          userIds.add(comment.user_id);
        });
      });

      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, username, avatar_url')
        .in('id', Array.from(userIds));

      if (profilesError) throw profilesError;

      const profilesMap = new Map();
      profilesData?.forEach(profile => {
        profilesMap.set(profile.id, profile);
      });

      const postsWithProfiles = postsData?.map(post => ({
        ...post,
        profiles: profilesMap.get(post.user_id) || {
          full_name: 'Unknown User',
          username: 'unknown',
          avatar_url: null
        },
        comments: post.comments?.map((comment: any) => ({
          ...comment,
          profiles: profilesMap.get(comment.user_id) || {
            full_name: 'Unknown User',
            username: 'unknown'
          }
        })) || []
      })) || [];

      setMyPosts(postsWithProfiles);
    } catch (error) {
      console.error('Error fetching my posts:', error);
    }
  };

  const fetchLikedPosts = async () => {
    try {
      const { data: likesData, error: likesError } = await supabase
        .from('likes')
        .select(`
          post_id,
          posts (
            *,
            likes (id, user_id),
            comments (
              id,
              content,
              created_at,
              user_id
            )
          )
        `)
        .eq('user_id', user.id);

      if (likesError) throw likesError;

      // Extract posts and get user profiles
      const posts = likesData?.map(like => like.posts).filter(Boolean) || [];
      const userIds = new Set<string>();
      posts.forEach(post => {
        if (post) {
          userIds.add(post.user_id);
          post.comments?.forEach((comment: any) => {
            userIds.add(comment.user_id);
          });
        }
      });

      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, username, avatar_url')
        .in('id', Array.from(userIds));

      if (profilesError) throw profilesError;

      const profilesMap = new Map();
      profilesData?.forEach(profile => {
        profilesMap.set(profile.id, profile);
      });

      const postsWithProfiles = posts.map(post => ({
        ...post,
        profiles: profilesMap.get(post.user_id) || {
          full_name: 'Unknown User',
          username: 'unknown',
          avatar_url: null
        },
        comments: post.comments?.map((comment: any) => ({
          ...comment,
          profiles: profilesMap.get(comment.user_id) || {
            full_name: 'Unknown User',
            username: 'unknown'
          }
        })) || []
      }));

      setLikedPosts(postsWithProfiles);
    } catch (error) {
      console.error('Error fetching liked posts:', error);
    }
  };

  const fetchMyComments = async () => {
    try {
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select(`
          *,
          posts (
            id,
            content,
            image_url,
            created_at,
            user_id
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (commentsError) throw commentsError;
      setMyComments(commentsData || []);
    } catch (error) {
      console.error('Error fetching my comments:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchMyPosts(), fetchLikedPosts(), fetchMyComments()]);
      setLoading(false);
    };
    fetchData();
  }, [user.id]);

  if (loading) {
    return <div className="text-center py-8">{getLocalizedText('activity.loading')}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
  

      <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-lavender-500 to-lavender-700'}`}></div>
  <CardContent className="relative z-10 p-6">
    <CardHeader>
      <CardTitle className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
        <MessageSquare className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`} />
        <span>{getLocalizedText('activity.title')}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="my-posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="my-posts"
            className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            <MessageSquare className="w-4 h-4" />
            <span> {getLocalizedText('activity.posts')} ({myPosts.length})</span>
          </TabsTrigger>
          <TabsTrigger
            value="liked"
            className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            <Heart className="w-4 h-4" />
            <span>{getLocalizedText('activity.liked')} ({likedPosts.length})</span>
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{getLocalizedText('activity.comments')}({myComments.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-posts" className="mt-6">
          <div className="space-y-6">
            {myPosts.length === 0 ? (
              <p className={`text-center ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} py-8`}>
               {getLocalizedText('activity.no.posts')}
              </p>
            ) : (
              myPosts.map((post) => (
                <PostCard key={post.id} post={post} currentUser={user} onUpdate={fetchMyPosts} onViewProfile={() => {}} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="liked" className="mt-6">
          <div className="space-y-6">
            {likedPosts.length === 0 ? (
              <p className={`text-center ${settings.darkMode ? 'text-gray-200' : 'text-gray-500'} py-8`}>
               {getLocalizedText('activity.no.likes')}
              </p>
            ) : (
              likedPosts.map((post) => (
                <PostCard key={post.id} post={post} currentUser={user} onUpdate={fetchLikedPosts} onViewProfile={() => {}} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="comments" className="mt-6">
          <div className="space-y-4">
            {myComments.length === 0 ? (
              <p className={`text-center ${settings.darkMode ? 'text-gray-200' : 'text-gray-500'} py-8`}>
                {getLocalizedText('activity.no.comments')}
              </p>
            ) : (
              myComments.map((comment) => (
                <Card key={comment.id} className={`p-4 ${settings.darkMode ? 'bg-slate-900' : 'bg-white'}`}>
                  <div className="space-y-2">
                    <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                     {getLocalizedText('activity.commented.on')} "{comment.posts?.content?.substring(0, 100)}..."
                    </p>
                    <p className={`font-medium ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {comment.content}
                    </p>
                    <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                      {new Date(comment.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
  </CardContent>
</Card>

    </div>
  );
};

export default MyPostsSection;
