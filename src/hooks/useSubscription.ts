import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface Subscription {
  id: string;
  user_id: string;
  status: 'active' | 'cancelled' | 'expired' | 'past_due' | 'trialing';
  plan: 'monthly' | 'yearly';
  lemon_squeezy_subscription_id: string;
  current_period_end: string;
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

  const isPremium = subscription?.status === 'active';

  const isExpiringSoon = useCallback(() => {
    if (!subscription?.current_period_end) return false;
    const endDate = new Date(subscription.current_period_end);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  }, [subscription]);

  const daysUntilExpiry = useCallback(() => {
    if (!subscription?.current_period_end) return null;
    const endDate = new Date(subscription.current_period_end);
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
