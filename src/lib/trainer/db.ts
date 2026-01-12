// Обёртка для работы с таблицами тренажёра до обновления типов Supabase
import { supabase } from '@/integrations/supabase/client';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

// Типы для таблиц тренажёра
interface TrainingTopicRow { id: string; slug: string; name: string; description: string | null; icon: string | null; color: string | null; order_index: number; created_at: string; }
interface UserTopicLevelRow { id: string; user_id: string; topic_id: string; current_level: number; total_correct: number; total_attempts: number; average_time_ms: number; accuracy_percent: number; last_trained_at: string; created_at: string; updated_at: string; }
interface TrainingSessionRow { id: string; user_id: string; topic_id: string; mode: string; started_at: string; finished_at: string | null; total_problems: number; correct_answers: number; total_time_ms: number; score: number; streak_best: number; created_at: string; }
interface SessionProblemRow { id: string; session_id: string; problem_text: string; correct_answer: string; user_answer: string; is_correct: boolean; time_ms: number; difficulty: number; created_at: string; }
interface AchievementRow { id: string; name: string; description: string; icon: string | null; points: number; condition_type: string; condition_value: number; created_at: string; }
interface UserAchievementRow { id: string; user_id: string; achievement_id: string; earned_at: string; }
interface UserStatsRow { id: string; user_id: string; total_points: number; total_sessions: number; total_problems_solved: number; best_streak: number; current_streak_days: number; last_activity_date: string; created_at: string; updated_at: string; }
interface ProfileRow { id: string; user_id: string; full_name: string | null; avatar_url: string | null; created_at: string; updated_at: string; }

// Хелпер для создания типизированного запроса к таблице
function fromTable<T>(tableName: string) {
  // @ts-ignore - таблицы существуют в БД, но ещё не сгенерированы в types.ts
  return supabase.from(tableName) as unknown as ReturnType<typeof supabase.from<T extends object ? T : never>>;
}

// Типизированный клиент для новых таблиц
export const trainerDb = {
  trainingTopics: () => fromTable<TrainingTopicRow>('training_topics'),
  userTopicLevels: () => fromTable<UserTopicLevelRow>('user_topic_levels'),
  trainingSessions: () => fromTable<TrainingSessionRow>('training_sessions'),
  sessionProblems: () => fromTable<SessionProblemRow>('session_problems'),
  achievements: () => fromTable<AchievementRow>('achievements'),
  userAchievements: () => fromTable<UserAchievementRow>('user_achievements'),
  userStats: () => fromTable<UserStatsRow>('user_stats'),
  profiles: () => fromTable<ProfileRow>('profiles'),
};
