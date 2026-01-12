import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, GraduationCap, Zap, HelpCircle, Timer } from 'lucide-react';
import { TrainingMode, MODE_CONFIG } from '@/lib/trainer/types';
import { cn } from '@/lib/utils';

interface ModeSelectorProps {
  selectedMode: TrainingMode | null;
  onSelect: (mode: TrainingMode) => void;
  onStart: () => void;
  isLoading?: boolean;
}

const modeInfo: Record<TrainingMode, { icon: React.ReactNode; title: string; description: string; features: string[] }> = {
  workout: {
    icon: <Zap className="h-6 w-6" />,
    title: 'Быстрый Workout',
    description: 'Реши как можно больше примеров за 60 секунд',
    features: ['60 секунд на все', 'Максимум очков', 'Бонус за серии'],
  },
  practice: {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Тренировка темы',
    description: 'Фиксированное число задач с подсказками',
    features: ['10 задач', 'Есть подсказки', 'Без таймера'],
  },
  exam: {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Экзамен',
    description: 'Проверь свои знания без подсказок',
    features: ['15 задач', 'Без подсказок', '5 минут'],
  },
};

export function ModeSelector({ selectedMode, onSelect, onStart, isLoading }: ModeSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {(Object.keys(modeInfo) as TrainingMode[]).map((mode) => {
          const info = modeInfo[mode];
          const config = MODE_CONFIG[mode];
          const isSelected = selectedMode === mode;
          
          return (
            <Card
              key={mode}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                isSelected ? "border-2 border-primary ring-2 ring-primary/20" : "border hover:border-primary/50"
              )}
              onClick={() => onSelect(mode)}
            >
              <CardHeader className="pb-2">
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                )}>
                  {info.icon}
                </div>
                <CardTitle className="mt-3 text-lg">{info.title}</CardTitle>
                <CardDescription>{info.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {info.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {feature.includes('секунд') || feature.includes('минут') ? (
                        <Timer className="h-3 w-3" />
                      ) : feature.includes('подсказ') ? (
                        <HelpCircle className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {selectedMode && (
        <div className="flex justify-center">
          <Button size="lg" onClick={onStart} disabled={isLoading} className="px-8">
            {isLoading ? 'Загрузка...' : 'Начать тренировку'}
          </Button>
        </div>
      )}
    </div>
  );
}
