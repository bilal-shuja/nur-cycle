import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User } from '@supabase/supabase-js';
import { Camera, Save, Edit, EyeOff, Eye, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';


interface UserProfileProps {
  user: User;
  viewingUserId?: string; // If provided, shows another user's profile in read-only mode
}

interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  anonymous_mode: boolean;
}

const UserProfile = ({ user, viewingUserId }: UserProfileProps) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const isOwnProfile = !viewingUserId || viewingUserId === user.id;
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

const { getLocalizedText } = useLanguage();
  

  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    bio: '',
    anonymous_mode: false,
  });

  const [settings, setSettings] = useState({
    darkMode: false,
  });

  useEffect(() => {
    // Load saved settings
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
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const targetUserId = viewingUserId || user.id;
    fetchProfile(targetUserId);
  }, [user.id, viewingUserId]);

  const fetchProfile = async (targetUserId?: string) => {
    try {
      const profileId = targetUserId || user.id;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', profileId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setProfile({
          ...data,
          anonymous_mode: (data as any).anonymous_mode || false,
        });
        setFormData({
          username: data.username || '',
          full_name: data.full_name || '',
          bio: data.bio || '',
          anonymous_mode: (data as any).anonymous_mode || false,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const uploadAvatar = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/avatar.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });

    if (uploadError) throw uploadError;
    
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);
    
    return publicUrl;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let avatarUrl = profile?.avatar_url;
      
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile);
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username: formData.username || null,
          full_name: formData.full_name || null,
          bio: formData.bio || null,
          avatar_url: avatarUrl,
          anonymous_mode: formData.anonymous_mode,
        });

      if (error) throw error;

      await fetchProfile();
      setEditing(false);
      setAvatarFile(null);
      
      toast({
        title: "Success!",
        description: "Your profile has been updated.",
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

  // Cleanup auth state utility function
  const cleanupAuthState = () => {
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  const handleSignOut = async () => {
    try {
      // Clean up auth state
      cleanupAuthState();
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      // Force page reload for a clean state
      window.location.href = '/auth';
    } catch (error) {
      console.error('Error signing out:', error);
      // Even if sign out fails, redirect to auth page
      window.location.href = '/auth';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className={`relative overflow-hidden card-3d ${settings.darkMode ? 'bg-slate-900 text-white' : 'bg-white'}`}>
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-600 to-purple-800'}`}></div>
        <CardContent className="relative z-10 p-6">
          <CardHeader>
            <CardTitle className={`flex items-center justify-between ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
              <span>{isOwnProfile ? 'Your Profile' : `${profile?.full_name || profile?.username || getLocalizedText('profile.userProfile')}`}</span>
              {isOwnProfile && (
                <Button
                  variant="outline"
                  onClick={() => setEditing(!editing)}
                  className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  <Edit className="w-4 h-4" />
                  <span>{editing ? getLocalizedText('profile.cancel')  : getLocalizedText('profile.edit')}</span>
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className={`w-24 h-24 ${settings.darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <AvatarImage 
                  src={avatarFile ? URL.createObjectURL(avatarFile) : profile?.avatar_url || undefined} 
                />
                <AvatarFallback className={`text-2xl ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>

              {editing && isOwnProfile && (
                <div>
                  <Label htmlFor="avatar" className={`flex items-center space-x-2 cursor-pointer ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Camera className="w-4 h-4" />
                    <span>{getLocalizedText('profile.changeAvatar')}</span>
                  </Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                  />
                </div>
              )}
            </div>
            
            {/* Profile Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="full_name" className={settings.darkMode ? 'text-white' : 'text-gray-900'}>{getLocalizedText('profile.fullName')}</Label>
                {editing && isOwnProfile ? (
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder= {getLocalizedText('profile.fullName.placeholder')}
                    className={`mt-2 ${settings.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}
                  />
                ) : (
                  <p className={`mt-1 p-2 rounded ${settings.darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
                    {profile?.full_name || getLocalizedText(' profile.fullName.notSet')}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="username" className={settings.darkMode ? 'text-white' : 'text-gray-900'}>{getLocalizedText('profile.username')}</Label>
                {editing && isOwnProfile ? (
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder={getLocalizedText('profile.username.placeholder')}
                    className={`mt-2 ${settings.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}
                  />
                ) : (
                  <p className={`mt-1 p-2 rounded ${settings.darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
                    {profile?.username ||  getLocalizedText(' profile.fullName.notSet')}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="bio" className={settings.darkMode ? 'text-white' : 'text-gray-900'}>{getLocalizedText('profile.bio')}</Label>
                {editing && isOwnProfile ? (
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about yourself"
                    rows={3}
                    className={`mt-2 ${settings.darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'}`}
                  />
                ) : (
                  <p className={`mt-1 p-2 rounded min-h-[80px] ${settings.darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
                    {profile?.bio || getLocalizedText('profile.bio.placeholder')}
                  </p>
                )}
              </div>

              {/* Email - Only show for own profile */}
              {isOwnProfile && (
                <div>
                  <Label className={settings.darkMode ? 'text-white' : 'text-gray-900'}>{getLocalizedText('profile.email')}</Label>
                  <p className={`mt-1 p-2 rounded ${settings.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'}`}>
                    {user.email}
                  </p>
                </div>
              )}

              {/* Anonymous Mode Toggle - Only show for own profile */}
              {isOwnProfile && (
                <div className="space-y-3">
                  <Label className={settings.darkMode ? 'text-white' : 'text-gray-900'}>
                   {getLocalizedText('profile.privacySettings')}
                  </Label>
                  <div className={`p-4 rounded-lg border ${settings.darkMode ? 'bg-slate-800 border-slate-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {formData.anonymous_mode ? (
                          <EyeOff className={`w-5 h-5 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                        ) : (
                          <Eye className={`w-5 h-5 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                        )}
                        <div>
                          <p className={`font-medium ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {getLocalizedText('profile.anonymousMode')}
                          </p>
                          <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                           {getLocalizedText('profile.anonymousMode.description')}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={formData.anonymous_mode}
                        onCheckedChange={(checked) => {
                          if (editing) {
                            setFormData({ ...formData, anonymous_mode: checked });
                          } else {
                            // Allow toggling even when not in edit mode for immediate privacy control
                            const newFormData = { ...formData, anonymous_mode: checked };
                            setFormData(newFormData);
                            
                            // Save immediately
                            supabase
                              .from('profiles')
                              .upsert({
                                id: user.id,
                                username: profile?.username || null,
                                full_name: profile?.full_name || null,
                                bio: profile?.bio || null,
                                avatar_url: profile?.avatar_url || null,
                                anonymous_mode: checked,
                              })
                              .then(({ error }) => {
                                if (error) {
                                  toast({
                                    title: "Error",
                                    description: "Failed to update anonymous mode",
                                    variant: "destructive",
                                  });
                                  // Revert the change
                                  setFormData({ ...formData, anonymous_mode: !checked });
                                } else {
                                  setProfile(prev => prev ? { ...prev, anonymous_mode: checked } : null);
                                  toast({
                                    title: "Updated",
                                    description: `Anonymous mode ${checked ? 'enabled' : 'disabled'}`,
                                  });
                                }
                              });
                          }
                        }}
                        disabled={loading}
                      />
                    </div>
                    
                    {formData.anonymous_mode && (
                      <div className={`mt-3 p-3 rounded ${settings.darkMode ? 'bg-slate-700' : 'bg-blue-50'}`}>
                        <p className={`text-sm ${settings.darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                          <strong>Note:</strong> {getLocalizedText('profile.note')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {editing && isOwnProfile && (
              <Button
                onClick={handleSave}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? getLocalizedText('profile.saving'): getLocalizedText('profile.saveChanges') }
              </Button>
            )}
          </CardContent>

          {/* Sign Out Section - Only show for own profile */}
          {isOwnProfile && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-600">
              <Button
                onClick={handleSignOut}
                variant="outline"
                className={`w-full flex items-center justify-center space-x-2 ${
                  settings.darkMode 
                    ? 'border-red-400 text-red-400 hover:bg-red-400 hover:text-white' 
                    : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                }`}
              >
                <LogOut className="w-4 h-4" />
                <span>{getLocalizedText('profile.signOut')}</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Copyright Footer */}
      {/* <div className={`text-center py-4 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
        © 2025 {getLocalizedText('footer.copyright')}
      </div> */}
    </div>
  );
};

export default UserProfile;