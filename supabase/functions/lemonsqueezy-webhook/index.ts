import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-signature',
};

interface LemonSqueezyWebhookPayload {
  meta: {
    event_name: string;
    custom_data?: {
      user_id?: string;
    };
  };
  data: {
    id: string;
    type: string;
    attributes: {
      status: string;
      user_email: string;
      user_name: string;
      variant_id: number;
      product_id: number;
      order_id: number;
      subscription_id?: number;
      renews_at?: string;
      ends_at?: string | null;
      created_at: string;
      updated_at: string;
      first_order_item?: {
        product_name: string;
        variant_name: string;
      };
    };
  };
}

// Verify webhook signature from Lemon Squeezy
async function verifySignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const signatureBytes = new Uint8Array(
    signature.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );

  return await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBytes,
    encoder.encode(payload)
  );
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const webhookSecret = Deno.env.get('LEMONSQUEEZY_WEBHOOK_SECRET');

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const rawBody = await req.text();
    const signature = req.headers.get('x-signature');

    // Verify signature if webhook secret is configured
    if (webhookSecret && signature) {
      const isValid = await verifySignature(rawBody, signature, webhookSecret);
      if (!isValid) {
        console.error('Invalid webhook signature');
        return new Response(
          JSON.stringify({ error: 'Invalid signature' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    const payload: LemonSqueezyWebhookPayload = JSON.parse(rawBody);
    const eventName = payload.meta.event_name;
    const userId = payload.meta.custom_data?.user_id;
    const attributes = payload.data.attributes;

    console.log(`Processing Lemon Squeezy event: ${eventName}`);
    console.log(`User ID: ${userId}`);
    console.log(`Status: ${attributes.status}`);

    // Determine plan type from variant name
    const variantName = attributes.first_order_item?.variant_name?.toLowerCase() || '';
    const plan = variantName.includes('year') ? 'yearly' : 'monthly';

    switch (eventName) {
      case 'subscription_created':
      case 'subscription_updated': {
        if (!userId) {
          console.error('No user_id in custom_data');
          return new Response(
            JSON.stringify({ error: 'Missing user_id' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Map Lemon Squeezy status to our status
        const statusMap: Record<string, string> = {
          active: 'active',
          cancelled: 'cancelled',
          expired: 'expired',
          past_due: 'past_due',
          on_trial: 'trialing',
          unpaid: 'past_due',
          paused: 'cancelled',
        };

        const status = statusMap[attributes.status] || 'active';

        // Upsert subscription record
        const { error: upsertError } = await supabase
          .from('subscriptions')
          .upsert(
            {
              user_id: userId,
              status,
              plan,
              lemon_squeezy_subscription_id: String(attributes.subscription_id || payload.data.id),
              current_period_end: attributes.renews_at || null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id' }
          );

        if (upsertError) {
          console.error('Error upserting subscription:', upsertError);
          throw upsertError;
        }

        console.log(`Subscription ${eventName === 'subscription_created' ? 'created' : 'updated'} for user ${userId}`);
        break;
      }

      case 'subscription_cancelled': {
        if (!userId) {
          console.error('No user_id in custom_data');
          break;
        }

        const { error: updateError } = await supabase
          .from('subscriptions')
          .update({
            status: 'cancelled',
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        if (updateError) {
          console.error('Error cancelling subscription:', updateError);
          throw updateError;
        }

        console.log(`Subscription cancelled for user ${userId}`);
        break;
      }

      case 'subscription_expired': {
        if (!userId) {
          console.error('No user_id in custom_data');
          break;
        }

        const { error: expireError } = await supabase
          .from('subscriptions')
          .update({
            status: 'expired',
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        if (expireError) {
          console.error('Error expiring subscription:', expireError);
          throw expireError;
        }

        console.log(`Subscription expired for user ${userId}`);
        break;
      }

      case 'order_created': {
        // Log the order but don't create subscription yet
        // Subscription events will handle that
        console.log(`Order created: ${payload.data.id}`);
        console.log(`Email: ${attributes.user_email}`);
        break;
      }

      default:
        console.log(`Unhandled event: ${eventName}`);
    }

    return new Response(
      JSON.stringify({ success: true, event: eventName }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
