// Lemon Squeezy Configuration
// 1. Create account at https://lemonsqueezy.com
// 2. Create a Store
// 3. Create a Product with Subscription variants (Monthly/Yearly)
// 4. Get your Store ID, Product ID, and Variant IDs
// 5. Create API key at Settings > API

export const LEMONSQUEEZY_CONFIG = {
  // Replace with your actual Lemon Squeezy Store ID
  storeId: import.meta.env.VITE_LEMONSQUEEZY_STORE_ID || '',

  // Your product variant IDs for different subscription plans
  variants: {
    monthly: import.meta.env.VITE_LEMONSQUEEZY_MONTHLY_VARIANT_ID || '',
    yearly: import.meta.env.VITE_LEMONSQUEEZY_YEARLY_VARIANT_ID || '',
  },

  // Checkout URLs (will be generated dynamically)
  checkoutUrl: 'https://stockpicks.lemonsqueezy.com/checkout/buy',
};

// Initialize Lemon.js
export function initLemonSqueezy() {
  if (typeof window !== 'undefined' && window.createLemonSqueezy) {
    window.createLemonSqueezy();
  }
}

// Generate checkout URL with user email prefilled
export function getCheckoutUrl(
  variantId: string,
  options?: {
    email?: string;
    userId?: string;
    redirectUrl?: string;
  }
): string {
  const baseUrl = `https://stockpicks.lemonsqueezy.com/checkout/buy/${variantId}`;
  const params = new URLSearchParams();

  if (options?.email) {
    params.append('checkout[email]', options.email);
  }

  if (options?.userId) {
    params.append('checkout[custom][user_id]', options.userId);
  }

  if (options?.redirectUrl) {
    params.append('checkout[redirect_url]', options.redirectUrl);
  }

  // Enable overlay mode
  params.append('embed', '1');

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

// Subscription plan details
export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    interval: null,
    features: [
      'View top 3 stock picks',
      'Basic market insights',
      'Daily email updates',
    ],
    limitations: [
      'Limited signal history',
      'No real-time alerts',
      'Basic charts only',
    ],
  },
  monthly: {
    name: 'Pro Monthly',
    price: 9.99,
    interval: 'month',
    variantId: LEMONSQUEEZY_CONFIG.variants.monthly,
    features: [
      'Unlimited AI stock picks',
      'Real-time buy/sell signals',
      'Advanced chart analysis',
      'Signal notifications',
      'Performance tracking',
      'Priority support',
    ],
  },
  yearly: {
    name: 'Pro Yearly',
    price: 79.99,
    interval: 'year',
    variantId: LEMONSQUEEZY_CONFIG.variants.yearly,
    features: [
      'Everything in Pro Monthly',
      'Save 33% vs monthly',
      'Early access to new features',
      'Exclusive market reports',
    ],
    savings: '33%',
  },
};

// Declare global types for Lemon.js
declare global {
  interface Window {
    createLemonSqueezy?: () => void;
    LemonSqueezy?: {
      Setup: (config: { eventHandler: (event: LemonSqueezyEvent) => void }) => void;
      Url: {
        Open: (url: string) => void;
        Close: () => void;
      };
      Loader: {
        Show: () => void;
        Hide: () => void;
      };
    };
  }
}

// Event types from Lemon Squeezy
export interface LemonSqueezyEvent {
  event:
    | 'Checkout.Success'
    | 'Checkout.ViewCart'
    | 'Checkout.Close'
    | 'PaymentMethodUpdate.Mounted'
    | 'PaymentMethodUpdate.Closed'
    | 'PaymentMethodUpdate.Updated';
  data?: {
    order?: {
      id: number;
      attributes: {
        first_order_item: {
          product_name: string;
          variant_name: string;
        };
        user_email: string;
        status: string;
      };
    };
    subscription?: {
      id: number;
      attributes: {
        status: string;
        renews_at: string;
        ends_at: string | null;
      };
    };
  };
}

// Setup event handler for Lemon Squeezy events
export function setupLemonSqueezyEvents(
  onSuccess?: (data: LemonSqueezyEvent['data']) => void,
  onClose?: () => void
) {
  if (typeof window !== 'undefined' && window.LemonSqueezy) {
    window.LemonSqueezy.Setup({
      eventHandler: (event) => {
        switch (event.event) {
          case 'Checkout.Success':
            console.log('Checkout successful:', event.data);
            onSuccess?.(event.data);
            break;
          case 'Checkout.Close':
            console.log('Checkout closed');
            onClose?.();
            break;
          default:
            console.log('Lemon Squeezy event:', event);
        }
      },
    });
  }
}

// Open checkout overlay
export function openCheckout(url: string) {
  if (typeof window !== 'undefined' && window.LemonSqueezy) {
    window.LemonSqueezy.Url.Open(url);
  } else {
    // Fallback to regular redirect
    window.open(url, '_blank');
  }
}
