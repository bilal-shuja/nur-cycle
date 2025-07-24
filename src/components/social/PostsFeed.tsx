
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';
import PostCard from './PostCard';
import { useLanguage } from '@/contexts/LanguageContext';
interface Post {
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
}

interface PostsFeedProps {
  user: User;
  onViewProfile: (userId: string) => void;
}

const PostsFeed = ({ user, onViewProfile }: PostsFeedProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
   const { getLocalizedText } = useLanguage();

  

  const fetchPosts = async () => {
    try {
      // First fetch posts with likes and comments
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
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // Get all unique user IDs from posts and comments
      const userIds = new Set<string>();
      postsData?.forEach(post => {
        userIds.add(post.user_id);
        post.comments?.forEach((comment: any) => {
          userIds.add(comment.user_id);
        });
      });

      // Fetch profiles for all users
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, username, avatar_url')
        .in('id', Array.from(userIds));

      if (profilesError) throw profilesError;

      // Create a map of user profiles
      const profilesMap = new Map();
      profilesData?.forEach(profile => {
        profilesMap.set(profile.id, profile);
      });

      // Combine posts with profile data
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

      setPosts(postsWithProfiles);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    // Set up real-time subscription for posts
    const postsChannel = supabase
      .channel('posts-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, fetchPosts)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'likes' }, fetchPosts)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, fetchPosts)
      .subscribe();

    return () => {
      supabase.removeChannel(postsChannel);
    };
  }, []);

  if (loading) {
    return <div className="text-center py-8">{getLocalizedText('feed.loading')}</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{getLocalizedText('feed.no.posts')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} currentUser={user} onUpdate={fetchPosts} onViewProfile={onViewProfile} />
      ))}
    </div>
  );
};

export default PostsFeed;
