import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Bot, BookOpen, Loader2, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface SearchResult {
  id: string;
  type: 'knowledge-base' | 'ai-response';
  question: string;
  answer: string;
  category?: string;
  tags?: string[];
  source?: string;
  timestamp?: Date;
}

interface EnhancedSearchInterfaceProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  knowledgeBase: any[];
}

const EnhancedSearchInterface = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  knowledgeBase
}: EnhancedSearchInterfaceProps) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([]);
  const [showAllResults, setShowAllResults] = useState(false);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const { toast } = useToast();
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  // Enhanced search through knowledge base with better matching
  const searchKnowledgeBase = (query: string) => {
    if (!query.trim()) return [];

    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(' ').filter(word => word.length > 2);

    return knowledgeBase
      .map(item => {
        let relevanceScore = 0;

        // Exact phrase match in question (highest priority)
        if (item.question.toLowerCase().includes(queryLower)) {
          relevanceScore += 10;
        }

        // Exact phrase match in answer
        if (item.answer.toLowerCase().includes(queryLower)) {
          relevanceScore += 8;
        }

        // Tag matches
        const tagMatches = item.tags.filter((tag: string) =>
          tag.toLowerCase().includes(queryLower) ||
          queryWords.some(word => tag.toLowerCase().includes(word))
        );
        relevanceScore += tagMatches.length * 5;

        // Individual word matches
        queryWords.forEach(word => {
          if (item.question.toLowerCase().includes(word)) relevanceScore += 3;
          if (item.answer.toLowerCase().includes(word)) relevanceScore += 2;
        });

        // Category filter
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

        return {
          ...item,
          relevanceScore,
          matchesCategory
        };
      })
      .filter(item => item.relevanceScore > 0 && item.matchesCategory)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .map(item => ({
        id: `kb-${item.id}`,
        type: 'knowledge-base' as const,
        question: item.question,
        answer: item.answer,
        category: item.category,
        tags: item.tags,
        source: item.source
      }));
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

  // AI-powered search with enhanced context
  const searchWithAI = async (query: string) => {
    if (!query.trim()) return null;

    try {
      const contextualPrompt = `Please provide a comprehensive Islamic answer following Salafi methodology to this question: ${query}

Include:
1. Definition and explanation
2. Evidence from Quran and authentic hadith with references
3. Scholarly opinions from classical sources like Zad Al-Mustaqni
4. Practical examples and applications
5. Common mistakes to avoid
6. Any relevant contemporary considerations

Focus on women's religious matters, purity, worship, and menstruation-related topics when applicable.`;

      const { data, error } = await supabase.functions.invoke('islamic-ai-chat', {
        body: {
          message: contextualPrompt,
          context: 'Enhanced search with comprehensive Salafi Islamic guidance from Natural Blood of Women and classical sources'
        }
      });

      if (error) throw error;

      return {
        id: `ai-${Date.now()}`,
        type: 'ai-response' as const,
        question: query,
        answer: data.response || 'Unable to provide AI response at this time.',
        source: 'AI Assistant - Salafi Methodology with Classical References',
        timestamp: new Date()
      };
    } catch (error) {
      console.error('AI search error:', error);
      toast({
        title: "AI Search Error",
        description: "AI search temporarily unavailable. Showing knowledge base results.",
        variant: "destructive"
      });
      return null;
    }
  };

  // Enhanced search function with better result combination
  const performEnhancedSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Search knowledge base with enhanced matching
    const kbResults = searchKnowledgeBase(query);
    setSearchResults(kbResults);

    // Add AI response for comprehensive coverage
    if (kbResults.length < 2 || query.length > 10) {
      const aiResult = await searchWithAI(query);
      if (aiResult) {
        setSearchResults(prev => [aiResult, ...prev]);
        setSearchHistory(prev => [aiResult, ...prev.slice(0, 4)]);
      }
    }

    setIsSearching(false);
  };

  // Debounced search with improved timing
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery) {
      // Immediate search for knowledge base, delayed for AI
      const kbResults = searchKnowledgeBase(searchQuery);
      setSearchResults(kbResults);

      searchTimeoutRef.current = setTimeout(() => {
        if (kbResults.length < 2) {
          performEnhancedSearch(searchQuery);
        }
      }, 1000);
    } else {
      setSearchResults([]);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, selectedCategory]);

  const handleQuickSearch = (question: string) => {
    setSearchQuery(question);
  };

  const suggestedSearches = [
    "What is menstruation according to Islamic law?",
    "How to perform ghusl after menstruation?",
    "Signs that my period has ended",
    "Can I pray during irregular bleeding?",
    "Duration of postpartum bleeding in Islam",
    "Reading Quran during menstruation ruling",
    "Fasting rules during menstrual cycle",
    "What is istihada and how to worship during it?",
    "Intimacy rules during menstruation",
    "When does menstruation become irregular bleeding?"
  ];

  const displayResults = showAllResults ? searchResults : searchResults.slice(0, 3);
  const visibleSuggestions = showAllSuggestions ? suggestedSearches : suggestedSearches.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Search Results */}
      {searchQuery && (
        <div className="space-y-4">
          {/* <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {isSearching ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching Islamic sources and preparing AI response...</span>
                </div>
              ) : (
                `Found ${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${searchQuery}"`
              )}
            </div>
            {searchResults.length > 3 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAllResults(!showAllResults)}
              >
                {showAllResults ? 'Show Less' : `Show All ${searchResults.length}`}
              </Button>
            )}
          </div> */}

          <div className="flex items-center justify-between">
  <div className={`text-sm ${settings.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
    {isSearching ? (
      <div className="flex items-center gap-2">
        <Loader2 className={`w-4 h-4 animate-spin ${settings.darkMode ? 'text-white' : 'text-gray-600'}`} />
        <span>Searching Islamic sources and preparing AI response...</span>
      </div>
    ) : (
      `Found ${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${searchQuery}"`
    )}
  </div>
  {searchResults.length > 3 && (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setShowAllResults(!showAllResults)}
      className={`${settings.darkMode ? 'border-slate-600 text-gray-200 hover:bg-slate-800' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
    >
      {showAllResults ? 'Show Less' : `Show All ${searchResults.length}`}
    </Button>
  )}
</div>


          {searchResults.length === 0 && !isSearching && searchQuery && (

            // <Card className="bg-yellow-50 border-yellow-200">
            //   <CardContent className="p-6 text-center">
            //     <Bot className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
            //     <h3 className="font-semibold text-yellow-800 mb-2">No results found</h3>
            //     <p className="text-yellow-700 mb-4">
            //       No matches in our knowledge base. Let our AI assistant provide guidance based on authentic Islamic sources.
            //     </p>
            //     <Button
            //       onClick={() => performEnhancedSearch(searchQuery)}
            //       className="bg-yellow-600 hover:bg-yellow-700"
            //       disabled={isSearching}
            //     >
            //       {isSearching ? (
            //         <>
            //           <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            //           Consulting AI...
            //         </>
            //       ) : (
            //         <>
            //           <Bot className="w-4 h-4 mr-2" />
            //           Get AI Response
            //         </>
            //       )}
            //     </Button>
            //   </CardContent>
            // </Card>

            <Card className={`relative overflow-hidden card-3d`}>
  <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-yellow-50 to-yellow-100 border-yellow-200'} `}></div>

  <CardContent className="relative z-10 p-6 text-center">
    <Bot className={`w-12 h-12 mx-auto mb-3 ${settings.darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
    <h3 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-yellow-800'}`}>No results found</h3>
    <p className={`${settings.darkMode ? 'text-gray-300' : 'text-yellow-700'} mb-4`}>
      No matches in our knowledge base. Let our AI assistant provide guidance based on authentic Islamic sources.
    </p>
    <Button
      onClick={() => performEnhancedSearch(searchQuery)}
      className={`${settings.darkMode ? 'bg-yellow-700 hover:bg-yellow-800' : 'bg-yellow-600 hover:bg-yellow-700'}`}
      disabled={isSearching}
    >
      {isSearching ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Consulting AI...
        </>
      ) : (
        <>
          <Bot className="w-4 h-4 mr-2" />
          Get AI Response
        </>
      )}
    </Button>
  </CardContent>
</Card>

          )}

          <div className="space-y-4">
            {displayResults.map((result) => (

              // <Card key={result.id} className="hover:shadow-md transition-shadow">
              //   <CardContent className="p-6">
              //     <div className="flex justify-between items-start mb-3">
              //       <h3 className="font-semibold text-gray-800 text-lg pr-4">{result.question}</h3>
              //       <div className="flex items-center gap-2 flex-shrink-0">
              //         {result.type === 'ai-response' ? (
              //           <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-700">
              //             <Bot className="w-3 h-3 mr-1" />
              //             AI Enhanced
              //           </Badge>
              //         ) : (
              //           <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
              //             <BookOpen className="w-3 h-3 mr-1" />
              //             Knowledge Base
              //           </Badge>
              //         )}
              //         {result.category && (
              //           <Badge variant="secondary" className="text-xs">
              //             {result.category}
              //           </Badge>
              //         )}
              //       </div>
              //     </div>
              //     <div className="prose prose-sm max-w-none">
              //       <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              //         {result.answer}
              //       </p>
              //     </div>
              //     <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
              //       <div className="flex flex-wrap gap-1">
              //         {result.tags?.slice(0, 4).map((tag, index) => (
              //           <Badge key={index} variant="secondary" className="text-xs">
              //             {tag}
              //           </Badge>
              //         ))}
              //         {result.tags && result.tags.length > 4 && (
              //           <Badge variant="secondary" className="text-xs">
              //             +{result.tags.length - 4} more
              //           </Badge>
              //         )}
              //       </div>
              //       <p className="text-xs text-teal-600 italic text-right">
              //         <strong>Source:</strong> {result.source}
              //         {result.timestamp && (
              //           <span className="block mt-1">
              //             {result.timestamp.toLocaleTimeString([], {
              //               hour: '2-digit',
              //               minute: '2-digit'
              //             })}
              //           </span>
              //         )}
              //       </p>
              //     </div>
              //   </CardContent>
              // </Card>

              <Card key={result.id} className="relative overflow-hidden card-3d hover:shadow-md transition-shadow">
                <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-purple-50 to-pink-50 border-purple-200'} `}></div>

                <CardContent className="relative z-10 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`font-semibold text-lg pr-4 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {result.question}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {result.type === 'ai-response' ? (
                        <Badge variant="outline" className={`${settings.darkMode ? 'bg-slate-800 border border-slate-600 text-purple-300' : 'bg-purple-50 border-purple-200 text-purple-700'}`}>
                          <Bot className="w-3 h-3 mr-1" />
                          AI Enhanced
                        </Badge>
                      ) : (
                        <Badge variant="outline" className={`${settings.darkMode ? 'bg-slate-800 border border-slate-600 text-green-300' : 'bg-green-50 border-green-200 text-green-700'}`}>
                          <BookOpen className="w-3 h-3 mr-1" />
                          Knowledge Base
                        </Badge>
                      )}
                      {result.category && (
                        <Badge variant="secondary" className="text-xs dark:text-white">
                          {result.category}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="prose prose-sm max-w-none">
                    <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed whitespace-pre-wrap`}>
                      {result.answer}
                    </p>
                  </div>

                  <div className={`flex justify-between items-center mt-4 pt-3 ${settings.darkMode ? 'border-t border-slate-700 text-white' : 'border-t border-gray-100'}`}>
                    <div className="flex flex-wrap gap-1">
                      {result.tags?.slice(0, 4).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {result.tags && result.tags.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{result.tags.length - 4} more
                        </Badge>
                      )}
                    </div>
                    <p className={`text-xs italic text-right ${settings.darkMode ? 'text-gray-400' : 'text-teal-600'}`}>
                      <strong>Source:</strong> {result.source}
                      {result.timestamp && (
                        <span className="block mt-1">
                          {result.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>


            ))}
          </div>
        </div>
      )}

      {/* Default state - no search query */}
      {!searchQuery && (
        <>
          {/* <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Search className="w-8 h-8 text-blue-600" />
                <Bot className="w-8 h-8 text-purple-600" />
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Comprehensive Islamic Knowledge Search</h3>
              <p className="text-gray-700 mb-4">
                Search through our complete knowledge base from "Natural Blood of Women" or get AI-powered answers
                based on authentic Islamic sources including Zad Al-Mustaqni, Sahih Bukhari, and Sahih Muslim.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Lightbulb className="w-4 h-4" />
                <span>All content follows Salafi methodology with detailed explanations and authentic references</span>
              </div>
            </CardContent>
          </Card> */}

          <Card className="relative overflow-hidden card-3d">
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-blue-50 to-teal-50 border-blue-200'} `}></div>

            <CardContent className="relative z-10 p-6 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Search className={`w-8 h-8 ${settings.darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <Bot className={`w-8 h-8 ${settings.darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <BookOpen className={`w-8 h-8 ${settings.darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>

              <h3 className={`font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
                Comprehensive Islamic Knowledge Search
              </h3>

              <p className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                Search through our complete knowledge base from "Natural Blood of Women" or get AI-powered answers
                based on authentic Islamic sources including Zad Al-Mustaqni, Sahih Bukhari, and Sahih Muslim.
              </p>

              <div className={`flex items-center justify-center gap-2 text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Lightbulb className="w-4 h-4" />
                <span>All content follows Salafi methodology with detailed explanations and authentic references</span>
              </div>
            </CardContent>
          </Card>


          {/* Suggested searches */}

          {/* <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Search className="w-5 h-5" />
                Popular Questions from the Knowledge Base
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {visibleSuggestions.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="text-left h-auto p-3 justify-start text-sm hover:bg-blue-50 border-blue-200"
                    onClick={() => handleQuickSearch(search)}
                  >
                    <Search className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                    <span className="text-left text-wrap">{search}</span>
                  </Button>
                ))}
              </div>

              {suggestedSearches.length > 4 && (
                <div className="text-center mt-4">
                  <Button
                    onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400"
                  >
                    {showAllSuggestions ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-2" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-2" />
                        Show More ({suggestedSearches.length - 4} more)
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card> */}

          <Card className="relative overflow-hidden card-3d">
            <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-blue-50 to-teal-50 border-blue-200'} `}></div>

            <CardHeader className="relative z-10">
              <CardTitle className={`text-lg flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>
                <Search className={`w-5 h-5 ${settings.darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                Popular Questions from the Knowledge Base
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {visibleSuggestions.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`text-left h-auto p-3 justify-start text-sm transition-all duration-300 ${settings.darkMode
                        ? 'bg-slate-800 border-slate-600 text-gray-200 hover:bg-slate-700'
                        : 'bg-white border-blue-200 text-blue-800 hover:bg-blue-50'
                      }`}
                    onClick={() => handleQuickSearch(search)}
                  >
                    <Search className={`w-4 h-4 mr-2 flex-shrink-0 ${settings.darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                    <span className={`text-left text-wrap ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>{search}</span>
                  </Button>
                ))}
              </div>

              {suggestedSearches.length > 4 && (
                <div className="text-center mt-4">
                  <Button
                    onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                    variant="outline"
                    className={`transition-all duration-300 ${settings.darkMode
                        ? 'border-slate-600 text-gray-200 hover:bg-slate-800 hover:border-slate-500'
                        : 'border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400'
                      }`}
                  >
                    {showAllSuggestions ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-2" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-2" />
                        Show More ({suggestedSearches.length - 4} more)
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>


          {/* Recent AI searches */}
          {searchHistory.length > 0 && (
            // <Card>
            //   <CardHeader>
            //     <CardTitle className="text-lg flex items-center gap-2">
            //       <Bot className="w-5 h-5" />
            //       Recent AI Responses
            //     </CardTitle>
            //   </CardHeader>
            //   <CardContent>
            //     <div className="space-y-3">
            //       {searchHistory.slice(0, 3).map((item) => (
            //         <div key={item.id} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            //           <h4 className="font-medium text-purple-800 text-sm mb-1">{item.question}</h4>
            //           <p className="text-purple-700 text-xs line-clamp-2">
            //             {item.answer.substring(0, 150)}...
            //           </p>
            //           <Button
            //             variant="ghost"
            //             size="sm"
            //             className="text-purple-600 hover:text-purple-700 p-0 h-auto mt-2"
            //             onClick={() => handleQuickSearch(item.question)}
            //           >
            //             View full response
            //           </Button>
            //         </div>
            //       ))}
            //     </div>
            //   </CardContent>
            // </Card>

            <Card className="relative overflow-hidden card-3d">
              <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900 border border-slate-700' : ' from-purple-50 to-pink-50 border-purple-200'} opacity-20`}></div>

              <CardHeader className="relative z-10">
                <CardTitle className={`text-lg flex items-center gap-2 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                  <Bot className={`w-5 h-5 ${settings.darkMode ? 'text-purple-300' : 'text-purple-600'}`} />
                  Recent AI Responses
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="space-y-3">
                  {searchHistory.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-lg transition-all duration-300 ${settings.darkMode
                          ? 'bg-slate-800 border border-slate-600'
                          : 'bg-purple-50 border border-purple-200'
                        }`}
                    >
                      <h4 className={`font-medium text-sm mb-1 ${settings.darkMode ? 'text-white' : 'text-purple-800'}`}>
                        {item.question}
                      </h4>
                      <p className={`${settings.darkMode ? 'text-gray-300' : 'text-purple-700'} text-xs line-clamp-2`}>
                        {item.answer.substring(0, 150)}...
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`p-0 h-auto mt-2 ${settings.darkMode
                            ? 'text-purple-400 hover:text-purple-300'
                            : 'text-purple-600 hover:text-purple-700'
                          }`}
                        onClick={() => handleQuickSearch(item.question)}
                      >
                        View full response
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          )}
        </>
      )}
    </div>
  );
};

export default EnhancedSearchInterface;
