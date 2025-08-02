
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
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

  const location = useLocation();
  const showSignin = location.state?.showSignin;

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [modelsLoading, setModelsLoading] = useState(true)
  const [cameraLoading, setCameraLoading] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("signup")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [registeredFaceDescriptor, setRegisteredFaceDescriptor] = useState<any | null>(null);

  const [isFemale, setIsFemale] = useState<boolean | null>(null)
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const streamRef = useRef<MediaStream | null>(null)
  const { getLocalizedText } = useLanguage();
  const navigate = useNavigate()
  const { toast } = useToast();
  const activeTabRef = useRef(activeTab);


  useEffect(() => {
    if (showSignin) {
      setActiveTab('signin');
    }
  }, [showSignin]);


  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);


  useEffect(() => {
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      const [resource] = args

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

      const response = await originalFetch(...args)

      if (url.includes("/models/")) {

        const clonedResponse = response.clone()
        const text = await clonedResponse.text()
      }
      return response
    }

    return () => {
      window.fetch = originalFetch
    }
  }, [])


  useEffect(() => {
    if (activeTab === "signin" || activeTab === "signup") {
      setRegisteredFaceDescriptor(null);
    }
  }, [activeTab]);




  const loadModels = async () => {
    try {
      setModelsLoading(true);

      const testDirectAccess = async () => {
        const files = [
          "ssdMobilenetv1_model-weights_manifest.json",
          "ssdMobilenetv1_model-shard1",
          "ssdMobilenetv1_model-shard2",
          "age_gender_model-weights_manifest.json",
          "age_gender_model-shard1",
        ];

        for (const file of files) {
          const response = await fetch(`/models/${file}`, {
            cache: "no-cache",
            headers: {
              Accept: file.includes("manifest") ? "application/json" : "application/octet-stream",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const text = await response.text();
          if (text.includes("<!DOCTYPE") || text.includes("<html>")) {
            throw new Error(`Received HTML instead of model file for ${file}`);
          }

          if (file.includes("manifest")) {
            try {
              JSON.parse(text);
            } catch {
              throw new Error(`${file} - Invalid JSON format`);
            }
          }
        }
      };

      const loadWithFallback = async () => {
        try {
          await testDirectAccess();

          if ("caches" in window) {
            const cacheNames = await caches.keys();
            for (const cacheName of cacheNames) {
              await caches.delete(cacheName);
            }
          }

          await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
          await faceapi.nets.ageGenderNet.loadFromUri("/models");
          await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
          await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
          await faceapi.nets.tinyFaceDetector.loadFromUri("/models");

          return true;
        } catch (localError) {
          try {
            // Use CDN as fallback
            const cdnBase = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.13/model";
            await faceapi.nets.ssdMobilenetv1.loadFromUri(cdnBase);
            await faceapi.nets.ageGenderNet.loadFromUri(cdnBase);
            await faceapi.nets.faceLandmark68Net.loadFromUri(cdnBase);
            await faceapi.nets.faceLandmark68TinyNet.loadFromUri(cdnBase);
            await faceapi.nets.faceRecognitionNet.loadFromUri(cdnBase);
            await faceapi.nets.tinyFaceDetector.loadFromUri(cdnBase);

            toast({
              title: getLocalizedText('modelsLoadedFromCDN'),
              description: getLocalizedText('localFilesFailedUsingCDN'),
              variant: "default",
            });

            return true;
          } catch (cdnError) {
            throw new Error(
              `${getLocalizedText('bothLocalAndCDNFailed')}: ${localError.message}, ${getLocalizedText('cdnFallback')}: ${cdnError.message}`
            );
          }
        }
      };

      await loadWithFallback();

      setModelsLoaded(true);

      toast({
        title: getLocalizedText('detectionLoadedSuccessfully'),
        description: getLocalizedText('faceDetectionReady'),
      });
    } catch (error) {
      toast({
        title: getLocalizedText('modelLoadingError'),
        description: error instanceof Error ? error.message : `${getLocalizedText('failedToLoadFaceDetection')}`,
        variant: "destructive",
      });
    } finally {
      setModelsLoading(false);
    }
  };

  useEffect(() => {

    loadModels();
  }, []);


  useEffect(() => {
    if (activeTab === "signup" && modelsLoaded) {
      initializeCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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


  const initializeSignInCamera = async () => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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


// State variables
 const [initialNoseX, setInitialNoseX] = useState(null);
  const [blinkDetected, setBlinkDetected] = useState(false);
  const blinkDetectedRef = useRef(false);
  const blinkCountRef = useRef(0);
  const blinkStateRef = useRef('open');
  const lastInstructionToastRef = useRef(0);
  const lastStabilityWarningRef = useRef(0);

  // Anti-spoofing state variables
  const faceStabilityRef = useRef([]);
  const earHistoryRef = useRef([]);
  const facePositionHistoryRef = useRef([]);

  // Anti-spoofing helper functions
  const calculateFaceStability = (landmarks) => {
    const nose = landmarks.getNose();
    const noseTip = nose[3]; // Nose tip point

    facePositionHistoryRef.current.push({
      x: noseTip.x,
      y: noseTip.y,
      timestamp: Date.now()
    });

    // Keep only last 10 positions (last 10 seconds)
    if (facePositionHistoryRef.current.length > 10) {
      facePositionHistoryRef.current.shift();
    }

    // Calculate position variance
    if (facePositionHistoryRef.current.length < 5) return true;

    const positions = facePositionHistoryRef.current;
    const avgX = positions.reduce((sum, p) => sum + p.x, 0) / positions.length;
    const avgY = positions.reduce((sum, p) => sum + p.y, 0) / positions.length;

    const variance = positions.reduce((sum, p) => {
      return sum + Math.pow(p.x - avgX, 2) + Math.pow(p.y - avgY, 2);
    }, 0) / positions.length;

    // If variance is too high, it might be a moving photo
    const MAX_POSITION_VARIANCE = 1000; // Adjust based on testing
    return variance < MAX_POSITION_VARIANCE;
  };

  const validateBlinkPattern = (ear) => {
    earHistoryRef.current.push({
      value: ear,
      timestamp: Date.now()
    });

    // Keep only last 20 EAR values (last 20 seconds)
    if (earHistoryRef.current.length > 20) {
      earHistoryRef.current.shift();
    }

    if (earHistoryRef.current.length < 10) return true;

    // Check for natural variation in EAR values
    const earValues = earHistoryRef.current.map(h => h.value);
    const avgEAR = earValues.reduce((sum, val) => sum + val, 0) / earValues.length;
    const variance = earValues.reduce((sum, val) => sum + Math.pow(val - avgEAR, 2), 0) / earValues.length;

    // Natural human eyes have some variance even when "open"
    const MIN_NATURAL_VARIANCE = 0.0001;
    return variance > MIN_NATURAL_VARIANCE;
  };

  const checkBlinkDuration = () => {
    if (blinkStateRef.current !== 'closed') return true;

    // Find when eyes started closing
    const recentHistory = earHistoryRef.current.slice(-10);
    if (recentHistory.length < 2) return true;

    const closedStartTime = recentHistory.find(h => h.value < 0.27)?.timestamp;
    if (!closedStartTime) return true;

    const duration = Date.now() - closedStartTime;

    // Natural blink duration: 100-400ms, photos moving might stay "closed" longer
    const MIN_BLINK_DURATION = 50;
    const MAX_BLINK_DURATION = 800;

    return duration >= MIN_BLINK_DURATION && duration <= MAX_BLINK_DURATION;
  };

  useEffect(() => {
    if (!videoRef.current || !modelsLoaded || activeTab !== "signup") return;

    const tinyOptions = new faceapi.TinyFaceDetectorOptions({
      inputSize: 416,
      scoreThreshold: 0.6
    });

    let detectionInterval = null;

    const detectFace = async () => {

      if (activeTabRef.current !== "signup" || !videoRef.current) {
        // console.log("🛑 Detection stopped - not on signup tab");
        return;
      }

      try {
        const detection = await faceapi
          .detectSingleFace(videoRef.current, tinyOptions)
          .withFaceLandmarks()
          .withAgeAndGender()
          .withFaceDescriptor();

        if (!detection || !detection.landmarks) {
          console.log("❌ No face or landmarks detected");
          return;
        }

        if (detection.detection && detection.detection.score < 0.5) {
          // console.log("❌ Low confidence face:", detection.detection.score);
          return;
        }

        // console.log("✅ Face detected with confidence:", detection.detection.score);

        const { landmarks } = detection;

        // Enhanced Blink Detection with Anti-Spoofing
        if (!blinkDetected) {
          // 1. Check face stability (anti-photo-movement)
          const isFaceStable = calculateFaceStability(landmarks);
          if (!isFaceStable) {
            // console.log("⚠️ Face movement detected - possible photo spoofing");

            // Show stability warning only once every 5 seconds
            const now = Date.now();
            const stabilityWarningCooldown = 5000;
            if (now - lastStabilityWarningRef.current > stabilityWarningCooldown) {

              // ✅ FIXED: Check if liveness is already verified
              if (blinkDetected || blinkDetectedRef.current || blinkCountRef.current >= 2) {
                return; // Don't show warning if liveness is verified
              }
              toast({
                title: "Stay Still",
                description: "Please keep your face steady during verification",
                className: "bg-orange-600 text-white border border-orange-700",
              });
              lastStabilityWarningRef.current = now;


            }
            return;
          }

          const leftEye = landmarks.getLeftEye();
          const rightEye = landmarks.getRightEye();

          const computeEAR = (eye) => {
            const A = Math.hypot(eye[1].y - eye[5].y, eye[1].x - eye[5].x);
            const B = Math.hypot(eye[2].y - eye[4].y, eye[2].x - eye[4].x);
            const C = Math.hypot(eye[0].y - eye[3].y, eye[0].x - eye[3].x);
            return (A + B) / (2.0 * C);
          };

          const leftEAR = computeEAR(leftEye);
          const rightEAR = computeEAR(rightEye);
          const avgEAR = (leftEAR + rightEAR) / 2;

          // 2. Validate natural EAR pattern
          const hasNaturalPattern = validateBlinkPattern(avgEAR);
          if (!hasNaturalPattern) {
            // console.log("⚠️ Unnatural EAR pattern detected");
            return;
          }

          // console.log(`🔍 EAR: ${avgEAR.toFixed(3)} | State: ${blinkStateRef.current} | Count: ${blinkCountRef.current}`);

          const BLINK_THRESHOLD = 0.27;
          const OPEN_THRESHOLD = 0.29;

          // Enhanced state machine with duration check
          if (blinkStateRef.current === 'open' && avgEAR < BLINK_THRESHOLD) {
            blinkStateRef.current = 'closed';
            // console.log("👁️ EYES CLOSING - State changed to CLOSED");
          }
          else if (blinkStateRef.current === 'closed' && avgEAR > OPEN_THRESHOLD) {
            // 3. Check blink duration (anti-spoofing)
            const isValidBlinkDuration = checkBlinkDuration();

            if (isValidBlinkDuration) {
              blinkStateRef.current = 'open';
              blinkCountRef.current++;
              // console.log("✅ VALID BLINK COMPLETED! Count:", blinkCountRef.current);

              if (blinkCountRef.current >= 2) {
                // Additional final validation
                const finalStabilityCheck = facePositionHistoryRef.current.length >= 5;
                const finalPatternCheck = earHistoryRef.current.length >= 10;

                if (finalStabilityCheck && finalPatternCheck) {
                  setBlinkDetected(true);
                  blinkDetectedRef.current = true;

                  toast({
                    title: "Liveness Verified!",
                    description: "Authentic blink pattern detected - you're a real person!",
                    className: "bg-green-600 text-white border border-green-700",
                  });
                } else {
                  // console.log("⚠️ Final validation failed - insufficient data");
                  blinkCountRef.current = 0; // Reset and try again
                }
                return;
              } else {
                if (blinkCountRef.current < 2) {
                  toast({
                    title: `Blink ${blinkCountRef.current}/2`,
                    description: "Great! Please blink one more time naturally.",
                    className: "bg-blue-600 text-white border border-blue-700",
                  });
                }
              }
            } else {
              // console.log("⚠️ Invalid blink duration - possible spoofing attempt");
              // Don't increment counter for invalid blinks
            }
          }

          // Show instruction with anti-spoofing warning
          if (blinkCountRef.current < 2 && !blinkDetected && !blinkDetectedRef.current) {
            const now = Date.now();
            const instructionCooldown = 5000;
            if (now - lastInstructionToastRef.current > instructionCooldown) {
              toast({
                title: "Liveness Check",
                description: `Please blink naturally (${blinkCountRef.current}/2). Keep face steady - no photos allowed!`,
                className: "bg-yellow-600 text-white border border-yellow-700",
              });
              lastInstructionToastRef.current = now;
            }
          }

          return;
        }


      } catch (err) {
        console.error("Detection error:", err);
        toast({
          title: getLocalizedText("detectionError"),
          description: `${getLocalizedText("errorDuringFaceDetection")}: ${err.message}`,
          variant: "destructive",
        });
      }
    };

    const startDetection = () => {
      // console.log("🚀 Starting enhanced face detection with anti-spoofing");
      detectFace();
      detectionInterval = setInterval(detectFace, 1000);
    };

    const videoElement = videoRef.current;

    if (videoElement.readyState >= 2) {
      startDetection();
    } else {
      videoElement.addEventListener("loadeddata", startDetection);
      videoElement.addEventListener("play", startDetection);
    }

    return () => {
      // console.log("🛑 Cleaning up detection");
      if (detectionInterval) {
        clearInterval(detectionInterval);
      }
      videoElement.removeEventListener("loadeddata", startDetection);
      videoElement.removeEventListener("play", startDetection);

      // Reset all states including anti-spoofing data
      blinkCountRef.current = 0;
      blinkStateRef.current = 'open';
      faceStabilityRef.current = [];
      earHistoryRef.current = [];
      facePositionHistoryRef.current = [];
      lastStabilityWarningRef.current = 0;
      setInitialNoseX(null);
      setBlinkDetected(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelsLoaded, activeTab, toast]);





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
        return error;
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
        className: "bg-red-600 text-white border border-red-700",
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
        className: "bg-green-600 text-white border border-green-700",
      })

      window.location.reload();
      setFullName("");
      setEmail("");
      setPassword("");




      if (registeredFaceDescriptor) {
        const descriptorArray = Array.from(registeredFaceDescriptor);
        localStorage.setItem("faceDescriptor", JSON.stringify({ descriptor: descriptorArray }));
      }



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


  // console.log('setIsFemale', isFemale)


  function euclideanDistance(vec1: number[] | Float32Array, vec2: number[] | Float32Array): number {
    const v1 = Array.from(vec1);
    const v2 = Array.from(vec2);
    return Math.sqrt(v1.reduce((sum, v, i) => sum + Math.pow(v - v2[i], 2), 0));
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Step 1: Get current descriptor from gender verification (captured earlier)
      const currentDescriptor = registeredFaceDescriptor;

      if (!currentDescriptor) {
        toast({
          title: getLocalizedText("No face Descriptor Captured"),
          description: getLocalizedText("Please capture face Descriptor first!"),
          variant: "destructive",
          className: "bg-red-600 text-white border border-red-700",
        });
        setLoading(false);
        return;
      }

      // ✅ Step 2: Get stored descriptor from localStorage
      const storedData = localStorage.getItem("faceDescriptor");
      if (!storedData) {
        toast({
          title: getLocalizedText("No stored face"),
          description: getLocalizedText("Face not registered"),
          variant: "destructive",
          className: "bg-red-600 text-white border border-red-700",
        });
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(storedData || "{}");
      const storedDescriptor = parsed?.descriptor;

      if (!storedDescriptor || !Array.isArray(storedDescriptor)) {
        toast({
          title: getLocalizedText("Invalid Descriptor"),
          description: getLocalizedText("Please re-register yourself"),
          variant: "destructive",

        });
        setLoading(false);
        return;
      }

      // ✅ Step 3: Compare face descriptors using Euclidean distance
      const distance = euclideanDistance(currentDescriptor, storedDescriptor);

      // Recommended threshold: 0.5 or lower (tweak if needed)
      if (distance > 0.5) {
        toast({
          title: getLocalizedText("Face mismatch"),
          description: getLocalizedText("Face does not match"),
          variant: "destructive",
          className: "bg-red-600 text-white border border-red-700",
        });
        setLoading(false);
        setIsFemale(null)
        // setRegisteredFaceDescriptor(null)
        return;
      }

      // ✅ Step 4: Proceed to Supabase login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const userMetadata = data.user?.user_metadata;
      if (userMetadata) {
        localStorage.setItem("userMetadata", JSON.stringify(userMetadata));
      }

      navigate("/");

    } catch (error: any) {
      toast({
        title: getLocalizedText("error"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // console.log('registeredFaceDescriptor', registeredFaceDescriptor)

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
          <Tabs defaultValue="signup" value={activeTab} onValueChange={setActiveTab} className="w-full">

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

                {/* Show camera section only when models are loaded */}
                {activeTab === "signin" && modelsLoaded && (
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
                            onClick={() => {
                              // Only initialize camera for manual capture, not automatic detection
                              if (activeTab === "signin") {
                                initializeSignInCamera();
                              }
                            }}
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
                      {!cameraError && !cameraLoading && activeTab === "signin" && (
                        <div className="absolute bottom-2 left-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-xs bg-black bg-opacity-50 text-white border-white hover:bg-opacity-70"
                            onClick={() => {
                              if (activeTab === "signin") {
                                initializeSignInCamera();
                              }
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

                      {registeredFaceDescriptor !== null && (
                        <div
                          className={`absolute bottom-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${registeredFaceDescriptor ? "bg-green-500 text-white" : "bg-red-500 text-white"
                            }`}
                        >
                          {registeredFaceDescriptor ? `${getLocalizedText('Face Descriptor Detected')}` : `${getLocalizedText('No Face Descriptor Detected')}`}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {getLocalizedText('verificationMessage')}
                    </p>
                  </div>
                )}


                {modelsLoaded && (
                  <div className="flex justify-center mt-2">
                  
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isFemale === true }
                      onClick={async () => {
                        if (videoRef.current && modelsLoaded) {


                          try {
                            const detections = await faceapi
                              .detectSingleFace(videoRef.current)
                              .withFaceLandmarks()
                              .withAgeAndGender()
                              .withFaceDescriptor();

                            if (!detections || !detections.descriptor) {
                              toast({
                                title: getLocalizedText('noFaceDetected'),
                                description: getLocalizedText('pleaseEnsureFaceVisible'),
                                variant: "destructive",
                                className: "bg-gray-700 text-white border border-gray-700",
                              });
                              return;
                            }

                            const { descriptor, gender, genderProbability } = detections;

                            const isFemaleDetected = gender === "female" && genderProbability > 0.6;

                            setIsFemale(isFemaleDetected);

                            toast({
                              title: getLocalizedText('Face description detected'),
                              description: `${getLocalizedText('gender')}: ${gender} (${(genderProbability * 100).toFixed(0)}% ${getLocalizedText('confidence')})`,
                              className: isFemaleDetected ? "bg-green-600 text-white border border-green-700" : "bg-red-600 text-white border border-red-700"

                            });

                            setRegisteredFaceDescriptor(descriptor);
                          } catch (error) {
                            toast({
                              title: getLocalizedText('detectionError'),
                              description: String(error),
                              variant: "destructive",
                              className: "bg-red-600 text-white border border-red-700",
                            });
                          }
                        }
                      }}
                    >
                      {getLocalizedText('Get Face Description')}
                    </Button>
                  </div>
                )}
                {/* || !faceDescriptorWhileSignIn */}
                <Button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}
                  disabled={!registeredFaceDescriptor || isFemale === false }
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


                {modelsLoaded && (
                  <div className="flex justify-center mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      // disabled={isFemale === true }

                      onClick={async () => {
                        if (videoRef.current && modelsLoaded) {
                          toast({
                            title: getLocalizedText('manualDetection'),
                            description: getLocalizedText('attemptingFaceDetection'),
                          });

                          try {
                            const detections = await faceapi
                              .detectSingleFace(videoRef.current)
                              .withFaceLandmarks()
                              .withAgeAndGender()
                              .withFaceDescriptor();

                            if (!detections || !detections.descriptor) {
                              toast({
                                title: getLocalizedText('noFaceDetected'),
                                description: getLocalizedText('pleaseEnsureFaceVisible'),
                                variant: "destructive",
                              });
                              return;
                            }

                            const { descriptor, gender, genderProbability } = detections;

                            const isFemaleDetected = gender === "female" && genderProbability > 0.6;

                            setIsFemale(isFemaleDetected);

                            toast({
                              title: getLocalizedText('faceDetected'),
                              description: `${getLocalizedText('gender')}: ${gender} (${(genderProbability * 100).toFixed(0)}% ${getLocalizedText('confidence')})`,
                              className: isFemaleDetected ? "bg-green-600 text-white border border-green-700" : "bg-red-600 text-white border border-red-700",
                            });

                            setRegisteredFaceDescriptor(descriptor);
                          } catch (error) {
                            toast({
                              title: getLocalizedText('detectionError'),
                              description: String(error),
                              variant: "destructive",
                              className: "bg-red-600 text-white border border-red-700",
                            });
                          }
                        }
                      }}
                      disabled={blinkDetected === false}
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
