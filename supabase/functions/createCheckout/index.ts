import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "npm:stripe@12.16.0";
import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2022-11-15",
});


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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const type = url.searchParams.get('type');

    // Handle GET confirmation callback from Stripe Checkout success_url
    if (req.method === 'GET' && type === 'confirm') {
      const sessionId = url.searchParams.get('session_id');
      const redirect = url.searchParams.get('redirect') || `${req.headers.get('origin') || 'http://localhost:8080'}/?success=true`;

      if (!sessionId) {
        return new Response(JSON.stringify({ error: 'Missing session_id' }), { status: 400, headers: corsHeaders });
      }

      // Retrieve the Checkout Session from Stripe to verify payment
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      const isPaid = session.payment_status === 'paid' && session.status === 'complete';
      if (!isPaid) {
        // Not paid; redirect back with failure
        return new Response(null, { status: 302, headers: { Location: redirect.replace('success=true', 'success=false') } });
      }

      // Gather data for insert from session metadata/details
      const user_id = session.metadata?.user_id ?? null;
      const email = (session.customer_details?.email || (session as any).customer_email || null) as string | null;
      const amountTotal = (session.amount_total ?? 0);
      const amountInPounds = amountTotal / 100;

      if (!user_id || !email) {
        // Missing critical info; redirect but mark failure
        return new Response(null, { status: 302, headers: { Location: redirect.replace('success=true', 'success=false') } });
      }

      // Prevent duplicate active subscription rows on refresh
      const { data: existing, error: existingErr } = await supabase
        .from('subscribers')
        .select('id')
        .eq('user_id', user_id)
        .eq('subscribed', true)
        .maybeSingle();

      if (!existingErr && existing) {
        return new Response(null, { status: 302, headers: { Location: redirect } });
      }

      // Get server time at insert moment
      const { data: serverTimeData } = await supabase.rpc('get_server_time');

      // Insert subscription record now that payment is confirmed
      const { error: insertError } = await supabase
        .from('subscribers')
        .insert([
          {
            user_id,
            email,
            stripe_customer_id: (typeof session.customer === 'string' ? session.customer : session.id) as string,
            subscribed: true,
            subscription_tier: session.metadata?.subscription_tier || 'Monthly',
            amount: amountInPounds,
            subscription_end: serverTimeData,
          }
        ]);

      if (insertError) {
        console.error('Database insert error on confirm:', insertError);
        // Still redirect user; mark failure so UI can react if needed
        return new Response(null, { status: 302, headers: { Location: redirect.replace('success=true', 'success=false') } });
      }

      // Success - redirect back to the app
      return new Response(null, { status: 302, headers: { Location: redirect } });
    }

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization header" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    // Verify the user using the auth token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    // Parse request body
    const body = await req.json();
    const { amount, currency, user_id, email } = body;

    console.log("Request data:", { amount, currency, user_id, email });
    console.log("Authenticated user:", user.id);

    
    // Validate required fields
    if (!amount || !currency || !user_id || !email) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

  const amountInPounds = amount / 100;

    // Ensure the authenticated user matches the user_id in request
    if (user.id !== user_id) {
      return new Response(JSON.stringify({ error: "User ID mismatch" }), {
        status: 403,
        headers: corsHeaders,
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: { 
              name: "Premium Subscription",
              description: "Monthly premium subscription"
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Redirect back through this function first so we can verify and insert only after successful payment
      success_url: `${new URL(req.url).origin}${new URL(req.url).pathname}?type=confirm&redirect=${encodeURIComponent(`${req.headers.get('origin') || 'http://localhost:8080'}/?success=true`)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin') || 'http://localhost:8080'}/?canceled=true`,
      client_reference_id: user_id,
      customer_email: email,
      metadata: {
        user_id: user_id,
        subscription_tier: 'Monthly'
      }
    });

    return new Response(JSON.stringify({ 
      id: session.id,
      url: session.url 
    }), {
      headers: corsHeaders,
      status: 200,
    });

  } catch (error) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }), {
      headers: corsHeaders,
      status: 500,
    });
  }
});