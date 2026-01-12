import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { trainerDb } from '@/lib/trainer/db';
import { useAuth } from './useAuth';
import { UserTopicLevel, UserStats, UserAchievement, Achievement } from '@/lib/trainer/types';

export function useUserTopicLevels() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-topic-levels', user?.id],
    queryFn: async (): Promise<UserTopicLevel[]> => {
      if (!user) return [];
      const { data, error } = await trainerDb.userTopicLevels().select('*').eq('user_id', user.id);
      if (error) throw error;
      return (data || []) as UserTopicLevel[];
    },
    enabled: !!user,
  });
}

export function useUserTopicLevel(topicId: string) {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-topic-level', user?.id, topicId],
    queryFn: async (): Promise<UserTopicLevel | null> => {
      if (!user) return null;
      const { data, error } = await trainerDb.userTopicLevels().select('*').eq('user_id', user.id).eq('topic_id', topicId).maybeSingle();
      if (error) throw error;
      return data as UserTopicLevel | null;
    },
    enabled: !!user && !!topicId,
  });
}

export function useUpdateTopicLevel() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ topicId, level, correct, attempts, avgTimeMs, accuracy }: { topicId: string; level: number; correct: number; attempts: number; avgTimeMs: number; accuracy: number }) => {
      if (!user) throw new Error('Не авторизован');
      const { data: existing } = await trainerDb.userTopicLevels().select('id, total_correct, total_attempts').eq('user_id', user.id).eq('topic_id', topicId).maybeSingle();
      
      if (existing) {
        const { error } = await trainerDb.userTopicLevels().update({
          current_level: level,
          total_correct: ((existing as any).total_correct || 0) + correct,
          total_attempts: ((existing as any).total_attempts || 0) + attempts,
          average_time_ms: avgTimeMs,
          accuracy_percent: accuracy,
          last_trained_at: new Date().toISOString(),
        }).eq('id', (existing as any).id);
        if (error) throw error;
      } else {
        const { error } = await trainerDb.userTopicLevels().insert({ user_id: user.id, topic_id: topicId, current_level: level, total_correct: correct, total_attempts: attempts, average_time_ms: avgTimeMs, accuracy_percent: accuracy, last_trained_at: new Date().toISOString() });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-topic-levels'] });
      queryClient.invalidateQueries({ queryKey: ['user-topic-level'] });
    },
  });
}

export function useUserStats() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['user-stats', user?.id],
    queryFn: async (): Promise<UserStats | null> => {
      if (!user) return null;
      const { data, error } = await trainerDb.userStats().select('*').eq('user_id', user.id).maybeSingle();
      if (error) throw error;
      return data as UserStats | null;
    },
    enabled: !!user,
  });
}

export function useUpdateUserStats() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ pointsEarned, problemsSolved, sessionBestStreak }: { pointsEarned: number; problemsSolved: number; sessionBestStreak: number }) => {
      if (!user) throw new Error('Не авторизован');
      const { data: existing } = await trainerDb.userStats().select('*').eq('user_id', user.id).maybeSingle();
      const today = new Date().toISOString().split('T')[0];
      
      if (existing) {
        const stats = existing as UserStats;
        const lastDate = stats.last_activity_date;
        const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        let newStreakDays = stats.current_streak_days;
        if (lastDate === yesterdayStr) newStreakDays += 1;
        else if (lastDate !== today) newStreakDays = 1;
        
        const { error } = await trainerDb.userStats().update({ total_points: stats.total_points + pointsEarned, total_sessions: stats.total_sessions + 1, total_problems_solved: stats.total_problems_solved + problemsSolved, best_streak: Math.max(stats.best_streak, sessionBestStreak), current_streak_days: newStreakDays, last_activity_date: today }).eq('id', stats.id);
        if (error) throw error;
      } else {
        const { error } = await trainerDb.userStats().insert({ user_id: user.id, total_points: pointsEarned, total_sessions: 1, total_problems_solved: problemsSolved, best_streak: sessionBestStreak, current_streak_days: 1, last_activity_date: today });
        if (error) throw error;
      }
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['user-stats'] }); },
  });
}

export function useAchievements() {
  return useQuery({
    queryKey: ['achievements'],
    queryFn: async (): Promise<Achievement[]> => {
      const { data, error } = await trainerDb.achievements().select('*').order('points');
      if (error) throw error;
      return (data || []) as Achievement[];
    },
  });
}

export function useUserAchievements() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['user-achievements', user?.id],
    queryFn: async (): Promise<UserAchievement[]> => {
      if (!user) return [];
      const { data, error } = await trainerDb.userAchievements().select(`*, achievement:achievements(*)`).eq('user_id', user.id);
      if (error) throw error;
      return (data || []) as UserAchievement[];
    },
    enabled: !!user,
  });
}

export function useGrantAchievement() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (achievementId: string) => {
      if (!user) throw new Error('Не авторизован');
      const { data: existing } = await trainerDb.userAchievements().select('id').eq('user_id', user.id).eq('achievement_id', achievementId).maybeSingle();
      if (existing) return null;
      const { data, error } = await trainerDb.userAchievements().insert({ user_id: user.id, achievement_id: achievementId }).select(`*, achievement:achievements(*)`).single();
      if (error) throw error;
      return data as UserAchievement;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['user-achievements'] }); },
  });
}
