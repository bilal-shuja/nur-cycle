
import React, { useState , useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User } from '@supabase/supabase-js';
import { Image, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CreatePostProps {
  user: User;
  onPostCreated?: () => void;
}

const CreatePost = ({ user, onPostCreated }: CreatePostProps) => {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
        const { getLocalizedText } = useLanguage();

  const positiveEmojis = ['💕', '🌸', '✨', '🤗', '💐', '🌺', '💖', '🌷', '🦋', '🌟'];

  
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

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;
    
    const { error: uploadError, data } = await supabase.storage
      .from('post-images')
      .upload(fileName, file);

    if (uploadError) throw uploadError;
    
    const { data: { publicUrl } } = supabase.storage
      .from('post-images')
      .getPublicUrl(fileName);
    
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !imageFile) return;

    setLoading(true);
    try {
      let imageUrl = null;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const { error } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          content: content.trim(),
          image_url: imageUrl,
        });

      if (error) throw error;

      setContent('');
      setImageFile(null);
      onPostCreated?.();
      
      toast({
        title: "Success!",
        description: "Your post has been shared with the community.",
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

  const addEmoji = (emoji: string) => {
    setContent(prev => prev + emoji);
  };

  return (


   <Card className={`w-full ${settings.darkMode ? 'bg-slate-900' : 'bg-white'}`}>
  <div className={`absolute inset-0 rounded-2xl  ${settings.darkMode ? 'bg-slate-900' : ' from-purple-600 to-purple-800'} `}></div>
  <CardContent className="relative z-10 p-6">
    <CardHeader>
      <CardTitle className={`flex items-center space-x-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
        <span>{getLocalizedText('share.title')}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Textarea
            placeholder= { getLocalizedText('share.placeholder')}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className={`resize-none ${settings.darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
          />
        </div>
        
        {/* Positive Emojis */}
        <div className={`flex flex-wrap gap-2 p-2 ${settings.darkMode ? 'bg-gray-700' : 'bg-purple-50'} rounded-lg`}>
          {positiveEmojis.map((emoji, index) => (
            <Button
              key={index}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => addEmoji(emoji)}
              className={`text-lg hover:bg-purple-100 h-8 w-8 p-0 ${settings.darkMode ? 'text-white' : 'text-purple-600'}`}
            >
              {emoji}
            </Button>
          ))}
        </div>
        
        <div>
          <Label htmlFor="image" className={`flex items-center space-x-2 cursor-pointer ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
            <Image className="w-4 h-4" />
            <span>{getLocalizedText('share.add.image')}</span>
          </Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className={`mt-2 ${settings.darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
          />
        </div>

        {imageFile && (
          <div className="relative mt-4">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="max-h-48 rounded-lg object-cover"
            />
          </div>
        )}

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={loading || (!content.trim() && !imageFile)}
          className={`w-full ${settings.darkMode ? 'bg-gradient-to-r from-purple-600 to-purple-700' : 'bg-gradient-to-r from-purple-600 to-white'} hover:from-purple-700 hover:to-purple-50 text-white`}
        >
          <Send className="w-4 h-4 mr-2" />
          {loading ? getLocalizedText("share.loading") :getLocalizedText("share.button")}
        </Button>
      </form>
    </CardContent>
  </CardContent>
</Card>

  );
};

export default CreatePost;
