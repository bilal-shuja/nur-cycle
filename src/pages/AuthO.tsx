import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Heart, User, Mail, Lock, ArrowLeft } from 'lucide-react';
import * as faceapi from 'face-api.js';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFemale, setIsFemale] = useState<boolean | null>(false);


  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
      await faceapi.nets.ageGenderNet.loadFromUri('/models');
      startVideo();
    };

    const startVideo = () => {
      if (videoRef.current) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            videoRef.current!.srcObject = stream;
            videoRef.current!.play();
            console.log("Stream assigned:", stream);
          })
          .catch((err) => {
            console.error("Error accessing camera:", err);
            toast({
              title: "Error",
              description: `Camera access error: ${err.message}`,
              variant: "destructive",
            });
          });
      }

    };

    loadModels();

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      const tracks = stream?.getTracks();
      tracks?.forEach((track) => track.stop());
    };
  }, []);

  // useEffect(() => {
  //   if (videoRef.current) {
  //     const interval = setInterval(async () => {
  //       const detections = await faceapi.detectAllFaces(videoRef.current).withAgeAndGender();
  //         console.log(detections);
  //       if (detections.length > 0) {
  //         const { gender } = detections[0];
  //         setIsFemale(gender === 'female');
  //       }
  //     }, 100);
  //     return () => clearInterval(interval);
  //   }
  // }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handlePlay = () => {
      const interval = setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video)
          .withAgeAndGender();

        if (detections.length > 0) {
          const { gender } = detections[0];
          console.log("Gender detected:", gender);
          setIsFemale(gender === 'female');
        }
      }, 500); // Slightly slower interval for performance

      return () => clearInterval(interval);
    };

    video.addEventListener("play", handlePlay);

    return () => {
      video.removeEventListener("play", handlePlay);
    };
  }, []);

  console.log("startVideo", videoRef.current);



  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  const handleGoBack = () => {
    navigate('/');
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Wait for gender detection to complete
    if (isFemale === null) {
      toast({
        title: "Error",
        description: "Please allow camera access for gender detection.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Check if the gender is female
    if (isFemale === false) {
      toast({
        title: "Error",
        description: "Female face not detected. Sign up failed.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Please check your email to confirm your account.",
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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const userMetadata = data.user?.user_metadata;
      if (userMetadata) {
        localStorage.setItem("userMetadata", JSON.stringify(userMetadata));
      }
      navigate('/');
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

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${settings.darkMode ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900' : 'bg-gradient-to-br from-purple-100 via-purple-50 to-purple-100'}`}>
      {/* Go Back Button */}
      {/* <Button
        variant="ghost"
        onClick={handleGoBack}
        className="absolute top-4 left-4 flex items-center gap-2 text-purple-700 hover:text-purple-800 hover:bg-purple-100"
      >
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </Button> */}

      {/* <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-3 rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Welcome to NurCycle
          </CardTitle>
          <CardDescription>
            Join our supportive community for women's health tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Password</span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Full Name</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Password</span>
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card> */}

      <Card className="w-full max-w-md">
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-500 to-purple-700'}`}></div>
        <CardHeader className="relative z-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-3 rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className={`text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent ${settings.darkMode ? 'text-white' : 'text-lavender-900'}`}>
            Welcome to NurCycle
          </CardTitle>
          <CardDescription className={settings.darkMode ? 'text-gray-300' : 'text-lavender-900'}>
            Join our supportive community for women's health tracking
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin" className={settings.darkMode ? 'text-white' : 'text-lavender-900'}>
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className={settings.darkMode ? 'text-white' : 'text-lavender-900'}>
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className={settings.darkMode ? 'text-white flex items-center space-x-2' : 'text-gray-900 flex items-center space-x-2'}>
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={settings.darkMode ? 'bg-slate-800 text-black' : 'bg-gray-50 text-gray-900'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className={settings.darkMode ? 'text-white flex items-center space-x-2' : 'text-gray-900 flex items-center space-x-2'}>
                    <Lock className="w-4 h-4" />
                    <span>Password</span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={settings.darkMode ? 'bg-slate-800 text-black' : 'bg-gray-50 text-gray-900'}
                  />
                </div>
                <Button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className={settings.darkMode ? 'text-white flex items-center space-x-2' : 'text-gray-900 flex items-center space-x-2'}>
                    <User className="w-4 h-4" />
                    <span>Full Name</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className={settings.darkMode ? 'bg-slate-800 text-black' : 'bg-gray-50 text-gray-900'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className={settings.darkMode ? 'text-white flex items-center space-x-2' : 'text-gray-900 flex items-center space-x-2'}>
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={settings.darkMode ? 'bg-slate-800 text-black' : 'bg-gray-50 text-gray-900'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className={settings.darkMode ? 'text-white flex items-center space-x-2' : 'text-gray-900 flex items-center space-x-2'}>
                    <Lock className="w-4 h-4" />
                    <span>Password</span>
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className={settings.darkMode ? 'bg-slate-800 text-black' : 'bg-gray-50 text-gray-900'}
                  />
                </div>
                <Button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>

                <video ref={videoRef} autoPlay={true} muted playsInline
                  width="300"
                  height="200"
                  onLoadedData={() => console.log('Video is ready')}
                />

              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

    </div>
  );
};

export default Auth;
