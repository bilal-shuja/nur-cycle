import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';
import { Search, MessageCircle, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';


interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
}

interface UserProfilesProps {
  user: User;
  onStartChat: (userId: string) => void;
  onViewProfile: (userId: string) => void;
}

const UserProfiles = ({ user, onStartChat, onViewProfile }: UserProfilesProps) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const { toast } = useToast();
     const { getLocalizedText } = useLanguage();

  // Load settings for dark mode
  const [settings, setSettings] = useState({ darkMode: false });

  useEffect(() => {
    const savedSettings = localStorage.getItem('nurcycle-app-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsedSettings }));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [user]);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .neq('id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast({
        title: "Error",
        description: "Failed to load user profiles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProfiles = profiles.filter(profile => 
    profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.bio?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className={`text-lg ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
          {getLocalizedText('profile.loading')}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card className={`${settings.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={getLocalizedText("profile.search.placeholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Profiles Grid */}
      {selectedProfile ? (
        /* Detailed Profile View */
        <Card className={`${settings.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setSelectedProfile(null)}
                className={`${settings.darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                ← {getLocalizedText('profile.backToAll')}
              </Button>
              <Button
                onClick={() => onStartChat(selectedProfile.id)}
                className="flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{getLocalizedText('profile.sendMessage')}</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-6">
              <Avatar className="w-32 h-32">
                <AvatarImage src={selectedProfile.avatar_url || undefined} />
                <AvatarFallback className="text-2xl">
                  {selectedProfile.full_name?.charAt(0) || selectedProfile.username?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>

              <div className="text-center space-y-2">
                <h2 className={`text-2xl font-bold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedProfile.full_name || selectedProfile.username ||getLocalizedText('profile.anonymousUser') }
                </h2>
                {selectedProfile.username && selectedProfile.full_name && (
                  <p className={`text-lg ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    @{selectedProfile.username}
                  </p>
                )}
                <Badge variant="secondary">
                 {getLocalizedText('profile.memberSince')} {formatDate(selectedProfile.created_at)}
                </Badge>
              </div>

              {selectedProfile.bio && (
                <div className="w-full max-w-2xl">
                  <h3 className={`text-lg font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {getLocalizedText('profile.about')}
                  </h3>
                  <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    {selectedProfile.bio}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Profiles List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.length === 0 ? (
            <div className="col-span-full">
              <Card className={`${settings.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
                <CardContent className="flex flex-col items-center justify-center h-64 space-y-4">
                  <Users className={`w-16 h-16 ${settings.darkMode ? 'text-gray-400' : 'text-gray-300'}`} />
                  <p className={`text-lg ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    {searchTerm ? getLocalizedText('profile.noUsersFoundSearch')  : getLocalizedText('profile.noUsersFound') }
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredProfiles.map((profile) => (
              <Card 
                key={profile.id} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  settings.darkMode 
                    ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' 
                    : 'bg-white hover:shadow-purple-100'
                }`}
                onClick={() => onViewProfile(profile.id)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={profile.avatar_url || undefined} />
                      <AvatarFallback className="text-lg">
                        {profile.full_name?.charAt(0) || profile.username?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>

                    <div className="text-center space-y-2">
                      <h3 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {profile.full_name || profile.username || getLocalizedText("profile.anonymousUser") }
                      </h3>
                      {profile.username && profile.full_name && (
                        <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          @{profile.username}
                        </p>
                      )}
                    </div>

                    {profile.bio && (
                      <p className={`text-sm text-center line-clamp-3 ${
                        settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {profile.bio}
                      </p>
                    )}

                    <div className="flex space-x-2 w-full">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartChat(profile.id);
                        }}
                        className="flex-1"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {getLocalizedText('"profile.message"')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfiles;