"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Heart, User, Mail, Lock, Camera, CameraOff } from "lucide-react"
import * as faceapi from "face-api.js"
import { useLanguage } from '@/contexts/LanguageContext';

const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [modelsLoading, setModelsLoading] = useState(true)
  const [cameraLoading, setCameraLoading] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("signin")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isFemale, setIsFemale] = useState<boolean | null>(null)
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const streamRef = useRef<MediaStream | null>(null)
  const { getLocalizedText } = useLanguage();
  const navigate = useNavigate()
  const { toast } = useToast()


  useEffect(() => {
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      const [resource, config] = args

      let url: string
      if (typeof resource === "string") {
        url = resource
      } else if (resource instanceof URL) {
        url = resource.toString()
      } else if (resource instanceof Request) {
        url = resource.url
      } else {
        url = String(resource)
      }

      if (url.includes("/models/")) {
      }

      const response = await originalFetch(...args)

      if (url.includes("/models/")) {

        const clonedResponse = response.clone()
        const text = await clonedResponse.text()

        if (text.includes("<!DOCTYPE")) {
        } else {
        }
      }

      return response
    }

    return () => {
      window.fetch = originalFetch
    }
  }, [])


  useEffect(() => {
    const loadModels = async () => {
      try {
        setModelsLoading(true)
        const testDirectAccess = async () => {

          const files = [
            "ssdMobilenetv1_model-weights_manifest.json",
            "ssdMobilenetv1_model-shard1",
            "ssdMobilenetv1_model-shard2",
            "age_gender_model-weights_manifest.json",
            "age_gender_model-shard1",
          ]

          for (const file of files) {
            try {
              const response = await fetch(`/models/${file}`, {
                cache: "no-cache",
                headers: {
                  Accept: file.includes("manifest") ? "application/json" : "application/octet-stream",
                },
              })

              if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`)
              }

              const text = await response.text()
              if (text.includes("<!DOCTYPE") || text.includes("<html>")) {
                throw new Error(`Received HTML instead of model file for ${file}`)
              }

              if (file.includes("manifest")) {
                try {
                  JSON.parse(text)
                } catch {
                  throw new Error(`${file} - Invalid JSON format`)
                }
              } else {
              }
            } catch (error) {
              throw error
            }
          }
        }

        const loadWithFallback = async () => {
          try {

            // Test file access first
            await testDirectAccess()

            // Clear caches
            if ("caches" in window) {
              const cacheNames = await caches.keys()
              for (const cacheName of cacheNames) {
                await caches.delete(cacheName)
              }
            }

            await faceapi.nets.ssdMobilenetv1.loadFromUri("/models")
            await faceapi.nets.ageGenderNet.loadFromUri("/models")
            return true
          } catch (localError) {


            try {
              // Use jsdelivr CDN as fallback
              const cdnBase = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.13/model"
              await faceapi.nets.ssdMobilenetv1.loadFromUri(cdnBase)
              await faceapi.nets.ageGenderNet.loadFromUri(cdnBase)

              toast({
                title: getLocalizedText('modelsLoadedFromCDN'),
                description: getLocalizedText('localFilesFailedUsingCDN'),
                variant: "default",
              })

              return true
            } catch (cdnError) {

              throw new Error(
                `${getLocalizedText('bothLocalAndCDNFailed')}: ${localError.message}, ${getLocalizedText('cdnFallback')}: ${cdnError.message}`,
              )
            }
          }
        }

        await loadWithFallback()

        setModelsLoaded(true)

        toast({
          title: getLocalizedText('detectionLoadedSuccessfully'),
          description: getLocalizedText('faceDetectionReady'),
        })
      } catch (error: any) {

        toast({
          title: getLocalizedText('modelLoadingError'),
          description: error instanceof Error ? error.message : `${getLocalizedText('failedToLoadFaceDetection')}`,
          variant: "destructive",
        })
      } finally {
        setModelsLoading(false)
      }
    }

    loadModels()
  }, [])

  useEffect(() => {
    if (activeTab === "signup" && modelsLoaded) {
      initializeCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [activeTab, modelsLoaded])

  const initializeCamera = async () => {
    if (!videoRef.current) {
      return
    }

    try {
      setCameraLoading(true)
      setCameraError(null)

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(getLocalizedText('getUserMediaNotSupported'))
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640, min: 320 },
          height: { ideal: 480, min: 240 },
        },
        audio: false,
      })


      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream

        videoRef.current.onloadedmetadata = () => {

          if (videoRef.current) {
            videoRef.current.play().catch((err) => {
            })
          }
        }

        videoRef.current.oncanplay = () => {
        }

        videoRef.current.onplay = () => {
        }

        videoRef.current.onerror = (err) => {
          setCameraError(getLocalizedText('videoPlaybackError'))
        }

      }
    } catch (err: any) {
      let errorMessage = getLocalizedText('cameraError')

      if (err.name === "NotAllowedError") {
        errorMessage = getLocalizedText('cameraAccessDenied')
      } else if (err.name === "NotFoundError") {
        errorMessage = getLocalizedText('noCameraFound')
      } else if (err.name === "NotReadableError") {
        errorMessage = getLocalizedText('cameraAlreadyInUse')
      } else if (err.name === "OverconstrainedError") {
        errorMessage = getLocalizedText('cameraConstraintsNotMet')
      } else {
        errorMessage = err.message || getLocalizedText('cameraAccessFailed')
      }

      setCameraError(errorMessage)
      toast({
        title: getLocalizedText('cameraError'),
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setCameraLoading(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  useEffect(() => {
    if (!videoRef.current || !modelsLoaded || activeTab !== "signup") return

    let detectionInterval: number | null = null
    let detectionAttempts = 0
    const MAX_ATTEMPTS = 10

    const detectFace = async () => {
      if (videoRef.current && videoRef.current.readyState === 4) {
        try {

          const displaySize = {
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight,
          }

          const detections = await faceapi.detectAllFaces(videoRef.current).withAgeAndGender()

          if (detections.length > 0) {
            detectionAttempts = 0
            const { gender, genderProbability } = detections[0]
            const isFemaleDetected = gender === "female" && genderProbability > 0.6
            setIsFemale(isFemaleDetected)

            if (isFemaleDetected) {
              toast({
                title: getLocalizedText('verificationSuccessful'),
                description: `${getLocalizedText('femaleUserDetected')} ${(genderProbability * 100).toFixed(0)}% ${getLocalizedText('confidence')}`,
              })

              if (detectionInterval) {
                clearInterval(detectionInterval)
                detectionInterval = null
              }
            }
          } else {
            detectionAttempts++

            if (detectionAttempts >= MAX_ATTEMPTS) {
              setIsFemale(false)
              toast({
                title: getLocalizedText('detectionFailed'),
                description: getLocalizedText('noFaceDetectedAfterAttempts'),
                variant: "destructive",
              })
            }
          }
        } catch (error) {
          toast({
            title: getLocalizedText('detectionError'),
            description: `${getLocalizedText('errorDuringFaceDetection')}: ${error instanceof Error ? error.message : String(error)}`,
            variant: "destructive",
          })
        }
      }
    }

    const handleVideoPlay = () => {
      detectFace()
      detectionInterval = window.setInterval(detectFace, 2000)
    }

    if (videoRef.current) {
      const videoElement = videoRef.current
      videoElement.addEventListener("play", handleVideoPlay)

      if (videoElement.readyState >= 3) {
        detectFace()
        detectionInterval = window.setInterval(detectFace, 2000)
      }

      return () => {
        if (detectionInterval) clearInterval(detectionInterval)
        videoElement.removeEventListener("play", handleVideoPlay)
      }
    }
  }, [modelsLoaded, activeTab, toast])

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        navigate("/")
      }
    }
    checkUser()
  }, [navigate])

  // Load settings
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
    const savedSettings = localStorage.getItem("nurcycle-app-settings")
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings((prev) => ({ ...prev, ...parsedSettings }))
        if (parsedSettings.darkMode) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      } catch (error) {
      }
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (isFemale === null) {
      toast({
        title: getLocalizedText('verificationRequired'),
        description: getLocalizedText('allowCameraForGenderVerification'),
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (isFemale === false) {
      toast({
        title: getLocalizedText('verificationFailed'),
        description: getLocalizedText('femaleFaceNotDetected'),
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) throw error

      toast({
        title: getLocalizedText('success'),
        description: getLocalizedText('checkEmailToConfirm'),
      })
    } catch (error: any) {
      toast({
        title: getLocalizedText('error'),
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      const userMetadata = data.user?.user_metadata
      if (userMetadata) {
        localStorage.setItem("userMetadata", JSON.stringify(userMetadata))
      }

      navigate("/")
    } catch (error: any) {
      toast({
        title: getLocalizedText('error'),
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }


  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${settings.darkMode ? "bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900" : "bg-gradient-to-br from-purple-100 via-purple-50 to-purple-100"}`}
    >
      <Card className="w-full max-w-md">
        <div className={`absolute inset-0 ${settings.darkMode ? 'bg-slate-900' : ' from-purple-500 to-purple-700'}`}></div>
        <CardHeader className="relative z-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-3 rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className={`text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent ${settings.darkMode ? 'text-white' : 'text-lavender-900'}`}>
            {getLocalizedText('welcomeToNurCycle')}
          </CardTitle>
          <CardDescription className={settings.darkMode ? 'text-gray-300' : 'text-lavender-900'}>
            {getLocalizedText('joinOurCommunity')}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">

            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="signin"
                className={`py-2 rounded-xl transition-all data-[state=active]:bg-purple-600 data-[state=active]:text-white rou ${settings.darkMode ? 'text-white' : 'text-lavender-900'
                  }`}
              >
                {getLocalizedText('signIn')}
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className={`py-2 rounded-xl  transition-all data-[state=active]:bg-purple-600 data-[state=active]:text-white ${settings.darkMode ? 'text-white' : 'text-lavender-900'
                  }`}
              >
                {getLocalizedText('signUp')}
              </TabsTrigger>
            </TabsList>


            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className={settings.darkMode ? 'text-white flex items-center space-x-2' : 'text-gray-900 flex items-center space-x-2'}>
                    <Mail className="w-4 h-4" />
                    <span>{getLocalizedText('email')}</span>
                  </Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    className={settings.darkMode ? 'bg-slate-800 text-black' : 'bg-gray-50 text-gray-900'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className={settings.darkMode ? 'text-white flex items-center space-x-2' : 'text-gray-900 flex items-center space-x-2'}>
                    <Lock className="w-4 h-4" />
                    <span>{getLocalizedText('password')}</span>
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
                  {loading ? `${getLocalizedText('signingIn')}` : `${getLocalizedText('signInButton')}`}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className={settings.darkMode ? 'text-white flex items-center space-x-2' : 'text-gray-900 flex items-center space-x-2'}>
                    <User className="w-4 h-4" />
                    <span>{getLocalizedText('fullName')}</span>
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
                    <span>{getLocalizedText('email')}</span>
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
                    <span>{getLocalizedText('password')}</span>
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

                {/* Show loading state while models are loading */}
                {modelsLoading && (
                  <div className="flex items-center justify-center p-4 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mr-3"></div>
                    <span className="text-sm text-gray-600">{getLocalizedText('loadingFaceDetectionModels')}</span>
                  </div>
                )}

                {/* Show camera section only when models are loaded */}
                {modelsLoaded && (
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <Camera className="w-4 h-4" />
                      <span>{getLocalizedText('genderVerification')}</span>
                    </Label>

                    <div className="relative border rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                      {cameraLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                      )}

                      {cameraError && (
                        <div className="flex flex-col items-center justify-center p-4 text-center">
                          <CameraOff className="w-8 h-8 text-red-500 mb-2" />
                          <p className="text-sm text-red-500">{cameraError}</p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2 bg-transparent"
                            onClick={initializeCamera}
                          >
                            {getLocalizedText('retryCameraAccess')}
                          </Button>
                        </div>
                      )}

                      {!cameraError && (
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-[200px] object-cover bg-gray-200"
                          style={{ minHeight: "200px" }}
                          onError={(e) => {
                            setCameraError(getLocalizedText('videoDisplayError'))
                          }}
                        />
                      )}

                      {/* Add this right after the video element */}
                      {!cameraError && !cameraLoading && (
                        <div className="absolute bottom-2 left-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-xs bg-black bg-opacity-50 text-white border-white hover:bg-opacity-70"
                            onClick={async () => {
                              await initializeCamera()
                            }}
                          >
                            {getLocalizedText('restartCamera')}
                          </Button>
                        </div>
                      )}

                      {/* Debug info overlay */}
                      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs p-1 rounded">
                        {modelsLoaded ? `${getLocalizedText('modelsVerified')}` : `${getLocalizedText('modelsNotVerified')}`} |
                        {videoRef.current?.readyState >= 3 ? `${getLocalizedText('videoVerified')}` : `${getLocalizedText('videoNotVerified')}`}
                      </div>

                      {isFemale !== null && (
                        <div
                          className={`absolute bottom-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${isFemale ? "bg-green-500 text-white" : "bg-red-500 text-white"
                            }`}
                        >
                          {isFemale ? `${getLocalizedText('verified')}` : `${getLocalizedText('notVerified')}`}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {getLocalizedText('verificationMessage')}
                    </p>
                  </div>
                )}

                {/* Manual detection button - only show when models are loaded */}
                {modelsLoaded && (
                  <div className="flex justify-center mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        if (videoRef.current && modelsLoaded) {
                          toast({
                            title: getLocalizedText('manualDetection'),
                            description: getLocalizedText('attemptingFaceDetection'),
                          })

                          try {
                            const detections = await faceapi.detectAllFaces(videoRef.current).withAgeAndGender()

                            if (detections.length > 0) {
                              const { gender, genderProbability } = detections[0]
                              const isFemaleDetected = gender === "female" && genderProbability > 0.6

                              setIsFemale(isFemaleDetected)
                              toast({
                                title: getLocalizedText('faceDetected'),
                                description: `${getLocalizedText('gender')}: ${gender} (${(genderProbability * 100).toFixed(0)}% ${getLocalizedText('confidence')})`,
                              })
                            } else {
                              toast({
                                title: getLocalizedText('noFaceDetected'),
                                description: getLocalizedText('pleaseEnsureFaceVisible'),
                                variant: "destructive",
                              })
                            }
                          } catch (error) {
                            toast({
                              title: getLocalizedText('detectionError'),
                              description: String(error),
                              variant: "destructive",
                            })
                          }
                        }
                      }}
                      disabled={isFemale === true}
                    >
                      {getLocalizedText('genderDetection')}
                    </Button>
                  </div>
                )}

                <Button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}
                  disabled={loading || modelsLoading || isFemale === null || isFemale === false}
                >
                  {loading ? `${getLocalizedText('creatingAccount')}` : modelsLoading ? `${getLocalizedText('loadingModels')}` : `${getLocalizedText('signUp')}`}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default Auth
