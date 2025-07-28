
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, User, BookOpen, Loader2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const IslamicAIBot = () => {
  const { getLocalizedText } = useLanguage();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: getLocalizedText('aiGreeting'),
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
      } catch (error) {
      }
    }
    else {

      document.documentElement.classList.remove('dark');
    }

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
          context: getLocalizedText('salafiGuidance')
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || getLocalizedText('apology'),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: getLocalizedText('error'),
        description: getLocalizedText('failedAIResponse'),
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
    `${getLocalizedText('whatDoesSahihBukhariSayPrayer')}`,
    `${getLocalizedText('showMeAuthenticHadithGhusl')}`,
    `${getLocalizedText('salafiRulingsReadingQuran')}`,
    `${getLocalizedText('referenceBukhariMuslimFastingExemptions')}`,
    `${getLocalizedText('salafSayAboutWorshipDuringMenstruation')}`,
    `${getLocalizedText('authenticEvidencePostpartumBleeding')}`,
    `${getLocalizedText('sahihHadithIntimacyMenstruation')}`,
    `${getLocalizedText('signsPurityAuthenticSources')}`,
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">


      <Card className={`relative overflow-hidden card-3d`}>
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-green-50 to-teal-50 border-green-200'}`}></div>

        <CardHeader className="relative z-10">
          <CardTitle className={`flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-green-800'}`}>
            <Bot className={`w-6 h-6 ${settings.darkMode ? 'text-green-400' : 'text-green-800'}`} />
            {getLocalizedText('salafiAIAssistant')}
          </CardTitle>
          <p className={`${settings.darkMode ? 'text-gray-300' : 'text-green-700'} text-sm`}>
            <span className="font-arabic text-lg"> {getLocalizedText('bismillah')} </span> - {getLocalizedText('askQuestionsSalaf')}
            {getLocalizedText('allResponsesBasedOn')}
          </p>
        </CardHeader>
      </Card>

      <Card className={`relative overflow-hidden h-[600px] flex flex-col`}>
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-green-50 to-teal-50 border-green-200'}`}></div>

        <CardHeader className="pb-2 relative z-10">
          <CardTitle className={`${settings.darkMode ? 'text-white' : 'text-green-800'} text-lg`}>
            {getLocalizedText('chatWithAI')}
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
                        {getLocalizedText('searchingAuthenticSources')}
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
                placeholder={getLocalizedText('askForAuthenticGuidance')}
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

      <Card className="relative overflow-hidden card-3d">
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-green-50 to-teal-50 border-green-200'}`}></div>

        <CardHeader className="relative z-10">
          <CardTitle className={`text-lg flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-gray-700'}`}>
            <BookOpen className={`w-5 h-5 ${settings.darkMode ? 'text-green-400' : 'text-gray-700'}`} />
            {getLocalizedText('suggestedQuestions')}
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

      <Card className="relative overflow-hidden card-3d">
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-amber-50 to-yellow-50 border-amber-200'}`}></div>

        <CardContent className="relative z-10 p-6">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${settings.darkMode ? 'bg-slate-800' : 'bg-amber-100'}`}>
              <Bot className={`w-6 h-6 ${settings.darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
            </div>

            <div>
              <h3 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}> {getLocalizedText('salafiMethodology')} </h3>
              <p className={`${settings.darkMode ? 'text-gray-300' : 'text-amber-700'} text-sm leading-relaxed mb-3`}>
                {getLocalizedText('thisAIFollows')}:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className={`font-medium mb-1 ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}>{getLocalizedText('primarySources')}:</h4>
                  <ul className={`text-sm space-y-1 ${settings.darkMode ? 'text-gray-300' : 'text-amber-700'}`}>
                    <li>• {getLocalizedText('nobleQuran')} </li>
                    <li>• {getLocalizedText('sahihBukhariMuslim')} </li>
                    <li>• {getLocalizedText('otherHadithCollections')} </li>
                    <li>• {getLocalizedText('understandingOfSalaf')} </li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-medium mb-1 ${settings.darkMode ? 'text-white' : 'text-amber-800'}`}>{getLocalizedText('referencedScholars')}:</h4>
                  <ul className={`text-sm space-y-1 ${settings.darkMode ? 'text-gray-300' : 'text-amber-700'}`}>
                    <li>• {getLocalizedText('ibnTaymiyyahIbnQayyim')} </li>
                    <li>• {getLocalizedText('ibnQudamah')} </li>
                    <li>• {getLocalizedText('ibnBazIbnUthaymeen')} </li>
                    <li>• {getLocalizedText('theFourImams')} </li>
                  </ul>
                </div>
              </div>

              <p className={`${settings.darkMode ? 'text-gray-400' : 'text-amber-600'} text-xs mt-3 italic`}>
                <strong>{getLocalizedText('note')}:</strong> {getLocalizedText('allAnswersIncludeReferences')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default IslamicAIBot;
