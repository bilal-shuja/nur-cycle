
import React, { useState , useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User } from '@supabase/supabase-js';
import { Heart, MessageCircle, Share, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
interface PostCardProps {
  post: {
    id: string;
    content: string;
    image_url: string | null;
    created_at: string;
    user_id: string;
    profiles: {
      full_name: string;
      username: string;
      avatar_url: string | null;
    };
    likes: { id: string; user_id: string }[];
    comments: {
      id: string;
      content: string;
      created_at: string;
      profiles: {
        full_name: string;
        username: string;
      };
    }[];
  };
  currentUser: User;
  onUpdate: () => void;
  onViewProfile: (userId: string) => void;
}

const PostCard = ({ post, currentUser, onUpdate, onViewProfile }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

      const { getLocalizedText } = useLanguage();
  const isLiked = post.likes.some(like => like.user_id === currentUser.id);
  const likesCount = post.likes.length;

  const navigate = useNavigate();

  
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

  const handleLike = async () => {
    try {
      if (isLiked) {
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', post.id)
          .eq('user_id', currentUser.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('likes')
          .insert({
            post_id: post.id,
            user_id: currentUser.id,
          });
        
        if (error) throw error;
      }
      
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: post.id,
          user_id: currentUser.id,
          content: newComment.trim(),
        });

      if (error) throw error;

      setNewComment('');
      onUpdate();
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



  const handleShare = () => {
    navigator.clipboard.writeText(`${getLocalizedText('feed.check.out')} ${post.content}`);
    toast({
      title: getLocalizedText('feed.copied'),
      description: getLocalizedText('feed.copy.success'),
    });
  };

  return (


    <Card className={`w-full ${settings.darkMode ? 'bg-slate-900' : 'bg-white'}`}>
  <div className={`absolute inset-0 rounded-2xl  ${settings.darkMode ? 'bg-slate-900' : ' from-purple-600 to-purple-800'}`}></div>
  <CardContent className="relative z-10 p-6">
    <CardHeader>
      <div className="flex items-center space-x-3">
    
        <Avatar>
  <AvatarImage src={post.profiles.avatar_url || undefined} />
  <AvatarFallback className={`${settings.darkMode ? 'bg-gray-700 text-white' : 'bg-lavender-100 text-gray-700'}`}>
    {post.profiles.full_name?.charAt(0) || post.profiles.username?.charAt(0) || 'U'}
  </AvatarFallback>
</Avatar>
        <div>
          <p 
            className={`font-semibold hover:underline hover:text-purple-600 transition-colors duration-200 cursor-pointer ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}
            onClick={() => onViewProfile(post.user_id)}
          >
            {post.profiles.full_name || post.profiles.username}
          </p>
          <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </p>
        </div>
      </div>
    </CardHeader>
    
    <CardContent className="space-y-4">
      {post.content && (
        <p className={` leading-relaxed ${settings.darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
          {post.content}
        </p>
      )}
      
      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post image"
          className="w-full rounded-lg object-cover max-h-96"
        />
      )}
      
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likesCount}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-gray-500'}`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments.length}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-gray-500'}`}
          >
            <Share className="w-4 h-4" />
            <span>{getLocalizedText('feed.share')}</span>
          </Button>
        </div>
      </div>
      
      {showComments && (
        <div className="space-y-4 pt-4 border-t">
          <form onSubmit={handleComment} className="flex space-x-2">
            <Textarea
              placeholder={getLocalizedText('feed.comment.placeholder')}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={2}
              className="flex-1 resize-none"
            />
            <Button
              type="submit"
              disabled={loading || !newComment.trim()}
              size="sm"
              className="self-end"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          
          <div className="space-y-3">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">
                    {comment.profiles.full_name?.charAt(0) || comment.profiles.username?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className={`bg-gray-100 rounded-lg p-3 ${settings.darkMode ? 'bg-gray-700' : ''}`}>
                    <p className={`font-semibold text-sm ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>{comment.profiles.full_name || comment.profiles.username}</p>
                    <p className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{comment.content}</p>
                  </div>
                  <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </CardContent>
  </CardContent>
</Card>

  
  );
};

export default PostCard;
