import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Zap, Calendar, TrendingUp, Star } from 'lucide-react';
import { UserStats } from '@/lib/trainer/types';

interface StatsCardProps {
  stats: UserStats | null;
  topicCount?: number;
  trainedTopicCount?: number;
}

export function StatsCard({ stats, topicCount = 0, trainedTopicCount = 0 }: StatsCardProps) {
  const topicProgress = topicCount > 0 ? (trainedTopicCount / topicCount) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Общая статистика
        </CardTitle>
        <CardDescription>Ваш прогресс в тренажёре</CardDescription>
      </CardHeader>
      <CardContent>
        {stats ? (
          <div className="space-y-6">
            {/* Main stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <Star className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-3xl font-bold">{stats.total_points}</p>
                <p className="text-xs text-muted-foreground">всего очков</p>
              </div>
              <div className="text-center p-4 bg-chart-1/10 rounded-lg">
                <Trophy className="h-6 w-6 mx-auto mb-2 text-chart-1" />
                <p className="text-3xl font-bold">{stats.best_streak}</p>
                <p className="text-xs text-muted-foreground">лучшая серия</p>
              </div>
            </div>

            {/* Secondary stats */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <Target className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xl font-semibold">{stats.total_problems_solved}</p>
                <p className="text-xs text-muted-foreground">задач</p>
              </div>
              <div>
                <Zap className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xl font-semibold">{stats.total_sessions}</p>
                <p className="text-xs text-muted-foreground">сессий</p>
              </div>
              <div>
                <Calendar className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xl font-semibold">{stats.current_streak_days}</p>
                <p className="text-xs text-muted-foreground">дней подряд</p>
              </div>
            </div>

            {/* Topic progress */}
            {topicCount > 0 && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Темы изучены</span>
                  <span>{trainedTopicCount} / {topicCount}</span>
                </div>
                <Progress value={topicProgress} className="h-2" />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Начните тренировку, чтобы увидеть статистику</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
