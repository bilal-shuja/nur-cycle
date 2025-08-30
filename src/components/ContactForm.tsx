import React, { useState , useEffect } from 'react';
import { Mail, Send, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactFormProps {
  onClose: () => void;
}

const ContactForm = ({ onClose }: ContactFormProps) => {
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
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: getLocalizedText('errorr'),
        description: getLocalizedText('fill_all_fields') ,
        variant: "destructive",
        className: "bg-yellow-600 text-white border border-yellow-700",

      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: getLocalizedText('errorr'), 
        description: getLocalizedText('valid_email'),
        variant: "destructive",
        className: "bg-orange-600 text-white border border-orange-700",


      });
      return;
    }

    setIsSubmitting(true);

    try {
      const {data,  error } = await supabase.functions.invoke('send-support-email', {
        body: {
          name: formData.name,
          email: formData.email,
          message: formData.message
        }
      });

      if (error) {
        throw error;
      }


      toast({
        title: getLocalizedText('message_sent'),
        description: getLocalizedText('thank_you'),
        variant: "destructive",
        className: "bg-blue-600 text-white border border-blue-700",

      });

      setFormData({ name: '', email: '', message: '' });
      onClose();
    } catch (error) {
      // console.error('Error sending message:', error);
      toast({
        title:  getLocalizedText('errorr'),
        description: getLocalizedText('failed_send'),
        variant: "destructive",
        className: "bg-red-600 text-white border border-red-700",

      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
  <Card className="relative overflow-hidden w-full max-w-md">
    {/* Background Layer */}
    <div className={`absolute inset-0 ${settings.darkMode
        ? 'bg-slate-900 border border-slate-700'
        : 'bg-white border border-gray-200'}`}></div>

    <CardHeader className="flex flex-row items-center justify-between relative z-10">
      <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
        <Mail className="w-5 h-5 text-primary" />
        {getLocalizedText('contact_support')}
      </CardTitle>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className={`h-8 w-8 p-0 ${settings.darkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <X className="w-4 h-4 dark:text-white" />
      </Button>
    </CardHeader>

    <CardContent className="relative z-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className={settings.darkMode ? 'text-gray-300' : ''}>
            {getLocalizedText('name')}
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder={getLocalizedText('your_full_name')}
            value={formData.name}
            onChange={handleInputChange}
            required
            className={`${settings.darkMode 
              ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400' 
              : ''}`}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className={settings.darkMode ? 'text-gray-300' : ''}>
            {getLocalizedText('email_address')}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={`${settings.darkMode 
              ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400' 
              : ''}`}
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message" className={settings.darkMode ? 'text-gray-300' : ''}>
            {getLocalizedText('messagee')}
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder={getLocalizedText('describe_issue')}
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            required
            className={`${settings.darkMode 
              ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400' 
              : ''}`}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className={`flex-1 ${settings.darkMode ? 'border-slate-600 text-gray-300 hover:bg-slate-700 ' : ''}`}
          >
            {getLocalizedText('cancel')}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1  dark:text-white"
          >
            {isSubmitting ? (
              getLocalizedText('sending')
            ) : (
              <>
                <Send className="w-4 h-4 mr-2 dark:text-white" />
                {getLocalizedText('send_message')}
              </>
            )}
          </Button>
        </div>
      </form>

      <p className={`text-xs mt-4 text-center ${settings.darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>
        {getLocalizedText('also_email')}
        <span className="font-medium">support@nurcycle.app</span>
      </p>
    </CardContent>
  </Card>
</div>

    </>
  );
};

export default ContactForm;