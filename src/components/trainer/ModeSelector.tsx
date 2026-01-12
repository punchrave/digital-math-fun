import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, ClipboardCheck, HelpCircle, Timer, Hash } from 'lucide-react';
import { TrainingMode, MODE_CONFIG } from '@/lib/trainer/types';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ModeSelectorProps {
  selectedMode: TrainingMode | null;
  onSelect: (mode: TrainingMode) => void;
  onStart: () => void;
  isLoading?: boolean;
  problemCount: number;
  onProblemCountChange: (count: number) => void;
}

const modeInfo: Record<TrainingMode, { icon: React.ReactNode; title: string; description: string; features: string[] }> = {
  test: {
    icon: <ClipboardCheck className="h-6 w-6" />,
    title: 'Тест по теме',
    description: 'Проверьте свои знания без ограничения по времени',
    features: ['Без таймера', 'Подсказки и решения', 'Выбор кол-ва задач'],
  },
  practice: {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Тренировка',
    description: 'Практикуйтесь с подробными объяснениями',
    features: ['Без таймера', 'Подсказки и решения', 'Адаптивная сложность'],
  },
  exam: {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Экзамен',
    description: 'Строгий режим с ограничением по времени',
    features: ['10 минут', 'Подсказки и решения', 'Оценка по результату'],
  },
};

const problemCountOptions = [5, 10, 15, 20, 25, 30];

export function ModeSelector({ selectedMode, onSelect, onStart, isLoading, problemCount, onProblemCountChange }: ModeSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {(Object.keys(modeInfo) as TrainingMode[]).map((mode) => {
          const info = modeInfo[mode];
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
                      {feature.includes('минут') ? (
                        <Timer className="h-3 w-3" />
                      ) : feature.includes('подсказ') || feature.includes('Подсказки') ? (
                        <HelpCircle className="h-3 w-3" />
                      ) : feature.includes('кол-ва') || feature.includes('задач') ? (
                        <Hash className="h-3 w-3" />
                      ) : (
                        <Timer className="h-3 w-3" />
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
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <Label htmlFor="problem-count" className="text-sm font-medium">
              Количество задач:
            </Label>
            <Select value={problemCount.toString()} onValueChange={(v) => onProblemCountChange(parseInt(v))}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {problemCountOptions.map((count) => (
                  <SelectItem key={count} value={count.toString()}>
                    {count}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-center">
            <Button size="lg" onClick={onStart} disabled={isLoading} className="px-8">
              {isLoading ? 'Загрузка...' : 'Начать тренировку'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
