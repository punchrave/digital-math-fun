// Типы для цифрового тренажёра

export type TrainingMode = 'workout' | 'practice' | 'exam';

export type TopicSlug = 'arithmetic' | 'fractions' | 'equations' | 'powers' | 'percentages';

export interface TrainingTopic {
  id: string;
  name: string;
  slug: TopicSlug;
  description: string | null;
  icon: string | null;
  difficulty_levels: number;
  created_at: string;
}

export interface UserTopicLevel {
  id: string;
  user_id: string;
  topic_id: string;
  current_level: number;
  total_correct: number;
  total_attempts: number;
  average_time_ms: number;
  accuracy_percent: number;
  last_trained_at: string | null;
  updated_at: string;
}

export interface TrainingSession {
  id: string;
  user_id: string;
  topic_id: string;
  mode: TrainingMode;
  started_at: string;
  finished_at: string | null;
  total_problems: number;
  correct_answers: number;
  total_time_ms: number;
  score: number;
  streak_best: number;
}

export interface SessionProblem {
  id: string;
  session_id: string;
  problem_text: string;
  correct_answer: string;
  user_answer: string | null;
  is_correct: boolean;
  time_ms: number;
  difficulty: number;
  created_at: string;
}

export interface Achievement {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  condition_type: string;
  condition_value: number;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
  achievement?: Achievement;
}

export interface UserStats {
  id: string;
  user_id: string;
  total_points: number;
  total_sessions: number;
  total_problems_solved: number;
  best_streak: number;
  current_streak_days: number;
  last_activity_date: string | null;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// Тип для генерируемой задачи
export interface Problem {
  text: string;
  answer: string;
  difficulty: number;
  hint?: string;
}

// Результаты сессии для отображения
export interface SessionResults {
  totalProblems: number;
  correctAnswers: number;
  accuracy: number;
  totalTimeMs: number;
  averageTimeMs: number;
  bestStreak: number;
  score: number;
  grade: string;
  newAchievements: Achievement[];
  levelChange: number; // положительный = рост, отрицательный = падение
}

// Настройки режимов тренировки
export const MODE_CONFIG: Record<TrainingMode, {
  name: string;
  description: string;
  icon: string;
  hasTimer: boolean;
  timerSeconds?: number;
  problemCount?: number;
  showHints: boolean;
  showSolution: boolean;
}> = {
  workout: {
    name: 'Воркаут',
    description: 'Решите как можно больше примеров за 60 секунд',
    icon: 'timer',
    hasTimer: true,
    timerSeconds: 60,
    showHints: false,
    showSolution: false,
  },
  practice: {
    name: 'Тренировка',
    description: '10 задач без ограничения по времени с подсказками',
    icon: 'book-open',
    hasTimer: false,
    problemCount: 10,
    showHints: true,
    showSolution: true,
  },
  exam: {
    name: 'Экзамен',
    description: '15 задач за 5 минут без подсказок',
    icon: 'graduation-cap',
    hasTimer: true,
    timerSeconds: 300,
    problemCount: 15,
    showHints: false,
    showSolution: false,
  },
};

// Оценки по шкале
export function calculateGrade(accuracy: number): string {
  if (accuracy >= 90) return 'A';
  if (accuracy >= 80) return 'B';
  if (accuracy >= 70) return 'C';
  if (accuracy >= 60) return 'D';
  return 'F';
}
