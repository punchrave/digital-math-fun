import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/trainer/StatsCard';
import { AchievementsList } from '@/components/trainer/AchievementsList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useTrainingTopics } from '@/hooks/useTrainingTopics';
import { useUserTopicLevels, useUserStats, useAchievements, useUserAchievements } from '@/hooks/useUserProgress';
import { ArrowLeft, Calculator, TrendingUp, Target, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TrainerDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { data: topics } = useTrainingTopics();
  const { data: userLevels } = useUserTopicLevels();
  const { data: userStats } = useUserStats();
  const { data: achievements } = useAchievements();
  const { data: userAchievements } = useUserAchievements();

  const trainedTopicCount = new Set(userLevels?.map(ul => ul.topic_id) || []).size;

  const getTopicProgress = (topicId: string) => {
    const level = userLevels?.find(ul => ul.topic_id === topicId);
    if (!level) return { level: 1, progress: 0, accuracy: 0 };
    return {
      level: level.current_level,
      progress: Math.min(100, (level.current_level * 10) + (level.accuracy_percent / 2)),
      accuracy: level.accuracy_percent,
    };
  };

  if (authLoading) {
    return (
      <Layout>
        <section className="py-16">
          <div className="container text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 animate-pulse text-primary" />
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
          <div className="container max-w-lg text-center">
            <TrendingUp className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h1 className="font-serif text-3xl font-bold mb-4">Мой прогресс</h1>
            <p className="text-muted-foreground mb-8">
              Войдите в систему, чтобы увидеть свою статистику и достижения.
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
          <div className="mb-8 flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/trainer">
                <ArrowLeft className="mr-2 h-4 w-4" />
                К тренажёру
              </Link>
            </Button>
            <div>
              <h1 className="font-serif text-3xl font-bold">Мой прогресс</h1>
              <p className="text-muted-foreground">Статистика и достижения</p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Topic progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Прогресс по темам
                  </CardTitle>
                  <CardDescription>
                    Тренировано {trainedTopicCount} из {topics?.length || 0} тем
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topics?.map((topic) => {
                      const { level, progress, accuracy } = getTopicProgress(topic.id);
                      const isTrained = userLevels?.some(ul => ul.topic_id === topic.id);
                      
                      return (
                        <div key={topic.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{topic.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                Ур. {level}
                              </Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {isTrained ? `${accuracy.toFixed(0)}%` : 'Не начато'}
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              {achievements && userAchievements && (
                <AchievementsList
                  achievements={achievements}
                  userAchievements={userAchievements}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <StatsCard
                stats={userStats || null}
                topicCount={topics?.length || 0}
                trainedTopicCount={trainedTopicCount}
              />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Рекомендации</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {userLevels && userLevels.length > 0 ? (
                    <>
                      {/* Find weakest topic */}
                      {(() => {
                        const weakest = [...(userLevels || [])].sort((a, b) => a.accuracy_percent - b.accuracy_percent)[0];
                        const weakestTopic = topics?.find(t => t.id === weakest?.topic_id);
                        if (weakestTopic && weakest.accuracy_percent < 80) {
                          return (
                            <div className="p-3 bg-destructive/10 rounded-lg text-sm">
                              <p className="font-medium text-destructive">Требует внимания</p>
                              <p className="text-muted-foreground">
                                Тема «{weakestTopic.name}» — точность {weakest.accuracy_percent.toFixed(0)}%
                              </p>
                            </div>
                          );
                        }
                        return null;
                      })()}
                      <Button className="w-full" asChild>
                        <Link to="/trainer">Продолжить тренировку</Link>
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        Начните тренировку, чтобы получить персональные рекомендации
                      </p>
                      <Button asChild>
                        <Link to="/trainer">Начать</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
