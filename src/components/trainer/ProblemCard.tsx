import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Lightbulb, SkipForward, Pause, Play } from 'lucide-react';
import { Problem } from '@/lib/trainer/types';
import { cn } from '@/lib/utils';

interface ProblemCardProps {
  problem: Problem;
  problemNumber: number;
  totalProblems?: number;
  timeLeft?: number;
  streak: number;
  showHints?: boolean;
  isPaused?: boolean;
  lastAnswer?: { isCorrect: boolean; correctAnswer: string } | null;
  onSubmit: (answer: string) => void;
  onSkip?: () => void;
  onPause?: () => void;
}

export function ProblemCard({
  problem,
  problemNumber,
  totalProblems,
  timeLeft,
  streak,
  showHints = false,
  isPaused = false,
  lastAnswer,
  onSubmit,
  onSkip,
  onPause,
}: ProblemCardProps) {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAnswer('');
    setShowHint(false);
    inputRef.current?.focus();
  }, [problem.text]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}с`;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {totalProblems && (
              <Badge variant="outline">
                {problemNumber} / {totalProblems}
              </Badge>
            )}
            <Badge variant="secondary">
              Уровень {problem.difficulty}
            </Badge>
            {streak > 0 && (
              <Badge className="bg-chart-1 text-foreground">
                🔥 {streak} подряд
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {timeLeft !== undefined && (
              <Badge 
                variant={timeLeft < 10 ? "destructive" : "outline"} 
                className="text-lg px-3 py-1"
              >
                {formatTime(timeLeft)}
              </Badge>
            )}
            {onPause && (
              <Button variant="ghost" size="icon" onClick={onPause}>
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>
        {totalProblems && (
          <Progress value={(problemNumber / totalProblems) * 100} className="mt-2 h-1" />
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Last answer feedback */}
        {lastAnswer && (
          <div className={cn(
            "flex items-center gap-2 p-3 rounded-lg text-sm",
            lastAnswer.isCorrect 
              ? "bg-chart-1/20 text-chart-1" 
              : "bg-destructive/20 text-destructive"
          )}>
            {lastAnswer.isCorrect ? (
              <>
                <CheckCircle className="h-5 w-5" />
                <span>Правильно!</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5" />
                <span>Неверно. Правильный ответ: <strong>{lastAnswer.correctAnswer}</strong></span>
              </>
            )}
          </div>
        )}

        {/* Problem display */}
        <div className="text-center py-8">
          <p className="text-4xl md:text-5xl font-mono font-bold tracking-wider">
            {problem.text}
          </p>
        </div>

        {/* Hint */}
        {showHints && problem.hint && (
          <div className="text-center">
            {showHint ? (
              <p className="text-sm text-muted-foreground bg-accent/50 p-3 rounded-lg">
                💡 {problem.hint}
              </p>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setShowHint(true)}>
                <Lightbulb className="mr-2 h-4 w-4" />
                Показать подсказку
              </Button>
            )}
          </div>
        )}

        {/* Answer input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Введите ответ..."
            className="text-center text-2xl h-14 font-mono"
            disabled={isPaused}
            autoComplete="off"
          />
          <div className="flex gap-2 justify-center">
            <Button type="submit" size="lg" disabled={!answer.trim() || isPaused}>
              Ответить
            </Button>
            {showHints && onSkip && (
              <Button type="button" variant="outline" size="lg" onClick={onSkip} disabled={isPaused}>
                <SkipForward className="mr-2 h-4 w-4" />
                Пропустить
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
