import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "npm:stripe@12.16.0";
import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2022-11-15" });
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!, 
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Only POST allowed", { status: 405 });
  }
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, Deno.env.get("STRIPE_WEBHOOK_SECRET")!);
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log("STRIPE EVENT: ", JSON.stringify(event, null, 2));

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { user_id, subscription_id, new_subscription_end, amount } = session.metadata;

    await supabase
      .from("subscribers")
      .update({
        subscription_end: new_subscription_end,
        amount: amount,
        subscribed: true,
      })
      .eq("id", subscription_id)
      .eq("user_id", user_id);
  }

  return new Response("ok", { status: 200 });
});
