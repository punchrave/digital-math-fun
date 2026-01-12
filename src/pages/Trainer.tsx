import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { TopicCard } from '@/components/trainer/TopicCard';
import { ModeSelector } from '@/components/trainer/ModeSelector';
import { StatsCard } from '@/components/trainer/StatsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useTrainingTopics } from '@/hooks/useTrainingTopics';
import { useUserTopicLevels, useUserStats } from '@/hooks/useUserProgress';
import { TrainingMode } from '@/lib/trainer/types';
import { ArrowLeft, Calculator, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Trainer() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { data: topics, isLoading: topicsLoading } = useTrainingTopics();
  const { data: userLevels } = useUserTopicLevels();
  const { data: userStats } = useUserStats();
  
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<TrainingMode | null>(null);

  const selectedTopicData = topics?.find(t => t.id === selectedTopic);
  const userLevel = userLevels?.find(ul => ul.topic_id === selectedTopic);
  const trainedTopicCount = new Set(userLevels?.map(ul => ul.topic_id) || []).size;

  const handleStartSession = () => {
    if (selectedTopic && selectedMode) {
      navigate(`/trainer/session?topic=${selectedTopic}&mode=${selectedMode}`);
    }
  };

  const getTopicProgress = (topicId: string) => {
    const level = userLevels?.find(ul => ul.topic_id === topicId);
    if (!level) return 0;
    // Progress based on accuracy and level
    return Math.min(100, (level.current_level * 10) + (level.accuracy_percent / 2));
  };

  if (authLoading || topicsLoading) {
    return (
      <Layout>
        <section className="py-16">
          <div className="container text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 animate-pulse text-primary" />
            <p className="text-muted-foreground">Загрузка тренажёра...</p>
          </div>
        </section>
      </Layout>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <Layout>
        <section className="py-16">
          <div className="container max-w-lg text-center">
            <Calculator className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h1 className="font-serif text-3xl font-bold mb-4">Цифровой тренажёр</h1>
            <p className="text-muted-foreground mb-8">
              Адаптивная система тренировок по математике с элементами геймификации. 
              Войдите в систему, чтобы начать тренировку и отслеживать прогресс.
            </p>
            <Button size="lg" asChild>
              <Link to="/auth">
                <LogIn className="mr-2 h-5 w-5" />
                Войти в систему
              </Link>
            </Button>
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
          <div className="mb-8">
            {selectedTopic ? (
              <Button variant="ghost" onClick={() => { setSelectedTopic(null); setSelectedMode(null); }}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад к темам
              </Button>
            ) : (
              <>
                <h1 className="font-serif text-3xl font-bold mb-2">Цифровой тренажёр</h1>
                <p className="text-muted-foreground">
                  Выберите тему для тренировки. Система адаптирует сложность под ваш уровень.
                </p>
              </>
            )}
          </div>

          {!selectedTopic ? (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Topics grid */}
              <div className="lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2">
                  {topics?.map((topic) => {
                    const level = userLevels?.find(ul => ul.topic_id === topic.id);
                    return (
                      <TopicCard
                        key={topic.id}
                        id={topic.id}
                        name={topic.name}
                        description={topic.description}
                        slug={topic.slug}
                        icon={topic.icon}
                        level={level?.current_level || 1}
                        progress={getTopicProgress(topic.id)}
                        accuracy={level?.accuracy_percent}
                        onClick={() => setSelectedTopic(topic.id)}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Stats sidebar */}
              <div className="space-y-6">
                <StatsCard 
                  stats={userStats || null} 
                  topicCount={topics?.length || 0}
                  trainedTopicCount={trainedTopicCount}
                />
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Быстрые действия</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/trainer/dashboard">
                        📊 Мой прогресс
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Selected topic info */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">{selectedTopicData?.name}</CardTitle>
                  <CardDescription>{selectedTopicData?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm">
                    <span className="text-muted-foreground">
                      Ваш уровень: <strong>{userLevel?.current_level || 1}</strong>
                    </span>
                    {userLevel && (
                      <span className="text-muted-foreground">
                        Точность: <strong>{userLevel.accuracy_percent.toFixed(1)}%</strong>
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Mode selector */}
              <h2 className="font-serif text-xl font-semibold mb-4">Выберите режим тренировки</h2>
              <ModeSelector
                selectedMode={selectedMode}
                onSelect={setSelectedMode}
                onStart={handleStartSession}
              />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
