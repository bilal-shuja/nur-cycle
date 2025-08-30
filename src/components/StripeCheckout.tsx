import { loadStripe } from '@stripe/stripe-js';
import { useState , useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from "@/components/ui/use-toast";

import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://ezlwhepcpodvegoqppro.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6bHdoZXBjcG9kdmVnb3FwcHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NDQwMDAsImV4cCI6MjA2NjEyMDAwMH0.31nqkGx5JNUaNKS9CfBnzO8-8stK94rome3oLMja8uM');
const stripePromise = loadStripe('pk_test_51RsGxI8RNeBAkuDEUwX9oIj1AwTkc3r2KFh06CfW7mTqmLK8ymeHkfkAPNiiaiU5JA9KquRvB5LkdflRUUy1qZZg00WPfuhzQh'); // apni publishable key dalain
const SUPABASE_FUNCTION_URL = "https://ezlwhepcpodvegoqppro.functions.supabase.co/createCheckout";

export default function StripeCheckout({isSubscribered,checkSubDate ,showExpiryWarning}) {
  
  const [amount, setAmount] = useState(599); // Default 1200 cents = $12.00
  const [currency, setCurrency] = useState('gbp'); // Change if you want
  
  const [isLoading, setIsLoading] = useState(false);

  const [subscriptionTime , setSubscriptionTime] = useState(null);

  const [ subscriberID , setSubscriberID] = useState(null);

  const { getLocalizedText } = useLanguage();

    useEffect(() => {
      async function fetchServerTime() {
        const { data, error } = await supabase.rpc('get_server_time');
        if (!error) setSubscriptionTime(data);
      }
      fetchServerTime();
    }, []);


     useEffect(() => {

    async function fetchSubData() {
      const tokenString = localStorage.getItem("sb-ezlwhepcpodvegoqppro-auth-token");
      const token = tokenString ? JSON.parse(tokenString) : null;

      const user_id = token?.user?.id;

      const { data: subscription, error } = await supabase
        .from('subscribers')
        .select('*')
        .eq('user_id', user_id)
        .eq('subscribed', true)
        .single();

      if (error) return;
      if (subscription) {
        const subscription_id = subscription.id;
        setSubscriberID(subscription_id)

      }
    }

    fetchSubData()
  }, [])

  
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

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      const tokenString = localStorage.getItem("sb-ezlwhepcpodvegoqppro-auth-token");
      const token = tokenString ? JSON.parse(tokenString) : null;

      if (!token?.access_token) {
        toast({
        title: getLocalizedText("authentication.error"),
        description: getLocalizedText('please.login.first.to.continue.payment') ,
          variant: "destructive",
          className: "bg-red-600 text-white border border-red-700",

        });
        return;
      }

      const user_id = token?.user?.id;
      const email = token?.user?.email;
      const access_token = token?.access_token;
      


      if (!user_id || !email) {
        toast({
          title: "User Data Missing",
          description: "User information not found. Please login again.",
          variant: "destructive",
           className: "bg-grey-600 text-white border border-grey-700",

        });
        return;
      }

      // Show loading toast
      toast({
      title: getLocalizedText('processing'),
      description: getLocalizedText('setting.up.payment.session'),
        variant: "destructive",
        className: "bg-orange-600 text-white border border-orange-700",
      });

      // Backend pe session create
      const res = await fetch(SUPABASE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify({ amount, currency, user_id, email }),
      });

      const data = await res.json();

      if (!data.id) {
        toast({
          title: "Payment Setup Failed",
          description: data.error || "Failed to start checkout process",
          variant: "destructive",
           className: "bg-red-600 text-white border border-red-700",
        });
        return;
      }

      // Success toast
      toast({
        title: "Redirecting to Payment",
        description: "Taking you to secure payment page...",
        variant: "destructive",
           className: "bg-yellow-600 text-white border border-yellow-700",
      });

      // Stripe Checkout par redirect
      const stripe = await stripePromise;

      if (!stripe) {
        toast({
          title: "Payment Error",
          description: "Failed to load payment system",
          variant: "destructive",
           className: "bg-red-600 text-white border border-red-700",
        });
        return;
      }

      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });

      if (error) {
        toast({
          title: getLocalizedText("payment.redirect.failed"),
          description: typeof error === 'string' ? error : error?.message || getLocalizedText("failed.to.redirect.to.payment.page"),
          variant: "destructive",
        });
      }

    } catch (error) {
      toast({
      title: getLocalizedText('something.went.wrong') ,
      description: getLocalizedText('please.try.again.or.contact.support'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  const handleUpdateSubscription = async () => {
  try {
    setIsLoading(true);

    // --- Token Get ---
    const tokenString = localStorage.getItem("sb-ezlwhepcpodvegoqppro-auth-token");
    const token = tokenString ? JSON.parse(tokenString) : null;
    const access_token = token?.access_token;
   


    if (!access_token) {
      toast({
        title: getLocalizedText("authentication.error"),
        description: getLocalizedText('please.login.first.to.continue.payment') ,
        variant: "destructive",
        className: "bg-red-600 text-white border border-red-700",
      });
      return;
    }


 
      const user_id = token?.user?.id;
      const email = token?.user?.email;
     const new_subscription_end = subscriptionTime;

     const subscription_id = subscriberID;

     

    // --- API Call ---
    toast({
      title: getLocalizedText('processing'),
      description: getLocalizedText('setting.up.payment.session'),
      variant: "destructive",
      className: "bg-orange-600 text-white border border-orange-700",
    });

    const res = await fetch("https://ezlwhepcpodvegoqppro.functions.supabase.co/updateSubscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`,
      },
      body: JSON.stringify({subscription_id,new_subscription_end, amount ,currency, user_id, email }),
    });

    const data = await res.json();

    if (!data.id) {
      toast({
        title: getLocalizedText('payment.setup.failed') ,
        description: data.error || getLocalizedText('failed.to.start.renewal.process'),
        variant: "destructive",
        className: "bg-red-600 text-white border border-red-700",
      });
      return;
    }

    // --- Redirect to Stripe ---
    toast({
      title: getLocalizedText('redirecting.to.payment'),
      description: getLocalizedText('taking.you.to.secure.payment.page'),
      variant: "destructive",
      className: "bg-yellow-600 text-white border border-yellow-700",
    });

    const stripe = await stripePromise;
    if (!stripe) {
      toast({
        title: getLocalizedText('payment.error'),
        description: getLocalizedText('failed.to.load.payment.system'),
        variant: "destructive",
        className: "bg-red-600 text-white border border-red-700",
      });
      return;
    }

    const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.id });

    if (stripeError) {
      toast({
        title: getLocalizedText('payment.redirect.failed'),
        description: typeof stripeError === "string" ? stripeError : stripeError?.message || getLocalizedText('failed.to.redirect.to.payment.page'),
        variant: "destructive",
      });
    }
  } catch (error) {
    toast({
      title: getLocalizedText('something.went.wrong') ,
      description: getLocalizedText('please.try.again.or.contact.support'),
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
    {
      showExpiryWarning === true ?
        <Button 
         className={`flex-1 ${settings.darkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white'}`}
        onClick={handleUpdateSubscription}
         disabled={isLoading}
        >
        {getLocalizedText('renew')}
      </Button>

      :
           <Button
        className={`flex-1 ${settings.darkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white'}`}
        onClick={handleCheckout}
        disabled={isLoading || isSubscribered === true } 
      >
        {getLocalizedText('subscribe')}
      </Button>

    }
 

    
    </>
  );
}
