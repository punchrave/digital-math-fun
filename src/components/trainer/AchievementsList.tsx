import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Lock } from 'lucide-react';
import { Achievement, UserAchievement } from '@/lib/trainer/types';
import { cn } from '@/lib/utils';

interface AchievementsListProps {
  achievements: Achievement[];
  userAchievements: UserAchievement[];
}

export function AchievementsList({ achievements, userAchievements }: AchievementsListProps) {
  const earnedIds = new Set(userAchievements.map(ua => ua.achievement_id));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-chart-4" />
          Достижения
        </CardTitle>
        <CardDescription>
          Получено {userAchievements.length} из {achievements.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {achievements.map((achievement) => {
            const isEarned = earnedIds.has(achievement.id);
            const userAchievement = userAchievements.find(ua => ua.achievement_id === achievement.id);
            
            return (
              <div
                key={achievement.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border transition-colors",
                  isEarned ? "bg-chart-4/10 border-chart-4/30" : "bg-muted/30 opacity-60"
                )}
              >
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-xl",
                  isEarned ? "bg-chart-4/20" : "bg-muted"
                )}>
                  {isEarned ? (achievement.icon || '🏆') : <Lock className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("font-medium", !isEarned && "text-muted-foreground")}>
                    {achievement.name}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {achievement.description}
                  </p>
                  {isEarned && userAchievement && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Получено: {new Date(userAchievement.earned_at).toLocaleDateString('ru-RU')}
                    </p>
                  )}
                </div>
                <Badge variant={isEarned ? "default" : "secondary"}>
                  +{achievement.points}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
