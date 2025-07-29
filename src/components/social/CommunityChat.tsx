import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';
import { Send, Users } from 'lucide-react';
import { toast } from "sonner";
import { useLanguage } from '@/contexts/LanguageContext';


interface Message {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  user_email: string;
}

interface CommunityChatProps {
  user: User;
}

const CommunityChat = ({ user }: CommunityChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: false
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { getLocalizedText } = useLanguage();


  useEffect(() => {
    // Load saved settings
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel('community-chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'community_messages'
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('community_messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const { error } = await (supabase as any)
        .from('community_messages')
        .insert({
          content: newMessage.trim(),
          user_id: user.id,
          user_email: user.email
        });

      if (error) throw error;

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(getLocalizedText('failed.to.send.message'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="relative overflow-hidden card-3d">
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : 'from-purple-600 to-white'}`}></div>
        <CardContent className="relative z-10 p-6">
          <CardHeader>
            <CardTitle className={`text-2xl text-center ${settings.darkMode ? 'text-white' : 'text-lavender-900'}`}>
              💬 {getLocalizedText('community.chat')} 💬
            </CardTitle>
            <p className={`text-center opacity-90 ${settings.darkMode ? 'text-gray-300' : 'text-lavender-900'}`}>
              {getLocalizedText('community.chat.description')}
            </p>
          </CardHeader>
        </CardContent>
      </Card>

      {/* Chat Container */}
      <Card className={`relative overflow-hidden h-[600px] flex flex-col`}>
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : 'from-purple-50 to-white border-purple-200'}`}></div>

        <CardHeader className="pb-2 relative z-10 border-b">
          <div className="flex items-center gap-2">
            <Users className={`w-5 h-5 ${settings.darkMode ? 'text-white' : 'text-purple-600'}`} />
            <CardTitle className={`${settings.darkMode ? 'text-white' : 'text-purple-800'} text-lg`}>
              {getLocalizedText('live.community.chat')}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden relative z-10">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className={`text-center py-8 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>{getLocalizedText('no.messages.yet')}</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.user_id === user.id ? 'justify-end' : 'justify-start'
                      }`}
                  >
                    {message.user_id !== user.id && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-purple-100 text-purple-700">
                          {getInitials(message.user_email)}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[70%] rounded-lg px-3 py-2 ${message.user_id === user.id
                          ? settings.darkMode
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-600 text-white'
                          : settings.darkMode
                            ? 'bg-slate-700 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                    >
                      {message.user_id !== user.id && (
                        <p className={`text-xs mb-1 ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                          {message.user_email.split('@')[0]}
                        </p>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.user_id === user.id
                          ? 'text-purple-100'
                          : settings.darkMode
                            ? 'text-gray-400'
                            : 'text-gray-500'
                        }`}>
                        {formatTime(message.created_at)}
                      </p>
                    </div>

                    {message.user_id === user.id && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-purple-100 text-purple-700">
                          {getInitials(message.user_email)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className={`p-4 border-t ${settings.darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={getLocalizedText('typeYourMessage')}
                disabled={isLoading}
                className={`flex-1 ${settings.darkMode
                    ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300'
                  }`}
              />
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim() || isLoading}
                size="icon"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Guidelines */}
      <Card className="relative overflow-hidden card-3d bg-purple-50 border-purple-200">
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : 'from-purple-600 to-white'}`}></div>
        <CardContent className="relative z-10 p-4">
          <h3 className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-purple-800'} mb-2`}>
            {getLocalizedText('chat.guidelines')}
          </h3>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 text-sm ${settings.darkMode ? 'text-gray-300' : 'text-lavender-800'}`}>
            <div>• {getLocalizedText('beRespectfulAndKind')}</div>
            <div>• {getLocalizedText('noInappropriateLanguage')}</div>
            <div>• {getLocalizedText('stayOnTopic')}</div>
            <div>• {getLocalizedText('supportEachOther')}</div>
            <div>• {getLocalizedText('followIslamicValues')}</div>
            <div>• {getLocalizedText('noPersonalAttacks')}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityChat;