import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

const DAILY_LIMIT = 10;

export function useAILimit() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [questionCount, setQuestionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchLimit = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('ai_question_limits')
        .select('question_count')
        .eq('user_id', user.id)
        .eq('question_date', today)
        .maybeSingle();

      if (error) {
        console.error('Error fetching AI limit:', error);
        return;
      }

      setQuestionCount(data?.question_count ?? 0);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      fetchLimit();
    }
  }, [authLoading, fetchLimit]);

  const incrementCount = useCallback(async () => {
    if (!user) return false;

    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Try to get existing record
      const { data: existing } = await supabase
        .from('ai_question_limits')
        .select('id, question_count')
        .eq('user_id', user.id)
        .eq('question_date', today)
        .maybeSingle();

      if (existing) {
        // Update existing record
        const newCount = existing.question_count + 1;
        const { error } = await supabase
          .from('ai_question_limits')
          .update({ question_count: newCount })
          .eq('id', existing.id);

        if (error) {
          console.error('Error updating count:', error);
          return false;
        }
        setQuestionCount(newCount);
      } else {
        // Create new record
        const { error } = await supabase
          .from('ai_question_limits')
          .insert({
            user_id: user.id,
            question_date: today,
            question_count: 1
          });

        if (error) {
          console.error('Error creating limit record:', error);
          return false;
        }
        setQuestionCount(1);
      }
      return true;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }, [user]);

  return {
    isAuthenticated,
    loading: loading || authLoading,
    questionCount,
    remainingQuestions: Math.max(0, DAILY_LIMIT - questionCount),
    canAsk: isAuthenticated && questionCount < DAILY_LIMIT,
    dailyLimit: DAILY_LIMIT,
    incrementCount,
    refetch: fetchLimit
  };
}
