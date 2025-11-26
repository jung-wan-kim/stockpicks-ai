import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface Subscription {
  id: string;
  user_id: string;
  tier: 'basic' | 'premium' | 'professional';
  status: 'active' | 'cancelled' | 'expired' | 'trial' | 'past_due' | 'trialing';
  plan?: 'monthly' | 'yearly' | null;
  lemon_squeezy_subscription_id?: string | null;
  started_at: string;
  expires_at?: string | null;
  created_at: string;
  updated_at: string;
}

export function useSubscription() {
  const { user, isAuthenticated } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    if (!user?.id) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 is "no rows returned" which is expected for free users
        throw fetchError;
      }

      setSubscription(data || null);
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setError('Failed to fetch subscription status');
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  // Subscribe to realtime updates
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('subscription-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscriptions',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Subscription change received:', payload);
          fetchSubscription();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, fetchSubscription]);

  // Premium if subscription is active and tier is premium or professional
  const isPremium = subscription?.status === 'active' &&
    (subscription?.tier === 'premium' || subscription?.tier === 'professional');

  const isExpiringSoon = useCallback(() => {
    if (!subscription?.expires_at) return false;
    const endDate = new Date(subscription.expires_at);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  }, [subscription]);

  const daysUntilExpiry = useCallback(() => {
    if (!subscription?.expires_at) return null;
    const endDate = new Date(subscription.expires_at);
    const now = new Date();
    return Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }, [subscription]);

  return {
    subscription,
    isPremium,
    loading,
    error,
    isExpiringSoon: isExpiringSoon(),
    daysUntilExpiry: daysUntilExpiry(),
    refetch: fetchSubscription,
  };
}
