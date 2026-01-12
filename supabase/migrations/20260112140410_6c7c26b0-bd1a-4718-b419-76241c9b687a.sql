-- Таблица тем тренировки
CREATE TABLE public.training_topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Уровни пользователя по темам
CREATE TABLE public.user_topic_levels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES public.training_topics(id) ON DELETE CASCADE,
  current_level INTEGER NOT NULL DEFAULT 1,
  total_correct INTEGER NOT NULL DEFAULT 0,
  total_attempts INTEGER NOT NULL DEFAULT 0,
  average_time_ms INTEGER NOT NULL DEFAULT 0,
  accuracy_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  last_trained_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, topic_id)
);

-- Сессии тренировок
CREATE TABLE public.training_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES public.training_topics(id) ON DELETE CASCADE,
  mode TEXT NOT NULL CHECK (mode IN ('workout', 'practice', 'exam')),
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  finished_at TIMESTAMP WITH TIME ZONE,
  total_problems INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  total_time_ms INTEGER NOT NULL DEFAULT 0,
  score INTEGER NOT NULL DEFAULT 0,
  streak_best INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Задачи в сессии
CREATE TABLE public.session_problems (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.training_sessions(id) ON DELETE CASCADE,
  problem_text TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  user_answer TEXT,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  time_ms INTEGER NOT NULL DEFAULT 0,
  difficulty INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Достижения
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  condition_type TEXT NOT NULL,
  condition_value INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Полученные достижения
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Общая статистика пользователя
CREATE TABLE public.user_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total_points INTEGER NOT NULL DEFAULT 0,
  total_sessions INTEGER NOT NULL DEFAULT 0,
  total_problems_solved INTEGER NOT NULL DEFAULT 0,
  best_streak INTEGER NOT NULL DEFAULT 0,
  current_streak_days INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Профили пользователей
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS для всех таблиц
ALTER TABLE public.training_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_topic_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Политики: темы и достижения публичные для чтения
CREATE POLICY "Topics are publicly readable" ON public.training_topics FOR SELECT USING (true);
CREATE POLICY "Achievements are publicly readable" ON public.achievements FOR SELECT USING (true);

-- Политики для пользовательских данных
CREATE POLICY "Users can view own topic levels" ON public.user_topic_levels FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own topic levels" ON public.user_topic_levels FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own topic levels" ON public.user_topic_levels FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own sessions" ON public.training_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sessions" ON public.training_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sessions" ON public.training_sessions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own session problems" ON public.session_problems FOR SELECT USING (EXISTS (SELECT 1 FROM public.training_sessions WHERE id = session_id AND user_id = auth.uid()));
CREATE POLICY "Users can insert own session problems" ON public.session_problems FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.training_sessions WHERE id = session_id AND user_id = auth.uid()));

CREATE POLICY "Users can view own achievements" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own stats" ON public.user_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own stats" ON public.user_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own stats" ON public.user_stats FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Начальные данные: темы
INSERT INTO public.training_topics (slug, name, description, icon, order_index) VALUES
('arithmetic', 'Арифметика', 'Сложение, вычитание, умножение и деление', 'calculator', 1),
('fractions', 'Дроби', 'Операции с обыкновенными дробями', 'divide', 2),
('equations', 'Уравнения', 'Решение линейных уравнений', 'equal', 3),
('powers', 'Степени', 'Возведение в степень и корни', 'zap', 4),
('percentages', 'Проценты', 'Вычисление процентов', 'percent', 5);

-- Начальные данные: достижения
INSERT INTO public.achievements (code, name, description, icon, points, condition_type, condition_value) VALUES
('first_session', 'Первые шаги', 'Завершите первую тренировку', '🎯', 10, 'sessions_completed', 1),
('streak_5', 'На волне', '5 правильных ответов подряд', '🔥', 25, 'streak', 5),
('streak_10', 'Неудержимый', '10 правильных ответов подряд', '💪', 50, 'streak', 10),
('problems_50', 'Практик', 'Решите 50 задач', '📚', 30, 'problems_solved', 50),
('problems_100', 'Мастер', 'Решите 100 задач', '🏆', 75, 'problems_solved', 100),
('accuracy_90', 'Снайпер', 'Достигните 90% точности в сессии', '🎯', 40, 'accuracy', 90),
('speed_20', 'Молния', '20 задач за 60 секунд в Workout', '⚡', 100, 'speed', 20);