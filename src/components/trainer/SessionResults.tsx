import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Clock, Zap, TrendingUp, TrendingDown, Minus, RotateCcw, Home, Award } from 'lucide-react';
import { SessionResults as SessionResultsType } from '@/lib/trainer/types';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface SessionResultsProps {
  results: SessionResultsType;
  topicName: string;
  onRestart: () => void;
}

const gradeColors: Record<string, string> = {
  'A': 'bg-chart-1 text-foreground',
  'B': 'bg-chart-2 text-foreground',
  'C': 'bg-chart-4 text-foreground',
  'D': 'bg-chart-5 text-foreground',
  'F': 'bg-destructive text-destructive-foreground',
};

export function SessionResults({ results, topicName, onRestart }: SessionResultsProps) {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}м ${secs}с` : `${secs}с`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Main result card */}
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className={cn(
              "flex h-24 w-24 items-center justify-center rounded-full text-4xl font-bold",
              gradeColors[results.grade] || 'bg-muted'
            )}>
              {results.grade}
            </div>
          </div>
          <CardTitle className="text-2xl">Сессия завершена!</CardTitle>
          <CardDescription className="text-lg">{topicName}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score */}
          <div className="text-center">
            <p className="text-5xl font-bold text-primary">{results.score}</p>
            <p className="text-muted-foreground">очков</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <Target className="h-5 w-5 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{results.correctAnswers}/{results.totalProblems}</p>
              <p className="text-xs text-muted-foreground">правильных</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <Trophy className="h-5 w-5 mx-auto mb-2 text-chart-1" />
              <p className="text-2xl font-bold">{results.accuracy.toFixed(0)}%</p>
              <p className="text-xs text-muted-foreground">точность</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <Zap className="h-5 w-5 mx-auto mb-2 text-chart-4" />
              <p className="text-2xl font-bold">{results.bestStreak}</p>
              <p className="text-xs text-muted-foreground">лучшая серия</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <Clock className="h-5 w-5 mx-auto mb-2 text-chart-3" />
              <p className="text-2xl font-bold">{formatTime(results.averageTimeMs)}</p>
              <p className="text-xs text-muted-foreground">ср. время</p>
            </div>
          </div>

          {/* Level change */}
          {results.levelChange !== 0 && (
            <div className={cn(
              "flex items-center justify-center gap-2 p-3 rounded-lg",
              results.levelChange > 0 ? "bg-chart-1/20" : "bg-destructive/20"
            )}>
              {results.levelChange > 0 ? (
                <>
                  <TrendingUp className="h-5 w-5 text-chart-1" />
                  <span className="font-medium">Уровень повышен на {results.levelChange}!</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-5 w-5 text-destructive" />
                  <span className="font-medium">Уровень понижен на {Math.abs(results.levelChange)}</span>
                </>
              )}
            </div>
          )}

          {/* Accuracy bar */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Точность</span>
              <span>{results.accuracy.toFixed(1)}%</span>
            </div>
            <Progress value={results.accuracy} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* New achievements */}
      {results.newAchievements && results.newAchievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-chart-4" />
              Новые достижения!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.newAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 bg-chart-4/10 rounded-lg">
                  <div className="text-2xl">{achievement.icon || '🏆'}</div>
                  <div>
                    <p className="font-medium">{achievement.name}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <Badge className="ml-auto">+{achievement.points}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-4 justify-center">
        <Button variant="outline" size="lg" asChild>
          <Link to="/trainer">
            <Home className="mr-2 h-4 w-4" />
            К темам
          </Link>
        </Button>
        <Button size="lg" onClick={onRestart}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Ещё раз
        </Button>
      </div>
    </div>
  );
}
