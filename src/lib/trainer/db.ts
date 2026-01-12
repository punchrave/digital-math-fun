// Обёртка для работы с таблицами тренажёра до обновления типов Supabase
import { supabase } from '@/integrations/supabase/client';

// Типизированный клиент для новых таблиц
export const trainerDb = {
  trainingTopics: () => supabase.from('training_topics' as any),
  userTopicLevels: () => supabase.from('user_topic_levels' as any),
  trainingSessions: () => supabase.from('training_sessions' as any),
  sessionProblems: () => supabase.from('session_problems' as any),
  achievements: () => supabase.from('achievements' as any),
  userAchievements: () => supabase.from('user_achievements' as any),
  userStats: () => supabase.from('user_stats' as any),
  profiles: () => supabase.from('profiles' as any),
};
