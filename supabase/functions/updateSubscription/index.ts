import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "npm:stripe@12.16.0";
import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2022-11-15" });
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!, 
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Content-Type": "application/json"
};

serve(async (req) => {
  console.log('Request method:', req.method);
  console.log('Request URL:', req.url);
  console.log('Request headers:', Object.fromEntries(req.headers.entries()));

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Handle GET requests for payment completion (NO AUTH REQUIRED - comes from Stripe)
  if (req.method === "GET") {
    console.log('Processing GET request for payment completion');
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('session_id');
    
    if (!sessionId) {
      console.log('Missing session_id parameter');
      return new Response(JSON.stringify({ error: "Missing session_id parameter" }), {
        status: 400, 
        headers: corsHeaders,
      });
    }

    try {
      console.log('Retrieving session from Stripe:', sessionId);
      // Retrieve the session from Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      console.log('Retrieved session:', session.id, 'Payment status:', session.payment_status);
      
      if (session.payment_status === 'paid' && session.metadata) {
        console.log('Payment successful, updating database');
        // Update subscribers table using service role key (no user auth needed)

            //  const amountInPounds = session.metadata.amount / 100;

        const { error: updateError } = await supabase
          .from("subscribers")
          .update({
            subscription_end: session.metadata.new_subscription_end,
            amount: session.metadata.amount,
            subscribed: true,
          })
          .eq("id", session.metadata.subscription_id)
          .eq("user_id", session.metadata.user_id);

        if (updateError) {
          console.error('Database update error:', updateError);
          return new Response(null, {
            status: 302,
            headers: {
              ...corsHeaders,
              'Location': `${req.headers.get('origin') || 'http://localhost:8080'}/?payment=db_error`
            }
          });
        }

        // Success - redirect to main page with success
        console.log('Subscription updated successfully');
        return new Response(null, {
          status: 302,
          headers: {
            ...corsHeaders,
            'Location': `${req.headers.get('origin') || 'http://localhost:8080'}/?payment=success`
          }
        });
      }
      
      // If payment not completed, redirect with failed status
      console.log('Payment not completed. Status:', session.payment_status);
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          'Location': `${req.headers.get('origin') || 'http://localhost:8080'}/?payment=failed`
        }
      });
      
    } catch (error) {
      console.error('Payment completion error:', error);
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          'Location': `${req.headers.get('origin') || 'http://localhost:8080'}/?payment=error`
        }
      });
    }
  }

  // Only allow POST requests beyond this point
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed. Only POST and GET are supported." }), {
      status: 405, 
      headers: corsHeaders,
    });
  }

  // POST requests require authentication
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization header" }), {
        status: 401, 
        headers: corsHeaders,
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      console.error('Auth error:', authError);
      return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
        status: 401, 
        headers: corsHeaders,
      });
    }

    const body = await req.json();
    const { subscription_id, new_subscription_end, amount, currency, email, user_id } = body;

    // Validate required fields
    if (!subscription_id || !new_subscription_end || !amount || !currency || !email || !user_id) {
      return new Response(JSON.stringify({ 
        error: "Missing required fields",
        received: { subscription_id, new_subscription_end, amount, currency, email, user_id }
      }), {
        status: 400, 
        headers: corsHeaders,
      });
    }

     const amountInPounds = amount / 100;

    // Verify user ID matches authenticated user
    if (user.id !== user_id) {
      return new Response(JSON.stringify({ error: "User ID mismatch" }), {
        status: 403, 
        headers: corsHeaders,
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: "Renew Premium Subscription",
              description: "Renew/upgrade premium subscription"
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `https://ezlwhepcpodvegoqppro.functions.supabase.co/updateSubscription?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin') || 'http://localhost:8080'}/?payment=canceled`,
      client_reference_id: user_id,
      customer_email: email,
      metadata: {
        user_id: user_id,
        subscription_id: subscription_id,
        new_subscription_end: new_subscription_end,
        amount: amountInPounds,
      },
    });

    return new Response(JSON.stringify({ 
      id: session.id,
      url: session.url 
    }), {
      headers: corsHeaders,
      status: 200,
    });

  } catch (error) {
    console.error('POST request error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error occurred"
    }), {
      headers: corsHeaders,
      status: 500,
    });
  }
});