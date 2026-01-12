import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProblemCard } from '@/components/trainer/ProblemCard';
import { SessionResults } from '@/components/trainer/SessionResults';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useTrainingTopic } from '@/hooks/useTrainingTopics';
import { useUserTopicLevel } from '@/hooks/useUserProgress';
import { useTrainingSession } from '@/hooks/useTrainingSession';
import { TrainingMode, TopicSlug } from '@/lib/trainer/types';
import { ArrowLeft, Calculator, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TrainerSession() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const topicId = searchParams.get('topic');
  const mode = searchParams.get('mode') as TrainingMode | null;

  const { user, loading: authLoading } = useAuth();
  const { data: topic, isLoading: topicLoading } = useTrainingTopic(topicId || '');
  const { data: userLevel } = useUserTopicLevel(topicId || '');

  const {
    state,
    timeLeft,
    results,
    config,
    lastAnswer,
    startSession,
    submitAnswer,
    endSession,
    togglePause,
    skipProblem,
    isLoading,
  } = useTrainingSession(
    topicId || '',
    (topic?.slug || 'arithmetic') as TopicSlug,
    mode || 'practice',
    userLevel?.current_level || 1
  );

  // Redirect if no topic/mode
  useEffect(() => {
    if (!topicId || !mode) {
      navigate('/trainer');
    }
  }, [topicId, mode, navigate]);

  // Auto-start session when ready
  useEffect(() => {
    if (user && topic && !state.isActive && !results && !isLoading) {
      startSession();
    }
  }, [user, topic, state.isActive, results, isLoading, startSession]);

  if (authLoading || topicLoading) {
    return (
      <Layout>
        <section className="py-16">
          <div className="container text-center">
            <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <section className="py-16">
          <div className="container text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">Для тренировки необходимо войти в систему</p>
            <Button asChild>
              <Link to="/auth">Войти</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  // Show results
  if (results) {
    return (
      <Layout>
        <section className="py-8 md:py-12">
          <div className="container">
            <SessionResults
              results={results}
              topicName={topic?.name || 'Тренировка'}
              onRestart={startSession}
            />
          </div>
        </section>
      </Layout>
    );
  }

  // Loading / starting
  if (!state.isActive || !state.currentProblem) {
    return (
      <Layout>
        <section className="py-16">
          <div className="container text-center">
            <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
            <p className="text-muted-foreground">Подготовка сессии...</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-8 md:py-12">
        <div className="container">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={endSession}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Завершить
              </Button>
              <div>
                <h1 className="font-semibold">{topic?.name}</h1>
                <p className="text-sm text-muted-foreground">{config.name}</p>
              </div>
            </div>
          </div>

          {/* Problem card */}
          <ProblemCard
            problem={state.currentProblem}
            problemNumber={state.totalProblems + 1}
            totalProblems={config.problemCount}
            timeLeft={config.hasTimer ? timeLeft : undefined}
            streak={state.currentStreak}
            showHints={config.showHints}
            isPaused={state.isPaused}
            lastAnswer={lastAnswer}
            onSubmit={submitAnswer}
            onSkip={config.showSolution ? skipProblem : undefined}
            onPause={config.hasTimer ? togglePause : undefined}
          />
        </div>
      </section>
    </Layout>
  );
}
