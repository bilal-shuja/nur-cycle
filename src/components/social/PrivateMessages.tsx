import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';
import { Send, ArrowLeft, Search } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';


interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
}
interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  read_at: string | null;
}
interface Conversation {
  id: string;
  participant_1: string;
  participant_2: string;
  created_at: string;
  updated_at: string;
  other_participant?: Profile;
  last_message?: Message;
}
interface PrivateMessagesProps {
  user: User;
}
const PrivateMessages = ({
  user
}: PrivateMessagesProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);

     const { getLocalizedText } = useLanguage();

  const {
    toast
  } = useToast();

  // Load settings for dark mode
  const [settings, setSettings] = useState({
    darkMode: false
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
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);
  useEffect(() => {
    if (user) {
      fetchConversations();
      fetchProfiles();
    }
  }, [user]);
  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
      markMessagesAsRead(selectedConversation);
    }
  }, [selectedConversation]);
  const fetchConversations = async () => {
    try {
      const {
        data,
        error
      } = await (supabase as any).from('conversations').select(`
          *,
          private_messages!conversations_id_fkey (
            content,
            created_at,
            sender_id
          )
        `).or(`participant_1.eq.${user.id},participant_2.eq.${user.id}`).order('updated_at', {
        ascending: false
      });
      if (error) throw error;

      // Get other participants' profiles
      const conversationsWithProfiles = await Promise.all(data.map(async (conv: any) => {
        const otherParticipantId = conv.participant_1 === user.id ? conv.participant_2 : conv.participant_1;
        const {
          data: profile
        } = await (supabase as any).from('profiles').select('*').eq('id', otherParticipantId).single();
        return {
          ...conv,
          other_participant: profile,
          last_message: conv.private_messages?.[0]
        };
      }));
      setConversations(conversationsWithProfiles);
    } catch (error) {
      // console.error('Error fetching conversations:', error);
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const fetchProfiles = async () => {
    try {
      const {
        data,
        error
      } = await (supabase as any).from('profiles').select('*').neq('id', user.id);
      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };
  const fetchMessages = async (conversationId: string) => {
    try {
      const {
        data,
        error
      } = await (supabase as any).from('private_messages').select('*').or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`).order('created_at', {
        ascending: true
      });
      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  const markMessagesAsRead = async (conversationId: string) => {
    try {
      await (supabase as any).from('private_messages').update({
        read_at: new Date().toISOString()
      }).eq('receiver_id', user.id).is('read_at', null);
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };
  const startConversation = async (otherUserId: string) => {
    try {
      // Check if conversation already exists
      const {
        data: existingConv
      } = await (supabase as any).from('conversations').select('*').or(`and(participant_1.eq.${user.id},participant_2.eq.${otherUserId}),and(participant_1.eq.${otherUserId},participant_2.eq.${user.id})`).single();
      if (existingConv) {
        setSelectedConversation(existingConv.id);
        return;
      }

      // Create new conversation
      const {
        data,
        error
      } = await (supabase as any).from('conversations').insert({
        participant_1: user.id,
        participant_2: otherUserId
      }).select().single();
      if (error) throw error;
      setSelectedConversation(data.id);
      await fetchConversations();
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: "Error",
        description: "Failed to start conversation",
        variant: "destructive"
      });
    }
  };
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || sendingMessage) return;
    const conversation = conversations.find(c => c.id === selectedConversation);
    if (!conversation) return;
    const receiverId = conversation.participant_1 === user.id ? conversation.participant_2 : conversation.participant_1;
    setSendingMessage(true);
    try {
      const {
        error
      } = await (supabase as any).from('private_messages').insert({
        sender_id: user.id,
        receiver_id: receiverId,
        content: newMessage.trim()
      });
      if (error) throw error;
      setNewMessage('');
      await fetchMessages(selectedConversation);
      await fetchConversations();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    } finally {
      setSendingMessage(false);
    }
  };
  const filteredProfiles = profiles.filter(profile => profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || profile.username?.toLowerCase().includes(searchTerm.toLowerCase()));
  if (loading) {
    return <div> {getLocalizedText('chat.loading')} </div>;
  }
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Conversations List */}
      <div className="lg:col-span-1">
        {/* <Card className={`${settings.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
          
          <CardContent className="bg-transparent">
            <ScrollArea className="h-96">
              {selectedConversation ? <div className="space-y-2">
                  <Button variant="ghost" onClick={() => setSelectedConversation(null)} className="w-full justify-start">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                   {getLocalizedText('chat.back')}
                  </Button>
                  {conversations.map(conversation => <div key={conversation.id} className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedConversation === conversation.id ? settings.darkMode ? 'bg-slate-700' : 'bg-purple-100' : settings.darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`} onClick={() => setSelectedConversation(conversation.id)}>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={conversation.other_participant?.avatar_url || undefined} />
                          <AvatarFallback>
                            {conversation.other_participant?.full_name?.charAt(0) || conversation.other_participant?.username?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold truncate ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {conversation.other_participant?.full_name || conversation.other_participant?.username}
                          </p>
                          {conversation.last_message && <p className={`text-sm truncate ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                              {conversation.last_message.content}
                            </p>}
                        </div>
                      </div>
                    </div>)}
                </div> : <div className="space-y-2">
                  {filteredProfiles.map(profile => <div key={profile.id} className={`p-3 rounded-lg cursor-pointer transition-colors ${settings.darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`} onClick={() => startConversation(profile.id)}>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={profile.avatar_url || undefined} />
                          <AvatarFallback>
                            {profile.full_name?.charAt(0) || profile.username?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold truncate ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {profile.full_name || profile.username}
                          </p>
                        </div>
                      </div>
                    </div>)}
                </div>}
            </ScrollArea>
          </CardContent>
        </Card> */}

        <Card className="relative overflow-hidden card-3d">
  {/* Background Layer */}
  <div className={`absolute inset-0 ${settings.darkMode 
      ? 'bg-slate-800 border border-slate-700' 
      : 'bg-white border border-gray-200'}`}></div>

  <CardContent className="bg-transparent relative z-10">
    <ScrollArea className="h-96">
      {selectedConversation ? (
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedConversation(null)} 
            className={`w-full justify-start ${settings.darkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {getLocalizedText('chat.back')}
          </Button>

          {conversations.map(conversation => (
            <div 
              key={conversation.id} 
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors 
                ${selectedConversation === conversation.id 
                  ? settings.darkMode 
                    ? 'bg-slate-700' 
                    : 'bg-purple-100' 
                  : settings.darkMode 
                    ? 'hover:bg-slate-700' 
                    : 'hover:bg-gray-100'}`}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={conversation.other_participant?.avatar_url || undefined} />
                  <AvatarFallback>
                    {conversation.other_participant?.full_name?.charAt(0) || conversation.other_participant?.username?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold truncate ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {conversation.other_participant?.full_name || conversation.other_participant?.username}
                  </p>
                  {conversation.last_message && (
                    <p className={`text-sm truncate ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      {conversation.last_message.content}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredProfiles.map(profile => (
            <div 
              key={profile.id} 
              onClick={() => startConversation(profile.id)} 
              className={`p-3 rounded-lg cursor-pointer transition-colors 
                ${settings.darkMode 
                  ? 'hover:bg-slate-700' 
                  : 'hover:bg-gray-100'}`}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={profile.avatar_url || undefined} />
                  <AvatarFallback>
                    {profile.full_name?.charAt(0) || profile.username?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold truncate ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {profile.full_name || profile.username}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  </CardContent>
</Card>


      </div>

      {/* Messages Area */}
      <div className="lg:col-span-2">
        {selectedConversation ? 
        
        // <Card className={`${settings.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
        //     <CardHeader>
        //       <CardTitle className={`${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
        //         {conversations.find(c => c.id === selectedConversation)?.other_participant?.full_name || conversations.find(c => c.id === selectedConversation)?.other_participant?.username}
        //       </CardTitle>
        //     </CardHeader>
        //     <CardContent>
        //       <div className="space-y-4">
        //         <ScrollArea className="h-96">
        //           <div className="space-y-4 p-4">
        //             {messages.map(message => <div key={message.id} className={`flex ${message.sender_id === user.id ? 'justify-end' : 'justify-start'}`}>
        //                 <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender_id === user.id ? 'bg-purple-600 text-white' : settings.darkMode ? 'bg-slate-700 text-white' : 'bg-gray-200 text-gray-900'}`}>
        //                   <p>{message.content}</p>
        //                   <p className={`text-xs mt-1 ${message.sender_id === user.id ? 'text-purple-200' : settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        //                     {formatDistanceToNow(new Date(message.created_at), {
        //                 addSuffix: true
        //               })}
        //                   </p>
        //                 </div>
        //               </div>)}
        //           </div>
        //         </ScrollArea>

        //         <div className="flex space-x-2">
        //           <Input placeholder={getLocalizedText('chat.input.placeholder')} value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} disabled={sendingMessage} />
        //           <Button onClick={sendMessage} disabled={sendingMessage || !newMessage.trim()}>
        //             <Send className="w-4 h-4" />
        //           </Button>
        //         </div>
        //       </div>
        //     </CardContent>
        //   </Card> 

        <Card className="relative overflow-hidden card-3d">
  {/* Background Layer */}
  <div className={`absolute inset-0 ${settings.darkMode 
      ? 'bg-slate-800 border border-slate-700' 
      : 'bg-white border border-gray-200'}`}></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
      {conversations.find(c => c.id === selectedConversation)?.other_participant?.full_name 
        || conversations.find(c => c.id === selectedConversation)?.other_participant?.username}
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10">
    <div className="space-y-4">
      {/* Messages Scroll Area */}
      <ScrollArea className="h-96">
        <div className="space-y-4 p-4">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex ${message.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg 
                  ${message.sender_id === user.id 
                    ? 'bg-purple-600 text-white' 
                    : settings.darkMode 
                      ? 'bg-slate-700 text-white' 
                      : 'bg-gray-200 text-gray-900'}`}
              >
                <p>{message.content}</p>
                <p 
                  className={`text-xs mt-1 
                    ${message.sender_id === user.id 
                      ? 'text-purple-200' 
                      : settings.darkMode 
                        ? 'text-gray-400' 
                        : 'text-gray-500'}`}
                >
                  {formatDistanceToNow(new Date(message.created_at), {
                    addSuffix: true
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input + Send */}
      <div className="flex space-x-2">
        <Input 
          placeholder={getLocalizedText('chat.input.placeholder')} 
          value={newMessage} 
          onChange={e => setNewMessage(e.target.value)} 
          onKeyPress={e => e.key === 'Enter' && sendMessage()} 
          disabled={sendingMessage}
          className={`${settings.darkMode 
            ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400' 
            : ''}`}
        />
        <Button 
          onClick={sendMessage} 
          disabled={sendingMessage || !newMessage.trim()}
          className="flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </CardContent>
</Card>
          
          :
       
          // <Card className={`${settings.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
          //   <CardContent className="flex items-center justify-center h-96">
          //     <div className="text-center">
          //       <p className={`text-lg ${settings.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
          //         {getLocalizedText('chat.select.user')}
          //       </p>
          //     </div>
          //   </CardContent>
          // </Card>

          <Card className="relative overflow-hidden card-3d">
  {/* Background Layer */}
  <div className={`absolute inset-0 ${settings.darkMode 
      ? 'bg-slate-800 border border-slate-700' 
      : 'bg-white border border-gray-200'}`}></div>

  <CardContent className="flex items-center justify-center h-96 relative z-10">
    <div className="text-center">
      <p className={`text-lg ${settings.darkMode ? 'text-gray-100' : 'text-gray-500'}`}>
        {getLocalizedText('chat.select.user')}
      </p>
    </div>
  </CardContent>
</Card>
          
          }
      </div>
    </div>;
};
export default PrivateMessages;