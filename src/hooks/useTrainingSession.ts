import { useState, useCallback, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { trainerDb } from '@/lib/trainer/db';
import { useAuth } from './useAuth';
import { useUpdateTopicLevel, useUpdateUserStats, useAchievements, useUserAchievements, useGrantAchievement, useUserStats } from './useUserProgress';
import { generateProblem, calculateNewLevel, calculateScore } from '@/lib/trainer/problemGenerator';
import { TrainingMode, TopicSlug, Problem, MODE_CONFIG, calculateGrade, SessionResults, Achievement } from '@/lib/trainer/types';

interface SessionState {
  isActive: boolean; isPaused: boolean; currentProblem: Problem | null; problemStartTime: number;
  currentStreak: number; bestStreak: number; correctAnswers: number; totalProblems: number;
  totalTimeMs: number; problemTimes: number[]; currentLevel: number; recentCorrect: number[];
}

export function useTrainingSession(topicId: string, topicSlug: TopicSlug, mode: TrainingMode, initialLevel: number = 1, customProblemCount?: number) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const updateTopicLevel = useUpdateTopicLevel();
  const updateUserStats = useUpdateUserStats();
  const { data: achievements } = useAchievements();
  const { data: userAchievements } = useUserAchievements();
  const { data: userStats } = useUserStats();
  const grantAchievement = useGrantAchievement();
  
  const baseConfig = MODE_CONFIG[mode];
  const config = {
    ...baseConfig,
    problemCount: customProblemCount || baseConfig.problemCount,
  };
  const sessionIdRef = useRef<string | null>(null);
  const timerRef = useRef<number | null>(null);
  
  const [state, setState] = useState<SessionState>({ isActive: false, isPaused: false, currentProblem: null, problemStartTime: 0, currentStreak: 0, bestStreak: 0, correctAnswers: 0, totalProblems: 0, totalTimeMs: 0, problemTimes: [], currentLevel: initialLevel, recentCorrect: [] });
  const [timeLeft, setTimeLeft] = useState(config.timerSeconds || 0);
  const [results, setResults] = useState<SessionResults | null>(null);
  const [lastAnswer, setLastAnswer] = useState<{ isCorrect: boolean; correctAnswer: string; solution?: string } | null>(null);

  useEffect(() => {
    if (state.isActive && !state.isPaused && config.hasTimer && timeLeft > 0) {
      timerRef.current = window.setInterval(() => { setTimeLeft(prev => prev <= 1 ? (endSession(), 0) : prev - 1); }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state.isActive, state.isPaused, config.hasTimer]);

  const createSession = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Не авторизован');
      const { data, error } = await trainerDb.trainingSessions().insert({ user_id: user.id, topic_id: topicId, mode }).select().single();
      if (error) throw error;
      return (data as any).id;
    },
  });

  const saveSession = useMutation({
    mutationFn: async (d: { sessionId: string; totalProblems: number; correctAnswers: number; totalTimeMs: number; score: number; streakBest: number }) => {
      const { error } = await trainerDb.trainingSessions().update({ finished_at: new Date().toISOString(), total_problems: d.totalProblems, correct_answers: d.correctAnswers, total_time_ms: d.totalTimeMs, score: d.score, streak_best: d.streakBest }).eq('id', d.sessionId);
      if (error) throw error;
    },
  });

  const saveProblem = useMutation({
    mutationFn: async (d: { sessionId: string; problemText: string; correctAnswer: string; userAnswer: string; isCorrect: boolean; timeMs: number; difficulty: number }) => {
      const { error } = await trainerDb.sessionProblems().insert({ session_id: d.sessionId, problem_text: d.problemText, correct_answer: d.correctAnswer, user_answer: d.userAnswer, is_correct: d.isCorrect, time_ms: d.timeMs, difficulty: d.difficulty });
      if (error) throw error;
    },
  });

  const checkAchievements = useCallback(async (sessionsCompleted: number, problemsSolved: number, bestStreak: number, accuracy: number, problemsIn60Sec: number, topicsTrained: number): Promise<Achievement[]> => {
    if (!achievements || !userAchievements) return [];
    const earnedIds = new Set(userAchievements.map(ua => ua.achievement_id));
    const newAchievements: Achievement[] = [];
    for (const a of achievements) {
      if (earnedIds.has(a.id)) continue;
      let earned = false;
      if (a.condition_type === 'sessions_completed') earned = sessionsCompleted >= a.condition_value;
      else if (a.condition_type === 'streak') earned = bestStreak >= a.condition_value;
      else if (a.condition_type === 'problems_solved') earned = problemsSolved >= a.condition_value;
      else if (a.condition_type === 'accuracy') earned = accuracy >= a.condition_value;
      else if (a.condition_type === 'speed') earned = problemsIn60Sec >= a.condition_value;
      else if (a.condition_type === 'topics_trained') earned = topicsTrained >= a.condition_value;
      if (earned) { await grantAchievement.mutateAsync(a.id); newAchievements.push(a); }
    }
    return newAchievements;
  }, [achievements, userAchievements, grantAchievement]);

  const startSession = useCallback(async () => {
    if (!user) return;
    const sessionId = await createSession.mutateAsync();
    sessionIdRef.current = sessionId;
    const firstProblem = generateProblem(topicSlug, initialLevel);
    setState({ isActive: true, isPaused: false, currentProblem: firstProblem, problemStartTime: Date.now(), currentStreak: 0, bestStreak: 0, correctAnswers: 0, totalProblems: 0, totalTimeMs: 0, problemTimes: [], currentLevel: initialLevel, recentCorrect: [] });
    setTimeLeft(config.timerSeconds || 0);
    setResults(null);
    setLastAnswer(null);
  }, [user, topicSlug, initialLevel, config.timerSeconds, createSession]);

  const endSessionWithData = useCallback(async (totalProblems: number, correctAnswers: number, totalTimeMs: number, bestStreak: number, finalLevel: number, problemTimes: number[]) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const accuracy = totalProblems > 0 ? (correctAnswers / totalProblems) * 100 : 0;
    const averageTimeMs = problemTimes.length > 0 ? problemTimes.reduce((a, b) => a + b, 0) / problemTimes.length : 0;
    const score = calculateScore(correctAnswers, totalProblems, averageTimeMs, bestStreak, finalLevel);
    const grade = calculateGrade(accuracy);
    if (sessionIdRef.current) await saveSession.mutateAsync({ sessionId: sessionIdRef.current, totalProblems, correctAnswers, totalTimeMs, score, streakBest: bestStreak });
    await updateTopicLevel.mutateAsync({ topicId, level: finalLevel, correct: correctAnswers, attempts: totalProblems, avgTimeMs: Math.round(averageTimeMs), accuracy: Math.round(accuracy * 100) / 100 });
    await updateUserStats.mutateAsync({ pointsEarned: score, problemsSolved: totalProblems, sessionBestStreak: bestStreak });
    const newAchievements = await checkAchievements((userStats?.total_sessions || 0) + 1, (userStats?.total_problems_solved || 0) + totalProblems, bestStreak, accuracy, mode === 'test' ? correctAnswers : 0, 1);
    setResults({ totalProblems, correctAnswers, accuracy, totalTimeMs, averageTimeMs, bestStreak, score, grade, newAchievements, levelChange: finalLevel - initialLevel });
    setState(prev => ({ ...prev, isActive: false, isPaused: false, currentProblem: null }));
    queryClient.invalidateQueries({ queryKey: ['user-topic-levels'] });
    queryClient.invalidateQueries({ queryKey: ['user-stats'] });
  }, [topicId, mode, initialLevel, userStats, saveSession, updateTopicLevel, updateUserStats, checkAchievements, queryClient]);

  const submitAnswer = useCallback(async (userAnswer: string) => {
    if (!state.currentProblem || !sessionIdRef.current) return null;
    const timeMs = Date.now() - state.problemStartTime;
    const isCorrect = userAnswer.trim().toLowerCase().replace(/\s+/g, '') === state.currentProblem.answer.trim().toLowerCase().replace(/\s+/g, '');
    await saveProblem.mutateAsync({ sessionId: sessionIdRef.current, problemText: state.currentProblem.text, correctAnswer: state.currentProblem.answer, userAnswer, isCorrect, timeMs, difficulty: state.currentProblem.difficulty });
    const newRecentCorrect = [...state.recentCorrect, isCorrect ? 1 : 0].slice(-5);
    const newLevel = calculateNewLevel(state.currentLevel, isCorrect, timeMs, newRecentCorrect.reduce((a, b) => a + b, 0), newRecentCorrect.length);
    const newStreak = isCorrect ? state.currentStreak + 1 : 0;
    const newBestStreak = Math.max(state.bestStreak, newStreak);
    const newCorrect = state.correctAnswers + (isCorrect ? 1 : 0);
    const newTotal = state.totalProblems + 1;
    const newTotalTime = state.totalTimeMs + timeMs;
    const newProblemTimes = [...state.problemTimes, timeMs];
    const answerResult = { isCorrect, correctAnswer: state.currentProblem.answer, solution: state.currentProblem.solution };
    setLastAnswer(answerResult);
    const shouldEnd = (config.problemCount && newTotal >= config.problemCount) || (config.hasTimer && timeLeft <= 0);
    if (shouldEnd) { await endSessionWithData(newTotal, newCorrect, newTotalTime, newBestStreak, newLevel, newProblemTimes); }
    else { const nextProblem = generateProblem(topicSlug, newLevel); setState(prev => ({ ...prev, currentProblem: nextProblem, problemStartTime: Date.now(), currentStreak: newStreak, bestStreak: newBestStreak, correctAnswers: newCorrect, totalProblems: newTotal, totalTimeMs: newTotalTime, problemTimes: newProblemTimes, currentLevel: newLevel, recentCorrect: newRecentCorrect })); }
    return answerResult;
  }, [state, topicSlug, timeLeft, config, saveProblem, endSessionWithData]);

  const endSession = useCallback(() => { endSessionWithData(state.totalProblems, state.correctAnswers, state.totalTimeMs, state.bestStreak, state.currentLevel, state.problemTimes); }, [state, endSessionWithData]);
  const togglePause = useCallback(() => { setState(prev => ({ ...prev, isPaused: !prev.isPaused })); }, []);
  const skipProblem = useCallback(() => { if (config.showSolution) submitAnswer(''); }, [config.showSolution, submitAnswer]);

  return { state, timeLeft, results, config, lastAnswer, startSession, submitAnswer, endSession, togglePause, skipProblem, isLoading: createSession.isPending || saveSession.isPending };
}
