
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, User, BookOpen, Loader2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const IslamicAIBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'بسم الله الرحمن الرحيم\n\nAssalamu Alaikum wa Rahmatullahi wa Barakatuh!\n\nI am your Islamic AI assistant following the methodology of the Salaf (Ahlus-Sunnah wal-Jama\'ah). I provide guidance strictly according to the Quran and authentic Sunnah as understood by the righteous predecessors.\n\nI specialize in:\n• Women\'s religious matters and purity rulings\n• Evidence-based Islamic jurisprudence\n• Authentic hadith references (Bukhari, Muslim, etc.)\n• Classical and contemporary Salafi scholarship\n\nAll answers are grounded in authentic Islamic sources with proper references. How may I assist you in your religious matters today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
          console.log('Settings loaded:', parsedSettings);
        } catch (error) {
          console.error('Error loading settings:', error);
        }
      }
      else {
      // Agar kuch save nahi hai, toh default light mode lagaye:
      document.documentElement.classList.remove('dark');
    }
  
      // Apply dark mode immediately if enabled:
  
      // const isDarkMode = savedSettings ? JSON.parse(savedSettings).darkMode : false;
      // if (isDarkMode) {
      //   document.documentElement.classList.add('dark');
      // }
  
  
    }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('islamic-ai-chat', {
        body: { 
          message: input.trim(),
          context: 'Salafi Islamic guidance according to Quran and authentic Sunnah'
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'أعتذر، لم أتمكن من معالجة طلبك في الوقت الحالي. I apologize, but I couldn\'t process your request at the moment. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling AI:', error);
      toast({
        title: "خطأ - Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };



  const suggestedQuestions = [
    "What does Sahih Bukhari say about prayer during menstruation?",
    "Show me authentic hadith about performing ghusl",
    "What are the Salafi rulings on reading Quran during periods?",
    "Reference from Bukhari and Muslim about fasting exemptions",
    "What did the Salaf say about worship during menstruation?",
    "Authentic evidence for postpartum bleeding duration",
    "Sahih hadith about intimacy during menstruation",
    "What are the signs of purity according to authentic sources?"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Bot className="w-6 h-6" />
            Salafi Islamic AI Assistant
          </CardTitle>
          <p className="text-green-700 text-sm">
            <span className="font-arabic text-lg">بسم الله</span> - Ask questions about Islam following the methodology of the Salaf. 
            All responses based on Quran, authentic Sunnah, and understanding of the righteous predecessors.
          </p>
        </CardHeader>
      </Card> */}

      <Card className={`relative overflow-hidden card-3d`}>
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-green-50 to-teal-50 border-green-200'}`}></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-green-800'}`}>
      <Bot className={`w-6 h-6 ${settings.darkMode ? 'text-green-400' : 'text-green-800'}`} />
      Salafi Islamic AI Assistant
    </CardTitle>
    <p className={`${settings.darkMode ? 'text-gray-300' : 'text-green-700'} text-sm`}>
      <span className="font-arabic text-lg">بسم الله</span> - Ask questions about Islam following the methodology of the Salaf.  
      All responses based on Quran, authentic Sunnah, and understanding of the righteous predecessors.
    </p>
  </CardHeader>
</Card>

      {/* Chat Container - Fixed Height with Internal Scrolling */}
      {/* <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Chat with AI Assistant</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                      {message.content}
                    </p>
                    <p className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-green-200' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-gray-600">جاري البحث... Searching authentic sources...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="border-t p-4 bg-white">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask for authentic Islamic guidance with references..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!input.trim() || isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card> */}

      <Card className={`relative overflow-hidden h-[600px] flex flex-col`}>
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-green-50 to-teal-50 border-green-200'}`}></div>

  <CardHeader className="pb-2 relative z-10">
    <CardTitle className={`${settings.darkMode ? 'text-white' : 'text-green-800'} text-lg`}>
      Chat with AI Assistant
    </CardTitle>
  </CardHeader>

  <CardContent className="flex-1 flex flex-col p-0 overflow-hidden relative z-10">
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.role === 'assistant' && (
              <div className={`w-8 h-8 rounded-full ${settings.darkMode ? 'bg-slate-700' : 'bg-green-100'} flex items-center justify-center flex-shrink-0`}>
                <Bot className={`${settings.darkMode ? 'text-green-400' : 'text-green-600'} w-5 h-5`} />
              </div>
            )}
            <div className={`max-w-[80%] p-3 rounded-lg ${message.role === 'user'
              ? `${settings.darkMode ? 'bg-green-700 text-white' : 'bg-green-600 text-white'}`
              : `${settings.darkMode ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                {message.content}
              </p>
              <p className={`text-xs mt-2 ${message.role === 'user'
                ? `${settings.darkMode ? 'text-green-200' : 'text-green-200'}`
                : `${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {message.role === 'user' && (
              <div className={`w-8 h-8 rounded-full ${settings.darkMode ? 'bg-green-700' : 'bg-green-600'} flex items-center justify-center flex-shrink-0`}>
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className={`w-8 h-8 rounded-full ${settings.darkMode ? 'bg-slate-700' : 'bg-green-100'} flex items-center justify-center flex-shrink-0`}>
              <Bot className={`${settings.darkMode ? 'text-green-400' : 'text-green-600'} w-5 h-5`} />
            </div>
            <div className={`${settings.darkMode ? 'bg-slate-700 text-gray-300' : 'bg-gray-100'} p-3 rounded-lg`}>
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                  جاري البحث... Searching authentic sources...
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>

    <div className={`${settings.darkMode ? 'border-t border-slate-700 bg-slate-800' : 'border-t bg-white'} p-4`}>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask for authentic Islamic guidance with references..."
          disabled={isLoading}
          className={`${settings.darkMode ? 'bg-slate-700 text-white border-slate-600' : ''} flex-1`}
        />
        <Button 
          onClick={handleSendMessage}
          disabled={!input.trim() || isLoading}
          className={`${settings.darkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-600 hover:bg-green-700'}`}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </CardContent>
</Card>


      {/* Suggested Questions */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Suggested Questions - Evidence-Based
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left h-auto p-4 justify-start text-sm hover:bg-green-50 border-green-200 text-wrap"
                onClick={() => setInput(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card> */}
    <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-green-50 to-teal-50 border-green-200'}`}></div>

  <CardHeader className="relative z-10">
    <CardTitle className={`text-lg flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-gray-700'}`}>
      <BookOpen className={`w-5 h-5 ${settings.darkMode ? 'text-green-400' : 'text-gray-700'}`} />
      Suggested Questions – Evidence-Based
    </CardTitle>
  </CardHeader>

  <CardContent className="relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {suggestedQuestions.map((question, index) => (
        <Button
          key={index}
          variant="outline"
          className={`text-left h-auto p-4 justify-start text-sm text-wrap transition-all duration-300 ${settings.darkMode ? 'bg-slate-800 border-slate-600 text-gray-200 hover:bg-slate-700' : 'bg-white border-green-200 text-gray-700 hover:bg-green-50'}`}
          onClick={() => setInput(question)}
        >
          {question}
        </Button>
      ))}
    </div>
  </CardContent>
</Card>



      {/* Enhanced Methodology Info */}
      {/* <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Bot className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">Salafi Methodology (منهج السلف)</h3>
              <p className="text-amber-700 text-sm leading-relaxed mb-3">
                This AI follows the methodology of Ahlus-Sunnah wal-Jama'ah, providing answers based on:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-amber-800 mb-1">Primary Sources:</h4>
                  <ul className="text-amber-700 text-sm space-y-1">
                    <li>• Noble Quran with proper tafsir</li>
                    <li>• Sahih al-Bukhari & Sahih Muslim</li>
                    <li>• Other authentic hadith collections</li>
                    <li>• Understanding of the Salaf</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-amber-800 mb-1">Referenced Scholars:</h4>
                  <ul className="text-amber-700 text-sm space-y-1">
                    <li>• Ibn Taymiyyah & Ibn al-Qayyim</li>
                    <li>• Ibn Qudamah (Zad Al-Mustaqni)</li>
                    <li>• Ibn Baz, Ibn Uthaymeen, al-Albani</li>
                    <li>• The Four Imams and early scholars</li>
                  </ul>
                </div>
              </div>
              <p className="text-amber-600 text-xs mt-3 italic">
                <strong>Note:</strong> All answers include authentic references. For complex matters, consult qualified Salafi scholars.
              </p>
            </div>
          </div>
        </CardContent>
      </Card> */}

      <Card className="relative overflow-hidden card-3d">
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-amber-50 to-yellow-50 border-amber-200'}`}></div>

  <CardContent className="relative z-10 p-6">
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${settings.darkMode ? 'bg-slate-800' : 'bg-amber-100'}`}>
        <Bot className={`w-6 h-6 ${settings.darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
      </div>

      <div>
        <h3 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}>Salafi Methodology (منهج السلف)</h3>
        <p className={`${settings.darkMode ? 'text-gray-300' : 'text-amber-700'} text-sm leading-relaxed mb-3`}>
          This AI follows the methodology of Ahlus-Sunnah wal-Jama'ah, providing answers based on:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className={`font-medium mb-1 ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}>Primary Sources:</h4>
            <ul className={`text-sm space-y-1 ${settings.darkMode ? 'text-gray-300' : 'text-amber-700'}`}>
              <li>• Noble Quran with proper tafsir</li>
              <li>• Sahih al-Bukhari & Sahih Muslim</li>
              <li>• Other authentic hadith collections</li>
              <li>• Understanding of the Salaf</li>
            </ul>
          </div>
          <div>
            <h4 className={`font-medium mb-1 ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}>Referenced Scholars:</h4>
            <ul className={`text-sm space-y-1 ${settings.darkMode ? 'text-gray-300' : 'text-amber-700'}`}>
              <li>• Ibn Taymiyyah & Ibn al-Qayyim</li>
              <li>• Ibn Qudamah (Zad Al-Mustaqni)</li>
              <li>• Ibn Baz, Ibn Uthaymeen, al-Albani</li>
              <li>• The Four Imams and early scholars</li>
            </ul>
          </div>
        </div>

        <p className={`${settings.darkMode ? 'text-gray-400' : 'text-amber-600'} text-xs mt-3 italic`}>
          <strong>Note:</strong> All answers include authentic references. For complex matters, consult qualified Salafi scholars.
        </p>
      </div>
    </div>
  </CardContent>
</Card>

    </div>
  );
};

export default IslamicAIBot;
