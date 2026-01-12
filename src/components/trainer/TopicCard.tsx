import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calculator, Divide, Equal, Percent, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopicCardProps {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  icon?: string | null;
  color?: string | null;
  level?: number;
  progress?: number;
  accuracy?: number;
  onClick?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  calculator: <Calculator className="h-6 w-6" />,
  divide: <Divide className="h-6 w-6" />,
  equal: <Equal className="h-6 w-6" />,
  percent: <Percent className="h-6 w-6" />,
  zap: <Zap className="h-6 w-6" />,
};

export function TopicCard({ name, description, slug, icon, level = 1, progress = 0, accuracy, onClick }: TopicCardProps) {
  const IconComponent = icon && iconMap[icon] ? iconMap[icon] : <Calculator className="h-6 w-6" />;
  
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 border-2",
        "hover:border-primary/50"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {IconComponent}
          </div>
          <Badge variant="secondary" className="text-xs">
            Уровень {level}
          </Badge>
        </div>
        <CardTitle className="mt-3 text-lg">{name}</CardTitle>
        {description && (
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Прогресс</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          {accuracy !== undefined && (
            <p className="text-xs text-muted-foreground">
              Точность: {accuracy.toFixed(1)}%
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
